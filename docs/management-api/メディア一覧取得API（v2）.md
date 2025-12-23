---
contentId: get-media-v2
directory: management-api
---

# GET /api/v2/media

サービスに含まれるメディア情報を取得できるAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

GET APIリクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「メディアの取得」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/ba19ca64a3f44a98beea9aa13e73b433/CleanShot%202025-08-21%20at%2011.45.29.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

レスポンス例
======

こちらがマネジメントAPIで取得したメディア一覧のレスポンス例です。

    {
      "media": [
        {
          "id": "e803c1fa-368d-4087-b937-646db9f6e328",
          "url": "https://images.microcms-assets.io/assets/9895824867684c2994e22452171b8c11/sample1.png",
          "width": 1200,
          "height": 800
        },
        {
          "id": "52d27e9a-5ada-4c22-9fe9-df2dec7ca1fd",
          "url": "https://images.microcms-assets.io/assets/9895824867684c2994e22452171b8c11/d7bcc402720f471f9f36de5eca4057c5/sample2.png",
          "width": 1200,
          "height": 800
        }
      ],
      "totalCount": 2,
       "token": "FGluY2x1ZGVfY29ud...R0cHljVU5KUQ==" // 一部省略
    }

tokenについては、初回リクエスト時、続きのメディア情報がない場合もレスポンスに含まれます。

クエリパラメータ
========

本APIにはパラメータを指定できます。

limit
-----

取得件数を指定します。  
デフォルト値は`10`です。上限値は`100`です。

初回リクエスト時のみ有効となります（パラメータにtokenを付与した2回目以降のリクエストでは指定できません）。

imageOnly
---------

動画やPDFなどのファイルは除き、画像のみを取得したい場合に指定するパラメータです。  
画像のみを取得する場合は`true`を指定してください。  
デフォルト値は`false`です。

初回リクエスト時のみ有効となります（パラメータにtokenを付与した2回目以降のリクエストでは指定できません）。

fileName
--------

ファイル名による絞り込みを行うためのパラメータです。拡張子を含むファイル名が、指定した文字列に部分一致するメディアのみ取得されます。  
デフォルトでは絞り込みは行われません。

token
-----

前回のリクエストの続きからコンテンツを取得するためのパラメータです。  
初回のレスポンスに含まれる `token` の値を指定してください。

### 2回目以降のリクエストについて

初回のリクエストで `limit` および `imageOnly` パラメータが付与されている場合、明示的に付与せずともそれらの条件が引き継がれます。

**tokenの有効期限は15秒です**（ただし、15秒を超えた後も一定期間、トークンは有効な場合があります）。

tokenを利用したメディア情報の取得方法については、ヘルプ「[【マネジメントAPI】GET /api/v2/mediaのtokenを用いたリクエスト方法](https://help.microcms.io/ja/knowledge/management-api-get-media-token)」をご覧ください。