import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">finalキーワードによる定数の定義</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">finalキーワード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">final</code> キーワードを付けた変数は定数となり、
          一度代入した値を変更できなくなります。
          定数名は慣例として大文字のスネークケース（UPPER_SNAKE_CASE）で命名します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>final</code> を付けると再代入不可になる</li>
          <li>定数名は <code>MAX_SIZE</code> のように大文字スネークケースが慣例</li>
          <li><code>static final</code> でクラスレベルの定数を定義</li>
          <li>プログラム中で変更されたくない値（税率、設定値など）に使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ローカル定数</h2>
        <p className="text-gray-400 mb-4">
          メソッド内で <code className="text-orange-300">final</code> を使ってローカル定数を宣言します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        final double TAX_RATE = 0.10;
        final int MAX_RETRY = 3;
        final String APP_NAME = "MyApp";

        int price = 1000;
        double taxAmount = price * TAX_RATE;
        double total = price + taxAmount;

        System.out.println("アプリ: " + APP_NAME);
        System.out.println("価格: " + price + "円");
        System.out.println("税額: " + taxAmount + "円");
        System.out.println("合計: " + total + "円");
        System.out.println("最大リトライ: " + MAX_RETRY + "回");
    }
}`}
          expectedOutput={`アプリ: MyApp
価格: 1000円
税額: 100.0円
合計: 1100.0円
最大リトライ: 3回`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスレベルの定数（static final）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">static final</code> を使うと、クラス全体で共有される定数を定義できます。
          設定値やマジックナンバーの置き換えに最適です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // クラスレベルの定数
    static final double PI = 3.14159265358979;
    static final int SECONDS_PER_MINUTE = 60;
    static final int MINUTES_PER_HOUR = 60;
    static final String DEFAULT_LANG = "ja";

    public static void main(String[] args) {
        double radius = 5.0;
        double area = PI * radius * radius;
        System.out.println("半径" + radius + "の円の面積: " + area);

        int totalSeconds = 3723;
        int hours = totalSeconds / (SECONDS_PER_MINUTE * MINUTES_PER_HOUR);
        int minutes = (totalSeconds % (SECONDS_PER_MINUTE * MINUTES_PER_HOUR)) / SECONDS_PER_MINUTE;
        int seconds = totalSeconds % SECONDS_PER_MINUTE;
        System.out.println(totalSeconds + "秒 = " + hours + "時間" + minutes + "分" + seconds + "秒");
        System.out.println("デフォルト言語: " + DEFAULT_LANG);
    }
}`}
          expectedOutput={`半径5.0の円の面積: 78.53981633974475
3723秒 = 1時間2分3秒
デフォルト言語: ja`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
