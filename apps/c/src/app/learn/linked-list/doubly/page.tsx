import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linked-list");

export default function DoublyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">連結リスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">双方向リスト</h1>
        <p className="text-gray-400">prev と next の2つのポインタで前後両方向に走査できる双方向連結リストを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">双方向リストの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          双方向リストは各ノードが <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">prev</code>（前）と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">next</code>（後）の2つのポインタを持ちます。
          前後どちらの方向にも走査でき、任意のノードの前への挿入も O(1) で行えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>先頭ノードの <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">prev</code> は NULL</li>
          <li>末尾ノードの <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">next</code> は NULL</li>
          <li>削除操作が単方向より簡単（前ノードのポインタも持っているため）</li>
          <li>メモリ使用量が単方向より多い（ポインタが2つ分）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">双方向リストのノード定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">struct DNode</code> に
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">prev</code> と <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">next</code> の両方を定義します。
          挿入時に両側のポインタを正しく設定することが重要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
};

struct DNode *createDNode(int val) {
    struct DNode *n = malloc(sizeof(struct DNode));
    n->data = val;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

int main() {
    struct DNode *a = createDNode(10);
    struct DNode *b = createDNode(20);
    struct DNode *c = createDNode(30);

    a->next = b; b->prev = a;
    b->next = c; c->prev = b;

    /* 前方向に走査 */
    printf("Forward:  ");
    for (struct DNode *cur = a; cur; cur = cur->next)
        printf("%d ", cur->data);
    printf("\\n");

    /* 後方向に走査 */
    printf("Backward: ");
    for (struct DNode *cur = c; cur; cur = cur->prev)
        printf("%d ", cur->data);
    printf("\\n");

    free(a); free(b); free(c);
    return 0;
}`}
          expectedOutput={`Forward:  10 20 30
Backward: 30 20 10 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">先頭への挿入</h2>
        <p className="text-gray-400 mb-4">
          先頭への挿入では新ノードの next を現在の head に設定し、
          head が NULL でない場合は head の prev を新ノードに設定します。
          その後 head を更新します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
};

struct DNode *insertHead(struct DNode *head, int val) {
    struct DNode *n = malloc(sizeof(struct DNode));
    n->data = val;
    n->prev = NULL;
    n->next = head;
    if (head != NULL) head->prev = n;
    return n;
}

int main() {
    struct DNode *head = NULL;
    head = insertHead(head, 30);
    head = insertHead(head, 20);
    head = insertHead(head, 10);

    for (struct DNode *cur = head; cur; cur = cur->next)
        printf("%d -> ", cur->data);
    printf("NULL\\n");
    return 0;
}`}
          expectedOutput={`10 -> 20 -> 30 -> NULL`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linked-list" lessonId="doubly" />
      </div>
      <LessonNav lessons={lessons} currentId="doubly" basePath="/learn/linked-list" />
    </div>
  );
}
