import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function ReplacePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">正規表現 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">置換・分割</h1>
        <p className="text-gray-400">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">re.sub()</code> による置換と
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">re.split()</code> による分割の使い方を学びます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">re.sub() — 置換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">re.sub(pattern, repl, string, count=0)</code> で
          パターンにマッチした部分を <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">repl</code> に置換します。
        </p>
        <PythonPlayground
          defaultCode={`import re

# 基本的な置換
text = "今日は2024-03-15で、締め切りは2024-04-30です。"

# 日付形式を変換
result = re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\1年\\2月\\3日', text)
print(f"元: {text}")
print(f"変換後: {result}")

print()
# count で置換回数を制限
text2 = "apple apple apple apple"
result2 = re.sub(r'apple', 'orange', text2, count=2)
print(f"count=2: {result2}")

print()
# 関数を使った動的置換
def add_tax(m):
    price = int(m.group(1))
    with_tax = int(price * 1.1)
    return f"{with_tax}円（税込）"

prices_text = "りんご: 100円、バナナ: 80円、みかん: 150円"
result3 = re.sub(r'(\\d+)円', add_tax, prices_text)
print(f"税抜き: {prices_text}")
print(f"税込み: {result3}")

print()
# 個人情報のマスキング
log = "ユーザー: 090-1234-5678 が tanaka@example.com でログイン"
masked = re.sub(r'\\d{3}-\\d{4}-\\d{4}', '***-****-****', log)
masked = re.sub(r'[\\w.]+@[\\w.]+', '****@****.***', masked)
print(f"マスク済み: {masked}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">re.split() — 分割</h2>
        <PythonPlayground
          defaultCode={`import re

# 基本的な分割（複数の区切り文字に対応）
text = "りんご, バナナ; みかん   ぶどう,いちご"
parts = re.split(r'[,;\\s]+', text.strip())
print(f"分割結果: {parts}")

print()
# グループを使った分割（区切り文字も含める）
text2 = "key1=value1&key2=value2&key3=value3"
parts2 = re.split(r'[=&]', text2)
print(f"クエリパース: {parts2}")

# ペアにする
keys = parts2[::2]    # 奇数インデックス
values = parts2[1::2]  # 偶数インデックス
params = dict(zip(keys, values))
print(f"パラメータ: {params}")

print()
# maxsplit で分割数を制限
text3 = "first::second::third::fourth"
result_all = re.split(r'::', text3)
result_2 = re.split(r'::', text3, maxsplit=2)
print(f"全分割: {result_all}")
print(f"maxsplit=2: {result_2}")

print()
# CSV の行をパース（クォートを考慮した例）
csv_line = '田中太郎,28,"東京,渋谷区",92'
# シンプルな split（クォート内のコンマを無視できない）
naive = csv_line.split(",")
print(f"単純分割: {naive}")
# 正しく処理するには csv モジュールを使う
import csv, io
correct = list(csv.reader(io.StringIO(csv_line)))[0]
print(f"CSV モジュール: {correct}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">フラグの使い方</h2>
        <PythonPlayground
          defaultCode={`import re

text = """Hello World
hello python
HELLO REGEX
こんにちは Python"""

# re.IGNORECASE (re.I): 大文字小文字を区別しない
print("=== re.IGNORECASE ===")
matches = re.findall(r'hello', text, re.IGNORECASE)
print(f"'hello' (大文字小文字無視): {matches}")

print()
# re.MULTILINE (re.M): ^ と $ が各行の先頭・末尾にマッチ
print("=== re.MULTILINE ===")
line_starts = re.findall(r'^\\w+', text, re.MULTILINE)
print(f"各行の先頭単語: {line_starts}")

print()
# re.DOTALL (re.S): . が改行文字にもマッチ
html = "<div>\\n  <p>段落</p>\\n</div>"
without_s = re.search(r'<div>(.+)</div>', html)
with_s = re.search(r'<div>(.+)</div>', html, re.DOTALL)
print(f"re.DOTALL なし: {without_s}")
print(f"re.DOTALL あり: {with_s.group(1)!r if with_s else None}")

print()
# フラグの組み合わせ
matches2 = re.findall(r'^hello.+$', text, re.IGNORECASE | re.MULTILINE)
print(f"IGNORECASE + MULTILINE: {matches2}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="regex" lessonId="replace" />
      </div>
      <LessonNav lessons={lessons} currentId="replace" basePath="/learn/regex" />
    </div>
  );
}
