import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchExpressionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch式</h1>
        <p className="text-gray-400">Java 14のアロー構文とyield</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch式（Java 14+）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java 14 で正式導入された switch 式は、アロー構文 <code className="text-orange-300">{`->`}</code> を使い、
          break不要でフォールスルーも起きない安全な記法です。
          switch が値を返す「式」として使え、変数に直接代入できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>アロー構文 <code>{`->`}</code> で break 不要、フォールスルーなし</li>
          <li>switch 全体が値を返す式として使える</li>
          <li>複数のラベルをカンマで区切って1つの case にまとめ可能</li>
          <li>ブロック内で値を返すには <code>yield</code> キーワードを使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アロー構文の基本</h2>
        <p className="text-gray-400 mb-4">
          従来の switch 文をアロー構文で簡潔に書き換えましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int day = 3;

        // switch式でアロー構文
        String dayName = switch (day) {
            case 1 -> "月曜日";
            case 2 -> "火曜日";
            case 3 -> "水曜日";
            case 4 -> "木曜日";
            case 5 -> "金曜日";
            case 6 -> "土曜日";
            case 7 -> "日曜日";
            default -> "不正な値";
        };

        System.out.println("今日は" + dayName + "です");

        // 複数ラベルをカンマ区切り
        String type = switch (day) {
            case 1, 2, 3, 4, 5 -> "平日";
            case 6, 7 -> "休日";
            default -> "不明";
        };

        System.out.println(dayName + "は" + type + "です");
    }
}`}
          expectedOutput={`今日は水曜日です
水曜日は平日です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">yieldキーワード</h2>
        <p className="text-gray-400 mb-4">
          ブロック内で複数の処理を行い、最終的に <code className="text-orange-300">yield</code> で値を返します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int score = 85;

        // yieldを使って複雑な処理の結果を返す
        String result = switch (score / 10) {
            case 10, 9 -> {
                System.out.println("素晴らしい成績です！");
                yield "A";
            }
            case 8 -> {
                System.out.println("良い成績です");
                yield "B";
            }
            case 7 -> {
                System.out.println("もう少し頑張りましょう");
                yield "C";
            }
            default -> {
                System.out.println("頑張りましょう");
                yield "D";
            }
        };

        System.out.println("評価: " + result);
    }
}`}
          expectedOutput={`良い成績です
評価: B`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的なswitch式</h2>
        <p className="text-gray-400 mb-4">
          switch 式を使った実用的なパターンです。enum との組み合わせも効果的です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    enum Season { SPRING, SUMMER, AUTUMN, WINTER }

    public static void main(String[] args) {
        Season season = Season.SUMMER;

        // enumとswitch式の組み合わせ
        String activity = switch (season) {
            case SPRING -> "花見";
            case SUMMER -> "海水浴";
            case AUTUMN -> "紅葉狩り";
            case WINTER -> "スキー";
        };
        System.out.println(season + " → " + activity);

        // 戻り値の計算に使用
        int month = 8;
        int daysInMonth = switch (month) {
            case 2 -> 28;
            case 4, 6, 9, 11 -> 30;
            default -> 31;
        };
        System.out.println(month + "月は" + daysInMonth + "日間");

        // 直接メソッド呼び出しに使用
        String status = "error";
        System.out.println("ステータス: " + switch (status) {
            case "ok" -> "正常";
            case "error" -> "エラー";
            case "pending" -> "保留中";
            default -> "不明";
        });
    }
}`}
          expectedOutput={`SUMMER → 海水浴
8月は31日間
ステータス: エラー`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch-expression" />
      </div>
      <LessonNav lessons={lessons} currentId="switch-expression" basePath="/learn/control" />
    </div>
  );
}
