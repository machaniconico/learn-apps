import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function EffectsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">useEffect</h1>
        <p className="text-gray-400">副作用の処理（API呼び出し、タイマーなど）を学ぼう</p>
      </div>

      {/* useEffectとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useEffectとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">useEffect</strong>は、コンポーネントの「副作用（side effect）」を処理するためのHookです。
          副作用とは、レンダリング以外の処理のことです。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1 mb-4">
          <li>APIからデータを取得する</li>
          <li>タイマーをセットする</li>
          <li>ドキュメントのタイトルを変更する</li>
          <li>イベントリスナーを登録する</li>
          <li>ローカルストレージに保存する</li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          useEffectは<strong>レンダリング後</strong>に実行されます。UIの描画をブロックしません。
        </p>
      </section>

      {/* 基本構文 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useEffectの基本構文</h2>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, useEffect } from "react";

function DocumentTitle() {
  const [count, setCount] = useState(0);

  // 基本構文: useEffect(コールバック関数, 依存配列)
  useEffect(() => {
    // この中のコードはレンダリング後に実行される
    document.title = \`カウント: \${count}\`;
  }, [count]);  // countが変わった時だけ実行

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* 依存配列のパターン */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">依存配列の3つのパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          依存配列（第2引数）の指定方法で、実行タイミングが変わります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, useEffect } from "react";

function EffectPatterns() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // パターン1: 依存配列なし → 毎回のレンダリング後に実行
  useEffect(() => {
    console.log("毎回実行される");
  }); // 注意: 無限ループの原因になりやすい

  // パターン2: 空の依存配列 → マウント時（初回レンダリング後）のみ
  useEffect(() => {
    console.log("初回のみ実行される");
    // API呼び出しなどに最適
  }, []);

  // パターン3: 依存する値を指定 → その値が変わった時に実行
  useEffect(() => {
    console.log("countが変わった:", count);
  }, [count]);

  // 複数の依存
  useEffect(() => {
    console.log("countまたはnameが変わった");
  }, [count, name]);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* クリーンアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クリーンアップ関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          useEffectから関数を返すと、それが<strong className="text-green-400">クリーンアップ関数</strong>になります。
          コンポーネントがアンマウントされる時や、次のeffectが実行される前に呼ばれます。
          イベントリスナーの解除やタイマーのクリアに使います。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, useEffect } from "react";

// タイマーのクリーンアップ
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // クリーンアップ: コンポーネントが消える時にタイマーを停止
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 空配列 → マウント時にセット、アンマウント時にクリア

  return <p>経過時間: {seconds}秒</p>;
}

// イベントリスナーのクリーンアップ
function WindowResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // クリーンアップ: リスナーを解除
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>画面幅: {width}px</p>;
}

// WebSocket接続のクリーンアップ
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    return () => {
      connection.disconnect(); // 切断
    };
  }, [roomId]); // roomIdが変わったら再接続

  return <div>チャットルーム: {roomId}</div>;
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          クリーンアップを忘れると、メモリリークやバグの原因になります。
          リスナー登録やサブスクリプションには必ずクリーンアップを書きましょう。
        </p>
      </section>

      {/* データフェッチング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">データフェッチング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          APIからデータを取得するパターンは、useEffectの最も一般的な使い方の1つです。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortControllerでキャンセル可能にする
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("取得に失敗しました");

        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();

    // クリーンアップ: リクエストをキャンセル
    return () => controller.abort();
  }, []); // マウント時のみ実行

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}

// IDに基づくデータ取得
function UserDetail({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [userId]); // userIdが変わるたびに再取得

  if (!user) return <p>読み込み中...</p>;
  return <h2>{user.name}</h2>;
}`}</code>
        </pre>
      </section>

      {/* よくある間違い */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">よくある間違い</h2>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// NG: useEffect内でstateを更新 → 無限ループ
function Bad() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // state更新 → 再レンダリング → effect実行 → 無限ループ！
  }); // 依存配列なし

  return <p>{count}</p>;
}

// NG: 依存配列にオブジェクトを入れる（毎回新しい参照）
function AlsoBad() {
  const [data, setData] = useState([]);
  const options = { limit: 10 }; // 毎回新しいオブジェクトが作られる

  useEffect(() => {
    fetchData(options);
  }, [options]); // 毎回 "変わった" と判定 → 無限ループ！

  // 解決策: useMemoでメモ化するか、値を直接依存に入れる
}

// OK: 正しいパターン
function Good() {
  const [count, setCount] = useState(0);

  // 依存配列を正しく指定
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return <p>{count}</p>;
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useEffect</code> はレンダリング後に副作用を実行する</li>
          <li>依存配列で実行タイミングを制御（空 = 初回のみ、指定 = 変更時）</li>
          <li>クリーンアップ関数でリソースを適切に解放する</li>
          <li>データフェッチングではAbortControllerでキャンセル対応する</li>
          <li>依存配列の指定ミスで無限ループに注意</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="effects" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="effects" basePath="/learn/react" color="green" />
    </div>
  );
}
