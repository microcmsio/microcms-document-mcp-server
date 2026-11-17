---
contentId: medium-webhook-setting
directory: manual
---

# メディアのWebhookを設定

メディアを変更（作成／更新／削除）したタイミングで、Webhook通知を行うことができます。  
「メディア管理」→「メディア設定」から設定可能です。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/991c1df1c01840f6994d43438b6508a5/CleanShot%202023-08-28%20at%2013.27.30%402x.png)  

Webhookのタイミング
=============

各Webhookの設定時にWebhookを発行するタイミングを設定できます。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/424feacdd4794f9184bb32b7b8600706/media-webhook-3.png)  

### メディアの作成時

管理画面でメディアを新規作成（新規アップロード）したときに通知を行います。

###

以下の場合は、Webhook通知は送信されません。ご注意ください。

*   [マネジメントAPIを利用してアップロード](/management-api/post-media)した場合

### メディアの更新時

管理画面でメディアを再アップロードしたとき／ファイル名を変更したときに通知を行います。

以下の場合は、Webhook通知は送信されません。ご注意ください。

*   [メディアの作成者を変更](/manual/media-management#h96ca51caf5)した場合

### メディアの削除時

管理画面でメディアを削除したときに通知を行います。

以下の場合は、Webhook通知は送信されません。ご注意ください。

*   [マネジメントAPIを利用して削除](/management-api/delete-media-v2)した場合
*   [メディアの全件削除](/manual/media-management#h88d26267bd)を利用した場合

Webhook通知について
=============

メディアのWebhook通知では、任意のURLに対してPOSTリクエストを送信します。リクエストを受け取った先にて、独自の処理を行うことが可能です。

リクエスト内容
-------

### ヘッダ

リクエストヘッダには `Content-Type: application/json` が含まれます。

### ボディ

リクエストボディには対象となったコンテンツやAPIの情報が含まれます。  

    {
      "service": "someId",
      "type": "edit",
      "old": {
        "url": "https://images.microcms-assets.io/assets/xxxx/yyyy/zzzz.jpg",
        "width": 100,
        "height": 100,
        "alt": "Some sample alt text."
      },
      "new": {
        "url": "https://images.microcms-assets.io/assets/xxxx/yyyy/zzzz.jpg",
        "width": 100,
        "height": 100,
        "alt": "Some sample alt text."
      },
    }

#### service

変更のあったメディアが属するサービスのサブドメインが入ります。

#### type 

変更の種類です。新規追加時は`new`、編集時は`edit`、削除時は`delete`が入ります。

#### old

メディアの編集前もしくは削除前の内容が含まれます。メディアの新規作成時には`null`が入ります。

#### new

メディアの作成後もしくは編集後の内容が含まれます。メディアの削除時には`null`が入ります。

#### old / new共通

##### url

メディアのurlが含まれます。

##### width

メディアの`width`が含まれます。画像以外のファイルの場合は`null`が入ります。

##### height

メディアの`height`が含まれます。画像以外のファイルの場合は`null`が入ります。

##### alt

メディアの管理画面から設定した代替テキストが含まれます。設定がない場合や画像以外のファイルの場合は、キー自体が含まれません。

セキュリティ
------

microCMSからの通知を受け取るサーバは、**一般公開**をしておく必要があります。  
そのため処理によっては、第三者からPOSTリクエストを受ける可能性も考慮した対応を行う必要があります。  
  
具体的には、URLの設定時に`?auth=XXX` などmicroCMSと受け取り側サーバにしか知り得ない値を設定しておき、受け取り側のサーバでこの値が正しいかどうか（≒microCMSからのリクエストであるか否か）検証を行う方法が考えられます。

コンテンツのWebhookと同様に、Webhookリクエストのヘッダに署名値（Signature）を付与する対応については、検討を進めています。

Webhookの詳細仕様
============

再送
--

Webhookの通知が、ネットワークエラーや4xx、5xxエラーにて失敗した場合でも、リトライ処理は行われません。

重複送信
----

Webhookの通知は、**設定したタイミングにつき1回のみ**行われます。

順序保証
----

原則として、Webhookの通知は操作の実行順に行われます。  
ただし、厳密な制御は行われていないため、順序は保証されません。

送信元IPアドレス
---------

Webhookの送信元IPアドレスは、動的IPアドレスです。  
また、IPアドレスの範囲も公開しておりません。