import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function MakefilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビルド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Makefile</h1>
        <p className="text-gray-400">Makefileの構文・ターゲット・依存関係・変数・phonyターゲットを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Makefileの基本構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Makefileはビルドの自動化ツールです。ターゲット、依存関係、レシピの3要素で構成されます。
          レシピはタブ文字でインデントします（スペース不可）。
        </p>
        <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">{`ターゲット: 依存関係1 依存関係2
\tレシピコマンド

# 例:
hello: main.o utils.o
\tgcc main.o utils.o -o hello

main.o: main.c utils.h
\tgcc -c main.c -o main.o`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Makefileの変数</h2>
        <p className="text-gray-400 mb-4">
          変数を使うとコンパイラやフラグの変更が一箇所で済みます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">$(VAR)</code> で参照します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* Makefile の例:
 *
 * CC = gcc
 * CFLAGS = -Wall -Wextra -std=c11
 * TARGET = myapp
 * SRCS = main.c math.c
 * OBJS = $(SRCS:.c=.o)
 *
 * $(TARGET): $(OBJS)
 *     $(CC) $(OBJS) -o $(TARGET)
 *
 * %.o: %.c
 *     $(CC) $(CFLAGS) -c $< -o $@
 *
 * .PHONY: clean
 * clean:
 *     rm -f $(OBJS) $(TARGET)
 */

int add(int a, int b) { return a + b; }

int main(void) {
    printf("Makefileビルド成功\\n");
    printf("add(10, 20) = %d\\n", add(10, 20));
    return 0;
}`}
          expectedOutput={`Makefileビルド成功
add(10, 20) = 30`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">自動変数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Makefileの自動変数はレシピ内でよく使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">$@</code> — ターゲット名</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">$&lt;</code> — 最初の依存ファイル</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">$^</code> — すべての依存ファイル</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%.o: %.c</code> — パターンルール</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">.PHONYターゲット</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">.PHONY</code> はファイルではなくコマンドとして機能するターゲットです。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">clean</code> や <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">all</code> によく使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* .PHONY の使い方:
 *
 * .PHONY: all clean test
 *
 * all: myapp
 *     @echo "ビルド完了"
 *
 * clean:
 *     rm -f *.o myapp
 *     @echo "クリーンアップ完了"
 *
 * test: myapp
 *     ./myapp
 *
 * "clean" というファイルが存在しても
 * make clean は必ず実行される
 */

int main(void) {
    printf("make all -> ビルド\\n");
    printf("make clean -> 中間ファイル削除\\n");
    printf("make test -> テスト実行\\n");
    return 0;
}`}
          expectedOutput={`make all -> ビルド
make clean -> 中間ファイル削除
make test -> テスト実行`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐とinclude</h2>
        <p className="text-gray-400 mb-4">
          Makefileは条件分岐や他ファイルのインクルードもサポートします。
          デバッグ/リリースの切り替えに便利です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* 条件付きMakefile:
 *
 * DEBUG ?= 0
 * ifeq ($(DEBUG), 1)
 *     CFLAGS = -g -O0 -DDEBUG
 *     BUILD_TYPE = debug
 * else
 *     CFLAGS = -O2 -DNDEBUG
 *     BUILD_TYPE = release
 * endif
 *
 * all:
 *     @echo "Build type: $(BUILD_TYPE)"
 *
 * 使い方:
 *   make          -> release ビルド
 *   make DEBUG=1  -> debug ビルド
 */

int main(void) {
#ifdef DEBUG
    printf("デバッグビルド\\n");
#else
    printf("リリースビルド\\n");
#endif
    printf("Makefile条件分岐の例\\n");
    return 0;
}`}
          expectedOutput={`リリースビルド
Makefile条件分岐の例`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="makefile" />
      </div>
      <LessonNav lessons={lessons} currentId="makefile" basePath="/learn/build" />
    </div>
  );
}
