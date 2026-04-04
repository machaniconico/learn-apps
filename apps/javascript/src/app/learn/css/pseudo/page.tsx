import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function PseudoLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">疑似クラス・疑似要素</h1>
        <p className="text-gray-400">:hover、:nth-child、::before、::afterで要素を柔軟にスタイリングしよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">疑似クラスと疑似要素の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          疑似クラス（:）は要素の「状態」を、疑似要素（::）は要素の「一部」をスタイリングします：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">:hover</code> - マウスが乗っている時</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">:focus</code> - フォーカスされている時（入力欄など）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">:active</code> - クリック中の状態</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">:nth-child(n)</code> - n番目の子要素を選択</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">::before</code> - 要素の前にコンテンツを挿入</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">::after</code> - 要素の後にコンテンツを挿入</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">::placeholder</code> - プレースホルダーのスタイル</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">状態を表す疑似クラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">:hover</code>、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">:focus</code>、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">:active</code>でユーザーの操作に反応するスタイルを作れます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h3>ボタンの状態変化</h3>
<button class="btn">ホバー・クリックしてみよう</button>

<h3>リンクの状態</h3>
<a href="#" class="link">リンクテキスト</a>

<h3>フォーム入力の状態</h3>
<input type="text" class="input" placeholder="ここをクリックしてフォーカス">

<h3>:nth-child で交互に色分け</h3>
<ul class="list">
  <li>アイテム 1</li>
  <li>アイテム 2</li>
  <li>アイテム 3</li>
  <li>アイテム 4</li>
  <li>アイテム 5</li>
  <li>アイテム 6</li>
</ul>`}
          defaultCss={`h3 {
  font-family: sans-serif;
  font-size: 15px;
  margin: 16px 0 8px;
  color: #2d3436;
}

/* ボタンの状態 */
.btn {
  padding: 12px 28px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-family: sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover {
  background: #5f3dc4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108,92,231,0.4);
}
.btn:active {
  background: #4c2ea0;
  transform: translateY(0);
}

/* リンクの状態 */
.link {
  color: #0984e3;
  font-family: sans-serif;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.2s;
}
.link:hover { color: #e17055; text-decoration: underline; }
.link:active { color: #d63031; }

/* 入力の状態 */
.input {
  display: block;
  width: 300px;
  padding: 10px 14px;
  border: 2px solid #dfe6e9;
  border-radius: 8px;
  font-size: 15px;
  font-family: sans-serif;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.input:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 3px rgba(108,92,231,0.2);
}
.input::placeholder {
  color: #b2bec3;
  font-style: italic;
}

/* nth-child */
.list {
  list-style: none;
  padding: 0;
  font-family: sans-serif;
}
.list li {
  padding: 10px 16px;
  border-radius: 6px;
  margin: 2px 0;
}
.list li:nth-child(odd) {
  background: #dfe6e9;
}
.list li:nth-child(even) {
  background: #b2bec3;
  color: white;
}
.list li:first-child {
  font-weight: bold;
  background: #6c5ce7;
  color: white;
}
.list li:last-child {
  font-weight: bold;
  background: #00b894;
  color: white;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">::beforeと::after</h2>
        <p className="text-gray-400 mb-4">
          疑似要素を使うと、HTMLを追加せずに装飾的なコンテンツを挿入できます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">content</code>プロパティが必須です。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h2 class="decorated-title">セクション見出し</h2>

<blockquote class="quote">
  学びの道に近道はない。しかし、楽しむことはできる。
</blockquote>

<ul class="check-list">
  <li>HTMLの基礎を学んだ</li>
  <li>CSSの基礎を学んだ</li>
  <li>アニメーションを学んだ</li>
</ul>

<span class="tooltip" data-tip="これはツールチップです！">ここにマウスを乗せて</span>`}
          defaultCss={`/* 見出しの装飾線 */
.decorated-title {
  font-family: sans-serif;
  font-size: 22px;
  position: relative;
  padding-bottom: 10px;
  color: #2d3436;
}
.decorated-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #6c5ce7, #0984e3);
  border-radius: 2px;
}

/* 引用符の装飾 */
.quote {
  font-family: sans-serif;
  font-size: 16px;
  color: #636e72;
  padding: 16px 24px;
  border-left: 4px solid #6c5ce7;
  background: #f8f9fa;
  border-radius: 0 8px 8px 0;
  position: relative;
  margin: 20px 0;
}
.quote::before {
  content: "\\201C";
  font-size: 48px;
  color: #6c5ce7;
  position: absolute;
  top: -10px;
  left: 8px;
  opacity: 0.3;
}

/* チェックリスト */
.check-list {
  list-style: none;
  padding: 0;
  font-family: sans-serif;
}
.check-list li {
  padding: 8px 0 8px 30px;
  position: relative;
}
.check-list li::before {
  content: "\\2714";
  position: absolute;
  left: 0;
  color: #00b894;
  font-size: 16px;
}

/* ツールチップ */
.tooltip {
  font-family: sans-serif;
  color: #0984e3;
  border-bottom: 1px dashed #0984e3;
  cursor: help;
  position: relative;
  display: inline-block;
  margin-top: 16px;
}
.tooltip::after {
  content: attr(data-tip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #2d3436;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  margin-bottom: 6px;
}
.tooltip:hover::after {
  opacity: 1;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- 疑似クラス・疑似要素を自由に使ってみよう -->
<ul class="my-list">
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>`}
          defaultCss={`.my-list {
  list-style: none;
  padding: 0;
  font-family: sans-serif;
}
.my-list li {
  padding: 10px 16px;
  margin: 4px 0;
  border-radius: 8px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background 0.2s;
}
.my-list li:hover {
  background: #6c5ce7;
  color: white;
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="pseudo" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="pseudo" basePath="/learn/css" color="blue" />
    </div>
  );
}
