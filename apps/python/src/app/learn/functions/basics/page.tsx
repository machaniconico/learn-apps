import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数の基本</h1>
        <p className="text-gray-400">def文を使った関数の定義と呼び出し方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数とは、特定の処理をまとめて名前をつけた再利用可能なコードブロックです。
          Pythonでは<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">def</code>キーワードを使って定義します。
          同じ処理を何度も書く代わりに関数にまとめることで、
          コードが簡潔になり変更も1箇所だけで済みます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">def 関数名(引数):</code> - 関数の定義</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">return 値</code> - 関数から値を返す</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">関数名(引数)</code> - 関数の呼び出し</li>
          <li>関数本体はインデントされたブロックで記述</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の定義と呼び出し</h2>
        <PythonPlayground defaultCode={`# 最もシンプルな関数（引数なし・戻り値なし）
def say_hello():
    print("こんにちは！")

# 関数の呼び出し
say_hello()
say_hello()  # 何度でも呼び出せる

# 引数を受け取る関数
def greet(name):
    print(f"こんにちは、{name}さん！")

greet("田中")
greet("山田")

# 戻り値を返す関数
def add(a, b):
    return a + b

result = add(3, 5)
print(f"\\n3 + 5 = {result}")
print(f"10 + 7 = {add(10, 7)}")

# 関数は変数のように扱える
my_func = add
print(f"15 + 3 = {my_func(15, 3)}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数のスコープ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数内で定義した変数はその関数の中でしか使えません（ローカルスコープ）。
          関数の外で定義した変数はグローバルスコープに属します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-yellow-400">ローカル変数</span> — 関数内で定義した変数。関数外からはアクセス不可</li>
          <li><span className="text-yellow-400">グローバル変数</span> — 関数外で定義した変数。関数内から読み取り可能</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">global 変数名</code> — 関数内からグローバル変数を変更する（非推奨）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スコープの確認</h2>
        <PythonPlayground defaultCode={`# グローバルスコープとローカルスコープ
global_var = "グローバル変数"

def show_scope():
    local_var = "ローカル変数"
    print(f"関数内からグローバル変数: {global_var}")  # 読み取れる
    print(f"関数内からローカル変数: {local_var}")

show_scope()

# ローカル変数は関数外からアクセス不可
# print(local_var)  # これはエラーになる

# 関数内で計算した結果はreturnで返す
def calculate(x):
    result = x ** 2 + 2 * x + 1
    return result

value = calculate(5)
print(f"\\ncalculate(5) = {value}")

# 早期return
def check_positive(n):
    if n < 0:
        return "負の数"
    if n == 0:
        return "ゼロ"
    return "正の数"

for n in [-3, 0, 7]:
    print(f"{n}: {check_positive(n)}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
