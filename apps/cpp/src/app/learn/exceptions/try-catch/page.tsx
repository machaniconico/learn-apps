import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function TryCatchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">try-catch</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        try-catch文はC++の例外処理の基本構文です。tryブロック内で発生した例外をcatchブロックで捕捉し、
        プログラムの異常終了を防ぎます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なtry-catch</h2>
        <p className="text-gray-400 mb-4">
          tryブロック内の例外がcatchブロックで型に応じて捕捉されます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
using namespace std;

int main() {
    // runtime_errorをキャッチ
    try {
        throw runtime_error("何かがおかしい");
    } catch (const runtime_error& e) {
        cout << "runtime_error: " << e.what() << endl;
    }

    // intをスロー・キャッチ
    try {
        throw 42;
    } catch (int code) {
        cout << "エラーコード: " << code << endl;
    }

    // 文字列をスロー・キャッチ
    try {
        throw "文字列例外";
    } catch (const char* msg) {
        cout << "メッセージ: " << msg << endl;
    }

    cout << "すべてキャッチしました" << endl;
    return 0;
}`}
          expectedOutput={`runtime_error: 何かがおかしい
エラーコード: 42
メッセージ: 文字列例外
すべてキャッチしました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のcatchブロック</h2>
        <p className="text-gray-400 mb-4">
          異なる型の例外を複数のcatchブロックで個別に処理できます。より具体的な型を先に書きます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
using namespace std;

void riskyFunction(int n) {
    if (n == 1) throw runtime_error("実行時エラー");
    if (n == 2) throw out_of_range("範囲外エラー");
    if (n == 3) throw logic_error("論理エラー");
}

int main() {
    for (int i = 1; i <= 3; i++) {
        try {
            riskyFunction(i);
        } catch (const out_of_range& e) {
            cout << "out_of_range: " << e.what() << endl;
        } catch (const runtime_error& e) {
            cout << "runtime_error: " << e.what() << endl;
        } catch (const exception& e) {
            cout << "exception: " << e.what() << endl;
        }
    }

    return 0;
}`}
          expectedOutput={`runtime_error: 実行時エラー
out_of_range: 範囲外エラー
exception: 論理エラー`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">catch(...)ですべてキャッチ</h2>
        <p className="text-gray-400 mb-4">
          catch(...)はどんな型の例外でもキャッチします。最後のフォールバックとして使います。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
using namespace std;

int main() {
    try {
        throw runtime_error("テスト");
    } catch (const exception& e) {
        cout << "exception: " << e.what() << endl;
    } catch (...) {
        cout << "不明な例外" << endl;
    }

    // 型が不明な例外
    try {
        throw 3.14;  // double
    } catch (const exception& e) {
        cout << "exception: " << e.what() << endl;
    } catch (...) {
        cout << "不明な例外をキャッチ" << endl;
    }

    return 0;
}`}
          expectedOutput={`exception: テスト
不明な例外をキャッチ`}
        />
      </section>

      <LessonCompleteButton categoryId="exceptions" lessonId="try-catch" />
      <LessonNav lessons={lessons} currentId="try-catch" basePath="/learn/exceptions" />
    </div>
  );
}
