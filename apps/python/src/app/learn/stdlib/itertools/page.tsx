import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function ItertoolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">itertoolsモジュール</h1>
        <p className="text-gray-400">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">itertools</code> はイテレータを操作するための便利な関数群です。
          組み合わせ・順列・チェーンなど、複雑な反復処理を簡潔に記述できます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">chain・product・combinations</h2>
        <p className="text-gray-400 mb-4">
          複数のイテラブルを結合したり、デカルト積・組み合わせを生成する関数です。
        </p>
        <PythonPlayground
          defaultCode={`import itertools

# chain: 複数のイテラブルを連結
nums = list(itertools.chain([1, 2], [3, 4], [5, 6]))
print(f"chain: {nums}")

# chain.from_iterable: リストのリストを平坦化
nested = [[1, 2], [3, 4], [5, 6]]
flat = list(itertools.chain.from_iterable(nested))
print(f"chain.from_iterable: {flat}")

print()
# product: デカルト積（全組み合わせ）
colors = ["赤", "青"]
sizes = ["S", "M", "L"]
products = list(itertools.product(colors, sizes))
print(f"product ({len(products)}件):")
for p in products:
    print(f"  {p}")

print()
# combinations: 組み合わせ（順序なし）
cards = ["A", "K", "Q", "J"]
combos = list(itertools.combinations(cards, 2))
print(f"combinations (r=2, {len(combos)}件): {combos}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">permutations・groupby・islice</h2>
        <PythonPlayground
          defaultCode={`import itertools

# permutations: 順列（順序あり）
items = ["A", "B", "C"]
perms = list(itertools.permutations(items, 2))
print(f"permutations (r=2, {len(perms)}件): {perms}")

print()
# groupby: 連続した同じ値をグループ化
data = [("Alice", 90), ("Alice", 85), ("Bob", 78), ("Bob", 92), ("Carol", 88)]
data.sort(key=lambda x: x[0])  # キーでソートしてからgroupby
for name, group in itertools.groupby(data, key=lambda x: x[0]):
    scores = [score for _, score in group]
    print(f"{name}: {scores} (平均 {sum(scores)/len(scores):.1f})")

print()
# islice: イテレータの一部だけ取り出す
counter = itertools.count(10, 5)  # 10から5ずつ増える無限シーケンス
first_five = list(itertools.islice(counter, 5))
print(f"count(10, 5) の最初5件: {first_five}")

# takewhile: 条件が True の間だけ取り出す
nums = itertools.takewhile(lambda x: x < 10, [1, 3, 7, 9, 11, 5])
print(f"takewhile (< 10): {list(nums)}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">cycle・repeat・accumulate</h2>
        <PythonPlayground
          defaultCode={`import itertools

# cycle: 無限ループするイテレータ
colors = itertools.cycle(["赤", "緑", "青"])
schedule = [next(colors) for _ in range(7)]
print(f"7日間の色ローテーション: {schedule}")

print()
# repeat: 同じ値を繰り返す
stars = list(itertools.repeat("*", 5))
print(f"repeat: {stars}")
# zip で活用
names = ["Alice", "Bob", "Carol"]
defaults = list(zip(names, itertools.repeat(0)))
print(f"デフォルトスコア: {defaults}")

print()
# accumulate: 累積演算
import operator
nums = [1, 2, 3, 4, 5]
cumsum = list(itertools.accumulate(nums))
print(f"累積和: {cumsum}")  # [1, 3, 6, 10, 15]
cumprod = list(itertools.accumulate(nums, operator.mul))
print(f"累積積: {cumprod}")  # [1, 2, 6, 24, 120]
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="itertools" />
      </div>
      <LessonNav lessons={lessons} currentId="itertools" basePath="/learn/stdlib" />
    </div>
  );
}
