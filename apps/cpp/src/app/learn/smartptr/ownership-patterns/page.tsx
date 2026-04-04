import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("smartptr");

export default function OwnershipPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">スマートポインタ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">所有権パターン</h1>
        <p className="text-gray-400">所有権の設計パターンとベストプラクティスを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">所有権の設計原則</h2>
        <p className="text-gray-300 leading-relaxed">
          C++では「誰がリソースの所有者か」を明確にすることが重要です。
          <code className="text-pink-400">unique_ptr</code> は排他的所有、
          <code className="text-pink-400">shared_ptr</code> は共有所有、
          生のポインタや参照は「所有しない観察者」として使います。
          関数のインターフェースでスマートポインタの種類を使い分けることで、所有権の意図を明確に伝えられます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数パラメータと所有権</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

class Widget {
    string name;
public:
    Widget(const string& n) : name(n) {}
    string getName() const { return name; }
};

// 所有権を受け取る（sink）
void takeOwnership(unique_ptr<Widget> w) {
    cout << "所有権を受け取り: " << w->getName() << endl;
}

// 所有権を共有する
void shareOwnership(shared_ptr<Widget> w) {
    cout << "共有: " << w->getName()
         << " (参照数: " << w.use_count() << ")" << endl;
}

// 観察のみ（所有権に関与しない）
void observe(const Widget& w) {
    cout << "観察: " << w.getName() << endl;
}

// ファクトリ関数（所有権を返す）
unique_ptr<Widget> createWidget(const string& name) {
    return make_unique<Widget>(name);
}

int main() {
    // パターン1: ファクトリが作成、呼び出し側が所有
    auto w1 = createWidget("Alpha");
    observe(*w1);

    // パターン2: 所有権の移転
    takeOwnership(move(w1));
    // w1 は nullptr

    // パターン3: 共有所有
    auto w2 = make_shared<Widget>("Beta");
    shareOwnership(w2);
    cout << "メイン側の参照数: " << w2.use_count() << endl;

    return 0;
}`}
          expectedOutput={`観察: Alpha
所有権を受け取り: Alpha
共有: Beta (参照数: 2)
メイン側の参照数: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pimplイディオムでの活用</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <string>
using namespace std;

// Pimplイディオム: 実装の隠蔽
class Database {
    // 実装クラス（通常は別ファイルに置く）
    struct Impl {
        string connectionString;
        bool connected;

        Impl(const string& cs) : connectionString(cs), connected(false) {}

        void connect() {
            connected = true;
            cout << "接続: " << connectionString << endl;
        }

        void query(const string& sql) {
            cout << "クエリ実行: " << sql << endl;
        }

        ~Impl() {
            if (connected) {
                cout << "切断: " << connectionString << endl;
            }
        }
    };

    unique_ptr<Impl> pImpl; // 実装を隠蔽

public:
    Database(const string& cs) : pImpl(make_unique<Impl>(cs)) {}
    ~Database() = default; // unique_ptr が自動解放

    // ムーブは可能
    Database(Database&&) = default;
    Database& operator=(Database&&) = default;

    void connect() { pImpl->connect(); }
    void query(const string& sql) { pImpl->query(sql); }
};

int main() {
    Database db("localhost:5432/myapp");
    db.connect();
    db.query("SELECT * FROM users");
    db.query("INSERT INTO logs VALUES('login')");

    cout << "--- プログラム終了 ---" << endl;
    return 0;
}`}
          expectedOutput={`接続: localhost:5432/myapp
クエリ実行: SELECT * FROM users
クエリ実行: INSERT INTO logs VALUES('login')
--- プログラム終了 ---
切断: localhost:5432/myapp`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">所有権の判断フローチャート</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== スマートポインタ選択ガイド ===" << endl;
    cout << endl;
    cout << "Q: リソースの所有者は1人だけ？" << endl;
    cout << "  Yes → unique_ptr を使う" << endl;
    cout << "  No  → Q: 所有者の数は事前に分かる？" << endl;
    cout << "           Yes → shared_ptr を使う" << endl;
    cout << "           No  → shared_ptr を使う" << endl;
    cout << endl;
    cout << "Q: 循環参照の可能性がある？" << endl;
    cout << "  Yes → 片方を weak_ptr にする" << endl;
    cout << endl;
    cout << "Q: 関数パラメータでリソースを受け取る？" << endl;
    cout << "  所有権不要  → const T& または T*" << endl;
    cout << "  所有権移転  → unique_ptr<T>" << endl;
    cout << "  所有権共有  → shared_ptr<T>" << endl;
    cout << endl;
    cout << "Q: ファクトリ関数の戻り値は？" << endl;
    cout << "  → unique_ptr<T> が基本" << endl;
    cout << "    (必要ならshared_ptrに変換可能)" << endl;

    return 0;
}`}
          expectedOutput={`=== スマートポインタ選択ガイド ===

Q: リソースの所有者は1人だけ？
  Yes → unique_ptr を使う
  No  → Q: 所有者の数は事前に分かる？
           Yes → shared_ptr を使う
           No  → shared_ptr を使う

Q: 循環参照の可能性がある？
  Yes → 片方を weak_ptr にする

Q: 関数パラメータでリソースを受け取る？
  所有権不要  → const T& または T*
  所有権移転  → unique_ptr<T>
  所有権共有  → shared_ptr<T>

Q: ファクトリ関数の戻り値は？
  → unique_ptr<T> が基本
    (必要ならshared_ptrに変換可能)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="smartptr" lessonId="ownership-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="ownership-patterns" basePath="/learn/smartptr" />
    </div>
  );
}
