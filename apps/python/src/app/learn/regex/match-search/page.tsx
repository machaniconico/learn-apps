import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function MatchSearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">正規表現 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">match・search・findall</h1>
        <p className="text-gray-400">
          文字列からパターンを検索する各関数の違いと、
          グループキャプチャを使った高度な検索方法を学びます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">3つの検索関数の比較</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3 text-gray-400">関数</th>
                <th className="text-left p-3 text-gray-400">検索範囲</th>
                <th className="text-left p-3 text-gray-400">戻り値</th>
                <th className="text-left p-3 text-gray-400">用途</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["re.match()", "先頭のみ", "Matchオブジェクト or None", "フォーマット検証"],
                ["re.search()", "全体（最初の1件）", "Matchオブジェクト or None", "パターンの存在確認"],
                ["re.findall()", "全体（全件）", "文字列のリスト", "全マッチの取得"],
                ["re.finditer()", "全体（全件）", "Matchオブジェクトのイテレータ", "マッチ位置も必要な場合"],
              ].map(([func, scope, ret, use]) => (
                <tr key={func} className="border-b border-gray-800">
                  <td className="p-3"><code className="text-red-400 font-mono text-xs">{func}</code></td>
                  <td className="p-3 text-gray-300 text-xs">{scope}</td>
                  <td className="p-3 text-gray-400 text-xs">{ret}</td>
                  <td className="p-3 text-gray-400 text-xs">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Match オブジェクトの使い方</h2>
        <PythonPlayground
          defaultCode={`import re

text = "注文番号: ORD-2024-001234, 金額: 5,800円, 日付: 2024-03-15"

# search でマッチオブジェクトを取得
m = re.search(r'ORD-(\\d{4})-(\\d{6})', text)
if m:
    print(f"マッチ全体: {m.group()}")    # group() or group(0)
    print(f"グループ1: {m.group(1)}")   # 年
    print(f"グループ2: {m.group(2)}")   # 注文番号
    print(f"開始位置: {m.start()}")
    print(f"終了位置: {m.end()}")
    print(f"スパン: {m.span()}")

print()
# 名前付きグループ (?P<name>...)
pattern = r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})'
m2 = re.search(pattern, text)
if m2:
    print(f"年: {m2.group('year')}")
    print(f"月: {m2.group('month')}")
    print(f"日: {m2.group('day')}")
    print(f"全グループ: {m2.groupdict()}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">findall と finditer の活用</h2>
        <PythonPlayground
          defaultCode={`import re

# HTML からリンクを抽出
html = """
<html>
<a href="https://python.org">Python公式</a>
<a href="https://docs.python.org/ja/">日本語ドキュメント</a>
<img src="logo.png" alt="ロゴ">
<a href="https://pypi.org">PyPI</a>
</html>
"""

print("=== findall でグループを含むパターン ===")
# グループがあると、グループ部分のリストを返す
links = re.findall(r'href="([^"]+)"', html)
print(f"全リンク: {links}")

print()
print("=== finditer でMatchオブジェクトを取得 ===")
link_pattern = re.compile(r'<a href="([^"]+)">([^<]+)</a>')
for m in link_pattern.finditer(html):
    url = m.group(1)
    label = m.group(2)
    start = m.start()
    print(f"  [{start:3d}] {label}: {url}")

print()
# メールアドレスの抽出と検証
text = "連絡先: tanaka@example.com, suzuki@test.co.jp, invalid-email, admin@python.org"
email_pattern = r'[\\w.+-]+@[\\w-]+\\.[\\w.]+'
emails = re.findall(email_pattern, text)
print(f"メールアドレス: {emails}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="regex" lessonId="match-search" />
      </div>
      <LessonNav lessons={lessons} currentId="match-search" basePath="/learn/regex" />
    </div>
  );
}
