import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceFinalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Final</h1>
        <p className="text-gray-400">finalキーワードによる継承・オーバーライドの制限方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">final</code>キーワードはクラスの継承やメソッドのオーバーライドを禁止します。セキュリティ上重要なクラスや、意図しない拡張を防ぎたい場合に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>final class: そのクラスを継承できなくなる</li>
          <li>final メソッド: 子クラスでそのメソッドをオーバーライドできなくなる</li>
          <li>セキュリティ・整合性の保証に活用する</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">finalメソッドの使い方</h2>
        <p className="text-gray-400 mb-4">特定のメソッドだけオーバーライドを禁止できます。</p>
        <PhpEditor
          defaultCode={`<?php
class PaymentProcessor {
    // このメソッドはオーバーライド禁止
    final public function processPayment(float $amount): bool {
        echo "支払い処理開始: {$amount}円\\n";
        $result = $this->executePayment($amount);
        echo "支払い処理完了: " . ($result ? "成功" : "失敗") . "\\n";
        return $result;
    }

    // これはオーバーライド可能
    protected function executePayment(float $amount): bool {
        return $amount > 0;
    }
}

class CreditCardProcessor extends PaymentProcessor {
    private string $cardNumber;

    public function __construct(string $last4) {
        $this->cardNumber = "****-****-****-{$last4}";
    }

    protected function executePayment(float $amount): bool {
        echo "  カード {$this->cardNumber} で処理\\n";
        return $amount <= 100000;
    }
}

$processor = new CreditCardProcessor("1234");
$processor->processPayment(5000);
echo "\\n";
$processor->processPayment(200000);`}
          expectedOutput={`支払い処理開始: 5000円
  カード ****-****-****-1234 で処理
支払い処理完了: 成功

支払い処理開始: 200000円
  カード ****-****-****-1234 で処理
支払い処理完了: 失敗`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">finalクラスの使い方</h2>
        <p className="text-gray-400 mb-4">finalクラスは継承不可にしてセキュリティや整合性を保証します。</p>
        <PhpEditor
          defaultCode={`<?php
final class Singleton {
    private static ?Singleton $instance = null;
    private array $data = [];

    private function __construct() {}

    public static function getInstance(): Singleton {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function set(string $key, mixed $value): void {
        $this->data[$key] = $value;
    }

    public function get(string $key): mixed {
        return $this->data[$key] ?? null;
    }
}

$config = Singleton::getInstance();
$config->set("appName", "MyApp");
$config->set("version", "2.0");

$same = Singleton::getInstance();
echo $same->get("appName") . "\\n";
echo $same->get("version") . "\\n";
echo $config === $same ? "同一インスタンス\\n" : "別インスタンス\\n";`}
          expectedOutput={`MyApp
2.0
同一インスタンス`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="final" />
      </div>
      <LessonNav lessons={lessons} currentId="final" basePath="/learn/inheritance" />
    </div>
  );
}
