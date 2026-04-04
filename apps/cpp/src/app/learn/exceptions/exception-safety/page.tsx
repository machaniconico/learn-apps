import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionSafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">例外安全性</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        例外安全性は、例外が発生してもプログラムが正しく動作し続けることを保証する設計原則です。
        基本保証、強い保証、例外を投げない保証の3つのレベルがあります。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RAIIによる基本保証</h2>
        <p className="text-gray-400 mb-4">
          基本保証では、例外が発生してもリソースリークや不正な状態にならないことを保証します。
          RAIIパターンが基本です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <stdexcept>
using namespace std;

class Resource {
    string name;
public:
    Resource(const string& n) : name(n) {
        cout << name << " 確保" << endl;
    }
    ~Resource() {
        cout << name << " 解放" << endl;
    }
};

void unsafeFunction() {
    // RAIIなし: 例外でリークする可能性
    // Resource* r = new Resource("unsafe");
    // throw runtime_error("エラー");
    // delete r;  // 到達しない！

    // RAIIあり: 例外でも自動解放
    auto r = make_unique<Resource>("safe");
    cout << "処理中..." << endl;
    throw runtime_error("エラー発生");
    // rは自動的に解放される
}

int main() {
    try {
        unsafeFunction();
    } catch (const exception& e) {
        cout << "キャッチ: " << e.what() << endl;
    }
    cout << "プログラム継続" << endl;
    return 0;
}`}
          expectedOutput={`safe 確保
処理中...
safe 解放
キャッチ: エラー発生
プログラム継続`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">強い保証（copy-and-swap）</h2>
        <p className="text-gray-400 mb-4">
          強い保証では、操作が失敗した場合に操作前の状態に完全にロールバックされます。
          copy-and-swapイディオムが典型的な実装パターンです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

class SafeContainer {
    vector<int> data;
public:
    void addWithStrongGuarantee(int value) {
        // コピーを作って操作
        vector<int> temp = data;
        temp.push_back(value);

        // バリデーション（ここで例外が出てもdataは無傷）
        if (value < 0) {
            throw invalid_argument("負の値は追加できません");
        }

        // 成功した場合のみスワップ
        swap(data, temp);
    }

    void print() const {
        cout << "データ: ";
        for (int x : data) cout << x << " ";
        cout << "(size=" << data.size() << ")" << endl;
    }
};

int main() {
    SafeContainer c;
    try {
        c.addWithStrongGuarantee(10);
        c.addWithStrongGuarantee(20);
        c.print();
        c.addWithStrongGuarantee(-5);  // 失敗
    } catch (const exception& e) {
        cout << "エラー: " << e.what() << endl;
    }
    c.print();  // 元の状態が保たれている
    return 0;
}`}
          expectedOutput={`データ: 10 20 (size=2)
エラー: 負の値は追加できません
データ: 10 20 (size=2)`}
        />
      </section>

      <LessonCompleteButton categoryId="exceptions" lessonId="exception-safety" />
      <LessonNav lessons={lessons} currentId="exception-safety" basePath="/learn/exceptions" />
    </div>
  );
}
