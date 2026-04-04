import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function MemoryManagementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クロージャとメモリ</h1>
        <p className="text-gray-400">クロージャによる循環参照のしくみを理解し、[weak self]と[unowned self]で安全に回避する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">強参照サイクルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftは自動参照カウント（ARC）でメモリを管理します。
          クロージャが <code className="text-blue-300">self</code> をキャプチャし、そのクロージャがクラスインスタンスのプロパティとして保持されると、
          お互いに参照し合う「強参照サイクル（循環参照）」が発生します。
          この状態ではどちらの参照カウントも0にならず、メモリが解放されないメモリリークになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ARCは参照カウントが0になったタイミングでメモリを解放する</li>
          <li>クロージャとクラスインスタンスが互いを強参照するとリーク発生</li>
          <li><code className="text-blue-300">[weak self]</code> か <code className="text-blue-300">[unowned self]</code> でキャプチャを弱参照にする</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 循環参照が起きるパターン</h2>
        <SwiftEditor
          defaultCode={`class Counter {
    var name: String
    var count = 0
    // クロージャがselfを強参照 → 循環参照
    var increment: (() -> Void)?

    init(name: String) {
        self.name = name
        // selfをキャプチャしたクロージャをプロパティに代入
        increment = {
            self.count += 1   // 強参照でselfをキャプチャ
            print("\\(self.name): \\(self.count)")
        }
    }

    deinit {
        print("\\(name) が解放されました")  // 循環参照があると呼ばれない
    }
}

var c: Counter? = Counter(name: "テスト")
c?.increment?()
c?.increment?()
c = nil   // deinitが呼ばれない（循環参照のため）
print("プログラム終了")`}
          expectedOutput={`テスト: 1
テスト: 2
プログラム終了`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">[weak self] による解決</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          キャプチャリストで <code className="text-blue-300">[weak self]</code> を指定すると、
          クロージャはインスタンスを弱参照（参照カウントを増やさない）でキャプチャします。
          弱参照はオプショナルになるため、クロージャ内で <code className="text-blue-300">guard let self = self</code> または
          <code className="text-blue-300">self?.</code> を使って安全にアクセスします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">{"{ [weak self] in }"}</code> — 弱参照キャプチャ</li>
          <li><code className="text-blue-300">guard let self = self else {"{ return }"}</code> — 解放済みチェック</li>
          <li><code className="text-blue-300">self?.</code> — オプショナルチェーンで安全呼び出し</li>
          <li>インスタンスが解放された後にクロージャが呼ばれてもクラッシュしない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: [weak self] で循環参照を解消</h2>
        <SwiftEditor
          defaultCode={`class Timer {
    var label: String
    var tick: (() -> Void)?

    init(label: String) {
        self.label = label
        // [weak self] で弱参照キャプチャ
        tick = { [weak self] in
            guard let self = self else {
                print("インスタンスは解放済み")
                return
            }
            print("\\(self.label): tick!")
        }
    }

    deinit {
        print("\\(label) が正常に解放されました")
    }
}

var t: Timer? = Timer(label: "myTimer")
t?.tick?()

t = nil          // deinitが呼ばれる（循環参照なし）
print("後処理完了")`}
          expectedOutput={`myTimer: tick!
myTimer が正常に解放されました
後処理完了`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">[unowned self] の使い所</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">[unowned self]</code> はインスタンスがクロージャより必ず長生きする場合に使います。
          <code className="text-blue-300">weak</code> と違ってオプショナルではないため <code className="text-blue-300">guard let</code> が不要です。
          ただしインスタンスが解放された後にアクセスするとクラッシュします。
          「クロージャの生存期間 ≤ インスタンスの生存期間」が確実な場合にのみ使いましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">{"{ [unowned self] in }"}</code> — 非所有参照キャプチャ</li>
          <li>オプショナルにならないので記述が簡潔</li>
          <li>インスタンスの生存がクロージャより長いことが保証できる場合のみ使用</li>
          <li>不確かな場合は安全な <code className="text-blue-300">[weak self]</code> を使う</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: [unowned self] の使用例</h2>
        <SwiftEditor
          defaultCode={`class ViewController {
    let title: String
    lazy var displayTitle: () -> String = { [unowned self] in
        // selfはViewControllerが存在する限り有効
        return "画面: \\(self.title)"
    }

    init(title: String) {
        self.title = title
    }

    deinit {
        print("\\(title) のVCが解放されました")
    }
}

var vc: ViewController? = ViewController(title: "ホーム")
print(vc!.displayTitle())

vc = nil   // 正常に解放される
print("完了")

// weakとunownedの選択基準まとめ
print("---")
print("[weak self]   : nilになる可能性あり → Optional")
print("[unowned self]: 必ず生存が保証 → non-Optional")`}
          expectedOutput={`画面: ホーム
ホーム のVCが解放されました
完了
---
[weak self]   : nilになる可能性あり → Optional
[unowned self]: 必ず生存が保証 → non-Optional`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="memory-management" />
      </div>
      <LessonNav lessons={lessons} currentId="memory-management" basePath="/learn/closures" />
    </div>
  );
}
