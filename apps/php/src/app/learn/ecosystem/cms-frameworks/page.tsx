import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHPエコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CMS・フレームワーク比較</h1>
        <p className="text-gray-400">WordPress、Laravel、Symfony、CakePHPなどの比較と選定基準を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPエコシステムの主要プロダクト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPには多数のフレームワークとCMSがあります。用途と規模に応じて最適なものを選びましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">Laravel</code> - フルスタック。Webアプリ・APIに最適</li>
          <li><code className="text-indigo-300">Symfony</code> - エンタープライズ。高い拡張性</li>
          <li><code className="text-indigo-300">WordPress</code> - CMS。ブログ・中小サイトに最適</li>
          <li><code className="text-indigo-300">Slim</code> - マイクロフレームワーク。軽量API向け</li>
          <li><code className="text-indigo-300">CakePHP</code> - 設定より規約。迅速な開発向け</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フレームワーク選定の基準</h2>
        <p className="text-gray-400 mb-4">プロジェクトの要件に応じて適切なフレームワークを選ぶための評価基準を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
// フレームワーク比較データ
$frameworks = [
    'Laravel' => [
        'type' => 'フルスタック',
        'learning_curve' => '中',
        'performance' => '高',
        'ecosystem' => '非常に豊富',
        'best_for' => 'WebアプリケーションAPI',
        'stars_github' => 76000,
        'features' => ['Eloquent ORM', 'Blade', 'Artisan', 'Queue', 'Broadcasting'],
    ],
    'Symfony' => [
        'type' => 'フルスタック',
        'learning_curve' => '高',
        'performance' => '高',
        'ecosystem' => '豊富',
        'best_for' => 'エンタープライズアプリ',
        'stars_github' => 29000,
        'features' => ['Doctrine ORM', 'Twig', 'DI Container', 'Console', 'Messenger'],
    ],
    'Slim' => [
        'type' => 'マイクロ',
        'learning_curve' => '低',
        'performance' => '非常に高',
        'ecosystem' => '最小限',
        'best_for' => '軽量API・マイクロサービス',
        'stars_github' => 11000,
        'features' => ['ルーティング', 'ミドルウェア', 'PSR-7対応'],
    ],
];

// 比較表の出力
echo str_pad('フレームワーク', 12) . str_pad('タイプ', 15) . str_pad('学習コスト', 12) . "用途\n";
echo str_repeat('-', 60) . "\n";

foreach ($frameworks as $name => $fw) {
    echo str_pad($name, 12) . str_pad($fw['type'], 15) . str_pad($fw['learning_curve'], 12) . $fw['best_for'] . "\n";
}

echo "\n";

// 要件に基づく自動選定
function selectFramework(array $requirements): string {
    if ($requirements['is_cms']) return 'WordPress';
    if ($requirements['is_microservice']) return 'Slim';
    if ($requirements['is_enterprise']) return 'Symfony';
    return 'Laravel';
}

$scenarios = [
    ['label' => 'ブログサイト',           'is_cms' => true,  'is_microservice' => false, 'is_enterprise' => false],
    ['label' => 'マイクロサービスAPI',     'is_cms' => false, 'is_microservice' => true,  'is_enterprise' => false],
    ['label' => '大規模ECサイト',          'is_cms' => false, 'is_microservice' => false, 'is_enterprise' => true],
    ['label' => '中規模Webアプリ',         'is_cms' => false, 'is_microservice' => false, 'is_enterprise' => false],
];

echo "推奨フレームワーク:\n";
foreach ($scenarios as $s) {
    $recommended = selectFramework($s);
    echo "  {$s['label']}: $recommended\n";
}`}
          expectedOutput={`フレームワーク  タイプ           学習コスト   用途
------------------------------------------------------------
Laravel     フルスタック     中           WebアプリケーションAPI
Symfony     フルスタック     高           エンタープライズアプリ
Slim        マイクロ         低           軽量API・マイクロサービス

推奨フレームワーク:
  ブログサイト: WordPress
  マイクロサービスAPI: Slim
  大規模ECサイト: Symfony
  中規模Webアプリ: Laravel`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Composerによるパッケージ管理</h2>
        <p className="text-gray-400 mb-4">Composerはどのフレームワークでも使うPHPの標準パッケージマネージャーです。その仕組みを理解します。</p>
        <PhpEditor
          defaultCode={`<?php
// composer.jsonの構造と意味
$composerJson = [
    'name' => 'myapp/blog',
    'description' => 'PHPブログアプリケーション',
    'require' => [
        'php' => '^8.1',
        'laravel/framework' => '^10.0',
        'monolog/monolog' => '^3.0',
    ],
    'require-dev' => [
        'phpunit/phpunit' => '^10.0',
        'phpstan/phpstan' => '^1.0',
        'laravel/pint' => '^1.0',
    ],
    'autoload' => [
        'psr-4' => [
            'App\\' => 'app/',
        ],
    ],
    'scripts' => [
        'test' => 'phpunit',
        'lint' => 'pint',
        'analyse' => 'phpstan analyse',
    ],
];

echo "=== composer.json の構造 ===\n";
echo "プロジェクト: {$composerJson['name']}\n\n";

echo "本番依存パッケージ:\n";
foreach ($composerJson['require'] as $pkg => $version) {
    echo "  $pkg: $version\n";
}

echo "\n開発用パッケージ:\n";
foreach ($composerJson['require-dev'] as $pkg => $version) {
    echo "  $pkg: $version\n";
}

echo "\nオートロード設定:\n";
foreach ($composerJson['autoload']['psr-4'] as $ns => $path) {
    echo "  $ns => $path\n";
}

echo "\n利用可能なスクリプト:\n";
foreach ($composerJson['scripts'] as $name => $cmd) {
    echo "  composer $name ($cmd)\n";
}`}
          expectedOutput={`=== composer.json の構造 ===
プロジェクト: myapp/blog

本番依存パッケージ:
  php: ^8.1
  laravel/framework: ^10.0
  monolog/monolog: ^3.0

開発用パッケージ:
  phpunit/phpunit: ^10.0
  phpstan/phpstan: ^1.0
  laravel/pint: ^1.0

オートロード設定:
  App\ => app/

利用可能なスクリプト:
  composer test (phpunit)
  composer lint (pint)
  composer analyse (phpstan analyse)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="cms-frameworks" />
      </div>
      <LessonNav lessons={lessons} currentId="cms-frameworks" basePath="/learn/ecosystem" />
    </div>
  );
}
