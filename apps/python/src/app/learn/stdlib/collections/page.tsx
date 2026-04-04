import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">collectionsモジュール</h1>
        <p className="text-gray-400">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">collections</code> モジュールは
          標準の辞書・リスト・タプルを拡張した高機能なコレクションを提供します。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Counter — 要素の出現回数を数える</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Counter</code> はリストや文字列の各要素が何回出現するかを自動で数えるクラスです。
          単語の頻度分析などに便利です。
        </p>
        <PythonPlayground
          defaultCode={`from collections import Counter

# リストの要素を数える
fruits = ["apple", "banana", "apple", "cherry", "banana", "apple", "date"]
counter = Counter(fruits)
print("フルーツの出現回数:", counter)
print("最も多い2つ:", counter.most_common(2))

print()
# 文字列の文字を数える
text = "mississippi"
char_count = Counter(text)
print(f"'{text}' の文字数:")
for char, count in char_count.most_common():
    print(f"  '{char}': {count}回")

print()
# 加算・減算
counter1 = Counter(["a", "b", "a"])
counter2 = Counter(["b", "b", "c"])
print("合計:", counter1 + counter2)
print("差分:", counter1 - counter2)
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">defaultdict — デフォルト値付き辞書</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">defaultdict</code> は存在しないキーにアクセスしたときに
          自動でデフォルト値を生成する辞書です。<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">KeyError</code> を避けられます。
        </p>
        <PythonPlayground
          defaultCode={`from collections import defaultdict

# defaultdict(list): 値がリストのデフォルト辞書
students = [
    ("山田", "数学"),
    ("鈴木", "英語"),
    ("山田", "英語"),
    ("田中", "数学"),
    ("鈴木", "理科"),
    ("山田", "理科"),
]

# 学生ごとの科目をグループ化
by_student = defaultdict(list)
for name, subject in students:
    by_student[name].append(subject)  # KeyError にならない

for name, subjects in by_student.items():
    print(f"{name}: {subjects}")

print()
# defaultdict(int): 値が整数（初期値0）
word_count = defaultdict(int)
words = "the cat sat on the mat the cat".split()
for word in words:
    word_count[word] += 1  # 初回でも 0 + 1 = 1

for word, count in sorted(word_count.items()):
    print(f"  {word}: {count}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">deque と namedtuple</h2>
        <PythonPlayground
          defaultCode={`from collections import deque, namedtuple

# deque: 両端への追加・削除が O(1) で高速
print("=== deque ===")
dq = deque([1, 2, 3], maxlen=5)
dq.appendleft(0)   # 左端に追加
dq.append(4)       # 右端に追加
dq.append(5)       # maxlen=5 なので先頭が削除される
print(f"deque: {dq}")
print(f"左端削除: {dq.popleft()}, 残り: {dq}")
dq.rotate(2)       # 右に2つ回転
print(f"2つ右回転: {dq}")

print()
# namedtuple: 名前でアクセスできるタプル
print("=== namedtuple ===")
Point = namedtuple("Point", ["x", "y"])
p1 = Point(3, 4)
p2 = Point(x=0, y=0)
print(f"p1 = {p1}")
print(f"x={p1.x}, y={p1.y}")  # 名前でアクセス

# 距離計算
import math
dist = math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
print(f"原点からの距離: {dist}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="collections" />
      </div>
      <LessonNav lessons={lessons} currentId="collections" basePath="/learn/stdlib" />
    </div>
  );
}
