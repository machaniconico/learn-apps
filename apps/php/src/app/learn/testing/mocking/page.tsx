import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function MockingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold">テスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">モック</h1>
        <p className="text-gray-400">モックオブジェクトを使った依存関係のテスト手法を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">モックとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          モックはテスト対象クラスの依存オブジェクトを偽物に差し替えるテスト技法です。
          データベース・外部API・メール送信などの実際の処理を行わずにテストできます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <span className="text-green-300">Stub：</span>定義した値を返すだけの偽オブジェクト</li>
          <li>• <span className="text-green-300">Mock：</span>メソッドが呼ばれたかどうかも検証できる</li>
          <li>• <span className="text-green-300">Spy：</span>実際の処理をしながら呼び出しを記録</li>
          <li>• PHPUnitでは<code className="text-green-300">$this-&gt;createMock()</code>や<code className="text-green-300">$this-&gt;getMockBuilder()</code>を使用</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースを使ったモック</h2>
        <p className="text-gray-400 mb-4">
          インターフェースを実装したモッククラスでテストを独立させます。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface EmailService {
    public function send(string $to, string $subject, string $body): bool;
}

interface UserRepository {
    public function findByEmail(string $email): ?array;
    public function save(array $user): int;
}

class UserRegistrationService {
    public function __construct(
        private UserRepository $userRepo,
        private EmailService $emailService
    ) {}

    public function register(string $name, string $email): array {
        if ($this->userRepo->findByEmail($email)) {
            throw new RuntimeException("このメールアドレスは登録済みです");
        }

        $userId = $this->userRepo->save(['name' => $name, 'email' => $email]);
        $this->emailService->send($email, "登録完了", "ようこそ、{$name}さん！");

        return ['id' => $userId, 'name' => $name, 'email' => $email];
    }
}

// テスト用モッククラス（手動実装）
class MockUserRepository implements UserRepository {
    private array $calls = [];
    private array $users = [];
    private int $nextId = 1;

    public function findByEmail(string $email): ?array {
        $this->calls[] = "findByEmail({$email})";
        return $this->users[$email] ?? null;
    }

    public function save(array $user): int {
        $this->calls[] = "save({$user['name']})";
        $this->users[$user['email']] = array_merge($user, ['id' => $this->nextId]);
        return $this->nextId++;
    }

    public function getCalls(): array { return $this->calls; }
}

class MockEmailService implements EmailService {
    private array $sentEmails = [];

    public function send(string $to, string $subject, string $body): bool {
        $this->sentEmails[] = compact('to', 'subject', 'body');
        echo "モールメール送信: {$to} - {$subject}\\n";
        return true;
    }

    public function getSentEmails(): array { return $this->sentEmails; }
}

// テスト実行
$mockRepo = new MockUserRepository();
$mockEmail = new MockEmailService();
$service = new UserRegistrationService($mockRepo, $mockEmail);

$user = $service->register("田中太郎", "tanaka@example.com");
echo "登録成功: ID={$user['id']}, {$user['name']}\\n";
echo "呼び出し: " . implode(", ", $mockRepo->getCalls()) . "\\n";
echo "送信メール数: " . count($mockEmail->getSentEmails()) . "件\\n";`}
          expectedOutput={`モールメール送信: tanaka@example.com - 登録完了\n登録成功: ID=1, 田中太郎\n呼び出し: findByEmail(tanaka@example.com), save(田中太郎)\n送信メール数: 1件`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">依存関係の検証パターン</h2>
        <p className="text-gray-400 mb-4">
          モックを使って依存オブジェクトのメソッド呼び出しを検証します。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface Cache {
    public function get(string $key): mixed;
    public function set(string $key, mixed $value, int $ttl): void;
    public function has(string $key): bool;
}

class ProductService {
    public function __construct(private Cache $cache) {}

    public function getPrice(string $productId): int {
        $cacheKey = "price:{$productId}";

        if ($this->cache->has($cacheKey)) {
            return (int)$this->cache->get($cacheKey);
        }

        // DBから取得するイメージ（ここでは固定値）
        $price = 1000 + (int)substr($productId, -3);
        $this->cache->set($cacheKey, $price, 3600);
        return $price;
    }
}

class SpyCache implements Cache {
    private array $data = [];
    private array $callLog = [];

    public function get(string $key): mixed {
        $this->callLog[] = "get({$key})";
        return $this->data[$key] ?? null;
    }

    public function set(string $key, mixed $value, int $ttl): void {
        $this->callLog[] = "set({$key}, {$value}, ttl={$ttl})";
        $this->data[$key] = $value;
    }

    public function has(string $key): bool {
        $this->callLog[] = "has({$key})";
        return isset($this->data[$key]);
    }

    public function getLog(): array { return $this->callLog; }
}

$cache = new SpyCache();
$service = new ProductService($cache);

echo "1回目（キャッシュなし）: " . $service->getPrice("P001") . "円\\n";
echo "2回目（キャッシュあり）: " . $service->getPrice("P001") . "円\\n";

echo "\\nキャッシュ呼び出しログ:\\n";
foreach ($cache->getLog() as $call) {
    echo "  {$call}\\n";
}`}
          expectedOutput={`1回目（キャッシュなし）: 1001円\n2回目（キャッシュあり）: 1001円\n\nキャッシュ呼び出しログ:\n  has(price:P001)\n  set(price:P001, 1001, ttl=3600)\n  has(price:P001)\n  get(price:P001)`}
        />
      </section>
      <LessonCompleteButton lessonId="mocking" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="mocking" basePath="/learn/testing" />
    </div>
  );
}
