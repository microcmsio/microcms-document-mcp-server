---
contentId: get-service
directory: management-api
---

# GET /api/v1/service

サービスの情報を取得できるAPIです。サービスIDに紐づくサービス名を取得することができます。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

マネジメントAPIのGET APIリクエストの際に必要な認証キーです。  
マネジメントAPIのデフォルト権限で「サービス情報の取得」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/61e55b8d7ac841a2bfdca068e3b20fd4/CleanShot%202026-04-10%20at%2016.01.45%402x.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

レスポンスボディ
========

正常に取得できた場合の、サービス情報のレスポンス例です。

    {
        "name": "テストサービス"
    }

  
レスポンスには以下のデータが含まれます。

値

型

説明

`name`

文字列

サービス名が入ります。