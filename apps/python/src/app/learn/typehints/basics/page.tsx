import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("typehints");

export default function TypehintsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">型ヒント レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型ヒントの基本</h1>
        <p className="text-gray-400">変数・引数・戻り値への型アノテーションの書き方</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">型ヒントとは何か</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">型ヒント（Type Hints）</strong>はPython 3.5で導入された機能で、
          変数・関数の引数・戻り値に期待する型を明示的に記述できます。
          Pythonは動的型付け言語なので実行時には無視されますが、
          <code className="bg-gray-800 text-cyan-300 px-1 rounded">mypy</code>などの静的解析ツールが
          型の不整合を事前に検出してくれます。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="text-gray-300 font-semibold mb-2 text-sm">型ヒントなし</h3>
            <pre className="text-gray-400 text-xs font-mono">{`def add(a, b):
    return a + b

# 引数が数値なのか文字列なのか
# 戻り値は何か — 不明`}</pre>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
            <h3 className="text-cyan-400 font-semibold mb-2 text-sm">型ヒントあり</h3>
            <pre className="text-cyan-200 text-xs font-mono">{`def add(a: int, b: int) -> int:
    return a + b

# 引数: int, int
# 戻り値: int — 明確！`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">変数への型アノテーション</h2>
        <p className="text-gray-300 mb-4">
          変数に型ヒントを付ける構文は <code className="bg-gray-800 text-cyan-300 px-1 rounded">変数名: 型 = 値</code> です。
          宣言だけで値を後から代入することもできます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`# 基本型
name: str = "Alice"
age: int = 30
height: float = 165.5
is_active: bool = True

# 値を後から代入（型のみ宣言）
score: int
score = 95

# コレクション型（Python 3.9以降はlist[int]と書ける）
from typing import List, Dict, Tuple, Set

names: List[str] = ["Alice", "Bob"]
data: Dict[str, int] = {"Alice": 90}
point: Tuple[int, int] = (10, 20)
tags: Set[str] = {"python", "typing"}`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">関数の型アノテーション</h2>
        <p className="text-gray-300 mb-4">
          引数の型は <code className="bg-gray-800 text-cyan-300 px-1 rounded">引数名: 型</code>、
          戻り値の型は <code className="bg-gray-800 text-cyan-300 px-1 rounded">-&gt; 型</code> で指定します。
          値を返さない関数は <code className="bg-gray-800 text-cyan-300 px-1 rounded">-&gt; None</code> と書きます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`def greet(name: str) -> str:
    return f"こんにちは、{name}！"

def add(a: int, b: int) -> int:
    return a + b

def print_info(name: str, age: int) -> None:
    print(f"{name}: {age}歳")

# デフォルト引数との組み合わせ
def power(base: int, exponent: int = 2) -> int:
    return base ** exponent`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">型アノテーションを実際に書いてみよう</h2>
        <PythonPlayground
          defaultCode={`from typing import List, Dict, Tuple

# 変数の型アノテーション
name: str = "Python"
version: float = 3.12
features: List[str] = ["型ヒント", "f文字列", "dataclass"]

print(f"言語: {name} {version}")
print(f"主な機能: {', '.join(features)}")

# 関数の型アノテーション
def calculate_bmi(weight: float, height: float) -> float:
    """BMIを計算する（weight: kg, height: m）"""
    return weight / (height ** 2)

def classify_bmi(bmi: float) -> str:
    """BMIを分類する"""
    if bmi < 18.5:
        return "低体重"
    elif bmi < 25.0:
        return "普通体重"
    elif bmi < 30.0:
        return "過体重"
    else:
        return "肥満"

# 使用
weight: float = 65.0
height: float = 1.70

bmi: float = calculate_bmi(weight, height)
category: str = classify_bmi(bmi)

print(f"\\n体重: {weight}kg, 身長: {height}m")
print(f"BMI: {bmi:.1f}")
print(f"分類: {category}")

# 辞書の型ヒント
scores: Dict[str, int] = {"Alice": 90, "Bob": 85, "Carol": 78}

def top_scorer(scores: Dict[str, int]) -> Tuple[str, int]:
    """最高得点者と得点を返す"""
    name = max(scores, key=lambda k: scores[k])
    return name, scores[name]

winner, score = top_scorer(scores)
print(f"\\n最高得点: {winner} ({score}点)")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="typehints" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/typehints" />
    </div>
  );
}
