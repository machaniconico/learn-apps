import { CodePlayground } from "@/components/code-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { JS_LESSONS } from "@/lib/lessons-data";

const quizQuestions: QuizQuestion[] = [
  {
    question: "JavaScriptで再代入できない変数を宣言するキーワードはどれ？",
    options: ["var", "let", "const", "static"],
    answer: 2,
    explanation: "constは再代入できない定数を宣言します。letは再代入可能な変数、varは古い書き方で現在は非推奨です。",
  },
  {
    question: "JavaScriptで正しい文字列の結合方法はどれ？",
    options: [
      "'Hello' + ' World'",
      "'Hello' & ' World'",
      "'Hello' . ' World'",
      "'Hello' , ' World'",
    ],
    answer: 0,
    explanation: "JavaScriptでは + 演算子で文字列を結合できます。テンプレートリテラル（`Hello ${name}`）も使えます。",
  },
  {
    question: "document.getElementById('myId') は何を返す？",
    options: [
      "指定したclassを持つすべての要素",
      "指定したidを持つ1つの要素",
      "指定したタグ名のすべての要素",
      "HTMLドキュメント全体",
    ],
    answer: 1,
    explanation: "getElementByIdは指定したid属性を持つ単一の要素を返します。idはページ内で一意である必要があります。",
  },
  {
    question: "JavaScriptのデータ型として存在しないものはどれ？",
    options: ["string", "boolean", "number", "float"],
    answer: 3,
    explanation: "JavaScriptにはfloat型はありません。整数も小数もすべてnumber型として扱われます。string、boolean、numberは基本的なデータ型です。",
  },
];

export default function JavaScriptLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">JavaScript入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">Webページに動きとインタラクティブ性を加える言語を学びましょう</p>
      </div>

      <ProgressBar categoryId="javascript" totalLessons={15} color="yellow" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全15レッスン</h2>
        <LessonList lessons={JS_LESSONS} basePath="/learn/javascript" color="yellow" />
      </section>

      {/* JavaScriptとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JavaScriptとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">JavaScript</strong>は、Webページに動きやロジックを加える
          プログラミング言語です。HTMLが骨格、CSSがデザインなら、JavaScriptは「動き」と「頭脳」を担当します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          ボタンをクリックした時の反応、フォームの入力チェック、アニメーション、
          サーバーとのデータ通信など、現代のWebアプリのほぼすべての動的な部分はJavaScriptで実装されています。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">動的な操作</h3>
            <p className="text-sm text-gray-400">ページの内容をリアルタイムに変更できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128433;</div>
            <h3 className="font-semibold text-white mb-1">イベント処理</h3>
            <p className="text-sm text-gray-400">クリック、入力、スクロールなどに反応</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#127757;</div>
            <h3 className="font-semibold text-white mb-1">フルスタック</h3>
            <p className="text-sm text-gray-400">ブラウザでもサーバーでも動く万能言語</p>
          </div>
        </div>
      </section>

      {/* 変数とデータ型 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数とデータ型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">let</code>や
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code>でデータを保存する「箱」を作ります。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultJs={`const output = document.getElementById('output');

// 文字列
const name = "太郎";

// 数値
const age = 25;

// 真偽値
const isStudent = true;

// 配列
const hobbies = ["読書", "ゲーム", "料理"];

// 結果を表示
output.innerHTML = \`
  <h2>自己紹介</h2>
  <p>名前: \${name}</p>
  <p>年齢: \${age}歳</p>
  <p>学生: \${isStudent ? "はい" : "いいえ"}</p>
  <p>趣味: \${hobbies.join("、")}</p>
\`;`}
          defaultCss={`#output {
  font-family: sans-serif;
  padding: 16px;
}
h2 { color: #6c5ce7; }
p { margin: 4px 0; }`}
        />
      </section>

      {/* 条件分岐 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐（if/else）</h2>
        <p className="text-gray-400 mb-4">
          条件によって処理を分けることができます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h2>年齢チェッカー</h2>
<input type="number" id="ageInput" placeholder="年齢を入力" value="20">
<button id="checkBtn">チェック</button>
<p id="result"></p>`}
          defaultJs={`const btn = document.getElementById('checkBtn');
const input = document.getElementById('ageInput');
const result = document.getElementById('result');

btn.addEventListener('click', () => {
  const age = Number(input.value);

  if (age < 0 || isNaN(age)) {
    result.textContent = "正しい年齢を入力してください";
    result.style.color = "red";
  } else if (age < 13) {
    result.textContent = age + "歳: こども";
    result.style.color = "#00b894";
  } else if (age < 20) {
    result.textContent = age + "歳: ティーンエイジャー";
    result.style.color = "#0984e3";
  } else {
    result.textContent = age + "歳: おとな";
    result.style.color = "#6c5ce7";
  }
});`}
          defaultCss={`input {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  width: 120px;
}
button {
  padding: 8px 16px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
}
#result {
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
}`}
        />
      </section>

      {/* DOM操作 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DOM操作</h2>
        <p className="text-gray-400 mb-4">
          JavaScriptでHTMLの要素を動的に変更できます。これがWebアプリの核心です。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h2>TODOリスト</h2>
<div style="display:flex;gap:8px;margin-bottom:12px;">
  <input type="text" id="todoInput" placeholder="やることを入力...">
  <button id="addBtn">追加</button>
</div>
<ul id="todoList"></ul>
<p id="count">0件のタスク</p>`}
          defaultJs={`const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');
const count = document.getElementById('count');

function updateCount() {
  const items = list.querySelectorAll('li');
  count.textContent = items.length + '件のタスク';
}

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  // 新しいli要素を作成
  const li = document.createElement('li');
  li.textContent = text;
  li.style.cursor = 'pointer';

  // クリックで削除
  li.addEventListener('click', () => {
    li.remove();
    updateCount();
  });

  list.appendChild(li);
  input.value = '';
  updateCount();
});

// Enterキーでも追加
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});`}
          defaultCss={`input {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  flex: 1;
}
button {
  padding: 8px 16px;
  background: #00b894;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
li:hover {
  color: red;
  text-decoration: line-through;
}
#count { color: #636e72; font-size: 14px; }`}
        />
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="yellow" />
      </section>

      {/* 自由に試す */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">
          HTML + CSS + JavaScriptを組み合わせて、自由にWebアプリを作ってみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h1 id="title">カウンター</h1>
<p id="counter">0</p>
<button id="increment">+1</button>
<button id="decrement">-1</button>
<button id="reset">リセット</button>`}
          defaultCss={`body { text-align: center; padding-top: 20px; }
#counter {
  font-size: 64px;
  font-weight: bold;
  color: #6c5ce7;
  margin: 16px 0;
}
button {
  padding: 10px 20px;
  margin: 4px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  color: white;
}
#increment { background: #00b894; }
#decrement { background: #e17055; }
#reset { background: #636e72; }`}
          defaultJs={`let count = 0;
const display = document.getElementById('counter');

document.getElementById('increment')
  .addEventListener('click', () => {
    count++;
    display.textContent = count;
  });

document.getElementById('decrement')
  .addEventListener('click', () => {
    count--;
    display.textContent = count;
  });

document.getElementById('reset')
  .addEventListener('click', () => {
    count = 0;
    display.textContent = count;
  });`}
        />
      </section>
    </div>
  );
}
