import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "enums")!.lessons;

export default function PatternMatchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">列挙型 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パターンマッチング</h1>
        <p className="text-gray-400">switchとif case、guard caseを使って列挙型のケースを網羅的かつ柔軟に分岐します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switchによる網羅的マッチング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftのswitchは<strong className="text-white">網羅性チェック</strong>が行われます。列挙型のすべてのケースを網羅していないとコンパイルエラーになるため、ケースの追加漏れを防げます。
          <code className="text-indigo-300">default</code>を使うとその他すべてをまとめられますが、新しいケースを追加したときに気付けなくなるためなるべく使わないことが推奨されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>全ケースを列挙 → コンパイラが網羅チェック</li>
          <li><code className="text-indigo-300">case .a, .b:</code> — 複数ケースをまとめて処理</li>
          <li><code className="text-indigo-300">where</code> — 追加条件を指定</li>
          <li><code className="text-indigo-300">default</code> — 残りすべてをキャッチ（慎重に使う）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if case と guard case</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          特定の1ケースだけを処理したい場合は<code className="text-indigo-300">if case</code>が便利です。
          switchよりも簡潔に書けます。
          <code className="text-indigo-300">guard case</code>はアーリーリターンで特定ケース以外を早期排除するパターンです。
          関連値も同時に束縛できます。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whereによる条件付きマッチング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          switchのcaseに<code className="text-indigo-300">where</code>を追加することで、ケースの一致に加えて追加条件を指定できます。
          関連値を取り出しながらその値に対する条件も同時に記述できるため、複雑な分岐をすっきり表現できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: switchの網羅的マッチングとwhere</h2>
        <SwiftEditor
          defaultCode={`enum Shape {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)
    case triangle(base: Double, height: Double)
}

func describe(_ shape: Shape) -> String {
    switch shape {
    case let .circle(r) where r > 10:
        return "大きな円（半径\\(r)）"
    case let .circle(r):
        return "円（半径\\(r)）"
    case let .rectangle(w, h) where w == h:
        return "正方形（一辺\\(w)）"
    case let .rectangle(w, h):
        return "長方形（\\(w) × \\(h)）"
    case let .triangle(b, h):
        return "三角形（底辺\\(b)、高さ\\(h)）"
    }
}

let shapes: [Shape] = [
    .circle(radius: 5.0),
    .circle(radius: 15.0),
    .rectangle(width: 4.0, height: 4.0),
    .rectangle(width: 3.0, height: 6.0),
    .triangle(base: 8.0, height: 5.0),
]

for shape in shapes {
    print(describe(shape))
}`}
          expectedOutput={`円（半径5.0）
大きな円（半径15.0）
正方形（一辺4.0）
長方形（3.0 × 6.0）
三角形（底辺8.0、高さ5.0）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: if case と guard case</h2>
        <SwiftEditor
          defaultCode={`enum AppState {
    case loading
    case loaded(items: [String])
    case error(message: String)
}

func handleState(_ state: AppState) {
    // guard caseで早期リターン
    guard case let .loaded(items) = state else {
        if case let .error(msg) = state {
            print("エラー: \\(msg)")
        } else {
            print("読み込み中...")
        }
        return
    }
    print("\\(items.count)件のアイテムを表示")
    for item in items {
        print("  - \\(item)")
    }
}

handleState(.loading)
handleState(.error(message: "ネットワークエラー"))
handleState(.loaded(items: ["Swift", "Kotlin", "Python"]))

// if caseで特定ケースのみ処理
let state = AppState.loaded(items: ["A", "B"])
if case let .loaded(items) = state, items.count > 1 {
    print("複数アイテム: \\(items.joined(separator: ", "))")
}`}
          expectedOutput={`読み込み中...
エラー: ネットワークエラー
3件のアイテムを表示
  - Swift
  - Kotlin
  - Python
複数アイテム: A, B`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数ケースのまとめ処理とforループ</h2>
        <SwiftEditor
          defaultCode={`enum Permission {
    case read
    case write
    case execute
    case admin
}

func accessLevel(for permission: Permission) -> String {
    switch permission {
    case .read:
        return "読み取り専用"
    case .write, .execute:
        return "一般ユーザー操作"
    case .admin:
        return "管理者権限"
    }
}

let permissions: [Permission] = [.read, .write, .execute, .admin]
for perm in permissions {
    print("\\(perm): \\(accessLevel(for: perm))")
}

// for-inでパターンマッチング
let mixed: [Permission] = [.read, .admin, .write, .read, .admin]
let adminCount = mixed.filter {
    if case .admin = $0 { return true }
    return false
}.count
print("管理者権限の数: \\(adminCount)")`}
          expectedOutput={`read: 読み取り専用
write: 一般ユーザー操作
execute: 一般ユーザー操作
admin: 管理者権限
管理者権限の数: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="pattern-matching" />
      </div>
      <LessonNav lessons={lessons} currentId="pattern-matching" basePath="/learn/enums" />
    </div>
  );
}
