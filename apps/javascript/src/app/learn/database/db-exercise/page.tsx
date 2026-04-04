import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DATABASE_LESSONS } from "@/lib/lessons-data";

export default function DatabaseExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">データベース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データベース総合演習</h1>
        <p className="text-gray-400">ユーザー管理システムのスキーマ設計からCRUD APIまでを構築しよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、ユーザー管理システムのバックエンドを構築します。
          データベース設計から API 実装までの一連の流れを体験しましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">機能要件</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>- ユーザーの作成・一覧・詳細・更新・削除</li>
              <li>- 部署（Department）の管理</li>
              <li>- ユーザーと部署の紐づけ（1対多）</li>
              <li>- スキル（Skill）の管理とユーザーへの紐づけ（多対多）</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">使用技術</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>- Next.js（App Router / Route Handlers）</li>
              <li>- Prisma（ORM）</li>
              <li>- PostgreSQL または SQLite</li>
              <li>- TypeScript</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 1: スキーマ設計 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: スキーマ設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず ER 図を考え、それを Prisma スキーマに落とし込みます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"    // 手軽に始めるため SQLite を使用
  url      = "file:./dev.db"
}

model User {
  id           Int      @id @default(autoincrement())
  name         String
  email        String   @unique
  role         String   @default("member") // "admin" | "member" | "viewer"
  isActive     Boolean  @default(true) @map("is_active")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  // リレーション
  department   Department? @relation(fields: [departmentId], references: [id])
  departmentId Int?        @map("department_id")
  skills       UserSkill[]

  @@map("users")
}

model Department {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  createdAt   DateTime @default(now()) @map("created_at")

  users User[]

  @@map("departments")
}

model Skill {
  id    Int    @id @default(autoincrement())
  name  String @unique
  users UserSkill[]

  @@map("skills")
}

// 中間テーブル（User と Skill の多対多）
model UserSkill {
  user    User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId  Int   @map("user_id")
  skill   Skill @relation(fields: [skillId], references: [id], onDelete: Cascade)
  skillId Int   @map("skill_id")

  @@id([userId, skillId])
  @@map("user_skills")
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# マイグレーションを実行
npx prisma migrate dev --name init

# シードデータの投入（後述）
npx prisma db seed`}</code>
        </pre>
      </section>

      {/* Step 2: Prisma Client の初期化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: Prisma Client の初期化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          開発環境でホットリロード時に接続が増えないよう、シングルトンパターンで初期化します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          シードスクリプトで初期データを投入します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 部署の作成
  const dev = await prisma.department.create({
    data: { name: "開発部", description: "プロダクト開発を担当" },
  });
  const design = await prisma.department.create({
    data: { name: "デザイン部", description: "UI/UXデザインを担当" },
  });

  // スキルの作成
  const ts = await prisma.skill.create({ data: { name: "TypeScript" } });
  const react = await prisma.skill.create({ data: { name: "React" } });
  const figma = await prisma.skill.create({ data: { name: "Figma" } });

  // ユーザーの作成（リレーション付き）
  await prisma.user.create({
    data: {
      name: "田中太郎",
      email: "tanaka@example.com",
      role: "admin",
      departmentId: dev.id,
      skills: {
        create: [{ skillId: ts.id }, { skillId: react.id }],
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "鈴木花子",
      email: "suzuki@example.com",
      role: "member",
      departmentId: design.id,
      skills: {
        create: [{ skillId: figma.id }, { skillId: react.id }],
      },
    },
  });

  console.log("Seed data created!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());`}</code>
        </pre>
      </section>

      {/* Step 3: CRUD API の実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: CRUD API の実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.js の Route Handlers でユーザー管理 API を実装します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users - ユーザー一覧
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const departmentId = searchParams.get("departmentId");

  const users = await prisma.user.findMany({
    where: {
      ...(role && { role }),
      ...(departmentId && { departmentId: Number(departmentId) }),
      isActive: true,
    },
    include: {
      department: true,
      skills: { include: { skill: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

// POST /api/users - ユーザー作成
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, departmentId, skillIds } = body;

    // バリデーション
    if (!name || !email) {
      return NextResponse.json(
        { error: "name と email は必須です" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: role ?? "member",
        departmentId: departmentId ?? null,
        skills: skillIds
          ? { create: skillIds.map((id: number) => ({ skillId: id })) }
          : undefined,
      },
      include: {
        department: true,
        skills: { include: { skill: true } },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "このメールアドレスは既に使用されています" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/:id - ユーザー詳細
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
    include: {
      department: true,
      skills: { include: { skill: true } },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// PATCH /api/users/:id - ユーザー更新
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { name, email, role, departmentId, skillIds } = body;

  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      ...(departmentId !== undefined && { departmentId }),
      ...(skillIds && {
        skills: {
          deleteMany: {},  // 既存のスキルをすべて削除
          create: skillIds.map((id: number) => ({ skillId: id })),
        },
      }),
    },
    include: {
      department: true,
      skills: { include: { skill: true } },
    },
  });

  return NextResponse.json(user);
}

// DELETE /api/users/:id - ユーザー削除（論理削除）
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.update({
    where: { id: Number(params.id) },
    data: { isActive: false },
  });

  return NextResponse.json({ message: "ユーザーを無効化しました" });
}`}</code>
        </pre>
      </section>

      {/* Step 4: 動作確認 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: 動作確認</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          curl や HTTPクライアントで API をテストします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# ユーザー一覧を取得
curl http://localhost:3000/api/users

# ロールでフィルタリング
curl http://localhost:3000/api/users?role=admin

# ユーザーを作成
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "佐藤一郎",
    "email": "sato@example.com",
    "role": "member",
    "departmentId": 1,
    "skillIds": [1, 2]
  }'

# ユーザー詳細を取得
curl http://localhost:3000/api/users/1

# ユーザーを更新
curl -X PATCH http://localhost:3000/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "佐藤一郎（更新）", "role": "admin" }'

# ユーザーを削除（論理削除）
curl -X DELETE http://localhost:3000/api/users/3`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">npx prisma studio</code> を起動すると、
          ブラウザ上でデータベースの中身を直接確認・編集できます。
        </p>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>要件から ER 図を考え、Prisma スキーマでモデルとリレーションを定義する</li>
          <li>マイグレーションでスキーマの変更をデータベースに反映する</li>
          <li>Prisma Client のシングルトンパターンで開発環境での接続増加を防ぐ</li>
          <li>シードスクリプトで初期データを投入し、開発を効率化する</li>
          <li>Next.js Route Handlers で RESTful な CRUD API を実装する</li>
          <li>論理削除（isActive フラグ）で安全なデータ管理を実現する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="database" lessonId="db-exercise" color="cyan" />
      <LessonNav lessons={DATABASE_LESSONS} currentId="db-exercise" basePath="/learn/database" color="cyan" />
    </div>
  );
}
