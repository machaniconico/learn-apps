import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function DesignBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">デザインパターン基礎</h1>
        <p className="text-gray-400">GoFデザインパターンの概要と分類を学び、再利用可能で保守しやすいコード設計の基礎を理解します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">デザインパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          デザインパターンとは、ソフトウェア設計でよく発生する問題に対する再利用可能な解決策のカタログです。
          GoF（Gang of Four）の23パターンは「生成」「構造」「振る舞い」の3カテゴリに分類されます。
        </p>
        <ul className="text-gray-400 space-y-2">
          <li><span className="text-pink-400 font-semibold">生成パターン：</span>Singleton、Factory、Builder、Prototype、Abstract Factory</li>
          <li><span className="text-pink-400 font-semibold">構造パターン：</span>Adapter、Decorator、Facade、Proxy、Composite</li>
          <li><span className="text-pink-400 font-semibold">振る舞いパターン：</span>Strategy、Observer、Command、Iterator、Template Method</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パターンが解決する問題</h2>
        <p className="text-gray-400 mb-4">
          デザインパターンはSOLID原則（単一責任・開放閉鎖・リスコフ置換・インターフェース分離・依存関係逆転）を実践するための手法でもあります。
        </p>
        <PhpEditor
          defaultCode={`<?php
// デザインパターンなし（開放閉鎖原則違反）
class PaymentProcessor {
    public function process(string $type, float $amount): string {
        if ($type === 'credit') {
            return "クレジットカードで{$amount}円決済";
        } elseif ($type === 'paypal') {
            return "PayPalで{$amount}円決済";
        }
        // 新しい決済方法を追加するたびにこのクラスを変更する必要がある
        return "不明な決済方法";
    }
}

$processor = new PaymentProcessor();
echo $processor->process('credit', 1000) . "\\n";
echo $processor->process('paypal', 2000) . "\\n";`}
          expectedOutput={`クレジットカードで1000円決済\nPayPalで2000円決済`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースによる拡張性（開放閉鎖原則）</h2>
        <p className="text-gray-400 mb-4">
          インターフェースを使うことで、既存コードを変更せずに新しい決済方法を追加できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// インターフェースで拡張性を確保
interface PaymentMethod {
    public function pay(float $amount): string;
}

class CreditCard implements PaymentMethod {
    public function pay(float $amount): string {
        return "クレジットカードで{$amount}円決済完了";
    }
}

class PayPal implements PaymentMethod {
    public function pay(float $amount): string {
        return "PayPalで{$amount}円決済完了";
    }
}

class BankTransfer implements PaymentMethod {
    public function pay(float $amount): string {
        return "銀行振込で{$amount}円決済完了";
    }
}

// 既存コードを変更せずに新しい決済方法を追加可能
$methods = [new CreditCard(), new PayPal(), new BankTransfer()];
foreach ($methods as $method) {
    echo $method->pay(5000) . "\\n";
}`}
          expectedOutput={`クレジットカードで5000円決済完了\nPayPalで5000円決済完了\n銀行振込で5000円決済完了`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートメソッドパターン</h2>
        <p className="text-gray-400 mb-4">
          抽象クラスでアルゴリズムの骨格を定義し、サブクラスで詳細を実装するパターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
abstract class DataExporter {
    // テンプレートメソッド（アルゴリズムの骨格）
    final public function export(array $data): string {
        $formatted = $this->format($data);
        $output = $this->write($formatted);
        return "エクスポート完了: " . $output;
    }

    abstract protected function format(array $data): string;
    abstract protected function write(string $data): string;
}

class CsvExporter extends DataExporter {
    protected function format(array $data): string {
        return implode(",", $data);
    }

    protected function write(string $data): string {
        return "CSV({$data})";
    }
}

class JsonExporter extends DataExporter {
    protected function format(array $data): string {
        return json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    protected function write(string $data): string {
        return "JSON({$data})";
    }
}

$data = ["田中", "鈴木", "佐藤"];
$csv = new CsvExporter();
$json = new JsonExporter();

echo $csv->export($data) . "\\n";
echo $json->export($data) . "\\n";`}
          expectedOutput={`エクスポート完了: CSV(田中,鈴木,佐藤)\nエクスポート完了: JSON(["田中","鈴木","佐藤"])`}
        />
      </section>
      <LessonCompleteButton lessonId="design-basics" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="design-basics" basePath="/learn/oop-advanced" />
    </div>
  );
}
