import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElseIfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">else if</h1>
        <p className="text-gray-400">複数の条件を順番にチェックするelse ifチェーンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">else ifとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else if</code> を使うと、
          最初の条件がfalseの場合に別の条件を順番にチェックできます。
          上から順に評価され、最初にtrueになった分岐が実行されます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          どの条件にも該当しない場合に備えて、最後に
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else</code> を置くのが良い習慣です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">成績判定の例</h2>
        <p className="text-gray-400 mb-4">スコアに応じてグレードを判定します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int score = 85;

    if (score >= 90) {
        cout << "グレード: A（優秀）" << endl;
    } else if (score >= 80) {
        cout << "グレード: B（良好）" << endl;
    } else if (score >= 70) {
        cout << "グレード: C（普通）" << endl;
    } else if (score >= 60) {
        cout << "グレード: D（合格）" << endl;
    } else {
        cout << "グレード: F（不合格）" << endl;
    }

    // BMI判定
    double bmi = 22.5;
    cout << "BMI: " << bmi << " → ";

    if (bmi < 18.5)
        cout << "低体重" << endl;
    else if (bmi < 25.0)
        cout << "普通体重" << endl;
    else if (bmi < 30.0)
        cout << "肥満(1度)" << endl;
    else
        cout << "肥満(2度以上)" << endl;

    return 0;
}`}
          expectedOutput={`グレード: B（良好）
BMI: 22.5 → 普通体重`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複合条件との組み合わせ</h2>
        <p className="text-gray-400 mb-4">論理演算子と組み合わせてより複雑な条件を表現します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int age = 25;
    bool isStudent = true;
    bool isMember = false;

    // 複合条件のelse if
    if (age < 12) {
        cout << "料金: 無料（子供）" << endl;
    } else if (age < 18 || isStudent) {
        cout << "料金: 500円（学生割引）" << endl;
    } else if (isMember) {
        cout << "料金: 800円（会員割引）" << endl;
    } else {
        cout << "料金: 1000円（一般）" << endl;
    }

    // 時間帯の判定
    int hour = 14;
    if (hour >= 5 && hour < 12) {
        cout << "おはようございます" << endl;
    } else if (hour >= 12 && hour < 18) {
        cout << "こんにちは" << endl;
    } else {
        cout << "こんばんは" << endl;
    }

    return 0;
}`}
          expectedOutput={`料金: 500円（学生割引）
こんにちは`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
