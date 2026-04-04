import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の基本</h1>
        <p className="text-gray-400">配列の宣言・初期化・アクセス</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列は同じ型のデータを連続して格納するデータ構造です。
          固定長で、一度作成するとサイズを変更できません。
          インデックス（0始まり）を使って各要素にアクセスします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>int[] nums = new int[5];</code> でサイズ5の配列を作成</li>
          <li><code>{`int[] nums = {1, 2, 3};`}</code> で初期値付きで作成</li>
          <li>インデックスは 0 から始まり、<code>array.length - 1</code> まで</li>
          <li>範囲外アクセスは <code>ArrayIndexOutOfBoundsException</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の宣言と初期化</h2>
        <p className="text-gray-400 mb-4">
          配列の宣言にはいくつかの方法があります。new を使う方法と、
          初期化子を使う方法があります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 方法1: サイズ指定で作成（デフォルト値で初期化）
        int[] nums = new int[3];
        nums[0] = 10;
        nums[1] = 20;
        nums[2] = 30;

        // 方法2: 初期化子で作成
        String[] fruits = {"りんご", "バナナ", "みかん"};

        // 要素へのアクセス
        System.out.println("nums[0] = " + nums[0]);
        System.out.println("nums[1] = " + nums[1]);
        System.out.println("nums[2] = " + nums[2]);
        System.out.println("配列の長さ: " + nums.length);

        System.out.println("fruits[0] = " + fruits[0]);
        System.out.println("fruits[2] = " + fruits[2]);
    }
}`}
          expectedOutput={`nums[0] = 10
nums[1] = 20
nums[2] = 30
配列の長さ: 3
fruits[0] = りんご
fruits[2] = みかん`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列のループ処理</h2>
        <p className="text-gray-400 mb-4">
          for ループや拡張 for 文（for-each）を使って配列の全要素を処理できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int[] scores = {85, 92, 78, 96, 88};

        // for ループ
        System.out.print("for: ");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + " ");
        }
        System.out.println();

        // 拡張for文（for-each）
        System.out.print("for-each: ");
        for (int score : scores) {
            System.out.print(score + " ");
        }
        System.out.println();

        // 合計と平均を計算
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        System.out.println("合計: " + sum);
        System.out.println("平均: " + (sum / scores.length));
    }
}`}
          expectedOutput={`for: 85 92 78 96 88
for-each: 85 92 78 96 88
合計: 439
平均: 87`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々な型の配列</h2>
        <p className="text-gray-400 mb-4">
          配列はどの型でも作成できます。プリミティブ型はデフォルト値で初期化されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // double配列
        double[] prices = {100.5, 200.0, 350.75};
        double total = 0;
        for (double p : prices) total += p;
        System.out.println("合計金額: " + total);

        // boolean配列（デフォルトはfalse）
        boolean[] flags = new boolean[3];
        flags[0] = true;
        for (int i = 0; i < flags.length; i++) {
            System.out.println("flags[" + i + "] = " + flags[i]);
        }

        // char配列
        char[] greeting = {'H', 'e', 'l', 'l', 'o'};
        System.out.println("文字列変換: " + new String(greeting));
    }
}`}
          expectedOutput={`合計金額: 651.25
flags[0] = true
flags[1] = false
flags[2] = false
文字列変換: Hello`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="array-basics" basePath="/learn/arrays" />
    </div>
  );
}
