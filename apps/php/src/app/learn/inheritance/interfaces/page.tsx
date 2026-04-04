import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceInterfacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターフェース</h1>
        <p className="text-gray-400">interfaceキーワードを使ったインターフェースの定義と実装を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インターフェースはメソッドのシグネチャ（名前・引数・戻り値の型）だけを定義した契約です。<code className="text-red-300">interface</code>で定義し、<code className="text-red-300">implements</code>で実装します。クラスは複数のインターフェースを実装できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>interfaceはメソッドの定義のみ（実装は含まない）</li>
          <li>implementsで1つ以上のインターフェースを実装できる</li>
          <li>インターフェースの型として使えるので、異なるクラスを統一的に扱える</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの定義と実装</h2>
        <p className="text-gray-400 mb-4">インターフェースで契約を定義し、異なるクラスで統一的に実装します。</p>
        <PhpEditor
          defaultCode={`<?php
interface Printable {
    public function print(): void;
}

interface Exportable {
    public function exportToCSV(): string;
}

class Invoice implements Printable, Exportable {
    public function __construct(
        private string $customer,
        private array $items
    ) {}

    public function print(): void {
        echo "===請求書===\\n";
        echo "顧客: {$this->customer}\\n";
        foreach ($this->items as $name => $price) {
            echo "  {$name}: {$price}円\\n";
        }
        echo "合計: " . array_sum($this->items) . "円\\n";
    }

    public function exportToCSV(): string {
        $lines = ["商品,金額"];
        foreach ($this->items as $name => $price) {
            $lines[] = "{$name},{$price}";
        }
        return implode("\\n", $lines);
    }
}

$invoice = new Invoice("田中商店", [
    "商品A" => 5000,
    "商品B" => 3000,
    "商品C" => 2000,
]);
$invoice->print();
echo "\\nCSV出力:\\n" . $invoice->exportToCSV() . "\\n";`}
          expectedOutput={`===請求書===
顧客: 田中商店
  商品A: 5000円
  商品B: 3000円
  商品C: 2000円
合計: 10000円

CSV出力:
商品,金額
商品A,5000
商品B,3000
商品C,2000`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースによる統一処理</h2>
        <p className="text-gray-400 mb-4">異なるクラスをインターフェース型として統一的に扱えます。</p>
        <PhpEditor
          defaultCode={`<?php
interface Payable {
    public function pay(float $amount): string;
    public function getBalance(): float;
}

class CreditCard implements Payable {
    private float $limit;
    private float $used = 0;

    public function __construct(float $limit) {
        $this->limit = $limit;
    }

    public function pay(float $amount): string {
        if ($this->used + $amount > $this->limit) {
            return "クレジットカード: 限度額超過";
        }
        $this->used += $amount;
        return "クレジットカードで{$amount}円支払い";
    }

    public function getBalance(): float {
        return $this->limit - $this->used;
    }
}

class EWallet implements Payable {
    public function __construct(private float $balance) {}

    public function pay(float $amount): string {
        if ($amount > $this->balance) {
            return "電子マネー: 残高不足";
        }
        $this->balance -= $amount;
        return "電子マネーで{$amount}円支払い";
    }

    public function getBalance(): float {
        return $this->balance;
    }
}

function checkout(Payable $payment, float $amount): void {
    echo $payment->pay($amount) . "\\n";
    echo "残高/利用可能額: " . $payment->getBalance() . "円\\n";
}

$card = new CreditCard(50000);
$wallet = new EWallet(3000);

checkout($card, 12000);
checkout($wallet, 5000);
checkout($wallet, 2000);`}
          expectedOutput={`クレジットカードで12000円支払い
残高/利用可能額: 38000円
電子マネー: 残高不足
残高/利用可能額: 3000円
電子マネーで2000円支払い
残高/利用可能額: 1000円`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="interfaces" />
      </div>
      <LessonNav lessons={lessons} currentId="interfaces" basePath="/learn/inheritance" />
    </div>
  );
}
