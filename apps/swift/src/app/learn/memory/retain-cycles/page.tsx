import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function RetainCyclesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">循環参照（Retain Cycle）</h1>
        <p className="text-gray-400">メモリリークの原因となる循環参照のパターンと解決方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">循環参照とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">循環参照（Retain Cycle）</code>とは、2つ以上のオブジェクトが
          互いにstrongで参照し合う状態です。外部から参照がなくなっても、互いに参照し合っているため
          参照カウントが0にならず、メモリが解放されないメモリリークが発生します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>クラスAがクラスBをstrong参照し、BもAをstrong参照する</li>
          <li>外部変数をnilにしても内部の参照カウントが0にならない</li>
          <li>deinitが呼ばれずメモリリークが発生する</li>
          <li>weakまたはunownedで片方を弱参照にして解決する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラス間の循環参照</h2>
        <p className="text-gray-400 mb-4">
          親子関係で両方がstrongで参照し合うと循環参照が発生します。
          片方をweakにすることで解決できます。
        </p>
        <SwiftEditor
          defaultCode={`// 循環参照の例（問題あり）
class Parent {
    let name: String
    var child: Child?
    init(name: String) { self.name = name }
    deinit { print("Parent '\\(name)' 解放") }
}

class Child {
    let name: String
    // weak にすべきところを strong にしている
    var parent: Parent?
    init(name: String) { self.name = name }
    deinit { print("Child '\\(name)' 解放") }
}

var parent: Parent? = Parent(name: "お父さん")
var child: Child? = Child(name: "太郎")

parent?.child = child
child?.parent = parent  // strong → 循環参照！

parent = nil
child = nil
// deinitが呼ばれない = メモリリーク
print("両方nilにしたのにdeinitが呼ばれていない")`}
          expectedOutput={`両方nilにしたのにdeinitが呼ばれていない`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">weakで循環参照を解決</h2>
        <p className="text-gray-400 mb-4">
          子から親への参照を<code className="text-pink-300">weak</code>にすることで循環参照を断ち切ります。
        </p>
        <SwiftEditor
          defaultCode={`class Parent {
    let name: String
    var child: Child?
    init(name: String) { self.name = name }
    deinit { print("Parent '\\(name)' 解放") }
}

class Child {
    let name: String
    // weakで循環参照を解決
    weak var parent: Parent?
    init(name: String) { self.name = name }
    deinit { print("Child '\\(name)' 解放") }
}

var parent: Parent? = Parent(name: "お父さん")
var child: Child? = Child(name: "太郎")

parent?.child = child
child?.parent = parent

parent = nil  // Parentが解放される
// child?.parentはweakなのでnilになる
print("parentの参照:", child?.parent as Any)

child = nil   // Childも解放される`}
          expectedOutput={`Parent 'お父さん' 解放
parentの参照: nil
Child '太郎' 解放`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クロージャによる循環参照</h2>
        <p className="text-gray-400 mb-4">
          クロージャがクラスのインスタンスをキャプチャするときも循環参照が起きます。
          クロージャはクラスと同様に参照型です。
        </p>
        <SwiftEditor
          defaultCode={`class NetworkManager {
    let url: String
    // クロージャがselfをキャプチャ → 循環参照
    var completion: (() -> Void)?

    init(url: String) { self.url = url }
    deinit { print("NetworkManager 解放: \\(url)") }

    func setupWithLeak() {
        // selfをstrongキャプチャ → 循環参照
        completion = {
            print("完了: \\(self.url)")  // self → strong参照
        }
    }

    func setupFixed() {
        // [weak self]でキャプチャ → 循環参照なし
        completion = { [weak self] in
            print("完了: \\(self?.url ?? "解放済み")")
        }
    }
}

var manager: NetworkManager? = NetworkManager(url: "https://api.example.com")
manager?.setupFixed()  // weakを使った安全な版
manager?.completion?()
manager = nil  // 正常に解放される`}
          expectedOutput={`完了: https://api.example.com
NetworkManager 解放: https://api.example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="retain-cycles" />
      </div>
      <LessonNav lessons={lessons} currentId="retain-cycles" basePath="/learn/memory" />
    </div>
  );
}
