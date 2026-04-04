import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function ListsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リストとForEach</h1>
        <p className="text-gray-400">List・ForEachを使ったデータ一覧表示と動的なコンテンツ生成を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ListとForEach</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">List</code>はiOSのテーブルビュー相当のコンポーネントです。
          <code className="text-blue-300">ForEach</code>はコレクションを反復してViewを生成します。
          どちらもIdentifiableプロトコルまたはid指定が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">List</code>: スクロール可能なリスト（UITableView相当）</li>
          <li><code className="text-blue-300">ForEach</code>: ループでViewを生成（Listの外でも使える）</li>
          <li><code className="text-blue-300">Identifiable</code>: リスト項目は一意なidが必要</li>
          <li><code className="text-blue-300">.onDelete</code>: スワイプ削除を追加</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なList</h2>
        <p className="text-gray-400 mb-4">
          配列データからリストを生成します。Identifiableに準拠した型を使うのが基本です。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct Task: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool = false
    var priority: Int  // 1-3
}

struct TaskListView: View {
    @State private var tasks = [
        Task(title: "SwiftUIを学ぶ", priority: 1),
        Task(title: "ARCを理解する", priority: 2),
        Task(title: "テストを書く", priority: 2),
        Task(title: "アプリをリリースする", priority: 3),
    ]

    var body: some View {
        NavigationStack {
            List($tasks) { $task in
                HStack {
                    Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                        .foregroundColor(task.isCompleted ? .green : .secondary)
                        .onTapGesture { task.isCompleted.toggle() }

                    Text(task.title)
                        .strikethrough(task.isCompleted)
                        .foregroundColor(task.isCompleted ? .secondary : .primary)

                    Spacer()

                    // 優先度バッジ
                    Text(["", "高", "中", "低"][task.priority])
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 2)
                        .background(
                            [Color.clear, .red, .orange, .green][task.priority].opacity(0.2)
                        )
                        .cornerRadius(8)
                }
            }
            .navigationTitle("タスク")
        }
    }
}`}
          expectedOutput={`// Listがタスクの配列を表示
// $tasksでBindingを使ってisCompletedをトグル
// チェックマークで完了状態を視覚的に表示`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ForEachとスワイプ削除</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">ForEach</code>に<code className="text-blue-300">.onDelete</code>を付けると
          スワイプ削除が有効になります。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct Note: Identifiable {
    let id = UUID()
    var content: String
    var date: Date = Date()
}

struct NotesView: View {
    @State private var notes: [Note] = [
        Note(content: "SwiftUIは宣言的UIフレームワーク"),
        Note(content: "@StateでView内状態を管理"),
        Note(content: "@Bindingで親子間をつなぐ"),
    ]
    @State private var newNoteText = ""

    var body: some View {
        NavigationStack {
            VStack {
                // 新規追加
                HStack {
                    TextField("新しいメモ", text: $newNoteText)
                        .textFieldStyle(.roundedBorder)
                    Button("追加") {
                        guard !newNoteText.isEmpty else { return }
                        notes.insert(Note(content: newNoteText), at: 0)
                        newNoteText = ""
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()

                List {
                    ForEach(notes) { note in
                        VStack(alignment: .leading, spacing: 4) {
                            Text(note.content)
                            Text(note.date.formatted(date: .abbreviated, time: .shortened))
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .onDelete { indexSet in
                        notes.remove(atOffsets: indexSet)
                    }
                    .onMove { from, to in
                        notes.move(fromOffsets: from, toOffset: to)
                    }
                }
                .listStyle(.plain)
            }
            .navigationTitle("メモ (\\(notes.count))")
            .toolbar {
                EditButton()
            }
        }
    }
}`}
          expectedOutput={`// .onDeleteでスワイプ削除が有効になる
// .onMoveで並び替えが有効になる
// EditButtonで編集モードをトグル`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="lists" />
      </div>
      <LessonNav lessons={lessons} currentId="lists" basePath="/learn/swiftui" />
    </div>
  );
}
