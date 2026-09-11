---
contentId: export-and-import-api-schema
directory: manual
---

#  APIスキーマのエクスポート／インポート

別サービスで類似のAPIを作成する場合などのため、microCMSではAPIスキーマのエクスポート／インポートに対応しています。  
APIスキーマをJSONファイルとしてエクスポートし、APIの作成時にこのJSONファイルをインポートすることで手動による設定を省くことができます。

APIを利用してAPIスキーマを取得することもできます。  
詳しくは、[マネジメントAPIのドキュメント](/management-api/get-api-info)をご覧ください。

APIスキーマのエクスポート
==============

まずはエクスポート方法について説明します。  
APIスキーマをエクスポートしたいコンテンツを選択し、「API設定」→「APIスキーマ」を選択してください。  
  
次に画面の下部に「この設定をエクスポートする」というボタンが表示されているのでこちらをクリックしてください。  
エクスポート結果であるJSONファイルをダウンロードできます。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/05fd01c8393b4212bf4785f0e889cdac/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202023-03-13%2017.48.27.png)

権限によってはこちらの画面に到達できないことや、下記のインポート操作ができない場合があります。  
そのような場合には[権限管理](/manual/roles)状態をご確認いただくか、サービスの管理者様にお問い合わせください。

  

APIスキーマのインポート
=============

まずはインポート方法について説明します。  
  
管理画面左部にあるメニュー欄の①よりAPIの作成を開始します。  
APIの基本情報の入力やAPIの型選択をした後に、下記の「APIスキーマを定義」の画面が表示されるので、②の「ファイルインポートする場合はこちらから」のリンクからファイルを選択してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/884d1175e4da4c7cbfaf831177537f21/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202023-03-13%2017.56.11.png)

インポート用JSONの用意
-------------

インポートに使用するJSONファイルは、以下のいずれかの方法で用意します。

### エクスポートしたJSONファイルを使用する

[既存のAPIスキーマをエクスポート](#hce5de2e41a)し、そのJSONファイルをそのままインポートする方法です。別プロジェクトや別環境へスキーマを複製する際に適しています。

### 独自にJSONファイルを作成・編集する（開発者向け）

特定のフィールド構成を自由に構築したい場合、本ドキュメントの仕様に沿ってJSONファイルを作成できます。  
ゼロから作成すると構造エラーが起きやすいため、以下のJSONをダウンロードし、編集して利用することを推奨します。



*   **動作保証について**：本ドキュメントに記載してある仕様に準拠していないJSONをインポートすると、予期しないエラーが発生する可能性がありますのでご注意ください。なお、独自に作成・編集されたJSONファイル、およびそのインポート結果については動作保証いたしかねます。
*   **不具合時の対応**：万が一、インポート後に管理画面の表示に異常が発生した場合は、対象のAPIを削除して再作成してください。原因の特定ができない、あるいは対処が困難な場合は、管理画面右下のチャットサポートからお問い合わせください。

JSONデータの基本構造
============

インポート用JSONは、フィールドを定義するための配列 `apiFields` と、カスタムフィールドを定義するための配列 `customFields` の2つで構成されます。  
以下はJSONデータの例です。

    {
      "apiFields": [
        {
          "fieldId": "title",
          "name": "タイトル",
          "kind": "text",
          "description": null,
          "required": false,
          "textSizeLimitValidation": null,
          "patternMatchValidation": null,
          "isUnique": false,
          "initialValue": null
        },
        {
          /* 2つ目以降の通常フィールドをここに追加します */
        }
      ],
      "customFields": [
        {
          "fieldId": "profile",
          "name": "プロフィール",
          "fieldOrderByColumn": [["name"], ["bio"]],
          "fields": [
            {
              "fieldId": "name",
              "name": "名前",
              "kind": "text",
              "description": null,
              "required": false,
              "textSizeLimitValidation": null,
              "patternMatchValidation": null,
              "isUnique": false,
              "initialValue": null
            },
            {
              "fieldId": "bio",
              "name": "自己紹介",
              "kind": "textArea",
              "description": null,
              "required": false,
              "textSizeLimitValidation": null,
              "patternMatchValidation": null,
              "initialValue": null
            },
            {
              /* このカスタムフィールド内の3つ目以降のフィールドをここに追加 */
            }
          ]
        },
        {
          /* 2つ目以降のカスタムフィールドを定義する場合は、ここに追加します */
        }
      ]
    }

フィールド（apiFields） / カスタムフィールド（customFields）の設定
---------------------------------------------

各フィールド・カスタムフィールドに指定できるプロパティや制約は、マネジメントAPI POST /api/v1/apis のリクエストボディで指定する apiFields / customFields と概ね共通です。  
詳しくは、以下のドキュメントをご参照ください。

### フィールド（apiFields）

https://document.microcms.io/management-api/post-apis#h06802863f3

### カスタムフィールド（customFields）

https://document.microcms.io/management-api/post-apis#h34957f099a

コンテンツ参照・複数コンテンツ参照フィールドでは、`referencedApiEndpoint` に参照先APIのエンドポイントを指定します。  
マネジメントAPIのAPI作成リクエストでは参照先APIの指定が必須ですが、インポート用JSONでは `referencedApiEndpoint` に `null` を指定して読み込むことができます。  
参照先APIを指定せずにインポートした場合は、インポート後に管理画面から参照先APIを設定してください。

サンプルデータのダウンロード
--------------

カスタムフィールドや繰り返しフィールドの構築では、階層的なデータ構造を正確に定義する必要があります。ゼロからの作成による構造エラーを防ぎ、よりスムーズに設定を進めるためのベースとして、以下の構成済みサンプルJSONをご活用ください。  

### **単一階層の繰り返しフィールド**



### **多階層（3層ネスト）の繰り返しフィールド**

