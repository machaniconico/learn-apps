import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHPエコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コミュニティ</h1>
        <p className="text-gray-400">PHPカンファレンス、Packagist、PHP Internalsなどコミュニティリソースを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPコミュニティのリソース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPには活発なコミュニティがあります。学習リソース・ニュース・ツールを活用して最新情報をキャッチアップしましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">php.net</code> - 公式ドキュメント（日本語あり）</li>
          <li><code className="text-indigo-300">Packagist</code> - パッケージリポジトリ（packagist.org）</li>
          <li><code className="text-indigo-300">PHP Internals</code> - PHP言語の開発議論（internals.php.net）</li>
          <li><code className="text-indigo-300">PHPカンファレンス</code> - PHPCon Japan、PHP勉強会</li>
          <li><code className="text-indigo-300">PHPStan/Psalm</code> - 静的解析ツール</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">静的解析ツールの活用</h2>
        <p className="text-gray-400 mb-4">PHPStanやPsalmは実行前にコードの型エラーやバグを検出する静的解析ツールです。</p>
        <PhpEditor
          defaultCode={`<?php
declare(strict_types=1);

// 静的解析で検出できるバグの例

// 良いコード: 型を明示してPHPStanレベル8でも通る
function divideStrict(int $a, int $b): float {
    if ($b === 0) {
        throw new \DivisionByZeroError("ゼロ除算は許可されていません");
    }
    return $a / $b;
}

// Nullable型の適切な処理
function findUser(int $id): ?array {
    $users = [1 => ['name' => '田中', 'email' => 'tanaka@example.com']];
    return $users[$id] ?? null;
}

// Nullチェックを適切に行う
function getUserEmail(int $id): string {
    $user = findUser($id);
    if ($user === null) {
        return '不明なユーザー';
    }
    return $user['email']; // $userがnullでないことが保証される
}

// 型の絞り込みパターン
function processValue(int|string|null $value): string {
    if ($value === null) {
        return 'null値';
    }
    if (is_int($value)) {
        return "整数: " . ($value * 2);
    }
    // ここでは$valueはstring型が保証される
    return "文字列: " . strtoupper($value);
}

echo divideStrict(10, 3) . "\n";
echo getUserEmail(1) . "\n";
echo getUserEmail(99) . "\n";
echo processValue(42) . "\n";
echo processValue('hello') . "\n";
echo processValue(null) . "\n";`}
          expectedOutput={`3.3333333333333
tanaka@example.com
不明なユーザー
整数: 84
文字列: HELLO
null値`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHP開発のベストプラクティス</h2>
        <p className="text-gray-400 mb-4">モダンPHP開発で採用すべきベストプラクティスとツールチェーンをまとめます。</p>
        <PhpEditor
          defaultCode={`<?php
// モダンPHP開発のベストプラクティス集

// 1. strict_typesを宣言する
// declare(strict_types=1); // ファイル先頭に記述

// 2. 型宣言を積極的に使う
function calculateTax(float $price, float $rate = 0.1): float {
    return round($price * $rate, 2);
}

// 3. 早期リターンでネストを減らす
function processOrder(array $order): string {
    if (empty($order['items'])) {
        return 'エラー: 商品がありません';
    }
    if ($order['total'] <= 0) {
        return 'エラー: 金額が不正です';
    }
    if (!isset($order['user_id'])) {
        return 'エラー: ユーザーIDが必要です';
    }
    // メインロジック
    return "注文処理完了: {$order['total']}円";
}

// 4. 定数とEnumで魔法の数値を排除
enum HttpStatus: int {
    case Ok = 200;
    case NotFound = 404;
    case ServerError = 500;
}

// 5. イミュータブルな値オブジェクト
readonly class Price {
    public function __construct(
        public readonly float $amount,
        public readonly string $currency = 'JPY',
    ) {}

    public function withTax(float $rate = 0.1): static {
        return new static(round($this->amount * (1 + $rate), 2), $this->currency);
    }

    public function __toString(): string {
        return number_format($this->amount) . $this->currency;
    }
}

// 使用例
echo "税額: " . calculateTax(1000) . "円\n";
echo processOrder(['items' => ['本'], 'total' => 3000, 'user_id' => 1]) . "\n";
echo "HTTPステータス: " . HttpStatus::Ok->value . "\n";

$price = new Price(1000);
echo "税抜: $price\n";
echo "税込: " . $price->withTax() . "\n";`}
          expectedOutput={`税額: 100円
注文処理完了: 3000円
HTTPステータス: 200
税抜: 1,000JPY
税込: 1,100JPY`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="community" />
      </div>
      <LessonNav lessons={lessons} currentId="community" basePath="/learn/ecosystem" />
    </div>
  );
}
