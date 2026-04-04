import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("references");

export default function ReferenceVsPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">参照 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">参照 vs ポインタ</h1>
        <p className="text-gray-400">参照とポインタの違いと使い分け</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主な違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          参照は初期化が必須で再バインド不可、null不可。ポインタは後から変更可能で null を持てます。
          参照はシンタックスが簡潔で安全、ポインタはより柔軟でメモリ操作に適しています。
          一般的に「参照で済むなら参照を使う」のがC++のベストプラクティスです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照とポインタの比較</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 参照版: シンプル
void swapRef(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// ポインタ版: null チェックが必要になりうる
void swapPtr(int* a, int* b) {
    if (a == nullptr || b == nullptr) return;
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;

    // 参照版: 呼び出しが自然
    swapRef(x, y);
    cout << "参照版swap後: x=" << x << ", y=" << y << endl;

    // ポインタ版: &が必要
    swapPtr(&x, &y);
    cout << "ポインタ版swap後: x=" << x << ", y=" << y << endl;

    // 参照は再バインド不可
    int a = 1, b = 2;
    int& ref = a;
    ref = b;  // aにbの値を代入するだけ（refの参照先は変わらない）
    cout << "a=" << a << ", b=" << b << ", ref=" << ref << endl;
    cout << "&a == &ref? " << (&a == &ref ? "Yes" : "No") << endl;

    return 0;
}`}
          expectedOutput={`参照版swap後: x=20, y=10
ポインタ版swap後: x=10, y=20
a=2, b=2, ref=2
&a == &ref? Yes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">使い分けのガイドライン</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

struct Config {
    string name;
    int value;
};

// 参照を使う場面: オプションでない引数
void processConfig(const Config& config) {
    cout << config.name << " = " << config.value << endl;
}

// ポインタを使う場面: 「何もない」を表現する場合
void processOptional(const Config* config) {
    if (config == nullptr) {
        cout << "設定なし（デフォルトを使用）" << endl;
        return;
    }
    cout << config->name << " = " << config->value << endl;
}

// ポインタを使う場面: 指す先を切り替える
void findMax(int* arr, int size, int*& result) {
    result = &arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > *result) {
            result = &arr[i];
        }
    }
}

int main() {
    Config cfg = {"timeout", 30};
    processConfig(cfg);       // 参照: 必ず有効な値
    processOptional(&cfg);    // ポインタ: 有効な設定
    processOptional(nullptr); // ポインタ: 設定なし

    int nums[] = {3, 7, 1, 9, 4};
    int* maxPtr = nullptr;
    findMax(nums, 5, maxPtr);
    cout << "最大値: " << *maxPtr << endl;

    return 0;
}`}
          expectedOutput={`timeout = 30
timeout = 30
設定なし（デフォルトを使用）
最大値: 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="references" lessonId="reference-vs-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="reference-vs-pointer" basePath="/learn/references" />
    </div>
  );
}
