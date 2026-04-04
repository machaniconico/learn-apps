import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "update")!.lessons;

export default function CaseUpdatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">データ更新 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CASE式更新</h1>
        <p className="text-gray-400">条件分岐による値の更新 — 行ごとに異なる値に更新する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CASE式をSETに使う</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SET句でCASE式を使うと、行の値に応じて異なる更新値を設定できます。
          複数のUPDATE文を1つにまとめられるため効率的で読みやすくなります。
          「価格帯に応じてカテゴリを変える」「スコアに応じてランクを付ける」といった場面で活躍します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">SET col = CASE WHEN ... THEN ... ELSE ... END</code></li>
          <li><span className="text-yellow-400">複数カラム</span> — 複数のSET句でそれぞれCASEを使える</li>
          <li><span className="text-yellow-400">ELSE省略</span> — 省略するとNULLになるため注意</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数UPDATEとの比較</h2>
        <p className="text-gray-300 leading-relaxed">
          条件ごとに個別のUPDATE文を書くと複数回テーブルをスキャンしますが、
          CASE式なら1回のスキャンで済みます。
          大きなテーブルでのバッチ更新に特に効果的です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 価格帯でカテゴリ分類を更新</h2>
        <SqlEditor
          defaultCode={`UPDATE products
SET tier = CASE
  WHEN price < 5000 THEN '低価格'
  WHEN price < 50000 THEN '中価格'
  ELSE '高価格'
END;

SELECT name, price, tier FROM products;`}
          expectedOutput={`name       | price  | tier
-----------|--------|------
ノートPC   | 120000 | 高価格
マウス     | 3000   | 低価格
キーボード | 8000   | 中価格
モニター   | 45000  | 中価格`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT, tier TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器', NULL), (2, 'マウス', 3000, 'PC周辺機器', NULL), (3, 'キーボード', 8000, 'PC周辺機器', NULL), (4, 'モニター', 45000, 'ディスプレイ', NULL);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: スコアに基づいてランクを付ける</h2>
        <SqlEditor
          defaultCode={`UPDATE students
SET grade = CASE
  WHEN score >= 90 THEN 'A'
  WHEN score >= 70 THEN 'B'
  WHEN score >= 50 THEN 'C'
  ELSE 'D'
END;

SELECT name, score, grade FROM students;`}
          expectedOutput={`name       | score | grade
-----------|-------|------
田中太郎   | 95    | A
鈴木花子   | 72    | B
佐藤次郎   | 55    | C
高橋一郎   | 42    | D`}
          setupSql={`CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, score INTEGER, grade TEXT);
INSERT INTO students VALUES (1, '田中太郎', 95, NULL), (2, '鈴木花子', 72, NULL), (3, '佐藤次郎', 55, NULL), (4, '高橋一郎', 42, NULL);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数カラムを同時にCASEで更新</h2>
        <SqlEditor
          defaultCode={`UPDATE employees
SET
  level = CASE WHEN salary >= 400000 THEN 'シニア' ELSE 'ジュニア' END,
  bonus = CASE WHEN salary >= 400000 THEN salary * 0.2 ELSE salary * 0.1 END;

SELECT name, salary, level, bonus FROM employees;`}
          expectedOutput={`name       | salary | level   | bonus
-----------|--------|---------|-------
田中太郎   | 450000 | シニア  | 90000
鈴木花子   | 350000 | ジュニア | 35000
佐藤次郎   | 420000 | シニア  | 84000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, level TEXT, bonus INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', 450000, NULL, NULL), (2, '鈴木花子', 350000, NULL, NULL), (3, '佐藤次郎', 420000, NULL, NULL);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="update" lessonId="case-update" />
      </div>
      <LessonNav lessons={lessons} currentId="case-update" basePath="/learn/update" />
    </div>
  );
}
