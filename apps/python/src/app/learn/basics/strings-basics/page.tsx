import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">文字列の作成・結合・基本操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonの文字列はシングルクォートまたはダブルクォートで囲んで作成します。
          複数行の文字列にはトリプルクォートを使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">'hello'</code> - シングルクォート</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">"hello"</code> - ダブルクォート（推奨）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">"""複数行"""</code> - トリプルクォート（複数行）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{'f"値: {変数}"'}</code> - f文字列（フォーマット文字列）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成と基本操作</h2>
        <PythonPlayground defaultCode={`# 様々な文字列の作成
s1 = 'シングルクォート'
s2 = "ダブルクォート"
s3 = """これは
複数行の
文字列です"""

print(s1)
print(s2)
print(s3)

# 文字列の長さ
text = "Python学習"
print(f"\\n'{text}' の文字数: {len(text)}")

# 文字列の結合（+演算子）
first = "Hello"
last = "World"
print(first + ", " + last + "!")

# 文字列の繰り返し（*演算子）
print("=" * 30)
print("Python！" * 3)`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エスケープシーケンス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          特殊な文字を文字列に含めるにはバックスラッシュ（\）を使ったエスケープシーケンスを使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">\n</code> - 改行</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">\t</code> - タブ</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">\\</code> - バックスラッシュそのもの</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">\'</code> または <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">\"</code> - クォート文字</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列のインデックスとスライス</h2>
        <p className="text-gray-400 mb-4">文字列の特定の文字や部分を取り出す方法を学びましょう。</p>
        <PythonPlayground defaultCode={`text = "Python"
#        P  y  t  h  o  n
# index  0  1  2  3  4  5
# index -6 -5 -4 -3 -2 -1

print(f"text = '{text}'")
print(f"text[0]  = '{text[0]}'   # 最初の文字")
print(f"text[-1] = '{text[-1]}'   # 最後の文字")
print(f"text[2]  = '{text[2]}'   # 3番目の文字")

# スライス [start:end:step]
print(f"\\ntext[0:3] = '{text[0:3]}'  # 最初の3文字")
print(f"text[2:]  = '{text[2:]}'    # 2番目以降")
print(f"text[:3]  = '{text[:3]}'   # 先頭から3文字")
print(f"text[::-1]= '{text[::-1]}'  # 逆順")

# in 演算子
print(f"\\n'Py' in text: {'Py' in text}")
print(f"'Java' in text: {'Java' in text}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
