import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STATE_MGMT_LESSONS } from "@/lib/lessons-data";

export default function StateExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">状態管理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">状態管理総合演習</h1>
        <p className="text-gray-400">ショッピングカートを作って状態管理を実践しよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、<strong className="text-purple-400">ショッピングカート</strong>機能を持つアプリケーションを
          Zustandを使って実装します。商品一覧の表示、カートへの追加・削除、合計金額の計算など、
          実践的な状態管理を体験しましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>商品一覧の表示と検索・フィルタリング</li>
          <li>カートへの追加・数量変更・削除</li>
          <li>合計金額の自動計算</li>
          <li>カートの永続化（ページリロードしても保持）</li>
        </ul>
      </section>

      {/* Step 1: 型定義 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 1: 型定義とデータの準備</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、商品とカートアイテムの型を定義し、サンプルデータを用意します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: "food" | "drink" | "snack";
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// data/products.ts
import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "有機バナナ",
    price: 198,
    category: "food",
    image: "/images/banana.jpg",
    description: "フィリピン産の有機栽培バナナ",
  },
  {
    id: "2",
    name: "緑茶 500ml",
    price: 150,
    category: "drink",
    image: "/images/greentea.jpg",
    description: "静岡県産の茶葉を使用",
  },
  {
    id: "3",
    name: "チョコレート",
    price: 320,
    category: "snack",
    image: "/images/chocolate.jpg",
    description: "カカオ70%のダークチョコレート",
  },
  {
    id: "4",
    name: "鮭おにぎり",
    price: 160,
    category: "food",
    image: "/images/onigiri.jpg",
    description: "北海道産紅鮭使用",
  },
  {
    id: "5",
    name: "コーヒー 350ml",
    price: 180,
    category: "drink",
    image: "/images/coffee.jpg",
    description: "ブラジル産豆のブラックコーヒー",
  },
  {
    id: "6",
    name: "ポテトチップス",
    price: 248,
    category: "snack",
    image: "/images/chips.jpg",
    description: "うすしお味のポテトチップス",
  },
];`}</code>
        </pre>
      </section>

      {/* Step 2: ストアの実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 2: Zustandストアの実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カートのストアを作成します。追加・削除・数量変更と、合計金額の計算ロジックを実装します。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">persist</code>ミドルウェアで
          localStorageに自動保存します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// store/useCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.id === productId ? { ...i, quantity } : i
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;`}</code>
        </pre>
      </section>

      {/* Step 3: 商品一覧コンポーネント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 3: 商品一覧コンポーネント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          商品を一覧表示し、カテゴリでフィルタリングできるコンポーネントを作ります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// components/ProductList.tsx
import { useState } from "react";
import { products } from "../data/products";
import { Product } from "../types";
import useCartStore from "../store/useCartStore";

type Category = "all" | "food" | "drink" | "snack";

const categoryLabels: Record<Category, string> = {
  all: "すべて",
  food: "食品",
  drink: "飲料",
  snack: "お菓子",
};

function ProductList() {
  const [filter, setFilter] = useState<Category>("all");
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <div>
      <h2>商品一覧</h2>

      {/* カテゴリフィルター */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              background: filter === cat ? "#7c3aed" : "#374151",
              color: "white",
              cursor: "pointer",
            }}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* 商品カード */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addItem} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  return (
    <div style={{
      border: "1px solid #374151",
      borderRadius: "12px",
      padding: "16px",
      background: "#111827",
    }}>
      <h3>{product.name}</h3>
      <p style={{ color: "#9ca3af" }}>{product.description}</p>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#a78bfa" }}>
        ¥{product.price.toLocaleString()}
      </p>
      <button
        onClick={() => onAdd(product)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          border: "none",
          background: "#7c3aed",
          color: "white",
          cursor: "pointer",
        }}
      >
        カートに追加
      </button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Step 4: カートコンポーネント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 4: カートコンポーネント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カートの中身を表示し、数量変更や削除、合計金額の表示を行うコンポーネントです。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// components/Cart.tsx
