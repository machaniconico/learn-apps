import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function DestructorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デストラクタ</h1>
        <p className="text-gray-400">オブジェクト破棄時のリソース解放を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デストラクタとは</h2>
        <p className="text-gray-300 leading-relaxed">
          デストラクタはオブジェクトが破棄されるときに自動的に呼ばれる特殊なメンバ関数です。
          ~クラス名()の形で定義し、引数を取れず、戻り値もありません。
          動的メモリの解放やファイルのクローズなど、リソースの後始末に使います。
          これがRAII（Resource Acquisition Is Initialization）パターンの基盤です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デストラクタの動作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Logger {
    string name;
public:
    Logger(string n) : name(n) {
        cout << name << " 生成" << endl;
    }
    ~Logger() {
        cout << name << " 破棄" << endl;
    }
};

int main() {
    cout << "=== main開始 ===" << endl;
    Logger a("A");

    {
        cout << "--- ブロック開始 ---" << endl;
        Logger b("B");
        Logger c("C");
        cout << "--- ブロック終了 ---" << endl;
    } // B, Cが破棄される（逆順）

    cout << "=== main終了 ===" << endl;
    return 0;
} // Aが破棄される`}
          expectedOutput={`=== main開始 ===
A 生成
--- ブロック開始 ---
B 生成
C 生成
--- ブロック終了 ---
C 破棄
B 破棄
=== main終了 ===
A 破棄`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リソース管理とRAII</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class IntArray {
    int* data;
    int size;

public:
    IntArray(int n) : size(n) {
        data = new int[n]();  // ゼロ初期化
        cout << "配列確保 (サイズ: " << n << ")" << endl;
    }

    ~IntArray() {
        delete[] data;
        cout << "配列解放 (サイズ: " << size << ")" << endl;
    }

    void set(int index, int value) { data[index] = value; }
    int get(int index) const { return data[index]; }
    int getSize() const { return size; }
};

int main() {
    IntArray arr(5);

    for (int i = 0; i < arr.getSize(); i++) {
        arr.set(i, i * 10);
    }

    for (int i = 0; i < arr.getSize(); i++) {
        cout << arr.get(i) << " ";
    }
    cout << endl;

    return 0;
} // arrのデストラクタが自動呼出し → メモリリークなし`}
          expectedOutput={`配列確保 (サイズ: 5)
0 10 20 30 40
配列解放 (サイズ: 5)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="destructor" />
      </div>
      <LessonNav lessons={lessons} currentId="destructor" basePath="/learn/classes" />
    </div>
  );
}
