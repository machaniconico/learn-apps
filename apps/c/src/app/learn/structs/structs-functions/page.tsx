import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function StructsFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体と関数</h1>
        <p className="text-gray-400">値渡しとポインタ渡しで構造体を関数に渡す方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値渡しとポインタ渡し</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体を関数に渡す方法は2つあります。値渡しはコピーを作るので元の構造体は変更されません。
          ポインタ渡しはアドレスを渡すので元の構造体を変更でき、大きな構造体でも効率的です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>値渡し: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">void func(struct T s)</code> - コピーが渡される</li>
          <li>ポインタ渡し: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">void func(struct T *s)</code> - アドレスが渡される</li>
          <li>大きな構造体は値渡しより <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">const struct T *</code> が効率的</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値渡し</h2>
        <p className="text-gray-400 mb-4">
          値渡しでは構造体のコピーが作られます。関数内での変更は元の構造体に影響しません。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Point {
    int x;
    int y;
};

double distance(struct Point p1, struct Point p2) {
    int dx = p2.x - p1.x;
    int dy = p2.y - p1.y;
    // 簡単のため整数演算で近似
    return dx * dx + dy * dy;
}

void printPoint(struct Point p) {
    printf("(%d, %d)\\n", p.x, p.y);
}

int main() {
    struct Point a = {0, 0};
    struct Point b = {3, 4};

    printPoint(a);
    printPoint(b);
    printf("距離の二乗: %.0f\\n", distance(a, b));

    return 0;
}`}
          expectedOutput={`(0, 0)
(3, 4)
距離の二乗: 25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ渡しで変更</h2>
        <p className="text-gray-400 mb-4">
          ポインタ渡しでは元の構造体を変更できます。<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-&gt;</code> 演算子でメンバにアクセスします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Counter {
    int value;
    int max;
};

void increment(struct Counter *c) {
    if (c->value < c->max) {
        c->value++;
    }
}

void reset(struct Counter *c) {
    c->value = 0;
}

int main() {
    struct Counter c = {0, 3};

    printf("初期値: %d\\n", c.value);
    increment(&c);
    increment(&c);
    printf("2回増加後: %d\\n", c.value);
    increment(&c);
    increment(&c);  // maxを超えない
    printf("上限チェック後: %d\\n", c.value);
    reset(&c);
    printf("リセット後: %d\\n", c.value);

    return 0;
}`}
          expectedOutput={`初期値: 0
2回増加後: 2
上限チェック後: 3
リセット後: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体を返す関数</h2>
        <p className="text-gray-400 mb-4">
          関数が構造体を戻り値として返すこともできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Vector2 {
    float x;
    float y;
};

struct Vector2 add(struct Vector2 a, struct Vector2 b) {
    struct Vector2 result = {a.x + b.x, a.y + b.y};
    return result;
}

struct Vector2 scale(struct Vector2 v, float s) {
    struct Vector2 result = {v.x * s, v.y * s};
    return result;
}

int main() {
    struct Vector2 v1 = {1.0f, 2.0f};
    struct Vector2 v2 = {3.0f, 4.0f};

    struct Vector2 sum = add(v1, v2);
    printf("合計: (%.1f, %.1f)\\n", sum.x, sum.y);

    struct Vector2 scaled = scale(v1, 3.0f);
    printf("3倍: (%.1f, %.1f)\\n", scaled.x, scaled.y);

    return 0;
}`}
          expectedOutput={`合計: (4.0, 6.0)
3倍: (3.0, 6.0)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="structs-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="structs-functions" basePath="/learn/structs" />
    </div>
  );
}
