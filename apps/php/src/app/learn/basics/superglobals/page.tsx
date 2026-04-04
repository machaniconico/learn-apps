import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スーパーグローバル</h1>
        <p className="text-gray-400">$_GET、$_POST、$_SERVERなどスーパーグローバル変数の概要を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スーパーグローバル変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スーパーグローバル変数はPHPが自動的に定義する特殊な配列で、スクリプト全体のどこからでもアクセスできます。Webアプリケーション開発で非常に重要な役割を果たします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">$_GET</code>: URLクエリパラメータ</li>
          <li><code className="text-blue-300">$_POST</code>: POSTリクエストデータ</li>
          <li><code className="text-blue-300">$_SERVER</code>: サーバー・環境情報</li>
          <li><code className="text-blue-300">$_SESSION</code>: セッションデータ</li>
          <li><code className="text-blue-300">$_COOKIE</code>: クッキーデータ</li>
          <li><code className="text-blue-300">$GLOBALS</code>: すべてのグローバル変数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">$_SERVERの活用</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">$_SERVER</code>にはサーバーとリクエストに関する情報が格納されています。</p>
        <PhpEditor
          defaultCode={`<?php\n// $_SERVERの主なキーを確認\n$serverInfo = [\n    "PHP_SELF"     => $_SERVER["PHP_SELF"] ?? "/index.php",\n    "SERVER_NAME"  => $_SERVER["SERVER_NAME"] ?? "localhost",\n    "REQUEST_METHOD" => $_SERVER["REQUEST_METHOD"] ?? "GET",\n    "HTTP_HOST"    => $_SERVER["HTTP_HOST"] ?? "localhost",\n];\n\nforeach ($serverInfo as $key => $value) {\n    echo "{$key}: {$value}\\n";\n}`}
          expectedOutput={`PHP_SELF: /index.php\nSERVER_NAME: localhost\nREQUEST_METHOD: GET\nHTTP_HOST: localhost`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">$_GETと$_POSTの模擬</h2>
        <p className="text-gray-400 mb-4">実際のWebリクエストでは<code className="text-blue-300">$_GET</code>と<code className="text-blue-300">$_POST</code>にフォームデータが入ります。ここでは模擬的に値を設定して動作を確認します。</p>
        <PhpEditor
          defaultCode={`<?php\n// GETパラメータの模擬 (実際はURL: ?name=田中&age=30)\n$_GET["name"] = "田中";\n$_GET["age"] = "30";\n\n// 安全な取得方法\n$name = isset($_GET["name"]) ? htmlspecialchars($_GET["name"]) : "ゲスト";\n$age = isset($_GET["age"]) ? (int)$_GET["age"] : 0;\n\necho "名前: " . $name . "\\n";\necho "年齢: " . $age . "歳\\n";\n\n// 存在しないキーの安全な取得\n$city = $_GET["city"] ?? "不明";\necho "都市: " . $city;`}
          expectedOutput={`名前: 田中\n年齢: 30歳\n都市: 不明`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">$GLOBALSとグローバル変数</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">$GLOBALS</code>を使うとすべてのグローバル変数にアクセスできます。</p>
        <PhpEditor
          defaultCode={`<?php\n$siteTitle = "PHP学習サイト";\n$version = "2.0";\n\nfunction showSiteInfo() {\n    // グローバル変数へのアクセス\n    echo "サイト名: " . $GLOBALS["siteTitle"] . "\\n";\n    echo "バージョン: " . $GLOBALS["version"] . "\\n";\n}\n\nshowSiteInfo();\n\n// $GLOBALSを通じて変更も可能\n$GLOBALS["version"] = "2.1";\necho "更新後バージョン: " . $version;`}
          expectedOutput={`サイト名: PHP学習サイト\nバージョン: 2.0\n更新後バージョン: 2.1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="superglobals" />
      </div>
      <LessonNav lessons={lessons} currentId="superglobals" basePath="/learn/basics" />
    </div>
  );
}
