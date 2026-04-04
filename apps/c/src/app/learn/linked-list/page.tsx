import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linked-list");

const quizQuestions: QuizQuestion[] = [
  {
    question: "単方向連結リストのノードが持つポインタはどれですか？",
    options: [
      "前のノードへのポインタのみ",
      "次のノードへのポインタのみ",
      "前と次のノードへの2つのポインタ",
      "先頭ノードへのポインタのみ",
    ],
    answer: 1,
    explanation: "単方向（singly）連結リストの各ノードは次のノードへのポインタ（next）のみを持ちます。双方向リストは prev と next の両方を持ちます。",
  },
  {
    question: "連結リストの先頭への挿入の時間計算量はどれですか？",
    options: [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n²)",
    ],
    answer: 2,
    explanation: "連結リストの先頭への挿入は、新しいノードの next を現在の先頭に設定し、head を更新するだけなので O(1) です。",
  },
  {
    question: "循環リストの特徴として正しいのはどれですか？",
    options: [
      "先頭ノードの prev が NULL",
      "末尾ノードの next が NULL",
      "末尾ノードの next が先頭ノードを指す",
      "各ノードが任意のノードを指せる",
    ],
    answer: 2,
    explanation: "循環リストでは末尾ノードの next が先頭ノードを指します。通常のリストでは末尾の next は NULL ですが、循環リストでは先頭に戻ります。",
  },
  {
    question: "連結リストの n 番目の要素へのアクセスの時間計算量はどれですか？",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)",
    ],
    answer: 2,
    explanation: "連結リストはランダムアクセスができないため、n番目の要素にアクセスするには先頭から順にたどる必要があり O(n) かかります。配列の O(1) とは異なります。",
  },
];

export default function LinkedListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">連結リスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語のポインタを使った連結リストを学びましょう。単方向・双方向・循環リストの構造から、
          挿入・削除・ソートなどの操作まで、動的データ構造の基礎を身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="linked-list" totalLessons={6} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/linked-list" color="cyan" categoryId="linked-list" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単方向リストの基本構造</h2>
        <p className="text-gray-400 mb-4">
          連結リストは <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">struct Node</code> と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">next</code> ポインタで構成されます。
          動的に要素を追加・削除できるのが配列との大きな違いです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void printList(struct Node *head) {
    struct Node *cur = head;
    while (cur != NULL) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");
}

int main() {
    /* ノードを手動で作成 */
    struct Node *n1 = malloc(sizeof(struct Node));
    struct Node *n2 = malloc(sizeof(struct Node));
    struct Node *n3 = malloc(sizeof(struct Node));

    n1->data = 10; n1->next = n2;
    n2->data = 20; n2->next = n3;
    n3->data = 30; n3->next = NULL;

    printList(n1);

    free(n1); free(n2); free(n3);
    return 0;
}`}
          expectedOutput={`10 -> 20 -> 30 -> NULL`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">先頭への挿入</h2>
        <p className="text-gray-400 mb-4">
          連結リストの先頭への挿入は O(1) で行えます。新しいノードの
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">next</code> を現在の先頭に設定し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">head</code> を更新します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *insertHead(struct Node *head, int val) {
    struct Node *newNode = malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = head;
    return newNode;
}

int main() {
    struct Node *head = NULL;
    head = insertHead(head, 30);
    head = insertHead(head, 20);
    head = insertHead(head, 10);

    struct Node *cur = head;
    while (cur != NULL) {
        printf("%d ", cur->data);
        cur = cur->next;
    }
    printf("\\n");
    return 0;
}`}
          expectedOutput={`10 20 30 `}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
