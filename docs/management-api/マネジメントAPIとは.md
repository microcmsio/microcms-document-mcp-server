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
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/1299889d582144f3bee7318f5e62993c/CleanShot%202026-04-10%20at%2015.09.53%402x.png)

https://document.microcms.io/content-api/x-microcms-api-key

制限事項
====

*   マネジメントAPIの全体に関わる制限事項については、[制限事項のドキュメント](https://document.microcms.io/manual/limitations#h0f65c647eb)をご参照ください。
*   各APIにおける制限事項は、それぞれの個別ページをご参照ください。

APIの種類
======

サービス
----

サービスに関するAPIです。

https://document.microcms.io/management-api/get-service

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

https://document.microcms.io/management-api/get-members

API
---

管理画面で定義したAPIに関連するAPIです。

https://document.microcms.io/management-api/get-api-list

https://document.microcms.io/management-api/get-api-info