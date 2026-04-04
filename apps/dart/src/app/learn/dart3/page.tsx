import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dart3");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dart 3のレコード型の特徴は何ですか？",
    options: [
      "変更可能な複数の値を保持する",
      "不変で複数の値をまとめて扱える匿名の型",
      "クラスと同じように継承できる",
      "リストの代わりに使う型",
    ],
    answer: 1,
    explanation: "レコード型は不変（イミュータブル）で複数の値をまとめて扱える匿名の型です。名前付きフィールドも使えます。",
  },
  {
    question: "sealed classの主な用途は何ですか？",
    options: [
      "クラスを暗号化する",
      "継承できるサブクラスを同一ファイルに制限する",
      "クラスのインスタンス化を禁止する",
      "インターフェースとして使う",
    ],
    answer: 1,
    explanation: "sealed classは継承できるサブクラスを同一ライブラリ内に制限し、パターンマッチングで網羅性チェックを可能にします。",
  },
  {
    question: "Dart 3のswitch式の特徴は何ですか？",
    options: [
      "文としてのみ使える",
      "式として値を返せる",
      "breakが必要",
      "defaultが必須",
    ],
    answer: 1,
    explanation: "Dart 3のswitch式は値を返す式として使え、=>構文で簡潔に書けます。",
  },
  {
    question: "Dart 3のbaseクラス修飾子の制約は何ですか？",
    options: [
      "インスタンス化できない",
      "同一ライブラリ外からはextends/implementsできない",
      "メソッドを定義できない",
      "静的メンバーのみ持てる",
    ],
    answer: 1,
    explanation: "base修飾子のクラスは、同一ライブラリ外からextendsもimplementsもできません。",
  },
];

export default function Dart3Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">Dart 3新機能</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dart 3で導入された革新的な新機能を学びましょう。レコード型・パターンマッチング・シールドクラス・クラス修飾子など、より安全で表現力豊かなコードを書くための最新機能をマスターします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="dart3" totalLessons={6} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/dart3" color="violet" categoryId="dart3" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レコード型の例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">(Type, Type)</code>構文で複数の値を不変にまとめるレコード型です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 位置フィールドのレコード
  (String, int) person = ('Alice', 30);
  print('\${person.\$1}は\${person.\$2}歳');

  // 名前付きフィールドのレコード
  ({String name, String city}) user = (name: 'Bob', city: 'Tokyo');
  print('\${user.name}は\${user.city}在住');

  // 関数からの複数戻り値
  (double, double) minMax(List<double> values) {
    values.sort();
    return (values.first, values.last);
  }

  final (min, max) = minMax([3.5, 1.2, 4.8, 2.1]);
  print('最小: \$min, 最大: \$max');
}`}
          expectedOutput={`Aliceは30歳\nBobはTokyo在住\n最小: 1.2, 最大: 4.8`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シールドクラスの例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">sealed</code>クラスとswitch式を組み合わせた網羅的なパターンマッチングです。
        </p>
        <DartEditor
          defaultCode={`sealed class Shape {}

class Circle extends Shape {
  final double radius;
  Circle(this.radius);
}

class Rectangle extends Shape {
  final double width, height;
  Rectangle(this.width, this.height);
}

class Triangle extends Shape {
  final double base, height;
  Triangle(this.base, this.height);
}

double area(Shape shape) => switch (shape) {
  Circle(radius: final r) => 3.14159 * r * r,
  Rectangle(width: final w, height: final h) => w * h,
  Triangle(base: final b, height: final h) => 0.5 * b * h,
};

void main() {
  final shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)];
  for (final s in shapes) {
    print('\${s.runtimeType}: \${area(s).toStringAsFixed(2)}');
  }
}`}
          expectedOutput={`Circle: 78.54\nRectangle: 24.00\nTriangle: 12.00`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
