import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function ObservablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@Observable</h1>
        <p className="text-gray-400">@Observableマクロと@Bindableを使ったSwift 5.9以降の状態管理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@Observableとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.9 / iOS 17から導入された<code className="text-blue-300">@Observable</code>マクロは、
          クラスの変更を自動追跡します。以前の<code className="text-blue-300">ObservableObject / @Published</code>より
          シンプルに書けます。<code className="text-blue-300">@Bindable</code>でBinding値を取り出せます。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-400 font-semibold mb-2">旧: ObservableObject</p>
            <pre className="text-gray-500 text-xs font-mono">{`class Model: ObservableObject {
  @Published var count = 0
}
// Viewで: @StateObject var m`}</pre>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg border border-blue-500/30">
            <p className="text-blue-400 font-semibold mb-2">新: @Observable</p>
            <pre className="text-blue-300 text-xs font-mono">{`@Observable
class Model {
  var count = 0
}
// Viewで: @State var m`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Observableの基本</h2>
        <p className="text-gray-400 mb-4">
          クラスに<code className="text-blue-300">@Observable</code>を付けるだけで、
          プロパティの変更がViewに自動的に通知されます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

@Observable
class ShoppingCart {
    var items: [String] = []
    var discount: Double = 0

    var total: Int {
        let base = items.count * 500
        return Int(Double(base) * (1 - discount))
    }

    func addItem(_ item: String) {
        items.append(item)
    }

    func removeItem(at index: Int) {
        items.remove(at: index)
    }

    func applyDiscount(_ rate: Double) {
        discount = rate
    }
}

struct CartView: View {
    @State private var cart = ShoppingCart()

    var body: some View {
        VStack(spacing: 16) {
            Text("カート (\\(cart.items.count)点)")
                .font(.headline)

            ForEach(cart.items, id: \\.self) { item in
                HStack {
                    Text(item)
                    Spacer()
                    Text("¥500")
                        .foregroundColor(.secondary)
                }
                .padding(.horizontal)
            }

            Divider()

            HStack {
                Text("合計")
                    .fontWeight(.bold)
                Spacer()
                Text("¥\\(cart.total)")
                    .fontWeight(.bold)
                    .foregroundColor(.blue)
            }
            .padding(.horizontal)

            HStack(spacing: 12) {
                Button("追加") { cart.addItem("商品\\(cart.items.count + 1)") }
                    .buttonStyle(.bordered)
                Button("10%OFF") { cart.applyDiscount(0.1) }
                    .buttonStyle(.bordered)
            }
        }
        .padding()
    }
}`}
          expectedOutput={`// @Observableクラスのプロパティが変更されるたびに
// Viewが自動的に再描画される
// @Publishedは不要でシンプルに書ける`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Bindableでバインディング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">@Bindable</code>を使うと@ObservableクラスのプロパティへのBindingを取り出せます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

@Observable
class UserSettings {
    var name: String = "田中"
    var notificationsEnabled: Bool = true
    var fontSize: Double = 14
}

// 子View: @Bindableでバインディングを取り出す
struct SettingsFormView: View {
    @Bindable var settings: UserSettings

    var body: some View {
        Form {
            Section("プロフィール") {
                TextField("名前", text: $settings.name)
            }

            Section("通知") {
                Toggle("通知を受け取る", isOn: $settings.notificationsEnabled)
            }

            Section("表示") {
                Slider(value: $settings.fontSize, in: 10...24, step: 1) {
                    Text("フォントサイズ: \\(Int(settings.fontSize))")
                }
            }
        }
    }
}

// 親View
struct ParentView: View {
    @State private var settings = UserSettings()

    var body: some View {
        VStack {
            Text("名前: \\(settings.name), フォント: \\(Int(settings.fontSize))pt")
                .padding()
            SettingsFormView(settings: settings)
        }
    }
}`}
          expectedOutput={`// @BindableでObservableオブジェクトの
// プロパティへの$bindingを作れる
// TextField・Toggle・Sliderと直接接続できる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="observable" />
      </div>
      <LessonNav lessons={lessons} currentId="observable" basePath="/learn/swiftui" />
    </div>
  );
}
