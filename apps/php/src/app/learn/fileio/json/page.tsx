import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function JsonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイルI/O</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">JSON操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPの<strong className="text-green-300">json_encode()</strong>と<strong className="text-green-300">json_decode()</strong>を使って
            PHPの配列・オブジェクトとJSON文字列を相互変換できます。
            APIレスポンスや設定ファイルの処理に欠かせない機能です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">json_encode()の基本</h2>
        <p className="text-gray-400 mb-4">
          json_encode()はPHPの値をJSON文字列に変換します。フラグを組み合わせて出力形式を制御できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$config = [\n    "app" => [\n        "name"    => "MyApp",\n        "version" => "1.0.0",\n        "debug"   => false,\n    ],\n    "database" => [\n        "host" => "localhost",\n        "port" => 3306,\n        "name" => "myapp_db",\n    ],\n    "features" => ["auth", "api", "cache"],\n];\n\n// 整形ありで出力\n$json = json_encode($config, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);\necho $json . "\\n";\n\n// エラーチェック\nif (json_last_error() !== JSON_ERROR_NONE) {\n    echo "エンコードエラー: " . json_last_error_msg();\n}`}
          expectedOutput={`{\n    "app": {\n        "name": "MyApp",\n        "version": "1.0.0",\n        "debug": false\n    },\n    "database": {\n        "host": "localhost",\n        "port": 3306,\n        "name": "myapp_db"\n    },\n    "features": [\n        "auth",\n        "api",\n        "cache"\n    ]\n}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">json_decode()の基本</h2>
        <p className="text-gray-400 mb-4">
          json_decode()はJSON文字列をPHPの値に変換します。第2引数にtrueを渡すと連想配列、falseだとオブジェクトになります。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$jsonStr = '{"user":{"id":1,"name":"田中太郎","roles":["admin","editor"]},"active":true}';\n\n// 連想配列として取得（第2引数: true）\n$array = json_decode($jsonStr, true);\necho "配列として取得:\\n";\necho "  名前: " . $array['user']['name'] . "\\n";\necho "  ロール: " . implode(", ", $array['user']['roles']) . "\\n\\n";\n\n// オブジェクトとして取得（第2引数: false または省略）\n$obj = json_decode($jsonStr);\necho "オブジェクトとして取得:\\n";\necho "  名前: " . $obj->user->name . "\\n";\necho "  アクティブ: " . ($obj->active ? "はい" : "いいえ");`}
          expectedOutput={`配列として取得:\n  名前: 田中太郎\n  ロール: admin, editor\n\nオブジェクトとして取得:\n  名前: 田中太郎\n  アクティブ: はい`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">JSONファイルの読み書き</h2>
        <p className="text-gray-400 mb-4">
          設定ファイルやデータの永続化にJSONファイルを活用できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$configFile = "/tmp/config.json";\n\n// 設定を保存\n$config = [\n    "theme"    => "dark",\n    "language" => "ja",\n    "items_per_page" => 20,\n    "notifications"  => true,\n];\n\nfile_put_contents($configFile, json_encode($config, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));\necho "設定を保存しました\\n";\n\n// 設定を読み込んで更新\n$saved = json_decode(file_get_contents($configFile), true);\n$saved['theme']          = 'light';\n$saved['items_per_page'] = 50;\n\nfile_put_contents($configFile, json_encode($saved, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));\n\n// 更新後の設定を確認\n$updated = json_decode(file_get_contents($configFile), true);\necho "更新後の設定:\\n";\nforeach ($updated as $key => $value) {\n    $val = is_bool($value) ? ($value ? 'true' : 'false') : $value;\n    echo "  {$key}: {$val}\\n";\n}`}
          expectedOutput={`設定を保存しました\n更新後の設定:\n  theme: light\n  language: ja\n  items_per_page: 50\n  notifications: true`}
        />
      </section>

      <LessonCompleteButton lessonId="json" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="json" basePath="/learn/fileio" />
    </div>
  );
}
