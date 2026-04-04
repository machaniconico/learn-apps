import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

const quizQuestions: QuizQuestion[] = [
  {
    question: "int *p = &x; において &x が表すものはどれですか？",
    options: [
      "xの値",
      "xのアドレス（メモリ上の場所）",
      "xのコピー",
      "ポインタpのサイズ",
    ],
    answer: 1,
    explanation: "&はアドレス演算子で、変数のメモリアドレスを取得します。int *p = &x; はxのアドレスをポインタpに代入します。",
  },
  {
    question: "*p = 10; の操作として正しい説明はどれですか？",
    options: [
      "pの値を10にする",
      "pのアドレスを10にする",
      "pが指す先（pのポイント先）に10を代入する",
      "新しいポインタを作成する",
    ],
    answer: 2,
    explanation: "*（デリファレンス演算子）はポインタが指す先のメモリにアクセスします。*p = 10はpが指す変数に10を代入します。",
  },
  {
    question: "int arr[5]; において arr と &arr[0] の関係として正しいものはどれですか？",
    options: [
      "arrは配列のサイズを表す",
      "arrと&arr[0]は同じアドレスを指す",
      "arrはNULLポインタである",
      "arrと&arr[0]は別のアドレスを指す",
    ],
    answer: 1,
    explanation: "配列名はその配列の先頭要素へのポインタに暗黙変換されます。arr と &arr[0] は同じアドレスを表します。",
  },
  {
    question: "NULLポインタを使う主な目的として最も適切なものはどれですか？",
    options: [
      "ポインタを高速化するため",
      "ポインタが有効なアドレスを指していないことを示すため",
      "ポインタのサイズを0にするため",
      "ポインタを定数にするため",
    ],
    answer: 1,
    explanation: "NULLポインタは「まだ初期化されていない」「有効なアドレスを指していない」ことを示すために使います。NULLチェックで安全なポインタ操作が可能です。",
  },
];

export default function PointersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">ポインタ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語最大の特徴であるポインタをマスターしましょう。メモリアドレスの概念から、デリファレンス・ポインタ演算・配列との関係まで、ポインタの全体像を体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="pointers" totalLessons={8} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/pointers" color="orange" categoryId="pointers" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタの基本</h2>
        <p className="text-gray-400 mb-4">
          ポインタは変数のメモリアドレスを格納する変数です。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">int *p</code> でポインタを宣言し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">&x</code> でアドレスを取得、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">*p</code> でポイント先にアクセスします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 42;
    int *p = &x;  // xのアドレスをpに格納

    printf("xの値: %d\\n", x);
    printf("xのアドレス: %p\\n", (void*)&x);
    printf("pの値（アドレス）: %p\\n", (void*)p);
    printf("*pの値（デリファレンス）: %d\\n", *p);

    *p = 100;  // ポインタ経由で値を変更
    printf("変更後のx: %d\\n", x);

    return 0;
}`}
          expectedOutput={`xの値: 42
xのアドレス: 0x7ffd...（環境依存）
pの値（アドレス）: 0x7ffd...（環境依存）
*pの値（デリファレンス）: 42
変更後のx: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列とポインタの関係</h2>
        <p className="text-gray-400 mb-4">
          配列名はその先頭要素へのポインタとして使えます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">arr[i]</code> と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">*(arr+i)</code> は完全に等価です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;  // 配列の先頭アドレス

    // 2つの書き方は等価
    printf("arr[2] = %d\\n", arr[2]);
    printf("*(arr+2) = %d\\n", *(arr + 2));
    printf("*(p+2) = %d\\n", *(p + 2));

    // ポインタで配列を走査
    for (int i = 0; i < 5; i++) {
        printf("%d ", *(p + i));
    }
    printf("\\n");

    return 0;
}`}
          expectedOutput={`arr[2] = 30
*(arr+2) = 30
*(p+2) = 30
10 20 30 40 50`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
