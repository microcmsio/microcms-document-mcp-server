---
contentId: api-preview
directory: manual
---

# APIプレビュー

APIプレビュー機能では、コンテンツAPIのリクエストを管理画面上で実際に試すことができます。

APIプレビューは、マネジメントAPIには対応していません。

事前準備
====

APIキーの作成
--------

APIプレビューを利用する場合、**呼び出すメソッドの権限が付与されたAPIキーが1つ以上作成されている必要**があります。  
  
![](https://images.microcms-assets.io/assets/3b0c1efa25494f86a2b587c7a04652b3/00e98ad148e649d5b7aaba9f0bd25869/CleanShot%202024-09-06%20at%2014.43.30%402x.png)  
  
APIキーの作成や権限設定については、以下のドキュメントをご参照ください。  
[APIキー（APIの認証と権限管理）](/content-api/x-microcms-api-key#hba32958c26)

APIキーの読み取り権限の付与
---------------

APIプレビューを利用する場合、**APIキーの読み取り権限**が付与されたロールが必要となります。  
  
設定箇所については、以下のドキュメントをご参照ください。  
[ロール（管理画面の権限管理） > APIキー](/manual/roles#hd5e76a6c68)

APIプレビューの使い方
============

### 1\. ［APIプレビュー］ボタンをクリックする

コンテンツ一覧画面もしくはコンテンツ編集画面で**［APIプレビュー］**ボタンをクリックします。  
  
![](https://images.microcms-assets.io/assets/3b0c1efa25494f86a2b587c7a04652b3/5ba15645cc384e4b837bdb2680b9f197/CleanShot%202024-09-05%20at%2016.52.31%402x.png)  

### 2\. メソッドやクエリパラメータ、リクエストボディなどを指定する

APIプレビューの操作メニューが表示されるので、プレビューしたいメソッドやクエリパラメータ、リクエストボディを指定します。  
  
![](https://images.microcms-assets.io/assets/3b0c1efa25494f86a2b587c7a04652b3/a459f9f84482456e87f07777e0cc0584/CleanShot%202024-09-05%20at%2016.52.49%402x.png)  

### 3\. ［取得］をクリックする

リクエスト情報を指定したら、右上の**［取得］（GET以外は［送信］）**ボタンをクリックします。  
すると、リクエスト内容に応じたレスポンス（ステータスコード、レスポンスボディ）が表示されます。  
  
![](https://images.microcms-assets.io/assets/3b0c1efa25494f86a2b587c7a04652b3/ac73a92130f04cb6a9c0ca7e1754e9ec/CleanShot%202024-09-05%20at%2016.58.05%402x.png)

GET以外のメソッドでは、APIプレビューを実行すると、実際にコンテンツが登録されたり、削除されたりします。本番環境でお使いの場合は十分にご注意ください。

操作メニューの説明
---------

APIプレビューの操作メニューについて説明します。  
  
![](https://images.microcms-assets.io/assets/3b0c1efa25494f86a2b587c7a04652b3/470f71926b5946d0b4da5a3d33fa9c0b/CleanShot%202024-09-06%20at%2011.29.02%402x.png)  

### 1\. メソッド

HTTPリクエストのメソッド（GET／POST／PUT／PATCH／DELETE）を選択できます。  
コンテンツ一覧画面かコンテンツ編集画面かによって利用できるメソッドは異なります。詳細は、下記のメソッドごとの説明を参照してください。

### 2\. エンドポイント

プルダウンメニューでエンドポイントを選択したり、自由に入力したりできます。  
※自由入力はPUTメソッドのみ

### 3\. リクエストヘッダ（Headers）

リクエスト時に付与されるリクエストヘッダの一部が表示されます。この操作メニュー内では変更できません。

#### X-MICROCMS-API-KEYについて

サービス内のAPIキーのなかで、**該当メソッドの権限が付与されているものが自動でセット**されます。セットできるAPIキーがない場合、必要な権限を付与したAPIキーを作成してください。  
利用できるAPIキーが複数ある場合、セットされるAPIキーは不定となります。

### 4\. クエリパラメータ（Params）

リクエスト時に付与したいクエリパラメータを設定できます。  
Keyではメソッドごとに有効な値のみを選択できます。Valueでは任意の値を指定できます。

### 5\. リクエストボディ（Body）

任意のリクエストボディを指定できます。JSON形式で入力してください。  
**［reset］**ボタンをクリックすると、入力内容が初期値に戻ります。

### 6\. 言語選択メニュー

設定されたクエリパラメータやリクエストボディを元に、プログラミング言語ごとの記載方法を確認できます。  
curl, JavaScript, Ruby, Python, iOS, Androidなどが指定できます。

### 7\. 送信（取得）ボタン

送信ボタン（GETメソッドの場合は**［取得］**ボタン）をクリックすると、実際にリクエストが送信されます。

  
以降、コンテンツAPIの各種メソッドの使い方を説明します。  

GETメソッド
-------

### 対象画面

*   コンテンツ一覧画面
*   コンテンツ編集画面

### クエリパラメータ（Params）

GETメソッドで利用できるクエリパラメータを指定できます。  
「Params」セクションの表内にある**［+］**ボタンをクリックして、任意のクエリパラメータを追加してください。  
  
![](https://images.microcms-assets.io/assets/3b0c1efa25494f86a2b587c7a04652b3/75f6bffe9e8341b8812cee811f32ed88/CleanShot%202024-09-05%20at%2017.30.50%402x.png)  
  
付与できるクエリパラメータは以下のページを参照してください。

*   [GET /api/v1/{endpoint}](https://document.microcms.io/content-api/get-list-contents#h929d25d495)
*   [GET /api/v1/{endpoint}/{content\_id}](https://document.microcms.io/content-api/get-content#h929d25d495)

### レスポンス

登録されているコンテンツ内容に応じてレスポンスが返却されます。その他、詳細は以下のページを参照してください。  
[GET /api/v1/{endpoint}](https://document.microcms.io/content-api/get-list-contents#h8a4c320d89)

  

POSTメソッド
--------

### 対象画面

*   コンテンツ一覧画面

### クエリパラメータ（Params）

特定のクエリパラメータを指定できます。クエリパラメータの詳細については、以下のページを参照してください。  
[POST /api/v1/{endpoint}](https://document.microcms.io/content-api/post-content#h929d25d495)

### Body（リクエストボディ）

任意のリクエストボディを指定できます。リクエストボディの詳細については、以下のページを参照してください。  
[POST /api/v1/{endpoint}](https://document.microcms.io/content-api/post-content#h44fdca3bb7)

### レスポンス

リクエストに対するレスポンスが返却されます。レスポンスの詳細については、以下のページを参照してください。  
[POST /api/v1/{endpoint}](https://document.microcms.io/content-api/post-content#h0c0b84b0b7)

  

PUTメソッド
-------

### 対象画面

*   コンテンツ一覧画面
*   コンテンツ編集画面

### エンドポイント

PUTメソッドでコンテンツを登録する際、任意のコンテンツIDをエンドポイントに含める必要があります。

#### コンテンツ一覧画面の場合

コンテンツ一覧画面では、そのAPIのエンドポイントのみが入力されています。追加したいコンテンツのIDを `/` の後に入力してください。  
  
![](https://images.microcms-assets.io/assets/3b0c1efa25494f86a2b587c7a04652b3/f481c0bb80c94ea0a1977c59210eaf8d/CleanShot%202024-09-05%20at%2018.21.38%402x.png)  

#### コンテンツ編集画面の場合

コンテンツ編集画面では、編集画面として開いているコンテンツのIDがすでに入力されています。任意のコンテンツIDに変更してください。

### クエリパラメータ（Params）

特定のクエリパラメータを指定できます。クエリパラメータの詳細については、以下のページを参照してください。  
[PUT /api/v1/{endpoint}](https://document.microcms.io/content-api/put-content#h929d25d495)

### Body（リクエストボディ）

任意のリクエストボディを指定できます。リクエストボディの詳細については、以下のページを参照してください。  
[PUT /api/v1/{endpoint}](https://document.microcms.io/content-api/put-content#h44fdca3bb7)

### レスポンス

リクエストに対するレスポンスが返却されます。レスポンスの詳細については、以下のページを参照してください。  
[PUT /api/v1/{endpoint}](https://document.microcms.io/content-api/put-content#h0c0b84b0b7)

  

PATCHメソッド
---------

### 対象画面

*   コンテンツ編集画面

### Body（リクエストボディ）

任意のリクエストボディを指定できます。リクエストボディの詳細については、以下のページを参照してください。  
[PATCH /api/v1/{endpoint}/{content\_id}](https://document.microcms.io/content-api/patch-content#h44fdca3bb7)

### レスポンス

リクエストに対するレスポンスが返却されます。レスポンスの詳細については、以下のページを参照してください。  
[PATCH /api/v1/{endpoint}/{content\_id}](https://document.microcms.io/content-api/patch-content#h0c0b84b0b7)

  

DELETEメソッド
----------

### 対象画面

*   コンテンツ編集画面

### レスポンス

リクエストに対するレスポンスが返却されます。レスポンスの詳細については、以下のページを参照してください。  
[DELETE /api/v1/{endpoint}/{content\_id}](https://document.microcms.io/content-api/delete-content#h0c0b84b0b7)

DELETEメソッドでAPIプレビューを実行した際にも、実際にAPIリクエストが送られコンテンツが削除されます。ご利用の際はご注意ください。