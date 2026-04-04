import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stack-queue");

export default function CircularQueuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">スタック・キュー レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">循環キュー</h1>
        <p className="text-gray-400">循環バッファを使って配列の末尾に達したらインデックスを折り返す循環キューを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">循環キューが必要な理由</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          線形キューでは dequeue を繰り返すと front が進み、配列の前方に空きができても使えなくなります。
          循環キューでは front と rear がインデックスの末尾に達したら先頭に折り返すことで空きを再利用します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>インデックスを更新する際に <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">% MAX</code> を使って折り返す</li>
          <li>満杯判定：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">(rear + 1) % MAX == front</code></li>
          <li>空判定：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">front == rear</code></li>
          <li>MAX 個の配列で MAX-1 個の要素が格納できる（1スロットは区別のために空ける）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">循環キューの実装</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">rear = (rear + 1) % MAX</code> で
          インデックスを循環させます。これにより配列を効率的に再利用できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 5

int queue[MAX];
int front = 0, rear = 0;

int isEmpty() { return front == rear; }
int isFull()  { return (rear + 1) % MAX == front; }

void enqueue(int val) {
    if (isFull()) { printf("Full\\n"); return; }
    queue[rear] = val;
    rear = (rear + 1) % MAX;
}

int dequeue() {
    if (isEmpty()) { printf("Empty\\n"); return -1; }
    int val = queue[front];
    front = (front + 1) % MAX;
    return val;
}

int main() {
    enqueue(10); enqueue(20); enqueue(30); enqueue(40);
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    /* 空きができたので再度 enqueue できる */
    enqueue(50); enqueue(60);
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    printf("dequeue: %d\\n", dequeue());
    return 0;
}`}
          expectedOutput={`dequeue: 10
dequeue: 20
dequeue: 30
dequeue: 40
dequeue: 50
dequeue: 60`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">size フィールドを使った実装</h2>
        <p className="text-gray-400 mb-4">
          size フィールドを追加すると満杯・空の判定が直感的になり、格納できる要素数も MAX 個になります。
          front == rear の状態が空か満杯か区別する必要がなくなります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 4

typedef struct {
    int data[MAX];
    int front, rear, size;
} CQueue;

void init(CQueue *q) { q->front = q->rear = q->size = 0; }
int  isEmpty(CQueue *q) { return q->size == 0; }
int  isFull(CQueue *q)  { return q->size == MAX; }

void enqueue(CQueue *q, int v) {
    if (isFull(q)) return;
    q->data[q->rear] = v;
    q->rear = (q->rear + 1) % MAX;
    q->size++;
}

int dequeue(CQueue *q) {
    if (isEmpty(q)) return -1;
    int v = q->data[q->front];
    q->front = (q->front + 1) % MAX;
    q->size--;
    return v;
}

int main() {
    CQueue q; init(&q);
    enqueue(&q, 1); enqueue(&q, 2); enqueue(&q, 3); enqueue(&q, 4);
    printf("size=%d\\n", q.size);
    printf("%d %d\\n", dequeue(&q), dequeue(&q));
    enqueue(&q, 5); enqueue(&q, 6);
    printf("size=%d\\n", q.size);
    while (!isEmpty(&q)) printf("%d ", dequeue(&q));
    printf("\\n");
    return 0;
}`}
          expectedOutput={`size=4
1 2
size=4
3 4 5 6 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stack-queue" lessonId="circular-queue" />
      </div>
      <LessonNav lessons={lessons} currentId="circular-queue" basePath="/learn/stack-queue" />
    </div>
  );
}
