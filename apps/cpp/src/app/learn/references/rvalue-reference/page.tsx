import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("references");

export default function RvalueReferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">参照 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">右辺値参照</h1>
        <p className="text-gray-400">&amp;&amp;を使った右辺値参照の基礎</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">左辺値と右辺値</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">左辺値（lvalue）</code>はアドレスを持つ式（変数など）、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">右辺値（rvalue）</code>はアドレスを持たない一時的な値（リテラル、関数の戻り値など）です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C++11で導入された <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">T&amp;&amp;</code>（右辺値参照）は一時オブジェクトをバインドし、
          そのリソースを「移動（ムーブ）」することで不要なコピーを回避します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">右辺値参照の基本</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    // 左辺値と右辺値
    int x = 10;        // x は左辺値、10 は右辺値
    int& lref = x;     // OK: 左辺値参照は左辺値をバインド
    // int& bad = 10;  // エラー: 左辺値参照は右辺値をバインドできない

    int&& rref = 20;          // OK: 右辺値参照は右辺値をバインド
    // int&& bad2 = x;        // エラー: 右辺値参照は左辺値をバインドできない
    int&& moved = std::move(x); // OK: moveで左辺値を右辺値に変換

    cout << "lref = " << lref << endl;
    cout << "rref = " << rref << endl;

    // 右辺値参照は変更可能
    rref = 99;
    cout << "rref変更後 = " << rref << endl;

    // 文字列の例
    string&& temp = string("Hello") + " World";
    cout << "temp = " << temp << endl;

    return 0;
}`}
          expectedOutput={`lref = 10
rref = 20
rref変更後 = 99
temp = Hello World`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ムーブセマンティクス</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

class Buffer {
    string data;
public:
    Buffer(const string& s) : data(s) {
        cout << "構築: " << data << endl;
    }

    // コピーコンストラクタ
    Buffer(const Buffer& other) : data(other.data) {
        cout << "コピー: " << data << endl;
    }

    // ムーブコンストラクタ
    Buffer(Buffer&& other) noexcept : data(std::move(other.data)) {
        cout << "ムーブ: " << data << endl;
    }

    void print() const {
        cout << "data = \"" << data << "\"" << endl;
    }
};

int main() {
    Buffer b1("Hello");
    b1.print();

    cout << "--- コピー ---" << endl;
    Buffer b2 = b1;  // コピー
    b2.print();
    b1.print();       // b1 は変わらない

    cout << "--- ムーブ ---" << endl;
    Buffer b3 = std::move(b1);  // ムーブ
    b3.print();
    b1.print();       // b1 は空になる（moved-from状態）

    return 0;
}`}
          expectedOutput={`構築: Hello
data = "Hello"
--- コピー ---
コピー: Hello
data = "Hello"
data = "Hello"
--- ムーブ ---
ムーブ: Hello
data = "Hello"
data = ""`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="references" lessonId="rvalue-reference" />
      </div>
      <LessonNav lessons={lessons} currentId="rvalue-reference" basePath="/learn/references" />
    </div>
  );
}
