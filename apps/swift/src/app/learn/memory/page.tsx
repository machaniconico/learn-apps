import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "memory")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "ARCとは何の略ですか？",
    options: ["Automatic Retain Count", "Automatic Reference Counting", "Advanced Reference Control", "Automatic Resource Cleanup"],
    answer: 1,
    explanation: "ARCはAutomatic Reference Countingの略で、Swiftが自動的にメモリを管理する仕組みです。",
  },
  {
    question: "循環参照を防ぐために使用するキーワードはどれですか？",
    options: ["strong", "weak または unowned", "final", "lazy"],
    answer: 1,
    explanation: "weakまたはunowned参照を使うことで参照カウントを増やさず、循環参照を防ぐことができます。",
  },
  {
    question: "weak参照の型はどうなりますか？",
    options: ["通常の型（Int等）", "オプショナル型（Int?等）", "非オプショナル型", "Any型"],
    answer: 1,
    explanation: "weak参照は参照先が解放されると自動的にnilになるため、常にオプショナル型になります。",
  },
  {
    question: "structとclassのメモリ管理の違いは？",
    options: ["structはARC管理、classはスタック", "structはスタック（値型）、classはARC管理（参照型）", "両方ともARCで管理される", "両方ともスタックで管理される"],
    answer: 1,
    explanation: "structは値型でスタックにコピーされ、classは参照型でヒープに確保されARCで管理されます。",
  },
];

export default function MemoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">{category.name}</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-gray-500 text-sm">{category.lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          SwiftのメモリはARCによって自動管理されます。strong・weak・unowned参照の違いを理解し、
          循環参照の原因と解決策、クロージャでのキャプチャリストの使い方、
          値型（struct）と参照型（class）の挙動の違いを学びましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="memory" totalLessons={category.lessons.length} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{category.lessons.length}レッスン</h2>
        <LessonList lessons={category.lessons} basePath="/learn/memory" color="pink" categoryId="memory" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ARCの基本動作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">ARC</code>は参照カウントが0になったときにメモリを解放します。
          インスタンスへの参照が増えるとカウントが上がり、参照がなくなると自動解放されます。
        </p>
        <SwiftEditor
          defaultCode={`class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\\(name) が初期化されました")
    }
    deinit {
        print("\\(name) が解放されました")
    }
}

// 参照カウント: 1
var reference1: Person? = Person(name: "田中")

// 参照カウント: 2
var reference2: Person? = reference1

// 参照カウント: 1
reference1 = nil

// 参照カウント: 0 → 解放
reference2 = nil`}
          expectedOutput={`田中 が初期化されました
田中 が解放されました`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">weak参照とunowned参照</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">weak</code>はオプショナル型で参照先が解放されるとnilになります。
          <code className="text-pink-300">unowned</code>は非オプショナルで参照先が常に存在する前提です。
        </p>
        <SwiftEditor
          defaultCode={`class Owner {
    let name: String
    var pet: Pet?
    init(name: String) { self.name = name }
    deinit { print("\\(name) 解放") }
}

class Pet {
    let name: String
    // weakで循環参照を防ぐ
    weak var owner: Owner?
    init(name: String) { self.name = name }
    deinit { print("\\(name) 解放") }
}

var owner: Owner? = Owner(name: "田中")
var pet: Pet? = Pet(name: "ポチ")

owner?.pet = pet
pet?.owner = owner

owner = nil  // owner解放
pet = nil    // pet解放`}
          expectedOutput={`田中 解放
ポチ 解放`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
