import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">Javaの基本的なデータ型（プリミティブ型）</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プリミティブ型8種</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaには8つのプリミティブ型（基本データ型）があります。
          それぞれサイズと扱える値の範囲が異なります。
          プリミティブ型はオブジェクトではなく、スタック上に直接値が格納されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>byte</code> (1バイト): -128 ~ 127</li>
          <li><code>short</code> (2バイト): -32,768 ~ 32,767</li>
          <li><code>int</code> (4バイト): 約-21億 ~ 約21億</li>
          <li><code>long</code> (8バイト): 非常に大きな整数</li>
          <li><code>float</code> (4バイト): 単精度浮動小数点数</li>
          <li><code>double</code> (8バイト): 倍精度浮動小数点数</li>
          <li><code>boolean</code> (1ビット): true / false</li>
          <li><code>char</code> (2バイト): Unicode文字1文字</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数型の種類</h2>
        <p className="text-gray-400 mb-4">
          4つの整数型はそれぞれサイズが異なります。通常は <code className="text-orange-300">int</code> を使い、
          大きな値が必要な場合は <code className="text-orange-300">long</code> を使います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        byte smallNum = 127;
        short mediumNum = 32000;
        int normalNum = 2000000000;
        long bigNum = 9000000000L;  // Lサフィックスが必要

        System.out.println("byte: " + smallNum);
        System.out.println("short: " + mediumNum);
        System.out.println("int: " + normalNum);
        System.out.println("long: " + bigNum);
    }
}`}
          expectedOutput={`byte: 127
short: 32000
int: 2000000000
long: 9000000000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点型・boolean・char</h2>
        <p className="text-gray-400 mb-4">
          小数には <code className="text-orange-300">float</code>（末尾にf）と <code className="text-orange-300">double</code> を使います。
          <code className="text-orange-300">char</code> はシングルクォートで囲みます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        float pi = 3.14f;        // fサフィックスが必要
        double precise = 3.141592653589793;
        boolean isJavaFun = true;
        char grade = 'A';

        System.out.println("float: " + pi);
        System.out.println("double: " + precise);
        System.out.println("boolean: " + isJavaFun);
        System.out.println("char: " + grade);
    }
}`}
          expectedOutput={`float: 3.14
double: 3.141592653589793
boolean: true
char: A`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各型のサイズとデフォルト値</h2>
        <p className="text-gray-400 mb-4">
          プリミティブ型のサイズを確認してみましょう。ラッパークラスの定数を使うと最大値・最小値がわかります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== 整数型の範囲 ===");
        System.out.println("byte: " + Byte.MIN_VALUE + " ~ " + Byte.MAX_VALUE);
        System.out.println("short: " + Short.MIN_VALUE + " ~ " + Short.MAX_VALUE);
        System.out.println("int: " + Integer.MIN_VALUE + " ~ " + Integer.MAX_VALUE);
        System.out.println("long: " + Long.MIN_VALUE + " ~ " + Long.MAX_VALUE);

        System.out.println("=== 浮動小数点型の範囲 ===");
        System.out.println("float最大: " + Float.MAX_VALUE);
        System.out.println("double最大: " + Double.MAX_VALUE);
    }
}`}
          expectedOutput={`=== 整数型の範囲 ===
byte: -128 ~ 127
short: -32768 ~ 32767
int: -2147483648 ~ 2147483647
long: -9223372036854775808 ~ 9223372036854775807
=== 浮動小数点型の範囲 ===
float最大: 3.4028235E38
double最大: 1.7976931348623157E308`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}
