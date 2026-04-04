import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function XssPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">XSS対策</h1>
        <p className="text-gray-400">htmlspecialcharsを使ったクロスサイトスクリプティング（XSS）対策の基本を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">XSSとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          クロスサイトスクリプティング（XSS）は、悪意あるスクリプトをWebページに埋め込む攻撃です。
          ユーザー入力をそのままHTMLに出力すると、攻撃者がJavaScriptを実行できてしまいます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">htmlspecialchars($str, ENT_QUOTES, 'UTF-8')</code> — 必ずこの形式で</li>
          <li>• <code className="text-red-300">ENT_QUOTES</code> — シングル・ダブル両方の引用符をエスケープ</li>
          <li>• <code className="text-red-300">strip_tags()</code> — タグを除去（出力時より入力時のサニタイズに）</li>
          <li>• Content Security Policy（CSP）ヘッダーも組み合わせる</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">htmlspecialcharsの使い方</h2>
        <p className="text-gray-400 mb-4">
          ユーザー入力を出力する際は必ずエスケープします。
        </p>
        <PhpEditor
          defaultCode={`<?php
// XSS攻撃の例となる入力
$inputs = [
    '<script>alert("XSS")</script>',
    '"><img src=x onerror=alert(1)>',
    "'; DROP TABLE users; --",
    '<a href="javascript:void(0)">クリック</a>',
    '田中 <太郎>',
];

echo "=== htmlspecialcharsでのエスケープ ===\\n";
foreach ($inputs as $input) {
    $safe = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    echo "入力: " . $input . "\\n";
    echo "安全: " . $safe . "\\n\\n";
}`}
          expectedOutput={`=== htmlspecialcharsでのエスケープ ===\n入力: <script>alert("XSS")</script>\n安全: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;\n\n入力: "><img src=x onerror=alert(1)>\n安全: &quot;&gt;&lt;img src=x onerror=alert(1)&gt;\n\n入力: '; DROP TABLE users; --\n安全: &#039;; DROP TABLE users; --\n\n入力: <a href="javascript:void(0)">クリック</a>\n安全: &lt;a href=&quot;javascript:void(0)&quot;&gt;クリック&lt;/a&gt;\n\n入力: 田中 <太郎>\n安全: 田中 &lt;太郎&gt;`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">安全な出力ヘルパー関数</h2>
        <p className="text-gray-400 mb-4">
          プロジェクト全体で使えるエスケープヘルパーを定義します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 安全なHTMLエスケープ関数
function e(mixed $value): string {
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// JSON出力のエスケープ
function eJson(mixed $value): string {
    return json_encode($value, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

// URL出力のエスケープ
function eUrl(string $url): string {
    return htmlspecialchars(filter_var($url, FILTER_SANITIZE_URL), ENT_QUOTES, 'UTF-8');
}

$userComment = '<script>window.location="http://evil.com"</script>';
$userName = 'O\'Brian <Admin>';
$url = 'https://example.com/search?q=<test>&page=1';

echo "コメント: " . e($userComment) . "\\n";
echo "ユーザー名: " . e($userName) . "\\n";
echo "URL: " . eUrl($url) . "\\n";
echo "JSON: " . eJson(['name' => $userName]) . "\\n";`}
          expectedOutput={`コメント: &lt;script&gt;window.location=&quot;http://evil.com&quot;&lt;/script&gt;\nユーザー名: O&#039;Brian &lt;Admin&gt;\nURL: https://example.com/search?q=&lt;test&gt;&amp;page=1\nJSON: {&quot;name&quot;:&quot;O\u0027Brian \u003cAdmin\u003e&quot;}`}
        />
      </section>
      <LessonCompleteButton lessonId="xss" categoryId="security" />
      <LessonNav lessons={lessons} currentId="xss" basePath="/learn/security" />
    </div>
  );
}
