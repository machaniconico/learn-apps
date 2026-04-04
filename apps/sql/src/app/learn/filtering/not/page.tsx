import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "filtering")!.lessons;

export default function NotPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データの絞り込み レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NOT演算子</h1>
        <p className="text-gray-400">条件を否定するNOT演算子の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NOT演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NOT演算子は条件を反転させます。条件が TRUE なら FALSE に、FALSE なら TRUE になります。
          単独で使う場合は <code className="text-blue-300">WHERE NOT 条件</code> と書きます。
          また、IN・LIKE・BETWEEN・IS NULLなどと組み合わせて使うことが多いです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">NOT 条件</code> — 条件を反転する</li>
          <li><code className="text-blue-300">NOT IN (...)</code> — リストのいずれにも一致しない</li>
          <li><code className="text-blue-300">NOT LIKE 'パターン'</code> — パターンに一致しない</li>
          <li><code className="text-blue-300">NOT BETWEEN 下限 AND 上限</code> — 範囲外</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NOTの優先順位</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NOTはANDよりも高い優先順位を持ちますが、複雑な条件では括弧を使って意図を明確にすることが大切です。
          <code className="text-blue-300">NOT A AND B</code> は <code className="text-blue-300">(NOT A) AND B</code> と解釈されます。
          読みやすさのために積極的に括弧を使いましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>優先順位: NOT &gt; AND &gt; OR</li>
          <li>括弧で優先順位を明示することを推奨</li>
          <li><code className="text-blue-300">NOT (A OR B)</code> は <code className="text-blue-300">NOT A AND NOT B</code> と同等（ド・モルガンの法則）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: NOT LIKEで特定パターンを除外</h2>
        <SqlEditor
          defaultCode={`-- gmailでないメールアドレスのユーザー
SELECT name, email FROM users
WHERE email NOT LIKE '%gmail%';`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 'suzuki@gmail.com');
INSERT INTO users VALUES (3, '佐藤一郎', 'sato@gmail.com');
INSERT INTO users VALUES (4, '山田次郎', 'yamada@yahoo.co.jp');`}
          expectedOutput={`name     | email
---------+--------------------
田中太郎  | tanaka@example.com
山田次郎  | yamada@yahoo.co.jp`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: NOT INで特定部署を除外</h2>
        <SqlEditor
          defaultCode={`-- 営業・経理以外の部署の社員
SELECT name, department FROM employees
WHERE department NOT IN ('営業', '経理');`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);
INSERT INTO employees VALUES (1, '田中太郎', '営業');
INSERT INTO employees VALUES (2, '鈴木花子', '開発');
INSERT INTO employees VALUES (3, '佐藤一郎', '人事');
INSERT INTO employees VALUES (4, '山田次郎', '経理');
INSERT INTO employees VALUES (5, '高橋美咲', '開発');`}
          expectedOutput={`name     | department
---------+-----------
鈴木花子  | 開発
佐藤一郎  | 人事
高橋美咲  | 開発`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: NOT BETWEENで範囲外を取得</h2>
        <SqlEditor
          defaultCode={`-- 給与が30万円〜45万円の範囲外の社員
SELECT name, salary FROM employees
WHERE salary NOT BETWEEN 300000 AND 450000;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 280000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);`}
          expectedOutput={`name     | salary
---------+--------
田中太郎  | 280000
山田次郎  | 600000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="filtering" lessonId="not" />
      </div>
      <LessonNav lessons={lessons} currentId="not" basePath="/learn/filtering" />
    </div>
  );
}
