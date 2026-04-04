import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StdStringPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::string</h1>
        <p className="text-gray-400">C++標準文字列の作成と基本操作を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::stringとは</h2>
        <p className="text-gray-300 leading-relaxed">
          std::stringはC++標準ライブラリで提供される文字列クラスです。C言語のchar配列と違い、
          メモリ管理を自動で行い、サイズの動的変更や豊富な操作メソッドを備えています。
          &lt;string&gt;ヘッダをインクルードして使用します。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成方法</h2>
        <p className="text-gray-300 leading-relaxed">
          std::stringはリテラル、他のstring、文字の繰り返し、部分文字列など様々な方法で初期化できます。
          コピーコンストラクタやムーブコンストラクタも定義されているため、安全に値のコピーや移動ができます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stringの作成と基本操作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    // 様々な初期化方法
    string s1 = "Hello";           // 文字列リテラルから
    string s2("World");            // コンストラクタで
    string s3(5, '*');             // 文字の繰り返し
    string s4 = s1;               // コピー

    cout << "s1: " << s1 << endl;
    cout << "s2: " << s2 << endl;
    cout << "s3: " << s3 << endl;
    cout << "s4: " << s4 << endl;

    // 基本プロパティ
    cout << "長さ: " << s1.length() << endl;
    cout << "空か: " << (s1.empty() ? "Yes" : "No") << endl;

    // 文字アクセス
    cout << "s1[0]: " << s1[0] << endl;
    cout << "s1.at(1): " << s1.at(1) << endl;
    cout << "先頭: " << s1.front() << endl;
    cout << "末尾: " << s1.back() << endl;

    return 0;
}`}
          expectedOutput={`s1: Hello
s2: World
s3: *****
s4: Hello
長さ: 5
空か: No
s1[0]: H
s1.at(1): e
先頭: H
末尾: o`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の結合と変更</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";

    // 結合
    s += ", ";
    s.append("World");
    s.push_back('!');
    cout << s << endl;

    // 挿入と削除
    s.insert(5, " Beautiful");
    cout << "挿入後: " << s << endl;

    s.erase(5, 10);  // 位置5から10文字削除
    cout << "削除後: " << s << endl;

    // 置換
    s.replace(7, 5, "C++");
    cout << "置換後: " << s << endl;

    // クリア
    string temp = "一時データ";
    temp.clear();
    cout << "クリア後の長さ: " << temp.length() << endl;

    return 0;
}`}
          expectedOutput={`Hello, World!
挿入後: Hello Beautiful, World!
削除後: Hello, World!
置換後: Hello, C++!
クリア後の長さ: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の比較とイテレーション</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string a = "apple";
    string b = "banana";

    // 比較演算子
    cout << "a == b: " << (a == b ? "true" : "false") << endl;
    cout << "a < b: " << (a < b ? "true" : "false") << endl;
    cout << "compare: " << a.compare(b) << endl;

    // 範囲forでイテレーション
    string word = "C++";
    cout << "文字: ";
    for (char c : word) {
        cout << "[" << c << "]";
    }
    cout << endl;

    // 大文字変換
    string text = "hello";
    for (char& c : text) {
        c = toupper(c);
    }
    cout << "大文字: " << text << endl;

    return 0;
}`}
          expectedOutput={`a == b: false
a < b: true
compare: -1
文字: [C][+][+]
大文字: HELLO`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="std-string" />
      </div>
      <LessonNav lessons={lessons} currentId="std-string" basePath="/learn/strings" />
    </div>
  );
}
