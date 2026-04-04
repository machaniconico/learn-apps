import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "create-table")!.lessons;

export default function CreateAsSelectPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テーブル作成 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CREATE AS SELECT</h1>
        <p className="text-gray-400">クエリ結果からテーブルを作成する方法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CREATE TABLE AS SELECT</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TABLE ... AS SELECT ...</code> を使うと、
          SELECTクエリの結果をそのまま新しいテーブルとして保存できます。
          カラム定義を書かずにテーブルを作れるため、データのコピーや集計結果の永続化に便利です。
          ただし、制約（PRIMARY KEY等）は引き継がれないため必要であれば別途追加します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TABLE 新テーブル AS SELECT ...</code> — 基本構文</li>
          <li>SELECTの結果のカラム名・型が新テーブルに反映される</li>
          <li>制約・インデックスは引き継がれない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: テーブルのコピー</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  department TEXT,
  salary     REAL
);

INSERT INTO employees VALUES
  (1, '田中太郎', '開発', 550000),
  (2, '佐藤花子', '営業', 480000),
  (3, '鈴木次郎', '開発', 620000),
  (4, '高橋美咲', '人事', 450000);

-- 開発部門のスナップショットを作成
CREATE TABLE dev_employees AS
SELECT * FROM employees WHERE department = '開発';

SELECT * FROM dev_employees;`}
          expectedOutput={`id  name    department  salary
1   田中太郎  開発         550000.0
3   鈴木次郎  開発         620000.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集計結果をテーブルとして保存</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複雑な集計クエリの結果を永続化したい場合にも有効です。
          レポート用の集計テーブルや、頻繁にアクセスするサマリーテーブルを
          事前に作成しておくことで、毎回の集計コストを削減できます。
          定期的な更新が必要な場合は DROP して再作成する運用が一般的です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 集計サマリーテーブルの作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE sales (
  id         INTEGER,
  product    TEXT,
  category   TEXT,
  amount     REAL,
  sale_month TEXT
);

INSERT INTO sales VALUES
  (1, 'ノートPC',  '電子機器', 89800, '2024-01'),
  (2, 'マウス',    '電子機器',  2800, '2024-01'),
  (3, 'デスク',    '家具',     45000, '2024-01'),
  (4, 'ノートPC',  '電子機器', 89800, '2024-02'),
  (5, 'チェア',    '家具',     38000, '2024-02');

-- カテゴリ別月次サマリーを保存
CREATE TABLE sales_summary AS
SELECT
  category,
  sale_month,
  COUNT(*)      AS item_count,
  SUM(amount)   AS total_amount,
  AVG(amount)   AS avg_amount
FROM sales
GROUP BY category, sale_month;

SELECT * FROM sales_summary ORDER BY sale_month, category;`}
          expectedOutput={`category  sale_month  item_count  total_amount  avg_amount
家具       2024-01     1           45000.0       45000.0
電子機器   2024-01     2           92600.0       46300.0
家具       2024-02     1           38000.0       38000.0
電子機器   2024-02     1           89800.0       89800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 空テーブルを構造コピーで作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE original (
  id    INTEGER,
  name  TEXT,
  value REAL
);

INSERT INTO original VALUES (1, 'A', 100), (2, 'B', 200);

-- WHERE 1=0 で構造だけコピー（データなし）
CREATE TABLE backup_structure AS
SELECT * FROM original WHERE 1 = 0;

INSERT INTO backup_structure VALUES (10, 'X', 999);

SELECT 'original' AS tbl, COUNT(*) AS rows FROM original
UNION ALL
SELECT 'backup_structure', COUNT(*) FROM backup_structure;`}
          expectedOutput={`tbl               rows
original          2
backup_structure  1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="create-table" lessonId="create-as-select" />
      </div>
      <LessonNav lessons={lessons} currentId="create-as-select" basePath="/learn/create-table" />
    </div>
  );
}
