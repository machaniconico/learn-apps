import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "normalization")!.lessons;

export default function ThirdNfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">正規化 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">第3正規形</h1>
        <p className="text-gray-400">推移的関数従属を排除してデータの一貫性を高める</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">第3正規形とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          第3正規形（3NF）は2NFを満たした上で、非キー属性が他の非キー属性に依存しない状態です。
          たとえば「社員ID → 部署ID → 部署名」のように、主キー以外の経路で決まる属性（推移的関数従属）が存在すると3NF違反になります。
          3NFに変換することで、部署名の変更を1か所だけ修正すれば済むようになります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">推移的関数従属</code> — 非キー属性Aが非キー属性Bを経由して主キーに依存</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">3NF条件</code> — 非キー属性はすべて主キーにのみ直接依存</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">解決策</code> — 推移的に依存する属性を別テーブルに移す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">推移的関数従属の具体例</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          社員テーブルに「社員ID、氏名、部署ID、部署名」がある場合、
          部署名は部署IDから決まります（社員IDを経由する必要がない）。
          これが推移的関数従属です。部署名を変更するたびに全社員行を更新しなければならず、不整合が起きやすくなります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 3NF違反テーブルの確認</h2>
        <SqlEditor
          defaultCode={`-- dept_name は dept_id に依存 → 推移的関数従属 → 3NF違反
SELECT * FROM employees_bad;`}
          setupSql={`CREATE TABLE employees_bad (
  emp_id INTEGER PRIMARY KEY,
  name TEXT,
  dept_id INTEGER,
  dept_name TEXT
);
INSERT INTO employees_bad VALUES (1, '田中太郎', 10, '開発部');
INSERT INTO employees_bad VALUES (2, '鈴木花子', 20, '営業部');
INSERT INTO employees_bad VALUES (3, '佐藤一郎', 10, '開発部');`}
          expectedOutput={`emp_id | name     | dept_id | dept_name
-------+----------+---------+----------
1      | 田中太郎  | 10      | 開発部
2      | 鈴木花子  | 20      | 営業部
3      | 佐藤一郎  | 10      | 開発部`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 3NFに変換したテーブル</h2>
        <SqlEditor
          defaultCode={`-- 部署情報を別テーブルに分離
SELECT e.emp_id, e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;`}
          setupSql={`CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT);
CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER);
INSERT INTO departments VALUES (10, '開発部'), (20, '営業部');
INSERT INTO employees VALUES (1, '田中太郎', 10), (2, '鈴木花子', 20), (3, '佐藤一郎', 10);`}
          expectedOutput={`emp_id | name     | dept_name
-------+----------+----------
1      | 田中太郎  | 開発部
2      | 鈴木花子  | 営業部
3      | 佐藤一郎  | 開発部`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 部署名変更が1か所で済むことを確認</h2>
        <SqlEditor
          defaultCode={`-- 部署名を変えても employees テーブルは触らなくてよい
UPDATE departments SET dept_name = 'エンジニアリング部' WHERE dept_id = 10;
SELECT e.name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.dept_id;`}
          setupSql={`CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT);
CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER);
INSERT INTO departments VALUES (10, '開発部'), (20, '営業部');
INSERT INTO employees VALUES (1, '田中太郎', 10), (2, '鈴木花子', 20), (3, '佐藤一郎', 10);`}
          expectedOutput={`name     | dept_name
---------+-------------------
田中太郎  | エンジニアリング部
鈴木花子  | 営業部
佐藤一郎  | エンジニアリング部`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="normalization" lessonId="third-nf" />
      </div>
      <LessonNav lessons={lessons} currentId="third-nf" basePath="/learn/normalization" />
    </div>
  );
}
