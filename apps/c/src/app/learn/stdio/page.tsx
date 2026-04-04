import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "printf(\"%05d\", 42) の出力はどれですか？",
    options: ["42", "00042", "42000", "  42 "],
    answer: 1,
    explanation: "%05dは幅5でゼロ埋めを意味します。42は「00042」と出力されます。",
  },
  {
    question: "scanf()の戻り値は何を表しますか？",
    options: [
      "読み込んだバイト数",
      "成功した変換の数",
      "エラーコード",
      "読み込んだ文字列の長さ",
    ],
    answer: 1,
    explanation: "scanf()は成功した変換（代入）の数を返します。EOFはストリームの終端またはエラーを示します。",
  },
  {
    question: "fgets()とgets()の主な違いはどれですか？",
    options: [
      "fgets()はファイルのみ、gets()は標準入力のみ",
      "fgets()はバッファサイズを指定でき安全、gets()はバッファサイズ制限なく危険",
      "機能は同じで名前が違うだけ",
      "fgets()はC99以降、gets()はC89のみ",
    ],
    answer: 1,
    explanation: "fgets()はバッファサイズを指定できるため安全です。gets()はバッファサイズの制限がなくバッファオーバーフローの危険があり、C11で廃止されました。",
  },
  {
    question: "printf(\"%.*f\", 3, 3.14159) の出力はどれですか？",
    options: ["3.14159", "3.142", "3.141", "3.14"],
    answer: 1,
    explanation: "%.*fは精度を引数で動的に指定します。精度3なので小数点以下3桁、3.14159は3.142（四捨五入）となります。",
  },
];

export default function StdioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">標準入出力</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の標準入出力関数を詳しく学びます。printf・scanf の書式指定子から、文字・行入出力、sprintf・sscanf、バッファリングまで網羅します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="stdio" totalLessons={6} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/stdio" color="blue" categoryId="stdio" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printf 書式指定子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">printf</code> の書式指定子で様々な型と形式で出力できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int n = 255;
    double d = 3.14159;
    char *s = "Hello";

    printf("10進数: %d\\n", n);
    printf("16進数: %x\\n", n);
    printf("8進数: %o\\n", n);
    printf("浮動小数点: %f\\n", d);
    printf("指数表記: %e\\n", d);
    printf("精度指定: %.2f\\n", d);
    printf("幅指定: %10.3f\\n", d);
    printf("文字列: %s\\n", s);
    printf("左寄せ: %-10s|\\n", s);

    return 0;
}`}
          expectedOutput={`10進数: 255
16進数: ff
8進数: 377
浮動小数点: 3.141590
指数表記: 3.141590e+00
精度指定: 3.14
幅指定:      3.142
文字列: Hello
左寄せ: Hello     |`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sprintf と sscanf</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sprintf</code> で文字列に書式出力し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sscanf</code> で文字列から解析できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    char buf[64];
    int year = 2026, month = 4, day = 3;

    sprintf(buf, "%04d-%02d-%02d", year, month, day);
    printf("日付: %s\\n", buf);

    char date[] = "2026-04-03";
    int y, m, d;
    sscanf(date, "%d-%d-%d", &y, &m, &d);
    printf("年=%d 月=%d 日=%d\\n", y, m, d);

    return 0;
}`}
          expectedOutput={`日付: 2026-04-03
年=2026 月=4 日=3`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
