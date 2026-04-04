import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function DependencyInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">依存性注入</h1>
        <p className="text-gray-400">コンストラクタインジェクションとDIコンテナの概念を学び、テスト可能で疎結合なアーキテクチャを構築します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">依存性注入（DI）とは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          依存性注入とは、クラスが必要とする依存オブジェクト（依存性）を外部から渡す設計パターンです。
          クラス内部でnewするのではなく、コンストラクタや引数で受け取ることで疎結合を実現します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <span className="text-pink-300">コンストラクタインジェクション：</span>コンストラクタの引数で依存を渡す（最も推奨）</li>
          <li>• <span className="text-pink-300">セッターインジェクション：</span>セッターメソッドで後から設定</li>
          <li>• <span className="text-pink-300">DIコンテナ：</span>依存関係の解決を自動化するコンテナ</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DIなし vs DIあり</h2>
        <p className="text-gray-400 mb-4">
          DIを使わない場合との比較で、メリットを理解します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// DIなし（密結合 - テストしにくい）
class UserServiceBad {
    private $db;

    public function __construct() {
        // 内部でnewするとテスト時に差し替えられない
        $this->db = new stdClass(); // 仮のDB
    }
}

// DIあり（疎結合 - テストしやすい）
interface UserRepository {
    public function findById(int $id): array;
    public function save(array $user): bool;
}

class DatabaseUserRepository implements UserRepository {
    public function findById(int $id): array {
        return ['id' => $id, 'name' => 'DBから取得したユーザー', 'email' => 'db@example.com'];
    }
    public function save(array $user): bool {
        echo "DBに保存: {$user['name']}\\n";
        return true;
    }
}

class UserService {
    // コンストラクタインジェクション
    public function __construct(private UserRepository $repository) {}

    public function getUser(int $id): string {
        $user = $this->repository->findById($id);
        return "{$user['name']} ({$user['email']})";
    }

    public function createUser(string $name, string $email): bool {
        return $this->repository->save(['name' => $name, 'email' => $email]);
    }
}

// 本番用
$service = new UserService(new DatabaseUserRepository());
echo $service->getUser(1) . "\\n";
$service->createUser("田中太郎", "tanaka@example.com");`}
          expectedOutput={`DBから取得したユーザー (db@example.com)\nDBに保存: 田中太郎`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなDIコンテナ</h2>
        <p className="text-gray-400 mb-4">
          依存関係を自動解決する簡易DIコンテナの実装例です。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Container {
    private array $bindings = [];
    private array $instances = [];

    public function bind(string $abstract, callable $factory): void {
        $this->bindings[$abstract] = $factory;
    }

    public function singleton(string $abstract, callable $factory): void {
        $this->bind($abstract, function() use ($abstract, $factory) {
            if (!isset($this->instances[$abstract])) {
                $this->instances[$abstract] = $factory($this);
            }
            return $this->instances[$abstract];
        });
    }

    public function make(string $abstract): mixed {
        if (isset($this->bindings[$abstract])) {
            return ($this->bindings[$abstract])($this);
        }
        throw new RuntimeException("バインディングが見つかりません: {$abstract}");
    }
}

interface Mailer {
    public function send(string $to, string $subject): void;
}

class SmtpMailer implements Mailer {
    public function send(string $to, string $subject): void {
        echo "SMTP送信: {$to} - {$subject}\\n";
    }
}

class NotificationService {
    public function __construct(private Mailer $mailer) {}

    public function notify(string $user, string $message): void {
        $this->mailer->send("{$user}@example.com", $message);
    }
}

// コンテナに登録
$container = new Container();
$container->singleton(Mailer::class, fn() => new SmtpMailer());
$container->bind(NotificationService::class, fn($c) =>
    new NotificationService($c->make(Mailer::class))
);

// コンテナから取得
$service = $container->make(NotificationService::class);
$service->notify("tanaka", "注文が確定しました");
$service->notify("suzuki", "発送完了のお知らせ");`}
          expectedOutput={`SMTP送信: tanaka@example.com - 注文が確定しました\nSMTP送信: suzuki@example.com - 発送完了のお知らせ`}
        />
      </section>
      <LessonCompleteButton lessonId="dependency-injection" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="dependency-injection" basePath="/learn/oop-advanced" />
    </div>
  );
}
