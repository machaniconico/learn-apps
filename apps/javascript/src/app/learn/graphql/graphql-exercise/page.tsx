import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GRAPHQL_LESSONS } from "@/lib/lessons-data";

export default function GraphQLExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">GraphQL レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">GraphQL総合演習</h1>
        <p className="text-gray-400">Apollo Server + Apollo Client でフルスタックGraphQLアプリを構築しよう</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロジェクト概要：ブックレビューアプリ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、<strong className="text-pink-400">ブックレビューアプリ</strong>を
          GraphQLで構築します。書籍の一覧表示、詳細表示、レビューの投稿機能を実装し、
          これまで学んだスキーマ設計、リゾルバ実装、Apollo Clientの知識を総合的に活用します。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">バックエンド</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; Apollo Server</li>
              <li>&#8226; スキーマ設計（Book, Review, User型）</li>
              <li>&#8226; リゾルバ実装</li>
              <li>&#8226; DataLoaderによるN+1対策</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">フロントエンド</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; React + Apollo Client</li>
              <li>&#8226; 書籍一覧・詳細画面</li>
              <li>&#8226; レビュー投稿フォーム</li>
              <li>&#8226; Optimistic Updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 1: スキーマ設計 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 1: スキーマ設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まずはアプリケーション全体のスキーマを設計します。
          書籍、レビュー、ユーザーの3つの主要な型と、Query/Mutationを定義しましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// schema.ts
