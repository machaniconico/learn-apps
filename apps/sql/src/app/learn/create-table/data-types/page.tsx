import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "create-table")!.lessons;

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テーブル作成 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">INTEGER・TEXT・REAL・BLOB等のデータ型と選び方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteの主なデータ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteは型アフィニティという柔軟な型システムを採用しています。
          主要なデータ型として <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">INTEGER</code>・
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">TEXT</code>・
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">REAL</code>・
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">BLOB</code>・
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">NUMERIC</code> の5種類があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">INTEGER</code> — 整数値（1, 2, 4, 6, 8バイト）</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">TEXT</code> — 文字列（UTF-8, UTF-16）</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">REAL</code> — 浮動小数点数（8バイトIEEE）</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">BLOB</code> — バイナリデータ（入力そのまま保存）</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">NUMERIC</code> — 数値（整数か実数で自動格納）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 各データ型を使ったテーブル作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id          INTEGER,   -- 整数
  name        TEXT,      -- 文字列
  price       REAL,      -- 小数点あり数値
  stock       INTEGER,   -- 整数
  description TEXT,      -- 長文テキスト
  thumbnail   BLOB       -- 画像データ（バイナリ）
);

INSERT INTO products (id, name, price, stock, description)
VALUES (1, 'ノートPC', 89800.50, 10, '高性能なノートパソコン');

SELECT id, name, price, stock FROM products;`}
          expectedOutput={`id  name    price    stock
1   ノートPC  89800.5  10`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">日付・時刻の扱い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteには専用の日付型はありませんが、TEXT・REAL・INTEGERで日付を保存できます。
          TEXTで <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">YYYY-MM-DD</code> 形式が最も一般的です。
          日付関数（DATE, DATETIME等）と組み合わせて使います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 日付をTEXTで管理</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id           INTEGER,
  customer     TEXT,
  order_date   TEXT,      -- 'YYYY-MM-DD' 形式
  total_amount REAL
);

INSERT INTO orders VALUES
  (1, '田中太郎', '2024-01-15', 12800.00),
  (2, '佐藤花子', '2024-01-20', 5500.00),
  (3, '鈴木次郎', '2024-02-01', 34200.00);

SELECT id, customer, order_date, total_amount
FROM orders
WHERE order_date >= '2024-01-20';`}
          expectedOutput={`id  customer  order_date   total_amount
2   佐藤花子   2024-01-20   5500.0
3   鈴木次郎   2024-02-01   34200.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: TYPEOF関数で型を確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE type_check (
  int_col  INTEGER,
  text_col TEXT,
  real_col REAL
);

INSERT INTO type_check VALUES (42, 'hello', 3.14);

SELECT
  int_col,  TYPEOF(int_col)  AS int_type,
  text_col, TYPEOF(text_col) AS text_type,
  real_col, TYPEOF(real_col) AS real_type
FROM type_check;`}
          expectedOutput={`int_col  int_type  text_col  text_type  real_col  real_type
42       integer   hello     text       3.14      real`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="create-table" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/create-table" />
    </div>
  );
}
