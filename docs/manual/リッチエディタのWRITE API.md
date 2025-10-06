---
contentId: rich-editor-write-api
directory: manual
---

# リッチエディタのWRITE API

リッチエディタではWRITE APIを用いて、HTML文字列で入稿することができます。例えば旧リッチエディタからの移行や、他CMSからの移行にご活用できます。

*   **リッチエディタにて対応しているHTMLの範囲のみ入稿することが可能**です。すべてのHTMLの記法に対応しているわけではないため、ご注意ください。
*   旧リッチエディタではHTML文字列での入稿に対応していません。

基本ルール
=====

*   リクエストに渡すHTML文字列は、ダブルクォーテーションのエスケープ(`\"`)もしくはシングルクォーテーション(`'`)への置換が必要となります。
*   表示の都合上、当ドキュメントでは改行を含めてHTMLを表示していますが、実際のリクエストには改行を含めないでください。

見出し、段落
======

_h1_〜_h5_、_p_タグに対応しています。ハッシュ化した_id_の指定はパース時に適用されませんが、APIのレスポンスには含まれます。

    <h1>見出し1</h1>

改行と段落
=====

テキストの中に_br_タグがある場合、改行としてパースされます。

    // 段落
    <p>Enterを押すと</p>
    <p>次の段落になります。</p>
    
    // 改行
    <p>Shift + Enterを押すと<br>改行になります。</p>

太字
==

_strong_タグの場合、太字としてパースされます。

    <strong>太字になるテキスト</strong>

斜体
==

_em_タグの場合、斜体としてパースされます。

    <em>斜体になるテキスト</em>

下線
==

_u_タグの場合、下線としてパースされます。

    <u>下線がひかれるテキスト</u>

打ち消し線
=====

_s_タグの場合、打ち消し線としてパースされます。

    <s>打ち消し線が入るテキスト</s>

コード
===

_code_タグの場合、コードとしてパースされます。

    <code>console.log('Hello microCMS!')</code>

文字色
===

`span`タグの`style`属性に`color`プロパティを指定することで、文字色としてパースされます。

    <span style='color: #ff0000'>文字色</span>

