import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("enums");

const quizQuestions: QuizQuestion[] = [
  {
    question: "enumの最初のメンバに明示的な値を指定しない場合、デフォルト値は何ですか？",
    options: ["1", "-1", "0", "undefined"],
    answer: 2,
    explanation: "enumの最初のメンバは明示的な値を指定しない限り0になります。その後は1ずつ増加します。",
  },
  {
    question: "typedefの主な用途として正しいのはどれですか？",
    options: [
      "変数のメモリサイズを変える",
      "既存の型に別名をつける",
      "型を動的に変更する",
      "関数の戻り値型を省略する",
    ],
    answer: 1,
    explanation: "typedefは既存の型に新しい名前（別名）をつけるために使います。コードの可読性向上に役立ちます。",
  },
  {
    question: "const修飾子について正しい説明はどれですか？",
    options: [
      "実行時に値が変わらないことを保証する",
      "コンパイル時に値が固定される",
      "変数を読み取り専用にするヒントをコンパイラに与える",
      "変数をスタックに配置する",
    ],
    answer: 2,
    explanation: "constは変数を変更しようとするとコンパイルエラーにします。コンパイラへの最適化ヒントにもなります。",
  },
  {
    question: "sizeof演算子の戻り値の型はどれですか？",
    options: ["int", "unsigned int", "size_t", "long"],
    answer: 2,
    explanation: "sizeofの戻り値はsize_t型（stddef.hで定義）です。符号なし整数型で、通常はunsigned intまたはunsigned long相当です。",
  },
];

export default function EnumsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">enum・型</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語のenum・typedef・型修飾子・sizeof演算子を学びます。コードの可読性と安全性を高めるテクニックを習得しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="enums" totalLessons={5} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/enums" color="violet" categoryId="enums" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">enum の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">enum</code> で名前付き整数定数を定義できます。マジックナンバーを避けてコードを読みやすくします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

enum Color { RED, GREEN, BLUE };
enum Day { MON = 1, TUE, WED, THU, FRI, SAT, SUN };

int main() {
    enum Color c = GREEN;
    printf("GREEN = %d\\n", c);

    enum Day today = WED;
    printf("WED = %d\\n", today);

    if (today == WED) {
        printf("今日は水曜日です\\n");
    }

    return 0;
}`}
          expectedOutput={`GREEN = 1
WED = 3
今日は水曜日です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">typedef と sizeof</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">typedef</code> で型に別名をつけ、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof</code> で型のサイズを確認できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef unsigned int uint;
typedef struct {
    int x;
    int y;
} Point;

int main() {
    uint score = 100;
    printf("score = %u\\n", score);

    Point p = {3, 4};
    printf("Point(%d, %d)\\n", p.x, p.y);

    printf("sizeof(int) = %zu\\n", sizeof(int));
    printf("sizeof(Point) = %zu\\n", sizeof(Point));

    return 0;
}`}
          expectedOutput={`score = 100
Point(3, 4)
sizeof(int) = 4
sizeof(Point) = 8`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
