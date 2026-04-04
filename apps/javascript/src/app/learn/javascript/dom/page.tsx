import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function JsDomLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DOM操作</h1>
        <p className="text-gray-400">JavaScriptでHTMLを動的に操作する方法を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DOMとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DOM（Document Object Model）は、HTMLをJavaScriptから操作するためのインターフェースです。
          ブラウザはHTMLを読み込むとDOMツリーを構築し、JavaScriptはこのツリーを通じて要素の取得・変更・追加・削除ができます。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">要素の取得方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DOM操作の第一歩は、操作したい要素を取得することです：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">document.querySelector(&quot;セレクタ&quot;)</code> - CSSセレクタで最初の1つを取得</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">document.querySelectorAll(&quot;セレクタ&quot;)</code> - 該当する全要素を取得</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">document.getElementById(&quot;id&quot;)</code> - IDで要素を1つ取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">要素の取得と内容の変更</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<h2 id="title">初期のタイトル</h2>
<p class="message">メッセージ1</p>
<p class="message">メッセージ2</p>
<button id="change-btn">テキストを変更</button>
<button id="html-btn">HTMLを変更</button>`}
          defaultCss={`body { font-family: sans-serif; padding: 16px; }
button {
  padding: 8px 16px;
  margin: 4px;
  border: none;
  border-radius: 6px;
  background: #6c5ce7;
  color: white;
  cursor: pointer;
  font-size: 14px;
}
button:hover { background: #5b4cdb; }
.message { color: #636e72; }
.highlight { color: #d63031; font-weight: bold; }`}
          defaultJs={`// getElementById で要素を取得
const title = document.getElementById('title');

// textContent でテキストだけ変更
document.getElementById('change-btn').addEventListener('click', () => {
  title.textContent = '変更されたタイトル！';
});

// innerHTML でHTMLごと変更
document.getElementById('html-btn').addEventListener('click', () => {
  title.innerHTML = '<span style="color: #e17055;">HTML</span>で装飾';
});

// querySelectorAll で複数要素を取得
const messages = document.querySelectorAll('.message');
messages.forEach((msg, i) => {
  msg.textContent = 'querySelectorAllで取得したメッセージ ' + (i + 1);
});`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">classList でスタイルを切り替え</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">classList</code> を使うと、CSSクラスの追加・削除・切り替えができます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="box" class="box">クリックで色が変わる</div>
<button id="add-btn">クラスを追加</button>
<button id="remove-btn">クラスを削除</button>
<button id="toggle-btn">クラスを切り替え</button>
<p id="class-info">現在のクラス: </p>`}
          defaultCss={`body { font-family: sans-serif; padding: 16px; }
.box {
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 16px;
  background: #dfe6e9;
  color: #2d3436;
  font-size: 16px;
  transition: all 0.3s ease;
}
.active {
  background: #6c5ce7;
  color: white;
  transform: scale(1.05);
}
.rounded {
  border-radius: 50px;
}
button {
  padding: 8px 14px;
  margin: 4px;
  border: none;
  border-radius: 6px;
  background: #00b894;
  color: white;
  cursor: pointer;
  font-size: 13px;
}
button:hover { opacity: 0.9; }
#class-info { color: #636e72; font-size: 13px; }`}
          defaultJs={`const box = document.getElementById('box');
const info = document.getElementById('class-info');

function updateInfo() {
  info.textContent = '現在のクラス: ' + box.className;
}

// classList.add() - クラスを追加
document.getElementById('add-btn').addEventListener('click', () => {
  box.classList.add('active');
  updateInfo();
});

// classList.remove() - クラスを削除
document.getElementById('remove-btn').addEventListener('click', () => {
  box.classList.remove('active');
  updateInfo();
});

// classList.toggle() - あれば削除、なければ追加
document.getElementById('toggle-btn').addEventListener('click', () => {
  box.classList.toggle('rounded');
  updateInfo();
});

updateInfo();`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">要素の作成と追加</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">createElement</code> と <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">appendChild</code> で新しい要素を動的に追加できます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<input id="item-input" type="text" placeholder="アイテムを入力...">
<button id="add-btn">追加</button>
<ul id="list"></ul>`}
          defaultCss={`body { font-family: sans-serif; padding: 16px; }
input {
  padding: 8px 12px;
  border: 2px solid #dfe6e9;
  border-radius: 6px;
  font-size: 14px;
  width: 200px;
}
input:focus { border-color: #6c5ce7; outline: none; }
button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #6c5ce7;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
}
#list {
  list-style: none;
  padding: 0;
  margin-top: 16px;
}
#list li {
  padding: 10px 14px;
  background: #f8f9fa;
  margin-bottom: 6px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete-btn {
  background: #d63031;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
}`}
          defaultJs={`const input = document.getElementById('item-input');
const list = document.getElementById('list');

function addItem() {
  const text = input.value.trim();
  if (!text) return;

  // createElement で新しいli要素を作成
  const li = document.createElement('li');
  li.textContent = text;

  // 削除ボタンも作成して追加
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    // removeChild で要素を削除
    list.removeChild(li);
  });

  li.appendChild(deleteBtn);

  // appendChild で親要素にli要素を追加
  list.appendChild(li);

  input.value = '';
  input.focus();
}

document.getElementById('add-btn').addEventListener('click', addItem);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addItem();
});`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践: カウンターアプリ</h2>
        <p className="text-gray-400 mb-4">
          学んだDOM操作を組み合わせて、インタラクティブなカウンターを作ってみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="counter-app">
  <h2>カウンター</h2>
  <div class="count" id="count">0</div>
  <div class="buttons">
    <button id="decrement">-1</button>
    <button id="reset">リセット</button>
    <button id="increment">+1</button>
  </div>
</div>`}
          defaultCss={`.counter-app {
  text-align: center;
  font-family: sans-serif;
  padding: 30px;
}
.count {
  font-size: 64px;
  font-weight: bold;
  color: #2d3436;
  margin: 20px 0;
  transition: color 0.3s;
}
.positive { color: #00b894; }
.negative { color: #d63031; }
.buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}
button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
}
button:active { transform: scale(0.95); }
#increment { background: #00b894; color: white; }
#decrement { background: #d63031; color: white; }
#reset { background: #636e72; color: white; }`}
          defaultJs={`let count = 0;
const countEl = document.getElementById('count');

function updateDisplay() {
  countEl.textContent = count;

  // classList で色を動的に変更
  countEl.classList.remove('positive', 'negative');
  if (count > 0) countEl.classList.add('positive');
  if (count < 0) countEl.classList.add('negative');
}

document.getElementById('increment').addEventListener('click', () => {
  count++;
  updateDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
  count--;
  updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
  count = 0;
  updateDisplay();
});`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">querySelector</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">getElementById</code> で要素を取得する</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">textContent</code> でテキストを変更、<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">innerHTML</code> でHTMLごと変更</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">classList.add/remove/toggle</code> でCSSクラスを操作する</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">createElement</code> + <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">appendChild</code> で新しい要素を追加する</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">removeChild</code> で要素を削除する</li>
          <li>DOM操作は、HTML/CSS/JSの知識を組み合わせてインタラクティブなWebページを作る基本技術</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="javascript" lessonId="dom" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="dom" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
