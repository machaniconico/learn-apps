import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function TryCatchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">try-catch</h1>
        <p className="text-gray-400">基本構文、複数catch、マルチキャッチ(Java 7+)の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">try-catch文の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          例外が発生する可能性のあるコードを <code className="text-orange-300">try</code> ブロックに入れ、
          例外が発生した場合の処理を <code className="text-orange-300">catch</code> ブロックに書きます。
          プログラムの異常終了を防ぎ、適切にエラーを処理できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>try</code> ブロック内で例外が発生すると、即座にcatchへジャンプ</li>
          <li><code>catch (ExceptionType e)</code> で特定の例外をキャッチ</li>
          <li>複数のcatchブロックで異なる例外を処理できる</li>
          <li>Java 7以降、マルチキャッチ <code>catch (A | B e)</code> が使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なtry-catch</h2>
        <p className="text-gray-400 mb-4">
          例外をキャッチしてプログラムが異常終了するのを防ぎます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 例外なし
        try {
            int result = 10 / 2;
            System.out.println("結果: " + result);
        } catch (ArithmeticException e) {
            System.out.println("エラー: " + e.getMessage());
        }

        // ゼロ除算の例外
        try {
            int result = 10 / 0;
            System.out.println("この行は実行されない");
        } catch (ArithmeticException e) {
            System.out.println("エラー: " + e.getMessage());
        }

        // 数値変換の例外
        try {
            int num = Integer.parseInt("abc");
            System.out.println("この行は実行されない");
        } catch (NumberFormatException e) {
            System.out.println("数値変換エラー: " + e.getMessage());
        }

        System.out.println("プログラムは正常に続行します");
    }
}`}
          expectedOutput={`結果: 5
エラー: / by zero
数値変換エラー: For input string: "abc"
プログラムは正常に続行します`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のcatchブロック</h2>
        <p className="text-gray-400 mb-4">
          異なる種類の例外に対して、異なる処理を行うことができます。
          具体的な例外から先に書き、最後に一般的な例外をキャッチします。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static void processInput(String input) {
        try {
            int num = Integer.parseInt(input);
            int[] arr = new int[num];
            arr[10] = 100;  // 配列が小さいとエラー
            System.out.println("成功: arr[10] = " + arr[10]);
        } catch (NumberFormatException e) {
            System.out.println("数値変換エラー: '" + input + "'は数値ではありません");
        } catch (NegativeArraySizeException e) {
            System.out.println("配列サイズエラー: 負の値は使えません");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("配列範囲エラー: インデックスが範囲外です");
        } catch (Exception e) {
            System.out.println("その他のエラー: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        processInput("abc");   // NumberFormatException
        processInput("-5");    // NegativeArraySizeException
        processInput("3");     // ArrayIndexOutOfBoundsException
        processInput("20");    // 成功
    }
}`}
          expectedOutput={`数値変換エラー: 'abc'は数値ではありません
配列サイズエラー: 負の値は使えません
配列範囲エラー: インデックスが範囲外です
成功: arr[10] = 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マルチキャッチ (Java 7+)</h2>
        <p className="text-gray-400 mb-4">
          複数の例外を同じ方法で処理する場合、<code className="text-orange-300">|</code> で
          つなげてまとめてキャッチできます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static void parse(String input) {
        try {
            if (input.contains(".")) {
                Double.parseDouble(input);
                System.out.println("小数として解析成功: " + input);
            } else {
                Integer.parseInt(input);
                System.out.println("整数として解析成功: " + input);
            }
        } catch (NumberFormatException | NullPointerException e) {
            // マルチキャッチ: 2つの例外を同じ処理で扱う
            System.out.println("解析エラー (" + e.getClass().getSimpleName() + "): " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        parse("42");
        parse("3.14");
        parse("hello");
        parse(null);
    }
}`}
          expectedOutput={`整数として解析成功: 42
小数として解析成功: 3.14
解析エラー (NumberFormatException): For input string: "hello"
解析エラー (NullPointerException): null`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="try-catch" />
      </div>
      <LessonNav lessons={lessons} currentId="try-catch" basePath="/learn/exceptions" />
    </div>
  );
}
