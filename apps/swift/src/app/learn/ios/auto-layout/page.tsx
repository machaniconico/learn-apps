import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function AutoLayoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">iOS開発基礎</span>
        <h1 className="text-3xl font-bold text-gray-100">Auto Layout</h1>
        <p className="text-gray-400">NSLayoutConstraint とアンカーによるレイアウトを学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Auto Layout はビュー間の関係を制約（Constraint）で定義するレイアウトシステムです。
          コードで制約を設定する場合は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">translatesAutoresizingMaskIntoConstraints = false</code> を
          必ず設定します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import UIKit

class LayoutExampleViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let redView = UIView()
        redView.backgroundColor = .systemRed
        redView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(redView)

        let blueView = UIView()
        blueView.backgroundColor = .systemBlue
        blueView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(blueView)

        // NSLayoutAnchor を使った制約（推奨）
        NSLayoutConstraint.activate([
            // redView: 上部に配置、横幅フル、高さ200
            redView.topAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
            redView.leadingAnchor.constraint(
                equalTo: view.leadingAnchor, constant: 16),
            redView.trailingAnchor.constraint(
                equalTo: view.trailingAnchor, constant: -16),
            redView.heightAnchor.constraint(equalToConstant: 200),

            // blueView: redView の下に配置
            blueView.topAnchor.constraint(
                equalTo: redView.bottomAnchor, constant: 16),
            blueView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            blueView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.5),
            blueView.heightAnchor.constraint(equalTo: blueView.widthAnchor),
        ])

        print("Auto Layout constraints activated")
    }
}`}
        height="380px"
        expectedOutput="Auto Layout constraints activated"
      />

      <SwiftEditor
        defaultCode={`import UIKit

// UIStackView で簡単にレイアウト
class StackLayoutViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // 垂直スタックビュー
        let vStack = UIStackView()
        vStack.axis = .vertical
        vStack.spacing = 12
        vStack.alignment = .fill
        vStack.distribution = .fill
        vStack.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(vStack)

        // ボタンを追加
        let titles = ["プロフィール", "設定", "ヘルプ", "ログアウト"]
        for title in titles {
            var config = UIButton.Configuration.tinted()
            config.title = title
            let button = UIButton(configuration: config)
            button.heightAnchor.constraint(equalToConstant: 44).isActive = true
            vStack.addArrangedSubview(button)
        }

        NSLayoutConstraint.activate([
            vStack.topAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 24),
            vStack.leadingAnchor.constraint(
                equalTo: view.leadingAnchor, constant: 20),
            vStack.trailingAnchor.constraint(
                equalTo: view.trailingAnchor, constant: -20),
        ])

        print("Stack: \\(titles.count) buttons arranged")
    }
}

// NSLayoutConstraint の直接生成（低レベルAPI）
// NSLayoutConstraint(
//     item: childView,
//     attribute: .centerX,
//     relatedBy: .equal,
//     toItem: parentView,
//     attribute: .centerX,
//     multiplier: 1.0,
//     constant: 0
// ).isActive = true`}
        height="360px"
        expectedOutput="Stack: 4 buttons arranged"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ios" lessonId="auto-layout" />
      </div>
      <LessonNav lessons={lessons} currentId="auto-layout" basePath="/learn/ios" />
    </div>
  );
}
