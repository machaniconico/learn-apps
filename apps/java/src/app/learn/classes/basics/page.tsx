import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスの基本</h1>
        <p className="text-gray-400">classキーワードを使ったオブジェクトの設計図を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クラスとオブジェクト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスはオブジェクトの設計図です。フィールド（データ）とメソッド（振る舞い）をまとめて定義し、
          new演算子でインスタンス（実体）を生成します。
          Javaはオブジェクト指向プログラミング言語であり、クラスはその中心的な概念です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>クラス：設計図（テンプレート）</li>
          <li>オブジェクト（インスタンス）：設計図から作られた実体</li>
          <li>フィールド：オブジェクトが持つデータ（属性）</li>
          <li>メソッド：オブジェクトが持つ動作（振る舞い）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスの定義とインスタンス生成</h2>
        <p className="text-gray-400 mb-4">フィールドとメソッドを持つクラスを定義し、new演算子でオブジェクトを生成します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 内部クラスとして定義
    static class Dog {
        String name;
        int age;

        void bark() {
            System.out.println(name + "「ワンワン！」");
        }

        void introduce() {
            System.out.println(name + "（" + age + "歳）");
        }
    }

    public static void main(String[] args) {
        // new演算子でインスタンスを生成
        Dog dog1 = new Dog();
        dog1.name = "ポチ";
        dog1.age = 3;

        Dog dog2 = new Dog();
        dog2.name = "タロウ";
        dog2.age = 5;

        // メソッドを呼び出し
        dog1.introduce();
        dog1.bark();

        dog2.introduce();
        dog2.bark();
    }
}`}
          expectedOutput={`ポチ（3歳）
ポチ「ワンワン！」
タロウ（5歳）
タロウ「ワンワン！」`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィールドとメソッドの活用</h2>
        <p className="text-gray-400 mb-4">フィールドに値を設定し、メソッドで計算や表示を行う実用的な例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Rectangle {
        double width;
        double height;

        double area() {
            return width * height;
        }

        double perimeter() {
            return 2 * (width + height);
        }

        String describe() {
            return width + " x " + height +
                   " (面積:" + area() + ", 周囲:" + perimeter() + ")";
        }
    }

    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        r1.width = 5.0;
        r1.height = 3.0;

        Rectangle r2 = new Rectangle();
        r2.width = 10.0;
        r2.height = 7.5;

        System.out.println("四角形1: " + r1.describe());
        System.out.println("四角形2: " + r2.describe());
        System.out.println("面積の合計: " + (r1.area() + r2.area()));
    }
}`}
          expectedOutput={`四角形1: 5.0 x 3.0 (面積:15.0, 周囲:16.0)
四角形2: 10.0 x 7.5 (面積:75.0, 周囲:35.0)
面積の合計: 90.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のオブジェクトと配列</h2>
        <p className="text-gray-400 mb-4">オブジェクトの配列を使って複数のインスタンスを管理する方法です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Student {
        String name;
        int score;

        String getGrade() {
            if (score >= 90) return "A";
            if (score >= 80) return "B";
            if (score >= 70) return "C";
            return "D";
        }
    }

    public static void main(String[] args) {
        Student[] students = new Student[3];

        students[0] = new Student();
        students[0].name = "田中";
        students[0].score = 92;

        students[1] = new Student();
        students[1].name = "鈴木";
        students[1].score = 78;

        students[2] = new Student();
        students[2].name = "佐藤";
        students[2].score = 85;

        int total = 0;
        for (Student s : students) {
            System.out.println(s.name + ": " + s.score + "点 [" + s.getGrade() + "]");
            total += s.score;
        }
        System.out.printf("平均: %.1f点%n", (double) total / students.length);
    }
}`}
          expectedOutput={`田中: 92点 [A]
鈴木: 78点 [C]
佐藤: 85点 [B]
平均: 85.0点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}
