import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Javaのメソッド定義で正しい構文はどれですか？",
    options: [
      "def greet(name: String): String",
      "function greet(String name): String",
      "public String greet(String name)",
      "String greet(name String)",
    ],
    answer: 2,
    explanation: "Javaのメソッドは「アクセス修飾子 戻り値の型 メソッド名(引数リスト)」の形式で定義します。public String greet(String name) が正しい構文です。",
  },
  {
    question: "メソッドのオーバーロードの条件として正しいのはどれですか？",
    options: [
      "戻り値の型が異なればよい",
      "引数の数または型が異なる必要がある",
      "メソッド名が異なる必要がある",
      "アクセス修飾子が異なればよい",
    ],
    answer: 1,
    explanation: "オーバーロードは同じ名前のメソッドを引数の数や型を変えて複数定義することです。戻り値の型やアクセス修飾子だけの違いではオーバーロードできません。",
  },
  {
    question: "可変長引数（varargs）の正しい記述はどれですか？",
    options: [
      "void print(String... args)",
      "void print(String[] ...args)",
      "void print(...String args)",
      "void print(String args...)",
    ],
    answer: 0,
    explanation: "可変長引数は「型...変数名」の形式で記述します。メソッド内では配列として扱えます。可変長引数はメソッドの最後の引数にのみ指定できます。",
  },
  {
    question: "staticメソッドについて正しい説明はどれですか？",
    options: [
      "インスタンス変数に直接アクセスできる",
      "thisキーワードが使える",
      "クラス名.メソッド名() で呼び出せる",
      "オーバーライドできる",
    ],
    answer: 2,
    explanation: "staticメソッドはクラスに属するメソッドで、インスタンスを作成せずにクラス名.メソッド名()で呼び出せます。インスタンス変数やthisにはアクセスできません。",
  },
];

export default function MethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">メソッド</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          メソッドの定義と呼び出し方を学びましょう。引数・戻り値・オーバーロード・可変長引数・staticメソッド・再帰・スコープまで、Javaのメソッドに関する重要な概念を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="methods" totalLessons={8} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/methods" color="teal" categoryId="methods" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドのオーバーロード</h2>
        <p className="text-gray-400 mb-4">
          同じ名前のメソッドを <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">引数の数や型を変えて</code> 複数定義できます。
          コンパイラが引数に合ったメソッドを自動的に選択します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 引数なし
    static void greet() {
        System.out.println("こんにちは！");
    }

    // String引数1つ
    static void greet(String name) {
        System.out.println("こんにちは、" + name + "さん！");
    }

    // String引数2つ
    static void greet(String name, String greeting) {
        System.out.println(greeting + "、" + name + "さん！");
    }

    // int引数（異なる型）
    static void greet(int times) {
        for (int i = 0; i < times; i++) {
            System.out.println("やあ！");
        }
    }

    public static void main(String[] args) {
        greet();
        greet("太郎");
        greet("花子", "おはよう");
        greet(2);
    }
}`}
          expectedOutput={`こんにちは！
こんにちは、太郎さん！
おはよう、花子さん！
やあ！
やあ！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">再帰メソッド</h2>
        <p className="text-gray-400 mb-4">
          メソッドが <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">自分自身を呼び出す</code> ことを再帰と言います。
          必ず <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">終了条件（ベースケース）</code> を設定しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 階乗を計算する再帰メソッド
    static long factorial(int n) {
        if (n <= 1) return 1;  // ベースケース
        return n * factorial(n - 1);  // 再帰呼び出し
    }

    // フィボナッチ数列（メモ化あり）
    static long[] memo = new long[50];
    static long fibonacci(int n) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n];
        memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return memo[n];
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("10! = " + factorial(10));

        System.out.print("フィボナッチ: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i));
            if (i < 9) System.out.print(", ");
        }
        System.out.println();
    }
}`}
          expectedOutput={`5! = 120
10! = 3628800
フィボナッチ: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34`}
        />
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
