import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function IncludePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">プリプロセッサ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">#include</h1>
        <p className="text-gray-400">ヘッダファイルのインクルードの仕組みを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">#includeディレクティブ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#include</code> はプリプロセッサに
          指定したファイルの内容をその場所に挿入するよう指示します。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;...&gt;</code> はシステムヘッダを、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">"..."</code> はユーザー定義ヘッダを検索します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準ヘッダのインクルード</h2>
        <p className="text-gray-400 mb-4">よく使う標準ライブラリヘッダの例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>   // 入出力
#include <string>     // 文字列
#include <vector>     // 動的配列
#include <algorithm>  // アルゴリズム
#include <cmath>      // 数学関数
using namespace std;

int main() {
    // <iostream>
    cout << "=== 標準ヘッダの例 ===" << endl;

    // <string>
    string name = "C++";
    cout << "言語: " << name << endl;

    // <vector> + <algorithm>
    vector<int> nums = {3, 1, 4, 1, 5};
    sort(nums.begin(), nums.end());
    cout << "ソート: ";
    for (int n : nums) cout << n << " ";
    cout << endl;

    // <cmath>
    cout << "sqrt(16) = " << sqrt(16) << endl;

    return 0;
}`}
          expectedOutput={`=== 標準ヘッダの例 ===
言語: C++
ソート: 1 1 3 4 5
sqrt(16) = 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インクルードガード</h2>
        <p className="text-gray-400 mb-4">ヘッダファイルの多重インクルードを防ぐパターンです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// --- mymath.h の内容をシミュレート ---
// インクルードガードパターン
#ifndef MYMATH_H
#define MYMATH_H

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

#endif // MYMATH_H

// 2回目のインクルードは無視される（ガードのおかげ）
#ifndef MYMATH_H
#define MYMATH_H
// この中身は展開されない
#endif

int main() {
    cout << "add(3, 5) = " << add(3, 5) << endl;
    cout << "multiply(4, 6) = " << multiply(4, 6) << endl;
    return 0;
}`}
          expectedOutput={`add(3, 5) = 8
multiply(4, 6) = 24`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="include" />
      </div>
      <LessonNav lessons={lessons} currentId="include" basePath="/learn/preprocessor" />
    </div>
  );
}
