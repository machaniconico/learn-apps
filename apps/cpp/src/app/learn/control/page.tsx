import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++のfor文の構成要素として正しいものはどれですか？",
    options: [
      "初期化、条件、後処理の3つで構成される",
      "条件のみで構成される",
      "コンテナが必要である",
      "初期化と条件の2つで構成される",
    ],
    answer: 0,
    explanation: "forループは「初期化; 条件; 後処理」の3つのセクションで構成されます。それぞれ省略することもできます。",
  },
  {
    question: "do-while ループの特徴として正しいものはどれですか？",
    options: [
      "条件が最初から false でも最低1回は実行される",
      "コンテナの要素を自動的に取り出す",
      "条件が最初から false なら1度も実行されない",
      "無限ループにはならない",
    ],
    answer: 0,
    explanation: "do-while は条件チェックがループ本体の後にあるため、条件が最初からfalseでも必ず1回は実行されます。",
  },
  {
    question: "C++の範囲forループ（range-based for）について正しいものはどれですか？",
    options: [
      "配列やstd::vectorなどのコンテナ要素を順に処理できる",
      "カウンタ変数が必須である",
      "std::mapには使えない",
      "C++03から使える機能である",
    ],
    answer: 0,
    explanation: "範囲forループ（for(auto x : container)）はC++11で導入され、配列やSTLコンテナの要素を順に処理できます。",
  },
  {
    question: "C++のswitch文について正しいものはどれですか？",
    options: [
      "caseの最後にbreakがないとフォールスルーする",
      "文字列（std::string）で分岐できる",
      "breakは不要である",
      "浮動小数点数で分岐できる",
    ],
    answer: 0,
    explanation: "C++のswitch文ではcaseの最後にbreakがないと次のcaseに処理が流れます（フォールスルー）。また、整数型・列挙型のみ使えます。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++の制御構文を学びましょう。条件分岐（if/switch）・繰り返し（for/while/do-while/範囲for）・ループ制御（break/continue）など、
          プログラムの流れをコントロールする基本構文を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="cyan" categoryId="control" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐の概要</h2>
        <p className="text-gray-400 mb-4">
          if-else と switch は、条件に応じて異なるコードを実行します。C++のswitch文は整数型・列挙型のみ対応しています。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int score = 78;
    string grade;

    // if-else で成績を判定
    if (score >= 90)
        grade = "A";
    else if (score >= 80)
        grade = "B";
    else if (score >= 70)
        grade = "C";
    else
        grade = "F";

    cout << "スコア: " << score << ", 成績: " << grade << endl;

    // switch で曜日を表示
    int day = 3;
    switch (day) {
        case 1: cout << "月曜日" << endl; break;
        case 2: cout << "火曜日" << endl; break;
        case 3: cout << "水曜日" << endl; break;
        default: cout << "その他" << endl; break;
    }

    return 0;
}`}
          expectedOutput={`スコア: 78, 成績: C
水曜日`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループの概要</h2>
        <p className="text-gray-400 mb-4">
          C++には4種類のループがあります。用途に応じて使い分けましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // for: カウンタが必要な場合
    for (int i = 1; i <= 3; i++)
        cout << "for:" << i << " ";
    cout << endl;

    // while: 条件のみ
    int n = 3;
    while (n > 0)
        cout << "while:" << n-- << " ";
    cout << endl;

    // 範囲for: コンテナを処理
    vector<string> fruits = {"りんご", "バナナ", "みかん"};
    for (const auto& fruit : fruits)
        cout << fruit << " ";
    cout << endl;

    // do-while: 最低1回実行
    int x = 0;
    do {
        cout << "do:" << x << " ";
        x++;
    } while (x < 3);
    cout << endl;

    return 0;
}`}
          expectedOutput={`for:1 for:2 for:3
while:3 while:2 while:1
りんご バナナ みかん
do:0 do:1 do:2`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
