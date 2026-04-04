import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("bitwise");

export default function BitwiseOperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビット演算 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビット演算子</h1>
        <p className="text-gray-400">&・|・^・~・AND/OR/XOR/NOT を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビット演算子の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビット演算子は整数値をビット単位で操作します。
          低レベルプログラミング・組み込み・暗号・最適化などで広く使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&</code>: AND - 両方1の時だけ1</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">|</code>: OR - 片方でも1なら1</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">^</code>: XOR - 異なるとき1（排他的論理和）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">~</code>: NOT - ビットを反転（単項）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&amp;&amp;</code> や <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">||</code> は論理演算子、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&</code> や <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">|</code> はビット演算子（別物）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">AND・OR・XOR・NOT</h2>
        <p className="text-gray-400 mb-4">
          各ビット演算子の動作を確認します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    unsigned int a = 0xA;  // 1010
    unsigned int b = 0xC;  // 1100

    printf("a = 0x%X (%d)\\n", a, a);
    printf("b = 0x%X (%d)\\n", b, b);
    printf("\\n");

    printf("a & b = 0x%X (%d)  // AND\\n",  a & b, a & b);
    printf("a | b = 0x%X (%d)  // OR\\n",   a | b, a | b);
    printf("a ^ b = 0x%X (%d)  // XOR\\n",  a ^ b, a ^ b);
    printf("~a    = 0x%X       // NOT\\n",  ~a & 0xF);

    printf("\\nXORの性質: a ^ a = %d\\n", a ^ a);
    printf("XORの性質: a ^ 0 = %d\\n", a ^ 0);

    return 0;
}`}
          expectedOutput={`a = 0xA (10)
b = 0xC (12)

a & b = 0x8 (8)  // AND
a | b = 0xE (14)  // OR
a ^ b = 0x6 (6)  // XOR
~a    = 0x5       // NOT

XORの性質: a ^ a = 0
XORの性質: a ^ 0 = 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビット演算の実用例</h2>
        <p className="text-gray-400 mb-4">
          AND でビットのチェック・クリア、OR でセット、XOR でトグルに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    unsigned int flags = 0b00000000;

    // ビット2をセット（OR）
    flags |= (1 << 2);
    printf("bit2セット後: %d\\n", flags);

    // ビット4をセット
    flags |= (1 << 4);
    printf("bit4セット後: %d\\n", flags);

    // ビット2をチェック（AND）
    printf("bit2がセット: %s\\n", (flags & (1 << 2)) ? "yes" : "no");

    // ビット2をクリア（AND NOT）
    flags &= ~(1 << 2);
    printf("bit2クリア後: %d\\n", flags);

    // ビット4をトグル（XOR）
    flags ^= (1 << 4);
    printf("bit4トグル後: %d\\n", flags);

    return 0;
}`}
          expectedOutput={`bit2セット後: 4
bit4セット後: 20
bit2がセット: yes
bit2クリア後: 16
bit4トグル後: 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="bitwise" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/bitwise" />
    </div>
  );
}
