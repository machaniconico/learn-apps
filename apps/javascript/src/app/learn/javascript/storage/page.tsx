import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function StorageLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン13</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ローカルストレージ</h1>
        <p className="text-gray-400">ブラウザにデータを保存する方法を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Web Storageとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Web Storage APIを使うと、ブラウザにキーと値のペアでデータを保存できます。
          サーバーへの通信なしにデータを永続化できるため、ユーザー設定やフォームの入力内容の保存に便利です。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">localStorage</code> — ブラウザを閉じても保持されるストレージ</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">sessionStorage</code> — タブを閉じると消えるストレージ</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">setItem(key, value)</code> — データの保存</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">getItem(key)</code> — データの取得</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">removeItem(key)</code> — データの削除</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">JSON.stringify()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">JSON.parse()</code> — オブジェクトの保存</li>
        </ul>
        <p className="text-gray-400 text-sm mt-3">
          ※ CodePlayground内のiframeではlocalStorageにアクセスできないため、以下の例ではシミュレーションを使用しています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な操作</h2>
        <p className="text-gray-400 mb-4">setItem、getItem、removeItemの基本操作を確認しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.code { background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-size: 13px; white-space: pre; margin-bottom: 8px; }
.note { background: #eff6ff; border-left: 3px solid #3b82f6; padding: 8px 12px; border-radius: 4px; font-size: 13px; color: #1e40af; margin-top: 8px; }`}
          defaultJs={`const out = document.getElementById("output");

// localStorageのシミュレーション
const storage = {};

// setItem: データを保存
storage["username"] = "太郎";
storage["theme"] = "dark";
storage["fontSize"] = "16";

// getItem: データを取得
const username = storage["username"];
const theme = storage["theme"];
const missing = storage["nothing"] || null; // 存在しないキー

// オブジェクトの保存にはJSON.stringify/parseが必要
const userObj = { name: "花子", age: 30, hobbies: ["読書", "映画"] };
storage["user"] = JSON.stringify(userObj);
const restored = JSON.parse(storage["user"]);

// removeItem: データの削除
delete storage["fontSize"];

// すべてのキーを取得
const allKeys = Object.keys(storage);

out.innerHTML = \`
<div class="section">
  <h3>setItem — データの保存</h3>
  <div class="code">localStorage.setItem("username", "太郎");
localStorage.setItem("theme", "dark");</div>
</div>
<div class="section">
  <h3>getItem — データの取得</h3>
  <div class="code">const username = localStorage.getItem("username");
const theme = localStorage.getItem("theme");
const missing = localStorage.getItem("nothing"); // null</div>
  <div class="result">username → "\${username}"
theme → "\${theme}"
missing → \${missing}</div>
</div>
<div class="section">
  <h3>オブジェクトの保存（JSON.stringify/parse）</h3>
  <div class="code">// 保存時: オブジェクトを文字列に変換
localStorage.setItem("user", JSON.stringify(userObj));

// 取得時: 文字列をオブジェクトに復元
const restored = JSON.parse(localStorage.getItem("user"));</div>
  <div class="result">保存: \${JSON.stringify(userObj)}
復元: name="\${restored.name}", hobbies=[\${restored.hobbies.join(", ")}]</div>
</div>
<div class="section">
  <h3>removeItem — データの削除</h3>
  <div class="code">localStorage.removeItem("fontSize");
localStorage.clear(); // すべて削除</div>
  <div class="result">残りのキー: [\${allKeys.map(k => '"' + k + '"').join(", ")}]</div>
</div>
<div class="note">
  ⚠ localStorage は文字列のみ保存可能です。オブジェクトや配列は必ず JSON.stringify() で変換してから保存しましょう。
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">localStorageとsessionStorageの違い</h2>
        <p className="text-gray-400 mb-4">2つのストレージの使い分けを理解しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-size: 14px; white-space: pre-wrap; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; }
th, td { padding: 10px 12px; border: 1px solid #ddd; text-align: left; font-size: 14px; }
th { background: #f59e0b; color: #fff; }
.example { background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; white-space: pre; margin: 8px 0; }`}
          defaultJs={`const out = document.getElementById("output");

out.innerHTML = \`
<div class="section">
  <h3>localStorage vs sessionStorage 比較</h3>
  <table>
    <tr>
      <th>特性</th>
      <th>localStorage</th>
      <th>sessionStorage</th>
    </tr>
    <tr>
      <td>永続性</td>
      <td>明示的に削除するまで保持</td>
      <td>タブ/ウィンドウを閉じると消える</td>
    </tr>
    <tr>
      <td>容量</td>
      <td>約5MB</td>
      <td>約5MB</td>
    </tr>
    <tr>
      <td>共有範囲</td>
      <td>同じドメインの全タブ</td>
      <td>そのタブのみ</td>
    </tr>
    <tr>
      <td>用途例</td>
      <td>テーマ設定、ログイン情報</td>
      <td>一時的なフォームデータ</td>
    </tr>
  </table>
</div>

<div class="section">
  <h3>実践的な使用例</h3>
  <div class="example">// テーマ設定を保存
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.body.className = theme;
}

// ページ読み込み時に復元
function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.body.className = saved;
  }
}

// カート情報を保存
function addToCart(item) {
  const cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// フォームの一時保存（sessionStorage）
function autoSave() {
  const data = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value
  };
  sessionStorage.setItem("draft", JSON.stringify(data));
}</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">ストレージを使ったメモ帳アプリを作ってみましょう（シミュレーション版）。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>メモ帳（ストレージシミュレーション）</h2>
  <div class="input-area">
    <input type="text" id="noteInput" placeholder="メモを入力...">
    <button onclick="addNote()">追加</button>
  </div>
  <div id="notes"></div>
  <div class="footer">
    <button onclick="clearAll()" class="danger">すべて削除</button>
    <span id="count"></span>
  </div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; }
.input-area { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; }
button { background: #f59e0b; color: #fff; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; }
button:hover { background: #d97706; }
.danger { background: #ef4444; }
.danger:hover { background: #dc2626; }
.note { background: #f5f5f5; padding: 10px 12px; margin: 6px 0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; }
.note-text { flex: 1; }
.note-time { color: #999; font-size: 12px; margin: 0 12px; }
.del-btn { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px; padding: 0 4px; }
.footer { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; }
#count { color: #999; font-size: 14px; }`}
          defaultJs={`// ストレージのシミュレーション
const store = { notes: [] };

function saveToStorage() {
  // 実際のコード: localStorage.setItem("notes", JSON.stringify(store.notes));
}

function loadFromStorage() {
  // 実際のコード:
  // const saved = localStorage.getItem("notes");
  // if (saved) store.notes = JSON.parse(saved);
}

function render() {
  const notesDiv = document.getElementById("notes");
  if (store.notes.length === 0) {
    notesDiv.innerHTML = '<div style="color:#999;text-align:center;padding:20px">メモがありません</div>';
  } else {
    notesDiv.innerHTML = store.notes.map((note, i) =>
      '<div class="note">' +
        '<span class="note-text">' + note.text + '</span>' +
        '<span class="note-time">' + note.time + '</span>' +
        '<button class="del-btn" onclick="deleteNote(' + i + ')">×</button>' +
      '</div>'
    ).join("");
  }
  document.getElementById("count").textContent = store.notes.length + "件のメモ";
}

function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();
  if (!text) return;

  store.notes.unshift({
    text: text,
    time: new Date().toLocaleTimeString()
  });
  saveToStorage();
  input.value = "";
  render();
}

function deleteNote(index) {
  store.notes.splice(index, 1);
  saveToStorage();
  render();
}

function clearAll() {
  store.notes = [];
  saveToStorage();
  // 実際のコード: localStorage.removeItem("notes");
  render();
}

document.getElementById("noteInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNote();
});

loadFromStorage();
render();`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="storage" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="storage" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
