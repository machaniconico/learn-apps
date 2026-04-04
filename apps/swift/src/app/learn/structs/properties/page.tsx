import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function StructPropertiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロパティ</h1>
        <p className="text-gray-400">ストアドプロパティの定義と、varとletによる変更可否を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ストアドプロパティとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストアドプロパティ（格納プロパティ）は、構造体のインスタンスが実際に値を保持するプロパティです。
          <code className="text-orange-300">var</code>で宣言すると変更可能、<code className="text-orange-300">let</code>で宣言すると変更不可（定数）になります。
          初期値を宣言時に設定することも、イニシャライザで設定することもできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">var name: String</code> — 変更可能なプロパティ</li>
          <li><code className="text-orange-300">let id: Int</code> — 変更不可のプロパティ（定数）</li>
          <li><code className="text-orange-300">var score: Int = 0</code> — デフォルト値付きプロパティ</li>
          <li>構造体を<code className="text-orange-300">let</code>で宣言すると、<code className="text-orange-300">var</code>プロパティも変更不可になる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値とオプショナル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティには宣言時にデフォルト値を設定できます。デフォルト値があるプロパティは、メンバーワイズイニシャライザで省略できます。
          また、値がない場合を許容するには<code className="text-orange-300">?</code>を付けてオプショナル型にします。オプショナルプロパティの初期値は自動的に<code className="text-orange-300">nil</code>になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">var count: Int = 0</code> — デフォルト値0</li>
          <li><code className="text-orange-300">var nickname: String?</code> — nilが初期値のオプショナル</li>
          <li>デフォルト値があるプロパティはメンバーワイズ初期化で省略可能</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">letインスタンスのプロパティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体が値型であるため、インスタンスを<code className="text-orange-300">let</code>で宣言した場合、たとえ<code className="text-orange-300">var</code>プロパティであっても変更できません。
          これは値型の重要な特性で、クラスと異なる点です。プロパティを変更するには<code className="text-orange-300">var</code>でインスタンスを宣言する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">let s = Student(...)</code> → プロパティ変更不可</li>
          <li><code className="text-orange-300">var s = Student(...)</code> → varプロパティ変更可能</li>
          <li>クラスでは<code className="text-orange-300">let</code>宣言でもvarプロパティは変更可能（参照型）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: varとletプロパティ</h2>
        <SwiftEditor
          defaultCode={`struct Student {
    let id: Int          // 変更不可
    var name: String     // 変更可能
    var grade: Int       // 変更可能
}

var student = Student(id: 1001, name: "田中太郎", grade: 2)
print("ID: \\(student.id)")
print("名前: \\(student.name)")
print("学年: \\(student.grade)年生")

// varプロパティは変更可能
student.name = "田中一郎"
student.grade = 3
print("--- 更新後 ---")
print("名前: \\(student.name)")
print("学年: \\(student.grade)年生")

// letプロパティは変更不可
// student.id = 1002  // エラー: Cannot assign to property: 'id' is a 'let' constant`}
          expectedOutput={`ID: 1001
名前: 田中太郎
学年: 2年生
--- 更新後 ---
名前: 田中一郎
学年: 3年生`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: デフォルト値とオプショナルプロパティ</h2>
        <SwiftEditor
          defaultCode={`struct UserProfile {
    var username: String
    var email: String
    var bio: String?         // オプショナル（デフォルトnil）
    var followersCount: Int = 0   // デフォルト値0
    var isVerified: Bool = false  // デフォルト値false
}

// 必須プロパティのみ指定（デフォルト値があるものは省略可）
var user1 = UserProfile(username: "swift_dev", email: "dev@example.com")
print("\\(user1.username) フォロワー: \\(user1.followersCount)")
print("認証済み: \\(user1.isVerified)")
print("bio: \\(user1.bio ?? "未設定")")

// すべて指定
var user2 = UserProfile(
    username: "apple_fan",
    email: "fan@example.com",
    bio: "Swiftが大好きです",
    followersCount: 1500,
    isVerified: true
)
print("")
print("\\(user2.username) フォロワー: \\(user2.followersCount)")
print("bio: \\(user2.bio ?? "未設定")")`}
          expectedOutput={`swift_dev フォロワー: 0
認証済み: false
bio: 未設定

apple_fan フォロワー: 1500
bio: Swiftが大好きです`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: letインスタンスとvarインスタンスの違い</h2>
        <SwiftEditor
          defaultCode={`struct Counter {
    var count: Int = 0
    var label: String
}

// varインスタンス: プロパティ変更可能
var mutableCounter = Counter(label: "可変カウンター")
mutableCounter.count = 5
mutableCounter.label = "更新済み"
print("\\(mutableCounter.label): \\(mutableCounter.count)")

// letインスタンス: プロパティ変更不可（値型の特性）
let fixedCounter = Counter(label: "固定カウンター")
print("\\(fixedCounter.label): \\(fixedCounter.count)")
// fixedCounter.count = 10  // エラー: Cannot assign to property: 'fixedCounter' is a 'let' constant

// 再代入も不可
// fixedCounter = Counter(label: "新しい")  // エラー
print("letインスタンスはプロパティを変更できません")`}
          expectedOutput={`更新済み: 5
固定カウンター: 0
letインスタンスはプロパティを変更できません`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="properties" />
      </div>
      <LessonNav lessons={lessons} currentId="properties" basePath="/learn/structs" />
    </div>
  );
}
