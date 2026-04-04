import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function FunctorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ラムダ・関数オブジェクト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数オブジェクト</h1>
        <p className="text-gray-400">operator()を持つクラスによる関数オブジェクト（ファンクタ）を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファンクタの基本</h2>
        <p className="text-gray-400 mb-4">
          関数オブジェクト（ファンクタ）は、operator()を定義したクラスのインスタンスです。
          関数のように呼び出せ、状態を保持できるのが特徴です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Adder {
    int value;
public:
    Adder(int v) : value(v) {}

    int operator()(int x) const {
        return x + value;
    }
};

class Counter {
    int count = 0;
public:
    void operator()() {
        count++;
        cout << "カウント: " << count << endl;
    }
    int getCount() const { return count; }
};

int main() {
    // ファンクタを関数のように使う
    Adder add10(10);
    Adder add20(20);
    cout << "add10(5) = " << add10(5) << endl;
    cout << "add20(5) = " << add20(5) << endl;

    // 状態を持つファンクタ
    Counter counter;
    counter();
    counter();
    counter();

    return 0;
}`}
          expectedOutput={`add10(5) = 15
add20(5) = 25
カウント: 1
カウント: 2
カウント: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">STLアルゴリズムとファンクタ</h2>
        <p className="text-gray-400 mb-4">
          ファンクタはSTLアルゴリズムの述語やコールバックとして使えます。
          ラムダが登場する前はファンクタが主流でした。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class GreaterThan {
    int threshold;
public:
    GreaterThan(int t) : threshold(t) {}
    bool operator()(int x) const {
        return x > threshold;
    }
};

class Multiplier {
    int factor;
public:
    Multiplier(int f) : factor(f) {}
    int operator()(int x) const {
        return x * factor;
    }
};

int main() {
    vector<int> nums = {1, 5, 3, 8, 2, 9, 4};

    // ファンクタで条件カウント
    int count = count_if(nums.begin(), nums.end(), GreaterThan(4));
    cout << "4より大きい要素: " << count << "個" << endl;

    // ファンクタで変換
    vector<int> result(nums.size());
    transform(nums.begin(), nums.end(), result.begin(), Multiplier(3));
    cout << "3倍: ";
    for (int n : result) cout << n << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`4より大きい要素: 3個
3倍: 3 15 9 24 6 27 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準ファンクタ</h2>
        <p className="text-gray-400 mb-4">
          &lt;functional&gt;ヘッダに標準のファンクタが定義されています。
          std::plus、std::less、std::greaterなどが使えます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6};

    // std::greater で降順ソート
    sort(nums.begin(), nums.end(), greater<int>());
    cout << "降順: ";
    for (int n : nums) cout << n << " ";
    cout << endl;

    // std::plus で累積
    int sum = 0;
    for (int n : nums) {
        sum = plus<int>()(sum, n);
    }
    cout << "合計: " << sum << endl;

    // std::negate で符号反転
    cout << "反転: ";
    for (int n : nums) {
        cout << negate<int>()(n) << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`降順: 9 6 5 4 3 2 1 1
合計: 31
反転: -9 -6 -5 -4 -3 -2 -1 -1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="functors" />
      </div>
      <LessonNav lessons={lessons} currentId="functors" basePath="/learn/lambda" />
    </div>
  );
}
