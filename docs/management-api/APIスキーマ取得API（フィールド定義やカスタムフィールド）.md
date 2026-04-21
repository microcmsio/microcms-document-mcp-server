---
contentId: get-api-info
directory: management-api
---

# GET /api/v1/apis/{endpoint}

指定したAPIのスキーマ情報（フィールド定義やカスタムフィールドの構成）を取得できるAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

マネジメントAPIのGET APIリクエストの際に必要な認証キーです。  
マネジメントAPIのデフォルト権限で「API情報の取得」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/d5f0d65010ff41ac943e3b6b0b13827b/CleanShot%202025-09-25%20at%2015.20.49.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

レスポンスボディ
========

基本的には、[APIスキーマのエクスポート](/manual/export-and-import-api-schema#hce5de2e41a)でエクスポートしたJSONと同様のデータがレスポンスとして返却されます。  
こちらがマネジメントAPIで取得したAPI情報のレスポンス例です。

    {
      "apiFields": [
        {
          "fieldId": "title",
          "name": "タイトル",
          "kind": "text",
          "required": false
        },
        {
          "fieldId": "body",
          "name": "本文",
          "kind": "richEditorV2",
          "required": false
        },
        {
          "fieldId": "tags",
          "name": "タグ",
          "kind": "select",
          "required": false,
          "multipleSelect": true,
          "selectInitialValue": [],
          "selectItems": [
            {
              "id": "Hc1QzudmqV",
              "value": "更新情報"
            },
            {
              "id": "Fx0fDbBj7S",
              "value": "チュートリアル"
            },
            {
              "id": "_SczHMUJgH",
              "value": "お知らせ"
            }
          ]
        },
        {
          "fieldId": "image",
          "name": "画像",
          "kind": "custom",
          "required": false,
          "customFieldCreatedAt": "2025-09-26T06:21:39.128Z"
        }
        {
          "fieldId": "category",
          "name": "カテゴリ",
          "kind": "relation",
          "required": false,
          "referencedApiEndpoint": "categories"
        }
      ],
      "customFields": [
        {
          "createdAt": "2025-09-26T06:21:39.128Z",
          "fieldId": "image-w-name",
          "name": "名前付き画像",
          "fields": [
            {
              "idValue": "7d5MaoOs3o",
              "fieldId": "name",
              "name": "名前",
              "kind": "text",
              "required": false
            },
            {
              "idValue": "bFhsk2ZidD",
              "fieldId": "image",
              "name": "画像",
              "kind": "media",
              "required": false
            }
          ],
          "position": [
            [
              "7d5MaoOs3o",
              "bFhsk2ZidD"
            ]
          ],
          "updatedAt": "2025-09-26T06:22:22.33Z"
        }
      ]
    }

### マネジメントAPIでのみ取得できる値

*   マネジメントAPIでは、コンテンツ参照・複数コンテンツ参照の参照先APIのエンドポイントを`referencedApiEndpoint` として取得できます。
    *   ただし、取得したデータをAPIインポートでインポートする場合、この値は無視されます。

*   管理画面のAPIエクスポートでエクスポートしたAPIスキーマのJSONとは、キーの並び順などが異なることがあります。