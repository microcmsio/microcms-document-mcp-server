---
contentId: get-api-list
directory: management-api
---

# GET /api/v1/apis

サービス内で作成されたAPIの一覧情報（API名、エンドポイント名、形式）を取得できるAPIです。  

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

マネジメントAPIのGET APIリクエストの際に必要な認証キーです。  
マネジメントAPIのデフォルト権限で「API情報の取得」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/053bf98d9397420dac38d79035118d1c/CleanShot%202025-10-20%20at%2009.56.00.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

レスポンスボディ
========

こちらがマネジメントAPIで取得したAPI情報のレスポンス例です。

    {
      "apis": [
        {
          "name": "ブログ",
          "endpoint": "blogs",
          "type": "list"
        },
        {
          "name": "カテゴリ",
          "endpoint": "categories",
          "type": "list"
        },
        {
          "name": "バナー",
          "endpoint": "banner",
          "type": "object"
        }
      ]
    }

取得したAPIの情報は `apis` という配列で返されます。`apis` 内のオブジェクトには以下の項目が含まれます。

値

説明

`name`

API名が入ります。

`endpoint`

エンドポイント名が入ります。

`type`

型が入ります。リスト形式の場合は`list`、オブジェクト形式の場合は`object` が入ります。