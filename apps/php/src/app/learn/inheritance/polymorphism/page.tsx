import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritancePolymorphismPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポリモーフィズム</h1>
        <p className="text-gray-400">継承とインターフェースを活用した多態性の概念と実践を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポリモーフィズム（多態性）とは、同じインターフェースや親クラスを持つ異なるオブジェクトを統一的に扱う能力です。呼び出すメソッドは同じでも、実際の動作はオブジェクトの型によって異なります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>親クラス型・インターフェース型の変数に子クラスのインスタンスを代入できる</li>
          <li>同じメソッド呼び出しでも実行時の型に応じた処理が動く</li>
          <li>新しいクラスを追加しても既存のコードを変更しなくて済む（開放閉鎖原則）</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポリモーフィズムの実践</h2>
        <p className="text-gray-400 mb-4">異なる支払い手段を同じインターフェースで統一的に扱います。</p>
        <PhpEditor
          defaultCode={`<?php
interface Notification {
    public function send(string $message): void;
    public function getType(): string;
}

class EmailNotification implements Notification {
    public function __construct(private string $to) {}

    public function send(string $message): void {
        echo "[メール → {$this->to}] {$message}\\n";
    }

    public function getType(): string {
        return "メール";
    }
}

class SMSNotification implements Notification {
    public function __construct(private string $phone) {}

    public function send(string $message): void {
        echo "[SMS → {$this->phone}] {$message}\\n";
    }

    public function getType(): string {
        return "SMS";
    }
}

class PushNotification implements Notification {
    public function __construct(private string $deviceId) {}

    public function send(string $message): void {
        echo "[プッシュ → {$this->deviceId}] {$message}\\n";
    }

    public function getType(): string {
        return "プッシュ";
    }
}

// ポリモーフィズム：同じ型として扱える
$notifications = [
    new EmailNotification("user@example.com"),
    new SMSNotification("090-1234-5678"),
    new PushNotification("device-abc-123"),
];

foreach ($notifications as $notification) {
    $notification->send("注文が完了しました");
}

echo "\\n通知タイプ: ";
echo implode(", ", array_map(fn($n) => $n->getType(), $notifications)) . "\\n";`}
          expectedOutput={`[メール → user@example.com] 注文が完了しました
[SMS → 090-1234-5678] 注文が完了しました
[プッシュ → device-abc-123] 注文が完了しました

通知タイプ: メール, SMS, プッシュ`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承によるポリモーフィズム</h2>
        <p className="text-gray-400 mb-4">親クラス型で子クラスのインスタンスを扱い、動的にメソッドが呼ばれます。</p>
        <PhpEditor
          defaultCode={`<?php
abstract class Discount {
    abstract public function calculate(float $price): float;
    abstract public function describe(): string;
}

class PercentDiscount extends Discount {
    public function __construct(private float $percent) {}

    public function calculate(float $price): float {
        return $price * (1 - $this->percent / 100);
    }

    public function describe(): string {
        return "{$this->percent}%引き";
    }
}

class FixedDiscount extends Discount {
    public function __construct(private float $amount) {}

    public function calculate(float $price): float {
        return max(0, $price - $this->amount);
    }

    public function describe(): string {
        return "{$this->amount}円引き";
    }
}

class NoDiscount extends Discount {
    public function calculate(float $price): float {
        return $price;
    }

    public function describe(): string {
        return "割引なし";
    }
}

function applyDiscount(float $price, Discount $discount): void {
    $final = $discount->calculate($price);
    echo "{$price}円 → {$discount->describe()} → {$final}円\\n";
}

$price = 10000.0;
applyDiscount($price, new PercentDiscount(20));
applyDiscount($price, new FixedDiscount(1500));
applyDiscount($price, new NoDiscount());`}
          expectedOutput={`10000円 → 20%引き → 8000円
10000円 → 1500円引き → 8500円
10000円 → 割引なし → 10000円`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="polymorphism" />
      </div>
      <LessonNav lessons={lessons} currentId="polymorphism" basePath="/learn/inheritance" />
    </div>
  );
}
