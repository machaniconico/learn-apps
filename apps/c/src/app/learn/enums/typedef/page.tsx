import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("enums");

export default function TypedefPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">enum・型 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">typedef</h1>
        <p className="text-gray-400">typedef unsigned long size_t; typedef struct {"{ }"} Name; の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">typedef とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">typedef</code> は既存の型に新しい名前（別名）をつけます。
          コードの可読性向上・移植性確保・複雑な型の簡略化に使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">typedef 既存の型 新しい名前;</code></li>
          <li>structと組み合わせると <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">struct</code> キーワードが不要になる</li>
          <li>標準ライブラリの <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">size_t</code> も typedef で定義されている</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な typedef</h2>
        <p className="text-gray-400 mb-4">
          プリミティブ型に意味のある名前をつけてコードを明確にします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef unsigned char  uint8;
typedef unsigned short uint16;
typedef unsigned int   uint32;
typedef int            bool_t;

#define TRUE  1
#define FALSE 0

int main() {
    uint8  a = 255;
    uint16 b = 65535;
    uint32 c = 4294967295U;
    bool_t flag = TRUE;

    printf("uint8:  %u\\n", a);
    printf("uint16: %u\\n", b);
    printf("uint32: %u\\n", c);
    printf("flag:   %s\\n", flag ? "true" : "false");

    return 0;
}`}
          expectedOutput={`uint8:  255
uint16: 65535
uint32: 4294967295
flag:   true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">typedef struct</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">typedef struct</code> で struct キーワードを省略できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// typedef なし → 毎回 struct が必要
struct Point { int x; int y; };

// typedef あり → 型名だけで使える
typedef struct {
    int x;
    int y;
} Vec2;

typedef struct {
    Vec2 position;
    Vec2 velocity;
    int  health;
} Player;

int main() {
    struct Point p = {1, 2};   // struct が必要
    Vec2 v = {3, 4};           // struct 不要
    Player pl = {{0, 0}, {1, 0}, 100};

    printf("Point: (%d, %d)\\n", p.x, p.y);
    printf("Vec2:  (%d, %d)\\n", v.x, v.y);
    printf("Player pos=(%d,%d) hp=%d\\n",
        pl.position.x, pl.position.y, pl.health);

    return 0;
}`}
          expectedOutput={`Point: (1, 2)
Vec2:  (3, 4)
Player pos=(0,0) hp=100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">typedef enum</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">typedef enum</code> で enum キーワードも省略できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef enum {
    STATE_IDLE,
    STATE_RUNNING,
    STATE_PAUSED,
    STATE_STOPPED,
} State;

const char *stateName(State s) {
    switch (s) {
        case STATE_IDLE:    return "アイドル";
        case STATE_RUNNING: return "実行中";
        case STATE_PAUSED:  return "一時停止";
        case STATE_STOPPED: return "停止";
        default:            return "不明";
    }
}

int main() {
    State s = STATE_RUNNING;
    printf("状態: %s\\n", stateName(s));
    s = STATE_PAUSED;
    printf("状態: %s\\n", stateName(s));
    return 0;
}`}
          expectedOutput={`状態: 実行中
状態: 一時停止`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="typedef" />
      </div>
      <LessonNav lessons={lessons} currentId="typedef" basePath="/learn/enums" />
    </div>
  );
}
