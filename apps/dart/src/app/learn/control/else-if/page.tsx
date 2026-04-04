import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElseIfPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">else if</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">else if</strong>を使うと複数の条件を順番にチェックできます。
            最初にtrueになった条件のブロックが実行され、残りの条件はチェックされません。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">else if チェーン</h2>
        <p className="text-gray-400 mb-4">
          複数の条件を順番にチェックするには<code className="text-green-300">else if</code>を連鎖させます。
        </p>
        <DartEditor
          defaultCode={`String getGrade(int score) {
  if (score >= 90) {
    return 'A（優秀）';
  } else if (score >= 80) {
    return 'B（良好）';
  } else if (score >= 70) {
    return 'C（普通）';
  } else if (score >= 60) {
    return 'D（合格）';
  } else {
    return 'F（不合格）';
  }
}

void main() {
  List<int> scores = [95, 82, 73, 61, 45];
  for (int score in scores) {
    print('スコア \$score: \${getGrade(score)}');
  }
}`}
          expectedOutput={`スコア 95: A（優秀）
スコア 82: B（良好）
スコア 73: C（普通）
スコア 61: D（合格）
スコア 45: F（不合格）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">BMI 判定の例</h2>
        <p className="text-gray-400 mb-4">
          else ifを使った実践的な例として、BMIの判定を実装します。
        </p>
        <DartEditor
          defaultCode={`String classifyBMI(double bmi) {
  if (bmi < 18.5) {
    return '低体重';
  } else if (bmi < 25.0) {
    return '標準';
  } else if (bmi < 30.0) {
    return '過体重';
  } else {
    return '肥満';
  }
}

void main() {
  // BMI = 体重(kg) / 身長(m)^2
  List<Map<String, double>> people = [
    {'weight': 50, 'height': 1.70},
    {'weight': 65, 'height': 1.70},
    {'weight': 80, 'height': 1.70},
    {'weight': 100, 'height': 1.70},
  ];

  for (var person in people) {
    double bmi = person['weight']! / (person['height']! * person['height']!);
    print('BMI \${bmi.toStringAsFixed(1)}: \${classifyBMI(bmi)}');
  }
}`}
          expectedOutput={`BMI 17.3: 低体重
BMI 22.5: 標準
BMI 27.7: 過体重
BMI 34.6: 肥満`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">時間帯による挨拶</h2>
        <p className="text-gray-400 mb-4">
          時間帯に応じた挨拶メッセージを返す関数で、else ifの実践的な使い方を学びます。
        </p>
        <DartEditor
          defaultCode={`String getGreeting(int hour) {
  if (hour < 0 || hour > 23) {
    return '無効な時刻です';
  } else if (hour < 6) {
    return '深夜ですね、お休みなさい';
  } else if (hour < 10) {
    return 'おはようございます！';
  } else if (hour < 18) {
    return 'こんにちは！';
  } else if (hour < 22) {
    return 'こんばんは！';
  } else {
    return 'もうすぐ夜中ですね';
  }
}

void main() {
  List<int> hours = [3, 7, 12, 19, 23];
  for (int h in hours) {
    print('\${h}時: \${getGreeting(h)}');
  }
}`}
          expectedOutput={`3時: 深夜ですね、お休みなさい
7時: おはようございます！
12時: こんにちは！
19時: こんばんは！
23時: もうすぐ夜中ですね`}
        />
      </section>

      <LessonCompleteButton lessonId="else-if" categoryId="control" />
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
