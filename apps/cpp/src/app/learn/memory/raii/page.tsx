import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function RaiiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">メモリ管理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RAII</h1>
        <p className="text-gray-400">リソース管理の基本原則RAIIを理解し、安全なリソース管理を実現します。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RAIIの基本原則</h2>
        <p className="text-gray-400 mb-4">
          RAII（Resource Acquisition Is Initialization）は、リソースの取得をオブジェクトの初期化時に行い、
          デストラクタで確実に解放するC++の設計パターンです。
          メモリ、ファイル、ロック、ネットワーク接続など、あらゆるリソースに適用できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class IntArray {
    int* data;
    int size;
public:
    // コンストラクタでリソース取得
    IntArray(int n) : data(new int[n]), size(n) {
        for (int i = 0; i < n; i++) data[i] = 0;
        cout << "配列確保: サイズ " << size << endl;
    }

    // デストラクタでリソース解放
    ~IntArray() {
        delete[] data;
        cout << "配列解放: サイズ " << size << endl;
    }

    void set(int idx, int val) { data[idx] = val; }
    int get(int idx) const { return data[idx]; }
    int getSize() const { return size; }
};

int main() {
    {
        IntArray arr(3);
        arr.set(0, 10);
        arr.set(1, 20);
        arr.set(2, 30);
        cout << "要素: " << arr.get(0) << ", " << arr.get(1) << ", " << arr.get(2) << endl;
    } // スコープを抜けるとデストラクタが自動呼出
    cout << "スコープ外: メモリは自動解放済み" << endl;

    return 0;
}`}
          expectedOutput={`配列確保: サイズ 3
要素: 10, 20, 30
配列解放: サイズ 3
スコープ外: メモリは自動解放済み`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RAIIとスマートポインタ</h2>
        <p className="text-gray-400 mb-4">
          unique_ptrやshared_ptrはRAIIを実装した標準ライブラリのクラスです。自前でRAIIクラスを書かなくても、スマートポインタで多くのケースをカバーできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Resource {
    string name;
public:
    Resource(const string& n) : name(n) {
        cout << name << " を取得" << endl;
    }
    ~Resource() {
        cout << name << " を解放" << endl;
    }
    void use() const { cout << name << " を使用中" << endl; }
};

int main() {
    cout << "=== unique_ptr ===" << endl;
    {
        auto r1 = make_unique<Resource>("リソースA");
        r1->use();
    }

    cout << "=== shared_ptr ===" << endl;
    {
        auto r2 = make_shared<Resource>("リソースB");
        auto r3 = r2;  // 共有
        r2->use();
        cout << "参照カウント: " << r2.use_count() << endl;
    }
    cout << "全リソース解放完了" << endl;

    return 0;
}`}
          expectedOutput={`=== unique_ptr ===
リソースA を取得
リソースA を使用中
リソースA を解放
=== shared_ptr ===
リソースB を取得
リソースB を使用中
参照カウント: 2
リソースB を解放
全リソース解放完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RAIIガードパターン</h2>
        <p className="text-gray-400 mb-4">
          RAIIはメモリ以外にも使えます。ロックガードやファイルハンドルなど、スコープに連動するリソース管理に最適です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Timer {
    string label;
public:
    Timer(const string& l) : label(l) {
        cout << "[" << label << "] タイマー開始" << endl;
    }
    ~Timer() {
        cout << "[" << label << "] タイマー終了" << endl;
    }
};

void process() {
    Timer t("処理A");
    cout << "重い処理を実行中..." << endl;
    // 例外が発生してもデストラクタは呼ばれる
}

int main() {
    cout << "=== RAII ガード ===" << endl;
    process();
    cout << "--- 入れ子 ---" << endl;
    {
        Timer outer("外側");
        {
            Timer inner("内側");
            cout << "内側の処理" << endl;
        }
        cout << "外側の処理" << endl;
    }
    return 0;
}`}
          expectedOutput={`=== RAII ガード ===
[処理A] タイマー開始
重い処理を実行中...
[処理A] タイマー終了
--- 入れ子 ---
[外側] タイマー開始
[内側] タイマー開始
内側の処理
[内側] タイマー終了
外側の処理
[外側] タイマー終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="raii" />
      </div>
      <LessonNav lessons={lessons} currentId="raii" basePath="/learn/memory" />
    </div>
  );
}
