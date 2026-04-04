import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承の基本</h1>
        <p className="text-gray-400">extendsキーワードを使ったクラスの継承の基本を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          継承は既存のクラス（親クラス）の機能を引き継いで新しいクラス（子クラス）を作る仕組みです。<code className="text-red-300">extends</code>キーワードを使い、子クラスは親クラスのpublicとprotectedメンバーを使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>extendsで親クラスを継承する</li>
          <li>子クラスはparent::で親クラスのメソッドを呼べる</li>
          <li>PHPは単一継承のみ（1つのクラスしか継承できない）</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">extendsで継承する</h2>
        <p className="text-gray-400 mb-4">親クラスの機能を引き継ぎながら子クラスで機能を追加します。</p>
        <PhpEditor
          defaultCode={`<?php
class Vehicle {
    public function __construct(
        protected string $name,
        protected int $speed
    ) {}

    public function move(): string {
        return "{$this->name}が移動中（時速{$this->speed}km）";
    }

    public function describe(): string {
        return "乗り物: {$this->name}";
    }
}

class Car extends Vehicle {
    public function __construct(
        string $name,
        int $speed,
        private int $doors
    ) {
        parent::__construct($name, $speed);
    }

    public function describe(): string {
        return parent::describe() . "（{$this->doors}ドア）";
    }
}

class Bicycle extends Vehicle {
    public function ring(): string {
        return "{$this->name}がベルを鳴らした: チリンチリン！";
    }
}

$car = new Car("プリウス", 120, 4);
$bike = new Bicycle("ママチャリ", 20);

echo $car->move() . "\\n";
echo $car->describe() . "\\n";
echo $bike->move() . "\\n";
echo $bike->ring() . "\\n";`}
          expectedOutput={`プリウスが移動中（時速120km）
乗り物: プリウス（4ドア）
ママチャリが移動中（時速20km）
ママチャリがベルを鳴らした: チリンチリン！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承チェーン</h2>
        <p className="text-gray-400 mb-4">継承は連鎖させることができます。子クラスがさらに継承されます。</p>
        <PhpEditor
          defaultCode={`<?php
class LivingThing {
    public function breathe(): string {
        return "呼吸している";
    }
}

class Animal extends LivingThing {
    public function __construct(protected string $name) {}

    public function eat(): string {
        return "{$this->name}が食事中";
    }
}

class Mammal extends Animal {
    public function feed(): string {
        return "{$this->name}が子どもに授乳中";
    }
}

class Dog extends Mammal {
    public function bark(): string {
        return "{$this->name}: ワンワン！";
    }
}

$dog = new Dog("ポチ");
echo $dog->breathe() . "\\n";
echo $dog->eat() . "\\n";
echo $dog->feed() . "\\n";
echo $dog->bark() . "\\n";`}
          expectedOutput={`呼吸している
ポチが食事中
ポチが子どもに授乳中
ポチ: ワンワン！`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/inheritance" />
    </div>
  );
}
