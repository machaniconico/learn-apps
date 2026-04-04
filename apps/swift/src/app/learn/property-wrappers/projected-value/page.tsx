import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function ProjectedValuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">projectedValue</h1>
        <p className="text-gray-400">$ プレフィックスで射影値にアクセスし、Property Wrapper の高度な機能を活用します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">projectedValue とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">projectedValue</code> は Property Wrapper が
          <code className="text-violet-300">$</code> プレフィックスを通じて公開する追加の値です。
          <code className="text-violet-300">wrappedValue</code> が主要な値を提供するのに対し、
          projectedValue はメタ情報・バインディング・パブリッシャーなど
          ラッパーに応じた別の型を返せます。
          SwiftUI の <code className="text-violet-300">@State</code> では <code className="text-violet-300">$state</code> が
          <code className="text-violet-300">Binding</code> を返すのも projectedValue の仕組みです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">var projectedValue: SomeType</code> — 任意の型を返せる</li>
          <li><code className="text-violet-300">$propertyName</code> — projectedValue へのアクセス構文</li>
          <li><code className="text-violet-300">@State</code> の <code className="text-violet-300">$</code> は <code className="text-violet-300">Binding{"<T>"}</code> を返す</li>
          <li><code className="text-violet-300">@Published</code> の <code className="text-violet-300">$</code> は <code className="text-violet-300">Publisher</code> を返す</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: カスタム projectedValue の実装</h2>
        <SwiftEditor
          defaultCode={`// projectedValue で検証状態を公開するラッパー
@propertyWrapper
struct Validated {
    private var value: String

    var wrappedValue: String {
        get { value }
        set { value = newValue }
    }

    // $記法で ValidationResult を返す
    var projectedValue: ValidationResult {
        ValidationResult(value: value)
    }

    init(wrappedValue: String) {
        self.value = wrappedValue
    }
}

struct ValidationResult {
    let value: String
    var isValid: Bool { !value.isEmpty && value.count >= 2 }
    var errorMessage: String? {
        if value.isEmpty { return "必須項目です" }
        if value.count < 2 { return "2文字以上で入力してください" }
        return nil
    }
}

struct UserProfile {
    @Validated var name: String = ""
    @Validated var nickname: String = "A"
}

var profile = UserProfile()

// wrappedValue: 通常の値アクセス
print("名前:", profile.name)

// projectedValue: $記法で検証結果にアクセス
print("名前の検証:", profile.$name.isValid, "-", profile.$name.errorMessage ?? "OK")
print("ニックネームの検証:", profile.$nickname.isValid, "-", profile.$nickname.errorMessage ?? "OK")

profile.name = "田中太郎"
print("更新後 名前の検証:", profile.$name.isValid)`}
          expectedOutput={`名前:
名前の検証: false - 必須項目です
ニックネームの検証: false - 2文字以上で入力してください
更新後 名前の検証: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: @State と @Binding の関係（projectedValue）</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

// @State の projectedValue が Binding を返す仕組みを理解する
struct ParentView: View {
    @State private var count = 0        // wrappedValue: Int
    // $count は projectedValue → Binding<Int> を返す

    var body: some View {
        VStack(spacing: 20) {
            Text("カウント: \\(count)")
                .font(.largeTitle.bold())

            // $count (Binding<Int>) を子 View に渡す
            CounterControl(count: $count)

            Button("親からリセット") {
                count = 0  // wrappedValue に直接代入
            }
            .buttonStyle(.bordered)
        }
        .padding()
    }
}

struct CounterControl: View {
    @Binding var count: Int  // Binding<Int> を受け取る

    var body: some View {
        HStack(spacing: 16) {
            Button("-") { count -= 1 }
                .buttonStyle(.borderedProminent)
                .tint(.red)

            Button("+") { count += 1 }
                .buttonStyle(.borderedProminent)
                .tint(.green)
        }
    }
}`}
          expectedOutput={`// @State count の wrappedValue: Int (直接アクセス)
// @State count の projectedValue: Binding<Int> ($count でアクセス)
// 子 View に $count を渡すことで親の状態を双方向に操作できる`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: projectedValue で Publisher を返す</h2>
        <SwiftEditor
          defaultCode={`import Foundation
import Combine

// @Published の projectedValue は AnyPublisher を返す
class UserSettings: ObservableObject {
    @Published var username: String = ""
    // $username は Publisher<String, Never> を返す

    @Published var score: Int = 0
    // $score は Publisher<Int, Never> を返す

    private var cancellables = Set<AnyCancellable>()

    init() {
        // $username (projectedValue) をサブスクライブ
        $username
            .filter { !$0.isEmpty }
            .map { "こんにちは、\\($0)！" }
            .sink { print($0) }
            .store(in: &cancellables)

        // $score の変化を監視
        $score
            .filter { $0 > 0 && $0 % 100 == 0 }
            .sink { print("マイルストーン達成: \\($0)点") }
            .store(in: &cancellables)
    }
}

let settings = UserSettings()
settings.username = "山田"
settings.username = "田中"
settings.score = 100
settings.score = 150
settings.score = 200`}
          expectedOutput={`こんにちは、山田！
こんにちは、田中！
マイルストーン達成: 100点
マイルストーン達成: 200点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="projected-value" />
      </div>
      <LessonNav lessons={lessons} currentId="projected-value" basePath="/learn/property-wrappers" />
    </div>
  );
}
