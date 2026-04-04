import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("maps");

export default function NestedMapsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">マップ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネストしたマップ</h1>
        <p className="text-gray-400">マップの中にマップを入れるネスト構造を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたマップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">map[string]map[string]int</code> のようにマップの値にマップを使うことで、
          多次元のデータ構造を作れます。ただし、内側のマップは使用前に必ず<code className="text-cyan-300">make</code>で初期化する必要があります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なネストマップ</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // ネストしたマップをリテラルで作成
    grades := map[string]map[string]int{
        "Alice": {
            "数学": 90,
            "英語": 85,
            "理科": 92,
        },
        "Bob": {
            "数学": 78,
            "英語": 88,
            "理科": 75,
        },
    }

    // アクセス
    fmt.Println("Aliceの数学:", grades["Alice"]["数学"])
    fmt.Println("Bobの英語:", grades["Bob"]["英語"])

    // 走査
    for name, subjects := range grades {
        fmt.Printf("%s の成績:\\n", name)
        for subject, score := range subjects {
            fmt.Printf("  %s: %d点\\n", subject, score)
        }
    }
}`}
          expectedOutput={`Aliceの数学: 90
Bobの英語: 88
Alice の成績:
  数学: 90点
  英語: 85点
  理科: 92点
Bob の成績:
  数学: 78点
  英語: 88点
  理科: 75点`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">動的にネストマップを構築</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 動的にネストマップを構築する場合、内側のmakeが必要
    data := make(map[string]map[string]int)

    // 内側のマップを初期化してから代入
    if data["Tokyo"] == nil {
        data["Tokyo"] = make(map[string]int)
    }
    data["Tokyo"]["population"] = 14000000
    data["Tokyo"]["area"] = 2194

    if data["Osaka"] == nil {
        data["Osaka"] = make(map[string]int)
    }
    data["Osaka"]["population"] = 8800000
    data["Osaka"]["area"] = 1905

    for city, info := range data {
        fmt.Printf("%s: 人口=%d, 面積=%dkm²\\n", city, info["population"], info["area"])
    }
}`}
          expectedOutput={`Tokyo: 人口=14000000, 面積=2194km²
Osaka: 人口=8800000, 面積=1905km²`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全なアクセスヘルパー</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 安全にネストマップにアクセスするヘルパー
func safeGet(m map[string]map[string]int, key1, key2 string) (int, bool) {
    inner, ok := m[key1]
    if !ok {
        return 0, false
    }
    val, ok := inner[key2]
    return val, ok
}

func safeSet(m map[string]map[string]int, key1, key2 string, value int) {
    if m[key1] == nil {
        m[key1] = make(map[string]int)
    }
    m[key1][key2] = value
}

func main() {
    m := make(map[string]map[string]int)

    safeSet(m, "user1", "score", 100)
    safeSet(m, "user1", "level", 5)
    safeSet(m, "user2", "score", 200)

    if val, ok := safeGet(m, "user1", "score"); ok {
        fmt.Println("user1 score:", val)
    }

    if val, ok := safeGet(m, "user3", "score"); ok {
        fmt.Println("user3 score:", val)
    } else {
        fmt.Println("user3 は存在しません")
    }
}`}
          expectedOutput={`user1 score: 100
user3 は存在しません`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="maps" lessonId="nested" />
      </div>
      <LessonNav lessons={lessons} currentId="nested" basePath="/learn/maps" />
    </div>
  );
}
