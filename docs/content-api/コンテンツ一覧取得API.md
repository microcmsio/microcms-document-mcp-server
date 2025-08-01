---
contentId: get-list-contents
directory: content-api
---

# GET /api/v1/{endpoint}

リスト形式のAPIにおいてはコンテンツ一覧が取得でき、オブジェクト形式のAPIにおいては単一コンテンツの取得ができます。  
  
オブジェクト形式のAPIの場合は_GET /api/v1/{endpoint}/{content\_id}_と同様の結果が得られるので[そちら](/docs/content-api/get-content)をご参照ください。  
ここではリスト形式のAPIの場合におけるリクエストヘッダー、クエリパラメータ、レスポンスについて解説します。

リクエストヘッダー
=========

X-MICROCMS-API-KEY
------------------

GET APIリクエストの際に必要な認証キーです。  
デフォルト権限もしくは個別権限で「GET」を有効にして、リクエストヘッダーに含めて送信してください。

X-MICROCMS-API-KEYが判別できると、第三者による不正なコンテンツの操作が可能となります。お取り扱いには十分ご注意ください。詳細は「[APIキー（APIの認証と権限管理）](https://document.microcms.io/content-api/x-microcms-api-key)」をご覧ください。

クエリパラメータ
========

本APIには下記に示すパラメータを指定できます。  
なお、各フィールドごとに指定可能なクエリパラメータの一覧について「[GET APIにおけるクエリパラメータの指定](https://document.microcms.io/content-api/content-api-query)」をご覧ください。  

draftKey
--------

下書き状態のコンテンツを取得するためのパラメータです。 コンテンツの編集画面で確認できる_draftKey_をパラメータとして追加してください。  
_draftKey_を使って取得できる下書きコンテンツは通常1つのみです。  
複数の下書き状態のコンテンツを同時に取得したい場合には、デフォルト権限もしくは個別権限で「下書き全取得」を有効にしてリクエストをしてください。

limit
-----

取得件数を指定します。  
デフォルト値は`10`です。上限値は`100`です。

レスポンスサイズ（レスポンスヘッダのcontent-lengthの値）が約5MBを超えるとエラーが発生します。

全件取得など、101件以上のコンテンツを取得したい場合の方法については、「[101件以上のコンテンツを取得するにはどうしたらよいですか？](https://help.microcms.io/ja/knowledge/fetch-big-data)」をご参照ください。

offset
------

コンテンツを取得開始する位置を、指定した値だけ後ろにずらします。  
デフォルト値は`0`です。

orders
------

取得するコンテンツの並び替えを行います。  
デフォルトは**管理画面のコンテンツの表示順**です（qパラメータを除く）。

###   

並び替え対象とするフィールド名を`orders=publishedAt` の形式で指定してください。  
また、降順を指定する場合はフィールド名の先頭に `-（マイナス）` を付与してください。

*   降順：`-publishedAt`
*   昇順：`publishedAt`

さらに、複数のフィールドを並び替え対象とする場合は `orders=publishedAt,-updatedAt` のようにカンマ区切りで指定してください。

ordersパラメータで並び替えを行う対象のフィールドの値が同じだった場合、返却されるコンテンツの順序は定まっておりません。この場合、並び順を明示的に制御するには、`orders=publishedAt,-updatedAt` のように複数のフィールドを並び替えの対象にする方法をご検討ください。

### 指定可能な並び順について

並び替えが可能なのは以下のフィールド、並び順となります。  
これ以外のフィールドを指定した場合の挙動は不定となります。  

#### ユーザーが定義するフィールド

*   テキストフィールド
*   テキストエリア
*   日時
*   数字

#### [自動で付与されるフィールド](/manual/automatic-grant-fields)

*   `createdAt`
*   `publishedAt`
*   `updatedAt`
*   `revisedAt`

#### その他

*   `system:default`（管理画面のコンテンツ表示順）

### 繰り返しフィールド内のフィールドを指定した場合の並び順について

カスタムフィールドが複数挿入されている場合、降順と昇順で並び替えに使用される値が異なります。

#### **降順の場合**

値の中で、**最も大きい値**を基準にして降順で並び替えられます。

#### 昇順の場合

値の中で、**最も小さい値**を基準にして昇順で並び替えられます。

q
-

コンテンツの全文検索を行うことができるパラメータです。登録データを形態素解析して作成されたインデックスを対象に、検索を行います。  
レスポンスは、ordersパラメータを指定しない場合、**キーワードに対する合致度が高い順番**にソートされて返却されます。  

### 検索対象について

qパラメータによる検索は、特定のフィールドではなく、**複数のフィールド**を対象に行われます。  
検索対象となるデータや検索ロジックの詳細は、**内部的な仕様に依存**するため、非公開となっています。  
  
また、内部的な仕様については、精度の向上の目的で、随時変更される可能性があります。

形態素解析の仕様上、検索語句と一致するキーワードの登録があっても、単語の分割位置によっては、検索結果に含まれないことがあります。  
正確な部分一致検索が必要な場合は、filtersパラメータのcontainsの使用をご検討ください。

fields
------

コンテンツの中で取得する要素を指定します。  
_fields=title,main\_image,updatedAt,author.name_のようにカンマ区切りで値を記載してください。_author.organization.name_のようにドットでつないでキーを指定することで参照コンテンツの要素も指定できます。_fields_が指定されていない場合は全ての要素を取得します。

カスタムフィールド内のフィールドについては、指定できません。

ids
---

コンテンツのidを_first\_id,second\_id,third\_id_のようにカンマ区切りで指定することで対象コンテンツのみを取得できます。  

filters
-------

条件を指定することでコンテンツを絞り込んで取得できます。利用できる条件式は以下の通りです。

現在、filters内で指定する条件において、文字列のエスケープはできない仕様となっております。予めご了承ください。

### equals

指定に一致したコンテンツを取得します。  
（例：_gender\[equals\]women_）  

### not\_equals

指定に一致しないコンテンツを取得します。  
（例：_gender\[not\_equals\]women_）  

### contains

指定した値を含むコンテンツを取得します。  
（例：_title\[contains\]おすすめ_）

*   containsを利用した検索では、登録されたデータを一つずつ確認して、検索条件に合致するデータが返却されます。テキストが長い場合、コンテンツ数が多い場合、orやand条件と組み合わす場合などは、レスポンスを返却するまでに時間を要するケースがあります。**パフォーマンスを優先する場合は、qパラメータをご利用ください。**
*   検索対象のフィールドに登録されている文字数が多い場合(10,000文字を超える場合など)は、条件に一致していても、ヒットしないケースがございます。長文の検索は、qパラメータをご利用ください。
*   検索対象がセレクトフィールドの場合は、選択肢の値に対しての部分一致検索は行うことができません。完全一致している選択肢のみヒットします。
*   検索対象が数字フィールドの場合は、ヒットしません。

### not\_contains

指定した値を含まないコンテンツを取得します。  
（例：_title\[not\_contains\]おすすめ_）

containsと同様の注意事項がございますので、ご確認ください。

### less\_than

指定より小さいコンテンツを取得します。  
（例：`createdAt[less_than]2023-11-23T03:00:00.000Z`、`count[less_than]25`）

*   日時を指定する場合、UTCで指定してください。なお、タイムゾーンの指定はできません。
*   指定された値が同じ値の場合は、取得されません。

### greater\_than

指定より大きいコンテンツを取得します。  
（例：`createdAt[greater_than]2023-11-23T03:00:00.000Z`、`count[greater_than]25`）

*   日時を指定する場合、UTCで指定してください。なお、タイムゾーンの指定はできません。
*   指定された値が同じ値の場合は、取得されません。

### exists

指定した値が存在するコンテンツを取得します。  
（例：_nextLink\[exists\]_）  

### not\_exists

指定した値が存在しないコンテンツを取得します。  
（例：_nextLink\[not\_exists\]_）  

### begins\_with

指定した値から始まるコンテンツを取得します。  
（例：_publishedAt\[begins\_with\]2023-11_）

検索対象が数字フィールドの場合はヒットしません。

### filtersパラメータの発展した使い方

#### コンテンツ参照フィールドの指定方法

コンテンツ参照/複数コンテンツ参照を使用していて、参照先のコンテンツによって絞り込みを行う場合、

*   コンテンツ参照の場合は_\[equals\]_（例：_category\[equals\]uN28Folyn_）
*   複数コンテンツ参照の場合は_\[contains\]_（例：_tags\[contains\]oJIZmiban_）

をご利用ください。  
また絞り込みの条件には、**コンテンツID**を使用してください。その他の値は利用できません。  

#### カスタムフィールドの指定方法

カスタムフィールドの場合は、_{フィールドID}.{絞り込みに用いるフィールドID}\[equals\]{VALUE}_とすることで、カスタムフィールド内の値を対象に絞り込みが可能です。  

#### 繰り返しフィールドの指定方法

繰り返しフィールドの場合は、_{フィールドID}.{カスタムフィールドID}.{絞り込みに用いるフィールドID}\[contains\]{VALUE}_とすることで、繰り返しフィールド内の値を対象に絞り込みが可能です。  

#### 条件式の組み合わせ方法

条件式は_\[and\]_（AND条件) もしくは_\[or\]_（OR条件)で 区切ることで複数指定ができます。  
条件式を括弧_()_で囲って一部の式を優先させることも可能です。  
  
例：カテゴリーがエンジニアリングかつ、2019/11/14以降またはタイトルが存在している記事を抽出

    $ curl  "https://{your-service}.microcms.io/api/v1/blog?filters=category[equals]engineering[and](date[begins_with]2019-11-14[or]title[exists])" -H "X-MICROCMS-API-KEY: {api-key}"

上記で付与されている各クエリパラメータは一部の例ですので、実際に利用可能なクエリパラメータについては、「[GET APIにおけるクエリパラメータの指定](https://document.microcms.io/content-api/content-api-query)」をご覧ください。

depth
-----

参照コンテンツを取得する階層の深さを指定します。  
最小値は`0`で、最大値は`3`です。  
デフォルト値は`1`です。  
  
例えば、ブログコンテンツに関連記事を表示するために、自分自身を循環参照しているとします。  
  
例）_depth = 0_の場合

    {
      "id": "id1",
      "title": "title1",
      "body": "body1",
      "related_blog": {
        "id": "id2"
      }
    }

  
例）_depth = 1_の場合

    {
      "id": "id1",
      "title": "title1",
      "body": "body1",
      "related_blog": {
        "id": "id2",
        "title": "title2",
        "body": "body2",
        "related_blog": {
          "id": "id3"
        }
      }
    }

  
例）_depth = 2_の場合

    {
      "id": "id1",
      "title": "title1",
      "body": "body1",
      "related_blog": {
        "id": "id2",
        "title": "title2",
        "body": "body2",
        "related_blog": {
          "id": "id3",
          "title": "title3",
          "body": "body3",
          "related_blog": {
            "id": "id4"
          }
        }
      }
    }

richEditorFormat
----------------

**旧リッチエディタ**のレスポンス形式を変更できます。  
（現行のリッチエディタは対応していないため、ご注意ください。）  

### html（デフォルト）

richEditorFormatに `html` を指定した場合、HTMLとして取得できます。  
デフォルトの設定になっており、パラメータに何も指定しない場合もこちらが適用されます。  

    {
        "title": "更新情報",
        "content": "<h2 id=\"h5ca2740170\">Hello World</h2><p>リッチエディタのフォーマットを<strong>変更</strong>できるようになりました。<br><br><img src=\"https://images.microcms-assets.io/assets/9f54a34e853e4bee98b47ce18c0713f1/c22bcc0296204e81889119c2ffa9a883/domenico-loia-hGV2TfOh0ns-unsplash.jpg\" alt=\"\"><br></p>",
    }

### object

richEditorFormatに `object` を指定するとオブジェクト型で取得できます。  

    {
        "title": "更新情報",
        "content": {
            "contents": [
                {
                    "type": "block",
                    "value": [
                        {
                            "type": "text",
                            "value": "Hello World",
                            "attributes": {}
                        }
                    ],
                    "attributes": {
                        "header": 2
                    }
                },
                {
                    "type": "textBlock",
                    "value": [
                        {
                            "type": "text",
                            "value": "リッチエディタのフォーマットを",
                            "attributes": {}
                        },
                        {
                            "type": "text",
                            "value": "変更",
                            "attributes": {
                                "bold": true
                            }
                        },
                        {
                            "type": "text",
                            "value": "できるようになりました。",
                            "attributes": {}
                        },
                        {
                            "type": "text",
                            "value": "\n",
                            "attributes": {}
                        },
                        {
                            "type": "text",
                            "value": "\n",
                            "attributes": {}
                        }
                    ]
                },
                {
                    "type": "image",
                    "value": "https://images.microcms-assets.io/assets/9f54a34e853e4bee98b47ce18c0713f1/c22bcc0296204e81889119c2ffa9a883/domenico-loia-hGV2TfOh0ns-unsplash.jpg",
                    "attributes": {
                        "link": null,
                        "target": null,
                        "alt": null,
                        "width": 640,
                        "height": 427
                    }
                },
            ]
        },
    }

既知の不具合として、richEditorFormatに `object` を指定した際に、リスト形式をネストして利用している箇所が、レスポンスに含まれない事象を確認しています。恐れ入りますが、ご利用にあたっては、あらかじめご了承いただけますと幸いです。

レスポンスボディ
========

レスポンスの例です。

    {
        "contents": [
            {
                "id": "ywsd1lc_z",
                "createdAt": "2022-04-27T02:44:50.280Z",
                "updatedAt": "2022-04-27T02:44:50.280Z",
                "publishedAt": "2022-04-27T02:44:50.280Z",
                "revisedAt": "2022-04-27T02:44:50.280Z",
                "name": "更新情報"
            },
            {
                "id": "t9xe_ys44",
                "createdAt": "2022-04-27T02:44:50.197Z",
                "updatedAt": "2022-04-27T02:44:50.197Z",
                "publishedAt": "2022-04-27T02:44:50.197Z",
                "revisedAt": "2022-04-27T02:44:50.197Z",
                "name": "チュートリアル"
            },
            {
                "id": "4sqeq8g36n8",
                "createdAt": "2022-04-27T02:44:50.068Z",
                "updatedAt": "2022-04-27T02:44:50.068Z",
                "publishedAt": "2022-04-27T02:44:50.068Z",
                "revisedAt": "2022-04-27T02:44:50.068Z",
                "name": "テクノロジー"
            }
        ],
        "totalCount": 3,
        "offset": 0,
        "limit": 10
    }

  
取得したAPIの値は `contents` という配列で返されます。それに加え以下の値がレスポンスに含まれます。  

totalCount
----------

APIに含まれるコンテンツの総数です。  
`filters`パラメータ / `q`パラメータを利用したリクエストの場合のみ、条件に合致するコンテンツの件数となります。  

limit
-----

指定された取得件数の値です。  
デフォルト値は_10_です。  

offset
------

指定された取得開始位置のオフセットの値です。  
デフォルト値は_0_です。

*   自動で付与されるコンテンツIDや日時情報については、「[コンテンツに自動付与される値](https://document.microcms.io/manual/automatic-grant-fields)」をご覧ください。
*   フィールドごとのレスポンス形式の詳細については、「[GET APIのフィールドごとのレスポンス形式](https://document.microcms.io/content-api/get-api-field-responses)」をご覧ください。

レスポンスヘッダ
========

一部のレスポンスヘッダのみ記載しています。記載の項目以外にも付与される項目がありますので、ご注意ください。

x-current-date-time
-------------------

レスポンス時のサーバーサイドの時刻の値です。フォーマットは`ISO 8601`です。

    x-current-date-time: 2023-01-01T00:00:00.000Z

エラーレスポンス
========

[コンテンツAPIのエラーレスポンス](/content-api/api-error-response)を参照ください。