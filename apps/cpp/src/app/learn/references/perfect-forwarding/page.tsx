import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("references");

export default function PerfectForwardingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">参照 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">完全転送</h1>
        <p className="text-gray-400">std::forwardを使ったテンプレート引数の転送</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">完全転送とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          完全転送（Perfect Forwarding）とは、テンプレート関数が受け取った引数の
          「左辺値か右辺値か」という性質を保ったまま別の関数に転送する技術です。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">T&amp;&amp;</code>（転送参照）と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::forward&lt;T&gt;</code> を組み合わせて実現します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          テンプレートの <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">T&amp;&amp;</code> は「転送参照（forwarding reference）」と呼ばれ、
          左辺値が渡されると T は <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int&amp;</code> に、
          右辺値が渡されると T は <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int</code> に推論されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">転送参照とstd::forward</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <utility>
using namespace std;

void process(const string& s) {
    cout << "左辺値版: " << s << endl;
}

void process(string&& s) {
    cout << "右辺値版: " << s << endl;
}

// 完全転送: 引数の値カテゴリを保つ
template<typename T>
void wrapper(T&& arg) {
    // std::forward で元の値カテゴリを復元
    process(std::forward<T>(arg));
}

int main() {
    string name = "Hello";

    wrapper(name);              // 左辺値 → 左辺値版が呼ばれる
    wrapper(string("World"));   // 右辺値 → 右辺値版が呼ばれる
    wrapper("Temporary");       // 右辺値 → 右辺値版が呼ばれる

    return 0;
}`}
          expectedOutput={`左辺値版: Hello
右辺値版: World
右辺値版: Temporary`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">emplace系関数での活用</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

class Item {
    string name;
    int count;
public:
    Item(const string& n, int c) : name(n), count(c) {
        cout << "構築(コピー): " << name << endl;
    }
    Item(string&& n, int c) : name(std::move(n)), count(c) {
        cout << "構築(ムーブ): " << name << endl;
    }
    void print() const {
        cout << "  " << name << " x" << count << endl;
    }
};

// make_item: 完全転送でItemを構築
template<typename... Args>
Item make_item(Args&&... args) {
    return Item(std::forward<Args>(args)...);
}

int main() {
    string apple = "りんご";

    cout << "--- 直接構築 ---" << endl;
    Item i1(apple, 3);       // コピー版
    Item i2("みかん", 5);     // ムーブ版

    cout << "--- 完全転送経由 ---" << endl;
    Item i3 = make_item(apple, 3);     // コピー版が呼ばれる
    Item i4 = make_item("ぶどう", 7);   // ムーブ版が呼ばれる

    cout << "--- 結果 ---" << endl;
    i1.print();
    i2.print();
    i3.print();
    i4.print();

    return 0;
}`}
          expectedOutput={`--- 直接構築 ---
構築(コピー): りんご
構築(ムーブ): みかん
--- 完全転送経由 ---
構築(コピー): りんご
構築(ムーブ): ぶどう
--- 結果 ---
  りんご x3
  みかん x5
  りんご x3
  ぶどう x7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="references" lessonId="perfect-forwarding" />
      </div>
      <LessonNav lessons={lessons} currentId="perfect-forwarding" basePath="/learn/references" />
    </div>
  );
}
