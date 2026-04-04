import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function QueryBuilderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">クエリビルダー</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">クエリビルダー</strong>はSQLをメソッドチェーンで組み立てるパターンです。
            文字列連結によるSQL構築よりも安全で読みやすく、条件の動的追加も簡単に実装できます。
            LaravelのEloquentやSymfonyのDBALなどのフレームワークで広く採用されています。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなクエリビルダー</h2>
        <p className="text-gray-400 mb-4">
          メソッドチェーンでSQLを構築するクエリビルダーの基本実装を見てみましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass QueryBuilder {\n    private string $table = '';\n    private array $conditions = [];\n    private array $params = [];\n    private ?int $limitVal = null;\n    private ?int $offsetVal = null;\n    private string $orderByCol = '';\n    private string $orderDir = 'ASC';\n\n    public function from(string $table): static {\n        $this->table = $table;\n        return $this;\n    }\n\n    public function where(string $col, string $op, mixed $val): static {\n        $key = str_replace('.', '_', $col) . count($this->conditions);\n        $this->conditions[] = "{$col} {$op} :{$key}";\n        $this->params[$key]  = $val;\n        return $this;\n    }\n\n    public function orderBy(string $col, string $dir = 'ASC'): static {\n        $this->orderByCol = $col;\n        $this->orderDir   = strtoupper($dir);\n        return $this;\n    }\n\n    public function limit(int $n): static  { $this->limitVal  = $n; return $this; }\n    public function offset(int $n): static { $this->offsetVal = $n; return $this; }\n\n    public function toSql(): string {\n        $sql = "SELECT * FROM {$this->table}";\n        if ($this->conditions) $sql .= " WHERE " . implode(" AND ", $this->conditions);\n        if ($this->orderByCol) $sql .= " ORDER BY {$this->orderByCol} {$this->orderDir}";\n        if ($this->limitVal !== null)  $sql .= " LIMIT {$this->limitVal}";\n        if ($this->offsetVal !== null) $sql .= " OFFSET {$this->offsetVal}";\n        return $sql;\n    }\n\n    public function getParams(): array { return $this->params; }\n}\n\n$qb = new QueryBuilder();\n$sql = $qb->from('users')\n          ->where('age', '>=', 20)\n          ->where('active', '=', 1)\n          ->orderBy('name')\n          ->limit(10)\n          ->offset(20)\n          ->toSql();\n\necho "生成SQL:\\n{$sql}\\n\\n";\necho "パラメータ:\\n";\nforeach ($qb->getParams() as $key => $val) {\n    echo "  :{$key} = {$val}\\n";\n}`}
          expectedOutput={`生成SQL:\nSELECT * FROM users WHERE age >= :age0 AND active = :active1 ORDER BY name ASC LIMIT 10 OFFSET 20\n\nパラメータ:\n  :age0 = 20\n  :active1 = 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">INSERT/UPDATE/DELETEのビルダー</h2>
        <p className="text-gray-400 mb-4">
          SELECT以外のクエリもビルダーパターンで構築できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass DMLBuilder {\n    public static function insert(string $table, array $data): array {\n        $cols   = implode(", ", array_keys($data));\n        $params = implode(", ", array_map(fn($k) => ":{$k}", array_keys($data)));\n        return [\n            "sql"    => "INSERT INTO {$table} ({$cols}) VALUES ({$params})",\n            "params" => $data,\n        ];\n    }\n\n    public static function update(string $table, array $data, string $whereCol, mixed $whereVal): array {\n        $sets = implode(", ", array_map(fn($k) => "{$k} = :{$k}", array_keys($data)));\n        return [\n            "sql"    => "UPDATE {$table} SET {$sets} WHERE {$whereCol} = :__where",\n            "params" => array_merge($data, ['__where' => $whereVal]),\n        ];\n    }\n\n    public static function delete(string $table, string $col, mixed $val): array {\n        return [\n            "sql"    => "DELETE FROM {$table} WHERE {$col} = :val",\n            "params" => ['val' => $val],\n        ];\n    }\n}\n\n$insert = DMLBuilder::insert('users', ['name' => '田中', 'email' => 'tanaka@example.com', 'age' => 30]);\necho "INSERT:\\n  " . $insert['sql'] . "\\n\\n";\n\n$update = DMLBuilder::update('users', ['name' => '田中太郎', 'age' => 31], 'id', 1);\necho "UPDATE:\\n  " . $update['sql'] . "\\n\\n";\n\n$delete = DMLBuilder::delete('users', 'id', 5);\necho "DELETE:\\n  " . $delete['sql'];`}
          expectedOutput={`INSERT:\n  INSERT INTO users (name, email, age) VALUES (:name, :email, :age)\n\nUPDATE:\n  UPDATE users SET name = :name, age = :age WHERE id = :__where\n\nDELETE:\n  DELETE FROM users WHERE id = :val`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">動的条件の組み立て</h2>
        <p className="text-gray-400 mb-4">
          クエリビルダーの真価は検索フォームなど条件が動的に変わる場合に発揮されます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass QueryBuilder {\n    private string $table = '';\n    private array $conditions = [];\n    private array $params = [];\n    private ?int $limitVal = null;\n\n    public function from(string $t): static { $this->table = $t; return $this; }\n    public function limit(int $n): static { $this->limitVal = $n; return $this; }\n\n    public function when(bool $condition, callable $callback): static {\n        if ($condition) $callback($this);\n        return $this;\n    }\n\n    public function where(string $col, string $op, mixed $val): static {\n        $key = $col . count($this->conditions);\n        $this->conditions[] = "{$col} {$op} :{$key}";\n        $this->params[$key]  = $val;\n        return $this;\n    }\n\n    public function toSql(): string {\n        $sql = "SELECT * FROM {$this->table}";\n        if ($this->conditions) $sql .= " WHERE " . implode(" AND ", $this->conditions);\n        if ($this->limitVal !== null) $sql .= " LIMIT {$this->limitVal}";\n        return $sql;\n    }\n}\n\n// 検索フォームからのパラメータ\n$filters = ['keyword' => 'PHP', 'min_age' => 20, 'max_age' => null, 'active' => true];\n\n$qb = (new QueryBuilder())->from('users')\n    ->when(!empty($filters['keyword']),  fn($q) => $q->where('name', 'LIKE', '%' . $filters['keyword'] . '%'))\n    ->when($filters['min_age'] !== null, fn($q) => $q->where('age', '>=', $filters['min_age']))\n    ->when($filters['max_age'] !== null, fn($q) => $q->where('age', '<=', $filters['max_age']))\n    ->when($filters['active'],           fn($q) => $q->where('active', '=', 1))\n    ->limit(20);\n\necho "生成SQL:\\n" . $qb->toSql();`}
          expectedOutput={`生成SQL:\nSELECT * FROM users WHERE name LIKE :name0 AND age >= :age1 AND active = :active2 LIMIT 20`}
        />
      </section>

      <LessonCompleteButton lessonId="query-builder" categoryId="database" />
      <LessonNav lessons={lessons} currentId="query-builder" basePath="/learn/database" />
    </div>
  );
}
