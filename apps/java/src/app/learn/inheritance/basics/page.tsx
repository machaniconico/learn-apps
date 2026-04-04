import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承の基本</h1>
        <p className="text-gray-400">extendsキーワードによるクラスの継承とis-a関係を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">継承（Inheritance）とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          継承は、既存のクラス（親クラス/スーパークラス）の機能を引き継いで、
          新しいクラス（子クラス/サブクラス）を作成する仕組みです。
          extendsキーワードを使って「AはBの一種である（is-a関係）」という関係を表現します。
          子クラスは親クラスのフィールドやメソッドを継承し、独自の機能を追加できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>extends で親クラスを指定する</li>
          <li>Javaは単一継承（1つの親クラスしか持てない）</li>
          <li>super() で親クラスのコンストラクタを呼び出す</li>
          <li>privateメンバは継承されない（アクセスできない）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な継承</h2>
        <p className="text-gray-400 mb-4">親クラスAnimalを定義し、子クラスDogとCatがそれを継承する例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 親クラス
    static class Animal {
        String name;

        Animal(String name) {
            this.name = name;
        }

        void eat() {
            System.out.println(name + "が食事中");
        }

        void sleep() {
            System.out.println(name + "が眠っている");
        }
    }

    // 子クラス: Animalを継承
    static class Dog extends Animal {
        String breed;

        Dog(String name, String breed) {
            super(name);  // 親クラスのコンストラクタを呼び出し
            this.breed = breed;
        }

        void bark() {
            System.out.println(name + "「ワンワン！」");
        }
    }

    static class Cat extends Animal {
        Cat(String name) {
            super(name);
        }

        void meow() {
            System.out.println(name + "「ニャー！」");
        }
    }

    public static void main(String[] args) {
        Dog dog = new Dog("ポチ", "柴犬");
        dog.eat();     // 親クラスのメソッド
        dog.sleep();   // 親クラスのメソッド
        dog.bark();    // 子クラス独自のメソッド
        System.out.println("犬種: " + dog.breed);

        System.out.println("---");
        Cat cat = new Cat("タマ");
        cat.eat();
        cat.meow();
    }
}`}
          expectedOutput={`ポチが食事中
ポチが眠っている
ポチ「ワンワン！」
犬種: 柴犬
---
タマが食事中
タマ「ニャー！」`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">super()によるコンストラクタチェーン</h2>
        <p className="text-gray-400 mb-4">super()を使って親クラスのコンストラクタを呼び出し、初期化の連鎖を作ります。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Vehicle {
        String brand;
        int year;

        Vehicle(String brand, int year) {
            this.brand = brand;
            this.year = year;
            System.out.println("Vehicle作成: " + brand);
        }

        void info() {
            System.out.println(brand + " (" + year + "年)");
        }
    }

    static class Car extends Vehicle {
        int doors;

        Car(String brand, int year, int doors) {
            super(brand, year);  // 親のコンストラクタを最初に呼ぶ
            this.doors = doors;
            System.out.println("Car作成: " + doors + "ドア");
        }

        void info() {
            System.out.println(brand + " (" + year + "年) " + doors + "ドア車");
        }
    }

    static class ElectricCar extends Car {
        int batteryKwh;

        ElectricCar(String brand, int year, int doors, int batteryKwh) {
            super(brand, year, doors);
            this.batteryKwh = batteryKwh;
            System.out.println("ElectricCar作成: " + batteryKwh + "kWh");
        }

        void info() {
            System.out.println(brand + " (" + year + "年) " + doors + "ドア EV " + batteryKwh + "kWh");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== コンストラクタの呼び出し順 ===");
        ElectricCar ev = new ElectricCar("テスラ", 2024, 4, 75);
        System.out.println("---");
        ev.info();
    }
}`}
          expectedOutput={`=== コンストラクタの呼び出し順 ===
Vehicle作成: テスラ
Car作成: 4ドア
ElectricCar作成: 75kWh
---
テスラ (2024年) 4ドア EV 75kWh`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">is-a関係と型の互換性</h2>
        <p className="text-gray-400 mb-4">子クラスのインスタンスは親クラスの型として扱えるという、継承の重要な性質です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Shape {
        String type;

        Shape(String type) {
            this.type = type;
        }

        String describe() {
            return "図形: " + type;
        }
    }

    static class Circle extends Shape {
        double radius;

        Circle(double radius) {
            super("円");
            this.radius = radius;
        }

        String describe() {
            return "円 (半径:" + radius + ")";
        }
    }

    static class Square extends Shape {
        double side;

        Square(double side) {
            super("正方形");
            this.side = side;
        }

        String describe() {
            return "正方形 (辺:" + side + ")";
        }
    }

    // 親クラスの型で受け取れる
    static void printShape(Shape s) {
        System.out.println(s.describe());
    }

    public static void main(String[] args) {
        // 子クラスのインスタンスを親クラスの型に代入
        Shape s1 = new Circle(5.0);
        Shape s2 = new Square(3.0);

        printShape(s1);
        printShape(s2);

        // 配列で異なるサブクラスをまとめて管理
        Shape[] shapes = { new Circle(2.0), new Square(4.0), new Circle(7.0) };
        System.out.println("---");
        for (Shape s : shapes) {
            printShape(s);
        }
    }
}`}
          expectedOutput={`円 (半径:5.0)
正方形 (辺:3.0)
---
円 (半径:2.0)
正方形 (辺:4.0)
円 (半径:7.0)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/inheritance" />
    </div>
  );
}
