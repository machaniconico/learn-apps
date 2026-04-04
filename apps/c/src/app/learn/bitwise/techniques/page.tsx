import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("bitwise");

export default function TechniquesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビット演算 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビット演算テクニック</h1>
        <p className="text-gray-400">一時変数なしのswap・2の累乗チェック・ビットカウントを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">有名なビット演算テクニック</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビット演算を使った効率的なアルゴリズムが多数存在します。
          面接でもよく問われる定番テクニックを習得しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>XOR swap: 一時変数なしの値交換</li>
          <li>2の累乗判定: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">n &amp; (n-1) == 0</code></li>
          <li>最下位ビット取得: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">n &amp; (-n)</code> または <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">n &amp; (~n+1)</code></li>
          <li>ビットカウント: Brian Kernighanのアルゴリズム</li>
          <li>絶対値: 符号ビットを使った分岐なし絶対値</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XOR swap と 2の累乗判定</h2>
        <p className="text-gray-400 mb-4">
          XORの性質を使った一時変数なしの交換と、2の累乗を高速に判定します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// XOR swap（教育目的。実際は普通のswapを使う方が明確）
void xorSwap(int *a, int *b) {
    if (a != b) {
        *a ^= *b;
        *b ^= *a;
        *a ^= *b;
    }
}

// 2の累乗判定
int isPowerOf2(unsigned int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

int main() {
    int x = 10, y = 20;
    printf("swap前: x=%d, y=%d\\n", x, y);
    xorSwap(&x, &y);
    printf("swap後: x=%d, y=%d\\n", x, y);

    printf("\\n2の累乗判定:\\n");
    unsigned int vals[] = {1, 2, 3, 4, 7, 8, 16, 15};
    for (int i = 0; i < 8; i++) {
        printf("%3u: %s\\n", vals[i], isPowerOf2(vals[i]) ? "2の累乗" : "違う");
    }

    return 0;
}`}
          expectedOutput={`swap前: x=10, y=20
swap後: x=20, y=10

2の累乗判定:
  1: 2の累乗
  2: 2の累乗
  3: 違う
  4: 2の累乗
  7: 違う
  8: 2の累乗
 16: 2の累乗
 15: 違う`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビットカウント（Population Count）</h2>
        <p className="text-gray-400 mb-4">
          整数中の1のビット数を数えるアルゴリズムです。Brian Kernighanの手法が有名です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// Brian Kernighan のビットカウント
int countBits(unsigned int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  // 最下位の1ビットを消す
        count++;
    }
    return count;
}

// 最下位ビット取得
unsigned int lowestBit(unsigned int n) {
    return n & (-n);
}

int main() {
    printf("ビットカウント:\\n");
    unsigned int vals[] = {0, 1, 5, 7, 255, 0xABCD};
    for (int i = 0; i < 6; i++) {
        printf("0x%04X: %d個\\n", vals[i], countBits(vals[i]));
    }

    printf("\\n最下位ビット:\\n");
    unsigned int n = 0b10110100;
    while (n) {
        unsigned int lb = lowestBit(n);
        printf("0x%X ", lb);
        n &= ~lb;
    }
    printf("\\n");

    return 0;
}`}
          expectedOutput={`ビットカウント:
0x0000: 0個
0x0001: 1個
0x0005: 2個
0x0007: 3個
0x00FF: 8個
0xABCD: 10個

最下位ビット:
0x4 0x10 0x20 0x80`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">偶奇判定・符号判定</h2>
        <p className="text-gray-400 mb-4">
          ビット演算で高速な偶奇判定と符号判定ができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int isEven(int n)     { return !(n & 1); }
int isOdd(int n)      { return n & 1; }
int isNegative(int n) { return (n >> 31) & 1; }  // 符号ビット確認

int main() {
    int nums[] = {-3, -2, -1, 0, 1, 2, 3, 4};
    int n = 8;

    printf("%-5s %-6s %-6s %-8s\\n", "値", "偶数", "奇数", "負");
    for (int i = 0; i < n; i++) {
        printf("%-5d %-6s %-6s %-8s\\n",
            nums[i],
            isEven(nums[i])     ? "yes" : "no",
            isOdd(nums[i])      ? "yes" : "no",
            isNegative(nums[i]) ? "yes" : "no");
    }

    return 0;
}`}
          expectedOutput={`値    偶数   奇数   負       
-3    no     yes    yes     
-2    yes    no     yes     
-1    no     yes    yes     
0     yes    no     no      
1     no     yes    no      
2     yes    no     no      
3     no     yes    no      
4     yes    no     no`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="bitwise" lessonId="techniques" />
      </div>
      <LessonNav lessons={lessons} currentId="techniques" basePath="/learn/bitwise" />
    </div>
  );
}
