import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "security")!.lessons;

export default function GrantRevokePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">セキュリティ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">GRANT・REVOKE</h1>
        <p className="text-gray-400">データベースユーザーへの権限付与と取り消しを管理する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GRANT・REVOKEとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GRANTはデータベースオブジェクト（テーブル・ビュー等）に対する操作権限をユーザーに付与するコマンドです。
          REVOKEはその反対で、権限を取り消します。
          最小権限の原則（Principle of Least Privilege）に基づき、必要最小限の権限だけを付与することがセキュリティの基本です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">GRANT SELECT ON table TO user</code> — 読み取り権限を付与</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">GRANT INSERT, UPDATE ON table TO user</code> — 書き込み権限を付与</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">REVOKE SELECT ON table FROM user</code> — 権限を取り消す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">権限の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLの権限には SELECT（読み取り）、INSERT（挿入）、UPDATE（更新）、DELETE（削除）、
          CREATE（オブジェクト作成）、DROP（オブジェクト削除）、ALL PRIVILEGES（全権限）などがあります。
          一般的なアプリケーションユーザーにはSELECT・INSERT・UPDATE・DELETEのみを付与し、
          DDL操作（CREATE・DROP）は管理者ユーザーだけに限定するのがベストプラクティスです。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 読み取り専用権限の付与（擬似実装）</h2>
        <SqlEditor
          defaultCode={`-- ビューを使って読み取り専用アクセスを模擬
-- (SQLiteではGRANT文は未サポートのためビューで代替)
CREATE VIEW public_products AS
SELECT id, name, price FROM products;
SELECT * FROM public_products;`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY, name TEXT, price INTEGER,
  cost INTEGER, supplier_secret TEXT
);
INSERT INTO products VALUES (1,'ノートPC',120000,80000,'秘密情報A');
INSERT INTO products VALUES (2,'マウス',3000,1500,'秘密情報B');`}
          expectedOutput={`id | name    | price
---+---------+-------
1  | ノートPC | 120000
2  | マウス   | 3000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 権限に基づいたアクセス制御の確認</h2>
        <SqlEditor
          defaultCode={`-- 権限テーブルを使ったアクセス制御の模擬
SELECT p.resource, p.action
FROM user_permissions p
WHERE p.username = 'app_user'
ORDER BY p.resource, p.action;`}
          setupSql={`CREATE TABLE user_permissions (
  username TEXT, resource TEXT, action TEXT,
  PRIMARY KEY (username, resource, action)
);
INSERT INTO user_permissions VALUES ('app_user','orders','SELECT');
INSERT INTO user_permissions VALUES ('app_user','orders','INSERT');
INSERT INTO user_permissions VALUES ('app_user','products','SELECT');
INSERT INTO user_permissions VALUES ('admin','orders','ALL');
INSERT INTO user_permissions VALUES ('admin','products','ALL');`}
          expectedOutput={`resource | action
---------+--------
orders   | INSERT
orders   | SELECT
products | SELECT`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 最小権限原則の確認クエリ</h2>
        <SqlEditor
          defaultCode={`-- 必要以上の権限を持つユーザーを特定
SELECT username, COUNT(*) AS permission_count
FROM user_permissions
GROUP BY username
ORDER BY permission_count DESC;`}
          setupSql={`CREATE TABLE user_permissions (username TEXT, resource TEXT, action TEXT);
INSERT INTO user_permissions VALUES ('admin','users','SELECT'),('admin','users','INSERT'),('admin','users','UPDATE'),('admin','users','DELETE');
INSERT INTO user_permissions VALUES ('app_user','users','SELECT'),('app_user','orders','SELECT'),('app_user','orders','INSERT');
INSERT INTO user_permissions VALUES ('readonly','users','SELECT'),('readonly','orders','SELECT');`}
          expectedOutput={`username  | permission_count
----------+-----------------
admin     | 4
app_user  | 3
readonly  | 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="security" lessonId="grant-revoke" />
      </div>
      <LessonNav lessons={lessons} currentId="grant-revoke" basePath="/learn/security" />
    </div>
  );
}
