---
contentId: webhook-setting
directory: manual
---

# コンテンツのWebhookを設定

コンテンツの変更時に外部システムとの連携を行うための機能として、Webhook機能を用意しています。  
設定は各APIの「API設定」→「Webhook」で行うことができます。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/02171c5ed6ce4056a7576059a81daa2e/CleanShot%202025-08-21%20at%2010.56.27.png)  
  
追加ボタンから、Webhookの種類を選び、設定を行ってください。  
設定できるWebhookは、以下の9種類です。

*   Slack
*   Chatwork
*   Netlify
*   Cloudflare Pages
*   Vercel
*   AWS Amplify
*   GitHub Actions
*   メール通知
*   カスタム通知

Webhookのタイミング
=============

各Webhookの設定時にWebhookを発行するタイミングを設定できます。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/e947c1f4091542cd9ad868a9259aadad/CleanShot%202024-07-22%20at%203%E2%80%AF.58.09.png)  

1\. コンテンツの公開時・更新時
-----------------

コンテンツが「公開中」になった際や、「公開中」もしくは「公開中かつ下書き中」のコンテンツに変更があった際に通知を行います。

### コンテンツの公開（管理画面による操作）

管理画面の操作によって、新規公開や公開済みコンテンツが更新された際に通知を行います。（レビュー、予約による操作を除く）

### コンテンツの公開（APIによる操作）

以下の場合に通知を行います。

1.  POST API／PUT APIによって「公開中」のコンテンツが作成された場合
2.  PATCH APIによって「公開中」のコンテンツが更新された場合

### コンテンツの公開（レビューによる操作）

レビュー申請機能によって、新規公開や公開済みコンテンツが更新された際に通知を行います。

### コンテンツの公開（予約設定による操作）

コンテンツの予約公開機能によって、新規公開や公開済みコンテンツが更新された際に通知を行います。

### コンテンツの並び替え

公開済みのコンテンツをコンテンツ一覧画面で並び替えた際に通知を行います。

### コンテンツIDの変更

公開済みのコンテンツのコンテンツIDを更新した際に通知を行います。

### 公開日時の変更

公開済みのコンテンツの公開日時を更新した際に通知を行います。

### カスタムステータスの変更

公開済みのコンテンツのカスタムステータスを更新した際に通知を行います。

2\. コンテンツの公開終了時
---------------

コンテンツが「公開中」もしくは「公開中かつ下書き中」から、「公開終了」もしくは「下書き中」に変更された際や、「公開終了」のコンテンツに変更があった際に通知を行います。

### コンテンツの公開終了、または公開中コンテンツを下書きに戻す（管理画面による操作）

以下の場合に通知を行います。

1.  管理画面の操作によって「公開中」のコンテンツを「公開終了」にした場合（予約による操作を除く）
2.  管理画面の操作によって「公開中」のコンテンツを、「下書き中」に変更した場合

### コンテンツの公開終了（予約設定による操作）

コンテンツの公開停止予約機能によって、「公開中」もしくは「公開中かつ下書き中」のコンテンツが「公開終了」に変更された際に通知します。

### コンテンツの並び替え

「公開終了」のコンテンツをコンテンツ一覧画面で並び替えた際に通知を行います。

### コンテンツIDの変更

「公開終了」のコンテンツのコンテンツIDを更新した際に通知を行います。

### 公開日時の変更

「公開終了」のコンテンツの公開日時を更新した際に通知を行います。

### カスタムステータスの変更

「公開終了」のコンテンツのカスタムステータスを更新した際に通知を行います。

3\. コンテンツの下書き保存時
----------------

コンテンツが「下書き中」もしくは「公開中かつ下書き中」になった際や、「下書き中」のコンテンツに変更があった際に通知します。

### コンテンツの下書き保存（管理画面による操作）

管理画面の操作によって「下書き中」のコンテンツが更新された際に通知を行います。

### コンテンツの下書き保存（APIによる操作）

以下の場合に通知を行います。

1.  POST / PUT APIによって「下書き中」のコンテンツを作成した場合
2.  PATCH APIによって「下書き中」のコンテンツを更新した場合

### コンテンツの並び替え

「下書き中」のコンテンツをコンテンツ一覧画面で並び替えた際に通知を行います。

### コンテンツIDの変更

「下書き中」のコンテンツのコンテンツIDを更新した際に通知を行います。

### 公開日時の変更

「下書き中」のコンテンツの公開日時を更新した際に通知を行います。

### カスタムステータスの変更

「下書き中」のコンテンツのカスタムステータスを更新した際に通知を行います。

4\. 公開中コンテンツの削除時
----------------

「公開中」もしくは「公開中かつ下書き中」のコンテンツが削除された際に通知します。

### コンテンツの削除（管理画面による操作）

