import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("smartptr");

export default function SharedPtrPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">スマートポインタ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">shared_ptr</h1>
        <p className="text-gray-400">共有所有権を持つ参照カウント方式のスマートポインタを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">shared_ptrとは</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::shared_ptr</code> は参照カウント方式の共有所有権スマートポインタです。
          複数の shared_ptr が同じリソースを共有でき、最後の shared_ptr が破棄されたときにリソースが解放されます。
          <code className="text-pink-400">use_count()</code> で現在の参照カウントを確認できます。
          unique_ptr よりオーバーヘッドがありますが、共有が必要な場面で使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">shared_ptrの基本</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

class Connection {
    string name;
public:
    Connection(const string& n) : name(n) {
        cout << name << " 接続開始" << endl;
    }
    ~Connection() {
        cout << name << " 接続終了" << endl;
    }
    void send(const string& msg) const {
        cout << name << " 送信: " << msg << endl;
    }
};

int main() {
    auto conn = make_shared<Connection>("DB");
    cout << "参照カウント: " << conn.use_count() << endl;

    {
        // コピーで共有
        auto conn2 = conn;
        cout << "参照カウント: " << conn.use_count() << endl;

        conn2->send("SELECT * FROM users");

        {
            auto conn3 = conn;
            cout << "参照カウント: " << conn.use_count() << endl;
        }
        // conn3 が破棄 → カウント減少
        cout << "参照カウント: " << conn.use_count() << endl;
    }
    // conn2 が破棄 → カウント減少
    cout << "参照カウント: " << conn.use_count() << endl;

    conn->send("COMMIT");

    return 0;
}`}
          expectedOutput={`DB 接続開始
参照カウント: 1
参照カウント: 2
DB 送信: SELECT * FROM users
参照カウント: 3
参照カウント: 2
参照カウント: 1
DB 送信: COMMIT
DB 接続終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">shared_ptrの共有パターン</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Config {
    string data;
public:
    Config(const string& d) : data(d) {}
    string getData() const { return data; }
};

class Service {
    string name;
    shared_ptr<Config> config;
public:
    Service(const string& n, shared_ptr<Config> cfg)
        : name(n), config(cfg) {}

    void showConfig() const {
        cout << name << " の設定: " << config->getData()
             << " (参照数: " << config.use_count() << ")" << endl;
    }
};

int main() {
    // 共有設定オブジェクト
    auto config = make_shared<Config>("production");

    // 複数のサービスが同じ設定を共有
    vector<Service> services;
    services.emplace_back("Web", config);
    services.emplace_back("API", config);
    services.emplace_back("Worker", config);

    for (const auto& svc : services) {
        svc.showConfig();
    }

    cout << "合計参照カウント: " << config.use_count() << endl;

    return 0;
}`}
          expectedOutput={`Web の設定: production (参照数: 4)
API の設定: production (参照数: 4)
Worker の設定: production (参照数: 4)
合計参照カウント: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="smartptr" lessonId="shared-ptr" />
      </div>
      <LessonNav lessons={lessons} currentId="shared-ptr" basePath="/learn/smartptr" />
    </div>
  );
}
