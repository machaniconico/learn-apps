import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "optionals")!.lessons;

export default function OptionalBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Optional型 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Optionalの基本</h1>
        <p className="text-gray-400">nilの安全な扱い</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optional型とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwiftのOptional型は「値が存在するかもしれないし、存在しないかもしれない」という状態を型安全に表現する仕組みです。
          他の言語では<code className="text-pink-300">null</code>参照が原因でランタイムエラーが発生しやすいですが、
          Swiftでは<code className="text-pink-300">Optional</code>を使うことでコンパイル時に<code className="text-pink-300">nil</code>の可能性を明示し、安全に扱えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">String?</code> — nilまたはString値を持つOptional型</li>
          <li><code className="text-pink-300">Int?</code> — nilまたはInt値を持つOptional型</li>
          <li><code className="text-pink-300">nil</code> — 値が存在しないことを表すキーワード</li>
          <li>Optional型は<code className="text-pink-300">Optional&lt;String&gt;</code>の糖衣構文として<code className="text-pink-300">String?</code>と書ける</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optionalとnilのルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の型（非Optional）にはnilを代入できません。nilを扱いたい場合は必ず<code className="text-pink-300">?</code>を付けてOptional型にする必要があります。
          また、Optional型の値をそのまま使おうとすると、コンパイルエラーになります。必ず「アンラップ」という操作をして値を取り出す必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>非Optional型にはnilを代入できない</li>
          <li>Optional型はそのままでは通常の値として使えない</li>
          <li>値を使うにはアンラップが必要</li>
          <li><code className="text-pink-300">if let</code>・<code className="text-pink-300">guard let</code>・<code className="text-pink-300">??</code>などでアンラップする</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optional型の宣言とnil確認</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Optional型の変数がnilかどうかを確認するには、<code className="text-pink-300">== nil</code>または<code className="text-pink-300">!= nil</code>で比較します。
          ただし、これだけでは値を安全に取り出せないため、後続のレッスンで学ぶアンラップ技法と組み合わせて使います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Optional型の宣言とnil代入</h2>
        <SwiftEditor
          defaultCode={`// Optional型の宣言
var name: String? = "田中太郎"
var age: Int? = nil

print(name)  // Optional("田中太郎")
print(age)   // nil

// nilを代入して値を消す
name = nil
print(name)  // nil

// 再び値を代入
age = 25
print(age)   // Optional(25)

// nil比較
if name == nil {
    print("nameはnilです")
}
if age != nil {
    print("ageに値があります")
}`}
          expectedOutput={`Optional("田中太郎")
nil
nil
Optional(25)
nameはnilです
ageに値があります`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Optional型と非Optional型の違い</h2>
        <SwiftEditor
          defaultCode={`// 非Optional型 — nilは代入不可
var requiredName: String = "必須の名前"
// requiredName = nil  // コンパイルエラー！

// Optional型 — nilを代入可能
var optionalName: String? = "オプショナルな名前"
optionalName = nil
print(optionalName)  // nil

// Optional型の確認
var score: Int? = 85
if score != nil {
    print("スコアが設定されています")
} else {
    print("スコアが設定されていません")
}

score = nil
if score != nil {
    print("スコアが設定されています")
} else {
    print("スコアが設定されていません")
}`}
          expectedOutput={`nil
スコアが設定されています
スコアが設定されていません`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 関数の戻り値としてのOptional</h2>
        <SwiftEditor
          defaultCode={`// Optional型を返す関数
func findUser(id: Int) -> String? {
    let users = [1: "Alice", 2: "Bob", 3: "Charlie"]
    return users[id]  // DictionaryのサブスクリプトはOptionalを返す
}

let user1 = findUser(id: 1)
let user2 = findUser(id: 99)

print(user1)  // Optional("Alice")
print(user2)  // nil

// nilチェック
if user1 != nil {
    print("ユーザーが見つかりました")
} else {
    print("ユーザーが見つかりません")
}

if user2 != nil {
    print("ユーザーが見つかりました")
} else {
    print("ユーザーが見つかりません")
}`}
          expectedOutput={`Optional("Alice")
nil
ユーザーが見つかりました
ユーザーが見つかりません`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optionals" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/optionals" />
    </div>
  );
}
