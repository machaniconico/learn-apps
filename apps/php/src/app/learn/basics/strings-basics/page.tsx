import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列基礎</h1>
        <p className="text-gray-400">シングルクォートとダブルクォート、文字列の連結と変数展開を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列の書き方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPの文字列はシングルクォート（<code className="text-blue-300">'...'</code>）またはダブルクォート（<code className="text-blue-300">"..."</code>）で囲みます。両者には重要な違いがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ダブルクォート: 変数展開とエスケープシーケンスが有効</li>
          <li>シングルクォート: 変数展開なし、<code className="text-blue-300">\'</code>と<code className="text-blue-300">\\</code>のみエスケープ可能</li>
          <li>文字列の連結には <code className="text-blue-300">.</code>（ドット）演算子を使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シングルクォートとダブルクォートの違い</h2>
        <p className="text-gray-400 mb-4">ダブルクォートでは変数が展開されますが、シングルクォートでは展開されません。</p>
        <PhpEditor
          defaultCode={`<?php\n$lang = "PHP";\n\n// ダブルクォート: 変数展開される\necho "言語: $lang\\n";\n\n// シングルクォート: 変数展開されない\necho '言語: $lang\\n';\necho "\\n";\necho '改行も: \\n は展開されない';`}
          expectedOutput={`言語: PHP\n言語: $lang\n改行も: \n は展開されない`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の連結</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">.</code>演算子で文字列を結合できます。<code className="text-blue-300">.=</code>で文字列に追記することもできます。</p>
        <PhpEditor
          defaultCode={`<?php\n$first = "山田";\n$last = "太郎";\n\n$full = $last . " " . $first;\necho $full . "\\n";\n\n$message = "こんにちは";\n$message .= "、" . $full . "さん！";\necho $message;`}
          expectedOutput={`太郎 山田\nこんにちは、太郎 山田さん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">便利な文字列関数</h2>
        <p className="text-gray-400 mb-4">PHPには文字列を操作するための関数が豊富に用意されています。</p>
        <PhpEditor
          defaultCode={`<?php\n$text = "Hello, PHP World!";\n\necho strlen($text) . "\\n";        // 文字数\necho strtoupper($text) . "\\n";    // 大文字\necho strtolower($text) . "\\n";    // 小文字\necho str_replace("PHP", "World", $text) . "\\n"; // 置換\necho substr($text, 7, 3);          // 部分文字列`}
          expectedOutput={`17\nHELLO, PHP WORLD!\nhello, php world!\nHello, World World!\nPHP`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
