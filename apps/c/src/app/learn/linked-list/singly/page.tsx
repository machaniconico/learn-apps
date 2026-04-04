import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linked-list");

export default function SinglyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">連結リスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">単方向リスト</h1>
        <p className="text-gray-400">struct Node と next ポインタで単方向連結リストを実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">単方向連結リストの構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          連結リストは各ノードが次のノードへのポインタを持つデータ構造です。
          配列と異なり、メモリが連続していなくてよく、動的に要素を追加・削除できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>各ノードは <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">data</code>（値）と <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">next</code>（次ノードへのポインタ）を持つ</li>
          <li>末尾ノードの <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">next</code> は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">NULL</code></li>
          <li>先頭ノードを <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">head</code> ポインタで管理する</li>
          <li>各ノードは <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">malloc()</code> で動的確保する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ノードの定義と作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">struct Node</code> を定義し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">malloc()</code> でヒープ上にノードを作成します。
          使い終わったら必ず <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">free()</code> してメモリを解放します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *createNode(int val) {
    struct Node *n = malloc(sizeof(struct Node));
    n->data = val;
    n->next = NULL;
    return n;
}

int main() {
    struct Node *a = createNode(10);
    struct Node *b = createNode(20);
    struct Node *c = createNode(30);

    /* 手動でリンク */
    a->next = b;
    b->next = c;

    /* 走査して表示 */
    struct Node *cur = a;
    while (cur != NULL) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");

    free(a); free(b); free(c);
    return 0;
}`}
          expectedOutput={`10 -> 20 -> 30 -> NULL`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">先頭への挿入と表示関数</h2>
        <p className="text-gray-400 mb-4">
          先頭への挿入は O(1) です。新ノードの next を現在の head に設定し、head を更新します。
          リストの全要素を表示する関数も定義しておくと便利です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *push(struct Node *head, int val) {
    struct Node *n = malloc(sizeof(struct Node));
    n->data = val;
    n->next = head;
    return n;
}

void printList(struct Node *head) {
    for (struct Node *cur = head; cur; cur = cur->next)
        printf("%d -> ", cur->data);
    printf("NULL\\n");
}

int main() {
    struct Node *head = NULL;
    head = push(head, 30);
    head = push(head, 20);
    head = push(head, 10);
    printList(head);
    return 0;
}`}
          expectedOutput={`10 -> 20 -> 30 -> NULL`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">末尾への追加</h2>
        <p className="text-gray-400 mb-4">
          末尾への追加は O(n) です。末尾ノードを見つけてから新ノードをリンクします。
          リストが空の場合（head が NULL）は head に直接セットします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *append(struct Node *head, int val) {
    struct Node *n = malloc(sizeof(struct Node));
    n->data = val;
    n->next = NULL;
    if (head == NULL) return n;
    struct Node *cur = head;
    while (cur->next != NULL) cur = cur->next;
    cur->next = n;
    return head;
}

int main() {
    struct Node *head = NULL;
    head = append(head, 10);
    head = append(head, 20);
    head = append(head, 30);

    for (struct Node *c = head; c; c = c->next)
        printf("%d ", c->data);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`10 20 30 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linked-list" lessonId="singly" />
      </div>
      <LessonNav lessons={lessons} currentId="singly" basePath="/learn/linked-list" />
    </div>
  );
}
