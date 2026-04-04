import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("api");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">API開発 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーティング</h1>
        <p className="text-gray-400">リクエストURIに基づくシンプルなルーティングの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ルーティングの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ルーティングはHTTPメソッドとURIの組み合わせを適切なハンドラに振り分ける仕組みです。フレームワークでは自動化されていますが、内部でこの処理が行われています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">$_SERVER['REQUEST_METHOD']</code> - HTTPメソッドの取得</li>
          <li><code className="text-blue-300">$_SERVER['REQUEST_URI']</code> - リクエストURIの取得</li>
          <li>URLパラメータは正規表現でパターンマッチング</li>
          <li>マッチしない場合は404を返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなルーターの実装</h2>
        <p className="text-gray-400 mb-4">HTTPメソッドとパスを登録し、リクエストを適切なハンドラに振り分けるルーターを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
class Router {
    private array $routes = [];

    public function addRoute(string $method, string $pattern, callable $handler): void {
        // {id} を名前付きキャプチャグループに変換
        $regex = preg_replace('/\{(\w+)\}/', '(?P<$1>[^/]+)', $pattern);
        $this->routes[] = [
            'method' => strtoupper($method),
            'pattern' => "#^$regex$#",
            'handler' => $handler,
        ];
    }

    public function dispatch(string $method, string $uri): void {
        foreach ($this->routes as $route) {
            if ($route['method'] !== strtoupper($method)) continue;
            if (!preg_match($route['pattern'], $uri, $matches)) continue;

            // 名前付きキャプチャグループのみ抽出
            $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
            ($route['handler'])($params);
            return;
        }
        echo "404 Not Found\n";
    }
}

$router = new Router();
$router->addRoute('GET', '/users', fn() => print("ユーザー一覧\n"));
$router->addRoute('GET', '/users/{id}', fn($p) => print("ユーザー ID={$p['id']}\n"));
$router->addRoute('GET', '/users/{id}/posts/{postId}',
    fn($p) => print("ユーザー{$p['id']}の投稿{$p['postId']}\n"));

$router->dispatch('GET', '/users');
$router->dispatch('GET', '/users/42');
$router->dispatch('GET', '/users/5/posts/10');
$router->dispatch('GET', '/unknown');`}
          expectedOutput={`ユーザー一覧
ユーザー ID=42
ユーザー5の投稿10
404 Not Found`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クエリパラメータの処理</h2>
        <p className="text-gray-400 mb-4">URLのクエリ文字列（?key=value）をパースしてAPIのフィルタリングや検索に活用します。</p>
        <PhpEditor
          defaultCode={`<?php
// クエリパラメータのパース
function parseQueryString(string $queryString): array {
    parse_str($queryString, $params);
    return $params;
}

// サンプルデータ
$users = [
    ['id' => 1, 'name' => '田中太郎', 'role' => 'admin', 'age' => 30],
    ['id' => 2, 'name' => '鈴木花子', 'role' => 'user', 'age' => 25],
    ['id' => 3, 'name' => '佐藤次郎', 'role' => 'user', 'age' => 35],
    ['id' => 4, 'name' => '山田美咲', 'role' => 'admin', 'age' => 28],
];

// クエリパラメータでフィルタリング
function filterUsers(array $users, array $params): array {
    if (isset($params['role'])) {
        $users = array_filter($users, fn($u) => $u['role'] === $params['role']);
    }
    if (isset($params['min_age'])) {
        $users = array_filter($users, fn($u) => $u['age'] >= (int)$params['min_age']);
    }
    return array_values($users);
}

$query = parseQueryString('role=admin&min_age=29');
$result = filterUsers($users, $query);

echo "フィルター条件: " . http_build_query($query) . "\n";
foreach ($result as $user) {
    echo "- {$user['name']} ({$user['role']}, {$user['age']}歳)\n";
}`}
          expectedOutput={`フィルター条件: role=admin&min_age=29
- 田中太郎 (admin, 30歳)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="api" lessonId="routing" />
      </div>
      <LessonNav lessons={lessons} currentId="routing" basePath="/learn/api" />
    </div>
  );
}
