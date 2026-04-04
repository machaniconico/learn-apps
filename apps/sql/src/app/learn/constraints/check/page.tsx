import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "constraints")!.lessons;

export default function CheckPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">制約 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CHECK制約</h1>
        <p className="text-gray-400">値の範囲・条件を制限するCHECK制約</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CHECK制約とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">CHECK</code> 制約は、カラムに挿入・更新する値が特定の条件を満たすことを強制します。
          価格が0以上、年齢が0〜150の範囲、ステータスが特定の文字列のみなど、
          アプリケーションのビジネスルールをデータベースレベルで保証できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">CHECK (条件式)</code> — インラインまたはテーブル制約</li>
          <li>INSERT・UPDATE時に評価される</li>
          <li>条件がFALSEのときエラー、NULLのときはパス</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 数値範囲のCHECK制約</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id    INTEGER PRIMARY KEY,
  name  TEXT    NOT NULL,
  price REAL    NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL CHECK (stock >= 0) DEFAULT 0
);

INSERT INTO products VALUES (1, 'ノートPC', 89800, 10);
INSERT INTO products VALUES (2, 'マウス',    2800,  50);

-- 負の価格はエラー（コメントを外すと確認）
-- INSERT INTO products VALUES (3, 'キーボード', -100, 5);

SELECT id, name, price, stock FROM products;`}
          expectedOutput={`id  name    price    stock
1   ノートPC  89800.0  10
2   マウス    2800.0   50`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">列挙値のCHECK制約</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          特定の文字列のみを許可したい場合、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">CHECK (col IN ('値1', '値2', ...))</code> のように書けます。
          データベースにENUM型がない場合の代替として広く使われます。
          値を変更する際はALTER TABLEで制約を追加しなおす必要があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 列挙値のCHECK制約</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id     INTEGER PRIMARY KEY,
  item   TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
         CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
);

INSERT INTO orders VALUES (1, 'ノートPC', 'pending');
INSERT INTO orders VALUES (2, 'マウス',   'shipped');

-- 無効なstatusはエラー（コメントを外すと確認）
-- INSERT INTO orders VALUES (3, 'キーボード', 'unknown');

UPDATE orders SET status = 'delivered' WHERE id = 2;

SELECT id, item, status FROM orders;`}
          expectedOutput={`id  item    status
1   ノートPC  pending
2   マウス    delivered`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数カラムにまたがるCHECK制約</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE events (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date   TEXT NOT NULL,
  CHECK (end_date >= start_date)  -- 終了日は開始日以降
);

INSERT INTO events VALUES (1, '夏季セール',   '2024-07-01', '2024-07-31');
INSERT INTO events VALUES (2, '年末セール',   '2024-12-01', '2024-12-25');

-- 終了日が開始日より前はエラー（コメントを外すと確認）
-- INSERT INTO events VALUES (3, '無効なイベント', '2024-08-31', '2024-08-01');

SELECT id, name, start_date, end_date FROM events;`}
          expectedOutput={`id  name      start_date  end_date
1   夏季セール  2024-07-01  2024-07-31
2   年末セール  2024-12-01  2024-12-25`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="constraints" lessonId="check" />
      </div>
      <LessonNav lessons={lessons} currentId="check" basePath="/learn/constraints" />
    </div>
  );
}
