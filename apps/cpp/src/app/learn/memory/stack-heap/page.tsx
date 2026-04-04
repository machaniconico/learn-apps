import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function StackHeapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">メモリ管理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタックとヒープ</h1>
        <p className="text-gray-400">メモリレイアウトの基本と、スタック・ヒープそれぞれの特徴を理解します。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックメモリ</h2>
        <p className="text-gray-400 mb-4">
          スタックはLIFO（後入れ先出し）構造で、ローカル変数や関数の引数が自動的に配置されます。
          関数が終了するとスタックフレームごと解放されるため、手動管理は不要です。
          スタックのサイズは通常数MBに制限されています。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void showStack() {
    int a = 10;
    int b = 20;
    int c = 30;
    cout << "a のアドレス: " << &a << endl;
    cout << "b のアドレス: " << &b << endl;
    cout << "c のアドレス: " << &c << endl;
    cout << "スタック変数は連続したアドレスに配置" << endl;
}

int main() {
    cout << "=== スタックメモリ ===" << endl;
    showStack();
    cout << "関数終了 → スタック自動解放" << endl;
    return 0;
}`}
          expectedOutput={`=== スタックメモリ ===
a のアドレス: 0x7ffd...
b のアドレス: 0x7ffd...
c のアドレス: 0x7ffd...
スタック変数は連続したアドレスに配置
関数終了 → スタック自動解放`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ヒープメモリ</h2>
        <p className="text-gray-400 mb-4">
          ヒープはnew演算子で確保し、delete演算子で解放する動的メモリです。
          サイズの上限はシステムのメモリ量に依存し、スタックよりも大きなデータを扱えます。
          確保と解放の責任はプログラマにあります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== ヒープメモリ ===" << endl;

    // ヒープに整数を確保
    int* p = new int(42);
    cout << "値: " << *p << endl;
    cout << "アドレス: " << p << endl;
    delete p;

    // ヒープに配列を確保
    int size = 5;
    int* arr = new int[size];
    for (int i = 0; i < size; i++) {
        arr[i] = (i + 1) * 100;
    }

    cout << "配列: ";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    delete[] arr;
    cout << "ヒープメモリ解放完了" << endl;

    return 0;
}`}
          expectedOutput={`=== ヒープメモリ ===
値: 42
アドレス: 0x...
配列: 100 200 300 400 500
ヒープメモリ解放完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックとヒープの比較</h2>
        <p className="text-gray-400 mb-4">
          スタックは高速で自動管理ですがサイズに制限があります。ヒープは柔軟ですが遅く、メモリリークのリスクがあります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // スタック: 高速・自動管理・サイズ制限あり
    int stackArray[3] = {1, 2, 3};
    cout << "スタック配列: ";
    for (int i = 0; i < 3; i++) cout << stackArray[i] << " ";
    cout << endl;

    // ヒープ: 柔軟・手動管理・大きなデータ可
    int n = 3;
    int* heapArray = new int[n]{10, 20, 30};
    cout << "ヒープ配列: ";
    for (int i = 0; i < n; i++) cout << heapArray[i] << " ";
    cout << endl;

    delete[] heapArray;

    cout << "スタック: 自動解放, ヒープ: delete必須" << endl;
    return 0;
}`}
          expectedOutput={`スタック配列: 1 2 3
ヒープ配列: 10 20 30
スタック: 自動解放, ヒープ: delete必須`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="stack-heap" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-heap" basePath="/learn/memory" />
    </div>
  );
}
