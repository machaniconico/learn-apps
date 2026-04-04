import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("process");

export default function PipesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロセス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パイプ</h1>
        <p className="text-gray-400">pipe()とdup2()でプロセス間通信（IPC）を実現する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パイプとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パイプは一方向のデータチャネルで、プロセス間通信（IPC）に使います。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">pipe(fd)</code> で2つのファイルディスクリプタを作成します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fd[0]</code> — 読み込み端</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fd[1]</code> — 書き込み端</li>
          <li>使わない端は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">close()</code> で閉じること</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">dup2(fd, newfd)</code> — fdをnewfdに複製</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pipe()の基本</h2>
        <p className="text-gray-400 mb-4">
          fork()後、子が書き込み端に書き、親が読み込み端から読む一方向通信の例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main(void) {
    int fd[2];
    if (pipe(fd) < 0) {
        perror("pipe");
        return 1;
    }

    pid_t pid = fork();

    if (pid == 0) {
        /* 子: 書き込み */
        close(fd[0]);  /* 読み込み端を閉じる */
        const char *msg = "パイプ経由のメッセージ";
        write(fd[1], msg, strlen(msg));
        close(fd[1]);
    } else {
        /* 親: 読み込み */
        close(fd[1]);  /* 書き込み端を閉じる */
        char buf[128] = {0};
        read(fd[0], buf, sizeof(buf) - 1);
        close(fd[0]);
        printf("受信: %s\\n", buf);
        wait(NULL);
    }

    return 0;
}`}
          expectedOutput={`受信: パイプ経由のメッセージ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">dup2()でstdinをパイプに接続</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">dup2()</code> でパイプをstdinやstdoutにリダイレクトできます。
          シェルのパイプ（cmd1 | cmd2）の仕組みです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main(void) {
    int fd[2];
    pipe(fd);

    pid_t pid = fork();

    if (pid == 0) {
        /* 子: stdoutをパイプの書き込み端にリダイレクト */
        close(fd[0]);
        dup2(fd[1], STDOUT_FILENO);
        close(fd[1]);

        /* printfはパイプに書き込まれる */
        printf("dup2経由のデータ");
        fflush(stdout);
        return 0;
    } else {
        /* 親: パイプから読む */
        close(fd[1]);
        char buf[128] = {0};
        read(fd[0], buf, sizeof(buf) - 1);
        close(fd[0]);
        wait(NULL);
        printf("親が受信: [%s]\\n", buf);
    }

    return 0;
}`}
          expectedOutput={`親が受信: [dup2経由のデータ]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">双方向通信には2本のパイプ</h2>
        <p className="text-gray-400 mb-4">
          パイプは一方向なので、双方向通信には2本のパイプが必要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main(void) {
    int parent_to_child[2]; /* 親→子 */
    int child_to_parent[2]; /* 子→親 */

    pipe(parent_to_child);
    pipe(child_to_parent);

    pid_t pid = fork();

    if (pid == 0) {
        /* 子 */
        close(parent_to_child[1]);
        close(child_to_parent[0]);

        char buf[64] = {0};
        read(parent_to_child[0], buf, sizeof(buf) - 1);
        printf("子受信: %s\\n", buf);

        const char *reply = "了解！";
        write(child_to_parent[1], reply, strlen(reply));

        close(parent_to_child[0]);
        close(child_to_parent[1]);
    } else {
        /* 親 */
        close(parent_to_child[0]);
        close(child_to_parent[1]);

        const char *msg = "こんにちは子プロセス";
        write(parent_to_child[1], msg, strlen(msg));
        close(parent_to_child[1]);

        char buf[64] = {0};
        read(child_to_parent[0], buf, sizeof(buf) - 1);
        printf("親受信: %s\\n", buf);

        close(child_to_parent[0]);
        wait(NULL);
    }

    return 0;
}`}
          expectedOutput={`子受信: こんにちは子プロセス
親受信: 了解！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="process" lessonId="pipes" />
      </div>
      <LessonNav lessons={lessons} currentId="pipes" basePath="/learn/process" />
    </div>
  );
}
