import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesInnerClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">内部クラス</h1>
        <p className="text-gray-400">内部クラス・静的ネストクラス・匿名クラスの違いと使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネストされたクラスの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaではクラスの中にクラスを定義できます。これにはいくつかの種類があり、
          それぞれ外部クラスとの関係やアクセス権が異なります。
          関連する機能をまとめたり、特定のクラスでのみ使われるヘルパーを定義する際に有用です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>内部クラス（非static）：外部クラスのインスタンスに紐づき、外部のフィールドにアクセスできる</li>
          <li>静的ネストクラス（static）：外部クラスのインスタンス不要、独立して使える</li>
          <li>匿名クラス：名前のないクラス。インターフェースやクラスを一時的に実装するときに使用</li>
          <li>ローカルクラス：メソッド内で定義するクラス（あまり使われない）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">静的ネストクラス</h2>
        <p className="text-gray-400 mb-4">static修飾子付きのネストクラスは、外部クラスのインスタンスなしで使えます。関連するデータ構造をまとめるのに便利です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 静的ネストクラス
    static class Address {
        String city;
        String street;

        Address(String city, String street) {
            this.city = city;
            this.street = street;
        }

        String format() {
            return city + " " + street;
        }
    }

    static class Company {
        String name;
        Address headquarters;  // 静的ネストクラスを型として使用

        Company(String name, Address hq) {
            this.name = name;
            this.headquarters = hq;
        }

        void display() {
            System.out.println(name + " - " + headquarters.format());
        }
    }

    public static void main(String[] args) {
        // 静的ネストクラスは外部クラスなしで生成可能
        Address addr1 = new Address("東京都", "渋谷区1-2-3");
        Address addr2 = new Address("大阪府", "中央区4-5-6");

        Company c1 = new Company("テック株式会社", addr1);
        Company c2 = new Company("サービス合同会社", addr2);

        c1.display();
        c2.display();
    }
}`}
          expectedOutput={`テック株式会社 - 東京都 渋谷区1-2-3
サービス合同会社 - 大阪府 中央区4-5-6`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">匿名クラス</h2>
        <p className="text-gray-400 mb-4">名前のないクラスをその場で定義してインスタンスを作成します。インターフェースの即時実装に使われます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // インターフェース定義
    interface Greeting {
        String greet(String name);
    }

    interface Calculator {
        int calculate(int a, int b);
    }

    static void showGreeting(Greeting g, String name) {
        System.out.println(g.greet(name));
    }

    public static void main(String[] args) {
        // 匿名クラスでインターフェースを実装
        Greeting japanese = new Greeting() {
            @Override
            public String greet(String name) {
                return "こんにちは、" + name + "さん！";
            }
        };

        Greeting english = new Greeting() {
            @Override
            public String greet(String name) {
                return "Hello, " + name + "!";
            }
        };

        showGreeting(japanese, "田中");
        showGreeting(english, "Tanaka");

        // 匿名クラスで計算ロジックを注入
        Calculator adder = new Calculator() {
            @Override
            public int calculate(int a, int b) { return a + b; }
        };

        Calculator multiplier = new Calculator() {
            @Override
            public int calculate(int a, int b) { return a * b; }
        };

        System.out.println("加算: " + adder.calculate(3, 5));
        System.out.println("乗算: " + multiplier.calculate(3, 5));
    }
}`}
          expectedOutput={`こんにちは、田中さん！
Hello, Tanaka!
加算: 8
乗算: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストクラスの実用例：Builder</h2>
        <p className="text-gray-400 mb-4">静的ネストクラスを使ったBuilderパターンで、複雑なオブジェクト生成を簡潔にします。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Pizza {
        private String size;
        private boolean cheese;
        private boolean pepperoni;
        private boolean mushroom;

        private Pizza(Builder builder) {
            this.size = builder.size;
            this.cheese = builder.cheese;
            this.pepperoni = builder.pepperoni;
            this.mushroom = builder.mushroom;
        }

        void display() {
            StringBuilder sb = new StringBuilder(size + "ピザ: ");
            if (cheese) sb.append("チーズ ");
            if (pepperoni) sb.append("ペパロニ ");
            if (mushroom) sb.append("マッシュルーム ");
            System.out.println(sb.toString().trim());
        }

        // 静的ネストクラスとしてBuilderを定義
        static class Builder {
            private String size;
            private boolean cheese;
            private boolean pepperoni;
            private boolean mushroom;

            Builder(String size) { this.size = size; }
            Builder cheese()    { this.cheese = true; return this; }
            Builder pepperoni() { this.pepperoni = true; return this; }
            Builder mushroom()  { this.mushroom = true; return this; }
            Pizza build()       { return new Pizza(this); }
        }
    }

    public static void main(String[] args) {
        Pizza p1 = new Pizza.Builder("L")
            .cheese().pepperoni().mushroom().build();
        p1.display();

        Pizza p2 = new Pizza.Builder("M")
            .cheese().build();
        p2.display();

        Pizza p3 = new Pizza.Builder("S")
            .pepperoni().mushroom().build();
        p3.display();
    }
}`}
          expectedOutput={`Lピザ: チーズ ペパロニ マッシュルーム
Mピザ: チーズ
Sピザ: ペパロニ マッシュルーム`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="inner-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="inner-classes" basePath="/learn/classes" />
    </div>
  );
}
