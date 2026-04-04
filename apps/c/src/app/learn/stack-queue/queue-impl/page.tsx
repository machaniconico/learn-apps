import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stack-queue");

export default function QueueImplPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">スタック・キュー レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">キューの実装</h1>
        <p className="text-gray-400">配列ベースのキューを enqueue・dequeue・front で実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">キューとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          キューは FIFO（First In First Out：先入れ先出し）のデータ構造です。
          行列（待ち行列）のイメージで、最初に並んだ人が最初にサービスを受けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">enqueue(val)</code> - キューの末尾に値を追加</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">dequeue()</code> - キューの先頭の値を取り出して削除</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">front()</code> - 先頭の値を削除せずに参照</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">front</code> と <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">rear</code> の2つのインデックスで管理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形キューの実装</h2>
        <p className="text-gray-400 mb-4">
          最もシンプルな配列ベースのキューです。front と rear を使って先頭と末尾を管理します。
          線形キューは rear が配列末尾に達すると満杯とみなすため、空きがあっても使えなくなる問題があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 6

int queue[MAX];
int front = 0, rear = 0;

int isEmpty() { return front == rear; }
int isFull()  { return rear == MAX; }

void enqueue(int val) {
    if (isFull()) { printf("Queue full\\n"); return; }
    queue[rear++] = val;
}

int dequeue() {
    if (isEmpty()) { printf("Queue empty\\n"); return -1; }
    return queue[front++];
}

int frontVal() {
    return isEmpty() ? -1 : queue[front];
}

int main() {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("front: %d\\n", frontVal());
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    enqueue(40);
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    return 0;
}`}
          expectedOutput={`front: 10
dequeue: 10
dequeue: 20
dequeue: 30
dequeue: 40`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体でキューをカプセル化</h2>
        <p className="text-gray-400 mb-4">
          スタックと同様に構造体でキューの状態をカプセル化すると、
          複数のキューを独立して管理できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 8

typedef struct {
    int data[MAX];
    int front, rear;
    int size;
} Queue;

void initQueue(Queue *q) { q->front = q->rear = q->size = 0; }
int  isEmpty(Queue *q)   { return q->size == 0; }
int  isFull(Queue *q)    { return q->size == MAX; }

void enqueue(Queue *q, int v) {
    if (isFull(q)) return;
    q->data[q->rear++] = v;
    q->size++;
}

int dequeue(Queue *q) {
    if (isEmpty(q)) return -1;
    q->size--;
    return q->data[q->front++];
}

int main() {
    Queue q;
    initQueue(&q);
    enqueue(&q, 5);
    enqueue(&q, 10);
    enqueue(&q, 15);
    printf("size: %d\\n", q.size);
    printf("dequeue: %d\\n", dequeue(&q));
    printf("dequeue: %d\\n", dequeue(&q));
    printf("size: %d\\n", q.size);
    return 0;
}`}
          expectedOutput={`size: 3
dequeue: 5
dequeue: 10
size: 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stack-queue" lessonId="queue-impl" />
      </div>
      <LessonNav lessons={lessons} currentId="queue-impl" basePath="/learn/stack-queue" />
    </div>
  );
}
