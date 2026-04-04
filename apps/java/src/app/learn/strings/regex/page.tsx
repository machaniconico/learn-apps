import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function RegexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現</h1>
        <p className="text-gray-400">PatternとMatcherによる正規表現</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaの正規表現</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java では <code className="text-orange-300">java.util.regex</code> パッケージの
          <code className="text-orange-300">Pattern</code> と <code className="text-orange-300">Matcher</code> を使って
          正規表現によるパターンマッチングを行います。
          String の <code className="text-orange-300">matches()</code> メソッドでも簡易的に使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Pattern.compile()</code> でパターンをコンパイル</li>
          <li><code>Matcher.matches()</code> で全体一致、<code>find()</code> で部分一致</li>
          <li><code>{"\\\\d"}</code> 数字、<code>{"\\\\w"}</code> 英数字、<code>{"\\\\s"}</code> 空白</li>
          <li>Java の文字列では <code>\</code> を <code>\\</code> とエスケープする必要がある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">matches による全体一致</h2>
        <p className="text-gray-400 mb-4">
          String の <code className="text-orange-300">matches()</code> メソッドで
          文字列全体がパターンに一致するかチェックします。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 数字のみ
        System.out.println("12345: " + "12345".matches("\\\\d+"));
        System.out.println("abc: " + "abc".matches("\\\\d+"));

        // メールアドレスの簡易チェック
        String emailPattern = "[\\\\w.]+@[\\\\w.]+\\\\.[a-zA-Z]{2,}";
        System.out.println("user@example.com: " + "user@example.com".matches(emailPattern));
        System.out.println("invalid: " + "invalid".matches(emailPattern));

        // 電話番号パターン
        String phonePattern = "\\\\d{2,4}-\\\\d{2,4}-\\\\d{4}";
        System.out.println("03-1234-5678: " + "03-1234-5678".matches(phonePattern));
        System.out.println("090-1234-5678: " + "090-1234-5678".matches(phonePattern));

        // 日付パターン
        String datePattern = "\\\\d{4}/\\\\d{2}/\\\\d{2}";
        System.out.println("2026/04/02: " + "2026/04/02".matches(datePattern));
    }
}`}
          expectedOutput={`12345: true
abc: false
user@example.com: true
invalid: false
03-1234-5678: true
090-1234-5678: true
2026/04/02: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pattern と Matcher</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Pattern.compile()</code> でパターンを事前コンパイルし、
          <code className="text-orange-300">Matcher.find()</code> で部分一致を繰り返し検索します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        // パターンをコンパイル
        Pattern pattern = Pattern.compile("\\\\d+");
        Matcher matcher = pattern.matcher("価格は150円、税込165円です");

        // findで部分一致を繰り返し検索
        System.out.println("--- 数字を検索 ---");
        while (matcher.find()) {
            System.out.println("一致: " + matcher.group() + " (位置: " + matcher.start() + "-" + matcher.end() + ")");
        }

        // グループキャプチャ
        Pattern namePattern = Pattern.compile("(\\\\w+)=(\\\\w+)");
        Matcher nameMatcher = namePattern.matcher("name=田中 age=25 city=東京");

        System.out.println("--- キー=値 を検索 ---");
        while (nameMatcher.find()) {
            System.out.println("全体: " + nameMatcher.group());
            System.out.println("  キー: " + nameMatcher.group(1));
            System.out.println("  値: " + nameMatcher.group(2));
        }
    }
}`}
          expectedOutput={`--- 数字を検索 ---
一致: 150 (位置: 3-6)
一致: 165 (位置: 10-13)
--- キー=値 を検索 ---
全体: name=田中
  キー: name
  値: 田中
全体: age=25
  キー: age
  値: 25
全体: city=東京
  キー: city
  値: 東京`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">replaceAll と split</h2>
        <p className="text-gray-400 mb-4">
          正規表現を使った置換と分割を行います。
          Matcher の <code className="text-orange-300">replaceAll()</code> で高度な置換ができます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        // replaceAll: 正規表現で置換
        String text = "今日は2026年4月2日、明日は2026年4月3日";
        String masked = text.replaceAll("\\\\d{4}年\\\\d{1,2}月\\\\d{1,2}日", "****年**月**日");
        System.out.println("マスク: " + masked);

        // 連続空白を1つに
        String messy = "Hello    World     Java";
        String clean = messy.replaceAll("\\\\s+", " ");
        System.out.println("空白整理: " + clean);

        // HTMLタグを除去
        String html = "<p>Hello</p><br><b>World</b>";
        String noTags = html.replaceAll("<[^>]+>", "");
        System.out.println("タグ除去: " + noTags);

        // Pattern.split: 正規表現で分割
        Pattern p = Pattern.compile("[,;\\\\s]+");
        String[] parts = p.split("apple, banana; cherry orange");
        System.out.println("分割: " + Arrays.toString(parts));
    }
}`}
          expectedOutput={`マスク: 今日は****年**月**日、明日は****年**月**日
空白整理: Hello World Java
タグ除去: HelloWorld
分割: [apple, banana, cherry, orange]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="regex" />
      </div>
      <LessonNav lessons={lessons} currentId="regex" basePath="/learn/strings" />
    </div>
  );
}
