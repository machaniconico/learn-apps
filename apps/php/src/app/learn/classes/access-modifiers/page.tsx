import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesAccessModifiersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アクセス修飾子</h1>
        <p className="text-gray-400">public、private、protectedの各アクセス修飾子の使い方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アクセス修飾子はプロパティやメソッドへのアクセス範囲を制御します。<code className="text-orange-300">public</code>は誰でも、<code className="text-orange-300">private</code>はクラス内のみ、<code className="text-orange-300">protected</code>はクラスと子クラスからアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>public: どこからでもアクセス可能</li>
          <li>private: そのクラス内からのみアクセス可能</li>
          <li>protected: そのクラスおよびサブクラスからアクセス可能</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カプセル化の実践</h2>
        <p className="text-gray-400 mb-4">privateで内部データを隠蔽し、publicメソッドでアクセスを制御します。</p>
        <PhpEditor
          defaultCode={`<?php
class BankAccount {
    private float $balance;
    private array $history = [];

    public function __construct(
        public readonly string $owner,
        float $initialBalance = 0
    ) {
        $this->balance = $initialBalance;
    }

    public function deposit(float $amount): void {
        if ($amount <= 0) return;
        $this->balance += $amount;
        $this->history[] = "+{$amount}円";
    }

    public function withdraw(float $amount): bool {
        if ($amount <= 0 || $amount > $this->balance) return false;
        $this->balance -= $amount;
        $this->history[] = "-{$amount}円";
        return true;
    }

    public function getBalance(): float {
        return $this->balance;
    }

    public function printHistory(): void {
        echo "{$this->owner}の取引履歴:\\n";
        foreach ($this->history as $record) {
            echo "  {$record}\\n";
        }
        echo "  残高: {$this->balance}円\\n";
    }
}

$account = new BankAccount("田中", 10000);
$account->deposit(5000);
$account->withdraw(3000);
$account->deposit(2000);
$account->printHistory();`}
          expectedOutput={`田中の取引履歴:
  +5000円
  -3000円
  +2000円
  残高: 14000円`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">getterとsetter</h2>
        <p className="text-gray-400 mb-4">privateプロパティへのアクセスはgetterとsetterメソッドで制御します。</p>
        <PhpEditor
          defaultCode={`<?php
class Person {
    private string $name;
    private int $age;

    public function __construct(string $name, int $age) {
        $this->setName($name);
        $this->setAge($age);
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        if (empty(trim($name))) {
            throw new InvalidArgumentException("名前は空にできません");
        }
        $this->name = trim($name);
    }

    public function getAge(): int {
        return $this->age;
    }

    public function setAge(int $age): void {
        if ($age < 0 || $age > 150) {
            throw new InvalidArgumentException("年齢が無効です");
        }
        $this->age = $age;
    }

    public function __toString(): string {
        return "{$this->name}（{$this->age}歳）";
    }
}

$person = new Person("田中太郎", 30);
echo $person . "\\n";
$person->setAge(31);
echo "誕生日: " . $person . "\\n";
echo "名前: " . $person->getName() . "\\n";`}
          expectedOutput={`田中太郎（30歳）
誕生日: 田中太郎（31歳）
名前: 田中太郎`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="access-modifiers" />
      </div>
      <LessonNav lessons={lessons} currentId="access-modifiers" basePath="/learn/classes" />
    </div>
  );
}
