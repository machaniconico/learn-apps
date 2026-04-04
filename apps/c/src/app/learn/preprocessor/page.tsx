import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

const quizQuestions: QuizQuestion[] = [
  {
    question: "#define で定義したマクロはいつ展開されますか？",
    options: ["実行時", "リンク時", "コンパイル前（プリプロセス時）", "最適化時"],
    answer: 2,
    explanation: "#defineマクロはプリプロセッサによってコンパイル前に展開されます。型チェックは行われません。",
  },
  {
    question: "#include <stdio.h> と #include \"myfile.h\" の違いはどれですか？",
    options: [
      "<>はシステムヘッダ、\"\"はカレントディレクトリ優先で検索",
      "<>は高速、\"\"は低速",
      "<>は標準C、\"\"はC++専用",
      "違いはない",
    ],
    answer: 0,
    explanation: "<>はシステムのインクルードパスを検索し、\"\"はまずカレントディレクトリを検索してからシステムパスを検索します。",
  },
  {
    question: "ヘッダファイルの二重インクルード防止に使われる定番の方法はどれですか？",
    options: [
      "#define ONCE",
      "#pragma once または #ifndef ガード",
      "#include_once",
      "#stop",
    ],
    answer: 1,
    explanation: "#pragma once または #ifndef/#define/#endif のインクルードガードパターンでヘッダの二重インクルードを防ぎます。",
  },
  {
    question: "__LINE__ マクロが展開されると何になりますか？",
    options: [
      "現在のファイル名",
      "コンパイル日時",
      "現在のソースコードの行番号",
      "関数名",
    ],
    answer: 2,
    explanation: "__LINE__はそのマクロが記述されているソースコードの行番号に展開される定義済みマクロです。",
  },
];

export default function PreprocessorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">プリプロセッサ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語のプリプロセッサディレクティブを学びます。#define・#include・条件コンパイル・関数形式マクロ・#pragma・定義済みマクロを習得しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="preprocessor" totalLessons={6} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/preprocessor" color="yellow" categoryId="preprocessor" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#define マクロの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#define</code> で定数や関数形式マクロを定義できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define PI 3.14159
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))

int main() {
    printf("PI = %.5f\\n", PI);
    printf("MAX(3, 7) = %d\\n", MAX(3, 7));
    printf("SQUARE(5) = %d\\n", SQUARE(5));

    double r = 3.0;
    printf("円の面積: %.2f\\n", PI * SQUARE(r));

    return 0;
}`}
          expectedOutput={`PI = 3.14159
MAX(3, 7) = 7
SQUARE(5) = 25
円の面積: 28.27`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件コンパイルと定義済みマクロ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#ifdef</code> でコンパイル条件を制御し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">__FILE__</code> や <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">__LINE__</code> でデバッグできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define DEBUG 1

#ifdef DEBUG
#define LOG(msg) printf("[DEBUG] %s:%d - %s\\n", __FILE__, __LINE__, msg)
#else
#define LOG(msg)
#endif

int main() {
    LOG("プログラム開始");
    printf("処理中...\\n");
    LOG("処理完了");

    printf("コンパイル日時: %s %s\\n", __DATE__, __TIME__);

    return 0;
}`}
          expectedOutput={`[DEBUG] main.c:11 - プログラム開始
処理中...
[DEBUG] main.c:13 - 処理完了
コンパイル日時: Apr  3 2026 12:00:00`}
        />
      </section>

      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
