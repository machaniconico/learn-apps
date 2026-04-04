import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DATABASE_LESSONS } from "@/lib/lessons-data";

export default function SQLLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">データベース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SQL入門</h1>
        <p className="text-gray-400">データの作成・取得・更新・削除をSQLで操作しよう</p>
      </div>

      {/* テーブルの作成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">テーブルの作成（CREATE TABLE）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データを保存する前に、まず<strong className="text-cyan-400">テーブル</strong>を定義します。
          テーブルには列名、データ型、制約（NOT NULL、UNIQUE など）を指定します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- ユーザーテーブルの作成
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,        -- 自動採番の主キー
  name      VARCHAR(100) NOT NULL,     -- 名前（100文字以内、必須）
  email     VARCHAR(255) UNIQUE NOT NULL, -- メール（一意、必須）
  age       INTEGER,                   -- 年齢（省略可能）
  created_at TIMESTAMP DEFAULT NOW()   -- 作成日時（デフォルト: 現在）
);

-- 投稿テーブルの作成
CREATE TABLE posts (
  id        SERIAL PRIMARY KEY,
  user_id   INTEGER NOT NULL REFERENCES users(id), -- 外部キー
  title     VARCHAR(200) NOT NULL,
  body      TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          主なデータ型: <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">INTEGER</code>（整数）、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">VARCHAR(n)</code>（可変長文字列）、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">TEXT</code>（長文テキスト）、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">BOOLEAN</code>（真偽値）、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">TIMESTAMP</code>（日時）
        </p>
      </section>

      {/* データの挿入 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">データの挿入（INSERT）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT INTO</code> で新しいレコードを追加します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- 1件ずつ挿入
INSERT INTO users (name, email, age)
VALUES ('田中太郎', 'tanaka@example.com', 28);

INSERT INTO users (name, email, age)
VALUES ('鈴木花子', 'suzuki@example.com', 24);

-- 複数件を一度に挿入
INSERT INTO users (name, email, age) VALUES
  ('佐藤一郎', 'sato@example.com', 32),
  ('山田美咲', 'yamada@example.com', 27),
  ('高橋健一', 'takahashi@example.com', 35);

-- 投稿の挿入
INSERT INTO posts (user_id, title, body, published) VALUES
  (1, 'はじめまして', '最初の投稿です。', true),
  (1, 'SQLを学んでいます', 'データベースは面白い！', true),
  (2, '自己紹介', '鈴木花子です。', true),
  (3, '下書き投稿', 'まだ公開しません。', false);`}</code>
        </pre>
      </section>

      {/* データの取得 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">データの取得（SELECT）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">SELECT</code> はデータベースで最もよく使う命令です。
          条件の絞り込み、並び替え、件数制限を組み合わせてデータを取得します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- 全件取得
SELECT * FROM users;

-- 特定のカラムだけ取得
SELECT name, email FROM users;

-- WHERE で条件を絞る
SELECT * FROM users WHERE age >= 30;
SELECT * FROM users WHERE name = '田中太郎';
SELECT * FROM users WHERE age BETWEEN 25 AND 30;
SELECT * FROM users WHERE email LIKE '%@example.com';

-- AND / OR で複数条件
SELECT * FROM users WHERE age >= 25 AND age <= 30;
SELECT * FROM users WHERE name = '田中太郎' OR name = '鈴木花子';

-- ORDER BY で並び替え
SELECT * FROM users ORDER BY age ASC;        -- 年齢の昇順
SELECT * FROM users ORDER BY created_at DESC; -- 作成日時の降順

-- LIMIT / OFFSET でページネーション
SELECT * FROM users ORDER BY id LIMIT 10;           -- 先頭10件
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 10; -- 11件目から10件`}</code>
        </pre>
      </section>

      {/* UPDATE と DELETE */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">データの更新と削除（UPDATE / DELETE）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">UPDATE</code> で既存データを変更し、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE</code> でデータを削除します。
          <strong className="text-red-400">WHERE 句を忘れると全レコードが対象になるので注意！</strong>
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- 特定ユーザーのメールを更新
UPDATE users SET email = 'new-tanaka@example.com' WHERE id = 1;

-- 複数カラムを同時に更新
UPDATE users SET name = '田中太郎（更新）', age = 29 WHERE id = 1;

-- 条件に一致するレコードを削除
DELETE FROM users WHERE id = 5;

-- 注意: WHERE を忘れると全件削除！
-- DELETE FROM users;  ← 全レコード削除されてしまう！

-- テーブルごと削除
-- DROP TABLE posts;   ← テーブル自体が消える`}</code>
        </pre>
      </section>

      {/* JOIN */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">テーブルの結合（JOIN）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のテーブルを結合して、関連するデータをまとめて取得します。
          JOIN は RDB の最も強力な機能の一つです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- INNER JOIN: 両方にデータがある行のみ取得
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN: 左テーブルの全行 + 右の一致する行
-- 投稿がないユーザーも取得される（posts側はNULL）
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;

-- RIGHT JOIN: 右テーブルの全行 + 左の一致する行
SELECT users.name, posts.title
FROM users
RIGHT JOIN posts ON users.id = posts.user_id;

-- エイリアスを使うと読みやすい
SELECT u.name AS user_name, p.title AS post_title, p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.published = true
ORDER BY p.created_at DESC;`}</code>
        </pre>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">INNER JOIN</h3>
            <p className="text-sm text-gray-400">両方のテーブルに一致するデータのみ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">LEFT JOIN</h3>
            <p className="text-sm text-gray-400">左テーブルのデータは全て含む</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">RIGHT JOIN</h3>
            <p className="text-sm text-gray-400">右テーブルのデータは全て含む</p>
          </div>
        </div>
      </section>

      {/* GROUP BY と集計関数 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">GROUP BY と集計関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">GROUP BY</code> でデータをグループ化し、
          集計関数で合計・平均・件数などを計算します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- 主な集計関数
SELECT COUNT(*) FROM users;                    -- 総レコード数
SELECT AVG(age) FROM users;                     -- 年齢の平均
SELECT MAX(age), MIN(age) FROM users;          -- 最大値と最小値
SELECT SUM(age) FROM users;                     -- 合計

-- GROUP BY: ユーザーごとの投稿数
SELECT u.name, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
ORDER BY post_count DESC;

-- HAVING: グループ化した結果にさらに条件
-- 投稿が2件以上のユーザーだけ表示
SELECT u.name, COUNT(p.id) AS post_count
FROM users u
INNER JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) >= 2;

-- 月別の投稿数集計
SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS post_count
FROM posts
WHERE published = true
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>CREATE TABLE</strong> でテーブルを定義し、データ型と制約を設定する</li>
          <li><strong>INSERT</strong> で新しいレコードを追加する</li>
          <li><strong>SELECT</strong> で WHERE、ORDER BY、LIMIT を組み合わせてデータを取得する</li>
          <li><strong>UPDATE / DELETE</strong> でデータを変更・削除する（WHERE 句を忘れずに）</li>
          <li><strong>JOIN</strong> で複数テーブルを結合して関連データをまとめて取得する</li>
          <li><strong>GROUP BY</strong> と集計関数（COUNT、AVG、SUM）でデータを分析する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="database" lessonId="sql" color="cyan" />
      <LessonNav lessons={DATABASE_LESSONS} currentId="sql" basePath="/learn/database" color="cyan" />
    </div>
  );
}
