import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElifPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">elif・else</h1>
        <p className="text-gray-400">複数の条件を順番にチェックする方法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">elifとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">elif</code>は
          「else if」の略で、最初の<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if</code>が
          Falseだった場合に次の条件をチェックします。
          複数の条件を上から順番に評価し、最初にTrueになった条件のブロックだけが実行されます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">elif 条件:</code> - 追加条件（何個でも書ける）</li>
          <li>条件は上から順番に評価される</li>
          <li>最初にTrueになったブロックのみ実行</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else:</code> - すべての条件がFalseのときの処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">elif を使った多段条件分岐</h2>
        <PythonPlayground defaultCode={`# 成績評価システム
def evaluate_score(score):
    if score >= 90:
        return "S（優秀）"
    elif score >= 80:
        return "A（良い）"
    elif score >= 70:
        return "B（普通）"
    elif score >= 60:
        return "C（合格）"
    else:
        return "F（不合格）"

# テスト
test_scores = [95, 82, 71, 63, 45]
for score in test_scores:
    result = evaluate_score(score)
    print(f"{score}点: {result}")

# BMI判定
print()
def classify_bmi(bmi):
    if bmi < 18.5:
        return "低体重"
    elif bmi < 25.0:
        return "標準体重"
    elif bmi < 30.0:
        return "肥満（1度）"
    elif bmi < 35.0:
        return "肥満（2度）"
    else:
        return "肥満（3度以上）"

for bmi in [16.0, 22.0, 27.5, 32.0, 40.0]:
    print(f"BMI {bmi}: {classify_bmi(bmi)}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">match文（Python 3.10以降）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Python 3.10から<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">match</code>文が
          追加されました。他の言語のswitch/caseに相当しますが、より強力なパターンマッチングができます。
          シンプルな値の分岐ではelifよりもスッキリ書けます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">match 値:</code> - マッチング対象</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">case 値:</code> - 一致するパターン</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">case _:</code> - デフォルト（どれにも一致しない場合）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">match文の使用例</h2>
        <PythonPlayground defaultCode={`# match文（Python 3.10以降）
def get_day_type(day):
    match day:
        case "月曜日" | "火曜日" | "水曜日" | "木曜日" | "金曜日":
            return "平日"
        case "土曜日" | "日曜日":
            return "休日"
        case _:
            return "無効な曜日"

days = ["月曜日", "土曜日", "日曜日", "火曜日", "祝日"]
for day in days:
    print(f"{day}: {get_day_type(day)}")

# ステータスコードの処理
print()
def handle_status(code):
    match code:
        case 200:
            return "OK - 成功"
        case 404:
            return "Not Found - ページが見つかりません"
        case 500:
            return "Internal Server Error - サーバーエラー"
        case code if 400 <= code < 500:
            return f"クライアントエラー ({code})"
        case _:
            return f"不明なステータス ({code})"

for code in [200, 404, 500, 403, 301]:
    print(f"{code}: {handle_status(code)}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="elif" />
      </div>
      <LessonNav lessons={lessons} currentId="elif" basePath="/learn/control" />
    </div>
  );
}
