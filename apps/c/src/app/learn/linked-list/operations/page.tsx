import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linked-list");

export default function OperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">連結リスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リスト操作</h1>
        <p className="text-gray-400">挿入・削除・検索・カウントなど連結リストの基本操作を実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要な操作の計算量</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          連結リストの各操作の時間計算量を理解しておきましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>先頭への挿入：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">O(1)</code></li>
          <li>末尾への挿入：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">O(n)</code>（tail ポインタなしの場合）</li>
          <li>任意位置への挿入：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">O(n)</code>（位置を探す必要がある）</li>
          <li>先頭の削除：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">O(1)</code></li>
          <li>値による削除：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">O(n)</code></li>
          <li>検索・カウント：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">O(n)</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値による削除</h2>
        <p className="text-gray-400 mb-4">
          削除では前のノードの <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">next</code> を
          削除対象の次のノードに変更します。先頭ノードの削除は特殊なケースとして処理します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };

struct Node *deleteVal(struct Node *head, int val) {
    if (head == NULL) return NULL;
    if (head->data == val) {
        struct Node *tmp = head->next;
        free(head);
        return tmp;
    }
    struct Node *cur = head;
    while (cur->next != NULL && cur->next->data != val)
        cur = cur->next;
    if (cur->next != NULL) {
        struct Node *tmp = cur->next;
        cur->next = tmp->next;
        free(tmp);
    }
    return head;
}

int main() {
    struct Node *head = NULL;
    /* 簡単に作成 */
    int vals[] = {10, 20, 30, 40};
    for (int i = 3; i >= 0; i--) {
        struct Node *n = malloc(sizeof(struct Node));
        n->data = vals[i]; n->next = head; head = n;
    }
    head = deleteVal(head, 20);
    for (struct Node *c = head; c; c = c->next)
        printf("%d ", c->data);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`10 30 40 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索とカウント</h2>
        <p className="text-gray-400 mb-4">
          検索は先頭から順にたどって目的の値を探します。カウントはリスト全体をたどってノード数を数えます。
          どちらも O(n) の操作です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };

int search(struct Node *head, int val) {
    int idx = 0;
    for (struct Node *c = head; c; c = c->next, idx++)
        if (c->data == val) return idx;
    return -1;
}

int count(struct Node *head) {
    int n = 0;
    for (struct Node *c = head; c; c = c->next) n++;
    return n;
}

int main() {
    /* リストを手動作成: 5 -> 15 -> 25 -> 35 */
    struct Node d = {35, NULL};
    struct Node c = {25, &d};
    struct Node b = {15, &c};
    struct Node a = {5,  &b};

    printf("search(25) = index %d\\n", search(&a, 25));
    printf("search(99) = index %d\\n", search(&a, 99));
    printf("count = %d\\n", count(&a));
    return 0;
}`}
          expectedOutput={`search(25) = index 2
search(99) = index -1
count = 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リストの反転</h2>
        <p className="text-gray-400 mb-4">
          リストの反転はポインタを3つ使って実現します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">prev</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">cur</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">next</code> を使いながら
          各ノードの next を逆向きに変更します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };

struct Node *reverse(struct Node *head) {
    struct Node *prev = NULL, *cur = head, *next = NULL;
    while (cur != NULL) {
        next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}

int main() {
    struct Node d = {4, NULL};
    struct Node c = {3, &d};
    struct Node b = {2, &c};
    struct Node a = {1, &b};
    struct Node *head = &a;

    printf("Before: ");
    for (struct Node *p = head; p; p = p->next) printf("%d ", p->data);
    printf("\\n");

    head = reverse(head);
    printf("After:  ");
    for (struct Node *p = head; p; p = p->next) printf("%d ", p->data);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`Before: 1 2 3 4
After:  4 3 2 1 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linked-list" lessonId="operations" />
      </div>
      <LessonNav lessons={lessons} currentId="operations" basePath="/learn/linked-list" />
    </div>
  );
}
