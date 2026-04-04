import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">constによる定数定義を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">定数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">const</code> で宣言された値は変更できません。
          コンパイル時に値が確定し、型付きと型なしの定数があります。
          <code className="text-cyan-300">iota</code> で連番の定数を簡単に定義できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">const Pi = 3.14</code> — 型なし定数</li>
          <li><code className="text-cyan-300">const Pi float64 = 3.14</code> — 型付き定数</li>
          <li><code className="text-cyan-300">iota</code> — 自動インクリメント</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な定数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">const</code> で値を定義し、プログラム中で変更できない値を宣言します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

const Pi = 3.14159
const AppName = "MyApp"

func main() {
    const maxRetries = 3

    fmt.Println("Pi:", Pi)
    fmt.Println("アプリ名:", AppName)
    fmt.Println("最大リトライ:", maxRetries)
}`}
          expectedOutput={`Pi: 3.14159
アプリ名: MyApp
最大リトライ: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">iotaによる列挙</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">iota</code> は <code className="text-cyan-300">const</code> ブロック内で
          0から自動的にインクリメントされます。列挙型の代わりに使えます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

const (
    Sunday    = iota // 0
    Monday           // 1
    Tuesday          // 2
    Wednesday        // 3
    Thursday         // 4
    Friday           // 5
    Saturday         // 6
)

const (
    KB = 1 << (10 * (iota + 1))
    MB
    GB
)

func main() {
    fmt.Println("日曜日:", Sunday)
    fmt.Println("月曜日:", Monday)
    fmt.Println("土曜日:", Saturday)
    fmt.Printf("KB: %d, MB: %d, GB: %d\\n", KB, MB, GB)
}`}
          expectedOutput={`日曜日: 0
月曜日: 1
土曜日: 6
KB: 1024, MB: 1048576, GB: 1073741824`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
