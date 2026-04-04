import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function ArcBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ARCの基本</h1>
        <p className="text-gray-400">Automatic Reference Countingの仕組みとメモリ管理の基礎を理解します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ARCとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">ARC（Automatic Reference Counting）</code>はSwiftが自動的にメモリを管理する仕組みです。
          クラスのインスタンスへの参照数（参照カウント）を追跡し、カウントが0になったとき自動的にメモリを解放します。
          開発者はメモリの確保・解放を手動で行う必要がなく、メモリリークを防ぎやすくなっています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>クラスインスタンスを参照するたびにカウントが+1される</li>
          <li>参照がなくなるとカウントが-1される</li>
          <li>カウントが0になるとdeinitが呼ばれメモリが解放される</li>
          <li>structやenumは値型なのでARCの対象外</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照カウントの追跡</h2>
        <p className="text-gray-400 mb-4">
          変数にインスタンスを代入するたびに参照カウントが増加します。
          nilを代入すると参照が外れカウントが減ります。
        </p>
        <SwiftEditor
          defaultCode={`class Dog {
    let name: String

    init(name: String) {
        self.name = name
        print("🐕 \\(name) が生成されました")
    }

    deinit {
        print("💨 \\(name) が解放されました")
    }
}

print("--- 参照カウント: 1 ---")
var dog1: Dog? = Dog(name: "ポチ")

print("--- 参照カウント: 2 ---")
var dog2: Dog? = dog1

print("--- 参照カウント: 1 ---")
dog1 = nil

print("--- 参照カウント: 0 → 解放 ---")
dog2 = nil

print("完了")`}
          expectedOutput={`--- 参照カウント: 1 ---
🐕 ポチ が生成されました
--- 参照カウント: 2 ---
--- 参照カウント: 1 ---
--- 参照カウント: 0 → 解放 ---
💨 ポチ が解放されました
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">deinitによる解放確認</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">deinit</code>はインスタンスが解放される直前に呼ばれます。
          リソースの後片付けや、解放タイミングの確認に使います。
        </p>
        <SwiftEditor
          defaultCode={`class FileHandle {
    let filename: String

    init(filename: String) {
        self.filename = filename
        print("ファイルを開きました: \\(filename)")
    }

    func read() -> String {
        return "\\(filename) の内容"
    }

    deinit {
        // ファイルを閉じるなどのクリーンアップ
        print("ファイルを閉じました: \\(filename)")
    }
}

do {
    // スコープに入るとインスタンス生成
    let handle = FileHandle(filename: "data.txt")
    print(handle.read())
    // スコープを出ると参照カウント0 → 自動解放
}

print("スコープ終了後")`}
          expectedOutput={`ファイルを開きました: data.txt
data.txt の内容
ファイルを閉じました: data.txt
スコープ終了後`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数インスタンスの管理</h2>
        <p className="text-gray-400 mb-4">
          ARCは複数のインスタンスを独立して管理します。それぞれの参照カウントが個別に追跡されます。
        </p>
        <SwiftEditor
          defaultCode={`class Sensor {
    let id: Int
    init(id: Int) {
        self.id = id
        print("センサー \\(id) ON")
    }
    deinit { print("センサー \\(id) OFF") }
}

var sensors: [Sensor?] = [
    Sensor(id: 1),
    Sensor(id: 2),
    Sensor(id: 3),
]

print("センサー2を解放")
sensors[1] = nil

print("残り全て解放")
sensors = []`}
          expectedOutput={`センサー 1 ON
センサー 2 ON
センサー 3 ON
センサー2を解放
センサー 2 OFF
残り全て解放
センサー 1 OFF
センサー 3 OFF`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="arc-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="arc-basics" basePath="/learn/memory" />
    </div>
  );
}
