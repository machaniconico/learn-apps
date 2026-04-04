import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("enums");

export default function SizeofOperatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">enum・型 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sizeof演算子</h1>
        <p className="text-gray-400">sizeof(int)・sizeof(struct)・配列のsizeofを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sizeof 演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof</code> はコンパイル時に型や変数のメモリサイズ（バイト数）を返す演算子です。
          戻り値の型は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">size_t</code>（符号なし整数）です。
          動的メモリ確保や配列要素数の計算によく使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof(型)</code> または <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof 変数</code></li>
          <li>配列全体のサイズを要素サイズで割ると要素数がわかる</li>
          <li>ポインタのsizeofはアドレスサイズ（8バイト等）で配列サイズではない</li>
          <li>構造体はアライメントにより合計より大きくなることがある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本型のサイズ</h2>
        <p className="text-gray-400 mb-4">
          各型のサイズを確認します。環境によって異なる場合があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("char:        %zu bytes\\n", sizeof(char));
    printf("short:       %zu bytes\\n", sizeof(short));
    printf("int:         %zu bytes\\n", sizeof(int));
    printf("long:        %zu bytes\\n", sizeof(long));
    printf("long long:   %zu bytes\\n", sizeof(long long));
    printf("float:       %zu bytes\\n", sizeof(float));
    printf("double:      %zu bytes\\n", sizeof(double));
    printf("long double: %zu bytes\\n", sizeof(long double));
    printf("pointer:     %zu bytes\\n", sizeof(void *));

    return 0;
}`}
          expectedOutput={`char:        1 bytes
short:       2 bytes
int:         4 bytes
long:        8 bytes
long long:   8 bytes
float:       4 bytes
double:      8 bytes
long double: 16 bytes
pointer:     8 bytes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の要素数を求める</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof(arr) / sizeof(arr[0])</code> で配列の要素数を求められます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

int main() {
    int nums[] = {10, 20, 30, 40, 50};
    char str[] = "Hello";
    double vals[] = {1.1, 2.2, 3.3};

    printf("nums: %zu要素\\n", ARRAY_SIZE(nums));
    printf("str:  %zu文字（\\0含む）\\n", ARRAY_SIZE(str));
    printf("vals: %zu要素\\n", ARRAY_SIZE(vals));

    // ループで使う
    int sum = 0;
    for (size_t i = 0; i < ARRAY_SIZE(nums); i++) {
        sum += nums[i];
    }
    printf("合計: %d\\n", sum);

    return 0;
}`}
          expectedOutput={`nums: 5要素
str:  6文字（\0含む）
vals: 3要素
合計: 150`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のサイズとアライメント</h2>
        <p className="text-gray-400 mb-4">
          構造体はアライメント（境界整合）のためパディングが入り、メンバの合計より大きくなることがあります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct A { char c; int n; };        // パディングあり
struct B { int n; char c; };        // パディングあり
struct C { int a; int b; int c; };  // パディングなし

int main() {
    printf("struct A (char,int):    %zu bytes\\n", sizeof(struct A));
    printf("struct B (int,char):    %zu bytes\\n", sizeof(struct B));
    printf("struct C (int,int,int): %zu bytes\\n", sizeof(struct C));

    printf("\\nmalloc でのsizeof活用:\\n");
    struct A *p = (struct A *)__builtin_malloc(3 * sizeof(struct A));
    printf("3個分: %zu bytes確保\\n", 3 * sizeof(struct A));
    __builtin_free(p);

    return 0;
}`}
          expectedOutput={`struct A (char,int):    8 bytes
struct B (int,char):    8 bytes
struct C (int,int,int): 12 bytes

mallocでのsizeof活用:
3個分: 24 bytes確保`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="sizeof-operator" />
      </div>
      <LessonNav lessons={lessons} currentId="sizeof-operator" basePath="/learn/enums" />
    </div>
  );
}
