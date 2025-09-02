---
contentId: introduction
directory: image-api
---

# 画像APIとは

microCMSには、画像の編集を行うことができる、画像APIという機能が備わっています。  
  
アップロード時に編集を行わなくても、アップロード後の画像URLに対してパラメータを付与することで、様々な編集を行うことが可能です。  
  
画像処理には、**imgix**の**Rendering API**を利用しています。  
こちらのドキュメントに記載しているパラメータ以外にも、利用可能なパラメータがございます。  
APIに関して詳しく知りたい方は、imgixの[公式リファレンス](https://docs.imgix.com/apis/url)をご覧ください。

`?auto=format`については対応しておりません。あらかじめご了承ください。

利用可能な主な画像方式
===========

*   JPEG
*   PNG
*   GIF
*   WebP
*   HEIC/HEIF

その他の利用可能な形式については、以下の`Supported as input format`をご参照ください。

https://docs.imgix.com/best-practices/guide-to-image-types#which-image-formats-can-be-served-with-imgix

*   SVG形式については、画像APIをご利用いただけません。

画像APIの適用方法
==========

画像APIは、microCMSから取得した画像をフロントエンドで表示する際に、URLの末尾にパラメータを付与することで適用されます。

画像フィールド・複数画像フィールドへの適用方法
-----------------------

画像フィールドや複数画像フィールドに画像を登録すると、画像のURLを含むレスポンスが返却されます。

    // 画像フィールド
    "image": {
            "url": "https://images.microcms-assets.io/assets/xxxx/yyyy/image.png.",
            "height": 630,
            "width": 1200
    }
    
    // 複数画像フィールド
    "imageList": [
            {
                "url": "https://images.microcms-assets.io/assets/xxxx/yyyy/image1.png",
                "height": 630,
                "width": 1200
            },
            {
                "url": "https://images.microcms-assets.io/assets/xxxx/yyyy/image2.png",
                "height": 630,
                "width": 1200
            }
    ]

このURLの末尾にパラメータを追加することで、画像APIを適用できます。以下はその実装例です。

### 画像フィールドの画像に適用する実装例

    export default async function Page() {
    
     // 画像フィールドのデータを取得
     const { image } = await client.getListDetail({
      endpoint: 'post',
      contentId: 'contentId',
     })
    
     // 取得した画像のURLにパラメータを追加
     const optimizedImage = `${image.url}?w=600`
    
     return <img src={optimizedImage} alt='' />
    }

### 複数画像フィールドの画像に適用する実装例

    export default async function Page() {
    
     // 複数画像フィールドのデータを取得
     const { images } = await client.getListDetail({
      endpoint: 'post',
      contentId: 'contentId',
     })
    
     // 複数画像フィールドで登録した各画像のURLにパラメータを追加
     const optimizedImages = images.map(image => `${image.url}?w=600`)
    
     return (
       <div>
        {optimizedImages.map((url, index) => (
         <img key={index} src={url} alt='' />
        ))}
      </div>
      )
    }

リッチエディタ内の画像への適用方法
-----------------

リッチエディタに登録したデータのレスポンスはHTML形式となるため、画像APIを適用するためには、画像URL部分を抜き出す必要があります。  
適用方法は、ヘルプ記事の「[リッチエディタ内の画像に対して、画像APIを適用したい](https://help.microcms.io/ja/knowledge/apply-image-api-in-rich-editor)」をご確認ください。

wパラメータとhパラメータに限り、リッチエディタの中で画像ごとに指定することができます。設定方法は、「[リッチエディタの操作方法](/manual/rich-editor-usage#h7b3c950f25)」をご確認ください。

主なパラメータ
-------

画像APIで使用できる主なパラメータは以下の通りです。これらのパラメータを組み合わせて使用することで、画像の形式、サイズ、品質を柔軟に調整できます。

https://document.microcms.io/image-api/size

https://document.microcms.io/image-api/quality

https://document.microcms.io/image-api/dpr

https://document.microcms.io/image-api/format

https://document.microcms.io/image-api/text

https://document.microcms.io/image-api/border