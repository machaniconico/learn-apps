import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function MultilinePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数行文字列</h1>
        <p className="text-gray-400">三重引用符"""を使った複数行文字列リテラルとraw文字列を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数行文字列リテラル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">"""</code>（三重引用符）で囲むことで複数行にわたる文字列を書けます。
          HTML・JSON・SQL・詩など長いテキストを扱うときに便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>開始の <code className="text-purple-300">"""</code> の後に改行が必要</li>
          <li>終了の <code className="text-purple-300">"""</code> のインデントが基準になる</li>
          <li>バックスラッシュ <code className="text-purple-300">\</code> で行を継続できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複数行文字列の基本</h2>
        <SwiftEditor
          defaultCode={`// 複数行文字列
let poem = """
春はあけぼの
夏は夜
秋は夕暮れ
冬はつとめて
"""
print(poem)

// 文字列補間も使える
let name = "Swift"
let version = 5.9
let description = """
言語: \\(name)
バージョン: \\(version)
特徴: 安全・高速・モダン
"""
print(description)`}
          expectedOutput={`春はあけぼの
夏は夜
秋は夕暮れ
冬はつとめて

言語: Swift
バージョン: 5.9
特徴: 安全・高速・モダン`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">raw文字列と行継続</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">#"..."#</code> のraw文字列ではバックスラッシュエスケープが無効になります。
          正規表現パターンなどバックスラッシュを多用する文字列に便利です。
          行末に <code className="text-purple-300">\</code> を置くと実際の改行を含まない複数行文字列が書けます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: raw文字列と行継続</h2>
        <SwiftEditor
          defaultCode={`// raw文字列（バックスラッシュをそのまま表示）
let regex = #"\d{3}-\d{4}-\d{4}"#
print(regex)  // \d{3}-\d{4}-\d{4}

// 行継続（改行しない複数行）
let longText = """
    これは非常に長い文章で、\
    実際には1行として扱われます。\
    読みやすくするために複数行に分けています。
    """
print(longText)

// HTMLテンプレート
let html = """
    <html>
        <body>
            <h1>Hello, Swift!</h1>
        </body>
    </html>
    """
print(html)`}
          expectedOutput={`\d{3}-\d{4}-\d{4}
これは非常に長い文章で、実際には1行として扱われます。読みやすくするために複数行に分けています。
<html>
    <body>
        <h1>Hello, Swift!</h1>
    </body>
</html>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="multiline" />
      </div>
      <LessonNav lessons={lessons} currentId="multiline" basePath="/learn/strings" />
    </div>
  );
}
