import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("process");

const quizQuestions: QuizQuestion[] = [
  {
    question: "fork()が返す値について正しい説明はどれですか？",
    options: [
      "常に0を返す",
      "親プロセスには子のPID、子プロセスには0を返す",
      "親プロセスには0、子プロセスには親のPIDを返す",
      "両方のプロセスに同じ値を返す",
    ],
    answer: 1,
    explanation: "fork()は親プロセスには子プロセスのPID（正の整数）を返し、子プロセスには0を返します。エラー時は-1を返します。",
  },
  {
    question: "ゾンビプロセスとは何ですか？",
    options: [
      "CPUを大量消費するプロセス",
      "終了したが親が wait() を呼んでいないプロセス",
      "メモリリークを起こしているプロセス",
      "バックグラウンドで動作するデーモンプロセス",
    ],
    answer: 1,
    explanation: "ゾンビプロセスは実行を終了したが、親プロセスがwait()を呼んでプロセステーブルのエントリを回収していない状態のプロセスです。",
  },
  {
    question: "execl()を呼び出した後、元のコードはどうなりますか？",
    options: [
      "元のコードに戻って実行が続く",
      "新しいプロセスが生成され両方実行される",
      "プロセスイメージが置き換えられ元のコードは実行されない",
      "元のコードはバックグラウンドで実行される",
    ],
    answer: 2,
    explanation: "exec系関数はプロセスイメージを完全に置き換えます。成功すると元のコードに戻りません。失敗した場合のみ-1を返して戻ります。",
  },
  {
    question: "pipe()関数が作成するパイプの特性として正しいのはどれですか？",
    options: [
      "双方向通信が可能",
      "ネットワーク越しに使える",
      "fd[0]が読み込み端、fd[1]が書き込み端の一方向通信",
      "ファイルとして永続化される",
    ],
    answer: 2,
    explanation: "pipe()は一方向の通信チャネルを作成します。fd[0]が読み込み用、fd[1]が書き込み用です。双方向通信には2本のパイプが必要です。",
  },
];

export default function ProcessPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">プロセス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Unixのプロセス管理を学びましょう。fork()による子プロセスの生成、exec系関数によるプロセスの置き換え、wait()によるプロセス同期、シグナルによる非同期通知、パイプによるプロセス間通信を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="process" totalLessons={5} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/process" color="red" categoryId="process" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fork()の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fork()</code> はプロセスを複製して子プロセスを作成します。
          戻り値で親子を区別します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main(void) {
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork failed");
        return 1;
    } else if (pid == 0) {
        /* 子プロセス */
        printf("子プロセス: PID=%d\\n", getpid());
    } else {
        /* 親プロセス */
        printf("親プロセス: PID=%d, 子PID=%d\\n", getpid(), pid);
    }

    return 0;
}`}
          expectedOutput={`親プロセス: PID=1234, 子PID=1235
子プロセス: PID=1235`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pipe()によるプロセス間通信</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">pipe()</code> でパイプを作成し、fork()と組み合わせて親子間でデータを受け渡します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main(void) {
    int fd[2];
    pipe(fd);

    pid_t pid = fork();
    if (pid == 0) {
        /* 子: 書き込み */
        close(fd[0]);
        const char *msg = "Hello from child";
        write(fd[1], msg, strlen(msg));
        close(fd[1]);
    } else {
        /* 親: 読み込み */
        close(fd[1]);
        char buf[64] = {0};
        read(fd[0], buf, sizeof(buf) - 1);
        close(fd[0]);
        printf("受信: %s\\n", buf);
    }
    return 0;
}`}
          expectedOutput={`受信: Hello from child`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
