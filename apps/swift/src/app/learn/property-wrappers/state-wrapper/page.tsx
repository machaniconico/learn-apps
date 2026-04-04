import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function StateWrapperPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@Stateの内部構造</h1>
        <p className="text-gray-400">SwiftUIの@StateがProperty Wrapperとしてどのように動作するかを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@StateはProperty Wrapper</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwiftUIの<code className="text-violet-300">@State</code>は
          <code className="text-violet-300">@propertyWrapper</code>として実装されています。
          Swiftコンパイラが<code className="text-violet-300">@State var count: Int</code>を
          <code className="text-violet-300">var _count: State&lt;Int&gt;</code>（バッキングストレージ）に変換します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">count</code> → wrappedValue（Int型）</li>
          <li><code className="text-violet-300">$count</code> → projectedValue（Binding&lt;Int&gt;型）</li>
          <li><code className="text-violet-300">_count</code> → State&lt;Int&gt;のインスタンス自体</li>
          <li>SwiftUIがメモリを管理するためstructでも状態を保持できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Stateの展開を理解する</h2>
        <p className="text-gray-400 mb-4">
          コンパイラが@Stateをどのように展開するか、等価なコードで確認します。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// 開発者が書くコード
struct CounterView: View {
    @State private var count: Int = 0

    var body: some View {
        VStack {
            Text("\\(count)")          // wrappedValue
            Button("+") { count += 1 }
            // $countはBinding<Int>
            Stepper("値", value: $count, in: 0...10)
        }
    }
}

// コンパイラが内部的に展開するイメージ（擬似コード）
/*
struct CounterView: View {
    // バッキングストレージ
    private var _count: State<Int> = State(initialValue: 0)

    // wrappedValue: Intとして読み書き
    private var count: Int {
        get { _count.wrappedValue }
        nonmutating set { _count.wrappedValue = newValue }
    }

    // projectedValue: Binding<Int>として取り出す ($count)
    private var $count: Binding<Int> {
        _count.projectedValue
    }
}
*/

// 動作確認
print("@Stateの展開:")
print("count    → wrappedValue (Int)")
print("$count   → projectedValue (Binding<Int>)")
print("_count   → State<Int> インスタンス")`}
          expectedOutput={`@Stateの展開:
count    → wrappedValue (Int)
$count   → projectedValue (Binding<Int>)
_count   → State<Int> インスタンス`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Stateに似たWrapperを作る</h2>
        <p className="text-gray-400 mb-4">
          @Stateの仕組みを理解するため、簡易版の状態管理Wrapperを実装します。
        </p>
        <SwiftEditor
          defaultCode={`// @Stateを模倣した簡易Wrapper（説明用）
@propertyWrapper
class SimpleState<Value> {
    private var value: Value
    private var onChange: ((Value) -> Void)?

    var wrappedValue: Value {
        get { value }
        set {
            value = newValue
            onChange?(newValue)  // 変更をViewに通知（SwiftUIはもっと複雑）
        }
    }

    // projectedValueはBinding的な役割
    var projectedValue: SimpleBinding<Value> {
        SimpleBinding(
            get: { self.value },
            set: { self.value = $0; self.onChange?($0) }
        )
    }

    init(wrappedValue: Value) {
        self.value = wrappedValue
    }

    func setChangeHandler(_ handler: @escaping (Value) -> Void) {
        onChange = handler
    }
}

struct SimpleBinding<Value> {
    let get: () -> Value
    let set: (Value) -> Void

    var value: Value {
        get { get() }
        nonmutating set { set(newValue) }
    }
}

// 使用例
class ViewModel {
    @SimpleState var count: Int = 0
}

let vm = ViewModel()
vm._count.setChangeHandler { newValue in
    print("countが変更: \\(newValue)")
}

vm.count = 5    // onChange呼び出し
vm.count += 3   // onChange呼び出し
print("最終値:", vm.count)`}
          expectedOutput={`countが変更: 5
countが変更: 8
最終値: 8`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="state-wrapper" />
      </div>
      <LessonNav lessons={lessons} currentId="state-wrapper" basePath="/learn/property-wrappers" />
    </div>
  );
}
