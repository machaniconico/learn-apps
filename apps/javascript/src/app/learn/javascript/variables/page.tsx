import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function JsVariablesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数とデータ型</h1>
        <p className="text-gray-400">JavaScriptでデータを扱う基本を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数はデータを一時的に保存するための「名前付きの箱」です。
          JavaScriptでは3つのキーワードで変数を宣言できます：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">let</code> - 再代入可能な変数（一般的に使用）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> - 再代入不可の定数（値が変わらない場合に使用・推奨）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> - 古い書き方（現在は非推奨）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">let と const の使い分け</h2>
        <CodePlayground
          mode="javascript"
          defaultHtml={`<div id="output" style="font-family: monospace; padding: 16px; line-height: 1.8;"></div>`}
          defaultJs={`const output = document.getElementById('output');
let result = '';

// const: 再代入できない（定数）
const appName = 'My App';
const version = 2.0;
result += 'アプリ名: ' + appName + '\\n';
result += 'バージョン: ' + version + '\\n\\n';

// let: 再代入できる
let score = 0;
result += 'スコア（初期値）: ' + score + '\\n';
score = 100;
result += 'スコア（更新後）: ' + score + '\\n\\n';

// const に再代入するとエラーになる
// appName = 'Other App'; // TypeError!

// 基本方針: まず const を使い、
// 再代入が必要な場合だけ let を使う
result += '💡 基本は const、必要なときだけ let';

output.textContent = result;`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本のデータ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScriptには主に7つのデータ型があります：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">string</code> - 文字列（<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;hello&quot;</code> や <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">&apos;world&apos;</code>）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">number</code> - 数値（整数・小数の両方。<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">42</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">3.14</code>）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">boolean</code> - 真偽値（<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code> または <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code>）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">null</code> - 意図的に「値がない」ことを示す</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">undefined</code> - 値がまだ代入されていない状態</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">object</code> - 複数の値をまとめたもの（配列も含む）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">symbol</code> - 一意の識別子（上級向け）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データ型を確認してみよう</h2>
        <CodePlayground
          mode="javascript"
          defaultHtml={`<div id="output" style="font-family: monospace; padding: 16px; line-height: 1.8;"></div>`}
          defaultJs={`const output = document.getElementById('output');
let result = '';

// 文字列 (string)
const name = "田中太郎";
result += 'name: "' + name + '" → typeof: ' + typeof name + '\\n';

// 数値 (number)
const age = 25;
const pi = 3.14;
result += 'age: ' + age + ' → typeof: ' + typeof age + '\\n';
result += 'pi: ' + pi + ' → typeof: ' + typeof pi + '\\n';

// 真偽値 (boolean)
const isStudent = true;
result += 'isStudent: ' + isStudent + ' → typeof: ' + typeof isStudent + '\\n';

// null
const data = null;
result += 'data: ' + data + ' → typeof: ' + typeof data + ' (※注意!)\\n';

// undefined
let unknown;
result += 'unknown: ' + unknown + ' → typeof: ' + typeof unknown + '\\n';

// オブジェクト (object)
const person = { name: "佐藤", age: 30 };
result += 'person: ' + JSON.stringify(person) + ' → typeof: ' + typeof person + '\\n';

// 配列 (Array もobject)
const colors = ["赤", "青", "緑"];
result += 'colors: ' + JSON.stringify(colors) + ' → typeof: ' + typeof colors + '\\n';
result += '  → Array.isArray: ' + Array.isArray(colors);

output.textContent = result;`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">var の問題点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> は古いJavaScriptの変数宣言です。以下の問題があるため、現在は <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">let</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> が推奨されています：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><strong className="text-white">スコープの違い</strong> - <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> は関数スコープ、<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">let</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> はブロックスコープ</li>
          <li><strong className="text-white">再宣言可能</strong> - <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> は同じ名前で再宣言できてしまう</li>
          <li><strong className="text-white">巻き上げ（Hoisting）</strong> - <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> は宣言前にアクセスしても <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">undefined</code> になる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型変換と演算</h2>
        <CodePlayground
          mode="javascript"
          defaultHtml={`<div id="output" style="font-family: monospace; padding: 16px; line-height: 1.8;"></div>`}
          defaultJs={`const output = document.getElementById('output');
let result = '';

// 文字列 + 数値 → 文字列に変換される
result += '"5" + 3 = ' + ("5" + 3) + ' (文字列結合)\\n';
result += '"5" - 3 = ' + ("5" - 3) + ' (数値として計算)\\n\\n';

// 明示的な型変換
result += 'Number("42") = ' + Number("42") + '\\n';
result += 'String(42) = "' + String(42) + '"\\n';
result += 'Boolean(1) = ' + Boolean(1) + '\\n';
result += 'Boolean(0) = ' + Boolean(0) + '\\n';
result += 'Boolean("") = ' + Boolean("") + '\\n';
result += 'Boolean("hello") = ' + Boolean("hello") + '\\n\\n';

// テンプレートリテラル（バッククォート）
const userName = "太郎";
const userAge = 25;
result += \`\${userName}さんは\${userAge}歳です\\n\`;

// === と == の違い
result += '\\n"5" == 5 → ' + ("5" == 5) + ' (型変換あり)\\n';
result += '"5" === 5 → ' + ("5" === 5) + ' (厳密比較・推奨)';

output.textContent = result;`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> を基本に使い、再代入が必要なときだけ <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">let</code> を使う</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> は古い書き方なので新規コードでは使わない</li>
          <li>主なデータ型: <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">string</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">number</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">boolean</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">null</code>, <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">undefined</code></li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">typeof</code> で変数のデータ型を確認できる</li>
          <li>比較は <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">===</code>（厳密等価演算子）を使うのが安全</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="javascript" lessonId="variables" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="variables" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
