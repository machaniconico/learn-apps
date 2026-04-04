import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function AndOrPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">AND・OR演算子</h1>
        <p className="text-gray-400">複数の条件を組み合わせてデータを絞り込む方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">AND演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          AND演算子は、複数の条件をすべて満たす行だけを取得したい場合に使います。
          例えば「年齢が30歳以上かつ開発部門に所属」という条件はANDで結びます。
          すべての条件が真（TRUE）のときのみ行が返されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE 条件1 AND 条件2</code> — 両方の条件を満たす行のみ</li>
          <li>ANDは3つ以上の条件を連結することもできる</li>
          <li>ORよりも優先度が高い（先に評価される）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">OR演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          OR演算子は、複数の条件のいずれか一つでも満たす行を取得したい場合に使います。
          例えば「営業部または人事部に所属」という条件はORで結びます。
          少なくとも一つの条件が真（TRUE）であれば行が返されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE 条件1 OR 条件2</code> — どちらかの条件を満たす行</li>
          <li>ANDとORを混在させる場合は括弧で優先順位を明示する</li>
          <li><code className="text-blue-300">WHERE (条件1 OR 条件2) AND 条件3</code> — 括弧で制御</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ANDで複数条件を指定</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM employees
WHERE department = '開発' AND age >= 30;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', 28, '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', 30, '営業', 380000);`}
          expectedOutput={`id | name     | age | department | salary
---+----------+-----+------------+--------
2  | 鈴木花子  | 32  | 開発        | 450000
4  | 山田次郎  | 45  | 開発        | 600000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ORで複数条件を指定</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM employees
WHERE department = '営業' OR department = '人事';`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', 28, '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', 30, '営業', 380000);`}
          expectedOutput={`id | name     | age | department | salary
---+----------+-----+------------+--------
1  | 田中太郎  | 25  | 営業        | 300000
3  | 佐藤一郎  | 28  | 人事        | 320000
5  | 高橋美咲  | 30  | 営業        | 380000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ANDとORを組み合わせる</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM employees
WHERE (department = '開発' OR department = '営業')
  AND salary >= 380000;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', 28, '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', 30, '営業', 380000);`}
          expectedOutput={`id | name     | age | department | salary
---+----------+-----+------------+--------
2  | 鈴木花子  | 32  | 開発        | 450000
4  | 山田次郎  | 45  | 開発        | 600000
5  | 高橋美咲  | 30  | 営業        | 380000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="and-or" />
      </div>
      <LessonNav lessons={lessons} currentId="and-or" basePath="/learn/basics" />
    </div>
  );
}
