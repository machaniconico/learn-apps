import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "er-diagram")!.lessons;

export default function ErToTablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ER設計 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ER図→テーブル変換</h1>
        <p className="text-gray-400">ER図の設計をDDL（CREATE TABLE）に変換する手順を学ぶ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ER図からDDLへの変換ルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ER図をテーブルに変換する際は決まったルールに従います。
          エンティティは1つのテーブルになり、属性はカラムになります。
          1対多の関係は「多」側に外部キーを追加し、多対多の関係は中間テーブルを作成します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">エンティティ → テーブル</code> — 各エンティティが1つのテーブルに対応</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">1:N → 外部キー</code> — N側のテーブルに外部キーカラムを追加</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">M:N → 中間テーブル</code> — 両方の主キーを持つ結合テーブルを作成</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変換手順</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          1. エンティティごとにCREATE TABLEを作成する。
          2. 各属性をカラムとして定義し、データ型と制約を設定する。
          3. 1対多リレーションは「多」側に外部キーカラムを追加する。
          4. 多対多リレーションは中間テーブルを作成し、両方の主キーを外部キーとして持たせる。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 1対多リレーションの変換</h2>
        <SqlEditor
          defaultCode={`-- 部署(1) → 社員(N) の変換結果を確認
SELECT e.id, e.name, d.name AS department
FROM employees e
JOIN departments d ON e.dept_id = d.id
ORDER BY d.name, e.name;`}
          setupSql={`-- ER図: Department(1) ----< Employee(N)
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT
);
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept_id INTEGER NOT NULL,
  hire_date TEXT,
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);
INSERT INTO departments VALUES (1,'開発部','東京'),(2,'営業部','大阪');
INSERT INTO employees VALUES (1,'田中',1,'2020-04-01'),(2,'鈴木',1,'2021-04-01'),(3,'佐藤',2,'2019-04-01');`}
          expectedOutput={`id | name | department
---+------+-----------
1  | 田中  | 開発部
2  | 鈴木  | 開発部
3  | 佐藤  | 営業部`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 多対多リレーションの変換</h2>
        <SqlEditor
          defaultCode={`-- タグ付け機能: 記事(M) ←→ タグ(N)
SELECT a.title, GROUP_CONCAT(t.name, ', ') AS tags
FROM articles a
JOIN article_tags at2 ON a.id = at2.article_id
JOIN tags t ON at2.tag_id = t.id
GROUP BY a.id, a.title;`}
          setupSql={`CREATE TABLE articles (id INTEGER PRIMARY KEY, title TEXT);
CREATE TABLE tags (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE article_tags (
  article_id INTEGER,
  tag_id INTEGER,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);
INSERT INTO articles VALUES (1,'SQL入門'),(2,'Python活用');
INSERT INTO tags VALUES (1,'SQL'),(2,'データベース'),(3,'Python'),(4,'初心者向け');
INSERT INTO article_tags VALUES (1,1),(1,2),(1,4),(2,3),(2,4);`}
          expectedOutput={`title      | tags
-----------+-----------------------------
SQL入門    | SQL, データベース, 初心者向け
Python活用 | Python, 初心者向け`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 1対1リレーションの変換</h2>
        <SqlEditor
          defaultCode={`-- ユーザー(1) ----1 プロフィール(1)
SELECT u.username, p.full_name, p.phone
FROM users u
JOIN profiles p ON u.id = p.user_id;`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, created_at TEXT);
CREATE TABLE profiles (
  user_id INTEGER PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO users VALUES (1,'tanaka','2024-01-01'),(2,'suzuki','2024-01-05');
INSERT INTO profiles VALUES (1,'田中太郎','090-1111-2222'),(2,'鈴木花子','080-3333-4444');`}
          expectedOutput={`username | full_name | phone
---------+-----------+--------------
tanaka   | 田中太郎   | 090-1111-2222
suzuki   | 鈴木花子   | 080-3333-4444`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="er-diagram" lessonId="er-to-table" />
      </div>
      <LessonNav lessons={lessons} currentId="er-to-table" basePath="/learn/er-diagram" />
    </div>
  );
}
