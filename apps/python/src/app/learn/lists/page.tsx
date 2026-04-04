import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonでリストを作成する正しい構文はどれですか？",
    options: [
      'fruits = ("りんご", "バナナ")',
      'fruits = ["りんご", "バナナ"]',
      'fruits = {"りんご", "バナナ"}',
      'fruits = <"りんご", "バナナ">',
    ],
    answer: 1,
    explanation: "リストは角括弧 [] を使って作成します。丸括弧はタプル、波括弧は集合または辞書です。",
  },
  {
    question: "リスト [10, 20, 30, 40, 50] で lst[1:3] の結果はどれですか？",
    options: ["[10, 20, 30]", "[20, 30]", "[20, 30, 40]", "[10, 20]"],
    answer: 1,
    explanation: "スライス [1:3] はインデックス1から3の手前（2）までを取り出します。結果は [20, 30] です。",
  },
  {
    question: "タプルとリストの最大の違いはどれですか？",
    options: [
      "タプルは数値のみ格納できる",
      "タプルは変更不可能（イミュータブル）",
      "タプルは順序を持たない",
      "タプルはインデックスでアクセスできない",
    ],
    answer: 1,
    explanation: "タプルはイミュータブル（変更不可能）なシーケンスです。一度作成した後は要素の追加・変更・削除ができません。",
  },
  {
    question: "enumerate() 関数の主な用途はどれですか？",
    options: [
      "リストを逆順にする",
      "2つのリストを結合する",
      "ループ時にインデックスと値を同時に取得する",
      "リストの重複を除去する",
    ],
    answer: 2,
    explanation: "enumerate() はイテラブルをループする際に (インデックス, 値) のタプルを返し、インデックスと値を同時に取得できます。",
  },
];

export default function ListsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">リスト・タプル</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400 mt-2">
          Pythonの順序付きデータ構造、リストとタプルを完全マスター。要素の操作、スライス、ネスト構造まで幅広く学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="lists" totalLessons={8} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/lists" color="orange" categoryId="lists" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">このカテゴリで学ぶこと</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "リストの基本操作", desc: "作成・アクセス・変更・削除", icon: "📋" },
            { title: "メソッドの活用", desc: "append・sort・reverse など", icon: "🔧" },
            { title: "スライス記法", desc: "部分取り出しと逆順操作", icon: "✂️" },
            { title: "ネストされたリスト", desc: "二次元配列・行列の扱い", icon: "🏗️" },
            { title: "タプルの使い方", desc: "イミュータブルなシーケンス", icon: "🔒" },
            { title: "enumerate・zip", desc: "インデックス付き反復と結合", icon: "🔗" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">リストの基本を試してみよう</h2>
        <PythonPlayground
          defaultCode={`# リストの作成と基本操作
fruits = ["りんご", "バナナ", "みかん", "ぶどう"]

print("全要素:", fruits)
print("最初の要素:", fruits[0])
print("最後の要素:", fruits[-1])
print("要素数:", len(fruits))

# 要素の追加
fruits.append("いちご")
print("追加後:", fruits)

# ソート
fruits.sort()
print("ソート後:", fruits)`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">スライスとenumerate</h2>
        <PythonPlayground
          defaultCode={`# スライス
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print("最初の3つ:", numbers[:3])
print("後ろの3つ:", numbers[-3:])
print("偶数インデックス:", numbers[::2])
print("逆順:", numbers[::-1])

# enumerate
fruits = ["りんご", "バナナ", "みかん"]
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}番目: {fruit}")

# zip
prices = [150, 200, 120]
for fruit, price in zip(fruits, prices):
    print(f"{fruit}: {price}円")`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">タプルの使い方</h2>
        <PythonPlayground
          defaultCode={`# タプルの作成（変更不可能）
point = (3, 7)
rgb = (255, 128, 0)

print("座標:", point)
print("x:", point[0], "y:", point[1])
print("色 (R,G,B):", rgb)

# タプルのアンパック
x, y = point
print(f"x={x}, y={y}")

# スワップ（タプルを使った慣用句）
a, b = 10, 20
print(f"交換前: a={a}, b={b}")
a, b = b, a
print(f"交換後: a={a}, b={b}")`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
