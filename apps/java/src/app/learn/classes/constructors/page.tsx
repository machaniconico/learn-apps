import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesConstructorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンストラクタ</h1>
        <p className="text-gray-400">オブジェクト初期化のためのコンストラクタの定義方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コンストラクタはオブジェクト生成時に自動的に呼び出される特殊なメソッドです。
          クラス名と同じ名前で、戻り値の型を持ちません。
          コンストラクタを使うことで、オブジェクトの生成と初期化を同時に行えます。
          コンストラクタを定義しない場合、Javaは引数なしのデフォルトコンストラクタを自動生成します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>クラス名と同じ名前、戻り値なし</li>
          <li>new演算子と共に呼び出される</li>
          <li>引数付きコンストラクタを定義するとデフォルトコンストラクタは自動生成されない</li>
          <li>this()で別のコンストラクタを呼び出せる（コンストラクタチェーン）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトと引数付きコンストラクタ</h2>
        <p className="text-gray-400 mb-4">コンストラクタを定義してオブジェクトの初期化を簡潔にします。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Book {
        String title;
        String author;
        int pages;

        // デフォルトコンストラクタ
        Book() {
            this.title = "無題";
            this.author = "不明";
            this.pages = 0;
        }

        // 引数付きコンストラクタ
        Book(String title, String author, int pages) {
            this.title = title;
            this.author = author;
            this.pages = pages;
        }

        void display() {
            System.out.println("『" + title + "』" + author + "著 (" + pages + "ページ)");
        }
    }

    public static void main(String[] args) {
        Book book1 = new Book();  // デフォルト
        book1.display();

        Book book2 = new Book("Java入門", "田中太郎", 350);
        book2.display();

        Book book3 = new Book("デザインパターン", "GoF", 416);
        book3.display();
    }
}`}
          expectedOutput={`『無題』不明著 (0ページ)
『Java入門』田中太郎著 (350ページ)
『デザインパターン』GoF著 (416ページ)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタチェーン（this()）</h2>
        <p className="text-gray-400 mb-4">this()を使って他のコンストラクタを呼び出し、コードの重複を避けます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Product {
        String name;
        int price;
        int stock;

        // 全引数コンストラクタ
        Product(String name, int price, int stock) {
            this.name = name;
            this.price = price;
            this.stock = stock;
        }

        // 在庫なしのデフォルト
        Product(String name, int price) {
            this(name, price, 0);  // 上のコンストラクタを呼び出し
        }

        // 名前のみ
        Product(String name) {
            this(name, 0, 0);
        }

        void display() {
            System.out.println(name + " ¥" + price + " (在庫:" + stock + ")");
        }
    }

    public static void main(String[] args) {
        Product p1 = new Product("Java本", 3000, 50);
        Product p2 = new Product("ノート", 200);
        Product p3 = new Product("新商品");

        p1.display();
        p2.display();
        p3.display();
    }
}`}
          expectedOutput={`Java本 ¥3000 (在庫:50)
ノート ¥200 (在庫:0)
新商品 ¥0 (在庫:0)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタでのバリデーション</h2>
        <p className="text-gray-400 mb-4">コンストラクタ内で値の妥当性を検証し、不正な状態のオブジェクト生成を防ぎます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Temperature {
        double celsius;
        String scale;

        Temperature(double celsius) {
            // 絶対零度以下は不正
            if (celsius < -273.15) {
                System.out.println("警告: 絶対零度以下! -273.15に補正");
                this.celsius = -273.15;
            } else {
                this.celsius = celsius;
            }
            this.scale = "Celsius";
        }

        double toFahrenheit() {
            return celsius * 9.0 / 5.0 + 32;
        }

        void display() {
            System.out.printf("%.1f°C = %.1f°F%n", celsius, toFahrenheit());
        }
    }

    public static void main(String[] args) {
        Temperature t1 = new Temperature(100.0);
        t1.display();

        Temperature t2 = new Temperature(0.0);
        t2.display();

        Temperature t3 = new Temperature(-300.0);  // 不正な値
        t3.display();
    }
}`}
          expectedOutput={`100.0°C = 212.0°F
0.0°C = 32.0°F
警告: 絶対零度以下! -273.15に補正
-273.1°C = -459.6°F`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="constructors" />
      </div>
      <LessonNav lessons={lessons} currentId="constructors" basePath="/learn/classes" />
    </div>
  );
}
