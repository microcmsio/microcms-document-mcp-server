---
contentId: ip-restriction
directory: manual
---

# 管理画面のIP制限

管理画面へのアクセスをIPアドレス単位で制限できる機能です。セキュリティ対策の一環としてご活用ください。

管理画面のIP制限はBusinessプラン、Enterpriseプランでご利用いただける機能です。  
プランごとに利用できる機能については、[料金プランページ](https://microcms.io/pricing)をご覧ください。

設定方法
====

「サービス設定」→「セキュリティ」→「IP制限」へと進み、アクセスを許可するIPアドレスを入力し、［変更する］ボタンを押してください。IPv4 / IPv6のCIDR記法に対応しています。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/1274d8001e114899ab34bbffccfbbcec/CleanShot%202025-03-18%20at%2018.06.37.png)

設定できる許可IPアドレスの上限数はプランによって異なります。

*   Businessプラン：30個
*   Enterpriseプラン：100個（ご要望に応じて調整可能）

指定されたIPアドレス以外からアクセスがあった場合
-------------------------

指定されたIPアドレス（もしくは範囲外のIPアドレス）以外からは、管理画面にはアクセス不可能となります。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/e05b11a0af39484cb2fe2b45ac95fba1/CleanShot%202025-03-18%20at%2018.05.43.png)