---
contentId: get-content
directory: content-api
---

# GET /api/v1/{endpoint}/{content_id}

リスト型APIにおいて、idで指定したコンテンツを取得できるAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

GET APIリクエストの際に必要な認証キーです。  
デフォルト権限もしくは個別権限で「GET」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

クエリパラメータ
========

本APIにはパラメータを指定できます。

クエリパラメータを付与した上で、値を指定しなかった場合は、以下の挙動となります。

*   `depth` ：値に0を指定した場合と同様
*   `depth` 以外：クエリパラメータを指定しない場合と同様

draftKey
--------

下書き状態のコンテンツを取得するためのパラメータです。 コンテンツの編集画面で確認できる_draftKey_をパラメータとして追加してください。  
_draftKey_を使って取得できる下書きコンテンツは通常1つのみです。  
複数の下書き状態のコンテンツを同時に取得したい場合には、デフォルト権限もしくは個別権限で「下書き全取得」を有効にしてリクエストをしてください。  

fields
------

コンテンツの中で取得する要素を指定します。  
_fields=title,main\_image,updatedAt,author.name_のようにカンマ区切りで値を記載してください。_author.organization.name_のようにドットでつないでキーを指定することで参照コンテンツの要素も指定できます。_fields_が指定されていない場合は全ての要素を取得します。  

depth
-----

参照コンテンツを取得する階層の深さを指定します。  
最小値は`0`で、最大値は`3`です。  
デフォルト値は`1`です。  
  
例えば、ブログコンテンツに関連記事を表示するために、自分自身を循環参照しているとします。  
  
例）_depth = 0_の場合

    {
      "id": "id1",
      "title": "title1",
      "body": "body1",
      "related_blog": {
        "id": "id2"
      }
    }

  
例）_depth = 1_の場合

    {
      "id": "id1",
      "title": "title1",
      "body": "body1",
      "related_blog": {
        "id": "id2",
        "title": "title2",
        "body": "body2",
        "related_blog": {
          "id": "id3"
        }
      }
    }

  
例）_depth = 2_の場合

    {
      "id": "id1",
      "title": "title1",
      "body": "body1",
      "related_blog": {
        "id": "id2",
        "title": "title2",
        "body": "body2",
        "related_blog": {
          "id": "id3",
          "title": "title3",
          "body": "body3",
          "related_blog": {
            "id": "id4"
          }
        }
      }
    }

richEditorFormat
----------------

**旧リッチエディタ（非推奨）**のレスポンス形式を変更できます。  

### html（デフォルト）

richEditorFormatに `html` を指定した場合、HTMLとして取得できます。  
デフォルトの設定になっており、パラメータに何も指定しない場合もこちらが適用されます。  

    {
        "title": "更新情報",
        "content": "<h2 id=\"h5ca2740170\">Hello World</h2><p>リッチエディタのフォーマットを<strong>変更</strong>できるようになりました。<br><br><img src=\"https://images.microcms-assets.io/assets/9f54a34e853e4bee98b47ce18c0713f1/c22bcc0296204e81889119c2ffa9a883/domenico-loia-hGV2TfOh0ns-unsplash.jpg\" alt=\"\"><br></p>",
    }

### object

richEditorFormatに `object` を指定するとオブジェクト型で取得できます。  

    {
        "title": "更新情報",
        "content": {
            "contents": [
                {
                    "type": "block",
                    "value": [
                        {
                            "type": "text",
                            "value": "Hello World",
                            "attributes": {}
                        }
                    ],
                    "attributes": {
                        "header": 2
                    }
                },
                {
                    "type": "textBlock",
                    "value": [
                        {
                            "type": "text",
                            "value": "リッチエディタのフォーマットを",
                            "attributes": {}
                        },
                        {
                            "type": "text",
                            "value": "変更",
                            "attributes": {
                                "bold": true
                            }
                        },
                        {
                            "type": "text",
                            "value": "できるようになりました。",
                            "attributes": {}
                        },
                        {
                            "type": "text",
                            "value": "\n",
                            "attributes": {}
                        },
                        {
                            "type": "text",
                            "value": "\n",
                            "attributes": {}
                        }
                    ]
                },
                {
                    "type": "image",
                    "value": "https://images.microcms-assets.io/assets/9f54a34e853e4bee98b47ce18c0713f1/c22bcc0296204e81889119c2ffa9a883/domenico-loia-hGV2TfOh0ns-unsplash.jpg",
                    "attributes": {
                        "link": null,
                        "target": null,
                        "alt": null,
                        "width": 640,
                        "height": 427
                    }
                },
            ]
        },
    }

richEditorFormatは、リッチエディタには対応していません。

レスポンスボディ
========

以下、レスポンスの例です。

    {
      "id": "ywsd1lc_z",
      "createdAt": "2022-04-27T02:44:50.280Z",
      "updatedAt": "2022-04-27T02:44:50.280Z",
      "publishedAt": "2022-04-27T02:44:50.280Z",
      "revisedAt": "2022-04-27T02:44:50.280Z",
      "name": "更新情報"
    }

*   自動で付与されるコンテンツIDや日時情報については、「[コンテンツに自動付与される値](https://document.microcms.io/manual/automatic-grant-fields)」をご覧ください。
*   フィールドごとのレスポンス形式の詳細については、「[GET APIのフィールドごとのレスポンス形式](https://document.microcms.io/content-api/get-api-field-responses)」をご覧ください。

レスポンスヘッダ
========

一部のレスポンスヘッダのみ記載しています。記載の項目以外にも付与される項目がありますので、ご注意ください。

x-current-date-time
-------------------

レスポンス時のサーバーサイドの時刻の値です。フォーマットは`ISO 8601`です。

    x-current-date-time: 2023-01-01T00:00:00.000Z

エラーレスポンス
========

[コンテンツAPIのエラーレスポンス](/content-api/api-error-response)を参照ください。