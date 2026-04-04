import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数（値渡し）</h1>
        <p className="text-gray-400">関数に値を渡す方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値渡し（pass by value）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語の関数引数はデフォルトで<strong className="text-teal-400">値渡し</strong>です。
          引数として渡した変数の<strong className="text-teal-400">コピー</strong>が関数に渡されるため、
          関数内で引数を変更しても呼び出し元の変数には影響しません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>仮引数（パラメータ）：関数定義の引数名</li>
          <li>実引数（アーギュメント）：関数呼び出し時に渡す値</li>
          <li>値渡しでは実引数のコピーが仮引数に代入される</li>
          <li>呼び出し元の変数を変更したい場合はポインタを使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値渡しの動作確認</h2>
        <p className="text-gray-400 mb-4">
          関数内で引数を変更しても呼び出し元には影響しないことを確認します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void double_value(int x) {
    printf("  関数内: x = %d\\n", x);
    x = x * 2;  // コピーを変更
    printf("  関数内(変更後): x = %d\\n", x);
}

int add(int a, int b) {
    return a + b;
}

int main() {
    int num = 5;

    printf("呼び出し前: num = %d\\n", num);
    double_value(num);
    printf("呼び出し後: num = %d\\n", num);  // 変わらない

    // 複数の引数
    int x = 10, y = 20;
    int sum = add(x, y);
    printf("\\n%d + %d = %d\\n", x, y, sum);

    return 0;
}`}
          expectedOutput={`呼び出し前: num = 5
  関数内: x = 5
  関数内(変更後): x = 10
呼び出し後: num = 5

10 + 20 = 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の引数と型</h2>
        <p className="text-gray-400 mb-4">
          異なる型の引数を複数取る関数の例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 複数の型の引数
void print_person(char name[], int age, double height) {
    printf("名前: %s\\n", name);
    printf("年齢: %d歳\\n", age);
    printf("身長: %.1fcm\\n", height);
}

// 3つの数の最大値
int max3(int a, int b, int c) {
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    return max;
}

int main() {
    print_person("田中太郎", 25, 175.5);
    printf("\\n");
    print_person("山田花子", 30, 162.3);

    printf("\\nmax(3, 7, 5) = %d\\n", max3(3, 7, 5));
    printf("max(9, 2, 8) = %d\\n", max3(9, 2, 8));

    return 0;
}`}
          expectedOutput={`名前: 田中太郎
年齢: 25歳
身長: 175.5cm

名前: 山田花子
年齢: 30歳
身長: 162.3cm

max(3, 7, 5) = 7
max(9, 2, 8) = 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/functions" />
    </div>
  );
}
