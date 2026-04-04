import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function HeredocPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ヒアドキュメント</h1>
        <p className="text-gray-400 leading-relaxed">
          ヒアドキュメント（Heredoc）とノードキュメント（Nowdoc）は複数行の文字列を扱う構文です。HTMLテンプレートやSQLなど長い文字列を見やすく書けます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-400 mb-3">HeredocとNowdocの違い</h2>
        <ul className="text-gray-400 space-y-2 list-disc list-inside">
          <li><strong className="text-white">Heredoc</strong>（<code className="text-yellow-300">&lt;&lt;&lt;EOT</code>）: ダブルクォートと同様、変数展開あり</li>
          <li><strong className="text-white">Nowdoc</strong>（<code className="text-yellow-300">&lt;&lt;&lt;'EOT'</code>）: シングルクォートと同様、変数展開なし</li>
          <li>終了ラベルは行の先頭（PHP 7.3以降はインデント可）</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Heredocの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">&lt;&lt;&lt;EOT</code>で開始し、<code className="text-yellow-300">EOT;</code>で終了します。変数展開が使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$name = "田中太郎";\n$age  = 30;\n$city = "東京";\n\n$profile = <<<EOT\n名前: $name\n年齢: {$age}歳\n住所: $city\nEOT;\n\necho $profile . "\\n";\necho "---\\n";\necho strlen($profile) . "バイト";`}
          expectedOutput={`名前: 田中太郎\n年齢: 30歳\n住所: 東京\n---\n27バイト`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">NowdocとHTMLテンプレート</h2>
        <p className="text-gray-400 mb-4">
          Nowdocは変数展開しないため、テンプレート文字列やコードサンプルの表示に適しています。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$template = <<<'EOT'\nこれはNowdocです。\n$name は展開されません。\n\\n も改行になりません。\nEOT;\n\necho $template . "\\n";\necho "---\\n";\n\n// Heredocでの複数行\n$items = ["PHP", "Laravel", "Composer"];\n$list  = "";\nforeach ($items as $item) {\n    $list .= "- $item\\n";\n}\necho $list;`}
          expectedOutput={`これはNowdocです。\n$name は展開されません。\n\\n も改行になりません。\n---\n- PHP\n- Laravel\n- Composer`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">インデントされたHeredoc（PHP 7.3+）</h2>
        <p className="text-gray-400 mb-4">
          PHP 7.3以降、終了ラベルをインデントでき、コードの見た目が整理されます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction getWelcome(string $name): string {\n    return <<<EOT\n        =============================\n        ようこそ、{$name}さん！\n        PHPの世界へ！\n        =============================\n        EOT;\n}\n\necho getWelcome("山田");`}
          expectedOutput={`=============================\nようこそ、山田さん！\nPHPの世界へ！\n=============================`}
        />
      </section>

      <LessonCompleteButton categoryId="strings" lessonId="heredoc" />
      <LessonNav lessons={lessons} currentId="heredoc" basePath="/learn/strings" />
    </div>
  );
}
