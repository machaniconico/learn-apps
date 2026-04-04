import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whileループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">while</code> ループは、
          条件式がtrueである限り繰り返し実行します。
          繰り返し回数が事前にわからない場合に適しています。
        </p>
        <p className="text-gray-300 leading-relaxed">
          条件が最初からfalseの場合、ループ本体は一度も実行されません。
          無限ループにならないよう、ループ内で条件を変更する処理が必要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なwhileループ</h2>
        <p className="text-gray-400 mb-4">カウンタを使った基本例とカウントダウンです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 基本的なwhile
    int count = 1;
    while (count <= 5) {
        cout << count << " ";
        count++;
    }
    cout << endl;

    // カウントダウン
    int n = 10;
    while (n > 0) {
        cout << n << " ";
        n -= 3;
    }
    cout << endl;

    // 桁数を数える
    int number = 12345;
    int digits = 0;
    int temp = number;
    while (temp > 0) {
        digits++;
        temp /= 10;
    }
    cout << number << "の桁数: " << digits << endl;

    return 0;
}`}
          expectedOutput={`1 2 3 4 5
10 7 4 1
12345の桁数: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">whileの実用例</h2>
        <p className="text-gray-400 mb-4">ユークリッドの互除法で最大公約数を求めます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // ユークリッドの互除法（GCD）
    int a = 48, b = 18;
    int origA = a, origB = b;

    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    cout << origA << "と" << origB << "の最大公約数: " << a << endl;

    // 2進数変換
    int num = 42;
    string binary = "";
    int n = num;
    while (n > 0) {
        binary = to_string(n % 2) + binary;
        n /= 2;
    }
    cout << num << "の2進数: " << binary << endl;

    return 0;
}`}
          expectedOutput={`48と18の最大公約数: 6
42の2進数: 101010`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
