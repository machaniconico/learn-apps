import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function ThreadBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">マルチスレッド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スレッドの基本</h1>
        <p className="text-gray-400">std::threadの作成・結合・デタッチの基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::threadとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::thread</code> はC++11で導入されたスレッドクラスです。
          コンストラクタに関数（またはラムダ）を渡すことで、別スレッドで処理を実行できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          作成したスレッドは必ず <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">join()</code> で完了を待つか、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">detach()</code> で切り離す必要があります。
          どちらも呼ばずにスレッドオブジェクトが破棄されると <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::terminate</code> が呼ばれます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スレッドの作成とjoin</h2>
        <p className="text-gray-400 mb-4">関数を別スレッドで実行し、join()で完了を待つ基本的な例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
using namespace std;

void printMessage(const string& msg, int count) {
    for (int i = 0; i < count; i++) {
        cout << msg << " (" << i + 1 << ")" << endl;
    }
}

int main() {
    // スレッドを作成（関数と引数を渡す）
    thread t1(printMessage, "スレッドA", 3);
    thread t2(printMessage, "スレッドB", 2);

    // join()で各スレッドの完了を待つ
    t1.join();
    t2.join();

    cout << "全スレッド完了" << endl;
    return 0;
}`}
          expectedOutput={`スレッドA (1)
スレッドA (2)
スレッドA (3)
スレッドB (1)
スレッドB (2)
全スレッド完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式でスレッドを作成</h2>
        <p className="text-gray-400 mb-4">ラムダ式を使ってスレッドを作成する方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <vector>
using namespace std;

int main() {
    vector<thread> threads;

    // ラムダ式でスレッドを作成
    for (int i = 0; i < 3; i++) {
        threads.emplace_back([i]() {
            cout << "スレッド " << i << " のID: "
                 << this_thread::get_id() << endl;
        });
    }

    // 全スレッドをjoin
    for (auto& t : threads) {
        t.join();
    }

    cout << "メインスレッドID: "
         << this_thread::get_id() << endl;
    return 0;
}`}
          expectedOutput={`スレッド 0 のID: 1
スレッド 1 のID: 2
スレッド 2 のID: 3
メインスレッドID: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ハードウェア並行数の確認</h2>
        <p className="text-gray-400 mb-4">実行環境のCPUコア数を取得できます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
using namespace std;

int main() {
    unsigned int cores = thread::hardware_concurrency();
    cout << "利用可能なコア数: " << cores << endl;

    // joinableのチェック
    thread t([]() {
        cout << "スレッド実行中" << endl;
    });

    cout << "joinable: " << (t.joinable() ? "true" : "false") << endl;
    t.join();
    cout << "join後 joinable: " << (t.joinable() ? "true" : "false") << endl;

    return 0;
}`}
          expectedOutput={`利用可能なコア数: 4
joinable: true
スレッド実行中
join後 joinable: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/threads" />
    </div>
  );
}
