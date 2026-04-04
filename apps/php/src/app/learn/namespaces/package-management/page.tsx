import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("namespaces");

export default function PackageManagementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold">名前空間・Composer レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パッケージ管理</h1>
        <p className="text-gray-400">composer.jsonの設定とパッケージのインストール・更新・スクリプト管理を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パッケージ管理のベストプラクティス</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Composerのパッケージ管理を適切に行うことで、チーム開発や本番デプロイが安定します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-teal-300">composer.lock</code>をGitにコミットして環境を統一</li>
          <li>• 本番デプロイでは<code className="text-teal-300">composer install --no-dev</code>を使用</li>
          <li>• <code className="text-teal-300">composer dump-autoload -o</code>でオートロードを最適化</li>
          <li>• <code className="text-teal-300">scripts</code>セクションでカスタムコマンドを定義</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">composer.jsonのscriptsセクション</h2>
        <p className="text-gray-400 mb-4">
          よく使うコマンドをscriptsに登録して<code className="text-teal-300">composer run</code>で実行できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// composer.json の scripts セクション例
$scripts = [
    "test"    => "phpunit --colors=always",
    "lint"    => "phpstan analyse src --level=8",
    "cs-fix"  => "php-cs-fixer fix src",
    "build"   => ["@lint", "@test"],
    "start"   => "php -S localhost:8000 -t public/",
];

echo "利用可能なComposerスクリプト:\\n";
foreach ($scripts as $name => $command) {
    $cmd = is_array($command) ? implode(" && ", $command) : $command;
    echo "  composer {$name}\\n    → {$cmd}\\n";
}

echo "\\n// 実行例：\\n";
echo "// composer test     — テスト実行\\n";
echo "// composer lint     — 静的解析\\n";
echo "// composer build    — lintとtest両方実行\\n";`}
          expectedOutput={`利用可能なComposerスクリプト:\n  composer test\n    → phpunit --colors=always\n  composer lint\n    → phpstan analyse src --level=8\n  composer cs-fix\n    → php-cs-fixer fix src\n  composer build\n    → @lint && @test\n  composer start\n    → php -S localhost:8000 -t public/\n\n// 実行例：\n// composer test     — テスト実行\n// composer lint     — 静的解析\n// composer build    — lintとtest両方実行`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">よく使うパッケージ紹介</h2>
        <p className="text-gray-400 mb-4">
          PHPエコシステムで広く使われている人気パッケージを紹介します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// PHPの人気パッケージカタログ
$packages = [
    "monolog/monolog" => [
        "用途" => "ロギング",
        "説明" => "PSR-3準拠のロギングライブラリ。ファイル・DB・Slackなど多様なハンドラ",
    ],
    "guzzlehttp/guzzle" => [
        "用途" => "HTTPクライアント",
        "説明" => "シンプルで強力なHTTPリクエストライブラリ",
    ],
    "symfony/validator" => [
        "用途" => "バリデーション",
        "説明" => "アノテーション・YAMLで入力検証ルールを定義",
    ],
    "doctrine/orm" => [
        "用途" => "ORM",
        "説明" => "PHPの主要ORM。データベース操作をオブジェクトで扱う",
    ],
    "phpunit/phpunit" => [
        "用途" => "テスト",
        "説明" => "PHPの標準テストフレームワーク",
    ],
    "carbon/carbon" => [
        "用途" => "日時操作",
        "説明" => "DateTimeを拡張した便利な日時ライブラリ",
    ],
];

foreach ($packages as $name => $info) {
    echo "[{$info['用途']}] {$name}\\n  {$info['説明']}\\n";
}`}
          expectedOutput={`[ロギング] monolog/monolog\n  PSR-3準拠のロギングライブラリ。ファイル・DB・Slackなど多様なハンドラ\n[HTTPクライアント] guzzlehttp/guzzle\n  シンプルで強力なHTTPリクエストライブラリ\n[バリデーション] symfony/validator\n  アノテーション・YAMLで入力検証ルールを定義\n[ORM] doctrine/orm\n  PHPの主要ORM。データベース操作をオブジェクトで扱う\n[テスト] phpunit/phpunit\n  PHPの標準テストフレームワーク\n[日時操作] carbon/carbon\n  DateTimeを拡張した便利な日時ライブラリ`}
        />
      </section>
      <LessonCompleteButton lessonId="package-management" categoryId="namespaces" />
      <LessonNav lessons={lessons} currentId="package-management" basePath="/learn/namespaces" />
    </div>
  );
}
