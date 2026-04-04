import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionPointersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数ポインタ</h1>
        <p className="text-gray-400">関数のアドレスを保持し間接的に呼び出す方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++では関数もメモリ上にアドレスを持ちます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">関数ポインタ</code>を使うと、
          そのアドレスを変数に格納し、間接的に関数を呼び出せます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          構文: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{"戻り値の型 (*変数名)(引数の型...)"}</code>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な関数ポインタ</h2>
        <p className="text-gray-400 mb-4">関数ポインタの宣言と使用方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

int main() {
    // 関数ポインタの宣言と代入
    int (*operation)(int, int);

    operation = add;
    cout << "add(5, 3) = " << operation(5, 3) << endl;

    operation = subtract;
    cout << "subtract(5, 3) = " << operation(5, 3) << endl;

    operation = multiply;
    cout << "multiply(5, 3) = " << operation(5, 3) << endl;

    // 関数ポインタの配列
    int (*ops[])(int, int) = {add, subtract, multiply};
    const char* names[] = {"加算", "減算", "乗算"};

    for (int i = 0; i < 3; i++) {
        cout << names[i] << ": " << ops[i](10, 4) << endl;
    }

    return 0;
}`}
          expectedOutput={`add(5, 3) = 8
subtract(5, 3) = 2
multiply(5, 3) = 15
加算: 14
減算: 6
乗算: 40`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールバックパターン</h2>
        <p className="text-gray-400 mb-4">関数ポインタを引数に渡すコールバックの例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

// コールバック関数の型
typedef bool (*Predicate)(int);

// フィルタ関数（コールバックを受け取る）
void filterAndPrint(const vector<int>& nums, Predicate pred, const string& label) {
    cout << label << ": ";
    for (int n : nums) {
        if (pred(n))
            cout << n << " ";
    }
    cout << endl;
}

// コールバック用の関数
bool isEven(int n) { return n % 2 == 0; }
bool isPositive(int n) { return n > 0; }
bool isGreaterThan5(int n) { return n > 5; }

int main() {
    vector<int> data = {-3, 1, 4, -1, 5, 9, 2, 6, -5, 3};

    filterAndPrint(data, isEven, "偶数");
    filterAndPrint(data, isPositive, "正の数");
    filterAndPrint(data, isGreaterThan5, "5より大きい");

    return 0;
}`}
          expectedOutput={`偶数: 4 2 6
正の数: 1 4 5 9 2 6 3
5より大きい: 9 6`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="function-pointers" />
      </div>
      <LessonNav lessons={lessons} currentId="function-pointers" basePath="/learn/functions" />
    </div>
  );
}
