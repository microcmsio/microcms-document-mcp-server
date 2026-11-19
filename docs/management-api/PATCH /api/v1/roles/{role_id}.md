---
contentId: patch-roles
directory: management-api
---

# PATCH /api/v1/roles/{role_id}

サービスのロールを更新するAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

リクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「ロールの更新」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

Content-Type
------------

送信するデータの形式を指定します。  
microCMSではJSON形式のデータのみ扱っているため、`application/json` と指定してください。

パスパラメータ
=======

role\_id
--------

更新するロールのIDを指定してください。  
ロールIDは、ロール一覧取得APIのレスポンスの`id`から確認可能です。

リクエストボディ
========

更新する項目を指定します。  
`name`と`permissions`はどちらも任意ですが、少なくとも一方を指定してください。指定しなかった項目は変更されません。

プロパティ

型

指定要否

説明

`name`

string

任意

ロール名です。1〜100文字で指定します。

`permissions`

object

任意

ロールの権限設定です。指定した場合は、権限設定全体を置き換えます。`defaultPermissions`と`individualPermissions`の両方を指定します。形式や各キーの指定方法については、「[POST /api/v1/roles](/management-api/post-roles)」の`permissions`をご覧ください。

未定義のプロパティや、`isAdmin`・`id`・`createdAt`・`updatedAt` は指定できません。

`permissions` は、一部の権限だけを更新することはできません。送信した内容で権限設定全体が置き換わり、送信しなかった個別権限は削除されます。  
個別権限をすべて削除する場合は、`individualPermissions` に空の配列（`[]`）を指定してください。

リクエスト例
======

ロール名のみを更新する場合
-------------

    curl -X PATCH 'https://[サービスID].microcms-management.io/api/v1/roles/[ロールID]' \
      -H 'X-MICROCMS-API-KEY: [APIキー]' \
      -H 'Content-Type: application/json' \
      -d '{ "name": "コンテンツ編集者（改）" }'

現在の権限設定の一部を変更する場合
-----------------

以下は、ロール詳細取得APIで取得した現在の権限設定をもとに、お支払い設定画面へのアクセス権限（`billing.read`）を有効にする例です。  
この例では、APIキーのマネジメントAPI権限で「ロールの取得 (一覧・詳細)」と「ロールの更新」を有効にしてください。  
  
**1\. 現在のロール情報を取得する**

    curl -H 'X-MICROCMS-API-KEY: [APIキー]' \
      'https://[サービスID].microcms-management.io/api/v1/roles/[ロールID]'

  
**2\. リクエストボディを用意する**  
取得に成功したことを確認し、レスポンスの`permissions`をコピーします。`defaultPermissions.billing.read`を`true`に変更し、変更後の`permissions`を次の形式で`role.json`に保存します。

    {
      "permissions": 取得して編集した権限設定
    }

実際のファイルには、取得した`permissions`オブジェクト全体を指定してください。維持したい個別権限も含めます。`id`や`isAdmin`など、レスポンスのその他のプロパティは含めないでください。  
  
**3\. 更新する**

    curl -X PATCH 'https://[サービスID].microcms-management.io/api/v1/roles/[ロールID]' \
      -H 'X-MICROCMS-API-KEY: [APIキー]' \
      -H 'Content-Type: application/json' \
      -d @role.json

レスポンス
=====

ステータスコード
--------

正常にロールを更新できた場合は、`200`レスポンスが返却されます。  
エラー時のステータスコードについては、「[マネジメントAPIのエラーレスポンス](/management-api/management-api-error-response)」をご覧ください。

レスポンスボディ
--------

正常にロールを更新できた場合は、以下のようなレスポンスが返却されます。  
形式は「[GET /api/v1/roles/{role\_id}](/management-api/get-role#h0c0b84b0b7)」のレスポンスと同じです。

    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "コンテンツ編集者（改）",
      "isAdmin": false,
      "permissions": {
        "defaultPermissions": { ... },
        "individualPermissions": [ ... ]
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-02T00:00:00.000Z"
    }

エラーレスポンス
========

「[マネジメントAPIのエラーレスポンス](/management-api/management-api-error-response)」を参照ください。

制約事項
====

更新できないロール
---------

管理者ロールは更新できません。

複数環境での利用
--------

複数環境機能で作成した環境へのリクエストには対応していません。