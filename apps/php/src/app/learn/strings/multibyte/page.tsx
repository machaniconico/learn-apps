import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function MultibytePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">マルチバイト文字列</h1>
        <p className="text-gray-400 leading-relaxed">
          日本語などのマルチバイト文字を正しく扱うには<code className="text-yellow-300">mb_</code>関数群を使います。通常のstr系関数はバイト数で処理するため、マルチバイト文字では意図しない結果になることがあります。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-400 mb-3">mb_関数が必要な理由</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          UTF-8では日本語1文字が3バイトです。<code className="text-yellow-300">strlen("あ")</code>は3を返しますが、<code className="text-yellow-300">mb_strlen("あ")</code>は1を返します。文字数を正確に数えるにはmb_関数を使います。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-yellow-300">mb_strlen()</code>: 文字数を取得</li>
          <li><code className="text-yellow-300">mb_substr()</code>: 文字単位で部分文字列を取得</li>
          <li><code className="text-yellow-300">mb_strpos()</code>: 文字単位で位置を検索</li>
          <li><code className="text-yellow-300">mb_strtolower() / mb_strtoupper()</code>: 大文字小文字変換</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">mb_strlen と mb_substr</h2>
        <p className="text-gray-400 mb-4">
          日本語文字列の長さと部分文字列取得にmb_関数を使います。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$str = "PHPプログラミング学習";\n\necho "バイト数(strlen): "    . strlen($str)    . "\\n";\necho "文字数(mb_strlen): "  . mb_strlen($str)  . "\\n";\n\n// 文字単位で切り出し\n$first4 = mb_substr($str, 0, 4);\necho "先頭4文字: " . $first4 . "\\n";\n\n$last2 = mb_substr($str, -2);\necho "末尾2文字: " . $last2 . "\\n";\n\n// 文字位置検索\n$pos = mb_strpos($str, "学習");\necho "「学習」の位置: " . $pos . "文字目";`}
          expectedOutput={`バイト数(strlen): 28\n文字数(mb_strlen): 12\n先頭4文字: PHP プ\n末尾2文字: 学習\n「学習」の位置: 10文字目`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字コードの変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">mb_convert_encoding</code>で文字コードを変換できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$text = "こんにちは、PHP！";\n\n// 現在のエンコーディング確認\n$encoding = mb_detect_encoding($text);\necho "エンコーディング: " . $encoding . "\\n";\n\n// 全角・半角変換\n$full = "ＰＨＰ　プログラミング";\n$half = mb_convert_kana($full, "rsa"); // 英数字・スペースを半角に\necho "変換前: " . $full . "\\n";\necho "変換後: " . $half;`}
          expectedOutput={`エンコーディング: UTF-8\n変換前: ＰＨＰ　プログラミング\n変換後: PHP プログラミング`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">mb_ereg と mb_split</h2>
        <p className="text-gray-400 mb-4">
          マルチバイト対応の正規表現関数も用意されています。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$str = "東京、大阪、名古屋、福岡";\n\n// マルチバイト対応分割\n$cities = mb_split("、", $str);\nforeach ($cities as $city) {\n    echo mb_strlen($city) . "文字: " . $city . "\\n";\n}\n\n// 全角数字を検出\n$text = "価格は１２３０円です";\nif (mb_ereg('[０-９]+', $text, $m)) {\n    echo "全角数字: " . $m[0];\n}`}
          expectedOutput={`2文字: 東京\n2文字: 大阪\n3文字: 名古屋\n2文字: 福岡\n全角数字: １２３０`}
        />
      </section>

      <LessonCompleteButton categoryId="strings" lessonId="multibyte" />
      <LessonNav lessons={lessons} currentId="multibyte" basePath="/learn/strings" />
    </div>
  );
}
