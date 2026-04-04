import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function ElseIfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">else if</h1>
        <p className="text-gray-400">else ifを使って複数の条件をチェーンする方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">else ifチェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数の条件を順番にチェックするには <code className="text-cyan-300">else if</code> を使います。
          条件は上から順に評価され、最初に <code className="text-cyan-300">true</code> になったブロックが実行されます。
          どの条件も満たさない場合は <code className="text-cyan-300">else</code> ブロックが実行されます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 成績判定</h2>
        <SwiftEditor
          defaultCode={`func gradeLabel(_ score: Int) -> String {
    if score >= 90 {
        return "S"
    } else if score >= 80 {
        return "A"
    } else if score >= 70 {
        return "B"
    } else if score >= 60 {
        return "C"
    } else {
        return "F"
    }
}

let scores = [95, 82, 71, 63, 45]
for score in scores {
    print("\\(score)点 → \\(gradeLabel(score))")`}
          expectedOutput={`95点 → S
82点 → A
71点 → B
63点 → C
45点 → F`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文との使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          範囲や複雑な条件には <code className="text-cyan-300">else if</code> が適しています。
          特定の値のマッチングには <code className="text-cyan-300">switch</code> 文の方が読みやすい場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: BMI判定</h2>
        <SwiftEditor
          defaultCode={`func bmiCategory(weight: Double, height: Double) -> String {
    let bmi = weight / (height * height)

    if bmi < 18.5 {
        return "低体重"
    } else if bmi < 25.0 {
        return "普通体重"
    } else if bmi < 30.0 {
        return "肥満（1度）"
    } else {
        return "肥満（2度以上）"
    }
}

print(bmiCategory(weight: 50, height: 1.70))
print(bmiCategory(weight: 65, height: 1.70))
print(bmiCategory(weight: 85, height: 1.70))`}
          expectedOutput={`低体重
普通体重
肥満（1度）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
