import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function DirectoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイルI/O</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ディレクトリ操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPでは<strong className="text-green-300">mkdir()</strong>、<strong className="text-green-300">scandir()</strong>、
            <strong className="text-green-300">glob()</strong>などを使ってディレクトリを操作できます。
            ファイルの存在確認や情報取得も組み合わせて使うことで、堅牢なファイル管理処理が実装できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ディレクトリの作成と確認</h2>
        <p className="text-gray-400 mb-4">
          mkdir()でディレクトリを作成します。第3引数にtrueを渡すと中間ディレクトリも一括作成できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$baseDir = "/tmp/myapp";\n\n// ディレクトリを作成（再帰的）\n$dirs = [\n    "{$baseDir}/uploads",\n    "{$baseDir}/cache",\n    "{$baseDir}/logs/2024",\n];\n\nforeach ($dirs as $dir) {\n    if (!is_dir($dir)) {\n        mkdir($dir, 0755, true);\n        echo "作成: {$dir}\\n";\n    } else {\n        echo "既存: {$dir}\\n";\n    }\n}\n\n// ディレクトリ情報\necho "\\nディレクトリ情報:\\n";\necho "  存在する: " . (is_dir($baseDir) ? "はい" : "いいえ") . "\\n";\necho "  書き込み可: " . (is_writable($baseDir) ? "はい" : "いいえ");`}
          expectedOutput={`作成: /tmp/myapp/uploads\n作成: /tmp/myapp/cache\n作成: /tmp/myapp/logs/2024\n\nディレクトリ情報:\n  存在する: はい\n  書き込み可: はい`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">scandir()でファイル一覧取得</h2>
        <p className="text-gray-400 mb-4">
          scandir()はディレクトリの内容を配列で返します。"."と".."を除外して処理するのが一般的です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$dir = "/tmp/scantest";\nmkdir($dir, 0755, true);\n\n// テストファイルを作成\nfile_put_contents("{$dir}/readme.txt", "説明");\nfile_put_contents("{$dir}/config.json", "{}");\nfile_put_contents("{$dir}/data.csv", "a,b,c");\nmkdir("{$dir}/images", 0755, true);\n\n// ディレクトリ内容を取得\n$items = scandir($dir);\n$items = array_filter($items, fn($item) => !in_array($item, ['.', '..']));\n\necho "ディレクトリ内容 ({$dir}):\\n";\nforeach ($items as $item) {\n    $path = "{$dir}/{$item}";\n    $type = is_dir($path) ? "[DIR] " : "[FILE]";\n    $size = is_file($path) ? " (" . filesize($path) . " bytes)" : "";\n    echo "  {$type} {$item}{$size}\\n";\n}`}
          expectedOutput={`ディレクトリ内容 (/tmp/scantest):\n  [FILE] config.json (2 bytes)\n  [FILE] data.csv (5 bytes)\n  [DIR]  images\n  [FILE] readme.txt (6 bytes)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">glob()でパターンマッチング</h2>
        <p className="text-gray-400 mb-4">
          glob()はワイルドカードパターンに一致するファイルを検索します。特定の拡張子のファイルを一括処理するのに便利です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$dir = "/tmp/globtest";\nmkdir($dir, 0755, true);\n\n// テストファイルを作成\n$files = ["report_2024.txt", "report_2023.txt", "data.csv", "config.json", "image.png", "notes.txt"];\nforeach ($files as $file) {\n    file_put_contents("{$dir}/{$file}", "content of {$file}");\n}\n\n// .txtファイルのみ取得\n$txtFiles = glob("{$dir}/*.txt");\necho "テキストファイル:\\n";\nforeach ($txtFiles as $file) {\n    echo "  " . basename($file) . "\\n";\n}\n\n// report_で始まるファイル\n$reports = glob("{$dir}/report_*.txt");\necho "\\nレポートファイル:\\n";\nforeach ($reports as $file) {\n    echo "  " . basename($file) . "\\n";\n}`}
          expectedOutput={`テキストファイル:\n  notes.txt\n  report_2023.txt\n  report_2024.txt\n\nレポートファイル:\n  report_2023.txt\n  report_2024.txt`}
        />
      </section>

      <LessonCompleteButton lessonId="directories" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="directories" basePath="/learn/fileio" />
    </div>
  );
}
