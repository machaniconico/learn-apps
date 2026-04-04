import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function OverloadingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オーバーロード</h1>
        <p className="text-gray-400">同名関数の異なるシグネチャ定義を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数オーバーロードとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++では<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">引数の型・数・順番</code>が異なれば、
          同じ名前の関数を複数定義できます。これを関数オーバーロードと呼びます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          コンパイラが呼び出し時の引数から適切な関数を自動的に選択します。
          ただし、<strong className="text-white">戻り値の型だけ</strong>が違う場合はオーバーロードできません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なオーバーロード</h2>
        <p className="text-gray-400 mb-4">引数の型と数が異なるオーバーロードの例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// 引数の型が異なるオーバーロード
void print(int value) {
    cout << "整数: " << value << endl;
}

void print(double value) {
    cout << "小数: " << value << endl;
}

void print(const string& value) {
    cout << "文字列: " << value << endl;
}

// 引数の数が異なるオーバーロード
int add(int a, int b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    print(42);
    print(3.14);
    print(string("Hello C++"));

    cout << "2つの合計: " << add(10, 20) << endl;
    cout << "3つの合計: " << add(10, 20, 30) << endl;

    return 0;
}`}
          expectedOutput={`整数: 42
小数: 3.14
文字列: Hello C++
2つの合計: 30
3つの合計: 60`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的なオーバーロード</h2>
        <p className="text-gray-400 mb-4">面積計算の例でオーバーロードの便利さを体験します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 正方形の面積
double area(double side) {
    return side * side;
}

// 長方形の面積
double area(double width, double height) {
    return width * height;
}

// 三角形の面積（3辺からヘロンの公式）
double area(double a, double b, double c) {
    double s = (a + b + c) / 2.0;
    return sqrt(s * (s - a) * (s - b) * (s - c));
}

int main() {
    cout << "正方形（辺5）: " << area(5.0) << endl;
    cout << "長方形（3x7）: " << area(3.0, 7.0) << endl;
    cout << "三角形（3,4,5）: " << area(3.0, 4.0, 5.0) << endl;

    return 0;
}`}
          expectedOutput={`正方形（辺5）: 25
長方形（3x7）: 21
三角形（3,4,5）: 6`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="overloading" />
      </div>
      <LessonNav lessons={lessons} currentId="overloading" basePath="/learn/functions" />
    </div>
  );
}
