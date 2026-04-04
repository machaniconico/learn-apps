import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BasicsExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">基礎総合演習</h1>
        <p className="text-gray-400">Python基礎の知識を使った実践問題</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演習の進め方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          これまで学んだPython基礎の知識を使って、実際の問題を解いてみましょう。
          各演習のコードを理解し、改造したり自分でゼロから書いてみることで理解が深まります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">1.</span><span>まずコードを実行して動作を確認する</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">2.</span><span>コードを読んで各行が何をしているか理解する</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">3.</span><span>値を変えて実行し、動作の変化を確認する</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">4.</span><span>コメントにある「チャレンジ」を試してみる</span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習1: 成績計算プログラム</h2>
        <p className="text-gray-400 mb-4">変数・演算子・型変換を使って成績を計算するプログラムです。</p>
        <PythonPlayground defaultCode={`# 成績計算プログラム
# 5科目のテスト成績を管理する

# 成績データ
subject_scores = {
    "国語": 85,
    "数学": 92,
    "英語": 78,
    "理科": 88,
    "社会": 76,
}

# 合計・平均・最高・最低を計算
scores = list(subject_scores.values())
total = sum(scores)
average = total / len(scores)
highest = max(scores)
lowest = min(scores)

# 結果を表示
print("=" * 30)
print("       成績レポート")
print("=" * 30)
for subject, score in subject_scores.items():
    bar = "█" * (score // 10) + "░" * (10 - score // 10)
    print(f"{subject:<4} {score:3}点 [{bar}]")
print("-" * 30)
print(f"合計:   {total}点")
print(f"平均:   {average:.1f}点")
print(f"最高:   {highest}点")
print(f"最低:   {lowest}点")

# 評価
if average >= 90:
    grade = "S"
elif average >= 80:
    grade = "A"
elif average >= 70:
    grade = "B"
elif average >= 60:
    grade = "C"
else:
    grade = "D"
print(f"評価:   {grade}ランク")

# チャレンジ: 自分の成績を入力してみよう！`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習2: 体脂肪率・BMI計算機</h2>
        <p className="text-gray-400 mb-4">実際の計算式を使った健康指標計算プログラムです。</p>
        <PythonPlayground defaultCode={`# 健康指標計算機

def calculate_bmi(weight, height):
    """BMI（体格指数）を計算する"""
    return weight / (height ** 2)

def bmi_category(bmi):
    """BMI値から体格の判定を返す"""
    if bmi < 18.5:
        return "低体重"
    elif bmi < 25.0:
        return "標準"
    elif bmi < 30.0:
        return "肥満（1度）"
    else:
        return "肥満（2度以上）"

def ideal_weight(height):
    """理想体重を計算する（BMI=22が標準）"""
    return 22 * (height ** 2)

# 入力値（実際のプログラムではinput()で受け取る）
weight = 68.5   # kg
height = 1.72   # m

# 計算
bmi = calculate_bmi(weight, height)
category = bmi_category(bmi)
ideal = ideal_weight(height)
diff = weight - ideal

# 結果表示
print(f"身長: {height * 100:.0f}cm")
print(f"体重: {weight}kg")
print(f"BMI: {bmi:.1f}")
print(f"判定: {category}")
print(f"理想体重: {ideal:.1f}kg")
print(f"理想体重との差: {diff:+.1f}kg")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習3: 文字列操作プログラム</h2>
        <p className="text-gray-400 mb-4">文字列の各種操作を組み合わせた実用的なプログラムです。</p>
        <PythonPlayground defaultCode={`# 文字列操作の総合演習

def analyze_text(text):
    """テキストを分析して各種統計を返す"""
    lines = text.strip().split("\\n")
    words = text.split()
    chars = len(text)
    chars_no_space = len(text.replace(" ", "").replace("\\n", ""))

    return {
        "行数": len(lines),
        "単語数": len(words),
        "文字数（空白含む）": chars,
        "文字数（空白除く）": chars_no_space,
    }

# 分析するテキスト
sample = """Python is a high-level programming language.
It is widely used for web development and data science.
Python has a simple and readable syntax."""

print("=== テキスト分析 ===")
print(sample)
print("-" * 40)

stats = analyze_text(sample)
for key, value in stats.items():
    print(f"{key}: {value}")

# 文字列変換の例
print("\\n=== 文字列変換 ===")
title = "hello world python"
print(f"元の文字列: '{title}'")
print(f"大文字: '{title.upper()}'")
print(f"タイトル: '{title.title()}'")
print(f"単語数: {len(title.split())}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習4: 型変換の実践</h2>
        <p className="text-gray-400 mb-4">様々なデータ型を変換・処理するプログラムです。</p>
        <PythonPlayground defaultCode={`# 型変換の総合演習

# CSV風のデータを解析する
csv_data = """名前,年齢,スコア,合格
田中太郎,25,85,True
山田花子,22,92,True
鈴木一郎,28,55,False
佐藤美咲,30,78,True"""

print("=== CSVデータの解析 ===")
lines = csv_data.strip().split("\\n")
header = lines[0].split(",")
print(f"ヘッダー: {header}")
print()

records = []
for line in lines[1:]:
    parts = line.split(",")
    record = {
        "名前": parts[0],
        "年齢": int(parts[1]),       # 文字列→整数
        "スコア": float(parts[2]),   # 文字列→浮動小数点
        "合格": parts[3] == "True",  # 文字列→bool
    }
    records.append(record)

for r in records:
    status = "合格" if r["合格"] else "不合格"
    print(f"{r['名前']} ({r['年齢']}歳): {r['スコア']}点 → {status}")

# 統計
passed = [r for r in records if r["合格"]]
avg_score = sum(r["スコア"] for r in records) / len(records)
print(f"\\n合格者: {len(passed)}/{len(records)}人")
print(f"平均スコア: {avg_score:.1f}点")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="basics-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="basics-exercise" basePath="/learn/basics" />
    </div>
  );
}
