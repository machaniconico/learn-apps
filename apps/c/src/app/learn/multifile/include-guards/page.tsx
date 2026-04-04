import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("multifile");

export default function IncludeGuardsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">マルチファイル レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インクルードガード</h1>
        <p className="text-gray-400">#ifndef/#define/#endifと#pragma onceで二重インクルードを防ぐ方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">二重インクルード問題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ヘッダファイルが複数回インクルードされると、構造体や関数の宣言が重複してコンパイルエラーになります。
          インクルードガードはこれを防ぐための仕組みです。
        </p>
        <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">{`/* 伝統的なインクルードガード */
#ifndef MYHEADER_H
#define MYHEADER_H

/* ヘッダの内容 */
typedef struct { int x, y; } Point;
void point_print(Point p);

#endif /* MYHEADER_H */

/* モダンな方法（C++/GCC/Clangで広くサポート） */
#pragma once

typedef struct { int x, y; } Point;
void point_print(Point p);`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インクルードガードの動作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#ifndef</code> は「まだ定義されていなければ」という条件です。
          2回目のインクルード時はすでにマクロが定義されているためスキップされます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* インクルードガードの模倣 */
#ifndef POINT_H_INCLUDED
#define POINT_H_INCLUDED

typedef struct {
    int x;
    int y;
} Point;

static inline void point_print(Point p) {
    printf("Point(%d, %d)\\n", p.x, p.y);
}

#endif /* POINT_H_INCLUDED */

/* 2回目の"インクルード"を模倣: マクロ定義済みなので無視 */
#ifndef POINT_H_INCLUDED
#define POINT_H_INCLUDED
/* この中身は展開されない */
typedef struct { int x; int y; } Point;  /* 重複定義にならない */
#endif

int main(void) {
    Point p = {3, 4};
    point_print(p);

    Point q = {10, 20};
    point_print(q);

    return 0;
}`}
          expectedOutput={`Point(3, 4)
Point(10, 20)`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">#pragma once</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#pragma once</code> はファイルの先頭に1行書くだけの簡潔な方法です。
          GCC、Clang、MSVCで広くサポートされます。
          ただしC標準には含まれないため、移植性を最優先する場合は
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#ifndef</code> ガードを使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたインクルードへの対応</h2>
        <p className="text-gray-400 mb-4">
          ヘッダがヘッダをインクルードする場合でも、インクルードガードで安全に管理できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* color.h */
#ifndef COLOR_H
#define COLOR_H
typedef struct { unsigned char r, g, b; } Color;
static inline Color color_rgb(unsigned char r, unsigned char g, unsigned char b) {
    Color c = {r, g, b};
    return c;
}
#endif

/* shape.h (color.h をインクルード) */
#ifndef SHAPE_H
#define SHAPE_H
/* #include "color.h" はここに書く */
typedef struct {
    int x, y, width, height;
    Color fill_color;
} Rect;
#endif

/* main.c */
/* #include "color.h"  -- ガードがなければ二重定義エラー */
/* #include "shape.h"  -- shape.h が color.h をインクルード済み */

int main(void) {
    Color red = color_rgb(255, 0, 0);
    printf("Red: R=%d G=%d B=%d\\n", red.r, red.g, red.b);

    Rect r = {10, 20, 100, 50, color_rgb(0, 128, 255)};
    printf("Rect: (%d,%d) %dx%d\\n", r.x, r.y, r.width, r.height);
    printf("Fill: R=%d G=%d B=%d\\n",
           r.fill_color.r, r.fill_color.g, r.fill_color.b);

    return 0;
}`}
          expectedOutput={`Red: R=255 G=0 B=0
Rect: (10,20) 100x50
Fill: R=0 G=128 B=255`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="multifile" lessonId="include-guards" />
      </div>
      <LessonNav lessons={lessons} currentId="include-guards" basePath="/learn/multifile" />
    </div>
  );
}
