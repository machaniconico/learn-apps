import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "protocols")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swiftでプロトコルを定義するキーワードはどれですか？",
    options: ["interface", "protocol", "trait", "abstract"],
    answer: 1,
    explanation: "Swiftでは protocol キーワードを使ってプロトコルを定義します。",
  },
  {
    question: "プロトコルにデフォルト実装を追加する方法はどれですか？",
    options: [
      "protocolのbodyに直接実装する",
      "extensionを使ってデフォルト実装を追加する",
      "classキーワードと組み合わせる",
      "defaultキーワードを使う",
    ],
    answer: 1,
    explanation: "プロトコルのextensionを使うことでデフォルト実装を追加できます。これをプロトコル拡張と呼びます。",
  },
  {
    question: "Swift 5.7以降でプロトコルを存在型として使う際に必要なキーワードはどれですか？",
    options: ["some", "any", "opaque", "existential"],
    answer: 1,
    explanation: "Swift 5.7以降では any キーワードを使って存在型（existential type）を明示的に表現します。",
  },
  {
    question: "associatedtype の目的は何ですか？",
    options: [
      "プロトコルに具体的な型を指定する",
      "プロトコルで使う型をプレースホルダーとして定義する",
      "プロトコルを継承する",
      "デリゲートを定義する",
    ],
    answer: 1,
    explanation: "associatedtype はプロトコル内で使うプレースホルダー型を定義し、準拠する型が具体的な型を指定します。",
  },
];

export default function ProtocolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">プロトコル</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">{lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          プロトコルはSwiftにおける型の設計図です。メソッド・プロパティの要件を定義し、
          構造体・クラス・列挙型が準拠することで多態性を実現します。
          プロトコル拡張によるデフォルト実装、デリゲートパターン、関連型、存在型まで幅広く学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="protocols" totalLessons={lessons.length} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{lessons.length}レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/protocols" color="teal" categoryId="protocols" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例</h2>
        <SwiftEditor
          defaultCode={`protocol Greetable {
    var name: String { get }
    func greet() -> String
}

// プロトコル拡張でデフォルト実装
extension Greetable {
    func greet() -> String {
        return "こんにちは、\\(name)さん！"
    }
}

struct Person: Greetable {
    var name: String
}

struct Robot: Greetable {
    var name: String
    func greet() -> String {
        return "HELLO, \\(name.uppercased())."
    }
}

let person = Person(name: "太郎")
let robot = Robot(name: "R2D2")

print(person.greet())
print(robot.greet())

// 存在型
let items: [any Greetable] = [person, robot]
for item in items {
    print(item.greet())
}`}
          expectedOutput={`こんにちは、太郎さん！
HELLO, R2D2.
こんにちは、太郎さん！
HELLO, R2D2.`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
