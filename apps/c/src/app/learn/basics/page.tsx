import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C言語でプログラムの実行が開始される関数はどれですか？",
    options: ["start()", "main()", "begin()", "run()"],
    answer: 1,
    explanation: "C言語ではmain()関数がプログラムのエントリポイントです。OSはmain()から実行を開始します。",
  },
  {
    question: "printf(\"Hello\\n\"); の \\n は何を意味しますか？",
    options: ["nという文字", "改行文字", "タブ文字", "ヌル文字"],
    answer: 1,
    explanation: "\\nはエスケープシーケンスで改行文字を表します。printfでこれを使うとカーソルが次の行に移動します。",
  },
  {
    question: "#include <stdio.h> の役割は何ですか？",
    options: [
      "変数を宣言する",
      "プログラムを終了する",
      "標準入出力ライブラリのヘッダをインクルードする",
      "メモリを確保する",
    ],
    answer: 2,
    explanation: "#include <stdio.h> はprintf・scanfなどの標準入出力関数を使うために必要なヘッダファイルをインクルードします。",
  },
  {
    question: "int main() の戻り値として正常終了を示すのはどれですか？",
    options: ["return 1;", "return -1;", "return 0;", "return NULL;"],
    answer: 2,
    explanation: "main()がreturn 0;を返すと、OSに対してプログラムが正常終了したことを通知します。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">C言語基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の基礎をゼロから学びましょう。Hello Worldから始まり、変数・データ型・演算子・入出力まで、プログラミングの土台となる知識を体系的に習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のCプログラム</h2>
        <p className="text-gray-400 mb-4">
          C言語の伝統的な最初のプログラムです。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#include &lt;stdio.h&gt;</code> でヘッダをインクルードし、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">printf</code> で文字列を出力します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("C言語へようこそ！\\n");
    return 0;
}`}
          expectedOutput={`Hello, World!
C言語へようこそ！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数とデータ型</h2>
        <p className="text-gray-400 mb-4">
          C言語では変数を使う前に型を宣言する必要があります。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int</code>・
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">float</code>・
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">char</code> などの型があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int age = 25;
    float height = 1.75f;
    char grade = 'A';

    printf("年齢: %d\\n", age);
    printf("身長: %.2f\\n", height);
    printf("成績: %c\\n", grade);

    return 0;
}`}
          expectedOutput={`年齢: 25
身長: 1.75
成績: A`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
