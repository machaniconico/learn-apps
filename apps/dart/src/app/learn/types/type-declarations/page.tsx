import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function TypeDeclarationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">型システム</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">型宣言</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartは<strong className="text-teal-300">静的型付け言語</strong>であり、全ての変数と式に型があります。
            明示的な型宣言、<code className="text-teal-300">var</code>による型推論、<code className="text-teal-300">dynamic</code>型、<code className="text-teal-300">Object</code>型の違いを理解することが重要です。
            型宣言によりコンパイル時エラーを早期発見し、IDEのサポートを最大限に活用できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な型宣言</h2>
        <p className="text-gray-400 mb-4">
          Dartの組み込み型：<code className="text-teal-300">int</code>・<code className="text-teal-300">double</code>・<code className="text-teal-300">String</code>・<code className="text-teal-300">bool</code>・<code className="text-teal-300">List</code>・<code className="text-teal-300">Map</code>などを明示的に宣言できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本型
  int age = 25;
  double height = 175.5;
  String name = '太郎';
  bool isStudent = true;

  // コレクション型
  List<String> hobbies = ['読書', 'プログラミング', '音楽'];
  Map<String, int> grades = {'数学': 90, '英語': 85, '理科': 92};
  Set<int> uniqueNumbers = {1, 2, 3, 4, 5};

  print('\$name (\$age歳)');
  print('身長: \${height}cm');
  print('学生: \$isStudent');
  print('趣味: \$hobbies');
  print('成績: \$grades');
  print('ユニーク数: \$uniqueNumbers');

  // num型（int と double の共通スーパークラス）
  num value1 = 42;      // int として代入可
  num value2 = 3.14;    // double として代入可
  print('num型: \$value1, \$value2');
}`}
          expectedOutput={`太郎 (25歳)
身長: 175.5cm
学生: true
趣味: [読書, プログラミング, 音楽]
成績: {数学: 90, 英語: 85, 理科: 92}
ユニーク数: {1, 2, 3, 4, 5}
num型: 42, 3.14`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">var・final・const と型推論</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">var</code>は型推論、<code className="text-teal-300">final</code>は再代入不可、<code className="text-teal-300">const</code>はコンパイル時定数です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // var: 型推論（初期値から型が決まる）
  var count = 0;       // int と推論
  var text = 'hello';  // String と推論
  var items = <int>[]; // List<int> と推論

  count += 10;
  text = text.toUpperCase();
  items.addAll([1, 2, 3]);

  print('count: \$count (\${count.runtimeType})');
  print('text: \$text (\${text.runtimeType})');
  print('items: \$items');

  // final: 一度だけ代入可（実行時定数）
  final now = DateTime.now();
  final List<String> names = ['Alice', 'Bob'];
  names.add('Carol'); // リストの内容は変更可

  print('names: \$names');

  // const: コンパイル時定数
  const pi = 3.14159;
  const greeting = 'こんにちは';
  const maxSize = 100;

  print('pi=\$pi, greeting=\$greeting, max=\$maxSize');
}`}
          expectedOutput={`count: 10 (int)
text: HELLO (String)
items: [1, 2, 3]
names: [Alice, Bob, Carol]
pi=3.14159, greeting=こんにちは, max=100`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dynamic と Object の違い</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">dynamic</code>は型チェックを回避し、<code className="text-teal-300">Object</code>は全型の基底クラスです。
        </p>
        <DartEditor
          defaultCode={`void showDynamic(dynamic value) {
  // dynamic: 実行時まで型が不明
  print('値: \$value (型: \${value.runtimeType})');
}

void showObject(Object value) {
  // Object: 全ての非null型の基底クラス
  // value.toUpperCase() はエラー（コンパイル時に検出）
  print('Object値: \$value');
}

void main() {
  // dynamic: 任意の型を代入・呼び出し可能
  dynamic d = 42;
  print(d + 8);     // OK: 実行時にintとして処理

  d = 'hello';
  print(d.length);  // OK: 実行時にStringとして処理

  d = [1, 2, 3];
  print(d.length);  // OK: 実行時にListとして処理

  showDynamic(42);
  showDynamic('Dart');
  showDynamic(true);

  // Object: 型に依存しないメソッドのみ使用可
  Object obj = 'テスト';
  print(obj.runtimeType);
  print(obj.toString());
  showObject(100);
}`}
          expectedOutput={`50
5
3
値: 42 (型: int)
値: Dart (型: String)
値: true (型: bool)
String
テスト
Object値: 100`}
        />
      </section>

      <LessonCompleteButton lessonId="type-declarations" categoryId="types" />
      <LessonNav lessons={lessons} currentId="type-declarations" basePath="/learn/types" />
    </div>
  );
}
