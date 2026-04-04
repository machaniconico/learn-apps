import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コレクション操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コレクションパターン</h1>
        <p className="text-gray-400">独自のCollectionクラスを実装するパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コレクションクラスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コレクションクラスは配列をオブジェクト指向でラップし、流暢なインターフェース（メソッドチェーン）で操作できるパターンです。LaravelのCollectionクラスが有名です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>map、filter、reduceなどの高階関数をメソッドとして提供</li>
          <li>メソッドチェーンで複数の操作を連結</li>
          <li><code className="text-cyan-300">Countable</code>・<code className="text-cyan-300">IteratorAggregate</code>・<code className="text-cyan-300">ArrayAccess</code>を実装</li>
          <li>不変（イミュータブル）コレクションも設計可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Collectionクラスの実装</h2>
        <p className="text-gray-400 mb-4">map、filter、reduceなどをメソッドチェーンで使えるCollectionクラスを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
class Collection implements Countable, IteratorAggregate {
    public function __construct(private array $items = []) {}

    public static function of(array $items): static {
        return new static($items);
    }

    public function map(callable $fn): static {
        return new static(array_map($fn, $this->items));
    }

    public function filter(callable $fn): static {
        return new static(array_values(array_filter($this->items, $fn)));
    }

    public function reduce(callable $fn, mixed $initial = null): mixed {
        return array_reduce($this->items, $fn, $initial);
    }

    public function sortBy(callable $fn): static {
        $items = $this->items;
        usort($items, $fn);
        return new static($items);
    }

    public function first(): mixed { return $this->items[0] ?? null; }
    public function last(): mixed { return end($this->items) ?: null; }
    public function toArray(): array { return $this->items; }
    public function count(): int { return count($this->items); }
    public function getIterator(): ArrayIterator { return new ArrayIterator($this->items); }
}

$users = Collection::of([
    ['name' => '田中', 'age' => 30, 'score' => 85],
    ['name' => '鈴木', 'age' => 22, 'score' => 92],
    ['name' => '佐藤', 'age' => 35, 'score' => 78],
    ['name' => '山田', 'age' => 28, 'score' => 95],
]);

$result = $users
    ->filter(fn($u) => $u['age'] >= 25)
    ->sortBy(fn($a, $b) => $b['score'] <=> $a['score'])
    ->map(fn($u) => "{$u['name']}: {$u['score']}点");

foreach ($result as $line) {
    echo $line . "\n";
}

$avgScore = $users->reduce(fn($carry, $u) => $carry + $u['score'], 0) / $users->count();
echo "平均スコア: $avgScore\n";`}
          expectedOutput={`田中: 85点
佐藤: 78点
平均スコア: 87.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型付きコレクション</h2>
        <p className="text-gray-400 mb-4">特定の型のみを含む型付きコレクションで型安全性を高められます。</p>
        <PhpEditor
          defaultCode={`<?php
class User {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $role,
    ) {}
}

class UserCollection implements Countable, IteratorAggregate {
    private array $users = [];

    public function add(User $user): void {
        $this->users[$user->id] = $user;
    }

    public function findById(int $id): ?User {
        return $this->users[$id] ?? null;
    }

    public function filterByRole(string $role): static {
        $new = new static();
        foreach ($this->users as $user) {
            if ($user->role === $role) $new->add($user);
        }
        return $new;
    }

    public function names(): array {
        return array_map(fn($u) => $u->name, $this->users);
    }

    public function count(): int { return count($this->users); }
    public function getIterator(): ArrayIterator { return new ArrayIterator($this->users); }
}

$users = new UserCollection();
$users->add(new User(1, '田中', 'admin'));
$users->add(new User(2, '鈴木', 'user'));
$users->add(new User(3, '佐藤', 'admin'));

echo "全ユーザー: " . implode(', ', $users->names()) . "\n";
$admins = $users->filterByRole('admin');
echo "管理者 ({$admins->count()}名): " . implode(', ', $admins->names()) . "\n";
echo "ID=2: " . $users->findById(2)->name . "\n";`}
          expectedOutput={`全ユーザー: 田中, 鈴木, 佐藤
管理者 (2名): 田中, 佐藤
ID=2: 鈴木`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="collection-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="collection-patterns" basePath="/learn/collections" />
    </div>
  );
}
