import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function ActorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Actor</h1>
        <p className="text-gray-400">actorを使ってデータ競合を防ぎながら並行処理を安全に実装します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">actor とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">actor</code> はデータ競合を防ぐための参照型です。
          クラスに似ていますが、内部状態へのアクセスは自動的にシリアライズされます。
          外部から actor のプロパティやメソッドにアクセスするには <code className="text-teal-300">await</code> が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">actor MyActor {"{ }"}</code> — actor の定義</li>
          <li>外部からのアクセスは <code className="text-teal-300">await actor.method()</code></li>
          <li><code className="text-teal-300">nonisolated</code> — actor 外から同期的にアクセス可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: actor の基本</h2>
        <SwiftEditor
          defaultCode={`import Foundation

actor BankAccount {
    private var balance: Double

    init(balance: Double) {
        self.balance = balance
    }

    func deposit(_ amount: Double) {
        balance += amount
        print("入金: \\(amount)円 → 残高: \\(balance)円")
    }

    func withdraw(_ amount: Double) -> Bool {
        guard balance >= amount else {
            print("残高不足")
            return false
        }
        balance -= amount
        print("出金: \\(amount)円 → 残高: \\(balance)円")
        return true
    }

    func getBalance() -> Double { balance }
}

let account = BankAccount(balance: 10000)

Task {
    await account.deposit(5000)
    await account.withdraw(3000)
    let balance = await account.getBalance()
    print("最終残高: \\(balance)円")
}`}
          expectedOutput={`入金: 5000.0円 → 残高: 15000.0円
出金: 3000.0円 → 残高: 12000.0円
最終残高: 12000.0円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: @MainActor</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// @MainActor: メインスレッドで実行されることを保証
@MainActor
class ViewModel {
    var title = "初期値"
    var count = 0

    func updateTitle(_ newTitle: String) {
        title = newTitle
        print("タイトル更新: \\(title)")
    }

    func increment() {
        count += 1
        print("カウント: \\(count)")
    }
}

let vm = ViewModel()

Task { @MainActor in
    vm.updateTitle("Hello, Swift!")
    vm.increment()
    vm.increment()
    print("最終カウント: \\(vm.count)")
}

// nonisolated: actor外からも同期的にアクセス可能な関数
actor MyService {
    var data = "秘密のデータ"

    nonisolated var description: String {
        "MyService インスタンス"
    }
}

let service = MyService()
print(service.description)  // await 不要`}
          expectedOutput={`タイトル更新: Hello, Swift!
カウント: 1
カウント: 2
最終カウント: 2
MyService インスタンス`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="actors" />
      </div>
      <LessonNav lessons={lessons} currentId="actors" basePath="/learn/concurrency" />
    </div>
  );
}
