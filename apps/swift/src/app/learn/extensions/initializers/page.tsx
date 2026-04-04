import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function InitializersExtPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">エクステンション レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イニシャライザの追加</h1>
        <p className="text-gray-400">extensionを使って既存の型にコンビニエンスイニシャライザを追加します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">イニシャライザの追加</h2>
        <p className="text-gray-300 mb-3">
          extensionでは便利な初期化方法（コンビニエンスイニシャライザ）を追加できます。
          値型（struct）の場合は指定イニシャライザも追加可能です。
          既存のイニシャライザを壊さずに新しい初期化方法を追加できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>既存の memberwise init を保持したまま新しい init を追加できる</li>
          <li>クラスのextensionでは convenience init のみ追加可能</li>
          <li>失敗可能イニシャライザ（init?）も追加可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 構造体にイニシャライザを追加</h2>
        <SwiftEditor
          defaultCode={`struct Color {
    var red: Double
    var green: Double
    var blue: Double
    var alpha: Double
}

extension Color {
    // 16進数カラーコードから初期化
    init(hex: UInt32, alpha: Double = 1.0) {
        red = Double((hex >> 16) & 0xFF) / 255
        green = Double((hex >> 8) & 0xFF) / 255
        blue = Double(hex & 0xFF) / 255
        self.alpha = alpha
    }

    // グレースケール
    init(white: Double, alpha: Double = 1.0) {
        red = white
        green = white
        blue = white
        self.alpha = alpha
    }
}

let red = Color(hex: 0xFF0000)
print("R:\\(red.red) G:\\(red.green) B:\\(red.blue)")

let gray = Color(white: 0.5)
print("R:\\(gray.red) G:\\(gray.green) B:\\(gray.blue)")`}
          expectedOutput={`R:1.0 G:0.0 B:0.0
R:0.5 G:0.5 B:0.5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 失敗可能イニシャライザの追加</h2>
        <SwiftEditor
          defaultCode={`struct Temperature {
    var celsius: Double
    var fahrenheit: Double { celsius * 9/5 + 32 }
}

extension Temperature {
    init?(string: String) {
        guard let value = Double(string) else { return nil }
        celsius = value
    }

    init(fahrenheit: Double) {
        celsius = (fahrenheit - 32) * 5/9
    }
}

if let temp = Temperature(string: "37.5") {
    print("体温: \\(temp.celsius)°C = \\(temp.fahrenheit)°F")
}

if let invalid = Temperature(string: "abc") {
    print(invalid.celsius)
} else {
    print("無効な温度文字列")
}

let boiling = Temperature(fahrenheit: 212)
print("沸点: \\(boiling.celsius)°C")`}
          expectedOutput={`体温: 37.5°C = 99.5°F
無効な温度文字列
沸点: 100.0°C`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="initializers" />
      </div>
      <LessonNav lessons={lessons} currentId="initializers" basePath="/learn/extensions" />
    </div>
  );
}
