import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function VariadicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変引数関数</h1>
        <p className="text-gray-400">stdarg.hを使った可変個引数の関数を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">可変引数関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">printf</code> のように引数の数が可変な関数を作れます。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">stdarg.h</code> のマクロを使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">...</code> - 可変引数を表す省略記号</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">va_list</code> - 可変引数を保持する型</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">va_start(ap, last)</code> - 初期化（lastは最後の固定引数）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">va_arg(ap, type)</code> - 次の引数を取得</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">va_end(ap)</code> - 終了処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">可変個の整数の合計</h2>
        <p className="text-gray-400 mb-4">
          引数の個数を最初に渡して、可変個の整数の合計を求めます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdarg.h>

// count個の整数の合計を求める
int sum(int count, ...) {
    va_list ap;
    va_start(ap, count);  // countの後から可変引数開始

    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(ap, int);  // 1つずつ取得
    }

    va_end(ap);
    return total;
}

// 最大値を求める
int max_of(int count, ...) {
    va_list ap;
    va_start(ap, count);

    int max = va_arg(ap, int);
    for (int i = 1; i < count; i++) {
        int v = va_arg(ap, int);
        if (v > max) max = v;
    }

    va_end(ap);
    return max;
}

int main() {
    printf("sum(3, 1,2,3)       = %d\\n", sum(3, 1, 2, 3));
    printf("sum(5, 10,20,30,40,50) = %d\\n", sum(5, 10, 20, 30, 40, 50));

    printf("\\nmax_of(4, 3,1,4,1) = %d\\n", max_of(4, 3, 1, 4, 1));
    printf("max_of(5, 9,2,6,5,3) = %d\\n", max_of(5, 9, 2, 6, 5, 3));

    return 0;
}`}
          expectedOutput={`sum(3, 1,2,3)       = 6
sum(5, 10,20,30,40,50) = 150

max_of(4, 3,1,4,1) = 4
max_of(5, 9,2,6,5,3) = 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printfの仕組みを理解する</h2>
        <p className="text-gray-400 mb-4">
          printfも可変引数関数です。簡易版のmy_printfを作って仕組みを理解しましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdarg.h>

// 簡易printf（%d と %s だけ対応）
void my_printf(const char *fmt, ...) {
    va_list ap;
    va_start(ap, fmt);

    for (int i = 0; fmt[i] != '\\0'; i++) {
        if (fmt[i] == '%' && fmt[i+1] != '\\0') {
            i++;
            if (fmt[i] == 'd') {
                printf("%d", va_arg(ap, int));
            } else if (fmt[i] == 's') {
                printf("%s", va_arg(ap, char*));
            }
        } else {
            putchar(fmt[i]);
        }
    }

    va_end(ap);
}

int main() {
    my_printf("Hello, %s!\\n", "World");
    my_printf("年齢: %d歳\\n", 25);
    my_printf("%s は %d 歳です\\n", "田中", 30);
    return 0;
}`}
          expectedOutput={`Hello, World!
年齢: 25歳
田中 は 30 歳です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="variadic" />
      </div>
      <LessonNav lessons={lessons} currentId="variadic" basePath="/learn/functions" />
    </div>
  );
}
