import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "if文の条件が偽のとき実行されるブロックはどれですか？",
    options: ["then", "else", "catch", "finally"],
    answer: 1,
    explanation: "if文の条件が偽（0）のとき、elseブロックが実行されます。",
  },
  {
    question: "switch文でケースの処理を終えてswitch全体を抜けるために使うキーワードはどれですか？",
    options: ["exit", "return", "break", "continue"],
    answer: 2,
    explanation: "breakはswitch文やループから抜け出すために使います。breakがないとfall-throughが発生します。",
  },
  {
    question: "forループ for(int i=0; i<5; i++) は何回実行されますか？",
    options: ["4回", "5回", "6回", "無限"],
    answer: 1,
    explanation: "i=0から始まりi<5が偽になるまで（i=4まで）実行されるので5回です。",
  },
  {
    question: "do-whileループとwhileループの違いはどれですか？",
    options: [
      "do-whileは条件が真のとき実行される",
      "do-whileは必ず1回以上実行される",
      "do-whileは無限ループになる",
      "違いはない",
    ],
    answer: 1,
    explanation: "do-whileは本体を先に実行してから条件を評価するため、条件が最初から偽でも最低1回は実行されます。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">制御フロー</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の制御フロー構文を学びましょう。条件分岐（if・else・switch）と繰り返し（for・while・do-while）を使いこなすことで、複雑なロジックを実現できます。
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
        <h2 className="text-xl font-bold text-white mb-3">if-else による条件分岐</h2>
        <p className="text-gray-400 mb-4">
          条件が真か偽かによって実行するコードを切り替えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int score = 75;

    if (score >= 90) {
        printf("優\\n");
    } else if (score >= 70) {
        printf("良\\n");
    } else if (score >= 60) {
        printf("可\\n");
    } else {
        printf("不可\\n");
    }

    return 0;
}`}
          expectedOutput={`良`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">forループによる繰り返し</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">for(初期化; 条件; 更新)</code> の形式で繰り返し処理を行います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 1から5まで出力
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // 合計を計算
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("1から10の合計: %d\\n", sum);

    return 0;
}`}
          expectedOutput={`1 2 3 4 5
1から10の合計: 55`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
