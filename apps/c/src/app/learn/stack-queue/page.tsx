import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stack-queue");

const quizQuestions: QuizQuestion[] = [
  {
    question: "スタックのデータ管理方式として正しいのはどれですか？",
    options: [
      "FIFO（先入れ先出し）",
      "LIFO（後入れ先出し）",
      "優先度順",
      "ランダムアクセス",
    ],
    answer: 1,
    explanation: "スタックは LIFO（Last In First Out）方式です。最後に push したデータが最初に pop されます。皿を積み重ねるイメージです。",
  },
  {
    question: "キューのデータ管理方式として正しいのはどれですか？",
    options: [
      "LIFO（後入れ先出し）",
      "FIFO（先入れ先出し）",
      "優先度順",
      "ランダムアクセス",
    ],
    answer: 1,
    explanation: "キューは FIFO（First In First Out）方式です。最初に enqueue したデータが最初に dequeue されます。行列（待ち行列）のイメージです。",
  },
  {
    question: "循環キューで front と rear が同じ位置になる場合は何を意味しますか？",
    options: [
      "キューが満杯",
      "キューが空",
      "エラー状態",
      "中間位置",
    ],
    answer: 1,
    explanation: "循環キューでは front == rear の状態はキューが空であることを示します。満杯の判定は (rear + 1) % SIZE == front などで行います。",
  },
  {
    question: "スタックを使って括弧の対応チェックを行う場合、'(' を見たら何をしますか？",
    options: [
      "スタックから pop する",
      "スタックに push する",
      "スタックをクリアする",
      "プログラムを終了する",
    ],
    answer: 1,
    explanation: "括弧の対応チェックでは '(' を見たら push し、')' を見たら pop して対応する '(' があるか確認します。最終的にスタックが空なら正しく対応しています。",
  },
];

export default function StackQueuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">スタック・キュー</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語でスタックとキューを実装しましょう。配列ベースの実装から循環キュー・優先度付きキューまで、
          アルゴリズムの基礎となるデータ構造を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="stack-queue" totalLessons={5} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/stack-queue" color="teal" categoryId="stack-queue" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列ベースのスタック</h2>
        <p className="text-gray-400 mb-4">
          スタックは LIFO（後入れ先出し）構造です。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">top</code> 変数でスタックの頂上を管理し、
          push と pop を実装します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int val) {
    if (top == MAX - 1) { printf("Stack full\\n"); return; }
    stack[++top] = val;
}

int pop() {
    if (top == -1) { printf("Stack empty\\n"); return -1; }
    return stack[top--];
}

int main() {
    push(10);
    push(20);
    push(30);
    printf("pop: %d\\n", pop());
    printf("pop: %d\\n", pop());
    printf("pop: %d\\n", pop());
    return 0;
}`}
          expectedOutput={`pop: 30
pop: 20
pop: 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列ベースのキュー</h2>
        <p className="text-gray-400 mb-4">
          キューは FIFO（先入れ先出し）構造です。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">front</code> と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">rear</code> で先頭と末尾を管理します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 5

int queue[MAX];
int front = 0, rear = 0;

void enqueue(int val) {
    if (rear == MAX) { printf("Queue full\\n"); return; }
    queue[rear++] = val;
}

int dequeue() {
    if (front == rear) { printf("Queue empty\\n"); return -1; }
    return queue[front++];
}

int main() {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    return 0;
}`}
          expectedOutput={`dequeue: 10
dequeue: 20
dequeue: 30`}
        />
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
