import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数の基本</h1>
        <p className="text-gray-400">関数の定義と呼び出し方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数は<strong className="text-teal-400">処理をまとめた名前付きのコードブロック</strong>です。
          同じ処理を何度も書かずに済み、コードを整理できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">戻り値型 関数名(引数リスト) &#123; ... &#125;</code></li>
          <li>戻り値がない場合は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">void</code> を使う</li>
          <li>関数はmain()より前に定義するか、プロトタイプを宣言する</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">return</code> で値を返す・関数を終了する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の定義と呼び出し</h2>
        <p className="text-gray-400 mb-4">
          関数を定義してmain()から呼び出す基本パターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 挨拶を表示する関数（引数なし、戻り値なし）
void greet() {
    printf("こんにちは！\\n");
    printf("C言語の関数へようこそ\\n");
}

// 2つの整数の和を返す関数
int add(int a, int b) {
    return a + b;
}

// 正方形の面積を返す関数
int square_area(int side) {
    return side * side;
}

int main() {
    greet();  // 関数を呼び出す

    int result = add(3, 7);
    printf("3 + 7 = %d\\n", result);

    printf("辺5の正方形の面積: %d\\n", square_area(5));

    return 0;
}`}
          expectedOutput={`こんにちは！
C言語の関数へようこそ
3 + 7 = 10
辺5の正方形の面積: 25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の再利用</h2>
        <p className="text-gray-400 mb-4">
          同じ処理を複数回呼び出せるのが関数の大きなメリットです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void print_line(char c, int n) {
    for (int i = 0; i < n; i++) {
        printf("%c", c);
    }
    printf("\\n");
}

void print_box(int width, int height) {
    print_line('*', width);
    for (int i = 0; i < height - 2; i++) {
        printf("*");
        for (int j = 0; j < width - 2; j++) printf(" ");
        printf("*\\n");
    }
    print_line('*', width);
}

int main() {
    print_line('-', 20);
    printf("関数の再利用\\n");
    print_line('-', 20);

    print_box(10, 4);

    return 0;
}`}
          expectedOutput={`--------------------
関数の再利用
--------------------
**********
*        *
*        *
**********`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
