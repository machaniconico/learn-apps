import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function HooksLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hooks入門</h1>
        <p className="text-gray-400">Reactの強力なHookシステムを理解しよう</p>
      </div>

      {/* Hooksとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Hooksとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Hooks</strong>は、関数コンポーネントでReactの機能（状態管理、副作用処理など）を
          利用するための仕組みです。React 16.8で導入され、現在のReact開発の中心的な機能です。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          主要なHooksには以下があります：
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useState</code> — 状態管理</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useEffect</code> — 副作用処理（API呼び出し、タイマーなど）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useRef</code> — DOM参照やミュータブルな値の保持</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useMemo</code> — 計算結果のメモ化</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useCallback</code> — 関数のメモ化</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useContext</code> — コンテキスト（グローバル状態）の利用</li>
        </ul>
      </section>

      {/* Hooksのルール */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Hooksのルール（重要）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Hooksを使う際には、2つの重要なルールがあります。違反するとバグの原因になります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// ルール1: トップレベルでのみ呼び出す
// → ループ、条件分岐、ネストされた関数の中でHooksを呼んではいけない

function MyComponent() {
  // OK: トップレベル
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // NG: 条件分岐の中
  // if (count > 0) {
  //   const [extra, setExtra] = useState(""); // エラー！
  // }

  // NG: ループの中
  // for (let i = 0; i < 3; i++) {
  //   const [item, setItem] = useState(""); // エラー！
  // }

  return <div>{count}</div>;
}

// ルール2: React関数コンポーネントまたはカスタムHookの中でのみ呼び出す
// → 通常のJavaScript関数の中では使えない

// NG: 普通の関数
// function helper() {
//   const [value, setValue] = useState(""); // エラー！
// }

// OK: コンポーネント
function MyComponent() {
  const [value, setValue] = useState(""); // OK
  return <p>{value}</p>;
}

// OK: カスタムHook（useで始まる関数）
function useMyHook() {
  const [value, setValue] = useState(""); // OK
  return [value, setValue];
}`}</code>
        </pre>
      </section>

      {/* useRef */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useRef</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useRef</code> は、
          レンダリング間で値を保持するためのHookです。DOM要素への参照にもよく使われます。
          <strong>useRefの変更は再レンダリングを引き起こしません</strong>。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useRef, useState } from "react";

// DOM要素への参照
function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // DOM要素に直接アクセス
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="ここにフォーカス" />
      <button onClick={handleClick}>フォーカスする</button>
    </div>
  );
}

// レンダリング回数のカウント（再レンダリングなし）
function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // レンダーのたびに増えるが、再レンダリングは起きない
  renderCount.current += 1;

  return (
    <div>
      <p>カウント: {count}</p>
      <p>レンダリング回数: {renderCount.current}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

// 前回の値を記憶する
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  // 現在の値を保存（次のレンダリングで「前回の値」として使える）
  const prevCount = prevCountRef.current;
  prevCountRef.current = count;

  return (
    <div>
      <p>現在: {count}、前回: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* useMemoとuseCallback */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useMemoとuseCallback</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パフォーマンス最適化のためのHooksです。重い計算や関数の再作成を防ぎます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, useMemo, useCallback } from "react";

function ExpensiveComponent({ items, filter }) {
  // useMemo: 計算結果をメモ化（依存配列が変わるまで再計算しない）
  const filteredItems = useMemo(() => {
    console.log("フィルタリング実行...");
    return items.filter(item =>
      item.name.includes(filter)
    );
  }, [items, filter]);  // items または filter が変わった時だけ再計算

  // useCallback: 関数をメモ化（依存配列が変わるまで同じ関数を返す）
  const handleClick = useCallback((id) => {
    console.log("クリック:", id);
  }, []);  // 依存なし → 常に同じ関数

  return (
    <div>
      <p>{filteredItems.length}件</p>
      {filteredItems.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// 注意: useMemo/useCallbackは最適化のためのもの
// すべての値や関数に使う必要はありません
// パフォーマンスに問題がある場合にのみ検討しましょう`}</code>
        </pre>
      </section>

      {/* カスタムHook */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムHook</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ロジックを再利用可能な関数にまとめたものが<strong className="text-green-400">カスタムHook</strong>です。
          名前は必ず <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">use</code> で始めます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, useEffect } from "react";

// カスタムHook: カウンター機能
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// カスタムHook: ローカルストレージと同期
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// カスタムHook: ウィンドウサイズの取得
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

// 使い方
function App() {
  const { count, increment, decrement, reset } = useCounter(0);
  const [name, setName] = useLocalStorage("userName", "");
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>リセット</button>

      <input value={name} onChange={e => setName(e.target.value)} />

      <p>画面サイズ: {width} x {height}</p>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>Hooksは関数コンポーネントでReactの機能を使うための仕組み</li>
          <li>Hooksはトップレベルでのみ呼び出す（条件分岐やループの中はNG）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useRef</code> はDOM参照やレンダリング間の値保持に使う</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useMemo</code> / <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useCallback</code> はパフォーマンス最適化用</li>
          <li>カスタムHookでロジックを再利用可能にする</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="hooks" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="hooks" basePath="/learn/react" color="green" />
    </div>
  );
}
