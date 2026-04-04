import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function DoWhilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">do-whileループ</h1>
        <p className="text-gray-400">1回は必ず実行される繰り返し</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-while文の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">do-while</code> ループは、条件判定がループの最後に行われるため、
          ブロックが最低1回は必ず実行されます。
          ユーザー入力の検証や、メニュー表示などで活用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ブロックを先に実行してから条件を判定する（後判定型）</li>
          <li>条件がfalseでも最低1回はブロックが実行される</li>
          <li>構文の末尾にセミコロン <code>;</code> が必要</li>
          <li>while文との使い分け: 必ず1回は実行が必要な場合に do-while を使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">do-whileの基本と比較</h2>
        <p className="text-gray-400 mb-4">
          while文との違いを比較して、do-whileの特徴を理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 基本的なdo-while
        int count = 1;
        do {
            System.out.println("実行: " + count);
            count++;
        } while (count <= 3);

        // whileとの違い: 条件が最初からfalseの場合
        System.out.println("--- while (false) ---");
        int x = 10;
        while (x < 5) {
            System.out.println("whileブロック: " + x);
            x++;
        }
        System.out.println("whileは実行されなかった");

        System.out.println("--- do-while (false) ---");
        int y = 10;
        do {
            System.out.println("do-whileブロック: " + y);
            y++;
        } while (y < 5);
        System.out.println("do-whileは1回実行された");
    }
}`}
          expectedOutput={`実行: 1
実行: 2
実行: 3
--- while (false) ---
whileは実行されなかった
--- do-while (false) ---
do-whileブロック: 10
do-whileは1回実行された`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メニューシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          do-while は「メニューを表示して選択を受け付ける」パターンに最適です。
          ※ 対話的入力の代わりに配列で選択をシミュレートします。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // メニューのシミュレーション
        int[] choices = {1, 2, 3};  // シミュレートされた入力
        int index = 0;
        int choice;

        do {
            System.out.println("=== メニュー ===");
            System.out.println("1. 表示");
            System.out.println("2. 検索");
            System.out.println("3. 終了");

            choice = choices[index++];
            System.out.println("選択: " + choice);

            switch (choice) {
                case 1:
                    System.out.println("→ データを表示します\n");
                    break;
                case 2:
                    System.out.println("→ 検索を実行します\n");
                    break;
                case 3:
                    System.out.println("→ 終了します");
                    break;
            }
        } while (choice != 3);
    }
}`}
          expectedOutput={`=== メニュー ===
1. 表示
2. 検索
3. 終了
選択: 1
→ データを表示します

=== メニュー ===
1. 表示
2. 検索
3. 終了
選択: 2
→ 検索を実行します

=== メニュー ===
1. 表示
2. 検索
3. 終了
選択: 3
→ 終了します`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数当てゲーム</h2>
        <p className="text-gray-400 mb-4">
          do-while で少なくとも1回は推測を行うゲームのシミュレーションです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int target = 7;
        int[] guesses = {3, 5, 7};  // シミュレートされた推測
        int index = 0;
        int guess;
        int attempts = 0;

        do {
            guess = guesses[index++];
            attempts++;

            if (guess < target) {
                System.out.println(guess + " → もっと大きい数です");
            } else if (guess > target) {
                System.out.println(guess + " → もっと小さい数です");
            } else {
                System.out.println(guess + " → 正解！");
            }
        } while (guess != target);

        System.out.println(attempts + "回目で正解しました！");
    }
}`}
          expectedOutput={`3 → もっと大きい数です
5 → もっと大きい数です
7 → 正解！
3回目で正解しました！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="do-while" />
      </div>
      <LessonNav lessons={lessons} currentId="do-while" basePath="/learn/control" />
    </div>
  );
}
