import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

export default function InterfaceBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">インターフェース レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターフェースの基本</h1>
        <p className="text-gray-400">暗黙的な実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インターフェースはメソッドのセットを定義する型です。
          Goでは <code className="text-cyan-300">implements</code> キーワードは不要で、
          メソッドを実装するだけで暗黙的にインターフェースを満たします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>メソッドシグネチャの集合を定義</li>
          <li>暗黙的な実装（ダックタイピング）</li>
          <li>「振る舞い」による抽象化</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの定義と実装</h2>
        <p className="text-gray-400 mb-4">
          インターフェースを定義し、構造体で実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// インターフェースの定義
type Greeter interface {
    Greet() string
}

// 日本語の挨拶
type JapaneseGreeter struct {
    Name string
}

func (g JapaneseGreeter) Greet() string {
    return fmt.Sprintf("こんにちは、%sです！", g.Name)
}

// 英語の挨拶
type EnglishGreeter struct {
    Name string
}

func (g EnglishGreeter) Greet() string {
    return fmt.Sprintf("Hello, I'm %s!", g.Name)
}

func main() {
    greeters := []Greeter{
        JapaneseGreeter{Name: "太郎"},
        EnglishGreeter{Name: "John"},
    }

    for _, g := range greeters {
        fmt.Println(g.Greet())
    }
}`}
          expectedOutput={`こんにちは、太郎です！
Hello, I'm John!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースを引数に取る</h2>
        <p className="text-gray-400 mb-4">
          関数の引数にインターフェースを使うと、任意の実装を受け取れます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Stringer interface {
    String() string
}

type Dog struct{ Name string }
type Cat struct{ Name string }

func (d Dog) String() string { return fmt.Sprintf("犬: %s", d.Name) }
func (c Cat) String() string { return fmt.Sprintf("猫: %s", c.Name) }

func printInfo(s Stringer) {
    fmt.Println(s.String())
}

func main() {
    printInfo(Dog{Name: "ポチ"})
    printInfo(Cat{Name: "ミケ"})
}`}
          expectedOutput={`犬: ポチ
猫: ミケ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="interfaces" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/interfaces" />
    </div>
  );
}
