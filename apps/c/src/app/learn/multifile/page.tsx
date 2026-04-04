import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("multifile");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ヘッダファイル(.h)に書くべきでないものはどれですか？",
    options: [
      "関数のプロトタイプ宣言",
      "構造体の定義",
      "グローバル変数の定義（実体）",
      "マクロ定義",
    ],
    answer: 2,
    explanation: "グローバル変数の定義（実体）はヘッダに書いてはいけません。複数の.cファイルがそのヘッダをincludeすると多重定義エラーになります。宣言のみ（extern付き）をヘッダに書きます。",
  },
  {
    question: "インクルードガードの目的は何ですか？",
    options: [
      "コンパイルを高速化する",
      "同じヘッダファイルが複数回インクルードされて定義が重複するのを防ぐ",
      "ヘッダファイルを暗号化する",
      "外部ライブラリへのリンクを自動化する",
    ],
    answer: 1,
    explanation: "インクルードガード（#ifndef/#define/#endif または #pragma once）は、同じヘッダが複数回インクルードされた場合に内容が重複して展開されるのを防ぎます。",
  },
  {
    question: "externキーワードの役割はどれですか？",
    options: [
      "変数を静的に確保する",
      "変数や関数が別の翻訳単位で定義されていることを宣言する",
      "変数を定数にする",
      "関数を外部から隠蔽する",
    ],
    answer: 1,
    explanation: "externは「この変数/関数は別の.cファイルで定義されている」と宣言します。リンク時に実際の定義が解決されます。",
  },
  {
    question: "単一定義規則（One Definition Rule）とは何ですか？",
    options: [
      "変数は一度しか代入できない",
      "同じ識別子の定義はプログラム全体で1つだけ存在しなければならない",
      "関数は1つのファイルにしか書けない",
      "ヘッダファイルは1つしか作れない",
    ],
    answer: 1,
    explanation: "単一定義規則（ODR）は、変数や関数の定義（実体）はプログラム全体で1つだけでなければならないというルールです。宣言は複数あって構いません。",
  },
];

export default function MultifilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">マルチファイル</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          複数ファイルによるCプログラムの構成を学びましょう。ヘッダファイルの設計、ソースの分割方法、リンクの仕組み、インクルードガード、大規模プロジェクトの構造を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="multifile" totalLessons={5} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/multifile" color="indigo" categoryId="multifile" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インクルードガードの基本</h2>
        <p className="text-gray-400 mb-4">
          ヘッダファイルには必ずインクルードガードを付けます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#pragma once</code> は現代のコンパイラで広くサポートされる簡潔な方法です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* mathutils.h の内容を模倣 */
/* #ifndef MATHUTILS_H */
/* #define MATHUTILS_H */
/* int add(int a, int b); */
/* #endif */

/* mathutils.c の実装 */
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

/* main.c */
int main(void) {
    printf("add(3, 4) = %d\\n", add(3, 4));
    printf("multiply(3, 4) = %d\\n", multiply(3, 4));
    return 0;
}`}
          expectedOutput={`add(3, 4) = 7
multiply(3, 4) = 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">externによる変数共有</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">extern</code> で別ファイルで定義された変数を参照します。
          定義は1箇所、宣言は複数ファイルで可能です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* config.c で定義されているとする: int debug_level = 2; */
/* ここでは同じファイルで模倣 */
int debug_level = 2;  /* 定義 */

/* 別ファイルでは: extern int debug_level; */
extern int debug_level;  /* 宣言（同ファイルでも有効） */

void log_message(const char *msg) {
    if (debug_level > 0) {
        printf("[DEBUG] %s\\n", msg);
    }
}

int main(void) {
    log_message("プログラム開始");
    log_message("処理中...");
    printf("debug_level = %d\\n", debug_level);
    return 0;
}`}
          expectedOutput={`[DEBUG] プログラム開始
[DEBUG] 処理中...
debug_level = 2`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
