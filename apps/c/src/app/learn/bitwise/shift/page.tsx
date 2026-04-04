import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("bitwise");

export default function ShiftPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビット演算 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シフト演算</h1>
        <p className="text-gray-400">&lt;&lt;・&gt;&gt;・算術シフトと論理シフトを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">シフト演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シフト演算子はビットを左右にずらします。2の累乗による乗除算の高速な代替としても使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">x &lt;&lt; n</code>: 左シフト（x を 2^n 倍）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">x &gt;&gt; n</code>: 右シフト（x を 2^n で割る）</li>
          <li>符号なし整数の右シフトは論理シフト（0が入る）</li>
          <li>符号付き整数の右シフトは実装依存（算術シフトが多い）</li>
          <li>負の数・大きすぎるシフト量は未定義動作</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">左シフト・右シフト</h2>
        <p className="text-gray-400 mb-4">
          シフトで2の累乗の乗除算を行います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    unsigned int x = 1;

    // 左シフト: 2のn乗
    printf("1 << 0 = %u\\n", x << 0);
    printf("1 << 1 = %u\\n", x << 1);
    printf("1 << 2 = %u\\n", x << 2);
    printf("1 << 3 = %u\\n", x << 3);
    printf("1 << 4 = %u\\n", x << 4);

    printf("\\n");

    // 右シフト: 2のn乗で割る（切り捨て）
    unsigned int n = 64;
    printf("%u >> 1 = %u\\n", n, n >> 1);
    printf("%u >> 2 = %u\\n", n, n >> 2);
    printf("%u >> 3 = %u\\n", n, n >> 3);

    // 乗除算との等価性
    int v = 5;
    printf("\\n5 * 4 = %d, 5 << 2 = %d\\n", v * 4, v << 2);
    printf("20 / 4 = %d, 20 >> 2 = %d\\n", 20 / 4, 20 >> 2);

    return 0;
}`}
          expectedOutput={`1 << 0 = 1
1 << 1 = 2
1 << 2 = 4
1 << 3 = 8
1 << 4 = 16

64 >> 1 = 32
64 >> 2 = 16
64 >> 3 = 8

5 * 4 = 20, 5 << 2 = 20
20 / 4 = 5, 20 >> 2 = 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シフトの実用例</h2>
        <p className="text-gray-400 mb-4">
          RGB色値のパッキング・アンパッキングにシフト演算が使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// RGB値を1つの32bit整数にパック
unsigned int packRGB(unsigned char r, unsigned char g, unsigned char b) {
    return ((unsigned int)r << 16) | ((unsigned int)g << 8) | b;
}

// 32bit整数からRGB値を取り出す
void unpackRGB(unsigned int color, unsigned char *r, unsigned char *g, unsigned char *b) {
    *r = (color >> 16) & 0xFF;
    *g = (color >> 8) & 0xFF;
    *b = color & 0xFF;
}

int main() {
    unsigned int color = packRGB(255, 128, 0);
    printf("パック値: 0x%06X\\n", color);

    unsigned char r, g, b;
    unpackRGB(color, &r, &g, &b);
    printf("R=%d G=%d B=%d\\n", r, g, b);

    return 0;
}`}
          expectedOutput={`パック値: 0xFF8000
R=255 G=128 B=0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="bitwise" lessonId="shift" />
      </div>
      <LessonNav lessons={lessons} currentId="shift" basePath="/learn/bitwise" />
    </div>
  );
}
