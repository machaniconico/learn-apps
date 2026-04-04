import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function StoryboardPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">iOS開発基礎</span>
        <h1 className="text-3xl font-bold text-gray-100">Storyboard</h1>
        <p className="text-gray-400">Storyboard / XIB による UI 構築を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Storyboard は Xcode のビジュアルエディタで画面遷移を含む UI を設計するファイルです。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">IBOutlet</code> で UI要素をコードに接続し、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">IBAction</code> でイベントハンドラを接続します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import UIKit

// Storyboard から ViewController を使う
class LoginViewController: UIViewController {

    // @IBOutlet: Storyboard のUI要素と接続
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }

    private func setupUI() {
        passwordTextField.isSecureTextEntry = true
        loginButton.layer.cornerRadius = 8
        activityIndicator.hidesWhenStopped = true
    }

    // @IBAction: Storyboard のボタンタップと接続
    @IBAction func loginButtonTapped(_ sender: UIButton) {
        guard
            let email = emailTextField.text, !email.isEmpty,
            let password = passwordTextField.text, !password.isEmpty
        else {
            showAlert(message: "メールアドレスとパスワードを入力してください")
            return
        }
        performLogin(email: email, password: password)
    }

    private func performLogin(email: String, password: String) {
        activityIndicator.startAnimating()
        loginButton.isEnabled = false

        // 非同期処理のシミュレーション
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { [weak self] in
            self?.activityIndicator.stopAnimating()
            self?.loginButton.isEnabled = true
            print("Login: \\(email)")
        }
    }

    private func showAlert(message: String) {
        let alert = UIAlertController(title: "エラー", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}`}
        height="400px"
        expectedOutput="Storyboard + IBOutlet/IBAction のパターン例です。"
      />

      <SwiftEditor
        defaultCode={`import UIKit

// Segue による画面遷移
class ListViewController: UIViewController {

    // perform(segue:sender:) で画面遷移
    func showDetail(for item: String) {
        performSegue(withIdentifier: "ShowDetail", sender: item)
    }

    // 遷移前にデータを渡す
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ShowDetail",
           let detailVC = segue.destination as? DetailViewController,
           let item = sender as? String {
            detailVC.itemName = item
        }
    }
}

class DetailViewController: UIViewController {
    var itemName: String?

    @IBOutlet weak var titleLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
        titleLabel?.text = itemName
        print("Showing detail for: \\(itemName ?? "unknown")")
    }
}

// XIB からカスタムビューを読み込む
class CustomHeaderView: UIView {
    static func loadFromNib() -> CustomHeaderView {
        let nib = UINib(nibName: "CustomHeaderView", bundle: nil)
        return nib.instantiate(withOwner: nil, options: nil).first as! CustomHeaderView
    }

    @IBOutlet weak var titleLabel: UILabel!
}

print("Storyboard と Segue のパターン例です")`}
        height="320px"
        expectedOutput="Storyboard と Segue のパターン例です"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ios" lessonId="storyboard" />
      </div>
      <LessonNav lessons={lessons} currentId="storyboard" basePath="/learn/ios" />
    </div>
  );
}
