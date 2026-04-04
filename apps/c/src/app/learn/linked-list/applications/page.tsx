import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linked-list");

export default function LinkedListApplicationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">連結リスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">応用例</h1>
        <p className="text-gray-400">連結リストを使ったスタック・キュー・多項式表現の実装を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">連結リストの応用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          連結リストはさまざまなデータ構造の基盤として使われます。
          配列ベースの実装と違い、サイズ制限がなく動的に伸縮できるのが強みです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>スタック：先頭への挿入が push、先頭からの削除が pop</li>
          <li>キュー：末尾への挿入が enqueue、先頭からの削除が dequeue</li>
          <li>多項式表現：各項を係数・次数のノードで表現</li>
          <li>隣接リスト：グラフのノードとエッジを表現</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">連結リストによるスタック</h2>
        <p className="text-gray-400 mb-4">
          先頭への挿入が push、先頭の削除が pop に対応します。
          配列ベースのスタックと異なり、サイズ上限がありません。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };

struct Node *push(struct Node *top, int val) {
    struct Node *n = malloc(sizeof(struct Node));
    n->data = val; n->next = top;
    return n;
}

struct Node *pop(struct Node *top, int *val) {
    if (top == NULL) { *val = -1; return NULL; }
    *val = top->data;
    struct Node *next = top->next;
    free(top);
    return next;
}

int main() {
    struct Node *top = NULL;
    top = push(top, 10);
    top = push(top, 20);
    top = push(top, 30);

    int val;
    top = pop(top, &val); printf("pop: %d\\n", val);
    top = pop(top, &val); printf("pop: %d\\n", val);
    top = pop(top, &val); printf("pop: %d\\n", val);
    return 0;
}`}
          expectedOutput={`pop: 30
pop: 20
pop: 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">連結リストによるキュー</h2>
        <p className="text-gray-400 mb-4">
          head と tail の2つのポインタを使います。
          enqueue は tail に追加、dequeue は head から削除することで、両方 O(1) で行えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };
struct Queue { struct Node *head; struct Node *tail; };

void enqueue(struct Queue *q, int val) {
    struct Node *n = malloc(sizeof(struct Node));
    n->data = val; n->next = NULL;
    if (q->tail) q->tail->next = n;
    else q->head = n;
    q->tail = n;
}

int dequeue(struct Queue *q) {
    if (!q->head) return -1;
    int val = q->head->data;
    struct Node *tmp = q->head;
    q->head = q->head->next;
    if (!q->head) q->tail = NULL;
    free(tmp);
    return val;
}

int main() {
    struct Queue q = {NULL, NULL};
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    printf("dequeue: %d\\n", dequeue(&q));
    printf("dequeue: %d\\n", dequeue(&q));
    printf("dequeue: %d\\n", dequeue(&q));
    return 0;
}`}
          expectedOutput={`dequeue: 10
dequeue: 20
dequeue: 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linked-list" lessonId="applications" />
      </div>
      <LessonNav lessons={lessons} currentId="applications" basePath="/learn/linked-list" />
    </div>
  );
}
