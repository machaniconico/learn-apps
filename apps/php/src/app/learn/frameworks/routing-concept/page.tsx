import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("frameworks");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">フレームワーク入門 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーティング概念</h1>
        <p className="text-gray-400">フレームワークにおけるルーティングの仕組みと設計を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フレームワークのルーティング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フレームワークのルーターはURLパターンとコントローラーを紐付け、ミドルウェアの適用やパラメータの抽出を行います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>URLパターンマッチング（静的・動的パラメータ）</li>
          <li>HTTPメソッドによる振り分け</li>
          <li>名前付きルートとURL生成</li>
          <li>ルートグループとプレフィックス</li>
          <li>ミドルウェアのルートへの適用</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">高機能ルーターの実装</h2>
        <p className="text-gray-400 mb-4">名前付きルート、グループ、ミドルウェアをサポートするルーターを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
class Route {
    public array $middleware = [];

    public function __construct(
        public string $method,
        public string $pattern,
        public callable $handler,
        public string $name = '',
    ) {}

    public function middleware(string ...$names): static {
        $this->middleware = array_merge($this->middleware, $names);
        return $this;
    }
}

class Router {
    private array $routes = [];
    private array $named = [];
    private string $prefix = '';
    private array $groupMiddleware = [];

    public function group(string $prefix, callable $callback, array $middleware = []): void {
        $prevPrefix = $this->prefix;
        $prevMiddleware = $this->groupMiddleware;
        $this->prefix = $prevPrefix . $prefix;
        $this->groupMiddleware = array_merge($prevMiddleware, $middleware);
        $callback($this);
        $this->prefix = $prevPrefix;
        $this->groupMiddleware = $prevMiddleware;
    }

    public function get(string $path, callable $handler, string $name = ''): Route {
        return $this->addRoute('GET', $path, $handler, $name);
    }

    public function post(string $path, callable $handler, string $name = ''): Route {
        return $this->addRoute('POST', $path, $handler, $name);
    }

    private function addRoute(string $method, string $path, callable $handler, string $name): Route {
        $route = new Route($method, $this->prefix . $path, $handler, $name);
        $route->middleware = $this->groupMiddleware;
        $this->routes[] = $route;
        if ($name) $this->named[$name] = $route;
        return $route;
    }

    public function url(string $name, array $params = []): string {
        $route = $this->named[$name] ?? null;
        if (!$route) return '';
        return preg_replace_callback('/\{(\w+)\}/', fn($m) => $params[$m[1]] ?? $m[0], $route->pattern);
    }

    public function dispatch(string $method, string $uri): void {
        foreach ($this->routes as $route) {
            if ($route->method !== strtoupper($method)) continue;
            $regex = '#^' . preg_replace('/\{(\w+)\}/', '(?P<$1>[^/]+)', $route->pattern) . '$#';
            if (!preg_match($regex, $uri, $matches)) continue;
            $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
            $mw = implode(', ', $route->middleware) ?: 'なし';
            echo "ミドルウェア: $mw\n";
            ($route->handler)($params);
            return;
        }
        echo "404: $method $uri\n";
    }
}

$router = new Router();
$router->group('/api/v1', function(Router $r) {
    $r->get('/users', fn() => print("ユーザー一覧\n"), 'users.index');
    $r->get('/users/{id}', fn($p) => print("ユーザー {$p['id']}\n"), 'users.show');
    $r->post('/users', fn() => print("ユーザー作成\n"), 'users.store')->middleware('auth');
}, middleware: ['api', 'throttle']);

echo $router->url('users.show', ['id' => 42]) . "\n\n";
$router->dispatch('GET', '/api/v1/users');
echo "\n";
$router->dispatch('POST', '/api/v1/users');`}
          expectedOutput={`/api/v1/users/42

ミドルウェア: api, throttle
ユーザー一覧

ミドルウェア: api, throttle, auth
ユーザー作成`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リソースルーティング</h2>
        <p className="text-gray-400 mb-4">LaravelのRoute::resource()のようなRESTfulなリソースルートを一括登録するパターンです。</p>
        <PhpEditor
          defaultCode={`<?php
function resourceRoutes(string $name, string $controller): array {
    $routes = [
        ['GET',    "/$name",          "$controller@index",   "$name.index"],
        ['GET',    "/$name/create",   "$controller@create",  "$name.create"],
        ['POST',   "/$name",          "$controller@store",   "$name.store"],
        ['GET',    "/$name/{id}",     "$controller@show",    "$name.show"],
        ['GET',    "/$name/{id}/edit","$controller@edit",    "$name.edit"],
        ['PUT',    "/$name/{id}",     "$controller@update",  "$name.update"],
        ['DELETE', "/$name/{id}",     "$controller@destroy", "$name.destroy"],
    ];

    echo "リソースルート: $name\n";
    echo str_pad('メソッド', 10) . str_pad('パス', 30) . "アクション\n";
    echo str_repeat('-', 65) . "\n";
    foreach ($routes as [$method, $path, $action, $routeName]) {
        echo str_pad($method, 10) . str_pad($path, 30) . "$action\n";
    }
    return $routes;
}

resourceRoutes('posts', 'PostController');`}
          expectedOutput={`リソースルート: posts
メソッド    パス                           アクション
-----------------------------------------------------------------
GET       /posts                         PostController@index
GET       /posts/create                  PostController@create
POST      /posts                         PostController@store
GET       /posts/{id}                    PostController@show
GET       /posts/{id}/edit               PostController@edit
PUT       /posts/{id}                    PostController@update
DELETE    /posts/{id}                    PostController@destroy`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="frameworks" lessonId="routing-concept" />
      </div>
      <LessonNav lessons={lessons} currentId="routing-concept" basePath="/learn/frameworks" />
    </div>
  );
}
