import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("smartptr");

export default function MakeFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">スマートポインタ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">make関数</h1>
        <p className="text-gray-400">make_unique・make_sharedの使い方と利点を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">make関数を使うべき理由</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::make_unique</code>（C++14）と <code className="text-pink-400">std::make_shared</code>（C++11）は、
          スマートポインタを安全かつ効率的に作成するファクトリ関数です。
          new を直接使うよりも例外安全性が高く、make_shared はメモリアロケーションを1回に削減できます。
          特別な理由がない限り、常にmake関数を使うことが推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">make_uniqueとmake_shared</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <string>
using namespace std;

class Widget {
    string name;
    int value;
public:
    Widget(const string& n, int v) : name(n), value(v) {
        cout << "Widget(" << name << ", " << value << ") 作成" << endl;
    }
    ~Widget() {
        cout << "Widget(" << name << ") 破棄" << endl;
    }
    void show() const {
        cout << name << " = " << value << endl;
    }
};

int main() {
    // make_unique: 推奨される作成方法
    auto w1 = make_unique<Widget>("alpha", 10);
    w1->show();

    // make_shared: 推奨される作成方法
    auto w2 = make_shared<Widget>("beta", 20);
    w2->show();

    // 非推奨: new を直接使う方法
    // unique_ptr<Widget> w3(new Widget("gamma", 30));

    // 配列の make_unique (C++14)
    auto arr = make_unique<int[]>(5);
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
    }
    cout << "配列: ";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`Widget(alpha, 10) 作成
alpha = 10
Widget(beta, 20) 作成
beta = 20
配列: 10 20 30 40 50
Widget(beta) 破棄
Widget(alpha) 破棄`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外安全性の比較</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

class Resource {
    int id;
public:
    Resource(int i) : id(i) {
        cout << "Resource " << id << " 作成" << endl;
    }
    ~Resource() {
        cout << "Resource " << id << " 破棄" << endl;
    }
};

void process(shared_ptr<Resource> r1, shared_ptr<Resource> r2) {
    cout << "2つのリソースを処理中..." << endl;
}

int main() {
    // 安全: make_shared を使う
    // メモリアロケーションが1回で済む
    process(make_shared<Resource>(1), make_shared<Resource>(2));

    cout << "---" << endl;

    // 非推奨: new を直接使うと例外安全性に問題がある可能性
    // process(shared_ptr<Resource>(new Resource(3)),
    //         shared_ptr<Resource>(new Resource(4)));
    // ↑ 関数引数の評価順序は不定なので、
    //   1つ目のnewの後に2つ目のnewで例外が発生すると
    //   1つ目のリソースがリークする可能性がある

    cout << "make_sharedは常に安全です" << endl;

    return 0;
}`}
          expectedOutput={`Resource 1 作成
Resource 2 作成
2つのリソースを処理中...
Resource 2 破棄
Resource 1 破棄
---
make_sharedは常に安全です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="smartptr" lessonId="make-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="make-functions" basePath="/learn/smartptr" />
    </div>
  );
}
