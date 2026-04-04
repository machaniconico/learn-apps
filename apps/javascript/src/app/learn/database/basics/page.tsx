import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DATABASE_LESSONS } from "@/lib/lessons-data";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "RDB（リレーショナルデータベース）でデータを操作するために使う言語はどれ？",
    options: ["HTML", "CSS", "SQL", "JavaScript"],
    answer: 2,
    explanation: "SQL（Structured Query Language）はRDBのデータを操作するための言語です。データの検索、挿入、更新、削除などに使います。",
  },
  {
    question: "ACID特性の「A（Atomicity）」が意味するものはどれ？",
    options: [
      "データが常に正しい状態であること",
      "トランザクション内の操作がすべて成功するかすべて失敗すること",
      "複数のトランザクションが互いに干渉しないこと",
      "コミットされたデータが失われないこと",
    ],
    answer: 1,
    explanation: "Atomicity（原子性）はトランザクション内の操作がすべて成功するか、すべて失敗するかのどちらかであることを保証します。中途半端な状態にはなりません。",
  },
  {
    question: "MongoDBはどのタイプのデータベース？",
    options: [
      "リレーショナルデータベース",
      "ドキュメント型NoSQL",
      "キーバリュー型NoSQL",
      "グラフ型データベース",
    ],
    answer: 1,
    explanation: "MongoDBは代表的なドキュメント型NoSQLデータベースです。JSONライクなドキュメント形式でデータを管理し、スキーマレスで柔軟なデータ構造を持ちます。",
  },
];

