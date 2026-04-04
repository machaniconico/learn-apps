import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DATABASE_LESSONS } from "@/lib/lessons-data";

export default function ORMLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">データベース レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ORM（Prisma）</h1>
        <p className="text-gray-400">コードからデータベースを安全かつ効率的に操作しよう</p>
      </div>

      {/* ORMとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ORMとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">ORM（Object-Relational Mapping）</strong>は、
          データベースのテーブルをプログラミング言語のオブジェクトとして扱えるようにするツールです。
          SQL を直接書かずに、TypeScript/JavaScript のコードでデータベース操作ができます。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">SQL を直接書く場合</h3>
            <pre className="text-sm text-gray-400 font-mono">{`const result = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);`}</pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">ORM（Prisma）を使う場合</h3>
            <pre className="text-sm text-gray-400 font-mono">{`const user = await prisma.user.findUnique({
  where: { id: userId },
});`}</pre>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-cyan-400">Prisma</strong> は Node.js / TypeScript で最も人気のある ORM です。
          型安全な API、自動マイグレーション、直感的なスキーマ定義が特徴です。
        </p>
      </section>

      {/* Prisma のセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Prisma のセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Prisma をプロジェクトにインストールして初期化します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Prisma のインストール
npm install prisma --save-dev
npm install @prisma/client

# 初期化（prisma/schema.prisma が生成される）
npx prisma init`}</code>
          </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">.env</code> ファイルにデータベースの接続URLを設定します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# SQLite の場合（手軽に始められる）
# DATABASE_URL="file:./dev.db"`}</code>
        </pre>
      </section>

      {/* スキーマ定義 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スキーマ定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">prisma/schema.prisma</code> にデータモデルを定義します。
          Prisma独自の記法で、テーブル構造とリレーションを宣言的に記述できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // "sqlite" や "mysql" も可
  url      = env("DATABASE_URL")
}

// ユーザーモデル
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?     // ? はオプショナル（NULL許可）
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // リレーション
  posts   Post[]
  profile Profile?

  @@map("users") // テーブル名を指定
}

// 投稿モデル
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String?
  published Boolean  @default(false)
  createdAt DateTime @default(now()) @map("created_at")

  // リレーション（1対多）
  author   User @relation(fields: [authorId], references: [id])
  authorId Int  @map("author_id")

  tags TagOnPost[]

  @@map("posts")
}

// プロフィールモデル（1対1）
model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?

  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique @map("user_id")

  @@map("profiles")
}

// タグモデル
model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts TagOnPost[]

  @@map("tags")
}

// 中間テーブル（多対多）
model TagOnPost {
  post   Post @relation(fields: [postId], references: [id])
  postId Int  @map("post_id")
  tag    Tag  @relation(fields: [tagId], references: [id])
  tagId  Int  @map("tag_id")

  @@id([postId, tagId])
  @@map("post_tags")
}`}</code>
        </pre>
      </section>

      {/* マイグレーション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">マイグレーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スキーマの変更をデータベースに反映するには<strong className="text-cyan-400">マイグレーション</strong>を実行します。
          マイグレーションは SQL の変更履歴を管理するファイルです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# マイグレーションの作成と実行
npx prisma migrate dev --name init

# 上のコマンドで以下が行われる:
# 1. prisma/migrations/ にSQLファイルが生成される
# 2. データベースにテーブルが作成される
# 3. Prisma Client が再生成される

# スキーマを変更した場合も同様
npx prisma migrate dev --name add_avatar_to_profile

# 本番環境でのマイグレーション
npx prisma migrate deploy

# Prisma Client の手動再生成
npx prisma generate

# データベースの中身を確認（GUIツール）
npx prisma studio`}</code>
        </pre>
      </section>

      {/* CRUD操作 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Prisma Client で CRUD 操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Prisma Client は型安全な API を提供します。TypeScript の補完が効くため、
          カラム名のタイポやデータ型の間違いをコンパイル時に検出できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// === CREATE（作成） ===
const newUser = await prisma.user.create({
  data: {
    name: "田中太郎",
    email: "tanaka@example.com",
    age: 28,
  },
});

// リレーション付きで作成
const userWithPost = await prisma.user.create({
  data: {
    name: "鈴木花子",
    email: "suzuki@example.com",
    posts: {
      create: [
        { title: "初投稿", body: "Prismaで作成！", published: true },
        { title: "2つ目の投稿", body: "リレーション便利！" },
      ],
    },
  },
  include: { posts: true }, // リレーション先も返す
});

// === READ（取得） ===
// 全件取得
const allUsers = await prisma.user.findMany();

// 条件付き取得
const adults = await prisma.user.findMany({
  where: { age: { gte: 20 } },
  orderBy: { createdAt: "desc" },
  take: 10, // LIMIT
});

// 1件取得
const user = await prisma.user.findUnique({
  where: { email: "tanaka@example.com" },
  include: { posts: true, profile: true },
});

// === UPDATE（更新） ===
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: "田中太郎（更新）", age: 29 },
});

// === DELETE（削除） ===
const deleted = await prisma.user.delete({
  where: { id: 1 },
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ORM はデータベースのテーブルをオブジェクトとして扱うツール</li>
          <li>Prisma は TypeScript と相性が良く、型安全なデータベース操作ができる</li>
          <li>schema.prisma でデータモデルとリレーションを宣言的に定義する</li>
          <li>マイグレーションでスキーマの変更をデータベースに安全に反映する</li>
          <li>Prisma Client の create / findMany / update / delete で CRUD 操作を行う</li>
          <li>include でリレーション先のデータも一緒に取得できる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="database" lessonId="orm" color="cyan" />
      <LessonNav lessons={DATABASE_LESSONS} currentId="orm" basePath="/learn/database" color="cyan" />
    </div>
  );
}
