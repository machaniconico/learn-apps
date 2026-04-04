import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function NilPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ポインタ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">nilポインタ</h1>
        <p className="text-gray-400">nilポインタの扱いと安全なアクセスパターンを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">nilポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">nil</code> はポインタのゼロ値で、「どこも指していない」ことを表します。
          nilポインタをデリファレンスするとランタイムパニックが発生するため、使用前に必ずnilチェックを行うことが重要です。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">nilポインタの確認</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    var p *int
    fmt.Println("p:", p)
    fmt.Println("p == nil:", p == nil)

    // nilチェックしてから使う
    if p != nil {
        fmt.Println("値:", *p)
    } else {
        fmt.Println("ポインタはnilです")
    }

    // 値を設定
    x := 42
    p = &x
    fmt.Println("設定後 p == nil:", p == nil)
    fmt.Println("値:", *p)
}`}
          expectedOutput={`p: <nil>
p == nil: true
ポインタはnilです
設定後 p == nil: false
値: 42`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全なアクセスパターン</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Config struct {
    Host string
    Port int
}

func getConfig(env string) *Config {
    if env == "production" {
        return &Config{Host: "api.example.com", Port: 443}
    }
    return nil  // 設定が見つからない場合
}

func main() {
    // 安全なアクセスパターン
    config := getConfig("production")
    if config != nil {
        fmt.Printf("接続先: %s:%d\\n", config.Host, config.Port)
    }

    // nilが返る場合
    config2 := getConfig("staging")
    if config2 != nil {
        fmt.Printf("接続先: %s:%d\\n", config2.Host, config2.Port)
    } else {
        fmt.Println("設定が見つかりません")
    }
}`}
          expectedOutput={`接続先: api.example.com:443
設定が見つかりません`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドでのnilレシーバ</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type List struct {
    Value int
    Next  *List
}

func (l *List) Sum() int {
    if l == nil {
        return 0
    }
    return l.Value + l.Next.Sum()
}

func main() {
    list := &List{
        Value: 1,
        Next: &List{
            Value: 2,
            Next: &List{
                Value: 3,
                Next:  nil,
            },
        },
    }

    fmt.Println("合計:", list.Sum())

    // nilリストでも安全
    var empty *List
    fmt.Println("空リストの合計:", empty.Sum())
}`}
          expectedOutput={`合計: 6
空リストの合計: 0`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="nil" />
      </div>
      <LessonNav lessons={lessons} currentId="nil" basePath="/learn/pointers" />
    </div>
  );
}
