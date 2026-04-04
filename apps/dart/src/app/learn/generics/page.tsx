import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ジェネリクスの主な目的は何ですか？",
    options: [
      "コードの実行速度を上げる",
      "型安全性を保ちながらコードを再利用可能にする",
      "非同期処理を簡単にする",
      "メモリ使用量を減らす",
    ],
    answer: 1,
    explanation: "ジェネリクスを使うと、型パラメータを使って型安全なままコードを汎用化できます。List<T>やMap<K,V>がその例です。",
  },
  {
    question: "Dartでジェネリック関数を定義する構文は？",
    options: [
      "T myFunc<T>(T value)",
      "generic T myFunc(T value)",
      "myFunc<T: any>(T value)",
      "myFunc(T value) where T",
    ],
    answer: 0,
    explanation: "関数名の後に<T>を書いて型パラメータを宣言します。T myFunc<T>(T value)のように引数と戻り値にTを使えます。",
  },
  {
    question: "型制約でTがComparableを実装していることを保証するには？",
    options: [
      "T extends Comparable",
      "T implements Comparable",
      "T : Comparable",
      "T is Comparable",
    ],
    answer: 0,
    explanation: "Dartでは<T extends Comparable>のようにextendsで上限境界を指定します。これによりT型の値でComparableのメソッドが使えます。",
  },
  {
    question: "List<String>はList<Object>に代入できますか？",
    options: [
      "できる、DartのListは共変",
      "できない、DartのListは不変",
      "できる、全てのListは互換性がある",
      "コンパイルエラーになる",
    ],
    answer: 0,
    explanation: "DartのListはデフォルトで共変（covariant）です。List<String>はList<Object>に代入できますが、List<Object>にString以外の要素を追加しようとすると実行時エラーになります。",
  },
];

export default function GenericsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">ジェネリクス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartのジェネリクスを使って型安全で再利用可能なコードを書きましょう。型パラメータ、ジェネリッククラス、ジェネリック関数、型制約など、より堅牢なプログラム設計のための概念を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="generics" totalLessons={6} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/generics" color="teal" categoryId="generics" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリッククラスの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">&lt;T&gt;</code>型パラメータを使うと、さまざまな型で動作する汎用クラスを作成できます。
        </p>
        <DartEditor
          defaultCode={`class Stack<T> {
  final List<T> _items = [];

  void push(T item) => _items.add(item);

  T pop() {
    if (_items.isEmpty) throw StateError('スタックが空です');
    return _items.removeLast();
  }

  T get peek => _items.last;
  bool get isEmpty => _items.isEmpty;
  int get length => _items.length;

  @override
  String toString() => 'Stack\$_items';
}

void main() {
  // int型のスタック
  final intStack = Stack<int>();
  intStack.push(1);
  intStack.push(2);
  intStack.push(3);
  print('intStack: \$intStack');
  print('pop: \${intStack.pop()}');

  // String型のスタック
  final strStack = Stack<String>();
  strStack.push('Dart');
  strStack.push('Flutter');
  print('strStack: \$strStack');
  print('peek: \${strStack.peek}');
}`}
          expectedOutput={`intStack: Stack[1, 2, 3]
pop: 3
strStack: Stack[Dart, Flutter]
peek: Flutter`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型制約（extends）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">extends</code>で型制約を設けると、型パラメータが特定の型の機能を持つことを保証できます。
        </p>
        <DartEditor
          defaultCode={`class Pair<T extends Comparable<T>> {
  final T first;
  final T second;

  Pair(this.first, this.second);

  T get min => first.compareTo(second) <= 0 ? first : second;
  T get max => first.compareTo(second) >= 0 ? first : second;

  @override
  String toString() => '(\$first, \$second)';
}

T findMax<T extends Comparable<T>>(List<T> list) {
  return list.reduce((a, b) => a.compareTo(b) >= 0 ? a : b);
}

void main() {
  final intPair = Pair(3, 7);
  print('ペア: \$intPair, 最小: \${intPair.min}, 最大: \${intPair.max}');

  final strPair = Pair('apple', 'banana');
  print('ペア: \$strPair, 最小: \${strPair.min}, 最大: \${strPair.max}');

  print('リスト最大値: \${findMax([3, 1, 4, 1, 5, 9, 2])}');
  print('文字列最大値: \${findMax(['cherry', 'apple', 'mango'])}');
}`}
          expectedOutput={`ペア: (3, 7), 最小: 3, 最大: 7
ペア: (apple, banana), 最小: apple, 最大: banana
リスト最大値: 9
文字列最大値: mango`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
