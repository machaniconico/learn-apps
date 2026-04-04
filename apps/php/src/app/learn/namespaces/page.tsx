import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("namespaces");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPで名前空間を宣言するキーワードはどれですか？",
    options: ["package", "module", "namespace", "use"],
    answer: 2,
    explanation: "namespaceキーワードを使って名前空間を宣言します。ファイルの先頭（<?phpタグの直後）に記述します。",
  },
  {
    question: "use文のエイリアスを設定するキーワードはどれですか？",
    options: ["alias", "as", "import", "from"],
    answer: 1,
    explanation: "use App\\Models\\User as UserModel; のようにasキーワードでエイリアスを付けられます。",
  },
  {
    question: "PSR-4オートロードでApp\\Controllers\\UserControllerクラスのファイルパスはどれですか？",
    options: [
      "app/controllers/usercontroller.php",
      "src/Controllers/UserController.php",
      "App/Controllers/UserController.php",
      "lib/UserController.php",
    ],
    answer: 1,
    explanation: "PSR-4ではAppをsrc/にマップした場合、App\\Controllers\\UserControllerはsrc/Controllers/UserController.phpに対応します。",
  },
  {
    question: "Composerで依存パッケージをインストールするコマンドはどれですか？",
    options: [
      "composer add",
      "composer install",
      "composer get",
      "composer update",
    ],
    answer: 1,
    explanation: "composer installはcomposer.lock（またはcomposer.json）に基づいて依存パッケージをインストールします。",
  },
];

export default function NamespacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">名前空間・Composer</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPの名前空間とComposerによるパッケージ管理を学びましょう。名前空間を使ったコードの整理、PSR-4オートロード規約、Composerを使った外部ライブラリの活用方法を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="namespaces" totalLessons={5} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/namespaces" color="teal" categoryId="namespaces" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">名前空間の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">namespace</code>キーワードで名前空間を宣言し、クラス名の衝突を防ぎます。
        </p>
        <PhpEditor
          defaultCode={`<?php
namespace App\\Models;

class User {
    public function __construct(
        public readonly string $name,
        public readonly string $email
    ) {}

    public function getInfo(): string {
        return "{$this->name} <{$this->email}>";
    }
}

// 完全修飾名でインスタンス生成
$user = new \\App\\Models\\User("田中太郎", "tanaka@example.com");
echo $user->getInfo() . "\\n";
echo "名前空間: " . __NAMESPACE__ . "\\n";`}
          expectedOutput={`田中太郎 <tanaka@example.com>\n名前空間: App\\Models`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">use文でインポート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">use</code>文で名前空間をインポートし、短い名前でクラスを使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php
namespace App;

use App\\Models\\Product;
use App\\Models\\Category as Cat;

// 複数インポート
use App\\Services\\{Logger, Mailer};

// グローバル関数の使用
use function array_map;
use const PHP_EOL;

echo "useで名前空間をインポートできます" . PHP_EOL;
echo "エイリアスでCategoryをCatとして使えます" . PHP_EOL;
echo "PHP_EOL: " . (PHP_EOL === "\\n" ? "改行文字" : "その他") . PHP_EOL;`}
          expectedOutput={`useで名前空間をインポートできます\nエイリアスでCategoryをCatとして使えます\nPHP_EOL: 改行文字`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
