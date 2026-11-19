---
contentId: management-api-error-response
directory: management-api
---

# マネジメントAPIのエラーレスポンス

マネジメントAPIへのリクエスト時に発生するエラーについて種別ごとにまとめます。

下記に示す情報は、エラー時の全てのステータスコードを網羅することを保証していません。予期せぬ不具合や考慮の漏れにより、その他のエラーも発生する可能性がございます。あらかじめご了承ください。

エラー発生時のレスポンスボディ
===============

マネジメントAPIのエラーレスポンスには、レスポンスボディに以下のようなメッセージが含まれる場合があります。  

    {
        message: "some message"
    }

エラーメッセージは、予告なく変更される可能性がございます。エラーメッセージを元にしたハンドリングは行わないよう、ご注意ください。

エラーレスポンスの一覧
===========

共通のエラーレスポンス
-----------

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`IP address rejected.`

許可されていないIPアドレスからのリクエストです。[APIのIP制限の設定](https://document.microcms.io/manual/api-ip-restriction)を確認し、許可されているIPアドレスからリクエストしてください。

403 Forbidden

`Forbidden`

マネジメントAPIによる操作が許可されていません。APIキーが正しく設定されているか、[APIキー設定](https://document.microcms.io/content-api/x-microcms-api-key#hc11b4c1bca)で権限が付与されているかを確認してください。

404 Not Found

`Not Found`

リクエストのURLが誤っています。URLの誤字などがないか確認してください。

429 Too Many Requests

`Too Many Requests`

[APIの呼び出し回数に関する制限](https://document.microcms.io/manual/limitations#h0f65c647eb)を超過しています。

500 Internal Server Error

`Internal Server Error`

サーバー側で予期せぬエラーが生じています。

コンテンツ操作のエラーレスポンス
----------------

### GETメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`Limit: must be no less than 0.`

`limit`パラメータに0より小さい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`limit must be less than or equal to 100`

`limit`パラメータに100より大きい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Invalid integer in query (limit=xxx)`

`limit`パラメータに不正な値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Offset: must be no less than 0`

`offset`パラメータに0より小さい値が指定されています。0以上の数値を指定してください。

400 Bad Request

`Invalid integer in query (offset=xxx)`

`offset`パラメータに不正な値が指定されています。0以上の数値を指定してください。

404 Not Found

`Content not found`

取得対象のコンテンツが存在しません。指定したコンテンツIDが正しいか確認してください。

### PUTメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`invalid request body`

ボディに不正な値が指定されています。ボディの内容を確認してください。

400 Bad Request

`Past dates and times cannot be set as the reserved open date and time`

公開予約に過去日時が指定されています。現在時刻より未来の値を指定してください。

400 Bad Request

`Past date and time cannot be set as the date and time to stop publishing reservations`

公開終了予約に過去日時が指定されています。現在時刻より未来の値を指定してください。

400 Bad Request

`Cannot set publish or close schedule while under review`

レビュー申請中のコンテンツに予約を設定しようとしています。レビューを完了/取り下げてから予約設定をしてください。

400 Bad Request

`Cannot be reserved for the public because it has already been published`

公開中コンテンツに公開開始予約だけを指定しています。公開終了予約を先に設定するか、ボディから公開開始予約の指定を外してください。

400 Bad Request

`Reservations to start publishing must be set after reservations to stop publishing if the content is being published`

コンテンツが公開中の場合、公開開始予約は公開終了予約より後に設定する必要があります。公開終了予約を先、公開開始予約を後の日時に指定してください。

400 Bad Request

`Cannot be reserved to stop publication while drafting`

下書きコンテンツに公開終了予約だけ指定しています。公開開始予約も設定するか、ボディから公開終了予約を外してください。

400 Bad Request

`Reservations to stop publishing must be set after reservations to start publishing if content is in draft`

下書きコンテンツの公開終了予約は公開開始予約より後に設定する必要があります。公開開始予約を先、公開終了予約を後の日時に指定してください。

400 Bad Request

`Cannot be reserved to stop publication if the content is closed to the public`

公開終了コンテンツに公開終了予約だけを指定しています。公開開始予約も設定するか、ボディから公開終了予約を外してください。

400 Bad Request

`Reservations to stop publishing must be set after reservations to start publishing if the content is closed to the public`

公開終了コンテンツに指定する開始/終了予約の順序が不正です。公開開始予約を先、公開終了予約を後の日時に設定してください。

### PATCHメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`Status: (0: must be a valid value.).`

ボディに不正な値が指定されています。ボディの内容を確認してください。

400 Bad Request

`Status: the length must be exactly 1.`

ボディに不正な値が指定されています。ボディの内容を確認してください。

400 Bad Request

`invalid user id`

ボディに不正なユーザーIDが指定されています。存在するユーザーIDを指定してください。

400 Bad Request

`Request body is not JSON object.`

ボディに指定したJSON形式が不適切です。ボディの内容を確認してください。

405 Method Not Allowed

`Method Not Allowed`

許可されていないメソッドのリクエストです。URLが誤っていないか確認してください。

メディア操作のエラーレスポンス
---------------

### GETメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`Limit: must be no less than 0.`

`limit`パラメータに0より小さい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`limit must be less than or equal to 100`

`limit`パラメータに100より大きい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Invalid integer in query (limit=xxx)`

`limit`パラメータに不正な値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Invalid boolean in query (imageOnly=xxx)`

`imageOnly`パラメータに不正な値が指定されています。trueもしくはfalseを指定してください。

400 Bad Request

`Offset: must be no less than 0`

`offset`パラメータに不正な値が指定されています。0以上の数値を指定してください。

400 Bad Request

`Invalid integer in query (offset=xxx)`

`offset`パラメータに不正な値が指定されています。0以上の数値を指定してください。

400 Bad Request

`BadRequest`

`token`パラメータの値が不正、もしくは`token`が無効です。

404 Not Found

`Content not found`

`fileName`パラメータに指定した文字列をファイル名にもつメディアが存在しません。

### POSTメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`invalid request`

リクエストの形式が不正です。リクエストボディの内容などを確認してください。

400 Bad Request

`request body too large`

アップロードするメディアのファイルサイズが5MBを超えています。サイズを抑えるか、管理画面からアップロードしてください。

405 Method Not Allowed

`Method Not Allowed`

許可されていないメソッドのリクエストです。URLが誤っていないか確認してください。

### DELETEメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`invalid url`

指定されたURLが不正です。URLが誤っていないか確認してください。

400 Bad Request

`this medium is referenced by another content`

コンテンツから参照されているため削除できません。参照元のコンテンツから削除対象のメディアの参照を外してください。

404 Not Found

`medium not found`

削除対象のメディアが存在しません。正しいメディアURLが指定されているかを確認してください。

405 Method Not Allowed

`Method Not Allowed`

許可されていないメソッドのリクエストです。URLが誤っていないか確認してください。

メンバー操作のエラーレスポンス
---------------

### GETメソッド

ステータスコード

エラーメッセージ

原因と対策

404 Not Found

`Member not found`

取得しようとしたメンバーが存在していない、もしくは招待中です。サービス参加済みのメンバーを指定してください。

### PATCHメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

例：

*   `"roleIds" is required`
*   `"roleIds" must not be null`
*   `"roleIds" must be of type array`

リクエストボディが不正です。`roleIds`が指定されているか、値が`null`ではなく配列か、定義されていないプロパティが含まれていないかを確認してください。

400 Bad Request

`Invalid member id`

メンバーIDの値が不正です。メンバー一覧取得APIのレスポンスに含まれるメンバーIDを指定してください。

400 Bad Request

例：

*   `"roleIds" must not be empty`
*   `"roleIds[1]" is duplicated`
*   `"roleIds[0]" is not a valid role id`

`roleIds`に空の配列、重複したロールID、または形式が不正なロールIDが指定されています。ロール一覧取得APIのレスポンスに含まれるロールIDを、`roleIds`に重複しないように1件以上指定してください。

400 Bad Request

例：  
`"roleIds[0]" does not exist`

指定したロールが対象サービスに存在しません。別のサービスのロールが含まれていないか、指定したロールIDが正しいかを確認してください。

403 Forbidden

`Forbidden`

複数環境機能で作成した環境では、メンバーのロールを更新できません。リクエスト先のサービスIDを確認してください。

404 Not Found

`Member not found`

指定したメンバーがサービスに存在しません。メンバー一覧取得APIで、指定したメンバーIDが対象のサービスに存在するか確認してください。

409 Conflict

`Roles of inviting members cannot be updated`

招待中のメンバーが指定されています。対象のメンバーがサービスに参加してから、再度リクエストしてください。

409 Conflict

`At least one administrator is required`

更新後に管理者ロールを持つ参加済みメンバーがサービスに1人もいなくなります。管理者ロールを持つ参加済みメンバーが1人以上残るように、`roleIds`に指定するロールIDを確認してください。招待中のメンバーは管理者の人数に含まれません。

413 Payload Too Large

`Request Entity Too Large`

リクエストボディのサイズが1MiBを超えています。1MiB以下になるようにリクエストボディを調整してください。

API操作のエラーレスポンス
--------------

### GETメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`Endpoint: must be in a valid format.`

エンドポイントの形式が不正です。指定したエンドポイントに誤りがないか確認してください。

### POSTメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

例：

*   `"name" must be of type string`
*   `field "num": "isUnique" is not a valid property for kind "number"`

リクエストボディが不正です。必須項目が指定されているか、値の型が正しいか、定義されていないプロパティやフィールド種別に対応しないプロパティが含まれていないかを確認してください。

400 Bad Request

例：

*   `field "title": "initialValue" must be of type string`
*   `initialValue length must be at most 100 characters`

`initialValue`の型がフィールド種別と一致していないか、設定したバリデーションの条件を満たしていません。フィールド種別に対応する型を指定し、文字数、正規表現、数値範囲などの条件を確認してください。

400 Bad Request

例：  
`richEditorV2Options contains invalid value "undo"`

`richEditorV2Options`に指定できない固定項目（`undo`、`redo`、`clean`）が含まれています。これらは常に有効なため、指定から外してください。

400 Bad Request

例：

*   `customFieldId "block" does not match any customFields entry`
*   `customFieldIds entry "block" does not match any customFields entry`

`customFieldId`または`customFieldIds`に、`customFields`で定義されていないフィールドIDが指定されています。同じリクエストの`customFields`で定義したフィールドIDを指定してください。

400 Bad Request

`Invalid boolean in query (allowAdditionalCharge=xxx)`

`allowAdditionalCharge`パラメータに不正な値が指定されています。`true`もしくは`false`を指定してください。

402 Payment Required

`API count has been exceeded. Set allowAdditionalCharge to true to allow additional charges.`

Teamプラン、Businessプラン、Enterpriseプランで、`allowAdditionalCharge=true`を指定せずにAPI数の上限を超えてAPIを作成しようとしています。追加料金の発生を許可する場合は、`allowAdditionalCharge=true`を指定してください。

403 Forbidden

`APIs count has been exceeded`

HobbyプランまたはTemplateプランで、API数の上限を超えてAPIを作成しようとしています。これらのプランでは、`allowAdditionalCharge`の指定値にかかわらず上限を超過できません。契約プランまたはAPI数を確認してください。

403 Forbidden

`File fields are not available on your current plan`

契約プランで利用できないファイルフィールドが指定されています。リクエストボディにファイルフィールドが含まれていないか、契約プランで利用できるかを確認してください。

409 Conflict

例：  
`Endpoint "news" is already in use`

指定したエンドポイントを使用するAPIがすでに存在します。サービス内で重複しないエンドポイントを指定してください。

413 Payload Too Large

`Request Entity Too Large`

リクエストボディのサイズが1MiBを超えています。1MiB以下になるようにリクエストボディを調整してください。

ロール操作のエラーレスポンス
--------------

### GETメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`limit must be less than or equal to 100`

`limit`パラメータに100より大きい値が指定されています。100以下の整数を指定してください。

400 Bad Request

`Invalid integer in query (limit=xxx)`

`limit`パラメータに不正な値が指定されています。整数を指定してください。

400 Bad Request

`Invalid token parameter`

`token`パラメータに不正な値が指定されています。前回のレスポンスに含まれる`token`の値を指定してください。

400 Bad Request

`Invalid paging token`

`token`パラメータの内容が不正です。前回のレスポンスに含まれる`token`の値を、同じサービスへのリクエストで指定してください。

400 Bad Request

`Invalid role id`

ロールIDの形式が不正です。`role_id`には、小文字の英字を使ったUUID形式の値を指定してください。

403 Forbidden

`Forbidden`

複数環境機能で作成した環境では、ロールを取得できません。リクエスト先のサービスIDを確認してください。

404 Not Found

`Role not found`

取得対象のロールが存在しません。指定したロールIDが正しいか確認してください。

### POSTメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

例：

*   `"name" is required`
*   `"name" must be between 1 and 100 characters`

リクエストボディが不正です。必須項目が指定されているか、値が`null`ではなく正しい型か、定義されていないプロパティが含まれていないかを確認してください。`level`に指定した値と、`name`の文字数が1文字以上100文字以下かも確認してください。

400 Bad Request

例：

`"permissions.individualPermissions[0].apiId" does not exist`

存在しない、または指定できないメンバー・環境・APIが指定されています。招待中のメンバーや、他のサービスのメンバー・環境などが含まれていないか、指定したAPI IDが正しいかを確認してください。

403 Forbidden

`Current plan does not allow adding roles`

ロール機能を利用できない契約プランです。ロール機能を利用できるプラン（Business、Enterprise）を確認してください。

403 Forbidden

`Forbidden`

複数環境機能で作成した環境では、ロールを作成できません。リクエスト先のサービスIDを確認してください。

413 Payload Too Large

`Request Entity Too Large`

リクエストボディのサイズが1MiBを超えています。1MiB以下になるようにリクエストボディを調整してください。

### PATCHメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`Invalid role id`

ロールIDの形式が不正です。`role_id`には、小文字の英字を使ったUUID形式の値を指定してください。

400 Bad Request

`Either "name" or "permissions" is required`

`name`と`permissions`がどちらも指定されていません。少なくとも一方を指定してください。

400 Bad Request

例：

*   `"permissions.individualPermissions" is required`
*   `"permissions.defaultPermissions" is required`

リクエストボディが不正です。`permissions`を指定する場合は、`defaultPermissions`と`individualPermissions`の両方を指定してください。必須項目が指定されているか、値が`null`ではなく正しい型か、定義されていないプロパティが含まれていないか、`level`に指定した値が正しいかも確認してください。

400 Bad Request

例：

`"permissions.individualPermissions[0].apiId" does not exist`

存在しない、または指定できないメンバー・環境・APIが指定されています。招待中のメンバーや、他のサービスのメンバー・環境などが含まれていないか、指定したAPI IDが正しいかを確認してください。

403 Forbidden

`Administrator role cannot be edited`

管理者ロールが指定されています。管理者ロールは更新できません。更新対象のロールIDを確認してください。

403 Forbidden

`Forbidden`

複数環境機能で作成した環境では、ロールを更新できません。リクエスト先のサービスIDを確認してください。

404 Not Found

`Role not found`

更新対象のロールがサービスに存在しません。指定したロールIDが正しいか確認してください。

413 Payload Too Large

`Request Entity Too Large`

リクエストボディのサイズが1MiBを超えています。1MiB以下になるようにリクエストボディを調整してください。

### DELETEメソッド

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`Invalid role id`

ロールIDの形式が不正です。`role_id`には、小文字の英字を使ったUUID形式の値を指定してください。

403 Forbidden

`Administrator role cannot be edited`

管理者ロールが指定されています。管理者ロールは削除できません。削除対象のロールIDを確認してください。

403 Forbidden

`Forbidden`

複数環境機能で作成した環境では、ロールを削除できません。リクエスト先のサービスIDを確認してください。

404 Not Found

`Role not found`

削除対象のロールがサービスに存在しません。指定したロールIDが正しいか確認してください。

409 Conflict

`Remove roles from all members`

削除対象のロールが1人以上のメンバー（招待中のメンバーを含む）に付与されています。招待中のメンバーを含め、対象のロールが付与されているすべてのメンバーからロールを外してから、再度リクエストしてください。