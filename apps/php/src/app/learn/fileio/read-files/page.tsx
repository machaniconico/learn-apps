import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function ReadFilesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイルI/O</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ファイル読み込み</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPでは<strong className="text-green-300">file_get_contents()</strong>、<strong className="text-green-300">fopen()/fread()</strong>、
            <strong className="text-green-300">file()</strong>など複数の方法でファイルを読み込めます。
            用途に応じて適切な関数を選ぶことで効率的なファイル処理が実現できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">file_get_contents()で一括読み込み</h2>
        <p className="text-gray-400 mb-4">
          ファイル全体を文字列として読み込む最もシンプルな方法です。小〜中サイズのファイルに適しています。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// テスト用ファイルを作成\nfile_put_contents("/tmp/test.txt", "1行目\\n2行目\\n3行目\\n4行目\\n5行目");\n\n// file_get_contentsで全体を読み込む\n$content = file_get_contents("/tmp/test.txt");\necho "--- ファイル内容 ---\\n";\necho $content . "\\n";\necho "--- ファイル情報 ---\\n";\necho "サイズ: " . strlen($content) . " バイト\\n";\necho "行数: " . substr_count($content, "\\n") + 1 . " 行";`}
          expectedOutput={`--- ファイル内容 ---\n1行目\n2行目\n3行目\n4行目\n5行目\n--- ファイル情報 ---\nサイズ: 35 バイト\n行数: 5 行`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">file()で行ごとに読み込む</h2>
        <p className="text-gray-400 mb-4">
          file()関数はファイルを行の配列として返します。FILE_IGNORE_NEW_LINESで改行を除去できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// テスト用ファイルを作成\nfile_put_contents("/tmp/names.txt", "田中太郎\\n鈴木花子\\n佐藤次郎\\n高橋美咲");\n\n// file()で行ごとに読み込む\n$lines = file("/tmp/names.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);\n\necho "登録者一覧（" . count($lines) . "人）:\\n";\nforeach ($lines as $index => $name) {\n    echo ($index + 1) . ". " . $name . "\\n";\n}`}
          expectedOutput={`登録者一覧（4人）:\n1. 田中太郎\n2. 鈴木花子\n3. 佐藤次郎\n4. 高橋美咲`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">fopen()/fgets()で行ごとに処理</h2>
        <p className="text-gray-400 mb-4">
          大きなファイルはfopen()とfgets()を使って1行ずつ処理します。メモリ効率が良い方法です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// テスト用ファイルを作成\n$data = "PHP,8.2,人気\\nPython,3.11,汎用\\nJavaScript,ES2023,Web\\nGo,1.21,高性能";\nfile_put_contents("/tmp/languages.txt", $data);\n\n// fopen/fgetsで行ごとに読み込む\n$handle = fopen("/tmp/languages.txt", "r");\nif ($handle === false) {\n    throw new RuntimeException("ファイルを開けません");\n}\n\necho "言語情報:\\n";\ntry {\n    while (($line = fgets($handle)) !== false) {\n        [$lang, $version, $desc] = explode(",", trim($line));\n        echo "  {$lang} v{$version} - {$desc}\\n";\n    }\n} finally {\n    fclose($handle);\n    echo "ファイルをクローズしました";\n}`}
          expectedOutput={`言語情報:\n  PHP v8.2 - 人気\n  Python v3.11 - 汎用\n  JavaScript vES2023 - Web\n  Go v1.21 - 高性能\nファイルをクローズしました`}
        />
      </section>

      <LessonCompleteButton lessonId="read-files" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="read-files" basePath="/learn/fileio" />
    </div>
  );
}
