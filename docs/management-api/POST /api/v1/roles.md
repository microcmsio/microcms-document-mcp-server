---
contentId: post-roles
directory: management-api
---

# POST /api/v1/roles

サービスにロールを作成するAPIです。

本APIは、ロール機能を利用できるプラン（Business、Enterprise）で利用可能です。ロール機能を利用できないプランでは、エラーが返却されます。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

リクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「ロールの作成」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

Content-Type
------------

送信するデータの形式を指定します。  
microCMSではJSON形式のデータのみ扱っているため、`application/json` と指定してください。

リクエストボディ
========

作成するロールのロール名と権限設定を指定します。

プロパティ

型

指定要否

説明

`name`

string

必須

ロール名。1〜100文字で指定します。既存のロールと同じ名前も指定できます。

`permissions`

object

必須

ロールの権限設定。`defaultPermissions`と`individualPermissions`の両方を指定します。詳細は下記の「[permissions](/management-api/post-roles#h040ff30b91)」をご覧ください。

未定義のプロパティや、`isAdmin`・`id`・`createdAt`・`updatedAt` を指定した場合は、`400` レスポンスが返却されます。

permissions
-----------

`permissions` 内のキーは、すべて指定が必要です。利用しない権限も、`false` や `NONE` を指定してください。キーの省略や`null`、型の異なる値を指定した場合は、`400` レスポンスが返却されます。

ロール詳細取得API（[GET /api/v1/roles/{role\_id}](/management-api/get-role#h0c0b84b0b7)）のレスポンスの `name` と `permissions` をそのまま送信すると、同じ権限設定のロールを作成できます。既存のロールをもとに作成する場合にご利用ください。

### defaultPermissions

デフォルト権限です。  
`level` は文字列、`memberIds`・`serviceIds` は文字列の配列で指定します。各操作の許可・不許可はboolean型で指定します。  
各キーの意味と、管理画面のロール設定画面の項目名との対応は、「[GET /api/v1/roles/{role\_id}](/management-api/get-role)」の「[権限の詳細](/management-api/get-role#h1736f49854)」をご覧ください。  
  
キー列は、JSONの階層ごとに列を分けて表示しています。左の列から順に「.」でつなげたものが、実際のキーになります。  
例：`members` → `read` → `level` は `members.read.level` を表し、リクエストボディでは次のように指定します。

    "members": {
      "read": {
        "level": "ALL"
      }
    }

キー

型

指定できる値

`members`

`read`

`level`

string

`ALL` / `SAME_ROLE` / `SPECIFIC` / `NONE`

`memberIds`

array

閲覧を許可するメンバーのIDの配列  
`members.read.level`が`SPECIFIC`の場合は必須。それ以外は指定不可  
空の配列（`[]`）も可

`create`

boolean

`true` / `false`

`update`

boolean

`true` / `false`

`delete`

boolean

`true` / `false`

`roles`

`read`

`level`

string

`ALL` / `SAME_ROLE` / `NONE`

`create`

boolean

`true` / `false`

`update`

boolean

`true` / `false`

`delete`

boolean

`true` / `false`

`billing`

`read`

boolean

`true` / `false`

`update`

boolean

`true` / `false`

`apiKeys`

`read`

boolean

`true` / `false`

`usage`

`read`

boolean

`true` / `false`

`environments`

`read`

`level`

string

`ALL` / `URL_ONLY` / `RESTRICTED` / `NONE`

`serviceIds`

array

閲覧を許可する環境のサービスIDの配列  
`environments.read.level`が`RESTRICTED`の場合は必須。それ以外は指定不可  
空の配列（`[]`）も可

`create`

boolean

`true` / `false`

`delete`

boolean

`true` / `false`

`reviews`

object

「[GET /api/v1/roles/{role\_id}](/management-api/get-role)」の「[reviewsの詳細](/management-api/get-role#hba95484a36)」と同じキーをすべて指定

`media`

`read`

`level`

string

`ALL` / `SAME_ROLE` / `CREATED` / `NONE`

`create`

boolean

`true` / `false`

`update`

boolean

`true` / `false`

`delete`

boolean

`true` / `false`

`api`

`read`

boolean

`true` / `false`

`create`

boolean

`true` / `false`

`update`

boolean

`true` / `false`

`delete`

boolean

`true` / `false`

`content`

object

「[GET /api/v1/roles/{role\_id}](/management-api/get-role)」の「[contentの詳細](/management-api/get-role#h0958d64e4a)」と同じキーをすべて指定

`developerMenu`

`read`

boolean

`true` / `false`

#### キーごとの注意事項

*   `environments`の更新権限は管理者ロールのみが持つ権限のため、指定できません。
*   `content.update`には、以下の16項目をすべて指定します。
    *   `saveDraft`、`removeDraft`、`revertToDraftUnpublished`、`changeContentIdUnpublished`、`reorderUnpublished`、`changePublicationDateUnpublished`、`changeAuthor`、`changeDraftKey`、`publish`、`publishApproved`、`unpublish`、`unpublishApproved`、`revertToDraft`、`changeContentIdPublished`、`reorderPublished`、`changePublicationDatePublished`

#### levelに指定できる値

**キー**

**指定できる値**

`members.read.level`

`ALL` / `SAME_ROLE` / `SPECIFIC（※1）` / `NONE`

`roles.read.level`

`ALL` / `SAME_ROLE` / `NONE`

`environments.read.level`

`ALL` / `URL_ONLY` / `RESTRICTED（※2）` / `NONE`

`reviews.read.level`

`ALL` / `SAME_ROLE` / `CREATED` / `NONE`

`reviews.update.level`

`ALL` / `EDIT` / `NONE`

#### **閲覧を許可するメンバー・環境の指定（※1, 2）**

*   `members.read.memberIds`
    *   `members.read.level`が`SPECIFIC`の場合は必須です。`SPECIFIC` 以外の場合は、`members.read.memberIds` を省略してください。
    *   閲覧を許可するメンバーのIDを配列で指定します（重複指定は不可）。サービスに参加済みのメンバーのみ指定でき、招待中のメンバーは指定できません。
    *   メンバーIDは、メンバー一覧取得APIのレスポンスの`id`から確認可能です。空の配列（`[]`）も指定できます。
*   `environments.read.serviceIds`
    *   `environments.read.level`が`RESTRICTED`の場合は必須です。`RESTRICTED` 以外の場合は、`environments.read.serviceIds` を省略してください。
    *   閲覧を許可する環境のサービスIDを配列で指定します（重複指定は不可）。環境のサービスIDは、環境のURLのサブドメイン部分です。このサービスの環境のみ指定でき、親サービス自身のサービスIDは指定できません。空の配列（`[]`）も指定できます。

### individualPermissions

APIごとの個別権限の配列です。  
個別権限を設定しない場合は、空の配列（`[]`）を指定してください。

キー

型

指定できる値

`apiId`

string

個別権限を設定するAPIのエンドポイント名（例：`blog`）。API一覧取得APIのレスポンスに含まれる`endpoint`を指定。

API名（表示名）は指定不可。大文字・小文字は区別され、同じエンドポイントを重複して指定するのは不可。

`api`

`read`

boolean

`true` / `false`

`update`

boolean

`true` / `false`

`delete`

boolean

`true` / `false`  
`api.create`は指定不可（APIの作成は特定のAPIに紐づかないため）

`content`

object

`defaultPermissions.content`と同じ形式

`developerMenu`

`read`

boolean

`true` / `false`

`reviews`

object

`defaultPermissions.reviews`と同じ形式

リクエスト例
======

以下は、すべてのコンテンツを編集・公開できる「コンテンツ編集者」ロールを作成する例です。

    curl -X POST 'https://[サービスID].microcms-management.io/api/v1/roles' \
      -H 'X-MICROCMS-API-KEY: [APIキー]' \
      -H 'Content-Type: application/json' \
      -d '{
        "name": "コンテンツ編集者",
        "permissions": {
          "defaultPermissions": {
            "roles": { "read": { "level": "NONE" }, "create": false, "update": false, "delete": false },
            "members": { "read": { "level": "NONE" }, "create": false, "update": false, "delete": false },
            "usage": { "read": false },
            "environments": { "read": { "level": "NONE" }, "create": false, "delete": false },
            "billing": { "read": false, "update": false },
            "apiKeys": { "read": false },
            "reviews": { "read": { "level": "ALL" }, "create": true, "update": { "level": "EDIT" } },
            "media": { "read": { "level": "ALL" }, "create": true, "update": true, "delete": false },
            "api": { "read": true, "create": false, "update": false, "delete": false },
            "content": {
              "read": { "level": "ALL" },
              "create": { "draft": true, "publish": true },
              "update": {
                "saveDraft": true,
                "removeDraft": true,
                "revertToDraftUnpublished": true,
                "changeContentIdUnpublished": true,
                "reorderUnpublished": true,
                "changePublicationDateUnpublished": true,
                "changeAuthor": true,
                "changeDraftKey": true,
                "publish": true,
                "publishApproved": true,
                "unpublish": true,
                "unpublishApproved": true,
                "revertToDraft": true,
                "changeContentIdPublished": true,
                "reorderPublished": true,
                "changePublicationDatePublished": true
              },
              "delete": true
            },
            "developerMenu": { "read": false }
          },
          "individualPermissions": []
        }
      }'

特定のメンバー・環境のみ閲覧できるロールの例
----------------------

上記の例の `members` と `environments` を、以下のように変更します。

    "members": {
      "read": { "level": "SPECIFIC", "memberIds": ["[メンバーID]"] },
      "create": false,
      "update": false,
      "delete": false
    },
    "environments": {
      "read": { "level": "RESTRICTED", "serviceIds": ["[環境のサービスID]"] },
      "create": false,
      "delete": false
    }

APIごとの個別権限を設定する例
----------------

デフォルト権限の `content` と `api` を無効にしたうえで、`individualPermissions` で特定のAPI（この例では `blog` ）の権限を設定する例です。

    "individualPermissions": [
      {
        "apiId": "blog",
        "api": { "read": true, "update": false, "delete": false },
        "content": {
          "read": { "level": "ALL" },
          "create": { "draft": true, "publish": true },
          "update": {
            "saveDraft": true,
            "removeDraft": true,
            "revertToDraftUnpublished": true,
            "changeContentIdUnpublished": true,
            "reorderUnpublished": true,
            "changePublicationDateUnpublished": true,
            "changeAuthor": true,
            "changeDraftKey": true,
            "publish": true,
            "publishApproved": true,
            "unpublish": true,
            "unpublishApproved": true,
            "revertToDraft": true,
            "changeContentIdPublished": true,
            "reorderPublished": true,
            "changePublicationDatePublished": true
          },
          "delete": true
        },
        "developerMenu": { "read": false },
        "reviews": { "read": { "level": "ALL" }, "create": true, "update": { "level": "EDIT" } }
      }
    ]

レスポンス
=====

ステータスコード
--------

正常にロールを作成できた場合は、`201`レスポンスが返却されます。  
エラー時のステータスコードについては、「[エラーレスポンス](/management-api/post_roles#hac0180bb78)」をご覧ください。

レスポンスボディ
--------

正常にロールを作成できた場合は、以下のようなレスポンスが返却されます。  
形式は「[GET /api/v1/roles/{role\_id}](/management-api/get-role#h0c0b84b0b7)」のレスポンスと同じです。

    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "コンテンツ編集者",
      "isAdmin": false,
      "permissions": {
        "defaultPermissions": { ... },
        "individualPermissions": []
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }

エラーレスポンス
--------

本APIで返却される主なエラーは以下のとおりです。

ステータスコード

条件

`400`

リクエストボディが不正な場合（必須キーの不足、`null`、型の不一致、未定義のプロパティ、`level`に指定できない値、`name`の文字数超過など）

`400`

存在しないメンバー・環境・APIを指定した場合（招待中のメンバー、他のサービスのメンバーや環境を含む）

`403`

ロール機能を利用できないプランの場合

`403`

複数環境機能で作成した環境に対してリクエストした場合

`413`

リクエストボディのサイズが1MiBを超える場合

エラーの詳細は、レスポンスボディの`message`で確認できます。  
たとえば、`content.update.publish`を省略した場合は、次のようなレスポンスが返却されます。

    { "message": "\"permissions.defaultPermissions.content.update.publish\" is required" }

その他のエラーについては、「[マネジメントAPIのエラーレスポンス](/management-api/management-api-error-response)」をご覧ください。

制約事項
====

作成できないロール
---------

管理者ロールは作成できません。

複数環境での利用
--------

複数環境機能で作成した環境へのリクエストには対応していません。