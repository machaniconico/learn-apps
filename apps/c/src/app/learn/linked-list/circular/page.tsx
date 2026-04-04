import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linked-list");

export default function CircularPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">連結リスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">循環リスト</h1>
        <p className="text-gray-400">末尾ノードが先頭を指す循環連結リストの仕組みと走査を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">循環リストの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          循環リストでは末尾ノードの <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">next</code> が
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">NULL</code> ではなく先頭ノードを指します。
          ラウンドロビンスケジューリングや循環バッファの実装に利用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>末尾の <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">next</code> が先頭を指す（NULL にならない）</li>
          <li>走査の終了条件は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">cur == head</code> に戻ったとき</li>
          <li>tail ポインタを保持すると末尾への O(1) 追加が可能</li>
          <li>無限ループに注意が必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">循環リストの作成と走査</h2>
        <p className="text-gray-400 mb-4">
          循環リストでは走査の終了条件に注意が必要です。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">cur != NULL</code> ではなく
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">cur != head</code>（先頭に戻ったら停止）を使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node *a = malloc(sizeof(struct Node));
    struct Node *b = malloc(sizeof(struct Node));
    struct Node *c = malloc(sizeof(struct Node));

    a->data = 10; a->next = b;
    b->data = 20; b->next = c;
    c->data = 30; c->next = a;  /* 循環：末尾→先頭 */

    struct Node *head = a;

    /* n回分だけ走査（無限ループを避けるため） */
    struct Node *cur = head;
    int count = 0;
    do {
        printf("%d -> ", cur->data);
        cur = cur->next;
        count++;
    } while (cur != head && count < 10);
    printf("(back to head)\\n");

    free(a); free(b); free(c);
    return 0;
}`}
          expectedOutput={`10 -> 20 -> 30 -> (back to head)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">循環リストへの挿入</h2>
        <p className="text-gray-400 mb-4">
          tail ポインタを使うと末尾への O(1) 挿入が可能です。
          挿入後に tail の next が head を指すよう更新します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

/* tail を返す（head は tail->next） */
struct Node *appendCircular(struct Node *tail, int val) {
    struct Node *n = malloc(sizeof(struct Node));
    n->data = val;
    if (tail == NULL) {
        n->next = n;  /* 自分自身を指す */
        return n;
    }
    n->next = tail->next;  /* 新ノードの次は先頭 */
    tail->next = n;        /* 旧末尾の次は新ノード */
    return n;              /* 新しい末尾を返す */
}

int main() {
    struct Node *tail = NULL;
    tail = appendCircular(tail, 10);
    tail = appendCircular(tail, 20);
    tail = appendCircular(tail, 30);

    struct Node *head = tail->next;
    struct Node *cur = head;
    do {
        printf("%d ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`10 20 30 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linked-list" lessonId="circular" />
      </div>
      <LessonNav lessons={lessons} currentId="circular" basePath="/learn/linked-list" />
    </div>
  );
}
