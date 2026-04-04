import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function CrudPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">CRUD操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">CRUD</strong>はCreate（作成）、Read（読取）、Update（更新）、Delete（削除）の頭文字です。
            データベースの基本操作であり、PDOを使ったSQL文（INSERT、SELECT、UPDATE、DELETE）で実装します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">CREATE - データの挿入</h2>
        <p className="text-gray-400 mb-4">
          INSERT文でデータを追加します。lastInsertId()で挿入したレコードのIDを取得できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// インメモリDBシミュレーション\nclass SimpleDB {\n    private array $tables = ['users' => []];\n    private int $lastId = 0;\n\n    public function insert(string $table, array $data): int {\n        $this->lastId++;\n        $data['id'] = $this->lastId;\n        $this->tables[$table][] = $data;\n        return $this->lastId;\n    }\n\n    public function select(string $table, array $where = []): array {\n        $rows = $this->tables[$table];\n        if (empty($where)) return $rows;\n        return array_filter($rows, function($row) use ($where) {\n            foreach ($where as $key => $val) {\n                if (($row[$key] ?? null) !== $val) return false;\n            }\n            return true;\n        });\n    }\n}\n\n$db = new SimpleDB();\n\n// INSERTに相当する操作\n$users = [\n    ['name' => '田中太郎', 'email' => 'tanaka@example.com', 'age' => 30],\n    ['name' => '鈴木花子', 'email' => 'suzuki@example.com', 'age' => 25],\n    ['name' => '佐藤次郎', 'email' => 'sato@example.com',   'age' => 35],\n];\n\nforeach ($users as $user) {\n    $id = $db->insert('users', $user);\n    echo "挿入完了: ID={$id}, {$user['name']}\\n";\n}\n\necho "\\n全ユーザー:\\n";\nforeach ($db->select('users') as $user) {\n    echo "  [{$user['id']}] {$user['name']} ({$user['age']}歳)\\n";\n}`}
          expectedOutput={`挿入完了: ID=1, 田中太郎\n挿入完了: ID=2, 鈴木花子\n挿入完了: ID=3, 佐藤次郎\n\n全ユーザー:\n  [1] 田中太郎 (30歳)\n  [2] 鈴木花子 (25歳)\n  [3] 佐藤次郎 (35歳)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">UPDATE と DELETE</h2>
        <p className="text-gray-400 mb-4">
          UPDATE文でデータを更新し、DELETE文でデータを削除します。WHERE句を忘れると全レコードが対象になるので注意が必要です。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass SimpleDB {\n    public array $users = [\n        ['id' => 1, 'name' => '田中太郎', 'age' => 30, 'active' => true],\n        ['id' => 2, 'name' => '鈴木花子', 'age' => 25, 'active' => true],\n        ['id' => 3, 'name' => '佐藤次郎', 'age' => 35, 'active' => true],\n    ];\n\n    public function update(int $id, array $data): int {\n        $count = 0;\n        foreach ($this->users as &$user) {\n            if ($user['id'] === $id) {\n                $user = array_merge($user, $data);\n                $count++;\n            }\n        }\n        return $count;\n    }\n\n    public function delete(int $id): int {\n        $before = count($this->users);\n        $this->users = array_values(array_filter($this->users, fn($u) => $u['id'] !== $id));\n        return $before - count($this->users);\n    }\n\n    public function all(): array { return $this->users; }\n}\n\n$db = new SimpleDB();\n\n// UPDATE\n$affected = $db->update(2, ['age' => 26, 'name' => '鈴木花子（更新）']);\necho "更新: {$affected}件\\n";\n\n// DELETE\n$deleted = $db->delete(3);\necho "削除: {$deleted}件\\n\\n";\n\necho "現在のデータ:\\n";\nforeach ($db->all() as $user) {\n    echo "  [{$user['id']}] {$user['name']} ({$user['age']}歳)\\n";\n}`}
          expectedOutput={`更新: 1件\n削除: 1件\n\n現在のデータ:\n  [1] 田中太郎 (30歳)\n  [2] 鈴木花子（更新） (26歳)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">リポジトリパターン</h2>
        <p className="text-gray-400 mb-4">
          CRUD操作をリポジトリクラスにまとめると、データアクセスロジックをビジネスロジックから分離できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass UserRepository {\n    private array $data = [];\n    private int $nextId = 1;\n\n    public function create(string $name, string $email): array {\n        $user = ['id' => $this->nextId++, 'name' => $name, 'email' => $email];\n        $this->data[$user['id']] = $user;\n        return $user;\n    }\n\n    public function findById(int $id): ?array {\n        return $this->data[$id] ?? null;\n    }\n\n    public function findAll(): array {\n        return array_values($this->data);\n    }\n\n    public function update(int $id, array $fields): bool {\n        if (!isset($this->data[$id])) return false;\n        $this->data[$id] = array_merge($this->data[$id], $fields);\n        return true;\n    }\n\n    public function delete(int $id): bool {\n        if (!isset($this->data[$id])) return false;\n        unset($this->data[$id]);\n        return true;\n    }\n\n    public function count(): int { return count($this->data); }\n}\n\n$repo = new UserRepository();\n$repo->create('田中太郎', 'tanaka@example.com');\n$repo->create('鈴木花子', 'suzuki@example.com');\n$repo->update(1, ['name' => '田中太郎（更新）']);\n$repo->delete(2);\n\necho "件数: " . $repo->count() . "\\n";\n$user = $repo->findById(1);\necho "ユーザー: {$user['name']} <{$user['email']}>";`}
          expectedOutput={`件数: 1\nユーザー: 田中太郎（更新） <tanaka@example.com>`}
        />
      </section>

      <LessonCompleteButton lessonId="crud" categoryId="database" />
      <LessonNav lessons={lessons} currentId="crud" basePath="/learn/database" />
    </div>
  );
}
