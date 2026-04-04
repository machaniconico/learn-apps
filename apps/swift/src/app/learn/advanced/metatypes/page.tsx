import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function MetatypesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">上級機能</span>
        <h1 className="text-3xl font-bold text-gray-100">メタタイプ</h1>
        <p className="text-gray-400">Type.self・.Type・メタタイプの活用を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          メタタイプ（Metatype）とは「型の型」です。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">Int.Type</code> は Int 型そのものを値として扱うための型で、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">Int.self</code> でその値を取得します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// .self でメタタイプ値を取得
let intType: Int.Type = Int.self
let stringType: String.Type = String.self

print(intType)     // Int
print(stringType)  // String

// type(of:) で実行時のメタタイプを取得
let value: Any = 42
let runtimeType = type(of: value)
print(runtimeType)  // Int

// メタタイプを使ったインスタンス生成
protocol Creatable {
    init()
}

struct Dog: Creatable {
    var name = "Dog"
    init() {}
}

func create<T: Creatable>(_ type: T.Type) -> T {
    type.init()
}

let dog = create(Dog.self)
print(dog.name)  // Dog`}
        height="280px"
        expectedOutput="Int\nString\nInt\nDog"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">AnyClass と ObjectIdentifier</h2>
        <p>
          クラス型のメタタイプは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">AnyClass</code>（= <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">AnyObject.Type</code>）で扱えます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import Foundation

// AnyClass でクラスのメタタイプを扱う
class Animal {
    class var species: String { "Unknown" }
    required init() {}
}

class Cat: Animal {
    override class var species: String { "Felis catus" }
}

class Dog: Animal {
    override class var species: String { "Canis lupus familiaris" }
}

let types: [Animal.Type] = [Cat.self, Dog.self]

for animalType in types {
    let instance = animalType.init()
    print("\\(animalType.species): \\(type(of: instance))")
}
// Felis catus: Cat
// Canis lupus familiaris: Dog

// ObjectIdentifier で型の一意性を確認
let catID = ObjectIdentifier(Cat.self)
let dogID = ObjectIdentifier(Dog.self)
print(catID == dogID)  // false`}
        height="300px"
        expectedOutput="Felis catus: Cat\nCanis lupus familiaris: Dog\nfalse"
      />

      <SwiftEditor
        defaultCode={`// メタタイプの実用例: ファクトリパターン
protocol ViewModel {
    init(id: Int)
    func render() -> String
}

class UserViewModel: ViewModel {
    let id: Int
    required init(id: Int) { self.id = id }
    func render() -> String { "User #\\(id)" }
}

class ProductViewModel: ViewModel {
    let id: Int
    required init(id: Int) { self.id = id }
    func render() -> String { "Product #\\(id)" }
}

// メタタイプを辞書で管理
let registry: [String: any ViewModel.Type] = [
    "user": UserViewModel.self,
    "product": ProductViewModel.self,
]

func createViewModel(type name: String, id: Int) -> (any ViewModel)? {
    registry[name]?.init(id: id)
}

if let vm = createViewModel(type: "user", id: 42) {
    print(vm.render())  // User #42
}
if let vm = createViewModel(type: "product", id: 7) {
    print(vm.render())  // Product #7
}`}
        height="320px"
        expectedOutput="User #42\nProduct #7"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="advanced" lessonId="metatypes" />
      </div>
      <LessonNav lessons={lessons} currentId="metatypes" basePath="/learn/advanced" />
    </div>
  );
}
