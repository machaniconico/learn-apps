import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function ProtocolOrientedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロトコル指向</h1>
        <p className="text-gray-400">POP（Protocol-Oriented Programming）でSwiftらしい設計を実践します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロトコル指向プログラミング（POP）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftはクラス継承より<strong className="text-white">プロトコルとextension</strong>による設計を推奨しています。
          クラス継承では単一継承の制約や継承ツリーの複雑化が問題になりますが、
          POPではプロトコルを小さく分割して組み合わせることで、柔軟かつ再利用性の高い設計が可能です。
          structやenumでもポリモーフィズムを実現できるのがPOPの強みです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>小さなプロトコルを定義して合成する（Interface Segregation）</li>
          <li>protocol extensionでデフォルト実装を提供してコード重複を排除</li>
          <li>structやenumでも振る舞いを共有できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: クラス継承 vs プロトコル指向</h2>
        <SwiftEditor
          defaultCode={`// プロトコル指向のアプローチ
protocol Flyable {
    func fly() -> String
}

protocol Swimmable {
    func swim() -> String
}

// デフォルト実装を提供
extension Flyable {
    func fly() -> String { "羽ばたいて飛ぶ" }
}

extension Swimmable {
    func swim() -> String { "泳ぐ" }
}

struct Duck: Flyable, Swimmable {
    var name: String
    // swim はオーバーライド
    func swim() -> String { "\\(name)がスイスイ泳ぐ" }
}

struct Eagle: Flyable {
    var name: String
    func fly() -> String { "\\(name)が高く舞い上がる" }
}

struct Fish: Swimmable {}

let duck = Duck(name: "アヒル")
print(duck.fly())
print(duck.swim())

let eagle = Eagle(name: "ワシ")
print(eagle.fly())

let fish = Fish()
print(fish.swim())`}
          expectedOutput={`羽ばたいて飛ぶ
アヒルがスイスイ泳ぐ
ワシが高く舞い上がる
泳ぐ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: protocol extensionで共通ロジックを共有</h2>
        <SwiftEditor
          defaultCode={`protocol Validatable {
    var errors: [String] { get }
    func validate() -> Bool
}

extension Validatable {
    func validate() -> Bool { errors.isEmpty }

    func printValidationResult() {
        if validate() {
            print("✓ バリデーション成功")
        } else {
            print("✗ エラー: \\(errors.joined(separator: ", "))")
        }
    }
}

struct UserForm: Validatable {
    var name: String
    var email: String

    var errors: [String] {
        var errs: [String] = []
        if name.isEmpty { errs.append("名前は必須です") }
        if !email.contains("@") { errs.append("メールアドレスが不正です") }
        return errs
    }
}

let validForm = UserForm(name: "田中", email: "tanaka@example.com")
validForm.printValidationResult()

let invalidForm = UserForm(name: "", email: "not-an-email")
invalidForm.printValidationResult()`}
          expectedOutput={`✓ バリデーション成功
✗ エラー: 名前は必須です, メールアドレスが不正です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 依存性注入とテスタビリティ</h2>
        <SwiftEditor
          defaultCode={`protocol DataStore {
    func save(_ value: String, forKey key: String)
    func load(forKey key: String) -> String?
}

// 本番実装
struct InMemoryStore: DataStore {
    private var storage: [String: String] = [:]

    mutating func save(_ value: String, forKey key: String) {
        storage[key] = value
    }

    func load(forKey key: String) -> String? {
        storage[key]
    }
}

// プロトコルを使ってサービスを実装（疎結合）
struct UserService {
    var store: DataStore

    mutating func saveUser(name: String) {
        store.save(name, forKey: "user.name")
        print("保存しました: \\(name)")
    }

    func loadUser() -> String {
        store.load(forKey: "user.name") ?? "未設定"
    }
}

var memStore = InMemoryStore()
var service = UserService(store: memStore)
service.saveUser(name: "Yamada")
// 注: mutating の伝播により直接読み込みを確認
print("ユーザー: \\(service.loadUser())")`}
          expectedOutput={`保存しました: Yamada
ユーザー: 未設定`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="protocol-oriented" />
      </div>
      <LessonNav lessons={lessons} currentId="protocol-oriented" basePath="/learn/protocols" />
    </div>
  );
}
