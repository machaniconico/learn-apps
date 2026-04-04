import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PSR-4は何を定義していますか？",
    options: [
      "コーディングスタイル",
      "オートローディングの規約",
      "ログインターフェース",
      "HTTPメッセージインターフェース",
    ],
    answer: 1,
    explanation: "PSR-4はPHP名前空間とファイルシステムパスの対応を定義したオートローディング規約です。Composerが実装しています。",
  },
  {
    question: "PHP-FIGの主な役割はどれですか？",
    options: [
      "PHPのコア開発",
      "PHPフレームワーク間の相互運用性標準の策定",
      "PHPのセキュリティ監査",
      "PHPパッケージのホスティング",
    ],
    answer: 1,
    explanation: "PHP-FIG（PHP Framework Interoperability Group）はフレームワーク間の相互運用性を高めるPSR規約を策定します。",
  },
  {
    question: "Packagistの役割はどれですか？",
    options: [
      "PHPのバージョン管理",
      "PHPのIDEプラグイン",
      "Composerパッケージのリポジトリ",
      "PHPのテストフレームワーク",
    ],
    answer: 2,
    explanation: "PackagistはComposerパッケージの公式リポジトリで、PHPのパッケージを検索・公開できます。",
  },
  {
    question: "PHP 8.0で追加されたJITコンパイラの目的はどれですか？",
    options: [
      "メモリ使用量の削減",
      "実行速度の向上",
      "型安全性の強化",
      "セキュリティの改善",
    ],
    answer: 1,
    explanation: "JIT（Just-In-Time）コンパイラは実行時にコードをネイティブコードにコンパイルし、特定の処理で実行速度を向上させます。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">PHPエコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPエコシステム全体を学びます。PSR規約、PHP-FIG、PHPのバージョン変遷、CMSとフレームワークの比較、コミュニティリソースまで、PHP開発者として知っておくべき広い知識を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="indigo" categoryId="ecosystem" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PSR規約の実践</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">PSR-1/12</code>のコーディング規約に従うと、チームでの開発がスムーズになります。
        </p>
        <PhpEditor
          defaultCode={`<?php
// PSR-12に準拠したコードの例

namespace App\Services;

// PSR-4: 名前空間とディレクトリ構造を一致させる
// App\Services\UserService => src/Services/UserService.php

/**
 * PSR-3: ログインターフェース
 */
interface LoggerInterface {
    public function info(string $message): void;
    public function error(string $message): void;
}

/**
 * PSR-3実装例
 */
class SimpleLogger implements LoggerInterface {
    public function info(string $message): void {
        echo "[INFO] $message\n";
    }

    public function error(string $message): void {
        echo "[ERROR] $message\n";
    }
}

$logger = new SimpleLogger();
$logger->info("PSR規約に従ったコードです");
$logger->info("名前空間はPSR-4に準拠");
$logger->error("エラーが発生しました");`}
          expectedOutput={`[INFO] PSR規約に従ったコードです
[INFO] 名前空間はPSR-4に準拠
[ERROR] エラーが発生しました`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHPバージョンの主要な変更点</h2>
        <p className="text-gray-400 mb-4">
          PHP 7.xから8.xへの進化で多くの機能が追加されました。バージョンごとの特徴を理解しましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php
// PHP 7.4: Arrow functions, typed properties
$multiply = fn(int $x, int $y): int => $x * $y;
echo "PHP 7.4 - Arrow function: " . $multiply(3, 4) . "\n";

// PHP 8.0: Named arguments, match expression
function createTag(string $tag, string $content, string $class = ''): string {
    $classAttr = $class ? " class=\"$class\"" : '';
    return "<$tag$classAttr>$content</$tag>";
}
echo "PHP 8.0 - Named args: " . createTag(content: 'Hello', tag: 'p', class: 'greeting') . "\n";

// PHP 8.1: Enums, readonly, intersection types
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';

    public function label(): string {
        return match($this) {
            Status::Active => '有効',
            Status::Inactive => '無効',
        };
    }
}
echo "PHP 8.1 - Enum: " . Status::Active->label() . "\n";

// PHP 8.2: Readonly classes
readonly class Coordinate {
    public function __construct(
        public float $lat,
        public float $lng,
    ) {}
}
$coord = new Coordinate(35.6762, 139.6503);
echo "PHP 8.2 - Readonly class: ({$coord->lat}, {$coord->lng})\n";`}
          expectedOutput={`PHP 7.4 - Arrow function: 12
PHP 8.0 - Named args: <p class="greeting">Hello</p>
PHP 8.1 - Enum: 有効
PHP 8.2 - Readonly class: (35.6762, 139.6503)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
