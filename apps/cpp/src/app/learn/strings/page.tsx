import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "std::stringとC文字列（char配列）の違いとして正しいものはどれですか？",
    options: [
      "std::stringは自動でメモリ管理され、長さを動的に変更できる",
      "C文字列の方が常に高速である",
      "std::stringはヌル終端文字を持たない",
      "C文字列は長さを自動で追跡できる",
    ],
    answer: 0,
    explanation:
      "std::stringはヒープメモリを自動管理し、文字列の追加・削除に応じてサイズを動的に変更します。C文字列はchar配列で固定サイズです。",
  },
  {
    question: "std::string_viewの主な利点は何ですか？",
    options: [
      "文字列のコピーを避けて軽量に参照できる",
      "文字列を変更できる",
      "メモリを自動で解放する",
      "マルチバイト文字のみに対応する",
    ],
    answer: 0,
    explanation:
      "std::string_viewは文字列データの非所有ビューで、コピーなしに文字列を参照できるためパフォーマンスが向上します。",
  },
  {
    question: "std::stringstreamの用途として正しいものはどれですか？",
    options: [
      "文字列から数値を解析したり、数値を文字列に変換できる",
      "ファイルの読み書きに使う",
      "ネットワーク通信に使う",
      "バイナリデータの操作に使う",
    ],
    answer: 0,
    explanation:
      "std::stringstreamはメモリ上の文字列をストリームとして扱い、数値の解析や文字列の構築に便利です。",
  },
  {
    question: "C++20のstd::formatの特徴として正しいものはどれですか？",
    options: [
      "Pythonのf-stringに似た書式指定ができる",
      "C++11から使える機能である",
      "printfより遅い",
      "整数のフォーマットには対応していない",
    ],
    answer: 0,
    explanation:
      "std::formatはC++20で導入され、Pythonのstr.formatに似た型安全なフォーマット機能を提供します。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++の文字列操作を学びましょう。std::stringの基本操作から、C文字列との相互変換、
          文字列ストリーム、C++17のstring_view、C++20のstd::formatまで幅広くカバーします。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="purple" categoryId="strings" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列操作の基本</h2>
        <p className="text-gray-400 mb-4">
          C++ではstd::stringを使った文字列操作が基本です。結合・検索・部分文字列の取得など豊富なメソッドが用意されています。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hello";
    string name = "World";

    // 文字列の結合
    string message = greeting + ", " + name + "!";
    cout << message << endl;

    // 長さの取得
    cout << "長さ: " << message.length() << endl;

    // 部分文字列
    cout << "部分: " << message.substr(0, 5) << endl;

    // 検索
    size_t pos = message.find("World");
    cout << "位置: " << pos << endl;

    return 0;
}`}
          expectedOutput={`Hello, World!
長さ: 13
部分: Hello
位置: 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列変換とストリーム</h2>
        <p className="text-gray-400 mb-4">
          数値と文字列の相互変換や、stringstreamを使った柔軟な文字列処理ができます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    // 数値から文字列へ
    int num = 42;
    string s = to_string(num);
    cout << "to_string: " << s << endl;

    // 文字列から数値へ
    string numStr = "3.14";
    double pi = stod(numStr);
    cout << "stod: " << pi << endl;

    // stringstreamで構築
    stringstream ss;
    ss << "名前: " << "太郎" << ", 年齢: " << 25;
    cout << ss.str() << endl;

    return 0;
}`}
          expectedOutput={`to_string: 42
stod: 3.14
名前: 太郎, 年齢: 25`}
        />
      </section>

      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
