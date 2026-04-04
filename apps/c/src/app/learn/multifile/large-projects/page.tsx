import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("multifile");

export default function LargeProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">マルチファイル レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">大規模プロジェクト</h1>
        <p className="text-gray-400">プロジェクト構造・前方宣言・依存関係の管理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">典型的なプロジェクト構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          大規模プロジェクトではディレクトリを機能ごとに分けます。
        </p>
        <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">{`project/
├── include/          # 公開ヘッダ (.h)
│   ├── math_utils.h
│   ├── string_utils.h
│   └── config.h
├── src/              # ソースファイル (.c)
│   ├── math_utils.c
│   ├── string_utils.c
│   └── main.c
├── tests/            # テストコード
│   └── test_math.c
├── lib/              # サードパーティライブラリ
└── Makefile`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">前方宣言で循環依存を解決</h2>
        <p className="text-gray-400 mb-4">
          構造体が互いを参照する場合、前方宣言（forward declaration）でポインタを使えるようにします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* 前方宣言: 構造体の存在だけを先に知らせる */
struct Employee;
struct Department;

typedef struct Employee Employee;
typedef struct Department Department;

struct Department {
    char name[64];
    Employee *head;   /* Employee の前方宣言が必要 */
    int size;
};

struct Employee {
    char name[64];
    Department *dept; /* Department の前方宣言が必要 */
    Employee *next;
};

Department *dept_create(const char *name) {
    Department *d = malloc(sizeof(Department));
    strncpy(d->name, name, 63);
    d->head = NULL;
    d->size = 0;
    return d;
}

void dept_add_employee(Department *d, const char *name) {
    Employee *e = malloc(sizeof(Employee));
    strncpy(e->name, name, 63);
    e->dept = d;
    e->next = d->head;
    d->head = e;
    d->size++;
}

int main(void) {
    Department *eng = dept_create("エンジニアリング");
    dept_add_employee(eng, "田中");
    dept_add_employee(eng, "鈴木");
    dept_add_employee(eng, "佐藤");

    printf("部署: %s (%d名)\\n", eng->name, eng->size);
    for (Employee *e = eng->head; e != NULL; e = e->next) {
        printf("  - %s\\n", e->name);
    }

    /* クリーンアップ省略 */
    return 0;
}`}
          expectedOutput={`部署: エンジニアリング (3名)
  - 佐藤
  - 鈴木
  - 田中`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">依存関係の管理</h2>
        <p className="text-gray-400 mb-4">
          ヘッダが他のヘッダを必要とする場合の依存関係管理です。
          循環依存を避け、依存の方向を一方向に保ちます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>

/* 層構造の設計:
 * Layer3 (application) -> Layer2 (domain) -> Layer1 (utils)
 * 逆方向の依存は禁止
 */

/* Layer1: 基本ユーティリティ */
typedef struct {
    uint8_t data[4];
    uint32_t size;
} ByteBuffer;

static inline void buffer_init(ByteBuffer *b) {
    b->size = 0;
}

static inline int buffer_write(ByteBuffer *b, uint8_t byte) {
    if (b->size >= 4) return -1;
    b->data[b->size++] = byte;
    return 0;
}

/* Layer2: ドメインロジック（Layer1に依存） */
typedef struct {
    ByteBuffer payload;
    uint8_t checksum;
} Packet;

static Packet packet_create(uint8_t a, uint8_t b) {
    Packet p = {0};
    buffer_init(&p.payload);
    buffer_write(&p.payload, a);
    buffer_write(&p.payload, b);
    p.checksum = (uint8_t)(a ^ b);
    return p;
}

/* Layer3: アプリケーション（Layer2に依存） */
int main(void) {
    Packet pkt = packet_create(0xAB, 0xCD);
    printf("パケット: [%02X %02X]\\n",
           pkt.payload.data[0], pkt.payload.data[1]);
    printf("チェックサム: %02X\\n", pkt.checksum);
    printf("サイズ: %u\\n", pkt.payload.size);
    return 0;
}`}
          expectedOutput={`パケット: [AB CD]
チェックサム: 66
サイズ: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">不透明ポインタによるカプセル化</h2>
        <p className="text-gray-400 mb-4">
          内部実装を隠蔽するために不透明ポインタ（opaque pointer）を使います。
          ヘッダでは構造体を前方宣言のみし、実装を.cに隠します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* ---- queue.h ----
 * typedef struct Queue Queue;  // 不透明ポインタ
 * Queue *queue_create(int capacity);
 * void   queue_destroy(Queue *q);
 * int    queue_enqueue(Queue *q, int val);
 * int    queue_dequeue(Queue *q, int *val);
 * int    queue_size(const Queue *q);
 * ------------------- */

/* ---- queue.c ---- (内部実装は隠蔽) */
typedef struct Queue {
    int *data;
    int head, tail, size, capacity;
} Queue;

Queue *queue_create(int cap) {
    Queue *q = malloc(sizeof(Queue));
    q->data = malloc(sizeof(int) * cap);
    q->head = q->tail = q->size = 0;
    q->capacity = cap;
    return q;
}

int queue_enqueue(Queue *q, int val) {
    if (q->size >= q->capacity) return -1;
    q->data[q->tail] = val;
    q->tail = (q->tail + 1) % q->capacity;
    q->size++;
    return 0;
}

int queue_dequeue(Queue *q, int *val) {
    if (q->size == 0) return -1;
    *val = q->data[q->head];
    q->head = (q->head + 1) % q->capacity;
    q->size--;
    return 0;
}

int queue_size(const Queue *q) { return q->size; }

void queue_destroy(Queue *q) { free(q->data); free(q); }

/* ---- main.c ---- */
int main(void) {
    Queue *q = queue_create(8);
    queue_enqueue(q, 10);
    queue_enqueue(q, 20);
    queue_enqueue(q, 30);

    printf("サイズ: %d\\n", queue_size(q));

    int v;
    while (queue_dequeue(q, &v) == 0) {
        printf("dequeue: %d\\n", v);
    }

    queue_destroy(q);
    return 0;
}`}
          expectedOutput={`サイズ: 3
dequeue: 10
dequeue: 20
dequeue: 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="multifile" lessonId="large-projects" />
      </div>
      <LessonNav lessons={lessons} currentId="large-projects" basePath="/learn/multifile" />
    </div>
  );
}
