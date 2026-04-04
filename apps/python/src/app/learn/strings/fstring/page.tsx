import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">f文字列</h1>
        <p className="text-gray-400">Python 3.6以降で使える f-string による埋め込みを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">f文字列の基本</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            f文字列は文字列リテラルの前に <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">f</code> または <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">F</code> を付けた書き方です。
            波括弧 <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> の中に直接変数や式を書けます。
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• 最も読みやすく、現在の推奨スタイル</li>
            <li>• 変数だけでなく、式や関数呼び出しも埋め込める</li>
            <li>• 書式指定も <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{値:書式}"}</code> で可能</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`name = "田中太郎"
age = 25
score = 98.7

# 基本的な変数埋め込み
print(f"名前: {name}")
print(f"年齢: {age}歳")

# 式を直接埋め込む
print(f"来年は{age + 1}歳")
print(f"名前の長さ: {len(name)}文字")
print(f"大文字: {name.upper()}")

# 書式指定
print(f"スコア: {score:.1f}点")
print(f"パーセント: {score / 100:.1%}")
print(f"3桁区切り: {1234567:,}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">高度な書式指定</h2>
        <PythonPlayground
          defaultCode={`# 幅と揃え
print(f"{'左揃え':<10}|{'右揃え':>10}|{'中央':^10}")
print(f"{'=-' * 16}")

# 数値のフォーマット
pi = 3.141592653589793
print(f"π ≈ {pi:.4f}")
print(f"π ≈ {pi:.2e}")  # 指数表記
print(f"π (幅10, 精度3): {pi:10.3f}")

# 0埋め
for i in range(1, 6):
    print(f"ファイル_{i:04d}.txt")

# 符号の表示
for n in [-10, 0, 10]:
    print(f"{n:+d}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Python 3.8以降: = スペシフィア</h2>
        <PythonPlayground
          defaultCode={`# デバッグに便利な = スペシフィア（Python 3.8+）
x = 42
y = [1, 2, 3]
name = "Python"

print(f"{x=}")          # x=42 のように変数名も表示
print(f"{y=}")          # y=[1, 2, 3]
print(f"{name=}")
print(f"{len(name)=}")  # 式も使える
print(f"{x * 2=}")

# 実用例：テーブル表示
data = [("田中", 90), ("鈴木", 85), ("佐藤", 92)]
print(f"\n{'名前':<8} {'点数':>6}")
print("-" * 16)
for name, score in data:
    print(f"{name:<8} {score:>6}点")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="strings" lessonId="fstring" />
      </div>
      <LessonNav lessons={lessons} currentId="fstring" basePath="/learn/strings" />
    </div>
  );
}
