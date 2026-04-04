import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function ListsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リスト表示とKey</h1>
        <p className="text-gray-400">配列データの繰り返し描画とKeyプロパティを理解しよう</p>
      </div>

      {/* リスト表示の基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リスト表示の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactでは、配列の <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">map()</code> メソッドを使って
          データの一覧を表示します。これはReactで最も頻繁に使うパターンの1つです。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function FruitList() {
  const fruits = ["りんご", "バナナ", "みかん", "ぶどう", "メロン"];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

// オブジェクトの配列を表示
function UserList() {
  const users = [
    { id: 1, name: "田中太郎", age: 25, role: "エンジニア" },
    { id: 2, name: "鈴木花子", age: 30, role: "デザイナー" },
    { id: 3, name: "佐藤次郎", age: 22, role: "マーケター" },
  ];

  return (
    <div>
      <h2>ユーザー一覧</h2>
      {users.map(user => (
        <div key={user.id} style={{
          padding: "12px",
          margin: "8px 0",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}>
          <h3>{user.name}</h3>
          <p>{user.age}歳 — {user.role}</p>
        </div>
      ))}
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Keyの重要性 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Keyプロパティの重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">key</code> は、Reactがリスト内の各要素を
          識別するために必要な特別なプロパティです。正しいkeyを指定することで、
          Reactが効率的にDOMを更新できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// NG: indexをkeyに使う（並び替え・削除時にバグの原因）
function BadExample() {
  const [items, setItems] = useState(["A", "B", "C"]);

  return (
    <ul>
      {items.map((item, index) => (
        // indexは要素が入れ替わると対応が変わってしまう
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// OK: ユニークなIDをkeyに使う
function GoodExample() {
  const [todos, setTodos] = useState([
    { id: "abc123", text: "買い物" },
    { id: "def456", text: "掃除" },
    { id: "ghi789", text: "勉強" },
  ]);

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        // ユニークなIDならReactが正しく追跡できる
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
}

// Keyのルール:
// 1. 兄弟要素間でユニークであること
// 2. 変化しない値を使うこと（ランダム値はNG）
// 3. データにIDがない場合はcrypto.randomUUID()で生成
// 4. indexは最後の手段（静的なリストのみ）`}</code>
        </pre>
      </section>

      {/* フィルタリング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リストのフィルタリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">filter()</code> と
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">map()</code> を組み合わせて、
          条件に合うデータだけを表示できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState } from "react";

function FilterableProductList() {
  const products = [
    { id: 1, name: "ノートPC", category: "電子機器", price: 120000 },
    { id: 2, name: "マウス", category: "電子機器", price: 3000 },
    { id: 3, name: "Tシャツ", category: "衣類", price: 2500 },
    { id: 4, name: "コーヒー豆", category: "食品", price: 1500 },
    { id: 5, name: "キーボード", category: "電子機器", price: 8000 },
    { id: 6, name: "ジーンズ", category: "衣類", price: 6000 },
  ];

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // カテゴリ一覧を取得
  const categories = [...new Set(products.map(p => p.category))];

  // フィルタリング
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <div>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="商品を検索..."
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">すべて</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <p>{filteredProducts.length}件の商品</p>

      {filteredProducts.length === 0 ? (
        <p>該当する商品がありません</p>
      ) : (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              {product.name} — {product.price.toLocaleString()}円
              <span>（{product.category}）</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* ソート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リストのソート</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          表示前にデータをソートすることで、並び替え機能を実装できます。
          元の配列を変更しないよう、スプレッド構文でコピーしてからソートします。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, useMemo } from "react";

function SortableTable() {
  const data = [
    { id: 1, name: "佐藤", score: 85, date: "2025-01-15" },
    { id: 2, name: "田中", score: 92, date: "2025-01-10" },
    { id: 3, name: "鈴木", score: 78, date: "2025-01-20" },
    { id: 4, name: "山田", score: 95, date: "2025-01-05" },
  ];

  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // useMemoで計算結果をキャッシュ
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let comparison = 0;

      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name, "ja");
      } else if (sortKey === "score") {
        comparison = a.score - b.score;
      } else if (sortKey === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      // 同じキーなら順序を反転
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
            名前 {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => handleSort("score")} style={{ cursor: "pointer" }}>
            点数 {sortKey === "score" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
            日付 {sortKey === "date" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.score}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}</code>
        </pre>
      </section>

      {/* コンポーネントの分離 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リストアイテムをコンポーネントに分離</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リストの各アイテムが複雑になる場合は、別のコンポーネントに分離すると管理しやすくなります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// アイテムコンポーネント
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px",
      borderBottom: "1px solid #eee",
    }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{
        textDecoration: todo.done ? "line-through" : "none",
        flex: 1,
      }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </li>
  );
}

// リストコンポーネント
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Reactを学ぶ", done: false },
    { id: 2, text: "アプリを作る", done: false },
    { id: 3, text: "デプロイする", done: true },
  ]);

  const handleToggle = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>TODO ({todos.filter(t => !t.done).length}件未完了)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">map()</code> でデータ配列をJSX要素に変換する</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">key</code> はユニークで安定した値を使う（indexは最後の手段）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">filter()</code> と組み合わせて検索・フィルタリングを実装</li>
          <li>スプレッド構文 + <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">sort()</code> でソート機能を実装</li>
          <li>複雑なリストアイテムはコンポーネントに分離する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="lists" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="lists" basePath="/learn/react" color="green" />
    </div>
  );
}
