import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("smartptr");

export default function UniquePtrPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">スマートポインタ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">unique_ptr</h1>
        <p className="text-gray-400">排他的所有権を持つスマートポインタの使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">unique_ptrとは</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::unique_ptr</code> は排他的所有権を持つスマートポインタです。
          あるリソースを所有する unique_ptr は一つだけで、コピーは禁止されています。
          ムーブ操作によって所有権を別の unique_ptr に移転できます。
          スコープを抜けると自動的にリソースが解放され、オーバーヘッドはほぼゼロです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">unique_ptrの基本</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

class Animal {
    string name;
public:
    Animal(const string& n) : name(n) {
        cout << name << " を作成" << endl;
    }
    ~Animal() {
        cout << name << " を破棄" << endl;
    }
    void speak() const {
        cout << name << " が鳴いている！" << endl;
    }
};

int main() {
    // make_unique で作成（推奨）
    auto cat = make_unique<Animal>("ネコ");
    cat->speak();

    // get() で生ポインタを取得（所有権は移らない）
    Animal* raw = cat.get();
    raw->speak();

    // bool変換で有効性チェック
    if (cat) {
        cout << "catは有効です" << endl;
    }

    // reset で手動解放
    cat.reset();
    cout << "catをリセットしました" << endl;

    if (!cat) {
        cout << "catは無効です" << endl;
    }

    return 0;
}`}
          expectedOutput={`ネコ を作成
ネコ が鳴いている！
ネコ が鳴いている！
catは有効です
ネコ を破棄
catをリセットしました
catは無効です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">所有権の移転（ムーブ）</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Task {
    string name;
public:
    Task(const string& n) : name(n) {}
    void run() const { cout << "実行: " << name << endl; }
};

// unique_ptr を受け取る関数（所有権を引き取る）
void executeTask(unique_ptr<Task> task) {
    task->run();
    // task はこのスコープで破棄される
}

int main() {
    auto task1 = make_unique<Task>("タスクA");

    // ムーブで所有権を移転
    auto task2 = move(task1);
    // task1 は nullptr になる

    cout << "task1は" << (task1 ? "有効" : "無効") << endl;
    cout << "task2は" << (task2 ? "有効" : "無効") << endl;

    // 関数に所有権を渡す
    executeTask(move(task2));
    cout << "task2は" << (task2 ? "有効" : "無効") << endl;

    // vector に unique_ptr を格納
    vector<unique_ptr<Task>> tasks;
    tasks.push_back(make_unique<Task>("タスクB"));
    tasks.push_back(make_unique<Task>("タスクC"));

    for (const auto& t : tasks) {
        t->run();
    }

    return 0;
}`}
          expectedOutput={`task1は無効
task2は有効
実行: タスクA
task2は無効
実行: タスクB
実行: タスクC`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="smartptr" lessonId="unique-ptr" />
      </div>
      <LessonNav lessons={lessons} currentId="unique-ptr" basePath="/learn/smartptr" />
    </div>
  );
}
