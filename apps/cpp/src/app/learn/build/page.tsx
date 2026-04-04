import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++のコンパイルプロセスの正しい順序はどれですか？",
    options: [
      "前処理 → コンパイル → アセンブル → リンク",
      "コンパイル → 前処理 → リンク → アセンブル",
      "リンク → コンパイル → 前処理 → アセンブル",
      "前処理 → リンク → コンパイル → アセンブル",
    ],
    answer: 0,
    explanation: "C++のビルドは、プリプロセッサによる前処理、コンパイラによるアセンブリコード生成、アセンブラによるオブジェクトファイル生成、リンカによる実行ファイル生成の順で行われます。",
  },
  {
    question: "ヘッダファイル(.h)とソースファイル(.cpp)を分離する主な理由は何ですか？",
    options: [
      "宣言と実装を分離し、コンパイル時間の短縮と依存関係の管理を行うため",
      "実行速度が向上するため",
      "メモリ使用量が減るため",
      "C++の文法上必須であるため",
    ],
    answer: 0,
    explanation: "ヘッダとソースの分離により、変更があった.cppだけを再コンパイルすれば済むため、大規模プロジェクトでのビルド時間が短縮されます。",
  },
  {
    question: "CMakeの役割として正しいものはどれですか？",
    options: [
      "プラットフォームに依存しないビルド設定を記述し、各環境向けのビルドファイルを生成する",
      "C++コードを直接コンパイルする",
      "ソースコードのフォーマットを整える",
      "デバッグ情報を出力する",
    ],
    answer: 0,
    explanation: "CMakeはメタビルドシステムで、CMakeLists.txtからMakefileやVisual Studioプロジェクトなど、各プラットフォーム用のビルドファイルを生成します。",
  },
  {
    question: "静的リンクと動的リンクの違いとして正しいものはどれですか？",
    options: [
      "静的リンクはライブラリを実行ファイルに埋め込み、動的リンクは実行時にライブラリを読み込む",
      "静的リンクの方が常に高速である",
      "動的リンクはWindowsでのみ使える",
      "静的リンクではライブラリが不要である",
    ],
    answer: 0,
    explanation: "静的リンク(.a/.lib)はライブラリのコードを実行ファイルに含めます。動的リンク(.so/.dll)は実行時に共有ライブラリを読み込むため、ファイルサイズが小さくなります。",
  },
];

export default function BuildPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">コンパイル・ビルド</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のコンパイルとビルドの仕組みを学びましょう。前処理からリンクまでのコンパイルプロセス、ヘッダとソースの分離、
          MakefileやCMakeによるビルド自動化、静的・動的リンクの仕組みを理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="build" totalLessons={5} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/build" color="pink" categoryId="build" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパイルの流れ</h2>
        <p className="text-gray-400 mb-4">
          C++プログラムがソースコードから実行ファイルになるまでの各段階を確認しましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 1. 前処理: #includeが展開され、マクロが置換される
// 2. コンパイル: C++コードがアセンブリコードに変換される
// 3. アセンブル: アセンブリコードがオブジェクトファイル(.o)に変換される
// 4. リンク: オブジェクトファイルとライブラリが結合され実行ファイルになる

#define VERSION "1.0.0"

int main() {
    cout << "C++ Build Process Demo" << endl;
    cout << "バージョン: " << VERSION << endl;
    cout << endl;
    cout << "ビルドステップ:" << endl;
    cout << "1. 前処理 (Preprocessing)" << endl;
    cout << "2. コンパイル (Compilation)" << endl;
    cout << "3. アセンブル (Assembly)" << endl;
    cout << "4. リンク (Linking)" << endl;
    return 0;
}`}
          expectedOutput={`C++ Build Process Demo
バージョン: 1.0.0

ビルドステップ:
1. 前処理 (Preprocessing)
2. コンパイル (Compilation)
3. アセンブル (Assembly)
4. リンク (Linking)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ヘッダとソースの分離</h2>
        <p className="text-gray-400 mb-4">
          実際のプロジェクトでは宣言(.h)と実装(.cpp)を分離します。ここではその概念を1ファイルで示します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// === calculator.h に相当する部分（宣言） ===
class Calculator {
public:
    int add(int a, int b);
    int subtract(int a, int b);
    string describe();
};

// === calculator.cpp に相当する部分（実装） ===
int Calculator::add(int a, int b) {
    return a + b;
}

int Calculator::subtract(int a, int b) {
    return a - b;
}

string Calculator::describe() {
    return "シンプルな電卓クラス";
}

// === main.cpp に相当する部分 ===
int main() {
    Calculator calc;
    cout << calc.describe() << endl;
    cout << "3 + 5 = " << calc.add(3, 5) << endl;
    cout << "10 - 4 = " << calc.subtract(10, 4) << endl;
    return 0;
}`}
          expectedOutput={`シンプルな電卓クラス
3 + 5 = 8
10 - 4 = 6`}
        />
      </section>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
