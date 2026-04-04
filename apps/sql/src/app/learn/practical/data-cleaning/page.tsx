import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "practical")!.lessons;

export default function DataCleaningPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">実践SQL レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データクレンジング</h1>
        <p className="text-gray-400">不整合データの検出・修正・重複排除を行う実践的なSQL</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">データクレンジングとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データクレンジング（データクリーニング）とは、データの不整合・欠損・重複・フォーマット違いなどを
          検出して修正するプロセスです。
          分析の精度はデータ品質に大きく依存するため、クレンジングはデータ活用の前提となる重要な作業です。
          SQLを使えばNULL処理・文字列正規化・重複排除・外れ値検出を効率的に行えます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">TRIM / UPPER / LOWER</code> — 文字列の正規化</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">COALESCE / NULLIF</code> — NULL値の置換と検出</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ROW_NUMBER + 重複排除</code> — 重複行を特定して削除</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 文字列の正規化（余白・大小文字）</h2>
        <SqlEditor
          defaultCode={`-- 前後の空白を除去してメールアドレスを小文字に統一
SELECT id, name,
       TRIM(LOWER(email)) AS email_clean
FROM users_dirty
WHERE TRIM(email) != '' AND email IS NOT NULL;`}
          setupSql={`CREATE TABLE users_dirty (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users_dirty VALUES (1,'田中太郎','  Tanaka@Example.COM  ');
INSERT INTO users_dirty VALUES (2,'鈴木花子','SUZUKI@example.com');
INSERT INTO users_dirty VALUES (3,'佐藤次郎','');
INSERT INTO users_dirty VALUES (4,'山田一郎',NULL);
INSERT INTO users_dirty VALUES (5,'伊藤花子','  ito@example.com');`}
          expectedOutput={`id | name     | email_clean
---+----------+--------------------
1  | 田中太郎  | tanaka@example.com
2  | 鈴木花子  | suzuki@example.com
5  | 伊藤花子  | ito@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 重複行の検出と排除</h2>
        <SqlEditor
          defaultCode={`-- 同一メールアドレスの重複ユーザーを検出し、最新IDだけ残す
WITH ranked AS (
  SELECT id, name, email,
         ROW_NUMBER() OVER (PARTITION BY LOWER(TRIM(email)) ORDER BY id DESC) AS rn
  FROM users
)
SELECT id, name, email FROM ranked WHERE rn = 1
ORDER BY id;`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users VALUES (1,'田中太郎','tanaka@example.com');
INSERT INTO users VALUES (2,'田中 太郎','Tanaka@example.com');
INSERT INTO users VALUES (3,'鈴木花子','suzuki@example.com');
INSERT INTO users VALUES (4,'鈴木 花子','suzuki@example.com');
INSERT INTO users VALUES (5,'佐藤次郎','sato@example.com');`}
          expectedOutput={`id | name     | email
---+----------+--------------------
2  | 田中 太郎 | Tanaka@example.com
4  | 鈴木 花子 | suzuki@example.com
5  | 佐藤次郎  | sato@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 外れ値の検出と修正</h2>
        <SqlEditor
          defaultCode={`-- 平均から3標準偏差以上離れた外れ値を検出
WITH stats AS (
  SELECT AVG(amount) AS avg_amt,
         AVG(amount * amount) - AVG(amount) * AVG(amount) AS variance
  FROM transactions
),
with_zscore AS (
  SELECT t.id, t.amount,
         ROUND(ABS(t.amount - s.avg_amt) / SQRT(s.variance), 2) AS zscore
  FROM transactions t, stats s
)
SELECT id, amount, zscore
FROM with_zscore
WHERE zscore > 2.0
ORDER BY zscore DESC;`}
          setupSql={`CREATE TABLE transactions (id INTEGER PRIMARY KEY, amount INTEGER);
INSERT INTO transactions VALUES (1,1000),(2,1200),(3,950),(4,1100),(5,1050),(6,980),(7,99999),(8,1150),(9,1080),(10,-500);`}
          expectedOutput={`id | amount | zscore
---+--------+-------
7  | 99999  | 3.14
10 | -500   | 2.05`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="practical" lessonId="data-cleaning" />
      </div>
      <LessonNav lessons={lessons} currentId="data-cleaning" basePath="/learn/practical" />
    </div>
  );
}
