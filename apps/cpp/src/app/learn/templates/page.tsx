import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("templates");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++のテンプレートについて正しいものはどれですか？",
    options: [
      "コンパイル時に具体的な型で実体化される",
      "実行時に型が決定される",
      "テンプレートはクラスにのみ使える",
      "テンプレートでは参照型を使えない",
    ],
    answer: 0,
    explanation: "テンプレートはコンパイル時にテンプレート引数に基づいて具体的なコードが生成（実体化）されます。",
  },
  {
    question: "テンプレート特殊化の目的として正しいものはどれですか？",
    options: [
      "特定の型に対して異なる実装を提供する",
      "テンプレートの使用を禁止する",
      "コンパイル時間を短縮する",
      "テンプレートを実行時に解決する",
    ],
    answer: 0,
    explanation: "テンプレート特殊化を使うと、特定の型に対してデフォルトとは異なる専用の実装を提供できます。",
  },
  {
    question: "C++20のコンセプト（concepts）の主な役割はどれですか？",
    options: [
      "テンプレート引数に対する制約を名前付きで定義する",
      "クラスの継承関係を定義する",
      "実行時の型チェックを行う",
      "メモリアロケーションを制御する",
    ],
    answer: 0,
    explanation: "コンセプトはテンプレート引数が満たすべき要件を名前付きの制約として定義し、読みやすいエラーメッセージを実現します。",
  },
  {
    question: "SFINAEとは何ですか？",
    options: [
      "置換失敗はエラーではないという原則",
      "テンプレートの再帰展開の制限",
      "静的アサーションの仕組み",
      "コンパイル時の最適化手法",
    ],
    answer: 0,
    explanation: "SFINAE（Substitution Failure Is Not An Error）は、テンプレート引数の置換に失敗しても即座にコンパイルエラーとせず、他の候補を探す仕組みです。",
  },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">テンプレート</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++テンプレートを学びましょう。関数テンプレート・クラステンプレート・特殊化・可変引数テンプレート・コンセプト・SFINAEなど、
          型に依存しない汎用プログラミングの技法を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="templates" totalLessons={6} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/templates" color="pink" categoryId="templates" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートの概要</h2>
        <p className="text-gray-400 mb-4">
          テンプレートを使うと、型をパラメータ化した汎用的なコードを記述できます。コンパイル時に具体的な型で実体化されます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 関数テンプレート
template <typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}

// クラステンプレート
template <typename T>
class Pair {
    T first, second;
public:
    Pair(T a, T b) : first(a), second(b) {}
    T getFirst() const { return first; }
    T getSecond() const { return second; }
};

int main() {
    cout << "max(3, 7) = " << maxValue(3, 7) << endl;
    cout << "max(3.14, 2.71) = " << maxValue(3.14, 2.71) << endl;

    Pair<string> p("Hello", "World");
    cout << p.getFirst() << " " << p.getSecond() << endl;

    return 0;
}`}
          expectedOutput={`max(3, 7) = 7
max(3.14, 2.71) = 3.14
Hello World`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンセプトによる制約</h2>
        <p className="text-gray-400 mb-4">
          C++20のコンセプトを使うと、テンプレート引数に制約を付けて型安全性を高められます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <concepts>
using namespace std;

// コンセプトの定義
template <typename T>
concept Numeric = integral<T> || floating_point<T>;

// コンセプトで制約した関数
template <Numeric T>
T add(T a, T b) {
    return a + b;
}

int main() {
    cout << "add(3, 4) = " << add(3, 4) << endl;
    cout << "add(1.5, 2.5) = " << add(1.5, 2.5) << endl;

    // add("a", "b"); // コンパイルエラー: stringはNumericを満たさない

    return 0;
}`}
          expectedOutput={`add(3, 4) = 7
add(1.5, 2.5) = 4`}
        />
      </section>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
