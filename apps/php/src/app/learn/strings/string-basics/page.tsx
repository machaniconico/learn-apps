import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列の基本</h1>
        <p className="text-gray-400 leading-relaxed">
          PHPの文字列はシングルクォートとダブルクォートで定義できます。それぞれの違いを理解し、連結や変数展開を使いこなしましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-400 mb-3">シングルクォートとダブルクォートの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          シングルクォート（<code className="text-yellow-300">'...'</code>）はリテラル文字列、ダブルクォート（<code className="text-yellow-300">"..."</code>）は変数展開とエスケープシーケンスを処理します。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>シングルクォート: <code className="text-yellow-300">\n</code> はそのまま <code>\n</code> として出力</li>
          <li>ダブルクォート: <code className="text-yellow-300">\n</code> は改行、<code className="text-yellow-300">$var</code> は変数値に展開</li>
          <li>文字列連結: <code className="text-yellow-300">.</code>（ドット）演算子を使用</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クォートの使い分け</h2>
        <p className="text-gray-400 mb-4">
          変数展開が必要ならダブルクォート、固定文字列にはシングルクォートが効率的です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$name = "山田太郎";\n$age  = 28;\n\n// ダブルクォート: 変数展開あり\necho "名前: $name\\n";\necho "年齢: {$age}歳\\n";\n\n// シングルクォート: リテラル\necho '変数: $name' . "\\n";\n\n// 連結\n$greeting = "こんにちは、" . $name . "さん！";\necho $greeting;`}
          expectedOutput={`名前: 山田太郎\n年齢: 28歳\n変数: $name\nこんにちは、山田太郎さん！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">エスケープシーケンス</h2>
        <p className="text-gray-400 mb-4">
          ダブルクォートでは<code className="text-yellow-300">\n</code>（改行）、<code className="text-yellow-300">\t</code>（タブ）、<code className="text-yellow-300">\\</code>（バックスラッシュ）などが使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\necho "1行目\\n2行目\\n3行目\\n";\necho "列1\\t列2\\t列3\\n";\necho "ダブルクォート: \\"hello\\"\\n";\necho "バックスラッシュ: C:\\\\Users\\\\PHP\\n";\necho "Unicode: \\u{3053}\\u{3093}\\u{306B}\\u{3061}\\u{306F}";`}
          expectedOutput={`1行目\n2行目\n3行目\n列1\t列2\t列3\nダブルクォート: "hello"\nバックスラッシュ: C:\\Users\\PHP\nUnicode: こんにちは`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列の長さとアクセス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">strlen</code>でバイト数、<code className="text-yellow-300">$str[0]</code>で文字へのアクセスができます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$str = "Hello, PHP!";\n\necho "長さ: " . strlen($str) . "\\n";\necho "最初: " . $str[0] . "\\n";\necho "最後: " . $str[strlen($str) - 1] . "\\n";\n\n// 文字列の繰り返し\n$line = str_repeat("-", 20);\necho $line . "\\n";\n\n// 文字列が含まれるか\necho str_contains($str, "PHP") ? "PHPを含む" : "含まない";`}
          expectedOutput={`長さ: 11\n最初: H\n最後: !\n--------------------\nPHPを含む`}
        />
      </section>

      <LessonCompleteButton categoryId="strings" lessonId="string-basics" />
      <LessonNav lessons={lessons} currentId="string-basics" basePath="/learn/strings" />
    </div>
  );
}
