"use client";

import { CodePlayground } from "@/components/code-playground";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* Project 1: To-Doリスト管理 */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">To-Doリスト管理</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-300 mb-2">配列とオブジェクトを使ってタスク管理アプリを作りましょう。タスクの追加・削除・完了切り替えを実装します。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>タスクをオブジェクト（id, text, done）として管理する</li>
            <li>新しいタスクを配列に追加できる</li>
            <li>タスクの完了状態をトグルできる</li>
            <li>完了済みタスクを削除できる</li>
            <li>未完了・完了済みのタスク数を表示する</li>
          </ul>
        </div>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>To-Doリスト</h2>
  <div id="input-area">
    <input id="task-input" type="text" placeholder="新しいタスクを入力..." />
    <button onclick="addTask()">追加</button>
  </div>
  <div id="stats"></div>
  <ul id="task-list"></ul>
  <button onclick="clearDone()">完了済みを削除</button>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 20px auto; font-family: sans-serif; }
h2 { color: #f59e0b; }
#input-area { display: flex; gap: 8px; margin-bottom: 12px; }
#task-input { flex: 1; padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
button { padding: 8px 14px; background: #f59e0b; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
#stats { color: #666; font-size: 13px; margin-bottom: 8px; }
ul { list-style: none; padding: 0; }
li { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #f5f5f5; border-radius: 6px; margin-bottom: 6px; }
li.done span.text { text-decoration: line-through; color: #999; }
span.text { flex: 1; font-size: 14px; }`}
          defaultJs={`// タスクの配列（各要素は { id, text, done } のオブジェクト）
let tasks = [];
let nextId = 1;

// TODO: タスクを追加する関数を実装する
function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  // TODO: textが空なら何もしない
  // TODO: { id: nextId++, text: text, done: false } を tasks に追加
  // TODO: input をクリア
  render();
}

// TODO: タスクの完了状態を切り替える関数を実装する
function toggleTask(id) {
  // TODO: tasks から id が一致する要素を find して done を反転させる
  render();
}

// TODO: 完了済みタスクを削除する関数を実装する
function clearDone() {
  // TODO: tasks を filter して done が false のものだけ残す
  render();
}

// 画面を再描画する（変更不要）
function render() {
  const list = document.getElementById("task-list");
  const stats = document.getElementById("stats");
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  stats.textContent = \`合計: \${total}件 / 完了: \${done}件 / 未完了: \${total - done}件\`;
  list.innerHTML = tasks.map(t => \`
    <li class="\${t.done ? "done" : ""}">
      <input type="checkbox" \${t.done ? "checked" : ""} onchange="toggleTask(\${t.id})" />
      <span class="text">\${t.text}</span>
    </li>
  \`).join("");
}

render();`}
        />
      </section>

      {/* Project 2: カウントダウンタイマー */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">カウントダウンタイマー</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-300 mb-2">非同期処理とDOM操作を使ってカウントダウンタイマーを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>秒数を入力してスタートできる</li>
            <li>1秒ごとにカウントが減っていく（setIntervalを使用）</li>
            <li>0になったら「時間切れ！」と表示して止まる</li>
            <li>途中でリセットできる</li>
            <li>残り時間に応じて色が変わる（10秒以下で赤）</li>
          </ul>
        </div>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>カウントダウンタイマー</h2>
  <div id="display">00</div>
  <div id="input-area">
    <input id="seconds-input" type="number" min="1" max="999" value="30" />
    <button id="start-btn" onclick="startTimer()">スタート</button>
    <button onclick="resetTimer()">リセット</button>
  </div>
  <div id="message"></div>
</div>`}
          defaultCss={`#app { max-width: 400px; margin: 30px auto; text-align: center; font-family: sans-serif; }
h2 { color: #f59e0b; }
#display { font-size: 80px; font-weight: bold; color: #1a1a1a; margin: 20px 0; transition: color 0.3s; }
#display.warning { color: #ef4444; }
#input-area { display: flex; gap: 8px; justify-content: center; margin-bottom: 12px; }
input[type=number] { width: 80px; padding: 8px; text-align: center; border: 2px solid #ccc; border-radius: 6px; font-size: 16px; }
button { padding: 8px 16px; background: #f59e0b; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
#message { font-size: 20px; font-weight: bold; color: #ef4444; min-height: 28px; }`}
          defaultJs={`let timerId = null;
let remaining = 0;

// TODO: タイマーをスタートする関数を実装する
function startTimer() {
  // TODO: すでに動いていたら何もしない（timerId が null でなければ return）
  // TODO: input から秒数を取得して remaining にセット（parseInt を使う）
  // TODO: 0以下なら return
  // TODO: setInterval を使って 1000ms ごとに tick() を呼び出し、timerId に格納
  tick(); // 最初の表示を即座に更新
}

// TODO: 1秒ごとに呼ばれる関数を実装する
function tick() {
  // TODO: remaining を 1 減らす
  // TODO: updateDisplay() を呼ぶ
  // TODO: remaining が 0 以下になったら stopTimer() を呼び、メッセージを表示する
}

// タイマーを停止する（変更不要）
function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

// TODO: リセットする関数を実装する
function resetTimer() {
  // TODO: stopTimer() を呼ぶ
  // TODO: remaining を 0 にする
  // TODO: display を "00" にして warning クラスを除去する
  // TODO: message を空にする
}

// 表示を更新する（変更不要）
function updateDisplay() {
  const display = document.getElementById("display");
  const msg = document.getElementById("message");
  display.textContent = String(remaining).padStart(2, "0");
  if (remaining <= 10 && remaining > 0) {
    display.classList.add("warning");
  } else {
    display.classList.remove("warning");
  }
  msg.textContent = "";
}

updateDisplay();`}
        />
      </section>

      {/* Project 3: 簡易計算機 */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">簡易計算機</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-300 mb-2">関数と条件分岐を使って四則演算ができる計算機を作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>2つの数値と演算子（+, -, *, /）を受け取って計算する</li>
            <li>ゼロ除算のエラーを適切に処理する</li>
            <li>計算履歴を配列で管理して表示する</li>
            <li>結果を小数点2桁まで表示する</li>
          </ul>
        </div>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>簡易計算機</h2>
  <div id="form">
    <input id="num1" type="number" placeholder="数値1" value="10" />
    <select id="operator">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">×</option>
      <option value="/">÷</option>
    </select>
    <input id="num2" type="number" placeholder="数値2" value="3" />
    <button onclick="calculate()">=</button>
  </div>
  <div id="result"></div>
  <div id="history-section">
    <h3>計算履歴</h3>
    <ul id="history-list"></ul>
    <button onclick="clearHistory()">履歴をクリア</button>
  </div>
</div>`}
          defaultCss={`#app { max-width: 450px; margin: 20px auto; font-family: sans-serif; }
h2, h3 { color: #f59e0b; }
#form { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
input[type=number] { width: 90px; padding: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; text-align: center; }
select { padding: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; }
button { padding: 8px 16px; background: #f59e0b; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
#result { font-size: 24px; font-weight: bold; margin: 12px 0; min-height: 32px; }
.error { color: #ef4444; }
ul { list-style: none; padding: 0; }
li { padding: 6px 12px; background: #f5f5f5; border-radius: 6px; margin-bottom: 4px; font-size: 14px; font-family: monospace; }`}
          defaultJs={`let history = [];

// TODO: 演算子に応じて計算を行う関数を実装する
function compute(a, b, op) {
  // TODO: switch文または if/else を使って op ごとに計算を返す
  // TODO: "/" で b が 0 の場合は null を返す（ゼロ除算エラー）
  // 例: "+" なら a + b を返す
}

// TODO: 計算ボタンを押したときの処理を実装する
function calculate() {
  const a = parseFloat(document.getElementById("num1").value);
  const b = parseFloat(document.getElementById("num2").value);
  const op = document.getElementById("operator").value;
  const resultEl = document.getElementById("result");

  // TODO: a または b が NaN なら "数値を入力してください" を表示して return
  // TODO: compute(a, b, op) を呼んで result に格納
  // TODO: result が null なら "エラー: ゼロ除算" を error クラス付きで表示して return
  // TODO: result を小数点2桁まで表示（toFixed(2)）
  // TODO: 計算式を history 配列の先頭に追加する（例: "10 + 3 = 13.00"）
  renderHistory();
}

// 履歴を表示する（変更不要）
function renderHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = history.map(h => \`<li>\${h}</li>\`).join("");
}

// TODO: 履歴をクリアする関数を実装する
function clearHistory() {
  // TODO: history を空配列にして renderHistory() を呼ぶ
}

renderHistory();`}
        />
      </section>

      {/* Project 4: データ変換パイプライン */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">データ変換パイプライン</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-300 mb-2">配列メソッドのチェーンを駆使して、商品データを分析・変換するパイプラインを構築しましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>在庫ありの商品だけ抽出する（filter）</li>
            <li>カテゴリごとに税込み価格を計算する（map）</li>
            <li>価格の高い順に並べ替える（sort）</li>
            <li>カテゴリ別の合計金額を集計する（reduce）</li>
            <li>上位3件の商品名と価格を表示する（slice）</li>
          </ul>
        </div>
        <CodePlayground
          mode="javascript"
          defaultJs={`// 商品データ
const products = [
  { name: "ノートPC", category: "電子機器", price: 89800, inStock: true },
  { name: "マウス", category: "電子機器", price: 3200, inStock: true },
  { name: "机", category: "家具", price: 25000, inStock: false },
  { name: "椅子", category: "家具", price: 18000, inStock: true },
  { name: "キーボード", category: "電子機器", price: 7500, inStock: true },
  { name: "本棚", category: "家具", price: 12000, inStock: true },
  { name: "モニター", category: "電子機器", price: 42000, inStock: false },
  { name: "ヘッドセット", category: "電子機器", price: 15000, inStock: true },
];

const TAX_RATE = 1.1; // 消費税10%

// TODO: Step 1 - 在庫ありの商品だけ抽出する
const inStockProducts = products
  // TODO: .filter() を使って inStock が true のものだけ残す
  ;

// TODO: Step 2 - 税込み価格を追加する
const withTax = inStockProducts
  // TODO: .map() を使って { ...product, taxPrice: Math.round(product.price * TAX_RATE) } を返す
  ;

// TODO: Step 3 - 税込み価格の高い順に並べる
const sorted = withTax
  // TODO: .sort() を使って taxPrice の降順に並べる（元配列を変えないようスプレッドで複製してから）
  ;

// TODO: Step 4 - カテゴリ別の合計金額を集計する
const categoryTotals = withTax.reduce((acc, product) => {
  // TODO: acc[product.category] が未定義なら 0 で初期化し、taxPrice を加算する
  return acc;
}, {});

// TODO: Step 5 - 上位3件を表示する
console.log("=== 税込み価格ランキング TOP3 ===");
sorted
  // TODO: .slice(0, 3) で上位3件に絞り、forEach で名前と税込み価格を出力する
  ;

console.log("\\n=== カテゴリ別合計 ===");
// TODO: Object.entries(categoryTotals) を forEach して各カテゴリと合計を出力する
`}
        />
      </section>
    </div>
  );
}
