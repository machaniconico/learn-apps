import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("idioms");

const quizQuestions: QuizQuestion[] = [
  {
    question: "不透明ポインタ（opaque pointer）パターンの目的は何ですか？",
    options: [
      "ポインタのサイズを小さくする",
      "実装の詳細を隠蔽してカプセル化を実現する",
      "メモリ使用量を削減する",
      "ポインタの型安全性を高める",
    ],
    answer: 1,
    explanation: "不透明ポインタはヘッダで構造体を前方宣言のみしてポインタとして扱い、実装の詳細を.cファイルに隠します。CでオブジェクトのカプセルかをするC言語的なパターンです。",
  },
  {
    question: "stdint.hを使う主な理由はどれですか？",
    options: [
      "コンパイルを速くするため",
      "int型のサイズを大きくするため",
      "プラットフォーム間で整数型のサイズを確定するため",
      "浮動小数点演算を改善するため",
    ],
    answer: 2,
    explanation: "stdint.hはint32_t, uint64_tなどの固定幅整数型を定義します。intのサイズはプラットフォームによって異なるため、移植性のあるコードを書くために使います。",
  },
  {
    question: "K&Rスタイルとは何ですか？",
    options: [
      "カーニハンとリッチーが提唱した、開き波括弧を行末に置くスタイル",
      "クヌースとルーセルのコーディング規約",
      "開き波括弧を常に新行に置くスタイル",
      "インデントにタブを使わないスタイル",
    ],
    answer: 0,
    explanation: "K&RスタイルはKernighan & Ritchieの「プログラミング言語C」に由来し、開き波括弧を行末に置きます。Allmanスタイルは開き波括弧を新行に置きます。",
  },
  {
    question: "キャッシュフレンドリーなコードとはどのようなコードですか？",
    options: [
      "キャッシュファイルを多用するコード",
      "メモリアクセスが連続的で空間的局所性が高いコード",
      "CPU命令数が少ないコード",
      "ヒープ割り当てを多用するコード",
    ],
    answer: 1,
    explanation: "キャッシュフレンドリーなコードはメモリの連続した領域にアクセスし（空間的局所性）、CPUキャッシュのミスを減らします。2次元配列は行優先でアクセスするのが典型例です。",
  },
];

export default function IdiomsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">イディオム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の慣用的な書き方とベストプラクティスを学びましょう。コーディングスタイル、デザインパターン、安全なコードの書き方、移植性、パフォーマンスチューニングを解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="idioms" totalLessons={5} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/idioms" color="cyan" categoryId="idioms" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールバックパターン</h2>
        <p className="text-gray-400 mb-4">
          関数ポインタを使ったコールバックはCの重要なイディオムです。
          qsort()の比較関数やイベントハンドラに広く使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

/* 比較コールバック */
int compare_asc(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int compare_desc(const void *a, const void *b) {
    return (*(int*)b - *(int*)a);
}

void print_array(int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = 6;

    qsort(arr, n, sizeof(int), compare_asc);
    printf("昇順: ");
    print_array(arr, n);

    qsort(arr, n, sizeof(int), compare_desc);
    printf("降順: ");
    print_array(arr, n);

    return 0;
}`}
          expectedOutput={`昇順: 1 2 3 5 8 9
降順: 9 8 5 3 2 1 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">固定幅整数型（stdint.h）</h2>
        <p className="text-gray-400 mb-4">
          移植性の高いコードのために
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">stdint.h</code> の固定幅型を使いましょう。
          プラットフォームによらずサイズが確定します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>

int main(void) {
    int8_t  a = 127;          /* 8ビット符号付き */
    uint8_t b = 255;          /* 8ビット符号なし */
    int32_t c = 2147483647;   /* 32ビット符号付き */
    uint64_t d = 18446744073709551615ULL; /* 64ビット符号なし最大 */

    printf("int8_t  max: %d\\n", a);
    printf("uint8_t max: %u\\n", b);
    printf("int32_t max: %d\\n", c);
    printf("sizeof(int32_t) = %zu\\n", sizeof(int32_t));
    printf("sizeof(uint64_t) = %zu\\n", sizeof(uint64_t));

    return 0;
}`}
          expectedOutput={`int8_t  max: 127
uint8_t max: 255
int32_t max: 2147483647
sizeof(int32_t) = 4
sizeof(uint64_t) = 8`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
