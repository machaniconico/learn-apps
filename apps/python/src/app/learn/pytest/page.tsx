import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pytest");

const quizQuestions: QuizQuestion[] = [
  {
    question: "pytestでテスト関数として認識されるための命名規則はどれですか？",
    options: [
      "クラス名が Test で始まり、メソッド名が check_ で始まる",
      "関数名が test_ で始まる、またはクラス名が Test で始まる",
      "関数名が @test デコレータが付いている",
      "ファイル名が test で終わる関数全て",
    ],
    answer: 1,
    explanation: "pytestは test_ で始まる関数、または Test で始まるクラス内の test_ で始まるメソッドを自動的にテストとして認識します。",
  },
  {
    question: "pytestのfixtureの主な役割はどれですか？",
    options: [
      "テストの実行結果を修正すること",
      "テストに必要な前準備・後処理を共有・再利用する仕組み",
      "テストをスキップするための機能",
      "テスト実行順序を制御すること",
    ],
    answer: 1,
    explanation: "@pytest.fixture デコレータで定義したfixtureは、テスト関数の引数として注入されます。テストDBの初期化やファイル作成など、前準備・後処理を共有できます。",
  },
  {
    question: "@pytest.mark.parametrize の用途はどれですか？",
    options: [
      "テストをスキップするためのマーカー",
      "同じテストを異なる入力値・期待値で複数回実行する",
      "テストの実行優先度を設定する",
      "テストにタイムアウトを設定する",
    ],
    answer: 1,
    explanation: "@pytest.mark.parametrize はテスト関数に複数のパラメータセットを渡して、同じテストロジックを様々な入力で効率よく検証できます。",
  },
  {
    question: "unittest.mock.patch の主な用途はどれですか？",
    options: [
      "コードのバグを自動修正する",
      "テスト中に外部依存（API・DB・ファイルシステム）をフェイクに置き換える",
      "テストの実行速度を改善する",
      "テストレポートを生成する",
    ],
    answer: 1,
    explanation: "mock.patch はテスト対象のコードが依存している外部リソース（HTTPリクエスト・データベース・ファイルI/Oなど）をモックオブジェクトで置き換え、テストを独立・高速・再現可能にします。",
  },
];

export default function PytestPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">テスト（pytest）</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Pythonの強力なテストフレームワークpytestを習得しましょう。テスト関数の書き方から、
          フィクスチャ・パラメータ化テスト・モックまで、実践的なテスト設計のスキルを身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="pytest" totalLessons={6} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/pytest" color="yellow" categoryId="pytest" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">pytestでできること</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-gray-900 border border-yellow-500/20">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="text-yellow-400 font-bold mb-1">シンプルなテスト記述</h3>
            <p className="text-gray-400 text-sm">assert文だけでテストを書けます。複雑なクラス継承は不要です。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-yellow-500/20">
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="text-yellow-400 font-bold mb-1">パラメータ化テスト</h3>
            <p className="text-gray-400 text-sm">同一ロジックを異なるデータで何度もテストし、エッジケースを網羅します。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-yellow-500/20">
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="text-yellow-400 font-bold mb-1">フィクスチャで再利用</h3>
            <p className="text-gray-400 text-sm">テスト間で共通の前準備・後処理をfixtureとして再利用できます。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストのコードパターンを確認しよう</h2>
        <p className="text-gray-400 mb-4">pytestのテストコードはそのままPythonとして実行可能です。テスト対象の関数とテスト関数のパターンを確認しましょう。</p>
        <PythonPlayground defaultCode={`# テスト対象の関数
def add(a, b):
    return a + b

def is_even(n):
    return n % 2 == 0

def greet(name):
    if not name:
        raise ValueError("名前が空です")
    return f"こんにちは、{name}さん！"

# テスト関数（pytest的な書き方）
def test_add():
    assert add(1, 2) == 3
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_is_even():
    assert is_even(4) == True
    assert is_even(3) == False
    assert is_even(0) == True

# テストを手動で実行
print("=== テスト実行 ===")
try:
    test_add()
    print("test_add: PASSED")
except AssertionError as e:
    print(f"test_add: FAILED - {e}")

try:
    test_is_even()
    print("test_is_even: PASSED")
except AssertionError as e:
    print(f"test_is_even: FAILED - {e}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化テストのパターン</h2>
        <p className="text-gray-400 mb-4">@pytest.mark.parametrize の代わりにループを使って同様のパターンを確認しましょう。</p>
        <PythonPlayground defaultCode={`# パラメータ化テストのコンセプト
def multiply(a, b):
    return a * b

# pytest.mark.parametrize に相当するデータ
test_cases = [
    (2, 3, 6),
    (0, 5, 0),
    (-1, 4, -4),
    (10, 10, 100),
]

print("=== パラメータ化テスト ===")
passed = 0
failed = 0

for a, b, expected in test_cases:
    result = multiply(a, b)
    if result == expected:
        print(f"PASSED: multiply({a}, {b}) == {expected}")
        passed += 1
    else:
        print(f"FAILED: multiply({a}, {b}) = {result}, expected {expected}")
        failed += 1

print(f"\\n結果: {passed}件合格, {failed}件失敗")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="yellow" />
      </section>
    </div>
  );
}
