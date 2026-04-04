import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">暗黙的・明示的な型変換（キャスト）</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaの型変換には、自動的に行われる「暗黙的変換（拡張変換）」と、
          プログラマが明示的に指定する「キャスト（縮小変換）」の2種類があります。
          小さい型から大きい型への変換は安全ですが、逆方向はデータの損失が起こり得ます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>拡張変換（暗黙的）: byte → short → int → long → float → double</li>
          <li>縮小変換（キャスト）: <code>(型)</code> を前に付けて明示的に変換</li>
          <li>文字列への変換: <code>String.valueOf()</code> や <code>+ ""</code></li>
          <li>文字列からの変換: <code>Integer.parseInt()</code>、<code>Double.parseDouble()</code> など</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">暗黙的変換（拡張変換）</h2>
        <p className="text-gray-400 mb-4">
          小さい型から大きい型への変換は自動的に行われます。データの損失は起きません。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        byte b = 100;
        short s = b;       // byte → short
        int i = s;         // short → int
        long l = i;        // int → long
        float f = l;       // long → float
        double d = f;      // float → double

        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);

        // charからintへの変換
        char ch = 'A';
        int ascii = ch;
        System.out.println("'" + ch + "' のコード: " + ascii);
    }
}`}
          expectedOutput={`byte: 100
short: 100
int: 100
long: 100
float: 100.0
double: 100.0
'A' のコード: 65`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">明示的キャスト（縮小変換）</h2>
        <p className="text-gray-400 mb-4">
          大きい型から小さい型への変換にはキャストが必要です。データが失われる可能性があります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        double d = 9.78;
        int i = (int) d;  // 小数部分が切り捨てられる
        System.out.println("double " + d + " → int " + i);

        int big = 300;
        byte b = (byte) big;  // オーバーフロー
        System.out.println("int " + big + " → byte " + b);

        // intからcharへ
        int code = 74;
        char ch = (char) code;
        System.out.println("int " + code + " → char '" + ch + "'");

        // longからintへ
        long longVal = 100000L;
        int intVal = (int) longVal;
        System.out.println("long " + longVal + " → int " + intVal);
    }
}`}
          expectedOutput={`double 9.78 → int 9
int 300 → byte 44
int 74 → char 'J'
long 100000 → int 100000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列との変換</h2>
        <p className="text-gray-400 mb-4">
          数値から文字列、文字列から数値への変換はよく使うパターンです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 数値 → 文字列
        int num = 42;
        String s1 = String.valueOf(num);
        String s2 = Integer.toString(num);
        String s3 = num + "";
        System.out.println("変換結果: " + s1 + ", " + s2 + ", " + s3);

        // 文字列 → 数値
        String strInt = "123";
        String strDouble = "3.14";
        int parsedInt = Integer.parseInt(strInt);
        double parsedDouble = Double.parseDouble(strDouble);

        System.out.println("parseInt: " + parsedInt);
        System.out.println("parseDouble: " + parsedDouble);
        System.out.println("計算: " + (parsedInt + parsedDouble));
    }
}`}
          expectedOutput={`変換結果: 42, 42, 42
parseInt: 123
parseDouble: 3.14
計算: 126.14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}
