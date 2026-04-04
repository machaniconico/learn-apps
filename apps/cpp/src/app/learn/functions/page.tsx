import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++の関数オーバーロードの条件として正しいものはどれですか？",
    options: [
      "引数の型または数が異なれば同名の関数を定義できる",
      "戻り値の型が異なれば同名の関数を定義できる",
      "名前空間が同じでは同名関数は定義できない",
      "テンプレート関数でしかオーバーロードできない",
    ],
    answer: 0,
    explanation: "関数オーバーロードは引数の型・数・順番が異なる場合に同名の関数を定義できます。戻り値の型だけでは区別できません。",
  },
  {
    question: "デフォルト引数について正しいものはどれですか？",
    options: [
      "右端のパラメータから順にデフォルト値を設定する必要がある",
      "左端のパラメータから順にデフォルト値を設定する",
      "任意の位置のパラメータにデフォルト値を設定できる",
      "デフォルト引数は1つしか設定できない",
    ],
    answer: 0,
    explanation: "デフォルト引数は右端のパラメータから連続して設定する必要があります。途中のパラメータだけスキップすることはできません。",
  },
  {
    question: "inline関数について正しいものはどれですか？",
    options: [
      "コンパイラへのインライン展開のヒントであり、必ず展開されるわけではない",
      "必ずインライン展開される",
      "再帰関数もインライン展開される",
      "ヘッダファイルに書いてはいけない",
    ],
    answer: 0,
    explanation: "inlineはコンパイラへの「ヒント」であり、関数呼び出しのオーバーヘッドを減らす最適化を提案しますが、コンパイラが判断します。",
  },
  {
    question: "関数ポインタについて正しいものはどれですか？",
    options: [
      "関数のアドレスを変数に格納し、間接的に呼び出せる",
      "関数ポインタは配列に格納できない",
      "関数ポインタは引数として渡せない",
      "関数ポインタはvoid関数にしか使えない",
    ],
    answer: 0,
    explanation: "関数ポインタは関数のアドレスを保持する変数で、配列に格納したり、他の関数に引数として渡したりできます。",
  },
];

export default function FunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++の関数を学びましょう。関数の定義・引数・戻り値・オーバーロード・デフォルト引数・インライン関数・再帰・関数ポインタなど、
          コードを再利用可能にする基本を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="functions" totalLessons={8} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functions" color="teal" categoryId="functions" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の基本構造</h2>
        <p className="text-gray-400 mb-4">
          C++の関数は戻り値の型、関数名、引数リスト、関数本体で構成されます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 関数の定義
int add(int a, int b) {
    return a + b;
}

// voidの関数（戻り値なし）
void greet(const string& name) {
    cout << "こんにちは、" << name << "さん！" << endl;
}

int main() {
    int result = add(3, 5);
    cout << "3 + 5 = " << result << endl;

    greet("太郎");

    // 関数の戻り値を直接使う
    cout << "10 + 20 = " << add(10, 20) << endl;

    return 0;
}`}
          expectedOutput={`3 + 5 = 8
こんにちは、太郎さん！
10 + 20 = 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">オーバーロードとデフォルト引数</h2>
        <p className="text-gray-400 mb-4">
          同名の関数を引数違いで定義したり、引数にデフォルト値を設定できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// オーバーロード
int multiply(int a, int b) {
    return a * b;
}

double multiply(double a, double b) {
    return a * b;
}

// デフォルト引数
void printMessage(const string& msg, int count = 1) {
    for (int i = 0; i < count; i++)
        cout << msg << endl;
}

int main() {
    cout << "int: " << multiply(3, 4) << endl;
    cout << "double: " << multiply(2.5, 3.0) << endl;

    printMessage("Hello!");
    printMessage("Repeat!", 2);

    return 0;
}`}
          expectedOutput={`int: 12
double: 7.5
Hello!
Repeat!
Repeat!`}
        />
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
