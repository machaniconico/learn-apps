import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">基本的な条件分岐</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if-else文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">if</code> 文は条件に応じて処理を分岐させる基本的な制御構文です。
          条件式が <code>true</code> の場合に if ブロックが実行され、
          <code>false</code> の場合に else ブロックが実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>if (条件)</code> のカッコ内は boolean 式でなければならない</li>
          <li><code>else</code> ブロックは省略可能</li>
          <li>ブロック内が1文だけでも波括弧 <code>{`{}`}</code> を付けるのが推奨</li>
          <li>if文はネスト（入れ子）にもできる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なif-else</h2>
        <p className="text-gray-400 mb-4">
          条件に応じて異なるメッセージを表示する基本例です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int score = 75;

        // 基本的なif文
        if (score >= 60) {
            System.out.println("合格です！");
        }

        // if-else文
        int age = 17;
        if (age >= 18) {
            System.out.println("成人です");
        } else {
            System.out.println("未成年です");
        }

        // 変数への代入と組み合わせ
        double temperature = 35.5;
        String status;
        if (temperature >= 37.5) {
            status = "発熱";
        } else {
            status = "平熱";
        }
        System.out.println("体温: " + temperature + "℃ → " + status);
    }
}`}
          expectedOutput={`合格です！
未成年です
体温: 35.5℃ → 平熱`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複合条件とネスト</h2>
        <p className="text-gray-400 mb-4">
          論理演算子で複数の条件を組み合わせたり、if文をネストさせたりできます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int age = 25;
        boolean hasTicket = true;

        // 複合条件
        if (age >= 18 && hasTicket) {
            System.out.println("入場できます");
        } else {
            System.out.println("入場できません");
        }

        // ネストしたif文
        String weather = "rainy";
        boolean hasUmbrella = false;

        if (weather.equals("rainy")) {
            if (hasUmbrella) {
                System.out.println("傘があるので大丈夫");
            } else {
                System.out.println("傘がないので濡れます");
            }
        } else {
            System.out.println("晴れています");
        }

        // 否定条件
        String input = "";
        if (!input.isEmpty()) {
            System.out.println("入力: " + input);
        } else {
            System.out.println("入力が空です");
        }
    }
}`}
          expectedOutput={`入場できます
傘がないので濡れます
入力が空です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
