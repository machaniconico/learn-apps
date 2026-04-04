import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TESTING_LESSONS } from "@/lib/lessons-data";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "テストピラミッドで最も多く書くべきテストはどれ？",
    options: ["E2Eテスト", "統合テスト", "ユニットテスト", "パフォーマンステスト"],
    answer: 2,
    explanation: "ユニットテストは実行が高速でコストが低いため、テストピラミッドの底辺として最も多く書きます。E2Eテストは信頼度は高いですが遅いため少数に絞ります。",
  },
  {
    question: "TDD（テスト駆動開発）の3ステップの正しい順番はどれ？",
    options: [
      "Green → Red → Refactor",
      "Refactor → Red → Green",
      "Red → Green → Refactor",
      "Red → Refactor → Green",
    ],
    answer: 2,
    explanation: "TDDはRed（テストを書いて失敗させる）→ Green（最小限の実装でテストを通す）→ Refactor（コードを改善する）の順で進めます。",
  },
  {
    question: "個々の関数やモジュールを単独でテストするのは何テスト？",
    options: ["E2Eテスト", "統合テスト", "ユニットテスト", "回帰テスト"],
    answer: 2,
    explanation: "ユニットテスト（単体テスト）は個々の関数やモジュールを単独でテストします。最も小さな単位のテストで、実行が高速です。",
  },
];

