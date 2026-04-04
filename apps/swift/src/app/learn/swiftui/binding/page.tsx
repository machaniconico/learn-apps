import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function BindingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@Binding</h1>
        <p className="text-gray-400">親子View間でデータを双方向バインディングする@Bindingの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@Bindingとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">@Binding</code>は子Viewが親Viewの@State値への参照を受け取り、
          読み書きできるようにするプロパティラッパーです。
          親の$プレフィックスで渡し、子はそれを@Bindingで受け取ります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>親: <code className="text-blue-300">@State private var value</code> → 子へ <code className="text-blue-300">$value</code> で渡す</li>
          <li>子: <code className="text-blue-300">@Binding var value</code> で受け取る</li>
          <li>子が変更すると親の@Stateも更新される（双方向）</li>
          <li>所有権は親にある（子はBindingを所有しない）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Bindingの基本</h2>
        <p className="text-gray-400 mb-4">
          親が@Stateを持ち、子へ$で渡します。子が変更すると親にも反映されます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// 子View: @Bindingで値を受け取る
struct ToggleCard: View {
    let title: String
    @Binding var isOn: Bool  // 親の@Stateへの参照

    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(title)
                    .font(.headline)
                Text(isOn ? "有効" : "無効")
                    .font(.caption)
                    .foregroundColor(isOn ? .green : .secondary)
            }
            Spacer()
            Toggle("", isOn: $isOn)  // $isOnでBindingを渡す
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(10)
    }
}

// 親View: @Stateを持つ
struct SettingsView: View {
    @State private var notificationsOn = true
    @State private var darkModeOn = false
    @State private var analyticsOn = true

    var body: some View {
        VStack(spacing: 12) {
            Text("設定")
                .font(.title2)
                .fontWeight(.bold)
                .frame(maxWidth: .infinity, alignment: .leading)

            ToggleCard(title: "通知", isOn: $notificationsOn)
            ToggleCard(title: "ダークモード", isOn: $darkModeOn)
            ToggleCard(title: "分析情報", isOn: $analyticsOn)
        }
        .padding()
    }
}`}
          expectedOutput={`// 子ToggleCardがトグルを変更すると
// 親SettingsViewの@State変数が更新される
// @Bindingにより双方向データフローが実現する`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム入力コンポーネント</h2>
        <p className="text-gray-400 mb-4">
          @Bindingを使ってTextFieldをラップしたカスタムコンポーネントを作ります。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct LabeledTextField: View {
    let label: String
    let placeholder: String
    @Binding var text: String
    var isValid: Bool = true

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)

            TextField(placeholder, text: $text)
                .padding(10)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(isValid ? Color.clear : Color.red, lineWidth: 1)
                )

            if !isValid {
                Text("必須項目です")
                    .font(.caption2)
                    .foregroundColor(.red)
            }
        }
    }
}

struct SignupView: View {
    @State private var name = ""
    @State private var email = ""
    @State private var submitted = false

    var isNameValid: Bool { submitted ? !name.isEmpty : true }
    var isEmailValid: Bool { submitted ? !email.isEmpty : true }

    var body: some View {
        VStack(spacing: 16) {
            LabeledTextField(
                label: "名前",
                placeholder: "田中太郎",
                text: $name,
                isValid: isNameValid
            )

            LabeledTextField(
                label: "メールアドレス",
                placeholder: "tanaka@example.com",
                text: $email,
                isValid: isEmailValid
            )

            Button("登録") { submitted = true }
                .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}`}
          expectedOutput={`// @Bindingを使ってカスタムTextFieldを作成
// 親SignupViewの@State nameとemailを
// 子LabeledTextFieldが読み書きできる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="binding" />
      </div>
      <LessonNav lessons={lessons} currentId="binding" basePath="/learn/swiftui" />
    </div>
  );
}
