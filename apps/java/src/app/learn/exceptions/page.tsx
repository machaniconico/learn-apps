import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "try-catch文の役割として正しいものはどれですか？",
    options: [
      "例外が発生する可能性のあるコードを囲み、エラー発生時の処理を定義する",
      "コードの実行速度を向上させる",
      "変数のスコープを限定する",
      "メソッドの戻り値を指定する",
    ],
    answer: 0,
    explanation: "try-catch文は、tryブロック内で例外が発生した場合にcatchブロックで捕捉し、適切なエラー処理を行うための構文です。",
  },
  {
    question: "finallyブロックとtry-with-resourcesについて正しいものはどれですか？",
    options: [
      "finallyは例外の有無にかかわらず実行され、try-with-resourcesはAutoCloseableリソースを自動的に閉じる",
      "finallyは例外発生時のみ実行される",
      "try-with-resourcesはJava 7以前から使える",
      "finallyブロックは省略できない",
    ],
    answer: 0,
    explanation: "finallyブロックは例外の発生有無に関係なく必ず実行されます。try-with-resources（Java 7以降）はAutoCloseableを実装したリソースを自動的にcloseします。",
  },
  {
    question: "checked例外とunchecked例外の違いとして正しいものはどれですか？",
    options: [
      "checked例外はコンパイル時にキャッチまたはthrows宣言が必要で、unchecked例外はRuntimeExceptionを継承する",
      "unchecked例外はコンパイル時にキャッチが必要である",
      "checked例外はRuntimeExceptionのサブクラスである",
      "両者に違いはない",
    ],
    answer: 0,
    explanation: "checked例外（IOException等）はコンパイル時に処理が強制されます。unchecked例外（NullPointerException等）はRuntimeExceptionを継承し、コンパイル時のチェックはありません。",
  },
  {
    question: "カスタム例外クラスを作成する方法として正しいものはどれですか？",
    options: [
      "ExceptionまたはRuntimeExceptionを継承したクラスを定義する",
      "Throwableインターフェースを実装する",
      "Errorクラスを継承する",
      "例外クラスは自作できない",
    ],
    answer: 0,
    explanation: "カスタム例外はExceptionクラス（checked）またはRuntimeExceptionクラス（unchecked）を継承して作成します。コンストラクタでメッセージやcauseを渡すのが一般的です。",
  },
];

export default function ExceptionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">例外処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaの例外処理を学びましょう。try-catch-finally、checked例外とunchecked例外の違い、
          try-with-resourcesによるリソース管理、そしてカスタム例外の作成方法を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="exceptions" totalLessons={6} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/exceptions" color="red" categoryId="exceptions" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try-catch-finallyの基本</h2>
        <p className="text-gray-400 mb-4">
          例外処理の基本的な構文と、finallyブロックの動作を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // try-catch-finallyの基本
        System.out.println("=== 例外処理の基本 ===");

        try {
            int result = 10 / 0;
            System.out.println("結果: " + result);
        } catch (ArithmeticException e) {
            System.out.println("算術エラー: " + e.getMessage());
        } finally {
            System.out.println("finallyブロック実行");
        }

        // 複数のcatchブロック
        System.out.println();
        System.out.println("=== 複数のcatch ===");

        try {
            String[] arr = {"10", "abc", "30"};
            int value = Integer.parseInt(arr[1]);
            System.out.println("値: " + value);
        } catch (NumberFormatException e) {
            System.out.println("数値変換エラー: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("配列範囲外: " + e.getMessage());
        }

        // try-with-resources
        System.out.println();
        System.out.println("=== try-with-resources ===");
        System.out.println("AutoCloseableリソースは自動的にcloseされます");
        System.out.println("例: try (var reader = new BufferedReader(...)) { ... }");
    }
}`}
          expectedOutput={`=== 例外処理の基本 ===
算術エラー: / by zero
finallyブロック実行

=== 複数のcatch ===
数値変換エラー: For input string: "abc"

=== try-with-resources ===
AutoCloseableリソースは自動的にcloseされます
例: try (var reader = new BufferedReader(...)) { ... }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外クラス</h2>
        <p className="text-gray-400 mb-4">
          独自の例外クラスを作成して、アプリケーション固有のエラーハンドリングを実装しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // カスタム例外クラス
    static class InsufficientBalanceException extends Exception {
        private double balance;
        private double amount;

        public InsufficientBalanceException(double balance, double amount) {
            super("残高不足: 残高=" + balance + ", 出金額=" + amount);
            this.balance = balance;
            this.amount = amount;
        }

        public double getShortage() {
            return amount - balance;
        }
    }

    // 銀行口座クラス
    static class BankAccount {
        private double balance;

        public BankAccount(double balance) {
            this.balance = balance;
        }

        public void withdraw(double amount) throws InsufficientBalanceException {
            if (amount > balance) {
                throw new InsufficientBalanceException(balance, amount);
            }
            balance -= amount;
            System.out.println(amount + "円を出金しました。残高: " + balance + "円");
        }
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount(10000);

        try {
            account.withdraw(3000);
            account.withdraw(5000);
            account.withdraw(5000); // 残高不足
        } catch (InsufficientBalanceException e) {
            System.out.println("エラー: " + e.getMessage());
            System.out.println("不足額: " + e.getShortage() + "円");
        }
    }
}`}
          expectedOutput={`3000.0円を出金しました。残高: 7000.0円
5000.0円を出金しました。残高: 2000.0円
エラー: 残高不足: 残高=2000.0, 出金額=5000.0
不足額: 3000.0円`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
