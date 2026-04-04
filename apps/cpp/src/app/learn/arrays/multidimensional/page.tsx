import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function MultidimensionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多次元配列</h1>
        <p className="text-gray-400">2次元配列とvectorのネスト</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">多次元配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          多次元配列は「配列の配列」で、行列やグリッドなどの2次元データを表現します。
          C配列では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int arr[行][列]</code>、
          vectorでは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">vector&lt;vector&lt;int&gt;&gt;</code> で表現します。
          vectorのネストは各行のサイズが異なるジャグ配列も作れます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C配列の2次元配列</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 3行4列の2次元配列
    int matrix[3][4] = {
        {1,  2,  3,  4},
        {5,  6,  7,  8},
        {9, 10, 11, 12}
    };

    // 表示
    cout << "行列:" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << matrix[i][j] << "\t";
        }
        cout << endl;
    }

    // 全要素の合計
    int sum = 0;
    for (auto& row : matrix) {
        for (int val : row) {
            sum += val;
        }
    }
    cout << "合計: " << sum << endl;

    return 0;
}`}
          expectedOutput={`行列:
1	2	3	4
5	6	7	8
9	10	11	12
合計: 78`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">vectorの2次元配列</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 3x3 のゼロ行列
    vector<vector<int>> grid(3, vector<int>(3, 0));

    // 単位行列にする
    for (int i = 0; i < 3; i++) {
        grid[i][i] = 1;
    }

    cout << "単位行列:" << endl;
    for (const auto& row : grid) {
        for (int val : row) {
            cout << val << " ";
        }
        cout << endl;
    }

    // ジャグ配列（各行のサイズが異なる）
    vector<vector<int>> jagged;
    jagged.push_back({1});
    jagged.push_back({2, 3});
    jagged.push_back({4, 5, 6});

    cout << "ジャグ配列:" << endl;
    for (int i = 0; i < (int)jagged.size(); i++) {
        cout << "行" << i << " (size=" << jagged[i].size() << "): ";
        for (int val : jagged[i]) cout << val << " ";
        cout << endl;
    }

    return 0;
}`}
          expectedOutput={`単位行列:
1 0 0
0 1 0
0 0 1
ジャグ配列:
行0 (size=1): 1
行1 (size=2): 2 3
行2 (size=3): 4 5 6`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      </div>
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}
