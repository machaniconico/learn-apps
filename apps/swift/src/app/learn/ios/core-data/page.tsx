import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function CoreDataPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">iOS開発基礎</span>
        <h1 className="text-3xl font-bold text-gray-100">Core Data</h1>
        <p className="text-gray-400">Core Data スタックと NSManagedObject の基本を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Core Data は Apple のオブジェクトグラフ管理・永続化フレームワークです。
          SQLite をバックエンドとして使い、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">NSManagedObject</code> でエンティティを操作します。
          iOS 15からは SwiftData（マクロベース）も利用できます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import CoreData

// Core Data スタックの構築
class PersistenceController {
    static let shared = PersistenceController()

    let container: NSPersistentContainer

    init() {
        container = NSPersistentContainer(name: "MyApp")
        container.loadPersistentStores { description, error in
            if let error = error {
                fatalError("Core Data failed to load: \\(error)")
            }
        }
        container.viewContext.automaticallyMergesChangesFromParent = true
    }

    var viewContext: NSManagedObjectContext {
        container.viewContext
    }

    // バックグラウンドコンテキストでの保存
    func newBackgroundContext() -> NSManagedObjectContext {
        container.newBackgroundContext()
    }
}

// NSManagedObject サブクラス (Xcode で自動生成)
// .xcdatamodeld で Entity "Item" を定義
// @objc(Item)
// public class Item: NSManagedObject {
//     @NSManaged public var title: String?
//     @NSManaged public var createdAt: Date?
//     @NSManaged public var isCompleted: Bool
// }

print("PersistenceController initialized")`}
        height="320px"
        expectedOutput="PersistenceController initialized"
      />

      <SwiftEditor
        defaultCode={`import CoreData

// CRUD 操作の例
class ItemRepository {

    private let context: NSManagedObjectContext

    init(context: NSManagedObjectContext) {
        self.context = context
    }

    // Create
    func createItem(title: String) {
        // NSEntityDescription.insertNewObject を使ってエンティティを作成
        // let item = Item(context: context)
        // item.title = title
        // item.createdAt = Date()
        // item.isCompleted = false
        // saveContext()
        print("Created: \\(title)")
    }

    // Read (NSFetchRequest)
    func fetchAllItems() -> [String] {
        // let request: NSFetchRequest<Item> = Item.fetchRequest()
        // request.sortDescriptors = [NSSortDescriptor(key: "createdAt", ascending: false)]
        // do {
        //     return try context.fetch(request)
        // } catch {
        //     print("Fetch error: \\(error)")
        //     return []
        // }
        return ["Item A", "Item B", "Item C"]
    }

    // Update
    func toggleComplete(title: String) {
        // item.isCompleted.toggle()
        // saveContext()
        print("Toggled: \\(title)")
    }

    // Delete
    func deleteItem(title: String) {
        // context.delete(item)
        // saveContext()
        print("Deleted: \\(title)")
    }

    private func saveContext() {
        guard context.hasChanges else { return }
        do {
            try context.save()
        } catch {
            print("Save error: \\(error)")
        }
    }
}

let repo = ItemRepository(context: NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType))
repo.createItem(title: "Swift を学ぶ")
let items = repo.fetchAllItems()
print("Items: \\(items)")`}
        height="400px"
        expectedOutput={"Created: Swift を学ぶ\nItems: [\"Item A\", \"Item B\", \"Item C\"]"}
      />

      <SwiftEditor
        defaultCode={`// SwiftData（iOS 17+）- Core Data の後継
import SwiftData

// @Model マクロでエンティティを定義
@Model
class TodoItem {
    var title: String
    var isCompleted: Bool
    var createdAt: Date

    init(title: String) {
        self.title = title
        self.isCompleted = false
        self.createdAt = Date()
    }
}

// SwiftUI との統合
// @main
// struct MyApp: App {
//     var body: some Scene {
//         WindowGroup {
//             ContentView()
//         }
//         .modelContainer(for: TodoItem.self)
//     }
// }

// ContentView での使用
// struct ContentView: View {
//     @Query(sort: \\.createdAt) private var items: [TodoItem]
//     @Environment(\\.modelContext) private var context
//
//     var body: some View {
//         List(items) { item in
//             Text(item.title)
//         }
//         .toolbar {
//             Button("Add") {
//                 context.insert(TodoItem(title: "New Task"))
//             }
//         }
//     }
// }

let item = TodoItem(title: "SwiftDataを学ぶ")
print("\\(item.title): \\(item.isCompleted)")`}
        height="340px"
        expectedOutput="SwiftDataを学ぶ: false"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ios" lessonId="core-data" />
      </div>
      <LessonNav lessons={lessons} currentId="core-data" basePath="/learn/ios" />
    </div>
  );
}
