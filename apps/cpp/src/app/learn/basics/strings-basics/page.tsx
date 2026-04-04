import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">std::stringの作成・結合・基本操作を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::string とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++で文字列を扱うには <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::string</code> クラスを使います。
          C言語の文字配列（<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">char[]</code>）よりも安全で使いやすいです。
          使うには <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#include &lt;string&gt;</code> が必要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成と結合</h2>
        <p className="text-gray-400 mb-4">文字列の宣言・初期化と、+ 演算子による結合を試しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // 文字列の作成
    std::string greeting = "こんにちは";
    std::string name = "太郎";

    // 文字列の結合
    std::string message = greeting + "、" + name + "さん！";
    std::cout << message << std::endl;

    // append で追加
    std::string text = "C++";
    text.append("は楽しい");
    std::cout << text << std::endl;

    // += で追加
    std::string result = "Hello";
    result += " World";
    std::cout << result << std::endl;

    return 0;
}`}
          expectedOutput={`こんにちは、太郎さん！
C++は楽しい
Hello World`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本操作</h2>
        <p className="text-gray-400 mb-4">文字列の長さ取得、文字のアクセス、部分文字列の取得などの操作です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    std::string str = "Hello, C++!";

    // 長さの取得
    std::cout << "長さ: " << str.length() << std::endl;
    std::cout << "サイズ: " << str.size() << std::endl;

    // 文字のアクセス
    std::cout << "先頭文字: " << str[0] << std::endl;
    std::cout << "安全なアクセス: " << str.at(7) << std::endl;

    // 部分文字列
    std::string sub = str.substr(7, 3);  // 位置7から3文字
    std::cout << "部分文字列: " << sub << std::endl;

    // 検索
    size_t pos = str.find("C++");
    std::cout << "C++の位置: " << pos << std::endl;

    // 空文字列チェック
    std::string empty = "";
    std::cout << "空?: " << std::boolalpha << empty.empty() << std::endl;

    return 0;
}`}
          expectedOutput={`長さ: 11
サイズ: 11
先頭文字: H
安全なアクセス: C
部分文字列: C++
C++の位置: 7
空?: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の比較と変換</h2>
        <p className="text-gray-400 mb-4">文字列の比較演算子や数値との変換を学びましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // 文字列の比較
    std::string a = "apple";
    std::string b = "banana";

    std::cout << std::boolalpha;
    std::cout << "(a == b): " << (a == b) << std::endl;
    std::cout << "(a < b):  " << (a < b) << std::endl;
    std::cout << "(a != b): " << (a != b) << std::endl;

    // 数値から文字列へ変換
    int num = 42;
    std::string numStr = std::to_string(num);
    std::cout << "数値→文字列: " << numStr << std::endl;

    // 文字列から数値へ変換
    std::string piStr = "3.14";
    double pi = std::stod(piStr);
    std::cout << "文字列→数値: " << pi << std::endl;

    return 0;
}`}
          expectedOutput={`(a == b): false
(a < b):  true
(a != b): true
数値→文字列: 42
文字列→数値: 3.14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
