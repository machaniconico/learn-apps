import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function RecursionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰</h1>
        <p className="text-gray-400">自分自身を呼び出す再帰関数の設計を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          再帰とは、関数が自分自身を呼び出すテクニックです。
          再帰関数には必ず<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ベースケース</code>（終了条件）と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">再帰ケース</code>（自分自身の呼び出し）が必要です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          ベースケースがないと無限再帰になり、スタックオーバーフローを起こします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な再帰関数</h2>
        <p className="text-gray-400 mb-4">階乗とフィボナッチ数列の再帰実装です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 階乗: n! = n * (n-1)!
int factorial(int n) {
    if (n <= 1) return 1;  // ベースケース
    return n * factorial(n - 1);  // 再帰ケース
}

// フィボナッチ数列
int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    // 階乗
    for (int i = 1; i <= 6; i++) {
        cout << i << "! = " << factorial(i) << endl;
    }

    // フィボナッチ
    cout << "フィボナッチ: ";
    for (int i = 0; i < 10; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
フィボナッチ: 0 1 1 2 3 5 8 13 21 34`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">再帰の実用例</h2>
        <p className="text-gray-400 mb-4">べき乗と数字の合計を再帰で計算します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// べき乗の再帰計算
long long power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// 各桁の合計（再帰版）
int digitSum(int n) {
    if (n < 10) return n;
    return (n % 10) + digitSum(n / 10);
}

// 文字列の逆転（再帰版）
string reverseStr(const string& s) {
    if (s.length() <= 1) return s;
    return reverseStr(s.substr(1)) + s[0];
}

int main() {
    cout << "2^10 = " << power(2, 10) << endl;
    cout << "3^5 = " << power(3, 5) << endl;

    cout << "12345の各桁の合計: " << digitSum(12345) << endl;
    cout << "9876の各桁の合計: " << digitSum(9876) << endl;

    cout << "\"hello\"の逆: " << reverseStr("hello") << endl;
    cout << "\"abcde\"の逆: " << reverseStr("abcde") << endl;

    return 0;
}`}
          expectedOutput={`2^10 = 1024
3^5 = 243
12345の各桁の合計: 15
9876の各桁の合計: 30
"hello"の逆: olleh
"abcde"の逆: edcba`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/functions" />
    </div>
  );
}
