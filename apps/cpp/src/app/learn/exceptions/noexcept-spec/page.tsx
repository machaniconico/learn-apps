import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function NoexceptSpecPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">noexcept指定</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        noexcept指定は関数が例外を投げないことを宣言します。コンパイラの最適化に役立ち、
        特にムーブコンストラクタやデストラクタでの使用が重要です。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">noexceptの基本</h2>
        <p className="text-gray-400 mb-4">
          関数にnoexceptを付けると例外を投げないことを宣言します。noexcept演算子で確認もできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// noexcept指定: 例外を投げない
int add(int a, int b) noexcept {
    return a + b;
}

// 条件付きnoexcept
template<typename T>
T multiply(T a, T b) noexcept(noexcept(a * b)) {
    return a * b;
}

// 例外を投げる可能性がある
int divide(int a, int b) {
    if (b == 0) throw "ゼロ除算";
    return a / b;
}

int main() {
    // noexcept演算子で確認
    cout << "add: " << boolalpha << noexcept(add(1, 2)) << endl;
    cout << "divide: " << boolalpha << noexcept(divide(1, 2)) << endl;
    cout << "multiply<int>: " << boolalpha << noexcept(multiply(1, 2)) << endl;

    cout << "add(3,4) = " << add(3, 4) << endl;
    return 0;
}`}
          expectedOutput={`add: true
divide: false
multiply<int>: true
add(3,4) = 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ムーブ操作とnoexcept</h2>
        <p className="text-gray-400 mb-4">
          vectorのリサイズ時、ムーブコンストラクタがnoexceptでないとコピーが使われます。
          パフォーマンスのためにムーブ操作にはnoexceptを付けましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Widget {
    string name;
public:
    Widget(const string& n) : name(n) {}

    // noexceptムーブコンストラクタ
    Widget(Widget&& other) noexcept : name(move(other.name)) {
        cout << "ムーブ: " << name << endl;
    }

    Widget(const Widget& other) : name(other.name) {
        cout << "コピー: " << name << endl;
    }

    Widget& operator=(Widget&&) noexcept = default;
    Widget& operator=(const Widget&) = default;
};

int main() {
    vector<Widget> v;
    v.reserve(2);  // 最初は2要素分

    v.emplace_back("A");
    v.emplace_back("B");

    cout << "--- リサイズ発生 ---" << endl;
    v.emplace_back("C");  // noexceptならムーブが使われる

    return 0;
}`}
          expectedOutput={`--- リサイズ発生 ---
ムーブ: A
ムーブ: B`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">noexceptのベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          デストラクタ、ムーブ操作、swap関数にはnoexceptを付けるのがベストプラクティスです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <utility>
using namespace std;

class SafeResource {
    string data;
    int id;
public:
    SafeResource(int i, const string& d) : data(d), id(i) {}

    // デストラクタは暗黙的にnoexcept
    ~SafeResource() = default;

    // ムーブコンストラクタ: noexcept
    SafeResource(SafeResource&& other) noexcept
        : data(move(other.data)), id(other.id) {
        other.id = 0;
    }

    // ムーブ代入: noexcept
    SafeResource& operator=(SafeResource&& other) noexcept {
        data = move(other.data);
        id = other.id;
        other.id = 0;
        return *this;
    }

    // swap: noexcept
    friend void swap(SafeResource& a, SafeResource& b) noexcept {
        using std::swap;
        swap(a.data, b.data);
        swap(a.id, b.id);
    }

    void print() const { cout << "id=" << id << " data=" << data << endl; }
};

int main() {
    SafeResource a(1, "Alpha");
    SafeResource b(2, "Beta");
    a.print();
    b.print();

    swap(a, b);
    cout << "--- swap後 ---" << endl;
    a.print();
    b.print();

    return 0;
}`}
          expectedOutput={`id=1 data=Alpha
id=2 data=Beta
--- swap後 ---
id=2 data=Beta
id=1 data=Alpha`}
        />
      </section>

      <LessonCompleteButton categoryId="exceptions" lessonId="noexcept-spec" />
      <LessonNav lessons={lessons} currentId="noexcept-spec" basePath="/learn/exceptions" />
    </div>
  );
}
