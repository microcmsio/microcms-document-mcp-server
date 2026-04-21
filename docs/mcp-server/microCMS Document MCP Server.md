---
contentId: microcms-document-mcp-server
directory: mcp-server
---

# microCMS Document MCP Server

本機能の仕様については、予告なく変更される可能性があります。

MCPサーバーは、AI（大規模言語モデル）が外部サービスと連携するためのプロトコルです。  
microCMS Document MCP Serverを使用することで、ClaudeやCursorなどのAIツールから**最新のmicroCMSドキュメントの検索・取得が可能**になります。  
AIが様々な機能を利用できるようにする「窓口」のような存在です。

利用例
===

microCMSの仕様を確認する
----------------

ClaudeやCursorなどのサービスを利用して、最新のドキュメントに基づくmicroCMSの仕様を確認できます。

AIエージェントによる実装補助
---------------

AIエージェントが実装する際の情報源として、microCMSドキュメントを利用できます。

詳細な利用イメージについては、リリースブログ「[microCMS Document MCPサーバーを公開しました](https://blog.microcms.io/microcms-document-mcp-server/)」をご覧ください。

利用可能なツール
========

microCMS Document MCP Serverで利用可能なツール（MCPサーバーが提供する機能や操作の単位）の一覧です。

ツール名

用途

**fetch\_general**

microCMSに関する概要の取得

**list\_documents**

microCMSドキュメントの一覧の取得

**search\_document**

指定したmicroCMSドキュメントの内容の取得

クライアント側の設定
==========

MCPサーバーに対応していれば、どのクライアントからも利用できます。  
ここでは、いくつかのクライアントでの設定例を紹介します。

microCMS MCP Serverを利用するには、クライアント側にNode.jsがインストールされている必要があります。

Claude Desktop
--------------

1.  [リリースページ](https://github.com/microcmsio/microcms-document-mcp-server/releases)から最新の `microcms-document-mcp-server.mcpb` をダウンロードします。
2.  ダウンロードしたmcpbファイルをダブルクリックで開き、インストールします。

Claude Code
-----------

以下のコマンドを実行します。

    claude mcp add microcms-document -- npx -y microcms-document-mcp-server

VSCode
------

1.  MCPサーバーを利用したいワークスペースで `.vscode/mcp.json` を作成します。
2.  作成したファイルに以下の内容を記載し、保存します。

    {
      "servers": {
        "microcms-document": {
          "command": "npx",
          "args": ["-y", "microcms-document-mcp-server"]
        }
      }
    }

Cursor
------

以下のURLにブラウザからアクセスすることでセットアップできます。  
`cursor://anysphere.cursor-deeplink/mcp/install?name=microcms-document&config=eyJjb21tYW5kIjoibnB4IC15IG1pY3JvY21zLWRvY3VtZW50LW1jcC1zZXJ2ZXIifQ%3D%3D`