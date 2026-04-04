import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function PropertyObserversPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロパティオブザーバ</h1>
        <p className="text-gray-400">willSetとdidSetを使ってプロパティの変更を監視する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロパティオブザーバとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティオブザーバは、ストアドプロパティの値が変更される<strong className="text-white">直前</strong>と<strong className="text-white">直後</strong>に処理を実行できる仕組みです。
          <code className="text-orange-300">willSet</code>は変更直前、<code className="text-orange-300">didSet</code>は変更直後に呼ばれます。
          バリデーション、ログ記録、UI更新トリガーなどに活用できます。
          両方定義することも、どちらか一方だけ定義することもできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">willSet &#123; &#125;</code> — 変更直前に呼ばれる</li>
          <li><code className="text-orange-300">didSet &#123; &#125;</code> — 変更直後に呼ばれる</li>
          <li><code className="text-orange-300">willSet</code>内では<code className="text-orange-300">newValue</code>（新しい値）が使える</li>
          <li><code className="text-orange-300">didSet</code>内では<code className="text-orange-300">oldValue</code>（古い値）が使える</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">willSetとdidSetの詳細</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">willSet</code>では、これから設定される新しい値が<code className="text-orange-300">newValue</code>として暗黙的に提供されます。
          <code className="text-orange-300">didSet</code>では、変更前の古い値が<code className="text-orange-300">oldValue</code>として提供されます。
          カスタム名を使いたい場合は<code className="text-orange-300">willSet(customName)</code>や<code className="text-orange-300">didSet(customName)</code>と書けます。
          <code className="text-orange-300">didSet</code>内でプロパティに代入することも可能で、範囲制限などに使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">willSet(newTemp)</code> — カスタム名で新しい値を受け取る</li>
          <li><code className="text-orange-300">didSet(oldTemp)</code> — カスタム名で古い値を受け取る</li>
          <li><code className="text-orange-300">didSet</code>内でプロパティを再設定してもオブザーバは再帰呼び出しされない</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オブザーバが呼ばれるタイミング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティオブザーバはプロパティの値が変更されるたびに呼び出されます。
          ただし、イニシャライザによる初期化時には呼ばれません。
          また、同じ値を再代入しても呼ばれます。
          <code className="text-orange-300">didSet</code>でプロパティを再設定した場合、無限ループは発生しません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>初期化時（<code className="text-orange-300">init</code>）: 呼ばれない</li>
          <li>代入時: 必ず呼ばれる（同じ値でも）</li>
          <li><code className="text-orange-300">didSet</code>内での再代入: オブザーバ再帰なし</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: willSetとdidSetの基本</h2>
        <SwiftEditor
          defaultCode={`struct StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            print("歩数を \\(totalSteps) から \\(newValue) に変更しようとしています")
        }
        didSet {
            if totalSteps > oldValue {
                let added = totalSteps - oldValue
                print("\\(added)歩追加! 合計: \\(totalSteps)歩")
            }
        }
    }
}

var counter = StepCounter()
// initによる初期化ではオブザーバは呼ばれない

counter.totalSteps = 200
print("")
counter.totalSteps = 360
print("")
counter.totalSteps = 896`}
          expectedOutput={`歩数を 0 から 200 に変更しようとしています
200歩追加! 合計: 200歩

歩数を 200 から 360 に変更しようとしています
160歩追加! 合計: 360歩

歩数を 360 から 896 に変更しようとしています
536歩追加! 合計: 896歩`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: didSetによる値の制限</h2>
        <SwiftEditor
          defaultCode={`struct VolumeControl {
    var volume: Int = 50 {
        didSet {
            // 0〜100の範囲に制限
            if volume < 0 {
                volume = 0
                print("音量は0以上にする必要があります")
            } else if volume > 100 {
                volume = 100
                print("音量は100以下にする必要があります")
            }
            print("音量: \\(volume)")
        }
    }
}

var speaker = VolumeControl()
print("初期音量: \\(speaker.volume)")

speaker.volume = 70
speaker.volume = 120   // 上限を超える
speaker.volume = -10   // 下限を下回る
speaker.volume = 30`}
          expectedOutput={`初期音量: 50
音量: 70
音量は100以下にする必要があります
音量: 100
音量は0以上にする必要があります
音量: 0
音量: 30`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 実践的なプロパティオブザーバ</h2>
        <SwiftEditor
          defaultCode={`struct UserSettings {
    var username: String = "" {
        didSet {
            print("ユーザー名変更: \\(oldValue.isEmpty ? "(未設定)" : oldValue) → \\(username)")
        }
    }

    var isDarkMode: Bool = false {
        willSet {
            print("テーマ変更: \\(isDarkMode ? "ダーク" : "ライト") → \\(newValue ? "ダーク" : "ライト")")
        }
    }

    var fontSize: Int = 14 {
        didSet {
            let diff = fontSize - oldValue
            let direction = diff > 0 ? "大きく" : "小さく"
            print("フォントサイズ \\(abs(diff))pt \\(direction): \\(oldValue)pt → \\(fontSize)pt")
        }
    }
}

var settings = UserSettings()
settings.username = "swift_user"
print("")
settings.isDarkMode = true
print("")
settings.fontSize = 18
print("")
settings.fontSize = 12`}
          expectedOutput={`ユーザー名変更: (未設定) → swift_user

テーマ変更: ライト → ダーク

フォントサイズ 4pt 大きく: 14pt → 18pt

フォントサイズ 6pt 小さく: 18pt → 12pt`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="property-observers" />
      </div>
      <LessonNav lessons={lessons} currentId="property-observers" basePath="/learn/structs" />
    </div>
  );
}
