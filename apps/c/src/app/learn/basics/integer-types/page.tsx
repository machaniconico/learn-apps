import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function IntegerTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">整数型</h1>
        <p className="text-gray-400">short・int・long・long long など整数型の使い分けを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">整数型の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には複数のサイズの整数型があります。用途に応じて適切な型を選ぶことでメモリを効率的に使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">short</code> - 少なくとも2バイト（-32768〜32767）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int</code> - 少なくとも2バイト（通常4バイト）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">long</code> - 少なくとも4バイト</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">long long</code> - 少なくとも8バイト</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">unsigned</code> - 符号なし（負の値なし、最大値が2倍）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数型のサイズと範囲</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">limits.h</code> に各型の最大値・最小値が定義されています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <limits.h>

int main() {
    printf("=== 整数型のサイズ ===\\n");
    printf("short:     %zu バイト\\n", sizeof(short));
    printf("int:       %zu バイト\\n", sizeof(int));
    printf("long:      %zu バイト\\n", sizeof(long));
    printf("long long: %zu バイト\\n", sizeof(long long));

    printf("\\n=== 整数型の範囲 ===\\n");
    printf("short:     %d 〜 %d\\n", SHRT_MIN, SHRT_MAX);
    printf("int:       %d 〜 %d\\n", INT_MIN, INT_MAX);
    printf("long long: %lld 〜 %lld\\n", LLONG_MIN, LLONG_MAX);

    return 0;
}`}
          expectedOutput={`=== 整数型のサイズ ===
short:     2 バイト
int:       4 バイト
long:      8 バイト
long long: 8 バイト

=== 整数型の範囲 ===
short:     -32768 〜 32767
int:       -2147483648 〜 2147483647
long long: -9223372036854775808 〜 9223372036854775807`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">符号あり・符号なし整数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">unsigned</code> を付けると負の値を持てない代わりに正の最大値が2倍になります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <limits.h>

int main() {
    int    signed_max   = INT_MAX;
    unsigned int unsigned_max = UINT_MAX;

    printf("int の最大値:          %d\\n",  signed_max);
    printf("unsigned int の最大値: %u\\n", unsigned_max);

    // オーバーフローの例
    unsigned int u = 0;
    u--;  // 0から1を引くとラップアラウンド
    printf("\\n0 - 1 (unsigned): %u\\n", u);

    int s = INT_MAX;
    s++;  // 最大値に1を足すとオーバーフロー（未定義動作）
    printf("INT_MAX + 1: %d (オーバーフロー！)\\n", s);

    return 0;
}`}
          expectedOutput={`int の最大値:          2147483647
unsigned int の最大値: 4294967295

0 - 1 (unsigned): 4294967295
INT_MAX + 1: -2147483648 (オーバーフロー！)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="integer-types" />
      </div>
      <LessonNav lessons={lessons} currentId="integer-types" basePath="/learn/basics" />
    </div>
  );
}
