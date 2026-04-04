import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringFunctionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列関数</h1>
        <p className="text-gray-400 leading-relaxed">
          PHPには文字列を操作するための豊富な組み込み関数があります。変換・検索・置換・分割など、よく使う関数をマスターしましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-400 mb-3">主な文字列関数</h2>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-yellow-300">strtolower() / strtoupper()</code>: 大文字・小文字変換</li>
          <li><code className="text-yellow-300">trim() / ltrim() / rtrim()</code>: 空白除去</li>
          <li><code className="text-yellow-300">str_replace()</code>: 文字列置換</li>
          <li><code className="text-yellow-300">substr()</code>: 部分文字列の取得</li>
          <li><code className="text-yellow-300">explode() / implode()</code>: 分割・結合</li>
          <li><code className="text-yellow-300">strpos()</code>: 文字列の位置検索</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">変換と整形</h2>
        <p className="text-gray-400 mb-4">
          大文字小文字変換、前後の空白除去など、文字列の整形によく使う関数です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$text = "  Hello, PHP World!  ";\n\necho strtoupper($text) . "\\n";\necho strtolower($text) . "\\n";\necho trim($text) . "\\n";\necho ucfirst(strtolower(trim($text))) . "\\n";\n\n$csv = "PHP,Laravel,Composer,PHPUnit";\n$parts = explode(",", $csv);\necho count($parts) . "個\\n";\necho implode(" / ", $parts);`}
          expectedOutput={`  HELLO, PHP WORLD!  \n  hello, php world!  \nHello, PHP World!\nHello, php world!\n4個\nPHP / Laravel / Composer / PHPUnit`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">検索と置換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">strpos</code>で位置を探し、<code className="text-yellow-300">str_replace</code>で置換します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$str = "PHPは素晴らしい言語です。PHPを学ぼう！";\n\n// 最初の出現位置\n$pos = strpos($str, "PHP");\necho "最初のPHP: " . $pos . "文字目\\n";\n\n// 最後の出現位置\n$lastPos = strrpos($str, "PHP");\necho "最後のPHP: " . $lastPos . "文字目\\n";\n\n// 置換\n$replaced = str_replace("PHP", "Python", $str);\necho $replaced . "\\n";\n\n// 複数置換\n$cleaned = str_replace(["！", "。"], ["!", "."], $str);\necho $cleaned;`}
          expectedOutput={`最初のPHP: 0文字目\n最後のPHP: 19文字目\nPythonは素晴らしい言語です。Pythonを学ぼう！\nPHPは素晴らしい言語です.PHPを学ぼう!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">部分文字列の操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">substr</code>で部分文字列を取得し、<code className="text-yellow-300">str_pad</code>でパディングできます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$str = "Hello, World!";\n\necho substr($str, 0, 5) . "\\n";   // 先頭5文字\necho substr($str, 7) . "\\n";      // 7文字目以降\necho substr($str, -6, 5) . "\\n";  // 末尾から6文字目、5文字\n\n// パディング\n$id = 42;\necho str_pad($id, 5, "0", STR_PAD_LEFT) . "\\n";\necho str_pad("PHP", 10, "-", STR_PAD_BOTH);`}
          expectedOutput={`Hello\nWorld!\nWorld\n00042\n---PHP----`}
        />
      </section>

      <LessonCompleteButton categoryId="strings" lessonId="string-functions" />
      <LessonNav lessons={lessons} currentId="string-functions" basePath="/learn/strings" />
    </div>
  );
}
