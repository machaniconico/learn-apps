import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHPエコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">PHP標準</h1>
        <p className="text-gray-400">PSR規約とPHP標準ライブラリの概要を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHP標準規約（PSR）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PSR（PHP Standards Recommendation）はPHP-FIGが策定するコーディング標準です。異なるフレームワーク・ライブラリ間の相互運用性を高めます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">PSR-1</code> - 基本コーディング標準（クラス名、定数名等）</li>
          <li><code className="text-indigo-300">PSR-4</code> - オートローディング規約</li>
          <li><code className="text-indigo-300">PSR-7</code> - HTTPメッセージインターフェース</li>
          <li><code className="text-indigo-300">PSR-12</code> - 拡張コーディングスタイル</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PSR-1/12のコーディング規約</h2>
        <p className="text-gray-400 mb-4">PSR-1とPSR-12の主要なルールを守ることでチームでの開発がスムーズになります。</p>
        <PhpEditor
          defaultCode={`<?php
declare(strict_types=1);

// PSR-1: クラス名はStudlyCaps（PascalCase）
// PSR-12: 4スペースインデント、開き中括弧は同じ行

namespace App\Services;

// PSR-1: 定数はUPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 30;

// PSR-1: クラス名はStudlyCaps
class UserRegistrationService
{
    // PSR-1: メソッド名はcamelCase
    public function registerUser(string $email, string $name): array
    {
        // バリデーション
        if (!$this->isValidEmail($email)) {
            return ['success' => false, 'error' => '無効なメールアドレス'];
        }

        if (mb_strlen($name) < 2) {
            return ['success' => false, 'error' => '名前は2文字以上必要'];
        }

        // 登録処理（シミュレーション）
        $userId = rand(1000, 9999);
        return [
            'success' => true,
            'user_id' => $userId,
            'email' => $email,
            'name' => $name,
        ];
    }

    private function isValidEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
}

$service = new UserRegistrationService();

$results = [
    $service->registerUser('tanaka@example.com', '田中太郎'),
    $service->registerUser('invalid-email', '鈴木'),
    $service->registerUser('valid@test.com', '佐'),
];

foreach ($results as $result) {
    if ($result['success']) {
        echo "登録成功: {$result['name']} (ID: {$result['user_id']})\n";
    } else {
        echo "登録失敗: {$result['error']}\n";
    }
}`}
          expectedOutput={`登録成功: 田中太郎 (ID: 1234)
登録失敗: 無効なメールアドレス
登録失敗: 名前は2文字以上必要`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PSR-7: HTTPメッセージインターフェース</h2>
        <p className="text-gray-400 mb-4">PSR-7はHTTPリクエスト・レスポンスの標準インターフェースを定義します。これによりフレームワーク間で互換性が生まれます。</p>
        <PhpEditor
          defaultCode={`<?php
// PSR-7: MessageInterface の簡易実装
interface MessageInterface {
    public function getHeaders(): array;
    public function hasHeader(string $name): bool;
    public function getHeader(string $name): array;
    public function withHeader(string $name, string $value): static;
    public function getBody(): string;
}

// PSR-7: RequestInterface
interface RequestInterface extends MessageInterface {
    public function getMethod(): string;
    public function getUri(): string;
}

class HttpRequest implements RequestInterface {
    private array $headers;

    public function __construct(
        private string $method,
        private string $uri,
        array $headers = [],
        private string $body = '',
    ) {
        $this->headers = array_change_key_case($headers);
    }

    public function getMethod(): string { return $this->method; }
    public function getUri(): string { return $this->uri; }
    public function getHeaders(): array { return $this->headers; }
    public function hasHeader(string $name): bool { return isset($this->headers[strtolower($name)]); }
    public function getHeader(string $name): array { return (array)($this->headers[strtolower($name)] ?? []); }
    public function getBody(): string { return $this->body; }

    public function withHeader(string $name, string $value): static {
        $clone = clone $this;
        $clone->headers[strtolower($name)] = $value;
        return $clone;
    }
}

$request = new HttpRequest('GET', '/api/users', ['Content-Type' => 'application/json', 'Accept' => 'application/json']);

echo "メソッド: " . $request->getMethod() . "\n";
echo "URI: " . $request->getUri() . "\n";
echo "Content-Type: " . implode(', ', $request->getHeader('Content-Type')) . "\n";

// immutableなwithHeaderで新しいインスタンスを作成
$withAuth = $request->withHeader('Authorization', 'Bearer token123');
echo "認証ヘッダーあり: " . ($withAuth->hasHeader('Authorization') ? 'はい' : 'いいえ') . "\n";
echo "元のリクエストに認証ヘッダー: " . ($request->hasHeader('Authorization') ? 'はい' : 'いいえ') . "\n";`}
          expectedOutput={`メソッド: GET
URI: /api/users
Content-Type: application/json
認証ヘッダーあり: はい
元のリクエストに認証ヘッダー: いいえ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="php-standards" />
      </div>
      <LessonNav lessons={lessons} currentId="php-standards" basePath="/learn/ecosystem" />
    </div>
  );
}
