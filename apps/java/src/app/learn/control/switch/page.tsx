import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch文</h1>
        <p className="text-gray-400">従来のswitch文（break必要）</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">switch</code> 文は、一つの値に対して複数の分岐を行う制御構文です。
          <code className="text-orange-300">case</code> に一致するラベルにジャンプし、
          <code className="text-orange-300">break</code> がないと次の case に処理が「落ちる」（フォールスルー）ので注意が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>int, char, String, enum を対象にできる</li>
          <li>各 <code>case</code> の末尾に <code>break;</code> が必要</li>
          <li><code>default</code> はどのcaseにも一致しない場合に実行される</li>
          <li>breakを省略するとフォールスルー（次のcaseも実行される）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なswitch文</h2>
        <p className="text-gray-400 mb-4">
          曜日を判定する基本的な switch 文です。各 case に <code className="text-orange-300">break</code> を忘れずに。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int dayOfWeek = 3;
        String dayName;

        switch (dayOfWeek) {
            case 1:
                dayName = "月曜日";
                break;
            case 2:
                dayName = "火曜日";
                break;
            case 3:
                dayName = "水曜日";
                break;
            case 4:
                dayName = "木曜日";
                break;
            case 5:
                dayName = "金曜日";
                break;
            case 6:
                dayName = "土曜日";
                break;
            case 7:
                dayName = "日曜日";
                break;
            default:
                dayName = "不正な値";
                break;
        }

        System.out.println("今日は" + dayName + "です");
    }
}`}
          expectedOutput={`今日は水曜日です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stringのswitch とフォールスルー</h2>
        <p className="text-gray-400 mb-4">
          Java 7 以降、String を switch で使えます。
          フォールスルーを意図的に利用して複数の case をまとめることもできます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // Stringのswitch
        String command = "start";
        switch (command) {
            case "start":
                System.out.println("処理を開始します");
                break;
            case "stop":
                System.out.println("処理を停止します");
                break;
            case "restart":
                System.out.println("処理を再起動します");
                break;
            default:
                System.out.println("不明なコマンド: " + command);
        }

        // フォールスルーの活用（複数caseをまとめる）
        String month = "February";
        switch (month) {
            case "March":
            case "April":
            case "May":
                System.out.println(month + " → 春");
                break;
            case "June":
            case "July":
            case "August":
                System.out.println(month + " → 夏");
                break;
            case "December":
            case "January":
            case "February":
                System.out.println(month + " → 冬");
                break;
            default:
                System.out.println(month + " → 秋");
        }
    }
}`}
          expectedOutput={`処理を開始します
February → 冬`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">enumを使ったswitch</h2>
        <p className="text-gray-400 mb-4">
          enum（列挙型）は switch と相性が良く、型安全な分岐が可能です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    enum Priority { LOW, MEDIUM, HIGH, CRITICAL }

    public static void main(String[] args) {
        Priority priority = Priority.HIGH;

        switch (priority) {
            case LOW:
                System.out.println("低: 時間があるとき対応");
                break;
            case MEDIUM:
                System.out.println("中: 今週中に対応");
                break;
            case HIGH:
                System.out.println("高: 今日中に対応");
                break;
            case CRITICAL:
                System.out.println("緊急: 即時対応");
                break;
        }

        System.out.println("優先度: " + priority);
    }
}`}
          expectedOutput={`高: 今日中に対応
優先度: HIGH`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch" />
      </div>
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
