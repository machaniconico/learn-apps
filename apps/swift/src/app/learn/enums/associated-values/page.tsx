import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "enums")!.lessons;

export default function AssociatedValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">列挙型 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関連値</h1>
        <p className="text-gray-400">各ケースに任意の型のデータを付加して、より豊かな情報を列挙型で表現します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関連値とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関連値（associated values）は、列挙型の各ケースに追加データを持たせる仕組みです。
          raw値と異なり、<strong className="text-white">ケースごとに異なる型・数の値</strong>を持てます。
          たとえば「成功なら結果データ、失敗ならエラー情報」というように、状態とそれに付随するデータをまとめて表現できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">case 名前(型1, 型2)</code> — 関連値の定義</li>
          <li><code className="text-indigo-300">case 名前(ラベル: 型)</code> — ラベル付き関連値</li>
          <li>switchで<code className="text-indigo-300">let</code>/<code className="text-indigo-300">var</code>を使って取り出す</li>
          <li><code className="text-indigo-300">if case</code> で特定ケースだけ抽出</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関連値の取り出し方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          switchのパターンマッチングで<code className="text-indigo-300">case .ケース名(let 変数名)</code>と書くと関連値を束縛できます。
          すべての関連値をletで束縛する場合は<code className="text-indigo-300">case let .ケース名(変数1, 変数2)</code>とまとめて書けます。
          <code className="text-indigo-300">if case</code>を使うと特定のケースだけ条件分岐できます。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SwiftのResult型との関係</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの標準ライブラリにある<code className="text-indigo-300">Result{"<Success, Failure>"}</code>も関連値を持つ列挙型です。
          <code className="text-indigo-300">.success(値)</code>と<code className="text-indigo-300">.failure(エラー)</code>の2ケースで非同期処理の結果を型安全に表現します。
          自前で同様のパターンを実装することで、その仕組みを深く理解できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 関連値の基本的な使い方</h2>
        <SwiftEditor
          defaultCode={`enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

var productCode = Barcode.upc(8, 85909, 51226, 3)
print("バーコード: \\(productCode)")

productCode = .qrCode("ABCDEFGHIJKLMNOP")

switch productCode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \\(numberSystem)-\\(manufacturer)-\\(product)-\\(check)")
case .qrCode(let code):
    print("QRコード: \\(code)")
}`}
          expectedOutput={`バーコード: upc(8, 85909, 51226, 3)
QRコード: ABCDEFGHIJKLMNOP`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ラベル付き関連値とif case</h2>
        <SwiftEditor
          defaultCode={`enum Notification {
    case message(from: String, text: String)
    case like(postId: Int, count: Int)
    case follow(username: String)
}

let notifications: [Notification] = [
    .message(from: "田中", text: "こんにちは！"),
    .like(postId: 42, count: 10),
    .follow(username: "yamada"),
    .message(from: "鈴木", text: "よろしく"),
]

for notification in notifications {
    switch notification {
    case let .message(from, text):
        print("メッセージ from \\(from): \\(text)")
    case let .like(postId, count):
        print("投稿\\(postId)に\\(count)いいね")
    case let .follow(username):
        print("\\(username)さんがフォロー")
    }
}

// if caseで特定ケースのみ抽出
if case let .message(from, _) = notifications[0] {
    print("最初は\\(from)からのメッセージ")
}`}
          expectedOutput={`メッセージ from 田中: こんにちは！
投稿42に10いいね
yamadaさんがフォロー
メッセージ from 鈴木: よろしく
最初は田中からのメッセージ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Result型と同様のパターンを自作</h2>
        <SwiftEditor
          defaultCode={`enum FetchResult {
    case success(data: String, statusCode: Int)
    case failure(message: String, code: Int)
}

func fetchUser(id: Int) -> FetchResult {
    if id > 0 {
        return .success(data: "ユーザー\\(id): 田中太郎", statusCode: 200)
    } else {
        return .failure(message: "無効なIDです", code: 400)
    }
}

let results = [fetchUser(id: 1), fetchUser(id: -1), fetchUser(id: 5)]

for result in results {
    switch result {
    case let .success(data, code):
        print("[\\(code)] \\(data)")
    case let .failure(message, code):
        print("[エラー \\(code)] \\(message)")
    }
}`}
          expectedOutput={`[200] ユーザー1: 田中太郎
[エラー 400] 無効なIDです
[200] ユーザー5: 田中太郎`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="associated-values" />
      </div>
      <LessonNav lessons={lessons} currentId="associated-values" basePath="/learn/enums" />
    </div>
  );
}
