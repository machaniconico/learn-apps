import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("process");

export default function SignalsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロセス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シグナル</h1>
        <p className="text-gray-400">signal()でSIGINT・SIGTERMなどのシグナルを処理するシグナルハンドラを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">シグナルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シグナルはプロセスへの非同期通知です。キーボード割り込み（Ctrl+C）やkillコマンドから送られます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">signal()</code> または
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sigaction()</code> でハンドラを登録します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SIGINT</code> — Ctrl+C（割り込み）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SIGTERM</code> — 終了要求（killのデフォルト）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SIGKILL</code> — 強制終了（ハンドル不可）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SIGCHLD</code> — 子プロセス状態変化</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SIGSEGV</code> — セグメンテーション違反</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">signal()でハンドラを登録</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">signal(signum, handler)</code> でシグナルハンドラを登録します。
          ハンドラは <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">void handler(int signum)</code> の形式です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <signal.h>
#include <stdlib.h>

/* シグナルハンドラ */
void handle_sigint(int signum) {
    printf("\\nSIGINT (%d) を受信\\n", signum);
    printf("クリーンアップして終了\\n");
    exit(0);
}

void handle_sigterm(int signum) {
    printf("SIGTERM (%d) を受信\\n", signum);
    exit(0);
}

int main(void) {
    signal(SIGINT, handle_sigint);
    signal(SIGTERM, handle_sigterm);

    printf("シグナル待機中 (PID=%d)\\n", (int)getpid());

    /* raise()で自分にシグナルを送る */
    raise(SIGINT);

    return 0;
}`}
          expectedOutput={`シグナル待機中 (PID=1234)

SIGINT (2) を受信
クリーンアップして終了`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SIG_DFLとSIG_IGN</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ハンドラには関数ポインタの他に特殊な値を指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SIG_DFL</code> — デフォルトの動作に戻す</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SIG_IGN</code> — シグナルを無視する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シグナルの無視とリセット</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SIG_IGN</code> でシグナルを無視し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SIG_DFL</code> でデフォルト動作に戻します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <signal.h>

int main(void) {
    /* SIGINTを無視 */
    signal(SIGINT, SIG_IGN);
    printf("SIGINT無視中\\n");
    raise(SIGINT);  /* 無視されるので何も起きない */
    printf("SIGINTが無視された\\n");

    /* カスタムハンドラ */
    signal(SIGINT, SIG_DFL);  /* デフォルトに戻す */
    printf("SIGINTをデフォルトに戻した\\n");

    /* raise(SIGINT) はここでは省略 */
    return 0;
}`}
          expectedOutput={`SIGINT無視中
SIGINTが無視された
SIGINTをデフォルトに戻した`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="process" lessonId="signals" />
      </div>
      <LessonNav lessons={lessons} currentId="signals" basePath="/learn/process" />
    </div>
  );
}
