import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function PragmaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プリプロセッサ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">#pragma</h1>
        <p className="text-gray-400">#pragma once・#pragma pack・コンパイラ固有指示を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">#pragma とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#pragma</code> はコンパイラ固有の動作を制御するディレクティブです。
          標準では動作が規定されておらず、コンパイラごとに異なりますが、いくつかは広くサポートされています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#pragma once</code>: ヘッダの二重インクルード防止（GCC/Clang/MSVC対応）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#pragma pack(n)</code>: 構造体のアライメントを制御</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#pragma warning</code>: 警告の制御（MSVC）</li>
          <li>不明な pragma はコンパイラが無視する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#pragma once</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#pragma once</code> はインクルードガードの代替として使えます。シンプルで書きやすいのが利点です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// #pragma once の効果をシミュレート
// 実際のヘッダファイルの先頭に書く:
//
// #pragma once
// 
// void myFunc(void);
// ...
//
// これで二重インクルードが防止される

// インクルードガードとの比較:
// #pragma once    ← シンプル
//
// #ifndef MY_H    ← 従来方式
// #define MY_H   ← ファイル名に合わせた名前が必要
// ...
// #endif

int main() {
    printf("#pragma once はインクルードガードの代替\\n");
    printf("ヘッダファイルの先頭に書くだけ\\n");
    printf("GCC/Clang/MSVCで広くサポート\\n");
    return 0;
}`}
          expectedOutput={`#pragma once はインクルードガードの代替
ヘッダファイルの先頭に書くだけ
GCC/Clang/MSVCで広くサポート`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#pragma pack</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#pragma pack</code> で構造体のアライメント（パディング）を制御できます。バイナリプロトコルやネットワーク構造体の定義に使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 通常の構造体（アライメントあり）
struct Normal {
    char a;   // 1 byte
    int  b;   // 4 bytes
    char c;   // 1 byte
};

// パック構造体（パディングなし）
#pragma pack(1)
struct Packed {
    char a;   // 1 byte
    int  b;   // 4 bytes
    char c;   // 1 byte
};
#pragma pack()  // デフォルトに戻す

int main() {
    printf("Normal: %zu bytes\\n", sizeof(struct Normal));
    printf("Packed: %zu bytes\\n", sizeof(struct Packed));

    struct Packed p = {'A', 12345, 'Z'};
    printf("a=%c, b=%d, c=%c\\n", p.a, p.b, p.c);

    return 0;
}`}
          expectedOutput={`Normal: 12 bytes
Packed: 6 bytes
a=A, b=12345, c=Z`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="pragma" />
      </div>
      <LessonNav lessons={lessons} currentId="pragma" basePath="/learn/preprocessor" />
    </div>
  );
}
