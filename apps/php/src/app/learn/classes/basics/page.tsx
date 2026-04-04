import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスの基本</h1>
        <p className="text-gray-400">classキーワードを使ったクラスの定義とインスタンスの生成方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスはデータ（プロパティ）と処理（メソッド）をひとまとめにした設計図です。<code className="text-orange-300">class</code>キーワードで定義し、<code className="text-orange-300">new</code>でインスタンス（実体）を作ります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>classキーワードでクラスを定義する</li>
          <li>newキーワードでインスタンスを生成する</li>
          <li>プロパティへは-&gt;でアクセスし、メソッドも-&gt;で呼び出す</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のクラス</h2>
        <p className="text-gray-400 mb-4">シンプルなクラスを定義してインスタンスを生成してみましょう。</p>
        <PhpEditor
          defaultCode={`<?php
class Car {
    public string $brand;
    public string $color;
    public int $speed = 0;

    public function accelerate(int $amount): void {
        $this->speed += $amount;
    }

    public function brake(int $amount): void {
        $this->speed = max(0, $this->speed - $amount);
    }

    public function getStatus(): string {
        return "{$this->color}の{$this->brand}: 時速{$this->speed}km";
    }
}

$car1 = new Car();
$car1->brand = "トヨタ";
$car1->color = "赤";
$car1->accelerate(60);
echo $car1->getStatus() . "\\n";

$car1->accelerate(40);
echo $car1->getStatus() . "\\n";

$car1->brake(30);
echo $car1->getStatus() . "\\n";`}
          expectedOutput={`赤のトヨタ: 時速60km
赤のトヨタ: 時速100km
赤のトヨタ: 時速70km`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数インスタンスの独立性</h2>
        <p className="text-gray-400 mb-4">同じクラスから作られたインスタンスは独立したデータを持ちます。</p>
        <PhpEditor
          defaultCode={`<?php
class BankAccount {
    public string $owner;
    public float $balance = 0;

    public function deposit(float $amount): void {
        $this->balance += $amount;
    }

    public function withdraw(float $amount): bool {
        if ($this->balance < $amount) {
            echo "残高不足\\n";
            return false;
        }
        $this->balance -= $amount;
        return true;
    }

    public function show(): void {
        echo "{$this->owner}の残高: {$this->balance}円\\n";
    }
}

$alice = new BankAccount();
$alice->owner = "田中";
$alice->deposit(50000);

$bob = new BankAccount();
$bob->owner = "鈴木";
$bob->deposit(30000);

$alice->withdraw(15000);
$bob->withdraw(50000);

$alice->show();
$bob->show();`}
          expectedOutput={`残高不足
田中の残高: 35000円
鈴木の残高: 30000円`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}
