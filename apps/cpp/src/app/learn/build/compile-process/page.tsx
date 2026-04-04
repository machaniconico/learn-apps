import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function CompileProcessPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンパイル・ビルド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンパイルプロセス</h1>
        <p className="text-gray-400">前処理・コンパイル・アセンブル・リンクの流れを理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">4つの段階</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++のビルドは4つの段階で進みます。
          <strong>前処理</strong>（#includeの展開・マクロ置換）、
          <strong>コンパイル</strong>（C++からアセンブリコード生成）、
          <strong>アセンブル</strong>（オブジェクトファイル.o生成）、
          <strong>リンク</strong>（実行ファイル生成）です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各段階の確認</h2>
        <p className="text-gray-400 mb-4">各ビルド段階で何が起きるかを確認しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 前処理段階: #includeが展開される
// g++ -E main.cpp -o main.i

// コンパイル段階: アセンブリコードを生成
// g++ -S main.cpp -o main.s

// アセンブル段階: オブジェクトファイルを生成
// g++ -c main.cpp -o main.o

// リンク段階: 実行ファイルを生成
// g++ main.o -o main

#define STAGE1 "前処理 (Preprocessing)"
#define STAGE2 "コンパイル (Compilation)"
#define STAGE3 "アセンブル (Assembly)"
#define STAGE4 "リンク (Linking)"

int main() {
    cout << "=== C++コンパイルの4段階 ===" << endl;
    cout << endl;
    cout << "1. " << STAGE1 << endl;
    cout << "   入力: .cpp → 出力: .i (展開済みソース)" << endl;
    cout << "   コマンド: g++ -E main.cpp" << endl;
    cout << endl;
    cout << "2. " << STAGE2 << endl;
    cout << "   入力: .i → 出力: .s (アセンブリ)" << endl;
    cout << "   コマンド: g++ -S main.cpp" << endl;
    cout << endl;
    cout << "3. " << STAGE3 << endl;
    cout << "   入力: .s → 出力: .o (オブジェクト)" << endl;
    cout << "   コマンド: g++ -c main.cpp" << endl;
    cout << endl;
    cout << "4. " << STAGE4 << endl;
    cout << "   入力: .o → 出力: 実行ファイル" << endl;
    cout << "   コマンド: g++ main.o -o main" << endl;
    return 0;
}`}
          expectedOutput={`=== C++コンパイルの4段階 ===

1. 前処理 (Preprocessing)
   入力: .cpp → 出力: .i (展開済みソース)
   コマンド: g++ -E main.cpp

2. コンパイル (Compilation)
   入力: .i → 出力: .s (アセンブリ)
   コマンド: g++ -S main.cpp

3. アセンブル (Assembly)
   入力: .s → 出力: .o (オブジェクト)
   コマンド: g++ -c main.cpp

4. リンク (Linking)
   入力: .o → 出力: 実行ファイル
   コマンド: g++ main.o -o main`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパイルオプション</h2>
        <p className="text-gray-400 mb-4">よく使うg++のコンパイルオプションを紹介します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== よく使うコンパイルオプション ===" << endl;
    cout << endl;
    cout << "-std=c++17    : C++17標準を使用" << endl;
    cout << "-std=c++20    : C++20標準を使用" << endl;
    cout << "-Wall         : 主要な警告を有効化" << endl;
    cout << "-Wextra       : 追加の警告を有効化" << endl;
    cout << "-Werror       : 警告をエラーとして扱う" << endl;
    cout << "-O0           : 最適化なし（デバッグ用）" << endl;
    cout << "-O2           : 標準的な最適化" << endl;
    cout << "-O3           : 最大限の最適化" << endl;
    cout << "-g            : デバッグ情報を含める" << endl;
    cout << "-I<dir>       : インクルードパスの追加" << endl;
    cout << "-L<dir>       : ライブラリパスの追加" << endl;
    cout << "-l<lib>       : ライブラリのリンク" << endl;
    cout << endl;
    cout << "推奨: g++ -std=c++17 -Wall -Wextra -O2 main.cpp -o main" << endl;
    return 0;
}`}
          expectedOutput={`=== よく使うコンパイルオプション ===

-std=c++17    : C++17標準を使用
-std=c++20    : C++20標準を使用
-Wall         : 主要な警告を有効化
-Wextra       : 追加の警告を有効化
-Werror       : 警告をエラーとして扱う
-O0           : 最適化なし（デバッグ用）
-O2           : 標準的な最適化
-O3           : 最大限の最適化
-g            : デバッグ情報を含める
-I<dir>       : インクルードパスの追加
-L<dir>       : ライブラリパスの追加
-l<lib>       : ライブラリのリンク

推奨: g++ -std=c++17 -Wall -Wextra -O2 main.cpp -o main`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="compile-process" />
      </div>
      <LessonNav lessons={lessons} currentId="compile-process" basePath="/learn/build" />
    </div>
  );
}
