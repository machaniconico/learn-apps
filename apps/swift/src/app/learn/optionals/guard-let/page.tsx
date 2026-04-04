import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "optionals")!.lessons;

export default function GuardLetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Optional型 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">guard let</h1>
        <p className="text-gray-400">早期リターンとアンラップ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">guard letとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">guard let</code>は、条件が満たされない場合に早期リターン（early exit）するための構文です。
          <code className="text-pink-300">if let</code>との大きな違いは、バインドした変数がguardブロックの外側（それ以降のスコープ全体）で使えることです。
          nilチェックや前提条件の検証に使い、コードのネストを減らして可読性を高めるのに役立ちます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">guard let 定数名 = Optional else &#123; return &#125;</code> — 基本構文</li>
          <li>elseブロックは必須で、必ず制御を移す（return・throw・break・continue）</li>
          <li>バインドした定数はguard文以降のスコープで使用可能</li>
          <li>関数の引数検証やOptionalのアンラップに最適</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">guard letとif letの使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">if let</code>はバインドした変数がブロック内だけで有効で、値がある場合の処理を書くのに適しています。
          一方<code className="text-pink-300">guard let</code>は、値がない場合（nil・無効値）を早めに弾いて、その後は確実に値がある前提でコードを進めるパターンに向いています。
          実務では関数の冒頭で引数を検証する「ガード節パターン」として頻繁に使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">if let</code>：値がある場合の処理をブロック内に書く</li>
          <li><code className="text-pink-300">guard let</code>：値がない場合を早期に弾き、以降は非Optionalで扱う</li>
          <li>ネストが深くなりそうな場合は<code className="text-pink-300">guard let</code>を優先</li>
          <li>複数の条件を一度にガードできる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数条件のguard</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">guard</code>文はカンマで区切ることで複数の条件を一度にチェックできます。
          Optional以外の条件（値の範囲チェック、空文字チェックなど）も同じguard文に含めることができます。
          どれか一つでも失敗すればelseブロックに入ります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: guard letによる関数の引数検証</h2>
        <SwiftEditor
          defaultCode={`func greetUser(name: String?, age: Int?) {
    guard let name = name else {
        print("エラー: 名前がnilです")
        return
    }
    guard let age = age else {
        print("エラー: 年齢がnilです")
        return
    }

    // ここではname・ageは非Optional型として使える
    print("こんにちは、\\(name)さん（\\(age)歳）！")
}

greetUser(name: "田中", age: 25)
greetUser(name: nil, age: 25)
greetUser(name: "鈴木", age: nil)`}
          expectedOutput={`こんにちは、田中さん（25歳）！
エラー: 名前がnilです
エラー: 年齢がnilです`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数条件のguardとバリデーション</h2>
        <SwiftEditor
          defaultCode={`func registerUser(username: String?, email: String?, age: Int?) -> String {
    // 複数条件を一度にガード
    guard let username = username,
          let email = email,
          let age = age else {
        return "エラー: 必須項目が未入力です"
    }

    // 値の検証
    guard !username.isEmpty else {
        return "エラー: ユーザー名が空です"
    }
    guard email.contains("@") else {
        return "エラー: メールアドレスが無効です"
    }
    guard age >= 18 else {
        return "エラー: 18歳未満は登録できません"
    }

    return "登録成功: \\(username)（\\(email)、\\(age)歳）"
}

print(registerUser(username: "tanaka", email: "tanaka@example.com", age: 25))
print(registerUser(username: nil, email: "test@example.com", age: 20))
print(registerUser(username: "suzuki", email: "invalid-email", age: 30))
print(registerUser(username: "young", email: "young@example.com", age: 15))`}
          expectedOutput={`登録成功: tanaka（tanaka@example.com、25歳）
エラー: 必須項目が未入力です
エラー: メールアドレスが無効です
エラー: 18歳未満は登録できません`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: guard letとif letの比較</h2>
        <SwiftEditor
          defaultCode={`// if letを使った場合 — ネストが深くなる
func processWithIfLet(data: String?) {
    if let value = data {
        if !value.isEmpty {
            if value.count > 3 {
                print("if let: 処理完了 → \\(value)")
            }
        }
    }
}

// guard letを使った場合 — フラットで読みやすい
func processWithGuardLet(data: String?) {
    guard let value = data else {
        print("guard let: データがnilです")
        return
    }
    guard !value.isEmpty else {
        print("guard let: データが空です")
        return
    }
    guard value.count > 3 else {
        print("guard let: データが短すぎます")
        return
    }

    print("guard let: 処理完了 → \\(value)")
}

processWithIfLet(data: "Swift")
processWithIfLet(data: nil)

processWithGuardLet(data: "Swift")
processWithGuardLet(data: nil)
processWithGuardLet(data: "")
processWithGuardLet(data: "Hi")`}
          expectedOutput={`if let: 処理完了 → Swift
guard let: 処理完了 → Swift
guard let: データがnilです
guard let: データが空です
guard let: データが短すぎます`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optionals" lessonId="guard-let" />
      </div>
      <LessonNav lessons={lessons} currentId="guard-let" basePath="/learn/optionals" />
    </div>
  );
}
