import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列比較</h1>
        <p className="text-gray-400">equalsとcompareTo・==の違い</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列比較の注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java で文字列を比較する際、<code className="text-orange-300">==</code> と
          <code className="text-orange-300">equals()</code> は異なる動作をします。
          <code className="text-orange-300">==</code> は参照の比較（同じオブジェクトか）、
          <code className="text-orange-300">equals()</code> は値の比較（同じ内容か）です。
          文字列比較には必ず <code className="text-orange-300">equals()</code> を使いましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>equals()</code>: 内容が同じなら true（推奨）</li>
          <li><code>equalsIgnoreCase()</code>: 大文字小文字を無視して比較</li>
          <li><code>compareTo()</code>: 辞書順で比較（ソート用）</li>
          <li><code>==</code>: 参照比較（文字列比較には使わない）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">== の罠</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">==</code> は参照の比較なので、
          同じ内容でも異なるオブジェクトなら false になります。
          これは Java 初心者が最もハマりやすいバグの1つです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // リテラル同士: Stringプールで共有 → true
        String a = "Hello";
        String b = "Hello";
        System.out.println("リテラル == : " + (a == b));
        System.out.println("リテラル equals: " + a.equals(b));

        // new String: 別オブジェクト → false
        String c = new String("Hello");
        System.out.println("new == : " + (a == c));
        System.out.println("new equals: " + a.equals(c));

        // 結合で作成: 実行時結合は別オブジェクト
        String d = "Hel";
        String e = d + "lo";
        System.out.println("結合 == : " + (a == e));
        System.out.println("結合 equals: " + a.equals(e));

        // コンパイル時定数は最適化される
        final String f = "Hel";
        String g = f + "lo";
        System.out.println("final結合 == : " + (a == g));

        System.out.println("\\n結論: 文字列比較は必ず equals() を使う！");
    }
}`}
          expectedOutput={`リテラル == : true
リテラル equals: true
new == : false
new equals: true
結合 == : false
結合 equals: true
final結合 == : true

結論: 文字列比較は必ず equals() を使う！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">equalsIgnoreCase と compareTo</h2>
        <p className="text-gray-400 mb-4">
          大文字小文字を無視した比較や、辞書順での大小比較を行います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // equalsIgnoreCase: 大文字小文字を無視
        String s1 = "Hello";
        String s2 = "HELLO";
        String s3 = "hello";

        System.out.println("equals: " + s1.equals(s2));
        System.out.println("equalsIgnoreCase: " + s1.equalsIgnoreCase(s2));
        System.out.println("equalsIgnoreCase: " + s1.equalsIgnoreCase(s3));

        // compareTo: 辞書順比較
        System.out.println("\\n--- compareTo ---");
        System.out.println("apple vs banana: " + "apple".compareTo("banana"));
        System.out.println("banana vs apple: " + "banana".compareTo("apple"));
        System.out.println("apple vs apple: " + "apple".compareTo("apple"));

        // compareToの結果: 負=前、0=同じ、正=後
        String[] words = {"cherry", "apple", "banana"};
        System.out.print("ソート前: ");
        for (String w : words) System.out.print(w + " ");
        System.out.println();

        // バブルソート（compareToを使用）
        for (int i = 0; i < words.length - 1; i++) {
            for (int j = 0; j < words.length - 1 - i; j++) {
                if (words[j].compareTo(words[j + 1]) > 0) {
                    String tmp = words[j];
                    words[j] = words[j + 1];
                    words[j + 1] = tmp;
                }
            }
        }
        System.out.print("ソート後: ");
        for (String w : words) System.out.print(w + " ");
        System.out.println();
    }
}`}
          expectedOutput={`equals: false
equalsIgnoreCase: true
equalsIgnoreCase: true

--- compareTo ---
apple vs banana: -1
banana vs apple: 1
apple vs apple: 0
ソート前: cherry apple banana
ソート後: apple banana cherry `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">null安全な比較</h2>
        <p className="text-gray-400 mb-4">
          null の可能性がある文字列を比較する場合の安全なパターンを学びます。
          null に対して equals() を呼ぶと NullPointerException になります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = null;

        // 危険: s2.equals(s1) → NullPointerException
        // 安全: リテラルを左に置く
        System.out.println("リテラル左: " + "Hello".equals(s2));

        // Objects.equals: null安全な比較
        System.out.println("Objects.equals(s1, s2): " + Objects.equals(s1, s2));
        System.out.println("Objects.equals(null, null): " + Objects.equals(null, null));
        System.out.println("Objects.equals(s1, \"Hello\"): " + Objects.equals(s1, "Hello"));

        // null チェック付き比較
        String input = null;
        if (input != null && input.equals("admin")) {
            System.out.println("管理者です");
        } else {
            System.out.println("管理者ではありません");
        }

        // contentEquals: CharSequenceとの比較
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("contentEquals: " + s1.contentEquals(sb));

        // regionMatches: 部分一致
        String text = "Hello World";
        System.out.println("部分一致: " + text.regionMatches(true, 6, "WORLD", 0, 5));
    }
}`}
          expectedOutput={`リテラル左: false
Objects.equals(s1, s2): false
Objects.equals(null, null): true
Objects.equals(s1, "Hello"): true
管理者ではありません
contentEquals: true
部分一致: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="string-comparison" basePath="/learn/strings" />
    </div>
  );
}
