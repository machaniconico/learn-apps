import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ラムダ式のキャプチャで [=] は何を意味しますか？",
    options: [
      "外側のすべての変数を値でキャプチャする",
      "外側のすべての変数を参照でキャプチャする",
      "何もキャプチャしない",
      "thisポインタのみキャプチャする",
    ],
    answer: 0,
    explanation:
      "[=] はデフォルトで値キャプチャを指定し、ラムダ内で使用される外側の変数をすべてコピーします。[&] は参照キャプチャです。",
  },
  {
    question: "ジェネリックラムダについて正しいものはどれですか？",
    options: [
      "パラメータにautoを使うことで任意の型を受け取れる",
      "C++11で導入された機能である",
      "戻り値の型を必ず指定する必要がある",
      "テンプレート関数より常に低速である",
    ],
    answer: 0,
    explanation:
      "ジェネリックラムダはC++14で導入され、パラメータ型にautoを指定することで型に依存しない汎用的なラムダを定義できます。",
  },
  {
    question: "std::functionの役割として正しいものはどれですか？",
    options: [
      "関数ポインタ・ラムダ・関数オブジェクトを統一的に格納できる型消去ラッパー",
      "ラムダ式を自動的にインライン展開する仕組み",
      "関数の引数を自動的に型変換する機能",
      "コンパイル時に関数の正しさを検証する仕組み",
    ],
    answer: 0,
    explanation:
      "std::functionは呼び出し可能なオブジェクト（関数ポインタ、ラムダ、ファンクタ）を統一的に格納・呼び出しできる型消去ラッパーです。",
  },
  {
    question: "STLアルゴリズムでラムダを使う利点として最も適切なものはどれですか？",
    options: [
      "処理のカスタマイズをインラインで簡潔に記述できる",
      "アルゴリズムの実行速度が必ず向上する",
      "メモリ使用量が常に削減される",
      "コンパイル時間が短縮される",
    ],
    answer: 0,
    explanation:
      "ラムダをSTLアルゴリズムに渡すことで、別途関数やファンクタを定義せずに処理をその場で簡潔に記述できます。",
  },
];

export default function LambdaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">ラムダ・関数オブジェクト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のラムダ式と関数オブジェクトを学びましょう。ラムダの構文・キャプチャ・ジェネリックラムダ・std::function・
          ファンクタ・STLアルゴリズムとの組み合わせなど、モダンC++の関数型プログラミング要素を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="lambda" totalLessons={6} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/lambda" color="cyan" categoryId="lambda" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式の概要</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式は無名関数をその場で定義できる機能です。C++11で導入され、STLアルゴリズムとの組み合わせで威力を発揮します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 基本的なラムダ式
    auto greet = []() { cout << "Hello Lambda!" << endl; };
    greet();

    // 引数付きラムダ
    auto add = [](int a, int b) { return a + b; };
    cout << "3 + 5 = " << add(3, 5) << endl;

    // キャプチャ付きラムダ
    int factor = 10;
    auto multiply = [factor](int x) { return x * factor; };
    cout << "7 * 10 = " << multiply(7) << endl;

    return 0;
}`}
          expectedOutput={`Hello Lambda!
3 + 5 = 8
7 * 10 = 70`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">STLアルゴリズムとの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式はsort、for_each、countなどのSTLアルゴリズムに渡して柔軟なカスタマイズができます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {5, 2, 8, 1, 9, 3};

    // ラムダでソート（降順）
    sort(nums.begin(), nums.end(), [](int a, int b) {
        return a > b;
    });

    cout << "降順: ";
    for_each(nums.begin(), nums.end(), [](int n) {
        cout << n << " ";
    });
    cout << endl;

    // 条件カウント
    int count = count_if(nums.begin(), nums.end(), [](int n) {
        return n >= 5;
    });
    cout << "5以上の数: " << count << "個" << endl;

    return 0;
}`}
          expectedOutput={`降順: 9 8 5 3 2 1
5以上の数: 3個`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
