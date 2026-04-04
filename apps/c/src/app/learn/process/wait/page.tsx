import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("process");

export default function WaitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロセス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">wait</h1>
        <p className="text-gray-400">wait()とwaitpid()を使ってゾンビプロセスと孤児プロセスを理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ゾンビプロセスと孤児プロセス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">ゾンビプロセス</strong>: 子プロセスが終了したが、親がwait()を呼んでプロセステーブルのエントリを回収していない状態。
          終了コードなどの情報が残ります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">孤児プロセス</strong>: 親プロセスが先に終了した子プロセス。
          initプロセス（PID=1）に引き取られます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">wait(&status)</code> — いずれかの子の終了を待つ</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">waitpid(pid, &status, options)</code> — 特定の子を待つ</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">WEXITSTATUS(status)</code> — 終了コードを取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">wait()の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">wait()</code> は子プロセスが終了するまでブロックします。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WEXITSTATUS</code> で終了コードを取得します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();

    if (pid == 0) {
        /* 子プロセス */
        printf("子: 処理中...\\n");
        sleep(1);
        printf("子: 終了 (exit code=42)\\n");
        return 42;
    } else {
        /* 親: 子の終了を待つ */
        printf("親: wait()で子を待機中\\n");
        int status;
        pid_t child = wait(&status);

        if (WIFEXITED(status)) {
            printf("親: 子(PID=%d)が終了\\n", (int)child);
            printf("親: 終了コード=%d\\n", WEXITSTATUS(status));
        }
    }

    return 0;
}`}
          expectedOutput={`親: wait()で子を待機中
子: 処理中...
子: 終了 (exit code=42)
親: 子(PID=1001)が終了
親: 終了コード=42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">waitpid()で特定の子を待つ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">waitpid()</code> は特定のPIDの子を待てます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WNOHANG</code> でノンブロッキングにもできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid1 = fork();
    if (pid1 == 0) {
        printf("子1: 終了\\n");
        return 1;
    }

    pid_t pid2 = fork();
    if (pid2 == 0) {
        printf("子2: 終了\\n");
        return 2;
    }

    /* 特定の子を待つ */
    int status;
    waitpid(pid1, &status, 0);
    printf("pid1終了: code=%d\\n", WEXITSTATUS(status));

    waitpid(pid2, &status, 0);
    printf("pid2終了: code=%d\\n", WEXITSTATUS(status));

    return 0;
}`}
          expectedOutput={`子1: 終了
子2: 終了
pid1終了: code=1
pid2終了: code=2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数子プロセスの回収</h2>
        <p className="text-gray-400 mb-4">
          ループでwait()を呼び、すべての子プロセスを回収することでゾンビを防ぎます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int n = 3;

    for (int i = 0; i < n; i++) {
        pid_t pid = fork();
        if (pid == 0) {
            printf("子%d: 実行中\\n", i + 1);
            return i + 1;
        }
    }

    /* すべての子を回収 */
    int status;
    pid_t pid;
    while ((pid = wait(&status)) > 0) {
        printf("子(PID=%d)終了: code=%d\\n",
               (int)pid, WEXITSTATUS(status));
    }

    printf("すべての子を回収しました\\n");
    return 0;
}`}
          expectedOutput={`子1: 実行中
子2: 実行中
子3: 実行中
子(PID=101)終了: code=1
子(PID=102)終了: code=2
子(PID=103)終了: code=3
すべての子を回収しました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="process" lessonId="wait" />
      </div>
      <LessonNav lessons={lessons} currentId="wait" basePath="/learn/process" />
    </div>
  );
}
