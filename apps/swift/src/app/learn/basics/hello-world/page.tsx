import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello World</h1>
        <p className="text-gray-400">最初のSwiftプログラムを作成しましょう。print関数とSwift Playgroundsを使った基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swiftプログラムの基本構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftはトップレベルのコードを直接実行できます。他の言語のように <code className="text-blue-300">main()</code> 関数は不要です（スクリプトモード）。
          <code className="text-blue-300">print()</code> 関数を使ってコンソールに文字列を出力できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">print("文字列")</code> — 文字列を出力して改行する</li>
          <li><code className="text-blue-300">// コメント</code> — 単一行コメント</li>
          <li>Swift Playgrounds や Xcode で即座に実行結果を確認できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Hello Worldを出力</h2>
        <SwiftEditor
          defaultCode={`print("Hello, World!")
print("Swiftへようこそ！")`}
          expectedOutput={`Hello, World!
Swiftへようこそ！`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列補間</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは <code className="text-blue-300">\(式)</code> を使って文字列の中に変数や式を埋め込めます。
          これを「文字列補間（String Interpolation）」と呼びます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 文字列補間を使った出力</h2>
        <SwiftEditor
          defaultCode={`let language = "Swift"
let year = 2014
print("\\(language)は\\(year)年に登場しました")
print("2 + 3 = \\(2 + 3)")`}
          expectedOutput={`Swiftは2014年に登場しました
2 + 3 = 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
