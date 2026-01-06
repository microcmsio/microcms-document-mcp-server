---
contentId: get-member
directory: management-api
---

# GET /api/v1/members/{member_id}

任意のメンバーの詳細情報を取得できるAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

GET APIリクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「メンバー詳細情報の取得」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/31fffdcd930a4c6b840be1f24d300642/CleanShot%202025-08-07%20at%206%E2%80%AF.14.12.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

パスパラメータ
=======

member\_id
----------

取得するメンバーのIDを指定してください。  
IDは管理画面のメンバー詳細画面や、各種マネジメントAPIのレスポンスの中で、確認可能です。

レスポンスボディ

正常に取得できた場合の、メンバー詳細のレスポンス例です。

    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "test-member",
      "email": "test@microcms.co.jp",
      "mfa": true
    }

レスポンスには以下のデータが含まれます。

値

説明

`id`

メンバーのIDです。

`name`

メンバーの表示名です。未設定の場合は、空の文字列（`""`）となります。

`email`

メンバーのメールアドレスです。

`mfa`

二要素認証の設定の有無です。（`true`：有効、`false`：無効）