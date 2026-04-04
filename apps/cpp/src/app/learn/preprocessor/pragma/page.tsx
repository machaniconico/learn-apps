import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function PragmaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">プリプロセッサ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">#pragma</h1>
        <p className="text-gray-400">#pragma onceとコンパイラ固有のプラグマを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">#pragmaとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#pragma</code> はコンパイラに対する
          特殊な指示を与えるディレクティブです。標準化されたものと、コンパイラ固有のものがあります。
          最もよく使われるのは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#pragma once</code> で、
          ヘッダの多重インクルードを防ぎます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#pragma onceとインクルードガード</h2>
        <p className="text-gray-400 mb-4">2つのインクルードガード手法を比較します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// === 方法1: 伝統的なインクルードガード ===
// #ifndef MY_HEADER_H
// #define MY_HEADER_H
// class MyClass { ... };
// #endif

// === 方法2: #pragma once ===
// #pragma once
// class MyClass { ... };

// 方法2はシンプルだがC++標準ではなくコンパイラ拡張
// ただし主要な全コンパイラ（GCC, Clang, MSVC）で対応

int main() {
    cout << "=== インクルードガードの比較 ===" << endl;
    cout << endl;
    cout << "伝統的な方法:" << endl;
    cout << "  #ifndef HEADER_H" << endl;
    cout << "  #define HEADER_H" << endl;
    cout << "  // 内容" << endl;
    cout << "  #endif" << endl;
    cout << endl;
    cout << "#pragma once:" << endl;
    cout << "  #pragma once" << endl;
    cout << "  // 内容" << endl;
    cout << endl;
    cout << "推奨: #pragma once（シンプルで安全）" << endl;
    return 0;
}`}
          expectedOutput={`=== インクルードガードの比較 ===

伝統的な方法:
  #ifndef HEADER_H
  #define HEADER_H
  // 内容
  #endif

#pragma once:
  #pragma once
  // 内容

推奨: #pragma once（シンプルで安全）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">その他の#pragmaディレクティブ</h2>
        <p className="text-gray-400 mb-4">コンパイラ固有の便利なプラグマの紹介です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// #pragma message: コンパイル時にメッセージを表示
#pragma message("このファイルをコンパイル中")

// #pragma warning: 警告の制御（MSVC）
// #pragma warning(disable: 4996)

// #pragma pack: 構造体のアライメント制御
#pragma pack(push, 1)
struct PackedData {
    char a;    // 1 byte
    int b;     // 4 bytes
    char c;    // 1 byte
};
#pragma pack(pop)

struct NormalData {
    char a;    // 1 byte + 3 padding
    int b;     // 4 bytes
    char c;    // 1 byte + 3 padding
};

int main() {
    cout << "PackedData サイズ: " << sizeof(PackedData) << " bytes" << endl;
    cout << "NormalData サイズ: " << sizeof(NormalData) << " bytes" << endl;
    cout << endl;
    cout << "PackedDataはパディングなし" << endl;
    cout << "NormalDataはアライメントのためパディングあり" << endl;
    return 0;
}`}
          expectedOutput={`PackedData サイズ: 6 bytes
NormalData サイズ: 12 bytes

PackedDataはパディングなし
NormalDataはアライメントのためパディングあり`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="pragma" />
      </div>
      <LessonNav lessons={lessons} currentId="pragma" basePath="/learn/preprocessor" />
    </div>
  );
}
