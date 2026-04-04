import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "filtering")!.lessons;

export default function LikePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データの絞り込み レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">LIKE演算子</h1>
        <p className="text-gray-400">% と _ を使ったパターンマッチングによる文字列検索を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LIKE演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LIKE演算子は文字列のパターンマッチングを行います。
          完全一致ではなく「〜で始まる」「〜を含む」「〜で終わる」といった曖昧な条件でフィルタリングできます。
          メールアドレスの検索や名前の部分一致検索など、幅広い場面で使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">%</code> — 0文字以上の任意の文字列にマッチ</li>
          <li><code className="text-blue-300">_</code> — 任意の1文字にマッチ</li>
          <li><code className="text-blue-300">NOT LIKE</code> — パターンに一致しない行を返す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パターンの使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">%</code> は0文字以上の任意の文字列に一致するワイルドカードです。
          <code className="text-blue-300">_</code> はちょうど1文字に一致します。
          これらを組み合わせることで様々なパターンを表現できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">LIKE '田%'</code> — 「田」で始まる文字列</li>
          <li><code className="text-blue-300">LIKE '%太郎'</code> — 「太郎」で終わる文字列</li>
          <li><code className="text-blue-300">LIKE '%中%'</code> — 「中」を含む文字列</li>
          <li><code className="text-blue-300">LIKE '田_'</code> — 「田」の後に1文字が続く文字列</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 前方一致（〜で始まる）</h2>
        <SqlEditor
          defaultCode={`-- 「田」で始まる名前のユーザーを検索
SELECT * FROM users WHERE name LIKE '田%';`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 'suzuki@example.com');
INSERT INTO users VALUES (3, '田辺一郎', 'tanabe@example.com');
INSERT INTO users VALUES (4, '山田次郎', 'yamada@example.com');
INSERT INTO users VALUES (5, '田村美咲', 'tamura@example.com');`}
          expectedOutput={`id | name     | email
---+----------+--------------------
1  | 田中太郎  | tanaka@example.com
3  | 田辺一郎  | tanabe@example.com
5  | 田村美咲  | tamura@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部分一致（〜を含む）</h2>
        <SqlEditor
          defaultCode={`-- メールアドレスに「gmail」を含むユーザー
SELECT name, email FROM users WHERE email LIKE '%gmail%';`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 'suzuki@gmail.com');
INSERT INTO users VALUES (3, '佐藤一郎', 'sato@gmail.com');
INSERT INTO users VALUES (4, '山田次郎', 'yamada@yahoo.co.jp');`}
          expectedOutput={`name     | email
---------+------------------
鈴木花子  | suzuki@gmail.com
佐藤一郎  | sato@gmail.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: アンダースコアで文字数を指定</h2>
        <SqlEditor
          defaultCode={`-- 「T」で始まり、その後ちょうど5文字続く商品コード
SELECT * FROM products WHERE code LIKE 'T_____';`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, code TEXT);
INSERT INTO products VALUES (1, 'りんご', 'T12345');
INSERT INTO products VALUES (2, 'バナナ', 'T9876');
INSERT INTO products VALUES (3, '牛乳', 'T00001');
INSERT INTO products VALUES (4, 'チーズ', 'A12345');
INSERT INTO products VALUES (5, 'みかん', 'T000001');`}
          expectedOutput={`id | name   | code
---+--------+--------
1  | りんご  | T12345
3  | 牛乳    | T00001`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="filtering" lessonId="like" />
      </div>
      <LessonNav lessons={lessons} currentId="like" basePath="/learn/filtering" />
    </div>
  );
}
