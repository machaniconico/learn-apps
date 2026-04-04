import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function PatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">正規表現 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メタ文字とパターン</h1>
        <p className="text-gray-400">
          正規表現のメタ文字（特殊文字）を使ったパターンの書き方を学びます。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">.</code>・
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">*</code>・
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">+</code>・
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">[]</code>・
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">^$</code> などを習得しましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">文字クラス: . \\d \\w \\s</h2>
        <PythonPlayground
          defaultCode={`import re

# . : 任意の1文字（改行以外）
print("=== . （任意の1文字）===")
text = "cat, bat, hat, rat, mat"
matches = re.findall(r'.at', text)
print(f"'.at' マッチ: {matches}")

print()
# \\d : 数字 [0-9]
print("=== \\\\d （数字）===")
text = "電話: 090-1234-5678, 価格: 2,800円"
digits = re.findall(r'\\d+', text)
print(f"数字: {digits}")

print()
# \\w : 英数字とアンダースコア [a-zA-Z0-9_]
print("=== \\\\w （英数字・アンダースコア）===")
text = "user_name = 'hello_world123'"
words = re.findall(r'\\w+', text)
print(f"単語: {words}")

print()
# \\s : 空白文字（スペース、タブ、改行）
print("=== \\\\s （空白文字）===")
text = "hello   world\\t\\ttab\\nnewline"
parts = re.split(r'\\s+', text)
print(f"分割結果: {parts}")

print()
# 大文字は否定: \\D=非数字, \\W=非単語文字, \\S=非空白
text = "abc 123 !@# def"
non_digits = re.findall(r'\\D+', text)
print(f"非数字: {non_digits}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">量指定子: * + ? {'{n}'}</h2>
        <PythonPlayground
          defaultCode={`import re

text = "color colour colouur colouuur"

# * : 0回以上
print(f"'colou*r' (*=0回以上): {re.findall(r'colou*r', text)}")

# + : 1回以上
print(f"'colou+r' (+=1回以上): {re.findall(r'colou+r', text)}")

# ? : 0回または1回
print(f"'colou?r' (?=0or1回): {re.findall(r'colou?r', text)}")

print()
# {n}: ちょうどn回
# {n,}: n回以上
# {n,m}: n回以上m回以下
test = "aaa bb ccccc dd eeeee"
print(f"'a{{2}}' (2回): {re.findall(r'a{2}', test)}")
print(f"'[a-e]{{3,}}' (3回以上): {re.findall(r'[a-e]{3,}', test)}")
print(f"'[a-e]{{2,3}}' (2〜3回): {re.findall(r'[a-e]{2,3}', test)}")

print()
# 貪欲マッチ vs 非貪欲マッチ
html = "<b>太字</b>と<i>イタリック</i>"
greedy = re.findall(r'<.+>', html)     # 貪欲（できるだけ多く）
non_greedy = re.findall(r'<.+?>', html)  # 非貪欲（できるだけ少なく）
print(f"貪欲: {greedy}")
print(f"非貪欲: {non_greedy}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">文字クラス [] と アンカー ^ $</h2>
        <PythonPlayground
          defaultCode={`import re

# [] : 文字クラス
print("=== 文字クラス [] ===")
text = "apple, APPLE, Apple, 123, aPpLe"
# [a-z]: 小文字
print(f"[a-z]+: {re.findall(r'[a-z]+', text)}")
# [A-Z]: 大文字
print(f"[A-Z]+: {re.findall(r'[A-Z]+', text)}")
# [a-zA-Z]: 英字
print(f"[a-zA-Z]+: {re.findall(r'[a-zA-Z]+', text)}")
# [^...]: 否定（含まない）
print(f"[^,\\\\s]+: {re.findall(r'[^,\\s]+', text)}")

print()
# ^ と $: アンカー
lines = ["Python is great", "I love Python", "python3 version", "  Python  "]
print("=== アンカー ^ と $ ===")
for line in lines:
    starts = bool(re.match(r'^Python', line))
    ends = bool(re.search(r'Python$', line.strip()))
    print(f"  {line!r:25s}: 先頭={starts}, 末尾={ends}")

print()
# \\b: 単語境界
text = "cat concatenate scat catch"
print(f"\\\\bcat\\\\b（単語全体）: {re.findall(r'\\bcat\\b', text)}")
print(f"cat（含む）: {re.findall(r'cat', text)}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="regex" lessonId="patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="patterns" basePath="/learn/regex" />
    </div>
  );
}
