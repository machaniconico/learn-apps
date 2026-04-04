import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceInterfacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターフェース</h1>
        <p className="text-gray-400">implementsによるインターフェースの実装と多重実装を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インターフェースは「何ができるか」を定義する契約（コントラクト）です。
          メソッドのシグネチャのみを宣言し、実装はクラスに委ねます。
          クラスは複数のインターフェースを実装できるため、Javaの単一継承の制限を補います。
          Comparable, Iterable, Serializable などJava標準でも多く使われています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>interface キーワードで宣言する</li>
          <li>implements でクラスに実装する</li>
          <li>すべてのメソッドを実装しなければならない</li>
          <li>複数のインターフェースを同時に実装可能（多重実装）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なインターフェース</h2>
        <p className="text-gray-400 mb-4">インターフェースを定義し、複数のクラスで実装する基本パターンです。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // インターフェースの定義
    interface Printable {
        void print();
    }

    interface Measurable {
        double measure();
    }

    // インターフェースを実装するクラス
    static class Document implements Printable {
        String content;

        Document(String content) {
            this.content = content;
        }

        @Override
        public void print() {
            System.out.println("[文書] " + content);
        }
    }

    static class Photo implements Printable {
        String filename;
        int width, height;

        Photo(String filename, int width, int height) {
            this.filename = filename;
            this.width = width;
            this.height = height;
        }

        @Override
        public void print() {
            System.out.println("[写真] " + filename + " (" + width + "x" + height + ")");
        }
    }

    // インターフェース型で受け取れる
    static void printAll(Printable[] items) {
        for (Printable item : items) {
            item.print();
        }
    }

    public static void main(String[] args) {
        Printable[] items = {
            new Document("会議の議事録"),
            new Photo("vacation.jpg", 1920, 1080),
            new Document("報告書")
        };
        printAll(items);
    }
}`}
          expectedOutput={`[文書] 会議の議事録
[写真] vacation.jpg (1920x1080)
[文書] 報告書`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数インターフェースの実装</h2>
        <p className="text-gray-400 mb-4">1つのクラスが複数のインターフェースを実装する多重実装の例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    interface Flyable {
        void fly();
    }

    interface Swimmable {
        void swim();
    }

    interface Walkable {
        void walk();
    }

    // 1つのインターフェースを実装
    static class Fish implements Swimmable {
        String name;
        Fish(String name) { this.name = name; }

        @Override
        public void swim() {
            System.out.println(name + "が泳いでいる");
        }
    }

    // 複数のインターフェースを実装
    static class Duck implements Flyable, Swimmable, Walkable {
        String name;
        Duck(String name) { this.name = name; }

        @Override
        public void fly() {
            System.out.println(name + "が飛んでいる");
        }

        @Override
        public void swim() {
            System.out.println(name + "が泳いでいる");
        }

        @Override
        public void walk() {
            System.out.println(name + "が歩いている");
        }
    }

    public static void main(String[] args) {
        Duck duck = new Duck("アヒル");
        duck.fly();
        duck.swim();
        duck.walk();

        System.out.println("---");
        Fish fish = new Fish("金魚");
        fish.swim();

        // インターフェース型で受け取る
        System.out.println("---");
        Swimmable[] swimmers = { duck, fish };
        for (Swimmable s : swimmers) {
            s.swim();
        }
    }
}`}
          expectedOutput={`アヒルが飛んでいる
アヒルが泳いでいる
アヒルが歩いている
---
金魚が泳いでいる
---
アヒルが泳いでいる
金魚が泳いでいる`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの定数とComparable</h2>
        <p className="text-gray-400 mb-4">インターフェースに定数を定義したり、Comparableインターフェースを実装してソート可能にする例です。</p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    // Comparableインターフェースの実装
    static class Student implements Comparable<Student> {
        String name;
        int score;

        Student(String name, int score) {
            this.name = name;
            this.score = score;
        }

        // スコアで比較（降順）
        @Override
        public int compareTo(Student other) {
            return other.score - this.score;
        }

        @Override
        public String toString() {
            return name + ":" + score + "点";
        }
    }

    public static void main(String[] args) {
        Student[] students = {
            new Student("田中", 78),
            new Student("鈴木", 92),
            new Student("佐藤", 85),
            new Student("高橋", 91)
        };

        System.out.println("ソート前:");
        System.out.println(Arrays.toString(students));

        Arrays.sort(students);  // Comparableに基づいてソート

        System.out.println("ソート後（成績順）:");
        System.out.println(Arrays.toString(students));
    }
}`}
          expectedOutput={`ソート前:
[田中:78点, 鈴木:92点, 佐藤:85点, 高橋:91点]
ソート後（成績順）:
[鈴木:92点, 高橋:91点, 佐藤:85点, 田中:78点]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="interfaces" />
      </div>
      <LessonNav lessons={lessons} currentId="interfaces" basePath="/learn/inheritance" />
    </div>
  );
}
