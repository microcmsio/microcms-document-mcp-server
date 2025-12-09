---
contentId: management-api-error-response
directory: management-api
---

# マネジメントAPIのエラーレスポンス

マネジメントAPIへのリクエスト時に発生するエラーについて種別ごとにまとめます。

*   下記に示す情報は、エラー時の全てのステータスコードを網羅することを保証していません。予期せぬ不具合や考慮の漏れにより、その他のエラーも発生する可能性がございます。あらかじめご了承ください。

エラー発生時のレスポンスボディ
===============

マネジメントAPIのエラーレスポンスには、レスポンスボディに以下のようなメッセージが含まれる場合があります。  

    {
        message: "some message"
    }

*   エラーメッセージは、予告なく変更される可能性がございます。エラーメッセージを元にしたハンドリングは行わないよう、ご注意ください。

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

limitパラメータに0より小さい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`limit must be less than or equal to 100`

limitパラメータに100より大きい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Invalid integer in query (limit=xxx)`

limitパラメータに不正な値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Offset: must be no less than 0`

offsetパラメータに0より小さい値が指定されています。0以上の数値を指定してください。

400 Bad Request

`Invalid integer in query (offset=xxx)`

offsetパラメータに不正な値が指定されています。0以上の数値を指定してください。

404 Not Found

`Content not found`

取得対象のコンテンツが存在しません。指定したコンテンツIDが正しいか確認してください。

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

limitパラメータに0より小さい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`limit must be less than or equal to 100`

limitパラメータに100より大きい値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Invalid integer in query (limit=xxx)`

limitパラメータに不正な値が指定されています。0以上100以下の数値を指定してください。

400 Bad Request

`Invalid boolean in query (imageOnly=xxx)`

imageOnlyパラメータに不正な値が指定されています。trueもしくはfalseを指定してください。

400 Bad Request

`Offset: must be no less than 0`

offsetパラメータに不正な値が指定されています。0以上の数値を指定してください。

400 Bad Request

`Invalid integer in query (offset=xxx)`

offsetパラメータに不正な値が指定されています。0以上の数値を指定してください。

400 Bad Request

`BadRequest`

tokenパラメータの値が不正、もしくはtokenが無効です。

404 Not Found

`Content not found`

fileNameパラメータに指定した文字列をファイル名にもつメディアが存在しません。

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