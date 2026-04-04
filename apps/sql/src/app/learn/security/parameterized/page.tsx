import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "security")!.lessons;

export default function ParameterizedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">セキュリティ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パラメータ化クエリ</h1>
        <p className="text-gray-400">プリペアドステートメントでSQLインジェクションを根本から防ぐ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化クエリとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パラメータ化クエリ（プリペアドステートメント）とは、SQL文の構造とデータを分離して実行する技術です。
          プレースホルダ（?や:name）を使ってSQL文を先にコンパイルし、後から値をバインドします。
          バインドされた値はSQL構文として解釈されないため、SQLインジェクションが根本的に防止されます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">PREPARE</code> — SQL文をコンパイルしてプランを保存</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">EXECUTE</code> — 保存したプランにパラメータをバインドして実行</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">DEALLOCATE</code> — プリペアドステートメントを解放</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化の効果</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          たとえ攻撃者が「' OR '1'='1」という値を入力しても、パラメータ化クエリでは
          その文字列全体が「name」カラムの検索値として扱われます。
          SQL構文の一部として解釈されることはなく、インジェクション攻撃が無効化されます。
          また、同じSQL文を繰り返し実行する場合は実行計画がキャッシュされるためパフォーマンスも向上します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 通常のSELECTクエリで安全な検索</h2>
        <SqlEditor
          defaultCode={`-- パラメータ化クエリ相当: 値をリテラルとして安全にバインド
-- 攻撃文字列 '' OR '1'='1' がそのままname値として検索される（一致なし）
SELECT id, name FROM users WHERE name = ''' OR ''1''=''1';`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users VALUES (1,'tanaka','tanaka@example.com'),(2,'suzuki','suzuki@example.com'),(3,'admin','admin@example.com');`}
          expectedOutput={`id | name
(0 rows)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 正規ユーザーのログイン確認</h2>
        <SqlEditor
          defaultCode={`-- 正規の入力では正しく1件だけ返る
SELECT id, name, email FROM users
WHERE name = 'tanaka' AND password_hash = 'hashed_password_123';`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password_hash TEXT);
INSERT INTO users VALUES (1,'tanaka','tanaka@example.com','hashed_password_123');
INSERT INTO users VALUES (2,'suzuki','suzuki@example.com','hashed_password_456');`}
          expectedOutput={`id | name   | email
---+--------+--------------------
1  | tanaka | tanaka@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 入力値のバリデーションも組み合わせる</h2>
        <SqlEditor
          defaultCode={`-- メールアドレス形式チェック + 検索
SELECT id, name, email FROM users
WHERE email LIKE '%@%.%'
  AND email = 'tanaka@example.com';`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users VALUES (1,'tanaka','tanaka@example.com'),(2,'suzuki','suzuki@example.com'),(3,'bad_user','not-an-email');`}
          expectedOutput={`id | name   | email
---+--------+--------------------
1  | tanaka | tanaka@example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="security" lessonId="parameterized" />
      </div>
      <LessonNav lessons={lessons} currentId="parameterized" basePath="/learn/security" />
    </div>
  );
}
