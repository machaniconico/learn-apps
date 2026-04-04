import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("process");

export default function ForkPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロセス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">fork</h1>
        <p className="text-gray-400">fork()で親子プロセスを作成し、pid_tとgetpid()を使いこなしましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">fork()とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fork()</code> はUnixシステムコールで、呼び出したプロセス（親）のコピーである子プロセスを作成します。
          子プロセスは親のメモリ、ファイルディスクリプタ、コード等を継承します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          fork()の戻り値で親子を区別します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">戻り値 &gt; 0</code> — 親プロセス（値は子プロセスのPID）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">戻り値 == 0</code> — 子プロセス</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">戻り値 == -1</code> — エラー</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なfork()</h2>
        <p className="text-gray-400 mb-4">
          fork()の戻り値で親子の処理を分岐します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">getpid()</code> で自分のPIDを取得できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main(void) {
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork");
        return 1;
    } else if (pid == 0) {
        /* 子プロセス */
        printf("子プロセス: PID=%d\\n", (int)getpid());
        printf("子: fork()の戻り値=%d\\n", (int)pid);
    } else {
        /* 親プロセス */
        printf("親プロセス: PID=%d\\n", (int)getpid());
        printf("親: 子のPID=%d\\n", (int)pid);
    }

    return 0;
}`}
          expectedOutput={`親プロセス: PID=1000
親: 子のPID=1001
子プロセス: PID=1001
子: fork()の戻り値=0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">pid_t型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">pid_t</code> はプロセスIDを表す型で、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sys/types.h</code> または
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">unistd.h</code> で定義されます。
          通常はintと同じサイズですが、移植性のためpid_tを使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">getpid()</code> — 自プロセスのPID</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">getppid()</code> — 親プロセスのPID</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">getpid()とgetppid()</h2>
        <p className="text-gray-400 mb-4">
          子プロセスから
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">getppid()</code> で親のPIDを確認できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>

int main(void) {
    printf("=== fork前 ===\\n");
    printf("PID=%d, PPID=%d\\n", (int)getpid(), (int)getppid());

    pid_t pid = fork();

    if (pid == 0) {
        /* 子プロセス */
        printf("=== 子プロセス ===\\n");
        printf("自PID=%d, 親PID=%d\\n", (int)getpid(), (int)getppid());
    } else if (pid > 0) {
        /* 親プロセス */
        printf("=== 親プロセス ===\\n");
        printf("自PID=%d, 子PID=%d\\n", (int)getpid(), (int)pid);
    }

    return 0;
}`}
          expectedOutput={`=== fork前 ===
PID=100, PPID=99
=== 親プロセス ===
自PID=100, 子PID=101
=== 子プロセス ===
自PID=101, 親PID=100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数のコピー</h2>
        <p className="text-gray-400 mb-4">
          fork()後、親子はそれぞれ独立したメモリ空間を持ちます。
          一方の変数を変更しても他方には影響しません（コピーオンライト）。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <unistd.h>

int main(void) {
    int value = 42;
    printf("fork前: value=%d\\n", value);

    pid_t pid = fork();

    if (pid == 0) {
        value = 100;  /* 子だけ変更 */
        printf("子プロセス: value=%d\\n", value);
    } else {
        /* 親は変更しない */
        printf("親プロセス: value=%d\\n", value);
    }

    return 0;
}`}
          expectedOutput={`fork前: value=42
親プロセス: value=42
子プロセス: value=100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="process" lessonId="fork" />
      </div>
      <LessonNav lessons={lessons} currentId="fork" basePath="/learn/process" />
    </div>
  );
}
