import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function DereferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デリファレンス</h1>
        <p className="text-gray-400">*演算子によるポインタの参照先アクセス</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デリファレンスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デリファレンス（間接参照）とは、ポインタが指すアドレスにある値にアクセスする操作です。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*</code> 演算子をポインタ変数の前に付けることで、
          そのポインタが指す先の値を読み書きできます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          デリファレンスは「読み取り」と「書き込み」の両方で使えます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*ptr</code> は左辺値なので、代入の左辺にも右辺にも置けます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">読み取りと書き込み</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int x = 100;
    int* ptr = &x;

    // 読み取り（右辺でのデリファレンス）
    int value = *ptr;
    cout << "読み取り: *ptr = " << value << endl;

    // 書き込み（左辺でのデリファレンス）
    *ptr = 200;
    cout << "書き込み後: x = " << x << endl;

    // 式の中でのデリファレンス
    *ptr += 50;
    cout << "加算後: x = " << x << endl;

    *ptr *= 2;
    cout << "2倍後: x = " << x << endl;

    return 0;
}`}
          expectedOutput={`読み取り: *ptr = 100
書き込み後: x = 200
加算後: x = 250
2倍後: x = 500`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のデリファレンスとアロー演算子</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

struct Person {
    string name;
    int age;
};

int main() {
    Person p = {"田中太郎", 30};
    Person* ptr = &p;

    // (*ptr).member でアクセス
    cout << "名前: " << (*ptr).name << endl;
    cout << "年齢: " << (*ptr).age << endl;

    // ptr->member（アロー演算子）が省略形
    cout << "名前: " << ptr->name << endl;
    ptr->age = 31;
    cout << "誕生日後の年齢: " << ptr->age << endl;

    return 0;
}`}
          expectedOutput={`名前: 田中太郎
年齢: 30
名前: 田中太郎
誕生日後の年齢: 31`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デリファレンスの注意点</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    int* p1 = &a;
    int* p2 = &b;

    // ポインタの値（アドレス）のコピーと
    // デリファレンスした値のコピーの違い
    cout << "--- 値のコピー ---" << endl;
    int copy = *p1;  // a の値をコピー
    copy = 999;       // copy を変えても a は変わらない
    cout << "a = " << a << ", copy = " << copy << endl;

    cout << "--- ポインタのコピー ---" << endl;
    int* p3 = p1;    // p3 も a を指す
    *p3 = 999;        // p3 経由で a を変更
    cout << "a = " << a << ", *p3 = " << *p3 << endl;

    cout << "--- swap via pointers ---" << endl;
    int temp = *p1;
    *p1 = *p2;
    *p2 = temp;
    cout << "a = " << a << ", b = " << b << endl;

    return 0;
}`}
          expectedOutput={`--- 値のコピー ---
a = 10, copy = 999
--- ポインタのコピー ---
a = 999, *p3 = 999
--- swap via pointers ---
a = 20, b = 999`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="dereference" />
      </div>
      <LessonNav lessons={lessons} currentId="dereference" basePath="/learn/pointers" />
    </div>
  );
}
