import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linked-list");

export default function ListSortPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">連結リスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リストのソート</h1>
        <p className="text-gray-400">挿入ソートを使った連結リストのソート手法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">連結リストのソートについて</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          連結リストはランダムアクセスができないため、配列向けのソートアルゴリズムをそのまま使えません。
          連結リストに適したソートとして挿入ソートとマージソートがよく使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>挿入ソート：実装が簡単、O(n²) だが小さいリストに有効</li>
          <li>マージソート：O(n log n) の安定ソート、連結リストに最も適している</li>
          <li>バブルソート：ポインタの付け替えで実装可能だが非効率</li>
          <li>クイックソート：連結リストへの適用は可能だが実装が複雑</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">挿入ソートの実装</h2>
        <p className="text-gray-400 mb-4">
          連結リストの挿入ソートでは、ソート済みの新しいリストを構築します。
          元のリストから1つずつノードを取り出し、ソート済みリストの適切な位置に挿入します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };

/* ソート済みリストに val を挿入 */
struct Node *sortedInsert(struct Node *sorted, struct Node *n) {
    if (sorted == NULL || sorted->data >= n->data) {
        n->next = sorted;
        return n;
    }
    struct Node *cur = sorted;
    while (cur->next && cur->next->data < n->data)
        cur = cur->next;
    n->next = cur->next;
    cur->next = n;
    return sorted;
}

struct Node *insertionSort(struct Node *head) {
    struct Node *sorted = NULL;
    struct Node *cur = head;
    while (cur != NULL) {
        struct Node *next = cur->next;
        sorted = sortedInsert(sorted, cur);
        cur = next;
    }
    return sorted;
}

int main() {
    int vals[] = {4, 2, 7, 1, 9, 3};
    struct Node *head = NULL;
    for (int i = 5; i >= 0; i--) {
        struct Node *n = malloc(sizeof(struct Node));
        n->data = vals[i]; n->next = head; head = n;
    }
    printf("Before: ");
    for (struct Node *c = head; c; c = c->next) printf("%d ", c->data);
    printf("\\n");

    head = insertionSort(head);
    printf("After:  ");
    for (struct Node *c = head; c; c = c->next) printf("%d ", c->data);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`Before: 4 2 7 1 9 3
After:  1 2 3 4 7 9 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バブルソート（値の入れ替え）</h2>
        <p className="text-gray-400 mb-4">
          ポインタを付け替える代わりに値（data）を交換する方法もあります。
          実装が簡単ですが O(n²) で大きなリストには不向きです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };

void bubbleSortList(struct Node *head) {
    if (!head) return;
    int swapped;
    do {
        swapped = 0;
        struct Node *cur = head;
        while (cur->next != NULL) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}

int main() {
    struct Node d = {3, NULL};
    struct Node c = {1, &d};
    struct Node b = {4, &c};
    struct Node a = {2, &b};

    bubbleSortList(&a);
    for (struct Node *p = &a; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`1 2 3 4 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linked-list" lessonId="list-sort" />
      </div>
      <LessonNav lessons={lessons} currentId="list-sort" basePath="/learn/linked-list" />
    </div>
  );
}
