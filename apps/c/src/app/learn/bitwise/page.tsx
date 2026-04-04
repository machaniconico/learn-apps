import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("bitwise");

const quizQuestions: QuizQuestion[] = [
  {
    question: "0b1010 & 0b1100 の結果はどれですか？",
    options: ["0b1110", "0b1000", "0b0110", "0b1111"],
    answer: 1,
    explanation: "AND演算(&)は両方のビットが1の時だけ1になります。1010 & 1100 = 1000（10進数で8）です。",
  },
  {
    question: "1 << 3 の結果はどれですか？",
    options: ["3", "6", "8", "16"],
    answer: 2,
    explanation: "左シフト(<<)はビットを左にずらします。1 << 3は1を3ビット左にシフトするので8（2の3乗）になります。",
  },
  {
    question: "XOR演算(^)の特徴として正しいのはどれですか？",
    options: [
      "両方1の時だけ1",
      "片方でも1なら1",
      "異なる時に1（排他的論理和）",
      "両方0の時だけ1",
    ],
    answer: 2,
    explanation: "XOR(^)は排他的論理和で、2つのビットが異なる時に1になります。同じ値でXORすると0になる性質があります。",
  },
  {
    question: "整数nが2の累乗かどうかを確認するビット演算はどれですか？",
    options: [
      "n % 2 == 0",
      "n & (n - 1) == 0",
      "n | (n - 1) == 0",
      "n ^ n == 0",
    ],
    answer: 1,
    explanation: "n & (n-1) == 0 は2の累乗の判定に使える有名なビットテクニックです（n > 0の場合）。2の累乗は最上位ビット1つだけが1なので、n-1との ANDが0になります。",
  },
];

export default function BitwisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">ビット演算</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語のビット演算を学びます。AND/OR/XOR/NOTの基本演算子から、シフト演算、ビットマスク・フラグ操作、実践的なビット演算テクニックまで習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="bitwise" totalLessons={6} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/bitwise" color="red" categoryId="bitwise" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビット演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          AND・OR・XOR・NOT・シフト演算子でビット単位の操作ができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    unsigned int a = 0b1010;  // 10
    unsigned int b = 0b1100;  // 12

    printf("a     = %04b (%d)\\n", a, a);
    printf("b     = %04b (%d)\\n", b, b);
    printf("a & b = %04b (%d)\\n", a & b, a & b);
    printf("a | b = %04b (%d)\\n", a | b, a | b);
    printf("a ^ b = %04b (%d)\\n", a ^ b, a ^ b);
    printf("~a    = ...%04b\\n", ~a & 0xF);
    printf("a << 1 = %d\\n", a << 1);
    printf("a >> 1 = %d\\n", a >> 1);

    return 0;
}`}
          expectedOutput={`a     = 1010 (10)
b     = 1100 (12)
a & b = 1000 (8)
a | b = 1110 (14)
a ^ b = 0110 (6)
~a    = ...0101
a << 1 = 20
a >> 1 = 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビットフラグの実践</h2>
        <p className="text-gray-400 mb-4">
          ビットフラグでコンパクトに複数の真偽値を管理できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define FLAG_READ    (1 << 0)  // 0001
#define FLAG_WRITE   (1 << 1)  // 0010
#define FLAG_EXECUTE (1 << 2)  // 0100

int main() {
    unsigned int perms = 0;

    // フラグを立てる
    perms |= FLAG_READ | FLAG_WRITE;
    printf("読み書き権限: %d\\n", perms);

    // フラグチェック
    if (perms & FLAG_READ)    printf("読み取り: 可\\n");
    if (perms & FLAG_WRITE)   printf("書き込み: 可\\n");
    if (!(perms & FLAG_EXECUTE)) printf("実行: 不可\\n");

    // フラグを消す
    perms &= ~FLAG_WRITE;
    printf("書き込み削除後: %d\\n", perms);

    return 0;
}`}
          expectedOutput={`読み書き権限: 3
読み取り: 可
書き込み: 可
実行: 不可
書き込み削除後: 1`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
