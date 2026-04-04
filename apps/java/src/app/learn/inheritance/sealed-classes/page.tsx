import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceSealedClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Sealedクラス</h1>
        <p className="text-gray-400">Java 17のsealed/permits/non-sealedによる継承制限を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Sealedクラスとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Sealedクラス（Java 17正式導入）は、どのクラスが自分を継承できるかを制限する機能です。
          sealedキーワードとpermitsで継承を許可するクラスを明示的に列挙します。
          許可されたサブクラスはfinal（継承不可）、sealed（さらに制限付き）、
          またはnon-sealed（制限なし）のいずれかを指定する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>sealed：このクラスを継承できるクラスを制限する</li>
          <li>permits：継承を許可するクラスを列挙する</li>
          <li>final：それ以上の継承を禁止する</li>
          <li>non-sealed：継承の制限を解除する（自由に継承可能）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なSealedクラス</h2>
        <p className="text-gray-400 mb-4">sealedクラスで継承を制限し、許可されたサブクラスのみ定義できるようにします。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // sealedクラス：Circle, Rectangle, Triangleのみ継承可能
    sealed static abstract class Shape permits Circle, Rectangle, Triangle {
        abstract double area();
        abstract String name();
    }

    // final: これ以上継承できない
    final static class Circle extends Shape {
        double radius;
        Circle(double radius) { this.radius = radius; }

        @Override
        double area() { return Math.PI * radius * radius; }

        @Override
        String name() { return "円(r=" + radius + ")"; }
    }

    final static class Rectangle extends Shape {
        double w, h;
        Rectangle(double w, double h) { this.w = w; this.h = h; }

        @Override
        double area() { return w * h; }

        @Override
        String name() { return "四角形(" + w + "x" + h + ")"; }
    }

    final static class Triangle extends Shape {
        double base, height;
        Triangle(double base, double height) { this.base = base; this.height = height; }

        @Override
        double area() { return 0.5 * base * height; }

        @Override
        String name() { return "三角形(b=" + base + ",h=" + height + ")"; }
    }

    static void printShape(Shape s) {
        System.out.printf("%s → 面積: %.2f%n", s.name(), s.area());
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 8)
        };

        for (Shape s : shapes) {
            printShape(s);
        }
    }
}`}
          expectedOutput={`円(r=5.0) → 面積: 78.54
四角形(4.0x6.0) → 面積: 24.00
三角形(b=3.0,h=8.0) → 面積: 12.00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Sealedインターフェース</h2>
        <p className="text-gray-400 mb-4">インターフェースにもsealedを適用し、実装クラスを制限できます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // sealedインターフェース
    sealed interface Result permits Success, Failure, Pending {
        String getMessage();
        boolean isSuccess();
    }

    record Success(String data) implements Result {
        @Override
        public String getMessage() { return "成功: " + data; }
        @Override
        public boolean isSuccess() { return true; }
    }

    record Failure(String error) implements Result {
        @Override
        public String getMessage() { return "失敗: " + error; }
        @Override
        public boolean isSuccess() { return false; }
    }

    record Pending(String task) implements Result {
        @Override
        public String getMessage() { return "処理中: " + task; }
        @Override
        public boolean isSuccess() { return false; }
    }

    static void handleResult(Result result) {
        String icon = result.isSuccess() ? "[OK]" : "[--]";
        System.out.println(icon + " " + result.getMessage());
    }

    public static void main(String[] args) {
        Result[] results = {
            new Success("データ保存完了"),
            new Failure("接続タイムアウト"),
            new Pending("ファイルアップロード"),
            new Success("メール送信完了")
        };

        for (Result r : results) {
            handleResult(r);
        }
    }
}`}
          expectedOutput={`[OK] 成功: データ保存完了
[--] 失敗: 接続タイムアウト
[--] 処理中: ファイルアップロード
[OK] 成功: メール送信完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">non-sealedによる部分的な開放</h2>
        <p className="text-gray-400 mb-4">non-sealedを使って一部のサブクラスからは自由に継承できるようにする例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    sealed static abstract class Animal permits Dog, Cat, WildAnimal {
        String name;
        Animal(String name) { this.name = name; }
        abstract String sound();
    }

    final static class Dog extends Animal {
        Dog(String name) { super(name); }
        @Override String sound() { return "ワン"; }
    }

    final static class Cat extends Animal {
        Cat(String name) { super(name); }
        @Override String sound() { return "ニャー"; }
    }

    // non-sealed: 誰でも継承可能
    non-sealed static abstract class WildAnimal extends Animal {
        WildAnimal(String name) { super(name); }
    }

    // WildAnimalはnon-sealedなので自由に継承可能
    static class Lion extends WildAnimal {
        Lion() { super("ライオン"); }
        @Override String sound() { return "ガオー"; }
    }

    static class Wolf extends WildAnimal {
        Wolf() { super("オオカミ"); }
        @Override String sound() { return "アオーン"; }
    }

    public static void main(String[] args) {
        Animal[] animals = {
            new Dog("ポチ"),
            new Cat("タマ"),
            new Lion(),
            new Wolf()
        };

        for (Animal a : animals) {
            System.out.println(a.name + ": " + a.sound());
        }
    }
}`}
          expectedOutput={`ポチ: ワン
タマ: ニャー
ライオン: ガオー
オオカミ: アオーン`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="sealed-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="sealed-classes" basePath="/learn/inheritance" />
    </div>
  );
}
