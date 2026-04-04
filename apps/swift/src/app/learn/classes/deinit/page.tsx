import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "classes")!.lessons;

export default function DeinitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デイニシャライザ</h1>
        <p className="text-gray-400">deinitを使ってインスタンスが解放される直前にリソースを後片付けする方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">deinitとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">deinit</code>はクラスのインスタンスがメモリから解放される直前に自動的に呼び出される特別なメソッドです。
          ファイルのクローズ、ネットワーク接続の切断、通知の登録解除など、リソースのクリーンアップ処理を記述するために使います。
          <code className="text-red-300">deinit</code>は引数も戻り値も持たず、手動で呼び出すこともできません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>クラスにのみ定義できる（structやenumには不可）</li>
          <li>引数・戻り値なし、手動呼び出し不可</li>
          <li>ARCによって参照カウントが0になったとき自動呼び出し</li>
          <li>1つのクラスに1つの<code className="text-red-300">deinit</code>のみ定義可能</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">deinitの呼び出しタイミング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インスタンスへの参照がなくなり参照カウントが0になると、ARCが自動的にメモリを解放します。
          そのタイミングで<code className="text-red-300">deinit</code>が呼ばれます。
          スコープを抜けたとき、<code className="text-red-300">nil</code>を代入したとき、変数が別のインスタンスに差し替えられたときなどに解放が起きます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>スコープを抜けると局所変数のインスタンスが解放される</li>
          <li><code className="text-red-300">optional変数 = nil</code> で参照を切ると解放される</li>
          <li>配列などのコレクションが解放されると要素も解放される</li>
          <li>継承がある場合、子クラスの<code className="text-red-300">deinit</code>→親クラスの<code className="text-red-300">deinit</code>の順に呼ばれる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">継承とdeinit</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          継承関係があるクラスでは、子クラスの<code className="text-red-300">deinit</code>が先に呼ばれ、続いて親クラスの<code className="text-red-300">deinit</code>が自動的に呼ばれます。
          親クラスの<code className="text-red-300">deinit</code>は明示的に呼ぶ必要はなく、Swiftが自動的に処理します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>子の<code className="text-red-300">deinit</code> → 親の<code className="text-red-300">deinit</code> の順で自動実行</li>
          <li><code className="text-red-300">super.deinit()</code>は呼べない（自動）</li>
          <li>各クラス層で独立したクリーンアップが可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: deinitの基本的な使い方</h2>
        <SwiftEditor
          defaultCode={`class DatabaseConnection {
    let host: String
    let port: Int
    var isConnected: Bool = false

    init(host: String, port: Int) {
        self.host = host
        self.port = port
        connect()
    }

    func connect() {
        isConnected = true
        print("✅ DB接続完了: \\(host):\\(port)")
    }

    func query(_ sql: String) {
        guard isConnected else {
            print("❌ 未接続")
            return
        }
        print("📋 クエリ実行: \\(sql)")
    }

    deinit {
        isConnected = false
        print("🔌 DB接続を切断: \\(host):\\(port)")
    }
}

print("=== スコープ開始 ===")
do {
    let db = DatabaseConnection(host: "localhost", port: 5432)
    db.query("SELECT * FROM users")
    print("=== スコープ終了前 ===")
}  // ここでdbが解放される
print("=== スコープ終了後 ===")`}
          expectedOutput={`=== スコープ開始 ===
✅ DB接続完了: localhost:5432
📋 クエリ実行: SELECT * FROM users
=== スコープ終了前 ===
🔌 DB接続を切断: localhost:5432
=== スコープ終了後 ===`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: nilを代入して解放する</h2>
        <SwiftEditor
          defaultCode={`class Timer {
    let name: String
    var count: Int = 0

    init(name: String) {
        self.name = name
        print("タイマー '\\(name)' 開始")
    }

    func tick() {
        count += 1
        print("\\(name): \\(count)回")
    }

    deinit {
        print("タイマー '\\(name)' 停止（\\(count)回カウント）")
    }
}

var timer1: Timer? = Timer(name: "A")
var timer2: Timer? = Timer(name: "B")

timer1?.tick()
timer1?.tick()
timer2?.tick()

print("--- timer1を解放 ---")
timer1 = nil

timer2?.tick()
timer2?.tick()

print("--- timer2を解放 ---")
timer2 = nil

print("完了")`}
          expectedOutput={`タイマー 'A' 開始
タイマー 'B' 開始
A: 1回
A: 2回
B: 1回
--- timer1を解放 ---
タイマー 'A' 停止（2回カウント）
B: 2回
B: 3回
--- timer2を解放 ---
タイマー 'B' 停止（3回カウント）
完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 継承とdeinitの順序</h2>
        <SwiftEditor
          defaultCode={`class Resource {
    let name: String

    init(name: String) {
        self.name = name
        print("Resource init: \\(name)")
    }

    deinit {
        print("Resource deinit: \\(name)")
    }
}

class ManagedResource: Resource {
    var data: [String]

    init(name: String, data: [String]) {
        self.data = data
        super.init(name: name)
        print("ManagedResource init: \\(data.count)件のデータ")
    }

    deinit {
        // 子クラスのdeinitが先に呼ばれる
        print("ManagedResource deinit: データをクリア (\\(data.count)件)")
        data.removeAll()
    }
}

print("=== 作成 ===")
var resource: ManagedResource? = ManagedResource(
    name: "キャッシュ",
    data: ["item1", "item2", "item3"]
)

print("=== 使用中 ===")
print("データ数: \\(resource?.data.count ?? 0)")

print("=== 解放 ===")
resource = nil
print("=== 完了 ===")`}
          expectedOutput={`=== 作成 ===
Resource init: キャッシュ
ManagedResource init: 3件のデータ
=== 使用中 ===
データ数: 3
=== 解放 ===
ManagedResource deinit: データをクリア (3件)
Resource deinit: キャッシュ
=== 完了 ===`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="deinit" />
      </div>
      <LessonNav lessons={lessons} currentId="deinit" basePath="/learn/classes" />
    </div>
  );
}
