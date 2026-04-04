import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function MutexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">マルチスレッド レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">mutex</h1>
        <p className="text-gray-400">std::mutexによる排他制御の基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">排他制御の必要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のスレッドが同じデータに同時にアクセスすると「データ競合（data race）」が起きます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::mutex</code> を使って
          一度に1つのスレッドだけがデータにアクセスできるようにします。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">lock()</code> でロックを取得し、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">unlock()</code> で解放します。
          ただし、直接lock/unlockを使うとunlock忘れのリスクがあるため、通常はlock_guardを使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mutexの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">mutexを使って共有カウンタを安全にインクリメントする例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex mtx;
int counter = 0;

void increment(int times) {
    for (int i = 0; i < times; i++) {
        mtx.lock();
        counter++;  // 排他制御された操作
        mtx.unlock();
    }
}

int main() {
    thread t1(increment, 10000);
    thread t2(increment, 10000);

    t1.join();
    t2.join();

    // mutexなしだと20000にならない可能性がある
    cout << "カウンタ: " << counter << endl;
    return 0;
}`}
          expectedOutput={`カウンタ: 20000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try_lockの使い方</h2>
        <p className="text-gray-400 mb-4">try_lock()はロックが取得できなかった場合にブロックせずfalseを返します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex mtx;

void tryWork(const string& name) {
    if (mtx.try_lock()) {
        cout << name << ": ロック取得成功" << endl;
        // 作業をシミュレート
        cout << name << ": 作業中..." << endl;
        mtx.unlock();
        cout << name << ": ロック解放" << endl;
    } else {
        cout << name << ": ロック取得失敗、別の処理を実行" << endl;
    }
}

int main() {
    // 手動でロック/アンロックを行う例
    mtx.lock();
    cout << "メイン: ロック取得" << endl;

    thread t(tryWork, "ワーカー");

    cout << "メイン: ロック解放" << endl;
    mtx.unlock();

    t.join();
    return 0;
}`}
          expectedOutput={`メイン: ロック取得
メイン: ロック解放
ワーカー: ロック取得成功
ワーカー: 作業中...
ワーカー: ロック解放`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="mutex" />
      </div>
      <LessonNav lessons={lessons} currentId="mutex" basePath="/learn/threads" />
    </div>
  );
}
