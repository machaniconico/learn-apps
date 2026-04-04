import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "er-diagram")!.lessons;

export default function CardinalityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ER設計 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カーディナリティ</h1>
        <p className="text-gray-400">1対1・1対多・多対多の関係をテーブル設計に落とし込む</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カーディナリティとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カーディナリティとは、エンティティ間の関係における数の対応を示す概念です。
          1対1（1:1）、1対多（1:N）、多対多（M:N）の3種類があり、それぞれ異なるテーブル設計が必要です。
          正しいカーディナリティを把握することがER設計の核心です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">1対1 (1:1)</code> — 一方が他方に1つだけ対応（例: ユーザー-プロフィール）</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">1対多 (1:N)</code> — 一方が他方に複数対応（例: 顧客-注文）</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">多対多 (M:N)</code> — 両方が複数対応（例: 注文-商品）→ 中間テーブルで実装</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 1対1の関係（ユーザーとプロフィール）</h2>
        <SqlEditor
          defaultCode={`SELECT u.id, u.username, p.bio, p.avatar_url
FROM users u
LEFT JOIN profiles p ON u.id = p.user_id;`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT);
CREATE TABLE profiles (
  user_id INTEGER PRIMARY KEY,
  bio TEXT,
  avatar_url TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO users VALUES (1,'tanaka'),(2,'suzuki'),(3,'sato');
INSERT INTO profiles VALUES (1,'SQLが好きです','https://example.com/a.png'),(2,'データ分析を勉強中','https://example.com/b.png');`}
          expectedOutput={`id | username | bio              | avatar_url
---+----------+------------------+--------------------------
1  | tanaka   | SQLが好きです     | https://example.com/a.png
2  | suzuki   | データ分析を勉強中 | https://example.com/b.png
3  | sato     | NULL             | NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 1対多の関係（部署と社員）</h2>
        <SqlEditor
          defaultCode={`-- 1つの部署に複数の社員が所属
SELECT d.name AS dept, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.dept_id
GROUP BY d.id, d.name;`}
          setupSql={`CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, FOREIGN KEY (dept_id) REFERENCES departments(id));
INSERT INTO departments VALUES (1,'開発部'),(2,'営業部'),(3,'人事部');
INSERT INTO employees VALUES (1,'田中',1),(2,'鈴木',1),(3,'佐藤',1),(4,'山田',2),(5,'伊藤',2);`}
          expectedOutput={`dept  | employee_count
------+---------------
開発部 | 3
営業部 | 2
人事部 | 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 多対多の関係（学生と講座）</h2>
        <SqlEditor
          defaultCode={`-- 1人の学生が複数の講座を受講し、1つの講座に複数の学生が参加
SELECT s.name AS student, c.title AS course
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
ORDER BY s.name, c.title;`}
          setupSql={`CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER, PRIMARY KEY (student_id, course_id));
INSERT INTO students VALUES (1,'田中'),(2,'鈴木'),(3,'佐藤');
INSERT INTO courses VALUES (1,'SQL入門'),(2,'Python基礎'),(3,'データ分析');
INSERT INTO enrollments VALUES (1,1),(1,2),(2,1),(2,3),(3,2),(3,3);`}
          expectedOutput={`student | course
--------+-----------
佐藤    | Python基礎
佐藤    | データ分析
鈴木    | SQL入門
鈴木    | データ分析
田中    | Python基礎
田中    | SQL入門`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="er-diagram" lessonId="cardinality" />
      </div>
      <LessonNav lessons={lessons} currentId="cardinality" basePath="/learn/er-diagram" />
    </div>
  );
}
