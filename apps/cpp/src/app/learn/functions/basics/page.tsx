import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数の基本</h1>
        <p className="text-gray-400">関数の定義と呼び出し方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数は特定の処理をまとめた再利用可能なコードブロックです。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">戻り値の型 関数名(引数リスト)</code> の形式で定義します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C++では関数を呼び出す前に、その関数が宣言されている必要があります。
          関数の<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">プロトタイプ宣言</code>（前方宣言）を使うと、
          定義を後に書くこともできます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の定義と呼び出し</h2>
        <p className="text-gray-400 mb-4">基本的な関数の定義と呼び出し方です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 関数の定義
void sayHello() {
    cout << "こんにちは！" << endl;
}

int add(int a, int b) {
    return a + b;
}

double average(double x, double y) {
    return (x + y) / 2.0;
}

int main() {
    // 関数の呼び出し
    sayHello();

    int sum = add(3, 5);
    cout << "3 + 5 = " << sum << endl;

    double avg = average(80.0, 95.0);
    cout << "平均: " << avg << endl;

    // 戻り値を直接使う
    cout << "10 + 20 = " << add(10, 20) << endl;

    return 0;
}`}
          expectedOutput={`こんにちは！
3 + 5 = 8
平均: 87.5
10 + 20 = 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロトタイプ宣言</h2>
        <p className="text-gray-400 mb-4">関数を定義する前に使うためのプロトタイプ宣言です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// プロトタイプ宣言（前方宣言）
int multiply(int a, int b);
void printResult(int value);

int main() {
    int result = multiply(4, 7);
    printResult(result);

    // 関数を組み合わせて使う
    printResult(multiply(3, 3));

    return 0;
}

// 関数の定義（mainの後に書ける）
int multiply(int a, int b) {
    return a * b;
}

void printResult(int value) {
    cout << "結果: " << value << endl;
}`}
          expectedOutput={`結果: 28
結果: 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
