import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字コードとエンコーディング</h1>
        <p className="text-gray-400">UTF-8 と bytes オブジェクトの扱い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">文字コードの基礎知識</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            コンピューターは文字を数値（バイト列）として扱います。<strong className="text-white">エンコーディング</strong>とはその変換規則です。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-pink-400 font-semibold mb-2">主なエンコーディング</p>
              <ul className="space-y-1 text-gray-300">
                <li>• <strong className="text-white">UTF-8</strong>：世界標準。日本語もOK</li>
                <li>• <strong className="text-white">UTF-16</strong>：Windowsで多用</li>
                <li>• <strong className="text-white">Shift-JIS</strong>：日本語の旧標準</li>
                <li>• <strong className="text-white">ASCII</strong>：英数字のみ</li>
              </ul>
            </div>
            <div>
              <p className="text-pink-400 font-semibold mb-2">Pythonの文字列型</p>
              <ul className="space-y-1 text-gray-300">
                <li>• <code className="text-pink-400 bg-gray-800 px-1 rounded">str</code>：Unicode文字列（Python 3）</li>
                <li>• <code className="text-pink-400 bg-gray-800 px-1 rounded">bytes</code>：バイト列</li>
                <li>• encode() で str → bytes</li>
                <li>• decode() で bytes → str</li>
              </ul>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`# 文字列とバイト列の変換
text = "こんにちは Python"

# encode: 文字列 → バイト列
utf8_bytes = text.encode("utf-8")
print("UTF-8:", utf8_bytes)
print("長さ:", len(utf8_bytes), "バイト")

# decode: バイト列 → 文字列
decoded = utf8_bytes.decode("utf-8")
print("デコード:", decoded)

# 文字ごとのコードポイント
for char in "ABC日本語":
    print(f"'{char}' → U+{ord(char):04X} ({ord(char)})")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">bytes オブジェクトの操作</h2>
        <PythonPlayground
          defaultCode={`# bytes の作成と操作
b1 = b"Hello"          # バイトリテラル
b2 = bytes([72, 101, 108, 108, 111])  # 数値リストから

print(b1)
print(b2)
print(b1 == b2)   # 同じ内容

# バイト列の結合
greeting = b"Hello" + b", " + "World".encode()
print(greeting)
print(greeting.decode())

# バイト列の検索
print(b1.find(b"ell"))
print(b"ABC" in b"XYZABCDE")

# hex表示
print("hello".encode().hex())`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">エンコーディングエラーの処理</h2>
        <PythonPlayground
          defaultCode={`# エラーハンドリングオプション
text = "日本語テキスト"

# strict（デフォルト）: エラーで例外発生
try:
    text.encode("ascii")
except UnicodeEncodeError as e:
    print("strict エラー:", e)

# ignore: エンコードできない文字を無視
result = text.encode("ascii", errors="ignore")
print("ignore:", result)

# replace: エンコードできない文字を ? に置換
result = text.encode("ascii", errors="replace")
print("replace:", result)

# xmlcharrefreplace: XML文字参照で置換
result = text.encode("ascii", errors="xmlcharrefreplace")
print("xmlcharrefreplace:", result)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="strings" lessonId="encoding" />
      </div>
      <LessonNav lessons={lessons} currentId="encoding" basePath="/learn/strings" />
    </div>
  );
}
