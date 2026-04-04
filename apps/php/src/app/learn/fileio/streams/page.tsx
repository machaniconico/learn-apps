import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function StreamsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイルI/O</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ストリーム</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPの<strong className="text-green-300">ストリーム</strong>はファイル、ネットワーク、メモリなど様々なデータソースを
            統一的に扱う仕組みです。<code>php://</code>、<code>file://</code>、<code>http://</code>などの
            ストリームラッパーを使って柔軟なI/O処理が実現できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">php://ストリーム</h2>
        <p className="text-gray-400 mb-4">
          php://stdin、php://stdout、php://stderrは標準入出力を表します。php://memoryはメモリ上のファイルとして扱えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// php://memoryでメモリ上にファイルを作成\n$memory = fopen("php://memory", "r+");\n\n// データを書き込む\n$data = ["PHP", "JavaScript", "Python", "Go", "Rust"];\nforeach ($data as $lang) {\n    fwrite($memory, $lang . "\\n");\n}\n\n// 先頭に戻って読み込む\nrewind($memory);\n$content = stream_get_contents($memory);\nfclose($memory);\n\necho "メモリストリームの内容:\\n";\necho $content;\n\n// php://tempは一定サイズを超えるとファイルに切り替わる\n$temp = fopen("php://temp/maxmemory:1024", "r+");\nfwrite($temp, "一時データ");\nrewind($temp);\necho "一時ストリーム: " . stream_get_contents($temp);\nfclose($temp);`}
          expectedOutput={`メモリストリームの内容:\nPHP\nJavaScript\nPython\nGo\nRust\n一時ストリーム: 一時データ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ストリームコンテキスト</h2>
        <p className="text-gray-400 mb-4">
          stream_context_create()でHTTPリクエストのオプションを設定したり、ストリームの動作をカスタマイズできます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// ストリームコンテキストを使ったHTTP POSTリクエストの設定例\n$postData = json_encode(["name" => "田中太郎", "email" => "tanaka@example.com"]);\n\n$context = stream_context_create([\n    "http" => [\n        "method"  => "POST",\n        "header"  => [\n            "Content-Type: application/json",\n            "Content-Length: " . strlen($postData),\n            "User-Agent: PHP-Stream/1.0",\n        ],\n        "content" => $postData,\n        "timeout" => 30,\n    ]\n]);\n\n// コンテキストの設定を確認\n$params = stream_context_get_params($context);\necho "HTTPメソッド: " . $params['options']['http']['method'] . "\\n";\necho "タイムアウト: " . $params['options']['http']['timeout'] . "秒\\n";\necho "送信データ: " . $params['options']['http']['content'];`}
          expectedOutput={`HTTPメソッド: POST\nタイムアウト: 30秒\n送信データ: {"name":"田中太郎","email":"tanaka@example.com"}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ストリームフィルター</h2>
        <p className="text-gray-400 mb-4">
          stream_filter_append()でストリームにフィルターを適用できます。base64エンコードや圧縮などの変換処理に使います。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// メモリストリームにBase64エンコードフィルターを適用\n$input  = fopen("php://memory", "r+");\n$output = fopen("php://memory", "r+");\n\n// 元データを書き込む\nfwrite($input, "PHPストリームフィルターのサンプルテキスト");\nrewind($input);\n\n// Base64エンコードフィルターを適用して書き込む\nstream_filter_append($output, "convert.base64-encode");\n$original = stream_get_contents($input);\nfwrite($output, $original);\n\nrewind($output);\n$encoded = stream_get_contents($output);\nfclose($input);\nfclose($output);\n\necho "元のテキスト: {$original}\\n";\necho "Base64: {$encoded}\\n";\necho "デコード確認: " . base64_decode($encoded);`}
          expectedOutput={`元のテキスト: PHPストリームフィルターのサンプルテキスト\nBase64: UEHP44K544KCUEVQ44Ot44O844Og44OV44Kj44Or44K/44O844Gu44K144Oz44OX44Or44OG44Kt44K9SSTO\nデコード確認: PHPストリームフィルターのサンプルテキスト`}
        />
      </section>

      <LessonCompleteButton lessonId="streams" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="streams" basePath="/learn/fileio" />
    </div>
  );
}
