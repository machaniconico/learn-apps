import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function CStringPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">C文字列</h1>
        <p className="text-gray-400">char配列によるC文字列とstd::stringの変換を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C文字列とは</h2>
        <p className="text-gray-300 leading-relaxed">
          C文字列はchar型の配列で、末尾にヌル文字（&apos;\0&apos;）を持ちます。C言語から継承された仕組みで、
          レガシーコードやOSのAPIとのやり取りでは今でも使われます。&lt;cstring&gt;ヘッダに操作関数が定義されています。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::stringとの相互変換</h2>
        <p className="text-gray-300 leading-relaxed">
          std::stringのc_str()メソッドでconst char*を取得し、逆にchar配列からstd::stringを構築できます。
          C APIを呼ぶ場合にはc_str()が必須です。モダンC++では基本的にstd::stringを使いましょう。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C文字列の基本操作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <cstring>
using namespace std;

int main() {
    // C文字列の宣言
    char s1[] = "Hello";            // 自動でサイズ決定（6バイト）
    char s2[20] = "World";          // バッファサイズ指定
    const char* s3 = "Literal";     // 文字列リテラルへのポインタ

    // 長さの取得
    cout << "strlen(s1): " << strlen(s1) << endl;
    cout << "sizeof(s1): " << sizeof(s1) << endl;  // ヌル文字含む

    // コピー
    char dest[20];
    strcpy(dest, s1);
    cout << "strcpy: " << dest << endl;

    // 結合
    strcat(dest, " ");
    strcat(dest, s2);
    cout << "strcat: " << dest << endl;

    // 比較
    cout << "strcmp: " << strcmp("abc", "abd") << endl;

    return 0;
}`}
          expectedOutput={`strlen(s1): 5
sizeof(s1): 6
strcpy: Hello
strcat: Hello World
strcmp: -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::stringとの変換</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <cstring>
using namespace std;

int main() {
    // C文字列 → std::string
    const char* cstr = "Hello from C";
    string s1(cstr);
    string s2 = cstr;  // 暗黙変換
    cout << "C→string: " << s1 << endl;

    // std::string → C文字列
    string cpp_str = "Hello from C++";
    const char* p = cpp_str.c_str();
    cout << "string→C: " << p << endl;

    // data()も使える（C++17以降は非constも可）
    cout << "data(): " << cpp_str.data() << endl;

    // バッファへのコピー
    char buffer[50];
    strcpy(buffer, cpp_str.c_str());
    cout << "buffer: " << buffer << endl;

    // 部分コピー（copy メソッド）
    char partial[10];
    size_t len = cpp_str.copy(partial, 5, 0);
    partial[len] = '\\0';
    cout << "partial: " << partial << endl;

    return 0;
}`}
          expectedOutput={`C→string: Hello from C
string→C: Hello from C++
data(): Hello from C++
buffer: Hello from C++
partial: Hello`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="c-string" />
      </div>
      <LessonNav lessons={lessons} currentId="c-string" basePath="/learn/strings" />
    </div>
  );
}
