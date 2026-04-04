import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function DynamicCallablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">上級機能 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@dynamicCallable</h1>
        <p className="text-gray-400">動的呼び出し可能な型を実装して関数として呼び出せる型を作成します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@dynamicCallableとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">@dynamicCallable</code>属性を型に付けると、その型のインスタンスを関数のように呼び出せるようになります。
          <code className="text-red-300">dynamicallyCall(withArguments:)</code>または<code className="text-red-300">dynamicallyCall(withKeywordArguments:)</code>
          メソッドを実装することで実現します。Pythonブリッジやコマンド実行システムに利用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">@dynamicCallable</code> — 型に付ける属性</li>
          <li><code className="text-blue-300">dynamicallyCall(withArguments:)</code> — 位置引数での呼び出し</li>
          <li><code className="text-blue-300">dynamicallyCall(withKeywordArguments:)</code> — キーワード引数での呼び出し</li>
          <li><code className="text-blue-300">@dynamicMemberLookupとの組み合わせ</code> — メソッドチェーンとの親和性</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的な@dynamicCallable</h2>
        <SwiftEditor
          defaultCode={`// @dynamicCallableの基本実装

@dynamicCallable
struct Adder {
    let base: Int

    // 位置引数での呼び出し: adder(1, 2, 3)
    func dynamicallyCall(withArguments args: [Int]) -> Int {
        return base + args.reduce(0, +)
    }
}

let addFive = Adder(base: 5)
print("addFive(1, 2, 3):", addFive(1, 2, 3))    // 5 + 1 + 2 + 3 = 11
print("addFive(10):", addFive(10))               // 5 + 10 = 15
print("addFive():", addFive())                   // 5 + 0 = 5

// キーワード引数版
@dynamicCallable
struct StringFormatter {
    // キーワード引数での呼び出し: formatter(prefix: ">>", text: "hello", suffix: "<<")
    func dynamicallyCall(withKeywordArguments args: KeyValuePairs<String, String>) -> String {
        var result = ""
        var text = ""
        var prefix = ""
        var suffix = ""

        for (key, value) in args {
            switch key {
            case "text": text = value
            case "prefix": prefix = value
            case "suffix": suffix = value
            default: break
            }
        }
        result = "\\(prefix)\\(text)\\(suffix)"
        return result
    }
}

let formatter = StringFormatter()
print("\\nフォーマット結果:")
print(formatter(prefix: "【", text: "Swift", suffix: "】"))
print(formatter(prefix: ">>", text: "Hello World", suffix: "<<"))
print(formatter(text: "No Decoration"))`}
          expectedOutput={`addFive(1, 2, 3): 11
addFive(10): 15
addFive(): 5

フォーマット結果:
【Swift】
>>Hello World<<
No Decoration`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@dynamicMemberLookupとの組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">@dynamicCallable</code>と<code className="text-red-300">@dynamicMemberLookup</code>を
          組み合わせると、Pythonのような動的なAPIを実現できます。
          メンバーアクセスで関数オブジェクトを取得し、それを呼び出すパターンが可能になります。
          Swift for TensorFlowなどのプロジェクトでこの技術が活用されています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: コマンドディスパッチャー</h2>
        <SwiftEditor
          defaultCode={`// @dynamicCallable + @dynamicMemberLookup の組み合わせ

@dynamicCallable
@dynamicMemberLookup
struct CommandDispatcher {
    private var commands: [String: ([String]) -> String]
    private var currentCommand: String = ""

    init() {
        commands = [
            "greet": { args in "こんにちは、\\(args.first ?? "ゲスト")さん！" },
            "add": { args in
                let nums = args.compactMap { Int($0) }
                return "合計: \\(nums.reduce(0, +))"
            },
            "upper": { args in args.first?.uppercased() ?? "" },
            "repeat": { args in
                guard args.count >= 2, let n = Int(args[1]) else { return "" }
                return String(repeating: args[0], count: n)
            }
        ]
    }

    // @dynamicMemberLookupでコマンドを選択
    subscript(dynamicMember command: String) -> CommandDispatcher {
        var copy = self
        copy.currentCommand = command
        return copy
    }

    // @dynamicCallableで引数を渡して実行
    func dynamicallyCall(withArguments args: [String]) -> String {
        guard let handler = commands[currentCommand] else {
            return "コマンド '\\(currentCommand)' が見つかりません"
        }
        return handler(args)
    }
}

let cmd = CommandDispatcher()

// ドット記法でコマンド選択 → 関数呼び出し
print(cmd.greet("田中"))
print(cmd.add("10", "20", "30"))
print(cmd.upper("swift"))
print(cmd.repeat("Ha", "3"))
print(cmd.unknown("test"))`}
          expectedOutput={`こんにちは、田中さん！
合計: 60
SWIFT
HaHaHa
コマンド 'unknown' が見つかりません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: 関数合成パイプライン</h2>
        <SwiftEditor
          defaultCode={`// @dynamicCallableを使った関数合成

@dynamicCallable
struct Pipeline<Input, Output> {
    private let transform: (Input) -> Output

    init(_ transform: @escaping (Input) -> Output) {
        self.transform = transform
    }

    func dynamicallyCall(withArguments args: [Input]) -> Output {
        return transform(args[0])
    }

    // パイプラインを結合
    func pipe<NewOutput>(_ next: @escaping (Output) -> NewOutput) -> Pipeline<Input, NewOutput> {
        return Pipeline<Input, NewOutput> { input in
            next(self.transform(input))
        }
    }
}

// テキスト処理パイプライン
let trim = Pipeline<String, String> { $0.trimmingCharacters(in: .whitespaces) }
let upper = Pipeline<String, String> { $0.uppercased() }
let exclaim = Pipeline<String, String> { $0 + "!" }

// パイプラインを結合
let process = trim
    .pipe { $0.uppercased() }
    .pipe { $0 + "!" }
    .pipe { ">> \\($0) <<" }

let inputs = ["  hello  ", " swift programming ", "  動的呼び出し  "]
for input in inputs {
    print(process(input))
}

// 数値変換パイプライン
let doubleAndFormat = Pipeline<Int, String> { num in
    let doubled = num * 2
    return "\\(num) × 2 = \\(doubled)"
}

print("")
[1, 5, 10, 42].forEach { print(doubleAndFormat($0)) }`}
          expectedOutput={`>> HELLO! <<
>> SWIFT PROGRAMMING! <<
>> 動的呼び出し! <<

1 × 2 = 2
5 × 2 = 10
10 × 2 = 20
42 × 2 = 84`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="advanced" lessonId="dynamic-callable" />
      </div>
      <LessonNav lessons={lessons} currentId="dynamic-callable" basePath="/learn/advanced" />
    </div>
  );
}
