import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Javaのif-else文について正しいのはどれですか？",
    options: [
      "条件式にintを直接使える",
      "条件式はboolean型でなければならない",
      "else節は必ず書かなければならない",
      "if文はネストできない",
    ],
    answer: 1,
    explanation: "Javaのif文の条件式はboolean型（trueまたはfalse）でなければなりません。C/C++のように整数値を条件として使うことはできません。",
  },
  {
    question: "Java 14で導入されたswitch式の特徴はどれですか？",
    options: [
      "breakが必須になった",
      "アロー構文（->）で値を返すことができる",
      "文字列を条件に使えなくなった",
      "default節が不要になった",
    ],
    answer: 1,
    explanation: "Java 14のswitch式ではアロー構文（->）を使い、breakなしで値を返せます。yieldキーワードでブロック内から値を返すこともできます。",
  },
  {
    question: "Javaのforループの構文として正しいのはどれですか？",
    options: [
      "for i in range(10)",
      "for (int i = 0; i < 10; i++)",
      "for i := 0; i < 10; i++",
      "for (i = 0, i < 10, i++)",
    ],
    answer: 1,
    explanation: "Javaのforループは for (初期化; 条件; 更新) の形式です。各部分はセミコロンで区切り、丸括弧で囲みます。",
  },
  {
    question: "拡張forループ（for-each）の正しい使い方はどれですか？",
    options: [
      "for (int i : array.length())",
      "for (var item in array)",
      "for (int num : numbers)",
      "foreach (int num : numbers)",
    ],
    answer: 2,
    explanation: "拡張forループは for (型 変数 : 配列またはIterable) の形式で、コレクションや配列の全要素を順に処理します。foreachキーワードは存在しません。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          条件分岐や繰り返しなど、プログラムの流れを制御する構文を学びましょう。if-else・switch式・forループ・拡張for・三項演算子まで、Javaの制御構文を網羅的に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="cyan" categoryId="control" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">if-elseによる条件分岐</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">if</code> 文で条件に応じた処理を分岐できます。
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">else if</code> で複数の条件を連鎖させることもできます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int score = 85;

        // if-else if-else チェーン
        if (score >= 90) {
            System.out.println("評価: A（優秀）");
        } else if (score >= 80) {
            System.out.println("評価: B（良好）");
        } else if (score >= 70) {
            System.out.println("評価: C（普通）");
        } else if (score >= 60) {
            System.out.println("評価: D（可）");
        } else {
            System.out.println("評価: F（不可）");
        }

        // 三項演算子
        String result = score >= 60 ? "合格" : "不合格";
        System.out.println("判定: " + result);
    }
}`}
          expectedOutput={`評価: B（良好）
判定: 合格`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch式（Java 14+）</h2>
        <p className="text-gray-400 mb-4">
          Java 14のswitch式では <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">{'->'}</code> アロー構文を使い、
          breakなしで簡潔に値を返すことができます。複数のcaseラベルをカンマで区切ることも可能です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String day = "WEDNESDAY";

        // switch式（Java 14+）
        String type = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY",
                 "THURSDAY", "FRIDAY" -> "平日";
            case "SATURDAY", "SUNDAY" -> "週末";
            default -> "不明";
        };

        System.out.println(day + " は " + type + " です");

        // 数値でのswitch式
        int month = 4;
        int daysInMonth = switch (month) {
            case 2 -> 28;
            case 4, 6, 9, 11 -> 30;
            default -> 31;
        };
        System.out.println(month + "月は " + daysInMonth + " 日です");
    }
}`}
          expectedOutput={`WEDNESDAY は 平日 です
4月は 30 日です`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
