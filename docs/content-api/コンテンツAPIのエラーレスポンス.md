---
contentId: api-error-response
directory: content-api
---

# コンテンツAPIのエラーレスポンス

コンテンツAPIへのリクエスト時に発生するエラーについて種別ごとにまとめます。

*   下記に示す情報は、エラー時の全てのステータスコードを網羅することを保証していません。予期せぬ不具合や考慮の漏れにより、その他のエラーも発生する可能性がございます。あらかじめご了承ください。

エラー発生時のレスポンスボディ
===============

コンテンツAPIのエラーレスポンスには、レスポンスボディに以下のようなメッセージが含まれる場合があります。  

    {
        message: "some message"
    }

*   エラーメッセージは、予告なく変更される可能性がございます。エラーメッセージを元にしたハンドリングは行わないよう、ご注意ください。

エラーレスポンスの一覧
===========

全てのメソッドで共通のエラーレスポンス
-------------------

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`IP address rejected.`

許可されていないIPアドレスからのリクエストです。[APIのIP制限の設定](https://document.microcms.io/manual/api-ip-restriction)を確認し、許可されているIPアドレスからリクエストしてください。

400 Bad Request

`API is stopped for xxxxxxxx service. Please upgrade your plan.`

[プランのダウングレード時の制限](https://help.microcms.io/ja/knowledge/stop-api-conditions-when-downgrade)、[Hobbyプラン利用時の制限](https://help.microcms.io/ja/knowledge/stop-api-conditions-when-using-hobby-plan)のどちらかの要因でAPIが停止しています。[現在のプランの規定値](https://microcms.io/pricing)におさまるようにAPI数やコンテンツ数、メンバー数などを調整するか[料金プランをアップグレード](https://document.microcms.io/manual/change-plan-and-billing)してください。

400 Bad Request

`Invalid request`

リクエストURLのドメインの直後にスラッシュが連続して含まれています。（例：https://{SERVICE\_ID}.microcms.io**//**api/v1/blogs）スラッシュが1つになるように指定してください。

401 Unauthorized

`X-MICROCMS-API-KEY header is invalid.`

サービスに存在しない[APIキー](https://document.microcms.io/content-api/x-microcms-api-key)（X-MICROCMS-API-KEY）が指定されています。APIキー管理一覧に存在するAPIキーを指定してください。

404 Not Found

\-

指定したAPIやコンテンツが存在しないか、コンテンツが取得できないステータス（[下書き中](https://document.microcms.io/manual/content-status#hfc524daf67)か[公開終了](https://document.microcms.io/manual/content-status#h1e55ef39de)）です。指定しているAPIやコンテンツが正しく指定されているかを確認してください。  
  
下書き中コンテンツを取得する場合は、「[下書きコンテンツの全取得](https://document.microcms.io/content-api/x-microcms-api-key#hba32958c26)」の権限を付与してください。単一の下書き中コンテンツを取得する場合は["draftKey"パラメータ](https://document.microcms.io/content-api/get-content#hab2c474417)を利用してください。  
  
公開終了コンテンツを取得する場合は「[公開終了コンテンツの全取得](https://document.microcms.io/content-api/x-microcms-api-key#hba32958c26)」の権限を付与してください。

429 Too Many Requests

`Too many requests, please try again later.`

[APIの呼び出し回数に関する制限](https://document.microcms.io/manual/limitations#h9e37a059c1)を超過しています。対処法はヘルプ記事「[APIのレスポンスで429エラーが返却される場合の対処法を教えてください](https://help.microcms.io/ja/knowledge/handling-429-errors)」をご参照ください。

500 Internal Server Error

\-

サーバー側で予期せぬエラーが生じています。対処法はヘルプ記事「[APIで500番台のエラーが返却されます。考えられる原因と対策はありますか？](https://help.microcms.io/ja/knowledge/api-500-errors)」をご参照ください。

502 Bad Gateway

\-

サーバー側で予期せぬエラーが生じています。対処法はヘルプ記事「[APIで500番台のエラーが返却されます。考えられる原因と対策はありますか？](https://help.microcms.io/ja/knowledge/api-500-errors)」をご参照ください。

503 Service Unavailable

\-

サーバー側で予期せぬエラーが生じています。対処法はヘルプ記事「[APIで500番台のエラーが返却されます。考えられる原因と対策はありますか？](https://help.microcms.io/ja/knowledge/api-500-errors)」をご参照ください。

504 Gateway Timeout

\-

リクエストに対する処理中にタイムアウトしています。対処法はヘルプ記事「[APIで500番台のエラーが返却されます。考えられる原因と対策はありますか？](https://help.microcms.io/ja/knowledge/api-500-errors)」をご参照ください。

GETメソッドのエラーレスポンス
----------------

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`GET is forbidden.`

GET操作が許可されていません。[APIキー設定](https://document.microcms.io/content-api/x-microcms-api-key#ha432915648)でGETの権限が付与されているかを確認してください。

400 Bad Request

`Invalid 'limit' value.`

クエリパラメータの "limit” に不正な値が指定されています。0以上100以下の数値を指定してください。  

400 Bad Request

`Invalid 'offset' value.`

クエリパラメータの "offset” に不正な値が指定されています。0以上の数値を指定してください。  

400 Bad Request

`invalid parameter.`

クエリパラメータに不正な値が指定されています。クエリパラメータの指定方法を確認し、正しい値を指定してください。  
  
[GET /api/v1/{endpoint}の指定方法  
](https://document.microcms.io/content-api/get-list-contents#h929d25d495)[GET /api/v1/{endpoint}/{content\_id}の指定方法](https://document.microcms.io/content-api/get-content)

400 Bad Request

`Response body size is too long. Check your url parameters.`

レスポンスサイズが制限（約5MB）を超えています。[分割して取得する](https://document.microcms.io/content-api/get-list-contents#h4cd61f9fa1)か、[特定のフィールドの情報のみを取得](https://document.microcms.io/content-api/get-list-contents#h7462d83de4)してください。

414 Request-URI Too Large

\-

リクエストURLの最大長（8KB）の制限を超過してます。リクエストURLを短くしてください。

POSTメソッドのエラーレスポンス
-----------------

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`POST is forbidden.`

POST操作が許可されていません。[APIキー設定](https://document.microcms.io/content-api/x-microcms-api-key#ha432915648)でPOSTの権限が付与されているかを確認してください。

400 Bad Request

`Syntax error.`

リクエストボディが正しいJSON形式になっていません。JSONの構文を確認し、正しい形式で指定してください。

400 Bad Request

`Status parameter is not available in the current plan. Please upgrade your plan.`

現在のプランでは[”status”パラメータ](https://document.microcms.io/content-api/post-content#h1276dbba7e)を指定できません。[料金プランをアップグレード](https://document.microcms.io/manual/change-plan-and-billing)するか、”status”パラメータの指定を削除してください。

400 Bad Request

`Request body is empty.`

リクエストボディが空です。登録したい内容のJSONを用意し、リクエストボディに文字列で指定してください。

400 Bad Request

`Please include one or more user-defined fields.`

リクエストボディにユーザー定義したフィールドが指定されていません。（[自動付与されるフィールド](https://document.microcms.io/manual/automatic-grant-fields)しか指定されていません。）定義したフィールドを指定してください。

400 Bad Request

`‘{fieldId}' is unexpected key.`

“{fieldId}”は[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で定義されていないため指定できません。また、”revisedAt”, ”createdAt”, ”updatedAt” は自動で付与される値であるため指定できません。リクエストボディから削除してください。

400 Bad Request

`‘{fieldId}' has unexpected data type.`

“{fieldId}” に指定された値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で定義されたフィールドのデータ型と一致していません。[スキーマで定義されたデータ型に一致する値](https://document.microcms.io/content-api/post-content#hed7263b38a)を指定してください。

400 Bad Request

`‘publishedAt’ field error. This field is valid for content that is meant to be published.`

“publishedAt”は公開しているコンテンツのみに指定可能です。”publishedAt”の指定を削除するか[”status”パラメータ](https://document.microcms.io/content-api/post-content#h1276dbba7e)の指定を削除してください。

400 Bad Request

`'{fieldId}' field error. Please fix date format.`

“{fieldId}”に指定している日付の形式が誤っています。[ISO 形式 (ISO 8601) の文字列](https://document.microcms.io/content-api/post-content#h1e35956891)で指定してください。

400 Bad Request

`'{fieldId}' field required error.`

“{fieldId}”は必須項目です。リクエストボディに含めてください。

400 Bad Request

`Please input unique value on '{fieldId}' field.`

“{fieldId}”に指定されている値は、他のコンテンツで既に登録されています。他のコンテンツと重複しない一意の値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent does not fit the specified format.`

“{fieldId}”に指定されている値は、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された正規表現に合致していません。設定された正規表現に合致した値を指定してください。

400 Bad Request

`'{fieldId}’ field invalid. The value sent does not meet the number of characters allowed.`

“{fieldId}”に指定されてる値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された登録できる文字数の最小値を満たしていないか最大値を超過しています。登録できる文字数を確認し、適切な値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent does not in the range.`

“{fieldId}”に指定されている値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された登録できる数の最小値を満たしていないか最大値を超過しています。登録できる数を確認し、適切な値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent exceeds the upper or lower limit.`

“{fieldId}”に指定されている値が、microCMSが定める下限値(-9007199254740991)を満たしていないか上限値(9007199254740991)を超過しています。入力できる値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid URL.`

”{fieldId}”に指定された値は、有効なURLではありません。メディアにアップロードされている画像・ファイルのURLを指定してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid file URL.`

“{fieldId}”に指定された値は、有効なファイルのURLではありません。指定されたファイルのURLが[正しい形式](https://document.microcms.io/manual/media-management#h2e49446ee8)であることを確認してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid image URL.`

“{fieldId}”に指定された値は、有効な画像のURLではありません。指定された画像のURLが[正しい形式](https://document.microcms.io/manual/media-management#h2e49446ee8)であることを確認してください。

400 Bad Request

`'{fieldId}' field invalid. The image width must be {width} px.`

"{fieldId}"に指定された画像は、画像のサイズ制限（width）を超過しています。画像のサイズ制限で設定した値より小さいサイズの画像を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Cannot use this image because its width is unknown.`

“{fieldId}”に指定された画像は、横幅が取得できない形式であるため登録できません。画像のサイズ制限が設定されている場合、このエラーが発生します。.jpg、.png、.webpなどの別の形式に変更してください。

400 Bad Request

`'{fieldId}' field invalid. The image width must be {height} px.`

“{fieldId}”に指定された画像は、画像のサイズ制限（heigth）を超過しています。画像のサイズ制限で設定した値より小さいサイズの画像を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Cannot use this image because its height is unknown.`

“{fieldId}”に指定された画像は、高さが取得できない形式であるため登録できません。画像のサイズ制限が設定されている場合、このエラーが発生します。.jpg、.png、.webpなどの別の形式に変更してください。

400 Bad Request

`The amount of data that can be saved has been exceeded. Please adjust the contents and try again.`

保存できるデータ量の制限（約200KB）を超過しています。対処法はヘルプ記事「[コンテンツの容量上限を超えたエラーが表示される。どうしたらよいですか？](https://help.microcms.io/ja/knowledge/content-limit-error)」をご参照ください。

429 Too Many Requests

`Too many contents. Please upgrade your plan.`

[コンテンツ数](https://help.microcms.io/ja/knowledge/what-is-content-count)の上限を超過しています。[現在のプランの既定値](https://microcms.io/pricing)におさまるようにコンテンツ数を調整するか[料金プランをアップグレード](https://document.microcms.io/manual/change-plan-and-billing)してください。

PUTメソッドのエラーレスポンス
----------------

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`PUT is forbidden.`

PUT操作が許可されていません。[APIキー設定](https://document.microcms.io/content-api/x-microcms-api-key#ha432915648)でPUTの権限が付与されているかを確認してください。

400 Bad Request

`Syntax error.`

リクエストボディが正しいJSON形式になっていません。JSONの構文を確認し、正しい形式で指定してください。

400 Bad Request

`Status parameter is not available in the current plan. Please upgrade your plan.`

現在のプランでは[”status”パラメータ](https://document.microcms.io/content-api/put-content#h1276dbba7e)を指定できません。[料金プランをアップグレード](https://document.microcms.io/manual/change-plan-and-billing)するか、”status”パラメータの指定を削除してください。

400 Bad Request

`Request body is empty.`

リクエストボディが空です。登録したい内容のJSONを用意し、リクエストボディに文字列で指定してください。

400 Bad Request

`contentId is necessary.`

コンテンツIDが指定されていません。リクエストURLにコンテンツIDを含めてください。

400 Bad Request

`Content is already exists. If you want update, please use PATCH request.`

指定されたコンテンツIDは既に他のコンテンツで使用されています。コンテンツIDを変更してください。既存のコンテンツを更新したい場合は[PATCHメソッド](https://document.microcms.io/content-api/patch-content)を利用してください。

400 Bad Request

`Please include one or more user-defined fields.`

リクエストボディにユーザー定義したフィールドが指定されていません。（[自動付与されるフィールド](https://document.microcms.io/manual/automatic-grant-fields)しか指定されていません。）定義したフィールドを含めてください。

400 Bad Request

`Invalid content id.`

コンテンツIDに利用できない値が指定されています。コンテンツIDを変更してください。

400 Bad Request

`Invalid content id format.`

指定されたコンテンツIDの形式が正しくありません。[コンテンツIDの設定](https://document.microcms.io/manual/content-id-setting)を確認し、正しい形式で指定してください。

400 Bad Request

`‘{fieldId}' is unexpected key.`

“{fieldId}”は[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で定義されていないため指定できません。また、”revisedAt”, ”createdAt”, ”updatedAt” は自動で付与される値であるため指定できません。リクエストボディから削除してください。

400 Bad Request

`‘{fieldId}' has unexpected data type.`

“{fieldId}” に指定された値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で定義されたフィールドのデータ型と一致していません。[スキーマで定義されたデータ型に一致する値](https://document.microcms.io/content-api/put-content#hed7263b38a)を指定してください。

400 Bad Request

`‘publishedAt’ field error. This field is valid for content that is meant to be published.`

“publishedAt”は公開しているコンテンツのみに指定可能です。”publishedAt”の指定を削除するか[”status”パラメータ](https://document.microcms.io/content-api/put-content#h1276dbba7e)の指定を削除してください。

400 Bad Request

`'{fieldId}' field error. Please fix date format.`

“{fieldId}”に指定している日付の形式が誤っています。[ISO 形式 (ISO 8601) の文字列](https://document.microcms.io/content-api/put-content#h1e35956891)で指定してください。

400 Bad Request

`'{fieldId}' field required error.`

“{fieldId}”は必須項目です。リクエストボディに含めてください。

400 Bad Request

`Please input unique value on '{fieldId}' field.`

“{fieldId}”に指定されている値は、他のコンテンツで既に登録されています。他のコンテンツと重複しない一意の値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent does not fit the specified format.`

“{fieldId}”に指定されている値は、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された正規表現に合致していません。設定された正規表現に合致した値を指定してください。

400 Bad Request

`'{fieldId}’ field invalid. The value sent does not meet the number of characters allowed.`

“{fieldId}”に指定されてる値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された登録できる文字数の最小値を満たしていないか最大値を超過しています。登録できる文字数を確認し、適切な値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent does not in the range.`

“{fieldId}”に指定されている値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された登録できる数の最小値を満たしていないか最大値を超過しています。登録できる数を確認し、適切な値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent exceeds the upper or lower limit.`

“{fieldId}”に指定されている値が、microCMSが定める下限値(-9007199254740991)を満たしていないか上限値(9007199254740991)を超過しています。入力できる値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid URL.`

”{fieldId}”に指定された値は、有効なURLではありません。メディアにアップロードされている画像・ファイルのURLを指定してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid file URL.`

“{fieldId}”に指定された値は、有効なファイルのURLではありません。指定されたファイルのURLが[正しい形式](https://document.microcms.io/manual/media-management#h2e49446ee8)であることを確認してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid image URL.`

“{fieldId}”に指定された値は、有効な画像のURLではありません。指定された画像のURLが[正しい形式](https://document.microcms.io/manual/media-management#h2e49446ee8)であることを確認してください。

400 Bad Request

`'{fieldId}' field invalid. The image width must be {width} px.`

"{fieldId}"に指定された画像は、画像のサイズ制限（width）を超過しています。画像のサイズ制限で設定した値より小さいサイズの画像を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Cannot use this image because its width is unknown.`

“{fieldId}”に指定された画像は、横幅が取得できない形式であるため登録できません。画像のサイズ制限が設定されている場合、このエラーが発生します。.jpg、.png、.webpなどの別の形式に変更してください。

400 Bad Request

`'{fieldId}' field invalid. The image width must be {height} px.`

“{fieldId}”に指定された画像は、画像のサイズ制限（heigth）を超過しています。画像のサイズ制限で設定した値より小さいサイズの画像を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Cannot use this image because its height is unknown.`

“{fieldId}”に指定された画像は、高さが取得できない形式であるため登録できません。画像のサイズ制限が設定されている場合、このエラーが発生します。.jpg、.png、.webpなどの別の形式に変更してください。

400 Bad Request

`The amount of data that can be saved has been exceeded. Please adjust the contents and try again.`

保存できるデータ量の制限（約200KB）を超過しています。対処法はヘルプ記事「[コンテンツの容量上限を超えたエラーが表示される。どうしたらよいですか？](https://help.microcms.io/ja/knowledge/content-limit-error)」をご参照ください。

429 Too Many Requests

`Too many contents. Please upgrade your plan.`

[コンテンツ数](https://help.microcms.io/ja/knowledge/what-is-content-count)の上限を超過しています。[現在のプランの既定値](https://microcms.io/pricing)におさまるようにコンテンツ数を調整するか[料金プランをアップグレード](https://document.microcms.io/manual/change-plan-and-billing)してください。

PATCHメソッドのエラーレスポンス
------------------

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`PATCH is forbidden.`

PATCH操作が許可されていません。[APIキー設定](https://document.microcms.io/content-api/x-microcms-api-key#ha432915648)でPATCHの権限が付与されているかを確認してください。

400 Bad Request

`Syntax error.`

リクエストボディが正しいJSON形式になっていません。JSONの構文を確認し、正しい形式で指定してください。

400 Bad Request

`Content is not exists.`

指定されたコンテンツが存在しません。正しいコンテンツIDが指定されているかを確認してください。

400 Bad Request

`Request body is empty.`

リクエストボディが空です。登録したい内容のJSONを用意し、リクエストボディに文字列で指定してください。

400 Bad Request

`‘{fieldId}' is unexpected key.`

“{fieldId}”は[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で定義されていないため指定できません。また、”revisedAt”, ”createdAt”, ”updatedAt” は自動で付与される値であるため指定できません。リクエストボディから削除してください。

400 Bad Request

`‘{fieldId}' has unexpected data type.`

“{fieldId}” に指定された値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で定義されたフィールドのデータ型と一致していません。[スキーマで定義されたデータ型に一致する値](https://document.microcms.io/content-api/patch-content#h44fdca3bb7)を指定してください。

400 Bad Request

`‘publishedAt’ field error. This field is valid for content that is meant to be published.`

“publishedAt”は公開しているコンテンツのみに指定可能です。”publishedAt”の指定を削除してください。

400 Bad Request

`'{fieldId}' field error. Please fix date format.`

“{fieldId}”に指定している日付の形式が誤っています。[ISO 形式 (ISO 8601) の文字列](https://document.microcms.io/content-api/patch-content#h1e35956891)で指定してください。

400 Bad Request

`Please input unique value on '{fieldId}' field.`

“{fieldId}”に指定されている値は、他のコンテンツで既に登録されています。他のコンテンツと重複しない一意の値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent does not fit the specified format.`

“{fieldId}”に指定されている値は、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された正規表現に合致していません。設定された正規表現に合致した値を指定してください。

400 Bad Request

`'{fieldId}’ field invalid. The value sent does not meet the number of characters allowed.`

“{fieldId}”に指定されてる値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された登録できる文字数の最小値を満たしていないか最大値を超過しています。登録できる文字数を確認し、適切な値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent does not in the range.`

“{fieldId}”に指定されている値が、[APIスキーマ](https://document.microcms.io/manual/api-model-settings#hbf58befd50)で設定された登録できる数の最小値を満たしていないか最大値を超過しています。登録できる数を確認し、適切な値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. The value sent exceeds the upper or lower limit.`

“{fieldId}”に指定されている値が、microCMSが定める下限値(-9007199254740991)を満たしていないか上限値(9007199254740991)を超過しています。入力できる値を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid URL.`

”{fieldId}”に指定された値は、有効なURLではありません。メディアにアップロードされている画像・ファイルのURLを指定してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid file URL.`

“{fieldId}”に指定された値は、有効なファイルのURLではありません。指定されたファイルのURLが[正しい形式](https://document.microcms.io/manual/media-management#h2e49446ee8)であることを確認してください。

400 Bad Request

`'{fieldId}' field invalid. Please set a valid image URL.`

“{fieldId}”に指定された値は、有効な画像のURLではありません。指定された画像のURLが[正しい形式](https://document.microcms.io/manual/media-management#h2e49446ee8)であることを確認してください。

400 Bad Request

`'{fieldId}' field invalid. The image width must be {width} px.`

"{fieldId}"に指定された画像は、画像のサイズ制限（width）を超過しています。画像のサイズ制限で設定した値より小さいサイズの画像を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Cannot use this image because its width is unknown.`

“{fieldId}”に指定された画像は、横幅が取得できない形式であるため登録できません。画像のサイズ制限が設定されている場合、このエラーが発生します。.jpg、.png、.webpなどの別の形式に変更してください。

400 Bad Request

`'{fieldId}' field invalid. The image width must be {height} px.`

“{fieldId}”に指定された画像は、画像のサイズ制限（heigth）を超過しています。画像のサイズ制限で設定した値より小さいサイズの画像を指定してください。

400 Bad Request

`'{fieldId}' field invalid. Cannot use this image because its height is unknown.`

“{fieldId}”に指定された画像は、高さが取得できない形式であるため登録できません。画像のサイズ制限が設定されている場合、このエラーが発生します。.jpg、.png、.webpなどの別の形式に変更してください。

400 Bad Request

`The amount of data that can be saved has been exceeded. Please adjust the contents and try again.`

保存できるデータ量の制限（約200KB）を超過しています。対処法はヘルプ記事「[コンテンツの容量上限を超えたエラーが表示される。どうしたらよいですか？](https://help.microcms.io/ja/knowledge/content-limit-error)」をご参照ください。

DELETEメソッドのエラーレスポンス
-------------------

ステータスコード

エラーメッセージ

原因と対策

400 Bad Request

`DELETE is forbidden.`

DELETE操作が許可されていません。[APIキー設定](https://document.microcms.io/content-api/x-microcms-api-key#ha432915648)でDELETEの権限が付与されているかを確認してください。

400 Bad Request

`Content is not exists.`

指定されたコンテンツが存在しません。正しいコンテンツIDが指定されているかを確認してください。

400 Bad Request

`The content is referenced."`

他のコンテンツから参照されているため削除できません。参照元のコンテンツから削除対象のコンテンツへの参照を外してください。