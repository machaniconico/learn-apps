import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列メソッド</h1>
        <p className="text-gray-400">upper・lower・strip・replace など文字列操作メソッドを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">大文字・小文字・空白処理</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="space-y-2 text-sm">
            {[
              ["upper()", "すべて大文字に変換"],
              ["lower()", "すべて小文字に変換"],
              ["capitalize()", "先頭を大文字に変換"],
              ["title()", "各単語の先頭を大文字に変換"],
              ["strip()", "前後の空白を除去"],
              ["lstrip()", "左側の空白を除去"],
              ["rstrip()", "右側の空白を除去"],
            ].map(([method, desc]) => (
              <div key={method} className="flex gap-3">
                <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">{method}</code>
                <span className="text-gray-300">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <PythonPlayground
          defaultCode={`text = "  hello, world!  "

print(repr(text))            # 元の文字列（スペースを可視化）
print(text.upper())          # 大文字
print(text.lower())          # 小文字
print(text.strip())          # 前後の空白除去
print(text.strip().capitalize())   # 先頭大文字
print("hello world".title())       # タイトルケース

# 特定の文字を除去
print("###Python###".strip("#"))
print("  左だけ".lstrip())
print("右だけ  ".rstrip())`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">検索・置換・確認メソッド</h2>
        <PythonPlayground
          defaultCode={`sentence = "Pythonは素晴らしいプログラミング言語です"

# 検索
print("find:", sentence.find("プログラミング"))    # 位置を返す（-1なら未発見）
print("index:", sentence.index("Pythonは"))       # 位置を返す（未発見はエラー）
print("count:", sentence.count("は"))              # 出現回数

# 存在確認
print("startswith:", sentence.startswith("Python"))
print("endswith:", sentence.endswith("です"))
print("in演算子:", "プログラミング" in sentence)

# 置換
new_sentence = sentence.replace("Python", "Rust")
print("replace:", new_sentence)

# 複数回置換のリミット
text = "aababab"
print(text.replace("a", "X", 2))  # 最初の2つだけ置換`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">文字種判定メソッド</h2>
        <PythonPlayground
          defaultCode={`# 文字種の判定メソッド
tests = ["Hello", "HELLO", "hello", "123", "abc123", "  ", ""]

for s in tests:
    results = []
    if s.isalpha(): results.append("isalpha")
    if s.isdigit(): results.append("isdigit")
    if s.isalnum(): results.append("isalnum")
    if s.isupper(): results.append("isupper")
    if s.islower(): results.append("islower")
    if s.isspace(): results.append("isspace")
    print(f"'{s}': {results if results else ['(なし)']}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="strings" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/strings" />
    </div>
  );
}
