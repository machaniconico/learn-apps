import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("frameworks");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">フレームワーク入門 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Symfony入門</h1>
        <p className="text-gray-400">Symfonyの特徴、コンポーネント、Bundle構造を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Symfonyとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SymfonyはエンタープライズレベルのPHPフレームワークです。再利用可能なコンポーネント群を提供し、LaravelなどのフレームワークもSymfonyコンポーネントを利用しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">HttpFoundation</code> - RequestとResponseオブジェクト</li>
          <li><code className="text-pink-300">Routing</code> - 高機能なルーティング</li>
          <li><code className="text-pink-300">DependencyInjection</code> - 強力なDIコンテナ</li>
          <li><code className="text-pink-300">Console</code> - CLIコマンド作成</li>
          <li><code className="text-pink-300">Doctrine</code> - 高機能なORM</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HttpFoundationパターン</h2>
        <p className="text-gray-400 mb-4">SymfonyのHttpFoundationコンポーネントのようなRequestとResponseオブジェクトをPHPで実装します。</p>
        <PhpEditor
          defaultCode={`<?php
// SymfonyライクなRequestオブジェクト
class Request {
    public readonly array $query;
    public readonly array $body;
    public readonly array $headers;
    public readonly string $method;
    public readonly string $path;

    public function __construct(
        string $method = 'GET',
        string $path = '/',
        array $query = [],
        array $body = [],
        array $headers = [],
    ) {
        $this->method = strtoupper($method);
        $this->path = $path;
        $this->query = $query;
        $this->body = $body;
        $this->headers = array_change_key_case($headers, CASE_LOWER);
    }

    public function get(string $key, mixed $default = null): mixed {
        return $this->query[$key] ?? $this->body[$key] ?? $default;
    }

    public function header(string $name): ?string {
        return $this->headers[strtolower($name)] ?? null;
    }

    public function isMethod(string $method): bool {
        return $this->method === strtoupper($method);
    }

    public function isJson(): bool {
        return str_contains($this->header('content-type') ?? '', 'application/json');
    }
}

// SymfonyライクなResponseオブジェクト
class Response {
    public function __construct(
        private mixed $content = '',
        private int $statusCode = 200,
        private array $headers = ['Content-Type' => 'text/html'],
    ) {}

    public static function json(mixed $data, int $status = 200): static {
        return new static(
            json_encode($data, JSON_UNESCAPED_UNICODE),
            $status,
            ['Content-Type' => 'application/json'],
        );
    }

    public function send(): void {
        echo "HTTP/1.1 {$this->statusCode}\n";
        foreach ($this->headers as $name => $value) {
            echo "$name: $value\n";
        }
        echo "\n" . $this->content . "\n";
    }
}

// 使用例
$request = new Request('GET', '/api/users', query: ['page' => '1']);
echo "メソッド: {$request->method}\n";
echo "パス: {$request->path}\n";
echo "ページ: " . $request->get('page') . "\n";
echo "JSONか: " . ($request->isJson() ? 'はい' : 'いいえ') . "\n\n";

$response = Response::json(['users' => ['田中', '鈴木'], 'total' => 2]);
$response->send();`}
          expectedOutput={`メソッド: GET
パス: /api/users
ページ: 1
JSONか: いいえ

HTTP/1.1 200
Content-Type: application/json

{"users":["田中","鈴木"],"total":2}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Symfonyのイベントシステム</h2>
        <p className="text-gray-400 mb-4">SymfonyのEventDispatcherコンポーネントのパターンを実装します。フックポイントを使った拡張性の高い設計です。</p>
        <PhpEditor
          defaultCode={`<?php
// EventDispatcherパターン
class EventDispatcher {
    private array $listeners = [];

    public function addListener(string $event, callable $listener, int $priority = 0): void {
        $this->listeners[$event][] = ['callback' => $listener, 'priority' => $priority];
        usort($this->listeners[$event], fn($a, $b) => $b['priority'] <=> $a['priority']);
    }

    public function dispatch(string $event, array $data = []): array {
        $listeners = $this->listeners[$event] ?? [];
        foreach ($listeners as $listener) {
            $data = ($listener['callback'])($data) ?? $data;
        }
        return $data;
    }
}

$dispatcher = new EventDispatcher();

// リスナーの登録（priorityが高い方が先に実行）
$dispatcher->addListener('user.register', function($data) {
    echo "メール送信: {$data['email']}\n";
    return $data;
}, priority: 10);

$dispatcher->addListener('user.register', function($data) {
    echo "ログ記録: {$data['name']}が登録\n";
    return $data;
}, priority: 20);

$dispatcher->addListener('user.register', function($data) {
    $data['registered_at'] = '2024-01-01';
    echo "DB保存: {$data['name']}\n";
    return $data;
}, priority: 30);

$result = $dispatcher->dispatch('user.register', ['name' => '田中太郎', 'email' => 'tanaka@example.com']);
echo "登録日時: {$result['registered_at']}\n";`}
          expectedOutput={`DB保存: 田中太郎
ログ記録: 田中太郎が登録
メール送信: tanaka@example.com
登録日時: 2024-01-01`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="frameworks" lessonId="symfony-intro" />
      </div>
      <LessonNav lessons={lessons} currentId="symfony-intro" basePath="/learn/frameworks" />
    </div>
  );
}
