---
contentId: microcms-mcp-server
directory: mcp-server
---

# microCMS MCP Server

本機能の仕様については、予告なく変更される可能性があります。

MCPサーバーは、AI（大規模言語モデル）が外部サービスと連携するためのプロトコルです。  
microCMS MCP Serverを使用することで、ClaudeやCursorなどのAIツールから**自然言語でmicroCMSのコンテンツ作成・更新が可能**になります。  
AIが様々な機能を利用できるようにする「窓口」のような存在です。

利用例
===

コンテンツの自動生成・校正
-------------

ClaudeやCursorなどのサービスを利用して、適切なコンテンツを自動生成できます。  
既存コンテンツに対しては、誤字脱字などの修正を指示できます。

*   入力例：「次のURLを読んで、ユーザー向けのお知らせを300文字程度で作成して」

**情報の一括更新**
-----------

自然言語でAPIを横断した操作が可能なため、特定のテキストを一括置換する際などに便利です。

*   入力例：「すべてのAPIのコンテンツに対して、XXXをYYYに置換して」

多言語展開
-----

LLMを介して既存コンテンツを取得し、多言語翻訳できます。

*   入力例：「この日本語記事を英語と中国語に翻訳して、コンテンツを作成して」

詳細な利用イメージについては、リリースブログ「[microCMSのMCPサーバーをリリースしました](https://blog.microcms.io/microcms-mcp-server/)」をご覧ください。

利用可能なツール
========

microCMS MCP Serverで利用可能なツール（MCPサーバーが提供する機能や操作の単位）と、各ツールに対応するAPIです。

ツール名

API種別

API

**microcms\_get\_list**

コンテンツAPI

[コンテンツ一覧の取得](https://document.microcms.io/content-api/get-list-contents)

**microcms\_get\_content**

[コンテンツ詳細の取得](https://document.microcms.io/content-api/get-content)

**microcms\_create\_content\_published**

[コンテンツの作成（公開）](https://document.microcms.io/content-api/post-content)

**microcms\_create\_content\_draft**

[コンテンツの作成（下書き）](https://document.microcms.io/content-api/post-content)

**microcms\_update\_content\_published**

[コンテンツの更新（公開）](https://document.microcms.io/content-api/put-content)

**microcms\_update\_content\_draft** 

[コンテンツの更新（下書き）](https://document.microcms.io/content-api/put-content)

**microcms\_patch\_content**

[コンテンツの部分更新](https://document.microcms.io/content-api/patch-content)

**microcms\_delete\_content**

[コンテンツの削除](https://document.microcms.io/content-api/delete-content)

**microcms\_get\_media**

マネジメントAPI

[メディアの取得](https://document.microcms.io/management-api/get-media-v2)

**microcms\_upload\_media**

[メディアのアップロード](https://document.microcms.io/management-api/post-media)

**microcms\_get\_api\_info**

[API情報の取得](https://document.microcms.io/management-api/get-api-info)

設定
==

microCMS側の設定
------------

microCMS MCP Serverで利用するサービスのサービス名とAPIキーを取得します。  
APIキーには、利用したいツールに対応するAPIが実行できる権限を付与してください。

microCMS MCP Serverのすべての機能を利用する場合は、APIキーに幅広い権限を付与する必要があります。  
本番環境で使用中のAPIキーとは別に、**AI操作専用のAPIキー**を作成することを推奨します。

クライアント側の設定
----------

MCPサーバーに対応していれば、どのクライアントからも利用できます。  
ここでは、いくつかのクライアントでの設定例を紹介します。

###

microCMS MCP Serverを利用するには、クライアント側にNode.jsがインストールされている必要があります。

### Claude Desktop

1.  [リリースページ](https://github.com/microcmsio/microcms-mcp-server/releases)から最新の `microcms-mcp-server.mcpb` をダウンロードします。
2.  ダウンロードしたmcpbファイルをダブルクリックで開き、インストールします。
3.  サービスIDとAPIキーを設定します。

### Claude Code

以下のコマンドを実行します。

    claude mcp add microcms -- npx -y microcms-mcp-server

### VSCode

1.  MCPサーバーを利用したいワークスペースで `.vscode/mcp.json` を作成します。
2.  作成したファイルに以下の内容を記載し、保存します。`<MICROCMS_SERVICE_ID>`と`<MICROCMS_API_KEY>`は、ご自身のサービスIDとAPIキーに置換してください。

    {
      "servers": {
        "microcms": {
          "command": "npx",
          "args": [
            "-y",
            "microcms-mcp-server@latest",
            "--service-id", "<MICROCMS_SERVICE_ID>",
            "--api-key", "<MICROCMS_API_KEY>"
          ]
        }
      }
    }

### Cursor

1.  MCPサーバーを利用したいワークスペースで `.cursor/mcp.json` を作成します。
2.  作成したファイルに以下の内容を記載し、保存します。`<MICROCMS_SERVICE_ID>`と`<MICROCMS_API_KEY>`は、ご自身のサービスIDとAPIキーに置換してください。

    {
      "mcpServers": {
        "microcms": {
          "command": "npx",
          "args": [
            "-y",
            "microcms-mcp-server@latest",
            "--service-id", "<MICROCMS_SERVICE_ID>",
            "--api-key", "<MICROCMS_API_KEY>"
          ]
        }
      }
    }

3\. 「Cursor Settings > Tools & MCP」で、microCMS MCP Serverを有効化します。

制限事項
====

*   リスト形式のAPIのみ対応しています。
*   レートリミットやアップロードできる画像のサイズ制限（5MB）など、コンテンツAPIおよびマネジメントAPIの制限が適用されます。制限の内容については、[制限事項／注意事項](https://microcms-docs.microcms.io/manual/limitations)をご覧ください。