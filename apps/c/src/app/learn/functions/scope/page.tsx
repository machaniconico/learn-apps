import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ScopePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スコープ</h1>
        <p className="text-gray-400">ローカル・グローバル・ブロックスコープを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数のスコープ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数が参照できる範囲を<strong className="text-teal-400">スコープ</strong>といいます。
          C言語には主に3種類のスコープがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-teal-400">ローカル変数</strong>：関数内で宣言、その関数内だけで有効</li>
          <li><strong className="text-teal-400">グローバル変数</strong>：関数外で宣言、全ての関数から参照可能</li>
          <li><strong className="text-teal-400">ブロックスコープ</strong>：&#123; &#125; 内で宣言、そのブロック内だけで有効</li>
          <li>同名の変数がある場合、内側のスコープが優先（シャドウイング）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ローカル変数とグローバル変数</h2>
        <p className="text-gray-400 mb-4">
          グローバル変数は全体から参照できますが、多用するとコードが複雑になります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// グローバル変数（全関数から参照可能）
int global_count = 0;

void increment() {
    global_count++;  // グローバル変数を変更
    int local = 100; // ローカル変数（この関数内だけ）
    printf("increment: global=%d, local=%d\\n", global_count, local);
}

void show_count() {
    printf("show_count: global=%d\\n", global_count);
    // local はここからは参照できない
}

int main() {
    printf("最初: global=%d\\n", global_count);
    increment();
    increment();
    show_count();

    // ローカル変数
    int x = 10;
    printf("main: x=%d\\n", x);

    return 0;
}`}
          expectedOutput={`最初: global=0
increment: global=1, local=100
increment: global=2, local=100
show_count: global=2
main: x=10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ブロックスコープとシャドウイング</h2>
        <p className="text-gray-400 mb-4">
          ブロック内の変数は外側の同名変数を隠します（シャドウイング）。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 1;
    printf("外側 x = %d\\n", x);

    {
        int x = 2;  // 外側のxを隠す（シャドウイング）
        printf("内側 x = %d\\n", x);

        {
            int x = 3;
            printf("最内側 x = %d\\n", x);
        }

        printf("内側に戻る x = %d\\n", x);
    }

    printf("外側に戻る x = %d\\n", x);

    // forループのスコープ
    for (int i = 0; i < 3; i++) {
        int temp = i * 2;
        printf("i=%d, temp=%d\\n", i, temp);
    }
    // i と temp はここでは使えない

    return 0;
}`}
          expectedOutput={`外側 x = 1
内側 x = 2
最内側 x = 3
内側に戻る x = 2
外側に戻る x = 1
i=0, temp=0
i=1, temp=2
i=2, temp=4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="scope" />
      </div>
      <LessonNav lessons={lessons} currentId="scope" basePath="/learn/functions" />
    </div>
  );
}