export const typeDefs = \`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    coverImage: String
    publishedYear: Int!
    genre: Genre!
    averageRating: Float
    reviews: [Review!]!
    reviewCount: Int!
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String!
    book: Book!
    user: User!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    avatar: String
    reviews: [Review!]!
  }

  enum Genre {
    FICTION
    NON_FICTION
    TECHNOLOGY
    SCIENCE
    BUSINESS
    OTHER
  }

  input CreateReviewInput {
    bookId: ID!
    rating: Int!
    comment: String!
  }

  input BookFilterInput {
    genre: Genre
    minRating: Float
    keyword: String
  }

  type Query {
    books(filter: BookFilterInput): [Book!]!
    book(id: ID!): Book
    me: User
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
  }
\`;`}</code>
        </pre>
      </section>

      {/* Step 2: リゾルバ実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 2: リゾルバ実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スキーマに対応するリゾルバを実装します。DataLoaderを使ってN+1問題を防ぎましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// data.ts（サンプルデータ）
export const books = [
  {
    id: "1",
    title: "GraphQL実践入門",
    author: "田中太郎",
    description: "GraphQLの基礎から応用まで学べる一冊",
    coverImage: "/images/graphql-book.png",
    publishedYear: 2024,
    genre: "TECHNOLOGY",
  },
  {
    id: "2",
    title: "React設計パターン",
    author: "佐藤花子",
    description: "Reactアプリの設計手法を体系的に解説",
    coverImage: "/images/react-book.png",
    publishedYear: 2023,
    genre: "TECHNOLOGY",
  },
];

export const reviews = [
  { id: "1", bookId: "1", userId: "1", rating: 5, comment: "非常に分かりやすい！", createdAt: "2024-01-15" },
  { id: "2", bookId: "1", userId: "2", rating: 4, comment: "実践的な内容で良い", createdAt: "2024-02-01" },
  { id: "3", bookId: "2", userId: "1", rating: 4, comment: "設計の考え方が身につく", createdAt: "2024-03-10" },
];

export const users = [
  { id: "1", name: "山田次郎", avatar: "/avatars/jiro.png" },
  { id: "2", name: "鈴木三郎", avatar: "/avatars/saburo.png" },
];

// resolvers.ts
import DataLoader from "dataloader";
import { books, reviews, users } from "./data";

// DataLoader の作成
const createReviewsByBookLoader = () =>
  new DataLoader<string, typeof reviews>(async (bookIds) => {
    return bookIds.map((bookId) =>
      reviews.filter((r) => r.bookId === bookId)
    );
  });

const createUserLoader = () =>
  new DataLoader<string, (typeof users)[0] | null>(async (userIds) => {
    return userIds.map((id) => users.find((u) => u.id === id) || null);
  });

export const resolvers = {
  Query: {
    books: (_, { filter }) => {
      let result = [...books];
      if (filter?.genre) {
        result = result.filter((b) => b.genre === filter.genre);
      }
      if (filter?.keyword) {
        const kw = filter.keyword.toLowerCase();
        result = result.filter(
          (b) =>
            b.title.toLowerCase().includes(kw) ||
            b.author.toLowerCase().includes(kw)
        );
      }
      return result;
    },
    book: (_, { id }) => books.find((b) => b.id === id),
    me: (_, __, context) => {
      if (!context.user) return null;
      return users.find((u) => u.id === context.user.id);
    },
  },

  Mutation: {
    createReview: (_, { input }, context) => {
      if (!context.user) throw new Error("認証が必要です");
      const newReview = {
        id: String(reviews.length + 1),
        bookId: input.bookId,
        userId: context.user.id,
        rating: input.rating,
        comment: input.comment,
        createdAt: new Date().toISOString(),
      };
      reviews.push(newReview);
      return newReview;
    },
    deleteReview: (_, { id }, context) => {
      if (!context.user) throw new Error("認証が必要です");
      const index = reviews.findIndex((r) => r.id === id);
      if (index === -1) return false;
      reviews.splice(index, 1);
      return true;
    },
  },

  Book: {
    reviews: (book, _, { loaders }) => {
      return loaders.reviewsByBookLoader.load(book.id);
    },
    reviewCount: async (book, _, { loaders }) => {
      const bookReviews = await loaders.reviewsByBookLoader.load(book.id);
      return bookReviews.length;
    },
    averageRating: async (book, _, { loaders }) => {
      const bookReviews = await loaders.reviewsByBookLoader.load(book.id);
      if (bookReviews.length === 0) return null;
      const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0);
      return Math.round((sum / bookReviews.length) * 10) / 10;
    },
  },

  Review: {
    book: (review) => books.find((b) => b.id === review.bookId),
    user: (review, _, { loaders }) => {
      return loaders.userLoader.load(review.userId);
    },
  },

  User: {
    reviews: (user) => reviews.filter((r) => r.userId === user.id),
  },
};`}</code>
        </pre>
      </section>

      {/* Step 3: サーバー起動 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 3: サーバー起動</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スキーマとリゾルバを組み合わせてApollo Serverを起動します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// server.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import DataLoader from "dataloader";
import { reviews, users } from "./data";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // 簡易的な認証（実際はJWT検証など）
    const userId = req.headers["x-user-id"] as string;
    const user = userId ? { id: userId } : null;

    return {
      user,
      loaders: {
        reviewsByBookLoader: new DataLoader(async (bookIds: readonly string[]) => {
          return bookIds.map((bookId) =>
            reviews.filter((r) => r.bookId === bookId)
          );
        }),
        userLoader: new DataLoader(async (userIds: readonly string[]) => {
          return userIds.map((id) =>
            users.find((u) => u.id === id) || null
          );
        }),
      },
    };
  },
  listen: { port: 4000 },
});

console.log(\`Server ready at \${url}\`);`}</code>
        </pre>
      </section>

      {/* Step 4: フロントエンド実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 4: React フロントエンド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Apollo Clientを使って、書籍一覧の表示とレビュー投稿機能を実装します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_BOOKS = gql\`
  query GetBooks($filter: BookFilterInput) {
    books(filter: $filter) {
      id
      title
      author
      coverImage
      genre
      averageRating
      reviewCount
    }
  }
\`;

export const GET_BOOK = gql\`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      description
      publishedYear
      genre
      averageRating
      reviews {
        id
        rating
        comment
        user {
          name
          avatar
        }
        createdAt
      }
    }
  }
\`;

export const CREATE_REVIEW = gql\`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      rating
      comment
      user {
        name
        avatar
      }
      createdAt
    }
  }
\`;

// components/BookList.tsx
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/queries";

function BookList() {
  const [genre, setGenre] = useState("");
  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: {
      filter: genre ? { genre } : null,
    },
  });

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error.message}</p>;

  return (
    <div>
      <h1>ブックレビュー</h1>

      {/* ジャンルフィルタ */}
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">すべて</option>
        <option value="TECHNOLOGY">テクノロジー</option>
        <option value="FICTION">フィクション</option>
        <option value="BUSINESS">ビジネス</option>
      </select>

      {/* 書籍一覧 */}
      <div className="grid grid-cols-3 gap-4">
        {data.books.map((book) => (
          <div key={book.id} className="card">
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>評価: {book.averageRating ?? "---"}</p>
            <p>レビュー: {book.reviewCount}件</p>
            <a href={\`/books/\${book.id}\`}>詳細を見る</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// components/ReviewForm.tsx
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, GET_BOOK } from "../graphql/queries";

function ReviewForm({ bookId }: { bookId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [createReview, { loading }] = useMutation(CREATE_REVIEW, {
    // Optimistic Update
    optimisticResponse: {
      createReview: {
        __typename: "Review",
        id: "temp-" + Date.now(),
        rating,
        comment,
        user: { __typename: "User", name: "あなた", avatar: null },
        createdAt: new Date().toISOString(),
      },
    },
    // キャッシュ更新：新しいレビューを書籍詳細に追加
    update(cache, { data: { createReview: newReview } }) {
      const existing = cache.readQuery({
        query: GET_BOOK,
        variables: { id: bookId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_BOOK,
          variables: { id: bookId },
          data: {
            book: {
              ...existing.book,
              reviews: [...existing.book.reviews, newReview],
            },
          },
        });
      }
    },
    onCompleted() {
      setComment("");
      setRating(5);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview({
      variables: {
        input: { bookId, rating, comment },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>レビューを投稿</h3>
      <label>
        評価:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="レビューを書いてください"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "投稿中..." : "レビューを投稿"}
      </button>
    </form>
  );
}`}</code>
        </pre>
      </section>

      {/* 発展課題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">発展課題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          基本実装ができたら、以下の機能追加に挑戦してみましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><strong className="text-pink-400">ページネーション</strong> &#8212; Cursor-basedページネーションを実装して、大量の書籍を効率的に取得</li>
          <li><strong className="text-pink-400">検索機能</strong> &#8212; タイトル・著者名でのキーワード検索とジャンルフィルタの組み合わせ</li>
          <li><strong className="text-pink-400">Subscription</strong> &#8212; 新しいレビューが投稿されたらリアルタイムで画面に反映</li>
          <li><strong className="text-pink-400">認証連携</strong> &#8212; JWTトークンを使った認証とContext経由のユーザー情報取得</li>
          <li><strong className="text-pink-400">エラーバウンダリ</strong> &#8212; GraphQLエラーを適切にキャッチしてユーザーフレンドリーなエラー画面を表示</li>
        </ul>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>スキーマ設計でアプリケーションのデータ構造とAPIを明確に定義</li>
          <li>リゾルバでデータの取得ロジックを実装し、DataLoaderでN+1問題を防止</li>
          <li>Apollo Clientの<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">useQuery</code>と<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">useMutation</code>でReactからGraphQL APIを操作</li>
          <li>Optimistic Updatesでレスポンシブな操作体験を実現</li>
          <li>キャッシュ管理を適切に行い、UIの整合性を維持</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="graphql" lessonId="graphql-exercise" color="pink" />
      <LessonNav lessons={GRAPHQL_LESSONS} currentId="graphql-exercise" basePath="/learn/graphql" color="pink" />
    </div>
  );
}
