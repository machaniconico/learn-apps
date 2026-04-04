import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElseIfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">else if</h1>
        <p className="text-gray-400">複数条件を順番にチェックする方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">else ifの構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">else if</code> を使うと複数の条件を順番にチェックできます。
          条件は上から順に評価され、最初に真になったブロックだけが実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>複数の条件を順番にチェックしたいときに使う</li>
          <li>一度条件が真になると残りの条件はチェックされない</li>
          <li>最後の <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">else</code> はデフォルトの処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">成績判定</h2>
        <p className="text-gray-400 mb-4">
          else if を使って複数の範囲で値を振り分けます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int score = 75;

    if (score >= 90) {
        printf("A: 優秀\\n");
    } else if (score >= 80) {
        printf("B: 良好\\n");
    } else if (score >= 70) {
        printf("C: 普通\\n");
    } else if (score >= 60) {
        printf("D: やや不足\\n");
    } else {
        printf("F: 不合格\\n");
    }

    printf("スコア: %d点\\n", score);
    return 0;
}`}
          expectedOutput={`C: 普通
スコア: 75点`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BMI判定</h2>
        <p className="text-gray-400 mb-4">
          実用的な例として、BMI（体格指数）の判定を実装します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    double weight = 65.0;  // kg
    double height = 1.70;  // m

    double bmi = weight / (height * height);
    printf("BMI: %.1f\\n", bmi);

    if (bmi < 18.5) {
        printf("判定: 低体重\\n");
    } else if (bmi < 25.0) {
        printf("判定: 普通体重\\n");
    } else if (bmi < 30.0) {
        printf("判定: 肥満（1度）\\n");
    } else {
        printf("判定: 肥満（2度以上）\\n");
    }

    return 0;
}`}
          expectedOutput={`BMI: 22.5
判定: 普通体重`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
