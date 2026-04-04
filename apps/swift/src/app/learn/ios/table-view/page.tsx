import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function TableViewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">iOS開発基礎</span>
        <h1 className="text-3xl font-bold text-gray-100">UITableView</h1>
        <p className="text-gray-400">UITableViewDataSource とセルの実装を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          UITableView はスクロール可能なリスト表示に使われる最も重要なUIKitコンポーネントです。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">UITableViewDataSource</code> でデータを提供し、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">UITableViewDelegate</code> でインタラクションを処理します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import UIKit

struct Todo {
    let title: String
    let isCompleted: Bool
}

class TodoListViewController: UIViewController {

    private let tableView = UITableView(frame: .zero, style: .insetGrouped)

    private var todos: [Todo] = [
        Todo(title: "UIKitを学ぶ", isCompleted: true),
        Todo(title: "Auto Layoutをマスターする", isCompleted: false),
        Todo(title: "カスタムセルを作る", isCompleted: false),
        Todo(title: "Core Dataを学ぶ", isCompleted: false),
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Todo リスト"
        setupTableView()
    }

    private func setupTableView() {
        tableView.dataSource = self
        tableView.delegate = self
        // セルの登録（Storyboard 不要）
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "TodoCell")
        tableView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tableView)

        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])
    }
}

// MARK: - UITableViewDataSource
extension TodoListViewController: UITableViewDataSource {

    func tableView(_ tableView: UITableView,
                   numberOfRowsInSection section: Int) -> Int {
        todos.count
    }

    func tableView(_ tableView: UITableView,
                   cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            withIdentifier: "TodoCell", for: indexPath)
        let todo = todos[indexPath.row]

        var config = cell.defaultContentConfiguration()
        config.text = todo.title
        config.image = UIImage(systemName: todo.isCompleted ? "checkmark.circle.fill" : "circle")
        cell.contentConfiguration = config
        return cell
    }
}

// MARK: - UITableViewDelegate
extension TodoListViewController: UITableViewDelegate {

    func tableView(_ tableView: UITableView,
                   didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        print("Selected: \\(todos[indexPath.row].title)")
    }
}`}
        height="480px"
        expectedOutput="UITableView + DataSource + Delegate のパターン例です。"
      />

      <SwiftEditor
        defaultCode={`import UIKit

// カスタムセルの作成
class ArticleCell: UITableViewCell {

    static let identifier = "ArticleCell"

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 16, weight: .semibold)
        label.numberOfLines = 2
        return label
    }()

    private let dateLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 12)
        label.textColor = .secondaryLabel
        return label
    }()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupLayout()
    }

    required init?(coder: NSCoder) { fatalError() }

    private func setupLayout() {
        let stack = UIStackView(arrangedSubviews: [titleLabel, dateLabel])
        stack.axis = .vertical
        stack.spacing = 4
        stack.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(stack)
        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 12),
            stack.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            stack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),
            stack.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -12),
        ])
    }

    func configure(title: String, date: String) {
        titleLabel.text = title
        dateLabel.text = date
        print("Cell configured: \\(title)")
    }
}

let cell = ArticleCell(style: .default, reuseIdentifier: ArticleCell.identifier)
cell.configure(title: "Swift 6の新機能", date: "2026年4月")`}
        height="380px"
        expectedOutput="Cell configured: Swift 6の新機能"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ios" lessonId="table-view" />
      </div>
      <LessonNav lessons={lessons} currentId="table-view" basePath="/learn/ios" />
    </div>
  );
}
