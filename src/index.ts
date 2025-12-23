#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// 利用可能なカテゴリー
const AVAILABLE_CATEGORIES = ['manual', 'content-api', 'management-api', 'image-api', 'mcp-server'] as const;
type Category = typeof AVAILABLE_CATEGORIES[number];

const server = new Server(
  {
    name: 'microcms-document-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'fetch_general',
        description: 'microCMSについての質問に答える場合、まずこのツールを利用します。docs/general.md の内容を返します。これにはmicroCMS全体の概要や共通情報が書かれています。',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'list_documents',
        description: 'microCMSについての質問に答える場合に利用します。ドキュメントディレクトリのファイル名一覧を返します。カテゴリーを指定することで特定のサブディレクトリのみを対象にできます。\n\nまだ `fetch_general` で全体情報を取得していない場合は、最初に `fetch_general` を実行してください。',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: '検索するカテゴリー（マニュアル: manual, content-api, management-api, image-api, mcp-server）。指定しない場合は全カテゴリーを対象とします。',
              enum: ['manual', 'content-api', 'management-api', 'image-api', 'mcp-server'],
            },
          },
          required: [],
        },
      },
      {
        name: 'search_document',
        description: 'microCMSについての質問に答える場合に利用します。ドキュメントから指定されたファイルを検索し、中身を返します。カテゴリーを指定することで特定のサブディレクトリのみを対象にできます。\n\nまだ `fetch_general` で全体情報を取得していない場合は、最初に `fetch_general` を実行してください。',
        inputSchema: {
          type: 'object',
          properties: {
            filename: {
              type: 'string',
              description: '検索するファイル名（拡張子を含む）',
            },
            category: {
              type: 'string',
              description: '検索するカテゴリー（manual, content-api, management-api, image-api, mcp-server）。指定しない場合は全カテゴリーから検索します。',
              enum: ['manual', 'content-api', 'management-api', 'image-api', 'mcp-server'],
            },
          },
          required: ['filename'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {

    if (request.params.name === 'list_documents') {
      const { category } = request.params.arguments as { category?: Category };

      let result: { category: string; files: string[] }[] = [];

      if (category) {
        // 特定のカテゴリーのみ
        const categoryDir = path.join(DOCS_DIR, category);
        try {
          const files = await fs.readdir(categoryDir);
          const mdFiles = files.filter(file => file.endsWith('.md'));
          result.push({ category, files: mdFiles });
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            throw new McpError(
              ErrorCode.InvalidParams,
              `カテゴリー "${category}" が見つかりません`
            );
          }
          throw error;
        }
      } else {
        // 全カテゴリー
        for (const cat of AVAILABLE_CATEGORIES) {
          const categoryDir = path.join(DOCS_DIR, cat);
          try {
            const files = await fs.readdir(categoryDir);
            const mdFiles = files.filter(file => file.endsWith('.md'));
            if (mdFiles.length > 0) {
              result.push({ category: cat, files: mdFiles });
            }
          } catch (error) {
            // ディレクトリが存在しない場合はスキップ
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
              throw error;
            }
          }
        }
      }

      // general.md の内容を追加
      let responseText = JSON.stringify({
        categories: result,
        totalFiles: result.reduce((sum, cat) => sum + cat.files.length, 0),
      }, null, 2);

      return {
        content: [
          {
            type: 'text',
            text: responseText,
          },
        ],
      };
    }

    if (request.params.name === 'search_document') {
      const { filename, category } = request.params.arguments as { filename: string; category?: Category };

      if (!filename) {
        throw new McpError(
          ErrorCode.InvalidParams,
          'ファイル名を指定してください'
        );
      }

      let filePath: string | null = null;
      let foundCategory: string | null = null;

      if (category) {
        // 特定のカテゴリーで検索
        filePath = path.join(DOCS_DIR, category, filename);
        foundCategory = category;
      } else {
        // 全カテゴリーから検索
        for (const cat of AVAILABLE_CATEGORIES) {
          const candidatePath = path.join(DOCS_DIR, cat, filename);
          try {
            await fs.access(candidatePath);
            filePath = candidatePath;
            foundCategory = cat;
            break;
          } catch {
            // ファイルが存在しない場合は次のカテゴリーへ
          }
        }
      }

      if (!filePath || !foundCategory) {
        throw new McpError(
          ErrorCode.InvalidParams,
          category
            ? `カテゴリー "${category}" にファイル "${filename}" が見つかりません`
            : `ファイル "${filename}" が見つかりません`
        );
      }

      try {
        const content = await fs.readFile(filePath, 'utf-8');
        let responseText = `カテゴリー: ${foundCategory}\nファイル: ${filename}\n\n${content}`;

        // 追加: カテゴリーごとのイントロを含める
        if (category === 'content-api') {
          const introPath = path.join(DOCS_DIR, 'content-api', 'コンテンツAPIとは.md');
          try {
            const introContent = await fs.readFile(introPath, 'utf-8');
            responseText = `【コンテンツAPIとは】\n${introContent}\n\n---\n` + responseText;
          } catch { }
        } else if (category === 'management-api') {
          const introPath = path.join(DOCS_DIR, 'management-api', 'マネジメントAPIとは.md');
          try {
            const introContent = await fs.readFile(introPath, 'utf-8');
            responseText = `【マネジメントAPIとは】\n${introContent}\n\n---\n` + responseText;
          } catch { }
        }

        return {
          content: [
            {
              type: 'text',
              text: responseText,
            },
          ],
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          throw new McpError(
            ErrorCode.InvalidParams,
            `ファイル "${filename}" が見つかりません`
          );
        }
        throw error;
      }
    }

    if (request.params.name === 'fetch_general') {
      // general.md の内容のみ返す
      const generalMdPath = path.join(DOCS_DIR, 'general.md');
      try {
        const content = await fs.readFile(generalMdPath, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: content,
            },
          ],
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          throw new McpError(
            ErrorCode.InvalidParams,
            'general.md が見つかりません'
          );
        }
        throw error;
      }
    }

    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${request.params.name}`
    );
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `ツールの実行中にエラーが発生しました: ${error}`
    );
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});