import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "delete")!.lessons;

export default function WhereDeletePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">データ削除 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件付き削除</h1>
        <p className="text-gray-400">WHERE句で対象行を限定 — 意図した行だけを安全に削除する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">WHERE句での削除範囲指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WHERE句に様々な条件を使って削除対象を精密に絞り込めます。
          IN・BETWEEN・LIKE・IS NULL などSELECTと同様の条件が使えます。
          複合条件を使えばより細かい制御が可能です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-red-400">IN リスト</span> — DELETE WHERE id IN (1, 2, 3)</li>
          <li><span className="text-red-400">BETWEEN</span> — DELETE WHERE date BETWEEN '2024-01-01' AND '2024-03-31'</li>
          <li><span className="text-red-400">IS NULL</span> — DELETE WHERE email IS NULL</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">誤削除を防ぐコツ</h2>
        <p className="text-gray-300 leading-relaxed">
          削除対象が正しいかを必ずSELECTで確認してから実行してください。
          本番環境では必ずトランザクション内でDELETEを実行し、
          件数・内容を確認してからCOMMITします。
          バックアップがある場合も復元には時間がかかるため慎重に。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: IN演算子で複数行を削除</h2>
        <SqlEditor
          defaultCode={`DELETE FROM products WHERE id IN (2, 3);

SELECT * FROM products;`}
          expectedOutput={`id | name     | price  | category
---|----------|--------|----------
1  | ノートPC | 120000 | PC周辺機器
4  | モニター | 45000  | ディスプレイ`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器'), (4, 'モニター', 45000, 'ディスプレイ');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 日付範囲で古いログを削除</h2>
        <SqlEditor
          defaultCode={`-- 2024年1月以前の古いログを削除
DELETE FROM access_logs
WHERE log_date < '2024-02-01';

SELECT * FROM access_logs ORDER BY log_date;`}
          expectedOutput={`id | user_id | log_date
---|---------|----------
3  | 1       | 2024-02-05
4  | 2       | 2024-02-10`}
          setupSql={`CREATE TABLE access_logs (id INTEGER PRIMARY KEY, user_id INTEGER, log_date TEXT);
INSERT INTO access_logs VALUES (1, 1, '2024-01-10'), (2, 2, '2024-01-25'), (3, 1, '2024-02-05'), (4, 2, '2024-02-10');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: NULL値の行を削除</h2>
        <SqlEditor
          defaultCode={`-- メールアドレスが未登録のユーザーを削除
DELETE FROM users WHERE email IS NULL;

SELECT * FROM users;`}
          expectedOutput={`id | name       | email
---|------------|------------------
1  | 田中太郎   | tanaka@example.com
3  | 佐藤次郎   | sato@example.com`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com'), (2, '鈴木花子', NULL), (3, '佐藤次郎', 'sato@example.com'), (4, '高橋一郎', NULL);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delete" lessonId="where-delete" />
      </div>
      <LessonNav lessons={lessons} currentId="where-delete" basePath="/learn/delete" />
    </div>
  );
}
