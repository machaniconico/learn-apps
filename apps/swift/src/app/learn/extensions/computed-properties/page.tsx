import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function ComputedPropertiesExtPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">エクステンション レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">算出プロパティの追加</h1>
        <p className="text-gray-400">extensionを使って既存の型に算出プロパティを追加します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">算出プロパティの追加ルール</h2>
        <p className="text-gray-300 mb-3">
          エクステンションでは <code className="text-cyan-300">var</code> による算出プロパティを追加できます。
          ただし <code className="text-cyan-300">var storedProp = value</code> のようなストアドプロパティは追加できません。
          <code className="text-cyan-300">static var</code> による型プロパティも追加可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>算出プロパティ（var + get/set）は追加可能</li>
          <li>ストアドプロパティは追加不可</li>
          <li>static var（型プロパティ）は追加可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Int・Double に便利プロパティを追加</h2>
        <SwiftEditor
          defaultCode={`extension Int {
    var doubled: Int { self * 2 }
    var squared: Int { self * self }
    var factorial: Int {
        guard self > 0 else { return 1 }
        return (1...self).reduce(1, *)
    }
}

extension Double {
    var celsius: Double { self }
    var fahrenheit: Double { self * 9/5 + 32 }
    var kelvin: Double { self + 273.15 }
}

print(5.doubled)
print(4.squared)
print(5.factorial)

let boiling = 100.0
print("\\(boiling)°C = \\(boiling.fahrenheit)°F")
print("\\(boiling)°C = \\(boiling.kelvin)K")`}
          expectedOutput={`10
16
120
100.0°C = 212.0°F
100.0°C = 373.15K`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: String に便利プロパティを追加</h2>
        <SwiftEditor
          defaultCode={`extension String {
    var wordCount: Int {
        components(separatedBy: .whitespaces).filter { !$0.isEmpty }.count
    }
    var reversed: String { String(self.reversed()) }
    var isPalindrome: Bool {
        let cleaned = lowercased().filter { $0.isLetter }
        return cleaned == String(cleaned.reversed())
    }
    var initials: String {
        split(separator: " ").compactMap { $0.first }.map { String($0) }.joined()
    }
}

print("Hello World".wordCount)
print("Swift".reversed)
print("racecar".isPalindrome)
print("not a palindrome".isPalindrome)
print("John Swift Developer".initials)`}
          expectedOutput={`2
tfiwS
true
false
JSD`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="computed-properties" />
      </div>
      <LessonNav lessons={lessons} currentId="computed-properties" basePath="/learn/extensions" />
    </div>
  );
}
