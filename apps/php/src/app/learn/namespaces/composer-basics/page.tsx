import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("namespaces");

export default function ComposerBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold">名前空間・Composer レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Composer基礎</h1>
        <p className="text-gray-400">Composerを使ったPHPパッケージ管理の基本を学び、外部ライブラリを効率よく活用する方法を習得します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Composerとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ComposerはPHPの依存関係管理ツールです。<code className="text-teal-300">composer.json</code>にプロジェクトの依存関係を定義し、
          <code className="text-teal-300">vendor/</code>ディレクトリにインストールします。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-teal-300">composer init</code> — composer.jsonを対話的に作成</li>
          <li>• <code className="text-teal-300">composer require vendor/package</code> — パッケージを追加</li>
          <li>• <code className="text-teal-300">composer install</code> — composer.lockに基づきインストール</li>
          <li>• <code className="text-teal-300">composer update</code> — パッケージを更新</li>
          <li>• <code className="text-teal-300">require __DIR__ . '/vendor/autoload.php'</code> — オートロードを有効化</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">composer.jsonの構造</h2>
        <p className="text-gray-400 mb-4">
          composer.jsonの主要なフィールドを理解します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// composer.jsonの典型的な構造
$composerJson = [
    "name" => "myvendor/myapp",
    "description" => "My PHP Application",
    "type" => "project",
    "require" => [
        "php" => ">=8.1",
        "monolog/monolog" => "^3.0",
        "guzzlehttp/guzzle" => "^7.0",
    ],
    "require-dev" => [
        "phpunit/phpunit" => "^10.0",
        "phpstan/phpstan" => "^1.0",
    ],
    "autoload" => [
        "psr-4" => ["App\\\\" => "src/"]
    ],
    "autoload-dev" => [
        "psr-4" => ["Tests\\\\" => "tests/"]
    ],
];

echo "パッケージ名: " . $composerJson["name"] . "\\n";
echo "\\nrequire（本番依存）:\\n";
foreach ($composerJson["require"] as $pkg => $ver) {
    echo "  {$pkg}: {$ver}\\n";
}
echo "\\nrequire-dev（開発依存）:\\n";
foreach ($composerJson["require-dev"] as $pkg => $ver) {
    echo "  {$pkg}: {$ver}\\n";
}`}
          expectedOutput={`パッケージ名: myvendor/myapp\n\nrequire（本番依存）:\n  php: >=8.1\n  monolog/monolog: ^3.0\n  guzzlehttp/guzzle: ^7.0\n\nrequire-dev（開発依存）:\n  phpunit/phpunit: ^10.0\n  phpstan/phpstan: ^1.0`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バージョン制約の記法</h2>
        <p className="text-gray-400 mb-4">
          Composerのバージョン制約には様々な記法があります。
        </p>
        <PhpEditor
          defaultCode={`<?php
// Composerのバージョン制約記法
$constraints = [
    "^1.2.3"  => "1.2.3以上2.0.0未満（互換性維持）",
    "~1.2.3"  => "1.2.3以上1.3.0未満（パッチのみ）",
    ">=1.0"   => "1.0以上",
    ">=1.0 <2.0" => "1.0以上2.0未満",
    "1.0.*"   => "1.0.xの任意のパッチ",
    "1.0.0"   => "完全に一致するバージョンのみ",
    "dev-main" => "mainブランチの最新",
];

echo "バージョン制約の意味:\\n";
foreach ($constraints as $constraint => $meaning) {
    echo "  {$constraint}\\n    → {$meaning}\\n";
}

// vendor/autoload.phpの読み込み（本番コード）
echo "\\n// 本番コードでの使用:\\n";
echo "require __DIR__ . '/vendor/autoload.php';\\n";
echo "// これ一行でComposerが管理する全クラスが使えるようになる\\n";`}
          expectedOutput={`バージョン制約の意味:\n  ^1.2.3\n    → 1.2.3以上2.0.0未満（互換性維持）\n  ~1.2.3\n    → 1.2.3以上1.3.0未満（パッチのみ）\n  >=1.0\n    → 1.0以上\n  >=1.0 <2.0\n    → 1.0以上2.0未満\n  1.0.*\n    → 1.0.xの任意のパッチ\n  1.0.0\n    → 完全に一致するバージョンのみ\n  dev-main\n    → mainブランチの最新\n\n// 本番コードでの使用:\nrequire __DIR__ . '/vendor/autoload.php';\n// これ一行でComposerが管理する全クラスが使えるようになる`}
        />
      </section>
      <LessonCompleteButton lessonId="composer-basics" categoryId="namespaces" />
      <LessonNav lessons={lessons} currentId="composer-basics" basePath="/learn/namespaces" />
    </div>
  );
}
