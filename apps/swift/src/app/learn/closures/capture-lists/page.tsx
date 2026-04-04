import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function CaptureListsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">キャプチャリスト</h1>
        <p className="text-gray-400">クロージャが外部の変数をキャプチャする方法と、循環参照を防ぐ手法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値のキャプチャ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クロージャは定義されたスコープの変数・定数を「キャプチャ」します。
          値型（Int、Structなど）の変数は参照としてキャプチャされるため、
          クロージャ実行時点の最新の値が使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>クロージャは周囲のスコープの変数を参照でキャプチャする</li>
          <li>変数の値はクロージャ呼び出し時点のものが使われる</li>
          <li><code className="text-violet-300">var</code> をキャプチャすると変更も追跡される</li>
          <li>クロージャ内からキャプチャした変数を変更することもできる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 変数のキャプチャ</h2>
        <SwiftEditor
          defaultCode={`// カウンタを作るクロージャ
func makeCounter() -> () -> Int {
    var count = 0
    let increment = {
        count += 1
        return count
    }
    return increment
}

let counter1 = makeCounter()
let counter2 = makeCounter()

print(counter1())  // 1
print(counter1())  // 2
print(counter1())  // 3
print(counter2())  // 1（別のクロージャ、別のcount）
print(counter1())  // 4

// クロージャが変数を共有する例
var shared = 0
let addOne = { shared += 1 }
let addTwo = { shared += 2 }

addOne()
addTwo()
addOne()
print("shared: \\(shared)")`}
          expectedOutput={`1
2
3
1
4
shared: 4`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">キャプチャリストによる値コピー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">[変数名]</code> という形でキャプチャリストを使うと、
          クロージャ作成時点の値をコピーしてキャプチャします。
          これにより、元の変数が変わってもクロージャ内の値は変わりません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">{"[x]"} in</code> — xの現在値をコピーしてキャプチャ</li>
          <li>キャプチャリストなし → 参照キャプチャ（後の変更が反映される）</li>
          <li>キャプチャリストあり → 値コピー（作成時の値を使う）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: キャプチャリストの効果</h2>
        <SwiftEditor
          defaultCode={`var x = 10

// キャプチャリストなし（参照キャプチャ）
let refCapture = {
    print("参照キャプチャ: \\(x)")
}

// キャプチャリストあり（値コピー）
let valCapture = { [x] in
    print("値コピー: \\(x)")
}

x = 99

refCapture()   // 99（変更後の値）
valCapture()   // 10（キャプチャ時の値）

// 実用例: ループ内での独立したキャプチャ
var closures: [() -> Void] = []

for i in 0..<3 {
    // キャプチャリストなしだと全部同じiを参照
    closures.append({ [i] in
        print("クロージャ \\(i)")
    })
}

for c in closures {
    c()
}`}
          expectedOutput={`参照キャプチャ: 99
値コピー: 10
クロージャ 0
クロージャ 1
クロージャ 2`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">weak・unownedによる循環参照対策</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスインスタンスをキャプチャするとき、強参照による循環参照（メモリリーク）に注意が必要です。
          <code className="text-violet-300">[weak self]</code> や <code className="text-violet-300">[unowned self]</code>
          を使って弱参照でキャプチャします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">[weak self]</code> — selfがnilになる可能性がある場合（オプショナル）</li>
          <li><code className="text-violet-300">[unowned self]</code> — selfが必ずクロージャより長生きする場合</li>
          <li><code className="text-violet-300">weak</code> は <code className="text-violet-300">self?</code> として扱う必要がある</li>
          <li>循環参照: オブジェクトAがクロージャを保持、クロージャがAを強参照</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: weak selfによる安全なキャプチャ</h2>
        <SwiftEditor
          defaultCode={`class Timer {
    var label: String
    var onTick: (() -> Void)?

    init(label: String) {
        self.label = label
        print("\\(label) 作成")
    }

    deinit {
        print("\\(label) 解放")
    }

    func setupCallback() {
        // [weak self] で循環参照を防ぐ
        onTick = { [weak self] in
            guard let self = self else {
                print("selfはすでに解放済み")
                return
            }
            print("\\(self.label) がティック")
        }
    }
}

// タイマーのライフサイクルをシミュレート
var timer: Timer? = Timer(label: "タイマーA")
timer?.setupCallback()
timer?.onTick?()   // タイマーA がティック

timer = nil        // 解放される
// onTick が残っていても selfはnil

// unownedの例（selfが確実に存在する場合）
class Button {
    var title: String
    var action: (() -> Void)?

    init(title: String) {
        self.title = title
        action = { [unowned self] in
            print("\\(self.title) がタップされた")
        }
    }
}

let btn = Button(title: "OK")
btn.action?()`}
          expectedOutput={`タイマーA 作成
タイマーA がティック
タイマーA 解放
OK がタップされた`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="capture-lists" />
      </div>
      <LessonNav lessons={lessons} currentId="capture-lists" basePath="/learn/closures" />
    </div>
  );
}
