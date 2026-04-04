import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileLoopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">whileループ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">while</strong>ループは条件がtrueである間、処理を繰り返します。
            繰り返す回数があらかじめわからない場合や、条件によって終了するループに適しています。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な while ループ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">while (条件)</code>は条件がtrueである間ループし続けます。条件の評価はループの先頭で行われます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的なwhileループ
  int count = 0;
  while (count < 5) {
    print('count: \$count');
    count++;
  }

  // 合計が100を超えるまで足し続ける
  int sum = 0;
  int n = 1;
  while (sum < 100) {
    sum += n;
    n++;
  }
  print('合計が100を超えたとき: sum=\$sum, n=\${n-1}');
}`}
          expectedOutput={`count: 0
count: 1
count: 2
count: 3
count: 4
合計が100を超えたとき: sum=105, n=14`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コラッツ予想</h2>
        <p className="text-gray-400 mb-4">
          whileループの実践例として、コラッツ予想（3n+1問題）のステップ数を計算します。
        </p>
        <DartEditor
          defaultCode={`void collatz(int n) {
  int steps = 0;
  int current = n;
  print('開始: \$current');

  while (current != 1) {
    if (current % 2 == 0) {
      current = current ~/ 2;
    } else {
      current = current * 3 + 1;
    }
    steps++;
    if (steps <= 10) print('ステップ\$steps: \$current');
  }
  print('合計ステップ数: \$steps');
}

void main() {
  collatz(27);
}`}
          expectedOutput={`開始: 27
ステップ1: 82
ステップ2: 41
ステップ3: 124
ステップ4: 62
ステップ5: 31
ステップ6: 94
ステップ7: 47
ステップ8: 142
ステップ9: 71
ステップ10: 214
合計ステップ数: 111`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">二分探索</h2>
        <p className="text-gray-400 mb-4">
          whileループを使った二分探索アルゴリズムの実装です。ソート済みリストから効率的に値を探します。
        </p>
        <DartEditor
          defaultCode={`int binarySearch(List<int> list, int target) {
  int left = 0;
  int right = list.length - 1;
  int steps = 0;

  while (left <= right) {
    steps++;
    int mid = (left + right) ~/ 2;
    print('ステップ\$steps: left=\$left, mid=\$mid, right=\$right, 値=\${list[mid]}');

    if (list[mid] == target) {
      return mid;
    } else if (list[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

void main() {
  List<int> sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  int target = 23;
  int index = binarySearch(sorted, target);
  print('\$target のインデックス: \$index');
}`}
          expectedOutput={`ステップ1: left=0, mid=4, right=9, 値=16
ステップ2: left=5, mid=7, right=9, 値=56
ステップ3: left=5, mid=6, right=6, 値=38
ステップ4: left=5, mid=5, right=5, 値=23
23 のインデックス: 5`}
        />
      </section>

      <LessonCompleteButton lessonId="while-loop" categoryId="control" />
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
