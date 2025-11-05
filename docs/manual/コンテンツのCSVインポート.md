---
contentId: csv-import
directory: manual
---

# コンテンツのCSVインポート

コンテンツを**CSVファイルから一括で登録できる**機能です。  
他のCMSからコンテンツを移行するなど、一括でコンテンツを登録する際にお使いいただけます。

コンテンツの登録手順
==========

新規登録の場合
-------

１： 任意のAPIを作成します  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/157f40f4f0464eceae3ee606105d109e/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-07-11%2017.58.08.png)  
  
２：［インポートする］ボタンを押します  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/35c48c84f771449c9972ed41b006d196/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-07-22%2013.42.03.png)  
  
３：サンプルのCSVファイル（input-format.csv）のリンクを押してダウンロードします  
  
サンプルのCSVファイル（input-format.csv）には、登録されているフィールドの種類に応じてサンプル値が入力されています。インポートの際にご活用ください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/239c5fd470ad41e0bbe7c6e0038daadd/csv-import-3.png)

*   ダウンロードできるサンプルのCSV ファイル（input-format.csv）は **UTF-8（BOMなし）でエンコード**されています。編集後も同じ形式で保存してください。
*   お手元のアプリケーションでサンプルファイルを開くとき、CSVファイルが文字化けする場合があります。文字化けした際の対処法については、ヘルプ「[CSVインポート用のサンプルファイルを開くと文字化けします。対処法は？](https://help.microcms.io/ja/knowledge/csv-character-code)」をご確認ください。

  
４：登録したいコンテンツを記入し、CSVファイルを更新・保存します  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/7f1094861f4b4ac2b8cd8d22920b3526/CleanShot%202025-07-31%20at%2011.39.24.png)  
  
５：［ファイルを選択する］ボタンを押して、登録したいCSVファイルを読み込みます  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/40d8df4d7f3349c496fbd084461c4f49/csv-import-5.png)  
  
６：インポートするコンテンツのステータスを選びます（下書き中 or 公開中）  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/80a9d54359b24b26acbdb9ae13fafe8d/csv-import-6.png)

[ロール機能](/manual/roles#h1480a3aa00)をご利用の場合、付与されている「コンテンツ」の権限に応じて、選択可能な項目が異なります。

*   **下書き中**：新規コンテンツを下書き保存する権限を持つ場合に選択できます。
*   **公開中**：新規コンテンツを公開する権限を持つ場合に選択できます。

  
7：［◯件のインポートを開始］ボタンを押します  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/adcc9f3f88a64353bc5c489df35aa376/csv-import-7.png)  
  
８：インポート処理が実施されます。登録が完了するまでは、数分程度要する場合があります。  
  
９：処理が正常に完了した場合は、「インポートが完了しました」というメッセージが表示され、コンテンツ登録が完了します。エラーが表示された場合は、エラーメッセージの内容を確認してください。  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/e094554db4eb41df8c98f3712530928d/CleanShot%202023-10-16%20at%2016.06.29.png)

途中追加の場合
-------

１： 任意のAPIを選択します  
２：［インポートして追加］ボタンを押します  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/8a36397beb224d5896084a3e0e58e9e7/CleanShot%202025-03-19%20at%203%E2%80%AF.06.23.png)  
  
３：このあとは、新規登録の場合の手順3以降と同様の流れとなります  
  
