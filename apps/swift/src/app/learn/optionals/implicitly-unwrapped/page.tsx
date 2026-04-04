import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "optionals")!.lessons;

export default function ImplicitlyUnwrappedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Optional型 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">暗黙的アンラップ</h1>
        <p className="text-gray-400">!付きOptional型</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">暗黙的アンラップOptional（IUO）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          暗黙的アンラップOptional（Implicitly Unwrapped Optional、IUO）は型宣言に<code className="text-pink-300">!</code>を付けた特別なOptional型です。
          <code className="text-pink-300">String!</code>のように書き、通常のOptionalと同様にnilを保持できますが、
          使用時に自動的にアンラップされる（<code className="text-pink-300">!</code>を付けなくても非Optionalとして扱える）という特徴があります。
          初期化後に必ず値が設定されることが保証される場面で使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">var name: String!</code> — 暗黙的アンラップOptionalの宣言</li>
          <li>nilを保持できる点は通常のOptionalと同じ</li>
          <li>使用時に自動でアンラップされる（<code className="text-pink-300">!</code>不要）</li>
          <li>nilの状態で使うと実行時クラッシュ</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IUOの主な使用場面</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          IUOが最も多く使われるのはiOS/macOS開発における<code className="text-pink-300">IBOutlet</code>（Interface Builderの接続）です。
          ViewControllerのプロパティはnilで初期化されますが、viewDidLoadの前に必ず値がセットされることが保証されています。
          また、初期化フェーズが2段階に分かれていて、第1フェーズ完了後に必ず値が設定されるクラスの設計でも使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>iOS: <code className="text-pink-300">@IBOutlet var button: UIButton!</code></li>
          <li>2フェーズ初期化が必要なクラス設計</li>
          <li>循環参照を避けるためのオーナーシップパターン</li>
          <li>Objective-C APIブリッジの結果型</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IUOと通常Optionalの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          IUOは「Optional型でもあり、通常の型でもある」という二重の性質を持ちます。
          <code className="text-pink-300">if let</code>や<code className="text-pink-300">??</code>などの安全なアンラップも使えますし、
          直接非Optionalとして扱うこともできます。
          Swift 5.7以降、コンパイラはIUOを可能な限り通常のOptionalとして扱い、安全なアンラップを促します。
          新規コードではIUOより<code className="text-pink-300">lazy var</code>や<code className="text-pink-300">Optional</code>を検討することが推奨されます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: IUOの基本的な動作</h2>
        <SwiftEditor
          defaultCode={`// 暗黙的アンラップOptionalの宣言
var implicitString: String! = "暗黙的アンラップ"

// !なしで通常のStringとして使える
print(implicitString)            // Optional表示なし
print(implicitString.uppercased())
print(implicitString.count)

// nilを代入することも可能
// implicitString = nil
// print(implicitString.count)  // ← nilのまま使うとクラッシュ！

// 通常のOptionalとの比較
var regularOptional: String? = "通常のOptional"
var implicitOptional: String! = "暗黙的Optional"

// 通常のOptionalはそのまま使えない（コンパイルエラー）
// print(regularOptional.count)  // エラー

// IUOは直接使える
print(implicitOptional.count)

// if letでも安全に使える
if let value = implicitOptional {
    print("安全にアンラップ: \\(value)")
}`}
          expectedOutput={`Optional("暗黙的アンラップ")
暗黙的アンラップ
9
9
安全にアンラップ: 暗黙的Optional`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 2フェーズ初期化パターン</h2>
        <SwiftEditor
          defaultCode={`// IUOの典型的な使用例：2フェーズ初期化
class NetworkManager {
    var baseURL: String!  // setup()で必ず設定される

    func setup(url: String) {
        baseURL = url
    }

    func fetchData(path: String) -> String {
        // setup()後なのでbaseURLは確実に非nil
        return "\\(baseURL!)\\(path)"
    }
}

let manager = NetworkManager()
manager.setup(url: "https://api.example.com")
print(manager.fetchData(path: "/users"))
print(manager.fetchData(path: "/posts"))

// IUOはif letでも使える（安全）
class ViewController {
    var titleLabel: String!  // 実際はUILabel

    func viewDidLoad() {
        titleLabel = "ようこそ"
    }

    func updateTitle(to text: String) {
        if let label = titleLabel {
            print("ラベル更新: \\(label) → \\(text)")
        }
        titleLabel = text
    }
}

let vc = ViewController()
vc.viewDidLoad()
vc.updateTitle(to: "ホーム画面")`}
          expectedOutput={`https://api.example.com/users
https://api.example.com/posts
ラベル更新: ようこそ → ホーム画面`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Optional型まとめ - 全手法の比較</h2>
        <SwiftEditor
          defaultCode={`var value: String? = "Swift"
var nilValue: String? = nil

// 1. if let（最も安全・推奨）
if let v = value {
    print("if let: \\(v)")
}

// 2. guard let（早期リターン・推奨）
func process(_ s: String?) -> String {
    guard let v = s else { return "guard: nilでした" }
    return "guard: \\(v)"
}
print(process(value))
print(process(nilValue))

// 3. ??（デフォルト値・推奨）
print("??: \\(value ?? "デフォルト")")
print("??: \\(nilValue ?? "デフォルト")")

// 4. オプショナルチェーン
print("?.: \\(value?.uppercased() ?? "nil")")

// 5. 強制アンラップ（確信がある場合のみ）
print("!: \\(value!)")

// 6. 暗黙的アンラップ（フレームワーク連携など）
var iuo: String! = "IUO"
print("IUO: \\(iuo)")`}
          expectedOutput={`if let: Swift
guard: Swift
guard: nilでした
??: Swift
??: デフォルト
?.: SWIFT
!: Swift
IUO: Swift`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optionals" lessonId="implicitly-unwrapped" />
      </div>
      <LessonNav lessons={lessons} currentId="implicitly-unwrapped" basePath="/learn/optionals" />
    </div>
  );
}
