import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPでクラスを継承するキーワードはどれですか？",
    options: ["implements", "extends", "inherits", "uses"],
    answer: 1,
    explanation: "extendsキーワードを使って親クラスを継承します。例：class Child extends Parent {}",
  },
  {
    question: "インターフェースを実装するキーワードはどれですか？",
    options: ["extends", "uses", "implements", "inherits"],
    answer: 2,
    explanation: "implementsキーワードでインターフェースを実装します。複数のインターフェースをカンマで区切って実装できます。",
  },
  {
    question: "トレイトを使用するキーワードはどれですか？",
    options: ["include", "extends", "implements", "use"],
    answer: 3,
    explanation: "クラス内でuseキーワードを使ってトレイトを組み込みます。複数のトレイトも指定できます。",
  },
  {
    question: "オブジェクトが特定のクラスのインスタンスか調べる演算子はどれですか？",
    options: ["typeof", "instanceof", "is_a", "classof"],
    answer: 1,
    explanation: "instanceof演算子でオブジェクトが特定のクラスやインターフェースのインスタンスかどうかを確認できます。",
  },
];

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">継承・インターフェース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          オブジェクト指向の強力な機能である継承・インターフェース・トレイトを学びます。クラスの継承からメソッドオーバーライド、抽象クラス、インターフェース、トレイト、ポリモーフィズム、finalキーワード、instanceof演算子まで、PHPのOOP設計の核心を学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="inheritance" totalLessons={8} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/inheritance" color="red" categoryId="inheritance" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">extends</code>で親クラスを継承し、子クラスで機能を拡張できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Animal {
    public function __construct(
        protected string $name
    ) {}

    public function speak(): string {
        return "{$this->name}が鳴いています";
    }
}

class Dog extends Animal {
    public function speak(): string {
        return "{$this->name}：ワンワン！";
    }

    public function fetch(): string {
        return "{$this->name}がボールを取ってきた！";
    }
}

class Cat extends Animal {
    public function speak(): string {
        return "{$this->name}：ニャー！";
    }
}

$dog = new Dog("ポチ");
$cat = new Cat("タマ");

echo $dog->speak() . "\\n";
echo $cat->speak() . "\\n";
echo $dog->fetch() . "\\n";`}
          expectedOutput={`ポチ：ワンワン！
タマ：ニャー！
ポチがボールを取ってきた！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースとトレイト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">interface</code>で契約を定義し、<code className="text-red-300">trait</code>でコードを再利用できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface Drawable {
    public function draw(): string;
}

trait Colorable {
    private string $color = "white";

    public function setColor(string $color): void {
        $this->color = $color;
    }

    public function getColor(): string {
        return $this->color;
    }
}

class Circle implements Drawable {
    use Colorable;

    public function __construct(private float $radius) {}

    public function draw(): string {
        return "半径{$this->radius}の{$this->getColor()}の円を描画";
    }
}

$circle = new Circle(5.0);
$circle->setColor("赤");
echo $circle->draw() . "\\n";
echo ($circle instanceof Drawable) ? "Drawableを実装\\n" : "";`}
          expectedOutput={`半径5の赤の円を描画
Drawableを実装`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
