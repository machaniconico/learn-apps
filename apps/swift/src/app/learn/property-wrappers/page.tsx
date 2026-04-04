import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "property-wrappers")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Property Wrapperを定義するアトリビュートは？",
    options: ["@wrapper", "@propertyWrapper", "@property", "@wrapProperty"],
    answer: 1,
    explanation: "@propertyWrapperアトリビュートを付けた構造体・クラス・列挙型がProperty Wrapperになります。",
  },
  {
    question: "Property Wrapperで必須のプロパティは？",
    options: ["projectedValue", "wrappedValue", "defaultValue", "storedValue"],
    answer: 1,
    explanation: "wrappedValueは必須プロパティで、Wrapperが管理する値そのものを表します。",
  },
  {
    question: "$記号でアクセスできる値は？",
    options: ["wrappedValue", "projectedValue", "defaultValue", "bindingValue"],
    answer: 1,
    explanation: "projectedValueは$プレフィックスでアクセスでき、@Stateでは@BindingなどBindingを返します。",
  },
  {
    question: "@AppStorageはどのストレージを使いますか？",
    options: ["CoreData", "Keychain", "UserDefaults", "FileSystem"],
    answer: 2,
    explanation: "@AppStorageはUserDefaultsと連携し、アプリを再起動しても値が永続化されます。",
  },
];

export default function PropertyWrappersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">{category.name}</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-gray-500 text-sm">{category.lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Property Wrapperはプロパティのget/setに共通ロジックを付与する仕組みです。
          @propertyWrapperアトリビュート、wrappedValue/projectedValue、
          @Stateの内部動作、カスタムWrapper、@Environment、@AppStorageを学びましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="property-wrappers" totalLessons={category.lessons.length} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{category.lessons.length}レッスン</h2>
        <LessonList lessons={category.lessons} basePath="/learn/property-wrappers" color="violet" categoryId="property-wrappers" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Property Wrapperの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">@propertyWrapper</code>を使うと、プロパティへのアクセスに
          共通処理（バリデーション・変換・ログ等）を自動的に付加できます。
        </p>
        <SwiftEditor
          defaultCode={`@propertyWrapper
struct Clamped {
    private var value: Int
    private let range: ClosedRange<Int>

    var wrappedValue: Int {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }

    init(wrappedValue: Int, _ range: ClosedRange<Int>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Settings {
    @Clamped(0...100) var volume: Int = 50
    @Clamped(1...10) var brightness: Int = 5
}

var settings = Settings()
print("音量:", settings.volume)    // 50

settings.volume = 120  // 100に丸められる
print("音量:", settings.volume)    // 100

settings.brightness = -5  // 1に丸められる
print("輝度:", settings.brightness) // 1`}
          expectedOutput={`音量: 50
音量: 100
輝度: 1`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">projectedValue ($記法)</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">projectedValue</code>を定義すると、
          <code className="text-violet-300">$プロパティ名</code>で追加情報にアクセスできます。
        </p>
        <SwiftEditor
          defaultCode={`@propertyWrapper
struct Validated {
    private var value: String = ""

    var wrappedValue: String {
        get { value }
        set { value = newValue }
    }

    // $記法でバリデーション結果にアクセス
    var projectedValue: Bool {
        !value.isEmpty && value.count >= 3
    }

    init(wrappedValue: String) {
        self.value = wrappedValue
    }
}

struct Form {
    @Validated var username: String = ""
    @Validated var email: String = ""
}

var form = Form()
form.username = "田"
print("ユーザー名有効:", form.$username) // false

form.username = "田中太郎"
print("ユーザー名有効:", form.$username) // true`}
          expectedOutput={`ユーザー名有効: false
ユーザー名有効: true`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
