import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "optionals")!.lessons;

export default function UnwrappingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Optional型 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アンラップ</h1>
        <p className="text-gray-400">if letによる安全なアンラップ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アンラップとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Optional型の値を実際に使うには「アンラップ（unwrap）」という操作が必要です。
          アンラップとはOptionalの包みを外して中の値を取り出すことです。
          最も安全なアンラップ方法が<code className="text-pink-300">if let</code>による「オプショナルバインディング」です。
          値がnilでない場合だけ処理を実行でき、nilの場合は安全にスキップできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">if let 定数名 = Optional型の変数 &#123; &#125;</code> — 基本構文</li>
          <li>nilでない場合のみブロック内に入る</li>
          <li>ブロック内では<code className="text-pink-300">定数名</code>が非Optional型として使える</li>
          <li><code className="text-pink-300">else</code>ブロックでnil時の処理を書ける</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数のオプショナルバインディング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.9以降、複数のOptional値を一度にバインドできます。
          また、<code className="text-pink-300">if let</code>に加えて<code className="text-pink-300">while let</code>も使えます。
          さらに、Swift 5.7以降は<code className="text-pink-300">if let name</code>のように同名の変数をそのままバインドする省略記法も使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">if let a = optA, let b = optB &#123; &#125;</code> — 複数同時バインド</li>
          <li>カンマで区切った全てがnilでない場合のみブロックに入る</li>
          <li>Swift 5.7以降: <code className="text-pink-300">if let name &#123; &#125;</code> — 同名省略記法</li>
          <li>バインドした変数はブロック外では使えない（スコープ限定）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">var でのバインディング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">if let</code>でバインドした定数はデフォルトでimmutableですが、
          <code className="text-pink-300">if var</code>を使うとブロック内で変更可能な変数としてバインドできます。
          ただし、元のOptional変数の値は変更されません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: if letによる基本的なアンラップ</h2>
        <SwiftEditor
          defaultCode={`var username: String? = "Swift太郎"

if let name = username {
    // nameは非Optional型のStringとして使える
    print("ようこそ、\\(name)さん！")
    print("名前の文字数: \\(name.count)")
} else {
    print("ユーザー名が設定されていません")
}

// nilの場合
username = nil
if let name = username {
    print("ようこそ、\\(name)さん！")
} else {
    print("ユーザー名が設定されていません")
}`}
          expectedOutput={`ようこそ、Swift太郎さん！
名前の文字数: 6
ユーザー名が設定されていません`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数のOptionalを同時にアンラップ</h2>
        <SwiftEditor
          defaultCode={`var firstName: String? = "太郎"
var lastName: String? = "山田"
var age: Int? = 30

// 複数のOptionalを同時にバインド
if let first = firstName, let last = lastName, let userAge = age {
    print("氏名: \\(last) \\(first)")
    print("年齢: \\(userAge)歳")
} else {
    print("情報が不完全です")
}

// どれか一つでもnilだと全体がfalse
lastName = nil
if let first = firstName, let last = lastName {
    print("\\(last) \\(first)")
} else {
    print("情報が不完全です（lastNameがnil）")
}`}
          expectedOutput={`氏名: 山田 太郎
年齢: 30歳
情報が不完全です（lastNameがnil）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: if letの省略記法とif var</h2>
        <SwiftEditor
          defaultCode={`var score: Int? = 75
var message: String? = "頑張りました"

// Swift 5.7以降の省略記法（同名でバインド）
if let score {
    print("スコア: \\(score)点")
}

if let message {
    print("メッセージ: \\(message)")
}

// if varを使って値を変更
var greeting: String? = "こんにちは"
if var text = greeting {
    text += "、世界！"  // ローカルコピーを変更
    print(text)
}
// 元の変数は変わらない
print(greeting ?? "nil")`}
          expectedOutput={`スコア: 75点
メッセージ: 頑張りました
こんにちは、世界！
こんにちは`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optionals" lessonId="unwrapping" />
      </div>
      <LessonNav lessons={lessons} currentId="unwrapping" basePath="/learn/optionals" />
    </div>
  );
}
