import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

const quizQuestions: QuizQuestion[] = [
  {
    question: "std::vector と C配列の最大の違いはどれですか？",
    options: [
      "C配列の方が高速",
      "vectorは動的にサイズを変更できる",
      "C配列はヒープに確保される",
      "vectorはポインタを使えない",
    ],
    answer: 1,
    explanation: "std::vector は動的配列で、要素の追加・削除に応じてサイズが自動で変更されます。C配列はコンパイル時にサイズが固定されます。",
  },
  {
    question: "std::array<int, 5> arr; の 5 は何を表していますか？",
    options: [
      "配列の初期値",
      "配列の要素数（コンパイル時定数）",
      "配列の最大容量",
      "配列のインデックス開始値",
    ],
    answer: 1,
    explanation: "std::array のテンプレート引数の2つ目はコンパイル時に決まる要素数です。C配列と同じく固定サイズですが、サイズ情報を保持し安全に扱えます。",
  },
  {
    question: "vector の push_back と emplace_back の違いはどれですか？",
    options: [
      "push_back は要素を先頭に追加する",
      "emplace_back は要素をその場で構築し、コピーを避ける",
      "push_back の方が常に高速",
      "emplace_back はプリミティブ型でのみ使える",
    ],
    answer: 1,
    explanation: "emplace_back はコンストラクタの引数を直接渡し、要素をコンテナ内でその場で構築します。push_back は一時オブジェクトを構築してからコピーまたはムーブします。",
  },
  {
    question: "std::span の特徴として正しいものはどれですか？",
    options: [
      "独自にメモリを確保して要素を保持する",
      "配列やvectorへの非所有ビューで、メモリを所有しない",
      "C++11で導入された機能",
      "要素の追加・削除ができる",
    ],
    answer: 1,
    explanation: "std::span（C++20）はメモリの連続範囲への非所有ビューです。配列・vector・std::array など様々なコンテナを統一的に参照でき、サイズ情報も保持します。",
  },
];

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">配列・ベクター</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++で複数のデータをまとめて扱う配列とベクターを学びます。
          C配列・std::array・std::vectorの使い分けから、多次元配列・
          アルゴリズム・std::span・初期化子リストまで幅広くカバーします。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="arrays" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/arrays" color="green" categoryId="arrays" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の概要</h2>
        <p className="text-gray-400 mb-4">
          C++には複数の配列型があります。
          C言語から受け継いだ <code className="text-green-400">int arr[]</code>、
          固定サイズの <code className="text-green-400">std::array</code>、
          動的サイズの <code className="text-green-400">std::vector</code> が代表的です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <array>
#include <vector>
using namespace std;

int main() {
    // C配列
    int cArr[] = {1, 2, 3};
    cout << "C配列: ";
    for (int x : cArr) cout << x << " ";
    cout << endl;

    // std::array
    array<int, 4> stdArr = {10, 20, 30, 40};
    cout << "std::array (size=" << stdArr.size() << "): ";
    for (int x : stdArr) cout << x << " ";
    cout << endl;

    // std::vector
    vector<int> vec = {100, 200, 300};
    vec.push_back(400);
    cout << "vector (size=" << vec.size() << "): ";
    for (int x : vec) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`C配列: 1 2 3
std::array (size=4): 10 20 30 40
vector (size=4): 100 200 300 400`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">vectorの操作とアルゴリズム</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400">std::vector</code> は要素の追加・削除が自在で、
          <code className="text-green-400">&lt;algorithm&gt;</code> ヘッダのソート・検索関数とも相性が良いです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};

    // ソート
    sort(v.begin(), v.end());
    cout << "ソート後: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // 逆順
    reverse(v.begin(), v.end());
    cout << "逆順: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // 検索
    auto it = find(v.begin(), v.end(), 5);
    if (it != v.end()) {
        cout << "5 はインデックス " << distance(v.begin(), it) << " にあります" << endl;
    }

    return 0;
}`}
          expectedOutput={`ソート後: 1 2 3 5 8 9
逆順: 9 8 5 3 2 1
5 はインデックス 2 にあります`}
        />
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
