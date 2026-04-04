import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function StatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@State</h1>
        <p className="text-gray-400">@Stateプロパティラッパーを使ってViewのローカル状態を管理する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@Stateとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">@State</code>はView内のローカルな状態を管理するプロパティラッパーです。
          値が変わると、そのViewとサブViewが自動的に再描画されます。
          @StateはSwiftUIが値を管理するため、structでも状態を変更できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>View内でのみ使用（privateが推奨）</li>
          <li>値が変わると関連するViewが自動再描画</li>
          <li>structでもmutableな状態を持てる</li>
          <li>Bool・Int・String などシンプルな型に向いている</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カウンターアプリ</h2>
        <p className="text-gray-400 mb-4">
          最もシンプルな@Stateの例です。ボタンをタップするたびにカウントが変わり、Viewが更新されます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 24) {
            Text("\\(count)")
                .font(.system(size: 80, weight: .bold, design: .rounded))
                .foregroundColor(count >= 0 ? .blue : .red)
                .animation(.spring(), value: count)

            HStack(spacing: 20) {
                Button {
                    count -= 1
                } label: {
                    Image(systemName: "minus.circle.fill")
                        .font(.largeTitle)
                        .foregroundColor(.red)
                }

                Button {
                    count = 0
                } label: {
                    Text("リセット")
                        .font(.callout)
                        .foregroundColor(.secondary)
                }

                Button {
                    count += 1
                } label: {
                    Image(systemName: "plus.circle.fill")
                        .font(.largeTitle)
                        .foregroundColor(.green)
                }
            }
        }
        .padding()
    }
}`}
          expectedOutput={`// ボタンをタップするたびに@State countが変更され
// countの表示が自動的に更新される
// 正の値は青、負の値は赤で表示される`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@StateでBool管理</h2>
        <p className="text-gray-400 mb-4">
          トグルやシートの表示状態など、Bool値の管理によく使われます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct ToggleExampleView: View {
    @State private var isExpanded = false
    @State private var isDarkMode = false
    @State private var showAlert = false

    var body: some View {
        VStack(spacing: 16) {
            // トグルスイッチ
            Toggle("ダークモード", isOn: $isDarkMode)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)

            // 展開/折りたたみ
            Button {
                withAnimation {
                    isExpanded.toggle()
                }
            } label: {
                HStack {
                    Text("詳細を見る")
                    Spacer()
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                }
                .padding()
                .background(Color.blue.opacity(0.1))
                .cornerRadius(8)
            }

            if isExpanded {
                Text("展開されたコンテンツです。isExpandedがtrueの時のみ表示されます。")
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(8)
                    .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .padding()
        .preferredColorScheme(isDarkMode ? .dark : .light)
    }
}`}
          expectedOutput={`// Toggle: isDarkModeを切り替える
// Button: isExpandedをトグルしてコンテンツの表示/非表示を切り替え
// withAnimation{}でアニメーション付きの状態変化`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@StateでString管理（TextField）</h2>
        <p className="text-gray-400 mb-4">
          TextFieldと@Stateを組み合わせてテキスト入力を管理します。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct LoginFormView: View {
    @State private var username = ""
    @State private var password = ""
    @State private var isLoggedIn = false

    var isFormValid: Bool {
        !username.isEmpty && password.count >= 6
    }

    var body: some View {
        VStack(spacing: 16) {
            if isLoggedIn {
                VStack {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.largeTitle)
                        .foregroundColor(.green)
                    Text("ようこそ、\\(username)さん！")
                        .font(.headline)
                }
            } else {
                TextField("ユーザー名", text: $username)
                    .textFieldStyle(.roundedBorder)

                SecureField("パスワード（6文字以上）", text: $password)
                    .textFieldStyle(.roundedBorder)

                Button("ログイン") {
                    isLoggedIn = true
                }
                .buttonStyle(.borderedProminent)
                .disabled(!isFormValid)
            }
        }
        .padding()
    }
}`}
          expectedOutput={`// TextFieldに入力するたびに@State usernameが更新される
// isFormValidが自動的に再計算されてボタンの有効/無効が切り替わる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="state" />
      </div>
      <LessonNav lessons={lessons} currentId="state" basePath="/learn/swiftui" />
    </div>
  );
}
