import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数と仮引数</h1>
        <p className="text-gray-400">関数に値を渡す方法と仮引数の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">引数と仮引数の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-gray-100">仮引数（パラメータ）</strong>は関数の定義時に記述する変数名です。
          <strong className="text-gray-100">引数（アーギュメント）</strong>は関数を呼び出すときに渡す実際の値です。
          位置引数とキーワード引数の2種類があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-yellow-400">位置引数</span> — 定義した順番に対応して渡す</li>
          <li><span className="text-yellow-400">キーワード引数</span> — 名前を指定して渡す（順番を変えられる）</li>
          <li>両方を混在させる場合は位置引数を先に書く</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">位置引数とキーワード引数</h2>
        <PythonPlayground defaultCode={`def create_profile(name, age, city):
    print(f"名前: {name}")
    print(f"年齢: {age}歳")
    print(f"都市: {city}")
    print()

# 位置引数（順番どおり）
print("=== 位置引数 ===")
create_profile("田中", 25, "東京")

# キーワード引数（名前を指定）
print("=== キーワード引数 ===")
create_profile(age=30, city="大阪", name="山田")

# 混在（位置引数を先に）
print("=== 混在 ===")
create_profile("鈴木", age=28, city="名古屋")

# 引数は値がコピーされる（イミュータブル）
def double(x):
    x = x * 2  # ローカルなxを変更
    return x

original = 5
result = double(original)
print(f"original = {original} (変わらない)")
print(f"result = {result}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ミュータブルな引数の注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リスト・辞書などのミュータブルな値を引数として渡した場合、
          関数内でそのオブジェクトを変更すると呼び出し元にも影響します。
          意図しない変更を避けるにはコピーを渡しましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>整数・文字列・タプル → 変更不可（安全）</li>
          <li>リスト・辞書 → 変更可能（注意が必要）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">list.copy()</code> や <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">list[:]</code> でコピーを渡す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ミュータブル引数の動作確認</h2>
        <PythonPlayground defaultCode={`# リストは参照が渡される
def add_item(lst, item):
    lst.append(item)  # 元のリストを変更！

my_list = [1, 2, 3]
print(f"関数呼び出し前: {my_list}")
add_item(my_list, 4)
print(f"関数呼び出し後: {my_list}")  # 元のリストが変わる

# コピーを使って元のリストを保護
def add_item_safe(lst, item):
    new_lst = lst.copy()  # コピーを作成
    new_lst.append(item)
    return new_lst

my_list2 = [1, 2, 3]
result = add_item_safe(my_list2, 4)
print(f"\\n元のリスト: {my_list2}")  # 変わらない
print(f"新しいリスト: {result}")

# 型ヒント（引数の型を明示）
def greet(name: str, times: int = 1) -> str:
    return ("こんにちは、" + name + "！") * times

print(f"\\n{greet('Python')}")
print(f"{greet('世界', 3)}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="args" />
      </div>
      <LessonNav lessons={lessons} currentId="args" basePath="/learn/functions" />
    </div>
  );
}
