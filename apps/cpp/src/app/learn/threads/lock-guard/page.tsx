import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function LockGuardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">マルチスレッド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">lock_guard</h1>
        <p className="text-gray-400">RAIIベースのロック管理でより安全な排他制御を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RAIIによるロック管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::lock_guard</code> はコンストラクタでmutexをロックし、
          デストラクタで自動的にアンロックします。例外が発生してもスコープを抜ければロックが解放されるため安全です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C++17では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::scoped_lock</code> も使えます。
          これは複数のmutexを同時にデッドロックなくロックできます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">lock_guardの基本</h2>
        <p className="text-gray-400 mb-4">スコープベースで安全にロックを管理する例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

mutex mtx;
vector<string> logs;

void addLog(const string& msg) {
    // lock_guardでスコープ内を自動ロック
    lock_guard<mutex> lock(mtx);
    logs.push_back(msg);
    // スコープを抜けると自動的にunlock
}

int main() {
    thread t1([](){ addLog("スレッド1: 開始"); });
    thread t2([](){ addLog("スレッド2: 開始"); });
    thread t3([](){ addLog("スレッド3: 開始"); });

    t1.join();
    t2.join();
    t3.join();

    cout << "ログ件数: " << logs.size() << endl;
    for (const auto& log : logs) {
        cout << log << endl;
    }
    return 0;
}`}
          expectedOutput={`ログ件数: 3
スレッド1: 開始
スレッド2: 開始
スレッド3: 開始`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">unique_lockとscoped_lock</h2>
        <p className="text-gray-400 mb-4">unique_lockはより柔軟なロック管理を、scoped_lockは複数mutexの同時ロックを提供します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex mtx1, mtx2;
int resourceA = 0, resourceB = 0;

void transferAtoB(int amount) {
    // scoped_lockで複数mutexを同時にロック（デッドロック回避）
    scoped_lock lock(mtx1, mtx2);
    resourceA -= amount;
    resourceB += amount;
    cout << "A→B転送: " << amount << endl;
}

void transferBtoA(int amount) {
    scoped_lock lock(mtx1, mtx2);
    resourceB -= amount;
    resourceA += amount;
    cout << "B→A転送: " << amount << endl;
}

int main() {
    resourceA = 100;
    resourceB = 50;

    thread t1(transferAtoB, 30);
    thread t2(transferBtoA, 20);

    t1.join();
    t2.join();

    cout << "リソースA: " << resourceA << endl;
    cout << "リソースB: " << resourceB << endl;
    return 0;
}`}
          expectedOutput={`A→B転送: 30
B→A転送: 20
リソースA: 90
リソースB: 60`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="lock-guard" />
      </div>
      <LessonNav lessons={lessons} currentId="lock-guard" basePath="/learn/threads" />
    </div>
  );
}
