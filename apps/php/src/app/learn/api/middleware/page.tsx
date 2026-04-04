import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("api");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">API開発 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ミドルウェア</h1>
        <p className="text-gray-400">リクエスト処理の前後に挟むミドルウェアパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ミドルウェアはリクエストとレスポンスの間に挟まる処理層です。認証、ログ、バリデーション、CORS処理などをハンドラから分離して再利用できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>パイプライン（チェーン）方式で複数のミドルウェアを順に実行</li>
          <li>各ミドルウェアは次の処理を呼び出すか、早期に処理を打ち切れる</li>
          <li>ハンドラのコードをシンプルに保てる</li>
          <li>LaravelのHTTPミドルウェアもこのパターン</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアパターンの実装</h2>
        <p className="text-gray-400 mb-4">リクエスト処理にミドルウェアをチェーンして、横断的な関心事を分離します。</p>
        <PhpEditor
          defaultCode={`<?php
class Request {
    public array $headers = [];
    public string $path = '/';
    public string $method = 'GET';
}

class Pipeline {
    private array $middleware = [];

    public function pipe(callable $middleware): static {
        $this->middleware[] = $middleware;
        return $this;
    }

    public function run(Request $request, callable $handler): void {
        $pipeline = array_reduce(
            array_reverse($this->middleware),
            fn($next, $mw) => fn($req) => $mw($req, $next),
            $handler
        );
        $pipeline($request);
    }
}

// ログミドルウェア
$logMiddleware = function(Request $req, callable $next): void {
    echo "[LOG] {$req->method} {$req->path}\n";
    $next($req);
    echo "[LOG] レスポンス完了\n";
};

// 認証ミドルウェア
$authMiddleware = function(Request $req, callable $next): void {
    if (!isset($req->headers['Authorization'])) {
        echo "[AUTH] 認証エラー: トークンが必要です\n";
        return;
    }
    echo "[AUTH] 認証成功\n";
    $next($req);
};

$req = new Request();
$req->path = '/api/users';
$req->headers['Authorization'] = 'Bearer token123';

$pipeline = new Pipeline();
$pipeline->pipe($logMiddleware)->pipe($authMiddleware);
$pipeline->run($req, fn($r) => print("ユーザー一覧を返します\n"));`}
          expectedOutput={`[LOG] GET /api/users
[AUTH] 認証成功
ユーザー一覧を返します
[LOG] レスポンス完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レート制限ミドルウェア</h2>
        <p className="text-gray-400 mb-4">APIへのリクエスト回数を制限するレート制限ミドルウェアの概念を実装します。</p>
        <PhpEditor
          defaultCode={`<?php
class RateLimiter {
    private array $requests = [];
    private int $maxRequests;
    private int $windowSeconds;

    public function __construct(int $maxRequests = 5, int $windowSeconds = 60) {
        $this->maxRequests = $maxRequests;
        $this->windowSeconds = $windowSeconds;
    }

    public function check(string $clientId): bool {
        $now = time();
        $windowStart = $now - $this->windowSeconds;

        // 古いリクエストを削除
        $this->requests[$clientId] = array_filter(
            $this->requests[$clientId] ?? [],
            fn($time) => $time > $windowStart
        );

        if (count($this->requests[$clientId]) >= $this->maxRequests) {
            return false;
        }

        $this->requests[$clientId][] = $now;
        return true;
    }

    public function remaining(string $clientId): int {
        return max(0, $this->maxRequests - count($this->requests[$clientId] ?? []));
    }
}

$limiter = new RateLimiter(maxRequests: 3, windowSeconds: 60);
$clientId = 'user_123';

for ($i = 1; $i <= 5; $i++) {
    $allowed = $limiter->check($clientId);
    $remaining = $limiter->remaining($clientId);
    $status = $allowed ? "許可" : "レート制限超過";
    echo "リクエスト$i: $status (残り: $remaining)\n";
}`}
          expectedOutput={`リクエスト1: 許可 (残り: 2)
リクエスト2: 許可 (残り: 1)
リクエスト3: 許可 (残り: 0)
リクエスト4: レート制限超過 (残り: 0)
リクエスト5: レート制限超過 (残り: 0)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="api" lessonId="middleware" />
      </div>
      <LessonNav lessons={lessons} currentId="middleware" basePath="/learn/api" />
    </div>
  );
}
