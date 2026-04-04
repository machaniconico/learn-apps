import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function NullPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NULLポインタ</h1>
        <p className="text-gray-400">NULLの意味と安全なNULLチェックのパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NULLポインタは「どこも指していない」ポインタを表します。
          値は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">0</code> またはマクロ
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">NULL</code>（stddef.hやstdio.hで定義）で表されます。
          NULLポインタをデリファレンスすると<strong className="text-red-400">セグメンテーション違反</strong>が発生します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>初期化: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int *p = NULL;</code></li>
          <li>NULLチェック: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">if (p != NULL)</code> または <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">if (p)</code></li>
          <li>使用後のクリア: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">p = NULL;</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NULLの初期化とチェック</h2>
        <p className="text-gray-400 mb-4">
          ポインタは必ずNULLまたは有効なアドレスで初期化しましょう。
          使用前にNULLチェックするのが安全なプログラミングの基本です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = NULL;   // NULLで初期化

    // NULLチェック
    if (p == NULL) {
        printf("pはNULLです（まだ初期化されていない）\\n");
    }

    // 値を代入してから使用
    int x = 42;
    p = &x;

    if (p != NULL) {
        printf("pは有効: *p = %d\\n", *p);
    }

    // 使用後にNULLに戻す
    p = NULL;
    printf("リセット後: p == NULL: %s\\n", (p == NULL) ? "true" : "false");

    return 0;
}`}
          expectedOutput={`pはNULLです（まだ初期化されていない）
pは有効: *p = 42
リセット後: p == NULL: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の戻り値でのNULL活用</h2>
        <p className="text-gray-400 mb-4">
          関数がポインタを返す場合、失敗時にNULLを返すパターンが一般的です。
          呼び出し側は必ずNULLチェックを行います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 線形探索：見つかったら要素のポインタ、なければNULL
int *find(int *arr, int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return &arr[i];
        }
    }
    return NULL;  // 見つからなかった
}

int main() {
    int data[] = {10, 20, 30, 40, 50};
    int n = 5;

    int *found = find(data, n, 30);
    if (found != NULL) {
        printf("30が見つかりました: %d\\n", *found);
    } else {
        printf("30は見つかりませんでした\\n");
    }

    found = find(data, n, 99);
    if (found != NULL) {
        printf("99が見つかりました: %d\\n", *found);
    } else {
        printf("99は見つかりませんでした\\n");
    }

    return 0;
}`}
          expectedOutput={`30が見つかりました: 30
99は見つかりませんでした`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="null-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="null-pointer" basePath="/learn/pointers" />
    </div>
  );
}
