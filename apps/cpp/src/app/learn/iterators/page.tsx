import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("iterators");

const quizQuestions: QuizQuestion[] = [
  {
    question: "イテレータのbegin()が指すのはどこですか？",
    options: [
      "コンテナの最初の要素",
      "コンテナの最後の要素",
      "コンテナの最後の次の位置",
      "コンテナのサイズ",
    ],
    answer: 0,
    explanation: "begin()はコンテナの最初の要素を指すイテレータを返します。end()は最後の次の位置を指します。",
  },
  {
    question: "ランダムアクセスイテレータでできないことはどれですか？",
    options: [
      "ツリー構造の深さ優先探索",
      "it + n による任意位置への移動",
      "it1 - it2 による距離の計算",
      "it[n] による添字アクセス",
    ],
    answer: 0,
    explanation: "ランダムアクセスイテレータは任意位置への移動や添字アクセスが可能ですが、ツリー構造の探索はイテレータの種類に関係なく別のアルゴリズムが必要です。",
  },
  {
    question: "back_inserterの役割はどれですか？",
    options: [
      "コンテナの末尾に自動的に要素を追加する挿入イテレータを作る",
      "コンテナの先頭に要素を追加する",
      "コンテナの要素を逆順にする",
      "コンテナのサイズを事前に確保する",
    ],
    answer: 0,
    explanation: "back_inserterはpush_backを呼び出す挿入イテレータを作成し、出力先のコンテナに自動的に要素を追加します。",
  },
  {
    question: "rbegin()とrend()の組み合わせで何ができますか？",
    options: [
      "コンテナの要素を逆順に走査できる",
      "コンテナの要素をランダムに走査できる",
      "コンテナのサイズを取得できる",
      "コンテナの要素を削除できる",
    ],
    answer: 0,
    explanation: "rbegin()は最後の要素を指す逆イテレータ、rend()は最初の前を指す逆イテレータを返し、逆順の走査が可能です。",
  },
];

export default function IteratorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">イテレータ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のイテレータは、コンテナの要素にアクセスするための統一的なインターフェースです。
          基本概念からカテゴリ、挿入・ストリーム・逆イテレータ、カスタムイテレータの実装まで学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="iterators" totalLessons={6} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/iterators" color="purple" categoryId="iterators" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イテレータの基本概念</h2>
        <p className="text-gray-400 mb-4">
          イテレータはポインタに似たオブジェクトで、begin()とend()を使ってコンテナの要素を順番に走査します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    // イテレータで走査
    cout << "イテレータ: ";
    for (auto it = v.begin(); it != v.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    // 逆イテレータで走査
    cout << "逆順: ";
    for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
        cout << *rit << " ";
    }
    cout << endl;

    // イテレータで要素を変更
    for (auto it = v.begin(); it != v.end(); ++it) {
        *it *= 2;
    }
    cout << "2倍: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`イテレータ: 10 20 30 40 50
逆順: 50 40 30 20 10
2倍: 20 40 60 80 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">挿入イテレータの活用</h2>
        <p className="text-gray-400 mb-4">
          back_inserterを使うと、出力先コンテナのサイズを事前に確保せずにアルゴリズムの結果を格納できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5, 6, 7, 8};
    vector<int> evens;

    // back_inserterで偶数だけコピー
    copy_if(src.begin(), src.end(), back_inserter(evens),
            [](int x) { return x % 2 == 0; });

    cout << "偶数: ";
    for (int x : evens) cout << x << " ";
    cout << endl;
    cout << "要素数: " << evens.size() << endl;

    return 0;
}`}
          expectedOutput={`偶数: 2 4 6 8
要素数: 4`}
        />
      </section>

      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
