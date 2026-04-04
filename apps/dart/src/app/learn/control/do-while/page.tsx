import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function DoWhilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">do-whileループ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">do-while</strong>ループは処理を実行してから条件をチェックします。
            whileループと異なり、<strong>必ず1回は実行</strong>されます。
            初回実行が必要なメニュー表示やバリデーションループに適しています。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">do-while の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">do &#123; 処理 &#125; while (条件);</code>の構文で、処理を実行後に条件を評価します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的な do-while
  int i = 0;
  do {
    print('実行: \$i');
    i++;
  } while (i < 3);

  // 条件がfalseでも1回は実行される
  int x = 10;
  do {
    print('x = \$x（条件はfalseだが1回実行）');
    x++;
  } while (x < 5); // 最初からfalse

  print('最終的な x: \$x');
}`}
          expectedOutput={`実行: 0
実行: 1
実行: 2
x = 10（条件はfalseだが1回実行）
最終的な x: 11`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">入力バリデーションのシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          do-whileは「最低1回実行してから条件チェック」という処理に最適です。入力バリデーションのパターンを学びます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 入力値のシミュレーション（実際はstdin.readLineSync()を使う）
  List<int> simulatedInputs = [-1, 0, 150, 85];
  int inputIndex = 0;

  int getInput() {
    return simulatedInputs[inputIndex++];
  }

  int validScore;
  do {
    validScore = getInput();
    if (validScore < 0 || validScore > 100) {
      print('無効な入力: \$validScore（0〜100を入力してください）');
    }
  } while (validScore < 0 || validScore > 100);

  print('有効なスコア: \$validScore');
}`}
          expectedOutput={`無効な入力: -1（0〜100を入力してください）
無効な入力: 0（0〜100を入力してください）
無効な入力: 150（0〜100を入力してください）
有効なスコア: 85`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">while と do-while の比較</h2>
        <p className="text-gray-400 mb-4">
          同じ処理をwhileとdo-whileで実装して、違いを確認します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // while: 最初から条件がfalseなら0回実行
  print('--- while ---');
  int a = 5;
  while (a < 5) {
    print('while実行: \$a');
    a++;
  }
  print('whileループ後: a = \$a（一度も実行されず）');

  // do-while: 最初から条件がfalseでも1回実行
  print('--- do-while ---');
  int b = 5;
  do {
    print('do-while実行: \$b');
    b++;
  } while (b < 5);
  print('do-whileループ後: b = \$b（1回実行された）');

  // 実用例: 数字の桁数を数える
  int number = 12345;
  int digits = 0;
  int temp = number;
  do {
    digits++;
    temp ~/= 10;
  } while (temp > 0);
  print('\$number は \$digits 桁');
}`}
          expectedOutput={`--- while ---
whileループ後: a = 5（一度も実行されず）
--- do-while ---
do-while実行: 5
do-whileループ後: b = 6（1回実行された）
12345 は 5 桁`}
        />
      </section>

      <LessonCompleteButton lessonId="do-while" categoryId="control" />
      <LessonNav lessons={lessons} currentId="do-while" basePath="/learn/control" />
    </div>
  );
}
