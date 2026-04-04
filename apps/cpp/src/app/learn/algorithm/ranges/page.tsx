import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function RangesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">Ranges</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        C++20のRangesライブラリはSTLアルゴリズムを大幅に改善します。
        パイプ演算子（|）で操作を連鎖させ、begin/endの指定が不要になります。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Rangesの基本</h2>
        <p className="text-gray-400 mb-4">
          std::ranges名前空間のアルゴリズムはコンテナを直接受け取れるため、begin/endが不要です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <ranges>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};

    // ranges::sort はコンテナを直接受け取れる
    ranges::sort(v);
    cout << "ソート: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // ranges::find
    auto it = ranges::find(v, 8);
    if (it != v.end())
        cout << "8が見つかりました" << endl;

    // ranges::count_if
    int count = ranges::count_if(v, [](int x) { return x > 3; });
    cout << "3より大きい要素: " << count << "個" << endl;

    return 0;
}`}
          expectedOutput={`ソート: 1 2 3 5 8 9
8が見つかりました
3より大きい要素: 3個`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビューとパイプ演算子</h2>
        <p className="text-gray-400 mb-4">
          views（ビュー）は遅延評価で動作し、パイプ演算子で連鎖させることでデータ処理パイプラインを構築できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <ranges>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // パイプで偶数をフィルタして2乗する
    cout << "偶数の2乗: ";
    for (int x : v | views::filter([](int n) { return n % 2 == 0; })
                    | views::transform([](int n) { return n * n; })) {
        cout << x << " ";
    }
    cout << endl;

    // 先頭5個を取得
    cout << "先頭5個: ";
    for (int x : v | views::take(5)) {
        cout << x << " ";
    }
    cout << endl;

    // 先頭3個をスキップして逆順
    cout << "スキップ+逆順: ";
    for (int x : v | views::drop(3) | views::reverse) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`偶数の2乗: 4 16 36 64 100
先頭5個: 1 2 3 4 5
スキップ+逆順: 10 9 8 7 6 5 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">iotaビューとカスタムビュー</h2>
        <p className="text-gray-400 mb-4">
          views::iotaで無限の連番を生成し、takeで必要な数だけ取得できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <ranges>
using namespace std;

int main() {
    // 1から始まる連番から最初の10個
    cout << "連番: ";
    for (int x : views::iota(1) | views::take(10)) {
        cout << x << " ";
    }
    cout << endl;

    // FizzBuzz風（1-15）
    cout << "3の倍数: ";
    for (int x : views::iota(1, 16) | views::filter([](int n) { return n % 3 == 0; })) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`連番: 1 2 3 4 5 6 7 8 9 10
3の倍数: 3 6 9 12 15`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="ranges" />
      <LessonNav lessons={lessons} currentId="ranges" basePath="/learn/algorithm" />
    </div>
  );
}
