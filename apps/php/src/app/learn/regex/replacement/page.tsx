import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">正規表現 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">置換</h1>
        <p className="text-gray-400">preg_replaceとpreg_replace_callbackによる置換処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">正規表現による置換</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          preg_replace()はパターンにマッチした部分を指定した文字列に置換します。後方参照を使うとキャプチャした内容を置換文字列に含められます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-yellow-300">preg_replace(pattern, replacement, subject)</code></li>
          <li><code className="text-yellow-300">$1, $2</code> または <code className="text-yellow-300">\1, \2</code> で後方参照</li>
          <li><code className="text-yellow-300">${'{name}'}</code> で名前付きグループの後方参照</li>
          <li><code className="text-yellow-300">preg_replace_callback()</code> でコールバックによる動的置換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">後方参照を使った置換</h2>
        <p className="text-gray-400 mb-4">キャプチャグループの内容を置換文字列で使う後方参照の活用法を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
// 日付形式の変換
$date = "2024-03-15";
echo preg_replace('/(\d{4})-(\d{2})-(\d{2})/', '$1年$2月$3日', $date) . "\n";

// 名前を「姓 名」から「名 姓」に入れ替え
$name = "田中 太郎";
echo preg_replace('/^(\S+)\s+(\S+)$/', '$2 $1', $name) . "\n";

// HTMLタグをMarkdownに変換
$html = '<b>太字</b>のテキストと<i>斜体</i>のテキスト';
$md = preg_replace(['/<b>(.*?)<\/b>/', '/<i>(.*?)<\/i>/'], ['**$1**', '*$1*'], $html);
echo $md . "\n";

// 電話番号の正規化
$phones = ['090-1234-5678', '0901234 5678', '(090)1234-5678'];
foreach ($phones as $phone) {
    $normalized = preg_replace('/[^\d]/', '', $phone);
    $formatted = preg_replace('/^(\d{3})(\d{4})(\d{4})$/', '$1-$2-$3', $normalized);
    echo "$phone => $formatted\n";
}`}
          expectedOutput={`2024年03月15日
太郎 田中
**太字**のテキストと*斜体*のテキスト
090-1234-5678 => 090-1234-5678
0901234 5678 => 090-1234-5678
(090)1234-5678 => 090-1234-5678`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">preg_replace_callbackの活用</h2>
        <p className="text-gray-400 mb-4">コールバック関数を使うことでマッチした部分を動的に変換できます。</p>
        <PhpEditor
          defaultCode={`<?php
// 数値に消費税を追加
$priceText = "りんご 100円、みかん 80円、ぶどう 250円";
$result = preg_replace_callback('/(\d+)円/', function($m) {
    $taxed = (int)($m[1] * 1.1);
    return "{$taxed}円(税込)";
}, $priceText);
echo $result . "\n\n";

// Markdownのコードブロックをシンタックスハイライト風に変換
$markdown = "PHPでは \`echo\` や \`print\` を使います。また \`var_dump()\` もデバッグに便利です。";
$result = preg_replace_callback('/\`([^\`]+)\`/', function($m) {
    return "<code>{$m[1]}</code>";
}, $markdown);
echo $result . "\n\n";

// 文章内のURLをリンクに変換
$text = "詳細はhttps://php.netまたはhttps://packagist.orgを参照してください。";
$result = preg_replace_callback(
    '/https?:\/\/[^\s。、]+/',
    fn($m) => "<a href=\"{$m[0]}\">{$m[0]}</a>",
    $text
);
echo $result . "\n";`}
          expectedOutput={`りんご 110円(税込)、みかん 88円(税込)、ぶどう 275円(税込)

PHPでは <code>echo</code> や <code>print</code> を使います。また <code>var_dump()</code> もデバッグに便利です。

詳細は<a href="https://php.net">https://php.net</a>または<a href="https://packagist.org">https://packagist.org</a>を参照してください。`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="regex" lessonId="replacement" />
      </div>
      <LessonNav lessons={lessons} currentId="replacement" basePath="/learn/regex" />
    </div>
  );
}
