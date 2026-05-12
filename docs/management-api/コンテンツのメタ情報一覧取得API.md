---
contentId: get-list-contents-management
directory: management-api
---

# GET /api/v1/contents/{endpoint}

リスト形式のAPIにおいてはコンテンツのメタ情報一覧が取得でき、オブジェクト形式のAPIにおいては単一コンテンツのメタ情報が取得ができます。  
  
オブジェクト形式のAPIの場合は`GET /api/v1/contents/{endpoint}/{content_id}`と同様の結果が得られます。

https://document.microcms.io/management-api/get-content

ここではリスト形式のAPIの場合におけるリクエストヘッダー、クエリパラメータについて解説します。  

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

マネジメントAPIのGET APIリクエストの際に必要な認証キーです。  
マネジメントAPIのデフォルト権限で「コンテンツの取得 (一覧・詳細)」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/8ce6f316efd744b28bf26c440d6e4242/CleanShot%202025-08-21%20at%2011.42.11.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

レスポンスボディ
========

こちらがマネジメントAPIで取得したコンテンツ一覧のレスポンス例です。

    {
      "contents": [
        {
          "id": "contentId",
          "createdAt": "2019-08-24T14:15:22Z",
          "updatedAt": "2019-08-24T14:15:22Z",
          "publishedAt": "2019-08-24T14:15:22Z", 
          "revisedAt": "2019-08-24T14:15:22Z",
          "closedAt": null,
          "status": [
            "DRAFT"
          ],
          "customStatus": null, 
          "draftKey": "draftKey",
          "createdBy": "681dcd71-b7b9-4149-b45b-5e96eb51fecf",
          "updatedBy": "681dcd71-b7b9-4149-b45b-5e96eb51fecf",
          "reservationTime": {
            "publishTime": "2019-08-24T14:15:22Z", 
            "stopTime": "2019-08-24T14:15:22Z"
          }
        }
      ],
      "totalCount": 1,
      "offset": 0,
      "limit": 10
    }

contentsについて
------------

取得したコンテンツの値は`contents`という配列で返されます。`contents`内のオブジェクトには以下の項目が含まれます。

値

説明

`id`

コンテンツのIDが入ります。

`createdAt`

コンテンツを作成した日時が入ります。

`updatedAt`

コンテンツを更新した日時が入ります。

`publishedAt`

コンテンツを公開した日時が入ります。一度も公開したことがない場合は`null`が入ります。

`revisedAt`

公開中のコンテンツが更新された日時が入ります。一度も公開したことがない場合は`null`が入ります。

`draftKey`

管理画面で取得できる下書きキー（draftKey）が入ります。コンテンツの公開時、公開終了時は`null`が入ります。

`closedAt`

公開終了の日時が入ります。一度も公開終了していない場合は`null`が入ります。

`status`

コンテンツのステータスが入ります。`DRAFT`,`PUBLISH`,`CLOSED`,`PUBLISH_AND_DRAFT`のいずれかが入ります。

`customStatus`

設定したカスタムステータスの情報が入ります。未設定の場合は`null`が入ります。詳細は「[カスタムステータス](https://document.microcms.io/management-api/get-list-contents-management#hb59515d0f5)」をご参照ください。

`createdBy`

コンテンツを作成したメンバーのIDが入ります。

`updatedBy`

コンテンツを最後に編集したメンバーのIDが入ります。

`reservationTime`

公開開始・公開終了予約に関する情報が入ります。

公開開始予約・公開終了予約のいずれも設定されていない場合は`null`が入ります。

公開開始予約または公開停止予約のいずれかが設定されている場合は、`publishTime`と`stopTime`が含まれます。予約が設定されている方には日時が入り、設定されていない方には`null`が入ります。

例：公開開始予約のみ設定されている場合

"reservationTime": { "publishTime": "2024-12-25T06:45:00Z", "stopTime": null }

### マネジメントAPIでのみ取得できる値

`contents`内のオブジェクトに含まれるマネジメントAPI特有の値は以下のとおりです。これらの値はコンテンツAPIには含まれません。

*   `closedAt`
*   `status`
*   `customStatus`
*   `createdBy`
*   `updatedBy`
*   `reservationTime`

クエリストリング
========

本APIにはクエリストリングを指定できます。  

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

カスタムステータス
=========

カスタムステータスが設定されたコンテンツでは以下のように `customStatus` がレスポンスに含まれます。

    {
      "id": "contentId",
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z",
      "publishedAt": "2019-08-24T14:15:22Z",
      "revisedAt": "2019-08-24T14:15:22Z",
      "status": [
        "PUBLISH"
      ],
      // このcustomStatusが新たに追加されます。
      // customStatusが未対応のプランや設定されていない場合はnullになります。
      "customStatus": [
        {
          "key": "USER_DEFINED_CUSTOM_STATUS_KEY123",
          "description": "ユーザが定義したカスタムステータスです。",
          "name": "カスタムステータスのテスト",
          "behaviour": "PUBLISH",
          "color": "#a20063",
          "createdAt": "2019-08-24T14:15:22Z",
          "updatedAt": "2019-08-24T14:15:22Z"
        }
      ],
      "draftKey": "draftKey",
      "createdBy": "681dcd71-b7b9-4149-b45b-5e96eb51fecf",
      "updatedBy": "681dcd71-b7b9-4149-b45b-5e96eb51fecf",
      "reservationTime": {
        "publishTime": "2019-08-24T14:15:22Z",
        "stopTime": "2019-08-24T14:15:22Z"
      }
    }

  
カスタムステータスについて詳しくは以下ドキュメントをご覧ください。

https://document.microcms.io/manual/custom-status