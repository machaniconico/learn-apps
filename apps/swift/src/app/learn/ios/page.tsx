import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "ios")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "UIViewController のライフサイクルで、ビューが画面に表示される直前に呼ばれるメソッドはどれですか？",
    options: ["viewDidLoad()", "viewWillAppear(_:)", "viewDidAppear(_:)", "viewWillLayoutSubviews()"],
    answer: 1,
    explanation: "viewWillAppear(_:) はビューが画面に表示される直前に呼ばれます。viewDidLoad() はビューがメモリに読み込まれた後に一度だけ呼ばれます。",
  },
  {
    question: "Auto Layout でビューの上端を親ビューの上端に揃えるアンカーはどれですか？",
    options: [
      "view.topAnchor.constraint(equalTo: view.superview!.topAnchor)",
      "view.top.constraint(equalTo: parent.top)",
      "NSLayoutConstraint.top(view, to: superview)",
      "view.setTopConstraint(parent)",
    ],
    answer: 0,
    explanation: "NSLayoutAnchor を使った view.topAnchor.constraint(equalTo:) が正しい記述です。",
  },
  {
    question: "UITableView でセルを再利用するメソッドはどれですか？",
    options: [
      "tableView.newCell(withIdentifier:)",
      "tableView.dequeueReusableCell(withIdentifier:for:)",
      "UITableViewCell.create()",
      "tableView.cellForRow(at:)",
    ],
    answer: 1,
    explanation: "dequeueReusableCell(withIdentifier:for:) でセルを再利用します。これによりメモリ効率が向上します。",
  },
];

export default function IOSPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-blue-400">{category.name}</h1>
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-sm text-gray-500">{category.lessons.length} レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          iOSアプリ開発の基礎を学びましょう。アプリのライフサイクル、UIKit の基本、
          Storyboard や Auto Layout によるUI構築、UITableView によるリスト表示、
          UINavigationController による画面遷移、Core Data によるデータ永続化まで幅広くカバーします。
        </p>
        <ProgressBar categoryId="ios" totalLessons={category.lessons.length} color="blue" />
      </div>

      {/* Lesson List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
        <LessonList lessons={category.lessons} basePath="/learn/ios" color="blue" categoryId="ios" />
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">UIViewController の基本</h3>
          <SwiftEditor
            defaultCode={`import UIKit

class MyViewController: UIViewController {

    private let label = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground

        label.text = "Hello, UIKit!"
        label.font = .systemFont(ofSize: 24, weight: .bold)
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)

        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor),
        ])
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        print("View will appear")
    }
}`}
            height="300px"
            expectedOutput="View will appear"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">UITableView の実装</h3>
          <SwiftEditor
            defaultCode={`import UIKit

class FruitTableViewController: UITableViewController {

    let fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Fruits"
        tableView.register(UITableViewCell.self,
                           forCellReuseIdentifier: "Cell")
    }

    override func tableView(_ tableView: UITableView,
                            numberOfRowsInSection section: Int) -> Int {
        return fruits.count
    }

    override func tableView(_ tableView: UITableView,
                            cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            withIdentifier: "Cell", for: indexPath)
        cell.textLabel?.text = fruits[indexPath.row]
        return cell
    }
}`}
            height="300px"
            expectedOutput="UITableViewController でリストを表示するコード例です。"
          />
        </div>
      </section>

      {/* Quiz */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-2">確認クイズ</h2>
        <Quiz questions={quizQuestions} color="blue" />
      </section>
    </div>
  );
}
