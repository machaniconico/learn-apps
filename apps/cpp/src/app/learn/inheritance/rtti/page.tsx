import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function RttiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RTTI</h1>
        <p className="text-gray-400">dynamic_castとtypeidによる実行時型情報を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RTTIとは</h2>
        <p className="text-gray-300 leading-relaxed">
          RTTI（Run-Time Type Information）は実行時にオブジェクトの型を調べる仕組みです。
          dynamic_castで安全なダウンキャストを行い、typeidで型情報を取得できます。
          ポリモーフィックなクラス（仮想関数を持つクラス）で使用できます。
          ただし、一般的にはRTTIに頼らず仮想関数で設計する方が望ましいとされています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">dynamic_castによる安全なキャスト</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Animal {
public:
    virtual string speak() const { return "..."; }
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    string speak() const override { return "ワン！"; }
    void fetch() const { cout << "ボールを取ってくる！" << endl; }
};

class Cat : public Animal {
public:
    string speak() const override { return "ニャー"; }
    void purr() const { cout << "ゴロゴロ..." << endl; }
};

void interact(Animal* animal) {
    cout << animal->speak() << endl;

    // dynamic_cast: 失敗するとnullptrを返す（ポインタの場合）
    if (Dog* dog = dynamic_cast<Dog*>(animal)) {
        dog->fetch();  // Dog固有のメソッド
    } else if (Cat* cat = dynamic_cast<Cat*>(animal)) {
        cat->purr();   // Cat固有のメソッド
    } else {
        cout << "不明な動物" << endl;
    }
}

int main() {
    Dog dog;
    Cat cat;

    cout << "=== Dog ===" << endl;
    interact(&dog);

    cout << "=== Cat ===" << endl;
    interact(&cat);

    return 0;
}`}
          expectedOutput={`=== Dog ===
ワン！
ボールを取ってくる！
=== Cat ===
ニャー
ゴロゴロ...`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">typeidによる型情報の取得</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <typeinfo>
using namespace std;

class Base {
public:
    virtual ~Base() = default;
};

class DerivedA : public Base {};
class DerivedB : public Base {};

int main() {
    DerivedA a;
    DerivedB b;
    Base* ptrA = &a;
    Base* ptrB = &b;

    // typeidで型名を取得
    cout << "a の型: " << typeid(a).name() << endl;
    cout << "b の型: " << typeid(b).name() << endl;
    cout << "ptrA の型: " << typeid(*ptrA).name() << endl;
    cout << "ptrB の型: " << typeid(*ptrB).name() << endl;

    // 型の比較
    cout << "同じ型か: " << (typeid(*ptrA) == typeid(*ptrB) ? "Yes" : "No") << endl;
    cout << "DerivedAか: " << (typeid(*ptrA) == typeid(DerivedA) ? "Yes" : "No") << endl;

    // 基本型でも使える
    int x = 10;
    double y = 3.14;
    cout << "xの型: " << typeid(x).name() << endl;
    cout << "yの型: " << typeid(y).name() << endl;

    return 0;
}`}
          expectedOutput={`a の型: 8DerivedA
b の型: 8DerivedB
ptrA の型: 8DerivedA
ptrB の型: 8DerivedB
同じ型か: No
DerivedAか: Yes
xの型: i
yの型: d`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="rtti" />
      </div>
      <LessonNav lessons={lessons} currentId="rtti" basePath="/learn/inheritance" />
    </div>
  );
}
