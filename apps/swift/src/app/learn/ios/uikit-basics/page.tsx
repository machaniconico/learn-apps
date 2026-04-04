import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function UIKitBasicsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">iOS開発基礎</span>
        <h1 className="text-3xl font-bold text-gray-100">UIKitの基本</h1>
        <p className="text-gray-400">UIViewController と View の階層を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          UIKit は iOS/iPadOS の伝統的な UI フレームワークです。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">UIViewController</code> が画面を管理し、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">UIView</code> とそのサブクラスが UI要素を描画します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import UIKit

// UIViewController の基本構造
class ProfileViewController: UIViewController {

    // UI要素をプロパティとして定義
    private let avatarImageView: UIImageView = {
        let iv = UIImageView()
        iv.contentMode = .scaleAspectFill
        iv.layer.cornerRadius = 50
        iv.clipsToBounds = true
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let nameLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 24, weight: .bold)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let followButton: UIButton = {
        var config = UIButton.Configuration.filled()
        config.title = "フォロー"
        config.cornerStyle = .capsule
        let button = UIButton(configuration: config)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupActions()
    }

    private func setupUI() {
        view.backgroundColor = .systemBackground
        view.addSubview(avatarImageView)
        view.addSubview(nameLabel)
        view.addSubview(followButton)
        nameLabel.text = "田中 太郎"
        setupConstraints()
    }

    private func setupActions() {
        followButton.addTarget(self, action: #selector(followTapped), for: .touchUpInside)
    }

    @objc private func followTapped() {
        print("フォローボタンが押されました")
    }

    private func setupConstraints() {
        NSLayoutConstraint.activate([
            avatarImageView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
            avatarImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            avatarImageView.widthAnchor.constraint(equalToConstant: 100),
            avatarImageView.heightAnchor.constraint(equalToConstant: 100),
        ])
    }
}`}
        height="440px"
        expectedOutput="UIViewController の基本構造の例です。Xcodeで実行してください。"
      />

      <SwiftEditor
        defaultCode={`import UIKit

// UIView のカスタムクラス
class RoundedCardView: UIView {

    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()

    var title: String? {
        didSet { titleLabel.text = title }
    }
    var subtitle: String? {
        didSet { subtitleLabel.text = subtitle }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        backgroundColor = .secondarySystemBackground
        layer.cornerRadius = 12
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOpacity = 0.1
        layer.shadowOffset = CGSize(width: 0, height: 2)
        layer.shadowRadius = 4

        titleLabel.font = .systemFont(ofSize: 17, weight: .semibold)
        subtitleLabel.font = .systemFont(ofSize: 14)
        subtitleLabel.textColor = .secondaryLabel

        let stack = UIStackView(arrangedSubviews: [titleLabel, subtitleLabel])
        stack.axis = .vertical
        stack.spacing = 4
        stack.translatesAutoresizingMaskIntoConstraints = false
        addSubview(stack)

        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: topAnchor, constant: 16),
            stack.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            stack.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -16),
        ])
    }
}

// 使用例
let card = RoundedCardView(frame: .zero)
card.title = "Swift UIKit"
card.subtitle = "カスタムビューの作成"
print("\\(card.title ?? "") - \\(card.subtitle ?? "")")`}
        height="400px"
        expectedOutput="Swift UIKit - カスタムビューの作成"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ios" lessonId="uikit-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="uikit-basics" basePath="/learn/ios" />
    </div>
  );
}
