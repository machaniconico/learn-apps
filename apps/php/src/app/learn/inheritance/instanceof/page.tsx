import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceInstanceofPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型の判定</h1>
        <p className="text-gray-400">instanceof演算子を使った型チェックの方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">instanceof</code>演算子はオブジェクトが特定のクラスやインターフェースのインスタンスかどうかを調べます。継承チェーンやインターフェース実装も確認できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>$obj instanceof ClassName でtrueかfalseを返す</li>
          <li>親クラスや実装インターフェースに対してもtrueになる</li>
          <li>get_class()で正確なクラス名、is_a()でinstanceofと同等のチェックができる</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">instanceofの基本</h2>
        <p className="text-gray-400 mb-4">継承関係とインターフェース実装の両方を確認できます。</p>
        <PhpEditor
          defaultCode={`<?php
interface Flyable {
    public function fly(): string;
}

interface Swimmable {
    public function swim(): string;
}

class Animal {
    public function __construct(protected string $name) {}
}

class Bird extends Animal implements Flyable {
    public function fly(): string {
        return "{$this->name}が空を飛んでいます";
    }
}

class Duck extends Animal implements Flyable, Swimmable {
    public function fly(): string {
        return "{$this->name}が飛んでいます";
    }

    public function swim(): string {
        return "{$this->name}が泳いでいます";
    }
}

class Fish extends Animal implements Swimmable {
    public function swim(): string {
        return "{$this->name}が泳いでいます";
    }
}

$animals = [new Bird("スズメ"), new Duck("アヒル"), new Fish("金魚")];

foreach ($animals as $animal) {
    echo get_class($animal) . " ({$animal->name}):\\n";
    echo "  Animal: "    . ($animal instanceof Animal    ? "yes" : "no") . "\\n";
    echo "  Flyable: "   . ($animal instanceof Flyable   ? "yes" : "no") . "\\n";
    echo "  Swimmable: " . ($animal instanceof Swimmable ? "yes" : "no") . "\\n";
}`}
          expectedOutput={`Bird (スズメ):
  Animal: yes
  Flyable: yes
  Swimmable: no
Duck (アヒル):
  Animal: yes
  Flyable: yes
  Swimmable: yes
Fish (金魚):
  Animal: yes
  Flyable: no
  Swimmable: yes`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">instanceofを使った安全なダウンキャスト</h2>
        <p className="text-gray-400 mb-4">instanceof確認後に型固有のメソッドを安全に呼び出せます。</p>
        <PhpEditor
          defaultCode={`<?php
interface Shape {
    public function area(): float;
}

class Circle implements Shape {
    public function __construct(public float $radius) {}

    public function area(): float {
        return M_PI * $this->radius ** 2;
    }

    public function circumference(): float {
        return 2 * M_PI * $this->radius;
    }
}

class Rectangle implements Shape {
    public function __construct(
        public float $width,
        public float $height
    ) {}

    public function area(): float {
        return $this->width * $this->height;
    }

    public function perimeter(): float {
        return 2 * ($this->width + $this->height);
    }
}

function describeShape(Shape $shape): void {
    echo get_class($shape) . ": 面積=" . round($shape->area(), 2);

    if ($shape instanceof Circle) {
        echo ", 周長=" . round($shape->circumference(), 2);
    } elseif ($shape instanceof Rectangle) {
        echo ", 周長=" . $shape->perimeter();
    }
    echo "\\n";
}

$shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Circle(3),
    new Rectangle(10, 2),
];

foreach ($shapes as $shape) {
    describeShape($shape);
}`}
          expectedOutput={`Circle: 面積=78.54, 周長=31.42
Rectangle: 面積=24, 周長=20
Circle: 面積=28.27, 周長=18.85
Rectangle: 面積=20, 周長=24`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="instanceof" />
      </div>
      <LessonNav lessons={lessons} currentId="instanceof" basePath="/learn/inheritance" />
    </div>
  );
}
