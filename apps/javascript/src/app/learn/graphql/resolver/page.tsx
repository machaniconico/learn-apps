import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GRAPHQL_LESSONS } from "@/lib/lessons-data";

export default function GraphQLResolverLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">GraphQL レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リゾルバ実装</h1>
        <p className="text-gray-400">Apollo Serverでリゾルバを実装し、データソースと接続しよう</p>
      </div>

      {/* Apollo Server セットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Apollo Server のセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">Apollo Server</strong>は、GraphQLサーバーを構築するための
          最も人気のあるライブラリです。スキーマとリゾルバを定義するだけで、
          GraphQL APIサーバーを起動できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// パッケージのインストール
// npm install @apollo/server graphql

// server.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// スキーマ定義
const typeDefs = \`
  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, authorId: ID!): Book!
  }
\`;

// サンプルデータ
const books = [
  { id: "1", title: "GraphQL入門", authorId: "1" },
  { id: "2", title: "Apollo実践ガイド", authorId: "1" },
  { id: "3", title: "React設計パターン", authorId: "2" },
];

const authors = [
  { id: "1", name: "田中太郎" },
  { id: "2", name: "佐藤花子" },
];

// リゾルバ定義
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find((b) => b.id === id),
    authors: () => authors,
  },
  Mutation: {
    addBook: (_, { title, authorId }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        authorId,
      };
      books.push(newBook);
      return newBook;
    },
  },
  // 型リゾルバ
  Book: {
    author: (book) => authors.find((a) => a.id === book.authorId),
  },
  Author: {
    books: (author) => books.filter((b) => b.authorId === author.id),
  },
};

// サーバー起動
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(\`Server ready at \${url}\`);`}</code>
        </pre>
      </section>

      {/* リゾルバ関数の仕組み */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リゾルバ関数の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リゾルバ関数は4つの引数を受け取ります。これらを使ってデータの取得・加工を行います。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// リゾルバ関数のシグネチャ
// resolver(parent, args, context, info)

const resolvers = {
  Query: {
    // parent: ルートクエリでは通常 undefined
    // args: クエリの引数
    // context: リクエスト間で共有するデータ（認証情報、DBなど）
    // info: クエリのAST情報（高度な使い方）
    user: (parent, args, context, info) => {
      console.log(args.id);      // クエリ引数
      console.log(context.user); // 認証済みユーザー
      return context.db.users.findById(args.id);
    },

    // 引数のフィルタリング
    posts: (_, { status, limit = 10 }) => {
      let result = posts;
      if (status) {
        result = result.filter((p) => p.status === status);
      }
      return result.slice(0, limit);
    },
  },

  // 型リゾルバ：フィールドの解決
  User: {
    // parent はこの場合 User オブジェクト
    fullName: (parent) => {
      return \`\${parent.lastName} \${parent.firstName}\`;
    },
    // 非同期リゾルバ
    posts: async (parent, _, context) => {
      return await context.db.posts.findByAuthorId(parent.id);
    },
    // 計算フィールド
    postCount: async (parent, _, context) => {
      const posts = await context.db.posts.findByAuthorId(parent.id);
      return posts.length;
    },
  },
};`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">parent</code>（第1引数）は、
          親フィールドのリゾルバが返した値です。型リゾルバでのデータ解決に重要な役割を果たします。
        </p>
      </section>

      {/* Context の活用 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Context の活用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">Context</strong>は、すべてのリゾルバ間で共有されるオブジェクトです。
          認証情報、データベース接続、外部APIクライアントなどを格納します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./auth";

const prisma = new PrismaClient();

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  // context 関数はリクエストごとに実行される
  context: async ({ req }) => {
    // 認証トークンの検証
    const token = req.headers.authorization || "";
    let user = null;

    try {
      user = await verifyToken(token.replace("Bearer ", ""));
    } catch (e) {
      // 未認証の場合は user が null
    }

    return {
      db: prisma,      // データベース接続
      user,            // 認証済みユーザー（またはnull）
    };
  },
  listen: { port: 4000 },
});

// リゾルバで context を使う
const resolvers = {
  Query: {
    // 認証が必要なクエリ
    me: (_, __, context) => {
      if (!context.user) {
        throw new Error("認証が必要です");
      }
      return context.db.user.findUnique({
        where: { id: context.user.id },
      });
    },
  },
  Mutation: {
    createPost: async (_, { input }, context) => {
      if (!context.user) {
        throw new Error("認証が必要です");
      }
      return context.db.post.create({
        data: {
          ...input,
          authorId: context.user.id,
        },
      });
    },
  },
};`}</code>
        </pre>
      </section>

      {/* データソース */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">データソースの接続</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リゾルバからデータベースやREST APIなど、さまざまなデータソースに接続できます。
          データソースをクラスとして整理するパターンが推奨されます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// datasources/user-api.ts
import { PrismaClient } from "@prisma/client";

export class UserAPI {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAll() {
    return this.db.user.findMany();
  }

  async getById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  async create(data: { name: string; email: string }) {
    return this.db.user.create({ data });
  }

  async update(id: string, data: { name?: string; email?: string }) {
    return this.db.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.db.user.delete({ where: { id } });
    return true;
  }
}

// context にデータソースを追加
context: async ({ req }) => {
  return {
    dataSources: {
      userAPI: new UserAPI(prisma),
      postAPI: new PostAPI(prisma),
    },
  };
},

// リゾルバでデータソースを使う
const resolvers = {
  Query: {
    users: (_, __, { dataSources }) => {
      return dataSources.userAPI.getAll();
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getById(id);
    },
  },
};`}</code>
        </pre>
      </section>

      {/* N+1問題とDataLoader */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">N+1問題とDataLoader</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GraphQLではネストしたクエリが簡単に書ける反面、
          <strong className="text-pink-400">N+1問題</strong>が発生しやすくなります。
          <strong className="text-pink-400">DataLoader</strong>を使ってバッチ処理で解決しましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// N+1問題の例
// クエリ:
// query { posts { title author { name } } }
//
// 実行されるSQL:
// 1. SELECT * FROM posts          （1回）
// 2. SELECT * FROM users WHERE id = 1  （N回）
// 3. SELECT * FROM users WHERE id = 2
// 4. SELECT * FROM users WHERE id = 3
// → 投稿数Nに応じてクエリが増える！

// npm install dataloader
import DataLoader from "dataloader";

// DataLoader でバッチ処理
const createUserLoader = (db: PrismaClient) => {
  return new DataLoader<string, User>(async (userIds) => {
    // 1回のクエリで複数ユーザーを取得
    const users = await db.user.findMany({
      where: { id: { in: [...userIds] } },
    });

    // IDの順序に合わせてマッピング
    const userMap = new Map(users.map((u) => [u.id, u]));
    return userIds.map((id) => userMap.get(id) || null);
  });
};

// context でリクエストごとにLoaderを作成
context: async ({ req }) => ({
  loaders: {
    userLoader: createUserLoader(prisma),
  },
}),

// リゾルバで DataLoader を使う
const resolvers = {
  Post: {
    author: (post, _, { loaders }) => {
      // 同じティック内のリクエストが自動的にバッチ化される
      return loaders.userLoader.load(post.authorId);
    },
  },
};

// 実行されるSQL:
// 1. SELECT * FROM posts
// 2. SELECT * FROM users WHERE id IN (1, 2, 3)
// → たった2回のクエリで済む！`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          DataLoaderはリクエストごとに新しいインスタンスを作成してください。
          キャッシュが残ると古いデータを返す原因になります。
        </p>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>Apollo Serverで<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">typeDefs</code>と<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">resolvers</code>を定義してGraphQLサーバーを構築</li>
          <li>リゾルバ関数は<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">parent</code>、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">args</code>、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">context</code>、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">info</code>の4つの引数を受け取る</li>
          <li>Contextに認証情報やDB接続を格納し、全リゾルバで共有する</li>
          <li>データソースをクラスとして整理し、リゾルバをシンプルに保つ</li>
          <li>N+1問題はDataLoaderでバッチ処理して解決する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="graphql" lessonId="resolver" color="pink" />
      <LessonNav lessons={GRAPHQL_LESSONS} currentId="resolver" basePath="/learn/graphql" color="pink" />
    </div>
  );
}
