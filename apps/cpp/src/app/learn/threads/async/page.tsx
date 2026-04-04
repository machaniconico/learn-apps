import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function AsyncPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">マルチスレッド レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::async</h1>
        <p className="text-gray-400">std::asyncによる手軽な非同期タスク実行を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::asyncとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::async</code> は関数を非同期に実行し、
          結果を <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::future</code> で受け取る便利な関数です。
          thread + promise/futureの組み合わせをシンプルに書けます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          実行ポリシーとして <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">launch::async</code>（新スレッド）と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">launch::deferred</code>（遅延実行）を指定できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">asyncの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">非同期に関数を実行し、futureで結果を取得する例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <future>
#include <string>
using namespace std;

int heavyComputation(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

string formatResult(const string& label, int value) {
    return label + ": " + to_string(value);
}

int main() {
    // 非同期に計算を実行
    auto fut1 = async(launch::async, heavyComputation, 100);
    auto fut2 = async(launch::async, heavyComputation, 200);

    // 両方の結果を取得
    int r1 = fut1.get();
    int r2 = fut2.get();

    cout << formatResult("1〜100の合計", r1) << endl;
    cout << formatResult("1〜200の合計", r2) << endl;

    return 0;
}`}
          expectedOutput={`1〜100の合計: 5050
1〜200の合計: 20100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">launch::deferredによる遅延実行</h2>
        <p className="text-gray-400 mb-4">deferredポリシーではget()が呼ばれるまで実行が遅延されます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <future>
using namespace std;

int compute(const string& name) {
    cout << name << " を計算中" << endl;
    return 42;
}

int main() {
    // deferred: get()を呼ぶまで実行されない
    auto deferred = async(launch::deferred, compute, "遅延タスク");
    cout << "まだ実行されていない" << endl;
    cout << "結果: " << deferred.get() << endl;

    cout << endl;

    // async: 即座に実行開始
    auto eager = async(launch::async, compute, "即時タスク");
    cout << "asyncは即座に開始" << endl;
    cout << "結果: " << eager.get() << endl;

    return 0;
}`}
          expectedOutput={`まだ実行されていない
遅延タスク を計算中
結果: 42

即時タスク を計算中
asyncは即座に開始
結果: 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の非同期タスクの並行実行</h2>
        <p className="text-gray-400 mb-4">複数のタスクを並行して実行し、すべての結果を集約する例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <future>
#include <vector>
#include <numeric>
using namespace std;

long long partialSum(int start, int end) {
    long long sum = 0;
    for (int i = start; i <= end; i++) {
        sum += i;
    }
    return sum;
}

int main() {
    // 1〜1000000の合計を4つのタスクに分割
    vector<future<long long>> futures;
    futures.push_back(async(launch::async, partialSum, 1, 250000));
    futures.push_back(async(launch::async, partialSum, 250001, 500000));
    futures.push_back(async(launch::async, partialSum, 500001, 750000));
    futures.push_back(async(launch::async, partialSum, 750001, 1000000));

    long long total = 0;
    for (auto& f : futures) {
        total += f.get();
    }

    cout << "1〜1000000の合計: " << total << endl;
    return 0;
}`}
          expectedOutput={`1〜1000000の合計: 500000500000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="async" />
      </div>
      <LessonNav lessons={lessons} currentId="async" basePath="/learn/threads" />
    </div>
  );
}
