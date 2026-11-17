---
contentId: get-members
directory: management-api
---

# GET /api/v1/members

任意のサービスに所属しているメンバーの一覧を取得できるAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

GET APIリクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「メンバーの取得 (一覧・詳細)」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/8f3b1b376ee84cc4acf12af148f9999d/CleanShot%202026-04-01%20at%2011.40.27.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

レスポンスボディ
========

正常に取得できた場合の、メンバー一覧のレスポンス例です。

    {
      "members": [
        {
          "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "name": "test-member",
          "email": "test@microcms.co.jp",
          "mfa": true,
          "inviting": false
        },
        {
        ...
        }
      ],
      "totalCount": 120,
      "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }

レスポンスには以下のデータが含まれます。  

members
-------

メンバーの配列です。各メンバーオブジェクトには以下のデータが含まれます。  
招待中のメンバーはレスポンスに含まれません。

値

説明

`id`

メンバーのIDです。

`name`

メンバーの表示名です。未設定の場合は、空の文字列（`""`）となります。

`email`

メンバーのメールアドレスです。

`mfa`

二要素認証の設定の有無です。（`true`：有効、`false`：無効）SAMLユーザーの場合は `false` となります。

`inviting`

招待中かどうかを示します。（`true`：招待中、`false`：参加済み）現時点では必ず `false` となります。

totalCount
----------

メンバーの全件数です。

token
-----

ページネーションに利用するトークンです。次のページが存在する場合に返されます。  
次のリクエストのクエリパラメータ `token` にこの値を指定することで、続きのデータを取得できます。

クエリパラメータ
========

limit
-----

取得するメンバーの件数を指定してください。

*   指定可能な値: `0〜100`
*   デフォルト値: `10`

token
-----

ページネーションに利用するトークンを指定してください。  
レスポンスに含まれる `token` の値を次のリクエストに指定することで、続きのデータを取得できます。