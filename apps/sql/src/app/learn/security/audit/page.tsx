import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "security")!.lessons;

export default function AuditPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">セキュリティ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">監査ログ</h1>
        <p className="text-gray-400">データベース操作の記録と追跡で不正アクセスを検出する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">監査ログとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          監査ログとは、誰がいつ何をしたかを記録したデータです。
          データベースレベルでは、重要なテーブルへのINSERT・UPDATE・DELETE操作をトリガーで自動記録します。
          インシデント発生時の原因調査、コンプライアンス要件の達成、不正アクセスの検出に不可欠です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">監査テーブル</code> — 操作ログを格納する専用テーブル</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">トリガー</code> — 操作を自動的に監査テーブルに記録</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">変更前後の値</code> — OLD/NEW擬似レコードで変更内容を保存</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 監査ログテーブルの構造</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM audit_log ORDER BY logged_at DESC;`}
          setupSql={`CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL CHECK(operation IN ('INSERT','UPDATE','DELETE')),
  user_name TEXT,
  old_value TEXT,
  new_value TEXT,
  logged_at TEXT DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO audit_log VALUES (1,'users','INSERT','tanaka',NULL,'{"name":"田中太郎"}','2024-01-10 09:00:00');
INSERT INTO audit_log VALUES (2,'users','UPDATE','admin','{"email":"old@example.com"}','{"email":"new@example.com"}','2024-01-11 14:30:00');
INSERT INTO audit_log VALUES (3,'orders','DELETE','tanaka','{"id":5,"total":99999}',NULL,'2024-01-12 16:00:00');`}
          expectedOutput={`id | table_name | operation | user_name | old_value                    | new_value                    | logged_at
---+------------+-----------+-----------+------------------------------+------------------------------+--------------------
3  | orders     | DELETE    | tanaka    | {"id":5,"total":99999}       | NULL                         | 2024-01-12 16:00:00
2  | users      | UPDATE    | admin     | {"email":"old@example.com"}  | {"email":"new@example.com"}  | 2024-01-11 14:30:00
1  | users      | INSERT    | tanaka    | NULL                         | {"name":"田中太郎"}           | 2024-01-10 09:00:00`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 不審な操作パターンを検出</h2>
        <SqlEditor
          defaultCode={`-- 短時間に大量のDELETE操作を行ったユーザーを検出
SELECT user_name, COUNT(*) AS delete_count
FROM audit_log
WHERE operation = 'DELETE'
  AND logged_at >= '2024-01-12 00:00:00'
GROUP BY user_name
HAVING COUNT(*) >= 2
ORDER BY delete_count DESC;`}
          setupSql={`CREATE TABLE audit_log (id INTEGER PRIMARY KEY, table_name TEXT, operation TEXT, user_name TEXT, logged_at TEXT);
INSERT INTO audit_log VALUES (1,'orders','DELETE','tanaka','2024-01-12 10:00:00');
INSERT INTO audit_log VALUES (2,'orders','DELETE','tanaka','2024-01-12 10:01:00');
INSERT INTO audit_log VALUES (3,'orders','DELETE','tanaka','2024-01-12 10:02:00');
INSERT INTO audit_log VALUES (4,'users','UPDATE','admin','2024-01-12 11:00:00');
INSERT INTO audit_log VALUES (5,'products','DELETE','suzuki','2024-01-12 12:00:00');`}
          expectedOutput={`user_name | delete_count
----------+-------------
tanaka    | 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 特定期間の操作履歴レポート</h2>
        <SqlEditor
          defaultCode={`-- 操作種別ごとの集計レポート
SELECT operation, table_name, COUNT(*) AS count,
       MIN(logged_at) AS first_op, MAX(logged_at) AS last_op
FROM audit_log
GROUP BY operation, table_name
ORDER BY count DESC;`}
          setupSql={`CREATE TABLE audit_log (id INTEGER PRIMARY KEY, table_name TEXT, operation TEXT, user_name TEXT, logged_at TEXT);
INSERT INTO audit_log VALUES (1,'orders','INSERT','app','2024-01-10 09:00:00');
INSERT INTO audit_log VALUES (2,'orders','INSERT','app','2024-01-10 10:00:00');
INSERT INTO audit_log VALUES (3,'orders','INSERT','app','2024-01-11 09:00:00');
INSERT INTO audit_log VALUES (4,'orders','UPDATE','admin','2024-01-11 14:00:00');
INSERT INTO audit_log VALUES (5,'users','INSERT','admin','2024-01-12 09:00:00');
INSERT INTO audit_log VALUES (6,'orders','DELETE','tanaka','2024-01-12 10:00:00');`}
          expectedOutput={`operation | table_name | count | first_op            | last_op
----------+------------+-------+---------------------+--------------------
INSERT    | orders     | 3     | 2024-01-10 09:00:00 | 2024-01-11 09:00:00
DELETE    | orders     | 1     | 2024-01-12 10:00:00 | 2024-01-12 10:00:00
UPDATE    | orders     | 1     | 2024-01-11 14:00:00 | 2024-01-11 14:00:00
INSERT    | users      | 1     | 2024-01-12 09:00:00 | 2024-01-12 09:00:00`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="security" lessonId="audit" />
      </div>
      <LessonNav lessons={lessons} currentId="audit" basePath="/learn/security" />
    </div>
  );
}
