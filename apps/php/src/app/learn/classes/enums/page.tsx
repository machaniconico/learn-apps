import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesEnumsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">列挙型（Enum）</h1>
        <p className="text-gray-400">PHP 8.1で追加されたenumの定義と活用方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Enum（列挙型）はPHP 8.1で追加された機能で、決まった値の集合を型安全に表現できます。純粋なenum（Pure Enum）とバックド値付きenum（Backed Enum）があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>enumキーワードで列挙型を定義する</li>
          <li>Backed Enumはint/stringの値を持てる（: int, : string）</li>
          <li>enumはメソッドとインターフェース実装をサポートする</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なEnum</h2>
        <p className="text-gray-400 mb-4">Pure Enumで状態や分類を型安全に表現します。</p>
        <PhpEditor
          defaultCode={`<?php
enum Status {
    case Pending;
    case Active;
    case Suspended;
    case Deleted;

    public function label(): string {
        return match($this) {
            Status::Pending   => "保留中",
            Status::Active    => "有効",
            Status::Suspended => "停止中",
            Status::Deleted   => "削除済み",
        };
    }

    public function isActive(): bool {
        return $this === Status::Active;
    }
}

class User {
    public function __construct(
        public readonly string $name,
        public Status $status = Status::Pending
    ) {}
}

$users = [
    new User("田中", Status::Active),
    new User("鈴木", Status::Pending),
    new User("佐藤", Status::Suspended),
];

foreach ($users as $user) {
    $mark = $user->status->isActive() ? "✓" : " ";
    echo "[{$mark}] {$user->name}: " . $user->status->label() . "\\n";
}`}
          expectedOutput={`[✓] 田中: 有効
[ ] 鈴木: 保留中
[ ] 佐藤: 停止中`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Backed Enum（値付きEnum）</h2>
        <p className="text-gray-400 mb-4">文字列や整数値を持つBacked Enumとfrom/tryFromメソッドの使い方です。</p>
        <PhpEditor
          defaultCode={`<?php
enum Color: string {
    case Red   = 'red';
    case Green = 'green';
    case Blue  = 'blue';
    case White = 'white';

    public function hex(): string {
        return match($this) {
            Color::Red   => '#FF0000',
            Color::Green => '#00FF00',
            Color::Blue  => '#0000FF',
            Color::White => '#FFFFFF',
        };
    }
}

enum Priority: int {
    case Low    = 1;
    case Medium = 2;
    case High   = 3;
    case Critical = 4;
}

// from() と tryFrom()
$color = Color::from('blue');
echo "{$color->name}: {$color->hex()}\\n";

$unknown = Color::tryFrom('yellow');
echo $unknown === null ? "yellowは存在しません\\n" : $unknown->name . "\\n";

// casesで全件取得
foreach (Priority::cases() as $p) {
    echo "優先度{$p->value}: {$p->name}\\n";
}`}
          expectedOutput={`Blue: #0000FF
yellowは存在しません
優先度1: Low
優先度2: Medium
優先度3: High
優先度4: Critical`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="enums" />
      </div>
      <LessonNav lessons={lessons} currentId="enums" basePath="/learn/classes" />
    </div>
  );
}
