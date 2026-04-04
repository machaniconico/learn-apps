import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesMagicMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マジックメソッド</h1>
        <p className="text-gray-400">__toString、__get、__setなどのマジックメソッドを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マジックメソッドは特定の操作が行われたときに自動的に呼び出されるメソッドです。名前は<code className="text-orange-300">__</code>（アンダースコア2つ）で始まります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>__toString: オブジェクトを文字列として扱うときに呼ばれる</li>
          <li>__get / __set: 未定義プロパティへのアクセス時に呼ばれる</li>
          <li>__isset / __unset: isset()やunset()が呼ばれたときに実行される</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">__toStringと__invoke</h2>
        <p className="text-gray-400 mb-4">オブジェクトを文字列や関数として扱えるようにします。</p>
        <PhpEditor
          defaultCode={`<?php
class Money {
    public function __construct(
        private int $amount,
        private string $currency = "JPY"
    ) {}

    public function add(Money $other): Money {
        return new Money($this->amount + $other->amount, $this->currency);
    }

    public function multiply(int $factor): Money {
        return new Money($this->amount * $factor, $this->currency);
    }

    public function __toString(): string {
        return number_format($this->amount) . " " . $this->currency;
    }

    public function __invoke(float $exchangeRate, string $toCurrency): string {
        $converted = $this->amount * $exchangeRate;
        return number_format($converted, 2) . " " . $toCurrency;
    }
}

$price = new Money(1500);
$tax = new Money(150);
$total = $price->add($tax);

echo "価格: {$price}\\n";
echo "税: {$tax}\\n";
echo "合計: {$total}\\n";
echo "USD換算: " . $total(0.0067, "USD") . "\\n";`}
          expectedOutput={`価格: 1,500 JPY
税: 150 JPY
合計: 1,650 JPY
USD換算: 11.06 USD`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">__getと__set</h2>
        <p className="text-gray-400 mb-4">動的プロパティへのアクセスを__getと__setで制御します。</p>
        <PhpEditor
          defaultCode={`<?php
class DynamicConfig {
    private array $data = [];
    private array $readonly = ["version", "name"];

    public function __construct(array $defaults = []) {
        $this->data = $defaults;
    }

    public function __get(string $key): mixed {
        return $this->data[$key] ?? null;
    }

    public function __set(string $key, mixed $value): void {
        if (in_array($key, $this->readonly)) {
            echo "警告: {$key}は読み取り専用です\\n";
            return;
        }
        $this->data[$key] = $value;
    }

    public function __isset(string $key): bool {
        return isset($this->data[$key]);
    }
}

$config = new DynamicConfig([
    "name" => "MyApp",
    "version" => "1.0",
]);

echo $config->name . "\\n";
echo $config->version . "\\n";
$config->debug = true;
$config->maxRetry = 3;
$config->version = "2.0";
echo $config->debug ? "デバッグ有効\\n" : "";
echo "最大リトライ: " . $config->maxRetry . "\\n";`}
          expectedOutput={`MyApp
1.0
警告: versionは読み取り専用です
デバッグ有効
最大リトライ: 3`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="magic-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="magic-methods" basePath="/learn/classes" />
    </div>
  );
}
