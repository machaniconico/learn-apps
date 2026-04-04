import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function BestPracticesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++エコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ベストプラクティス</h1>
        <p className="text-gray-400">C++ Core GuidelinesとモダンC++の指針を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++ Core Guidelines</h2>
        <p className="text-gray-300 leading-relaxed">
          C++ Core GuidelinesはBjarne StroustrupとHerb Sutterが中心となって作成した
          ベストプラクティス集です。安全で効率的なC++コードを書くための指針を提供します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メモリ安全性のベストプラクティス</h2>
        <p className="text-gray-400 mb-4">RAIIとスマートポインタで安全なコードを書きましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <vector>
#include <string>
using namespace std;

// BAD: 生のnew/delete
// int* p = new int(42);
// delete p;

// GOOD: スマートポインタを使う
class Resource {
    string name_;
public:
    Resource(const string& name) : name_(name) {
        cout << name_ << " 作成" << endl;
    }
    ~Resource() { cout << name_ << " 解放" << endl; }
    void use() const { cout << name_ << " 使用中" << endl; }
};

void goodExample() {
    // unique_ptr: 単独所有
    auto r1 = make_unique<Resource>("R1");
    r1->use();

    // shared_ptr: 共有所有
    auto r2 = make_shared<Resource>("R2");
    auto r2copy = r2;
    r2->use();

    // vectorで自動管理
    vector<unique_ptr<Resource>> resources;
    resources.push_back(make_unique<Resource>("R3"));
    resources[0]->use();

    cout << "--- スコープ終了 ---" << endl;
}

int main() {
    goodExample();
    cout << "全リソース自動解放済み" << endl;
    return 0;
}`}
          expectedOutput={`R1 作成
R1 使用中
R2 作成
R2 使用中
R3 作成
R3 使用中
--- スコープ終了 ---
R3 解放
R1 解放
R2 解放
全リソース自動解放済み`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">モダンC++の原則</h2>
        <p className="text-gray-400 mb-4">日常的に意識すべきモダンC++のルールです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    // 1. autoを積極的に使う
    auto numbers = vector<int>{5, 3, 1, 4, 2};
    auto name = string{"C++"};

    // 2. 範囲forを使う（インデックスループより安全）
    cout << "ソート前: ";
    for (const auto& n : numbers) cout << n << " ";
    cout << endl;

    // 3. STLアルゴリズムを使う（手書きループより安全）
    sort(numbers.begin(), numbers.end());

    // 4. constを積極的に使う
    const auto& sorted = numbers;
    cout << "ソート後: ";
    for (const auto& n : sorted) cout << n << " ";
    cout << endl;

    // 5. 文字列連結はstringを使う
    auto greeting = "Hello, "s + name + "!";
    cout << greeting << endl;

    cout << endl;
    cout << "=== モダンC++の原則 ===" << endl;
    cout << "1. RAIIでリソース管理" << endl;
    cout << "2. スマートポインタ > 生ポインタ" << endl;
    cout << "3. const/constexprを積極的に" << endl;
    cout << "4. STLアルゴリズム > 手書きループ" << endl;
    cout << "5. auto > 明示的な型名" << endl;
    cout << "6. 範囲for > インデックスループ" << endl;
    cout << "7. enum class > enum" << endl;
    cout << "8. nullptr > NULL/0" << endl;
    return 0;
}`}
          expectedOutput={`ソート前: 5 3 1 4 2
ソート後: 1 2 3 4 5
Hello, C++!

=== モダンC++の原則 ===
1. RAIIでリソース管理
2. スマートポインタ > 生ポインタ
3. const/constexprを積極的に
4. STLアルゴリズム > 手書きループ
5. auto > 明示的な型名
6. 範囲for > インデックスループ
7. enum class > enum
8. nullptr > NULL/0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="best-practices" />
      </div>
      <LessonNav lessons={lessons} currentId="best-practices" basePath="/learn/ecosystem" />
    </div>
  );
}
