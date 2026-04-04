import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

const quizQuestions: QuizQuestion[] = [
  {
    question: "#include <iostream> と #include \"myheader.h\" の違いは何ですか？",
    options: [
      "<>はシステムヘッダ、\"\"はユーザー定義ヘッダを優先して探す",
      "違いはなく、どちらも同じ動作をする",
      "<>はC言語用、\"\"はC++用",
      "<>はコンパイル時、\"\"は実行時にインクルードされる",
    ],
    answer: 0,
    explanation: "<>はシステムのインクルードパスを検索し、\"\"はまずカレントディレクトリを検索してからシステムパスを検索します。",
  },
  {
    question: "#defineマクロの注意点として正しいものはどれですか？",
    options: [
      "型安全でなく、意図しないテキスト置換が起きることがある",
      "constexprより高速に動作する",
      "名前空間の中に定義できる",
      "テンプレートと同じように動作する",
    ],
    answer: 0,
    explanation: "マクロは単純なテキスト置換であるため型チェックが行われず、括弧の付け忘れなどによる意図しない動作が起きることがあります。",
  },
  {
    question: "#pragma onceの役割は何ですか？",
    options: [
      "同じヘッダファイルが複数回インクルードされるのを防ぐ",
      "コンパイルの最適化レベルを設定する",
      "警告メッセージを表示する",
      "マクロを一度だけ展開する",
    ],
    answer: 0,
    explanation: "#pragma onceはインクルードガードの代替で、コンパイラにそのヘッダファイルを一度だけインクルードするよう指示します。",
  },
  {
    question: "C++20のモジュールの利点として正しいものはどれですか？",
    options: [
      "ヘッダファイルに比べてコンパイル時間を大幅に短縮できる",
      "C++11から使える機能である",
      "#includeと完全に同じ動作をする",
      "実行時のパフォーマンスが向上する",
    ],
    answer: 0,
    explanation: "モジュールはヘッダの再解析を避けるため、大規模プロジェクトでコンパイル時間を大幅に短縮できます。またマクロの漏洩も防ぎます。",
  },
];

export default function PreprocessorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">プリプロセッサ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のプリプロセッサを学びましょう。#includeによるヘッダのインクルード、#defineマクロ、条件付きコンパイル、
          #pragmaディレクティブ、そしてC++20のモジュールシステムまで、コンパイル前の処理を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="preprocessor" totalLessons={5} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/preprocessor" color="yellow" categoryId="preprocessor" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プリプロセッサの基本</h2>
        <p className="text-gray-400 mb-4">
          プリプロセッサはコンパイル前にソースコードを処理します。#から始まるディレクティブでテキスト置換や条件付きコンパイルを行います。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// マクロ定数の定義
#define PI 3.14159
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    cout << "円周率: " << PI << endl;
    cout << "大きい方: " << MAX(10, 20) << endl;

    // 条件付きコンパイル
#ifdef DEBUG
    cout << "デバッグモード" << endl;
#else
    cout << "リリースモード" << endl;
#endif

    return 0;
}`}
          expectedOutput={`円周率: 3.14159
大きい方: 20
リリースモード`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インクルードガード</h2>
        <p className="text-gray-400 mb-4">
          ヘッダファイルの多重インクルードを防ぐ2つの方法を紹介します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 方法1: 伝統的なインクルードガード
// #ifndef MY_HEADER_H
// #define MY_HEADER_H
// ... ヘッダの内容 ...
// #endif

// 方法2: #pragma once（モダンな方法）
// #pragma once
// ... ヘッダの内容 ...

// 実際にマクロが展開される様子を確認
#define GREETING "こんにちは"
#define SQUARE(x) ((x) * (x))

int main() {
    cout << GREETING << endl;
    cout << "5の2乗 = " << SQUARE(5) << endl;
    cout << "3+2の2乗 = " << SQUARE(3+2) << endl;
    return 0;
}`}
          expectedOutput={`こんにちは
5の2乗 = 25
3+2の2乗 = 25`}
        />
      </section>

      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
