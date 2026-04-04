import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch文</h1>
        <p className="text-gray-400">値に基づく多分岐処理のswitch構文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文の構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">switch</code> は整数値やchar値に基づいて複数の処理に分岐します。
          各ケースの最後に <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">break</code> を書かないとfall-throughが発生します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>整数・char・列挙型（enum）に対して使える</li>
          <li>各 <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">case</code> の値は定数でなければならない</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">break</code> がないと次のcaseも実行される（fall-through）</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">default</code> はどのcaseにも一致しないときに実行される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なswitch文</h2>
        <p className="text-gray-400 mb-4">
          曜日の番号から曜日名を表示する例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("月曜日\\n");
            break;
        case 2:
            printf("火曜日\\n");
            break;
        case 3:
            printf("水曜日\\n");
            break;
        case 4:
            printf("木曜日\\n");
            break;
        case 5:
            printf("金曜日\\n");
            break;
        case 6:
            printf("土曜日\\n");
            break;
        case 7:
            printf("日曜日\\n");
            break;
        default:
            printf("無効な値\\n");
    }

    return 0;
}`}
          expectedOutput={`水曜日`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fall-throughとcase共有</h2>
        <p className="text-gray-400 mb-4">
          breakを省略するとfall-throughが発生します。複数のcaseを同じ処理にまとめることもできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int month = 4;

    // 複数のcaseを共有
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            printf("%d月は31日あります\\n", month);
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            printf("%d月は30日あります\\n", month);
            break;
        case 2:
            printf("2月は28日（または29日）あります\\n");
            break;
        default:
            printf("無効な月です\\n");
    }

    return 0;
}`}
          expectedOutput={`4月は30日あります`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch" />
      </div>
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
