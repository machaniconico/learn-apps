import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">#define・const・enumによる定数の定義を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">定数の定義方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語では値が変わらない定数を3つの方法で定義できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">#define PI 3.14</code> - プリプロセッサマクロ（型なし）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">const int MAX = 100;</code> - const修飾子（型あり、推奨）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">enum Color &#123; RED, GREEN, BLUE &#125;;</code> - 列挙型</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#define マクロ定数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#define</code> はプリプロセッサによってコンパイル前に文字列置換されます。型チェックがないため注意が必要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define PI 3.14159265
#define MAX_SIZE 100
#define GREETING "Hello"

int main() {
    printf("PI = %f\\n", PI);
    printf("MAX_SIZE = %d\\n", MAX_SIZE);
    printf("GREETING = %s\\n", GREETING);

    // 円の面積計算
    double r = 5.0;
    double area = PI * r * r;
    printf("半径%.1fの円の面積: %.4f\\n", r, area);

    return 0;
}`}
          expectedOutput={`PI = 3.141593
MAX_SIZE = 100
GREETING = Hello
半径5.0の円の面積: 78.5398`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const定数と列挙型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> は型安全な定数を定義します。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">enum</code> は関連する整数定数をグループ化します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// const定数
const double TAX_RATE = 0.10;
const int DAYS_IN_WEEK = 7;

// 列挙型
enum Season { SPRING = 1, SUMMER, AUTUMN, WINTER };
enum Direction { NORTH, SOUTH, EAST, WEST };

int main() {
    printf("消費税率: %.0f%%\\n", TAX_RATE * 100);
    printf("1週間: %d日\\n", DAYS_IN_WEEK);

    enum Season s = SUMMER;
    printf("季節番号: %d\\n", s);

    // enumを使った条件分岐
    enum Direction dir = NORTH;
    if (dir == NORTH) {
        printf("北に進みます\\n");
    }

    return 0;
}`}
          expectedOutput={`消費税率: 10%
1週間: 7日
季節番号: 2
北に進みます`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