管理画面の操作によって「公開中」もしくは「公開中かつ下書き中」のコンテンツが削除された際に、通知を行います。

### コンテンツの削除（APIによる操作）

DELETE APIによって「公開中」もしくは「公開中かつ下書き中」のコンテンツが削除された際に、通知を行います。

5\. 公開終了コンテンツの削除時
-----------------

「公開終了」のコンテンツが削除された際に通知します。

### コンテンツの削除（管理画面による操作）

管理画面の操作によって「公開終了」のコンテンツが削除された際に、通知を行います。

### コンテンツの削除（APIによる操作）

DELETE APIによって「公開終了」のコンテンツが削除された際に、通知を行います。

6\. 下書きコンテンツの削除時
----------------

「下書き中」のコンテンツが削除された際に通知します。

### コンテンツの削除（管理画面による操作）

管理画面の操作によって「下書き中」のコンテンツが削除された際に、通知を行います。

### コンテンツの削除（APIによる操作）

DELETE APIによって「下書き中」のコンテンツが削除された際に、通知を行います。

7\. 公開中かつ下書き中コンテンツの下書き破棄時
-------------------------

「公開中かつ下書き中」のコンテンツの下書きを破棄した際に通知を行います。

8\. APIの設定変更時
-------------

APIの設定（基本設定やスキーマなど）に変更を行った際に通知を行います。

9\. APIの削除時
-----------

APIが削除された際に通知を行います。

設定内容と動作内容
=========

Slack
-----

SlackへのWebhookには以下の情報が必須で必要です。  
Slack側の操作については[公式ドキュメント](https://api.slack.com/messaging/webhooks)等をご参照ください。  

*   Slackで発行するWebhook URL

  
実際に通知が行われる際は以下のような形で行われます。  
URL部分にはデフォルトでは管理画面のURLが入りますが、設定で任意のURLに変更することも可能です。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/0302a7e46e8e45a980286b39e8332f62/slack-webhook-example.png)

Chatwork
--------

ChatworkへのWebhookには以下の情報が必須で必要です。  

