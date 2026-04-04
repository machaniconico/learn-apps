import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringFormattingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列フォーマット</h1>
        <p className="text-gray-400">String.formatとテキストブロック</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列フォーマットの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java には文字列をフォーマットするための複数の方法があります。
          <code className="text-orange-300">String.format()</code> や <code className="text-orange-300">printf()</code> で
          C言語スタイルのフォーマット指定子が使えます。
          Java 13 以降ではテキストブロック（複数行文字列）も利用可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>%s</code> 文字列、<code>%d</code> 整数、<code>%f</code> 小数</li>
          <li><code>%n</code> 改行、<code>%10s</code> 幅指定、<code>%.2f</code> 小数点以下桁数</li>
          <li><code>String.format()</code> で文字列を返す</li>
          <li>テキストブロック <code>{`"""`}</code> で複数行文字列（Java 13+）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">String.format の基本</h2>
        <p className="text-gray-400 mb-4">
          フォーマット指定子を使って、数値や文字列を整形します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 基本的なフォーマット
        String name = "田中";
        int age = 25;
        double score = 92.5;

        String s1 = String.format("名前: %s, 年齢: %d歳", name, age);
        System.out.println(s1);

        // 小数の桁数指定
        System.out.println(String.format("スコア: %.1f", score));
        System.out.println(String.format("スコア: %.3f", score));

        // 幅指定（右揃え）
        System.out.println(String.format("|%10s|", "右揃え"));
        System.out.println(String.format("|%-10s|", "左揃え"));

        // 数値のフォーマット
        System.out.println(String.format("ゼロ埋め: %05d", 42));
        System.out.println(String.format("符号付き: %+d", 42));
        System.out.println(String.format("符号付き: %+d", -42));
        System.out.println(String.format("カンマ区切り: %,d", 1234567));
    }
}`}
          expectedOutput={`名前: 田中, 年齢: 25歳
スコア: 92.5
スコア: 92.500
|      右揃え|
|左揃え      |
ゼロ埋め: 00042
符号付き: +42
符号付き: -42
カンマ区切り: 1,234,567`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printf と formatted</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">System.out.printf()</code> で直接出力し、
          <code className="text-orange-300">formatted()</code>（Java 15+）でインスタンスメソッドとして使います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // printf: フォーマットして直接出力
        System.out.printf("商品: %-10s 価格: %,8d円%n", "りんご", 150);
        System.out.printf("商品: %-10s 価格: %,8d円%n", "バナナ", 80);
        System.out.printf("商品: %-10s 価格: %,8d円%n", "メロン", 3500);

        System.out.println();

        // テーブル形式
        String[] names = {"Alice", "Bob", "Charlie"};
        int[] scores = {95, 82, 91};
        String[] grades = {"A", "B", "A"};

        System.out.printf("%-10s %5s %5s%n", "名前", "点数", "評価");
        System.out.printf("%-10s %5s %5s%n", "----", "----", "----");
        for (int i = 0; i < names.length; i++) {
            System.out.printf("%-10s %5d %5s%n", names[i], scores[i], grades[i]);
        }
    }
}`}
          expectedOutput={`商品: りんご       価格:      150円
商品: バナナ       価格:       80円
商品: メロン       価格:    3,500円

名前          点数    評価
----         ----  ----
Alice           95     A
Bob             82     B
Charlie         91     A`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テキストブロック（Java 13+）</h2>
        <p className="text-gray-400 mb-4">
          テキストブロックは三重引用符 <code className="text-orange-300">{`"""`}</code> で囲む複数行文字列です。
          HTML、JSON、SQLなどの埋め込みに便利です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // テキストブロック（Java 13+）
        String json = """
                {
                    "name": "田中太郎",
                    "age": 25,
                    "city": "東京"
                }
                """;
        System.out.println("JSON:");
        System.out.println(json);

        // フォーマットと組み合わせ
        String name = "鈴木花子";
        int age = 30;
        String template = """
                名前: %s
                年齢: %d歳
                ステータス: アクティブ
                """.formatted(name, age);
        System.out.println("テンプレート:");
        System.out.print(template);
    }
}`}
          expectedOutput={`JSON:
{
    "name": "田中太郎",
    "age": 25,
    "city": "東京"
}

テンプレート:
名前: 鈴木花子
年齢: 30歳
ステータス: アクティブ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-formatting" />
      </div>
      <LessonNav lessons={lessons} currentId="string-formatting" basePath="/learn/strings" />
    </div>
  );
}
