import { SwiftEditor } from "@/components/swift-editor";

const DEFAULT_CODE = `// Swift FizzBuzz & コレクション操作
// FizzBuzz
print("=== FizzBuzz (1-20) ===")
for i in 1...20 {
    if i % 15 == 0 {
        print("FizzBuzz", terminator: " ")
    } else if i % 3 == 0 {
        print("Fizz", terminator: " ")
    } else if i % 5 == 0 {
        print("Buzz", terminator: " ")
    } else {
        print(i, terminator: " ")
    }
}
print()

// 配列操作
print("\\n=== 配列操作 ===")
let numbers = Array(1...10)
let evens = numbers.filter { $0 % 2 == 0 }
print("偶数とその二乗:")
evens.forEach { print("  \\($0) -> \\($0 * $0)") }

// 辞書操作
print("\\n=== 辞書操作 ===")
let scores = ["太郎": 85, "花子": 92, "次郎": 78]
if let top = scores.max(by: { $0.value < $1.value }) {
    print("最高得点: \\(top.key) (\\(top.value)点)")
}
let avg = Double(scores.values.reduce(0, +)) / Double(scores.count)
print("平均点: \\(String(format: "%.1f", avg))")
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-3xl font-bold text-gray-100">Swiftフリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Swiftコードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <SwiftEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">基本構文</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              変数・定数宣言、制御構文、関数定義、クラスなどSwiftの基本的な構文を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">コレクション操作</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              配列、辞書、Optionalや高階関数（map、filter、reduceなど）Swiftならではの機能をブラウザ上で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ファイルシステムへのアクセスやネットワーク通信はブラウザのセキュリティ制限により一部制限があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
