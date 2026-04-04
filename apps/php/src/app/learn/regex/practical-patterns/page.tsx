import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">正規表現 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">実践パターン</h1>
        <p className="text-gray-400">メール、URL、電話番号など実用的な正規表現パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実用的な正規表現パターン集</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際の開発でよく使う正規表現パターンを学びます。ただし、複雑なバリデーションにはfilter_var()も活用しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>メールアドレス、URL、電話番号のバリデーション</li>
          <li>郵便番号・IPアドレスの検証</li>
          <li>HTMLタグの除去・抽出</li>
          <li>日本語テキストの処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よく使うバリデーションパターン</h2>
        <p className="text-gray-400 mb-4">メールアドレス、URL、電話番号、郵便番号などの実用パターンを検証します。</p>
        <PhpEditor
          defaultCode={`<?php
$patterns = [
    'メール' => [
        'pattern' => '/^[\w.+\-]+@[\w\-]+\.[\w.\-]+$/',
        'tests' => ['user@example.com', 'invalid@', 'test.user+tag@domain.co.jp', 'no-at-sign'],
    ],
    '日本の電話番号' => [
        'pattern' => '/^(0\d{1,4}-\d{1,4}-\d{4}|0\d{9,10})$/',
        'tests' => ['090-1234-5678', '03-1234-5678', '0120-123-456', '12345'],
    ],
    '郵便番号' => [
        'pattern' => '/^\d{3}-?\d{4}$/',
        'tests' => ['123-4567', '1234567', '123-456', 'abc-defg'],
    ],
    'IPv4アドレス' => [
        'pattern' => '/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/',
        'tests' => ['192.168.1.1', '255.255.255.255', '256.0.0.1', '10.0.0'],
    ],
];

foreach ($patterns as $name => [$pattern, $tests]) {
    echo "=== $name ===\n";
    foreach ($tests as $test) {
        $valid = preg_match($pattern, $test) ? '有効' : '無効';
        echo "  $test: $valid\n";
    }
    echo "\n";
}`}
          expectedOutput={`=== メール ===
  user@example.com: 有効
  invalid@: 無効
  test.user+tag@domain.co.jp: 有効
  no-at-sign: 無効

=== 日本の電話番号 ===
  090-1234-5678: 有効
  03-1234-5678: 有効
  0120-123-456: 有効
  12345: 無効

=== 郵便番号 ===
  123-4567: 有効
  1234567: 有効
  123-456: 無効
  abc-defg: 無効

=== IPv4アドレス ===
  192.168.1.1: 有効
  255.255.255.255: 有効
  256.0.0.1: 無効
  10.0.0: 無効`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テキスト処理の実践</h2>
        <p className="text-gray-400 mb-4">HTMLからテキスト抽出、Markdownのリンク変換など実際の開発で使うテキスト処理を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
// HTMLからテキスト抽出
$html = '<h1>PHPの<b>正規表現</b></h1><p>実用的な<a href="#">パターン</a>を学ぼう。</p>';
$text = preg_replace('/<[^>]+>/', '', $html);
echo "HTMLを除去: $text\n\n";

// Markdownリンクをhtmlに変換
$markdown = "詳細は[PHP公式サイト](https://php.net)と[Packagist](https://packagist.org)を参照。";
$html = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', '<a href="$2">$1</a>', $markdown);
echo "Markdown変換:\n$html\n\n";

// CamelCaseをsnake_caseに変換
function toSnakeCase(string $input): string {
    return strtolower(preg_replace('/[A-Z]/', '_$0', lcfirst($input)));
}

$names = ['getUserName', 'findByEmailAddress', 'createNewProduct', 'updateUserProfile'];
foreach ($names as $name) {
    echo "$name => " . toSnakeCase($name) . "\n";
}`}
          expectedOutput={`HTMLを除去: PHPの正規表現実用的なパターンを学ぼう。

Markdown変換:
詳細は<a href="https://php.net">PHP公式サイト</a>と<a href="https://packagist.org">Packagist</a>を参照。

getUserName => get_user_name
findByEmailAddress => find_by_email_address
createNewProduct => create_new_product
updateUserProfile => update_user_profile`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="regex" lessonId="practical-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="practical-patterns" basePath="/learn/regex" />
    </div>
  );
}
