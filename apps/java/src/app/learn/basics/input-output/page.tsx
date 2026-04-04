import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function InputOutputPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">入出力</h1>
        <p className="text-gray-400">System.out.println/printfとScannerによる入出力</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaの入出力</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaでは <code className="text-orange-300">System.out</code> で出力し、
          <code className="text-orange-300">Scanner</code> クラスで入力を受け取ります。
          <code className="text-orange-300">printf</code> を使うとC言語風のフォーマット指定が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>System.out.println()</code>: 改行付き出力</li>
          <li><code>System.out.print()</code>: 改行なし出力</li>
          <li><code>System.out.printf()</code>: フォーマット指定出力</li>
          <li><code>Scanner</code>: <code>nextLine()</code>, <code>nextInt()</code>, <code>nextDouble()</code> などで入力を読み取る</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printfによるフォーマット出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">printf</code> を使うと、書式を指定して整形された出力ができます。
          <code>%d</code>（整数）、<code>%f</code>（小数）、<code>%s</code>（文字列）などを使います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String name = "田中";
        int age = 30;
        double height = 175.5;

        // 基本的なprintf
        System.out.printf("名前: %s%n", name);
        System.out.printf("年齢: %d歳%n", age);
        System.out.printf("身長: %.1fcm%n", height);

        // 桁揃え
        System.out.printf("%-10s %5d円%n", "りんご", 150);
        System.out.printf("%-10s %5d円%n", "バナナ", 80);
        System.out.printf("%-10s %5d円%n", "オレンジ", 200);
    }
}`}
          expectedOutput={`名前: 田中
年齢: 30歳
身長: 175.5cm
りんご        150円
バナナ         80円
オレンジ       200円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">String.formatメソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">String.format()</code> は printf と同じ書式で文字列を生成します。
          出力せずに文字列として保持したい場合に便利です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // String.format で文字列生成
        String formatted = String.format("%s は %d 歳です", "佐藤", 25);
        System.out.println(formatted);

        // 0埋め
        for (int i = 1; i <= 5; i++) {
            String id = String.format("ID-%04d", i);
            System.out.println(id);
        }

        // 複数の値
        double price = 1234.5;
        System.out.printf("税込: %,.0f円%n", price * 1.1);
    }
}`}
          expectedOutput={`佐藤 は 25 歳です
ID-0001
ID-0002
ID-0003
ID-0004
ID-0005
税込: 1,358円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Scannerクラスによる入力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Scanner</code> クラスでキーボードからの入力を読み取ります。
          ※ この実行環境では Scanner の対話的入力はできませんが、構文を理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Scannerの使い方の例
        // 実行環境では対話的入力はできないため、出力例のみ示します

        // Scanner scanner = new Scanner(System.in);
        // System.out.print("名前: ");
        // String name = scanner.nextLine();
        // System.out.print("年齢: ");
        // int age = scanner.nextInt();

        // 代わりに固定値で動作を確認
        String name = "山田太郎";
        int age = 28;

        System.out.println("=== ユーザー情報 ===");
        System.out.println("名前: " + name);
        System.out.println("年齢: " + age);

        // Scannerの主要メソッド一覧
        System.out.println("\\n=== Scannerメソッド ===");
        System.out.println("nextLine()   - 1行読み取り");
        System.out.println("nextInt()    - 整数読み取り");
        System.out.println("nextDouble() - 小数読み取り");
        System.out.println("next()       - 単語読み取り");
        System.out.println("hasNext()    - 入力があるか確認");
    }
}`}
          expectedOutput={`=== ユーザー情報 ===
名前: 山田太郎
年齢: 28

=== Scannerメソッド ===
nextLine()   - 1行読み取り
nextInt()    - 整数読み取り
nextDouble() - 小数読み取り
next()       - 単語読み取り
hasNext()    - 入力があるか確認`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="input-output" />
      </div>
      <LessonNav lessons={lessons} currentId="input-output" basePath="/learn/basics" />
    </div>
  );
}
