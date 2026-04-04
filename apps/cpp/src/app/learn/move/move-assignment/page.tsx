import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("move");

export default function MoveAssignmentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ムーブセマンティクス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ムーブ代入</h1>
        <p className="text-gray-400">ムーブ代入演算子の実装方法と注意点を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ムーブ代入演算子</h2>
        <p className="text-gray-400 mb-4">
          ムーブ代入演算子は既存のオブジェクトに右辺値を代入する際に呼ばれます。
          自分自身のリソースを解放してから、ソースのリソースを引き取ります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <cstring>
using namespace std;

class Buffer {
    int* data;
    int size;
public:
    Buffer(int n) : data(new int[n]), size(n) {
        for (int i = 0; i < n; i++) data[i] = i;
        cout << "構築: " << size << "要素" << endl;
    }

    // ムーブ代入演算子
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data;       // 自分のリソース解放
            data = other.data;   // リソースを引き取る
            size = other.size;
            other.data = nullptr; // ソースを無効化
            other.size = 0;
            cout << "ムーブ代入: " << size << "要素" << endl;
        }
        return *this;
    }

    ~Buffer() { delete[] data; }

    void print() const {
        if (!data) { cout << "(空)" << endl; return; }
        for (int i = 0; i < size; i++) cout << data[i] << " ";
        cout << endl;
    }
};

int main() {
    Buffer a(3);
    Buffer b(5);

    cout << "a: "; a.print();
    cout << "b: "; b.print();

    a = std::move(b);  // ムーブ代入
    cout << "ムーブ代入後:" << endl;
    cout << "a: "; a.print();
    cout << "b: "; b.print();

    return 0;
}`}
          expectedOutput={`構築: 3要素
構築: 5要素
a: 0 1 2
b: 0 1 2 3 4
ムーブ代入: 5要素
ムーブ代入後:
a: 0 1 2 3 4
b: (空)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自己代入の防止</h2>
        <p className="text-gray-400 mb-4">
          ムーブ代入では自己代入チェック（this != &other）が重要です。
          自分自身にムーブ代入するとリソースが失われる可能性があります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class SafeBuffer {
    int* data;
    int size;
public:
    SafeBuffer(int n) : data(new int[n]), size(n) {
        for (int i = 0; i < n; i++) data[i] = (i + 1) * 10;
    }

    SafeBuffer& operator=(SafeBuffer&& other) noexcept {
        cout << "ムーブ代入呼出" << endl;
        if (this == &other) {
            cout << "  自己代入を検出 → スキップ" << endl;
            return *this;
        }
        delete[] data;
        data = other.data;
        size = other.size;
        other.data = nullptr;
        other.size = 0;
        cout << "  リソース移転完了" << endl;
        return *this;
    }

    ~SafeBuffer() { delete[] data; }

    void print() const {
        if (!data) { cout << "(空)" << endl; return; }
        for (int i = 0; i < size; i++) cout << data[i] << " ";
        cout << endl;
    }
};

int main() {
    SafeBuffer buf(3);
    cout << "buf: "; buf.print();

    buf = std::move(buf);  // 自己代入
    cout << "自己代入後: "; buf.print();

    SafeBuffer other(2);
    buf = std::move(other);  // 通常のムーブ代入
    cout << "通常ムーブ後: "; buf.print();

    return 0;
}`}
          expectedOutput={`buf: 10 20 30
ムーブ代入呼出
  自己代入を検出 → スキップ
自己代入後: 10 20 30
ムーブ代入呼出
  リソース移転完了
通常ムーブ後: 10 20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">swap イディオム</h2>
        <p className="text-gray-400 mb-4">
          copy-and-swapイディオムをムーブに応用すると、例外安全で簡潔なムーブ代入を実装できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <algorithm>
using namespace std;

class Container {
    int* data;
    int size;
public:
    Container(int n = 0) : data(n ? new int[n] : nullptr), size(n) {
        for (int i = 0; i < n; i++) data[i] = i;
    }

    Container(Container&& other) noexcept : data(nullptr), size(0) {
        swap(data, other.data);
        swap(size, other.size);
    }

    Container& operator=(Container&& other) noexcept {
        swap(data, other.data);
        swap(size, other.size);
        return *this;
        // otherのデストラクタが古いリソースを解放
    }

    ~Container() { delete[] data; }

    void print() const {
        cout << "[" << size << "要素] ";
        for (int i = 0; i < size; i++) cout << data[i] << " ";
        cout << endl;
    }
};

int main() {
    Container a(3);
    Container b(5);
    cout << "a: "; a.print();
    cout << "b: "; b.print();

    a = std::move(b);
    cout << "ムーブ後 a: "; a.print();

    return 0;
}`}
          expectedOutput={`a: [3要素] 0 1 2
b: [5要素] 0 1 2 3 4
ムーブ後 a: [5要素] 0 1 2 3 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="move" lessonId="move-assignment" />
      </div>
      <LessonNav lessons={lessons} currentId="move-assignment" basePath="/learn/move" />
    </div>
  );
}
