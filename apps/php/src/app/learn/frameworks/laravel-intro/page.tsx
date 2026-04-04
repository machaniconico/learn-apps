import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("frameworks");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">フレームワーク入門 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Laravel入門</h1>
        <p className="text-gray-400">Laravelの特徴、インストール、基本的なアーキテクチャを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Laravelとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LaravelはPHPで最も人気のあるWebフレームワークです。エレガントな構文と豊富な機能で開発効率を大幅に向上させます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">Eloquent ORM</code> - 直感的なデータベース操作</li>
          <li><code className="text-pink-300">Blade</code> - 強力なテンプレートエンジン</li>
          <li><code className="text-pink-300">Artisan</code> - CLIツール（コード生成等）</li>
          <li><code className="text-pink-300">Middleware</code> - HTTPリクエスト/レスポンス処理</li>
          <li><code className="text-pink-300">Queue</code> - 非同期ジョブ処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Eloquent ORMのパターン</h2>
        <p className="text-gray-400 mb-4">LaravelのEloquent ORMはActiveRecordパターンを採用しています。そのパターンをPHPで再現して理解しましょう。</p>
        <PhpEditor
          defaultCode={`<?php
// Eloquentライクなモデルの実装
abstract class Model {
    protected static array $records = [];
    protected static int $nextId = 1;

    public int $id;
    protected array $attributes = [];

    public function __get(string $key): mixed {
        return $this->attributes[$key] ?? null;
    }

    public function __set(string $key, mixed $value): void {
        $this->attributes[$key] = $value;
    }

    public static function create(array $data): static {
        $model = new static();
        $model->id = static::$nextId++;
        $model->attributes = $data;
        static::$records[$model->id] = $model;
        return $model;
    }

    public static function all(): array {
        return array_values(static::$records);
    }

    public static function find(int $id): ?static {
        return static::$records[$id] ?? null;
    }

    public static function where(string $key, mixed $value): array {
        return array_values(array_filter(static::$records, fn($r) => $r->$key === $value));
    }
}

class Post extends Model {
    public function title(): string {
        return $this->attributes['title'] ?? '';
    }
}

// Eloquentライクな使い方
Post::create(['title' => 'PHP入門', 'status' => 'published', 'views' => 100]);
Post::create(['title' => 'Laravel基礎', 'status' => 'published', 'views' => 250]);
Post::create(['title' => '下書き記事', 'status' => 'draft', 'views' => 0]);

$published = Post::where('status', 'published');
echo "公開記事:\n";
foreach ($published as $post) {
    echo "  [{$post->id}] {$post->title} ({$post->views}views)\n";
}

$post = Post::find(2);
echo "\n個別取得: {$post->title}\n";`}
          expectedOutput={`公開記事:
  [1] PHP入門 (100views)
  [2] Laravel基礎 (250views)

個別取得: Laravel基礎`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Laravelのサービスコンテナ（DIコンテナ）</h2>
        <p className="text-gray-400 mb-4">Laravelの中核にあるサービスコンテナはDI（依存性注入）を管理します。その概念を実装して理解します。</p>
        <PhpEditor
          defaultCode={`<?php
// シンプルなDIコンテナ
class Container {
    private array $bindings = [];
    private array $instances = [];

    public function bind(string $abstract, callable $factory): void {
        $this->bindings[$abstract] = $factory;
    }

    public function singleton(string $abstract, callable $factory): void {
        $this->bindings[$abstract] = function() use ($abstract, $factory) {
            if (!isset($this->instances[$abstract])) {
                $this->instances[$abstract] = $factory($this);
            }
            return $this->instances[$abstract];
        };
    }

    public function make(string $abstract): mixed {
        if (isset($this->bindings[$abstract])) {
            return ($this->bindings[$abstract])($this);
        }
        return new $abstract();
    }
}

interface MailerInterface {
    public function send(string $to, string $subject): void;
}

class SmtpMailer implements MailerInterface {
    public function send(string $to, string $subject): void {
        echo "SMTP送信: $to - $subject\n";
    }
}

class UserService {
    public function __construct(private MailerInterface $mailer) {}

    public function register(string $email): void {
        echo "ユーザー登録: $email\n";
        $this->mailer->send($email, 'ようこそ！');
    }
}

$container = new Container();
$container->singleton(MailerInterface::class, fn() => new SmtpMailer());
$container->bind(UserService::class, fn($c) => new UserService($c->make(MailerInterface::class)));

$service = $container->make(UserService::class);
$service->register('user@example.com');`}
          expectedOutput={`ユーザー登録: user@example.com
SMTP送信: user@example.com - ようこそ！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="frameworks" lessonId="laravel-intro" />
      </div>
      <LessonNav lessons={lessons} currentId="laravel-intro" basePath="/learn/frameworks" />
    </div>
  );
}
