import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHPエコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">PHP-FIG・PSR</h1>
        <p className="text-gray-400">PHP-FIGとPSR-1、PSR-4、PSR-12などの主要な標準規約を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHP-FIGとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP-FIG（PHP Framework Interoperability Group）はLaravel、Symfony、Drupalなどの主要プロジェクトのメンバーで構成される標準化団体です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">PSR-3</code> - ロガーインターフェース（Monologが実装）</li>
          <li><code className="text-indigo-300">PSR-6/16</code> - キャッシュインターフェース</li>
          <li><code className="text-indigo-300">PSR-11</code> - コンテナインターフェース</li>
          <li><code className="text-indigo-300">PSR-14</code> - イベントディスパッチャー</li>
          <li><code className="text-indigo-300">PSR-15</code> - HTTPサーバーリクエストハンドラー</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PSR-4: オートローディング規約</h2>
        <p className="text-gray-400 mb-4">PSR-4はクラスの完全修飾名とファイルパスの対応を定義します。Composerがこれを実装しています。</p>
        <PhpEditor
          defaultCode={`<?php
// PSR-4オートローダーの簡易実装
class Psr4Autoloader {
    private array $prefixes = [];

    // 名前空間プレフィックスとベースディレクトリを登録
    public function addNamespace(string $prefix, string $baseDir): void {
        $prefix = trim($prefix, '\\') . '\\';
        $baseDir = rtrim($baseDir, '/') . '/';
        $this->prefixes[$prefix][] = $baseDir;
    }

    public function loadClass(string $class): ?string {
        $prefix = $class;
        while (($pos = strrpos($prefix, '\\')) !== false) {
            $prefix = substr($class, 0, $pos + 1);
            $relativeClass = substr($class, $pos + 1);

            if (isset($this->prefixes[$prefix])) {
                foreach ($this->prefixes[$prefix] as $baseDir) {
                    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
                    echo "  探索: $file\n";
                    // 実際には require $file; を実行
                    return $file;
                }
            }
            $prefix = rtrim($prefix, '\\');
        }
        return null;
    }
}

$autoloader = new Psr4Autoloader();
$autoloader->addNamespace('App', '/var/www/app/src');
$autoloader->addNamespace('App\\Tests', '/var/www/app/tests');

// PSR-4の変換例
$classes = [
    'App\\Models\\User',
    'App\\Services\\UserService',
    'App\\Tests\\Unit\\UserTest',
];

foreach ($classes as $class) {
    echo "$class =>\n";
    $file = $autoloader->loadClass($class);
    echo "  => $file\n\n";
}`}
          expectedOutput={`App\Models\User =>
  探索: /var/www/app/src/Models/User.php
  => /var/www/app/src/Models/User.php

App\Services\UserService =>
  探索: /var/www/app/src/Services/UserService.php
  => /var/www/app/src/Services/UserService.php

App\Tests\Unit\UserTest =>
  探索: /var/www/app/tests/Unit/UserTest.php
  => /var/www/app/tests/Unit/UserTest.php`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PSR-11: コンテナインターフェース</h2>
        <p className="text-gray-400 mb-4">PSR-11はDIコンテナの標準インターフェースを定義します。これにより異なるコンテナ実装を交換可能にします。</p>
        <PhpEditor
          defaultCode={`<?php
// PSR-11: ContainerInterface
interface ContainerInterface {
    public function get(string $id): mixed;
    public function has(string $id): bool;
}

// PSR-11準拠のシンプルなコンテナ実装
class SimpleContainer implements ContainerInterface {
    private array $bindings = [];
    private array $resolved = [];

    public function bind(string $id, callable $factory): void {
        $this->bindings[$id] = $factory;
    }

    public function get(string $id): mixed {
        if (!$this->has($id)) {
            throw new \RuntimeException("サービスが見つかりません: $id");
        }
        if (!isset($this->resolved[$id])) {
            $this->resolved[$id] = ($this->bindings[$id])($this);
        }
        return $this->resolved[$id];
    }

    public function has(string $id): bool {
        return isset($this->bindings[$id]);
    }
}

// サービスの定義
interface CacheInterface {
    public function get(string $key): mixed;
    public function set(string $key, mixed $value): void;
}

class ArrayCache implements CacheInterface {
    private array $store = [];
    public function get(string $key): mixed { return $this->store[$key] ?? null; }
    public function set(string $key, mixed $value): void { $this->store[$key] = $value; }
}

$container = new SimpleContainer();
$container->bind(CacheInterface::class, fn() => new ArrayCache());
$container->bind('config', fn() => ['debug' => true, 'env' => 'production']);

$cache = $container->get(CacheInterface::class);
$cache->set('user:1', ['name' => '田中太郎']);
echo "キャッシュ取得: " . $cache->get('user:1')['name'] . "\n";

$config = $container->get('config');
echo "環境: {$config['env']}\n";
echo "キャッシュ有無: " . ($container->has(CacheInterface::class) ? 'あり' : 'なし') . "\n";`}
          expectedOutput={`キャッシュ取得: 田中太郎
環境: production
キャッシュ有無: あり`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="php-fig" />
      </div>
      <LessonNav lessons={lessons} currentId="php-fig" basePath="/learn/ecosystem" />
    </div>
  );
}
