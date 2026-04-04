import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("modern");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">モダンPHP レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Readonly</h1>
        <p className="text-gray-400">readonlyプロパティとreadonlyクラスの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Readonlyとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP 8.1で追加されたreadonlyプロパティとPHP 8.2のreadonlyクラスは、不変オブジェクト（イミュータブル）を表現するための機能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>初期化後はプロパティの変更を試みると<code className="text-violet-300">Error</code>が発生</li>
          <li>コンストラクタプロモーションと組み合わせて簡潔に書ける</li>
          <li><code className="text-violet-300">readonly class</code>（PHP 8.2）は全プロパティがreadonly</li>
          <li>値オブジェクト（VO）やDTOの実装に最適</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">readonlyプロパティの基本</h2>
        <p className="text-gray-400 mb-4">readonlyプロパティは初期化後に変更できません。値オブジェクトの実装に役立ちます。</p>
        <PhpEditor
          defaultCode={`<?php
class UserId {
    public function __construct(
        public readonly int $value,
    ) {
        if ($value <= 0) {
            throw new InvalidArgumentException('IDは正の整数必要です');
        }
    }

    public function equals(UserId $other): bool {
        return $this->value === $other->value;
    }
}

class Email {
    public readonly string $value;

    public function __construct(string $email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('無効なメールアドレス');
        }
        $this->value = strtolower($email);
    }
}

$id1 = new UserId(42);
$id2 = new UserId(42);
$id3 = new UserId(99);

echo "ID: {$id1->value}\n";
echo "id1 == id2: " . ($id1->equals($id2) ? 'true' : 'false') . "\n";
echo "id1 == id3: " . ($id1->equals($id3) ? 'true' : 'false') . "\n";

$email = new Email('User@Example.COM');
echo "メール: {$email->value}\n"; // 小文字に正規化される

try {
    $id1->value = 100; // エラー
} catch (Error $e) {
    echo "エラー: " . $e->getMessage() . "\n";
}`}
          expectedOutput={`ID: 42
id1 == id2: true
id1 == id3: false
メール: user@example.com
エラー: Cannot modify readonly property UserId::$value`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">readonlyクラスとwith構文</h2>
        <p className="text-gray-400 mb-4">PHP 8.2のreadonlyクラスと変更コピーパターンでイミュータブルな設計を実現します。</p>
        <PhpEditor
          defaultCode={`<?php
// PHP 8.2: readonly class
readonly class Money {
    public function __construct(
        public int $amount,
        public string $currency = 'JPY',
    ) {}

    // 変更後の新しいインスタンスを返す（イミュータブルパターン）
    public function withAmount(int $amount): static {
        return new static($amount, $this->currency);
    }

    public function add(Money $other): static {
        if ($this->currency !== $other->currency) {
            throw new RuntimeException('通貨が異なります');
        }
        return $this->withAmount($this->amount + $other->amount);
    }

    public function multiply(int $factor): static {
        return $this->withAmount($this->amount * $factor);
    }

    public function __toString(): string {
        return number_format($this->amount) . $this->currency;
    }
}

$price = new Money(1000);
$tax = new Money(100);

$total = $price->add($tax);
$doubled = $total->multiply(2);

echo "元の価格: $price\n";
echo "合計: $total\n";
echo "2倍: $doubled\n";
echo "元のオブジェクトは変更なし: $price\n";`}
          expectedOutput={`元の価格: 1,000JPY
合計: 1,100JPY
2倍: 2,200JPY
元のオブジェクトは変更なし: 1,000JPY`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="modern" lessonId="readonly" />
      </div>
      <LessonNav lessons={lessons} currentId="readonly" basePath="/learn/modern" />
    </div>
  );
}
