import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function FormatPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::format</h1>
        <p className="text-gray-400">C++20のフォーマット文字列機能を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::formatとは</h2>
        <p className="text-gray-300 leading-relaxed">
          std::formatはC++20で導入された型安全な文字列フォーマット機能です。Pythonのstr.formatに似た構文で、
          printfの便利さとcoutの型安全性を兼ね備えています。&lt;format&gt;ヘッダで提供されます。
          C++23ではstd::printも追加されています。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">書式指定</h2>
        <p className="text-gray-300 leading-relaxed">
          {`{}`}がプレースホルダーで、{`{:書式指定}`}で表示形式を制御します。
          幅の指定、アライメント、精度、進数変換など豊富な書式オプションがあります。
          番号付き{`{0}`}で引数の順序を指定することもできます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <format>
#include <string>
using namespace std;

int main() {
    // 基本的なフォーマット
    string s1 = format("Hello, {}!", "World");
    cout << s1 << endl;

    // 複数の引数
    string s2 = format("{} + {} = {}", 1, 2, 3);
    cout << s2 << endl;

    // 番号付きプレースホルダー
    string s3 = format("{1}は{0}です", "果物", "りんご");
    cout << s3 << endl;

    // 異なる型の混在
    string name = "太郎";
    int age = 25;
    double score = 95.5;
    string s4 = format("{}さん({}歳) 得点:{}", name, age, score);
    cout << s4 << endl;

    return 0;
}`}
          expectedOutput={`Hello, World!
1 + 2 = 3
りんごは果物です
太郎さん(25歳) 得点:95.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">書式指定オプション</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <format>
using namespace std;

int main() {
    // 幅とアライメント
    cout << format("|{:<10}|", "左寄せ") << endl;
    cout << format("|{:>10}|", "右寄せ") << endl;
    cout << format("|{:^10}|", "中央") << endl;
    cout << format("|{:*^10}|", "fill") << endl;

    // 数値の書式
    cout << format("整数: {:d}", 42) << endl;
    cout << format("16進: {:x}", 255) << endl;
    cout << format("16進(大): {:X}", 255) << endl;
    cout << format("8進: {:o}", 255) << endl;
    cout << format("2進: {:b}", 10) << endl;

    // 浮動小数点
    cout << format("固定: {:.2f}", 3.14159) << endl;
    cout << format("科学: {:.3e}", 12345.6789) << endl;

    // ゼロ埋め
    cout << format("ゼロ埋め: {:05d}", 42) << endl;

    // 符号表示
    cout << format("正: {:+d}", 42) << endl;
    cout << format("負: {:+d}", -42) << endl;

    return 0;
}`}
          expectedOutput={`|左寄せ    |
|    右寄せ|
|   中央   |
|***fill***|
整数: 42
16進: ff
16進(大): FF
8進: 377
2進: 1010
固定: 3.14
科学: 1.235e+04
ゼロ埋め: 00042
正: +42
負: -42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="format" />
      </div>
      <LessonNav lessons={lessons} currentId="format" basePath="/learn/strings" />
    </div>
  );
}
