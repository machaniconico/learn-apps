import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function MemoryLeakPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">メモリ管理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メモリリーク</h1>
        <p className="text-gray-400">メモリリークの原因と検出方法、対策を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メモリリークとは</h2>
        <p className="text-gray-400 mb-4">
          メモリリークは、動的に確保したメモリを解放せずにポインタを失ってしまう状態です。
          プログラムが長時間動作するとメモリ消費量が増え続け、最終的にシステムに影響を及ぼします。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// メモリリークの例（教育用・実際は避けるべき）
void leakyFunction() {
    int* p = new int(42);
    cout << "値: " << *p << endl;
    // delete p; を忘れた → メモリリーク！
}

// 正しい例
void safeFunction() {
    int* p = new int(42);
    cout << "値: " << *p << endl;
    delete p;  // 正しく解放
    cout << "メモリ解放済み" << endl;
}

int main() {
    cout << "=== リークする関数 ===" << endl;
    leakyFunction();
    cout << "(deleteを忘れた!)" << endl;

    cout << "=== 安全な関数 ===" << endl;
    safeFunction();

    return 0;
}`}
          expectedOutput={`=== リークする関数 ===
値: 42
(deleteを忘れた!)
=== 安全な関数 ===
値: 42
メモリ解放済み`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よくあるリークパターン</h2>
        <p className="text-gray-400 mb-4">
          例外発生時のリーク、ポインタの上書き、配列のdelete忘れなど、メモリリークの典型パターンを確認しましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // パターン1: ポインタの上書き
    int* p = new int(10);
    cout << "最初の値: " << *p << endl;
    // p = new int(20); // これをやるとp=10のメモリがリーク！
    delete p;  // 正しく解放してから再確保
    p = new int(20);
    cout << "新しい値: " << *p << endl;
    delete p;

    // パターン2: 早期returnでのリーク防止
    int* data = new int[3]{1, 2, 3};
    // 処理...
    cout << "配列合計: " << data[0] + data[1] + data[2] << endl;
    delete[] data;  // returnの前に必ず解放

    cout << "全メモリ正常に解放" << endl;
    return 0;
}`}
          expectedOutput={`最初の値: 10
新しい値: 20
配列合計: 6
全メモリ正常に解放`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スマートポインタで防止</h2>
        <p className="text-gray-400 mb-4">
          unique_ptrやshared_ptrを使えば、メモリリークを根本的に防止できます。モダンC++では生ポインタのnew/deleteを避けるのが基本です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

int main() {
    // unique_ptr: 自動的にdeleteされる
    {
        auto p = make_unique<int>(42);
        cout << "unique_ptr: " << *p << endl;
    } // スコープを抜けると自動解放

    // shared_ptr: 参照カウントで管理
    shared_ptr<int> sp1;
    {
        auto sp2 = make_shared<int>(100);
        sp1 = sp2;
        cout << "shared_ptr値: " << *sp1 << endl;
        cout << "参照カウント: " << sp1.use_count() << endl;
    }
    cout << "sp2消滅後のカウント: " << sp1.use_count() << endl;
    cout << "値は有効: " << *sp1 << endl;

    return 0;
}`}
          expectedOutput={`unique_ptr: 42
shared_ptr値: 100
参照カウント: 2
sp2消滅後のカウント: 1
値は有効: 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="memory-leak" />
      </div>
      <LessonNav lessons={lessons} currentId="memory-leak" basePath="/learn/memory" />
    </div>
  );
}
