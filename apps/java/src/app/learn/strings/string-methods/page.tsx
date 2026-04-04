import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列メソッド</h1>
        <p className="text-gray-400">substring・indexOf・replaceなどの操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">よく使う文字列メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          String クラスには文字列を操作するための豊富なメソッドがあります。
          部分文字列の取得、検索、置換、分割、前後の空白除去など、
          日常的に使うメソッドを学びましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>substring()</code> で部分文字列を取得</li>
          <li><code>indexOf()</code>・<code>lastIndexOf()</code> で位置を検索</li>
          <li><code>replace()</code>・<code>replaceAll()</code> で置換</li>
          <li><code>split()</code> で分割、<code>trim()</code>・<code>strip()</code> で空白除去</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">substring と indexOf</h2>
        <p className="text-gray-400 mb-4">
          文字列の一部を切り出したり、特定の文字やパターンの位置を検索します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String text = "Hello, Java World!";

        // substring: 部分文字列
        System.out.println("substring(7): " + text.substring(7));
        System.out.println("substring(7,11): " + text.substring(7, 11));

        // indexOf: 最初の出現位置
        System.out.println("'Java'の位置: " + text.indexOf("Java"));
        System.out.println("'o'の位置: " + text.indexOf('o'));
        System.out.println("'Python'の位置: " + text.indexOf("Python"));

        // lastIndexOf: 最後の出現位置
        System.out.println("最後の'o': " + text.lastIndexOf('o'));

        // contains: 含むか
        System.out.println("Javaを含む? " + text.contains("Java"));

        // startsWith / endsWith
        System.out.println("Helloで始まる? " + text.startsWith("Hello"));
        System.out.println("!で終わる? " + text.endsWith("!"));
    }
}`}
          expectedOutput={`substring(7): Java World!
substring(7,11): Java
'Java'の位置: 7
'o'の位置: 4
'Python'の位置: -1
最後の'o': 14
Javaを含む? true
Helloで始まる? true
!で終わる? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">replace と split</h2>
        <p className="text-gray-400 mb-4">
          文字列の置換と分割を行います。split は正規表現も受け付けます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // replace: 文字の置換
        String s1 = "Hello World";
        System.out.println("replace: " + s1.replace('o', '0'));
        System.out.println("replace: " + s1.replace("World", "Java"));

        // replaceAll（正規表現）
        String s2 = "abc123def456";
        System.out.println("数字除去: " + s2.replaceAll("[0-9]", ""));
        System.out.println("文字除去: " + s2.replaceAll("[a-z]", ""));

        // split: 分割
        String csv = "りんご,バナナ,みかん,ぶどう";
        String[] fruits = csv.split(",");
        System.out.println("split: " + Arrays.toString(fruits));
        System.out.println("要素数: " + fruits.length);

        // limit付きsplit
        String[] limited = csv.split(",", 2);
        System.out.println("limit=2: " + Arrays.toString(limited));

        // String.join: 結合
        String joined = String.join(" | ", fruits);
        System.out.println("join: " + joined);
    }
}`}
          expectedOutput={`replace: Hell0 W0rld
replace: Hello Java
数字除去: abcdef
文字除去: 123456
split: [りんご, バナナ, みかん, ぶどう]
要素数: 4
limit=2: [りんご, バナナ,みかん,ぶどう]
join: りんご | バナナ | みかん | ぶどう`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">trim・strip・大文字小文字</h2>
        <p className="text-gray-400 mb-4">
          空白の除去と大文字・小文字の変換を行います。
          <code className="text-orange-300">strip()</code> は Java 11 以降で Unicode 空白にも対応します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // trim: 前後の空白を除去
        String s = "  Hello World  ";
        System.out.println("原文: '" + s + "'");
        System.out.println("trim: '" + s.trim() + "'");

        // strip (Java 11+): Unicode空白にも対応
        System.out.println("strip: '" + s.strip() + "'");
        System.out.println("stripLeading: '" + s.stripLeading() + "'");
        System.out.println("stripTrailing: '" + s.stripTrailing() + "'");

        // 大文字・小文字変換
        String text = "Hello World";
        System.out.println("大文字: " + text.toUpperCase());
        System.out.println("小文字: " + text.toLowerCase());

        // isBlank (Java 11+): 空白のみか
        System.out.println("空白のみ? " + "   ".isBlank());
        System.out.println("空白のみ? " + "abc".isBlank());
        System.out.println("空文字? " + "".isBlank());
    }
}`}
          expectedOutput={`原文: '  Hello World  '
trim: 'Hello World'
strip: 'Hello World'
stripLeading: 'Hello World  '
stripTrailing: '  Hello World'
大文字: HELLO WORLD
小文字: hello world
空白のみ? true
空白のみ? false
空文字? true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="string-methods" basePath="/learn/strings" />
    </div>
  );
}
