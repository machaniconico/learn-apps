import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "security")!.lessons;

export default function SqlInjectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">セキュリティ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SQLインジェクション</h1>
        <p className="text-gray-400">攻撃の仕組みを理解して脆弱性を根絶する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLインジェクションとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLインジェクションとは、ユーザー入力をSQLクエリに直接埋め込む際に、
          攻撃者が悪意のあるSQL文を注入してデータベースを不正操作する攻撃手法です。
          未対策のアプリケーションでは全データの盗取・改ざん・削除が可能になります。
          OWASPトップ10で長年上位にランクされる重大な脆弱性です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">' OR '1'='1</code> — 常に真になる条件を注入して全行取得</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">'; DROP TABLE--</code> — テーブル削除を注入</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">UNION SELECT</code> — 別テーブルのデータを盗み出す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">攻撃の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          例えば、ログイン処理で「SELECT * FROM users WHERE name='入力値'」のような文字列結合を使っている場合、
          入力値に「' OR '1'='1'--」を入れると「WHERE name='' OR '1'='1'--'」となり、
          常にTRUEになって全ユーザーが取得できてしまいます。
          対策はプリペアドステートメント（パラメータ化クエリ）の使用です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 脆弱なクエリパターン（文字列結合）</h2>
        <SqlEditor
          defaultCode={`-- 攻撃者の入力: ' OR '1'='1
-- 結果として WHERE name='' OR '1'='1' となり全行が返る
SELECT id, name, email FROM users
WHERE name = '' OR '1'='1';`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password_hash TEXT);
INSERT INTO users VALUES (1,'admin','admin@example.com','hash_secret');
INSERT INTO users VALUES (2,'tanaka','tanaka@example.com','hash_abc');
INSERT INTO users VALUES (3,'suzuki','suzuki@example.com','hash_xyz');`}
          expectedOutput={`id | name   | email
---+--------+--------------------
1  | admin  | admin@example.com
2  | tanaka | tanaka@example.com
3  | suzuki | suzuki@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: UNION攻撃で別テーブルのデータを盗む</h2>
        <SqlEditor
          defaultCode={`-- 検索機能への攻撃: UNION SELECT で秘密テーブルを結合
SELECT name, description FROM products
WHERE name = 'dummy' UNION SELECT username, password FROM secret_users;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, description TEXT);
CREATE TABLE secret_users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);
INSERT INTO products VALUES (1,'ノートPC','高性能ノートパソコン'),(2,'マウス','ワイヤレスマウス');
INSERT INTO secret_users VALUES (1,'admin','P@ssw0rd!'),(2,'root','Sup3rSecret');`}
          expectedOutput={`name  | description
------+------------
admin | P@ssw0rd!
root  | Sup3rSecret`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 安全なパラメータ化クエリのイメージ</h2>
        <SqlEditor
          defaultCode={`-- 安全な実装: 入力値をそのままSQL文字列として扱う（注入が無効化）
-- プレースホルダ ? にバインドされた値はSQL構文として解釈されない
-- ここでは同等の結果を示すため、エスケープ済みの安全な検索を実装
SELECT id, name, email FROM users
WHERE name = 'tanaka';  -- アプリ側でバインドした結果`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users VALUES (1,'admin','admin@example.com'),(2,'tanaka','tanaka@example.com'),(3,'suzuki','suzuki@example.com');`}
          expectedOutput={`id | name   | email
---+--------+--------------------
2  | tanaka | tanaka@example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="security" lessonId="sql-injection" />
      </div>
      <LessonNav lessons={lessons} currentId="sql-injection" basePath="/learn/security" />
    </div>
  );
}
