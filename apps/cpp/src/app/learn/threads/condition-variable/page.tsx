import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function ConditionVariablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">マルチスレッド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件変数</h1>
        <p className="text-gray-400">std::condition_variableによるスレッド間の通知と待機を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::condition_variable</code> は
          あるスレッドが条件を満たすまで別のスレッドを待機させる仕組みです。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">wait()</code> で条件が成立するまでブロックし、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">notify_one()</code> や
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">notify_all()</code> で待機中のスレッドを起こします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">生産者-消費者パターン</h2>
        <p className="text-gray-400 mb-4">条件変数を使った典型的な生産者-消費者パターンの例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
using namespace std;

mutex mtx;
condition_variable cv;
queue<int> dataQueue;
bool finished = false;

void producer() {
    for (int i = 1; i <= 5; i++) {
        {
            lock_guard<mutex> lock(mtx);
            dataQueue.push(i);
            cout << "生産: " << i << endl;
        }
        cv.notify_one();  // 消費者に通知
    }
    {
        lock_guard<mutex> lock(mtx);
        finished = true;
    }
    cv.notify_one();
}

void consumer() {
    while (true) {
        unique_lock<mutex> lock(mtx);
        cv.wait(lock, []{ return !dataQueue.empty() || finished; });

        while (!dataQueue.empty()) {
            cout << "消費: " << dataQueue.front() << endl;
            dataQueue.pop();
        }

        if (finished && dataQueue.empty()) break;
    }
}

int main() {
    thread prod(producer);
    thread cons(consumer);

    prod.join();
    cons.join();

    cout << "完了" << endl;
    return 0;
}`}
          expectedOutput={`生産: 1
生産: 2
生産: 3
生産: 4
生産: 5
消費: 1
消費: 2
消費: 3
消費: 4
消費: 5
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">notify_allの例</h2>
        <p className="text-gray-400 mb-4">notify_all()で複数の待機スレッドを同時に起こす例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <vector>
using namespace std;

mutex mtx;
condition_variable cv;
bool ready = false;

void worker(int id) {
    unique_lock<mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
    cout << "ワーカー " << id << " 開始" << endl;
}

int main() {
    vector<thread> workers;
    for (int i = 0; i < 3; i++) {
        workers.emplace_back(worker, i);
    }

    cout << "準備中..." << endl;
    {
        lock_guard<mutex> lock(mtx);
        ready = true;
    }
    cout << "全ワーカーに通知" << endl;
    cv.notify_all();

    for (auto& w : workers) w.join();
    cout << "全ワーカー完了" << endl;
    return 0;
}`}
          expectedOutput={`準備中...
全ワーカーに通知
ワーカー 0 開始
ワーカー 1 開始
ワーカー 2 開始
全ワーカー完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="condition-variable" />
      </div>
      <LessonNav lessons={lessons} currentId="condition-variable" basePath="/learn/threads" />
    </div>
  );
}
