import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { ALGORITHM_LESSONS } from "@/lib/lessons-data";

export default function AlgorithmBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 mb-4">アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アルゴリズムとは</h1>
        <p className="text-gray-400">計算量、Big O記法、効率的な問題解決の基礎を学ぼう</p>
      </div>

      {/* アルゴリズムの定義 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アルゴリズムとは何か？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アルゴリズムとは、ある問題を解決するための<strong className="text-yellow-400">明確な手順の集まり</strong>です。
          料理のレシピのように、入力（材料）を受け取り、決められたステップに従って処理し、
          出力（完成した料理）を返します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          同じ問題に対して複数のアルゴリズムが存在することが多く、
          それぞれ処理速度やメモリ使用量が異なります。適切なアルゴリズムを選ぶことで、
          プログラムの性能を大幅に改善できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 例：配列の中から最大値を見つけるアルゴリズム
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(findMax([3, 7, 2, 9, 1])); // 9`}</code>
        </pre>
      </section>

      {/* 計算量とBig O記法 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">計算量とBig O記法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">計算量（Complexity）</strong>とは、
          アルゴリズムの効率を測る指標です。主に<strong className="text-yellow-400">時間計算量</strong>（処理にかかる時間）と
          <strong className="text-yellow-400">空間計算量</strong>（メモリ使用量）の2種類があります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">Big O記法</strong>は、入力サイズ n が大きくなったとき、
          アルゴリズムの処理時間がどのように増加するかを表す記法です。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">O(1) - 定数時間</h3>
            <p className="text-sm text-gray-400">入力サイズに関係なく一定時間。配列のインデックスアクセスなど。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">O(log n) - 対数時間</h3>
            <p className="text-sm text-gray-400">入力が倍になっても1ステップしか増えない。二分探索など。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">O(n) - 線形時間</h3>
            <p className="text-sm text-gray-400">入力サイズに比例して時間が増加。配列の全探索など。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">O(n log n) - 準線形時間</h3>
            <p className="text-sm text-gray-400">効率的なソートアルゴリズム（マージソート、クイックソート）。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">O(n^2) - 二乗時間</h3>
            <p className="text-sm text-gray-400">入力が倍になると4倍の時間。二重ループ、バブルソートなど。</p>
          </div>
        </div>
      </section>

      {/* 時間計算量の例 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">時間計算量の具体例</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際のコードでどのように計算量が変わるか見てみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// O(1) - 定数時間：配列のインデックスアクセス
function getFirst(arr) {
  return arr[0]; // 配列の大きさに関係なく一瞬
}

// O(n) - 線形時間：全要素を1回ずつ走査
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i]; // n回のループ
  }
  return total;
}

// O(n^2) - 二乗時間：二重ループ
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}`}</code>
        </pre>
      </section>

      {/* 空間計算量 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">空間計算量</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">空間計算量</strong>は、アルゴリズムが使用するメモリの量を表します。
          入力データ自体のサイズに加えて、処理中に追加で必要になるメモリ（補助空間）を考えます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// O(1) 空間 - 追加メモリなし（変数のみ）
function findMax(arr) {
  let max = arr[0]; // 変数1つだけ
  for (const val of arr) {
    if (val > max) max = val;
  }
  return max;
}

// O(n) 空間 - 入力と同サイズの配列を新規作成
function reversed(arr) {
  const result = []; // n個分のメモリ
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}`}</code>
        </pre>
      </section>

      {/* アルゴリズムの選び方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アルゴリズムの選び方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アルゴリズムを選ぶ際は、以下のポイントを考慮します。
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
          <li><strong className="text-yellow-400">入力サイズ</strong>：データが小さければ単純なアルゴリズムでも十分</li>
          <li><strong className="text-yellow-400">時間 vs 空間のトレードオフ</strong>：メモリを使って速度を上げるか、メモリを節約するか</li>
          <li><strong className="text-yellow-400">データの特性</strong>：ほぼソート済みか、ランダムか、重複があるか</li>
          <li><strong className="text-yellow-400">実装の複雑さ</strong>：シンプルなコードの方が保守しやすい</li>
        </ul>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 例：重複チェック - O(n^2) vs O(n) のトレードオフ

// 方法1: O(n^2) 時間 / O(1) 空間 - メモリ節約
function hasDupSlow(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] === arr[j]) return true;
  return false;
}

// 方法2: O(n) 時間 / O(n) 空間 - 速度重視
function hasDupFast(arr) {
  const seen = new Set();
  for (const val of arr) {
    if (seen.has(val)) return true;
    seen.add(val);
  }
  return false;
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>アルゴリズムは問題を解くための明確な手順の集まり</li>
          <li>Big O記法で計算量（効率）を表現する</li>
          <li>時間計算量と空間計算量の2つの観点がある</li>
          <li>O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n^2) の順に遅くなる</li>
          <li>データの特性や要件に応じて最適なアルゴリズムを選択する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="algorithm" lessonId="basics" color="yellow" />
      <LessonNav lessons={ALGORITHM_LESSONS} currentId="basics" basePath="/learn/algorithm" color="yellow" />
    </div>
  );
}
