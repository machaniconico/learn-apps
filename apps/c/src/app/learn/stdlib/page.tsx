import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

const quizQuestions: QuizQuestion[] = [
  {
    question: "stdlib.h の atoi() 関数の役割はどれですか？",
    options: [
      "整数を文字列に変換する",
      "文字列を整数に変換する",
      "浮動小数点数を整数に変換する",
      "文字列の長さを返す",
    ],
    answer: 1,
    explanation: "atoi() は \"ascii to integer\" の略で、文字列を整数（int）に変換します。例えば atoi(\"42\") は 42 を返します。",
  },
  {
    question: "math.h の sqrt() 関数を使うには何が必要ですか？",
    options: [
      "#include <stdlib.h> のみ",
      "#include <math.h> とリンク時に -lm フラグ",
      "#include <stdio.h> のみ",
      "特別なインクルードは不要",
    ],
    answer: 1,
    explanation: "math.h の関数を使うには #include <math.h> が必要で、コンパイル時に -lm フラグでmath ライブラリをリンクする必要があります（例: gcc main.c -o main -lm）。",
  },
  {
    question: "errno.h の perror() 関数の動作として正しいのはどれですか？",
    options: [
      "エラーコードを errno にセットする",
      "プログラムを終了させる",
      "errno に対応するエラーメッセージを標準エラー出力に表示する",
      "エラーコードを整数で返す",
    ],
    answer: 2,
    explanation: "perror() は引数の文字列と ': ' に続けて errno に対応するエラーメッセージを標準エラー出力（stderr）に表示します。",
  },
  {
    question: "ctype.h の toupper() 関数について正しいのはどれですか？",
    options: [
      "文字列全体を大文字に変換する",
      "1文字を大文字に変換する（既に大文字ならそのまま）",
      "大文字かどうかを判定する（bool を返す）",
      "数字文字を大文字に変換する",
    ],
    answer: 1,
    explanation: "toupper() は1文字（int型）を受け取り、小文字なら対応する大文字を返します。既に大文字や数字など非小文字の場合はそのままの値を返します。",
  },
];

export default function StdlibPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">標準ライブラリ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の標準ライブラリヘッダを学びましょう。stdlib.h・math.h・time.h・ctype.h・assert.h・errno.h など、
          実用的なプログラミングに欠かせない関数群を丁寧に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="stdlib" totalLessons={6} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/stdlib" color="green" categoryId="stdlib" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stdlib.h の基本関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#include &lt;stdlib.h&gt;</code> で使える
          変換・乱数・終了などのユーティリティ関数を確認しましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    /* 文字列から数値への変換 */
    int n = atoi("123");
    double d = atof("3.14");
    printf("atoi: %d, atof: %.2f\\n", n, d);

    /* 絶対値 */
    printf("abs(-7): %d\\n", abs(-7));

    /* 乱数（シード固定） */
    srand(42);
    printf("rand: %d\\n", rand() % 100);

    return 0;
}`}
          expectedOutput={`atoi: 123, atof: 3.14
abs(-7): 7
rand: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">math.h の数学関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#include &lt;math.h&gt;</code> で
          sqrt・pow・sin・cos などの数学関数が使えます。コンパイル時は <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-lm</code> が必要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>

int main() {
    printf("sqrt(16) = %.1f\\n", sqrt(16.0));
    printf("pow(2,10) = %.0f\\n", pow(2.0, 10.0));
    printf("ceil(3.2) = %.1f\\n", ceil(3.2));
    printf("floor(3.8) = %.1f\\n", floor(3.8));
    printf("fabs(-5.5) = %.1f\\n", fabs(-5.5));

    return 0;
}`}
          expectedOutput={`sqrt(16) = 4.0
pow(2,10) = 1024
ceil(3.2) = 4.0
floor(3.8) = 3.0
fabs(-5.5) = 5.5`}
        />
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
