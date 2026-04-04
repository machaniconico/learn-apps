import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function StdFunctionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ラムダ・関数オブジェクト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::function</h1>
        <p className="text-gray-400">ラムダや関数ポインタを格納する汎用関数ラッパーを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::functionの基本</h2>
        <p className="text-gray-400 mb-4">
          std::functionは関数ポインタ、ラムダ、関数オブジェクトを統一的に格納できる型消去ラッパーです。
          シグネチャ（戻り値型と引数型）を指定して使います。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <functional>
using namespace std;

// 通常の関数
int add(int a, int b) { return a + b; }

int main() {
    // 関数ポインタを格納
    function<int(int, int)> f1 = add;
    cout << "関数ポインタ: " << f1(3, 4) << endl;

    // ラムダを格納
    function<int(int, int)> f2 = [](int a, int b) {
        return a * b;
    };
    cout << "ラムダ: " << f2(3, 4) << endl;

    // 再代入可能
    f1 = [](int a, int b) { return a - b; };
    cout << "再代入後: " << f1(10, 3) << endl;

    return 0;
}`}
          expectedOutput={`関数ポインタ: 7
ラムダ: 12
再代入後: 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールバックパターン</h2>
        <p className="text-gray-400 mb-4">
          std::functionは関数の引数としてコールバックを渡すパターンで活躍します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <functional>
#include <vector>
using namespace std;

void processNumbers(const vector<int>& nums,
                    function<void(int)> callback) {
    for (int n : nums) {
        callback(n);
    }
}

int main() {
    vector<int> data = {1, 2, 3, 4, 5};

    // コールバック1: 表示
    cout << "表示: ";
    processNumbers(data, [](int n) {
        cout << n << " ";
    });
    cout << endl;

    // コールバック2: 2乗表示
    cout << "2乗: ";
    processNumbers(data, [](int n) {
        cout << n * n << " ";
    });
    cout << endl;

    // コールバック3: 合計計算
    int sum = 0;
    processNumbers(data, [&sum](int n) {
        sum += n;
    });
    cout << "合計: " << sum << endl;

    return 0;
}`}
          expectedOutput={`表示: 1 2 3 4 5
2乗: 1 4 9 16 25
合計: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数のコンテナ</h2>
        <p className="text-gray-400 mb-4">
          std::functionをvectorに格納して、複数の関数を動的に管理できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <functional>
#include <vector>
using namespace std;

int main() {
    // 関数のリスト
    vector<function<int(int)>> operations;

    operations.push_back([](int x) { return x + 10; });
    operations.push_back([](int x) { return x * 2; });
    operations.push_back([](int x) { return x - 3; });

    // パイプライン実行
    int value = 5;
    cout << "初期値: " << value << endl;
    for (const auto& op : operations) {
        value = op(value);
        cout << "→ " << value << endl;
    }
    cout << "最終値: " << value << endl;

    return 0;
}`}
          expectedOutput={`初期値: 5
→ 15
→ 30
→ 27
最終値: 27`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="std-function" />
      </div>
      <LessonNav lessons={lessons} currentId="std-function" basePath="/learn/lambda" />
    </div>
  );
}
