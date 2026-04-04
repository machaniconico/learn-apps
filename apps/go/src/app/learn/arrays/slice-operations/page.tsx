import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SliceOperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スライス操作</h1>
        <p className="text-gray-400">append、copy、部分スライスなどの操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主なスライス操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スライスには <code className="text-cyan-300">append</code>（追加）、<code className="text-cyan-300">copy</code>（コピー）、
          部分スライス（スライシング）などの操作があります。<code className="text-cyan-300">append</code> は新しいスライスを返すため、
          必ず結果を変数に再代入する必要があります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">appendで要素を追加</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := []int{1, 2, 3}

    // 1つ追加
    s = append(s, 4)
    fmt.Println("1つ追加:", s)

    // 複数追加
    s = append(s, 5, 6, 7)
    fmt.Println("複数追加:", s)

    // スライスを結合（...で展開）
    other := []int{8, 9, 10}
    s = append(s, other...)
    fmt.Println("結合:", s)
}`}
          expectedOutput={`1つ追加: [1 2 3 4]
複数追加: [1 2 3 4 5 6 7]
結合: [1 2 3 4 5 6 7 8 9 10]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">copyでスライスをコピー</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    src := []int{1, 2, 3, 4, 5}
    dst := make([]int, len(src))

    n := copy(dst, src)
    fmt.Println("コピー数:", n)
    fmt.Println("src:", src)
    fmt.Println("dst:", dst)

    // dstを変更してもsrcに影響しない
    dst[0] = 100
    fmt.Println("変更後 src:", src)
    fmt.Println("変更後 dst:", dst)
}`}
          expectedOutput={`コピー数: 5
src: [1 2 3 4 5]
dst: [1 2 3 4 5]
変更後 src: [1 2 3 4 5]
変更後 dst: [100 2 3 4 5]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">部分スライス（スライシング）</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

    // s[low:high] - lowからhigh-1まで
    fmt.Println("s[2:5]:", s[2:5])

    // 先頭から
    fmt.Println("s[:3]:", s[:3])

    // 末尾まで
    fmt.Println("s[7:]:", s[7:])

    // 全体
    fmt.Println("s[:]:", s[:])

    // 最後の3要素
    fmt.Println("最後の3つ:", s[len(s)-3:])
}`}
          expectedOutput={`s[2:5]: [2 3 4]
s[:3]: [0 1 2]
s[7:]: [7 8 9]
s[:]: [0 1 2 3 4 5 6 7 8 9]
最後の3つ: [7 8 9]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="slice-operations" />
      </div>
      <LessonNav lessons={lessons} currentId="slice-operations" basePath="/learn/arrays" />
    </div>
  );
}
