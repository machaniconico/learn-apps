import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">変数の宣言と値の代入の基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数はデータを格納するための<strong className="text-blue-400">名前付きのメモリ領域</strong>です。
          C言語では変数を使う前に<strong className="text-blue-400">型を指定して宣言</strong>する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int x;</code> - 整数変数の宣言</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int x = 10;</code> - 宣言と同時に初期化</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">x = 20;</code> - 値の代入</li>
          <li>変数名は英字またはアンダースコアで始まり、英数字とアンダースコアが使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の宣言と代入</h2>
        <p className="text-gray-400 mb-4">
          C言語では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">型名 変数名;</code> で変数を宣言します。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">=</code> で値を代入します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int age;          // 宣言のみ
    age = 25;         // 後から代入

    int score = 100;  // 宣言と同時に初期化
    float pi = 3.14f;
    char initial = 'T';

    printf("年齢: %d\\n", age);
    printf("スコア: %d\\n", score);
    printf("円周率: %.2f\\n", pi);
    printf("イニシャル: %c\\n", initial);

    return 0;
}`}
          expectedOutput={`年齢: 25
スコア: 100
円周率: 3.14
イニシャル: T`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の変更と演算</h2>
        <p className="text-gray-400 mb-4">
          変数の値は後から変更できます。変数同士を使って計算することもできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 10;
    printf("最初のx: %d\\n", x);

    x = 20;  // 値を変更
    printf("変更後のx: %d\\n", x);

    x = x + 5;  // 自分自身を使った計算
    printf("x + 5 = %d\\n", x);

    int a = 7, b = 3;  // 複数の変数を同時に宣言
    int sum = a + b;
    printf("%d + %d = %d\\n", a, b, sum);

    return 0;
}`}
          expectedOutput={`最初のx: 10
変更後のx: 20
x + 5 = 25
7 + 3 = 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
