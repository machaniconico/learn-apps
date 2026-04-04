import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++でコンソールに文字列を出力するために使うのはどれですか？",
    options: [
      "printf()",
      "Console.WriteLine()",
      "std::cout <<",
      "print()",
    ],
    answer: 2,
    explanation: "C++では std::cout << を使って標準出力に文字列や値を出力します。printf()はC言語由来の関数で使えますが、C++ではcoutが標準的です。",
  },
  {
    question: "C++で変数を宣言する正しい構文はどれですか？",
    options: [
      "var x = 10;",
      "let x = 10;",
      "int x = 10;",
      "x := 10;",
    ],
    answer: 2,
    explanation: "C++では型名を先に書いて変数を宣言します。int x = 10; のように「型 変数名 = 値;」の形式が基本です。",
  },
  {
    question: "C++の基本データ型でないものはどれですか？",
    options: [
      "int",
      "double",
      "string",
      "bool",
    ],
    answer: 2,
    explanation: "stringはC++の基本データ型ではなく、標準ライブラリのstd::stringクラスです。int, double, boolは組み込みの基本データ型です。",
  },
  {
    question: "autoキーワードについて正しい説明はどれですか？",
    options: [
      "変数の型が実行時に動的に変わる",
      "コンパイラが初期化式から型を自動推論する",
      "JavaScriptのvarと同じで型がない",
      "関数の戻り値の型にだけ使える",
    ],
    answer: 1,
    explanation: "autoはC++11で導入され、コンパイル時に初期化式から型を推論します。一度推論された型は変更できず、型安全性は保たれます。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">C++基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++プログラミングの基礎を学びましょう。変数・データ型・演算子・入出力・コメントなど、すべてのC++プログラムの土台となる概念を丁寧に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C++の基本構造</h2>
        <p className="text-gray-400 mb-4">
          C++プログラムは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#include</code> でヘッダファイルを読み込み、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">main()</code> 関数からプログラムが始まります。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::cout</code> で標準出力に表示します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // 変数の宣言と初期化
    std::string name = "C++";
    int version = 23;
    bool isModern = true;

    // coutで出力
    std::cout << "言語: " << name << std::endl;
    std::cout << "標準: C++" << version << std::endl;
    std::cout << "モダン: " << std::boolalpha << isModern << std::endl;

    return 0;
}`}
          expectedOutput={`言語: C++
標準: C++23
モダン: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">auto推論と基本型</h2>
        <p className="text-gray-400 mb-4">
          C++11以降では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">auto</code> キーワードで
          コンパイラに型を推論させることができます。明示的な型指定と使い分けましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // 明示的な型指定
    int count = 42;
    double pi = 3.14159;
    std::string greeting = "Hello";

    // auto による型推論
    auto number = 100;          // int と推論
    auto rate = 0.75;           // double と推論
    auto message = std::string("World");  // std::string と推論

    std::cout << count << ", " << pi << ", " << greeting << std::endl;
    std::cout << number << ", " << rate << ", " << message << std::endl;

    return 0;
}`}
          expectedOutput={`42, 3.14159, Hello
100, 0.75, World`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
