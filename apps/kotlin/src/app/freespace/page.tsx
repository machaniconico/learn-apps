import { KotlinEditor } from "@/components/kotlin-editor";

const DEFAULT_CODE = `// Kotlin FizzBuzz + コレクション操作 + data class

// FizzBuzz
println("=== FizzBuzz (1-20) ===")
for (i in 1..20) {
    when {
        i % 15 == 0 -> print("FizzBuzz ")
        i % 3 == 0  -> print("Fizz ")
        i % 5 == 0  -> print("Buzz ")
        else        -> print("\$i ")
    }
}
println()

// コレクション高階関数
println("\\n=== コレクション操作 ===")
val numbers = (1..10).toList()
val result = numbers
    .filter { it % 2 == 0 }
    .map { it * it }
println("偶数の二乗: \$result")

val sum = numbers.fold(0) { acc, n -> acc + n }
println("合計: \$sum")

// data class
println("\\n=== data class ===")
data class Person(val name: String, val age: Int)

val people = listOf(
    Person("太郎", 25),
    Person("花子", 30),
    Person("次郎", 22)
)

val sorted = people.sortedBy { it.age }
sorted.forEach { println("  \${it.name}: \${it.age}歳") }

val oldest = people.maxByOrNull { it.age }
println("最年長: \${oldest?.name}")

// null安全
println("\\n=== Null安全 ===")
val maybeNull: String? = null
val length = maybeNull?.length ?: 0
println("長さ: \$length（nullなら0）")
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🟣</span>
            <h1 className="text-3xl font-bold text-gray-100">Kotlinフリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Kotlinコードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <KotlinEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Kotlin特有の機能</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              val/var、data class、when式、null安全（?.・?:）、文字列テンプレートなどKotlinらしい機能を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">コレクション・高階関数</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              filter・map・fold・groupByなどの高階関数、スコープ関数（let・apply・also）をブラウザ上で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ファイルシステムへのアクセスやネットワーク通信はブラウザのセキュリティ制限により一部制限があります。コルーチンの実行環境も制限される場合があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
