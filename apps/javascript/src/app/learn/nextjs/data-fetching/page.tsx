import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NEXTJS_LESSONS } from "@/lib/lessons-data";

export default function NextjsDataFetchingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">Next.js レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ取得</h1>
        <p className="text-gray-400">Server ComponentsとClient Componentsの違いを理解し、効率的にデータを取得しよう</p>
      </div>

      {/* Server Components vs Client Components */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Server Components vs Client Components</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsのApp Routerでは、コンポーネントは<strong className="text-purple-400">デフォルトでServer Component</strong>です。
          Server Componentはサーバー側で実行され、HTMLとしてクライアントに送信されます。
          一方、ユーザーインタラクション（クリック、入力など）が必要な場合は
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;use client&quot;</code>ディレクティブを
          使ってClient Componentにします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// Server Component（デフォルト）
// - サーバー側で実行される
// - データベースやAPIに直接アクセスできる
// - useState、useEffect は使えない
// - onClick などのイベントハンドラは使えない
export default async function ArticlePage() {
  // サーバー側で直接データを取得
  const article = await fetch("https://api.example.com/articles/1");
  const data = await article.json();

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </article>
  );
}

// Client Component（"use client" を先頭に記述）
// - ブラウザ側で実行される
// - useState、useEffect が使える
// - onClick などのイベントハンドラが使える
// - サーバー側の機能（fs、DBなど）にはアクセスできない
"use client";
import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ♥ {likes}
    </button>
  );
}`}</code>
        </pre>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">Server Component を使う場面</h3>
            <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
              <li>データの取得・表示</li>
              <li>バックエンドリソースへのアクセス</li>
              <li>機密情報（APIキーなど）を扱う処理</li>
              <li>大きな依存関係をサーバーに留める</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">Client Component を使う場面</h3>
            <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
              <li>イベントハンドラ（onClick、onChange）</li>
              <li>useState、useEffect などのHooks</li>
              <li>ブラウザAPIへのアクセス</li>
              <li>インタラクティブなUI要素</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Server Componentでのデータ取得 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Server Componentでのデータ取得</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Server Componentでは、コンポーネント関数を<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">async</code>にして
          直接<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">await</code>でデータを取得できます。
          useEffectやuseStateを使う必要がなく、非常にシンプルです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/users/page.tsx
// Server Componentでのデータ取得（シンプル！）

type User = {
  id: number;
  name: string;
  email: string;
};

export default async function UsersPage() {
  // サーバー側でfetchが実行される
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 比較: React（Client Component）での従来の方法
// "use client";
// import { useState, useEffect } from "react";
//
// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then(res => res.json())
//       .then(data => {
//         setUsers(data);
//         setLoading(false);
//       });
//   }, []);
//
//   if (loading) return <p>読み込み中...</p>;
//   return <ul>{users.map(...)}</ul>;
// }`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          Server Componentを使うと、ローディング状態の管理やuseEffectの依存配列を気にする必要がなくなります。
          コードが大幅にシンプルになることがわかります。
        </p>
      </section>

      {/* キャッシュと再検証 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">キャッシュと再検証（Revalidation）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsのfetchは拡張されており、キャッシュの動作を細かく制御できます。
          データの鮮度に応じて適切なキャッシュ戦略を選びましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// デフォルト: キャッシュあり（静的レンダリング）
// ビルド時に一度だけfetchし、結果をキャッシュ
const data = await fetch("https://api.example.com/posts");

// キャッシュなし（動的レンダリング）
// リクエストごとに毎回fetchする
const data = await fetch("https://api.example.com/posts", {
  cache: "no-store",
});

// 時間ベースの再検証（ISR: Incremental Static Regeneration）
// 60秒間はキャッシュを使い、60秒後に再取得
const data = await fetch("https://api.example.com/posts", {
  next: { revalidate: 60 },
});

// タグベースの再検証
// 特定のタグを持つキャッシュを手動で無効化できる
const data = await fetch("https://api.example.com/posts", {
  next: { tags: ["posts"] },
});

// Server Actionやroute.tsから手動でキャッシュを無効化
import { revalidateTag, revalidatePath } from "next/cache";

revalidateTag("posts");       // "posts"タグのキャッシュを無効化
revalidatePath("/blog");      // /blog ページのキャッシュを無効化`}</code>
        </pre>
      </section>

      {/* Suspenseとローディング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Suspenseとローディング状態</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データ取得に時間がかかる場合、Reactの<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Suspense</code>を
          使ってローディングUIを表示できます。Next.jsの
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">loading.tsx</code>は
          内部的にSuspenseを使っています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 方法1: loading.tsx を使う（フォルダ単位）
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}

// 方法2: Suspense を使う（コンポーネント単位、より細かい制御）
import { Suspense } from "react";

// データ取得する非同期コンポーネント
async function RecentPosts() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  return (
    <ul>
      {posts.map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

async function UserProfile() {
  const res = await fetch("https://api.example.com/user/1");
  const user = await res.json();
  return <div>{user.name}</div>;
}

// 親コンポーネントで、それぞれ独立してローディング
export default function DashboardPage() {
  return (
    <div>
      <h1>ダッシュボード</h1>

      {/* ユーザー情報とポスト一覧が独立して読み込まれる */}
      <Suspense fallback={<p>プロフィール読み込み中...</p>}>
        <UserProfile />
      </Suspense>

      <Suspense fallback={<p>記事を読み込み中...</p>}>
        <RecentPosts />
      </Suspense>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          Suspenseを使うと、ページの各セクションが独立して読み込まれます。
          ユーザープロフィールの取得が遅くても、記事一覧は先に表示されるため、
          ユーザー体験が向上します。これを「ストリーミング」と呼びます。
        </p>
      </section>

      {/* Server ComponentとClient Componentの組み合わせ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Server ComponentとClient Componentの組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際のアプリでは、Server ComponentとClient Componentを組み合わせて使います。
          データの取得はServer Componentで行い、インタラクティブな部分だけをClient Componentにするのが基本パターンです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/blog/[slug]/page.tsx（Server Component）
import LikeButton from "./like-button";
import CommentSection from "./comment-section";

type Article = {
  title: string;
  content: string;
  likes: number;
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  // サーバーでデータを取得
  const res = await fetch(
    \`https://api.example.com/posts/\${params.slug}\`
  );
  const article: Article = await res.json();

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.content}</p>

      {/* インタラクティブな部分だけClient Component */}
      <LikeButton initialLikes={article.likes} slug={params.slug} />
      <CommentSection slug={params.slug} />
    </article>
  );
}

// app/blog/[slug]/like-button.tsx（Client Component）
"use client";
import { useState } from "react";

export default function LikeButton({
  initialLikes,
  slug,
}: {
  initialLikes: number;
  slug: string;
}) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    setLikes(likes + 1);
    await fetch(\`/api/posts/\${slug}/like\`, { method: "POST" });
  };

  return (
    <button onClick={handleLike}>
      ♥ {likes} いいね
    </button>
  );
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Next.jsのコンポーネントはデフォルトでServer Component（サーバー側で実行される）</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;use client&quot;</code>を先頭に書くとClient Componentになる</li>
          <li>Server Componentではasync/awaitで直接データを取得できる</li>
          <li>fetchのキャッシュオプションで、静的・動的・ISRを制御できる</li>
          <li>Suspenseやloading.tsxで、データ取得中のローディングUIを表示できる</li>
          <li>データ取得はServer Component、インタラクションはClient Componentという使い分けが基本</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nextjs" lessonId="data-fetching" color="purple" />
      <LessonNav lessons={NEXTJS_LESSONS} currentId="data-fetching" basePath="/learn/nextjs" color="purple" />
    </div>
  );
}
