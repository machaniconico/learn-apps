import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function KwargsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">*args・**kwargs</h1>
        <p className="text-gray-400">可変長引数とキーワード引数を使いこなす</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">*args と **kwargs とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          任意の数の引数を受け取りたい場合に使います。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">*args</code>は
          任意個数の位置引数をタプルとして受け取り、
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">**kwargs</code>は
          任意個数のキーワード引数を辞書として受け取ります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">*args</code> - 可変長位置引数（タプルとして受け取る）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">**kwargs</code> - 可変長キーワード引数（辞書として受け取る）</li>
          <li>引数の順序: 通常引数 → *args → デフォルト引数 → **kwargs</li>
          <li>名前は慣習。*や**が重要（*items, **options でも可）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">*args の使い方</h2>
        <PythonPlayground defaultCode={`# *args - 任意個数の位置引数
def sum_all(*args):
    print(f"受け取った引数: {args}（タプル）")
    return sum(args)

print(sum_all(1, 2, 3))
print(sum_all(10, 20, 30, 40, 50))
print(sum_all(5))

# 通常の引数と*argsを組み合わせる
def describe_food(category, *items):
    print(f"\\nカテゴリ: {category}")
    for i, item in enumerate(items, 1):
        print(f"  {i}. {item}")

describe_food("フルーツ", "りんご", "バナナ", "みかん")
describe_food("野菜", "にんじん", "キャベツ")

# リストをアンパックして渡す
numbers = [1, 2, 3, 4, 5]
total = sum_all(*numbers)  # * でアンパック
print(f"\\nリストの合計: {total}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">**kwargs の使い方</h2>
        <PythonPlayground defaultCode={`# **kwargs - 任意個数のキーワード引数
def create_user(**kwargs):
    print("ユーザー情報:")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

create_user(名前="田中太郎", 年齢=25, 職業="エンジニア")
print()
create_user(name="Yamada", email="yamada@example.com")

# 通常引数、*args、**kwargsをすべて組み合わせる
def flexible_func(required, *args, keyword_only=None, **kwargs):
    print(f"必須: {required}")
    print(f"args: {args}")
    print(f"keyword_only: {keyword_only}")
    print(f"kwargs: {kwargs}")

print("\\n=== 総合的な使い方 ===")
flexible_func(
    "必須の値",
    "追加1", "追加2",
    keyword_only="KWオンリー",
    extra1="追加KW1", extra2="追加KW2"
)

# 辞書をアンパックして渡す
info = {"city": "東京", "country": "日本"}
create_user(name="鈴木", **info)  # ** でアンパック`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実践的な使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          *args と **kwargs は関数のラッパーや汎用ユーティリティを作るときによく使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>関数のデコレータでもとの関数に引数をそのまま渡す</li>
          <li>設定オブジェクトを柔軟に受け取る</li>
          <li>複数の関数呼び出しをまとめる</li>
        </ul>
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="kwargs" />
      </div>
      <LessonNav lessons={lessons} currentId="kwargs" basePath="/learn/functions" />
    </div>
  );
}
