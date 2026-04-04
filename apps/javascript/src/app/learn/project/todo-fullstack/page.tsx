import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PROJECT_LESSONS } from "@/lib/lessons-data";

export default function TodoFullstackLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 mb-4">実践プロジェクト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フルスタックTODO</h1>
        <p className="text-gray-400">Next.js + Prisma + PostgreSQL で本格的なTODOアプリを作ろう</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フロントエンドとバックエンドを統合した<strong className="text-indigo-400">フルスタックTODOアプリ</strong>を作ります。
          データベースにタスクを保存し、CRUD操作を実装します。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">技術スタック</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>Next.js（App Router）</li>
              <li>Prisma ORM</li>
              <li>PostgreSQL</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">実装する機能</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>タスクの追加・編集・削除</li>
              <li>完了/未完了の切り替え</li>
              <li>フィルタリング（全部/未完了/完了）</li>
              <li>Server Actions でのデータ操作</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ステップ1: Prismaスキーマ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ1: データベース設計（Prisma）</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// マイグレーション実行
// npx prisma migrate dev --name init
// npx prisma generate`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// lib/prisma.ts - Prismaクライアントのシングルトン
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}`}</code>
        </pre>
      </section>

      {/* ステップ2: Server Actions */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ2: Server Actions でCRUD</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/actions/todo.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// タスク追加
export async function addTodo(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title?.trim()) return;

  await prisma.todo.create({
    data: { title: title.trim() },
  });

  revalidatePath("/todos");
}

// 完了/未完了の切り替え
export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) return;

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  revalidatePath("/todos");
}

// タスク削除
export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/todos");
}

// タスク編集
export async function updateTodo(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  if (!title?.trim()) return;

  await prisma.todo.update({
    where: { id },
    data: { title: title.trim() },
  });

  revalidatePath("/todos");
}`}</code>
        </pre>
      </section>

      {/* ステップ3: UIコンポーネント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ3: UIコンポーネントの実装</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// app/todos/page.tsx - メインページ（Server Component）
import { prisma } from "@/lib/prisma";
import { addTodo } from "@/app/actions/todo";
import { TodoItem } from "./todo-item";

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">TODO リスト</h1>

      {/* タスク追加フォーム */}
      <form action={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="新しいタスクを入力..."
          className="flex-1 px-4 py-2 rounded-lg border"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          追加
        </button>
      </form>

      {/* タスク一覧 */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        {todos.filter(t => !t.completed).length} 件の未完了タスク
      </p>
    </div>
  );
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/todos/todo-item.tsx - 個別タスク（Client Component）
"use client";

import { toggleTodo, deleteTodo } from "@/app/actions/todo";

export function TodoItem({ todo }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5"
      />
      <span className={todo.completed ? "line-through text-gray-400 flex-1" : "flex-1"}>
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-400 hover:text-red-300 text-sm"
      >
        削除
      </button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* ステップ4: フィルタリング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ4: フィルタリング機能</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// URL パラメータでフィルタリング
// /todos?filter=all | active | completed

import { prisma } from "@/lib/prisma";

export default async function TodosPage({ searchParams }) {
  const filter = searchParams.filter || "all";

  const where = filter === "active"
    ? { completed: false }
    : filter === "completed"
    ? { completed: true }
    : {};

  const todos = await prisma.todo.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* フィルタータブ */}
      <div className="flex gap-2 mb-4">
        <FilterLink href="/todos?filter=all" active={filter === "all"}>
          すべて
        </FilterLink>
        <FilterLink href="/todos?filter=active" active={filter === "active"}>
          未完了
        </FilterLink>
        <FilterLink href="/todos?filter=completed" active={filter === "completed"}>
          完了済み
        </FilterLink>
      </div>

      {/* タスク一覧 */}
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Prisma でデータベーススキーマを定義し、マイグレーションで反映</li>
          <li>Server Actions で安全にサーバー側のデータ操作を実行</li>
          <li>Server Component でデータ取得、Client Component でインタラクション</li>
          <li>revalidatePath で画面の再更新を実現</li>
          <li>URL パラメータを使ったフィルタリングで UX を向上</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="project" lessonId="todo-fullstack" color="blue" />
      <LessonNav lessons={PROJECT_LESSONS} currentId="todo-fullstack" basePath="/learn/project" color="blue" />
    </div>
  );
}
