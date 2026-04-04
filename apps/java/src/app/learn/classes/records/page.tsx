import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesRecordsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Record</h1>
        <p className="text-gray-400">Java 16のRecordクラスによる不変データクラスの作成方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Recordとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Record（Java 16正式導入）は、不変のデータキャリアを簡潔に定義するための特別なクラスです。
          コンストラクタ、getter、equals()、hashCode()、toString()が自動生成されるため、
          従来のPOJO（Plain Old Java Object）に比べて大幅にコード量を削減できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>record キーワードで宣言し、コンポーネント（フィールド）をパラメータとして定義</li>
          <li>フィールドは自動的にprivate finalになる（不変）</li>
          <li>各コンポーネントのアクセサメソッドはフィールド名そのまま（getName()ではなくname()）</li>
          <li>コンパクトコンストラクタでバリデーションが可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Recordの基本</h2>
        <p className="text-gray-400 mb-4">recordを使って不変のデータクラスを簡潔に定義する方法を確認します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // recordの定義 - たった1行！
    record Point(int x, int y) {}

    record Person(String name, int age) {}

    public static void main(String[] args) {
        // コンストラクタは自動生成
        Point p1 = new Point(3, 5);
        Point p2 = new Point(3, 5);
        Point p3 = new Point(1, 2);

        // アクセサメソッド（getterではなくフィールド名()）
        System.out.println("x=" + p1.x() + ", y=" + p1.y());

        // toString()が自動生成
        System.out.println(p1);

        // equals()が自動生成（値の比較）
        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("p1.equals(p3): " + p1.equals(p3));

        System.out.println("---");
        Person person = new Person("田中", 25);
        System.out.println(person);
        System.out.println("名前: " + person.name());
        System.out.println("年齢: " + person.age());
    }
}`}
          expectedOutput={`x=3, y=5
Point[x=3, y=5]
p1.equals(p2): true
p1.equals(p3): false
---
Person[name=田中, age=25]
名前: 田中
年齢: 25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパクトコンストラクタ</h2>
        <p className="text-gray-400 mb-4">コンパクトコンストラクタを使ってRecord生成時のバリデーションを行います。</p>
        <JavaEditor
          defaultCode={`public class Main {
    record Email(String address) {
        // コンパクトコンストラクタ（引数リストを省略）
        Email {
            if (address == null || !address.contains("@")) {
                throw new IllegalArgumentException("不正なメールアドレス: " + address);
            }
            address = address.toLowerCase();  // 正規化
        }
    }

    record Range(int min, int max) {
        Range {
            if (min > max) {
                // minとmaxを入れ替え
                int temp = min;
                min = max;
                max = temp;
            }
        }

        int size() {
            return max - min;
        }

        boolean contains(int value) {
            return value >= min && value <= max;
        }
    }

    public static void main(String[] args) {
        Email email = new Email("User@Example.COM");
        System.out.println(email);
        System.out.println("アドレス: " + email.address());

        System.out.println("---");
        Range r1 = new Range(1, 10);
        System.out.println(r1);
        System.out.println("サイズ: " + r1.size());
        System.out.println("5を含む: " + r1.contains(5));

        Range r2 = new Range(20, 5);  // min>maxでも自動修正
        System.out.println(r2);
        System.out.println("サイズ: " + r2.size());
    }
}`}
          expectedOutput={`Email[address=user@example.com]
アドレス: user@example.com
---
Range[min=1, max=10]
サイズ: 9
5を含む: true
Range[min=5, max=20]
サイズ: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Recordにメソッドを追加</h2>
        <p className="text-gray-400 mb-4">Recordにカスタムメソッドやstaticファクトリメソッドを追加できます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    record Money(int amount, String currency) {
        // staticファクトリメソッド
        static Money yen(int amount) {
            return new Money(amount, "JPY");
        }

        static Money usd(int amount) {
            return new Money(amount, "USD");
        }

        // カスタムメソッド
        Money add(Money other) {
            if (!this.currency.equals(other.currency)) {
                throw new IllegalArgumentException("通貨が異なります");
            }
            return new Money(this.amount + other.amount, this.currency);
        }

        String format() {
            if (currency.equals("JPY")) return amount + "円";
            if (currency.equals("USD")) return "$" + amount;
            return amount + " " + currency;
        }
    }

    public static void main(String[] args) {
        Money price1 = Money.yen(1000);
        Money price2 = Money.yen(2500);
        Money total = price1.add(price2);

        System.out.println(price1.format() + " + " + price2.format());
        System.out.println("合計: " + total.format());

        System.out.println("---");
        Money usd1 = Money.usd(50);
        Money usd2 = Money.usd(30);
        System.out.println(usd1.format() + " + " + usd2.format());
        System.out.println("合計: " + usd1.add(usd2).format());
    }
}`}
          expectedOutput={`1000円 + 2500円
合計: 3500円
---
$50 + $30
合計: $80`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="records" />
      </div>
      <LessonNav lessons={lessons} currentId="records" basePath="/learn/classes" />
    </div>
  );
}
