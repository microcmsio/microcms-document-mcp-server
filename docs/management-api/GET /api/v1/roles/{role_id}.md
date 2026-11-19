---
contentId: get-role
directory: management-api
---

# GET /api/v1/roles/{role_id}

任意のロールの詳細情報を取得できるAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

リクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「ロールの取得（一覧・詳細）」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

パスパラメータ
=======

role\_id
--------

取得するロールのIDを指定してください。  
ロールIDは、ロール一覧取得APIのレスポンスの`id`から確認可能です。なお、`ROLE#` の接頭辞は不要です。

レスポンス
=====

ステータスコード
--------

正常に取得できた場合は、`200` レスポンスが返却されます。  
エラー時のステータスコードについては、「[マネジメントAPIのエラーレスポンス」](/management-api/management-api-error-response)をご覧ください。

レスポンスボディ
--------

正常に取得できた場合は、以下のようなレスポンスが返却されます。

    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "コンテンツ編集者",
      "isAdmin": false,
      "permissions": {
        "defaultPermissions": { ... },
        "individualPermissions": [ ... ]
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }

レスポンスには以下のデータが含まれます。

値

説明

`id`

ロールのIDです。

`name`

ロール名です。

`isAdmin`

管理者ロールかどうかを示します。  
`true`：管理者ロール、`false`：管理者ロール以外

`permissions`

`defaultPermissions`

デフォルト権限の設定です。

`individualPermissions`

API個別権限の設定です。  
APIごとの権限設定の配列で、未設定の場合は空の配列（`[]`）となります。

`createdAt`

ロールの作成日時です。

`updatedAt`

ロールの更新日時です。

`permissions`には、管理画面のロール設定画面に表示される内容と同じ権限設定が返却されます。  
管理者ロールの場合は、すべての権限が有効な状態で返却され、`individualPermissions`は常に空の配列（`[]`）となります。

### 権限の詳細

`permissions` 内の各キーの内容は以下のとおりです。説明欄は、管理画面のロール設定画面での項目名に対応しています。  
キー列は、JSONの階層ごとに列を分けて表示しています。左の列から順に「.」でつなげたものが、実際のキーになります。  
例：`members` → `read` → `level` は `members.read.level` を表し、レスポンスでは次のようになります。

    "members": {
      "read": {
        "level": "ALL"
      }
    }

#### defaultPermissions（デフォルト権限）

キー

型

説明

`members`

`read`

`level`

string

メンバーの読み取り権限  
・`ALL`：すべてのメンバー  
・`SAME_ROLE`：このロールが付与されているメンバー  
・`SPECIFIC`：任意のメンバーのみ  
・`NONE`：なし

`memberIds`

array

閲覧できるメンバーのID  
`members.read.level`が`SPECIFIC`の場合のみ返却されます。  
メンバーが指定されていない場合は空の配列（`[]`）となります。

`create`

boolean

メンバーの招待

`update`

boolean

メンバーに紐づくロールの変更

`delete`

boolean

メンバーの削除

`roles`

`read`

`level`

string

ロールの読み取り権限  
・`ALL`：すべてのロール  
・`SAME_ROLE`：自分が所属するロールのみ  
・`NONE`：なし

`create`

boolean

ロールの作成

`update`

boolean

権限内容の変更

`delete`

boolean

ロールの削除

`billing`

`read`

boolean

お支払い設定画面へのアクセス

`update`

boolean

プランの変更とクレジットカードの変更

`apiKeys`

`read`

boolean

APIキー設定画面へのアクセス

`usage`

`read`

boolean

利用量確認  
（データ転送量確認画面とAPIリクエスト数確認画面へのアクセス）

`environments`

`read`

`level`

string

環境の読み取り権限  
・`ALL`：すべての環境  
・`URL_ONLY`：URLを知っている環境のみ（非推奨）  
・`RESTRICTED`：任意の環境のみ  
・`NONE`：なし

`serviceIds`

array

閲覧できる環境のサービスID  
`environments.read.level`が`RESTRICTED`の場合のみ返却されます。

`create`

boolean

環境の作成

`delete`

boolean

環境の削除

`reviews`

object

