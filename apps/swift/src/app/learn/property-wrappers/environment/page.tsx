import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function EnvironmentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@Environment</h1>
        <p className="text-gray-400">SwiftUIの環境値にアクセスし伝播させる@Environmentの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@Environmentとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">@Environment</code>はSwiftUIの環境値にアクセスするProperty Wrapperです。
          カラースキーム・フォントサイズ・ロケールなどのシステム値や、
          カスタムの環境値をView階層全体に伝播させることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">@Environment(\\.colorScheme)</code>でダーク/ライトモード取得</li>
          <li><code className="text-violet-300">@Environment(\\.dismiss)</code>で画面を閉じるアクション</li>
          <li><code className="text-violet-300">EnvironmentKey</code>でカスタム環境値を定義</li>
          <li><code className="text-violet-300">.environment()</code>モディファイアで値を注入</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">システム環境値の読み取り</h2>
        <p className="text-gray-400 mb-4">
          システムが提供する環境値を@Environmentで読み取ります。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct AdaptiveView: View {
    @Environment(\\.colorScheme) var colorScheme
    @Environment(\\.dynamicTypeSize) var dynamicTypeSize
    @Environment(\\.locale) var locale

    var body: some View {
        VStack(spacing: 16) {
            // カラースキームに応じた表示
            HStack {
                Image(systemName: colorScheme == .dark ? "moon.fill" : "sun.max.fill")
                    .foregroundColor(colorScheme == .dark ? .yellow : .orange)
                Text(colorScheme == .dark ? "ダークモード" : "ライトモード")
            }
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(10)

            // ロケール情報
            VStack(alignment: .leading) {
                Text("言語コード: \\(locale.language.languageCode?.identifier ?? "不明")")
                Text("地域コード: \\(locale.region?.identifier ?? "不明")")
            }
            .font(.caption)
            .foregroundColor(.secondary)
        }
        .padding()
    }
}`}
          expectedOutput={`// @Environmentでシステムの環境値を読み取り
// colorSchemeに応じてUIを切り替え
// localeで言語・地域コードを取得`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム環境値の定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">EnvironmentKey</code>を実装してカスタム環境値を作ります。
          アプリのテーマや設定をView階層全体に伝播させるのに便利です。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// カスタム環境値の定義
struct AppThemeKey: EnvironmentKey {
    static let defaultValue: AppTheme = .default
}

enum AppTheme {
    case \`default\`, ocean, forest, sunset

    var primaryColor: Color {
        switch self {
        case .default: return .blue
        case .ocean: return .cyan
        case .forest: return .green
        case .sunset: return .orange
        }
    }

    var name: String {
        switch self {
        case .default: return "デフォルト"
        case .ocean: return "オーシャン"
        case .forest: return "フォレスト"
        case .sunset: return "サンセット"
        }
    }
}

extension EnvironmentValues {
    var appTheme: AppTheme {
        get { self[AppThemeKey.self] }
        set { self[AppThemeKey.self] = newValue }
    }
}

// 子Viewで環境値を使う
struct ThemedButton: View {
    @Environment(\\.appTheme) var theme
    let title: String
    let action: () -> Void

    var body: some View {
        Button(title, action: action)
            .buttonStyle(.borderedProminent)
            .tint(theme.primaryColor)
    }
}

// 親Viewで環境値を設定
struct ContentView: View {
    var body: some View {
        VStack(spacing: 12) {
            ThemedButton(title: "デフォルト") {}
                .environment(\\.appTheme, .default)

            ThemedButton(title: "オーシャン") {}
                .environment(\\.appTheme, .ocean)

            ThemedButton(title: "フォレスト") {}
                .environment(\\.appTheme, .forest)
        }
        .padding()
    }
}`}
          expectedOutput={`// カスタム環境値AppThemeをEnvironmentKeyで定義
// .environment(\\.appTheme, .ocean)で子Viewへ注入
// 子ViewはEnvironmentで値を受け取り使用する`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="environment" />
      </div>
      <LessonNav lessons={lessons} currentId="environment" basePath="/learn/property-wrappers" />
    </div>
  );
}
