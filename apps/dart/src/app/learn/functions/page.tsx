import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartでアロー関数（=>）が使える条件はどれですか？",
    options: ["常に使える", "関数本体が単一の式の場合", "戻り値がvoidの場合", "引数がない場合"],
    answer: 1,
    explanation: "アロー関数（=>）は関数本体が単一の式である場合に使えます。{ return expr; }を=> exprと省略できます。",
  },
  {
    question: "名前付きパラメータを必須にするキーワードはどれですか？",
    options: ["mandatory", "required", "must", "need"],
    answer: 1,
    explanation: "requiredキーワードを名前付きパラメータの前に付けると、呼び出し側で必ず指定しなければなりません。",
  },
  {
    question: "高階関数とは何ですか？",
    options: ["再帰的に呼び出す関数", "関数を引数または戻り値として扱う関数", "非同期で実行される関数", "クラスのメソッド"],
    answer: 1,
    explanation: "高階関数は関数を引数として受け取ったり、戻り値として関数を返したりする関数です。map、filter、reduceなどが代表例です。",
  },
  {
    question: "Dartでジェネレータ関数を定義するキーワードの組み合わせはどれですか？",
    options: ["async / yield", "sync* / yield", "generator / produce", "iter / next"],
    answer: 1,
    explanation: "同期ジェネレータはsync*とyieldを使います。非同期ジェネレータはasync*とyieldを使います。",
  },
];

export default function FunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartの関数について学びましょう。基本的な関数定義から、名前付きパラメータ、アロー関数、高階関数、ジェネレータまで、Dartの豊富な関数機能をマスターします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="functions" totalLessons={8} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functions" color="purple" categoryId="functions" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の基本と名前付きパラメータ</h2>
        <p className="text-gray-400 mb-4">
          Dartの関数は<code className="text-purple-300">戻り値型 関数名(引数) &#123; 本体 &#125;</code>の形式で定義します。名前付きパラメータで可読性が向上します。
        </p>
        <DartEditor
          defaultCode={`// 基本的な関数
int add(int a, int b) {
  return a + b;
}

// 名前付きパラメータ
String greet({required String name, String greeting = 'こんにちは'}) {
  return '\$greeting、\${name}さん！';
}

// アロー関数
double circle(double r) => 3.14159 * r * r;

void main() {
  print(add(3, 4));
  print(greet(name: 'Dart'));
  print(greet(name: 'Flutter', greeting: 'ようこそ'));
  print('面積: \${circle(5).toStringAsFixed(2)}');
}`}
          expectedOutput={`7
こんにちは、Dartさん！
ようこそ、Flutterさん！
面積: 78.54`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">高階関数とクロージャ</h2>
        <p className="text-gray-400 mb-4">
          Dartでは関数は第一級オブジェクトです。関数を変数に代入したり、引数として渡したりできます。
        </p>
        <DartEditor
          defaultCode={`// 高階関数
List<T> myMap<T, R>(List<R> list, T Function(R) transform) {
  return list.map(transform).toList();
}

// クロージャ（外側の変数を参照）
Function makeCounter() {
  int count = 0;
  return () {
    count++;
    return count;
  };
}

void main() {
  // 高階関数の使用
  List<int> numbers = [1, 2, 3, 4, 5];
  List<int> doubled = myMap(numbers, (n) => n * 2);
  print('2倍: \$doubled');

  // クロージャ
  var counter = makeCounter();
  print(counter()); // 1
  print(counter()); // 2
  print(counter()); // 3
}`}
          expectedOutput={`2倍: [2, 4, 6, 8, 10]
1
2
3`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
