import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GRAPHQL_LESSONS } from "@/lib/lessons-data";

export default function GraphQLSchemaLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">GraphQL レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スキーマ定義</h1>
        <p className="text-gray-400">SDL（Schema Definition Language）で型を設計しよう</p>
      </div>

      {/* SDLとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SDL（Schema Definition Language）とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">SDL</strong>は、GraphQLのスキーマを定義するための言語です。
          APIで扱うデータの型、フィールド、リレーションをすべてSDLで記述します。
          スキーマはクライアントとサーバー間の「契約」として機能します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# スキーマファイル（schema.graphql）の基本構造

# オブジェクト型の定義
type User {
  id: ID!
  name: String!
  email: String!
}

# クエリのエントリポイント
type Query {
  users: [User!]!
  user(id: ID!): User
}

# ミューテーションのエントリポイント
type Mutation {
  createUser(name: String!, email: String!): User!
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          スキーマを先に設計することで、フロントエンドとバックエンドが並行して開発を進められます。
        </p>
      </section>

      {/* スカラー型 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スカラー型（Scalar Types）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GraphQLに組み込みの基本データ型です。すべてのフィールドは最終的にスカラー型に解決されます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# 組み込みスカラー型
type Example {
  id: ID!          # 一意な識別子（文字列として扱われる）
  name: String!    # UTF-8 文字列
  age: Int!        # 32ビット整数
  score: Float!    # 倍精度浮動小数点数
  isActive: Boolean! # true / false
}

# カスタムスカラー型の定義
scalar DateTime
scalar JSON
scalar Upload

# カスタムスカラー型を使う
type Post {
  id: ID!
  title: String!
  createdAt: DateTime!  # カスタムスカラー型
  metadata: JSON        # JSONデータ
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          カスタムスカラー型を使うには、リゾルバ側でシリアライズ・パースのロジックを実装する必要があります。
        </p>
      </section>

      {/* オブジェクト型とリレーション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクト型とリレーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オブジェクト型はフィールドの集合で、型同士をリレーションで結びつけることができます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# ユーザー型
type User {
  id: ID!
  name: String!
  email: String!
  profile: Profile       # 1対1 リレーション
  posts: [Post!]!        # 1対多 リレーション
  friends: [User!]!      # 自己参照リレーション
}

# プロフィール型
type Profile {
  bio: String
  avatar: String
  website: String
  user: User!            # 逆方向のリレーション
}

# 投稿型
type Post {
  id: ID!
  title: String!
  body: String!
  author: User!          # 多対1 リレーション
  tags: [Tag!]!          # 多対多 リレーション
  comments: [Comment!]!
}

# タグ型
type Tag {
  id: ID!
  name: String!
  posts: [Post!]!        # 多対多の逆方向
}

# コメント型
type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          GraphQLのリレーションはRDBの外部キーとは異なり、グラフ構造として自由にナビゲートできます。
        </p>
      </section>

      {/* Enum と Input 型 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Enum型とInput型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">Enum型</strong>は固定の選択肢を定義し、
          <strong className="text-pink-400">Input型</strong>はMutationの引数として使う複雑な入力を定義します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# Enum型：固定の選択肢
enum Role {
  ADMIN
  EDITOR
  VIEWER
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

# Enum型をフィールドで使う
type User {
  id: ID!
  name: String!
  role: Role!             # ADMIN | EDITOR | VIEWER
}

type Post {
  id: ID!
  title: String!
  status: PostStatus!     # DRAFT | PUBLISHED | ARCHIVED
}

# Input型：Mutationの引数をまとめる
input CreateUserInput {
  name: String!
  email: String!
  role: Role = VIEWER     # デフォルト値
}

input UpdatePostInput {
  title: String
  body: String
  status: PostStatus
}

# Input型をMutationで使う
type Mutation {
  createUser(input: CreateUserInput!): User!
  updatePost(id: ID!, input: UpdatePostInput!): Post
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">type</code>は出力（レスポンス）に、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">input</code>は入力（引数）に使います。混同しないようにしましょう。
        </p>
      </section>

      {/* Query / Mutation / Subscription */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Query / Mutation / Subscription</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GraphQLには3つのルート操作型があります。これらがAPIのエントリポイントになります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# Query：データの読み取り（GET相当）
type Query {
  users: [User!]!
  user(id: ID!): User
  posts(status: PostStatus): [Post!]!
  searchPosts(keyword: String!): [Post!]!
}

# Mutation：データの作成・更新・削除（POST/PUT/DELETE相当）
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): Boolean!
  createPost(input: CreatePostInput!): Post!
  publishPost(id: ID!): Post!
}

# Subscription：リアルタイム通知（WebSocket）
type Subscription {
  postCreated: Post!
  userStatusChanged(userId: ID!): User!
  commentAdded(postId: ID!): Comment!
}`}</code>
        </pre>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white text-sm mb-1">Query</h3>
            <p className="text-xs text-gray-400">データの取得。並列実行される</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white text-sm mb-1">Mutation</h3>
            <p className="text-xs text-gray-400">データの変更。順次実行される</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white text-sm mb-1">Subscription</h3>
            <p className="text-xs text-gray-400">リアルタイムイベント。WebSocket使用</p>
          </div>
        </div>
      </section>

      {/* Nullable / Non-nullable */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Nullable と Non-nullable</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GraphQLでは、すべてのフィールドはデフォルトで<strong className="text-pink-400">nullable</strong>（nullを返す可能性がある）です。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">!</code> を付けると
          <strong className="text-pink-400">Non-nullable</strong>（必ず値を返す）になります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`type User {
  # Non-nullable: 必ず値を返す（nullは不可）
  id: ID!
  name: String!

  # Nullable: nullを返す可能性がある
  bio: String          # null または "文字列"
  age: Int             # null または 数値

  # 配列の場合、!の位置に注意
  posts: [Post!]!      # 配列は必須、要素もnull不可
                       # → 空配列 [] はOK
                       # → [post1, post2] はOK
                       # → null はNG
                       # → [null] はNG

  tags: [String]!      # 配列は必須、要素はnull可
                       # → [] はOK
                       # → ["tag1", null] はOK
                       # → null はNG

  friends: [User!]     # 配列自体はnull可、要素はnull不可
                       # → null はOK
                       # → [] はOK
                       # → [user1] はOK
                       # → [null] はNG

  nicknames: [String]  # 配列もnull可、要素もnull可
                       # → なんでもOK
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          Non-nullable を適切に使うことで、クライアント側でnullチェックを減らし、型安全なコードが書けます。
        </p>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>SDLはGraphQLスキーマを定義するための宣言的な言語</li>
          <li>スカラー型（<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">String</code>、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Int</code>、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Float</code>、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Boolean</code>、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ID</code>）が基本データ型</li>
          <li>オブジェクト型でリレーションを定義し、グラフ構造を表現</li>
          <li>Enum型で固定の選択肢、Input型でMutationの複雑な引数を定義</li>
          <li>Query（読み取り）、Mutation（変更）、Subscription（リアルタイム）の3つのルート操作型</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">!</code> でNon-nullable（null不可）を指定し、型安全性を高める</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="graphql" lessonId="schema" color="pink" />
      <LessonNav lessons={GRAPHQL_LESSONS} currentId="schema" basePath="/learn/graphql" color="pink" />
    </div>
  );
}
