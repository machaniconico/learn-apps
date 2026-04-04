import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function ViewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Viewの基本</h1>
        <p className="text-gray-400">ViewプロトコルとbodyプロパティでUIを宣言的に定義する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SwiftUIのView</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwiftUIでは<code className="text-blue-300">View</code>プロトコルに準拠した構造体でUIを定義します。
          <code className="text-blue-300">body</code>プロパティに表示内容を記述し、状態が変わると自動的に再描画されます。
          UIKitのような命令型ではなく、「どう見えるべきか」を宣言的に記述するのがSwiftUIの特徴です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>structがViewプロトコルに準拠する</li>
          <li>bodyプロパティが必須（some View を返す）</li>
          <li>VStack / HStack / ZStack でレイアウトする</li>
          <li>Text・Image・Button などの組み込みViewを使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のView</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">struct ContentView: View</code>でViewを定義します。
          bodyの中に表示したいコンポーネントを並べます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .font(.largeTitle)
            .foregroundColor(.blue)
            .padding()
    }
}

// 複数のViewを含む場合
struct ProfileView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("田中太郎")
                .font(.title)
                .fontWeight(.bold)

            Text("iOS開発者")
                .font(.subheadline)
                .foregroundColor(.secondary)

            HStack {
                Image(systemName: "location.fill")
                    .foregroundColor(.blue)
                Text("東京")
            }
            .font(.caption)
        }
        .padding()
    }
}

#Preview {
    ProfileView()
}`}
          expectedOutput={`// ProfileViewの表示:
// 田中太郎（大見出し・太字）
// iOS開発者（小見出し・グレー）
// 📍 東京（小文字・青いピン）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レイアウトコンテナ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">VStack</code>・<code className="text-blue-300">HStack</code>・
          <code className="text-blue-300">ZStack</code>でViewを縦・横・重ねてレイアウトします。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct LayoutExampleView: View {
    var body: some View {
        VStack(spacing: 20) {

            // VStack: 縦に並べる
            VStack {
                Text("上")
                Text("下")
            }
            .padding()
            .background(Color.blue.opacity(0.1))
            .cornerRadius(8)

            // HStack: 横に並べる
            HStack(spacing: 16) {
                Text("左")
                Spacer()
                Text("右")
            }
            .padding()
            .background(Color.green.opacity(0.1))
            .cornerRadius(8)

            // ZStack: 重ねる
            ZStack {
                Circle()
                    .fill(Color.orange)
                    .frame(width: 80, height: 80)
                Text("前面")
                    .foregroundColor(.white)
                    .fontWeight(.bold)
            }
        }
        .padding()
    }
}`}
          expectedOutput={`// VStack: 縦方向レイアウト
// HStack: 横方向レイアウト（Spacerで左右に分離）
// ZStack: 重ね合わせ（円の上にテキスト）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムViewの作成</h2>
        <p className="text-gray-400 mb-4">
          Viewは自由に分割・再利用できます。小さなViewに分割するのがSwiftUIのベストプラクティスです。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// 再利用可能なカスタムView
struct StatBadge: View {
    let label: String
    let value: String
    let color: Color

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(color)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(color.opacity(0.1))
        .cornerRadius(10)
    }
}

struct DashboardView: View {
    var body: some View {
        HStack(spacing: 12) {
            StatBadge(label: "記事数", value: "42", color: .blue)
            StatBadge(label: "フォロワー", value: "1.2K", color: .green)
            StatBadge(label: "いいね", value: "8.5K", color: .pink)
        }
        .padding()
    }
}`}
          expectedOutput={`// カスタムViewStatBadgeを3回使い回している
// 記事数: 42（青）/ フォロワー: 1.2K（緑）/ いいね: 8.5K（ピンク）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="views" />
      </div>
      <LessonNav lessons={lessons} currentId="views" basePath="/learn/swiftui" />
    </div>
  );
}
