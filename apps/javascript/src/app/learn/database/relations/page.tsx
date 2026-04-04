import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DATABASE_LESSONS } from "@/lib/lessons-data";

export default function RelationsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">データベース レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リレーションと正規化</h1>
        <p className="text-gray-400">テーブル設計の原則と外部キーによる関連付けを学ぼう</p>
      </div>

      {/* 主キーと外部キー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">主キーと外部キー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">主キー（Primary Key）</strong>は、テーブル内の各レコードを一意に識別するカラムです。
          <strong className="text-cyan-400">外部キー（Foreign Key）</strong>は、別のテーブルの主キーを参照するカラムで、
          テーブル間の関連を定義します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- 主キー: id が各ユーザーを一意に識別
CREATE TABLE users (
  id    SERIAL PRIMARY KEY,  -- 主キー（自動採番）
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- 外部キー: user_id が users テーブルの id を参照
CREATE TABLE posts (
  id       SERIAL PRIMARY KEY,
  user_id  INTEGER NOT NULL,
  title    VARCHAR(200) NOT NULL,
  body     TEXT,

  -- 外部キー制約
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE  -- ユーザー削除時に投稿も削除
);`}</code>
        </pre>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">ON DELETE CASCADE</h3>
            <p className="text-sm text-gray-400">親レコード削除時に子レコードも自動削除</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">ON DELETE SET NULL</h3>
            <p className="text-sm text-gray-400">親レコード削除時に外部キーを NULL にする</p>
          </div>
        </div>
      </section>

      {/* リレーションの種類 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リレーションの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テーブル間の関連には3つのパターンがあります。適切なリレーションを設計することがデータベース設計の要です。
        </p>

        {/* 1:1 */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h3 className="font-semibold text-cyan-400 mb-2">1対1（One-to-One）</h3>
          <p className="text-sm text-gray-300 mb-3">一方のレコードがもう一方の1件だけに対応する関係。</p>
          <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
            <code className="text-gray-300 font-mono">{`-- ユーザーとプロフィール（1対1）
CREATE TABLE users (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE profiles (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id), -- UNIQUE で1対1を保証
  bio     TEXT,
  avatar  VARCHAR(500)
);`}</code>
          </pre>
        </div>

        {/* 1:N */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h3 className="font-semibold text-cyan-400 mb-2">1対多（One-to-Many）</h3>
          <p className="text-sm text-gray-300 mb-3">1つのレコードが複数のレコードに対応する、最もよく使う関係。</p>
          <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
            <code className="text-gray-300 font-mono">{`-- ユーザーと投稿（1対多）
-- 1人のユーザーが複数の投稿を持てる
CREATE TABLE posts (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id), -- 外部キー（UNIQUEなし）
  title   VARCHAR(200) NOT NULL
);

-- users(1) ←→ posts(多)
-- user_id = 1 のレコードが posts に複数存在できる`}</code>
          </pre>
        </div>

        {/* N:N */}
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h3 className="font-semibold text-cyan-400 mb-2">多対多（Many-to-Many）</h3>
          <p className="text-sm text-gray-300 mb-3">両方のテーブルが互いに複数の関連を持つ。中間テーブルが必要。</p>
          <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
            <code className="text-gray-300 font-mono">{`-- 投稿とタグ（多対多）
CREATE TABLE tags (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- 中間テーブル（結合テーブル）
CREATE TABLE post_tags (
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)  -- 複合主キー
);

-- 投稿にタグを紐づける
INSERT INTO post_tags (post_id, tag_id) VALUES (1, 1), (1, 2), (2, 1);

-- 特定の投稿のタグ一覧
SELECT t.name
FROM tags t
INNER JOIN post_tags pt ON t.id = pt.tag_id
WHERE pt.post_id = 1;`}</code>
          </pre>
        </div>
      </section>

      {/* 正規化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">正規化（Normalization）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          正規化とは、データの重複を排除し、整合性を保つためにテーブルを分割する設計手法です。
          一般的に第3正規形（3NF）までを目指します。
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">第1正規形（1NF）</h3>
            <p className="text-sm text-gray-300 mb-3">各カラムに1つの値だけを持たせる（繰り返しグループを排除）</p>
            <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`-- 悪い例（1NFに違反）: カンマ区切りで複数の値
| id | name     | phones                    |
|----|----------|---------------------------|
| 1  | 田中太郎 | 090-1111-2222,03-3333-4444|

-- 良い例（1NF準拠）: 1カラム1値
| id | name     | phone          |
|----|----------|----------------|
| 1  | 田中太郎 | 090-1111-2222  |
| 1  | 田中太郎 | 03-3333-4444   |`}</code>
            </pre>
          </div>

          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">第2正規形（2NF）</h3>
            <p className="text-sm text-gray-300 mb-3">部分関数従属を排除する（主キーの一部だけに依存するカラムを分離）</p>
            <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`-- 悪い例: student_name は student_id だけで決まる
| student_id | course_id | student_name | grade |
|------------|-----------|--------------|-------|
| 1          | 101       | 田中太郎     | A     |

-- 良い例: テーブルを分割
-- students: | student_id | student_name |
-- grades:   | student_id | course_id | grade |`}</code>
            </pre>
          </div>

          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">第3正規形（3NF）</h3>
            <p className="text-sm text-gray-300 mb-3">推移的関数従属を排除する（主キー以外のカラムに依存するカラムを分離）</p>
            <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`-- 悪い例: department_name は department_id に依存
| employee_id | department_id | department_name |
|-------------|---------------|-----------------|
| 1           | 10            | 開発部          |

-- 良い例: 部署テーブルを分離
-- employees:   | employee_id | department_id |
-- departments: | department_id | department_name |`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ER図 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ER図（Entity-Relationship Diagram）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ER図はテーブル間の関係を視覚的に表現する図です。
          テーブル設計の前に ER 図を書くと、全体の構造を把握しやすくなります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`ブログシステムの ER 図（テキスト表現）

┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   users      │       │   posts      │       │   tags       │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │──1:N──│ id (PK)      │──N:N──│ id (PK)      │
│ name         │       │ user_id (FK) │       │ name         │
│ email        │       │ title        │       └──────────────┘
│ created_at   │       │ body         │              │
└──────────────┘       │ published    │       ┌──────────────┐
       │               │ created_at   │       │  post_tags   │
       │               └──────────────┘       ├──────────────┤
       │                      │               │ post_id (FK) │
       │               ┌──────────────┐       │ tag_id (FK)  │
       └──────1:1──────│  profiles    │       └──────────────┘
                       ├──────────────┤
                       │ id (PK)      │       ┌──────────────┐
                       │ user_id (FK) │       │  comments    │
                       │ bio          │       ├──────────────┤
                       │ avatar       │       │ id (PK)      │
                       └──────────────┘       │ post_id (FK) │
                                              │ user_id (FK) │
                                              │ body         │
                                              └──────────────┘`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          実務では <strong className="text-cyan-400">dbdiagram.io</strong> や <strong className="text-cyan-400">draw.io</strong> などのツールで
          ER 図を作成します。設計段階でチームメンバーと共有し、合意を取ることが重要です。
        </p>
      </section>

      {/* テーブル設計のベストプラクティス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">テーブル設計のベストプラクティス</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">命名規則を統一する</h3>
            <p className="text-sm text-gray-400">テーブル名は複数形（users、posts）、カラム名は snake_case（created_at、user_id）で統一</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">必ず主キーを設定する</h3>
            <p className="text-sm text-gray-400">自動採番の id カラムを主キーにするのが一般的。UUID を使う場合もある</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">created_at / updated_at を入れる</h3>
            <p className="text-sm text-gray-400">レコードの作成日時・更新日時を記録しておくとデバッグや分析に便利</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">適切な制約を設定する</h3>
            <p className="text-sm text-gray-400">NOT NULL、UNIQUE、外部キー制約で不正データの挿入を防ぐ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">インデックスを適切に設定する</h3>
            <p className="text-sm text-gray-400">頻繁に検索・結合するカラムにはインデックスを張って高速化する</p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>主キーはレコードを一意に識別し、外部キーはテーブル間の関連を定義する</li>
          <li>リレーションは 1:1、1:N、N:N の3種類。N:N は中間テーブルで実現する</li>
          <li>正規化（1NF〜3NF）でデータの重複を排除し、整合性を保つ</li>
          <li>ER 図でテーブル設計を視覚化してからコードを書き始める</li>
          <li>命名規則、制約、インデックスの設定がテーブル設計の品質を左右する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="database" lessonId="relations" color="cyan" />
      <LessonNav lessons={DATABASE_LESSONS} currentId="relations" basePath="/learn/database" color="cyan" />
    </div>
  );
}
