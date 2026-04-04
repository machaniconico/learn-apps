import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "戻り値を返さない関数の戻り値の型はどれですか？",
    options: ["int", "null", "void", "empty"],
    answer: 2,
    explanation: "void型は値を返さないことを示します。void型の関数ではreturn文を省略するか、return;と書きます。",
  },
  {
    question: "関数プロトタイプ（前方宣言）を書く主な理由はどれですか？",
    options: [
      "関数を高速化するため",
      "呼び出しより前に関数を使えるようにするため",
      "関数をグローバルにするため",
      "戻り値の型を省略するため",
    ],
    answer: 1,
    explanation: "プロトタイプ宣言により、関数の定義よりも前の位置でその関数を呼び出せるようになります。",
  },
  {
    question: "C言語の関数引数は通常どのように渡されますか？",
    options: ["参照渡し", "値渡し", "アドレス渡し", "ポインタ渡し"],
    answer: 1,
    explanation: "C言語では引数はデフォルトで値渡しです。関数内で引数を変更しても呼び出し元の変数には影響しません。",
  },
  {
    question: "static変数の特徴として正しいものはどれですか？",
    options: [
      "毎回初期化される",
      "関数呼び出し間で値を保持する",
      "グローバル変数になる",
      "定数になる",
    ],
    answer: 1,
    explanation: "関数内のstatic変数はプログラム終了まで値を保持します。関数を再度呼び出しても前回の値が残っています。",
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
          C言語の関数をマスターしましょう。関数の定義・引数・戻り値・プロトタイプから、再帰・スコープ・static・可変引数まで、関数に関する全知識を体系的に学びます。
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
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">戻り値の型 関数名(引数リスト)</code> の形式で関数を定義します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 2つの整数を加算する関数
int add(int a, int b) {
    return a + b;
}

// メッセージを表示する関数（戻り値なし）
void greet(char name[]) {
    printf("こんにちは、%s！\\n", name);
}

int main() {
    int result = add(3, 7);
    printf("3 + 7 = %d\\n", result);

    greet("太郎");

    return 0;
}`}
          expectedOutput={`3 + 7 = 10
こんにちは、太郎！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">再帰関数</h2>
        <p className="text-gray-400 mb-4">
          関数が自分自身を呼び出す再帰を使って、階乗やフィボナッチ数などを計算できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 階乗を再帰で計算
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    for (int i = 0; i <= 6; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }
    return 0;
}`}
          expectedOutput={`0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720`}
        />
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
