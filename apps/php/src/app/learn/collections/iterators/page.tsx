import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コレクション操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イテレータ</h1>
        <p className="text-gray-400">Iteratorインターフェースとforeachの連携を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Iteratorとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          IteratorインターフェースをはじめとするSPLのトラバーサルインターフェースにより、独自クラスをforeachで反復処理できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">current()</code> - 現在の要素を返す</li>
          <li><code className="text-cyan-300">key()</code> - 現在のキーを返す</li>
          <li><code className="text-cyan-300">next()</code> - 次の要素へ進む</li>
          <li><code className="text-cyan-300">rewind()</code> - 先頭に巻き戻す</li>
          <li><code className="text-cyan-300">valid()</code> - 現在位置が有効かチェック</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムIteratorの実装</h2>
        <p className="text-gray-400 mb-4">Iteratorインターフェースを実装することで、任意のオブジェクトをforeachで使えます。</p>
        <PhpEditor
          defaultCode={`<?php
class CsvRowIterator implements Iterator {
    private array $rows;
    private int $position = 0;

    public function __construct(string $csv) {
        $lines = explode("\n", trim($csv));
        $headers = str_getcsv(array_shift($lines));
        $this->rows = array_map(
            fn($line) => array_combine($headers, str_getcsv($line)),
            $lines
        );
    }

    public function current(): array { return $this->rows[$this->position]; }
    public function key(): int { return $this->position; }
    public function next(): void { $this->position++; }
    public function rewind(): void { $this->position = 0; }
    public function valid(): bool { return isset($this->rows[$this->position]); }
}

$csv = "name,age,city\n田中太郎,30,東京\n鈴木花子,25,大阪\n佐藤次郎,35,名古屋";
$iterator = new CsvRowIterator($csv);

foreach ($iterator as $i => $row) {
    echo "行{$i}: {$row['name']} ({$row['age']}歳, {$row['city']})\n";
}

// 再利用可能（rewindが呼ばれる）
echo "再利用:\n";
foreach ($iterator as $row) {
    echo "- {$row['name']}\n";
}`}
          expectedOutput={`行0: 田中太郎 (30歳, 東京)
行1: 鈴木花子 (25歳, 大阪)
行2: 佐藤次郎 (35歳, 名古屋)
再利用:
- 田中太郎
- 鈴木花子
- 佐藤次郎`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IteratorAggregateによる委譲</h2>
        <p className="text-gray-400 mb-4">IteratorAggregateを使うと、getIteratorメソッド1つでforeachに対応できます。</p>
        <PhpEditor
          defaultCode={`<?php
class UserCollection implements IteratorAggregate {
    private array $users = [];

    public function add(array $user): void {
        $this->users[] = $user;
    }

    public function getIterator(): ArrayIterator {
        return new ArrayIterator($this->users);
    }

    public function count(): int {
        return count($this->users);
    }

    public function filter(callable $callback): static {
        $new = new static();
        foreach ($this->users as $user) {
            if ($callback($user)) {
                $new->add($user);
            }
        }
        return $new;
    }
}

$users = new UserCollection();
$users->add(['name' => '田中', 'role' => 'admin', 'age' => 30]);
$users->add(['name' => '鈴木', 'role' => 'user',  'age' => 25]);
$users->add(['name' => '佐藤', 'role' => 'admin', 'age' => 35]);

echo "全ユーザー ({$users->count()}件):\n";
foreach ($users as $user) {
    echo "- {$user['name']} ({$user['role']})\n";
}

$admins = $users->filter(fn($u) => $u['role'] === 'admin');
echo "\n管理者 ({$admins->count()}件):\n";
foreach ($admins as $admin) {
    echo "- {$admin['name']}\n";
}`}
          expectedOutput={`全ユーザー (3件):
- 田中 (admin)
- 鈴木 (user)
- 佐藤 (admin)

管理者 (2件):
- 田中
- 佐藤`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="iterators" />
      </div>
      <LessonNav lessons={lessons} currentId="iterators" basePath="/learn/collections" />
    </div>
  );
}
