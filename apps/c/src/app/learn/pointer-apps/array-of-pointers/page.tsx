import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointer-apps");

export default function ArrayOfPointersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタの応用 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列配列</h1>
        <p className="text-gray-400">char *names[] による文字列配列の実用的な使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列配列の2つの実装方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字列の配列を扱う方法は主に2つあります。それぞれ特徴が異なります。
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <code className="text-teal-400">char names[5][20]</code>
            <p className="text-gray-400 mt-1">固定長の2次元char配列。各行が20バイト固定。メモリが無駄になりやすい。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-teal-400">const char *names[5]</code>
            <p className="text-gray-400 mt-1">文字列リテラルへのポインタ配列。各文字列の長さが違っても効率的。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列ポインタ配列の実用例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">const char *names[]</code> は文字列リテラルへのポインタを並べます。
          各文字列は異なる長さでも問題ありません。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    const char *days[] = {
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"
    };
    int n = 7;

    for (int i = 0; i < n; i++) {
        printf("%d: %s (%zu文字)\\n", i + 1, days[i], strlen(days[i]));
    }

    // 検索
    const char *target = "Friday";
    for (int i = 0; i < n; i++) {
        if (strcmp(days[i], target) == 0) {
            printf("\\n%s は %d 番目です\\n", target, i + 1);
        }
    }

    return 0;
}`}
          expectedOutput={`1: Monday (6文字)
2: Tuesday (7文字)
3: Wednesday (9文字)
4: Thursday (8文字)
5: Friday (6文字)
6: Saturday (8文字)
7: Sunday (6文字)

Friday は 5 番目です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コマンドライン引数（argc・argv）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">main(int argc, char *argv[])</code> の
          argvまさに文字列ポインタ配列です。プログラムへの引数を受け取ります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("引数の数: %d\\n", argc);

    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = \"%s\"\\n", i, argv[i]);
    }

    // 引数がある場合の処理
    if (argc > 1) {
        printf("\\nこんにちは、%s さん！\\n", argv[1]);
    } else {
        printf("\\n使い方: ./program <名前>\\n");
    }

    return 0;
}`}
          expectedOutput={`引数の数: 1
argv[0] = "./program"

使い方: ./program <名前>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointer-apps" lessonId="array-of-pointers" />
      </div>
      <LessonNav lessons={lessons} currentId="array-of-pointers" basePath="/learn/pointer-apps" />
    </div>
  );
}
