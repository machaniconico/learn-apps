import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function VirtualInheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">仮想継承</h1>
        <p className="text-gray-400">virtual継承によるダイヤモンド問題の解決を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">仮想継承とは</h2>
        <p className="text-gray-300 leading-relaxed">
          仮想継承（virtual inheritance）は、多重継承におけるダイヤモンド問題を解決する仕組みです。
          中間クラスがvirtualキーワードを使って基底クラスを継承すると、最終的な派生クラスに
          基底クラスのインスタンスが1つだけ存在することが保証されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">仮想継承でダイヤモンド問題を解決</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Animal {
public:
    string name;
    Animal(string n) : name(n) {
        cout << "Animal(" << name << ") 生成" << endl;
    }
    void breathe() const {
        cout << name << "が呼吸する" << endl;
    }
};

// virtual継承: Animalのインスタンスは1つだけになる
class Mammal : virtual public Animal {
public:
    Mammal(string n) : Animal(n) {
        cout << "Mammal 生成" << endl;
    }
    void nurse() const { cout << "授乳する" << endl; }
};

class WingedAnimal : virtual public Animal {
public:
    WingedAnimal(string n) : Animal(n) {
        cout << "WingedAnimal 生成" << endl;
    }
    void flap() const { cout << "翼を羽ばたかせる" << endl; }
};

// Bat（コウモリ）: 哺乳類かつ翼を持つ
class Bat : public Mammal, public WingedAnimal {
public:
    // 仮想継承では最も派生したクラスがAnimalのコンストラクタを呼ぶ
    Bat(string n) : Animal(n), Mammal(n), WingedAnimal(n) {
        cout << "Bat 生成" << endl;
    }
};

int main() {
    Bat bat("コウモリ");
    cout << "---" << endl;
    bat.breathe();  // 曖昧さなし！ Animalは1つだけ
    bat.nurse();
    bat.flap();
    cout << "名前: " << bat.name << endl;

    return 0;
}`}
          expectedOutput={`Animal(コウモリ) 生成
Mammal 生成
WingedAnimal 生成
Bat 生成
---
コウモリが呼吸する
授乳する
翼を羽ばたかせる
名前: コウモリ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">仮想継承の注意点</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Base {
public:
    int value;
    Base(int v) : value(v) {
        cout << "Base(" << v << ")" << endl;
    }
};

class Left : virtual public Base {
public:
    Left(int v) : Base(v) {
        cout << "Left(" << v << ")" << endl;
    }
};

class Right : virtual public Base {
public:
    Right(int v) : Base(v) {
        cout << "Right(" << v << ")" << endl;
    }
};

class Bottom : public Left, public Right {
public:
    // 最も派生したクラスがBaseのコンストラクタを担当
    // Left(20) や Right(30) のBase呼び出しは無視される
    Bottom(int v) : Base(v), Left(v * 2), Right(v * 3) {
        cout << "Bottom(" << v << ")" << endl;
    }
};

int main() {
    Bottom b(10);
    cout << "value = " << b.value << endl;  // Base(10)のvalue
    cout << "Left::value = " << b.Left::value << endl;  // 同じもの
    cout << "Right::value = " << b.Right::value << endl; // 同じもの

    return 0;
}`}
          expectedOutput={`Base(10)
Left(20)
Right(30)
Bottom(10)
value = 10
Left::value = 10
Right::value = 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="virtual-inheritance" />
      </div>
      <LessonNav lessons={lessons} currentId="virtual-inheritance" basePath="/learn/inheritance" />
    </div>
  );
}