*   カラーコードの指定は、HEX形式の他に、RGB形式やRGBA形式にも対応しています。ただし、いずれの指定方式の場合でも、レスポンスのHTMLにはHEX形式が用いられます。
*   [API設定](/manual/api-model-settings#hb1ed0b00a4)で「色のプリセットのみを表示し、カラーピッカーを非表示にする」を有効にした場合、プリセットに指定したカラーコード以外は適用されません。

文字サイズ
=====

現在は未対応です。

テキスト寄せ
======

styleに_text-align_を指定することによって、左揃え / 中央揃え / 右揃え の指定ができます。  
  
左揃え（デフォルト）

    <p>左揃えのテキスト</p>

中央揃え

    <p style='text-align:center'>中央揃えのテキスト</p>

右揃え

    <p style='text-align: right'>右揃えのテキスト</p>

区切り線
====

_hr_タグの場合、区切り線としてパースされます。

    <hr>

引用
==

_blockquote_タグの場合、引用としてパースされます。

    <blockquote>引用されたテキスト</blockquote>

コードブロック
=======

_pre_タグの中に_code_タグを指定した場合、コードブロックとしてパースされます。

    <pre>
      <code>const greeting = 'Hello microCMS!';\nconsole.log(greeting);</code>
    </pre>

コードブロックにはファイル名と言語を指定できます。_div_タグの_data-filename_の値を指定すると、ファイル名としてパースされます。また、_code_タグの_class_に値を指定することで、言語としてパースされます。

    <div data-filename='greeting.js'>
      <pre>
        <code class='language-javascript'>const greeting = 'Hello microCMS!'; console.log(greeting);</code>
      </pre>
    </div>

テーブル
====

_table_タグ > _tbody_タグ > _tr_タグ > _th_タグ or _td_タグの構造を作ることで、テーブルとしてパースすることができます。最初の行または列をヘッダーにしたい場合は_th_タグにします。また、セルの結合としてパースしたい場合は、**colspan**と**rowspan**の値を指定してください。

    <table>
      <tbody>
        <tr>
          <th colspan='1' rowspan='1'>
            <p>Company</p>
          </th>
          <th colspan='1' rowspan='1'>
            <p>Location</p>
          </th>
        </tr>
        <tr>
          <td colspan='1' rowspan='1'>
            <p>microCMS</p>
          </td>
          <td colspan='1' rowspan='1'>
            <p>Tokyo</p>
          </td>
        </tr>
      </tbody>
    </table>

リスト
===

_ul_タグの中に_li_タグを指定した場合、リストとしてパースされます。

    <ul>
      <li>りんご</li>
      <li>みかん</li>
    </ul>

ネストした構造でもパースすることができます。

    <ul>
      <li>日本
        <ul>
          <li>東京都</li>
          <li>大阪府</li>
          <li>埼玉県</li>
        </ul>
      </li>
      <li>アメリカ</li>
    </ul>

*   ネストが深い構造となった場合、データベースの保存の制約上、エラーが発生する可能性があります。構造によって、設定可能なネストの数は異なりますので、ご不明な点がございましたら右下のチャット欄よりお問い合わせください。

番号付きリスト
=======

_ol_タグの中に_li_タグを指定した場合、番号付きリストとしてパースされます。

    <ol>
      <li>アカウント登録</li>
      <li>サービス登録</li>
      <li>APIを作成する</li>
    </ol>

*   ネストが深い構造となった場合、データベースの保存の制約上、エラーが発生する可能性があります。構造によって、設定可能なネストの数は異なりますので、ご不明な点がございましたら右下のチャット欄よりお問い合わせください。

リンク
===

_a_タグ内の_href_にURLを指定した場合、リンクとしてパースされます。

    <p><a href='https://microcms.io'>ここにリンク</a></p>

_a_タグ内に_target='\_blank'_を指定することで、別タブで開く設定としてパースすることができます。_rel_の値はパース時には適用されませんがAPIのレスポンスには含まれます。

    <p><a href='https://microcms.io/pricing/' target='_blank'>microCMSの料金ページ</a></p>

画像
==

_img_タグ内に_src_が指定されている場合、画像としてパースされます。_src_の値はmicroCMSの画像ドメインのみ有効で、外部URLは非対応となります。また、画像のURLが正しくない場合や、別サービスの画像を指定した場合 (サービスIDが一致しない場合) はパースされません。  
  
値が設定されていない場合、_alt_は `""`（空文字）、_width_ と _height_ は画像のオリジナルサイズが指定されます。

    <img src='https://images.microcms-assets.io/assets/service/test/file.png'
            alt='' width='1200' height='630' />

_a_タグ内に_img_タグを指定した場合、リンクの画像としてパースされます。

    <a href='https://example.com'>
      <img src='https://images.microcms-assets.io/assets/service/test/file.png' alt='' width='1200' height='630' />
    </a>

_src_のURLに_w_と_h_のクエリストリングに値を指定すると、カスタムWidth、カスタムHeightとしてパースされます。_w_と_h_を両方指定しないとパースは適用されません。

    <img src='https://images.microcms-assets.io/assets/service/test/file.png?w=1200&h=630'
            alt='' width='1200' height='630' />

_figure_タグの場合でも上記挙動は変わりません。ただし、_figcaption_を指定したい場合は、_figure_タグを指定する必要があります。

    <figure>
      <img src='https://images.microcms-assets.io/assets/service/test/file.png' alt='' width='1200' height='630' />
      <figcaption>caption</figcaption>
    </figure>

メディアのカスタムドメインが設定されているサービスの場合、設定されているドメインの画像を指定することができます。

    <img src='https://images.example.com/assets/service/test/file.png' alt='' width='1200' height='630' />

`src`に外部URLの画像を指定する場合の方法については、ヘルプ記事「[WRITE APIでリッチエディタにコンテンツを登録する際、imgタグ内で外部URLの画像を指定する方法は？](https://help.microcms.io/ja/knowledge/write-api-external-img)」をご覧ください。

画像の横位置
======

`figure` タグの`style` 属性に`text-align` を指定することで、画像の左揃え / 中央揃え / 右揃え の指定ができます。

    <figure style='text-align: left;'>
      <img src='https://images.microcms-assets.io/assets/service/test/file.png'
              alt='' width='1200' height='630' />
    </figure>

ファイル
====

`a`タグ内の`href`にURLを指定し、`data-embed-type="file"`を指定した場合、ファイルとしてパースされます。

    <p><a data-embed-type='file' href='https://files.microcms-assets.io/assets/service/test/file.pdf'>file.pdf</a></p>

`href`の値はmicroCMSのファイルドメインのみ有効で、外部URLは非対応となります。また、下記の場合はテキストとしてパースされます。

*   ファイルのURLが正しくない場合
*   別サービスのファイルを指定した場合 (サービスIDが一致しない場合)
*   `data-embed-type`に`file`以外を指定した場合

また、下記の場合は通常のaタグとしてパースされます。

*   `data-embed-type` を指定しなかった場合

メディアのカスタムドメインが設定されているサービスの場合、設定されているドメインを指定できます。

    <p><a data-embed-type='file' href='https://files.example.com/assets/service/test/file.pdf'>file.pdf</a></p>

カスタムclass
=========

_span_タグ内の_class_に値を指定した場合、カスタムclassとしてパースされます。カスタムclassが設定されていない場合は、単純な_p_タグのテキストとしてパースされます。

    <p><span class='highlight'>ハイライトされたテキスト</span></p>

埋め込み編集
======

現在は未対応です。

ツールバーの編集
========

リッチエディタでは装飾ボタンをカスタマイズすることができます。装飾ボタンがオフになっている場合パースは適用されません。例えば、太字がオフになっている場合_strong_タグはパースされず、単純な_p_タグのテキストになります。

    <p>太字になるテキスト</p>

HTMLの解析に失敗した場合
==============

該当の箇所は、基本的に段落のテキスト（pタグ）としてパースされます。  
またリクエストの内容によっては、500番台のステータスコードにてレスポンスが返却され、データ登録に失敗するケースがあります。