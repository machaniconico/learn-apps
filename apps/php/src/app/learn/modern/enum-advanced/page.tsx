import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("modern");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">モダンPHP レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">列挙型活用</h1>
        <p className="text-gray-400">Backed Enum、メソッド追加、インターフェース実装など列挙型の応用を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">列挙型（Enum）の応用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP 8.1のEnumはメソッドやインターフェースを持てる強力な型です。定数の代替として使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Pure Enum - 値を持たないシンプルなEnum</li>
          <li><code className="text-violet-300">Backed Enum</code> - int/string値を持つEnum</li>
          <li>メソッド・定数を定義できる</li>
          <li>インターフェースを実装できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Backed Enumとメソッド</h2>
        <p className="text-gray-400 mb-4">Backed Enumにメソッドを追加することで、状態に応じたロジックをカプセル化できます。</p>
        <PhpEditor
          defaultCode={`<?php
enum OrderStatus: string {
    case Pending = 'pending';
    case Processing = 'processing';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';

    public function label(): string {
        return match($this) {
            self::Pending => '注文受付',
            self::Processing => '処理中',
            self::Shipped => '発送済み',
            self::Delivered => '配達完了',
            self::Cancelled => 'キャンセル',
        };
    }

    public function canTransitionTo(OrderStatus $next): bool {
        return match($this) {
            self::Pending => in_array($next, [self::Processing, self::Cancelled]),
            self::Processing => in_array($next, [self::Shipped, self::Cancelled]),
            self::Shipped => $next === self::Delivered,
            self::Delivered, self::Cancelled => false,
        };
    }

    public function isFinal(): bool {
        return in_array($this, [self::Delivered, self::Cancelled]);
    }
}

$status = OrderStatus::Pending;
echo "現在: {$status->label()} ({$status->value})\n";

$transitions = [OrderStatus::Processing, OrderStatus::Shipped, OrderStatus::Cancelled];
foreach ($transitions as $next) {
    $can = $status->canTransitionTo($next) ? '可能' : '不可';
    echo "{$status->label()} → {$next->label()}: $can\n";
}

// Enumからvalueで復元
$fromDb = OrderStatus::from('shipped');
echo "\nDBから復元: {$fromDb->label()}\n";
echo "最終状態: " . ($fromDb->isFinal() ? 'はい' : 'いいえ') . "\n";`}
          expectedOutput={`現在: 注文受付 (pending)
注文受付 → 処理中: 可能
注文受付 → 発送済み: 不可
注文受付 → キャンセル: 可能

DBから復元: 発送済み
最終状態: いいえ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースを実装するEnum</h2>
        <p className="text-gray-400 mb-4">EnumにインターフェースとConstantを実装して多態的な使い方ができます。</p>
        <PhpEditor
          defaultCode={`<?php
interface HasColor {
    public function color(): string;
}

interface HasIcon {
    public function icon(): string;
}

enum Priority: int implements HasColor, HasIcon {
    case Low = 1;
    case Medium = 2;
    case High = 3;
    case Critical = 4;

    public function color(): string {
        return match($this) {
            self::Low => 'gray',
            self::Medium => 'blue',
            self::High => 'orange',
            self::Critical => 'red',
        };
    }

    public function icon(): string {
        return match($this) {
            self::Low => '○',
            self::Medium => '●',
            self::High => '▲',
            self::Critical => '★',
        };
    }

    public function label(): string {
        return match($this) {
            self::Low => '低',
            self::Medium => '中',
            self::High => '高',
            self::Critical => '緊急',
        };
    }
}

// 全ケースを列挙
echo "優先度一覧:\n";
foreach (Priority::cases() as $priority) {
    echo "{$priority->icon()} {$priority->label()} (color: {$priority->color()}, value: {$priority->value})\n";
}

// 値で比較
$task = Priority::High;
if ($task->value >= Priority::High->value) {
    echo "\n警告: 高優先度のタスクがあります！\n";
}`}
          expectedOutput={`優先度一覧:
○ 低 (color: gray, value: 1)
● 中 (color: blue, value: 2)
▲ 高 (color: orange, value: 3)
★ 緊急 (color: red, value: 4)

警告: 高優先度のタスクがあります！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="modern" lessonId="enum-advanced" />
      </div>
      <LessonNav lessons={lessons} currentId="enum-advanced" basePath="/learn/modern" />
    </div>
  );
}