export default function DatabaseBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">データベース レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データベースの基本</h1>
        <p className="text-gray-400">RDB と NoSQL の違いと選び方を学ぼう</p>
      </div>

      {/* データベースとは何か */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">データベースとは何か？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データベースとは、構造化されたデータを保存・管理するためのシステムです。
          ファイルにデータを保存することもできますが、データベースを使うと以下のメリットがあります。
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
          <li>大量のデータを効率的に検索・フィルタリングできる</li>
          <li>複数のユーザーが同時にアクセスしてもデータが壊れない</li>
          <li>データの整合性を自動的に保証できる（制約やトランザクション）</li>
          <li>バックアップや復旧の仕組みが用意されている</li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          データベースを管理するソフトウェアを<strong className="text-cyan-400">DBMS（Database Management System）</strong>と呼びます。
          PostgreSQL、MySQL、MongoDB などが代表的な DBMS です。
        </p>
      </section>

      {/* RDB（リレーショナルデータベース） */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">RDB（リレーショナルデータベース）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          RDB は、データを<strong className="text-cyan-400">テーブル（表）</strong>の形式で管理します。
          行（レコード）と列（カラム）で構成され、テーブル同士を「リレーション（関連）」で結びつけられます。
          操作には <strong className="text-cyan-400">SQL</strong>（Structured Query Language）を使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`-- usersテーブルの例
+----+----------+------------------------+
| id | name     | email                  |
+----+----------+------------------------+
|  1 | 田中太郎 | tanaka@example.com     |
|  2 | 鈴木花子 | suzuki@example.com     |
|  3 | 佐藤一郎 | sato@example.com       |
+----+----------+------------------------+

-- postsテーブル（user_id で users と紐づく）
+----+---------+------------------+
| id | user_id | title            |
+----+---------+------------------+
|  1 |       1 | 初めての投稿     |
|  2 |       1 | 2回目の投稿      |
|  3 |       2 | こんにちは       |
+----+---------+------------------+`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          代表的な RDB には <strong className="text-cyan-400">PostgreSQL</strong>、<strong className="text-cyan-400">MySQL</strong>、
          <strong className="text-cyan-400">SQLite</strong> があります。
        </p>
      </section>

      {/* NoSQL */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">NoSQL データベース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NoSQL は「Not Only SQL」の略で、テーブル形式ではないデータベースの総称です。
          柔軟なデータ構造を持ち、大規模データやリアルタイム処理に向いています。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">ドキュメント型</h3>
            <p className="text-sm text-gray-400 mb-2">JSON のようなドキュメントでデータを管理</p>
            <p className="text-sm text-gray-500">例: MongoDB, Firestore</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">キーバリュー型</h3>
            <p className="text-sm text-gray-400 mb-2">キーと値のペアでデータを管理</p>
            <p className="text-sm text-gray-500">例: Redis, DynamoDB</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">カラムファミリー型</h3>
            <p className="text-sm text-gray-400 mb-2">列指向でデータを格納、分析向き</p>
            <p className="text-sm text-gray-500">例: Cassandra, HBase</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">グラフ型</h3>
            <p className="text-sm text-gray-400 mb-2">ノードとエッジで関連性を管理</p>
            <p className="text-sm text-gray-500">例: Neo4j, Amazon Neptune</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// MongoDB のドキュメント例（JSON形式）
{
  "_id": "64a1b2c3d4e5f6789",
  "name": "田中太郎",
  "email": "tanaka@example.com",
  "posts": [
    { "title": "初めての投稿", "createdAt": "2025-01-15" },
    { "title": "2回目の投稿", "createdAt": "2025-01-20" }
  ]
}`}</code>
        </pre>
      </section>

      {/* ACID特性 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ACID特性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          RDB のトランザクションは <strong className="text-cyan-400">ACID特性</strong> を保証します。
          これにより、データの信頼性が確保されます。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Atomicity（原子性）</h3>
            <p className="text-sm text-gray-400">トランザクション内の操作はすべて成功するか、すべて失敗するか。中途半端な状態にならない。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Consistency（一貫性）</h3>
            <p className="text-sm text-gray-400">トランザクション前後でデータベースの制約（NOT NULL、UNIQUE等）が常に満たされる。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Isolation（独立性）</h3>
            <p className="text-sm text-gray-400">同時に実行される複数のトランザクションが互いに干渉しない。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Durability（永続性）</h3>
            <p className="text-sm text-gray-400">コミットされたデータはシステム障害が起きても失われない。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`-- トランザクションの例：銀行の送金処理
BEGIN;

-- Aさんの口座から10000円引く
UPDATE accounts SET balance = balance - 10000 WHERE user_id = 1;

-- Bさんの口座に10000円足す
UPDATE accounts SET balance = balance + 10000 WHERE user_id = 2;

-- 両方成功したらコミット（確定）
COMMIT;

-- 途中でエラーが起きたらロールバック（取り消し）
-- ROLLBACK;`}</code>
        </pre>
      </section>

      {/* 代表的なデータベース */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">代表的なデータベース</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">PostgreSQL</h3>
            <p className="text-sm text-gray-300 mb-1">最も高機能なオープンソース RDB。JSON 型、全文検索、地理空間データなど豊富な機能を持つ。</p>
            <p className="text-sm text-gray-500">用途: Webアプリ全般、エンタープライズ、分析</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">MySQL</h3>
            <p className="text-sm text-gray-300 mb-1">世界で最も普及している RDB。シンプルで高速。WordPress など多くのサービスで採用。</p>
            <p className="text-sm text-gray-500">用途: Webアプリ、CMS、ECサイト</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">SQLite</h3>
            <p className="text-sm text-gray-300 mb-1">サーバー不要の軽量 RDB。ファイル1つでデータベースが完結する。</p>
            <p className="text-sm text-gray-500">用途: モバイルアプリ、デスクトップアプリ、プロトタイプ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">MongoDB</h3>
            <p className="text-sm text-gray-300 mb-1">代表的なドキュメント型 NoSQL。スキーマレスで柔軟。JSON ライクなデータ構造。</p>
            <p className="text-sm text-gray-500">用途: リアルタイムアプリ、IoT、コンテンツ管理</p>
          </div>
        </div>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="cyan" />
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>データベースはデータを安全かつ効率的に管理するための仕組み</li>
          <li>RDB はテーブル形式でデータを管理し、SQL で操作する</li>
          <li>NoSQL はドキュメント型・キーバリュー型など柔軟なデータ構造を持つ</li>
          <li>ACID 特性がトランザクションの信頼性を保証する</li>
          <li>用途に応じて PostgreSQL、MySQL、SQLite、MongoDB などを使い分ける</li>
          <li>Web アプリケーション開発では RDB（特に PostgreSQL）が最も一般的</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="database" lessonId="basics" color="cyan" />
      <LessonNav lessons={DATABASE_LESSONS} currentId="basics" basePath="/learn/database" color="cyan" />
    </div>
  );
}
