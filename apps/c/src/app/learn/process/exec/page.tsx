import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("process");

export default function ExecPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロセス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">exec</h1>
        <p className="text-gray-400">execl、execv、execpファミリーでプロセスイメージを置き換える方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">exec系関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          exec系関数は現在のプロセスイメージを別のプログラムで置き換えます。
          成功すると元のコードには戻りません。fork()と組み合わせて新しいプログラムを起動するのが一般的なパターンです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">execl(path, arg0, arg1, ..., NULL)</code> — 引数をリスト形式で渡す</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">execv(path, argv[])</code> — 引数を配列で渡す</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">execlp/execvp</code> — PATH検索あり</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">execle/execve</code> — 環境変数も指定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">execvpの基本使用例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">execvp()</code> はPATHからコマンドを検索します。
          成功するとこの関数は返りません。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>

int main(void) {
    printf("execvpを呼び出す前\\n");

    /* echo コマンドを実行 */
    char *args[] = {"echo", "Hello from exec!", NULL};
    execvp("echo", args);

    /* exec成功なら以下は実行されない */
    perror("execvp failed");
    return 1;
}`}
          expectedOutput={`execvpを呼び出す前
Hello from exec!`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">fork + exec パターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          fork()で子プロセスを作り、子でexec()して別プログラムを実行します。
          親プロセスはwait()で子の終了を待ちます。これがシェルの基本的な仕組みです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fork + exec の組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          子プロセスでexecし、親はwait()で終了を待つ基本パターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();

    if (pid == 0) {
        /* 子: echoを実行 */
        char *args[] = {"echo", "子プロセスがechoを実行", NULL};
        execvp("echo", args);
        perror("exec failed");
        return 1;
    } else if (pid > 0) {
        /* 親: 子の終了を待つ */
        int status;
        wait(&status);
        printf("子プロセス終了: status=%d\\n",
               WEXITSTATUS(status));
    }

    return 0;
}`}
          expectedOutput={`子プロセスがechoを実行
子プロセス終了: status=0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">execl の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">execl()</code> は引数を直接列挙します。
          最後は必ず <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">NULL</code> で終端します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();

    if (pid == 0) {
        /* execl: パス、arg0(プログラム名), 引数..., NULL */
        execl("/bin/echo", "echo", "execl:", "Hello!", NULL);
        perror("execl");
        return 1;
    } else {
        wait(NULL);
        printf("親: 完了\\n");
    }

    return 0;
}`}
          expectedOutput={`execl: Hello!
親: 完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="process" lessonId="exec" />
      </div>
      <LessonNav lessons={lessons} currentId="exec" basePath="/learn/process" />
    </div>
  );
}
