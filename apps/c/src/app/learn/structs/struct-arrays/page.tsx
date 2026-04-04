import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function StructArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体の配列</h1>
        <p className="text-gray-400">struct Person people[10]; による構造体配列の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体の配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体の配列を使うと、同じ型の構造体を複数まとめて管理できます。
          データベースのレコードや、ゲームのキャラクターリストなど実用的な場面で多用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">struct T arr[N];</code> で宣言</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">arr[i].member</code> でアクセス</li>
          <li>ループで一括処理が可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体配列の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">struct Person people[3]</code> で3人分のデータを管理します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

struct Person {
    char name[30];
    int age;
};

int main() {
    struct Person people[3] = {
        {"Alice", 25},
        {"Bob",   30},
        {"Carol", 28},
    };

    for (int i = 0; i < 3; i++) {
        printf("%d: %s (%d歳)\\n", i + 1, people[i].name, people[i].age);
    }

    return 0;
}`}
          expectedOutput={`1: Alice (25歳)
2: Bob (30歳)
3: Carol (28歳)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の検索と操作</h2>
        <p className="text-gray-400 mb-4">
          構造体配列をループで走査して検索や集計ができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

struct Student {
    char name[30];
    int score;
};

int main() {
    struct Student students[] = {
        {"Alice", 85},
        {"Bob",   72},
        {"Carol", 91},
        {"Dave",  68},
    };
    int n = 4;

    // 平均を計算
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += students[i].score;
    }
    printf("平均点: %.1f\\n", (float)total / n);

    // 最高点を見つける
    int maxIdx = 0;
    for (int i = 1; i < n; i++) {
        if (students[i].score > students[maxIdx].score) {
            maxIdx = i;
        }
    }
    printf("最高点: %s (%d点)\\n", students[maxIdx].name, students[maxIdx].score);

    return 0;
}`}
          expectedOutput={`平均点: 79.0
最高点: Carol (91点)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数に構造体配列を渡す</h2>
        <p className="text-gray-400 mb-4">
          構造体配列を関数に渡す場合、配列はポインタとして渡されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Item {
    char name[20];
    int price;
};

void printItems(struct Item *items, int n) {
    for (int i = 0; i < n; i++) {
        printf("%-10s %4d円\\n", items[i].name, items[i].price);
    }
}

int totalPrice(struct Item *items, int n) {
    int total = 0;
    for (int i = 0; i < n; i++) total += items[i].price;
    return total;
}

int main() {
    struct Item cart[] = {
        {"リンゴ",  120},
        {"バナナ",   80},
        {"ミカン",   60},
    };
    int n = 3;

    printItems(cart, n);
    printf("合計: %d円\\n", totalPrice(cart, n));

    return 0;
}`}
          expectedOutput={`リンゴ        120円
バナナ         80円
ミカン         60円
合計: 260円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="struct-arrays" />
      </div>
      <LessonNav lessons={lessons} currentId="struct-arrays" basePath="/learn/structs" />
    </div>
  );
}
