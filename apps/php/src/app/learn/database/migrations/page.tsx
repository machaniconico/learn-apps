import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function MigrationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">マイグレーション</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">マイグレーション</strong>はデータベーススキーマの変更をコードで管理する仕組みです。
            バージョン管理されたマイグレーションファイルにより、チームでスキーマ変更を共有したり、
            ロールバックしたりすることができます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">マイグレーションの概念</h2>
        <p className="text-gray-400 mb-4">
          各マイグレーションはup()（適用）とdown()（ロールバック）のメソッドを持ちます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// マイグレーションの基本構造\ninterface Migration {\n    public function up(): void;   // スキーマを変更\n    public function down(): void; // 変更を元に戻す\n}\n\nclass CreateUsersTable implements Migration {\n    public function up(): void {\n        $sql = "\n            CREATE TABLE users (\n                id         INT AUTO_INCREMENT PRIMARY KEY,\n                name       VARCHAR(100) NOT NULL,\n                email      VARCHAR(255) NOT NULL UNIQUE,\n                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n            )\n        ";\n        echo "実行 (up):\\n" . trim($sql) . "\\n";\n    }\n\n    public function down(): void {\n        echo "実行 (down): DROP TABLE IF EXISTS users\\n";\n    }\n}\n\nclass AddAgeToUsers implements Migration {\n    public function up(): void {\n        echo "実行 (up): ALTER TABLE users ADD COLUMN age INT\\n";\n    }\n\n    public function down(): void {\n        echo "実行 (down): ALTER TABLE users DROP COLUMN age\\n";\n    }\n}\n\n$migrations = [new CreateUsersTable(), new AddAgeToUsers()];\n\necho "=== マイグレーション実行 ===\\n";\nforeach ($migrations as $i => $m) {\n    echo "\\nMigration #" . ($i + 1) . " [" . get_class($m) . "]:\\n";\n    $m->up();\n}`}
          expectedOutput={`=== マイグレーション実行 ===\n\nMigration #1 [CreateUsersTable]:\n実行 (up):\n            CREATE TABLE users (\n                id         INT AUTO_INCREMENT PRIMARY KEY,\n                name       VARCHAR(100) NOT NULL,\n                email      VARCHAR(255) NOT NULL UNIQUE,\n                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n            )\n\nMigration #2 [AddAgeToUsers]:\n実行 (up): ALTER TABLE users ADD COLUMN age INT`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">マイグレーション管理クラス</h2>
        <p className="text-gray-400 mb-4">
          実行済みのマイグレーションをDBに記録して、未実行のものだけを実行する管理クラスを実装します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass Migrator {\n    private array $executed = [];\n    private array $migrations = [];\n\n    public function add(string $name, callable $up, callable $down): void {\n        $this->migrations[$name] = ['up' => $up, 'down' => $down];\n    }\n\n    public function migrate(): void {\n        $pending = array_diff_key($this->migrations, array_flip($this->executed));\n        if (empty($pending)) {\n            echo "実行待ちのマイグレーションはありません\\n";\n            return;\n        }\n        foreach ($pending as $name => $m) {\n            echo "実行中: {$name}\\n";\n            ($m['up'])();\n            $this->executed[] = $name;\n            echo "完了: {$name}\\n";\n        }\n    }\n\n    public function rollback(): void {\n        if (empty($this->executed)) { echo "ロールバック対象なし\\n"; return; }\n        $last = end($this->executed);\n        echo "ロールバック: {$last}\\n";\n        ($this->migrations[$last]['down'])();\n        array_pop($this->executed);\n    }\n\n    public function status(): void {\n        foreach ($this->migrations as $name => $_) {\n            $done = in_array($name, $this->executed) ? '[済]' : '[未]';\n            echo "  {$done} {$name}\\n";\n        }\n    }\n}\n\n$m = new Migrator();\n$m->add('2024_01_create_users',   fn() => print("  CREATE TABLE users\\n"),    fn() => print("  DROP TABLE users\\n"));\n$m->add('2024_02_add_age_column', fn() => print("  ADD COLUMN age\\n"),        fn() => print("  DROP COLUMN age\\n"));\n\n$m->migrate();\necho "\\nステータス:\\n";\n$m->status();\necho "\\nロールバック:\\n";\n$m->rollback();`}
          expectedOutput={`実行中: 2024_01_create_users\n  CREATE TABLE users\n完了: 2024_01_create_users\n実行中: 2024_02_add_age_column\n  ADD COLUMN age\n完了: 2024_02_add_age_column\n\nステータス:\n  [済] 2024_01_create_users\n  [済] 2024_02_add_age_column\n\nロールバック:\nロールバック: 2024_02_add_age_column\n  DROP COLUMN age`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スキーマ変更のSQL例</h2>
        <p className="text-gray-400 mb-4">
          実際のマイグレーションで使われる主なSQL文を確認しましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// よく使われるDDL（Data Definition Language）\n$ddlExamples = [\n    "テーブル作成" => "\nCREATE TABLE products (\n    id          INT AUTO_INCREMENT PRIMARY KEY,\n    name        VARCHAR(200) NOT NULL,\n    price       DECIMAL(10,2) NOT NULL DEFAULT 0,\n    category_id INT,\n    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (category_id) REFERENCES categories(id)\n)",\n    "カラム追加"   => "ALTER TABLE products ADD COLUMN stock INT NOT NULL DEFAULT 0",\n    "カラム変更"   => "ALTER TABLE products MODIFY COLUMN price DECIMAL(12,2)",\n    "カラム削除"   => "ALTER TABLE products DROP COLUMN old_field",\n    "インデックス追加" => "CREATE INDEX idx_products_category ON products(category_id)",\n    "テーブル削除" => "DROP TABLE IF EXISTS products",\n];\n\nforeach ($ddlExamples as $name => $sql) {\n    echo "【{$name}】\\n";\n    echo trim($sql) . "\\n\\n";\n}`}
          expectedOutput={`【テーブル作成】\nCREATE TABLE products (\n    id          INT AUTO_INCREMENT PRIMARY KEY,\n    name        VARCHAR(200) NOT NULL,\n    price       DECIMAL(10,2) NOT NULL DEFAULT 0,\n    category_id INT,\n    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (category_id) REFERENCES categories(id)\n)\n\n【カラム追加】\nALTER TABLE products ADD COLUMN stock INT NOT NULL DEFAULT 0\n\n【カラム変更】\nALTER TABLE products MODIFY COLUMN price DECIMAL(12,2)\n\n【カラム削除】\nALTER TABLE products DROP COLUMN old_field\n\n【インデックス追加】\nCREATE INDEX idx_products_category ON products(category_id)\n\n【テーブル削除】\nDROP TABLE IF EXISTS products`}
        />
      </section>

      <LessonCompleteButton lessonId="migrations" categoryId="database" />
      <LessonNav lessons={lessons} currentId="migrations" basePath="/learn/database" />
    </div>
  );
}
