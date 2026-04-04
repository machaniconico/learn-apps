import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "aggregation")!.lessons;

export default function HavingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">集約関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HAVING句</h1>
        <p className="text-gray-400">グループ化後の集計結果に条件を指定する HAVING 句の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HAVINGとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          HAVING句はGROUP BYでグループ化した後の集計結果に条件を指定します。
          WHEREが行単位のフィルタリングであるのに対し、HAVINGはグループ単位のフィルタリングです。
          例えば「社員数が2人以上の部署」「平均給与が40万円以上の部署」などの条件を指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">HAVING 集約条件</code> — グループへの条件指定</li>
          <li>WHEREはGROUP BY前、HAVINGはGROUP BY後に評価される</li>
          <li>HAVING句には集約関数を使える（WHEREには使えない）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">WHERE と HAVING の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WHERE と HAVING は似ていますが、評価されるタイミングが異なります。
          WHERE はグループ化前に個別の行をフィルタリングします。
          HAVING はグループ化後に集計結果をフィルタリングします。
          両方を組み合わせて使うことも可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>WHERE: 行レベルのフィルタ（集約関数は使えない）</li>
          <li>HAVING: グループレベルのフィルタ（集約関数が使える）</li>
          <li>組み合わせ: <code className="text-blue-300">WHERE 行条件 ... GROUP BY ... HAVING グループ条件</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 社員数が2人以上の部署</h2>
        <SqlEditor
          defaultCode={`-- 社員が2人以上いる部署のみ表示
SELECT department, COUNT(*) AS 社員数
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);
INSERT INTO employees VALUES (6, '伊藤健二', '開発', 420000);`}
          expectedOutput={`department | 社員数
-----------+-------
営業        | 2
開発        | 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 平均給与が40万円以上の部署</h2>
        <SqlEditor
          defaultCode={`SELECT
  department AS 部署,
  COUNT(*) AS 人数,
  ROUND(AVG(salary), 0) AS 平均給与
FROM employees
GROUP BY department
HAVING AVG(salary) >= 400000
ORDER BY 平均給与 DESC;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);
INSERT INTO employees VALUES (6, '伊藤健二', '開発', 420000);`}
          expectedOutput={`部署 | 人数 | 平均給与
----+----+--------
開発  | 3  | 490000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: WHERE と HAVING の組み合わせ</h2>
        <SqlEditor
          defaultCode={`-- 開発・営業部門の中で、平均給与が35万円以上の部署
SELECT
  department AS 部署,
  COUNT(*) AS 人数,
  ROUND(AVG(salary), 0) AS 平均給与
FROM employees
WHERE department IN ('開発', '営業')
GROUP BY department
HAVING AVG(salary) >= 350000;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);
INSERT INTO employees VALUES (6, '伊藤健二', '開発', 420000);`}
          expectedOutput={`部署 | 人数 | 平均給与
----+----+--------
開発  | 3  | 490000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aggregation" lessonId="having" />
      </div>
      <LessonNav lessons={lessons} currentId="having" basePath="/learn/aggregation" />
    </div>
  );
}
