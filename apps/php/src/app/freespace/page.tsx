import { PhpEditor } from "@/components/php-editor";

const DEFAULT_CODE = `<?php
// PHP FizzBuzz + 配列操作 + クラス

// FizzBuzz
echo "=== FizzBuzz (1-20) ===\\n";
for ($i = 1; $i <= 20; $i++) {
    echo match(true) {
        $i % 15 === 0 => "FizzBuzz",
        $i % 3 === 0  => "Fizz",
        $i % 5 === 0  => "Buzz",
        default        => $i,
    } . " ";
}
echo "\\n";

// 配列の高階関数
echo "\\n=== 配列操作 ===\\n";
$numbers = range(1, 10);
$result = array_map(
    fn($n) => $n * $n,
    array_filter($numbers, fn($n) => $n % 2 === 0)
);
echo "偶数の二乗: " . implode(", ", $result) . "\\n";

$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);
echo "合計: {$sum}\\n";

// クラス
echo "\\n=== クラス ===\\n";
readonly class Person {
    public function __construct(
        public string $name,
        public int $age,
    ) {}
    public function __toString(): string {
        return "{$this->name}({$this->age}歳)";
    }
}

$people = [
    new Person("太郎", 25),
    new Person("花子", 30),
    new Person("次郎", 22),
];

usort($people, fn($a, $b) => $a->age <=> $b->age);
foreach ($people as $p) {
    echo "  {$p}\\n";
}

// Null合体演算子
echo "\\n=== Null安全 ===\\n";
$maybeNull = null;
$length = strlen($maybeNull ?? "");
echo "長さ: {$length}（nullなら0）\\n";
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🐘</span>
            <h1 className="text-3xl font-bold text-gray-100">PHPフリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">PHPコードを自由に書いて確認できるフリースペースです</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              シンタックスハイライト対応
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Tabキーでインデント
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              自由にコードを試せる
            </div>
          </div>
        </div>

        <PhpEditor defaultCode={DEFAULT_CODE} height="480px" />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">PHP基本機能</h3>
            <p className="text-xs text-gray-500 leading-relaxed">変数、配列、文字列操作、match式、Null合体演算子などPHPの基本機能を自由に試せます。</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">OOP・モダンPHP</h3>
            <p className="text-xs text-gray-500 leading-relaxed">クラス、readonly、enum、名前付き引数、アロー関数などモダンPHP 8の機能を確認できます。</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">PHPはブラウザ上では直接実行できません。ローカル環境またはオンラインのPHP実行環境で実行してください。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
