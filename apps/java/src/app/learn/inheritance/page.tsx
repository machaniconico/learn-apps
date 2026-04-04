import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Javaでクラスを継承するために使うキーワードはどれですか？",
    options: [
      "inherits",
      "extends",
      "implements",
      "derives",
    ],
    answer: 1,
    explanation: "Javaではextendsキーワードを使ってクラスを継承します。implementsはインターフェースの実装に使います。Javaは単一継承のみサポートしています。",
  },
  {
    question: "@Overrideアノテーションの役割として正しいのはどれですか？",
    options: [
      "メソッドの実行速度を上げる",
      "スーパークラスのメソッドを正しくオーバーライドしていることをコンパイラに検証させる",
      "メソッドをfinalにして変更を禁止する",
      "メソッドをstaticに変換する",
    ],
    answer: 1,
    explanation: "@Overrideアノテーションは省略可能ですが、付けることでスーパークラスに対応するメソッドが存在しない場合にコンパイルエラーで検出できます。",
  },
  {
    question: "Javaのインターフェースについて正しいのはどれですか？",
    options: [
      "インスタンスフィールドを持てる",
      "コンストラクタを定義できる",
      "1つのクラスが複数のインターフェースを実装できる",
      "他のクラスを継承できる",
    ],
    answer: 2,
    explanation: "Javaのクラスは1つのクラスしか継承できませんが、複数のインターフェースを実装できます。インターフェースはフィールド（定数のみ）・抽象メソッド・defaultメソッドを持てます。",
  },
  {
    question: "Java 17のsealedクラスについて正しいのはどれですか？",
    options: [
      "どのクラスからも継承できる",
      "permitsで指定したクラスのみが継承できる",
      "インターフェースには使えない",
      "finalキーワードと同じ意味である",
    ],
    answer: 1,
    explanation: "sealedクラスはpermitsで指定したクラスだけに継承を許可します。継承先はfinal・sealed・non-sealedのいずれかで宣言する必要があります。インターフェースにも使えます。",
  },
];

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">継承・インターフェース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaのオブジェクト指向の中核である継承とインターフェースを学びましょう。extends・@Override・abstract・interface・defaultメソッド・sealedクラスまで、階層設計の基本を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="inheritance" totalLessons={8} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/inheritance" color="violet" categoryId="inheritance" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承とオーバーライド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">extends</code> でクラスを継承し、
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">@Override</code> でスーパークラスのメソッドを上書きします。
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">super</code> で親クラスのメソッドやコンストラクタを呼び出せます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Animal {
        String name;

        Animal(String name) {
            this.name = name;
        }

        void speak() {
            System.out.println(name + "が鳴いています");
        }

        String describe() {
            return "動物: " + name;
        }
    }

    static class Dog extends Animal {
        String breed;

        Dog(String name, String breed) {
            super(name);  // 親コンストラクタ呼び出し
            this.breed = breed;
        }

        @Override
        void speak() {
            System.out.println(name + "「ワンワン！」");
        }

        @Override
        String describe() {
            return super.describe() + " (" + breed + ")";
        }
    }

    static class Cat extends Animal {
        Cat(String name) { super(name); }

        @Override
        void speak() {
            System.out.println(name + "「ニャー！」");
        }
    }

    public static void main(String[] args) {
        Animal[] animals = { new Dog("ポチ", "柴犬"), new Cat("タマ") };
        for (Animal a : animals) {
            System.out.println(a.describe());
            a.speak();
        }
    }
}`}
          expectedOutput={`動物: ポチ (柴犬)
ポチ「ワンワン！」
動物: タマ
タマ「ニャー！」`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースとdefaultメソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">interface</code> で契約を定義し、
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">default</code> メソッドでデフォルト実装を提供できます。
          1つのクラスが複数のインターフェースを実装できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    interface Printable {
        void print();

        // defaultメソッド（Java 8+）
        default void printWithBorder() {
            System.out.println("=".repeat(30));
            print();
            System.out.println("=".repeat(30));
        }
    }

    interface Loggable {
        default void log(String message) {
            System.out.println("[LOG] " + message);
        }
    }

    // 複数インターフェースの実装
    static class Report implements Printable, Loggable {
        String title;
        String content;

        Report(String title, String content) {
            this.title = title;
            this.content = content;
        }

        @Override
        public void print() {
            System.out.println("タイトル: " + title);
            System.out.println("内容: " + content);
        }
    }

    public static void main(String[] args) {
        Report report = new Report("月次報告", "売上は前月比120%");
        report.printWithBorder();  // defaultメソッド
        report.log("レポート出力完了");
    }
}`}
          expectedOutput={`==============================
タイトル: 月次報告
内容: 売上は前月比120%
==============================
[LOG] レポート出力完了`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
