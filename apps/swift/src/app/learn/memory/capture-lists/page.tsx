import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function CaptureListsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">キャプチャリスト</h1>
        <p className="text-gray-400">[weak self]と[unowned self]を使ったクロージャの安全なキャプチャ方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">キャプチャリストとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クロージャはデフォルトで外部の変数をstrongキャプチャします。
          <code className="text-pink-300">キャプチャリスト</code>（<code className="text-pink-300">[weak self]</code>や
          <code className="text-pink-300">[unowned self]</code>）を使うと、キャプチャ方法を明示的に指定できます。
          これによりクロージャによる循環参照を防ぎます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">[weak self]</code>: selfがnilになる可能性がある場合（オプショナルになる）</li>
          <li><code className="text-pink-300">[unowned self]</code>: selfがクロージャより長生きすることが保証される場合</li>
          <li>非同期処理、デリゲート、タイマーなどでよく使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">[weak self]の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">[weak self]</code>を使うとself はオプショナルになります。
          guard let self = self でアンラップするのが一般的なパターンです。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

class ViewController {
    var title = "ホーム"
    var timer: Timer?

    func startTimer() {
        // [weak self]でキャプチャ
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            // selfはオプショナルなのでguard letでアンラップ
            guard let self = self else {
                print("ViewControllerは解放済み")
                return
            }
            print("タイマー動作中: \\(self.title)")
        }
    }

    deinit {
        timer?.invalidate()
        print("ViewController 解放")
    }
}

var vc: ViewController? = ViewController()
vc?.startTimer()

// 1秒後にvcを解放しても安全
DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
    vc = nil  // weakなのでクロージャ内でnilチェックされる
}`}
          expectedOutput={`// [weak self]パターン:
// guard let self = self else { return }
// selfがnilの場合は早期リターンして安全に処理を終了する`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">[unowned self]の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">[unowned self]</code>はselfがクロージャより長生きすることが確実な場合に使います。
          Optional操作が不要でコードがシンプルになります。
        </p>
        <SwiftEditor
          defaultCode={`class DataLoader {
    let endpoint: String
    var onComplete: ((String) -> Void)?

    init(endpoint: String) {
        self.endpoint = endpoint
        // initの中でselfへの参照を設定
        // DataLoaderはonCompleteより長生きするのでunowned
        self.onComplete = { [unowned self] data in
            print("\\(self.endpoint) からデータ受信: \\(data)")
            self.process(data: data)
        }
    }

    func process(data: String) {
        print("処理完了: \\(data.uppercased())")
    }

    func load() {
        // 模擬的にコールバック呼び出し
        onComplete?("response_data")
    }

    deinit { print("DataLoader 解放: \\(endpoint)") }
}

let loader = DataLoader(endpoint: "https://api.example.com/users")
loader.load()`}
          expectedOutput={`https://api.example.com/users からデータ受信: response_data
処理完了: RESPONSE_DATA`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">weak vs unowned の選び方</h2>
        <p className="text-gray-400 mb-4">
          使い分けの基準を実際のコードで確認します。
        </p>
        <SwiftEditor
          defaultCode={`class ImageDownloader {
    var url: String

    init(url: String) { self.url = url }

    // 非同期処理：完了時にselfが解放されている可能性がある → weak
    func downloadAsync(completion: @escaping (Data?) -> Void) {
        DispatchQueue.global().async { [weak self] in
            guard let self = self else { return }
            print("ダウンロード: \\(self.url)")
            completion(Data())
        }
    }

    // 同期的なコールバック：selfは必ず存在する → unowned も可
    func transform(data: Data, using block: (ImageDownloader, Data) -> Data) -> Data {
        return block(self, data)
    }

    deinit { print("ImageDownloader 解放") }
}

var downloader: ImageDownloader? = ImageDownloader(url: "https://example.com/image.png")

downloader?.downloadAsync { data in
    print("ダウンロード完了:", data != nil ? "成功" : "失敗")
}

// weakを使っているので安全にnilにできる
downloader = nil`}
          expectedOutput={`ダウンロード: https://example.com/image.png
ImageDownloader 解放
ダウンロード完了: 成功`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="capture-lists" />
      </div>
      <LessonNav lessons={lessons} currentId="capture-lists" basePath="/learn/memory" />
    </div>
  );
}
