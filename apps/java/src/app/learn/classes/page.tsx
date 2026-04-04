import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Javaのコンストラクタについて正しいのはどれですか？",
    options: [
      "戻り値の型を指定する必要がある",
      "クラス名と同じ名前で、戻り値の型は書かない",
      "constructorキーワードで定義する",
      "1つのクラスにコンストラクタは1つだけ",
    ],
    answer: 1,
    explanation: "コンストラクタはクラス名と同じ名前で定義し、戻り値の型は書きません。オーバーロードにより複数のコンストラクタを定義できます。",
  },
  {
    question: "アクセス修飾子の公開範囲が広い順に並んでいるのはどれですか？",
    options: [
      "private → protected → public",
      "public → private → protected",
      "public → protected → デフォルト → private",
      "protected → public → デフォルト → private",
    ],
    answer: 2,
    explanation: "アクセス修飾子は public（どこからでも）→ protected（同パッケージ+サブクラス）→ デフォルト（同パッケージ）→ private（同クラスのみ）の順に公開範囲が狭くなります。",
  },
  {
    question: "thisキーワードの用途として正しくないのはどれですか？",
    options: [
      "フィールドと同名の引数を区別する",
      "同じクラスの別のコンストラクタを呼び出す",
      "静的メソッド内で現在のインスタンスを参照する",
      "現在のインスタンスを戻り値として返す",
    ],
    answer: 2,
    explanation: "staticメソッドにはインスタンスが存在しないため、thisキーワードは使えません。thisはインスタンスメソッドやコンストラクタ内でのみ使用できます。",
  },
  {
    question: "Java 16のRecordについて正しいのはどれですか？",
    options: [
      "フィールドを後から変更できる",
      "不変（immutable）なデータクラスを簡潔に定義できる",
      "継承が可能である",
      "デフォルトコンストラクタは生成されない",
    ],
    answer: 1,
    explanation: "Recordは不変なデータクラスを簡潔に定義するための機能です。コンストラクタ・getter・equals・hashCode・toStringが自動生成されます。他のクラスは継承できません。",
  },
];

export default function ClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">クラス基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaのオブジェクト指向プログラミングの基本を学びましょう。クラスの定義・コンストラクタ・アクセス修飾子・getter/setter・staticメンバ・内部クラス・Recordまで解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="classes" totalLessons={8} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/classes" color="indigo" categoryId="classes" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスとコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          クラスはオブジェクトの設計図です。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">コンストラクタ</code> でオブジェクトを初期化し、
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">getter/setter</code> でフィールドにアクセスします。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // クラスの定義
    static class Student {
        private String name;
        private int age;
        private double gpa;

        // コンストラクタ
        Student(String name, int age, double gpa) {
            this.name = name;
            this.age = age;
            this.gpa = gpa;
        }

        // getter
        String getName() { return name; }
        int getAge() { return age; }
        double getGpa() { return gpa; }

        // setter
        void setGpa(double gpa) { this.gpa = gpa; }

        @Override
        public String toString() {
            return name + " (年齢:" + age + ", GPA:" + gpa + ")";
        }
    }

    public static void main(String[] args) {
        Student s = new Student("佐藤太郎", 20, 3.5);
        System.out.println(s);

        s.setGpa(3.8);
        System.out.println("GPA更新後: " + s);
    }
}`}
          expectedOutput={`佐藤太郎 (年齢:20, GPA:3.5)
GPA更新後: 佐藤太郎 (年齢:20, GPA:3.8)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Java Record（Java 16+）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">record</code> を使うと、不変なデータクラスを1行で定義できます。
          コンストラクタ・getter・equals・hashCode・toStringが自動生成されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // Recordの定義（Java 16+）
    record Point(int x, int y) {
        // カスタムメソッドも追加できる
        double distanceTo(Point other) {
            int dx = this.x - other.x;
            int dy = this.y - other.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    record Person(String name, int age) {
        // コンパクトコンストラクタでバリデーション
        Person {
            if (age < 0) throw new IllegalArgumentException("年齢は0以上");
        }
    }

    public static void main(String[] args) {
        Point p1 = new Point(0, 0);
        Point p2 = new Point(3, 4);
        System.out.println("P1: " + p1);
        System.out.println("P2: " + p2);
        System.out.println("距離: " + p1.distanceTo(p2));

        Person person = new Person("田中", 25);
        System.out.println(person.name() + "は" + person.age() + "歳");
    }
}`}
          expectedOutput={`P1: Point[x=0, y=0]
P2: Point[x=3, y=4]
距離: 5.0
田中は25歳`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
