import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function MemberAccessPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メンバアクセス</h1>
        <p className="text-gray-400">ドット演算子と指示付き初期化子（C99）の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メンバアクセスの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体変数のメンバには <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">.</code>（ドット演算子）でアクセスします。
          C99以降では指示付き初期化子（designated initializers）でメンバ名を指定して初期化できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">変数名.メンバ名</code> で読み書き</li>
          <li>指示付き初期化: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{".member = value"}</code></li>
          <li>未指定のメンバは0/NULLに初期化される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ドット演算子でのアクセス</h2>
        <p className="text-gray-400 mb-4">
          構造体変数の各メンバに <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">.</code> でアクセスして読み書きします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Student {
    char name[30];
    int grade;
    float score;
};

int main() {
    struct Student s;

    // ドット演算子で値を設定
    // strcpyの代わりに直接代入はできないのでsnprintf使用
    __builtin_snprintf(s.name, sizeof(s.name), "Bob");
    s.grade = 3;
    s.score = 85.5f;

    // ドット演算子で値を読む
    printf("名前: %s\\n", s.name);
    printf("学年: %d\\n", s.grade);
    printf("スコア: %.1f\\n", s.score);

    return 0;
}`}
          expectedOutput={`名前: Bob
学年: 3
スコア: 85.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">指示付き初期化子（C99）</h2>
        <p className="text-gray-400 mb-4">
          C99の指示付き初期化子を使うと、順番に関係なく名前でメンバを初期化できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Config {
    int width;
    int height;
    int fps;
    int fullscreen;
};

int main() {
    // 指示付き初期化子
    struct Config cfg = {
        .width = 1920,
        .height = 1080,
        .fps = 60,
        .fullscreen = 1,
    };

    printf("解像度: %dx%d\\n", cfg.width, cfg.height);
    printf("FPS: %d\\n", cfg.fps);
    printf("フルスクリーン: %s\\n", cfg.fullscreen ? "はい" : "いいえ");

    // 一部だけ指定（残りは0）
    struct Config minimal = { .width = 800, .height = 600 };
    printf("minimal FPS: %d\\n", minimal.fps);

    return 0;
}`}
          expectedOutput={`解像度: 1920x1080
FPS: 60
フルスクリーン: はい
minimal FPS: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体の代入とコピー</h2>
        <p className="text-gray-400 mb-4">
          構造体変数は <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">=</code> 演算子で丸ごとコピーできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, 20};
    struct Point p2 = p1;  // 構造体のコピー

    // p2を変更してもp1は変わらない
    p2.x = 99;

    printf("p1: (%d, %d)\\n", p1.x, p1.y);
    printf("p2: (%d, %d)\\n", p2.x, p2.y);

    return 0;
}`}
          expectedOutput={`p1: (10, 20)
p2: (99, 20)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="member-access" />
      </div>
      <LessonNav lessons={lessons} currentId="member-access" basePath="/learn/structs" />
    </div>
  );
}
