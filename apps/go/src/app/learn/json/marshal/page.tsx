import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("json");

export default function MarshalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">JSON処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マーシャル</h1>
        <p className="text-gray-400">json.Marshalで構造体からJSONへ変換する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">json.Marshal と json.MarshalIndent</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">json.Marshal</code> はGoの値をJSONバイト列に変換します。
          <code className="text-cyan-300">json.MarshalIndent</code> は整形されたJSONを生成します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">json.Marshal(v)</code> — コンパクトなJSON</li>
          <li><code className="text-cyan-300">json.MarshalIndent(v, prefix, indent)</code> — 整形JSON</li>
          <li>エクスポートされたフィールド（大文字始まり）のみ変換される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なマーシャル</h2>
        <p className="text-gray-400 mb-4">
          構造体を <code className="text-cyan-300">json.Marshal</code> でJSON文字列に変換します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string
    Age  int
    City string
}

func main() {
    p := Person{Name: "太郎", Age: 30, City: "東京"}

    // コンパクトJSON
    data, _ := json.Marshal(p)
    fmt.Println("コンパクト:", string(data))

    // 整形JSON
    pretty, _ := json.MarshalIndent(p, "", "  ")
    fmt.Println("整形:")
    fmt.Println(string(pretty))
}`}
          expectedOutput={`コンパクト: {"Name":"太郎","Age":30,"City":"東京"}
整形:
{
  "Name": "太郎",
  "Age": 30,
  "City": "東京"
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">さまざまな型のマーシャル</h2>
        <p className="text-gray-400 mb-4">
          スライス、マップ、ネストした構造体もJSONに変換できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

func main() {
    // スライス
    nums := []int{1, 2, 3, 4, 5}
    data1, _ := json.Marshal(nums)
    fmt.Println("スライス:", string(data1))

    // マップ
    m := map[string]int{"apple": 100, "banana": 200}
    data2, _ := json.Marshal(m)
    fmt.Println("マップ:", string(data2))

    // bool と nil
    data3, _ := json.Marshal(true)
    fmt.Println("真偽値:", string(data3))

    var p *string
    data4, _ := json.Marshal(p)
    fmt.Println("nil:", string(data4))
}`}
          expectedOutput={`スライス: [1,2,3,4,5]
マップ: {"apple":100,"banana":200}
真偽値: true
nil: null`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストした構造体</h2>
        <p className="text-gray-400 mb-4">
          構造体の中に別の構造体を持つ場合も、自動的にネストしたJSONになります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Address struct {
    City    string \`json:"city"\`
    Country string \`json:"country"\`
}

type Employee struct {
    Name    string  \`json:"name"\`
    Role    string  \`json:"role"\`
    Address Address \`json:"address"\`
}

func main() {
    emp := Employee{
        Name: "山田太郎",
        Role: "エンジニア",
        Address: Address{
            City:    "東京",
            Country: "日本",
        },
    }

    data, _ := json.MarshalIndent(emp, "", "  ")
    fmt.Println(string(data))
}`}
          expectedOutput={`{
  "name": "山田太郎",
  "role": "エンジニア",
  "address": {
    "city": "東京",
    "country": "日本"
  }
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="json" lessonId="marshal" />
      </div>
      <LessonNav lessons={lessons} currentId="marshal" basePath="/learn/json" />
    </div>
  );
}
