import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "swiftui")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "SwiftUIでViewを定義するために準拠するプロトコルは？",
    options: ["UIView", "View", "SwiftView", "Component"],
    answer: 1,
    explanation: "SwiftUIではViewプロトコルに準拠し、bodyプロパティでUIを定義します。",
  },
  {
    question: "@Stateプロパティラッパーの用途は？",
    options: ["ネットワーク通信", "ローカルな状態管理", "永続化", "親からの値受け取り"],
    answer: 1,
    explanation: "@StateはView内のローカルな状態を管理し、値が変わると自動的にViewが再描画されます。",
  },
  {
    question: "縦方向にビューを並べるコンテナは？",
    options: ["HStack", "ZStack", "VStack", "GroupBox"],
    answer: 2,
    explanation: "VStackは子Viewを縦方向（垂直）に並べるコンテナです。",
  },
  {
    question: "@Bindingの役割は？",
    options: ["データを永続化する", "子Viewが親の状態を読み書きできるようにする", "非同期処理を管理する", "ネットワーク接続する"],
    answer: 1,
    explanation: "@Bindingは子Viewが親ViewのState値への参照を受け取り、双方向で読み書きできるようにします。",
  },
];

export default function SwiftUIPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">{category.name}</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-gray-500 text-sm">{category.lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          SwiftUIはAppleの宣言的UIフレームワークです。Viewプロトコル、レイアウトコンテナ、
          モディファイア、@State/@Binding/@Observableによる状態管理、
          NavigationStackとList/ForEachを使ったナビゲーションを学びましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="swiftui" totalLessons={category.lessons.length} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{category.lessons.length}レッスン</h2>
        <LessonList lessons={category.lessons} basePath="/learn/swiftui" color="blue" categoryId="swiftui" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のSwiftUI View</h2>
        <p className="text-gray-400 mb-4">
          SwiftUIでは<code className="text-blue-300">View</code>プロトコルに準拠した構造体を定義します。
          <code className="text-blue-300">body</code>プロパティでUIを宣言的に記述します。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("SwiftUI入門")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundColor(.blue)

            Text("宣言的UIフレームワーク")
                .font(.subheadline)
                .foregroundColor(.secondary)

            HStack(spacing: 12) {
                Image(systemName: "swift")
                    .foregroundColor(.orange)
                Text("Hello, SwiftUI!")
            }
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(8)
        }
        .padding()
    }
}

// プレビュー
#Preview {
    ContentView()
}`}
          expectedOutput={`// Xcodeのプレビューでリアルタイムに確認できます
// VStack内に:
// - 「SwiftUI入門」大見出し（青色）
// - 「宣言的UIフレームワーク」小見出し
// - Swiftアイコン + "Hello, SwiftUI!" テキスト`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Stateによる状態管理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">@State</code>でローカル状態を管理します。
          値が変わると自動的にViewが再描画されます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("カウント: \\(count)")
                .font(.title)

            HStack(spacing: 16) {
                Button("減らす") {
                    count -= 1
                }
                .buttonStyle(.bordered)

                Button("増やす") {
                    count += 1
                }
                .buttonStyle(.borderedProminent)
            }

            if count > 0 {
                Text("正の値です").foregroundColor(.green)
            } else if count < 0 {
                Text("負の値です").foregroundColor(.red)
            } else {
                Text("ゼロです").foregroundColor(.secondary)
            }
        }
        .padding()
    }
}`}
          expectedOutput={`// ボタンをタップするたびにcountが変化し
// Viewが自動的に再描画されます
// @Stateはその値を保持し続けます`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
