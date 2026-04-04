import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBuilderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">StringBuilder</h1>
        <p className="text-gray-400">可変文字列StringBuilderの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">StringBuilderとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">StringBuilder</code> は可変（mutable）な文字列クラスです。
          String と違い、内部のバッファを直接変更するため、
          大量の文字列結合が必要な場合に String よりも高速です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>append()</code> で末尾に追加</li>
          <li><code>insert()</code> で指定位置に挿入</li>
          <li><code>delete()</code> で指定範囲を削除</li>
          <li><code>reverse()</code> で文字列を逆順にする</li>
          <li>スレッドセーフが必要なら <code>StringBuffer</code> を使用</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本操作</h2>
        <p className="text-gray-400 mb-4">
          StringBuilder の追加、挿入、削除、逆順の基本操作です。
          メソッドチェーンで連続して呼び出せます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("初期: " + sb);

        // append: 末尾に追加
        sb.append(" World");
        sb.append("!");
        System.out.println("append: " + sb);

        // insert: 指定位置に挿入
        sb.insert(5, ",");
        System.out.println("insert: " + sb);

        // delete: 範囲削除
        sb.delete(5, 6);
        System.out.println("delete: " + sb);

        // replace: 範囲置換
        sb.replace(6, 11, "Java");
        System.out.println("replace: " + sb);

        // reverse: 逆順
        StringBuilder rev = new StringBuilder("abcde");
        rev.reverse();
        System.out.println("reverse: " + rev);

        // length, charAt
        System.out.println("長さ: " + sb.length());
        System.out.println("0番目: " + sb.charAt(0));
    }
}`}
          expectedOutput={`初期: Hello
append: Hello World!
insert: Hello, World!
delete: Hello World!
replace: Hello Java!
reverse: edcba
長さ: 11
0番目: H`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドチェーン</h2>
        <p className="text-gray-400 mb-4">
          StringBuilder のメソッドは自身を返すため、メソッドチェーンで
          簡潔に書けます。HTMLやSQLの構築によく使われます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // メソッドチェーンで一気に構築
        String result = new StringBuilder()
            .append("名前: ")
            .append("田中太郎")
            .append(", 年齢: ")
            .append(25)
            .append("歳")
            .toString();
        System.out.println(result);

        // HTMLの構築
        String html = new StringBuilder()
            .append("<ul>\\n")
            .append("  <li>Java</li>\\n")
            .append("  <li>Python</li>\\n")
            .append("  <li>Go</li>\\n")
            .append("</ul>")
            .toString();
        System.out.println(html);

        // CSV行の構築
        String[] items = {"りんご", "バナナ", "みかん"};
        StringBuilder csv = new StringBuilder();
        for (int i = 0; i < items.length; i++) {
            if (i > 0) csv.append(",");
            csv.append(items[i]);
        }
        System.out.println("CSV: " + csv);
    }
}`}
          expectedOutput={`名前: 田中太郎, 年齢: 25歳
<ul>
  <li>Java</li>
  <li>Python</li>
  <li>Go</li>
</ul>
CSV: りんご,バナナ,みかん`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stringとの性能差</h2>
        <p className="text-gray-400 mb-4">
          大量の文字列結合では StringBuilder が圧倒的に高速です。
          ループ内での + 結合は避け、StringBuilder を使いましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int count = 10000;

        // String の + 結合（遅い）
        long start1 = System.currentTimeMillis();
        String s = "";
        for (int i = 0; i < count; i++) {
            s += "a";
        }
        long time1 = System.currentTimeMillis() - start1;

        // StringBuilder（速い）
        long start2 = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) {
            sb.append("a");
        }
        String result = sb.toString();
        long time2 = System.currentTimeMillis() - start2;

        System.out.println("String +: " + time1 + "ms (長さ: " + s.length() + ")");
        System.out.println("StringBuilder: " + time2 + "ms (長さ: " + result.length() + ")");
        System.out.println("StringBuilder は大量結合で高速です");

        // deleteCharAt で末尾を削除
        StringBuilder demo = new StringBuilder("Hello!");
        demo.deleteCharAt(demo.length() - 1);
        System.out.println("末尾削除: " + demo);
    }
}`}
          expectedOutput={`String +: 50ms (長さ: 10000)
StringBuilder: 0ms (長さ: 10000)
StringBuilder は大量結合で高速です
末尾削除: Hello`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-builder" />
      </div>
      <LessonNav lessons={lessons} currentId="string-builder" basePath="/learn/strings" />
    </div>
  );
}
