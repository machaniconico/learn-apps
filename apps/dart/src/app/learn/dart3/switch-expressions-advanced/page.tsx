import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dart3");

export default function SwitchExpressionsAdvancedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold">Dart 3新機能 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">switch式応用</h1>
        <p className="text-gray-400">Dart 3のswitch式とガード節を使った高度なパターン分岐を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart 3のswitch式</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dart 3のswitch式は値を返す式として使えます。<code className="text-violet-300">=&gt;</code>構文で簡潔に書け、
          <code className="text-violet-300">when</code>ガード節で複雑な条件も表現できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-violet-300">switch (value) &#123; pattern =&gt; expr &#125;</code> で式として使用</li>
          <li>• <code className="text-violet-300">when</code>でガード条件を追加</li>
          <li>• 複数パターンを<code className="text-violet-300">,</code>で OR 結合</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">switch式の基本</h2>
        <p className="text-gray-400 mb-4">
          従来のswitch文をswitch式に書き換えた例です。
        </p>
        <DartEditor
          defaultCode={`// HTTP ステータスコードの説明
String describeStatus(int code) => switch (code) {
  200 => 'OK',
  201 => 'Created',
  204 => 'No Content',
  400 => 'Bad Request',
  401 => 'Unauthorized',
  403 => 'Forbidden',
  404 => 'Not Found',
  500 => 'Internal Server Error',
  >= 200 && < 300 => '2xx 成功',
  >= 400 && < 500 => '4xx クライアントエラー',
  >= 500 => '5xx サーバーエラー',
  _ => '不明なステータス',
};

// 曜日の種別
String dayType(int weekday) => switch (weekday) {
  1 || 7 => '週末',
  6 => '土曜日',
  _ when weekday >= 2 && weekday <= 5 => '平日',
  _ => '不明',
};

void main() {
  [200, 201, 404, 503, 999].forEach((code) {
    print('\$code: \${describeStatus(code)}');
  });

  print('');
  for (int d = 1; d <= 7; d++) {
    print('曜日\$d: \${dayType(d)}');
  }
}`}
          expectedOutput={`200: OK\n201: Created\n404: Not Found\n503: 5xx サーバーエラー\n999: 不明なステータス\n\n曜日1: 週末\n曜日2: 平日\n曜日3: 平日\n曜日4: 平日\n曜日5: 平日\n曜日6: 土曜日\n曜日7: 週末`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型パターンとガード節</h2>
        <p className="text-gray-400 mb-4">
          型チェックとガード節を組み合わせた高度なswitch式です。
        </p>
        <DartEditor
          defaultCode={`String describe(Object value) => switch (value) {
  int n when n < 0 => '負の整数: \$n',
  int n when n == 0 => 'ゼロ',
  int n => '正の整数: \$n',
  double d when d.isNaN => 'NaN',
  double d when d.isInfinite => '無限大',
  double d => '小数: \${d.toStringAsFixed(2)}',
  String s when s.isEmpty => '空文字列',
  String s when s.length > 10 => '長い文字列: "\${s.substring(0, 10)}..."',
  String s => '文字列: "\$s"',
  List<dynamic> l when l.isEmpty => '空リスト',
  List<dynamic> l => 'リスト(\${l.length}個)',
  null => 'null値',
  _ => '不明な型: \${value.runtimeType}',
};

void main() {
  final values = [-5, 0, 42, 3.14, double.nan, '', 'hello', 'これは長い文字列です！！！', [], [1, 2, 3]];
  for (final v in values) {
    print(describe(v));
  }
}`}
          expectedOutput={`負の整数: -5\nゼロ\n正の整数: 42\n小数: 3.14\nNaN\n空文字列\n文字列: "hello"\n長い文字列: "これは長い文字..."...\n空リスト\nリスト(3個)`}
        />
      </section>
      <LessonCompleteButton lessonId="switch-expressions-advanced" categoryId="dart3" />
      <LessonNav lessons={lessons} currentId="switch-expressions-advanced" basePath="/learn/dart3" />
    </div>
  );
}
