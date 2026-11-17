---
contentId: post-media
directory: management-api
---

# POST /api/v1/media

サービスに画像をアップロードできるAPIです。

仕様
==

*   アップロード可能なメディアの形式は、**画像**と**ファイル**（画像以外のメディア）です。

ファイルのアップロードは、Teamプラン、Businessプラン、Enterpriseプランでご利用いただける機能です。  
プランごとに利用できる機能については、[料金プランページ](https://microcms.io/pricing)をご覧ください。

*   アップロード可能なファイルサイズ上限は**5MB**までです。サイズ上限を超える画像やファイルは、管理画面よりアップロードしてください。
*   1リクエストにつき、**1ファイルのみ**アップロード可能です。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

APIリクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「メディアのアップロード」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/3f05519287f74eefaa0610efd941c915/CleanShot%202025-08-21%20at%2011.46.39.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

Content-Type
------------

送信するデータの形式を指定します。  
`multipart/form-data; boundary=--[任意の値(boundary)]`を指定してください。

リクエストボディ
========

    --[任意の値(boundary)]
    Content-Disposition: form-data; name="file"; filename="[ファイル名]"
    Content-Type: [ファイルのMIMEタイプ]
    [ファイルのバイナリデータ]
    --[任意の値(boundary)]

リクエスト例
======

curlを利用する場合のリクエスト例です。

    // 画像
    curl -X POST -H 'X-MICROCMS-API-KEY: [APIキー]' -F "file=@sample.jpg" https://[サービスID].microcms-management.io/api/v1/media
    
    // ファイル
    curl -X POST -H 'X-MICROCMS-API-KEY: [APIキー]' -F "file=@sample.txt" https://[サービスID].microcms-management.io/api/v1/media

レスポンス
=====

正常に画像を作成できた場合は、`201`レスポンスが返却されます。

レスポンスボディ
--------

    // 画像
    {"url":"https://images.microcms-assets.io/assets/xxx/yyy/sample.jpg"}
    
    //ファイル
    {"url":"https://files.microcms-assets.io/assets/xxx/yyy/sample.txt"}