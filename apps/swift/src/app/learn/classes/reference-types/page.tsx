import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "classes")!.lessons;

export default function ReferenceTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">参照型</h1>
        <p className="text-gray-400">クラスが参照型であることの意味と、値型（struct）との違いおよび注意点を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">参照型と値型の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの型は<strong className="text-white">参照型（Reference Type）</strong>と<strong className="text-white">値型（Value Type）</strong>の2種類に分かれます。
          クラスは参照型で、変数に代入したり関数に渡すときに同じインスタンスへの<strong className="text-white">参照（アドレス）</strong>がコピーされます。
          一方、structやenumは値型で、代入のたびに<strong className="text-white">値そのものがコピー</strong>されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">class</code> — 参照型：同じインスタンスを複数の変数が共有</li>
          <li><code className="text-red-300">struct</code> — 値型：代入時に値がコピーされる</li>
          <li>参照型は変更が意図せず別の変数にも影響する可能性がある</li>
          <li>値型は独立したコピーなので意図せぬ変更が起きない</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">同一性の比較（===）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          参照型であるクラスでは、2つの変数が<strong className="text-white">同じインスタンスを指しているか</strong>を<code className="text-red-300">===</code>演算子で確認できます。
          <code className="text-red-300">==</code>は値が等しいかの比較（<code className="text-red-300">Equatable</code>が必要）ですが、
          <code className="text-red-300">===</code>はメモリ上の同一インスタンスかどうかの比較です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">a === b</code> — 同じインスタンスを参照しているか</li>
          <li><code className="text-red-300">a !== b</code> — 異なるインスタンスを参照しているか</li>
          <li><code className="text-red-300">==</code>はEquatableプロトコルで定義された値の等価比較</li>
          <li>structには<code className="text-red-300">===</code>は使えない（参照ではないため）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">参照型の注意点と使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          参照型は共有状態を持つため、複数の箇所から同じオブジェクトを変更できる一方、意図しない副作用が生じるリスクがあります。
          Swiftでは<strong className="text-white">structを優先的に使い</strong>、継承・同一性の比較・共有状態が必要な場合にclassを選ぶのが推奨スタイルです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>データのモデル化には一般的にstructを優先</li>
          <li>継承が必要な場合はclassを使う</li>
          <li>Obj-Cとの互換性が必要な場合はclassを使う</li>
          <li>参照の共有が必要な場合（キャッシュ、シングルトン等）はclassを使う</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 参照型の共有動作</h2>
        <SwiftEditor
          defaultCode={`class Counter {
    var count: Int = 0

    func increment() {
        count += 1
    }
}

struct CounterStruct {
    var count: Int = 0

    mutating func increment() {
        count += 1
    }
}

// クラス（参照型）の動作
print("=== クラス（参照型）===")
let classCounter = Counter()
let anotherRef = classCounter  // 同じインスタンスへの参照

classCounter.increment()
classCounter.increment()

print("classCounter.count: \\(classCounter.count)")
print("anotherRef.count: \\(anotherRef.count)")  // 同じインスタンスなので同じ値
print("同じインスタンス: \\(classCounter === anotherRef)")

// 構造体（値型）の動作
print("\\n=== 構造体（値型）===")
var structCounter = CounterStruct()
var anotherCopy = structCounter  // 値のコピー

structCounter.increment()
structCounter.increment()

print("structCounter.count: \\(structCounter.count)")
print("anotherCopy.count: \\(anotherCopy.count)")  // コピーなので独立`}
          expectedOutput={`=== クラス（参照型）===
classCounter.count: 2
anotherRef.count: 2
同じインスタンス: true

=== 構造体（値型）===
structCounter.count: 2
anotherCopy.count: 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 関数への参照渡しと値渡し</h2>
        <SwiftEditor
          defaultCode={`class Config {
    var debug: Bool = false
    var timeout: Int = 30
}

struct ConfigStruct {
    var debug: Bool = false
    var timeout: Int = 30
}

// クラスを渡す：参照が渡されるので関数内の変更が外に影響する
func enableDebugMode(_ config: Config) {
    config.debug = true
    config.timeout = 60
    print("関数内 - debug: \\(config.debug), timeout: \\(config.timeout)")
}

// 構造体を渡す：コピーが渡されるので関数内の変更は外に影響しない
func enableDebugMode(_ config: inout ConfigStruct) {
    config.debug = true
    config.timeout = 60
    print("関数内 - debug: \\(config.debug), timeout: \\(config.timeout)")
}

print("=== クラス ===")
let classConfig = Config()
print("呼び出し前 - debug: \\(classConfig.debug), timeout: \\(classConfig.timeout)")
enableDebugMode(classConfig)
print("呼び出し後 - debug: \\(classConfig.debug), timeout: \\(classConfig.timeout)")

print("\\n=== 構造体（inoutあり）===")
var structConfig = ConfigStruct()
print("呼び出し前 - debug: \\(structConfig.debug), timeout: \\(structConfig.timeout)")
enableDebugMode(&structConfig)
print("呼び出し後 - debug: \\(structConfig.debug), timeout: \\(structConfig.timeout)")`}
          expectedOutput={`=== クラス ===
呼び出し前 - debug: false, timeout: 30
関数内 - debug: true, timeout: 60
呼び出し後 - debug: true, timeout: 60

=== 構造体（inoutあり）===
呼び出し前 - debug: false, timeout: 30
関数内 - debug: true, timeout: 60
呼び出し後 - debug: true, timeout: 60`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 同一性チェック（===）</h2>
        <SwiftEditor
          defaultCode={`class User {
    var name: String
    var email: String

    init(name: String, email: String) {
        self.name = name
        self.email = email
    }
}

let user1 = User(name: "田中", email: "tanaka@example.com")
let user2 = User(name: "田中", email: "tanaka@example.com")
let user3 = user1  // 同じインスタンスへの参照

print("user1 === user2: \\(user1 === user2)")  // 別インスタンス → false
print("user1 === user3: \\(user1 === user3)")  // 同じインスタンス → true
print("user1 !== user2: \\(user1 !== user2)")  // 別インスタンス → true

// user3はuser1の参照なので、user1を変更するとuser3にも反映
user1.name = "鈴木"
print("\\nuser1変更後:")
print("user1.name: \\(user1.name)")
print("user3.name: \\(user3.name)")  // user1と同じインスタンスなので変わる
print("user2.name: \\(user2.name)")  // 別インスタンスなので変わらない`}
          expectedOutput={`user1 === user2: false
user1 === user3: true
user1 !== user2: true

user1変更後:
user1.name: 鈴木
user3.name: 鈴木
user2.name: 田中`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="reference-types" />
      </div>
      <LessonNav lessons={lessons} currentId="reference-types" basePath="/learn/classes" />
    </div>
  );
}
