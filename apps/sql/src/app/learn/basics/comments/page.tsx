import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">SQLコードにコメントを記述する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">1行コメント: --</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">--</code>（ダブルハイフン）を使うと、その行の残り部分がコメントになります。
          コメントはSQLの実行には影響しません。クエリの説明や、一時的にコードを無効化するために使います。
          ほぼすべてのデータベースでサポートされている標準的な記法です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">-- コメントテキスト</code> — 行末までコメント</li>
          <li>行の途中にも書ける: <code className="text-blue-300">SELECT * FROM users -- ユーザー一覧</code></li>
          <li>コードを一時的に無効化する「コメントアウト」に便利</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数行コメント: /* */</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">/* */</code> を使うと、複数行にわたるコメントを書けます。
          <code className="text-blue-300">/*</code> で開始し、<code className="text-blue-300">*/</code> で終了します。
          長い説明やクエリブロックのタイトルを書くときに使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">{"/* 複数行の コメント */"}</code></li>
          <li>インラインにも使える: <code className="text-blue-300">{"SELECT /* カラム */ name FROM users"}</code></li>
          <li>ネストは不可（/* の中に /* は書けない）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 1行コメントの使い方</h2>
        <SqlEditor
          defaultCode={`-- ユーザーテーブルから全レコードを取得
SELECT * FROM users;

-- 年齢が30歳以上のユーザーを絞り込む（コメントアウト中）
-- SELECT * FROM users WHERE age >= 30;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, age INTEGER);
INSERT INTO users VALUES (1, '田中太郎', 25);
INSERT INTO users VALUES (2, '鈴木花子', 32);
INSERT INTO users VALUES (3, '佐藤一郎', 28);`}
          expectedOutput={`id | name     | age
---+----------+-----
1  | 田中太郎  | 25
2  | 鈴木花子  | 32
3  | 佐藤一郎  | 28`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数行コメントの使い方</h2>
        <SqlEditor
          defaultCode={`/*
  商品一覧取得クエリ
  目的: 全商品の名前と価格を取得する
*/
SELECT
  name,   -- 商品名
  price   -- 価格（税抜）
FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);`}
          expectedOutput={`name   | price
-------+-------
りんご  | 150
バナナ  | 80
牛乳    | 200`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: コメントアウトでクエリを切り替える</h2>
        <SqlEditor
          defaultCode={`-- 全件取得（開発・確認用）
SELECT * FROM users;

/* 本番用: 条件付き取得
SELECT * FROM users
WHERE age >= 20
ORDER BY name;
*/`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, age INTEGER);
INSERT INTO users VALUES (1, '田中太郎', 25);
INSERT INTO users VALUES (2, '鈴木花子', 32);
INSERT INTO users VALUES (3, '佐藤一郎', 17);`}
          expectedOutput={`id | name     | age
---+----------+-----
1  | 田中太郎  | 25
2  | 鈴木花子  | 32
3  | 佐藤一郎  | 17`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
