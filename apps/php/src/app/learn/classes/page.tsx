import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPでクラスのインスタンスを生成するキーワードはどれですか？",
    options: ["create", "new", "instance", "init"],
    answer: 1,
    explanation: "newキーワードを使ってクラスのインスタンスを生成します。例：$obj = new MyClass();",
  },
  {
    question: "クラスの初期化処理を記述するメソッド名はどれですか？",
    options: ["__init__", "__start", "__construct", "__new"],
    answer: 2,
    explanation: "__constructはPHPのコンストラクタメソッドで、newでインスタンス生成時に自動的に呼び出されます。",
  },
  {
    question: "クラス外からアクセスできないプロパティを宣言する修飾子はどれですか？",
    options: ["public", "protected", "private", "internal"],
    answer: 2,
    explanation: "privateを付けたプロパティやメソッドは、そのクラス内からのみアクセスできます。",
  },
  {
    question: "インスタンスを作らずにクラスメソッドを呼び出す際に使う演算子はどれですか？",
    options: ["->", ".", "::", "=>"],
    answer: 2,
    explanation: "::（スコープ解決演算子）を使ってstaticメソッドを呼び出します。例：MyClass::myMethod()",
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
          オブジェクト指向プログラミング（OOP）の中心となるクラスを学びます。クラスの定義からインスタンス生成、コンストラクタ、プロパティ、アクセス修飾子、静的メンバー、マジックメソッド、オブジェクト複製、そしてPHP 8.1の列挙型（Enum）まで幅広くカバーします。
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
        <h2 className="text-xl font-bold text-white mb-3">クラスの定義とインスタンス生成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">class</code>キーワードでクラスを定義し、<code className="text-orange-300">new</code>でインスタンスを生成します。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Person {
    public string $name;
    public int $age;

    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function introduce(): string {
        return "私は{$this->name}、{$this->age}歳です。";
    }
}

$taro = new Person("田中太郎", 25);
$hanako = new Person("鈴木花子", 30);

echo $taro->introduce() . "\\n";
echo $hanako->introduce() . "\\n";
echo "名前: " . $taro->name . "\\n";`}
          expectedOutput={`私は田中太郎、25歳です。
私は鈴木花子、30歳です。
名前: 田中太郎`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">静的メンバーとマジックメソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">static</code>メンバーはインスタンスなしで使え、マジックメソッドで特殊な動作を実装できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Counter {
    private static int $count = 0;

    public function __construct() {
        self::$count++;
    }

    public static function getCount(): int {
        return self::$count;
    }

    public function __toString(): string {
        return "Counter #" . self::$count;
    }
}

$c1 = new Counter();
$c2 = new Counter();
$c3 = new Counter();

echo Counter::getCount() . "個のインスタンス\\n";
echo $c1 . "\\n";`}
          expectedOutput={`3個のインスタンス
Counter #3`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
