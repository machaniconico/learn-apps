import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

const quizQuestions: QuizQuestion[] = [
  {
    question: "malloc()が失敗した場合に返す値はどれですか？",
    options: ["0", "-1", "NULL", "undefined"],
    answer: 2,
    explanation: "malloc()はメモリ確保に失敗するとNULLを返します。必ずNULLチェックを行いましょう。",
  },
  {
    question: "calloc()とmalloc()の主な違いはどれですか？",
    options: [
      "calloc()はより高速",
      "calloc()は確保したメモリをゼロで初期化する",
      "calloc()は固定サイズしか確保できない",
      "calloc()はスタックに確保する",
    ],
    answer: 1,
    explanation: "calloc()はmalloc()と異なり、確保したメモリを全て0に初期化します。引数も要素数と要素サイズの2つです。",
  },
  {
    question: "free()で解放したポインタをもう一度free()することを何と言いますか？",
    options: ["メモリリーク", "バッファオーバーフロー", "二重解放（double free）", "ダングリングポインタ"],
    answer: 2,
    explanation: "同じポインタを2回free()することを二重解放（double free）といい、未定義動作を引き起こします。",
  },
  {
    question: "realloc()について正しい説明はどれですか？",
    options: [
      "メモリを解放して再確保する専用関数",
      "既存のメモリブロックのサイズを変更する",
      "calloc()の別名",
      "スタックメモリのサイズを変更する",
    ],
    answer: 1,
    explanation: "realloc()は既に確保したメモリブロックのサイズを変更します。失敗時はNULLを返し、元のポインタは有効のままです。",
  },
];

export default function MemoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">メモリ管理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の動的メモリ管理を学びます。malloc・free・calloc・reallocの使い方から、メモリリーク・バッファオーバーフローなどの安全性まで解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="memory" totalLessons={6} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/memory" color="orange" categoryId="memory" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">malloc・free の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">malloc()</code> でヒープにメモリを確保し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">free()</code> で解放します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("メモリ確保失敗\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    free(arr);
    return 0;
}`}
          expectedOutput={`arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
arr[4] = 50`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">calloc と realloc</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">calloc()</code> はゼロ初期化つきの確保、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">realloc()</code> はサイズ変更に使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    // calloc: ゼロ初期化
    int *arr = (int *)calloc(3, sizeof(int));
    printf("calloc後: %d %d %d\\n", arr[0], arr[1], arr[2]);

    arr[0] = 1; arr[1] = 2; arr[2] = 3;

    // realloc: サイズ拡張
    arr = (int *)realloc(arr, 5 * sizeof(int));
    arr[3] = 4; arr[4] = 5;

    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}`}
          expectedOutput={`calloc後: 0 0 0
1 2 3 4 5`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
