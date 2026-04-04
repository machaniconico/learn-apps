import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { REACT_LESSONS } from "@/lib/lessons-data";

const quizQuestions: QuizQuestion[] = [
  {
    question: "JSXでHTMLのclass属性の代わりに使うものはどれ？",
    options: ["class", "className", "cssClass", "htmlClass"],
    answer: 1,
    explanation: "JSXではJavaScriptの予約語classとの衝突を避けるため、className を使います。",
  },
  {
    question: "JSXの波括弧 {} の中に書けないものはどれ？",
    options: ["変数", "三項演算子", "if文", "関数呼び出し"],
    answer: 2,
    explanation: "if文は「式」ではなく「文」なので、JSXの波括弧の中に直接書くことはできません。代わりに三項演算子や&&演算子を使います。",
  },
  {
    question: "余分なDOM要素を作らずに複数の要素をグループ化するにはどうする？",
    options: [
      "<div>で囲む",
      "<span>で囲む",
      "フラグメント（<>...</>）で囲む",
      "配列に入れる",
    ],
    answer: 2,
    explanation: "フラグメント（<>...</>または<Fragment>...</Fragment>）を使うと、余分なDOMノードを作らずに複数の要素をグループ化できます。",
  },
];

export default function JsxLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSXの基本</h1>
        <p className="text-gray-400">HTMLに似たJavaScriptの構文でUIを記述しよう</p>
      </div>

      {/* JSXとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JSXとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">JSX</strong>（JavaScript XML）は、JavaScriptの中にHTMLのような構文を書ける
          Reactの拡張構文です。ブラウザはJSXを直接理解できませんが、Babelなどのツールが通常のJavaScriptに変換してくれます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          JSXを使うと、UIの構造を直感的に表現できます。HTMLとよく似ていますが、いくつかの重要な違いがあります。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">class</code> の代わりに <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">className</code> を使う</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code> の代わりに <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">htmlFor</code> を使う</li>
          <li>すべてのタグは閉じる必要がある（例：<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<br />"}</code>）</li>
          <li>JSXは1つのルート要素で囲む必要がある</li>
        </ul>
      </section>

      {/* 基本構文 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JSXの基本構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JSXはHTMLとほぼ同じ見た目ですが、JavaScript式を <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> で埋め込むことができます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function Greeting() {
  const name = "太郎";
  const age = 25;

  return (
    <div>
      <h1>こんにちは、{name}さん！</h1>
      <p>あなたは {age} 歳です。</p>
      <p>来年は {age + 1} 歳ですね。</p>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          波括弧 <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> の中には、変数、関数呼び出し、計算式などあらゆるJavaScript式を書くことができます。
        </p>
      </section>

      {/* JavaScript式の埋め込み */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JavaScript式の埋め込み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JSXの <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> 内では、さまざまなJavaScript式を利用できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function Expressions() {
  const items = ["りんご", "バナナ", "みかん"];
  const price = 150;
  const isLoggedIn = true;

  return (
    <div>
      {/* 文字列の結合 */}
      <p>{"Hello, " + "World!"}</p>

      {/* 三項演算子 */}
      <p>{isLoggedIn ? "ログイン中" : "未ログイン"}</p>

      {/* メソッド呼び出し */}
      <p>フルーツ: {items.join("、")}</p>

      {/* 計算式 */}
      <p>税込: {Math.floor(price * 1.1)}円</p>

      {/* テンプレートリテラル */}
      <p>{\`合計 \${items.length} 種類のフルーツ\`}</p>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          注意：<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">if</code> 文や
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code> 文は「式」ではなく「文」なので、
          JSXの波括弧の中に直接書くことはできません。代わりに三項演算子や <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">map()</code> を使います。
        </p>
      </section>

      {/* フラグメント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フラグメント（Fragment）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JSXでは1つのルート要素が必要ですが、余分な <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<div>"}</code> を
          増やしたくない場合があります。そんなときは<strong className="text-green-400">フラグメント</strong>を使います。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { Fragment } from "react";

// 方法1: <Fragment> を使う
function Method1() {
  return (
    <Fragment>
      <h1>タイトル</h1>
      <p>説明文</p>
    </Fragment>
  );
}

// 方法2: 省略記法 <> を使う（よく使う）
function Method2() {
  return (
    <>
      <h1>タイトル</h1>
      <p>説明文</p>
    </>
  );
}

// フラグメントは不要なDOMノードを作らずに
// 複数の要素をグループ化できます`}</code>
        </pre>
      </section>

      {/* 条件付きレンダリング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件付きレンダリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件に応じて異なるUIを表示する方法はいくつかあります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function ConditionalRendering({ isLoggedIn, notifications }) {
  return (
    <div>
      {/* 方法1: 三項演算子 */}
      {isLoggedIn ? (
        <p>ようこそ！</p>
      ) : (
        <p>ログインしてください</p>
      )}

      {/* 方法2: && 演算子（条件がtrueの時だけ表示） */}
      {notifications > 0 && (
        <span>通知が {notifications} 件あります</span>
      )}

      {/* 方法3: 早期return（コンポーネント全体を分岐） */}
      {/* → 別のコンポーネントで使うパターン */}
    </div>
  );
}

// 方法3の例：早期return
function UserProfile({ user }) {
  if (!user) {
    return <p>ユーザーが見つかりません</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* スタイルの適用 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JSXでのスタイル適用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JSXでスタイルを適用する方法を確認しましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function StyledComponent() {
  // インラインスタイル（オブジェクトで指定）
  const headerStyle = {
    color: "blue",
    fontSize: "24px",       // キャメルケースで書く
    backgroundColor: "#f0f0f0",
    padding: "16px",
  };

  return (
    <div>
      {/* className でCSSクラスを適用 */}
      <h1 className="title main-title">タイトル</h1>

      {/* インラインスタイル */}
      <h2 style={headerStyle}>スタイル付きヘッダー</h2>

      {/* インラインで直接書くことも可能 */}
      <p style={{ color: "red", fontWeight: "bold" }}>
        赤い太字テキスト
      </p>

      {/* 動的なクラス名 */}
      <div className={\`card \${isActive ? "active" : ""}\`}>
        動的クラス
      </div>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          インラインスタイルはJavaScriptオブジェクトで指定し、CSSプロパティ名はキャメルケース
          （<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">font-size</code> →
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">fontSize</code>）に変換します。
        </p>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="green" />
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>JSXはJavaScriptの中にHTMLライクな構文を書ける仕組み</li>
          <li>波括弧 <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> でJavaScript式を埋め込める</li>
          <li>フラグメント <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<></>"}</code> で余分なDOM要素なしにグループ化</li>
          <li>三項演算子や <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">&&</code> で条件付きレンダリング</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">className</code> と <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">style</code> でスタイルを適用</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="jsx" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="jsx" basePath="/learn/react" color="green" />
    </div>
  );
}
