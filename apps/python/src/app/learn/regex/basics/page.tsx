import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function RegexBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">正規表現 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現の基本</h1>
        <p className="text-gray-400">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">re</code> モジュールと基本的なパターン文字列の書き方を学びます。
          正規表現はテキスト処理の強力なツールです。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">re モジュールの主要関数</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            { func: "re.match()", desc: "文字列の先頭からパターンを検索" },
            { func: "re.search()", desc: "文字列内の任意の位置で検索" },
            { func: "re.findall()", desc: "マッチする全ての文字列をリストで返す" },
            { func: "re.finditer()", desc: "マッチオブジェクトのイテレータを返す" },
            { func: "re.sub()", desc: "マッチした部分を置換する" },
            { func: "re.split()", desc: "パターンで文字列を分割する" },
            { func: "re.compile()", desc: "パターンをコンパイルして再利用する" },
            { func: "re.fullmatch()", desc: "文字列全体がパターンに一致するか確認" },
          ].map((item) => (
            <div key={item.func} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <code className="text-red-400 font-mono text-sm">{item.func}</code>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">最初の一歩: re.search と re.match</h2>
        <p className="text-gray-400 mb-4">
          パターンは <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">r'...'</code>（raw文字列）で書くのが慣習です。
          バックスラッシュをエスケープせずに書けます。
        </p>
        <PythonPlayground
          defaultCode={`import re

text = "今日のPython勉強会は2024年3月15日に開催します。参加費は1000円です。"

# re.search: 文字列のどこかにあればマッチ
match = re.search(r'\\d+', text)
if match:
    print(f"最初の数字: {match.group()}")
    print(f"位置: {match.start()} 〜 {match.end()}")

# re.match: 先頭からのみマッチ
m1 = re.match(r'\\d+', text)   # 先頭は漢字なのでマッチしない
m2 = re.match(r'今日', text)   # 先頭が「今日」なのでマッチ
print(f"\\nmatch(数字): {m1}")
print(f"match(今日): {m2.group() if m2 else None}")

# re.fullmatch: 全体がパターンと一致するか
patterns = [
    (r'\\d+', "12345", True),
    (r'\\d+', "123abc", False),
    (r'[a-z]+', "hello", True),
]
print("\\nfullmatch:")
for pattern, test_str, expected in patterns:
    result = bool(re.fullmatch(pattern, test_str))
    print(f"  {pattern!r} vs {test_str!r}: {result} (期待: {expected})")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">re.findall と re.compile</h2>
        <PythonPlayground
          defaultCode={`import re

text = "電話番号: 090-1234-5678, 080-9876-5432, 03-1234-5678"

# re.findall: 全マッチを一度に取得
all_numbers = re.findall(r'\\d+', text)
print(f"全数字: {all_numbers}")

# 電話番号パターンで検索
phones = re.findall(r'\\d{2,3}-\\d{3,4}-\\d{4}', text)
print(f"電話番号: {phones}")

print()
# re.compile: パターンをコンパイルして再利用（高速化）
# 同じパターンを何度も使う場合に有効
phone_pattern = re.compile(r'(\\d{2,3})-(\\d{3,4})-(\\d{4})')
texts = [
    "連絡先: 090-1234-5678",
    "固定: 03-1234-5678",
    "メール: test@example.com",  # マッチしない
]

for t in texts:
    m = phone_pattern.search(t)
    if m:
        area, mid, last = m.groups()
        print(f"  {t!r:30s} → 市外: {area}, 中間: {mid}, 末尾: {last}")
    else:
        print(f"  {t!r:30s} → マッチなし")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="regex" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/regex" />
    </div>
  );
}
