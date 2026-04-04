import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">正規表現 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パターンマッチ</h1>
        <p className="text-gray-400">preg_matchとpreg_match_allによるパターンマッチングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">preg_matchとpreg_match_all</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPのパターンマッチング関数の使い方を学びます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-yellow-300">preg_match()</code> - 最初のマッチを見つける（0か1を返す）</li>
          <li><code className="text-yellow-300">preg_match_all()</code> - 全マッチを見つける（マッチ数を返す）</li>
          <li>第3引数<code className="text-yellow-300">$matches</code>にマッチ結果が格納される</li>
          <li>キャプチャグループ<code className="text-yellow-300">(...)</code>で部分文字列を抽出</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キャプチャグループの活用</h2>
        <p className="text-gray-400 mb-4">キャプチャグループを使うと、マッチした文字列の特定部分を抽出できます。</p>
        <PhpEditor
          defaultCode={`<?php
// 日付のパース
$dateStr = "会議は2024-03-15の14:30から始まります";
if (preg_match('/(\d{4})-(\d{2})-(\d{2})/', $dateStr, $m)) {
    echo "年: {$m[1]}, 月: {$m[2]}, 日: {$m[3]}\n";
}

// 名前付きキャプチャグループ
$logLine = '[2024-01-15 09:30:45] ERROR: データベース接続失敗';
$pattern = '/\[(?P<date>\d{4}-\d{2}-\d{2}) (?P<time>\d{2}:\d{2}:\d{2})\] (?P<level>\w+): (?P<message>.+)/';

if (preg_match($pattern, $logLine, $m)) {
    echo "日付: {$m['date']}\n";
    echo "時刻: {$m['time']}\n";
    echo "レベル: {$m['level']}\n";
    echo "メッセージ: {$m['message']}\n";
}

echo "\n";

// preg_match_allで全マッチを取得
$html = '<a href="https://php.net">PHP</a> と <a href="https://composer.org">Composer</a>';
preg_match_all('/<a href="([^"]+)">([^<]+)<\/a>/', $html, $matches, PREG_SET_ORDER);

foreach ($matches as $match) {
    echo "リンク: {$match[2]} => {$match[1]}\n";
}`}
          expectedOutput={`年: 2024, 月: 03, 日: 15
日付: 2024-01-15
時刻: 09:30:45
レベル: ERROR
メッセージ: データベース接続失敗

リンク: PHP => https://php.net
リンク: Composer => https://composer.org`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PREG_OFFSET_CAPTUREフラグ</h2>
        <p className="text-gray-400 mb-4">PREG_OFFSET_CAPTUREフラグを使うとマッチした位置（オフセット）も取得できます。</p>
        <PhpEditor
          defaultCode={`<?php
$text = "PHPは1994年に開発され、PHP 8は2020年にリリースされた。";

// マッチした位置も取得
preg_match_all('/PHP\s*\d*/', $text, $matches, PREG_OFFSET_CAPTURE);

echo "マッチ一覧:\n";
foreach ($matches[0] as [$match, $offset]) {
    echo "  '{$match}' at position {$offset}\n";
}

echo "\n";

// preg_matchで非キャプチャグループ(?:...)
$versions = ['PHP 8.3', 'PHP 8.1', 'PHP 7.4', 'Java 17', 'PHP 8.0'];
foreach ($versions as $v) {
    if (preg_match('/PHP\s(?:8\.\d+)/', $v, $m)) {
        echo "{$m[0]}: PHP 8.x系\n";
    }
}`}
          expectedOutput={`マッチ一覧:
  'PHP' at position 0
  'PHP 8' at position 13

PHP 8.3: PHP 8.x系
PHP 8.1: PHP 8.x系
PHP 8.0: PHP 8.x系`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="regex" lessonId="pattern-matching" />
      </div>
      <LessonNav lessons={lessons} currentId="pattern-matching" basePath="/learn/regex" />
    </div>
  );
}