![](https://images.microcms-assets.io/assets/d6af1616730544a596d299c20834f460/cf313e7dfce74179afc7b620f01a7b5e/csv-import-6.png)

入力形式のルール
========

*   [リスト形式](/manual/create-api#h75db320363)のAPIのみご利用いただけます。
*   [非対応のフィールド](/manual/csv-import#hd2bed78bf9)がございます。
*   CSVファイルは**文字コード UTF-8（BOMなし）** でインポートしてください。

対応フィールドとその入力形式
--------------

フィールド名

入力形式

入力例 (\*1)

テキストフィールド

任意のテキスト

テキスト

テキストエリア

任意のテキスト

複数行のテキストを入力

こんにちは

リッチエディタ

HTML文字列 (\*2)

<p>複数行のテキストを入力<br />こんにちは</p>

旧リッチエディタ

任意のテキスト (\*3)

複数行のテキストを入力

こんにちは

画像

microCMSで配信されている画像のURL (\*4)

https://images.microcms-assets.io/assets/xxxx/yyyy/sample.png

複数画像

microCMSで配信されている画像のURLをカンマ区切りで指定 (\*5)

https://images.microcms-assets.io/assets/xxxx/yyyy/sample1.png,  
https://images.microcms-assets.io/assets/xxxx/yyyy/sample2.png

日時

ISO 形式 (ISO 8601)

2024-01-01T00:00:00Z

真偽値

TRUE または FALSE

TRUE

セレクトフィールド

選択肢として設定されている要素

選択肢1

セレクトフィールド（複数選択可）

選択肢として設定されている要素をカンマ区切りで指定

選択肢1,選択肢2

コンテンツ参照

参照先コンテンツのコンテンツID

category01

複数コンテンツ参照

参照先コンテンツのコンテンツIDをカンマ区切りで指定

category01,category02

数字

数字

100

カスタム

JSON（登録可能なキーのみ）(\*7)

{"fieldId":"xxxxxxxx","some\_value": "xxxxxxxx"}

繰り返し

JSON配列（登録可能なキーのみ）(\*7)

\[{"fieldId":"xxxxxxxx","some\_value": "xxxxxxxx"},{"fieldId":"xxxxxxxx","some\_value": "xxxxxxxx"}\]

ファイル (\*6)

microCMSで配信されているファイルのURL

https://files.microcms-assets.io/assets/xxxx/yyyy/manual.pdf

拡張フィールド

JSON（登録可能なキーのみ）(\*7)

{"id":"xxxxxxxx", "title":"xxxxxxxx", "description":"xxxxxxxx", "imageUrl":"https://images.microcms-assets.io/assets/xxxxxxxx/yyyyyyyy/sample1.png", "updatedAt":"2025-01-01T00:00:00.000Z","data":{"id": "123"}}

*   (\*1) テキストエディタなどからCSVファイルを編集する場合、入力値に改行やカンマ(,)を利用する際は、ダブルクォーテーション(")で囲む必要があります。
*   (\*2) **リッチエディタにて対応しているHTMLの範囲のみ入稿することが可能**です。すべてのHTMLの記法に対応しているわけではないため、ご注意ください。利用できるフォーマットは[リッチエディタのWRITE API](https://document.microcms.io/manual/rich-editor-write-api)と同様です。
*   (\*3) プレーンテキストでの登録のみ可能です。文字の装飾を付与した状態での登録はできません。
*   (\*4) [メディアのカスタムドメイン設定](/manual/custom-domain)を利用している場合、カスタムドメインのURLでも指定可能です。複数画像、ファイルも同様です。
*   (\*5) 1つのフィールドに対して、最大100枚までインポートできます。
*   (\*6) Hobbyプランは対象外です。
*   (\*7) CSVフォーマットの仕様上、テキストエディタなどから編集する際には`"`は`""`で登録する必要があります。

制約事項
----

*   一度にインポートできるコンテンツ数の上限は、プランによって異なります。詳細については、[料金ページ](https://microcms.io/pricing)をご確認ください。

インポートのエラー
=========

コンテンツのインポート時には、管理画面からデータを登録する場合と同様に、[各入力項目に設定されたルール](/manual/api-model-settings#h31cd4280f0)等に基づいて内容のチェックが行われます（バリデーション）。  
インポート対象のコンテンツに**1件でもエラーがある場合、その時点で処理は中断され、コンテンツは追加されません**。

よくあるエラーの例
---------

*   「[必須項目](/manual/api-model-settings#hd68005eb4a)」がONになっているのに、入力されていない
*   [コンテンツID](/manual/content-id-setting)の形式が正しくない

CSVインポートに固有のエラー
---------------

各フィールドのバリデーションに加えて、CSVファイル内のデータに下記のような問題がある場合も、同様にエラーとなります。

*   CSVの列数とAPIスキーマのフィールド数が合わない
*   インポートするコンテンツの件数がプランの上限を超えている

その他の仕様
======

*   コンテンツIDは空白でも登録可能です（重複は不可）。
*   コンテンツの並び順については、CSVファイルの見た目通りに登録されます（2行目の記載内容が、管理画面の先頭に表示されます）。

参考情報
====

サービスにコンテンツを一括登録する方法として、CSVインポートの他にWRITE系APIによる登録もございます。  
それぞれの特長や使い分けについては、以下のブログ記事にて詳しくご紹介していますので、ぜひご参照ください。

https://blog.microcms.io/how-to-register-a-large-amount-of-content