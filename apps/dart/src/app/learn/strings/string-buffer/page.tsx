import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBufferPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">文字列操作</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">StringBuffer</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-yellow-300">StringBuffer</strong>は文字列を効率的に構築するためのクラスです。
            Dartの文字列は不変なので、<code className="text-yellow-300">+</code>演算子で繰り返し連結すると毎回新しい文字列が生成されます。
            StringBufferを使うと内部バッファに追記するため、大量の文字列を結合する場合に大幅に高速になります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">StringBuffer の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">write()</code>・<code className="text-yellow-300">writeln()</code>・<code className="text-yellow-300">writeAll()</code>でバッファに追記し、<code className="text-yellow-300">toString()</code>で文字列化します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final buffer = StringBuffer();

  // write: 追記
  buffer.write('Hello');
  buffer.write(', ');
  buffer.write('Dart');
  buffer.write('!');
  print(buffer.toString());

  // writeln: 改行付き追記
  final buf2 = StringBuffer();
  buf2.writeln('1行目');
  buf2.writeln('2行目');
  buf2.writeln('3行目');
  print(buf2.toString());

  // writeAll: リストの全要素を追記
  final buf3 = StringBuffer();
  buf3.writeAll(['apple', 'banana', 'cherry'], ', ');
  print(buf3.toString());

  // プロパティ
  final buf4 = StringBuffer('初期値');
  print('長さ: \${buf4.length}');
  print('空か: \${buf4.isEmpty}');
  buf4.write(' 追記');
  print(buf4);

  // clear: クリア
  buf4.clear();
  print('クリア後: 空か=\${buf4.isEmpty}');
}`}
          expectedOutput={`Hello, Dart!
1行目
2行目
3行目

apple, banana, cherry
長さ: 3
空か: false
初期値 追記
クリア後: 空か=true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">+ 演算子との比較</h2>
        <p className="text-gray-400 mb-4">
          ループ内での文字列連結にStringBufferを使うとパフォーマンスが改善されます。
        </p>
        <DartEditor
          defaultCode={`// + 演算子による連結（非効率）
String buildWithPlus(int n) {
  String result = '';
  for (int i = 0; i < n; i++) {
    result += 'item\$i,';
  }
  return result;
}

// StringBuffer による連結（効率的）
String buildWithBuffer(int n) {
  final buffer = StringBuffer();
  for (int i = 0; i < n; i++) {
    buffer.write('item');
    buffer.write(i);
    buffer.write(',');
  }
  return buffer.toString();
}

// HTMLビルダーの例
String buildHtmlTable(List<List<String>> rows) {
  final buf = StringBuffer();
  buf.writeln('<table>');
  for (final row in rows) {
    buf.writeln('  <tr>');
    for (final cell in row) {
      buf.writeln('    <td>\$cell</td>');
    }
    buf.writeln('  </tr>');
  }
  buf.writeln('</table>');
  return buf.toString();
}

void main() {
  final s1 = buildWithPlus(5);
  final s2 = buildWithBuffer(5);
  print(s1);
  print(s2);
  print('同じ結果: \${s1 == s2}');

  print('');

  final data = [
    ['名前', '年齢', '都市'],
    ['Alice', '30', '東京'],
    ['Bob', '25', '大阪'],
  ];
  print(buildHtmlTable(data));
}`}
          expectedOutput={`item0,item1,item2,item3,item4,
item0,item1,item2,item3,item4,
同じ結果: true

<table>
  <tr>
    <td>名前</td>
    <td>年齢</td>
    <td>都市</td>
  </tr>
  <tr>
    <td>Alice</td>
    <td>30</td>
    <td>東京</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>25</td>
    <td>大阪</td>
  </tr>
</table>`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">実用的な StringBuffer パターン</h2>
        <p className="text-gray-400 mb-4">
          レポート生成・CSVビルド・コード生成など実用的なStringBufferの使い方です。
        </p>
        <DartEditor
          defaultCode={`class CsvBuilder {
  final StringBuffer _buf = StringBuffer();
  final String separator;
  bool _hasHeader = false;

  CsvBuilder({this.separator = ','});

  void addHeader(List<String> columns) {
    _buf.writeln(columns.join(separator));
    _hasHeader = true;
  }

  void addRow(List<dynamic> values) {
    _buf.writeln(values.map((v) => '\$v').join(separator));
  }

  String build() => _buf.toString();
  void clear() => _buf.clear();
}

void main() {
  final csv = CsvBuilder();
  csv.addHeader(['名前', '年齢', 'スコア', '合否']);

  final students = [
    ['Alice', 20, 92, '合格'],
    ['Bob', 21, 58, '不合格'],
    ['Carol', 22, 85, '合格'],
    ['Dave', 20, 71, '合格'],
  ];

  for (final s in students) {
    csv.addRow(s);
  }

  print(csv.build());
}`}
          expectedOutput={`名前,年齢,スコア,合否
Alice,20,92,合格
Bob,21,58,不合格
Carol,22,85,合格
Dave,20,71,合格
`}
        />
      </section>

      <LessonCompleteButton lessonId="string-buffer" categoryId="strings" />
      <LessonNav lessons={lessons} currentId="string-buffer" basePath="/learn/strings" />
    </div>
  );
}
