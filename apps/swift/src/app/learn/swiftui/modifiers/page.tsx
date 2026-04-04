import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function ModifiersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モディファイア</h1>
        <p className="text-gray-400">.padding()・.font()・.foregroundColor()などのViewモディファイアの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">モディファイアとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">モディファイア</code>はViewに変換を適用するメソッドです。
          チェーン（連鎖）で書くことができ、適用順序が重要です。
          各モディファイアは新しいViewを返すため、元のViewは変更されません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">.font()</code> - フォントサイズ・スタイルの設定</li>
          <li><code className="text-blue-300">.foregroundColor()</code> - テキスト・アイコンの色</li>
          <li><code className="text-blue-300">.padding()</code> - 内側の余白</li>
          <li><code className="text-blue-300">.background()</code> - 背景色・背景View</li>
          <li><code className="text-blue-300">.cornerRadius()</code> - 角丸</li>
          <li><code className="text-blue-300">.frame()</code> - サイズ指定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テキストモディファイア</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">Text</code>に様々なモディファイアを適用してスタイリングします。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct TextStylesView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("largeTitle")
                .font(.largeTitle)

            Text("title - bold")
                .font(.title)
                .fontWeight(.bold)

            Text("headline - blue")
                .font(.headline)
                .foregroundColor(.blue)

            Text("body - italic")
                .font(.body)
                .italic()

            Text("caption - gray")
                .font(.caption)
                .foregroundColor(.gray)

            Text("strikethrough")
                .strikethrough()

            Text("underline")
                .underline(color: .red)

            Text("tracking spacing")
                .tracking(4)
        }
        .padding()
    }
}`}
          expectedOutput={`// 各テキストスタイルが適用された一覧が表示される
// フォントサイズ・色・太さ・装飾のバリエーション`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レイアウトモディファイア</h2>
        <p className="text-gray-400 mb-4">
          padding・frame・backgroundなどでレイアウトとスタイルを調整します。
          モディファイアの適用順序が結果に影響します。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct LayoutModifiersView: View {
    var body: some View {
        VStack(spacing: 20) {

            // padding → background の順（paddingに背景色がつく）
            Text("padding → background")
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)

            // background → padding の順（テキストにだけ背景色）
            Text("background → padding")
                .background(Color.green)
                .padding()

            // frame でサイズ指定
            Text("frame指定")
                .frame(width: 200, height: 50)
                .background(Color.orange.opacity(0.3))

            // cornerRadius で角丸
            Text("角丸ボタン風")
                .padding(.horizontal, 20)
                .padding(.vertical, 10)
                .background(Color.purple)
                .foregroundColor(.white)
                .cornerRadius(20)
        }
        .padding()
    }
}`}
          expectedOutput={`// モディファイアの順序によって見た目が変わることを確認
// padding→background: 余白部分まで色がつく
// background→padding: テキスト部分のみ色がつく`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムモディファイア</h2>
        <p className="text-gray-400 mb-4">
          よく使うモディファイアの組み合わせは<code className="text-blue-300">ViewModifier</code>プロトコルで
          カスタムモディファイアとして定義できます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// カスタムモディファイア
struct CardStyle: ViewModifier {
    var color: Color = .blue

    func body(content: Content) -> some View {
        content
            .padding()
            .background(color.opacity(0.1))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(color.opacity(0.3), lineWidth: 1)
            )
            .cornerRadius(12)
    }
}

extension View {
    func cardStyle(color: Color = .blue) -> some View {
        modifier(CardStyle(color: color))
    }
}

struct CustomModifierView: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("青いカード")
                .cardStyle(color: .blue)

            Text("緑のカード")
                .cardStyle(color: .green)

            Text("赤のカード")
                .cardStyle(color: .red)
        }
        .padding()
    }
}`}
          expectedOutput={`// カスタムモディファイアを使うと
// .cardStyle(color: .blue) のように簡潔に書ける
// 共通スタイルの一元管理が可能になる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="modifiers" />
      </div>
      <LessonNav lessons={lessons} currentId="modifiers" basePath="/learn/swiftui" />
    </div>
  );
}
