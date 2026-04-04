import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function HashTablePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">アルゴリズム</span>
        <h1 className="text-3xl font-bold text-gray-100">ハッシュテーブル</h1>
        <p className="text-gray-400">Dictionary の内部構造とカスタム Hashable の実装を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          ハッシュテーブルはキーをハッシュ関数でインデックスに変換し、平均O(1)でデータを格納・取得するデータ構造です。
          SwiftのDictionaryはハッシュテーブルで実装されており、キーは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-300">Hashable</code> プロトコルに準拠する必要があります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// Hashable の自動合成
struct Point: Hashable {
    let x: Int
    let y: Int
    // Hashable と Equatable は自動合成される
}

var visited = Set<Point>()
visited.insert(Point(x: 0, y: 0))
visited.insert(Point(x: 1, y: 2))
print(visited.contains(Point(x: 1, y: 2)))  // true
print(visited.contains(Point(x: 3, y: 4)))  // false

// Dictionary でのハッシュ利用
var wordCount: [String: Int] = [:]
let words = ["apple", "banana", "apple", "cherry", "banana", "apple"]

for word in words {
    wordCount[word, default: 0] += 1
}
print(wordCount)  // ["apple": 3, "banana": 2, "cherry": 1]`}
        height="260px"
        expectedOutput={"true\nfalse\n[\"apple\": 3, \"banana\": 2, \"cherry\": 1]"}
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">カスタム Hashable 実装</h2>
        <p>
          自動合成では不十分な場合、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-300">hash(into:)</code> を手動実装できます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// カスタム Hashable 実装
struct PersonID: Hashable {
    let firstName: String
    let lastName: String

    // Equatable
    static func == (lhs: PersonID, rhs: PersonID) -> Bool {
        lhs.firstName == rhs.firstName && lhs.lastName == rhs.lastName
    }

    // Hashable - hash(into:) で Hasher に値を組み込む
    func hash(into hasher: inout Hasher) {
        hasher.combine(firstName)
        hasher.combine(lastName)
    }
}

let id1 = PersonID(firstName: "John", lastName: "Doe")
let id2 = PersonID(firstName: "John", lastName: "Doe")
let id3 = PersonID(firstName: "Jane", lastName: "Doe")

print(id1 == id2)           // true
print(id1.hashValue == id2.hashValue)  // true
print(id1 == id3)           // false`}
        height="280px"
        expectedOutput="true\ntrue\nfalse"
      />

      <SwiftEditor
        defaultCode={`// シンプルなハッシュテーブル実装
struct HashTable<Key: Hashable, Value> {
    private var buckets: [[(Key, Value)]]
    private let capacity: Int

    init(capacity: Int = 16) {
        self.capacity = capacity
        self.buckets = Array(repeating: [], count: capacity)
    }

    private func index(for key: Key) -> Int {
        abs(key.hashValue) % capacity
    }

    mutating func set(_ value: Value, for key: Key) {
        let idx = index(for: key)
        if let i = buckets[idx].firstIndex(where: { $0.0 == key }) {
            buckets[idx][i] = (key, value)
        } else {
            buckets[idx].append((key, value))
        }
    }

    func get(_ key: Key) -> Value? {
        let idx = index(for: key)
        return buckets[idx].first(where: { $0.0 == key })?.1
    }
}

var table = HashTable<String, Int>()
table.set(42, for: "answer")
table.set(100, for: "score")
print(table.get("answer") ?? -1)  // 42
print(table.get("missing") ?? -1) // -1`}
        height="320px"
        expectedOutput="42\n-1"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="algorithms" lessonId="hash-table" />
      </div>
      <LessonNav lessons={lessons} currentId="hash-table" basePath="/learn/algorithms" />
    </div>
  );
}
