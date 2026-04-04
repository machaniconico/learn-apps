import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceInstanceofPatternPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">instanceof</h1>
        <p className="text-gray-400">instanceof演算子とJava 16のパターンマッチングを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">instanceofとパターンマッチング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          instanceof演算子はオブジェクトが特定の型であるかを判定します。
          従来はinstanceofで型チェック後にキャストが必要でしたが、
          Java 16のパターンマッチングにより、型チェックと変数への束縛を同時に行えるようになりました。
          これにより、より安全で簡潔なコードが書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>obj instanceof Type：objがType型かどうかを判定</li>
          <li>obj instanceof Type var：判定と同時に変数に束縛（Java 16+）</li>
          <li>不要なキャストを排除してNullPointerExceptionのリスクを減らす</li>
          <li>if文の条件式やswitch文のパターンで使用可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">従来のinstanceofとパターンマッチング</h2>
        <p className="text-gray-400 mb-4">従来のキャスト方式とJava 16のパターンマッチングの違いを比較します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Animal {
        String name;
        Animal(String name) { this.name = name; }
    }

    static class Dog extends Animal {
        String breed;
        Dog(String name, String breed) {
            super(name);
            this.breed = breed;
        }
    }

    static class Cat extends Animal {
        boolean indoor;
        Cat(String name, boolean indoor) {
            super(name);
            this.indoor = indoor;
        }
    }

    // 従来の方法
    static void describeOld(Animal a) {
        if (a instanceof Dog) {
            Dog d = (Dog) a;  // 明示的なキャストが必要
            System.out.println("[旧] 犬: " + d.name + " (" + d.breed + ")");
        } else if (a instanceof Cat) {
            Cat c = (Cat) a;
            System.out.println("[旧] 猫: " + c.name + (c.indoor ? " (室内)" : " (外)"));
        }
    }

    // Java 16+ パターンマッチング
    static void describeNew(Animal a) {
        if (a instanceof Dog d) {  // 型チェック + 変数束縛を同時に
            System.out.println("[新] 犬: " + d.name + " (" + d.breed + ")");
        } else if (a instanceof Cat c) {
            System.out.println("[新] 猫: " + c.name + (c.indoor ? " (室内)" : " (外)"));
        }
    }

    public static void main(String[] args) {
        Animal[] animals = {
            new Dog("ポチ", "柴犬"),
            new Cat("タマ", true),
            new Dog("ハチ", "秋田犬")
        };

        for (Animal a : animals) {
            describeOld(a);
            describeNew(a);
            System.out.println("---");
        }
    }
}`}
          expectedOutput={`[旧] 犬: ポチ (柴犬)
[新] 犬: ポチ (柴犬)
---
[旧] 猫: タマ (室内)
[新] 猫: タマ (室内)
---
[旧] 犬: ハチ (秋田犬)
[新] 犬: ハチ (秋田犬)
---`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パターンマッチングと条件の組み合わせ</h2>
        <p className="text-gray-400 mb-4">instanceofパターンマッチングと論理演算子を組み合わせた高度な条件分岐です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static abstract class Shape {
        abstract double area();
    }

    static class Circle extends Shape {
        double radius;
        Circle(double radius) { this.radius = radius; }
        @Override double area() { return Math.PI * radius * radius; }
    }

    static class Rectangle extends Shape {
        double width, height;
        Rectangle(double w, double h) { this.width = w; this.height = h; }
        @Override double area() { return width * height; }

        boolean isSquare() { return width == height; }
    }

    static String classify(Object obj) {
        // instanceof + 追加条件を && で組み合わせ
        if (obj instanceof Circle c && c.radius > 10) {
            return "大きな円 (r=" + c.radius + ")";
        } else if (obj instanceof Circle c) {
            return "円 (r=" + c.radius + ")";
        } else if (obj instanceof Rectangle r && r.isSquare()) {
            return "正方形 (辺=" + r.width + ")";
        } else if (obj instanceof Rectangle r) {
            return "四角形 (" + r.width + "x" + r.height + ")";
        } else if (obj instanceof String s && !s.isEmpty()) {
            return "文字列: " + s;
        } else if (obj instanceof Integer n) {
            return "整数: " + n;
        }
        return "不明な型";
    }

    public static void main(String[] args) {
        Object[] items = {
            new Circle(5),
            new Circle(15),
            new Rectangle(4, 6),
            new Rectangle(5, 5),
            "Hello",
            42
        };

        for (Object item : items) {
            System.out.println(classify(item));
        }
    }
}`}
          expectedOutput={`円 (r=5.0)
大きな円 (r=15.0)
四角形 (4.0x6.0)
正方形 (辺=5.0)
文字列: Hello
整数: 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">nullの安全な処理</h2>
        <p className="text-gray-400 mb-4">instanceofはnullに対して常にfalseを返すため、null安全な型チェックに活用できます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    interface Displayable {
        String display();
    }

    record Product(String name, int price) implements Displayable {
        @Override
        public String display() {
            return name + " (¥" + price + ")";
        }
    }

    record User(String name) implements Displayable {
        @Override
        public String display() {
            return "ユーザー: " + name;
        }
    }

    static void safeDisplay(Object obj) {
        // instanceofはnullに対してfalseを返す（NullPointerExceptionにならない）
        if (obj instanceof Displayable d) {
            System.out.println("表示: " + d.display());
        } else if (obj instanceof String s) {
            System.out.println("文字列: " + s);
        } else if (obj == null) {
            System.out.println("null値です");
        } else {
            System.out.println("不明: " + obj.getClass().getSimpleName());
        }
    }

    public static void main(String[] args) {
        safeDisplay(new Product("Java本", 3000));
        safeDisplay(new User("田中"));
        safeDisplay("テスト文字列");
        safeDisplay(null);  // nullも安全に処理
        safeDisplay(42);
    }
}`}
          expectedOutput={`表示: Java本 (¥3000)
表示: ユーザー: 田中
文字列: テスト文字列
null値です
不明: Integer`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="instanceof-pattern" />
      </div>
      <LessonNav lessons={lessons} currentId="instanceof-pattern" basePath="/learn/inheritance" />
    </div>
  );
}
