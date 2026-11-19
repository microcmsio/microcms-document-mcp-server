---
contentId: get-roles
directory: management-api
---

# GET /api/v1/roles

サービスのロールの一覧を取得できるAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

リクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「ロールの取得（一覧・詳細）」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

クエリパラメータ
========

limit
-----

取得するロールの件数を指定してください。

*   デフォルト値: 10
*   最大値: 100

省略した場合、または0以下の整数を指定した場合は、デフォルト値の10として扱われます。

token
-----

ページネーションに利用するトークンを指定してください。  
レスポンスに含まれる`token`の値を次のリクエストに指定することで、続きのデータを取得できます。

### 続きのデータを取得する場合

前回のレスポンスに含まれる`token`の値を、クエリパラメータ`token`に指定します。

    curl -H 'X-MICROCMS-API-KEY: [APIキー]' 'https://[サービスID].microcms-management.io/api/v1/roles?limit=10&token=[トークン]'

レスポンス
=====

ステータスコード
--------

正常に取得できた場合は、`200` レスポンスが返却されます。

レスポンスボディ
--------

正常に取得できた場合は、以下のようなレスポンスが返却されます。

    {
      "roles": [
        {
          "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "name": "コンテンツ編集者",
          "isAdmin": false,
          "permissions": {
            "defaultPermissions": { ... },
            "individualPermissions": [ ... ]
          },
          "createdAt": "2026-01-01T00:00:00.000Z",
          "updatedAt": "2026-01-01T00:00:00.000Z"
        },
        {
          ...
        }
      ],
      "totalCount": 5,
      "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }

レスポンスには以下のデータが含まれます。

### roles

ロールの配列です。管理画面のロール一覧と同じ順序で返却されます。  
各ロールオブジェクトの内容は、「[GET /api/v1/roles/{role\_id}](/management-api/get-role#h8a4c320d89)」のレスポンスと同じです。

### totalCount

ロールの全件数です。

### token

ページネーションに利用するトークンです。  
返却された値を次のリクエストのクエリパラメータ `token` に指定してください。レスポンスに `token` が含まれなくなるまで繰り返すことで、すべてのロールを取得できます。  
なお、`token` を指定したリクエストでも、取得結果が空配列になる場合があります。

エラーレスポンス
========

「[マネジメントAPIのエラーレスポンス](/management-api/management-api-error-response)」を参照ください。

制約事項
====

複数環境での利用
--------

複数環境機能で作成した環境へのリクエストには対応していません。