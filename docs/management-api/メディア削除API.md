---
contentId: delete-media-v2
directory: management-api
---

# DELETE /api/v2/media

サービスのメディアを削除するAPIです。  
画像とファイルの両方の削除に対応しています。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

リクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「メディアの削除」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/f0782e64c831468f9ba65310ccecbf59/CleanShot%202025-08-21%20at%2011.58.04.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

クエリパラメータ
========

本APIにはパラメータを指定できます。

url
---

削除したいメディアのURLを指定します。

    ?url=https://images.microcms-assets.io/assets/xxxxx/yyyyy/hoge.jpg
    ?url=https://files.microcms-assets.io/assets/xxxxx/yyyyy/hoge.pdf

*   [メディアのカスタムドメイン](/manual/custom-domain)を設定している場合は、カスタムドメインのURLで指定可能です。

リクエストボディ
========

不要です。

レスポンス
=====

ステータスコード
--------

正常にコンテンツを削除できた場合は`200`レスポンスが返却されます。

*   コンテンツから参照されているメディアについては、削除することができません。

レスポンスボディ
--------

正常にコンテンツを削除できた場合は、以下のようなレスポンスが返却されます。

    {"id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}

### id

削除されたメディアの内部的なIDです。