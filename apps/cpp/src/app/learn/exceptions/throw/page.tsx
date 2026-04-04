import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ThrowPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">throw</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        throw文は例外を投げるために使います。任意の型のオブジェクトを投げられますが、
        標準例外クラスを使うのがベストプラクティスです。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準例外クラス</h2>
        <p className="text-gray-400 mb-4">
          &lt;stdexcept&gt;ヘッダには様々な標準例外クラスが定義されています。用途に応じて使い分けます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
#include <vector>
using namespace std;

int main() {
    // invalid_argument: 不正な引数
    try {
        int age = -1;
        if (age < 0)
            throw invalid_argument("年齢は0以上です");
    } catch (const invalid_argument& e) {
        cout << "invalid_argument: " << e.what() << endl;
    }

    // out_of_range: 範囲外
    try {
        vector<int> v = {1, 2, 3};
        cout << v.at(10) << endl;  // atは範囲チェックする
    } catch (const out_of_range& e) {
        cout << "out_of_range: " << e.what() << endl;
    }

    // overflow_error: オーバーフロー
    try {
        throw overflow_error("計算結果がオーバーフローしました");
    } catch (const overflow_error& e) {
        cout << "overflow_error: " << e.what() << endl;
    }

    return 0;
}`}
          expectedOutput={`invalid_argument: 年齢は0以上です
out_of_range: vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)
overflow_error: 計算結果がオーバーフローしました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外の再スロー</h2>
        <p className="text-gray-400 mb-4">
          catchブロック内でthrow;を使うと、キャッチした例外をそのまま再スローできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
using namespace std;

void innerFunction() {
    throw runtime_error("内部エラー");
}

void middleFunction() {
    try {
        innerFunction();
    } catch (const exception& e) {
        cout << "中間層でログ: " << e.what() << endl;
        throw;  // 再スロー
    }
}

int main() {
    try {
        middleFunction();
    } catch (const exception& e) {
        cout << "最上位でキャッチ: " << e.what() << endl;
    }

    return 0;
}`}
          expectedOutput={`中間層でログ: 内部エラー
最上位でキャッチ: 内部エラー`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数での例外処理パターン</h2>
        <p className="text-gray-400 mb-4">
          前提条件をチェックして例外を投げるガード節は、関数の堅牢性を高めます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

class Account {
    string name;
    int balance;
public:
    Account(const string& n, int b) : name(n), balance(b) {
        if (b < 0) throw invalid_argument("残高は0以上");
    }
    void withdraw(int amount) {
        if (amount <= 0) throw invalid_argument("引き出し額は正数");
        if (amount > balance) throw runtime_error("残高不足");
        balance -= amount;
        cout << name << ": " << amount << "円引き出し (残高: " << balance << "円)" << endl;
    }
};

int main() {
    try {
        Account acc("太郎", 1000);
        acc.withdraw(300);
        acc.withdraw(500);
        acc.withdraw(300);  // 残高不足
    } catch (const exception& e) {
        cout << "エラー: " << e.what() << endl;
    }
    return 0;
}`}
          expectedOutput={`太郎: 300円引き出し (残高: 700円)
太郎: 500円引き出し (残高: 200円)
エラー: 残高不足`}
        />
      </section>

      <LessonCompleteButton categoryId="exceptions" lessonId="throw" />
      <LessonNav lessons={lessons} currentId="throw" basePath="/learn/exceptions" />
    </div>
  );
}
