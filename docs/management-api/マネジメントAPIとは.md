---
contentId: introduction
directory: management-api
---

# マネジメントAPIとは

現在はこちらの機能は[ベータ版](/manual/limitations#h0f65c647eb)でご提供しております。

マネジメントAPIを用いることで、管理画面内の情報取得や操作を、API経由で行うことができます。例えば、コンテンツであれば、公開予約日時の取得や公開状態の変更が可能です。

ベースURL
======

`https://{SERVICE_ID}.microcms-management.io`

コンテンツAPIとはドメインが異なります。ご注意ください。

仕様
==

マネジメントAPIの利用には、APIキーによる認証が必要となります。APIキーに対しては、権限を付与することで利用可能な操作を制限することができます。詳細はAPIキーのドキュメントをご確認ください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/870b5e64b7344691ae5097b55ce47fb5/CleanShot%202025-08-21%20at%2011.41.17.png)

https://document.microcms.io/content-api/x-microcms-api-key

制限事項
====

*   マネジメントAPIの全体に関わる制限事項については、[制限事項のドキュメント](https://document.microcms.io/manual/limitations#h0f65c647eb)をご参照ください。
*   各APIにおける制限事項は、それぞれの個別ページをご参照ください。

APIの種類
======

コンテンツ
-----

コンテンツに関連するAPIです。  
コンテンツAPIとの違いとして、コンテンツの作成者やステータスなど、管理画面内のみ閲覧可能な情報の取得が可能となっています。

https://document.microcms.io/management-api/get-list-contents-management

https://document.microcms.io/management-api/get-content

https://document.microcms.io/management-api/patch-contents-status

https://document.microcms.io/management-api/patch-contents-created-by

メディア
----

メディア（画像、ファイル）に関連するAPIです。

https://document.microcms.io/management-api/get-media

https://document.microcms.io/management-api/get-media-v2

https://document.microcms.io/management-api/post-media

https://document.microcms.io/management-api/delete-media-v2

メンバー
----

メンバーに関連するAPIです。

https://document.microcms.io/management-api/get-member

API
---

管理画面で定義したAPIに関連するAPIです。

https://document.microcms.io/management-api/get-api-info