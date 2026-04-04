import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function StructPointersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体ポインタ</h1>
        <p className="text-gray-400">構造体ポインタと-&gt;演算子、mallocによる動的確保を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体ポインタの基礎</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体へのポインタを使うことで、関数間で大きな構造体を効率よく渡せます。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-&gt;</code> 演算子はポインタ経由のメンバアクセスに使い、
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">(*ptr).member</code> の省略形です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">struct T *ptr = &var;</code> でポインタを取得</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ptr-&gt;member</code> でメンバにアクセス</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">malloc(sizeof(struct T))</code> で動的確保</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">-&gt; 演算子の使い方</h2>
        <p className="text-gray-400 mb-4">
          構造体ポインタから <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-&gt;</code> でメンバにアクセスします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Node {
    int value;
    int id;
};

void printNode(struct Node *n) {
    printf("id=%d, value=%d\\n", n->id, n->value);
}

void doubleValue(struct Node *n) {
    n->value *= 2;
}

int main() {
    struct Node node = {42, 1};
    printNode(&node);

    doubleValue(&node);
    printNode(&node);

    // (*ptr).member と ptr->member は等価
    struct Node *ptr = &node;
    printf("直接: %d\\n", (*ptr).value);
    printf("矢印: %d\\n", ptr->value);

    return 0;
}`}
          expectedOutput={`id=1, value=42
id=1, value=84
直接: 84
矢印: 84`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">malloc による動的確保</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">malloc(sizeof(struct T))</code> でヒープに構造体を動的確保します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Person {
    char name[50];
    int age;
};

struct Person *createPerson(const char *name, int age) {
    struct Person *p = (struct Person *)malloc(sizeof(struct Person));
    if (p == NULL) return NULL;
    strncpy(p->name, name, sizeof(p->name) - 1);
    p->name[sizeof(p->name) - 1] = '\\0';
    p->age = age;
    return p;
}

int main() {
    struct Person *alice = createPerson("Alice", 30);
    struct Person *bob   = createPerson("Bob", 25);

    printf("%s: %d歳\\n", alice->name, alice->age);
    printf("%s: %d歳\\n", bob->name, bob->age);

    free(alice);
    free(bob);
    return 0;
}`}
          expectedOutput={`Alice: 30歳
Bob: 25歳`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体ポインタの配列</h2>
        <p className="text-gray-400 mb-4">
          構造体ポインタの配列を使うと、動的に作成した構造体を管理できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct Point {
    int x;
    int y;
};

int main() {
    int n = 3;
    struct Point *points[3];

    for (int i = 0; i < n; i++) {
        points[i] = (struct Point *)malloc(sizeof(struct Point));
        points[i]->x = i * 10;
        points[i]->y = i * 20;
    }

    for (int i = 0; i < n; i++) {
        printf("Point[%d]: (%d, %d)\\n", i, points[i]->x, points[i]->y);
        free(points[i]);
    }

    return 0;
}`}
          expectedOutput={`Point[0]: (0, 0)
Point[1]: (10, 20)
Point[2]: (20, 40)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="struct-pointers" />
      </div>
      <LessonNav lessons={lessons} currentId="struct-pointers" basePath="/learn/structs" />
    </div>
  );
}
