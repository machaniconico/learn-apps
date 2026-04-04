import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function EscapingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エスケープクロージャ</h1>
        <p className="text-gray-400">@escapingアノテーションとクロージャのライフタイム管理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エスケープとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クロージャが関数の実行終了後も生存する場合、そのクロージャは「エスケープ」するといいます。
          Swiftでは、クロージャが関数のスコープを「抜け出す」（エスケープする）場合、
          引数の型に <code className="text-violet-300">@escaping</code> アノテーションを付ける必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>デフォルト: クロージャは非エスケープ（関数内で完結）</li>
          <li><code className="text-violet-300">@escaping</code> — クロージャが関数終了後も使われる場合に必要</li>
          <li>プロパティへの保存・非同期処理のコールバックがエスケープの典型例</li>
          <li>エスケープクロージャ内で <code className="text-violet-300">self</code> を使う場合は明示が必要</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 非エスケープとエスケープの違い</h2>
        <SwiftEditor
          defaultCode={`// 非エスケープ（デフォルト）: 関数内で即座に実行
func runNow(action: () -> Void) {
    print("実行前")
    action()      // 関数内で完結
    print("実行後")
}

runNow {
    print("  即座に実行")
}

// エスケープ: 関数終了後に実行
var storedActions: [() -> Void] = []

func storeAction(action: @escaping () -> Void) {
    storedActions.append(action)  // 関数を抜けた後も保持
    print("アクションを保存しました")
}

storeAction { print("保存されたアクション1") }
storeAction { print("保存されたアクション2") }

print("--- 後から実行 ---")
for action in storedActions {
    action()
}`}
          expectedOutput={`実行前
  即座に実行
実行後
アクションを保存しました
アクションを保存しました
--- 後から実行 ---
保存されたアクション1
保存されたアクション2`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非同期処理でのエスケープクロージャ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ネットワーク通信やタイマーなど非同期処理のコールバックは必ずエスケープします。
          関数が返った後に非同期処理が完了し、その時点でコールバックが呼ばれるためです。
          エスケープクロージャ内で <code className="text-violet-300">self</code> のプロパティにアクセスするときは
          <code className="text-violet-300">self.</code> の明示が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>非同期コールバック → 必ず <code className="text-violet-300">@escaping</code></li>
          <li>エスケープクロージャ内の <code className="text-violet-300">self</code> は強参照に注意</li>
          <li>循環参照を防ぐために <code className="text-violet-300">[weak self]</code> と組み合わせることが多い</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: コールバックパターン</h2>
        <SwiftEditor
          defaultCode={`// 非同期処理をシミュレートするクラス
class DataLoader {
    var result: String = ""

    func load(completion: @escaping (String) -> Void) {
        // 実際はDispatchQueue.asyncなどを使う
        // ここでは即座に呼んでシミュレート
        let data = "サーバーからのデータ"
        completion(data)
    }

    func loadAndStore() {
        load { [weak self] data in
            // self. の明示が必要
            self?.result = data
            print("保存完了: \\(data)")
        }
    }
}

let loader = DataLoader()
loader.loadAndStore()
print("loader.result: \\(loader.result)")

// コールバックチェーン
func step1(next: @escaping (Int) -> Void) {
    print("ステップ1実行")
    next(10)
}

func step2(value: Int, next: @escaping (Int) -> Void) {
    print("ステップ2: \\(value)を受け取った")
    next(value * 2)
}

func step3(value: Int) {
    print("ステップ3: 最終結果 \\(value)")
}

step1 { v1 in
    step2(value: v1) { v2 in
        step3(value: v2)
    }
}`}
          expectedOutput={`保存完了: サーバーからのデータ
loader.result: サーバーからのデータ
ステップ1実行
ステップ2: 10を受け取った
ステップ3: 最終結果 20`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エスケープクロージャとライフタイム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          エスケープクロージャはキャプチャしたオブジェクトの参照を保持するため、
          オブジェクトのライフタイムが延びることがあります。
          これはメモリ管理上重要なポイントです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>エスケープクロージャが強参照でキャプチャするとオブジェクトが解放されない</li>
          <li><code className="text-violet-300">[weak self]</code> でキャプチャすることでライフタイムを制御できる</li>
          <li>クロージャが不要になったら参照を <code className="text-violet-300">nil</code> にして解放</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ライフタイムの制御</h2>
        <SwiftEditor
          defaultCode={`class Task {
    let name: String
    var onComplete: (() -> Void)?

    init(name: String) {
        self.name = name
        print("\\(name): 作成")
    }

    deinit {
        print("\\(name): 解放")
    }

    func run() {
        print("\\(name): 実行中")
        onComplete?()
        // onCompleteをnilにするとクロージャが解放される
        onComplete = nil
    }
}

// 強参照でのキャプチャ
var task1: Task? = Task(name: "タスク1")
task1?.onComplete = {
    // task1を強参照でキャプチャ（循環参照）
    print("完了コールバック（強参照）")
}
task1?.run()
task1 = nil  // onCompleteがnilになったので解放される

print("---")

// 弱参照でのキャプチャ
var task2: Task? = Task(name: "タスク2")
task2?.onComplete = { [weak task2] in
    print("完了コールバック（弱参照）: \\(task2?.name ?? "解放済み")")
}
task2?.run()
task2 = nil`}
          expectedOutput={`タスク1: 作成
タスク1: 実行中
完了コールバック（強参照）
タスク1: 解放
---
タスク2: 作成
タスク2: 実行中
完了コールバック（弱参照）: タスク2
タスク2: 解放`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="escaping" />
      </div>
      <LessonNav lessons={lessons} currentId="escaping" basePath="/learn/closures" />
    </div>
  );
}
