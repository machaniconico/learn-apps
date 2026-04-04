import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">条件に応じて処理を分岐させる基本構文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if-else文の構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">if</code> 文は条件が真（非ゼロ）のときにブロックを実行します。
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">else</code> は条件が偽のときに実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>条件は丸括弧 <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">( )</code> で囲む</li>
          <li>ブロックは波括弧 <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">&#123; &#125;</code> で囲む（1文でも推奨）</li>
          <li>C言語に真偽値型はなく、0が偽、それ以外が真</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なif-else</h2>
        <p className="text-gray-400 mb-4">
          条件が真か偽かで実行するコードを切り替えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int number = 7;

    if (number > 0) {
        printf("%d は正の数です\\n", number);
    } else {
        printf("%d は0以下です\\n", number);
    }

    // 偶数・奇数の判定
    if (number % 2 == 0) {
        printf("%d は偶数です\\n", number);
    } else {
        printf("%d は奇数です\\n", number);
    }

    return 0;
}`}
          expectedOutput={`7 は正の数です
7 は奇数です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたif-else</h2>
        <p className="text-gray-400 mb-4">
          if-elseはネストして複数の条件を組み合わせられます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("評価: 優\\n");
    } else {
        if (score >= 70) {
            printf("評価: 良\\n");
        } else {
            if (score >= 60) {
                printf("評価: 可\\n");
            } else {
                printf("評価: 不可\\n");
            }
        }
    }

    // 複数条件の組み合わせ
    int age = 20;
    int has_id = 1;  // 1=true, 0=false

    if (age >= 18 && has_id) {
        printf("入場できます\\n");
    } else {
        printf("入場できません\\n");
    }

    return 0;
}`}
          expectedOutput={`評価: 良
入場できます`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
