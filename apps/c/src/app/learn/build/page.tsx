import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

const quizQuestions: QuizQuestion[] = [
  {
    question: "gccの-Wallフラグの役割は何ですか？",
    options: [
      "全ての最適化を有効にする",
      "すべての一般的な警告を有効にする",
      "デバッグ情報を付加する",
      "静的ライブラリにリンクする",
    ],
    answer: 1,
    explanation: "-Wallは「警告をすべて有効にする」フラグです。未使用変数、暗黙の型変換など多くの潜在的問題を警告として表示します。",
  },
  {
    question: "Makefileでphonyターゲットを宣言する目的は何ですか？",
    options: [
      "コンパイルを高速化するため",
      "同名のファイルが存在してもターゲットが常に実行されるようにするため",
      "並列ビルドを有効にするため",
      "デバッグ情報を付加するため",
    ],
    answer: 1,
    explanation: ".PHONYに宣言したターゲットは、同名のファイルが存在しても常に実行されます。cleanやallなどの疑似ターゲットに使います。",
  },
  {
    question: "コンパイルの4段階の正しい順序はどれですか？",
    options: [
      "コンパイル→前処理→アセンブル→リンク",
      "前処理→コンパイル→アセンブル→リンク",
      "リンク→前処理→コンパイル→アセンブル",
      "前処理→アセンブル→コンパイル→リンク",
    ],
    answer: 1,
    explanation: "ソースコードは「前処理（#includeやマクロ展開）→コンパイル（.sアセンブリ生成）→アセンブル（.oオブジェクト生成）→リンク（実行ファイル生成）」の順で処理されます。",
  },
  {
    question: "-O2最適化フラグの説明として正しいのはどれですか？",
    options: [
      "デバッグしやすいように最適化を無効にする",
      "コードサイズを最小化する",
      "実行速度を重視した標準的な最適化レベル",
      "プロファイル情報を使った最適化",
    ],
    answer: 2,
    explanation: "-O2は実行速度を重視した標準的な最適化レベルです。ループ展開、インライン展開など多くの最適化が有効になります。-O0は最適化なし、-Osはサイズ優先です。",
  },
];

export default function BuildPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">ビルド</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Cプログラムのビルドプロセスを深く理解しましょう。前処理からリンクまでの4段階、GCC/Clangのフラグ、Makefileの書き方、gdbデバッグ、最適化オプションを解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="build" totalLessons={5} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/build" color="pink" categoryId="build" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパイルコマンドの基本</h2>
        <p className="text-gray-400 mb-4">
          GCCで警告を有効にしてコンパイルする基本的なコマンドです。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-Wall -Wextra</code> で警告を有効化し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-g</code> でデバッグ情報を付加します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* gcc -Wall -Wextra -g -o hello hello.c でコンパイル */

int add(int a, int b) {
    return a + b;
}

int main(void) {
    int result = add(3, 4);
    printf("3 + 4 = %d\\n", result);
    printf("コンパイル成功\\n");
    return 0;
}`}
          expectedOutput={`3 + 4 = 7
コンパイル成功`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最適化の効果</h2>
        <p className="text-gray-400 mb-4">
          最適化レベルによってコンパイラの挙動が変わります。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-O2</code> 以上では定数畳み込みやインライン展開が行われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* 最適化の効果を確認するコード */
/* -O2 では sum が定数畳み込みされる場合がある */

static int square(int x) {
    return x * x;
}

int main(void) {
    int n = 5;
    int sq = square(n);    /* インライン展開される可能性 */
    int sum = 1 + 2 + 3;  /* 定数畳み込み: 6 */

    printf("square(%d) = %d\\n", n, sq);
    printf("1+2+3 = %d\\n", sum);
    return 0;
}`}
          expectedOutput={`square(5) = 25
1+2+3 = 6`}
        />
      </section>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
