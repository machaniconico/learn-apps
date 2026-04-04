import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "security")!.lessons;

export default function RolesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">セキュリティ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ロール管理</h1>
        <p className="text-gray-400">ロールベースのアクセス制御（RBAC）でユーザー管理を効率化する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ロールとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ロールとは権限をまとめた名前付きのグループです。ユーザーに個別に権限を付与する代わりに、
          ロールに権限を設定してユーザーにロールを割り当てます（ロールベースアクセス制御、RBAC）。
          新しいユーザーを追加するときはロールを割り当てるだけで適切な権限が付与されるため、管理コストが大幅に下がります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE ROLE</code> — 新しいロールを作成</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">GRANT role TO user</code> — ユーザーにロールを割り当て</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">REVOKE role FROM user</code> — ロールの割り当てを解除</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ロールとユーザーの関係を確認</h2>
        <SqlEditor
          defaultCode={`-- ロールとユーザーの割り当てを確認
SELECT u.username, r.role_name, r.description
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
ORDER BY u.username, r.role_name;`}
          setupSql={`CREATE TABLE roles (id INTEGER PRIMARY KEY, role_name TEXT UNIQUE, description TEXT);
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE);
CREATE TABLE user_roles (user_id INTEGER, role_id INTEGER, PRIMARY KEY (user_id, role_id));
INSERT INTO roles VALUES (1,'admin','全権限'),( 2,'editor','読み書き可能'),(3,'viewer','読み取りのみ');
INSERT INTO users VALUES (1,'tanaka'),(2,'suzuki'),(3,'sato'),(4,'yamada');
INSERT INTO user_roles VALUES (1,1),(2,2),(3,3),(4,2),(4,3);`}
          expectedOutput={`username | role_name | description
---------+-----------+------------
sato     | viewer    | 読み取りのみ
suzuki   | editor    | 読み書き可能
tanaka   | admin     | 全権限
yamada   | editor    | 読み書き可能
yamada   | viewer    | 読み取りのみ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ロールごとの権限一覧</h2>
        <SqlEditor
          defaultCode={`-- ロールが持つ権限を確認
SELECT r.role_name, rp.resource, rp.action
FROM roles r
JOIN role_permissions rp ON r.id = rp.role_id
ORDER BY r.role_name, rp.resource, rp.action;`}
          setupSql={`CREATE TABLE roles (id INTEGER PRIMARY KEY, role_name TEXT);
CREATE TABLE role_permissions (role_id INTEGER, resource TEXT, action TEXT, PRIMARY KEY (role_id, resource, action));
INSERT INTO roles VALUES (1,'admin'),(2,'editor'),(3,'viewer');
INSERT INTO role_permissions VALUES (1,'ALL','ALL'),(2,'articles','SELECT'),(2,'articles','INSERT'),(2,'articles','UPDATE'),(3,'articles','SELECT');`}
          expectedOutput={`role_name | resource | action
----------+----------+--------
admin     | ALL      | ALL
editor    | articles | INSERT
editor    | articles | SELECT
editor    | articles | UPDATE
viewer    | articles | SELECT`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ユーザーの有効な権限を集約する</h2>
        <SqlEditor
          defaultCode={`-- yamada が持つ全権限（複数ロールの合算）
SELECT DISTINCT rp.resource, rp.action
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN role_permissions rp ON ur.role_id = rp.role_id
WHERE u.username = 'yamada'
ORDER BY rp.resource, rp.action;`}
          setupSql={`CREATE TABLE roles (id INTEGER PRIMARY KEY, role_name TEXT);
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT);
CREATE TABLE user_roles (user_id INTEGER, role_id INTEGER);
CREATE TABLE role_permissions (role_id INTEGER, resource TEXT, action TEXT);
INSERT INTO roles VALUES (2,'editor'),(3,'viewer');
INSERT INTO users VALUES (4,'yamada');
INSERT INTO user_roles VALUES (4,2),(4,3);
INSERT INTO role_permissions VALUES (2,'articles','SELECT'),(2,'articles','INSERT'),(2,'articles','UPDATE'),(3,'articles','SELECT'),(3,'comments','SELECT');`}
          expectedOutput={`resource | action
---------+--------
articles | INSERT
articles | SELECT
articles | UPDATE
comments | SELECT`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="security" lessonId="roles" />
      </div>
      <LessonNav lessons={lessons} currentId="roles" basePath="/learn/security" />
    </div>
  );
}
