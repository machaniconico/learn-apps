import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function StaticFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">static関数・変数</h1>
        <p className="text-gray-400">staticキーワードの関数・変数への適用を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">staticキーワードの意味</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">static</code> は宣言する場所によって異なる効果があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-teal-400">関数内のstatic変数</strong>：関数呼び出し間で値を保持する（ローカルスコープを保ちつつ）</li>
          <li><strong className="text-teal-400">static関数</strong>：そのファイル内でのみ使用可能（他ファイルから隠蔽）</li>
          <li>static変数はプログラム開始時に初期化され、終了まで存在する</li>
          <li>初期化しない場合は0で初期化される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static変数で呼び出し回数を記録</h2>
        <p className="text-gray-400 mb-4">
          static変数は関数を何度呼んでも値が保持されます。カウンタやキャッシュに使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void counter() {
    static int count = 0;  // 最初の呼び出し時のみ0で初期化
    count++;
    printf("呼び出し回数: %d\\n", count);
}

// IDジェネレータ
int next_id() {
    static int id = 100;
    return id++;
}

// フィボナッチ数列（メモ化の簡易版）
int fib_cached(int n) {
    static int cache[20] = {0};
    if (n <= 1) return n;
    if (cache[n] != 0) return cache[n];
    cache[n] = fib_cached(n-1) + fib_cached(n-2);
    return cache[n];
}

int main() {
    counter();
    counter();
    counter();

    printf("\\nID生成:\\n");
    for (int i = 0; i < 5; i++) {
        printf("ID: %d\\n", next_id());
    }

    printf("\\nfib(10) = %d\\n", fib_cached(10));

    return 0;
}`}
          expectedOutput={`呼び出し回数: 1
呼び出し回数: 2
呼び出し回数: 3

ID生成:
ID: 100
ID: 101
ID: 102
ID: 103
ID: 104

fib(10) = 55`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static変数 vs グローバル変数</h2>
        <p className="text-gray-400 mb-4">
          static変数はグローバル変数よりスコープが制限されるため、より安全です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// static変数を使ったカプセル化
void add_to_total(int value) {
    static int total = 0;
    total += value;
    printf("追加: %d, 合計: %d\\n", value, total);
}

int get_call_count() {
    static int calls = 0;
    calls++;
    return calls;
}

int main() {
    add_to_total(10);
    add_to_total(25);
    add_to_total(15);

    printf("\\n関数呼び出し番号:\\n");
    printf("呼び出し#%d\\n", get_call_count());
    printf("呼び出し#%d\\n", get_call_count());
    printf("呼び出し#%d\\n", get_call_count());

    return 0;
}`}
          expectedOutput={`追加: 10, 合計: 10
追加: 25, 合計: 35
追加: 15, 合計: 50

関数呼び出し番号:
呼び出し#1
呼び出し#2
呼び出し#3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="static-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="static-functions" basePath="/learn/functions" />
    </div>
  );
}
