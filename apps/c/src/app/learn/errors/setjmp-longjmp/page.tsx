import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function SetjmpLongjmpPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エラー処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">setjmp・longjmp</h1>
        <p className="text-gray-400">setjmp()とlongjmp()による非局所ジャンプを使ったエラー回復を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非局所ジャンプとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の関数はreturnで呼び出し元に戻ります。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">longjmp()</code> は呼び出しスタックを飛び越えて
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">setjmp()</code> を呼んだ地点に戻ります。
          C++の例外処理に相当するC言語の仕組みです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">setjmp(env)</code> — ジャンプ先を記録。直接呼び出しは0を返す</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">longjmp(env, val)</code> — setjmpの場所にジャンプ。setjmpはvalを返す</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">jmp_buf</code> — 実行コンテキストを保存する型</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">setjmp/longjmpの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">setjmp()</code> でジャンプ先を設定し、
          深い関数から <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">longjmp()</code> でエラーを通知します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <setjmp.h>

jmp_buf error_env;

#define ERR_DIVIDE_BY_ZERO 1
#define ERR_OVERFLOW       2

int safe_divide(int a, int b) {
    if (b == 0) {
        longjmp(error_env, ERR_DIVIDE_BY_ZERO);
    }
    return a / b;
}

int main(void) {
    int err = setjmp(error_env);

    if (err == 0) {
        /* 正常パス */
        printf("10 / 2 = %d\\n", safe_divide(10, 2));
        printf("6 / 3 = %d\\n", safe_divide(6, 3));
        printf("5 / 0 = ...\\n");
        safe_divide(5, 0);  /* ここでlongjmpが発動 */
        printf("この行は実行されない\\n");
    } else {
        /* エラーハンドラ */
        if (err == ERR_DIVIDE_BY_ZERO) {
            printf("エラー: ゼロ除算\\n");
        }
    }

    printf("プログラム継続\\n");
    return 0;
}`}
          expectedOutput={`10 / 2 = 5
6 / 3 = 2
5 / 0 = ...
エラー: ゼロ除算
プログラム継続`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">使用上の注意</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          setjmp/longjmpには重要な制限があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>longjmpを呼ぶと、スタック上に確保されたリソースのクリーンアップがされない</li>
          <li>setjmpを呼んだ関数が返ってからlongjmpを呼んではいけない</li>
          <li>volatile変数以外のローカル変数はlongjmp後に不定値になる可能性がある</li>
          <li>C++では使用を避け、例外処理を使うべき</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外処理的なパターン</h2>
        <p className="text-gray-400 mb-4">
          setjmp/longjmpを使ってtry/catchに似た構造を実現できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <setjmp.h>
#include <string.h>

jmp_buf exception_env;
static char exception_msg[128];

#define TRY if (setjmp(exception_env) == 0)
#define CATCH else
#define THROW(msg) do { \
    strncpy(exception_msg, msg, sizeof(exception_msg)-1); \
    longjmp(exception_env, 1); \
} while(0)

void parse_age(int age) {
    if (age < 0 || age > 150) {
        THROW("年齢が範囲外です");
    }
    printf("年齢: %d\\n", age);
}

int main(void) {
    TRY {
        parse_age(25);
        parse_age(200);  /* 例外発生 */
        parse_age(30);   /* 実行されない */
    } CATCH {
        printf("例外: %s\\n", exception_msg);
    }

    printf("処理完了\\n");
    return 0;
}`}
          expectedOutput={`年齢: 25
例外: 年齢が範囲外です
処理完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="setjmp-longjmp" />
      </div>
      <LessonNav lessons={lessons} currentId="setjmp-longjmp" basePath="/learn/errors" />
    </div>
  );
}
