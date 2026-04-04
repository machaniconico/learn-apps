import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function MultipleInheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多重継承</h1>
        <p className="text-gray-400">複数クラスの同時継承とダイヤモンド問題を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">多重継承とは</h2>
        <p className="text-gray-300 leading-relaxed">
          C++では1つのクラスが複数の基底クラスを同時に継承できます。これを多重継承と呼びます。
          インターフェースの組み合わせに便利ですが、同名メンバの衝突やダイヤモンド問題といった
          複雑さを伴うため、慎重に設計する必要があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な多重継承</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Flyable {
public:
    void fly() const { cout << "空を飛ぶ" << endl; }
};

class Swimmable {
public:
    void swim() const { cout << "水を泳ぐ" << endl; }
};

class Walkable {
public:
    void walk() const { cout << "地を歩く" << endl; }
};

// 複数のクラスを継承
class Duck : public Flyable, public Swimmable, public Walkable {
    string name;
public:
    Duck(string n) : name(n) {}
    void introduce() const {
        cout << name << "は:" << endl;
    }
};

int main() {
    Duck d("アヒル");
    d.introduce();
    d.fly();
    d.swim();
    d.walk();

    return 0;
}`}
          expectedOutput={`アヒルは:
空を飛ぶ
水を泳ぐ
地を歩く`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">名前の衝突とダイヤモンド問題</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class A {
public:
    void hello() { cout << "A::hello" << endl; }
};

class B {
public:
    void hello() { cout << "B::hello" << endl; }
};

// AとBの両方にhelloがある → 衝突
class C : public A, public B {
public:
    // 明示的にどちらを呼ぶか指定する
    void helloA() { A::hello(); }
    void helloB() { B::hello(); }

    // または自分で定義してオーバーライド
    void hello() {
        cout << "C::hello (独自)" << endl;
    }
};

// ダイヤモンド問題の例
class Base {
public:
    int value = 42;
    void show() { cout << "Base::value = " << value << endl; }
};

class Left : public Base {};
class Right : public Base {};

// Baseが2つ存在してしまう！
class Diamond : public Left, public Right {};

int main() {
    C c;
    c.hello();    // C版
    c.helloA();   // A版
    c.helloB();   // B版

    cout << "---" << endl;

    Diamond d;
    // d.show();    // エラー: 曖昧
    // d.value;     // エラー: 曖昧
    d.Left::show();   // Left経由のBase
    d.Right::show();  // Right経由のBase

    return 0;
}`}
          expectedOutput={`C::hello (独自)
A::hello
B::hello
---
Base::value = 42
Base::value = 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="multiple-inheritance" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-inheritance" basePath="/learn/inheritance" />
    </div>
  );
}
