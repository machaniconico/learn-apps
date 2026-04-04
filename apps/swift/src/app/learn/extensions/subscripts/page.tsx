import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function SubscriptsExtPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">サブスクリプトの追加</h1>
        <p className="text-gray-400">extensionを使って既存の型にサブスクリプトを追加します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">extensionでサブスクリプトを追加</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">subscript</code> はインスタンスに対して添字アクセス（<code className="text-cyan-300">instance[key]</code>）を可能にする特殊なメソッドです。
          extensionを使うことで、標準ライブラリの型（Array、String、Dictionaryなど）に独自のサブスクリプトを後から追加できます。
          getterだけのread-onlyサブスクリプトや、getter/setterを持つread-writeサブスクリプトが定義できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">subscript(index: T) -&gt; U</code> — 読み取り専用サブスクリプト</li>
          <li><code className="text-cyan-300">get / set</code> — 読み書き可能サブスクリプト</li>
          <li>複数の引数を持つサブスクリプトも定義可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Arrayに安全な添字アクセスを追加</h2>
        <SwiftEditor
          defaultCode={`extension Array {
    // 範囲外ならnilを返す安全なサブスクリプト
    subscript(safe index: Int) -> Element? {
        guard index >= 0, index < count else { return nil }
        return self[index]
    }
}

let fruits = ["りんご", "みかん", "バナナ"]

// 通常アクセス
print(fruits[1])

// 安全なアクセス（範囲内）
if let fruit = fruits[safe: 2] {
    print(fruit)
}

// 安全なアクセス（範囲外）
if let fruit = fruits[safe: 10] {
    print(fruit)
} else {
    print("インデックスが範囲外です")
}`}
          expectedOutput={`みかん
バナナ
インデックスが範囲外です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Stringに文字インデックスアクセスを追加</h2>
        <SwiftEditor
          defaultCode={`extension String {
    // Int インデックスで文字にアクセス
    subscript(i: Int) -> Character? {
        guard i >= 0, i < count else { return nil }
        return self[index(startIndex, offsetBy: i)]
    }

    // 範囲でサブ文字列を取得
    subscript(range: Range<Int>) -> String {
        let start = index(startIndex, offsetBy: max(0, range.lowerBound))
        let end = index(startIndex, offsetBy: min(count, range.upperBound))
        return String(self[start..<end])
    }
}

let str = "Hello, Swift!"

if let ch = str[7] {
    print(ch)
}

print(str[0..<5])
print(str[7..<12])`}
          expectedOutput={`S
Hello
Swift`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Dictionaryにデフォルト値付きサブスクリプトを追加</h2>
        <SwiftEditor
          defaultCode={`extension Dictionary where Value: Numeric {
    // キーが存在しなければデフォルト値を返し、加算も行うサブスクリプト
    subscript(key: Key, default defaultValue: Value) -> Value {
        get { self[key] ?? defaultValue }
        set { self[key] = newValue }
    }
}

var scores: [String: Int] = ["Alice": 80, "Bob": 70]

// 存在するキー
print(scores["Alice", default: 0])

// 存在しないキー（デフォルト値を返す）
print(scores["Charlie", default: 0])

// 書き込み
scores["Dave", default: 0] = 95
print(scores["Dave", default: 0])`}
          expectedOutput={`80
0
95`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="subscripts" />
      </div>
      <LessonNav lessons={lessons} currentId="subscripts" basePath="/learn/extensions" />
    </div>
  );
}
