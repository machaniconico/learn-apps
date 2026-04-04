import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">forループ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">for</strong>ループは初期化・条件・更新の3つの部分で構成される繰り返し処理です。
            カウンタ変数を使って決まった回数だけ処理を繰り返す場合に使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な for ループ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">for (初期化; 条件; 更新)</code>の構文で繰り返します。条件がfalseになるとループが終了します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的なforループ
  for (int i = 0; i < 5; i++) {
    print('i = \$i');
  }

  // 逆順のループ
  print('カウントダウン:');
  for (int i = 5; i >= 1; i--) {
    print('\$i...');
  }
  print('スタート！');

  // ステップを変える
  print('偶数:');
  for (int i = 0; i <= 10; i += 2) {
    print(i);
  }
}`}
          expectedOutput={`i = 0
i = 1
i = 2
i = 3
i = 4
カウントダウン:
5...
4...
3...
2...
1...
スタート！
偶数:
0
2
4
6
8
10`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたループ</h2>
        <p className="text-gray-400 mb-4">
          forループの中にforループを書くことで、2次元のデータ処理ができます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 九九の表（3×3）
  print('九九（部分）:');
  for (int i = 1; i <= 3; i++) {
    String row = '';
    for (int j = 1; j <= 3; j++) {
      row += '\${i * j}\t';
    }
    print(row);
  }

  // 三角形パターン
  print('三角形:');
  for (int i = 1; i <= 5; i++) {
    print('*' * i);
  }
}`}
          expectedOutput={`九九（部分）:
1	2	3
2	4	6
3	6	9
三角形:
*
**
***
****
*****`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">for ループでの集計</h2>
        <p className="text-gray-400 mb-4">
          forループを使って合計、最大値、最小値などの集計処理を実装できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  List<int> scores = [78, 92, 65, 88, 73, 95, 60];

  int sum = 0;
  int max = scores[0];
  int min = scores[0];

  for (int i = 0; i < scores.length; i++) {
    sum += scores[i];
    if (scores[i] > max) max = scores[i];
    if (scores[i] < min) min = scores[i];
  }

  double average = sum / scores.length;
  print('合計: \$sum');
  print('平均: \${average.toStringAsFixed(1)}');
  print('最高点: \$max');
  print('最低点: \$min');
  print('受験者数: \${scores.length}人');
}`}
          expectedOutput={`合計: 551
平均: 78.7
最高点: 95
最低点: 60
受験者数: 7人`}
        />
      </section>

      <LessonCompleteButton lessonId="for-loop" categoryId="control" />
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
