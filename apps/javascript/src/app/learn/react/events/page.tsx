import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function EventsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イベント処理</h1>
        <p className="text-gray-400">クリック、入力、フォーム送信などのイベントを処理しよう</p>
      </div>

      {/* Reactのイベント処理 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Reactのイベント処理とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactでは、HTMLのイベント属性と似た方法でイベントを処理しますが、いくつかの違いがあります。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1 mb-4">
          <li>イベント名は<strong className="text-green-400">キャメルケース</strong>（<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">onClick</code>、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">onChange</code>）</li>
          <li>文字列ではなく<strong className="text-green-400">関数</strong>を渡す</li>
          <li>Reactの<strong className="text-green-400">SyntheticEvent</strong>（合成イベント）が使われる</li>
        </ul>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// HTML での書き方
// <button onclick="handleClick()">クリック</button>

// React での書き方
function App() {
  const handleClick = () => {
    alert("クリックされました！");
  };

  return (
    <button onClick={handleClick}>クリック</button>
  );

  // 注意: onClick={handleClick()} と書くと
  // レンダリング時に即座に実行されてしまう！
  // () をつけずに関数自体を渡すこと
}`}</code>
        </pre>
      </section>

      {/* onClick */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">onClick イベント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          最も基本的なクリックイベントのパターンを見てみましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState } from "react";

function ClickExamples() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // パターン1: 直接関数を渡す
  const handleIncrement = () => {
    setCount(c => c + 1);
  };

  // パターン2: 引数を渡したい場合はアロー関数で包む
  const handleSetMessage = (text) => {
    setMessage(text);
  };

  // パターン3: イベントオブジェクトを使う
  const handleButtonClick = (event) => {
    console.log("クリックされたボタン:", event.target.textContent);
    console.log("座標:", event.clientX, event.clientY);
  };

  return (
    <div>
      <p>カウント: {count}</p>
      {/* パターン1 */}
      <button onClick={handleIncrement}>+1</button>

      {/* パターン2: 引数を渡す */}
      <button onClick={() => handleSetMessage("こんにちは")}>
        挨拶する
      </button>
      <button onClick={() => handleSetMessage("さようなら")}>
        お別れする
      </button>
      <p>{message}</p>

      {/* パターン3: イベントオブジェクト */}
      <button onClick={handleButtonClick}>イベント情報を表示</button>

      {/* インラインで直接書く */}
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* onChange */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">onChange イベント（入力の処理）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フォーム入力の変化を検知するのが <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">onChange</code> です。
          Reactではフォーム要素を「制御コンポーネント」として扱うのが基本です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState } from "react";

function FormInputs() {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("apple");
  const [checked, setChecked] = useState(false);
  const [textarea, setTextarea] = useState("");

  return (
    <div>
      {/* テキスト入力 */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="テキストを入力"
      />
      <p>入力値: {text}（{text.length}文字）</p>

      {/* セレクトボックス */}
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="apple">りんご</option>
        <option value="banana">バナナ</option>
        <option value="orange">みかん</option>
      </select>
      <p>選択: {selected}</p>

      {/* チェックボックス */}
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        同意する
      </label>
      <p>チェック: {checked ? "ON" : "OFF"}</p>

      {/* テキストエリア */}
      <textarea
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        rows={3}
        placeholder="自由記述..."
      />
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* onSubmit */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">onSubmit イベント（フォーム送信）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フォーム送信時の処理は <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">onSubmit</code> で行います。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">preventDefault()</code> でページのリロードを防ぎます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,  // 動的なキーで更新
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // ページのリロードを防ぐ

    // バリデーション
    if (!formData.name || !formData.email) {
      alert("名前とメールは必須です");
      return;
    }

    console.log("送信データ:", formData);
    setSubmitted(true);

    // フォームをリセット
    setFormData({ name: "", email: "", message: "" });
  };

  if (submitted) {
    return <p>送信完了しました！</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">メール:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="message">メッセージ:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit">送信</button>
    </form>
  );
}`}</code>
        </pre>
      </section>

      {/* その他のイベント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">その他のイベント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactではさまざまなイベントを扱えます。よく使うものを紹介します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function VariousEvents() {
  return (
    <div>
      {/* キーボードイベント */}
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("Enterが押されました");
          }
        }}
        onKeyUp={(e) => console.log("キーが離された:", e.key)}
        placeholder="キーボードイベント"
      />

      {/* マウスイベント */}
      <div
        onMouseEnter={() => console.log("マウスが入った")}
        onMouseLeave={() => console.log("マウスが出た")}
        onMouseMove={(e) => console.log(e.clientX, e.clientY)}
        style={{ padding: "20px", background: "#f0f0f0" }}
      >
        マウスを乗せてください
      </div>

      {/* フォーカスイベント */}
      <input
        onFocus={() => console.log("フォーカスされた")}
        onBlur={() => console.log("フォーカスが外れた")}
        placeholder="フォーカスイベント"
      />

      {/* スクロールイベント */}
      <div
        onScroll={(e) => {
          console.log("スクロール位置:", e.target.scrollTop);
        }}
        style={{ height: "100px", overflow: "auto" }}
      >
        <div style={{ height: "300px" }}>スクロールしてね</div>
      </div>

      {/* ドラッグ＆ドロップ */}
      <div
        draggable
        onDragStart={(e) => console.log("ドラッグ開始")}
        onDragEnd={(e) => console.log("ドラッグ終了")}
      >
        ドラッグしてね
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* イベントの伝播 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">イベントの伝播（バブリング）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          イベントは子要素から親要素へと伝播します。これを止めたい場合は
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">stopPropagation()</code> を使います。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function EventPropagation() {
  return (
    <div onClick={() => console.log("親がクリックされた")}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // 親への伝播を止める
          console.log("ボタンがクリックされた");
        }}
      >
        クリック
      </button>
    </div>
  );
}

// preventDefault: ブラウザのデフォルト動作を防ぐ
function PreventExample() {
  return (
    <div>
      {/* リンクの遷移を防ぐ */}
      <a
        href="https://example.com"
        onClick={(e) => {
          e.preventDefault();
          console.log("リンクがクリックされましたが遷移しません");
        }}
      >
        クリックしても遷移しない
      </a>

      {/* フォームの送信を防ぐ */}
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log("フォームの送信をカスタム処理");
      }}>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>イベント名はキャメルケース（<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">onClick</code>、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">onChange</code>）</li>
          <li>関数を渡す（<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"onClick={handleClick}"}</code>）、呼び出さない</li>
          <li>引数が必要な場合はアロー関数で包む</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">preventDefault()</code> でデフォルト動作を防ぐ</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">stopPropagation()</code> でイベントの伝播を止める</li>
          <li>フォームは「制御コンポーネント」パターンで管理する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="events" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="events" basePath="/learn/react" color="green" />
    </div>
  );
}
