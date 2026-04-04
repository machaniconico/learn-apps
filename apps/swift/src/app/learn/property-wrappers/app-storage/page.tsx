import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function AppStoragePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@AppStorage</h1>
        <p className="text-gray-400">UserDefaultsをSwiftUIのViewと連携させる@AppStorageの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@AppStorageとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">@AppStorage</code>はUserDefaultsと連携するProperty Wrapperです。
          値を変更するとUserDefaultsに自動保存され、アプリを再起動しても値が保持されます。
          @Stateのように使えて、値が変わるとViewが再描画されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>UserDefaultsキーを文字列で指定する</li>
          <li>対応型: Bool・Int・Double・String・URL・Data</li>
          <li>値変更時にViewが自動再描画される</li>
          <li><code className="text-violet-300">AppGroup</code>でApp Extension間での共有も可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@AppStorageの基本</h2>
        <p className="text-gray-400 mb-4">
          @Stateと同じ感覚で使えますが、値がUserDefaultsに永続化されます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct OnboardingView: View {
    // UserDefaultsキー "hasCompletedOnboarding" に紐付け
    @AppStorage("hasCompletedOnboarding") var hasCompletedOnboarding = false
    @AppStorage("userName") var userName = ""
    @AppStorage("selectedColorScheme") var selectedColorScheme = "system"

    var body: some View {
        if hasCompletedOnboarding {
            // オンボーディング完了後の画面
            VStack(spacing: 16) {
                Text("おかえりなさい、\\(userName)さん！")
                    .font(.title2)

                Button("オンボーディングをリセット") {
                    hasCompletedOnboarding = false
                    userName = ""
                }
                .foregroundColor(.red)
            }
            .padding()
        } else {
            // 初回起動時のオンボーディング
            VStack(spacing: 20) {
                Text("ようこそ！")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                TextField("お名前を入力", text: $userName)
                    .textFieldStyle(.roundedBorder)
                    .padding(.horizontal)

                Button("はじめる") {
                    hasCompletedOnboarding = true
                }
                .buttonStyle(.borderedProminent)
                .disabled(userName.isEmpty)
            }
            .padding()
        }
    }
}`}
          expectedOutput={`// @AppStorageで保存された値はアプリ再起動後も保持される
// hasCompletedOnboardingがtrueになると画面が切り替わる
// UserDefaultsに自動保存されるためiCloud同期は別途設定が必要`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">設定画面での活用</h2>
        <p className="text-gray-400 mb-4">
          @AppStorageは設定画面で特に活用されます。
          Toggleやスライダーの値を直接UserDefaultsに保存できます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// キー名を一元管理する拡張
extension String {
    static let notificationsEnabled = "notificationsEnabled"
    static let fontSize = "fontSize"
    static let accentColor = "accentColor"
}

struct SettingsView: View {
    @AppStorage(.notificationsEnabled) var notificationsEnabled = true
    @AppStorage(.fontSize) var fontSize: Double = 14
    @AppStorage(.accentColor) var accentColor = "blue"

    let colors = ["blue", "green", "orange", "pink", "purple"]

    var body: some View {
        Form {
            Section("通知") {
                Toggle("プッシュ通知", isOn: $notificationsEnabled)
            }

            Section("表示") {
                VStack(alignment: .leading) {
                    Text("フォントサイズ: \\(Int(fontSize))pt")
                        .font(.system(size: fontSize))
                    Slider(value: $fontSize, in: 10...24, step: 1)
                }

                Picker("アクセントカラー", selection: $accentColor) {
                    ForEach(colors, id: \\.self) { color in
                        Text(color).tag(color)
                    }
                }
            }

            Section {
                Button("設定をリセット", role: .destructive) {
                    notificationsEnabled = true
                    fontSize = 14
                    accentColor = "blue"
                }
            }
        }
        .navigationTitle("設定")
    }
}`}
          expectedOutput={`// 設定画面でのAppStorage活用例
// 各設定値はアプリ再起動後も保持される
// Formコンポーネントと自然に統合できる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="app-storage" />
      </div>
      <LessonNav lessons={lessons} currentId="app-storage" basePath="/learn/property-wrappers" />
    </div>
  );
}
