import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("namespaces");

export default function AutoloadingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold">名前空間・Composer レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">オートロード</h1>
        <p className="text-gray-400">spl_autoload_registerとPSR-4オートロード規約を学び、クラスファイルを自動的に読み込む仕組みを理解します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">オートロードとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          オートロードはクラスが初めて使われるときに自動でファイルを読み込む仕組みです。
          毎回<code className="text-teal-300">require</code>を書く手間がなくなります。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-teal-300">spl_autoload_register()</code>でオートローダー関数を登録</li>
          <li>• <span className="text-teal-300">PSR-4：</span>名前空間とディレクトリ構造を対応させる規約</li>
          <li>• <code className="text-teal-300">App\Models\User</code> → <code className="text-teal-300">src/Models/User.php</code></li>
          <li>• ComposerはPSR-4オートロードを自動生成します</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">spl_autoload_registerの基本</h2>
        <p className="text-gray-400 mb-4">
          クラス名からファイルパスを計算して自動読み込みします。
        </p>
        <PhpEditor
          defaultCode={`<?php
// PSR-4スタイルのオートローダー（概念デモ）
function myAutoloader(string $className): void {
    // 名前空間の区切り文字をディレクトリ区切りに変換
    $path = str_replace('\\\\', '/', $className);

    // プレフィックスをベースパスに変換
    $path = str_replace('App/', 'src/', $path);
    $file = $path . '.php';

    echo "オートロード試行: {$file}\\n";
    // 実際のアプリではここでrequire $file;
}

spl_autoload_register('myAutoloader');

// クラスマッピングの確認
$classMap = [
    'App\\\\Models\\\\User'         => 'src/Models/User.php',
    'App\\\\Controllers\\\\Home'    => 'src/Controllers/Home.php',
    'App\\\\Services\\\\Mailer'     => 'src/Services/Mailer.php',
];

echo "PSR-4 クラスマッピング:\\n";
foreach ($classMap as $class => $path) {
    echo "  {$class}\\n  → {$path}\\n";
}`}
          expectedOutput={`PSR-4 クラスマッピング:\n  App\\Models\\User\n  → src/Models/User.php\n  App\\Controllers\\Home\n  → src/Controllers/Home.php\n  App\\Services\\Mailer\n  → src/Services/Mailer.php`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">composer.jsonのオートロード設定</h2>
        <p className="text-gray-400 mb-4">
          Composerを使ったPSR-4オートロードの設定方法です。
        </p>
        <PhpEditor
          defaultCode={`<?php
// composer.jsonの autoload 設定例（PHPで文字列表示）
$composerJson = [
    "name" => "myapp/myapp",
    "autoload" => [
        "psr-4" => [
            "App\\\\" => "src/",
            "Tests\\\\" => "tests/",
        ]
    ]
];

echo "composer.json の autoload 設定:\\n";
echo json_encode($composerJson["autoload"], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\\n";

// PSR-4規約のディレクトリ構造
$structure = [
    "src/Models/User.php"           => "namespace App\\\\Models; class User {}",
    "src/Models/Post.php"           => "namespace App\\\\Models; class Post {}",
    "src/Controllers/UserCtrl.php"  => "namespace App\\\\Controllers; class UserCtrl {}",
    "src/Services/MailService.php"  => "namespace App\\\\Services; class MailService {}",
];

echo "\\nディレクトリ構造:\\n";
foreach ($structure as $file => $content) {
    echo "  {$file}\\n";
}`}
          expectedOutput={`composer.json の autoload 設定:\n{\n    "psr-4": {\n        "App\\\\": "src/",\n        "Tests\\\\": "tests/"\n    }\n}\n\nディレクトリ構造:\n  src/Models/User.php\n  src/Models/Post.php\n  src/Controllers/UserCtrl.php\n  src/Services/MailService.php`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クラスマップオートロード</h2>
        <p className="text-gray-400 mb-4">
          PSR-4以外に、クラスとファイルを明示的にマッピングするクラスマップ方式もあります。
        </p>
        <PhpEditor
          defaultCode={`<?php
// クラスマップ方式のオートローダー
class ClassMapLoader {
    private array $classMap;

    public function __construct(array $classMap) {
        $this->classMap = $classMap;
    }

    public function register(): void {
        spl_autoload_register([$this, 'load']);
    }

    public function load(string $className): void {
        if (isset($this->classMap[$className])) {
            echo "ロード: {$this->classMap[$className]}\\n";
            // require $this->classMap[$className];
        }
    }
}

$loader = new ClassMapLoader([
    'UserModel'    => 'models/UserModel.php',
    'PostModel'    => 'models/PostModel.php',
    'AuthService'  => 'services/AuthService.php',
]);

$loader->register();

// 登録済みオートローダーを確認
$loaders = spl_autoload_functions();
echo "登録オートローダー数: " . count($loaders) . "\\n";
echo "クラスマップ方式は小規模プロジェクトや最適化に有効です\\n";`}
          expectedOutput={`登録オートローダー数: 1\nクラスマップ方式は小規模プロジェクトや最適化に有効です`}
        />
      </section>
      <LessonCompleteButton lessonId="autoloading" categoryId="namespaces" />
      <LessonNav lessons={lessons} currentId="autoloading" basePath="/learn/namespaces" />
    </div>
  );
}
