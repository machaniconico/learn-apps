import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function ResultBuildersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">上級機能</span>
        <h1 className="text-3xl font-bold text-gray-100">Result Builder</h1>
        <p className="text-gray-400">@resultBuilder でドメイン固有言語（DSL）を構築しましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">@resultBuilder</code> はSwift 5.4で導入された機能で、
          SwiftUIの <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">@ViewBuilder</code> の基盤です。
          複数の式を1つの値にまとめるDSLを宣言的に記述できます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// 基本的な @resultBuilder
@resultBuilder
struct ArrayBuilder<T> {
    // 必須: 複数の部分結果をまとめる
    static func buildBlock(_ components: T...) -> [T] {
        components
    }
}

// @ArrayBuilder を引数に適用
func makeArray<T>(@ArrayBuilder<T> content: () -> [T]) -> [T] {
    content()
}

let numbers = makeArray {
    1
    2
    3
}
print(numbers)  // [1, 2, 3]

let fruits = makeArray {
    "Apple"
    "Banana"
    "Cherry"
}
print(fruits)  // ["Apple", "Banana", "Cherry"]`}
        height="280px"
        expectedOutput={"[1, 2, 3]\n[\"Apple\", \"Banana\", \"Cherry\"]"}
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">条件分岐とループのサポート</h2>
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">buildIf</code>・<code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">buildEither</code>・<code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">buildArray</code> を実装することで
          if文やforループをResult Builder内で使えるようになります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ parts: String...) -> String {
        parts.joined(separator: "\\n")
    }

    // if 文のサポート
    static func buildIf(_ part: String?) -> String {
        part ?? ""
    }

    // if-else 文のサポート
    static func buildEither(first: String) -> String { first }
    static func buildEither(second: String) -> String { second }

    // for ループのサポート
    static func buildArray(_ parts: [String]) -> String {
        parts.joined(separator: "\\n")
    }
}

func html(@HTMLBuilder _ content: () -> String) -> String {
    "<html>\\n\\(content())\\n</html>"
}

let isLoggedIn = true
let items = ["Home", "About", "Contact"]

let page = html {
    "<head><title>My Site</title></head>"
    if isLoggedIn {
        "<p>Welcome back!</p>"
    } else {
        "<p>Please log in.</p>"
    }
    for item in items {
        "<li>\\(item)</li>"
    }
}
print(page)`}
        height="360px"
        expectedOutput="<html>\n<head><title>My Site</title></head>\n<p>Welcome back!</p>\n<li>Home</li>\n<li>About</li>\n<li>Contact</li>\n</html>"
      />

      <SwiftEditor
        defaultCode={`// SwiftUI の ViewBuilder と同じ仕組み
// @ViewBuilder の簡易実装イメージ

protocol View {
    var body: String { get }
}

struct Text: View {
    let content: String
    var body: String { "<p>\\(content)</p>" }
}

struct VStack: View {
    let children: [any View]
    var body: String {
        "<div>\\n" + children.map { $0.body }.joined(separator: "\\n") + "\\n</div>"
    }

    init(@ViewBuilder content: () -> [any View]) {
        children = content()
    }
}

@resultBuilder
struct ViewBuilder {
    static func buildBlock(_ views: any View...) -> [any View] {
        views
    }
}

let stack = VStack {
    Text(content: "Hello")
    Text(content: "World")
}
print(stack.body)`}
        height="320px"
        expectedOutput="<div>\n<p>Hello</p>\n<p>World</p>\n</div>"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="advanced" lessonId="result-builders" />
      </div>
      <LessonNav lessons={lessons} currentId="result-builders" basePath="/learn/advanced" />
    </div>
  );
}
