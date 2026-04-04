import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "enums")!.lessons;

export default function EnumCodablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">列挙型 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Codable対応</h1>
        <p className="text-gray-400">列挙型にCodableを採用してJSONとのエンコード・デコードを実装します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CodableとはEncodable + Decodable</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">Codable</code>は<code className="text-indigo-300">Encodable</code>と<code className="text-indigo-300">Decodable</code>を合成したタイプエイリアスです。
          raw値を持つ列挙型（<code className="text-indigo-300">String</code>・<code className="text-indigo-300">Int</code>型）は<code className="text-indigo-300">Codable</code>準拠を宣言するだけで自動合成されます。
          関連値を持つ列挙型は<strong className="text-white">Swift 5.5以降</strong>で自動合成がサポートされ、
          それ以前のバージョンでは手動実装が必要でした。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>raw値型（String/Int）の列挙型 → 宣言するだけで自動合成</li>
          <li>関連値を持つ列挙型 → Swift 5.5以降で自動合成（構造体風のJSON）</li>
          <li><code className="text-indigo-300">JSONEncoder</code> / <code className="text-indigo-300">JSONDecoder</code> でJSONと相互変換</li>
          <li>カスタムキー名は<code className="text-indigo-300">CodingKeys</code>で制御</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">raw値列挙型の自動Codable</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">String</code>のraw値を持つ列挙型に<code className="text-indigo-300">Codable</code>を付けると、
          ケース名（またはraw値の文字列）がそのままJSONの文字列として扱われます。
          APIレスポンスのステータスフィールドや種別フィールドのデコードでよく使われるパターンです。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関連値を持つ列挙型のCodable</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.5以降では、関連値を持つ列挙型も<code className="text-indigo-300">Codable</code>に自動対応します。
          生成されるJSONは<code className="text-indigo-300">&#123;"ケース名": &#123;"ラベル": 値&#125;&#125;</code>という形式になります。
          この形式はSwift同士の通信には適していますが、他言語のAPIとの互換性が必要な場合は手動実装で形式を合わせましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: raw値列挙型の自動Codable</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum UserRole: String, Codable {
    case admin
    case editor
    case viewer
}

struct User: Codable {
    let name: String
    let role: UserRole
}

// エンコード
let user = User(name: "田中太郎", role: .editor)
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

if let data = try? encoder.encode(user),
   let json = String(data: data, encoding: .utf8) {
    print("JSON出力:")
    print(json)
}

// デコード
let jsonString = """
{"name": "鈴木花子", "role": "admin"}
"""
let decoder = JSONDecoder()
if let data = jsonString.data(using: .utf8),
   let decoded = try? decoder.decode(User.self, from: data) {
    print("デコード結果: \\(decoded.name) (\\(decoded.role))")
}`}
          expectedOutput={`JSON出力:
{
  "name" : "田中太郎",
  "role" : "editor"
}
デコード結果: 鈴木花子 (admin)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 不明なケースへの対処（defaultCase）</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum NotificationKind: String, Codable {
    case message
    case like
    case follow
    case unknown

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let raw = try container.decode(String.self)
        self = NotificationKind(rawValue: raw) ?? .unknown
    }
}

struct PushNotification: Codable {
    let id: Int
    let kind: NotificationKind
    let body: String
}

let jsonArray = """
[
  {"id": 1, "kind": "message", "body": "新しいメッセージ"},
  {"id": 2, "kind": "like",    "body": "いいね！"},
  {"id": 3, "kind": "newType", "body": "将来追加される種別"}
]
"""

let decoder = JSONDecoder()
if let data = jsonArray.data(using: .utf8),
   let items = try? decoder.decode([PushNotification].self, from: data) {
    for item in items {
        print("ID:\\(item.id) 種別:\\(item.kind) 本文:\\(item.body)")
    }
}`}
          expectedOutput={`ID:1 種別:message 本文:新しいメッセージ
ID:2 種別:like 本文:いいね！
ID:3 種別:unknown 本文:将来追加される種別`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 関連値を持つ列挙型のCodable（手動実装）</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum PaymentMethod: Codable {
    case creditCard(number: String, expiry: String)
    case bankTransfer(accountId: String)
    case cash

    enum CodingKeys: String, CodingKey {
        case type, number, expiry, accountId
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        switch self {
        case let .creditCard(number, expiry):
            try container.encode("creditCard", forKey: .type)
            try container.encode(number, forKey: .number)
            try container.encode(expiry, forKey: .expiry)
        case let .bankTransfer(accountId):
            try container.encode("bankTransfer", forKey: .type)
            try container.encode(accountId, forKey: .accountId)
        case .cash:
            try container.encode("cash", forKey: .type)
        }
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let type_ = try container.decode(String.self, forKey: .type)
        switch type_ {
        case "creditCard":
            let number = try container.decode(String.self, forKey: .number)
            let expiry = try container.decode(String.self, forKey: .expiry)
            self = .creditCard(number: number, expiry: expiry)
        case "bankTransfer":
            let accountId = try container.decode(String.self, forKey: .accountId)
            self = .bankTransfer(accountId: accountId)
        default:
            self = .cash
        }
    }
}

let methods: [PaymentMethod] = [
    .creditCard(number: "4111-1111-1111-1111", expiry: "12/26"),
    .bankTransfer(accountId: "ACC-001"),
    .cash,
]

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

for method in methods {
    if let data = try? encoder.encode(method),
       let json = String(data: data, encoding: .utf8) {
        print(json)
    }
}`}
          expectedOutput={`{
  "type" : "creditCard",
  "number" : "4111-1111-1111-1111",
  "expiry" : "12/26"
}
{
  "type" : "bankTransfer",
  "accountId" : "ACC-001"
}
{
  "type" : "cash"
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="codable" />
      </div>
      <LessonNav lessons={lessons} currentId="codable" basePath="/learn/enums" />
    </div>
  );
}
