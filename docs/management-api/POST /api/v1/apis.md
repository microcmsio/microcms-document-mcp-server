---
contentId: post-apis
directory: management-api
---

# POST /api/v1/apis

サービスにAPIを作成するAPIです。

仕様
==

APIの形式や入力上限、契約プランに関する主な仕様は次のとおりです。

作成できるAPI
--------

*   API形式は、`list`（リスト形式）または `object`（オブジェクト形式）から選択できます。
*   APIの作成と同時に、フィールド定義を設定します。

APIの基本設定
--------

項目

制約

API名

サービス内で識別できる名前を指定します。

エンドポイント

サービス内で一意の値を指定します。既存のAPIと同じ値は使用できません。

フィールド数

*   `apiFields` は1件以上指定。件数上限なし
*   `customFields` は0〜99件指定可能

契約プランとAPI数上限
------------

*   一部のフィールド種別は、契約プランによって利用できない場合があります。
*   API数が契約プランの上限に達している場合、通常はAPIを作成できません。上限については[料金プランページ](https://microcms.io/pricing)をご覧ください。
*   追加料金による上限超過を許可する場合は、後述するクエリパラメータ `allowAdditionalCharge=true` を指定してください。

APIスキーマの互換性
-----------

リクエストとレスポンスには、APIスキーマ取得時と共通の形式を使用します。そのため、取得したAPIスキーマをもとに、別のサービスや環境へAPIを作成できます。  
APIスキーマ取得のマネジメントAPIについては「[GET /api/v1/apis/{endpoint}](/management-api/get-api-info)」をご確認ください。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

APIリクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「APIの作成」を有効にして、リクエストヘッダーに含めて送信してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/80fcfdcf672545b998ec93d9359d0729/CleanShot%202026-07-16%20at%2010.25.58%402x.png)

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

Content-Type
------------

送信するデータの形式を指定します。  
microCMSではJSON形式のデータのみ扱っているため、`application/json` と指定してください。

クエリパラメータ
========

allowAdditionalCharge
---------------------

