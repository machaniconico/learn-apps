import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "enums")!.lessons;

export default function RawValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">列挙型 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">raw値</h1>
        <p className="text-gray-400">rawValueを使ってケースに具体的な値を紐付け、変換や初期化に活用します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">raw値とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          raw値（生の値）は、列挙型の各ケースに紐付けられた<strong className="text-white">基底型の値</strong>です。
          <code className="text-indigo-300">enum 型名: 基底型</code>のように基底型を宣言すると、各ケースがその型のraw値を持てます。
          基底型には<code className="text-indigo-300">Int</code>・<code className="text-indigo-300">String</code>・<code className="text-indigo-300">Double</code>・<code className="text-indigo-300">Character</code>が使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">ケース.rawValue</code> — raw値を取得</li>
          <li><code className="text-indigo-300">型名(rawValue:)</code> — raw値からケースを生成（Optional）</li>
          <li>Int型では最初のケースが0から自動採番される</li>
          <li>String型では省略するとケース名がそのままraw値になる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">自動採番と明示的な値の指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Int型のraw値を持つ列挙型では、最初のケースが0から順に自動採番されます。
          途中のケースに値を指定すると、そこから再度連番が始まります。
          任意のケースに明示的な値を割り当てることで、APIコードや状態コードなどの既存の値体系にマッピングできます。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">raw値からの初期化（フェイラブル）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">型名(rawValue:)</code>イニシャライザはフェイラブルで、
          対応するケースが存在しない場合は<code className="text-indigo-300">nil</code>を返します。
          外部入力（JSONのコードや設定ファイルの文字列など）から列挙型を復元する際に活用します。
          必ず<code className="text-indigo-300">Optional</code>として受け取り、<code className="text-indigo-300">if let</code>や<code className="text-indigo-300">guard let</code>でアンラップしましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Int型のraw値と自動採番</h2>
        <SwiftEditor
          defaultCode={`enum Weekday: Int {
    case monday = 1  // 1から開始
    case tuesday
    case wednesday
    case thursday
    case friday
    case saturday
    case sunday
}

print("月曜日のraw値: \\(Weekday.monday.rawValue)")
print("水曜日のraw値: \\(Weekday.wednesday.rawValue)")
print("日曜日のraw値: \\(Weekday.sunday.rawValue)")

// raw値からケースを生成
if let day = Weekday(rawValue: 5) {
    print("raw値5は \\(day)")
} else {
    print("該当するケースなし")
}

// 存在しないraw値
let invalid = Weekday(rawValue: 8)
print("raw値8: \\(String(describing: invalid))")`}
          expectedOutput={`月曜日のraw値: 1
水曜日のraw値: 3
日曜日のraw値: 7
raw値5は friday
raw値8: nil`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: String型のraw値</h2>
        <SwiftEditor
          defaultCode={`enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
    case patch = "PATCH"
}

let method = HTTPMethod.post
print("HTTPメソッド: \\(method.rawValue)")

// 文字列からHTTPMethodを生成
let rawString = "DELETE"
if let parsed = HTTPMethod(rawValue: rawString) {
    print("\\(rawString) → \\(parsed)")
}

// 省略時はケース名がそのままraw値
enum Color: String {
    case red, green, blue
}

print(Color.green.rawValue)  // "green"`}
          expectedOutput={`HTTPメソッド: POST
DELETE → delete
green`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: raw値を使った実践的なマッピング</h2>
        <SwiftEditor
          defaultCode={`enum StatusCode: Int {
    case ok = 200
    case created = 201
    case badRequest = 400
    case unauthorized = 401
    case notFound = 404
    case serverError = 500

    var message: String {
        switch self {
        case .ok: return "成功"
        case .created: return "作成完了"
        case .badRequest: return "不正なリクエスト"
        case .unauthorized: return "認証が必要"
        case .notFound: return "リソースが見つからない"
        case .serverError: return "サーバーエラー"
        }
    }
}

let codes = [200, 404, 500, 999]
for code in codes {
    if let status = StatusCode(rawValue: code) {
        print("\\(code): \\(status.message)")
    } else {
        print("\\(code): 不明なステータスコード")
    }
}`}
          expectedOutput={`200: 成功
404: リソースが見つからない
500: サーバーエラー
999: 不明なステータスコード`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="raw-values" />
      </div>
      <LessonNav lessons={lessons} currentId="raw-values" basePath="/learn/enums" />
    </div>
  );
}
