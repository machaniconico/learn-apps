import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartでクラスのプライベートメンバーを定義する方法はどれですか？",
    options: ["privateキーワードを使う", "名前の先頭にアンダースコア（_）を付ける", "protectedキーワードを使う", "名前を大文字にする"],
    answer: 1,
    explanation: "Dartではアンダースコア（_）で始まる名前はライブラリプライベートになります。同じライブラリ内からのみアクセスできます。",
  },
  {
    question: "Dartのゲッターを定義するキーワードはどれですか？",
    options: ["getter", "get", "property", "readonly"],
    answer: 1,
    explanation: "getキーワードを使ってゲッターを定義します。例：String get fullName => '\$firstName \$lastName';",
  },
  {
    question: "factoryコンストラクタの特徴はどれですか？",
    options: ["必ず新しいインスタンスを返す", "thisを使えない", "キャッシュされたインスタンスを返せる", "抽象クラスには使えない"],
    answer: 2,
    explanation: "factoryコンストラクタはキャッシュされたインスタンスやサブクラスのインスタンスを返せます。必ずしも新しいインスタンスを生成する必要はありません。",
  },
  {
    question: "Dart 2.17以降の拡張enumで追加できるものはどれですか？",
    options: ["継承", "メソッドとフィールド", "ジェネリクスのみ", "コンストラクタのみ"],
    answer: 1,
    explanation: "Dart 2.17以降の拡張enumではメソッド、フィールド、コンストラクタ、ゲッターなどを追加できます。",
  },
];

export default function ClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">クラス基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartのクラスとオブジェクト指向プログラミングを学びましょう。クラス定義、コンストラクタ、プロパティ、アクセス制御、ゲッター・セッター、静的メンバー、列挙型、ファクトリコンストラクタまで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="classes" totalLessons={8} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/classes" color="orange" categoryId="classes" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">class</code>キーワードでクラスを定義し、<code className="text-orange-300">new</code>不要でインスタンスを生成できます（Dart 2以降）。
        </p>
        <DartEditor
          defaultCode={`class Person {
  String name;
  int age;

  // コンストラクタ
  Person(this.name, this.age);

  // メソッド
  void introduce() {
    print('名前: \$name、年齢: \$age歳');
  }

  // toStringのオーバーライド
  @override
  String toString() => 'Person(\$name, \$age)';
}

void main() {
  var alice = Person('Alice', 30);
  var bob = Person('Bob', 25);

  alice.introduce();
  bob.introduce();

  print(alice);
  print('Aliceの名前: \${alice.name}');
}`}
          expectedOutput={`名前: Alice、年齢: 30歳
名前: Bob、年齢: 25歳
Person(Alice, 30)
Aliceの名前: Alice`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ゲッター・セッターと静的メンバー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">get</code>/<code className="text-orange-300">set</code>でプロパティのアクセスを制御し、<code className="text-orange-300">static</code>でクラス全体に共有されるメンバーを定義できます。
        </p>
        <DartEditor
          defaultCode={`class Circle {
  double _radius;

  Circle(this._radius);

  // ゲッター
  double get radius => _radius;
  double get area => 3.14159 * _radius * _radius;
  double get circumference => 2 * 3.14159 * _radius;

  // セッター（バリデーション付き）
  set radius(double value) {
    if (value < 0) throw ArgumentError('半径は0以上');
    _radius = value;
  }

  // 静的メンバー
  static const double pi = 3.14159;
  static Circle unit() => Circle(1.0);
}

void main() {
  var c = Circle(5.0);
  print('半径: \${c.radius}');
  print('面積: \${c.area.toStringAsFixed(2)}');
  print('周長: \${c.circumference.toStringAsFixed(2)}');

  var unit = Circle.unit();
  print('単位円の面積: \${unit.area.toStringAsFixed(5)}');
  print('π = \${Circle.pi}');
}`}
          expectedOutput={`半径: 5.0
面積: 78.54
周長: 31.42
単位円の面積: 3.14159
π = 3.14159`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
