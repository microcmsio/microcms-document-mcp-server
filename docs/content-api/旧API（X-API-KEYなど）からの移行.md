---
contentId: from-oldapikey-to-x-microcms-apikey
directory: content-api
---

# 旧API（X-API-KEYなど）からの移行

このセクションについては、2021年10月22日までに作成されたサービス（APIキー）を対象としています。それ以降にサービスを作成された方は、移行作業を実施する必要はございません。

旧形式APIキー（X-API-KEY、X-WRITE-API-KEY、X-DRAFT-API-KEY）からX-MICROCMS-API-KEYへの移行について解説します。  
  
X-MICROCMS-API-KEYについては[こちら](https://document.microcms.io/content-api/x-microcms-api-key)のページをご覧ください。  

X-MICROCMS-API-KEYへの移行について
==========================

以前は X-API-KEY などのヘッダを使ってリクエストを行う必要がありました。

    // 通常のデータ取得
    $ curl "https://<subdomain>.microcms.io/api/v1/<endpoint>" \
        -H "X-API-KEY: <旧APIキー>"
    
    // 下書きデータの取得
    $ curl "https://<subdomain>.microcms.io/api/v1/<endpoint>" \
        -H "X-API-KEY: <旧APIキー>" \
        -H "X-GLOBAL-DRAFT-KEY: <旧APIキー>"
    
    // データの書き込み
    $ curl -X POST "https://<subdomain>.microcms.io/api/v1/<endpoint>" \
        -H "X-WRITE-API-KEY: <旧APIキー>"

仕様変更後、APIキーは **X-MICROCMS-API-KEY** ヘッダに統一されました。管理画面からAPIキーの設定を行うことによって、下書き取得や書き込みに関する権限管理が行えますので、リクエストヘッダの記載を統一することができます。  
[https://document.microcms.io/content-api/x-microcms-api-key](https://document.microcms.io/content-api/x-microcms-api-key)  
  
移行後のAPIキーの指定方法は、以下のようになります。

    $ curl "https://<subdomain>.microcms.io/api/v1/<endpoint>" \
        -H "X-MICROCMS-API-KEY: <旧APIキー>"

SDKを利用している場合は、最新版へのアップデートを行なった上、Readmeに記載の方法にて、APIキーの指定を行ってください。

### 作成済みのAPIキーの自動移行について

旧形式APIキーでX-API-KEY、X-WRITE-API-KEY、X-DRAFT-API-KEYを作成していた場合、それぞれ3種類のX-MICROCMS-API-KEYが生成されています。  
各旧APIキーのデフォルト権限は以下の通りです。

*   X-API-KEY → **GETのみON**
*   X-WRITE-API-KEY → **すべてOFF**
*   X-GLOBAL-DRAFT-KEY → **GET、下書きの全取得のみON**

*   X-GLOBAL-DRAFT-KEYのGET権限については、2023年2月20日に追加で付与されました。
*   [HTTPメソッドの設定](https://blog.microcms.io/http_post_api/)を行なっていた場合は、[個別権限](https://document.microcms.io/content-api/x-microcms-api-key#hbbcd75efe4)として移行されています。

### 移行期限について

現時点では、X-API-KEYなどの旧ヘッダも引き続き利用することが可能です。ただし将来的な廃止についても検討しておりますので、可能な限りで移行の実施をお願いします。