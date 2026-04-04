import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function BreakContinuePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">break・continue</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">break</strong>はループを即座に終了し、<strong className="text-green-300">continue</strong>は現在の反復をスキップして次の反復に進みます。
            ラベル付きbreak/continueでネストしたループを制御できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">break の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">break</code>でループを途中で抜け出します。条件を満たした時点でループを終了したい場合に使います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 最初の偶数を見つけて終了
  List<int> numbers = [1, 3, 5, 4, 7, 8, 2];
  int? firstEven;
  for (int n in numbers) {
    if (n % 2 == 0) {
      firstEven = n;
      break;
    }
    print('\$n は奇数');
  }
  print('最初の偶数: \$firstEven');

  // 線形探索
  List<String> names = ['Alice', 'Bob', 'Carol', 'Dave'];
  String target = 'Carol';
  int foundIndex = -1;
  for (int i = 0; i < names.length; i++) {
    if (names[i] == target) {
      foundIndex = i;
      break;
    }
  }
  print('\$target のインデックス: \$foundIndex');
}`}
          expectedOutput={`1 は奇数
3 は奇数
5 は奇数
最初の偶数: 4
Carol のインデックス: 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">continue の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">continue</code>で特定の要素をスキップします。フィルタリング処理などに使います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 偶数のみ処理（奇数はスキップ）
  print('偶数だけ:');
  for (int i = 1; i <= 10; i++) {
    if (i % 2 != 0) continue; // 奇数はスキップ
    print(i);
  }

  // 負の数をスキップして合計
  List<int> data = [5, -3, 8, -1, 4, -7, 2];
  int positiveSum = 0;
  for (int n in data) {
    if (n < 0) {
      print('\$n をスキップ');
      continue;
    }
    positiveSum += n;
  }
  print('正の数の合計: \$positiveSum');
}`}
          expectedOutput={`偶数だけ:
2
4
6
8
10
-3 をスキップ
-1 をスキップ
-7 をスキップ
正の数の合計: 19`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付き break・continue</h2>
        <p className="text-gray-400 mb-4">
          ラベルを使うとネストしたループの外側を制御できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // ラベル付きbreak（外側のループを終了）
  print('ラベル付きbreak:');
  outer: for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (i == 1 && j == 1) {
        print('i=\$i, j=\$j で外側を終了');
        break outer;
      }
      print('i=\$i, j=\$j');
    }
  }

  // ラベル付きcontinue（外側のループの次の反復へ）
  print('ラベル付きcontinue:');
  outer2: for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (j == 1) continue outer2;
      print('i=\$i, j=\$j');
    }
  }
}`}
          expectedOutput={`ラベル付きbreak:
i=0, j=0
i=0, j=1
i=0, j=2
i=1, j=0
i=1, j=1 で外側を終了
ラベル付きcontinue:
i=0, j=0
i=1, j=0
i=2, j=0`}
        />
      </section>

      <LessonCompleteButton lessonId="break-continue" categoryId="control" />
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