*   ChatworkのAPIトークン：[Chatworkドキュメント](https://help.chatwork.com/hc/ja/articles/115000172402-API%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E7%99%BA%E8%A1%8C%E3%81%99%E3%82%8B)
*   部屋ID：通常URLに含まれる rid000000000 のうちの数値部分です。

  
通知内容はSlackと同様となります。

Netlify
-------

microCMSからのWebhookによってビルド処理を開始できます。  
設定内容は下記の通りです。  

*   Build Hooks URL：[Netlifyドキュメント](https://docs.netlify.com/configure-builds/build-hooks/)

Cloudflare Pages
----------------

microCMSからのWebhookによってビルド処理を開始できます。  
設定内容は下記の通りです。  

*   Deploy Hooks URL：[Cloudflareドキュメント](https://developers.cloudflare.com/pages/platform/deploy-hooks/)

Vercel
------

microCMSからのWebhookによってビルド処理を開始できます。  
設定内容は下記の通りです。  

*   Deploy Hooks URL：[Vercelドキュメント](https://vercel.com/docs/concepts/git/deploy-hooks)

AWS Amplify
-----------

microCMSからのWebhookによってビルド処理を開始できます。  
設定内容は下記の通りです。  

*   Build Hooks URL：[Amplifyドキュメント](https://docs.aws.amazon.com/ja_jp/amplify/latest/userguide/webhooks.html)

GitHub Actions
--------------

microCMSからのWebhookによってビルド処理を開始できます。

### 設定内容

*   GitHubトークン：[GitHubドキュメント](https://docs.github.com/ja/github/authenticating-to-github/creating-a-personal-access-token)
*   リポジトリのユーザー名
*   リポジトリ名
*   トリガーイベント名：[GitHubドキュメント](https://docs.github.com/ja/actions/reference/events-that-trigger-workflows)

GitHub Actionsの設定方法の詳細については、ヘルプ記事「[【コンテンツのWebhook連携】GitHub Actionsの設定方法について](https://help.microcms.io/ja/knowledge/webhook-github-actions-settings)」をご覧ください。

トークンが有効期限になった際は、新規にトークンを取得いただき、値を上書きして設定できます。

### リクエスト内容

dispatchイベント呼び出し時のリクエストボディには、`event_type`と`client_payload` の情報が含まれます。

#### リクエストボディの全体像

    {
      "event_type": "microcms_build",
      "client_payload": {
        "service": "your_service",
        "api": "news",
        "id": "RX252Zoo7",
        "draftKey": "2Jnt22mLh5",
        "type": "new"
      }
    }

#### event\_type

`event_type`には、トリガーイベント名に指定した値が含まれます。  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/64714657ace04c8da5bbfb47872647c4/CleanShot%202024-12-18%20at%2010.56.29.png)  
この値はGitHub Actions内で `github.event.action`として参照できます。

#### client\_payload

`client_payload`には対象となったコンテンツやAPIの情報が含まれます。

    {
        "service": "your_service",
        "api": "news",
        "id": "RX252Zoo7",
        "draftKey": "2Jnt22mLh5",
        "type": "new"
    }

*   `service` - 変更のあったコンテンツが属するサービスのサブドメインが入ります。
*   `api` - APIの更新時・削除時に指定したエンドポイントが入ります。
*   `id` - コンテンツのidが入ります。コンテンツに関する操作が行われた場合のみ含まれます。
*   `draftKey` - 管理画面で取得できる下書きキー（draftKey）が入ります。コンテンツが下書き、もしくは予約公開状態の場合にのみ含まれます。
*   `type` - 変更の種類です。新規追加時は`new`、編集時は`edit`、削除時は`delete`が入ります。（コンテンツの公開ステータスの変更とは関係なく、データに対する変更の種類となります。）

これらの値はGitHub Actions内で`github.event.client_payload`として参照できます。

メール通知
-----

コンテンツやAPIの変更時などに指定したメールアドレスに変更内容を送信できます。  
送信元メールアドレスは`info@microcms.io`です。  
設定内容は下記の通りです。  

*   メールアドレス

また、SlackやChatworkのWebhookと同様に、本文内にはURLが含まれますがこちらも任意のものに変更可能です。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/f8a14f94a83b49c39fa2bcce0cc14ecd/CleanShot%202024-05-28%20at%2016.37.28.png)

カスタム通知
------

任意のURLに対してPOSTリクエストを送信します。  
設定内容は下記の通りです。  

*   POST先となるURL

カスタム通知について
==========

カスタム通知では任意のURLに対してPOSTリクエストを送信します。  
あらゆるURLを指定可能ですので、リクエストを受け取った側は独自の処理を自由に行ってください。

シークレット（Webhookのセキュリティ保護）
------------------------

microCMSにはWebhookリクエストがmicroCMSからのものであることを検証するためのヘッダ値を付与できます。  
付与にあたってはシークレット値を設定する必要があり、microCMSでは設定することを推奨いたします。  
  
シークレット値が設定されている場合のみ、リクエストのヘッダに`x-microcms-signature: <COMPUTED_HASH>`が付与されます。  
※ペイロードはmicroCMSがシークレット値とリクエストボディからSHA-256を使用したハッシュベースのHMACで生成します。  
  
シークレット値はカスタム通知の設定画面で変更できます。  
シークレット値には極力推測されづらい値を設定してください。（例： `ruby -rsecurerandom -e 'puts SecureRandom.hex(20)'` で生成した値）  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/2549ba6770ca407581c85a141149f7e7/webhook-secret-input.png)

### Signatureの検証

以下2つの値を比較することで検証を行うことができ、リクエストがmicroCMSからのものであることを検証可能です。

*   `x-microcms-signature`ヘッダで受け取った値
*   ペイロード（`request.body` ）と設定したシークレット値を元にした値

一例としてNode.jsの場合、検証は以下のような実装で行うことができます。

    const crypto = require('crypto');
    
    const expectedSignature = crypto
      .createHmac('sha256', <設定したシークレット>)
      .update(request.body)
      .digest('hex');
    const signature = request.headers['x-microcms-signature'];
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      throw new Error('Invalid signature.');
    }

リクエスト内容
-------

### ヘッダ

リクエストヘッダには `Content-Type: application/json` が含まれます。  
また、上述のシークレットを設定済みの場合は `x-microcms-signature: <SIGNATUR_VALUE>` が含まれます。  
  
任意のリクエストヘッダーを追加することも可能です。**カスタムリクエストヘッダー** の「+」ボタンをクリックして追加してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/102b98487dd444068332a2306723302c/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202023-05-11%2015.09.39.png)  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/44861c7e4fb64964b9191bc9d2bd69fa/CleanShot%202025-02-07%20at%2010.27.49.png)

セキュリティの観点から、microCMSのドメイン（.microcms.io, .microcms-management.io）宛てにWebhookを設定することを制限しています。

### ボディ

リクエストボディには対象となったコンテンツやAPIの情報が含まれます。

    {
      service: 'webhook-test',
      api: 'news',
      id: 'x2xkcwog9521',
      type: 'edit',
      contents: {
        old: {
          id: 'x2xkcwog9521',
          status: ['DRAFT'],
          draftKey: 'Vyf_XTclTY',
          publishValue: null,
          draftValue: {
            id: 'x2xkcwog9521',
            createdAt: '2021-06-02T05:56:24.513Z',
            updatedAt: '2021-06-02T06:05:09.601Z',
            publishedAt: '2021-06-02T06:05:09.601Z',
            revisedAt: '2021-06-02T06:05:09.601Z',
            title: 'タイトルです',
          },
        },
        new: {
          id: 'x2xkcwog9521',
          status: ['PUBLISH'],
          draftKey: null,
          publishValue: {
            id: 'x2xkcwog9521',
            createdAt: '2021-06-02T05:56:24.513Z',
            updatedAt: '2021-06-02T06:05:09.601Z',
            publishedAt: '2021-06-02T06:05:09.601Z',
            revisedAt: '2021-06-02T06:05:09.601Z',
            title: 'タイトルです',
          },
          draftValue: null,
        },
      },
    }

*   `service` - 変更のあったコンテンツが属するサービスのサブドメインが入ります。
*   `api` - API作成時・更新時に指定したエンドポイントが入ります。
*   `id` - コンテンツのidが入ります。APIに関する操作の場合は`null`が入ります。
*   `type` - 変更の種類です。新規追加時は`new`、編集時は`edit`、削除時は`delete`が入ります。（コンテンツの公開ステータスの変更とは関係なく、データに対する変更の種類となります。）
*   `contents` - コンテンツ内容が入ります。APIに関する操作の場合は`null`が入ります。
*   `contents.old` - コンテンツの編集前もしくは削除前の内容が含まれます。コンテンツの新規作成時には`null`が入ります。
*   `contents.old.id` - コンテンツの編集前もしくは削除前のコンテンツの`id`が含まれます。
*   `contents.old.status` - コンテンツの公開状態を配列で示します。公開中は`PUBLISH`、下書き中は`DRAFT`、公開終了は`CLOSED`が含まれます。
*   `contents.old.draftKey` - コンテンツが下書き状態が含まれる場合に、管理画面で取得できる下書きキー（draftKey）が入ります。公開状態のみの場合は`null`が入ります。
*   `contents.old.publishValue` - 公開状態のコンテンツをGET APIで取得した際のjsonデータが含まれます。
*   `contents.old.draftValue` - 下書き状態のコンテンツをGET APIで取得した際のjsonデータが含まれます。
*   `contents.new` - コンテンツの作成後もしくは編集後の内容が含まれます。コンテンツの削除時には`null`が入ります。
*   `contents.new.id` - コンテンツの作成後もしくは編集後のコンテンツの`id`が含まれます。
*   `contents.new.status` - コンテンツの公開状態を配列で示します。公開中は`PUBLISH`、下書き中は`DRAFT`、公開終了は`CLOSED`が含まれます。
*   `contents.new.draftKey` - コンテンツが下書き状態が含まれる場合に、管理画面で取得できる下書きキー（draftKey）が入ります。公開状態のみの場合は`null`が入ります。
*   `contents.new.publishValue` - 公開状態のコンテンツをGET APIで取得した際のjsonデータが含まれます。
*   `contents.new.draftValue` - 下書き状態のコンテンツをGET APIで取得した際のjsonデータが含まれます。

Webhookの動作確認およびデバッグについて
-----------------------

カスタム通知の動作確認およびデバッグの際には、「[devhook](https://devhook.app/)」などのWebhookの検証ツールをご利用いただくと便利です。

### ご利用の流れ

1.  カスタム通知の設定を追加する
2.  カスタム通知のURL欄にdevhookで取得したURLをコピーする
3.  実際に管理画面上でトリガーとなる操作をおこない、devhook上でアウトプットを確認する

**▼アウトプットのイメージ**  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/16f4188a4a1148de90b8da5063f99b87/CleanShot%202023-07-05%20at%2018.23.26%402x.png)

上記のような検証ツールはあくまで外部サービスですので、リクエストボディなどの情報は外部に共有されます。流出させてはいけないデータは使用しないなど、お取り扱いにはご注意ください。

Webhookの有効／無効設定
===============

一時的にWebhookの設定を有効/無効にしたい場合は、Webhook一覧のスイッチを切り替えることで可能です。無効にした場合はWebhookが発行されなくなります。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/6b9edad2657d4306a0abe4d87a1154bf/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202023-05-11%2015.11.28.png)

Webhookの詳細仕様
============

再送
--

Webhookの通知が、ネットワークエラーや4xx、5xxエラーにて失敗した場合でも、リトライ処理は行われません。

重複送信
----

Webhookの通知は、**設定したタイミングにつき1回のみ**行われます。  
  
なお複数コンテンツの削除やステータスの変更を行った場合、リクエストボディが含まれる通知種別については、対象のコンテンツの数だけ通知が実行されます。  
対象となる通知種別は以下の通りです。

1.  GitHub Actions
2.  カスタム通知

順序保証
----

原則として、Webhookの通知は操作の実行順に行われます。  
ただし、厳密な制御は行われていないため、順序は保証されません。

送信元IPアドレス
---------

Webhookの送信元IPアドレスは、動的IPアドレスです。  
また、IPアドレスの範囲も公開しておりません。