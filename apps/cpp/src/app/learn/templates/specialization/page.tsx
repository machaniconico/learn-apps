import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("templates");

export default function SpecializationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">テンプレート レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テンプレート特殊化</h1>
        <p className="text-gray-400">完全特殊化と部分特殊化で特定の型に対する実装を提供する方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テンプレート特殊化とは</h2>
        <p className="text-gray-300 leading-relaxed">
          テンプレート特殊化を使うと、特定の型に対して汎用テンプレートとは異なる実装を提供できます。
          完全特殊化はすべての型パラメータを具体的に指定し、部分特殊化は一部の型パラメータのみを特殊化します。
          これにより、型ごとに最適化された処理を記述できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">完全特殊化</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <cstring>
using namespace std;

// 汎用テンプレート
template <typename T>
class TypeInfo {
public:
    static void print() {
        cout << "Unknown type" << endl;
    }
};

// int に対する完全特殊化
template <>
class TypeInfo<int> {
public:
    static void print() {
        cout << "Type: int (整数型)" << endl;
    }
};

// double に対する完全特殊化
template <>
class TypeInfo<double> {
public:
    static void print() {
        cout << "Type: double (浮動小数点型)" << endl;
    }
};

// string に対する完全特殊化
template <>
class TypeInfo<string> {
public:
    static void print() {
        cout << "Type: string (文字列型)" << endl;
    }
};

int main() {
    TypeInfo<int>::print();
    TypeInfo<double>::print();
    TypeInfo<string>::print();
    TypeInfo<char>::print(); // 汎用版

    return 0;
}`}
          expectedOutput={`Type: int (整数型)
Type: double (浮動小数点型)
Type: string (文字列型)
Unknown type`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">部分特殊化</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 汎用テンプレート
template <typename T, typename U>
class Pair {
public:
    void describe() {
        cout << "汎用Pair<T, U>" << endl;
    }
};

// 両方が同じ型の場合の部分特殊化
template <typename T>
class Pair<T, T> {
public:
    void describe() {
        cout << "同型Pair<T, T>" << endl;
    }
};

// 第2引数がintの場合の部分特殊化
template <typename T>
class Pair<T, int> {
public:
    void describe() {
        cout << "Pair<T, int> (第2引数がint)" << endl;
    }
};

// ポインタ型の部分特殊化
template <typename T>
class Pair<T*, T*> {
public:
    void describe() {
        cout << "ポインタPair<T*, T*>" << endl;
    }
};

int main() {
    Pair<string, double> p1;
    Pair<double, double> p2;
    Pair<string, int> p3;
    Pair<int*, int*> p4;

    p1.describe();
    p2.describe();
    p3.describe();
    p4.describe();

    return 0;
}`}
          expectedOutput={`汎用Pair<T, U>
同型Pair<T, T>
Pair<T, int> (第2引数がint)
ポインタPair<T*, T*>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="templates" lessonId="specialization" />
      </div>
      <LessonNav lessons={lessons} currentId="specialization" basePath="/learn/templates" />
    </div>
  );
}
