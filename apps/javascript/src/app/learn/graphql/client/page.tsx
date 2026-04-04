import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GRAPHQL_LESSONS } from "@/lib/lessons-data";

export default function GraphQLClientLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">GraphQL レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Apollo Client</h1>
        <p className="text-gray-400">ReactからGraphQLを使ってデータを取得・更新しよう</p>
      </div>

      {/* Apollo Client セットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Apollo Client のセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">Apollo Client</strong>は、ReactアプリからGraphQL APIに接続するための
          クライアントライブラリです。データの取得、キャッシュ管理、状態管理を一元的に行えます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// パッケージのインストール
// npm install @apollo/client graphql

// lib/apollo-client.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
      authorization: \`Bearer \${getToken()}\`,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;

// app/layout.tsx（またはProviderコンポーネント）
"use client";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

// app/layout.tsx で使用
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}`}</code>
        </pre>
      </section>

      {/* useQuery */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useQuery でデータを取得する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">useQuery</strong>フックは、コンポーネントのレンダリング時に
          自動的にGraphQLクエリを実行し、データ、ローディング状態、エラーを返します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { gql, useQuery } from "@apollo/client";

// クエリの定義
const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
\`;

// 変数付きクエリ
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
\`;

// コンポーネントで使用
function UserList() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()}>更新</button>
      {data.users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>投稿数: {user.posts.length}</p>
        </div>
      ))}
    </div>
  );
}

// 変数を渡すパターン
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,            // userId がない場合はスキップ
    pollInterval: 30000,      // 30秒ごとに自動再取得
  });

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error.message}</p>;
  if (!data?.user) return <p>ユーザーが見つかりません</p>;

  return (
    <div>
      <h2>{data.user.name}</h2>
      <p>{data.user.email}</p>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* useMutation */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useMutation でデータを変更する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">useMutation</strong>フックは、データの作成・更新・削除に使います。
          useQueryと違い、自動実行ではなく、返された関数を呼び出して明示的に実行します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql\`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
\`;

const DELETE_USER = gql\`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
\`;

function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    // キャッシュの更新（新しいユーザーをリストに追加）
    update(cache, { data: { createUser: newUser } }) {
      const existing = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: [...existing.users, newUser],
        },
      });
    },
    // 成功時のコールバック
    onCompleted(data) {
      console.log("作成成功:", data.createUser);
      setName("");
      setEmail("");
    },
    // エラー時のコールバック
    onError(error) {
      console.error("作成失敗:", error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      variables: {
        input: { name, email },
      },
    });
  };

  return (
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
      <button type="submit" disabled={loading}>
        {loading ? "作成中..." : "ユーザーを作成"}
      </button>
      {error && <p>エラー: {error.message}</p>}
    </form>
  );
}`}</code>
        </pre>
      </section>

      {/* キャッシュ管理 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">キャッシュ管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Apollo Clientは<strong className="text-pink-400">InMemoryCache</strong>で
          取得したデータを正規化してキャッシュします。
          キャッシュを適切に管理することで、パフォーマンスとUXが向上します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// キャッシュの設定
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // ページネーション付きのキャッシュマージ
        posts: {
          keyArgs: ["status"],  // statusごとに別キャッシュ
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
    User: {
      // カスタムキャッシュID
      keyFields: ["email"],  // デフォルトはid
    },
  },
});

// fetchPolicy の種類
const { data } = useQuery(GET_USERS, {
  // "cache-first"      キャッシュ優先（デフォルト）
  // "cache-and-network" キャッシュ返却後、ネットワークも実行
  // "network-only"      常にネットワークから取得
  // "cache-only"        キャッシュのみ
  // "no-cache"          キャッシュを使わない
  fetchPolicy: "cache-and-network",
});

// キャッシュの直接操作
// 読み取り
const cachedData = client.readQuery({
  query: GET_USER,
  variables: { id: "1" },
});

// 書き込み
client.writeQuery({
  query: GET_USER,
  variables: { id: "1" },
  data: {
    user: { ...cachedData.user, name: "更新された名前" },
  },
});

// キャッシュのクリア
await client.resetStore();      // キャッシュクリア + アクティブクエリ再実行
await client.clearStore();      // キャッシュクリアのみ`}</code>
        </pre>
      </section>

      {/* Optimistic Updates */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optimistic Updates</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">Optimistic Updates</strong>は、サーバーの応答を待たずに
          UIを即座に更新する手法です。サーバーからの応答が届いたら、実際のデータで上書きします。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`const UPDATE_POST = gql\`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
      updatedAt
    }
  }
\`;

function PostEditor({ post }) {
  const [updatePost] = useMutation(UPDATE_POST, {
    // Optimistic Response: サーバー応答前にUIを更新
    optimisticResponse: {
      updatePost: {
        __typename: "Post",
        id: post.id,
        title: newTitle,          // 楽観的な値
        body: newBody,
        updatedAt: new Date().toISOString(),
      },
    },
    // update でキャッシュを直接操作
    update(cache, { data: { updatePost } }) {
      // キャッシュ内の該当データが自動的に更新される
      // （idフィールドが一致するため）
      console.log("キャッシュ更新:", updatePost.title);
    },
  });

  const handleSave = () => {
    updatePost({
      variables: {
        id: post.id,
        input: { title: newTitle, body: newBody },
      },
    });
    // → UIは即座に更新される
    // → サーバー応答後、実際のデータで上書き
    // → エラーの場合、楽観的更新がロールバックされる
  };
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          Optimistic Updatesにより、ユーザーは待ち時間なくUIの変化を確認できます。
          サーバーエラー時は自動的にロールバックされるので安全です。
        </p>
      </section>

      {/* エラーハンドリング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エラーハンドリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Apollo Clientでは、ネットワークエラーとGraphQLエラーの2種類を適切に処理する必要があります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { ApolloClient, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// エラーリンクの設定
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        \`[GraphQL Error]: \${message}\`,
        \`Path: \${path}\`,
        \`Code: \${extensions?.code}\`
      );

      // 認証エラーの場合、ログインページへリダイレクト
      if (extensions?.code === "UNAUTHENTICATED") {
        window.location.href = "/login";
      }
    });
  }

  if (networkError) {
    console.error(\`[Network Error]: \${networkError.message}\`);
  }
});

// リンクチェーンの構成
const client = new ApolloClient({
  link: from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4000/graphql" }),
  ]),
  cache: new InMemoryCache(),
});

// コンポーネントでのエラーハンドリング
function UserProfile({ userId }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    errorPolicy: "all",  // エラーがあってもデータを返す
  });

  if (loading) return <Spinner />;

  if (error) {
    // GraphQLエラーの詳細を表示
    return (
      <div>
        <h2>エラーが発生しました</h2>
        {error.graphQLErrors.map((err, i) => (
          <p key={i}>{err.message}</p>
        ))}
        {error.networkError && (
          <p>ネットワークエラー: {error.networkError.message}</p>
        )}
        <button onClick={() => refetch()}>再試行</button>
      </div>
    );
  }

  return <div>{data?.user?.name}</div>;
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ApolloProvider</code>でアプリ全体をラップしてクライアントを注入</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">useQuery</code>でデータ取得、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">useMutation</code>でデータ変更</li>
          <li>InMemoryCacheが自動的にデータを正規化してキャッシュ</li>
          <li>Optimistic Updatesでサーバー応答前にUIを即座に更新</li>
          <li>エラーリンクでネットワークエラーとGraphQLエラーを一元管理</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="graphql" lessonId="client" color="pink" />
      <LessonNav lessons={GRAPHQL_LESSONS} currentId="client" basePath="/learn/graphql" color="pink" />
    </div>
  );
}
