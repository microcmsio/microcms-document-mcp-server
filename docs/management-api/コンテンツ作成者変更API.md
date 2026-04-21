---
contentId: patch-contents-created-by
directory: management-api
---

# PATCH /api/v1/contents/{endpoint}/{content_id}/createdBy

コンテンツの作成者を変更するAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

PATCH APIリクエストの際に必要な認証キーです。  
マネジメントAPIのデフォルト権限で「コンテンツの作成者を変更」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/3830edd16a574156911eb0f08d99593d/CleanShot%202024-05-15%20at%203%E2%80%AF.47.28%402x.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

Content-Type
------------

送信するデータの形式を指定します。  
microCMSではJSON形式のデータのみ扱っているため、`application/json`と指定してください。

リクエストボディ
========

`createdBy`にメンバーIDを指定してください。  
メンバーIDは、管理画面の[メンバー詳細画面](/manual/manage-members#h0583e0c8b1)または[メンバー一覧取得API](https://document.microcms.io/management-api/get-members)より確認可能です。

    {"createdBy": "[メンバーID]"}

リクエスト例
======

    curl -X PATCH -H 'X-MICROCMS-API-KEY: [APIキー]' -H 'Content-Type: application/json' https://[サービスID].microcms-management.io/api/v1/contents/[エンドポイント]/[コンテンツID]/createdBy -d '{"createdBy": "[メンバーID]"}'

レスポンス
=====

ステータスコード
--------

正常に作成者を変更できた場合は、`200`レスポンスが返却されます。

レスポンスボディ
--------

正常に作成者を変更できた場合は、以下のようなレスポンスが返却されます。

    {"id":"some_content_id"}