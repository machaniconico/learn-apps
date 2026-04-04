import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function StateLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">State（useState）</h1>
        <p className="text-gray-400">コンポーネントの状態を管理しよう</p>
      </div>

      {/* Stateとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Stateとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">State</strong>は、コンポーネントが内部で保持する「状態」のことです。
          ユーザーの操作によって変化するデータ（入力値、開閉状態、カウントなど）をStateとして管理します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          PropsとStateの違いは重要です：
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1 mb-4">
          <li><strong className="text-green-400">Props</strong> — 親から渡されるデータ（読み取り専用）</li>
          <li><strong className="text-green-400">State</strong> — コンポーネント自身が管理するデータ（変更可能）</li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          Stateが変更されると、Reactはコンポーネントを自動的に<strong>再レンダリング</strong>してUIを更新します。
        </p>
      </section>

      {/* useStateの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useStateの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useState</code> はReactのHookで、
          コンポーネントに状態を追加します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState } from "react";

function Counter() {
  // useState(初期値) → [現在の値, 更新関数] を返す
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
}

// 文字列のState
function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
      />
      <p>こんにちは、{name || "ゲスト"}さん！</p>
    </div>
  );
}

// 真偽値のState
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}`}</code>
        </pre>
      </section>

      {/* 関数型更新 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数型更新（prev）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          前の状態に基づいて更新する場合は、<strong className="text-green-400">関数型更新</strong>を使うのが安全です。
          これにより、古い状態を参照してしまうバグを防げます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function Counter() {
  const [count, setCount] = useState(0);

  // NG: 連続呼び出しで問題が起きる可能性
  const handleTripleAdd = () => {
    setCount(count + 1);  // countは古い値のまま
    setCount(count + 1);  // 同じ古い値を使う
    setCount(count + 1);  // 結果: +1 しか増えない
  };

  // OK: 関数型更新なら確実
  const handleTripleAddCorrect = () => {
    setCount(prev => prev + 1);  // 最新の値を使う
    setCount(prev => prev + 1);  // 更新後の値を使う
    setCount(prev => prev + 1);  // 結果: +3 増える
  };

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={handleTripleAddCorrect}>+3</button>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">prev =&gt;</code> パターンは、
          前の状態に依存する更新では常に使うことが推奨されます。
        </p>
      </section>

      {/* オブジェクトのState */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクトのState</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Stateにオブジェクトを持つ場合は、<strong className="text-green-400">スプレッド構文で新しいオブジェクトを作る</strong>必要があります。
          直接変更（ミューテーション）してはいけません。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function ProfileForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
  });

  // NG: オブジェクトを直接変更してはいけない
  // user.name = "太郎";  // Reactが変更を検知できない

  // OK: スプレッド構文で新しいオブジェクトを作る
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };

  // ネストしたオブジェクトの更新
  const [profile, setProfile] = useState({
    name: "太郎",
    address: {
      city: "東京",
      zip: "100-0001",
    },
  });

  const updateCity = (newCity) => {
    setProfile({
      ...profile,
      address: {
        ...profile.address,
        city: newCity,
      },
    });
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="名前"
      />
      <input
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="メール"
      />
      <p>名前: {user.name}、メール: {user.email}</p>
    </form>
  );
}`}</code>
        </pre>
      </section>

      {/* 配列のState */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列のState</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列も同様に、直接変更せず<strong className="text-green-400">新しい配列を作る</strong>ことが重要です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "買い物", done: false },
    { id: 2, text: "掃除", done: true },
  ]);
  const [input, setInput] = useState("");

  // 追加（スプレッド構文）
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      done: false,
    }]);
    setInput("");
  };

  // 削除（filter）
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 更新（map）
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, done: !todo.done }
        : todo
    ));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="新しいTODO"
      />
      <button onClick={addTodo}>追加</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          配列操作の鉄則：<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">push</code>、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">splice</code> は使わず、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">filter</code>、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">map</code>、スプレッド構文で新しい配列を作りましょう。
        </p>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useState</code> でコンポーネントに状態を追加する</li>
          <li>State更新でReactが自動再レンダリングする</li>
          <li>前の状態に基づく更新は関数型更新（<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">prev =&gt;</code>）を使う</li>
          <li>オブジェクト・配列は直接変更せず、新しいコピーを作る</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="state" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="state" basePath="/learn/react" color="green" />
    </div>
  );
}
