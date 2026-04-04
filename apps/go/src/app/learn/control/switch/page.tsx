import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch文</h1>
        <p className="text-gray-400">値による多分岐を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの <code className="text-cyan-300">switch</code> はC言語と異なり、自動的に <code className="text-cyan-300">break</code> されます。
          <code className="text-cyan-300">fallthrough</code> で次のcaseに落とすことができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>各caseは自動的にbreak（fallthroughで継続可能）</li>
          <li>複数の値をカンマ区切りでマッチできる</li>
          <li>条件なしswitchも使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なswitch</h2>
        <p className="text-gray-400 mb-4">
          値に応じて処理を分岐します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    day := "水曜日"

    switch day {
    case "月曜日":
        fmt.Println("週の始まり")
    case "水曜日":
        fmt.Println("週の真ん中")
    case "金曜日":
        fmt.Println("もうすぐ週末")
    default:
        fmt.Println("普通の日")
    }
}`}
          expectedOutput={`週の真ん中`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数値のcase</h2>
        <p className="text-gray-400 mb-4">
          1つの <code className="text-cyan-300">case</code> にカンマ区切りで複数の値を指定できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    month := 4

    switch month {
    case 3, 4, 5:
        fmt.Println("春")
    case 6, 7, 8:
        fmt.Println("夏")
    case 9, 10, 11:
        fmt.Println("秋")
    case 12, 1, 2:
        fmt.Println("冬")
    default:
        fmt.Println("不正な月")
    }
}`}
          expectedOutput={`春`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch" />
      </div>
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
