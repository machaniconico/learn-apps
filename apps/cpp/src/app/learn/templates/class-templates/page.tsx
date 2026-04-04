import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("templates");

export default function ClassTemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">テンプレート レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラステンプレート</h1>
        <p className="text-gray-400">テンプレートクラスの定義と使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クラステンプレートとは</h2>
        <p className="text-gray-300 leading-relaxed">
          クラステンプレートは、型パラメータを持つクラスの設計図です。STLの <code className="text-pink-400">vector&lt;T&gt;</code> や
          <code className="text-pink-400">map&lt;K, V&gt;</code> もクラステンプレートで実装されています。
          一つのクラス定義で異なる型のデータを扱えるようになります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なクラステンプレート</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

template <typename T>
class Stack {
    T data[100];
    int top;
public:
    Stack() : top(-1) {}

    void push(const T& val) {
        data[++top] = val;
    }

    T pop() {
        return data[top--];
    }

    T peek() const {
        return data[top];
    }

    bool empty() const {
        return top == -1;
    }
};

int main() {
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);
    cout << "top: " << intStack.peek() << endl;
    cout << "pop: " << intStack.pop() << endl;
    cout << "top: " << intStack.peek() << endl;

    Stack<string> strStack;
    strStack.push("Hello");
    strStack.push("World");
    cout << "top: " << strStack.peek() << endl;

    return 0;
}`}
          expectedOutput={`top: 30
pop: 30
top: 20
top: World`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の型パラメータを持つクラス</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

template <typename K, typename V>
class KeyValue {
    K key;
    V value;
public:
    KeyValue(const K& k, const V& v) : key(k), value(v) {}

    K getKey() const { return key; }
    V getValue() const { return value; }

    void print() const {
        cout << key << " => " << value << endl;
    }
};

// デフォルトテンプレート引数
template <typename T = int, int Size = 10>
class FixedArray {
    T data[Size];
    int count;
public:
    FixedArray() : count(0) {}
    void add(const T& val) { data[count++] = val; }
    int size() const { return count; }
    T get(int i) const { return data[i]; }
};

int main() {
    KeyValue<string, int> kv1("age", 25);
    KeyValue<int, string> kv2(1, "Alice");
    kv1.print();
    kv2.print();

    FixedArray<> arr; // デフォルト: int, 10
    arr.add(100);
    arr.add(200);
    cout << "size: " << arr.size() << endl;
    cout << "arr[0]: " << arr.get(0) << endl;

    return 0;
}`}
          expectedOutput={`age => 25
1 => Alice
size: 2
arr[0]: 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="templates" lessonId="class-templates" />
      </div>
      <LessonNav lessons={lessons} currentId="class-templates" basePath="/learn/templates" />
    </div>
  );
}
