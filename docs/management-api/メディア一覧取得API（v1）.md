---
contentId: get-media-v1
directory: management-api
---

# GET /api/v1/media

サービスに含まれるメディア情報を取得できるAPIです。

2023年12月より、新たにメディア情報を取得するためのエンドポイント（[GET api/v2/media](https://document.microcms.io/management-api/get-media-v2)）をご提供しています。今後はこちらのご利用を推奨いたします。

既知の不具合として、**10,000件より多いメディアを取得する場合（offsetに10,000件以上の値を設定する場合）、正常にデータが取得できない事象**を確認しています。

10,000件を超えるメディア情報を取得する場合は、[GET /api/v2/media](https://document.microcms.io/management-api/get-media-v2) をご利用ください。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

GET APIリクエストの際に必要な認証キーです。  
マネジメントAPIのデフォルト権限で「メディアの取得」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/12ca25e8b16147018fbaa05944ddad57/CleanShot%202025-08-21%20at%2011.45.29.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

レスポンス例
======

こちらがマネジメントAPIで取得したメディア一覧のレスポンス例です。

    {
      "media": [
        {
          "id": "e803c1fa-368d-4087-b937-646db9f6e328",
          "url": "https://images.microcms-assets.io/assets/9895824867684c2994e22452171b8c11/test.png",
          "width": 591,
          "height": 138
        },
        {
          "id": "52d27e9a-5ada-4c22-9fe9-df2dec7ca1fd",
          "url": "https://images.microcms-assets.io/assets/9895824867684c2994e22452171b8c11/d7bcc402720f471f9f36de5eca4057c5/example.png",
          "width": 808,
          "height": 177
        }
      ],
      "totalCount": 8,
      "limit": 2,
      "offset": 0
    }

  

クエリパラメータ
========

本APIにはパラメータを指定できます。

limit
-----

取得件数を指定します。  
デフォルト値は`10`です。上限値は`100`です。

*   レスポンスサイズ（レスポンスヘッダのcontent-lengthの値）が約5MBを超えるとエラーが発生します。
*   **全件取得など、101件以上のコンテンツを取得したい場合の方法については、下記のヘルプをご参照ください。**

https://help.microcms.io/ja/knowledge/fetch-big-data

offset
------

コンテンツを取得開始する位置を、指定した値だけ後ろにずらします。  
デフォルト値は`0`です。

imageOnly
---------

動画やPDFなどのファイルは除き、画像のみを取得したい場合に指定するパラメータです。  
画像のみを取得する場合は`true`を指定してください。  
デフォルト値は`false`です。