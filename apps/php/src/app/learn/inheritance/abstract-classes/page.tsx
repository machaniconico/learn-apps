import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceAbstractClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">抽象クラス</h1>
        <p className="text-gray-400">abstractクラスと抽象メソッドを使った設計パターンを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          抽象クラスは直接インスタンス化できないクラスで、<code className="text-red-300">abstract</code>キーワードで宣言します。抽象メソッドを含み、子クラスに実装を強制することで共通の設計を保証します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>abstract classはインスタンス化できない（newできない）</li>
          <li>abstract メソッドは子クラスで必ず実装する必要がある</li>
          <li>抽象クラスは共通処理を実装し、サブクラス固有の処理を強制する</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスの定義と実装</h2>
        <p className="text-gray-400 mb-4">抽象クラスで共通の枠組みを定義し、子クラスで具体的な処理を実装します。</p>
        <PhpEditor
          defaultCode={`<?php
abstract class Report {
    public function __construct(protected string $title) {}

    // 抽象メソッド：子クラスで実装必須
    abstract protected function generateContent(): string;

    // 共通メソッド：すべての子クラスで同じ動作
    public function render(): void {
        echo "=== {$this->title} ===\\n";
        echo $this->generateContent();
        echo "==================\\n";
    }
}

class SalesReport extends Report {
    public function __construct(
        private array $sales
    ) {
        parent::__construct("売上レポート");
    }

    protected function generateContent(): string {
        $total = array_sum($this->sales);
        $lines = "";
        foreach ($this->sales as $item => $amount) {
            $lines .= "  {$item}: {$amount}円\\n";
        }
        $lines .= "  合計: {$total}円\\n";
        return $lines;
    }
}

class UserReport extends Report {
    public function __construct(private array $users) {
        parent::__construct("ユーザーレポート");
    }

    protected function generateContent(): string {
        $lines = "  登録数: " . count($this->users) . "名\\n";
        foreach ($this->users as $user) {
            $lines .= "  - {$user}\\n";
        }
        return $lines;
    }
}

$sales = new SalesReport(["りんご" => 3000, "みかん" => 1500, "ぶどう" => 4500]);
$users = new UserReport(["田中", "鈴木", "佐藤"]);

$sales->render();
$users->render();`}
          expectedOutput={`=== 売上レポート ===
  りんご: 3000円
  みかん: 1500円
  ぶどう: 4500円
  合計: 9000円
==================
=== ユーザーレポート ===
  登録数: 3名
  - 田中
  - 鈴木
  - 佐藤
==================`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートメソッドパターン</h2>
        <p className="text-gray-400 mb-4">抽象クラスで処理の流れを定義し、子クラスで各ステップを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
abstract class DataProcessor {
    // テンプレートメソッド：処理の流れを定義
    final public function process(array $data): array {
        $data = $this->validate($data);
        $data = $this->transform($data);
        return $this->format($data);
    }

    abstract protected function validate(array $data): array;
    abstract protected function transform(array $data): array;

    protected function format(array $data): array {
        return $data; // デフォルト実装
    }
}

class NumberProcessor extends DataProcessor {
    protected function validate(array $data): array {
        return array_filter($data, fn($v) => is_numeric($v));
    }

    protected function transform(array $data): array {
        return array_map(fn($v) => $v * 2, $data);
    }
}

$processor = new NumberProcessor();
$result = $processor->process([1, "abc", 3, 5, "xyz", 7]);
echo implode(", ", $result) . "\\n";`}
          expectedOutput={`2, 6, 10, 14`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="abstract-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="abstract-classes" basePath="/learn/inheritance" />
    </div>
  );
}
