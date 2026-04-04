import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function DelegationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デリゲートパターン</h1>
        <p className="text-gray-400">delegateプロパティを使って処理を別のオブジェクトに委譲するパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デリゲートパターンとは</h2>
        <p className="text-gray-300 mb-3">
          デリゲートパターンはある型が自分の仕事の一部を別の型に委譲（デリゲート）する設計パターンです。
          UIKitでは <code className="text-teal-300">UITableViewDelegate</code> などで広く使われています。
          プロトコルを使うことで疎結合な設計が実現できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>デリゲートプロトコルを定義してメソッド要件を宣言する</li>
          <li>委譲する型が <code className="text-teal-300">weak var delegate: MyDelegate?</code> を持つ</li>
          <li>循環参照を防ぐため通常 weak 参照にする</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ダウンロードデリゲート</h2>
        <SwiftEditor
          defaultCode={`protocol DownloadDelegate: AnyObject {
    func downloadDidFinish(url: String)
    func downloadDidFail(url: String, error: String)
}

class Downloader {
    weak var delegate: DownloadDelegate?

    func download(url: String) {
        // シミュレーション
        if url.hasPrefix("https") {
            delegate?.downloadDidFinish(url: url)
        } else {
            delegate?.downloadDidFail(url: url, error: "HTTPSが必要です")
        }
    }
}

class ViewController: DownloadDelegate {
    func downloadDidFinish(url: String) {
        print("完了: \\(url)")
    }
    func downloadDidFail(url: String, error: String) {
        print("失敗: \\(url) - \\(error)")
    }
}

let vc = ViewController()
let dl = Downloader()
dl.delegate = vc
dl.download(url: "https://example.com/file.zip")
dl.download(url: "http://insecure.com/data")`}
          expectedOutput={`完了: https://example.com/file.zip
失敗: http://insecure.com/data - HTTPSが必要です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: オプショナルデリゲートメソッド</h2>
        <SwiftEditor
          defaultCode={`protocol TimerDelegate: AnyObject {
    func timerDidTick(seconds: Int)
    func timerDidFinish()
}

// デフォルト実装で任意メソッドを実現
extension TimerDelegate {
    func timerDidTick(seconds: Int) {}
}

class CountdownTimer {
    weak var delegate: TimerDelegate?
    var seconds: Int

    init(seconds: Int) { self.seconds = seconds }

    func start() {
        for i in stride(from: seconds, through: 1, by: -1) {
            delegate?.timerDidTick(seconds: i)
        }
        delegate?.timerDidFinish()
    }
}

class MyTimer: TimerDelegate {
    // timerDidTick は省略（デフォルト実装を使用）
    func timerDidFinish() {
        print("タイマー終了！")
    }
}

let timer = CountdownTimer(seconds: 3)
timer.delegate = MyTimer()
timer.start()`}
          expectedOutput={`タイマー終了！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="delegation" />
      </div>
      <LessonNav lessons={lessons} currentId="delegation" basePath="/learn/protocols" />
    </div>
  );
}
