import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function LinkingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンパイル・ビルド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リンク</h1>
        <p className="text-gray-400">静的リンクと動的リンクの仕組みを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リンクとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リンクはオブジェクトファイルとライブラリを結合して実行ファイルを作る工程です。
          <strong>静的リンク</strong>はライブラリのコードを実行ファイルに埋め込み、
          <strong>動的リンク</strong>は実行時に共有ライブラリを読み込みます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">静的リンクと動的リンクの比較</h2>
        <p className="text-gray-400 mb-4">両者の特徴と使い分けを理解しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== 静的リンク ===" << endl;
    cout << "拡張子: .a (Linux/Mac), .lib (Windows)" << endl;
    cout << "利点:" << endl;
    cout << "  - 単一の実行ファイルで配布が容易" << endl;
    cout << "  - 実行時にライブラリが不要" << endl;
    cout << "  - わずかに起動が速い" << endl;
    cout << "欠点:" << endl;
    cout << "  - 実行ファイルサイズが大きい" << endl;
    cout << "  - ライブラリ更新時に再ビルドが必要" << endl;
    cout << endl;

    cout << "=== 動的リンク ===" << endl;
    cout << "拡張子: .so (Linux), .dylib (Mac), .dll (Windows)" << endl;
    cout << "利点:" << endl;
    cout << "  - 実行ファイルサイズが小さい" << endl;
    cout << "  - ライブラリを複数プロセスで共有可能" << endl;
    cout << "  - ライブラリ更新が再ビルド不要" << endl;
    cout << "欠点:" << endl;
    cout << "  - 実行時にライブラリが必要" << endl;
    cout << "  - DLL地獄のリスク" << endl;

    return 0;
}`}
          expectedOutput={`=== 静的リンク ===
拡張子: .a (Linux/Mac), .lib (Windows)
利点:
  - 単一の実行ファイルで配布が容易
  - 実行時にライブラリが不要
  - わずかに起動が速い
欠点:
  - 実行ファイルサイズが大きい
  - ライブラリ更新時に再ビルドが必要

=== 動的リンク ===
拡張子: .so (Linux), .dylib (Mac), .dll (Windows)
利点:
  - 実行ファイルサイズが小さい
  - ライブラリを複数プロセスで共有可能
  - ライブラリ更新が再ビルド不要
欠点:
  - 実行時にライブラリが必要
  - DLL地獄のリスク`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リンクエラーの対処</h2>
        <p className="text-gray-400 mb-4">よくあるリンクエラーとその対処法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 宣言のみ（定義がない場合リンクエラーになる）
// void undefinedFunction();

// 正しく宣言と定義がある関数
void definedFunction() {
    cout << "この関数は正しく定義されています" << endl;
}

int main() {
    cout << "=== よくあるリンクエラー ===" << endl;
    cout << endl;

    cout << "1. undefined reference to 'xxx'" << endl;
    cout << "   原因: 関数の宣言はあるが定義がない" << endl;
    cout << "   対策: 実装を追加 or ライブラリをリンク" << endl;
    cout << endl;

    cout << "2. multiple definition of 'xxx'" << endl;
    cout << "   原因: 同じシンボルが複数の.oに存在" << endl;
    cout << "   対策: ヘッダにinline付与 or .cppに移動" << endl;
    cout << endl;

    cout << "3. cannot find -lxxx" << endl;
    cout << "   原因: リンクするライブラリが見つからない" << endl;
    cout << "   対策: -L でパスを指定 or インストール" << endl;
    cout << endl;

    definedFunction();

    return 0;
}`}
          expectedOutput={`=== よくあるリンクエラー ===

1. undefined reference to 'xxx'
   原因: 関数の宣言はあるが定義がない
   対策: 実装を追加 or ライブラリをリンク

2. multiple definition of 'xxx'
   原因: 同じシンボルが複数の.oに存在
   対策: ヘッダにinline付与 or .cppに移動

3. cannot find -lxxx
   原因: リンクするライブラリが見つからない
   対策: -L でパスを指定 or インストール

この関数は正しく定義されています`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="linking" />
      </div>
      <LessonNav lessons={lessons} currentId="linking" basePath="/learn/build" />
    </div>
  );
}
