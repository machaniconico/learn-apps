import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">Goの唯一のループ構文を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">forループの構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goにはループ構文が <code className="text-cyan-300">for</code> しかありません。
          C言語スタイルの3部構成で書きます。括弧は不要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">for 初期化; 条件; 後処理 {`{}`}</code></li>
          <li>初期化と後処理は省略可能</li>
          <li>条件だけ書くとwhileスタイル</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なforループ</h2>
        <p className="text-gray-400 mb-4">
          初期化、条件、後処理の3つの部分で構成されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 基本的なforループ
    for i := 0; i < 5; i++ {
        fmt.Printf("i = %d\\n", i)
    }

    // 合計を計算
    sum := 0
    for i := 1; i <= 10; i++ {
        sum += i
    }
    fmt.Println("1〜10の合計:", sum)
}`}
          expectedOutput={`i = 0
i = 1
i = 2
i = 3
i = 4
1〜10の合計: 55`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたループ</h2>
        <p className="text-gray-400 mb-4">
          ループの中にループを書くことで、2次元的な繰り返しができます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 九九の一部
    for i := 1; i <= 3; i++ {
        for j := 1; j <= 3; j++ {
            fmt.Printf("%d x %d = %d\\n", i, j, i*j)
        }
    }
}`}
          expectedOutput={`1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
