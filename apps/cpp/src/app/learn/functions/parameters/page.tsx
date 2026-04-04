import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数</h1>
        <p className="text-gray-400">関数に値を渡す方法（値渡し・参照渡し）を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値渡しと参照渡し</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2 text-base">値渡し（pass by value）</h3>
            <p className="text-gray-300 leading-relaxed">
              引数の<strong className="text-white">コピー</strong>が関数に渡されます。
              関数内で変更しても元の変数に影響しません。
            </p>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2 text-base">参照渡し（pass by reference）</h3>
            <p className="text-gray-300 leading-relaxed">
              引数の<strong className="text-white">参照</strong>が渡されます。
              関数内での変更が元の変数に反映されます。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値渡しと参照渡しの比較</h2>
        <p className="text-gray-400 mb-4">同じ操作でも結果が異なることを確認します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 値渡し: コピーが渡される
void addTenByValue(int x) {
    x += 10;
    cout << "関数内（値渡し）: " << x << endl;
}

// 参照渡し: 元の変数を操作
void addTenByRef(int& x) {
    x += 10;
    cout << "関数内（参照渡し）: " << x << endl;
}

int main() {
    int a = 5;
    addTenByValue(a);
    cout << "呼び出し後（値渡し）: " << a << endl;

    int b = 5;
    addTenByRef(b);
    cout << "呼び出し後（参照渡し）: " << b << endl;

    return 0;
}`}
          expectedOutput={`関数内（値渡し）: 15
呼び出し後（値渡し）: 5
関数内（参照渡し）: 15
呼び出し後（参照渡し）: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const参照とポインタ渡し</h2>
        <p className="text-gray-400 mb-4">大きなオブジェクトのコピーを避けつつ安全に渡す方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// const参照: コピーを避けつつ変更を禁止
void printName(const string& name) {
    cout << "名前: " << name << endl;
    // name = "変更"; // エラー！constなので変更不可
}

// ポインタ渡し
void doubleValue(int* ptr) {
    if (ptr != nullptr) {
        *ptr *= 2;
    }
}

// 複数の値を返す（参照渡しを利用）
void minMax(int a, int b, int c, int& minVal, int& maxVal) {
    minVal = min({a, b, c});
    maxVal = max({a, b, c});
}

int main() {
    string myName = "太郎";
    printName(myName);

    int value = 21;
    doubleValue(&value);
    cout << "2倍: " << value << endl;

    int lo, hi;
    minMax(30, 10, 20, lo, hi);
    cout << "最小: " << lo << ", 最大: " << hi << endl;

    return 0;
}`}
          expectedOutput={`名前: 太郎
2倍: 42
最小: 10, 最大: 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/functions" />
    </div>
  );
}
