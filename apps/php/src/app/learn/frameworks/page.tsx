import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("frameworks");

const quizQuestions: QuizQuestion[] = [
  {
    question: "MVCパターンでビジネスロジックを担当するのはどれですか？",
    options: ["View", "Controller", "Model", "Router"],
    answer: 2,
    explanation: "ModelはデータとビジネスロジックをViewとControllerから分離して管理します。",
  },
  {
    question: "LaravelのORMはどれですか？",
    options: ["Doctrine", "Propel", "Eloquent", "RedBean"],
    answer: 2,
    explanation: "LaravelはEloquent ORMを使ってデータベース操作をオブジェクト指向で行います。",
  },
  {
    question: "SymfonyのDIコンテナで使われる設定ファイル形式に含まれないものはどれですか？",
    options: ["YAML", "XML", "PHP", "TOML"],
    answer: 3,
    explanation: "SymfonyはYAML、XML、PHPでサービスを設定できますが、TOMLは標準サポートされていません。",
  },
  {
    question: "Bladeテンプレートエンジンはどのフレームワークのものですか？",
    options: ["Symfony", "Slim", "Laravel", "CodeIgniter"],
    answer: 2,
    explanation: "BladeはLaravelのテンプレートエンジンです。@if、@foreach、@extendsなどのディレクティブを提供します。",
  },
];

export default function FrameworksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">フレームワーク入門</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPフレームワークの基礎を学びます。MVCパターンの概念から始まり、LaravelとSymfonyの主要な機能、ルーティングの仕組み、テンプレートエンジンまで、モダンなフレームワーク開発の土台を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="frameworks" totalLessons={5} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/frameworks" color="pink" categoryId="frameworks" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MVCパターンの実装</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">Model</code>、<code className="text-pink-300">View</code>、<code className="text-pink-300">Controller</code>の役割分担でコードを整理します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// Model: データとビジネスロジック
class UserModel {
    private array $users = [
        ['id' => 1, 'name' => '田中太郎', 'email' => 'tanaka@example.com'],
        ['id' => 2, 'name' => '鈴木花子', 'email' => 'suzuki@example.com'],
    ];

    public function findById(int $id): ?array {
        foreach ($this->users as $user) {
            if ($user['id'] === $id) return $user;
        }
        return null;
    }

    public function findAll(): array {
        return $this->users;
    }
}

// Controller: リクエスト処理
class UserController {
    public function __construct(private UserModel $model) {}

    public function show(int $id): void {
        $user = $this->model->findById($id);
        if ($user) {
            echo "ユーザー: {$user['name']} ({$user['email']})\n";
        } else {
            echo "ユーザーが見つかりません\n";
        }
    }

    public function index(): void {
        foreach ($this->model->findAll() as $user) {
            echo "- {$user['name']}\n";
        }
    }
}

$controller = new UserController(new UserModel());
$controller->index();
$controller->show(1);`}
          expectedOutput={`- 田中太郎
- 鈴木花子
ユーザー: 田中太郎 (tanaka@example.com)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなルーター実装</h2>
        <p className="text-gray-400 mb-4">
          フレームワークが内部で行っているルーティングの仕組みをシンプルに実装して理解します。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Router {
    private array $routes = [];

    public function get(string $path, callable $handler): void {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, callable $handler): void {
        $this->routes['POST'][$path] = $handler;
    }

    public function dispatch(string $method, string $path): void {
        $handler = $this->routes[$method][$path] ?? null;
        if ($handler) {
            $handler();
        } else {
            echo "404 Not Found: $method $path\n";
        }
    }
}

$router = new Router();
$router->get('/', fn() => print("トップページ\n"));
$router->get('/users', fn() => print("ユーザー一覧\n"));
$router->post('/users', fn() => print("ユーザー作成\n"));

$router->dispatch('GET', '/');
$router->dispatch('GET', '/users');
$router->dispatch('POST', '/users');
$router->dispatch('GET', '/unknown');`}
          expectedOutput={`トップページ
ユーザー一覧
ユーザー作成
404 Not Found: GET /unknown`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
