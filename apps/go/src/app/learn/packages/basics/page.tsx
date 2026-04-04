import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PackageBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ・モジュール レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パッケージの基本</h1>
        <p className="text-gray-400">package宣言、import文、標準ライブラリの使い方を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">package宣言</h2>
        <p className="text-gray-400 mb-4">
          すべてのGoファイルは <code className="text-cyan-300">package</code> 宣言から始まります。
          実行可能プログラムは <code className="text-cyan-300">package main</code> を使い、
          ライブラリは任意のパッケージ名を使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("これは package main のプログラムです")
    fmt.Println("main パッケージの main() がエントリーポイント")
}`}
          expectedOutput={`これは package main のプログラムです
main パッケージの main() がエントリーポイント`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">import文</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">import</code> 文で他のパッケージを読み込みます。
          複数のパッケージは括弧でグループ化できます。使用されていないimportはコンパイルエラーになります。
        </p>
        <GoEditor
          defaultCode={`package main

// グループ化されたimport
import (
    "fmt"
    "math"
    "strings"
    "time"
)

func main() {
    // fmtパッケージ: 入出力
    fmt.Println("=== 標準ライブラリ ===")

    // mathパッケージ: 数学関数
    fmt.Printf("√2 = %.4f\\n", math.Sqrt(2))

    // stringsパッケージ: 文字列操作
    fmt.Println(strings.Repeat("-", 20))

    // timeパッケージ: 時間操作
    fmt.Printf("現在時刻の秒: %d\\n", time.Now().Second())
}`}
          expectedOutput={`=== 標準ライブラリ ===
√2 = 1.4142
--------------------
現在時刻の秒: 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">主要な標準ライブラリ</h2>
        <p className="text-gray-400 mb-4">
          Goの標準ライブラリは非常に充実しています。よく使うパッケージを紹介します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
    "strconv"
    "strings"
)

func main() {
    // strings: 文字列操作
    fmt.Println("■ strings パッケージ")
    fmt.Println(strings.ToUpper("hello"))
    fmt.Println(strings.Contains("Go言語", "Go"))
    fmt.Println(strings.Split("a,b,c", ","))

    // strconv: 文字列変換
    fmt.Println("\\n■ strconv パッケージ")
    num, _ := strconv.Atoi("42")
    fmt.Printf("文字列→整数: %d\\n", num)
    str := strconv.Itoa(100)
    fmt.Printf("整数→文字列: %s\\n", str)

    // sort: ソート
    fmt.Println("\\n■ sort パッケージ")
    nums := []int{5, 2, 8, 1, 9}
    sort.Ints(nums)
    fmt.Println("ソート済み:", nums)
}`}
          expectedOutput={`■ strings パッケージ
HELLO
true
[a b c]

■ strconv パッケージ
文字列→整数: 42
整数→文字列: 100

■ sort パッケージ
ソート済み: [1 2 5 8 9]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/packages" />
    </div>
  );
}
