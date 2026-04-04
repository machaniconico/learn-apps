import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ポインタ変数を宣言するために使う記号はどれですか？",
    options: [
      "&（アンパサンド）",
      "*（アスタリスク）",
      "#（シャープ）",
      "@（アットマーク）",
    ],
    answer: 1,
    explanation: "ポインタ変数の宣言には * を使います。例: int* ptr; は int 型へのポインタを宣言します。& はアドレス取得演算子です。",
  },
  {
    question: "int x = 10; int* p = &x; とした場合、*p の値はいくつですか？",
    options: [
      "x のメモリアドレス",
      "10",
      "ポインタ p 自身のアドレス",
      "コンパイルエラー",
    ],
    answer: 1,
    explanation: "*p はデリファレンス（間接参照）で、p が指す先の値を取得します。p は x を指しているので *p は 10 です。",
  },
  {
    question: "nullptr の説明として正しいものはどれですか？",
    options: [
      "整数値 0 と完全に同じ",
      "どの型のポインタにも代入できる型安全なヌルポインタ",
      "C++11より前から存在するキーワード",
      "参照変数にも代入できる",
    ],
    answer: 1,
    explanation: "nullptr は C++11 で導入された型安全なヌルポインタリテラルです。std::nullptr_t 型を持ち、任意のポインタ型に暗黙変換されますが、整数型には変換されません。",
  },
  {
    question: "int arr[5]; において arr + 3 が指すのはどこですか？",
    options: [
      "arr の先頭から 3 バイト先",
      "arr の先頭から 3 要素先（arr[3]）",
      "arr の最後の要素",
      "未定義動作",
    ],
    answer: 1,
    explanation: "ポインタ演算では、+3 は「要素 3 つ分」のアドレスを進めます。int が 4 バイトなら実際には 12 バイト先ですが、論理的には arr[3] を指します。",
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
          C++のポインタはメモリアドレスを直接扱う強力な機能です。
          ポインタの基本からデリファレンス・nullptr・ポインタ演算・配列との関係・
          constポインタ・voidポインタまで、メモリ操作の基礎を習得します。
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
        <h2 className="text-xl font-bold text-white mb-3">ポインタの概要</h2>
        <p className="text-gray-400 mb-4">
          ポインタはメモリアドレスを格納する変数です。
          <code className="text-orange-400">&amp;</code> でアドレスを取得し、
          <code className="text-orange-400">*</code> でそのアドレスの値にアクセスします。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;  // x のアドレスをポインタに格納

    cout << "x の値: " << x << endl;
    cout << "x のアドレス: " << &x << endl;
    cout << "ptr の値（アドレス）: " << ptr << endl;
    cout << "*ptr（デリファレンス）: " << *ptr << endl;

    *ptr = 100;  // ポインタ経由で値を変更
    cout << "変更後の x: " << x << endl;

    return 0;
}`}
          expectedOutput={`x の値: 42
x のアドレス: 0x7ffd...
ptr の値（アドレス）: 0x7ffd...
*ptr（デリファレンス）: 42
変更後の x: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ演算と配列</h2>
        <p className="text-gray-400 mb-4">
          ポインタに整数を加減算すると、指す型のサイズ分だけアドレスが移動します。
          配列名は先頭要素へのポインタとして扱えるため、ポインタ演算で配列を走査できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* p = arr;  // 配列名はポインタに変換される

    for (int i = 0; i < 5; i++) {
        cout << "arr[" << i << "] = " << *(p + i) << endl;
    }

    cout << "--- ポインタのインクリメント ---" << endl;
    int* q = arr;
    while (q < arr + 5) {
        cout << *q << " ";
        q++;
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
arr[4] = 50
--- ポインタのインクリメント ---
10 20 30 40 50`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
