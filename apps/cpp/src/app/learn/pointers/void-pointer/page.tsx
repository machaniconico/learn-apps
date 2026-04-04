import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function VoidPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">voidポインタ</h1>
        <p className="text-gray-400">型を持たない汎用ポインタの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">void*とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">void*</code> は「型情報を持たない」汎用ポインタです。
          どんな型のポインタからも暗黙変換で代入でき、アドレスだけを保持します。
          使用時は適切な型にキャストする必要があります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C++ではテンプレートが使えるため void* の必要性は少ないですが、
          C言語のライブラリとの連携や低レベルなメモリ操作で使われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">void*の基本</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void printValue(void* ptr, char type) {
    switch (type) {
        case 'i':
            cout << "int: " << *static_cast<int*>(ptr) << endl;
            break;
        case 'd':
            cout << "double: " << *static_cast<double*>(ptr) << endl;
            break;
        case 'c':
            cout << "char: " << *static_cast<char*>(ptr) << endl;
            break;
    }
}

int main() {
    int i = 42;
    double d = 3.14;
    char c = 'A';

    // どの型のアドレスも void* に代入できる
    void* ptr;

    ptr = &i;
    printValue(ptr, 'i');

    ptr = &d;
    printValue(ptr, 'd');

    ptr = &c;
    printValue(ptr, 'c');

    return 0;
}`}
          expectedOutput={`int: 42
double: 3.14
char: A`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">void*の制限とキャスト</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <cstring>
using namespace std;

// memcpy風のバイトコピー関数
void copyBytes(void* dest, const void* src, size_t n) {
    char* d = static_cast<char*>(dest);
    const char* s = static_cast<const char*>(src);
    for (size_t i = 0; i < n; i++) {
        d[i] = s[i];
    }
}

int main() {
    // void* は直接デリファレンスできない
    int x = 12345;
    void* vp = &x;
    // *vp = 100;  // コンパイルエラー！
    // vp++;        // コンパイルエラー！（サイズ不明で演算不可）

    // キャストして使う
    int* ip = static_cast<int*>(vp);
    cout << "*ip = " << *ip << endl;

    // バイト単位のコピー
    int src[] = {10, 20, 30};
    int dest[3] = {};
    copyBytes(dest, src, sizeof(src));

    cout << "コピー結果: ";
    for (int v : dest) cout << v << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`*ip = 12345
コピー結果: 10 20 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="void-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="void-pointer" basePath="/learn/pointers" />
    </div>
  );
}