import useCartStore from "../store/useCartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "32px", color: "#9ca3af" }}>
        <p>カートは空です</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>カート ({getTotalItems()} 点)</h2>
        <button
          onClick={clearCart}
          style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
        >
          カートを空にする
        </button>
      </div>

      {/* カートアイテム一覧 */}
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
            borderBottom: "1px solid #374151",
          }}
        >
          <div>
            <p style={{ fontWeight: "bold" }}>{item.name}</p>
            <p style={{ color: "#a78bfa" }}>
              ¥{item.price.toLocaleString()} x {item.quantity}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
            <button
              onClick={() => removeItem(item.id)}
              style={{ color: "#ef4444", marginLeft: "8px" }}
            >
              削除
            </button>
          </div>
        </div>
      ))}

      {/* 合計 */}
      <div style={{
        marginTop: "16px",
        padding: "16px",
        borderRadius: "12px",
        background: "#1f2937",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span>小計</span>
          <span>¥{getTotalPrice().toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span>消費税（10%）</span>
          <span>¥{Math.floor(getTotalPrice() * 0.1).toLocaleString()}</span>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "18px",
          borderTop: "1px solid #374151",
          paddingTop: "8px",
        }}>
          <span>合計</span>
          <span style={{ color: "#a78bfa" }}>
            ¥{Math.floor(getTotalPrice() * 1.1).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Step 5: アプリの統合 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 5: アプリの統合</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          商品一覧とカートを統合して、完成したアプリケーションを組み立てます。
          ヘッダーにはカートのアイテム数を表示するバッジを付けます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// App.tsx
import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import useCartStore from "./store/useCartStore";

function App() {
  const [showCart, setShowCart] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems);

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "16px" }}>
      {/* ヘッダー */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #374151",
        marginBottom: "24px",
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          ショッピングアプリ
        </h1>
        <button
          onClick={() => setShowCart(!showCart)}
          style={{
            position: "relative",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: showCart ? "#7c3aed" : "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          カート
          {totalItems() > 0 && (
            <span style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}>
              {totalItems()}
            </span>
          )}
        </button>
      </header>

      {/* メインコンテンツ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: showCart ? "1fr 400px" : "1fr",
        gap: "24px",
      }}>
        <ProductList />
        {showCart && (
          <div style={{
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #374151",
            background: "#111827",
            height: "fit-content",
            position: "sticky",
            top: "16px",
          }}>
            <Cart />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;`}</code>
        </pre>
      </section>

      {/* 発展課題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">発展課題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          基本の実装ができたら、以下の機能を追加してみましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 発展課題1: お気に入り機能を追加
// - 商品のお気に入り登録・解除
// - お気に入り一覧の表示
// - 別のストア（useFavoritesStore）で管理

// 発展課題2: 検索機能の実装
// - 商品名でのリアルタイム検索
// - 検索キーワードのハイライト
// - デバウンス処理の追加

// 発展課題3: 注文履歴
// - カートの確定（チェックアウト）
// - 注文履歴の保存と一覧表示
// - useOrderHistoryStore で別管理

// 発展課題4: Context版で書き直し
// - Zustandの代わりにuseContextで同じ機能を実装
// - コード量や複雑さを比較してみよう

// 発展課題5: Redux Toolkit版で書き直し
// - createSliceとconfigureStoreで同じ機能を実装
// - createAsyncThunkでAPI連携を追加`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>型定義から始めてデータ構造を明確にすることで、安全な実装ができる</li>
          <li>Zustandの<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">create</code>と<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">persist</code>で、簡潔かつ永続化されたストアを作成できる</li>
          <li>セレクタを使って必要な値だけを取得し、パフォーマンスを最適化する</li>
          <li>コンポーネントを分割して関心事を分離すると、保守性の高いコードになる</li>
          <li>状態管理ライブラリを使い比べることで、それぞれの特徴が実感できる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="state-mgmt" lessonId="state-exercise" color="purple" />
      <LessonNav lessons={STATE_MGMT_LESSONS} currentId="state-exercise" basePath="/learn/state-mgmt" color="purple" />
    </div>
  );
}
