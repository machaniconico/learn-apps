import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("iterators");

export default function CustomIteratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">カスタムイテレータ</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        自作クラスにイテレータを実装すると、範囲forループやSTLアルゴリズムで使えるようになります。
        begin()とend()を提供し、イテレータクラスで必要な演算子をオーバーロードします。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シンプルな数列イテレータ</h2>
        <p className="text-gray-400 mb-4">
          指定範囲の整数を生成するカスタムイテレータを実装します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Range {
    int start_, end_;
public:
    Range(int start, int end) : start_(start), end_(end) {}

    struct Iterator {
        int value;
        int operator*() const { return value; }
        Iterator& operator++() { ++value; return *this; }
        bool operator!=(const Iterator& other) const { return value != other.value; }
    };

    Iterator begin() const { return {start_}; }
    Iterator end() const { return {end_}; }
};

int main() {
    cout << "Range(1,6): ";
    for (int x : Range(1, 6)) {
        cout << x << " ";
    }
    cout << endl;

    cout << "Range(10,15): ";
    for (int x : Range(10, 15)) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`Range(1,6): 1 2 3 4 5
Range(10,15): 10 11 12 13 14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンテナクラスにイテレータを実装</h2>
        <p className="text-gray-400 mb-4">
          固定サイズの配列をラップするコンテナクラスにイテレータを追加します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <algorithm>
using namespace std;

template<typename T, int N>
class FixedArray {
    T data[N];
public:
    T* begin() { return data; }
    T* end() { return data + N; }
    const T* begin() const { return data; }
    const T* end() const { return data + N; }
    T& operator[](int i) { return data[i]; }
};

int main() {
    FixedArray<int, 5> arr;
    arr[0] = 50; arr[1] = 20; arr[2] = 40; arr[3] = 10; arr[4] = 30;

    // 範囲forが使える
    cout << "元: ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    // STLアルゴリズムも使える
    sort(arr.begin(), arr.end());
    cout << "ソート: ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`元: 50 20 40 10 30
ソート: 10 20 30 40 50`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ステップイテレータ</h2>
        <p className="text-gray-400 mb-4">
          指定したステップ数で要素を飛ばしながら走査するカスタムイテレータです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class StepRange {
    int start_, end_, step_;
public:
    StepRange(int start, int end, int step)
        : start_(start), end_(end), step_(step) {}

    struct Iterator {
        int value, step;
        int operator*() const { return value; }
        Iterator& operator++() { value += step; return *this; }
        bool operator!=(const Iterator& other) const {
            return step > 0 ? value < other.value : value > other.value;
        }
    };

    Iterator begin() const { return {start_, step_}; }
    Iterator end() const { return {end_, step_}; }
};

int main() {
    cout << "2ステップ: ";
    for (int x : StepRange(0, 10, 2)) cout << x << " ";
    cout << endl;

    cout << "3ステップ: ";
    for (int x : StepRange(0, 15, 3)) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`2ステップ: 0 2 4 6 8
3ステップ: 0 3 6 9 12`}
        />
      </section>

      <LessonCompleteButton categoryId="iterators" lessonId="custom-iterator" />
      <LessonNav lessons={lessons} currentId="custom-iterator" basePath="/learn/iterators" />
    </div>
  );
}
