---
contentId: microcms-mcp
directory: mcp-server
---

# microCMS MCP

現在はこちらの機能はベータ版でご提供しております。仕様・提供内容は変更される場合があります。

microCMS MCPを利用すると、MCP（Model Context Protocol）に対応したAIから、**自然言語でmicroCMSのコンテンツやサービス情報を取得・操作**できます。  
microCMSがMCPサーバーをホスティングするため、利用者自身でローカル環境にMCPサーバーを起動する必要はありません。サービスの接続先URLとAPIキーをMCPクライアントに設定することで利用できます。

利用可能なツール
========

microCMS MCPで利用可能なツール（提供する機能や操作の単位）と、各ツールに対応するAPIです。  
利用できるツールは、設定したAPIキーの権限に従います。書き込み操作を行うツールを利用するには、対象操作に必要な権限を持つAPIキーが必要です。

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

**microcms\_create\_contents\_bulk\_published**

**microcms\_create\_content\_draft**

[コンテンツの作成（下書き）](https://document.microcms.io/content-api/post-content)

**microcms\_create\_contents\_bulk\_draft**

**microcms\_update\_content**

[コンテンツの更新（公開コンテンツを更新）](https://document.microcms.io/content-api/patch-content)

**microcms\_update\_content\_draft\_only** 

[コンテンツの更新（下書きコンテンツのみ更新）](https://document.microcms.io/content-api/patch-content#h1276dbba7e)

**microcms\_delete\_content**

[コンテンツの削除](https://document.microcms.io/content-api/delete-content)

**microcms\_get\_list\_meta**

マネジメントAPI

[コンテンツ一覧の取得](https://document.microcms.io/management-api/get-list-contents-management)

**microcms\_get\_content\_meta**

[コンテンツ詳細の取得](https://document.microcms.io/management-api/get-content)

**microcms\_patch\_content\_status**

[コンテンツの公開状態を変更](https://document.microcms.io/management-api/patch-contents-status)

**microcms\_patch\_content\_created\_by**

[コンテンツの作成者を変更](https://document.microcms.io/management-api/patch-contents-created-by)

**microcms\_update\_content\_reservation**

[コンテンツの予約設定を変更](https://document.microcms.io/management-api/put-contents-reservation)

**microcms\_get\_media**

[メディアの取得](https://document.microcms.io/management-api/get-media-v2)

**microcms\_upload\_media**

[メディアのアップロード](https://document.microcms.io/management-api/post-media)

**microcms\_delete\_media**

[メディアの削除](https://document.microcms.io/management-api/delete-media-v2)

**microcms\_get\_api\_list**

[API情報一覧の取得](https://document.microcms.io/management-api/get-api-list)

**microcms\_get\_api\_info**

[API情報詳細の取得](https://document.microcms.io/management-api/get-api-info)

**microcms\_get\_member**

[メンバー詳細情報の取得](https://document.microcms.io/management-api/get-member)

**microcms\_get\_members**

[メンバー一覧情報の取得](https://document.microcms.io/management-api/get-members)

設定
==

認証方式
----

microCMS MCPは、APIキーによるHTTP Bearer認証を使用します。OAuth認証は現時点では未対応です。

microCMS側の設定
------------

microCMS MCPで利用するサービスのサービスIDとAPIキーを取得します。  
APIキーには、利用したいツールに対応するAPIを実行するために必要な権限を付与してください。設定方法の詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご参照ください。

MCPクライアント側の設定
-------------

ここでは、いくつかのクライアントでの設定例を紹介します。

### ChatGPT（Web）

1.  ChatGPTのWeb版にて設定を開きます。
2.  \[セキュリティとログイン\]を開き、\[開発者モード\]をONにします。
3.  ホームに戻り、左サイドバーから\[プラグイン\]を選択します。
4.  画面右上にある\[＋\]ボタンをクリックします。
5.  以下を入力して\[作成する\]ボタンをクリックし、接続します。`${MICROCMS_SERVICE_ID}`と`${MICROCMS_API_KEY}`は、ご自身のサービスIDとAPIキーに置換してください。（アクセストークンについては作成後の画面での入力となります）

項目

設定値

アイコン

任意

名前

任意

接続（サーバーのURL）

`https://mcp.microcms.io/mcp/${MICROCMS_SERVICE_ID}`

認証

アクセストークンまたはAPIキー

ヘッダー スキーム

カスタム ヘッダー

ヘッダー名

`Authorization`

アクセストークンまたはAPIキー

`Bearer ${MICROCMS_API_KEY}`

ChatGPTでカスタムMCPを利用するには、Plus / Pro / Business / Enterprise / Eduなどの有料プランが必要です。  
また、開発者モードを有効にするためには管理者 / 所有者である必要があります。

### ChatGPT（アプリ）

1.  ChatGPTアプリで設定を開きます。
2.  プラグインを開き、MCPタブを選択します。
3.  追加から\[MCPサーバーを追加\]を選択します。
4.  接続方式として\[ストリーミング可能なHTTP\]を選択します。
5.  以下を入力して保存します。`${MICROCMS_SERVICE_ID}`と`${MICROCMS_API_KEY}`は、ご自身のサービスIDとAPIキーに置換してください。

項目

設定値

名前

`microCMS`

URL

`https://mcp.microcms.io/mcp/${MICROCMS_SERVICE_ID}`

ヘッダーのキー

`Authorization`

ヘッダーの値

`Bearer ${MICROCMS_API_KEY}`

### Codex

`~/.codex/config.toml`に以下を追加します。`${MICROCMS_SERVICE_ID}`と`${MICROCMS_API_KEY}`は、ご自身のサービスIDとAPIキーに置換してください。

    [mcp_servers.microcms]
    url = "https://mcp.microcms.io/mcp/${MICROCMS_SERVICE_ID}"
    http_headers = { Authorization = "Bearer ${MICROCMS_API_KEY}" }

### Claude Code

以下のコマンドを実行します。`${MICROCMS_SERVICE_ID}`と`${MICROCMS_API_KEY}`は、ご自身のサービスIDとAPIキーに置換してください。

    claude mcp add --transport http microcms \
      https://mcp.microcms.io/mcp/${MICROCMS_SERVICE_ID} \
      --header "Authorization: Bearer ${MICROCMS_API_KEY}"

### Cursor

`~/.cursor/mcp.json`に以下を追加します。`${MICROCMS_SERVICE_ID}`と`${MICROCMS_API_KEY}`は、ご自身のサービスIDとAPIキーに置換してください。

    {
      "mcpServers": {
        "microcms": {
          "url": "https://mcp.microcms.io/mcp/${MICROCMS_SERVICE_ID}",
          "headers": {
            "Authorization": "Bearer ${MICROCMS_API_KEY}"
          }
        }
      }
    }

### Notionカスタムエージェント

1.  対象のカスタムエージェントを開きます。
2.  設定からツールとアクセスを開きます。
3.  \[接続を追加\]から\[カスタムMCPを追加\]を選択します。
4.  以下を入力して\[接続\]をクリックします。`${MICROCMS_SERVICE_ID}`と`${MICROCMS_API_KEY}`は、ご自身のサービスIDとAPIキーに置換してください。

項目

設定値

MCPサーバーURL

`https://mcp.microcms.io/mcp/${MICROCMS_SERVICE_ID}`

名前

`microCMS`

認証

`Bearer token`

プレフィックス

`Bearer`

Token

`${MICROCMS_API_KEY}`

NotionカスタムエージェントでカスタムMCPを利用するには、NotionのBusinessプランまたはEnterpriseプランが必要です。

安全に利用するための権限設定
--------------

microCMS MCPでは、意図しない操作を防ぐため、microCMS側のAPIキーの権限とMCPクライアント側で有効にするツールの2つのレイヤーで、許可する操作を必要最小限に絞ることを推奨します。

### 1\. APIキーの権限を制限する

microCMS MCPを利用する際は、本番環境などで使用しているAPIキーとは分けて、AI操作専用のAPIキーを作成することを推奨します。  
microCMS MCPで実行できる操作は、設定したAPIキーの権限に従います。AI操作専用のAPIキーには、利用目的に必要な権限のみを付与してください。

### 2\. MCPクライアントで利用するツールを制限する

MCPクライアント側でツールを個別に有効・無効にできる場合は、AIが利用できるツールを必要なものだけに制限してください。  
たとえば、コンテンツの取得のみを行う場合は、取得に必要な権限のみを付与したAPIキーを使用し、MCPクライアント側でも作成・更新・削除に関するツールを無効にします。  
  
このように、APIキーでmicroCMS MCPで実行できる操作を制限し、MCPクライアント側でAIが利用できるツールを制限することで、必要最小限の権限でmicroCMS MCPを利用できます。

注意事項
====

*   メディアのアップロードは、MCPクライアントによるファイルデータの処理方法によって、処理に時間がかかったり、正常に完了しなかったりする場合があります。
*   microCMS MCP経由のAPIリクエストはmicroCMSがホスティングするMCPサーバーから送信されます。送信元IPアドレスは固定されていないため、[APIのIPアドレス制限](https://document.microcms.io/manual/api-ip-restriction)を設定しているサービスでは利用できない場合があります。
*   microCMS MCP経由でコンテンツを操作した場合、API経由の操作として扱われます。
*   ローカル環境で利用するMCPサーバーについては、[GitHubリポジトリ](https://github.com/microcmsio/microcms-mcp-server)を参照してください。