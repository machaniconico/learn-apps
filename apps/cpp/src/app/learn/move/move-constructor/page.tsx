import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("move");

export default function MoveConstructorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ムーブセマンティクス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ムーブコンストラクタ</h1>
        <p className="text-gray-400">ムーブコンストラクタの定義と動作を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コピーとムーブの違い</h2>
        <p className="text-gray-400 mb-4">
          コピーコンストラクタはデータを複製しますが、ムーブコンストラクタはリソースの所有権を移転します。
          大きなデータを扱う場合、ムーブはコピーより圧倒的に効率的です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <cstring>
using namespace std;

class MyString {
    char* data;
    int len;
public:
    MyString(const char* s) {
        len = strlen(s);
        data = new char[len + 1];
        strcpy(data, s);
        cout << "構築: \"" << data << "\"" << endl;
    }

    // コピーコンストラクタ
    MyString(const MyString& other) {
        len = other.len;
        data = new char[len + 1];
        strcpy(data, other.data);
        cout << "コピー: \"" << data << "\"" << endl;
    }

    // ムーブコンストラクタ
    MyString(MyString&& other) noexcept {
        data = other.data;
        len = other.len;
        other.data = nullptr;
        other.len = 0;
        cout << "ムーブ: \"" << data << "\"" << endl;
    }

    ~MyString() {
        if (data) cout << "破棄: \"" << data << "\"" << endl;
        else cout << "破棄: (空)" << endl;
        delete[] data;
    }

    void print() const {
        cout << (data ? data : "(空)") << endl;
    }
};

int main() {
    MyString s1("Hello");
    MyString s2 = s1;              // コピー
    MyString s3 = std::move(s1);   // ムーブ

    cout << "s1: "; s1.print();
    cout << "s2: "; s2.print();
    cout << "s3: "; s3.print();

    return 0;
}`}
          expectedOutput={`構築: "Hello"
コピー: "Hello"
ムーブ: "Hello"
s1: (空)
s2: Hello
s3: Hello
破棄: "Hello"
破棄: "Hello"
破棄: (空)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ムーブコンストラクタの実装パターン</h2>
        <p className="text-gray-400 mb-4">
          ムーブコンストラクタでは、ソースオブジェクトのリソースを「盗み」、
          ソースを有効だが未規定の状態（通常はnullやゼロ）に設定します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <utility>
using namespace std;

class DynamicArray {
    int* data;
    int size;
public:
    DynamicArray(int n) : data(new int[n]), size(n) {
        for (int i = 0; i < n; i++) data[i] = i * 10;
        cout << "配列作成: " << size << "要素" << endl;
    }

    // ムーブコンストラクタ
    DynamicArray(DynamicArray&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;  // ソースを無効化
        other.size = 0;
        cout << "配列ムーブ: " << size << "要素" << endl;
    }

    ~DynamicArray() {
        delete[] data;
    }

    void print() const {
        if (!data) { cout << "(空)" << endl; return; }
        for (int i = 0; i < size; i++) cout << data[i] << " ";
        cout << endl;
    }

    int getSize() const { return size; }
};

int main() {
    DynamicArray a(5);
    cout << "a: "; a.print();

    DynamicArray b = std::move(a);
    cout << "ムーブ後:" << endl;
    cout << "a: "; a.print();
    cout << "b: "; b.print();
    cout << "aサイズ: " << a.getSize() << ", bサイズ: " << b.getSize() << endl;

    return 0;
}`}
          expectedOutput={`配列作成: 5要素
a: 0 10 20 30 40
配列ムーブ: 5要素
ムーブ後:
a: (空)
b: 0 10 20 30 40
aサイズ: 0, bサイズ: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="move" lessonId="move-constructor" />
      </div>
      <LessonNav lessons={lessons} currentId="move-constructor" basePath="/learn/move" />
    </div>
  );
}
