import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("references");

export default function ReferencesBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">参照 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">参照の基本</h1>
        <p className="text-gray-400">参照変数の宣言と基本的な使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">参照とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          参照（reference）は既存の変数に対する別名（エイリアス）です。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">型&amp; 参照名 = 変数;</code> の形式で宣言します。
          参照は宣言時に必ず初期化が必要で、後から別の変数を参照し直すことはできません。
        </p>
        <p className="text-gray-300 leading-relaxed">
          参照を通じた操作は、元の変数への操作と全く同じです。
          ポインタと違い、null にできず、アドレスを直接扱う必要がないため安全です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照の宣言と使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int& ref = x;  // ref は x の別名

    cout << "x   = " << x << endl;
    cout << "ref = " << ref << endl;

    // ref を変更すると x も変わる
    ref = 20;
    cout << "ref=20 後: x = " << x << endl;

    // x を変更すると ref も変わる
    x = 30;
    cout << "x=30 後: ref = " << ref << endl;

    // アドレスも同じ
    cout << "&x   = " << &x << endl;
    cout << "&ref = " << &ref << endl;
    cout << "同じアドレス？ " << (&x == &ref ? "Yes" : "No") << endl;

    return 0;
}`}
          expectedOutput={`x   = 10
ref = 10
ref=20 後: x = 20
x=30 後: ref = 30
&x   = 0x7ffd...
&ref = 0x7ffd...
同じアドレス？ Yes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の参照渡し</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 値渡し: コピーが作られるので元は変わらない
void addOneByValue(int n) {
    n++;
    cout << "値渡し内: n = " << n << endl;
}

// 参照渡し: 元の変数が変わる
void addOneByRef(int& n) {
    n++;
    cout << "参照渡し内: n = " << n << endl;
}

// 参照で返すことも可能
int& getElement(int arr[], int index) {
    return arr[index];
}

int main() {
    int a = 5;
    addOneByValue(a);
    cout << "値渡し後: a = " << a << endl;

    addOneByRef(a);
    cout << "参照渡し後: a = " << a << endl;

    // 参照で返された要素を直接変更
    int nums[] = {10, 20, 30};
    getElement(nums, 1) = 99;
    cout << "nums[1] = " << nums[1] << endl;

    return 0;
}`}
          expectedOutput={`値渡し内: n = 6
値渡し後: a = 5
参照渡し内: n = 6
参照渡し後: a = 6
nums[1] = 99`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="references" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/references" />
    </div>
  );
}
