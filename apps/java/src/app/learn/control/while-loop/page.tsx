import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件ベースの繰り返し</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">while文の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">while</code> ループは条件が <code>true</code> の間、ブロックを繰り返し実行します。
          繰り返し回数が事前にわからない場合や、特定の条件が満たされるまでループしたい場合に適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>条件式がfalseになった時点でループ終了</li>
          <li>条件式が最初からfalseの場合、ブロックは一度も実行されない</li>
          <li>ループ内で条件を変える処理がないと無限ループになるので注意</li>
          <li>回数不定の処理（ユーザー入力待ち、データ検索など）に適している</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なwhileループ</h2>
        <p className="text-gray-400 mb-4">
          カウンタを使ったシンプルなwhile文と、条件ベースの繰り返しです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // カウンタによるwhile
        int count = 1;
        while (count <= 5) {
            System.out.println("カウント: " + count);
            count++;
        }

        // 条件ベースのwhile
        int number = 256;
        int halvings = 0;
        while (number > 1) {
            number /= 2;
            halvings++;
        }
        System.out.println("256を半分にした回数: " + halvings);
    }
}`}
          expectedOutput={`カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5
256を半分にした回数: 8`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">桁数を数える・各桁の合計</h2>
        <p className="text-gray-400 mb-4">
          数値処理でよく使われる while ループのパターンです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 桁数を数える
        int number = 12345;
        int temp = number;
        int digits = 0;

        while (temp > 0) {
            temp /= 10;
            digits++;
        }
        System.out.println(number + " の桁数: " + digits);

        // 各桁の合計
        temp = number;
        int digitSum = 0;

        while (temp > 0) {
            digitSum += temp % 10;  // 最下位の桁を取得
            temp /= 10;              // 最下位の桁を除去
        }
        System.out.println(number + " の各桁の合計: " + digitSum);

        // コラッツ予想
        int n = 6;
        System.out.print("コラッツ数列(" + n + "): " + n);
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            System.out.print(" → " + n);
        }
        System.out.println();
    }
}`}
          expectedOutput={`12345 の桁数: 5
12345 の各桁の合計: 15
コラッツ数列(6): 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
