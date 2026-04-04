import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">正規表現 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">先読み・後読み</h1>
        <p className="text-gray-400">肯定・否定の先読み・後読みアサーションを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ゼロ幅アサーションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          先読み・後読みはマッチする位置を指定しますが、文字自体はマッチ結果に含まれません（ゼロ幅）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-yellow-300">{'(?=...)'}</code> - 肯定先読み：直後に...がある位置</li>
          <li><code className="text-yellow-300">{'(?!...)'}</code> - 否定先読み：直後に...がない位置</li>
          <li><code className="text-yellow-300">{'(?<=...)'}</code> - 肯定後読み：直前に...がある位置</li>
          <li><code className="text-yellow-300">{'(?<!...)'}</code> - 否定後読み：直前に...がない位置</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">先読みアサーション</h2>
        <p className="text-gray-400 mb-4">先読みを使うと「〜の直前にある数字」のような条件でマッチできます。</p>
        <PhpEditor
          defaultCode={`<?php
// 肯定先読み: 単位の前の数値
$text = "価格: 1500円, 重量: 2.5kg, 温度: 37度, 距離: 100m";

// 「円」の前の数値
preg_match_all('/[\d.]+(?=円)/', $text, $m);
echo "円の前の数値: " . implode(', ', $m[0]) . "\n";

// 否定先読み: 「円」以外の単位の前の数値
preg_match_all('/[\d.]+(?!円|\d)/', $text, $m);
echo "円以外の前の数値: " . implode(', ', $m[0]) . "\n";

echo "\n";

// パスワード強度チェック（複数の先読みを組み合わせ）
function checkPasswordStrength(string $password): array {
    $checks = [
        '8文字以上' => strlen($password) >= 8,
        '小文字を含む' => (bool)preg_match('/(?=.*[a-z])/', $password),
        '大文字を含む' => (bool)preg_match('/(?=.*[A-Z])/', $password),
        '数字を含む'   => (bool)preg_match('/(?=.*\d)/', $password),
        '記号を含む'   => (bool)preg_match('/(?=.*[!@#$%^&*])/', $password),
    ];
    return $checks;
}

$passwords = ['abc', 'Password1', 'Str0ng!Pass'];
foreach ($passwords as $pwd) {
    $checks = checkPasswordStrength($pwd);
    $passed = array_sum($checks);
    echo "$pwd: $passed/5 ";
    echo implode(', ', array_keys(array_filter($checks))) . "\n";
}`}
          expectedOutput={`円の前の数値: 1500
円以外の前の数値: 2.5, 37, 100

abc: 0/5
Password1: 3/5 8文字以上, 小文字を含む, 大文字を含む, 数字を含む
Str0ng!Pass: 5/5 8文字以上, 小文字を含む, 大文字を含む, 数字を含む, 記号を含む`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">後読みアサーション</h2>
        <p className="text-gray-400 mb-4">後読みを使うと「〜の直後にある文字列」のような条件でマッチできます。</p>
        <PhpEditor
          defaultCode={`<?php
// 肯定後読み: 特定の文字の後の値
$config = "DB_HOST=localhost\nDB_PORT=3306\nDB_NAME=myapp\nAPP_KEY=secret123";

// "DB_" で始まるキーの値を取得
preg_match_all('/(?<=DB_)\w+/', $config, $m);
echo "DB設定キー: " . implode(', ', $m[0]) . "\n";

// = の後の値
preg_match_all('/(?<==)\S+/', $config, $m);
echo "全設定値: " . implode(', ', $m[0]) . "\n";

echo "\n";

// 否定後読み: 「\」でエスケープされていない特殊文字
$template = 'Hello \{name\}, your score is {score} out of {total}';

// エスケープされていない { の後のキー名
preg_match_all('/(?<!\\\\)\{(\w+)\}/', $template, $m);
echo "プレースホルダー: " . implode(', ', $m[1]) . "\n";

// テンプレート置換
$vars = ['score' => 95, 'total' => 100];
$result = preg_replace_callback('/(?<!\\\\)\{(\w+)\}/', function($m) use ($vars) {
    return $vars[$m[1]] ?? $m[0];
}, $template);
echo $result . "\n";`}
          expectedOutput={`DB設定キー: HOST, PORT, NAME
全設定値: localhost, 3306, myapp, secret123

プレースホルダー: score, total
Hello \{name\}, your score is 95 out of 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="regex" lessonId="lookahead" />
      </div>
      <LessonNav lessons={lessons} currentId="lookahead" basePath="/learn/regex" />
    </div>
  );
}
