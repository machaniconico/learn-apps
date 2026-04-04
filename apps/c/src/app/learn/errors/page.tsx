import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

const quizQuestions: QuizQuestion[] = [
  {
    question: "perror()関数の説明として正しいのはどれですか？",
    options: [
      "エラーコードを返す関数",
      "errnoの値に対応するエラーメッセージを標準エラー出力に表示する",
      "プログラムを強制終了する",
      "エラーログをファイルに書き込む",
    ],
    answer: 1,
    explanation: "perror()は引数の文字列とコロン、そしてerrnoに対応するエラーメッセージを標準エラー出力（stderr）に表示します。",
  },
  {
    question: "setjmp/longjmpの主な用途はどれですか？",
    options: [
      "スレッド間の同期",
      "プロセス間の通信",
      "深くネストした関数呼び出しからのエラー回復",
      "メモリの動的確保",
    ],
    answer: 2,
    explanation: "setjmp/longjmpは深くネストした関数呼び出しを飛び越えてエラー処理を行う非局所ジャンプです。例外処理の代替として使われます。",
  },
  {
    question: "assert()マクロをNDEBUGで無効化する主な理由は何ですか？",
    options: [
      "コンパイルエラーを防ぐため",
      "リリースビルドでパフォーマンスへの影響をなくすため",
      "メモリリークを防ぐため",
      "警告を抑制するため",
    ],
    answer: 1,
    explanation: "NDEBUGを定義するとassert()は空文に展開されます。リリースビルドでは不要なチェックを除去してパフォーマンスを向上させるために使います。",
  },
  {
    question: "gotoを使ったエラー処理（gotoクリーンアップパターン）の利点は何ですか？",
    options: [
      "コードが高速になる",
      "複数のリソースを確保した後にエラーが発生した場合の一元的なクリーンアップ",
      "メモリ使用量が減る",
      "コードの可読性が上がる",
    ],
    answer: 1,
    explanation: "gotoクリーンアップパターンは、複数のリソース（ファイル、メモリ等）を確保した際にエラーが起きた場合、解放処理をラベルに集約できます。Linuxカーネルでも広く使われるパターンです。",
  },
];

export default function ErrorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">エラー処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Cのエラー処理技法を学びましょう。errno・perror()によるシステムコールエラーの確認、setjmp/longjmpによる非局所ジャンプ、assert()、gotoクリーンアップパターン、防御的プログラミングを解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="errors" totalLessons={5} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/errors" color="orange" categoryId="errors" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errnoとperror()</h2>
        <p className="text-gray-400 mb-4">
          システムコールが失敗すると <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">errno</code> にエラーコードが設定されます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">perror()</code> でわかりやすいメッセージを表示できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <errno.h>
#include <string.h>

int main(void) {
    FILE *fp = fopen("存在しないファイル.txt", "r");
    if (fp == NULL) {
        printf("エラーコード: %d\\n", errno);
        printf("エラーメッセージ: %s\\n", strerror(errno));
        perror("fopen");
    }

    /* errno は上書きされるので直後にチェック */
    errno = 0;
    printf("errno リセット: %d\\n", errno);
    return 0;
}`}
          expectedOutput={`エラーコード: 2
エラーメッセージ: No such file or directory
fopen: No such file or directory
errno リセット: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assert()によるデバッグ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">assert()</code> は条件が偽のときプログラムを中止します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">NDEBUG</code> を定義すると無効化されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <assert.h>

int divide(int a, int b) {
    assert(b != 0);  /* bが0ならアボート */
    return a / b;
}

int main(void) {
    int result = divide(10, 2);
    printf("10 / 2 = %d\\n", result);

    /* assert が通る場合 */
    assert(result == 5);
    printf("アサーション通過\\n");

    return 0;
}`}
          expectedOutput={`10 / 2 = 5
アサーション通過`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
