import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonのloggingモジュールでログレベルの低い順（詳細→重大）の順序はどれですか？",
    options: [
      "ERROR → WARNING → INFO → DEBUG",
      "DEBUG → INFO → WARNING → ERROR → CRITICAL",
      "INFO → DEBUG → WARNING → CRITICAL → ERROR",
      "CRITICAL → ERROR → WARNING → INFO → DEBUG",
    ],
    answer: 1,
    explanation: "ログレベルは低い方から DEBUG(10) → INFO(20) → WARNING(30) → ERROR(40) → CRITICAL(50) の順です。設定したレベル以上のログのみ出力されます。",
  },
  {
    question: "pdbでデバッグ中にステップ実行（次の行に進む）するコマンドはどれですか？",
    options: ["s（step）", "n（next）", "c（continue）", "r（return）"],
    answer: 1,
    explanation: "n（next）は現在の行を実行して次の行に進みます。s（step）は関数の中に入ります。c（continue）はブレークポイントまで実行を続けます。",
  },
  {
    question: "cProfileで関数のプロファイリングを実行するコマンドはどれですか？",
    options: [
      "python profile.py myscript.py",
      "python -m cProfile myscript.py",
      "python --profile myscript.py",
      "cprofile run myscript.py",
    ],
    answer: 1,
    explanation: "python -m cProfile myscript.py でスクリプトをプロファイリングできます。-s tottime オプションで合計実行時間順にソートして表示できます。",
  },
  {
    question: "デバッグ用のprint文を本番コードに残さないための推奨方法はどれですか？",
    options: [
      "print文をコメントアウトしておく",
      "loggingモジュールを使い、本番ではログレベルをWARNING以上に設定する",
      "printの代わりにinputを使う",
      "try/exceptで囲んでエラーを無視する",
    ],
    answer: 1,
    explanation: "loggingモジュールはログレベルで出力を制御できるため、開発時はDEBUGレベルで詳細出力し、本番ではWARNINGに設定してデバッグログを非表示にできます。",
  },
];

export default function DebugPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">デバッグ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Pythonプログラムのデバッグスキルを高めましょう。print文による素朴なデバッグから、
          pdbデバッガ・loggingモジュール・プロファイリングまで、プロが使うデバッグ技法を体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="debug" totalLessons={5} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/debug" color="orange" categoryId="debug" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">デバッグスキルが重要な理由</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-gray-900 border border-orange-500/20">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="text-orange-400 font-bold mb-1">バグ発見の効率化</h3>
            <p className="text-gray-400 text-sm">適切なデバッグ手法を使えば、バグの原因を素早く特定できます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-orange-500/20">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="text-orange-400 font-bold mb-1">loggingで本番対応</h3>
            <p className="text-gray-400 text-sm">loggingモジュールを使えばprint文を本番に残さずログを管理できます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-orange-500/20">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-orange-400 font-bold mb-1">パフォーマンス改善</h3>
            <p className="text-gray-400 text-sm">プロファイリングでボトルネックを発見し、コードを最適化できます。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグの基本テクニック</h2>
        <p className="text-gray-400 mb-4">print文とloggingを使ったデバッグの基本パターンを確認しましょう。</p>
        <PythonPlayground defaultCode={`import logging

# loggingの基本設定
logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s: %(message)s'
)

def calculate_average(numbers):
    logging.debug(f"入力リスト: {numbers}")

    if not numbers:
        logging.warning("空のリストが渡されました")
        return 0

    total = sum(numbers)
    count = len(numbers)
    avg = total / count

    logging.info(f"合計={total}, 件数={count}, 平均={avg:.2f}")
    return avg

# テスト実行
result = calculate_average([10, 20, 30, 40, 50])
print(f"\\n平均値: {result}")

empty_result = calculate_average([])
print(f"空リストの結果: {empty_result}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バグを含むコードを直そう</h2>
        <p className="text-gray-400 mb-4">意図的にバグを仕込んだコードを観察し、デバッグ手法でどう特定するか体験しましょう。</p>
        <PythonPlayground defaultCode={`# バグを含む関数（意図的に問題を仕込んでいます）
def find_max(numbers):
    # バグ: 空リストのチェックなし
    max_val = numbers[0]
    for n in numbers:
        if n > max_val:
            max_val = n
    return max_val

# デバッグ用ラッパー
def safe_find_max(numbers):
    print(f"[DEBUG] 入力: {numbers}")
    print(f"[DEBUG] 要素数: {len(numbers)}")

    if len(numbers) == 0:
        print("[ERROR] 空リストは処理できません")
        return None

    result = find_max(numbers)
    print(f"[DEBUG] 結果: {result}")
    return result

# テスト
print("=== 正常なケース ===")
safe_find_max([3, 1, 4, 1, 5, 9, 2, 6])

print("\\n=== エッジケース ===")
safe_find_max([42])

print("\\n=== バグが発生するケース（ガード追加済み）===")
safe_find_max([])`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="orange" />
      </section>
    </div>
  );
}
