import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function GuardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">guard文</h1>
        <p className="text-gray-400">早期リターンパターンで可読性を上げるguard文の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">guard文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">guard</code> 文は条件が <code className="text-cyan-300">false</code> の場合に <code className="text-cyan-300">else</code> ブロックを実行します。
          elseブロックでは必ず <code className="text-cyan-300">return</code>・<code className="text-cyan-300">break</code>・<code className="text-cyan-300">continue</code>・<code className="text-cyan-300">throw</code> のいずれかで処理を抜ける必要があります。
          ネストを深くせず、早期リターンで正常系を明確に書けます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: guard let でOptionalをアンラップ</h2>
        <SwiftEditor
          defaultCode={`func greet(name: String?) {
    guard let name = name else {
        print("名前がありません")
        return
    }
    // ここではnameはString（非Optional）として使える
    print("こんにちは、\\(name)さん！")
}

greet(name: "Swift")
greet(name: nil)

func processAge(_ ageString: String) {
    guard let age = Int(ageString) else {
        print("\\(ageString) は有効な年齢ではありません")
        return
    }
    guard age >= 0 && age <= 150 else {
        print("年齢 \\(age) は範囲外です")
        return
    }
    print("年齢: \\(age)歳")
}

processAge("25")
processAge("abc")
processAge("200")`}
          expectedOutput={`こんにちは、Swiftさん！
名前がありません
年齢: 25歳
abc は有効な年齢ではありません
年齢 200 は範囲外です`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if letとguard letの比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">if let</code> はOptionalがある場合に処理、<code className="text-cyan-300">guard let</code> はnilの場合に早期リターンします。
          guard letでアンラップした変数はguard文の後のスコープ全体で使えます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数のguard条件</h2>
        <SwiftEditor
          defaultCode={`struct User {
    let name: String
    let age: Int
    let email: String
}

func createUser(name: String?, age: Int?, email: String?) -> User? {
    guard let name = name, !name.isEmpty else {
        print("エラー: 名前が無効")
        return nil
    }
    guard let age = age, age >= 18 else {
        print("エラー: 年齢が無効（18歳以上必要）")
        return nil
    }
    guard let email = email, email.contains("@") else {
        print("エラー: メールアドレスが無効")
        return nil
    }
    return User(name: name, age: age, email: email)
}

if let user = createUser(name: "太郎", age: 25, email: "taro@example.com") {
    print("ユーザー作成成功: \\(user.name)")
}
_ = createUser(name: nil, age: 25, email: "test@example.com")
_ = createUser(name: "花子", age: 16, email: "hanako@example.com")`}
          expectedOutput={`ユーザー作成成功: 太郎
エラー: 名前が無効
エラー: 年齢が無効（18歳以上必要）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="guard" />
      </div>
      <LessonNav lessons={lessons} currentId="guard" basePath="/learn/control" />
    </div>
  );
}