export default function TestingBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">テスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テストの基本</h1>
        <p className="text-gray-400">なぜテストを書くのか？テストの種類と基本的な考え方を学ぼう</p>
      </div>

      {/* なぜテストを書くのか */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">なぜテストを書くのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ソフトウェア開発において、テストは「品質の保証」だけでなく「開発速度の向上」にも直結します。
          テストがなければ、コードを変更するたびに手動で全機能を確認する必要があり、
          プロジェクトが大きくなるほど確認作業は膨大になります。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">テストがない場合</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>変更のたびに手動で全機能を確認</li>
              <li>バグが本番環境で初めて発覚</li>
              <li>リファクタリングが怖くてできない</li>
              <li>新メンバーがコードを壊す不安</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">テストがある場合</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>変更後すぐに自動で検証できる</li>
              <li>バグを開発中に発見・修正</li>
              <li>安心してコードを改善できる</li>
              <li>テストが仕様書の役割を果たす</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// テストがあると、こんな小さな変更も安心
// 変更前
function add(a, b) {
  return a + b;
}

// 変更後（最適化のつもりが...）
function add(a, b) {
  return a - b; // バグ！
}

// テストが即座にキャッチ！
// ✗ add(2, 3) → Expected: 5, Received: -1`}</code>
        </pre>
      </section>

      {/* テストの種類 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">テストの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テストは対象の範囲によって大きく3つに分類されます。
          それぞれ異なる目的と特徴を持っています。
        </p>
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">1. ユニットテスト（単体テスト）</h3>
            <p className="text-gray-300 text-sm mb-2">
              個々の関数やモジュールを単独でテストします。最も小さな単位のテストで、
              実行が高速で数も多くなります。
            </p>
            <code className="text-pink-400 text-xs bg-gray-900 px-2 py-1 rounded">例: add(2, 3) が 5 を返すか</code>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">2. 統合テスト（インテグレーションテスト）</h3>
            <p className="text-gray-300 text-sm mb-2">
              複数のモジュールやコンポーネントを組み合わせた動作をテストします。
              APIエンドポイントやReactコンポーネントの結合テストが該当します。
            </p>
            <code className="text-pink-400 text-xs bg-gray-900 px-2 py-1 rounded">例: フォーム送信でAPIが正しく呼ばれるか</code>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">3. E2Eテスト（エンドツーエンドテスト）</h3>
            <p className="text-gray-300 text-sm mb-2">
              実際のブラウザを使って、ユーザーの操作フロー全体をテストします。
              最もユーザーに近い視点でのテストですが、実行に時間がかかります。
            </p>
            <code className="text-pink-400 text-xs bg-gray-900 px-2 py-1 rounded">例: ログイン → 商品選択 → 購入完了の一連の流れ</code>
          </div>
        </div>
      </section>

      {/* テストピラミッド */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">テストピラミッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テストピラミッドは、各テストの理想的な比率を示す概念です。
          下層（ユニットテスト）を多く、上層（E2Eテスト）を少なく書くのが基本方針です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`        /\\
       /  \\        E2Eテスト（少数）
      / E2E\\       → 遅い、高コスト、高信頼度
     /------\\
    /        \\     統合テスト（中程度）
   / 統合テスト\\    → 中速、中コスト
  /------------\\
 /              \\  ユニットテスト（大量）
/ ユニットテスト  \\  → 高速、低コスト
------------------

速度:   ユニット > 統合 > E2E
コスト: ユニット < 統合 < E2E
信頼度: ユニット < 統合 < E2E`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          ユニットテストは実行が速くコストが低いため大量に書きます。
          E2Eテストは信頼度が高いですが遅くて壊れやすいため、重要なユーザーフローに絞ります。
          この比率を守ることで、テストスイート全体のバランスが保たれます。
        </p>
      </section>

      {/* TDDの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">TDD（テスト駆動開発）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TDD（Test-Driven Development）は「テストを先に書いてから実装する」開発手法です。
          Red → Green → Refactor の3ステップを繰り返します。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <h3 className="font-semibold text-red-400 mb-2">1. Red（失敗）</h3>
            <p className="text-gray-300 text-sm">まずテストを書く。実装がないので当然テストは失敗する。</p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h3 className="font-semibold text-green-400 mb-2">2. Green（成功）</h3>
            <p className="text-gray-300 text-sm">テストが通る最小限のコードを書く。きれいさは気にしない。</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <h3 className="font-semibold text-blue-400 mb-2">3. Refactor（改善）</h3>
            <p className="text-gray-300 text-sm">テストが通ることを確認しながら、コードをきれいにする。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ステップ1: Red - まずテストを書く
test("fizzbuzz: 3の倍数でFizzを返す", () => {
  expect(fizzbuzz(3)).toBe("Fizz");
  expect(fizzbuzz(6)).toBe("Fizz");
});

// ステップ2: Green - テストが通る最小限の実装
function fizzbuzz(n) {
  if (n % 3 === 0) return "Fizz";
  return String(n);
}

// ステップ3: Refactor - コードを改善
// → 次のテストケース（5の倍数でBuzz）を追加して繰り返す`}</code>
        </pre>
      </section>

      {/* テスティングツールの概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">主要なテスティングツール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScript/TypeScriptのエコシステムには、多くのテスティングツールがあります。
          目的に応じて適切なツールを選びましょう。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Jest</h3>
            <p className="text-gray-300 text-sm">
              Facebookが開発した最も人気のあるテストフレームワーク。
              テストランナー、アサーション、モック機能がオールインワンで揃っています。
              Reactプロジェクトではデファクトスタンダードです。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Vitest</h3>
            <p className="text-gray-300 text-sm">
              Viteベースの高速テストフレームワーク。JestのAPIと互換性があり、
              ESMのネイティブサポートやTypeScriptの設定不要な対応が特徴です。
              新しいプロジェクトでは第一選択肢になりつつあります。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Testing Library</h3>
            <p className="text-gray-300 text-sm">
              UIコンポーネントをユーザー視点でテストするライブラリ。
              「ユーザーが見るもの・操作するもの」に焦点を当てたテストを書けます。
              React、Vue、Angularなど様々なフレームワークに対応。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Playwright</h3>
            <p className="text-gray-300 text-sm">
              Microsoftが開発したE2Eテストフレームワーク。
              Chromium、Firefox、WebKitの3つのブラウザエンジンに対応し、
              高速で安定したブラウザテストを実現します。
            </p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mt-4">
          <code className="text-gray-300 font-mono">{`# テストツールのインストール例

# Jest
npm install -D jest @types/jest ts-jest

# Vitest
npm install -D vitest

# Testing Library (React)
npm install -D @testing-library/react @testing-library/jest-dom

# Playwright
npm install -D @playwright/test
npx playwright install`}</code>
        </pre>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="pink" />
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>テストはバグの早期発見、安全なリファクタリング、仕様の文書化に役立つ</li>
          <li>テストは大きく3種類：ユニットテスト、統合テスト、E2Eテスト</li>
          <li>テストピラミッドに従い、ユニットテストを多く、E2Eテストを少なく書く</li>
          <li>TDDは「テストを先に書く」開発手法で、Red → Green → Refactorを繰り返す</li>
          <li>Jest、Vitest、Testing Library、Playwrightが主要なツール</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="testing" lessonId="basics" color="pink" />
      <LessonNav lessons={TESTING_LESSONS} currentId="basics" basePath="/learn/testing" color="pink" />
    </div>
  );
}
