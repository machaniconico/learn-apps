import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("move");

export default function LvalueRvaluePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ムーブセマンティクス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">左辺値と右辺値</h1>
        <p className="text-gray-400">lvalueとrvalueの基本概念、左辺値参照と右辺値参照の違いを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">左辺値（lvalue）</h2>
        <p className="text-gray-400 mb-4">
          左辺値は名前を持ち、アドレスを取得できる式です。変数、配列要素、参照などが該当します。
          代入の左辺に置けることが名前の由来です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 左辺値の例
    int x = 10;        // x は左辺値
    int& ref = x;      // 左辺値参照
    int arr[3] = {1, 2, 3};

    cout << "x = " << x << endl;
    cout << "xのアドレス: " << &x << endl;
    cout << "ref = " << ref << " (xと同じ)" << endl;
    cout << "arr[1] = " << arr[1] << " (左辺値)" << endl;

    // 左辺値は変更可能
    x = 20;
    ref = 30;
    arr[0] = 100;
    cout << "変更後 x = " << x << endl;
    cout << "変更後 arr[0] = " << arr[0] << endl;

    return 0;
}`}
          expectedOutput={`x = 10
xのアドレス: 0x...
ref = 10 (xと同じ)
arr[1] = 2 (左辺値)
変更後 x = 30
変更後 arr[0] = 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">右辺値（rvalue）</h2>
        <p className="text-gray-400 mb-4">
          右辺値は一時的な値で、名前を持たずアドレスを取得できません。
          リテラル、式の結果、関数の戻り値（参照でない場合）などが該当します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

string createGreeting() {
    return "Hello!";  // 戻り値は右辺値
}

int main() {
    // 右辺値の例
    // 42 はリテラル（右辺値）
    // 3 + 4 は式の結果（右辺値）
    // createGreeting() の戻り値は右辺値

    int x = 42;           // 42は右辺値
    int y = 3 + 4;        // 3+4の結果は右辺値
    string s = createGreeting(); // 戻り値は右辺値

    cout << "x = " << x << endl;
    cout << "y = " << y << endl;
    cout << "s = " << s << endl;

    // 右辺値参照 (&&) で一時オブジェクトを束縛
    int&& rref = 100;
    cout << "右辺値参照: " << rref << endl;
    rref = 200;  // 右辺値参照自体は左辺値
    cout << "変更後: " << rref << endl;

    return 0;
}`}
          expectedOutput={`x = 42
y = 7
s = Hello!
右辺値参照: 100
変更後: 200`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照の種類</h2>
        <p className="text-gray-400 mb-4">
          左辺値参照（&）は左辺値を、右辺値参照（&&）は右辺値を束縛します。
          const左辺値参照は両方を束縛できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void checkValue(int& x)        { cout << "左辺値参照: " << x << endl; }
void checkValue(int&& x)       { cout << "右辺値参照: " << x << endl; }
void checkValue(const int& x)  { cout << "const参照:  " << x << endl; }

int main() {
    int a = 10;

    checkValue(a);       // 左辺値 → int&
    checkValue(42);      // 右辺値 → int&&
    // const int& は両方を束縛できる
    const int& cref1 = a;    // 左辺値OK
    const int& cref2 = 99;   // 右辺値もOK
    cout << "const参照(左辺値): " << cref1 << endl;
    cout << "const参照(右辺値): " << cref2 << endl;

    return 0;
}`}
          expectedOutput={`左辺値参照: 10
右辺値参照: 42
const参照(左辺値): 10
const参照(右辺値): 99`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="move" lessonId="lvalue-rvalue" />
      </div>
      <LessonNav lessons={lessons} currentId="lvalue-rvalue" basePath="/learn/move" />
    </div>
  );
}
