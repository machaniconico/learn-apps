import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("searching");

export default function HashPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">探索アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ハッシュ探索</h1>
        <p className="text-gray-400">ハッシュ表・ハッシュ関数・連鎖法による衝突処理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュ表とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ハッシュ表はキーをハッシュ関数でインデックスに変換して配列に格納するデータ構造です。
          平均 O(1) で挿入・探索・削除ができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ハッシュ関数：キー → インデックスへの写像</li>
          <li>衝突：2つの異なるキーが同じインデックスになること</li>
          <li>連鎖法（chaining）：同じインデックスに連結リストで格納</li>
          <li>開番地法（open addressing）：別のインデックスを探す</li>
          <li>平均時間計算量：O(1)、最悪 O(n)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなハッシュ関数</h2>
        <p className="text-gray-400 mb-4">
          整数値に対するシンプルなハッシュ関数は <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">key % TABLE_SIZE</code> です。
          TABLE_SIZE を素数にすると衝突が減ります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define SIZE 7  /* 素数を使う */

int table[SIZE];
int used[SIZE];

void initTable() {
    for (int i = 0; i < SIZE; i++) used[i] = 0;
}

int hash(int key) { return key % SIZE; }

/* 線形探索法（open addressing）で挿入 */
void insert(int key) {
    int idx = hash(key);
    int start = idx;
    while (used[idx]) {
        idx = (idx + 1) % SIZE;
        if (idx == start) return;  /* 満杯 */
    }
    table[idx] = key;
    used[idx] = 1;
}

int search(int key) {
    int idx = hash(key);
    int start = idx;
    while (used[idx]) {
        if (table[idx] == key) return idx;
        idx = (idx + 1) % SIZE;
        if (idx == start) break;
    }
    return -1;
}

int main() {
    initTable();
    insert(10); insert(20); insert(15); insert(7);

    printf("search(15): index %d\\n", search(15));
    printf("search(7):  index %d\\n", search(7));
    printf("search(99): index %d\\n", search(99));
    return 0;
}`}
          expectedOutput={`search(15): index 1
search(7):  index 0
search(99): index -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">連鎖法（chaining）による衝突処理</h2>
        <p className="text-gray-400 mb-4">
          各バケットに連結リストを持たせて衝突を処理します。
          衝突が多くても性能が安定し、負荷率が高くても動作します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#define SIZE 5

struct Node { int key; struct Node *next; };
struct Node *table[SIZE];

void initTable() {
    for (int i = 0; i < SIZE; i++) table[i] = NULL;
}

int hash(int key) { return key % SIZE; }

void insert(int key) {
    int idx = hash(key);
    struct Node *n = malloc(sizeof(struct Node));
    n->key = key; n->next = table[idx];
    table[idx] = n;
}

int search(int key) {
    int idx = hash(key);
    for (struct Node *p = table[idx]; p; p = p->next)
        if (p->key == key) return idx;
    return -1;
}

int main() {
    initTable();
    insert(5); insert(10); insert(15);  /* 同じバケット: 5%5=0 */
    insert(3); insert(8);

    printf("search(10): bucket %d\\n", search(10));
    printf("search(3):  bucket %d\\n", search(3));
    printf("search(7):  bucket %d\\n", search(7));
    return 0;
}`}
          expectedOutput={`search(10): bucket 0
search(3):  bucket 3
search(7):  bucket -1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="searching" lessonId="hash" />
      </div>
      <LessonNav lessons={lessons} currentId="hash" basePath="/learn/searching" />
    </div>
  );
}
