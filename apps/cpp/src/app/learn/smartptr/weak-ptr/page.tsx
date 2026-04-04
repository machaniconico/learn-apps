import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("smartptr");

export default function WeakPtrPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">スマートポインタ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">weak_ptr</h1>
        <p className="text-gray-400">循環参照を防ぐ弱い参照の使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">weak_ptrとは</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::weak_ptr</code> は shared_ptr が管理するリソースへの弱い参照です。
          参照カウントに影響を与えないため、循環参照を防ぐことができます。
          weak_ptr からリソースにアクセスするには <code className="text-pink-400">lock()</code> で
          shared_ptr に変換する必要があり、リソースが既に解放されていれば空の shared_ptr が返ります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">weak_ptrの基本</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

int main() {
    weak_ptr<int> wp;

    {
        auto sp = make_shared<int>(42);
        wp = sp;

        cout << "shared_ptr有効時:" << endl;
        cout << "  expired: " << boolalpha << wp.expired() << endl;
        cout << "  use_count: " << wp.use_count() << endl;

        // lock() で shared_ptr を取得
        if (auto locked = wp.lock()) {
            cout << "  値: " << *locked << endl;
        }
    }
    // sp が破棄された後

    cout << "shared_ptr破棄後:" << endl;
    cout << "  expired: " << boolalpha << wp.expired() << endl;
    cout << "  use_count: " << wp.use_count() << endl;

    if (auto locked = wp.lock()) {
        cout << "  値: " << *locked << endl;
    } else {
        cout << "  リソースは既に解放済み" << endl;
    }

    return 0;
}`}
          expectedOutput={`shared_ptr有効時:
  expired: false
  use_count: 1
  値: 42
shared_ptr破棄後:
  expired: true
  use_count: 0
  リソースは既に解放済み`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">循環参照の解決</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

struct Employee;

struct Team {
    string name;
    vector<weak_ptr<Employee>> members; // weak_ptr で循環参照を防ぐ

    Team(const string& n) : name(n) {
        cout << "チーム " << name << " 作成" << endl;
    }
    ~Team() {
        cout << "チーム " << name << " 破棄" << endl;
    }
};

struct Employee {
    string name;
    shared_ptr<Team> team;

    Employee(const string& n) : name(n) {
        cout << "社員 " << name << " 作成" << endl;
    }
    ~Employee() {
        cout << "社員 " << name << " 破棄" << endl;
    }
};

int main() {
    auto team = make_shared<Team>("開発部");
    auto emp1 = make_shared<Employee>("Alice");
    auto emp2 = make_shared<Employee>("Bob");

    // 相互参照を設定
    emp1->team = team;
    emp2->team = team;
    team->members.push_back(emp1);
    team->members.push_back(emp2);

    // メンバー一覧表示
    cout << "--- " << team->name << " のメンバー ---" << endl;
    for (const auto& wp : team->members) {
        if (auto sp = wp.lock()) {
            cout << "  " << sp->name << endl;
        }
    }

    cout << "--- スコープ終了 ---" << endl;
    return 0;
}`}
          expectedOutput={`チーム 開発部 作成
社員 Alice 作成
社員 Bob 作成
--- 開発部 のメンバー ---
  Alice
  Bob
--- スコープ終了 ---
社員 Bob 破棄
社員 Alice 破棄
チーム 開発部 破棄`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="smartptr" lessonId="weak-ptr" />
      </div>
      <LessonNav lessons={lessons} currentId="weak-ptr" basePath="/learn/smartptr" />
    </div>
  );
}