API数が[契約プラン](https://microcms.io/pricing)の上限に達している場合に、**追加料金によるAPI作成を許可するか**を指定します。Teamプラン、Businessプラン、Enterpriseプランで利用できます。

値

説明

`false`

追加料金による作成を許可しません。パラメータ省略時の既定値です。

`true`

追加料金によるAPI作成を許可します。Teamプラン、Businessプラン、Enterpriseプランで利用できます。

APIを作成すると契約プランの上限を超過する場合、Teamプラン、Businessプラン、Enterpriseプランでは、`allowAdditionalCharge=true` が指定されていないと `402 Payment Required` が返却されます。  
HobbyプランおよびTemplateプランでは、`allowAdditionalCharge` の指定値にかかわらず `403 Forbidden` が返却されます。

リクエストボディ
========

APIの基本情報、APIフィールド、および必要に応じてカスタムフィールドを指定します。

トップレベル
------

プロパティ

型

指定要否

説明

`name`

string

必須

API名です。1〜300文字で指定します。

`endpoint`

string

必須

APIのエンドポイントです。3〜32文字の半角英小文字、数字、ハイフン（`-`）、アンダースコア（`_`）で指定します。同一サービス内で一意である必要があります。

`type`

string

必須

APIの形式です。`list` または `object` を指定します。

`apiFields`

array

必須

詳細は、下記の[apiFields](/management-api/post-apis#h06802863f3)をご覧ください。

`customFields`

array

任意

カスタムフィールドの定義です。`custom` または `repeater` のフィールドを利用する場合に指定します。  
詳細は、下記の[customFields](/management-api/post-apis#h34957f099a) をご覧ください。

未知のプロパティや、各フィールド種別で利用できないプロパティを指定した場合は、`400 Bad Request` が返却されます。

apiFields
---------

`apiFields` には、APIに作成するフィールドを配列で指定します。  
以降のセクションでは、各フィールドのJSONに指定可能なプロパティや制約を、フィールド種別ごとに説明します。

### 共通プロパティ

すべてのフィールドのJSONは、共通プロパティを持ちます。

#### JSONの例

    {
     "fieldId": "title",
     "name": "タイトル",
     "kind": "text",
     "description": "説明文",
     "required": true
    }

####   
プロパティの詳細

プロパティ

設定項目

型

指定要否

仕様/制約

`fieldId`

フィールドID

string

必須

*   2〜20文字
*   予約語 `id`, `createdAt`, `updatedAt`, `publishedAt`, `revisedAt`, `fieldId` は利用不可（大文字・小文字を区別せず判定されます）
*   半角英大文字・英小文字、数字、ハイフン（`-`）、アンダースコア（`_`）のみ利用可能
*   同一の `apiFields` 内で重複する `fieldId` は指定不可

`name`

表示名

string

必須

1〜100文字

`kind`

フィールド種別

enum

必須

指定できる値と対応するフィールドは下記の「kindプロパティに指定できる値と対応するフィールド」を参照

`description`

説明文

string | null

任意

*   空文字は指定不可
*   設定しない場合は、省略または `null` を指定

`required`

必須設定

boolean

任意

\-

#### kindプロパティに指定できる値と対応するフィールド

kindの値

フィールド

ドキュメント

`text`

テキストフィールド

[https://document.microcms.io/manual/text-field](https://document.microcms.io/manual/text-field)

`textArea`

テキストエリア

[https://document.microcms.io/manual/textarea](https://document.microcms.io/manual/textarea)

`richEditorV2`

リッチエディタ

[https://document.microcms.io/manual/rich-editor-usage](https://document.microcms.io/manual/rich-editor-usage)

`media`

画像

[https://document.microcms.io/manual/image](https://document.microcms.io/manual/image)

`mediaList`

複数画像

[https://document.microcms.io/manual/image-list](https://document.microcms.io/manual/image-list)

`file`

ファイル

[https://document.microcms.io/manual/file](https://document.microcms.io/manual/file)

`date`

日時

[https://document.microcms.io/manual/date](https://document.microcms.io/manual/date)

`number`

数字

[https://document.microcms.io/manual/number](https://document.microcms.io/manual/number)

`boolean`

真偽値

[https://document.microcms.io/manual/boolean](https://document.microcms.io/manual/boolean)

`select`

セレクトフィールド

[https://document.microcms.io/manual/select-field](https://document.microcms.io/manual/select-field)

`relation`

コンテンツ参照

[https://document.microcms.io/manual/relation](https://document.microcms.io/manual/relation)

`relationList`

複数コンテンツ参照

[https://document.microcms.io/manual/relation-list](https://document.microcms.io/manual/relation-list)

`iframe`

拡張フィールド

[https://document.microcms.io/manual/field-extension](https://document.microcms.io/manual/field-extension)

`custom`

カスタム

[https://document.microcms.io/manual/custom-field](https://document.microcms.io/manual/custom-field)

`repeater`

繰り返し

[https://document.microcms.io/manual/repeat-field](https://document.microcms.io/manual/repeat-field)

  

### テキストフィールド

#### JSONの例

    {
      "fieldId": "title",
      "name": "タイトル",
      "kind": "text",
    　"description": "記事のタイトルです",
      "required": true,
      "isUnique": false,
      "patternMatchValidation": {
        "regexp": { "pattern": "^[A-Za-z0-9]+$", "flags": "gi" }
      },
      "textSizeLimitValidation": {
        "textSize": { "min": 1, "max": 50 }
      },
      "initialValue": "初期値のテキスト"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`isUnique`

重複を許可しない（ユニーク）

boolean

任意

`true`にできるのは同一API内で5フィールドまで

`patternMatchValidation`

特定のパターンのみ入力を許可する

object | null

任意

\-

`patternMatchValidation.regexp.pattern`

パターン

string

任意

*   RE2互換の正規表現を指定
*   後読みやバックリファレンスなど、RE2でサポートされていない構文は指定不可

`patternMatchValidation.regexp.flags`

Flags

string | null

任意

*   `g`/`i`/`m`/`s`/`u`/`y` のみ指定可能
*   複数指定する場合は連結して指定（例：`gi` ）
*   検証結果に反映されるflagsは `i` 、 `m` 、 `s` のみ
*   `g` 、 `u` 、 `y` も指定可能だが、検証結果には影響しない
*   空文字は指定不可
*   設定しない場合は、省略または `null` を指定

`textSizeLimitValidation`

文字数を制限する

object | null

任意

制限を設定する場合は、 `textSize.min` または `textSize.max` の少なくとも一方に値を指定

`textSizeLimitValidation.textSize.min`

最小

number | null

任意

*   0以上の整数
*   `max` を指定する場合は `min <= max`

`textSizeLimitValidation.textSize.max`

最大

number | null

任意

*   1以上の整数
*   `min` を指定する場合は `max >= min`

`initialValue`

初期値

string | null

任意

*   1〜100文字で指定
*   空文字は指定不可
*   初期値を設定しない場合は、省略または `null` を指定

  

### テキストエリア

#### JSONの例

    {
      "fieldId": "body",
      "name": "本文",
      "kind": "textArea",
    　"description": "記事の本文です",
      "required": true,
      "patternMatchValidation": {
        "regexp": { "pattern": "^[A-Za-z0-9]+$", "flags": "gi" }
      },
      "textSizeLimitValidation": {
        "textSize": { "min": 0, "max": 1000 }
      }, 
    　"initialValue": "初期値の本文"
    }

  

#### プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`patternMatchValidation`

特定のパターンのみ入力を許可する

object | null

任意

\-

`patternMatchValidation.regexp.pattern`

パターン

string

任意

*   RE2互換の正規表現を指定
*   後読みやバックリファレンスなど、RE2でサポートされていない構文は指定不可

`patternMatchValidation.regexp.flags`

Flags

string | null

任意

*   `g`/`i`/`m`/`s`/`u`/`y` のみ指定可能
*   複数指定する場合は連結して指定（例：`gi` ）
*   検証結果に反映されるflagsは `i` 、 `m` 、 `s` のみ
*   `g` 、 `u` 、 `y` も指定可能だが、検証結果には影響しない
*   空文字は指定不可
*   設定しない場合は、省略または `null` を指定

`textSizeLimitValidation`

文字数を制限する

object | null

任意

制限を設定する場合は、 `textSize.min` または `textSize.max` の少なくとも一方に値を指定

`textSizeLimitValidation.textSize.min`

最小

number | null

任意

*   0以上の整数
*   `max` を指定する場合は `min <= max`

`textSizeLimitValidation.textSize.max`

最大

number | null

任意

*   1以上の整数
*   `min` を指定する場合は `max >= min`

`initialValue`

初期値

string | null

任意

*   1〜1,000文字で指定
*   空文字は指定不可
*   初期値を設定しない場合は、省略または `null` を指定

  

### リッチエディタ

#### JSONの例

    {
      "fieldId": "editor",
      "name": "リッチエディタ",
      "kind": "richEditorV2",
      "description": "記事の本文です",
      "required": true,
      "richEditorV2Options": ["paragraph", "bold", "link", "image", "color", "size"],
      "richEditorV2ColorList": [{ "id": "f7Kp_2mQx9", "value": "rgb(255, 0, 0)" }],
      "richEditorV2HideColorPicker": false,
      "richEditorV2FontSizeList": [{ "id": "a9X-3vLmQ2", "name": "Large", "value": "120" }],
      "customClassList": [{ "id": "N4cR_8zTp1", "name": "注釈", "value": "note" }]
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`richEditorV2Options`

ツールバーの編集

enum\[\]

任意

*   指定した装飾のみが有効（明示的に指定する場合は1件以上必要）
*   省略した場合は、設定可能なすべての装飾が有効になります。
*   指定できる値は「[richEditorV2Optionsプロパティに指定できる値と対応する装飾](/management-api/post-apis#h956e217ce8)」を参照
*   空配列 `[]` は指定不可
*   同じ値を重複して指定不可

`richEditorV2ColorList`

色のプリセット

object\[\]

任意

最大20件

`richEditorV2ColorList[].id`

内部識別子

string

任意

*   内部識別子
*   指定する場合は、半角英数字、アンダースコア（`_`）、ハイフン（`-`）からなる10文字の文字列を指定
*   省略した場合は、同じ形式のランダムなIDが自動生成される
*   空文字および `null` は指定不可
*   同一の `richEditorV2ColorList` 内で重複するIDは指定不可

`richEditorV2ColorList[].value`

色

string

条件付き必須

*   `richEditorV2ColorList` に要素を含める場合は必須。空文字は指定不可
*   `rgb(r, g, b)` または `rgba(r, g, b, a)` 形式の文字列を指定（※カンマの後に空白を入れる）
    *   例：`rgb(255, 0, 0)`、`rgba(255, 0, 0, 0.5)`

`richEditorV2HideColorPicker`

色のプリセットのみを表示し、カラーピッカーを非表示にする

boolean

任意

true にする場合は richEditorV2ColorList が1件以上必要

`richEditorV2FontSizeList`

文字サイズのプリセット

object\[\]

任意

最大20件

`richEditorV2FontSizeList[].id`

内部識別子

string

任意

*   内部識別子
*   指定する場合は、半角英数字、アンダースコア（`_`）、ハイフン（`-`）からなる10文字の文字列を指定
*   省略した場合は、同じ形式のランダムなIDが自動生成される
*   空文字および `null` は指定不可
*   同一の `richEditorV2FontSizeList` 内で重複するIDは指定不可

`richEditorV2FontSizeList[].name`

表示名

string

条件付き必須

*   `richEditorV2FontSizeList` に要素を含める場合は必須。空文字は指定不可
*   1文字以上

`richEditorV2FontSizeList[].value`

サイズ（%）

string

条件付き必須

*   `richEditorV2FontSizeList` に要素を含める場合は必須
*   1〜1000の整数文字列

`customClassList`

カスタムclass

object\[\]

任意

\-

`customClassList[].id`

内部識別子

string

任意

*   内部識別子
*   指定する場合は、半角英数字、アンダースコア（`_`）、ハイフン（`-`）からなる10文字の文字列を指定
*   省略した場合は、同じ形式のランダムなIDが自動生成される
*   空文字および `null` は指定不可
*   同一の `customClassList` 内で重複するIDは指定不可

`customClassList[].name`

表示名

string

条件付き必須

*   `customClassList` に要素を含める場合は必須。空文字は指定不可

`customClassList[].value`

class名

string

条件付き必須

*   `customClassList` に要素を含める場合は必須。空文字は指定不可

#### richEditorV2Optionsプロパティに指定できる値と対応する装飾

値

装飾/機能

`headerOne`

見出し1

`headerTwo`

見出し2

`headerThree`

見出し3

`headerFour`

見出し4

`headerFive`

見出し5

`paragraph`

段落

`bold`

太字

`italic`

斜体

`underline`

下線

`strike`

取り消し線

`code`

インラインコード

`blockquote`

引用

`codeBlock`

コードブロック

`listBullet`

箇条書き

`listOrdered`

番号付きリスト

`link`

リンク

`image`

画像

`file`

ファイル

`table`

表

`horizontalRule`

区切り線

`oembedly`

埋め込み（OEmbed）

`textAlign`

文字揃え

`customClass`

カスタムクラス

`color`

文字色

`size`

文字サイズ

`undo`、`redo`、`clean` は常に有効な固定項目であるため、`richEditorV2Options` には指定できません。指定した場合は `400 Bad Request` が返されます。また、GETおよび作成成功時のレスポンスにも含まれません。

  

### 画像

#### JSONの例

    {
      "fieldId": "thumbnail",
      "name": "サムネイル",
      "kind": "media",
      "description": "記事のサムネイル画像です",
      "required": true,
      "imageSizeValidation": { "imageSize": { "width": 600, "height": 400 } },
      "initialValue": "https://images.microcms-assets.io/assets/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy/image.jpg"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`imageSizeValidation`

画像のサイズ制限

object | null

任意

制限を設定する場合は、 `imageSize.width` または `imageSize.height` の少なくとも一方に値を指定

`imageSizeValidation.imageSize.width`

width

number | null

任意

1以上の整数

`imageSizeValidation.imageSize.height`

height

number | null

任意

1以上の整数

`initialValue`

初期値

string | null

任意

*   同一サービスにアップロードされた画像メディアのURLを指定。画像以外のメディアURLは指定不可
*   標準の画像配信ドメインに加えて、同一サービスに設定されたカスタムドメインのURLも指定可
*   空文字は指定不可
*   初期値を設定しない場合は、省略または `null` を指定

  

### 複数画像

#### JSONの例

    {
      "fieldId": "gallery",
      "name": "ギャラリー",
      "kind": "mediaList",
      "description": "記事内で使用するギャラリーの画像を複数選択",
      "required": false,
      "mediaListLayout": "GRID_3",
      "imageSizeValidation": { "imageSize": { "width": 400, "height": 600 } },
      "initialValue": [
        "https://images.microcms-assets.io/assets/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy/image-01.jpg",
        "https://images.microcms-assets.io/assets/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy/image-02.jpg"
      ]
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`mediaListLayout`

レイアウト

enum

任意

*   指定可能な値と対応するレイアウトは「[mediaListLayoutプロパティに指定できる値と対応する装飾](/management-api/post-apis#h16f6ce1319)」を参照
*   `mediaListLayout` を省略した場合は、`HORIZONTAL_SCROLL` が設定されます。 `null` は指定できません。

`imageSizeValidation`

画像のサイズ制限

object | null

任意

制限を設定する場合は、 `imageSize.width` または `imageSize.height` の少なくとも一方に値を指定

`imageSizeValidation.imageSize.width`

width

number | null

任意

1以上の整数

`imageSizeValidation.imageSize.height`

height

number | null

任意

1以上の整数

`initialValue`

初期値

string\[\]

任意

*   同一サービスにアップロードされた画像メディアのURLを指定。画像以外のメディアURLは指定不可
*   標準の画像配信ドメインに加えて、同一サービスに設定されたカスタムドメインのURLも指定可
*   最大5件まで指定可能
*   空文字および、`null` は指定不可
*   初期値を設定しない場合は省略または空配列 `[]` を指定する

#### mediaListLayoutプロパティに指定できる値と対応する装飾

値

レイアウト

`HORIZONTAL_SCROLL`

横並び（スクロール）

`GRID_2`

横並び（2カラム）

`GRID_3`

横並び（3カラム）

`GRID_4`

横並び（4カラム）

### ファイル

ファイルフィールドは、Teamプラン、Businessプラン、Enterpriseプランで利用できます。Hobbyプランでは利用できません。

###   

#### JSONの例

    {
      "fieldId": "attachment",
      "name": "添付ファイル",
      "kind": "file",
      "description": "記事内でダウンロードするファイル",
      "required": false,
      "initialValue": "https://files.microcms-assets.io/assets/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy/sample.pdf"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`initialValue`

初期値

string | null

任意

*   同一サービスにアップロードされたファイル（画像を含む）のURLを指定
*   標準のファイル配信ドメインに加えて、同一サービスに設定されたカスタムドメインのURLも指定可
*   空文字は指定不可
*   初期値を設定しない場合は、省略または `null` を指定

  

### 日時

#### JSONの例

    {
      "fieldId": "eventDate",
      "name": "開催日時",
      "kind": "date",
      "description": "コンテンツの日付です",
      "required": false,
      "dateFormat": true,
      "initialValue": "2026-07-03T09:00:00.000Z"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`dateFormat`

日付指定のみ

boolean

任意

*   `true`: 日付のみ
*   `false`: 日付と時刻

`initialValue`

初期値

string | null

任意

*   RFC 3339 形式の日時文字列を指定（例：`2026-08-05T00:00:00Z`）
*   日付のみの形式（例：`2026-08-05`）は指定不可
*   `dateFormat` が `true` の場合も同形式で指定

  

### 数字

#### JSONの例

    {
      "fieldId": "price",
      "name": "価格",
      "kind": "number",
      "description": "商品の価格です",
      "required": false,
      "numberSizeLimitValidation": { "numberSize": { "min": 100, "max": 10000 } },
      "initialValue": 10000
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`numberSizeLimitValidation`

数値を制限する

object | null

任意

制限を設定する場合は、 `numberSize.min` または `numberSize.max` の少なくとも一方に値を指定

`numberSizeLimitValidation.numberSize.min`

最小

number | null

任意

*   \-9007199254740991 ~ 9007199254740991 の範囲で整数を指定
*   `max`を指定する場合は`min <= max`

`numberSizeLimitValidation.numberSize.max`

最大

number | null

任意

*   \-9007199254740991 ~ 9007199254740991 の範囲で整数を指定
*   `min`を指定する場合は `max >= min`

`initialValue`

初期値

number | null

任意

*   \-9007199254740991 ~ 9007199254740991 の範囲で指定可能

  

### 真偽値

#### JSONの例

    {
      "fieldId": "isActive",
      "name": "有効",
      "kind": "boolean",
      "description": "真偽値です",
      "required": false,
      "initialValue":true
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`initialValue`

初期値

boolean

任意

\-

  

### セレクトフィールド

#### JSONの例

    {
      "fieldId": "category",
      "name": "カテゴリ",
      "kind": "select",
    　"description": "記事のカテゴリです",
      "required": true,
      "selectItems": [
        { "id": "0HGv33ahx5", "value": "ニュース" },
        { "id": "9zB0S7w-HU", "value": "ブログ" }
      ],
      "multipleSelect": false,
      "initialValue": ["9zB0S7w-HU"]
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`selectItems`

選択肢

object\[\]

必須

空配列を指定可能

`selectItems[].id`

内部識別子

string

任意

*   指定する場合は、半角英数字、アンダースコア（\_）、ハイフン（-）からなる10文字の文字列を指定
*   省略した場合は、同じ形式のランダムなIDが自動生成される
*   同一フィールド内で重複するIDは指定不可
*   `initialValue` から参照する場合は、IDの明示指定が必要
*   空文字および `null` は指定不可

`selectItems[].value`

選択肢の値

string

条件付き必須

`selectItems` に要素を含める場合は必須

`multipleSelect`

複数選択

boolean

必須

`true`にすると複数選択可能

`initialValue`

初期値

string\[\]

任意

*   `selectItems[].id` と一致する値、または `DEFAULT` を指定
*   同一の値は重複して指定不可
*   `multipleSelect` が `false` の場合は、1件のみ指定可能
*   空配列は指定不可
*   初期値を設定しない場合は、プロパティを省略するか、`["DEFAULT"]` を指定
*   省略した場合は `["DEFAULT"]` が設定される

  

### コンテンツ参照

#### JSONの例

    {
      "fieldId": "category",
      "name": "カテゴリ",
      "kind": "relation",
      "description": "記事に紐づくカテゴリです",
      "required": false,
      "referencedApiEndpoint": "categories",
      "listViewFieldId": "title"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`referencedApiEndpoint`

参照先API

string

必須

*   同一サービス内に存在する参照先APIのエンドポイントを指定
*   作成中のAPI自身のエンドポイントは指定不可
*   自己参照フィールドを作成する場合は、APIの作成後に設定

`listViewFieldId`

一覧画面に表示する項目

string

任意

*   参照先APIに存在するフィールドの `fieldId` を指定。フィールド種別は問いません
*   コンテンツIDを表示する場合は `DEFAULT` を指定
*   存在しない `fieldId` および空文字は指定不可
*   設定しない場合は省略

  

### 複数コンテンツ参照

#### JSONの例

    {
      "fieldId": "relatedArticles",
      "name": "関連記事",
      "kind": "relationList",
    　"description": "記事に紐づく関連記事です", 
    　"required": false,
      "relationListCountLimitValidation": {
        "relationListCount": { "min": 1, "max": 4 }
      },
      "referencedApiEndpoint": "articles",
      "listViewFieldId": "title"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`relationListCountLimitValidation`

複数コンテンツ参照の数を制限する

object | null

任意

制限を設定する場合は、 `relationListCount.min` または `relationListCount.max` の少なくとも一方に値を指定

`relationListCountLimitValidation.relationListCount.min`

最小

number | null

任意

*   0以上の整数
*   `max`を指定する場合は`min <= max`

`relationListCountLimitValidation.relationListCount.max`

最大

number | null

任意

*   1以上の整数
*   `min`を指定する場合は `max >= min`

`referencedApiEndpoint`

参照先API

string

必須

*   同一サービス内に存在する参照先APIのエンドポイントを指定
*   作成中のAPI自身のエンドポイントは指定不可
*   自己参照フィールドを作成する場合は、APIの作成後に設定

`listViewFieldId`

一覧画面に表示する項目

string

任意

*   参照先APIに存在するフィールドの `fieldId` を指定。フィールド種別は問いません
*   コンテンツIDを表示する場合は `DEFAULT` を指定
*   存在しない `fieldId` および空文字は指定不可
*   設定しない場合は省略

  

### 拡張フィールド

#### JSONの例

    {
      "fieldId": "embed",
      "name": "埋め込み",
      "kind": "iframe",
      "description": "外部ツールと連携する拡張フィールドです",
      "required": false,
      "iframeUrl": "https://example.com/embed"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`iframeUrl`

拡張フィールド URL

string

必須

http または https スキームを持ち、ホストを含むURL形式の文字列

  

### カスタム

`customFields`で定義したデータを紐付けます。

#### JSONの例

    {
      "fieldId": "authorProfile",
      "name": "著者プロフィール",
      "kind": "custom",
      "description": "著者プロフィールを入力するカスタムフィールドです",
      "required": false,
      "customFieldId": "profile",
      "listViewFieldId": "name"
    }

####   
プロパティの詳細

**プロパティ**

設定項目

**型**

指定要否

**仕様/制約**

`customFieldId`

対象のカスタムフィールド

string

必須

「[customFields](/management-api/post-apis#h34957f099a)」内にある対象データの `fieldId` を指定

`listViewFieldId`

一覧画面に表示する項目

string

任意

*   「[customFields](/management-api/post-apis#h34957f099a)」内にある対象データのフィールドの`fieldId`を指定。フィールド種別は問いません
*   デフォルトの表示項目を使用する場合は `DEFAULT` を指定
*   存在しない `fieldId` および空文字は指定不可
*   設定しない場合は省略

  

### 繰り返し

`customFields`で定義したデータを複数選択して紐付けます。

#### JSONの例

    {
      "fieldId": "items",
      "name": "セクション",
      "kind": "repeater",
      "description": "見出しや本文などのブロックを繰り返し入力できます",
      "required": false,
      "customFieldIds": [
        "headingBlock",
        "bodyBlock"
      ],
      "repeaterCountLimitValidation": {
        "repeatCount": { "min": 1, "max": 10 }
      }
    }

####   
プロパティの詳細

**プロパティ**

**設定項目**

**型**

指定要否

**仕様/制約**

`customFieldIds`

対象のカスタムフィールド

string\[\]

必須

*   1件以上必須
*   空配列は指定不可
*   `fieldId` の重複は不可
*   「[customFields](https://document.microcms.io/manual/export-and-import-api-schema#he3c372009c)」内にある対象データの`fieldId` を配列で指定

`repeaterCountLimitValidation`

繰り返しフィールドの数を制限する

object | null

任意

制限を設定する場合は、 `repeatCount.min` または `repeatCount.max` の少なくとも一方に値を指定

`repeaterCountLimitValidation.repeatCount.min`

最小

number

任意

*   0以上の整数
*   `max`を指定する場合は`min <= max`

`repeaterCountLimitValidation.repeatCount.max`

最大

number

任意

*   1以上の整数
*   `min`を指定する場合は`max >= min`

### 注意事項

*   `initialValue` の型がフィールド種別と一致しない場合は、対象のフィールドとプロパティを示す `400 Bad Request` が返却されます。
*   初期値を設定しない場合は、原則として `initialValue` 自体を省略してください。`null` を指定できるかどうかはプロパティによって異なります。
*   バリデーションを設定している場合、`initialValue` もその条件を満たす必要があります。文字数、正規表現、数値範囲などの条件を満たさない場合は、`400 Bad Request` が返却されます。

customFields
------------

`customFields` には、カスタムフィールドの定義を配列で指定します。  

### プロパティの詳細

プロパティ

設定項目

型

指定要否

仕様/制約

`customFields[].fieldId`

カスタムフィールドID

string

必須

*   2〜20文字で指定
*   予約語 `id`, `createdAt`, `updatedAt`, `publishedAt`, `revisedAt`, `fieldId` は利用不可（大文字・小文字を区別せず判定されます）
*   半角英大文字・英小文字、数字、ハイフン（`-`）、アンダースコア（`_`）のみ利用可能
*   同一の `customFields` 内で重複する `fieldId` は指定不可

`customFields[].name`

表示名

string

必須

1〜300文字で指定

`customFields[].fields`

フィールド定義

object\[\]

必須

1件以上指定。各フィールドの設定内容は [apiFields](/management-api/post-apis#h06802863f3) と同じ

`customFields[].fieldOrderByColumn`

カスタムフィールド内のレイアウト

string\[\]\[\]

必須

各フィールドの表示位置。詳細は「[レイアウトの指定方法](/management-api/post-apis#hd9ec1199ea)」を参照

  

### レイアウトの指定方法

**1列配置**  
すべてのフィールドを縦一列に並べる場合、配列を1つだけ内包します。

    "fieldOrderByColumn": [
      ["field01", "field02", "field03"] 
    ]

#### 2列配置

1つ目の配列が左列、2つ目の配列が右列に対応します。

    "fieldOrderByColumn": [
      ["field01", "field02"], // 左側に表示
      ["field03"]             // 右側に表示
    ]

#### その他、仕様

*   `fields` に含まれるすべての `fieldId` を重複や不足なく指定してください。
*   配列の要素数は1つ、または2つのみ指定可能です。それぞれ1カラム、2カラムに対応しています。3以上を指定するとエラーになります。

### 注意事項

*   `customFields` は最大99件まで指定できます。
*   `kind` が `custom` の場合は `customFieldId`、`repeater` の場合は `customFieldIds` に、同じリクエストの `customFields[].fieldId` を指定します。
*   `customFieldId` または `customFieldIds` に、`customFields` で定義されていないフィールドIDを指定した場合は、`400 Bad Request` が返却されます。
*   `customFields[].fields` には、1件以上のフィールドを指定します。空配列は指定できません。
*   カスタムフィールド内に、`custom` を指定することはできません。
*   `customFields[].fields[]` 内のテキストフィールドでは、`isUnique: true`を指定できません。`false` またはキー省略のみ指定可能です。

リクエスト例
======

以下は、リスト形式のAPIを作成する例です。

    curl -X POST "https://[サービスID].microcms-management.io/api/v1/apis" \
      -H "X-MICROCMS-API-KEY: [APIキー]" \
      -H "Content-Type: application/json" \
      -d '{
        "name": "ブログ",
        "endpoint": "blog",
        "type": "list",
        "apiFields": [
          {
            "fieldId": "title",
            "name": "タイトル",
            "kind": "text",
            "required": true,
            "initialValue": "無題"
          },
          {
            "fieldId": "price",
            "name": "価格",
            "kind": "number",
            "initialValue": 1000
          },
          {
            "fieldId": "published",
            "name": "公開",
            "kind": "boolean",
            "initialValue": true
          },
          {
            "fieldId": "thumbnail",
            "name": "サムネイル",
            "kind": "media",
            "initialValue": "https://images.microcms-assets.io/assets/xxxx/yyyy/sample.png"
          }
        ]
      }'

  

### カスタムフィールドを含む例

    curl -X POST "https://[サービスID].microcms-management.io/api/v1/apis" \
      -H "X-MICROCMS-API-KEY: [APIキー]" \
      -H "Content-Type: application/json" \
      -d '{
        "name": "製品紹介",
        "endpoint": "products",
        "type": "list",
        "apiFields": [
          {
            "fieldId": "productName",
            "name": "製品名",
            "kind": "text",
            "required": true,
            "isUnique": true
          },
          {
            "fieldId": "seo",
            "name": "SEO設定",
            "kind": "custom",
            "customFieldId": "seoSettings"
          },
          {
            "fieldId": "faq",
            "name": "よくある質問",
            "kind": "repeater",
            "customFieldIds": ["faqItem"],
            "repeaterCountLimitValidation": {
              "repeatCount": {
                "min": 1,
                "max": 20
              }
            }
          }
        ],
        "customFields": [
          {
            "fieldId": "seoSettings",
            "name": "SEO設定",
            "fields": [
              {
                "fieldId": "metaTitle",
                "name": "メタタイトル",
                "kind": "text",
                "required": true
              },
              {
                "fieldId": "metaDescription",
                "name": "説明",
                "kind": "textArea"
              }
            ],
            "fieldOrderByColumn": [
              ["metaTitle"],
              ["metaDescription"]
            ]
          },
          {
            "fieldId": "faqItem",
            "name": "FAQ項目",
            "fields": [
              {
                "fieldId": "question",
                "name": "質問",
                "kind": "text",
                "required": true
              },
              {
                "fieldId": "answer",
                "name": "回答",
                "kind": "richEditorV2",
                "richEditorV2Options": ["bold", "link", "listBullet"]
              }
            ],
            "fieldOrderByColumn": [
              ["question"],
              ["answer"]
            ]
          }
        ]
      }'

レスポンス
=====

正常にAPIを作成できた場合は、`201 Created` が返却されます。  
レスポンスボディは、作成したAPIのスキーマです。APIスキーマ取得時と同じ形式で返却されます。  
`apiFields` および `customFields[].fields` の各要素には、フィールド種別に対応するすべてのプロパティが含まれます。リクエスト時に省略したプロパティも、既定値または `null` で返却されます。

### レスポンスボディ

    {
      "name": "ブログ",
      "endpoint": "blog",
      "type": "list",
      "apiFields": [
        {
          "fieldId": "title",
          "name": "タイトル",
          "kind": "text",
          "description": null,
          "required": true,
          "textSizeLimitValidation": null,
          "patternMatchValidation": null,
          "isUnique": false,
          "initialValue": "無題"
        },
        {
          "fieldId": "price",
          "name": "価格",
          "kind": "number",
          "description": null,
          "required": false,
          "numberSizeLimitValidation": null,
          "initialValue": 1000
        },
        {
          "fieldId": "published",
          "name": "公開",
          "kind": "boolean",
          "description": null,
          "required": false,
          "initialValue": true
        },
        {
          "fieldId": "thumbnail",
          "name": "サムネイル",
          "kind": "media",
          "description": null,
          "required": false,
          "imageSizeValidation": null,
          "initialValue": "https://images.microcms-assets.io/assets/xxxx/yyyy/sample.png"
        }
      ],
      "customFields": []
    }

  

ステータスコード
========

ステータスコード

説明

`201 Created`

APIの作成に成功しました。

`400 Bad Request`

リクエストボディが不正です。必須項目の不足、型の不一致、未知のプロパティ、フィールド種別に対応しないプロパティなどが含まれます。

`402 Payment Required`

契約プランのAPI数上限に達しています。追加料金による作成を許可する場合は、`allowAdditionalCharge=true` を指定してください。

`403 Forbidden`

APIキーに「APIの作成」権限がない、または契約プランで利用できないフィールド種別が含まれています。

`409 Conflict`

同じエンドポイントのAPIがすでに存在します。

### エラーレスポンス例

たとえば、`text` フィールドの `initialValue` に数値を指定した場合は、次のようなレスポンスが返却されます。

    { "message": "field \"title\": \"initialValue\" must be of type string" }