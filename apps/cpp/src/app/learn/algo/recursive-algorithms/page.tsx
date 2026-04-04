import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function RecursiveAlgorithmsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰アルゴリズム</h1>
        <p className="text-gray-400">再帰を使った分割統治法の実装を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰と分割統治法</h2>
        <p className="text-gray-300 leading-relaxed">
          再帰は問題を小さな部分問題に分割して解く手法です。
          <strong>基底条件</strong>（再帰の終了条件）を忘れると無限ループになるため注意が必要です。
          分割統治法は「分割→解決→統合」の3ステップで問題を解きます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">再帰の基本例</h2>
        <p className="text-gray-400 mb-4">階乗とフィボナッチ数列の再帰実装です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 階乗: n! = n * (n-1)!
long long factorial(int n) {
    if (n <= 1) return 1;  // 基底条件
    return n * factorial(n - 1);
}

// フィボナッチ（素朴な再帰: 遅い）
int fib(int n) {
    if (n <= 1) return n;  // 基底条件
    return fib(n - 1) + fib(n - 2);
}

// べき乗の高速計算（分割統治）
long long power(long long base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        long long half = power(base, exp / 2);
        return half * half;
    }
    return base * power(base, exp - 1);
}

int main() {
    cout << "5! = " << factorial(5) << endl;
    cout << "10! = " << factorial(10) << endl;
    cout << "fib(10) = " << fib(10) << endl;
    cout << "2^20 = " << power(2, 20) << endl;
    return 0;
}`}
          expectedOutput={`5! = 120
10! = 3628800
fib(10) = 55
2^20 = 1048576`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ハノイの塔</h2>
        <p className="text-gray-400 mb-4">分割統治法の典型例であるハノイの塔の再帰解法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int moveCount = 0;

void hanoi(int n, const string& from, const string& to, const string& aux) {
    if (n == 1) {
        moveCount++;
        cout << "円盤" << n << ": " << from << " -> " << to << endl;
        return;
    }
    hanoi(n - 1, from, aux, to);
    moveCount++;
    cout << "円盤" << n << ": " << from << " -> " << to << endl;
    hanoi(n - 1, aux, to, from);
}

int main() {
    int n = 3;
    cout << n << "枚の円盤を移動:" << endl;
    hanoi(n, "A", "C", "B");
    cout << "移動回数: " << moveCount << endl;
    return 0;
}`}
          expectedOutput={`3枚の円盤を移動:
円盤1: A -> C
円盤2: A -> B
円盤1: C -> B
円盤3: A -> C
円盤1: B -> A
円盤2: B -> C
円盤1: A -> C
移動回数: 7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="recursive-algorithms" />
      </div>
      <LessonNav lessons={lessons} currentId="recursive-algorithms" basePath="/learn/algo" />
    </div>
  );
}
