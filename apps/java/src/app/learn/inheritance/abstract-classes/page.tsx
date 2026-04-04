import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceAbstractClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">抽象クラス</h1>
        <p className="text-gray-400">abstractクラス・メソッドの定義と活用方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          抽象クラスはインスタンスを直接生成できないクラスで、サブクラスの共通部分を定義するために使います。
          abstractメソッドは本体を持たず、サブクラスで必ず実装する必要があります。
          通常のメソッド（具象メソッド）も定義でき、共通処理とサブクラス固有の処理を分離できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>abstract class で宣言し、new でインスタンスを生成できない</li>
          <li>abstractメソッドは宣言のみで本体がない</li>
          <li>サブクラスはすべてのabstractメソッドを実装しなければならない</li>
          <li>通常のフィールド・メソッド・コンストラクタも持てる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な抽象クラス</h2>
        <p className="text-gray-400 mb-4">図形の面積計算を抽象メソッドで定義し、各図形クラスで具体的な実装を提供します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 抽象クラス
    static abstract class Shape {
        String name;

        Shape(String name) {
            this.name = name;
        }

        // 抽象メソッド：サブクラスで実装必須
        abstract double area();

        // 具象メソッド：共通処理
        void display() {
            System.out.printf("%s の面積: %.2f%n", name, area());
        }
    }

    static class Circle extends Shape {
        double radius;

        Circle(double radius) {
            super("円");
            this.radius = radius;
        }

        @Override
        double area() {
            return Math.PI * radius * radius;
        }
    }

    static class Rectangle extends Shape {
        double width, height;

        Rectangle(double width, double height) {
            super("四角形");
            this.width = width;
            this.height = height;
        }

        @Override
        double area() {
            return width * height;
        }
    }

    static class Triangle extends Shape {
        double base, height;

        Triangle(double base, double height) {
            super("三角形");
            this.base = base;
            this.height = height;
        }

        @Override
        double area() {
            return 0.5 * base * height;
        }
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 8)
        };

        for (Shape s : shapes) {
            s.display();
        }
    }
}`}
          expectedOutput={`円 の面積: 78.54
四角形 の面積: 24.00
三角形 の面積: 12.00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートメソッドパターン</h2>
        <p className="text-gray-400 mb-4">抽象クラスで処理の流れを定義し、具体的な処理をサブクラスに委ねるパターンです。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // テンプレートメソッドパターン
    static abstract class Report {
        // テンプレートメソッド（処理の流れを定義）
        final void generate() {
            header();
            body();
            footer();
        }

        void header() {
            System.out.println("=== レポート ===");
        }

        // サブクラスで実装する部分
        abstract void body();

        void footer() {
            System.out.println("================");
        }
    }

    static class SalesReport extends Report {
        @Override
        void body() {
            System.out.println("売上: 1,200,000円");
            System.out.println("目標達成率: 120%");
        }
    }

    static class InventoryReport extends Report {
        @Override
        void header() {
            System.out.println("*** 在庫レポート ***");
        }

        @Override
        void body() {
            System.out.println("商品A: 150個");
            System.out.println("商品B: 30個（要発注）");
        }

        @Override
        void footer() {
            System.out.println("*******************");
        }
    }

    public static void main(String[] args) {
        new SalesReport().generate();
        System.out.println();
        new InventoryReport().generate();
    }
}`}
          expectedOutput={`=== レポート ===
売上: 1,200,000円
目標達成率: 120%
================

*** 在庫レポート ***
商品A: 150個
商品B: 30個（要発注）
*******************`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスの多段継承</h2>
        <p className="text-gray-400 mb-4">抽象クラスを段階的に継承し、徐々に具体的な実装を追加していく例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static abstract class Creature {
        String name;
        Creature(String name) { this.name = name; }
        abstract String getType();
        abstract int getSpeed();
    }

    // まだ抽象クラス（getSpeedを実装しない）
    static abstract class FlyingCreature extends Creature {
        FlyingCreature(String name) { super(name); }

        @Override
        String getType() { return "飛行生物"; }

        void fly() {
            System.out.println(name + "が空を飛んでいる（速度:" + getSpeed() + "km/h）");
        }
    }

    static class Eagle extends FlyingCreature {
        Eagle() { super("ワシ"); }

        @Override
        int getSpeed() { return 160; }
    }

    static class Sparrow extends FlyingCreature {
        Sparrow() { super("スズメ"); }

        @Override
        int getSpeed() { return 40; }
    }

    public static void main(String[] args) {
        Eagle eagle = new Eagle();
        Sparrow sparrow = new Sparrow();

        System.out.println(eagle.name + " [" + eagle.getType() + "]");
        eagle.fly();

        System.out.println(sparrow.name + " [" + sparrow.getType() + "]");
        sparrow.fly();
    }
}`}
          expectedOutput={`ワシ [飛行生物]
ワシが空を飛んでいる（速度:160km/h）
スズメ [飛行生物]
スズメが空を飛んでいる（速度:40km/h）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="abstract-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="abstract-classes" basePath="/learn/inheritance" />
    </div>
  );
}
