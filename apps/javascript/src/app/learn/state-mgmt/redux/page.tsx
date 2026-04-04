import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STATE_MGMT_LESSONS } from "@/lib/lessons-data";

export default function ReduxLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">状態管理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Redux Toolkit</h1>
        <p className="text-gray-400">大規模アプリケーションのための堅牢な状態管理を学ぼう</p>
      </div>

      {/* configureStore */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">configureStoreでストアを作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Redux Toolkit（RTK）</strong>は、Reduxの公式推奨ツールキットです。
          従来のReduxに比べてボイラープレートが大幅に削減されています。
          まず<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">configureStore</code>でストアを作成します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import todosReducer from "./features/todos/todosSlice";
import userReducer from "./features/user/userSlice";

// ストアの作成
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    user: userReducer,
  },
});

// 型定義（TypeScript）
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// アプリのルートでProviderを設置
// app.tsx
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">configureStore</code>は
          Redux DevTools、thunkミドルウェア、immutabilityチェックなどを自動で設定してくれます。
        </p>
      </section>

      {/* createSlice */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">createSliceで状態と更新ロジックを定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">createSlice</strong>は、状態の初期値、更新ロジック（reducer）、
          アクション生成関数をまとめて定義できる便利な関数です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  history: number[];
}

const initialState: CounterState = {
  value: 0,
  history: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Immerが内部で使われているので、直接stateを変更できる
    increment(state) {
      state.value += 1;
      state.history.push(state.value);
    },
    decrement(state) {
      state.value -= 1;
      state.history.push(state.value);
    },
    // PayloadAction で引数の型を指定
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
      state.history.push(state.value);
    },
    reset(state) {
      state.value = 0;
      state.history = [];
    },
  },
});

// アクション生成関数をエクスポート
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

// reducerをエクスポート
export default counterSlice.reducer;`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          RTKでは内部的に<strong className="text-purple-400">Immer</strong>が使われているため、
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">state.value += 1</code>のように
          直接変更する書き方が可能です（実際にはイミュータブルに処理されます）。
        </p>
      </section>

      {/* useSelector と useDispatch */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useSelectorとuseDispatch</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コンポーネントからReduxストアにアクセスするには、
          <strong className="text-purple-400">useSelector</strong>（値の取得）と
          <strong className="text-purple-400">useDispatch</strong>（アクションの実行）を使います。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";

// 型付きフック（推奨：hooks.tsに定義しておく）
import { useAppSelector, useAppDispatch } from "../../hooks";
// hooks.ts:
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch: () => AppDispatch = useDispatch;

function Counter() {
  // ストアから値を取得
  const count = useAppSelector((state) => state.counter.value);
  const history = useAppSelector((state) => state.counter.history);

  // アクションをディスパッチする関数を取得
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>カウント: {count}</h2>

      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      <button onClick={() => dispatch(reset())}>リセット</button>

      <h3>履歴</h3>
      <ul>
        {history.map((val, i) => (
          <li key={i}>{val}</li>
        ))}
      </ul>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useSelector</code>は必要な部分だけを選択するので、
          関係ない状態が変わっても再レンダリングされません。
        </p>
      </section>

      {/* 非同期処理（createAsyncThunk） */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非同期処理（createAsyncThunk）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          API呼び出しなどの非同期処理は<strong className="text-purple-400">createAsyncThunk</strong>で定義します。
          ローディング状態やエラー処理も統一的に管理できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// features/todos/todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  status: "idle",
  error: null,
};

// 非同期アクションを定義
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    return (await response.json()) as Todo[];
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    return (await response.json()) as Todo;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
  // 非同期アクションの結果を処理
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;`}</code>
        </pre>
      </section>

      {/* RTK Query */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RTK Query の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">RTK Query</strong>はRedux Toolkitに組み込まれたデータフェッチング・キャッシュ管理ツールです。
          API呼び出しのボイラープレートを大幅に削減できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// APIの定義
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // GET /posts
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    // GET /posts/:id
    getPost: builder.query<Post, number>({
      query: (id) => \`/posts/\${id}\`,
    }),
    // POST /posts
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"], // キャッシュを自動で無効化
    }),
  }),
});

// 自動生成されたフック
export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = postsApi;

// コンポーネントで使う
function PostsList() {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          RTK Queryはキャッシュ、再フェッチ、ポーリング、楽観的更新などの機能を標準で備えています。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">createAsyncThunk</code>よりもAPI通信に特化した選択肢です。
        </p>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">configureStore</code>でストアを作成し、DevToolsやミドルウェアが自動設定される</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">createSlice</code>で状態・reducer・アクションをまとめて定義する</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useSelector</code>で値を取得、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useDispatch</code>でアクションを実行する</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">createAsyncThunk</code>で非同期処理とローディング状態を管理する</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">RTK Query</code>はAPI通信のキャッシュ管理に特化した強力なツール</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="state-mgmt" lessonId="redux" color="purple" />
      <LessonNav lessons={STATE_MGMT_LESSONS} currentId="redux" basePath="/learn/state-mgmt" color="purple" />
    </div>
  );
}