レビューに関する権限  
詳細は「[reviewsの詳細](/management-api/get-role#hba95484a36)」をご覧ください。

`media`

`read`

`level`

string

メディアの読み取り権限  
・`ALL`：すべてのメディア  
・`SAME_ROLE`：このロールのメンバーが作成したメディアのみ  
・`CREATED`：自分がアップロードしたメディアのみ  
・`NONE`：なし

`create`

boolean

アップロード

`update`

boolean

ファイル名 / 代替テキストの編集  
再アップロード / メディアタグのセット

`delete`

boolean

メディアの削除

`api`

`read`

boolean

APIの読み取り  
（サイドバーの表示やコンテンツ参照など）

`create`

boolean

APIの作成

`update`

boolean

API設定全般と  
カスタムフィールドの作成 / 編集 / 削除

`delete`

boolean

APIの削除

`content`

object

コンテンツに関する権限  
詳細は「[contentの詳細](/management-api/get-role#h0958d64e4a)」をご覧ください。

`developerMenu`

`read`

boolean

開発者向け設定の表示

#### individualPermissions（個別権限）

API単位で設定された個別権限の配列です。個別権限が設定されていない場合は空の配列（`[]`）となります。  
配列の各要素は以下のとおりです。

キー

型

説明

`apiId`

string

対象APIのエンドポイント

`api`

`read`

boolean

APIの読み取り  
（サイドバーの表示やコンテンツ参照など）

`update`

boolean

API設定全般と  
カスタムフィールドの作成 / 編集 / 削除

`delete`

boolean

APIの削除

`content`

object

コンテンツに関する権限  
詳細は「[contentの詳細](/management-api/get-role#h0958d64e4a)」をご覧ください。

`developerMenu`

`read`

boolean

開発者向け設定の表示

`reviews`

object

レビューに関する権限  
詳細は「[reviewsの詳細](/management-api/get-role#hba95484a36)」をご覧ください。

#### contentの詳細

`defaultPermissions.content`と`individualPermissions[].content`で共通です。

キー

型

説明

`read`

`level`

string

コンテンツの読み取り権限  
・`ALL`：すべてのコンテンツ  
・`SAME_ROLE`：このロールのメンバーが作成したコンテンツのみ  
・`CREATED`：自分が作成したコンテンツのみ  
・`NONE`：なし

`create`

`draft`

boolean

下書き保存

`publish`

boolean

公開

`update`

`saveDraft`

boolean

下書き保存

`removeDraft`

boolean

下書きの破棄

`revertToDraftUnpublished`

boolean

非公開コンテンツを下書きに戻す

`changeContentIdUnpublished`

boolean

非公開コンテンツのコンテンツID変更

`reorderUnpublished`

boolean

非公開コンテンツの並び替え

`changePublicationDateUnpublished`

boolean

非公開コンテンツの公開日時の変更

`changeAuthor`

boolean

コンテンツ作成者の変更

`changeDraftKey`

boolean

draftKeyの変更

`publish`

boolean

未承認のコンテンツを公開 / 公開予約

`publishApproved`

boolean

承認済みのコンテンツを公開 / 公開予約

`unpublish`

boolean

未承認のコンテンツを公開終了 / 公開終了予約

`unpublishApproved`

boolean

承認済みのコンテンツを公開終了 / 公開終了予約

`revertToDraft`

boolean

公開中コンテンツを下書きに戻す

`changeContentIdPublished`

boolean

公開中コンテンツのコンテンツID変更

`reorderPublished`

boolean

公開中コンテンツの並び替え

`changePublicationDatePublished`

boolean

公開中コンテンツの公開日時の変更

`delete`

boolean

コンテンツの削除

#### reviewsの詳細

`defaultPermissions.reviews`と`individualPermissions[].reviews`で共通です。

キー

型

説明

`read`

`level`

string

レビュー申請の読み取り権限  
・`ALL`：すべてのレビュー申請  
・`SAME_ROLE`：このロールのメンバーが作成したレビューのみ  
・`CREATED`：自分が作成したレビュー申請のみ  
・`NONE`：なし

`create`

boolean

レビュー申請

`update`

`level`

string

レビュー申請の編集権限  
・`ALL`：承認 + 編集  
・`EDIT`：編集  
・`NONE`：なし

エラーレスポンス
========

「[マネジメントAPIのエラーレスポンス](/management-api/management-api-error-response)」を参照ください。

制約事項
====

複数環境での利用
--------

複数環境機能で作成した環境へのリクエストには対応していません。