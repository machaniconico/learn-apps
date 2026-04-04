import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">Stringクラスの作成・結合・基本操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Stringクラスの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaの <code className="text-orange-300">String</code> はオブジェクト型で、文字列を扱うためのクラスです。
          ダブルクォートで囲んで文字列リテラルを作成します。
          Stringは不変（イミュータブル）で、一度作成した文字列は変更できません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>+</code> 演算子で文字列を結合できる</li>
          <li><code>length()</code> で文字数を取得</li>
          <li><code>charAt(index)</code> で指定位置の文字を取得（0始まり）</li>
          <li>Stringは不変（イミュータブル）なので操作するたびに新しいオブジェクトが生成される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成と結合</h2>
        <p className="text-gray-400 mb-4">
          文字列リテラルと <code className="text-orange-300">+</code> による結合の基本です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String greeting = "こんにちは";
        String name = "Java";

        // + で結合
        String message = greeting + "、" + name + "！";
        System.out.println(message);

        // 数値と文字列の結合
        int version = 21;
        System.out.println(name + " " + version + " を学習中");

        // 空文字列
        String empty = "";
        System.out.println("空文字の長さ: " + empty.length());
    }
}`}
          expectedOutput={`こんにちは、Java！
Java 21 を学習中
空文字の長さ: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な文字列操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">length()</code>、<code className="text-orange-300">charAt()</code>、
          <code className="text-orange-300">substring()</code> など基本的なメソッドを使ってみましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String text = "Hello, Java!";

        System.out.println("文字列: " + text);
        System.out.println("長さ: " + text.length());
        System.out.println("0番目: " + text.charAt(0));
        System.out.println("7番目: " + text.charAt(7));

        // 部分文字列
        System.out.println("substring(7): " + text.substring(7));
        System.out.println("substring(0,5): " + text.substring(0, 5));
    }
}`}
          expectedOutput={`文字列: Hello, Java!
長さ: 12
0番目: H
7番目: J
substring(7): Java!
substring(0,5): Hello`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の比較と検索</h2>
        <p className="text-gray-400 mb-4">
          文字列の比較には <code className="text-orange-300">equals()</code> を使います。
          <code className="text-orange-300">==</code> は参照の比較なので注意が必要です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");

        // equals() で内容を比較
        System.out.println("s1.equals(s2): " + s1.equals(s2));
        System.out.println("s1.equals(s3): " + s1.equals(s3));

        // 大文字小文字を無視した比較
        System.out.println("equalsIgnoreCase: " + "java".equalsIgnoreCase("JAVA"));

        // 検索
        String text = "Java programming is fun";
        System.out.println("contains: " + text.contains("programming"));
        System.out.println("indexOf: " + text.indexOf("programming"));
        System.out.println("startsWith: " + text.startsWith("Java"));
    }
}`}
          expectedOutput={`s1.equals(s2): true
s1.equals(s3): true
equalsIgnoreCase: true
contains: true
indexOf: 5
startsWith: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
