import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stack-queue");

export default function PriorityQueuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">スタック・キュー レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">優先度付きキュー</h1>
        <p className="text-gray-400">ソート済み挿入を使った簡易優先度付きキューの実装を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">優先度付きキューとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          優先度付きキューでは、挿入順ではなく優先度の高い要素が先に取り出されます。
          病院の救急患者の優先対応や、OS のプロセススケジューリングに使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>最小優先：優先度の数値が小さいものを先に取り出す</li>
          <li>最大優先：優先度の数値が大きいものを先に取り出す</li>
          <li>単純実装：挿入時にソート済み位置に挿入（O(n) 挿入・O(1) 取り出し）</li>
          <li>効率的実装：ヒープを使うと挿入・取り出しともに O(log n)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソート済み配列による優先度付きキュー</h2>
        <p className="text-gray-400 mb-4">
          挿入時に適切な位置に要素を挿入することでソート済み状態を維持します。
          取り出しは常に先頭（最小値）から行います。挿入は O(n)、取り出しは O(1) です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 10

int pq[MAX];
int size = 0;

/* 昇順ソート済み配列に挿入（小さい値が高優先） */
void insert(int val) {
    if (size == MAX) return;
    int i = size - 1;
    while (i >= 0 && pq[i] > val) {
        pq[i + 1] = pq[i];
        i--;
    }
    pq[i + 1] = val;
    size++;
}

/* 最小値（先頭）を取り出す */
int extractMin() {
    if (size == 0) return -1;
    int min = pq[0];
    for (int i = 0; i < size - 1; i++)
        pq[i] = pq[i + 1];
    size--;
    return min;
}

int main() {
    insert(5);
    insert(1);
    insert(8);
    insert(3);
    insert(7);

    printf("Extract order (min first):\\n");
    while (size > 0)
        printf("%d ", extractMin());
    printf("\\n");
    return 0;
}`}
          expectedOutput={`Extract order (min first):
1 3 5 7 8 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">優先度と値を別々に管理</h2>
        <p className="text-gray-400 mb-4">
          実際のアプリケーションでは優先度と値を別々に持つ構造体を使います。
          優先度が同じ場合は FIFO 順（先に挿入した方を先に取り出す）にするのが一般的です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 10

typedef struct {
    int priority;
    int value;
} Item;

Item pq[MAX];
int size = 0;

void insert(int priority, int value) {
    if (size == MAX) return;
    Item item = {priority, value};
    int i = size - 1;
    while (i >= 0 && pq[i].priority > item.priority) {
        pq[i + 1] = pq[i];
        i--;
    }
    pq[i + 1] = item;
    size++;
}

Item extractMin() {
    Item empty = {-1, -1};
    if (size == 0) return empty;
    Item min = pq[0];
    for (int i = 0; i < size - 1; i++) pq[i] = pq[i + 1];
    size--;
    return min;
}

int main() {
    insert(3, 30);
    insert(1, 10);
    insert(2, 20);
    insert(1, 11);

    while (size > 0) {
        Item it = extractMin();
        printf("pri=%d val=%d\\n", it.priority, it.value);
    }
    return 0;
}`}
          expectedOutput={`pri=1 val=10
pri=1 val=11
pri=2 val=20
pri=3 val=30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stack-queue" lessonId="priority-queue" />
      </div>
      <LessonNav lessons={lessons} currentId="priority-queue" basePath="/learn/stack-queue" />
    </div>
  );
}
