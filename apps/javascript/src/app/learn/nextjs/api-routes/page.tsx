import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NEXTJS_LESSONS } from "@/lib/lessons-data";

export default function NextjsApiRoutesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">Next.js レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">APIルート</h1>
        <p className="text-gray-400">Route Handlersを使って、Next.jsアプリ内にバックエンドAPIを構築しよう</p>
      </div>

      {/* Route Handlersとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Route Handlersとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsでは、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">route.ts</code>ファイルを使って
          APIエンドポイントを作成できます。これを<strong className="text-purple-400">Route Handlers</strong>と呼びます。
          Express.jsのようなバックエンドフレームワークを別途用意する必要なく、
          同じNext.jsプロジェクト内でフロントエンドとバックエンドの両方を開発できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Route Handlersの配置
app/
├── api/
│   ├── hello/
│   │   └── route.ts        # GET /api/hello
│   ├── users/
│   │   ├── route.ts        # GET・POST /api/users
│   │   └── [id]/
│   │       └── route.ts    # GET・PUT・DELETE /api/users/:id
│   └── posts/
│       └── route.ts        # GET・POST /api/posts
└── page.tsx

# 重要: 同じフォルダに page.tsx と route.ts を同時に置くことはできません`}</code>
        </pre>
      </section>

      {/* 基本的なGETハンドラ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">基本的なGETハンドラ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Route Handlerでは、HTTPメソッド名の関数をexportします。
          Web標準の<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Request</code>と
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Response</code>オブジェクトを使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/api/hello/route.ts
import { NextResponse } from "next/server";

// GET /api/hello
export async function GET() {
  return NextResponse.json({
    message: "こんにちは！",
    timestamp: new Date().toISOString(),
  });
}

// ブラウザで /api/hello にアクセスすると:
// {"message": "こんにちは！", "timestamp": "2025-01-01T00:00:00.000Z"}

// --- ユーザー一覧を返す例 ---

// app/api/users/route.ts
import { NextResponse } from "next/server";

type User = {
  id: number;
  name: string;
  email: string;
};

// 仮のデータ（実際はデータベースから取得する）
const users: User[] = [
  { id: 1, name: "田中太郎", email: "tanaka@example.com" },
  { id: 2, name: "鈴木花子", email: "suzuki@example.com" },
  { id: 3, name: "佐藤次郎", email: "sato@example.com" },
];

// GET /api/users
export async function GET() {
  return NextResponse.json(users);
}`}</code>
        </pre>
      </section>

      {/* POST・PUT・DELETEハンドラ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">POST・PUT・DELETEハンドラ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データの作成、更新、削除には、それぞれPOST、PUT、DELETEメソッドを使います。
          リクエストボディは<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">request.json()</code>で取得できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

// POST /api/users — 新しいユーザーを作成
export async function POST(request: NextRequest) {
  // リクエストボディを取得
  const body = await request.json();
  const { name, email } = body;

  // バリデーション
  if (!name || !email) {
    return NextResponse.json(
      { error: "名前とメールアドレスは必須です" },
      { status: 400 }
    );
  }

  // データベースに保存する処理（ここでは省略）
  const newUser = {
    id: Date.now(),
    name,
    email,
  };

  return NextResponse.json(newUser, { status: 201 });
}

// app/api/users/[id]/route.ts — 個別ユーザーの操作
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

// GET /api/users/:id — 特定のユーザーを取得
export async function GET(request: NextRequest, { params }: Params) {
  const userId = parseInt(params.id);
  // データベースからユーザーを取得する処理
  const user = { id: userId, name: "田中太郎", email: "tanaka@example.com" };

  if (!user) {
    return NextResponse.json(
      { error: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// PUT /api/users/:id — ユーザー情報を更新
export async function PUT(request: NextRequest, { params }: Params) {
  const userId = parseInt(params.id);
  const body = await request.json();

  // データベースを更新する処理
  const updatedUser = { id: userId, ...body };

  return NextResponse.json(updatedUser);
}

// DELETE /api/users/:id — ユーザーを削除
export async function DELETE(request: NextRequest, { params }: Params) {
  const userId = parseInt(params.id);

  // データベースから削除する処理

  return NextResponse.json(
    { message: \`ユーザー \${userId} を削除しました\` }
  );
}`}</code>
        </pre>
      </section>

      {/* リクエストの詳細 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リクエストとレスポンスの詳細</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Route Handlersでは、URLパラメータ、クエリ文字列、ヘッダー、Cookieなど
          さまざまなリクエスト情報にアクセスできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(request: NextRequest) {
  // クエリパラメータの取得
  // /api/search?q=nextjs&page=2
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");     // "nextjs"
  const page = searchParams.get("page");   // "2"

  // リクエストヘッダーの取得
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const authorization = headersList.get("authorization");

  // Cookieの取得
  const cookieStore = cookies();
  const token = cookieStore.get("session-token");

  // レスポンスヘッダーの設定
  return NextResponse.json(
    { results: [], query, page },
    {
      status: 200,
      headers: {
        "Cache-Control": "max-age=60",
        "X-Custom-Header": "custom-value",
      },
    }
  );
}

// Cookieの設定
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session-token", "abc123", {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1日
    path: "/",
  });

  return response;
}`}</code>
        </pre>
      </section>

      {/* フロントエンドからAPIを呼び出す */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">フロントエンドからAPIを呼び出す</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          作成したAPIルートは、Client Componentからfetchで呼び出せます。
          同じプロジェクト内なので、相対パスでアクセスできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`"use client";
import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ユーザー一覧を取得
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // 新しいユーザーを作成
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
    }
  };

  // ユーザーを削除
  const handleDelete = async (id: number) => {
    await fetch(\`/api/users/\${id}\`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h1>ユーザー管理</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
        <button type="submit">追加</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}（{user.email}）
            <button onClick={() => handleDelete(user.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">route.ts</code>ファイルでAPIエンドポイントを作成できる（Route Handlers）</li>
          <li>GET、POST、PUT、DELETEなどのHTTPメソッドに対応する関数をexportする</li>
          <li>Web標準のRequest/Responseオブジェクトを使用する</li>
          <li>動的ルート<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">[id]</code>で個別リソースのAPIを作成できる</li>
          <li>クエリパラメータ、ヘッダー、Cookieなどにアクセスできる</li>
          <li>フロントエンドから相対パスでAPIを呼び出せる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nextjs" lessonId="api-routes" color="purple" />
      <LessonNav lessons={NEXTJS_LESSONS} currentId="api-routes" basePath="/learn/nextjs" color="purple" />
    </div>
  );
}
