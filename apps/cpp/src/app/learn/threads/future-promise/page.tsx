import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function FuturePromisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">マルチスレッド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">future・promise</h1>
        <p className="text-gray-400">std::futureとstd::promiseによる非同期結果の受け渡しを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">futureとpromise</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::promise</code> は値を設定する側、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::future</code> は値を受け取る側です。
          promiseで <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">set_value()</code> した値を、
          futureの <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">get()</code> で取得できます。
          get()は値が設定されるまでブロックします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">promiseとfutureの基本</h2>
        <p className="text-gray-400 mb-4">別スレッドで計算した結果をfutureで受け取る例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <future>
using namespace std;

void compute(promise<int> prom, int a, int b) {
    int result = a + b;
    cout << "計算中: " << a << " + " << b << endl;
    prom.set_value(result);  // 結果を設定
}

int main() {
    promise<int> prom;
    future<int> fut = prom.get_future();

    thread t(compute, move(prom), 42, 58);

    // get()は値が設定されるまでブロック
    int result = fut.get();
    cout << "結果: " << result << endl;

    t.join();
    return 0;
}`}
          expectedOutput={`計算中: 42 + 58
結果: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外の伝搬</h2>
        <p className="text-gray-400 mb-4">promiseを通じてスレッド間で例外を伝搬できます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <future>
#include <stdexcept>
using namespace std;

void riskyTask(promise<int> prom, int value) {
    try {
        if (value < 0) {
            throw runtime_error("負の値は処理できません");
        }
        prom.set_value(value * 2);
    } catch (...) {
        // 例外をpromiseに設定
        prom.set_exception(current_exception());
    }
}

int main() {
    // 正常ケース
    {
        promise<int> prom;
        future<int> fut = prom.get_future();
        thread t(riskyTask, move(prom), 10);
        cout << "正常: " << fut.get() << endl;
        t.join();
    }

    // 例外ケース
    {
        promise<int> prom;
        future<int> fut = prom.get_future();
        thread t(riskyTask, move(prom), -5);
        try {
            fut.get();
        } catch (const exception& e) {
            cout << "例外: " << e.what() << endl;
        }
        t.join();
    }

    return 0;
}`}
          expectedOutput={`正常: 20
例外: 負の値は処理できません`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="future-promise" />
      </div>
      <LessonNav lessons={lessons} currentId="future-promise" basePath="/learn/threads" />
    </div>
  );
}
