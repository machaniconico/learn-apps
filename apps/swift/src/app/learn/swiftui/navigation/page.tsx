import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function NavigationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ナビゲーション</h1>
        <p className="text-gray-400">NavigationStackとNavigationLinkを使った画面遷移を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NavigationStackとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">NavigationStack</code>はiOS 16以降の画面遷移コンテナです。
          <code className="text-blue-300">NavigationLink</code>でタップ時に次の画面へ遷移します。
          <code className="text-blue-300">navigationTitle</code>でナビゲーションバーのタイトルを設定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">NavigationStack</code>: スタック型ナビゲーションのコンテナ</li>
          <li><code className="text-blue-300">NavigationLink</code>: タップで次の画面へ遷移</li>
          <li><code className="text-blue-300">.navigationTitle()</code>: ナビバーのタイトル設定</li>
          <li><code className="text-blue-300">.navigationDestination()</code>: 型ベースの遷移先指定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なNavigationStack</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">NavigationStack</code>でラップし、
          <code className="text-blue-300">NavigationLink</code>で遷移先を指定します。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct DetailView: View {
    let title: String
    let description: String

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(title)
                    .font(.largeTitle)
                    .fontWeight(.bold)

                Text(description)
                    .foregroundColor(.secondary)
                    .lineSpacing(4)

                Spacer()
            }
            .padding()
        }
        .navigationTitle(title)
        .navigationBarTitleDisplayMode(.large)
    }
}

struct ContentView: View {
    let items = [
        ("Swift基礎", "変数・定数・型の基本を学ぶ"),
        ("制御構文", "if・for・switch・guardを学ぶ"),
        ("関数", "funcキーワードと引数・戻り値を学ぶ"),
    ]

    var body: some View {
        NavigationStack {
            List(items, id: \\.0) { title, description in
                NavigationLink {
                    DetailView(title: title, description: description)
                } label: {
                    VStack(alignment: .leading) {
                        Text(title).font(.headline)
                        Text(description).font(.caption).foregroundColor(.secondary)
                    }
                }
            }
            .navigationTitle("Swift学習")
        }
    }
}`}
          expectedOutput={`// NavigationStackでリストを表示
// 各行をタップするとDetailViewに遷移
// 戻るボタンは自動的に表示される`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">navigationDestinationを使う</h2>
        <p className="text-gray-400 mb-4">
          iOS 16以降は<code className="text-blue-300">.navigationDestination(for:)</code>で
          型ベースの遷移先を宣言的に定義できます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct Article: Identifiable, Hashable {
    let id = UUID()
    let title: String
    let content: String
    let category: String
}

struct ArticleListView: View {
    let articles = [
        Article(title: "ARCとメモリ管理", content: "ARCはSwiftの自動メモリ管理システムです...", category: "メモリ管理"),
        Article(title: "@State入門", content: "@StateはView内の状態を管理します...", category: "SwiftUI"),
        Article(title: "プロトコルの基本", content: "プロトコルは型の契約を定義します...", category: "プロトコル"),
    ]

    var body: some View {
        NavigationStack {
            List(articles) { article in
                NavigationLink(value: article) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(article.title).font(.headline)
                        Text(article.category)
                            .font(.caption)
                            .foregroundColor(.blue)
                    }
                }
            }
            .navigationTitle("記事一覧")
            .navigationDestination(for: Article.self) { article in
                VStack(alignment: .leading, spacing: 16) {
                    Text(article.category)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .padding(.horizontal)
                    Text(article.content)
                        .padding(.horizontal)
                    Spacer()
                }
                .navigationTitle(article.title)
            }
        }
    }
}`}
          expectedOutput={`// .navigationDestination(for: Article.self)で
// Article型の値がNavigationLinkで渡されたときの
// 遷移先を一箇所にまとめて定義できる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="navigation" />
      </div>
      <LessonNav lessons={lessons} currentId="navigation" basePath="/learn/swiftui" />
    </div>
  );
}
