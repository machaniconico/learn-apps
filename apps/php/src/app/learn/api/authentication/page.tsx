import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("api");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">API開発 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">認証</h1>
        <p className="text-gray-400">JWT・Bearer TokenによるAPI認証の実装パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">API認証の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          APIの認証方式にはいくつかの種類があります。RESTful APIではステートレスな認証が推奨されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Bearer Token</code> - Authorizationヘッダーにトークンを付与</li>
          <li><code className="text-blue-300">JWT</code> - ヘッダー・ペイロード・署名からなる自己完結型トークン</li>
          <li><code className="text-blue-300">API Key</code> - クエリパラメータやヘッダーにキーを付与</li>
          <li><code className="text-blue-300">OAuth 2.0</code> - 第三者サービスへの権限委譲</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Bearer Token認証の実装</h2>
        <p className="text-gray-400 mb-4">AuthorizationヘッダーからBearer Tokenを取り出して検証する基本パターンです。</p>
        <PhpEditor
          defaultCode={`<?php
class TokenAuth {
    // 実際はデータベースやRedisで管理
    private array $validTokens = [
        'token_admin_abc123' => ['id' => 1, 'name' => '管理者', 'role' => 'admin'],
        'token_user_xyz789'  => ['id' => 2, 'name' => '一般ユーザー', 'role' => 'user'],
    ];

    public function authenticate(string $authHeader): ?array {
        // "Bearer <token>" 形式からトークンを抽出
        if (!preg_match('/^Bearer\s+(.+)$/', $authHeader, $matches)) {
            return null;
        }
        $token = $matches[1];
        return $this->validTokens[$token] ?? null;
    }

    public function authorize(array $user, string $requiredRole): bool {
        $hierarchy = ['user' => 1, 'admin' => 2];
        return ($hierarchy[$user['role']] ?? 0) >= ($hierarchy[$requiredRole] ?? 0);
    }
}

$auth = new TokenAuth();

$requests = [
    ['token' => 'Bearer token_admin_abc123', 'action' => '管理者専用リソース', 'role' => 'admin'],
    ['token' => 'Bearer token_user_xyz789',  'action' => '管理者専用リソース', 'role' => 'admin'],
    ['token' => 'Bearer token_user_xyz789',  'action' => '一般リソース',       'role' => 'user'],
    ['token' => 'Bearer invalid_token',       'action' => '一般リソース',       'role' => 'user'],
];

foreach ($requests as $req) {
    $user = $auth->authenticate($req['token']);
    if (!$user) {
        echo "{$req['action']}: 401 認証エラー\n";
        continue;
    }
    if (!$auth->authorize($user, $req['role'])) {
        echo "{$req['action']}: 403 権限エラー ({$user['name']})\n";
        continue;
    }
    echo "{$req['action']}: 200 成功 ({$user['name']})\n";
}`}
          expectedOutput={`管理者専用リソース: 200 成功 (管理者)
管理者専用リソース: 403 権限エラー (一般ユーザー)
一般リソース: 200 成功 (一般ユーザー)
一般リソース: 401 認証エラー`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JWTの構造理解</h2>
        <p className="text-gray-400 mb-4">JWTはヘッダー・ペイロード・署名の3部分をBase64URLエンコードしてドットで結合した文字列です。</p>
        <PhpEditor
          defaultCode={`<?php
// JWTの構造を理解するための簡易実装（教育目的）
// 実際のプロジェクトではfirebase/php-jwtなどのライブラリを使用してください

function base64UrlEncode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function createSimpleJwt(array $payload, string $secret): string {
    $header = base64UrlEncode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64UrlEncode(json_encode($payload));
    $signature = base64UrlEncode(hash_hmac('sha256', "$header.$payload", $secret, true));
    return "$header.$payload.$signature";
}

function decodeJwtPayload(string $token): array {
    $parts = explode('.', $token);
    return json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
}

$secret = 'my-secret-key';
$payload = [
    'sub' => 42,
    'name' => '田中太郎',
    'role' => 'user',
    'iat' => time(),
    'exp' => time() + 3600,
];

$token = createSimpleJwt($payload, $secret);
echo "JWT: " . substr($token, 0, 50) . "...\n";
echo "JWT部分数: " . count(explode('.', $token)) . "\n";

$decoded = decodeJwtPayload($token);
echo "ユーザー: {$decoded['name']} (ID: {$decoded['sub']})\n";
echo "ロール: {$decoded['role']}\n";`}
          expectedOutput={`JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQy...
JWT部分数: 3
ユーザー: 田中太郎 (ID: 42)
ロール: user`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="api" lessonId="authentication" />
      </div>
      <LessonNav lessons={lessons} currentId="authentication" basePath="/learn/api" />
    </div>
  );
}
