import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function OverrideFinalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">override・final</h1>
        <p className="text-gray-400">オーバーライドの明示と継承の制限を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">overrideとfinal</h2>
        <p className="text-gray-300 leading-relaxed">
          overrideは基底クラスの仮想関数を正しくオーバーライドしていることをコンパイラに確認させる指定子です。
          シグネチャの間違いをコンパイル時に検出できます。finalは仮想関数のさらなるオーバーライドや、
          クラスの継承そのものを禁止する指定子です。どちらもC++11で導入されました。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">overrideの活用</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Animal {
public:
    virtual string speak() const { return "..."; }
    virtual void move(int distance) const {
        cout << distance << "m 移動" << endl;
    }
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    // override: 基底クラスの仮想関数を正しくオーバーライド
    string speak() const override { return "ワン！"; }
    void move(int distance) const override {
        cout << distance << "m 走る" << endl;
    }

    // 以下はコンパイルエラーになる（overrideの効果）:
    // string Speak() const override { ... }  // 大文字S: 名前が違う
    // string speak() override { ... }         // constが抜けている
};

class Cat : public Animal {
public:
    string speak() const override { return "ニャー"; }
    void move(int distance) const override {
        cout << distance << "m 忍び足" << endl;
    }
};

int main() {
    Dog dog;
    Cat cat;

    Animal* animals[] = {&dog, &cat};

    for (Animal* a : animals) {
        cout << a->speak() << " → ";
        a->move(10);
    }

    return 0;
}`}
          expectedOutput={`ワン！ → 10m 走る
ニャー → 10m 忍び足`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">finalによる制限</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Base {
public:
    virtual void method1() { cout << "Base::method1" << endl; }
    virtual void method2() { cout << "Base::method2" << endl; }
    virtual ~Base() = default;
};

class Middle : public Base {
public:
    // finalでさらなるオーバーライドを禁止
    void method1() override final {
        cout << "Middle::method1 (これ以上オーバーライド不可)" << endl;
    }

    void method2() override {
        cout << "Middle::method2" << endl;
    }
};

// finalクラス: 継承そのものを禁止
class FinalClass final : public Middle {
public:
    // method1 は override できない（finalが付いている）
    // void method1() override { }  // エラー

    // method2 はオーバーライドできる
    void method2() override {
        cout << "FinalClass::method2" << endl;
    }
};

// class Impossible : public FinalClass { };  // エラー: finalクラス

int main() {
    FinalClass fc;
    Base* ptr = &fc;

    ptr->method1();  // Middle版が呼ばれる
    ptr->method2();  // FinalClass版が呼ばれる

    return 0;
}`}
          expectedOutput={`Middle::method1 (これ以上オーバーライド不可)
FinalClass::method2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="override-final" />
      </div>
      <LessonNav lessons={lessons} currentId="override-final" basePath="/learn/inheritance" />
    </div>
  );
}
