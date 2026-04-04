import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringViewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::string_view</h1>
        <p className="text-gray-400">文字列の非所有軽量参照であるstring_viewを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">string_viewとは</h2>
        <p className="text-gray-300 leading-relaxed">
          std::string_viewはC++17で導入された、文字列データへの非所有の読み取り専用ビューです。
          文字列のコピーを作らずに参照できるため、関数の引数として使うとパフォーマンスが向上します。
          ただし、参照先の文字列のライフタイムに注意が必要です。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">使いどころ</h2>
        <p className="text-gray-300 leading-relaxed">
          string_viewは主に関数の引数で文字列を受け取る場合に有用です。const string&amp;やconst char*の代わりに使うと、
          std::stringからもC文字列からも変換なしで受け取れます。ただし、戻り値やメンバ変数には通常std::stringを使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <string_view>
using namespace std;

// string_viewを引数に取る関数
void print_info(string_view sv) {
    cout << "内容: " << sv << endl;
    cout << "長さ: " << sv.length() << endl;
    cout << "先頭: " << sv.front() << endl;
    cout << "空か: " << (sv.empty() ? "Yes" : "No") << endl;
}

int main() {
    // 様々なソースからstring_viewを作成
    string str = "Hello, World!";
    const char* cstr = "C-string";
    string_view literal = "Literal";

    // どの文字列型からもコピーなしで受け取れる
    print_info(str);
    cout << "---" << endl;
    print_info(cstr);
    cout << "---" << endl;
    print_info(literal);

    return 0;
}`}
          expectedOutput={`内容: Hello, World!
長さ: 13
先頭: H
空か: No
---
内容: C-string
長さ: 8
先頭: C
空か: No
---
内容: Literal
長さ: 7
先頭: L
空か: No`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビューの操作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string_view>
using namespace std;

int main() {
    string_view sv = "Hello, World!";

    // 部分ビュー（コピーなし）
    string_view sub = sv.substr(0, 5);
    cout << "substr: " << sub << endl;

    // 先頭・末尾の除去
    string_view trimmed = sv;
    trimmed.remove_prefix(7);  // 先頭7文字を除去
    cout << "remove_prefix: " << trimmed << endl;

    trimmed = sv;
    trimmed.remove_suffix(1);  // 末尾1文字を除去
    cout << "remove_suffix: " << trimmed << endl;

    // 検索（stringと同じメソッド）
    size_t pos = sv.find("World");
    cout << "find: 位置" << pos << endl;

    // starts_with / ends_with (C++20)
    cout << "starts_with Hello: " << (sv.starts_with("Hello") ? "Yes" : "No") << endl;
    cout << "ends_with !: " << (sv.ends_with("!") ? "Yes" : "No") << endl;

    // 比較
    string_view a = "abc";
    string_view b = "abd";
    cout << "abc < abd: " << (a < b ? "Yes" : "No") << endl;

    return 0;
}`}
          expectedOutput={`substr: Hello
remove_prefix: World!
remove_suffix: Hello, World
find: 位置7
starts_with Hello: Yes
ends_with !: Yes
abc < abd: Yes`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-view" />
      </div>
      <LessonNav lessons={lessons} currentId="string-view" basePath="/learn/strings" />
    </div>
  );
}
