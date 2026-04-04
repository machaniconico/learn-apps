import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PROJECT_LESSONS } from "@/lib/lessons-data";

export default function EcSiteLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 mb-4">実践プロジェクト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ECサイト（模擬）</h1>
        <p className="text-gray-400">商品一覧、カート、決済フローを実装しよう</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          商品一覧の表示、カート機能、決済フローを持つ
          <strong className="text-indigo-400">模擬ECサイト</strong>を構築します。
          状態管理、API設計、データベース設計を実践的に学べるプロジェクトです。
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">商品管理</h3>
            <p className="text-sm text-gray-400">商品一覧、詳細ページ、カテゴリフィルター</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">カート機能</h3>
            <p className="text-sm text-gray-400">追加、数量変更、削除、合計金額計算</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">決済フロー</h3>
            <p className="text-sm text-gray-400">注文確認、配送先入力、注文完了</p>
          </div>
        </div>
      </section>

      {/* データベース設計 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ1: データベース設計</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// prisma/schema.prisma
model Product {
  id          String      @id @default(cuid())
  name        String
  description String
  price       Int         // 円単位（整数で管理）
  image       String
  category    String
  stock       Int         @default(0)
  cartItems   CartItem[]
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
}

model Cart {
  id        String     @id @default(cuid())
  userId    String     @unique
  items     CartItem[]
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id        String  @id @default(cuid())
  cart      Cart    @relation(fields: [cartId], references: [id])
  cartId    String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int     @default(1)

  @@unique([cartId, productId])
}

model Order {
  id        String      @id @default(cuid())
  userId    String
  items     OrderItem[]
  total     Int
  status    String      @default("pending")
  address   String
  createdAt DateTime    @default(now())
}

model OrderItem {
  id        String  @id @default(cuid())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  price     Int     // 購入時の価格を記録
}`}</code>
        </pre>
      </section>

      {/* 商品一覧ページ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ2: 商品一覧ページ</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/products/page.tsx
import { prisma } from "@/lib/prisma";
import { ProductCard } from "./product-card";

export default async function ProductsPage({ searchParams }) {
  const category = searchParams.category;

  const products = await prisma.product.findMany({
    where: category ? { category } : {},
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>

      {/* カテゴリフィルター */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <a href="/products"
           className={!category ? "bg-indigo-500 text-white px-4 py-2 rounded-lg" : "bg-gray-800 px-4 py-2 rounded-lg"}>
          すべて
        </a>
        {categories.map(c => (
          <a key={c.category} href={\`/products?category=\${c.category}\`}
             className={category === c.category ? "bg-indigo-500 text-white px-4 py-2 rounded-lg" : "bg-gray-800 px-4 py-2 rounded-lg"}>
            {c.category}
          </a>
        ))}
      </div>

      {/* 商品グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* カート機能 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ3: カート機能</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// app/actions/cart.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string) {
  const userId = "demo-user"; // 本番ではセッションから取得

  // カートが無ければ作成
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  // 既にカートにあれば数量を増やす
  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 },
    });
  }

  revalidatePath("/cart");
}

export async function removeFromCart(itemId: string) {
  await prisma.cartItem.delete({ where: { id: itemId } });
  revalidatePath("/cart");
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/cart/page.tsx
import { prisma } from "@/lib/prisma";

export default async function CartPage() {
  const cart = await prisma.cart.findUnique({
    where: { userId: "demo-user" },
    include: { items: { include: { product: true } } },
  });

  const total = cart?.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  ) ?? 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ショッピングカート</h1>

      {cart?.items.map(item => (
        <div key={item.id} className="flex items-center gap-4 p-4 border-b">
          <img src={item.product.image} className="w-16 h-16 rounded" />
          <div className="flex-1">
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-gray-400">
              {item.product.price.toLocaleString()}円 x {item.quantity}
            </p>
          </div>
          <p className="font-bold">
            {(item.product.price * item.quantity).toLocaleString()}円
          </p>
        </div>
      ))}

      <div className="mt-6 text-right">
        <p className="text-xl font-bold">合計: {total.toLocaleString()}円</p>
        <a href="/checkout" className="inline-block mt-4 px-6 py-3 bg-indigo-500 text-white rounded-lg">
          レジに進む
        </a>
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* 決済フロー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ4: 決済フロー</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/actions/order.ts
"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
  const address = formData.get("address") as string;
  const userId = "demo-user";

  // カート内容を取得
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("カートが空です");
  }

  // 合計金額の計算
  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  // 注文を作成（トランザクションで安全に）
  await prisma.$transaction(async (tx) => {
    // 注文レコードを作成
    const order = await tx.order.create({
      data: {
        userId,
        total,
        address,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // 在庫を減らす
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // カートを空にする
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  });

  redirect("/order-complete");
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ECサイトはデータベース設計が重要（商品、カート、注文の関連）</li>
          <li>カート操作は Server Actions で安全にデータベースを更新</li>
          <li>決済処理はトランザクションで在庫とカートの整合性を保つ</li>
          <li>金額は整数（円単位）で管理し、小数点の誤差を避ける</li>
          <li>本番ではStripeなどの決済サービスを組み合わせて安全に実装する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="project" lessonId="ec-site" color="blue" />
      <LessonNav lessons={PROJECT_LESSONS} currentId="ec-site" basePath="/learn/project" color="blue" />
    </div>
  );
}
