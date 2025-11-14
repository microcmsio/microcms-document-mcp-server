---
contentId: post-content
directory: content-api
---

# POST /api/v1/{endpoint}

POST APIを用いることで、コンテンツの入稿をAPI経由で行うことができます。

*   **リスト形式のAPIのみ利用可能**です。**オブジェクト形式のAPIでは利用できません**ので、ご注意ください。
*   クエリパラメータを指定しない場合は、ステータスは**公開中**でコンテンツが作成されます。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

POST APIリクエストの際に必要な認証キーです。  
デフォルト権限もしくは個別権限で「POST」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

Content-Type
------------

送信するデータの形式を指定します。  
microCMSではJSON形式のデータのみ扱っているため、_application/json_と指定してください。

クエリパラメータ
========

status
------

下書き状態でコンテンツを作成するためのパラメータです。`status=draft`をパラメータとして追加してください。  

リクエストボディ
========

APIスキーマに沿って送信したい内容のJSONを用意し、文字列として渡してください。  
例：

    {"title":"サンプルタイトル","category": ["サンプルカテゴリ"]}

フィールド別の指定方法
-----------

### テキストフィールド

任意の文字列を指定してください。  
（例：`"テキスト1"`）  

### テキストエリア

改行コードを用いることで複数行の文字列を指定できます。  
（例：`"複数行のテキストを入力\n複数行のテキストを入力"`）  

### リッチエディタ

HTML文字列を用いることで装飾や画像を指定できます。詳しくは[リッチエディタのWRITE API](https://document.microcms.io/manual/rich-editor-write-api)をご覧ください。  
（例：`"<h1>見出し</h1><p>このようにHTMLで入稿できます</p>"`）  

### 旧リッチエディタ

改行コードを用いることで複数行の文字列を指定できます。  
（例：`"複数行のテキストを入力\n複数行のテキストを入力"`）  
  
**HTMLタグを付与した状態での登録は非対応**となります。  
※HTMLを登録した場合、以下のようにエスケープされます。  
`<p>テキスト1</p>` → `＆lt;p＆gt;テキスト1＆lt;/p＆gt;`  

### 画像

microCMSの同じサービスにアップロードされた画像のURLを指定してください。  
（例：`"https://images.microcms-assets.io/assets/xxxxxxxx/yyyyyyyy/sample.png"` ）  

#### 指定可能な画像URLについて

メディアのカスタムドメインが設定されている場合、カスタムドメインとデフォルトのドメイン（`microcms-assets.io`）の両方を受け付けられます。  
  
また、以下のように不正なURLを指定した場合はエラーになります。

*   microCMSにアップロードされたものでない画像のURL
*   microCMSの別サービスにアップロードされた画像のURL（※複数環境機能で作成したサービスも別サービス扱いとなります）

### 複数画像

microCMSの同じサービスにアップロードされた画像のURLを配列で指定してください。  
（例：`["https://images.microcms-assets.io/assets/xxxxxxxx/yyyyyyyy/sample1.png", "https://images.microcms-assets.io/assets/xxxxxxxx/yyyyyyyy/sample2.png"]`）  
  
指定可能な画像URLについては、画像フィールドと同様です。  

### 日時

ISO 形式 (ISO 8601) の文字列で指定してください。  
（例：`"2020-04-23T14:32:38.163Z"`）  

### 数字

数字を指定してください。  
（例：`123`）  

### 真偽値

真偽値を指定してください。  
（例：`true`）  

### セレクトフィールド

セレクトフィールドの要素を配列で指定してください。  
（例：`["要素1","要素2"]`）  

### コンテンツ参照

参照先コンテンツのcontentIdを指定してください。  
（例：`"参照先id"`）  

### 複数コンテンツ参照

参照先コンテンツのcontentIdを配列で指定してください。  
（例：`["参照先id1","参照先id2"]`）  

### カスタムフィールド

対象となるデータをオブジェクト形式で指定してください。`fieldId`とフィールドの値を含めてください。  
（例：`{ "fieldId": "YOUR_FIELD_ID", "some_value": "" }`）  

### 繰り返しフィールド

対象となるデータをカスタムフィールドの配列で指定してください。配列の各要素には、`fieldId`とフィールドの値を含めてください。  
例：

    [
      {
        "fieldId": "YOURFIRSTFIELDID",
        "sometext_value": ""
      },
      {
        "fieldId": "YOUR_SECOND_FIELD_ID",
        "some_int_value": 10
      }
    ]

  

### ファイル

microCMSの同じサービスにアップロードされたメディアのURLを指定してください。  
（例：`"https://files.microcms-assets.io/assets/xxxxxxxx/yyyyyyyy/manual.pdf"` ）  

#### 指定可能なファイルURLについて

メディアのカスタムドメインが設定されている場合、カスタムドメインとデフォルトのドメイン（`microcms-assets.io`）の両方を受け付けられます。  
  
また、以下のように不正なURLを指定した場合はエラーになります。

*   microCMSにアップロードされたものでないファイルのURL
*   microCMSの別サービスにアップロードされたファイルのURL（※複数環境機能で作成したサービスも別サービス扱いとなります）

### 拡張フィールド

対象となるデータ内容（message部分）をオブジェクト形式で指定してください。登録したいプロパティのみを指定できます。  
各値の詳細については、[拡張フィールド](/manual/field-extension)をご確認ください。  
例：

    {
      "id": "some-id",
      "title": "some-title",
      "description": "some-description",
      "imageUrl": "https://images.microcms-assets.io/assets/xxxx/yyyy/{fileName}.png",
      "updatedAt": "2024-01-01T00:00:00Z",
      "data": { "id": "123" }
    }

  

自動で付与されるフィールドの指定方法
------------------

### 公開日時（publishedAt）

ISO 形式 (ISO 8601) の文字列で指定してください。  
（例：`"2024-01-01T00:00:00Z"`）

フィールドを空値で登録する場合の指定方法
--------------------

POST APIにおいてフィールドの値を空値で登録したい場合、リクエストボディに**当該フィールドのキーを含めずにリクエスト**してください。

レスポンス
=====

正常にコンテンツを作成できた場合は`201`レスポンスが返却されます。

レスポンスボディ
--------

リクエストを正常に実行できた場合のレスポンスボディは以下のようになります。

    {
        "id": "someId"
    }

エラーレスポンス
========

[コンテンツAPIのエラーレスポンス](https://document.microcms.io/content-api/api-error-response)を参照ください。