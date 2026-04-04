import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GRAPHQL_LESSONS } from "@/lib/lessons-data";

export default function GraphQLBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">GraphQL レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">GraphQLの基本</h1>
        <p className="text-gray-400">RESTとの違い、メリットとデメリットを理解しよう</p>
      </div>

      {/* GraphQLとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GraphQLとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">GraphQL</strong>は、APIのためのクエリ言語であり、
          サーバーサイドのランタイムです。2012年にFacebookが社内で開発を始め、
          2015年にオープンソースとして公開されました。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          従来のREST APIでは、サーバーがレスポンスの構造を決めていましたが、
          GraphQLではクライアントが必要なデータの形を指定します。
          これにより、過不足のない効率的なデータ取得が可能になります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# GraphQLの基本的なクエリ
query {
  user(id: "1") {
    name
    email
  }
}

# レスポンス
{
  "data": {
    "user": {
      "name": "田中太郎",
      "email": "taro@example.com"
    }
  }
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          クエリの形がそのままレスポンスの形になる &#8212; これがGraphQLの最大の特徴です。
        </p>
      </section>

      {/* REST vs GraphQL */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">REST vs GraphQL</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          REST APIとGraphQLの違いを具体的に見てみましょう。
          ユーザーのプロフィールと投稿一覧を取得するケースを比較します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// === REST API の場合 ===
// リクエスト1: ユーザー情報を取得
GET /api/users/1
// レスポンス: { id, name, email, address, phone, ... }
// → 不要なフィールド（address, phone）も含まれる

// リクエスト2: ユーザーの投稿を取得
GET /api/users/1/posts
// レスポンス: [{ id, title, body, createdAt, ... }, ...]

// リクエスト3: 各投稿のコメント数を取得
GET /api/posts/1/comments/count
GET /api/posts/2/comments/count
// → N+1リクエスト問題

// === GraphQL の場合 ===
// 1回のリクエストですべて取得
query {
  user(id: "1") {
    name
    email
    posts {
      title
      commentCount
    }
  }
}`}</code>
        </pre>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">REST API</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; 複数のエンドポイント</li>
              <li>&#8226; サーバーがレスポンス構造を決定</li>
              <li>&#8226; HTTPメソッドで操作を区別</li>
              <li>&#8226; キャッシュが容易（HTTPキャッシュ）</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">GraphQL</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; 単一エンドポイント</li>
              <li>&#8226; クライアントがデータ構造を指定</li>
              <li>&#8226; Query / Mutation で操作を区別</li>
              <li>&#8226; キャッシュには専用ライブラリが必要</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Over-fetching と Under-fetching */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Over-fetching と Under-fetching</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          REST APIでよく発生する2つの問題を、GraphQLがどう解決するか見てみましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// Over-fetching（過剰取得）
// ユーザー名だけ欲しいのに、すべてのフィールドが返ってくる
GET /api/users/1
// → { id, name, email, address, phone, avatar, bio, ... }
// 実際に使うのは name だけ...

// Under-fetching（過少取得）
// 1つの画面に必要なデータが1回のリクエストで取れない
GET /api/users/1        // ユーザー情報
GET /api/users/1/posts  // 投稿一覧
GET /api/users/1/friends // 友達一覧
// → 3回もリクエストが必要...

// GraphQL なら1回で必要なデータだけ取得
query {
  user(id: "1") {
    name          # nameだけ指定
    posts {       # 投稿も一緒に
      title
    }
    friends {     # 友達も一緒に
      name
      avatar
    }
  }
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          GraphQLはクライアントが必要なフィールドを明示的に指定するため、
          過不足のないデータ取得が実現できます。
        </p>
      </section>

      {/* 型システム */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GraphQLの型システム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GraphQLは強力な<strong className="text-pink-400">型システム</strong>を持っています。
          スキーマとして型を定義することで、APIの仕様が明確になり、
          クライアントとサーバー間の契約として機能します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# GraphQL スキーマの例
type User {
  id: ID!           # Non-nullable（必須）
  name: String!     # 文字列型（必須）
  email: String!
  age: Int          # 整数型（nullable）
  isActive: Boolean!
  posts: [Post!]!   # Post型の配列（必須）
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!     # リレーション
  createdAt: String!
}

# ルート型：クエリのエントリポイント
type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
}

# ミューテーション：データの変更操作
type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String): User
  deleteUser(id: ID!): Boolean!
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">!</code> は
          Non-nullable（nullを許可しない）を意味します。次のレッスンで型定義を詳しく学びます。
        </p>
      </section>

      {/* GraphQL Playground */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GraphQL Playground</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GraphQLには<strong className="text-pink-400">Playground</strong>（またはGraphiQL）という
          対話的なIDEが付属しています。ブラウザ上でクエリを書いて即座に実行でき、
          スキーマのドキュメントも自動生成されます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# Playground でクエリを試す

# 1. 変数を使ったクエリ
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    posts {
      title
    }
  }
}

# Variables パネルに入力
{
  "id": "1"
}

# 2. イントロスペクション（スキーマ情報の取得）
query {
  __schema {
    types {
      name
      description
    }
  }
}

# 3. 特定の型の情報を取得
query {
  __type(name: "User") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          Apollo Serverを起動すると、デフォルトで Apollo Sandbox が利用可能です。
          スキーマの探索やクエリのテストに非常に便利です。
        </p>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>GraphQLはクライアントが必要なデータの形を指定できるクエリ言語</li>
          <li>REST APIの<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Over-fetching</code>と<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Under-fetching</code>を解決する</li>
          <li>強力な型システムにより、APIの仕様が明確でドキュメント自動生成が可能</li>
          <li>単一エンドポイントで効率的なデータ取得を実現</li>
          <li>Playgroundで対話的にクエリをテストできる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="graphql" lessonId="basics" color="pink" />
      <LessonNav lessons={GRAPHQL_LESSONS} currentId="basics" basePath="/learn/graphql" color="pink" />
    </div>
  );
}
