---
contentId: patch-member
directory: management-api
---

# PATCH /api/v1/members/{member_id}

メンバーに付与されているロールを更新するAPIです。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

リクエストの際に必要な認証キーです。  
マネジメントAPIの権限で「メンバーのロールを変更」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

Content-Type
------------

送信するデータの形式を指定します。  
microCMSではJSON形式のデータのみ扱っているため、`application/json` と指定してください。

パスパラメータ
=======

member\_id
----------

更新するメンバーのIDを指定してください。  
メンバーIDは、[管理画面の各メンバーの詳細ページ](/manual/manage-members#h0583e0c8b1)もしくは、メンバー情報取得API（[一覧](/management-api/get-members)、[詳細](/management-api/get-member)）のレスポンスから確認できます。

リクエストボディ
========

更新後にメンバーへ付与するロールを指定します。  
ロールIDは、ロール一覧取得API（`GET /api/v1/roles`）のレスポンスの `roles[].id` から確認可能です。現在のメンバーに付与されているロールIDは、[メンバー取得API](/management-api/get-member)のレスポンスの `roleIds` で確認できます。

プロパティ

型

指定要否

説明

`roleIds`

array

必須

更新後に付与するロールIDの配列です。対象サービスに存在するロールIDを、文字列の配列で1件以上指定してください。空の配列（`[]`）や同じIDの重複は指定できません。

付与済みのロールは、送信した `roleIds` の内容ですべて置き換えられます。維持したい既存のロールIDも、`roleIds` に含めて送信してください。

リクエスト例
======

以下は、メンバーに付与するロールを、指定した2つのロールに置き換える例です。

    curl -X PATCH 'https://[サービスID].microcms-management.io/api/v1/members/[メンバーID]' \
      -H 'X-MICROCMS-API-KEY: [APIキー]' \
      -H 'Content-Type: application/json' \
      -d '{
        "roleIds": [
          "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz"
        ]
      }'

ロールを追加する場合は、維持したい既存のロールIDと、追加するロールIDをすべて指定してください。ロールを外す場合は、維持したいロールIDのみを指定してください。

レスポンス
=====

ステータスコード
--------

正常にロールを更新できた場合は、`200`レスポンスが返却されます。  
エラー時のステータスコードについては、「[マネジメントAPIのエラーレスポンス](https://microcms-docs.microcms.io/management-api/management-api-error-response)」をご覧ください。

レスポンスボディ
--------

正常にロールを更新できた場合は、以下のようなレスポンスが返却されます。形式は、メンバー取得API（[GET /api/v1/members/{member\_id}](/management-api/get-member)）のレスポンスと同じです。

    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "test-member",
      "email": "test@microcms.co.jp",
      "roleIds": [
        "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz"
      ],
      "mfa": true,
      "lastAccessedAt": "2026-01-01T00:00:00.000Z"
    }

制約事項
====

更新できないメンバー・ロール設定
----------------

招待中のメンバーに付与されているロールは更新できません。  
更新後も、参加済みの管理者が1人以上残る必要があります。招待中のメンバーは、管理者の人数に含まれません。

複数環境での利用
--------

複数環境機能で作成した環境へのリクエストには対応していません。  
親サービスでメンバーに付与するロールを変更しても、子環境のメンバーに付与されているロールには反映されません。

同時更新
----

同じメンバーを同時に更新すると、最後に保存されたロール設定が適用されます。  
ロールの削除および更新は、同時に実行せず、順番に実行してください。  
複数の管理者から管理者ロールを同時に外すと、参加済みの管理者がいなくなる可能性があります。管理者ロールを外す操作も、順番に実行してください。

エラーレスポンス
========

「[マネジメントAPIのエラーレスポンス](/management-api/management-api-error-response)」を参照ください。