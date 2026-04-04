import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function MVVMPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">MVVM</h1>
        <p className="text-gray-400">Model-View-ViewModelアーキテクチャの設計と実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">MVVMとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">MVVM（Model-View-ViewModel）</code>はUIとビジネスロジックを分離するアーキテクチャです。
          SwiftUIと@Observableを組み合わせると非常に相性が良いパターンです。
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-3 bg-gray-800 rounded-lg border border-purple-500/30">
            <p className="text-purple-400 font-semibold mb-1">Model</p>
            <p className="text-gray-400 text-xs">データの定義・ビジネスルール・APIやDBとのやり取り</p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg border border-blue-500/30">
            <p className="text-blue-400 font-semibold mb-1">View</p>
            <p className="text-gray-400 text-xs">UIの表示のみ担当。ViewModelのデータを表示する</p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg border border-green-500/30">
            <p className="text-green-400 font-semibold mb-1">ViewModel</p>
            <p className="text-gray-400 text-xs">ModelとViewの橋渡し。UIロジックとデータ変換を担当</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MVVMの実装例</h2>
        <p className="text-gray-400 mb-4">
          商品一覧画面をMVVMで実装します。各層の責務を明確に分離します。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

// === Model ===
struct Product: Identifiable, Codable {
    let id: Int
    let name: String
    let price: Int
    let category: String
    var isFavorite: Bool = false
}

// データアクセス層（Repository）
class ProductRepository {
    func fetchProducts() async -> [Product] {
        // 実際はAPIを呼ぶ
        return [
            Product(id: 1, name: "iPhone 15", price: 124800, category: "スマートフォン"),
            Product(id: 2, name: "iPad Air", price: 98800, category: "タブレット"),
            Product(id: 3, name: "MacBook Pro", price: 248800, category: "PC"),
            Product(id: 4, name: "Apple Watch", price: 59800, category: "ウェアラブル"),
        ]
    }
}

// === ViewModel ===
@Observable
class ProductListViewModel {
    private let repository: ProductRepository

    var products: [Product] = []
    var isLoading = false
    var errorMessage: String?
    var searchText = ""
    var selectedCategory: String?

    // 計算プロパティ（Modelのデータを加工してViewに提供）
    var filteredProducts: [Product] {
        var result = products
        if !searchText.isEmpty {
            result = result.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
        }
        if let category = selectedCategory {
            result = result.filter { $0.category == category }
        }
        return result
    }

    var categories: [String] {
        Array(Set(products.map { $0.category })).sorted()
    }

    var favoriteCount: Int {
        products.filter { $0.isFavorite }.count
    }

    init(repository: ProductRepository = ProductRepository()) {
        self.repository = repository
    }

    // ユーザーアクション
    func loadProducts() async {
        isLoading = true
        defer { isLoading = false }
        products = await repository.fetchProducts()
        print("読み込み完了: \\(products.count)件")
    }

    func toggleFavorite(productId: Int) {
        if let index = products.firstIndex(where: { $0.id == productId }) {
            products[index].isFavorite.toggle()
        }
    }

    func formattedPrice(_ price: Int) -> String {
        "¥\\(price.formatted())"
    }
}

// 動作確認
Task {
    let vm = ProductListViewModel()
    await vm.loadProducts()
    print("全商品:", vm.products.map { $0.name })
    print("カテゴリ:", vm.categories)
    vm.toggleFavorite(productId: 1)
    print("お気に入り数:", vm.favoriteCount)
}`}
          expectedOutput={`読み込み完了: 4件
全商品: ["iPhone 15", "iPad Air", "MacBook Pro", "Apple Watch"]
カテゴリ: ["PC", "スマートフォン", "タブレット", "ウェアラブル"]
お気に入り数: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ViewとViewModelの接続</h2>
        <p className="text-gray-400 mb-4">
          SwiftUIのViewはViewModelのデータを表示するだけで、ロジックは持ちません。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// === View ===（表示のみ、ロジックなし）
struct ProductListView: View {
    @State private var viewModel = ProductListViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading {
                    ProgressView("読み込み中...")
                } else {
                    List(viewModel.filteredProducts) { product in
                        HStack {
                            VStack(alignment: .leading) {
                                Text(product.name).font(.headline)
                                Text(product.category).font(.caption).foregroundColor(.secondary)
                            }
                            Spacer()
                            Text(viewModel.formattedPrice(product.price))
                                .font(.subheadline)
                                .foregroundColor(.blue)
                            Button {
                                viewModel.toggleFavorite(productId: product.id)
                            } label: {
                                Image(systemName: product.isFavorite ? "heart.fill" : "heart")
                                    .foregroundColor(product.isFavorite ? .red : .gray)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
            }
            .navigationTitle("商品一覧 (❤️ \\(viewModel.favoriteCount))")
            .searchable(text: $viewModel.searchText)
            .task { await viewModel.loadProducts() }
        }
    }
}

print("ViewはViewModelを@Stateで保持する")
print("Viewはデータの表示とユーザーアクションのみを担当")
print("ビジネスロジックはViewModelに集約される")`}
          expectedOutput={`ViewはViewModelを@Stateで保持する
Viewはデータの表示とユーザーアクションのみを担当
ビジネスロジックはViewModelに集約される`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="mvvm" />
      </div>
      <LessonNav lessons={lessons} currentId="mvvm" basePath="/learn/patterns" />
    </div>
  );
}
