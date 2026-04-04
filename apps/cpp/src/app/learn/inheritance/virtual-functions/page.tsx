import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function VirtualFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">仮想関数</h1>
        <p className="text-gray-400">virtualキーワードによるポリモーフィズムを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">仮想関数とは</h2>
        <p className="text-gray-300 leading-relaxed">
          仮想関数（virtual function）は、基底クラスのポインタや参照を通じて呼び出したとき、
          実行時に実際のオブジェクトの型に基づいて適切な関数が呼ばれる仕組みです。
          これをポリモーフィズム（多態性）と呼びます。virtualキーワードを付けて宣言します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">virtualの有無による違い</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Base {
public:
    // virtualなし: 静的束縛（コンパイル時に決定）
    void greet() { cout << "Base::greet()" << endl; }

    // virtualあり: 動的束縛（実行時に決定）
    virtual void hello() { cout << "Base::hello()" << endl; }

    virtual ~Base() = default;
};

class Derived : public Base {
public:
    void greet() { cout << "Derived::greet()" << endl; }
    void hello() override { cout << "Derived::hello()" << endl; }
};

int main() {
    Derived d;
    Base* ptr = &d;  // 基底クラスのポインタで派生クラスを指す

    // virtualなし: Base版が呼ばれる（静的束縛）
    ptr->greet();

    // virtualあり: Derived版が呼ばれる（動的束縛）
    ptr->hello();

    // 参照でも同じ
    Base& ref = d;
    ref.greet();  // Base版
    ref.hello();  // Derived版

    return 0;
}`}
          expectedOutput={`Base::greet()
Derived::hello()
Base::greet()
Derived::hello()`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">仮想デストラクタの重要性</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

class Base {
public:
    Base() { cout << "Base生成" << endl; }
    // 仮想デストラクタ: 派生クラスのデストラクタも正しく呼ばれる
    virtual ~Base() { cout << "Base破棄" << endl; }
};

class Derived : public Base {
    int* data;
public:
    Derived() : data(new int[100]) {
        cout << "Derived生成 (メモリ確保)" << endl;
    }
    ~Derived() override {
        delete[] data;
        cout << "Derived破棄 (メモリ解放)" << endl;
    }
};

int main() {
    cout << "=== unique_ptrで管理 ===" << endl;
    {
        unique_ptr<Base> ptr = make_unique<Derived>();
    } // 仮想デストラクタのおかげでDerivedのデストラクタも呼ばれる

    cout << "=== 正しく解放完了 ===" << endl;

    return 0;
}`}
          expectedOutput={`=== unique_ptrで管理 ===
Base生成
Derived生成 (メモリ確保)
Derived破棄 (メモリ解放)
Base破棄
=== 正しく解放完了 ===`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="virtual-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="virtual-functions" basePath="/learn/inheritance" />
    </div>
  );
}
