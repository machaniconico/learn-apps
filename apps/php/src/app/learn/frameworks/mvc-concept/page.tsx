import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("frameworks");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">フレームワーク入門 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">MVC概念</h1>
        <p className="text-gray-400">Model-View-Controllerパターンの概念とPHPでの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">MVCパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          MVCはアプリケーションを3つの役割に分離するアーキテクチャパターンです。責任が明確になりコードの保守性が向上します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">Model</code> - データとビジネスロジック（DBアクセス、バリデーション）</li>
          <li><code className="text-pink-300">View</code> - 表示・UI（HTMLテンプレート）</li>
          <li><code className="text-pink-300">Controller</code> - リクエスト処理・ModelとViewの調整</li>
          <li>Laravel、Symfony、CakePHPがこのパターンを採用</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MVCの完全な実装例</h2>
        <p className="text-gray-400 mb-4">ブログ記事の一覧・詳細表示をMVCパターンで実装します。</p>
        <PhpEditor
          defaultCode={`<?php
// === Model ===
class ArticleModel {
    private array $articles = [
        ['id' => 1, 'title' => 'PHP 8の新機能', 'body' => 'match式やnamed argsが追加...', 'author' => '田中'],
        ['id' => 2, 'title' => 'Composerの使い方', 'body' => 'パッケージ管理の基本...', 'author' => '鈴木'],
        ['id' => 3, 'title' => 'PHPUnit入門', 'body' => 'テスト駆動開発の第一歩...', 'author' => '佐藤'],
    ];

    public function findAll(): array { return $this->articles; }

    public function findById(int $id): ?array {
        foreach ($this->articles as $a) {
            if ($a['id'] === $id) return $a;
        }
        return null;
    }
}

// === View ===
class ArticleView {
    public function renderList(array $articles): string {
        $items = array_map(fn($a) => "  [{$a['id']}] {$a['title']} by {$a['author']}", $articles);
        return "=== 記事一覧 ===\n" . implode("\n", $items) . "\n";
    }

    public function renderDetail(array $article): string {
        return "=== {$article['title']} ===\n著者: {$article['author']}\n{$article['body']}\n";
    }

    public function renderNotFound(int $id): string {
        return "エラー: ID={$id}の記事が見つかりません\n";
    }
}

// === Controller ===
class ArticleController {
    public function __construct(
        private ArticleModel $model,
        private ArticleView $view,
    ) {}

    public function index(): void {
        $articles = $this->model->findAll();
        echo $this->view->renderList($articles);
    }

    public function show(int $id): void {
        $article = $this->model->findById($id);
        echo $article
            ? $this->view->renderDetail($article)
            : $this->view->renderNotFound($id);
    }
}

$controller = new ArticleController(new ArticleModel(), new ArticleView());
$controller->index();
echo "\n";
$controller->show(2);
echo "\n";
$controller->show(99);`}
          expectedOutput={`=== 記事一覧 ===
  [1] PHP 8の新機能 by 田中
  [2] Composerの使い方 by 鈴木
  [3] PHPUnit入門 by 佐藤

=== Composerの使い方 ===
著者: 鈴木
パッケージ管理の基本...

エラー: ID=99の記事が見つかりません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">サービスレイヤーとリポジトリパターン</h2>
        <p className="text-gray-400 mb-4">実際のフレームワークではModelをさらに分割してサービスレイヤーとリポジトリに分けることが多いです。</p>
        <PhpEditor
          defaultCode={`<?php
// Repository: データアクセスの抽象化
interface ArticleRepositoryInterface {
    public function findAll(): array;
    public function findById(int $id): ?array;
}

class InMemoryArticleRepository implements ArticleRepositoryInterface {
    private array $data = [
        ['id' => 1, 'title' => 'PHP入門', 'views' => 1500],
        ['id' => 2, 'title' => 'OOP基礎', 'views' => 800],
        ['id' => 3, 'title' => 'テスト手法', 'views' => 1200],
    ];

    public function findAll(): array { return $this->data; }
    public function findById(int $id): ?array {
        return current(array_filter($this->data, fn($a) => $a['id'] === $id)) ?: null;
    }
}

// Service: ビジネスロジック
class ArticleService {
    public function __construct(private ArticleRepositoryInterface $repo) {}

    public function getPopular(int $limit = 2): array {
        $articles = $this->repo->findAll();
        usort($articles, fn($a, $b) => $b['views'] <=> $a['views']);
        return array_slice($articles, 0, $limit);
    }
}

$service = new ArticleService(new InMemoryArticleRepository());
$popular = $service->getPopular(2);

echo "人気記事TOP2:\n";
foreach ($popular as $i => $article) {
    echo ($i + 1) . ". {$article['title']} ({$article['views']}views)\n";
}`}
          expectedOutput={`人気記事TOP2:
1. PHP入門 (1500views)
2. テスト手法 (1200views)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="frameworks" lessonId="mvc-concept" />
      </div>
      <LessonNav lessons={lessons} currentId="mvc-concept" basePath="/learn/frameworks" />
    </div>
  );
}
