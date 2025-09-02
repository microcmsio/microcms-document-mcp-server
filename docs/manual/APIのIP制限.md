---
contentId: api-ip-restriction
directory: manual
---

# APIのIP制限

APIのIP制限は、コンテンツAPIやマネジメントAPIへのアクセスに対して、IP制限をかけることができる機能です。セキュリティ対策の強化のために、ご活用いただけます。

APIのIP制限はBusinessプラン、Enterpriseプランでご利用いただける機能です。  
プランごとに利用できる機能については、[料金プランページ](https://microcms.io/pricing)をご覧ください。

制限対象
====

*   コンテンツAPI（すべてのエンドポイント）
*   マネジメントAPI（すべてのエンドポイント）

設定方法
====

制限は以下の単位で設定することが可能です。

*   環境（同じ環境内に所属するすべてのAPI）
*   API

IPv4 / IPv6のCIDR記法に対応しています。

*   すべてのAPIにほぼ同一の制限をかける場合は、環境単位でIPアドレスを設定した上で、必要なAPIのみ上書きしてください。
*   特定のAPIのみ制限をかける場合は、環境単位では設定を行わず、必要なAPIにIPアドレスを設定してください。

環境単位での設定
--------

環境単位でのIP制限は、「サービス設定」→「APIのIP制限」より設定が可能です。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/38b0809fba3443a7ac2e25ba3f3c789e/CleanShot%202024-04-17%20at%205%E2%80%AF.19.07%402x.png)  
  
アクセスを許可するIPアドレスを入力し、「変更する」ボタンを押下してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/6ef0ef29d3ba433abf169b63f69d3ced/CleanShot%202024-04-17%20at%205%E2%80%AF.30.40%402x.png)  

API単位での設定
---------

API単位でのIP制限は、対象のAPIの「API設定」→「APIのIP制限」より設定が可能です。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/1aa6cfaca6c14f7fa37bf3dc05de5def/CleanShot%202024-04-18%20at%2010%E2%80%AF.18.14%402x.png)  
  
「個別に設定する」をオンにした後、アクセスを許可するIPアドレスを入力し、「変更する」ボタンを押下してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/850b9496d9c9445ea282a5ac06bba9cf/CleanShot%202024-04-18%20at%2010%E2%80%AF.22.24%402x.png)

一つのAPIに設定できる許可IPアドレスの上限数はプランによって異なります。

*   Businessプラン：30個
*   Enterpriseプラン：100個（ご要望に応じて調整可能）

補足事項
====

指定されたIPアドレス以外からリクエストがあった場合
--------------------------

HTTPのステータスとして `400 Bad Request` のレスポンスが返却されます。メッセージは以下の通りです。

    {
        "message": "IP address rejected"
    }