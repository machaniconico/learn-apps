import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("move");

export default function RuleOfFivePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ムーブセマンティクス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">5の規則</h1>
        <p className="text-gray-400">コピー・ムーブ・デストラクタの5つの特殊関数の関係を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">5の規則とは</h2>
        <p className="text-gray-400 mb-4">
          5の規則（Rule of Five）は、以下の5つの特殊メンバ関数のうち1つを定義したら、
          残りの4つも定義すべきという原則です：
          デストラクタ、コピーコンストラクタ、コピー代入演算子、ムーブコンストラクタ、ムーブ代入演算子。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <cstring>
using namespace std;

class String {
    char* data;
    int len;
public:
    // 1. コンストラクタ
    String(const char* s = "") {
        len = strlen(s);
        data = new char[len + 1];
        strcpy(data, s);
    }

    // 2. デストラクタ
    ~String() { delete[] data; }

    // 3. コピーコンストラクタ
    String(const String& other) {
        len = other.len;
        data = new char[len + 1];
        strcpy(data, other.data);
        cout << "コピー構築" << endl;
    }

    // 4. コピー代入演算子
    String& operator=(const String& other) {
        if (this != &other) {
            delete[] data;
            len = other.len;
            data = new char[len + 1];
            strcpy(data, other.data);
            cout << "コピー代入" << endl;
        }
        return *this;
    }

    // 5. ムーブコンストラクタ
    String(String&& other) noexcept : data(other.data), len(other.len) {
        other.data = nullptr;
        other.len = 0;
        cout << "ムーブ構築" << endl;
    }

    // 6. ムーブ代入演算子
    String& operator=(String&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            len = other.len;
            other.data = nullptr;
            other.len = 0;
            cout << "ムーブ代入" << endl;
        }
        return *this;
    }

    void print() const { cout << (data ? data : "(null)") << endl; }
};

int main() {
    String s1("Hello");
    String s2 = s1;              // コピー構築
    String s3 = std::move(s1);   // ムーブ構築

    String s4("World");
    s4 = s2;                     // コピー代入
    s4 = std::move(s3);          // ムーブ代入

    cout << "s4: "; s4.print();
    return 0;
}`}
          expectedOutput={`コピー構築
ムーブ構築
コピー代入
ムーブ代入
s4: Hello`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">0の規則</h2>
        <p className="text-gray-400 mb-4">
          0の規則（Rule of Zero）は、可能であれば特殊メンバ関数を1つも定義しないのが理想という原則です。
          スマートポインタやSTLコンテナを使えば、コンパイラが生成するデフォルトで十分です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
#include <memory>
using namespace std;

// 0の規則: 特殊関数を一切定義しない
class Person {
    string name;
    int age;
    vector<string> hobbies;
public:
    Person(const string& n, int a, vector<string> h)
        : name(n), age(a), hobbies(std::move(h)) {}

    void print() const {
        cout << name << " (" << age << "歳) - ";
        for (const auto& h : hobbies) cout << h << " ";
        cout << endl;
    }
};

int main() {
    Person p1("太郎", 25, {"読書", "旅行"});
    p1.print();

    Person p2 = p1;  // コピー（コンパイラ生成）
    p2.print();

    Person p3 = std::move(p1);  // ムーブ（コンパイラ生成）
    p3.print();

    cout << "0の規則: 特殊関数の定義不要！" << endl;
    return 0;
}`}
          expectedOutput={`太郎 (25歳) - 読書 旅行
太郎 (25歳) - 読書 旅行
太郎 (25歳) - 読書 旅行
0の規則: 特殊関数の定義不要！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">default と delete</h2>
        <p className="text-gray-400 mb-4">
          = default で明示的にデフォルト実装を要求し、= delete で関数の使用を禁止できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class MoveOnly {
    int value;
public:
    MoveOnly(int v) : value(v) {}

    // コピー禁止
    MoveOnly(const MoveOnly&) = delete;
    MoveOnly& operator=(const MoveOnly&) = delete;

    // ムーブは許可
    MoveOnly(MoveOnly&& other) noexcept : value(other.value) {
        other.value = 0;
    }
    MoveOnly& operator=(MoveOnly&& other) noexcept {
        value = other.value;
        other.value = 0;
        return *this;
    }

    ~MoveOnly() = default;

    int get() const { return value; }
};

int main() {
    MoveOnly a(42);
    // MoveOnly b = a;  // コンパイルエラー（コピー禁止）
    MoveOnly b = std::move(a);  // ムーブはOK

    cout << "a: " << a.get() << " (ムーブ済み)" << endl;
    cout << "b: " << b.get() << endl;

    return 0;
}`}
          expectedOutput={`a: 0 (ムーブ済み)
b: 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="move" lessonId="rule-of-five" />
      </div>
      <LessonNav lessons={lessons} currentId="rule-of-five" basePath="/learn/move" />
    </div>
  );
}
