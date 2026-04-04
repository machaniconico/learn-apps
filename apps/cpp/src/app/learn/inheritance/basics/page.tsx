import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承の基本</h1>
        <p className="text-gray-400">基底クラスを引き継ぐ派生クラスの定義を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">継承とは</h2>
        <p className="text-gray-300 leading-relaxed">
          継承は既存のクラス（基底クラス）の機能を引き継いで新しいクラス（派生クラス）を作る仕組みです。
          コードの再利用を促進し、is-a関係を表現します。C++ではpublic、protected、private継承がありますが、
          最も一般的なのはpublic継承です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な継承</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// 基底クラス
class Animal {
protected:
    string name;
    int age;

public:
    Animal(string n, int a) : name(n), age(a) {}

    void eat() const {
        cout << name << "が食事中" << endl;
    }

    void info() const {
        cout << name << " (" << age << "歳)" << endl;
    }
};

// 派生クラス
class Dog : public Animal {
    string breed;

public:
    // 基底クラスのコンストラクタを呼ぶ
    Dog(string n, int a, string b) : Animal(n, a), breed(b) {}

    void bark() const {
        cout << name << "「ワンワン！」" << endl;
    }

    void fullInfo() const {
        info();  // 基底クラスのメソッドを呼べる
        cout << "犬種: " << breed << endl;
    }
};

class Cat : public Animal {
public:
    Cat(string n, int a) : Animal(n, a) {}

    void meow() const {
        cout << name << "「ニャー」" << endl;
    }
};

int main() {
    Dog d("ポチ", 3, "柴犬");
    d.fullInfo();
    d.eat();     // 基底クラスのメソッド
    d.bark();    // 派生クラスのメソッド

    cout << "---" << endl;

    Cat c("タマ", 2);
    c.info();
    c.eat();
    c.meow();

    return 0;
}`}
          expectedOutput={`ポチ (3歳)
犬種: 柴犬
ポチが食事中
ポチ「ワンワン！」
---
タマ (2歳)
タマが食事中
タマ「ニャー」`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタとデストラクタの呼び出し順</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Base {
public:
    Base()  { cout << "Base コンストラクタ" << endl; }
    ~Base() { cout << "Base デストラクタ" << endl; }
};

class Middle : public Base {
public:
    Middle()  { cout << "Middle コンストラクタ" << endl; }
    ~Middle() { cout << "Middle デストラクタ" << endl; }
};

class Derived : public Middle {
public:
    Derived()  { cout << "Derived コンストラクタ" << endl; }
    ~Derived() { cout << "Derived デストラクタ" << endl; }
};

int main() {
    cout << "=== 生成 ===" << endl;
    Derived d;
    cout << "=== 破棄 ===" << endl;
    return 0;
}`}
          expectedOutput={`=== 生成 ===
Base コンストラクタ
Middle コンストラクタ
Derived コンストラクタ
=== 破棄 ===
Derived デストラクタ
Middle デストラクタ
Base デストラクタ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/inheritance" />
    </div>
  );
}
