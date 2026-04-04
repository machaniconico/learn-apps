import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function JsConditionsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件分岐</h1>
        <p className="text-gray-400">条件によって異なる処理を実行する方法を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件分岐は、ある条件が真（true）か偽（false）かによって実行する処理を切り替える仕組みです。
          プログラムに「判断力」を持たせる最も基本的な制御構文です。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件式で使う比較演算子を確認しましょう：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">===</code> - 厳密等価（値と型が同じ）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">!==</code> - 厳密不等価</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt;</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;</code> - より大きい / より小さい</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt;=</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;=</code> - 以上 / 以下</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&amp;&amp;</code> - AND（両方true）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">||</code> - OR（どちらかtrue）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">!</code> - NOT（反転）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">if / else 文</h2>
        <CodePlayground
          mode="javascript"
          defaultHtml={`<div id="output" style="font-family: monospace; padding: 16px; line-height: 1.8;"></div>`}
          defaultJs={`const output = document.getElementById('output');
let result = '';

const score = 75;

// 基本の if 文
if (score >= 80) {
  result += score + '点 → 合格！\\n';
} else {
  result += score + '点 → 不合格...\\n';
}

// if / else if / else
const grade = 92;
if (grade >= 90) {
  result += grade + '点 → 評価: A（素晴らしい！）\\n';
} else if (grade >= 80) {
  result += grade + '点 → 評価: B（よくできました）\\n';
} else if (grade >= 70) {
  result += grade + '点 → 評価: C（がんばりましょう）\\n';
} else {
  result += grade + '点 → 評価: D（再テスト）\\n';
}

// AND (&&) と OR (||) の組み合わせ
const age = 20;
const hasTicket = true;

result += '\\n--- 入場チェック ---\\n';
if (age >= 18 && hasTicket) {
  result += '入場OK（18歳以上 かつ チケットあり）\\n';
}

// NOT (!)
const isClosed = false;
if (!isClosed) {
  result += 'お店は営業中です\\n';
}

output.textContent = result;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch 文</h2>
        <p className="text-gray-400 mb-4">
          1つの値に対して複数の分岐がある場合、switch文が見やすくなります。
        </p>
        <CodePlayground
          mode="javascript"
          defaultHtml={`<div id="output" style="font-family: monospace; padding: 16px; line-height: 1.8;"></div>`}
          defaultJs={`const output = document.getElementById('output');
let result = '';

const day = new Date().getDay(); // 0=日, 1=月, ... 6=土
let dayName;

switch (day) {
  case 0:
    dayName = '日曜日';
    break;
  case 1:
    dayName = '月曜日';
    break;
  case 2:
    dayName = '火曜日';
    break;
  case 3:
    dayName = '水曜日';
    break;
  case 4:
    dayName = '木曜日';
    break;
  case 5:
    dayName = '金曜日';
    break;
  case 6:
    dayName = '土曜日';
    break;
  default:
    dayName = '不明';
}

result += '今日は ' + dayName + ' です\\n\\n';

// 複数のcaseをまとめる
const fruit = 'りんご';
switch (fruit) {
  case 'りんご':
  case 'ぶどう':
  case 'さくらんぼ':
    result += fruit + ' は赤い果物です\\n';
    break;
  case 'バナナ':
  case 'レモン':
    result += fruit + ' は黄色い果物です\\n';
    break;
  default:
    result += fruit + ' の色は分かりません\\n';
}

// ⚠️ break を忘れると次のcaseも実行される！
result += '\\n💡 break を忘れないように注意！';

output.textContent = result;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子</h2>
        <p className="text-gray-400 mb-4">
          単純な条件分岐は三項演算子でコンパクトに書けます。
        </p>
        <CodePlayground
          mode="javascript"
          defaultHtml={`<div id="output" style="font-family: monospace; padding: 16px; line-height: 1.8;"></div>`}
          defaultJs={`const output = document.getElementById('output');
let result = '';

const age = 20;

// if/else で書く場合
let message1;
if (age >= 18) {
  message1 = '成人です';
} else {
  message1 = '未成年です';
}
result += 'if/else: ' + message1 + '\\n';

// 三項演算子で書く場合
// 条件 ? trueの値 : falseの値
const message2 = age >= 18 ? '成人です' : '未成年です';
result += '三項演算子: ' + message2 + '\\n\\n';

// 実用例
const items = 5;
result += items + '個の商品' + (items === 1 ? '' : '（複数）') + '\\n';

const score = 85;
const rank = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
result += score + '点の評価: ' + rank + '\\n';
result += '\\n💡 ネストが深くなる場合は if/else の方が読みやすい';

output.textContent = result;`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">truthy と falsy</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScriptでは、boolean以外の値も条件式で使えます。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code> とみなされる値（falsy）と、<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code> とみなされる値（truthy）があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><strong className="text-white">falsy値:</strong> <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">0</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;&quot;</code>（空文字）, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">null</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">undefined</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">NaN</code></li>
          <li><strong className="text-white">truthy値:</strong> falsy以外のすべて（<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;hello&quot;</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">42</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">[]</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">{}</code> など）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">truthy / falsy を試してみよう</h2>
        <CodePlayground
          mode="javascript"
          defaultHtml={`<div id="output" style="font-family: monospace; padding: 16px; line-height: 1.8;"></div>`}
          defaultJs={`const output = document.getElementById('output');
let result = '';

const values = [false, 0, '', null, undefined, NaN, true, 1, 'hello', [], {}];

values.forEach(val => {
  const label = val === '' ? '""(空文字)' : String(val);
  result += label + ' → ' + (val ? 'truthy' : 'falsy') + '\\n';
});

result += '\\n--- 実用例 ---\\n';

// ユーザー名があれば挨拶、なければゲスト
const userName = '';
const greeting = userName ? 'こんにちは、' + userName + 'さん' : 'こんにちは、ゲストさん';
result += greeting + '\\n';

// nullish coalescing (??) を使う
const setting = null;
const value = setting ?? 'デフォルト値';
result += '設定値: ' + value;

output.textContent = result;`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">if / else if / else</code> で条件ごとに処理を切り替える</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">switch</code> は1つの値に対して複数分岐するとき便利</li>
          <li>三項演算子 <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">条件 ? A : B</code> で簡潔な条件分岐が書ける</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">===</code> と <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">!==</code> を使って厳密に比較する</li>
          <li>truthy / falsy を理解すると、簡潔な条件チェックが書ける</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="javascript" lessonId="conditions" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="conditions" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
