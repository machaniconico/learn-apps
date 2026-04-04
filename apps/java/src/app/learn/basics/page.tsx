import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Javaでコンソールに文字列を出力するために使うのはどれですか？",
    options: [
      "Console.Write()",
      "System.out.println()",
      "print()",
      "echo()",
    ],
    answer: 1,
    explanation: "JavaではSystem.out.println()を使って標準出力に文字列を出力します。printlnは出力後に改行を追加します。改行なしで出力したい場合はSystem.out.print()を使います。",
  },
  {
    question: "Javaで変数を宣言する正しい構文はどれですか？",
    options: [
      "var x = 10;（Java 10以降のみ）",
      "let x = 10;",
      "int x = 10;",
      "x := 10;",
    ],
    answer: 2,
    explanation: "Javaでは型名を先に書いて変数を宣言します。int x = 10; のように「型 変数名 = 値;」の形式が基本です。varはJava 10以降でローカル変数に限り使えますが、明示的な型指定が標準です。",
  },
  {
    question: "Javaのプリミティブ型でないものはどれですか？",
    options: [
      "int",
      "boolean",
      "String",
      "double",
    ],
    answer: 2,
    explanation: "Stringはプリミティブ型ではなく参照型（クラス）です。Javaのプリミティブ型はbyte, short, int, long, float, double, char, booleanの8種類です。",
  },
  {
    question: "Java 10のvarキーワードについて正しい説明はどれですか？",
    options: [
      "変数の型が実行時に動的に変わる",
      "ローカル変数の型をコンパイラが初期化式から推論する",
      "JavaScriptのvarと同じで型がない",
      "フィールド変数にも使える",
    ],
    answer: 1,
    explanation: "varはJava 10で導入されたローカル変数型推論で、コンパイル時に初期化式から型を推論します。一度推論された型は変更できず、メソッドのローカル変数でのみ使えます。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Java基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaプログラミングの基礎を学びましょう。変数・データ型・演算子・入出力・コメントなど、すべてのJavaプログラムの土台となる概念を丁寧に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Javaプログラムの基本構造</h2>
        <p className="text-gray-400 mb-4">
          Javaプログラムは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">public class</code> でクラスを定義し、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">main</code> メソッドからプログラムが始まります。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">System.out.println()</code> で標準出力に表示します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 変数の宣言と初期化
        String name = "Java";
        int version = 21;
        boolean isModern = true;

        // printlnで出力
        System.out.println("言語: " + name);
        System.out.println("バージョン: Java " + version);
        System.out.println("モダン: " + isModern);
    }
}`}
          expectedOutput={`言語: Java
バージョン: Java 21
モダン: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">var推論と基本型</h2>
        <p className="text-gray-400 mb-4">
          Java 10以降では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> キーワードで
          コンパイラにローカル変数の型を推論させることができます。明示的な型指定と使い分けましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 明示的な型指定
        int count = 42;
        double pi = 3.14159;
        String greeting = "Hello";

        // var による型推論（Java 10+）
        var number = 100;           // int と推論
        var rate = 0.75;            // double と推論
        var message = "World";      // String と推論

        System.out.println(count + ", " + pi + ", " + greeting);
        System.out.println(number + ", " + rate + ", " + message);
    }
}`}
          expectedOutput={`42, 3.14159, Hello
100, 0.75, World`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
