import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">カウンタベースのfor文</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">for文の構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">for</code> ループは、繰り返し回数が決まっている場合に最適な制御構文です。
          初期化、条件判定、更新の3つの部分から構成され、条件が <code>false</code> になるまでブロックを繰り返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文: <code>for (初期化; 条件; 更新)</code></li>
          <li>初期化は最初に1回だけ実行される</li>
          <li>条件はループのたびに評価される</li>
          <li>更新はブロック実行後に毎回実行される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なforループ</h2>
        <p className="text-gray-400 mb-4">
          カウンタ変数を使った基本的な繰り返し処理です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 1から5まで出力
        for (int i = 1; i <= 5; i++) {
            System.out.println("カウント: " + i);
        }

        // 合計を計算
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("1~100の合計: " + sum);

        // カウントダウン
        for (int i = 3; i >= 1; i--) {
            System.out.println(i + "...");
        }
        System.out.println("Go!");
    }
}`}
          expectedOutput={`カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5
1~100の合計: 5050
3...
2...
1...
Go!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ステップとネストしたループ</h2>
        <p className="text-gray-400 mb-4">
          増分を変えたり、ループを入れ子にして2次元的な処理を行えます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 2ずつ増加（偶数のみ）
        System.out.print("偶数: ");
        for (int i = 2; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();

        // ネストしたfor: 九九の一部
        System.out.println("=== 九九（1~3の段）===");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 9; j++) {
                System.out.printf("%2d ", i * j);
            }
            System.out.println();
        }
    }
}`}
          expectedOutput={`偶数: 2 4 6 8 10
=== 九九（1~3の段）===
 1  2  3  4  5  6  7  8  9
 2  4  6  8 10 12 14 16 18
 3  6  9 12 15 18 21 24 27 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列とforループ</h2>
        <p className="text-gray-400 mb-4">
          配列の要素を for ループでアクセスするパターンです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String[] fruits = {"りんご", "バナナ", "オレンジ", "ぶどう"};

        // インデックスでアクセス
        for (int i = 0; i < fruits.length; i++) {
            System.out.println((i + 1) + ". " + fruits[i]);
        }

        // 逆順でアクセス
        System.out.println("--- 逆順 ---");
        for (int i = fruits.length - 1; i >= 0; i--) {
            System.out.println(fruits[i]);
        }
    }
}`}
          expectedOutput={`1. りんご
2. バナナ
3. オレンジ
4. ぶどう
--- 逆順 ---
ぶどう
オレンジ
バナナ
りんご`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
