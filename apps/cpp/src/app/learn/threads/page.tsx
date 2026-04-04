import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

const quizQuestions: QuizQuestion[] = [
  {
    question: "std::threadを作成した後、必ず呼ぶべきメソッドはどれですか？",
    options: [
      "joinまたはdetach",
      "start",
      "run",
      "execute",
    ],
    answer: 0,
    explanation: "std::threadはデストラクタ呼び出し時にjoinもdetachもされていないとstd::terminateが呼ばれます。必ずjoin()かdetach()を呼ぶ必要があります。",
  },
  {
    question: "std::mutexの役割として正しいものはどれですか？",
    options: [
      "複数スレッドが同時に共有データにアクセスすることを防ぐ",
      "スレッドの優先度を制御する",
      "スレッドを一定時間停止させる",
      "スレッド間でメッセージを送受信する",
    ],
    answer: 0,
    explanation: "mutexは排他制御のためのプリミティブで、一度に1つのスレッドだけがロックを取得できます。これにより共有データへの同時アクセスを防ぎます。",
  },
  {
    question: "std::lock_guardの利点は何ですか？",
    options: [
      "スコープを抜けると自動的にロックが解放される",
      "複数のmutexを同時にロックできる",
      "ロックなしで安全にデータにアクセスできる",
      "デッドロックを完全に防止できる",
    ],
    answer: 0,
    explanation: "lock_guardはRAIIパターンに基づき、コンストラクタでロックを取得し、デストラクタで自動的に解放します。例外発生時もロック解放が保証されます。",
  },
  {
    question: "std::asyncについて正しいものはどれですか？",
    options: [
      "関数を非同期に実行し、std::futureで結果を取得できる",
      "必ず新しいスレッドを作成する",
      "戻り値を持てない",
      "例外を伝搬できない",
    ],
    answer: 0,
    explanation: "std::asyncは関数を非同期に実行し、結果をstd::futureオブジェクトで受け取れます。実行ポリシーによってはスレッドを作成せず遅延実行することもあります。",
  },
];

export default function ThreadsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">マルチスレッド</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のマルチスレッドプログラミングを学びましょう。std::threadによるスレッド作成、mutexによる排他制御、
          condition_variableによるスレッド間通信、future/promiseによる非同期処理など、並行プログラミングの基礎を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="threads" totalLessons={6} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/threads" color="violet" categoryId="threads" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スレッドの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          std::threadを使って別スレッドで関数を実行し、join()で完了を待つ基本パターンです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
using namespace std;

void hello(int id) {
    cout << "スレッド " << id << " が実行中" << endl;
}

int main() {
    thread t1(hello, 1);
    thread t2(hello, 2);

    t1.join();
    t2.join();

    cout << "全スレッド完了" << endl;
    return 0;
}`}
          expectedOutput={`スレッド 1 が実行中
スレッド 2 が実行中
全スレッド完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mutexによる排他制御</h2>
        <p className="text-gray-400 mb-4">
          共有データへのアクセスをmutexとlock_guardで保護する例です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex mtx;
int counter = 0;

void increment(int times) {
    for (int i = 0; i < times; i++) {
        lock_guard<mutex> lock(mtx);
        counter++;
    }
}

int main() {
    thread t1(increment, 1000);
    thread t2(increment, 1000);

    t1.join();
    t2.join();

    cout << "カウンタ: " << counter << endl;
    return 0;
}`}
          expectedOutput={`カウンタ: 2000`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
