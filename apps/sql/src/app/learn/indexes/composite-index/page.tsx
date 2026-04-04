import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "indexes")!.lessons;

export default function CompositeIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">インデックス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複合インデックス</h1>
        <p className="text-gray-400">複数カラムのインデックスと左端プレフィックスの原則</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複合インデックスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複合インデックスは2つ以上のカラムを組み合わせたインデックスです。
          複数カラムで絞り込むクエリの高速化に効果的です。
          重要なのは<span className="text-teal-400">左端プレフィックスの原則</span>：
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">INDEX(a, b, c)</code> は
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE a=?</code>・
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE a=? AND b=?</code>・
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE a=? AND b=? AND c=?</code> に使えますが、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE b=?</code> では使えません。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE INDEX 名前 ON t(col1, col2)</code> — 複合インデックス</li>
          <li>左端カラムから順に使われる（左端プレフィックス）</li>
          <li>カラムの順序がパフォーマンスに影響する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複合インデックスの作成と使用</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  status      TEXT    NOT NULL,
  total       REAL    NOT NULL,
  order_date  TEXT    NOT NULL
);

-- customer_id + status の複合インデックス
CREATE INDEX idx_orders_customer_status
ON orders(customer_id, status);

INSERT INTO orders VALUES (1, 101, 'pending',   15000, '2024-01-10');
INSERT INTO orders VALUES (2, 101, 'shipped',    8000, '2024-01-15');
INSERT INTO orders VALUES (3, 102, 'pending',   22000, '2024-01-20');
INSERT INTO orders VALUES (4, 101, 'delivered', 35000, '2024-02-01');

-- 複合インデックスが有効に使われるクエリ
SELECT id, total, status FROM orders
WHERE customer_id = 101 AND status = 'shipped';`}
          expectedOutput={`id  total   status
2   8000.0  shipped`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カラム順序の重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複合インデックスのカラム順序は重要です。
          選択性の高いカラム（値の種類が多いカラム）を先に置くのが基本です。
          また、<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE</code> 句で等値条件（=）に使うカラムを先に、
          範囲条件（&gt;, &lt;, BETWEEN）に使うカラムを後に置くとインデックスが最大限に活用されます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 左端プレフィックスの動作確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  brand    TEXT NOT NULL,
  price    REAL NOT NULL
);

CREATE INDEX idx_cat_brand ON products(category, brand);

INSERT INTO products VALUES (1, '電子機器', 'Apple',   180000);
INSERT INTO products VALUES (2, '電子機器', 'Sony',     89800);
INSERT INTO products VALUES (3, '電子機器', 'Apple',    59800);
INSERT INTO products VALUES (4, '家具',     'IKEA',     45000);
INSERT INTO products VALUES (5, '家具',     '無印',      38000);

-- 左端(category)のみ → インデックス使用可
SELECT id, category, brand, price
FROM products WHERE category = '電子機器';`}
          expectedOutput={`id  category  brand  price
1   電子機器   Apple  180000.0
2   電子機器   Sony   89800.0
3   電子機器   Apple  59800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複合インデックスでのORDER BY高速化</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE logs (
  id        INTEGER PRIMARY KEY,
  user_id   INTEGER NOT NULL,
  action    TEXT    NOT NULL,
  logged_at TEXT    NOT NULL
);

-- user_id + logged_at の複合インデックス（ORDER BYも高速化）
CREATE INDEX idx_logs_user_time ON logs(user_id, logged_at);

INSERT INTO logs VALUES (1, 101, 'login',  '2024-01-15 08:00');
INSERT INTO logs VALUES (2, 101, 'search', '2024-01-15 08:05');
INSERT INTO logs VALUES (3, 102, 'login',  '2024-01-15 09:00');
INSERT INTO logs VALUES (4, 101, 'logout', '2024-01-15 09:30');

-- user_idで絞ってlogged_atでソート → 複合インデックスを有効活用
SELECT id, action, logged_at
FROM logs
WHERE user_id = 101
ORDER BY logged_at;`}
          expectedOutput={`id  action  logged_at
1   login   2024-01-15 08:00
2   search  2024-01-15 08:05
4   logout  2024-01-15 09:30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="indexes" lessonId="composite-index" />
      </div>
      <LessonNav lessons={lessons} currentId="composite-index" basePath="/learn/indexes" />
    </div>
  );
}
