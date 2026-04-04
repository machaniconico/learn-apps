import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("maps");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goでマップを作成するキーワードはどれですか？",
    options: ["new", "create", "make", "init"],
    answer: 2,
    explanation: "make(map[K]V) でマップを作成します。リテラルでも作成可能です。",
  },
  {
    question: "マップにキーが存在するか確認する正しい書き方はどれですか？",
    options: ["m.has(key)", "m.exists(key)", "val, ok := m[key]", "m.contains(key)"],
    answer: 2,
    explanation: "val, ok := m[key] のok idiomでキーの存在を確認します。",
  },
  {
    question: "マップからキーを削除するにはどうしますか？",
    options: ["m.remove(key)", "delete(m, key)", "m.delete(key)", "remove(m, key)"],
    answer: 1,
    explanation: "組み込み関数 delete(m, key) でマップからキーを削除します。",
  },
  {
    question: "並行安全なマップを提供するパッケージはどれですか？",
    options: ["maps", "concurrent", "sync", "safe"],
    answer: 2,
    explanation: "sync.Map が並行安全なマップを提供します。",
  },
];

export default function MapsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">マップ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          マップはキーと値のペアを格納するデータ構造で、他の言語のハッシュマップや辞書に相当します。
          Goのマップは柔軟で強力な機能を提供し、データの検索・追加・削除を効率的に行えます。
          このカテゴリでは、マップの基本操作から並行安全なsync.Mapまで学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="maps" totalLessons={6} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/maps" color="red" categoryId="maps" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マップの基本例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // マップの作成
    ages := map[string]int{
        "Alice": 25,
        "Bob":   30,
        "Carol": 28,
    }
    fmt.Println("マップ:", ages)

    // 値の取得
    fmt.Println("Aliceの年齢:", ages["Alice"])

    // 存在チェック
    val, ok := ages["Dave"]
    fmt.Printf("Dave: 値=%d, 存在=%t\\n", val, ok)
}`}
          expectedOutput={`マップ: map[Alice:25 Bob:30 Carol:28]
Aliceの年齢: 25
Dave: 値=0, 存在=false`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マップ操作の例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    m := make(map[string]int)
    m["x"] = 10
    m["y"] = 20
    m["z"] = 30

    // 走査
    for key, value := range m {
        fmt.Printf("%s: %d\\n", key, value)
    }

    // 削除
    delete(m, "y")
    fmt.Println("削除後:", m)
}`}
          expectedOutput={`x: 10
y: 20
z: 30
削除後: map[x:10 z:30]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
