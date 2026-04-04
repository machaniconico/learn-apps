import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function AlignmentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">メモリ管理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アライメント</h1>
        <p className="text-gray-400">メモリアライメントの概念とalignof・alignasの使い方を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アライメントとは</h2>
        <p className="text-gray-400 mb-4">
          アライメントはデータがメモリ上のどの位置に配置されるかの制約です。
          CPUは特定のアライメントでデータにアクセスする方が効率的です。
          alignof演算子でアライメント要件を確認できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== 基本型のアライメント ===" << endl;
    cout << "char:   " << alignof(char)   << " バイト" << endl;
    cout << "short:  " << alignof(short)  << " バイト" << endl;
    cout << "int:    " << alignof(int)    << " バイト" << endl;
    cout << "double: " << alignof(double) << " バイト" << endl;
    cout << "long long: " << alignof(long long) << " バイト" << endl;

    return 0;
}`}
          expectedOutput={`=== 基本型のアライメント ===
char:   1 バイト
short:  2 バイト
int:    4 バイト
double: 8 バイト
long long: 8 バイト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のパディング</h2>
        <p className="text-gray-400 mb-4">
          構造体のメンバはアライメント要件を満たすためにパディング（隙間）が挿入されることがあります。
          メンバの並び順でサイズが変わります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

struct BadOrder {
    char a;    // 1バイト + 7バイトパディング
    double b;  // 8バイト
    char c;    // 1バイト + 7バイトパディング
};

struct GoodOrder {
    double b;  // 8バイト
    char a;    // 1バイト
    char c;    // 1バイト + 6バイトパディング
};

int main() {
    cout << "BadOrder  サイズ: " << sizeof(BadOrder)  << " バイト" << endl;
    cout << "GoodOrder サイズ: " << sizeof(GoodOrder) << " バイト" << endl;
    cout << "並び順でサイズが変わる！" << endl;

    return 0;
}`}
          expectedOutput={`BadOrder  サイズ: 24 バイト
GoodOrder サイズ: 16 バイト
並び順でサイズが変わる！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">alignasによるアライメント指定</h2>
        <p className="text-gray-400 mb-4">
          alignas指定子でカスタムのアライメント要件を指定できます。
          SIMD命令やキャッシュライン最適化に活用します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

struct alignas(16) AlignedData {
    float x, y, z, w;
};

struct NormalData {
    float x, y, z, w;
};

int main() {
    cout << "AlignedData アライメント: " << alignof(AlignedData) << endl;
    cout << "AlignedData サイズ: " << sizeof(AlignedData) << endl;
    cout << "NormalData アライメント: " << alignof(NormalData) << endl;
    cout << "NormalData サイズ: " << sizeof(NormalData) << endl;

    // alignas変数
    alignas(32) int arr[4] = {1, 2, 3, 4};
    cout << "arr アドレス: " << arr << endl;
    cout << "32バイト境界に整列" << endl;

    return 0;
}`}
          expectedOutput={`AlignedData アライメント: 16
AlignedData サイズ: 16
NormalData アライメント: 4
NormalData サイズ: 16
arr アドレス: 0x...
32バイト境界に整列`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="alignment" />
      </div>
      <LessonNav lessons={lessons} currentId="alignment" basePath="/learn/memory" />
    </div>
  );
}
