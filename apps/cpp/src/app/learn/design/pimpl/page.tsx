import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function PimplPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">デザインパターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Pimplイディオム</h1>
        <p className="text-gray-400">実装の隠蔽によるコンパイル時間の短縮を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Pimplイディオムとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pimpl（Pointer to Implementation）は、クラスの実装詳細をポインタ経由で別のクラスに委譲するイディオムです。
          ヘッダファイルからprivateメンバを隠すことで、実装変更時にヘッダを変えずに済み、
          再コンパイルの連鎖を防ぎます。ABIの安定性にも貢献します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pimplの基本実装</h2>
        <p className="text-gray-400 mb-4">unique_ptrを使ったモダンなPimpl実装です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <string>
using namespace std;

// === widget.h に相当 ===
class Widget {
public:
    Widget(const string& name);
    ~Widget();  // unique_ptrの不完全型のために必要
    Widget(Widget&&) noexcept;
    Widget& operator=(Widget&&) noexcept;

    void setSize(int w, int h);
    void display() const;
private:
    struct Impl;  // 前方宣言のみ
    unique_ptr<Impl> pImpl_;
};

// === widget.cpp に相当 ===
struct Widget::Impl {
    string name;
    int width = 0;
    int height = 0;

    Impl(const string& n) : name(n) {}
    void display() const {
        cout << name << " (" << width << "x" << height << ")" << endl;
    }
};

Widget::Widget(const string& name) : pImpl_(make_unique<Impl>(name)) {}
Widget::~Widget() = default;
Widget::Widget(Widget&&) noexcept = default;
Widget& Widget::operator=(Widget&&) noexcept = default;

void Widget::setSize(int w, int h) {
    pImpl_->width = w;
    pImpl_->height = h;
}

void Widget::display() const {
    pImpl_->display();
}

// === main.cpp ===
int main() {
    Widget w("ボタン");
    w.setSize(100, 50);
    w.display();

    Widget w2("テキスト");
    w2.setSize(200, 30);
    w2.display();

    // ムーブ
    Widget w3 = move(w2);
    w3.display();
    return 0;
}`}
          expectedOutput={`ボタン (100x50)
テキスト (200x30)
テキスト (200x30)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pimplの利点と注意点</h2>
        <p className="text-gray-400 mb-4">Pimplを使う場面と注意すべき点を確認しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== Pimplの利点 ===" << endl;
    cout << "1. コンパイル時間の短縮" << endl;
    cout << "   Impl変更時にヘッダの再コンパイルが不要" << endl;
    cout << endl;
    cout << "2. ABI安定性" << endl;
    cout << "   公開ヘッダのサイズが変わらない" << endl;
    cout << endl;
    cout << "3. 実装の隠蔽" << endl;
    cout << "   privateメンバがヘッダに露出しない" << endl;
    cout << endl;

    cout << "=== 注意点 ===" << endl;
    cout << "1. unique_ptrのためデストラクタ定義が必要" << endl;
    cout << "2. ムーブ操作は.cppで定義" << endl;
    cout << "3. ヒープ割り当てのオーバーヘッド" << endl;
    cout << "4. インライン化できないため微小な性能影響" << endl;
    cout << endl;

    cout << "=== 使うべき場面 ===" << endl;
    cout << "- ライブラリの公開APIクラス" << endl;
    cout << "- 大規模プロジェクトのコアクラス" << endl;
    cout << "- ヘッダの依存関係を断ち切りたい場合" << endl;
    return 0;
}`}
          expectedOutput={`=== Pimplの利点 ===
1. コンパイル時間の短縮
   Impl変更時にヘッダの再コンパイルが不要

2. ABI安定性
   公開ヘッダのサイズが変わらない

3. 実装の隠蔽
   privateメンバがヘッダに露出しない

=== 注意点 ===
1. unique_ptrのためデストラクタ定義が必要
2. ムーブ操作は.cppで定義
3. ヒープ割り当てのオーバーヘッド
4. インライン化できないため微小な性能影響

=== 使うべき場面 ===
- ライブラリの公開APIクラス
- 大規模プロジェクトのコアクラス
- ヘッダの依存関係を断ち切りたい場合`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="pimpl" />
      </div>
      <LessonNav lessons={lessons} currentId="pimpl" basePath="/learn/design" />
    </div>
  );
}
