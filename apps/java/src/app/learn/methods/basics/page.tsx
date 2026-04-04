import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドの基本</h1>
        <p className="text-gray-400">メソッドの定義と呼び出し方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドは、特定の処理をまとめて名前を付けたものです。同じ処理を何度も書く代わりに、
          メソッドとして定義しておけば、必要なときに呼び出すだけで再利用できます。
          Javaのメソッドは「戻り値の型」「メソッド名」「引数リスト」「メソッド本体」で構成されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>void型のメソッドは値を返さない</li>
          <li>戻り値の型を指定すると、return文で値を返す必要がある</li>
          <li>メソッド名はキャメルケース（camelCase）で命名するのが慣例</li>
          <li>mainメソッドはプログラムのエントリポイント（実行開始点）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">voidメソッドの定義と呼び出し</h2>
        <p className="text-gray-400 mb-4">値を返さないvoidメソッドを定義し、mainメソッドから呼び出します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // voidメソッド：値を返さない
    static void greet() {
        System.out.println("こんにちは！");
        System.out.println("Javaの世界へようこそ！");
    }

    // メッセージを表示するメソッド
    static void showLine() {
        System.out.println("──────────────");
    }

    public static void main(String[] args) {
        showLine();
        greet();      // メソッドを呼び出し
        showLine();
        greet();      // 何度でも呼び出せる
        showLine();
    }
}`}
          expectedOutput={`──────────────
こんにちは！
Javaの世界へようこそ！
──────────────
こんにちは！
Javaの世界へようこそ！
──────────────`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">戻り値のあるメソッド</h2>
        <p className="text-gray-400 mb-4">戻り値の型を指定し、return文で値を返すメソッドを作成します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // int型の値を返すメソッド
    static int add(int a, int b) {
        return a + b;
    }

    // String型の値を返すメソッド
    static String createGreeting(String name) {
        return "Hello, " + name + "!";
    }

    // boolean型の値を返すメソッド
    static boolean isEven(int number) {
        return number % 2 == 0;
    }

    public static void main(String[] args) {
        int result = add(3, 5);
        System.out.println("3 + 5 = " + result);

        String message = createGreeting("Java");
        System.out.println(message);

        System.out.println("4は偶数？ " + isEven(4));
        System.out.println("7は偶数？ " + isEven(7));
    }
}`}
          expectedOutput={`3 + 5 = 8
Hello, Java!
4は偶数？ true
7は偶数？ false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの実践的な活用</h2>
        <p className="text-gray-400 mb-4">メソッドを使ってコードを整理し、可読性を高める例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static double calcTax(int price) {
        return price * 0.1;
    }

    static int calcTotal(int price) {
        return price + (int) calcTax(price);
    }

    static void printReceipt(String item, int price) {
        System.out.println("商品: " + item);
        System.out.println("価格: " + price + "円");
        System.out.println("税額: " + (int) calcTax(price) + "円");
        System.out.println("合計: " + calcTotal(price) + "円");
    }

    public static void main(String[] args) {
        printReceipt("Java入門書", 2000);
        System.out.println("---");
        printReceipt("ノートPC", 80000);
    }
}`}
          expectedOutput={`商品: Java入門書
価格: 2000円
税額: 200円
合計: 2200円
---
商品: ノートPC
価格: 80000円
税額: 8000円
合計: 88000円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/methods" />
    </div>
  );
}
