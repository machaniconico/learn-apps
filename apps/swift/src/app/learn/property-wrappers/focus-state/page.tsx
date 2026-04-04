import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function FocusStatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@FocusState</h1>
        <p className="text-gray-400">@FocusState でテキストフィールドのフォーカスをプログラムから制御し、キーボードを管理します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@FocusState とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">@FocusState</code> は SwiftUI でフォーカス状態をプログラムから
          読み書きするプロパティラッパーです。
          <code className="text-violet-300">.focused($isFocused)</code> モディファイアと組み合わせることで、
          任意のタイミングでキーボードを表示・非表示にしたり、
          複数フィールド間でフォーカスを移動したりできます。
          Bool または enum で状態を管理します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">@FocusState var isFocused: Bool</code> — Bool で単一フィールド管理</li>
          <li><code className="text-violet-300">@FocusState var field: Field?</code> — enum で複数フィールド管理</li>
          <li><code className="text-violet-300">.focused($isFocused)</code> — フィールドにバインド</li>
          <li><code className="text-violet-300">isFocused = false</code> でキーボードを閉じる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Bool で単一フィールドを制御</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct SearchBarView: View {
    @State private var searchText = ""
    @FocusState private var isSearchFocused: Bool

    var body: some View {
        VStack(spacing: 20) {
            HStack {
                TextField("検索...", text: $searchText)
                    .focused($isSearchFocused)
                    .padding(10)
                    .background(Color.gray.opacity(0.15))
                    .cornerRadius(10)

                if isSearchFocused {
                    Button("キャンセル") {
                        searchText = ""
                        isSearchFocused = false  // キーボードを閉じる
                    }
                    .transition(.move(edge: .trailing).combined(with: .opacity))
                }
            }
            .animation(.easeInOut(duration: 0.2), value: isSearchFocused)

            // プログラムからフォーカスを付与
            Button("検索フィールドにフォーカス") {
                isSearchFocused = true
            }
            .buttonStyle(.borderedProminent)

            Text("フォーカス状態: \\(isSearchFocused ? "ON" : "OFF")")
                .foregroundColor(.secondary)
        }
        .padding()
    }
}`}
          expectedOutput={`// ボタンタップでプログラムからキーボードを表示
// @FocusState isSearchFocused がtrue → フォーカスありアニメーション付きでキャンセルボタン表示
// キャンセルタップ → isSearchFocused = false でキーボードを閉じる`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: enum で複数フィールドのフォーカス制御</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct RegistrationFormView: View {
    enum Field: Hashable {
        case name, email, password, confirmPassword
    }

    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @FocusState private var focusedField: Field?

    var body: some View {
        VStack(spacing: 16) {
            TextField("氏名", text: $name)
                .focused($focusedField, equals: .name)
                .submitLabel(.next)
                .onSubmit { focusedField = .email }

            TextField("メールアドレス", text: $email)
                .focused($focusedField, equals: .email)
                .keyboardType(.emailAddress)
                .submitLabel(.next)
                .onSubmit { focusedField = .password }

            SecureField("パスワード", text: $password)
                .focused($focusedField, equals: .password)
                .submitLabel(.next)
                .onSubmit { focusedField = .confirmPassword }

            SecureField("パスワード確認", text: $confirmPassword)
                .focused($focusedField, equals: .confirmPassword)
                .submitLabel(.done)
                .onSubmit { focusedField = nil }
        }
        .textFieldStyle(.roundedBorder)
        .padding()
        .onAppear { focusedField = .name }  // 画面表示時に氏名フィールドにフォーカス
    }
}`}
          expectedOutput={`// 画面表示時: 氏名フィールドに自動フォーカス（キーボード表示）
// Returnキー(Next): 次のフィールドへ順番にフォーカス移動
// confirmPassword で Done → focusedField = nil でキーボードを閉じる`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: フォーカスによる UI 変化</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct FocusAnimatedField: View {
    @State private var text = ""
    @FocusState private var isFocused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // フォーカス状態に応じてラベルをアニメーション
            Text("メッセージ")
                .font(isFocused || !text.isEmpty ? .caption : .body)
                .foregroundColor(isFocused ? .violet : .secondary)
                .animation(.easeInOut(duration: 0.2), value: isFocused)

            ZStack(alignment: .leading) {
                if text.isEmpty && !isFocused {
                    Text("ここに入力してください")
                        .foregroundColor(.gray.opacity(0.5))
                }
                TextField("", text: $text)
                    .focused($isFocused)
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(isFocused ? Color.purple : Color.gray.opacity(0.3), lineWidth: isFocused ? 2 : 1)
            )

            if isFocused {
                Text("\\(text.count)/140 文字")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .transition(.opacity)
            }
        }
        .padding()
        .animation(.easeInOut(duration: 0.2), value: isFocused)
    }
}`}
          expectedOutput={`// フォーカス時: ボーダーが紫に変わり、文字数カウンターが表示される
// @FocusState isFocused を監視して UI をリアクティブに変化させる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="focus-state" />
      </div>
      <LessonNav lessons={lessons} currentId="focus-state" basePath="/learn/property-wrappers" />
    </div>
  );
}
