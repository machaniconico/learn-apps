import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function OptionalParamsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">省略可能パラメータ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">[]</strong>で囲むと省略可能な位置パラメータを定義できます。
            省略された場合はデフォルト値が使われます。デフォルト値がない場合はnullになります（型に<code>?</code>が必要）。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">省略可能な位置パラメータ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">[型 パラメータ名 = デフォルト値]</code>で省略可能なパラメータを定義します。
        </p>
        <DartEditor
          defaultCode={`// 省略可能パラメータ（デフォルト値あり）
String greet(String name, [String greeting = 'こんにちは']) {
  return '\$greeting、\${name}さん！';
}

// 省略可能パラメータ（複数）
String formatDate(int year, [int month = 1, int day = 1]) {
  return '\$year年\${month.toString().padLeft(2, '0')}月\${day.toString().padLeft(2, '0')}日';
}

void main() {
  print(greet('Alice'));
  print(greet('Bob', 'おはよう'));
  print(greet('Carol', 'こんばんは'));

  print(formatDate(2024));
  print(formatDate(2024, 3));
  print(formatDate(2024, 12, 25));
}`}
          expectedOutput={`こんにちは、Aliceさん！
おはよう、Bobさん！
こんばんは、Carolさん！
2024年01月01日
2024年03月01日
2024年12月25日`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">null許容の省略可能パラメータ</h2>
        <p className="text-gray-400 mb-4">
          デフォルト値を指定しない場合は<code className="text-purple-300">型?</code>でnull許容にする必要があります。
        </p>
        <DartEditor
          defaultCode={`// null許容の省略可能パラメータ
String describe(String item, [String? color, int? count]) {
  String result = item;
  if (color != null) result += '（色: \$color）';
  if (count != null) result += ' × \$count個';
  return result;
}

void logMessage(String message, [String? tag]) {
  String prefix = tag != null ? '[\$tag] ' : '';
  print('\$prefix\$message');
}

void main() {
  print(describe('りんご'));
  print(describe('りんご', '赤'));
  print(describe('りんご', '赤', 5));

  logMessage('アプリ起動');
  logMessage('データ取得完了', 'INFO');
  logMessage('接続エラー', 'ERROR');
}`}
          expectedOutput={`りんご
りんご（色: 赤）
りんご（色: 赤） × 5個
アプリ起動
[INFO] データ取得完了
[ERROR] 接続エラー`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値の活用</h2>
        <p className="text-gray-400 mb-4">
          デフォルト値には定数式が使えます。実践的な使用例を見てみましょう。
        </p>
        <DartEditor
          defaultCode={`// テキスト整形関数
String padCenter(String text, [int width = 20, String fill = '-']) {
  int padding = (width - text.length) ~/ 2;
  if (padding <= 0) return text;
  String pad = fill * padding;
  return '\$pad\$text\$pad';
}

// 数値フォーマット
String formatNumber(double n, [int decimals = 2, String unit = '']) {
  return '\${n.toStringAsFixed(decimals)}\$unit';
}

void main() {
  print(padCenter('Dart'));
  print(padCenter('Hello', 30));
  print(padCenter('World', 10, '='));

  print(formatNumber(3.14159));
  print(formatNumber(3.14159, 4));
  print(formatNumber(1234.5, 0, '円'));
  print(formatNumber(98.6, 1, '°F'));
}`}
          expectedOutput={`--------Dart--------
------------Hello------------
==World==
3.14
3.1416
1235円
98.6°F`}
        />
      </section>

      <LessonCompleteButton lessonId="optional-params" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="optional-params" basePath="/learn/functions" />
    </div>
  );
}
