import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ConstantsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">定数</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartには2種類の定数があります。<strong className="text-blue-300">final</strong>は実行時に一度だけ代入できる変数、
            <strong className="text-blue-300">const</strong>はコンパイル時に値が確定する定数です。
            用途に応じて使い分けましょう。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">final の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">final</code>は一度代入したら変更できません。実行時の値（ユーザー入力、API結果など）を保持するのに適しています。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // final: 一度だけ代入可能
  final String name = 'Alice';
  final int age = 30;

  // 型推論でも使える
  final greeting = 'こんにちは';
  final pi = 3.14159;

  print('名前: \$name');
  print('年齢: \$age');
  print('\$greeting、\$pi');

  // finalリスト（参照は変更不可だが内容は変更可能）
  final List<String> items = ['A', 'B', 'C'];
  items.add('D'); // OK: リストの内容変更は可能
  print('items: \$items');

  // 遅延初期化
  final late String lateValue;
  lateValue = '後から代入';
  print(lateValue);
}`}
          expectedOutput={`名前: Alice
年齢: 30
こんにちは、3.14159
items: [A, B, C, D]
後から代入`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">const の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">const</code>はコンパイル時定数です。リテラル値や他のconst値から計算された値のみ使えます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // const: コンパイル時定数
  const int maxItems = 100;
  const double taxRate = 0.1;
  const String appName = 'MyApp';

  print('最大件数: \$maxItems');
  print('税率: \${taxRate * 100}%');
  print('アプリ名: \$appName');

  // constリスト（内容も変更不可）
  const List<String> days = ['月', '火', '水', '木', '金'];
  print('平日: \$days');

  // constオブジェクト
  const point = (x: 0, y: 0); // レコード型
  print('原点: (\${point.x}, \${point.y})');

  // 定数式
  const int doubled = maxItems * 2;
  print('2倍: \$doubled');
}`}
          expectedOutput={`最大件数: 100
税率: 10.0%
アプリ名: MyApp
平日: [月, 火, 水, 木, 金]
原点: (0, 0)
2倍: 200`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">final と const の違い</h2>
        <p className="text-gray-400 mb-4">
          finalとconstの主な違いは、値が確定するタイミングです。実行時の値にはfinal、コンパイル時に決まる値にはconstを使います。
        </p>
        <DartEditor
          defaultCode={`import 'dart:math';

void main() {
  // final: 実行時に決まる値
  final now = DateTime.now();
  final random = Random().nextInt(100);
  print('現在時刻の年: \${now.year}');
  print('乱数: \$random');

  // const: コンパイル時定数のみ
  const version = '3.0.0';
  const maxRetries = 3;

  // 使い分けの目安
  // const: 設定値、マジックナンバー、固定文字列
  // final: 計算結果、外部から取得した値、一度だけ設定する値
  print('バージョン: \$version');
  print('最大リトライ: \$maxRetries');

  // クラスレベルの定数にはstatic constを使う
  print('円周率: \${MathConstants.pi}');
}

class MathConstants {
  static const double pi = 3.14159265358979;
  static const double e = 2.71828182845905;
}`}
          expectedOutput={`現在時刻の年: 2026
乱数: 85
バージョン: 3.0.0
最大リトライ: 3
円周率: 3.14159265358979`}
        />
      </section>

      <LessonCompleteButton lessonId="constants" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
