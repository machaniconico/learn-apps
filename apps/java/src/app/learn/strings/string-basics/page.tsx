import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Stringの基本</h1>
        <p className="text-gray-400">Stringの不変性と基本操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">String型の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java の <code className="text-orange-300">String</code> は不変（immutable）オブジェクトです。
          一度作成すると中身を変更できず、文字列操作のたびに新しい String オブジェクトが作られます。
          同じリテラル文字列は String プールで共有され、メモリ効率が良くなります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>String は不変: 変更するメソッドは新しい String を返す</li>
          <li>String プール: 同じリテラルは同一オブジェクトを参照</li>
          <li><code>intern()</code> でプールに手動登録可能</li>
          <li><code>length()</code>・<code>charAt()</code>・<code>isEmpty()</code> が基本メソッド</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">不変性の確認</h2>
        <p className="text-gray-400 mb-4">
          String は不変なので、操作するたびに新しいオブジェクトが生成されます。
          元の文字列は変わりません。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println("元の文字列: " + s);

        // toUpperCase は新しい String を返す
        String upper = s.toUpperCase();
        System.out.println("大文字: " + upper);
        System.out.println("元は変わらない: " + s);

        // concat も新しい String を返す
        String joined = s.concat(" World");
        System.out.println("結合: " + joined);
        System.out.println("元は変わらない: " + s);

        // 基本メソッド
        String text = "Java Programming";
        System.out.println("長さ: " + text.length());
        System.out.println("3番目の文字: " + text.charAt(3));
        System.out.println("空文字? " + text.isEmpty());
        System.out.println("空文字? " + "".isEmpty());
    }
}`}
          expectedOutput={`元の文字列: Hello
大文字: HELLO
元は変わらない: Hello
結合: Hello World
元は変わらない: Hello
長さ: 17
3番目の文字: a
空文字? false
空文字? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stringプール</h2>
        <p className="text-gray-400 mb-4">
          リテラル文字列は String プールに格納され、同じ文字列は共有されます。
          <code className="text-orange-300">new String()</code> はプール外に作成されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // リテラル: Stringプールで共有
        String a = "Hello";
        String b = "Hello";
        System.out.println("リテラル同士 ==: " + (a == b));
        System.out.println("リテラル同士 equals: " + a.equals(b));

        // new: プール外に新規作成
        String c = new String("Hello");
        System.out.println("リテラルとnew ==: " + (a == c));
        System.out.println("リテラルとnew equals: " + a.equals(c));

        // intern: プールに登録
        String d = c.intern();
        System.out.println("intern後 ==: " + (a == d));

        // 文字列結合
        String e = "Hel" + "lo";  // コンパイル時に結合
        System.out.println("結合リテラル ==: " + (a == e));
    }
}`}
          expectedOutput={`リテラル同士 ==: true
リテラル同士 equals: true
リテラルとnew ==: false
リテラルとnew equals: true
intern後 ==: true
結合リテラル ==: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の変換</h2>
        <p className="text-gray-400 mb-4">
          数値と文字列の相互変換や、文字配列との変換を行います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 数値 → 文字列
        int num = 42;
        String s1 = String.valueOf(num);
        String s2 = Integer.toString(num);
        String s3 = "" + num;
        System.out.println("valueOf: " + s1);
        System.out.println("toString: " + s2);
        System.out.println("結合: " + s3);

        // 文字列 → 数値
        int parsed = Integer.parseInt("123");
        double dbl = Double.parseDouble("3.14");
        System.out.println("parseInt: " + parsed);
        System.out.println("parseDouble: " + dbl);

        // 文字列 → char配列
        String hello = "Hello";
        char[] chars = hello.toCharArray();
        System.out.print("char[]: ");
        for (char c : chars) System.out.print(c + " ");
        System.out.println();

        // char配列 → 文字列
        String back = new String(chars);
        System.out.println("戻す: " + back);
    }
}`}
          expectedOutput={`valueOf: 42
toString: 42
結合: 42
parseInt: 123
parseDouble: 3.14
char[]: H e l l o
戻す: Hello`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="string-basics" basePath="/learn/strings" />
    </div>
  );
}
