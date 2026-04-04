import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">正規表現 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現基礎</h1>
        <p className="text-gray-400">正規表現の基本構文とメタ文字の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">正規表現とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          正規表現（Regular Expression）は文字列のパターンを表現する記法です。PHPはPCRE（Perl互換正規表現）を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-yellow-300">.</code> - 任意の1文字（改行除く）</li>
          <li><code className="text-yellow-300">*</code> - 0回以上の繰り返し</li>
          <li><code className="text-yellow-300">+</code> - 1回以上の繰り返し</li>
          <li><code className="text-yellow-300">?</code> - 0回または1回</li>
          <li><code className="text-yellow-300">[abc]</code> - 文字クラス（a、b、cのいずれか）</li>
          <li><code className="text-yellow-300">^</code> / <code className="text-yellow-300">$</code> - 行頭 / 行末</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なメタ文字</h2>
        <p className="text-gray-400 mb-4">正規表現のメタ文字を使ってさまざまなパターンを表現する基本を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
$testCases = [
    // [パターン, テスト文字列, 説明]
    ['/\d+/', '電話: 090-1234-5678', '数字1文字以上'],
    ['/\d{3}-\d{4}-\d{4}/', '090-1234-5678', '電話番号形式'],
    ['/[a-zA-Z]+/', 'Hello World 123', '英字1文字以上'],
    ['/^\d{3}/', '123abc', '先頭3桁の数字'],
    ['/\d{4}$/', 'year2024', '末尾4桁の数字'],
    ['/colou?r/', 'color vs colour', 'uが0または1回'],
    ['/[A-Z][a-z]+/', 'Hello World PHP', '大文字始まりの単語'],
];

foreach ($testCases as [$pattern, $subject, $desc]) {
    $matched = preg_match($pattern, $subject, $matches);
    $result = $matched ? "マッチ: '{$matches[0]}'" : "マッチなし";
    echo "[$desc]\n  パターン: $pattern\n  文字列: $subject\n  結果: $result\n\n";
}`}
          expectedOutput={`[数字1文字以上]
  パターン: /\d+/
  文字列: 電話: 090-1234-5678
  結果: マッチ: '090'

[電話番号形式]
  パターン: /\d{3}-\d{4}-\d{4}/
  文字列: 090-1234-5678
  結果: マッチ: '090-1234-5678'

[英字1文字以上]
  パターン: /[a-zA-Z]+/
  文字列: Hello World 123
  結果: マッチ: 'Hello'

[先頭3桁の数字]
  パターン: /^\d{3}/
  文字列: 123abc
  結果: マッチ: '123'

[末尾4桁の数字]
  パターン: /\d{4}$/
  文字列: year2024
  結果: マッチ: '2024'

[uが0または1回]
  パターン: /colou?r/
  文字列: color vs colour
  結果: マッチ: 'color'

[大文字始まりの単語]
  パターン: /[A-Z][a-z]+/
  文字列: Hello World PHP
  結果: マッチ: 'Hello'`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字クラスとショートハンド</h2>
        <p className="text-gray-400 mb-4">よく使うパターンにはショートハンド記法があります。\d、\w、\sなどを活用しましょう。</p>
        <PhpEditor
          defaultCode={`<?php
$text = "田中太郎 (Tanaka Taro) - 年齢: 30歳, スコア: 98.5点";

$patterns = [
    '/\d+/'         => '整数（\d+）',
    '/\d+\.?\d*/'  => '数値（整数・小数）',
    '/[A-Za-z]+/'  => '英単語',
    '/\w+/'        => '単語文字（\w+）',
    '/\s+/'        => '空白文字',
    '/[^\x00-\x7F]+/' => '非ASCII（日本語等）',
];

foreach ($patterns as $pattern => $desc) {
    preg_match_all($pattern, $text, $matches);
    $found = implode(', ', array_map(fn($m) => "'$m'", $matches[0]));
    echo "$desc:\n  $found\n\n";
}`}
          expectedOutput={`整数（\d+）:
  '30', '98', '5'

数値（整数・小数）:
  '30', '98.5'

英単語:
  'Tanaka', 'Taro'

単語文字（\w+）:
  'Tanaka', 'Taro', '30', '98', '5'

空白文字:
  ' ', ' ', ' ', ' ', ' ', ' '

非ASCII（日本語等）:
  '田中太郎', '年齢', '歳', 'スコア', '点'`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="regex" lessonId="regex-fundamentals" />
      </div>
      <LessonNav lessons={lessons} currentId="regex-fundamentals" basePath="/learn/regex" />
    </div>
  );
}
