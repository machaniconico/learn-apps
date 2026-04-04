import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function InputOutputPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">入出力</h1>
        <p className="text-gray-400">input()とprint()でユーザーとやりとりする</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">print() 関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">print()</code> は
          画面に値を出力するための組み込み関数です。複数の引数を渡したり、区切り文字や末尾文字をカスタマイズできます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">print(value)</code> - 値を出力して改行</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">print(a, b, c)</code> - 複数の値をスペース区切りで出力</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">print(a, b, sep=",")</code> - 区切り文字を変更</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">print(a, end="")</code> - 末尾文字を変更（デフォルトは改行）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">print()の様々な使い方</h2>
        <PythonPlayground defaultCode={`# 基本的なprint
print("Hello, World!")

# 複数の値を出力
print("名前:", "田中", "年齢:", 25)

# sepで区切り文字を指定
print("2024", "01", "15", sep="-")
print("090", "1234", "5678", sep="-")

# endで末尾文字を指定
print("処理1", end=" → ")
print("処理2", end=" → ")
print("完了")

# 空行を出力
print()

# 数値のフォーマット
pi = 3.14159265358979
print(f"円周率: {pi}")
print(f"小数点2桁: {pi:.2f}")
print(f"小数点4桁: {pi:.4f}")
print(f"科学的記数法: {pi:.2e}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">input() 関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">input()</code> は
          ユーザーからキーボード入力を受け取る関数です。
          返り値は常に<strong className="text-gray-100">文字列（str型）</strong>なので、数値として使う場合は型変換が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">name = input("名前を入力: ")</code> - 文字列として受け取る</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">age = int(input("年齢: "))</code> - 整数として受け取る</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">price = float(input("価格: "))</code> - 浮動小数点として受け取る</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">入力のシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          このプレイグラウンドではinput()は使用できないため、変数で代替して動作を確認しましょう。
        </p>
        <PythonPlayground defaultCode={`# input()のシミュレーション（変数で代替）
# 実際のプログラムでは: name = input("名前を入力してください: ")
name = "田中太郎"
print(f"こんにちは、{name}さん！")

# 数値入力のシミュレーション
# 実際のプログラムでは: age = int(input("年齢を入力してください: "))
age_str = "25"           # input()は文字列を返す
age = int(age_str)       # 整数に変換
print(f"来年は {age + 1} 歳になります")

# 計算プログラムのシミュレーション
# 実際は: a = float(input("1つ目の数: "))
a = 12.5
b = 4.0
print(f"\\n{a} + {b} = {a + b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="input-output" />
      </div>
      <LessonNav lessons={lessons} currentId="input-output" basePath="/learn/basics" />
    </div>
  );
}
