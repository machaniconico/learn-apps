import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ComprehensionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">内包表記</h1>
        <p className="text-gray-400">リスト・辞書・集合をワンライナーで生成する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">内包表記とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          内包表記（comprehension）はリスト・辞書・集合・ジェネレータをシンプルに生成するPythonの記法です。
          forループと条件式を1行にまとめて書けます。
          読みやすく、通常のforループより高速な場合があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">[式 for 変数 in イテラブル]</code> - リスト内包表記</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">[式 for 変数 in イテラブル if 条件]</code> - 条件付きリスト内包表記</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{'{'}キー: 値 for 変数 in イテラブル{'}'}</code> - 辞書内包表記</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{'{'}式 for 変数 in イテラブル{'}'}</code> - 集合内包表記</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リスト内包表記</h2>
        <PythonPlayground defaultCode={`# 通常のforループとリスト内包表記の比較

# 通常のforループ
squares_loop = []
for i in range(1, 11):
    squares_loop.append(i ** 2)
print("ループ:", squares_loop)

# リスト内包表記（同じ結果）
squares_comp = [i ** 2 for i in range(1, 11)]
print("内包表記:", squares_comp)

# 条件付き内包表記
evens = [i for i in range(1, 21) if i % 2 == 0]
print("\\n偶数:", evens)

# 文字列の変換
words = ["python", "java", "javascript", "go"]
upper_words = [w.upper() for w in words]
print("\\n大文字:", upper_words)

# 長い単語のみ
long_words = [w for w in words if len(w) > 4]
print("5文字以上:", long_words)`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">辞書・集合内包表記</h2>
        <PythonPlayground defaultCode={`# 辞書内包表記
fruits = ["apple", "banana", "cherry", "date"]
word_len = {word: len(word) for word in fruits}
print("単語の文字数:", word_len)

# 既存の辞書を変換
prices = {"りんご": 150, "バナナ": 80, "みかん": 100}

# 価格に消費税を追加
prices_with_tax = {k: int(v * 1.1) for k, v in prices.items()}
print("税込価格:", prices_with_tax)

# 条件付き辞書内包表記
cheap = {k: v for k, v in prices.items() if v <= 100}
print("100円以下:", cheap)

# 集合内包表記
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 5]
unique_squares = {n ** 2 for n in numbers}
print("\\n2乗の集合（重複なし）:", sorted(unique_squares))

# ジェネレータ式（メモリ効率が良い）
gen = (i ** 2 for i in range(1, 6))
print("ジェネレータ:", list(gen))`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">内包表記の注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          内包表記は強力ですが、複雑にしすぎると読みにくくなります。
          2段以上のネストや複雑な条件は、通常のforループで書いた方が可読性が高い場合があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-green-400">シンプルな変換・フィルタリング</span> → 内包表記が最適</li>
          <li><span className="text-yellow-400">2段のネスト</span> → 可能だが注意が必要</li>
          <li><span className="text-red-400">3段以上のネストや複雑な条件</span> → 通常のforループを推奨</li>
        </ul>
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="comprehension" />
      </div>
      <LessonNav lessons={lessons} currentId="comprehension" basePath="/learn/control" />
    </div>
  );
}
