import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesThisKeywordPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">thisキーワード</h1>
        <p className="text-gray-400">現在のインスタンスを参照するthisの使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">thisとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          thisキーワードは現在のインスタンス自身を参照する特殊な変数です。
          フィールドと引数の名前が同じ場合の区別、メソッドチェーンの実現、
          コンストラクタから別のコンストラクタの呼び出しなどに使用します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>this.フィールド名 でインスタンスフィールドを明示的に参照</li>
          <li>this() でオーバーロードされた別のコンストラクタを呼び出し</li>
          <li>return this でメソッドチェーンを実現</li>
          <li>staticメソッド内ではthisは使えない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">引数とフィールドの区別</h2>
        <p className="text-gray-400 mb-4">引数名とフィールド名が同じ場合にthisで区別する最も一般的な使い方です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Employee {
        private String name;
        private String department;
        private int salary;

        // thisで引数とフィールドを区別
        Employee(String name, String department, int salary) {
            this.name = name;           // this.name = フィールド
            this.department = department; // name = 引数
            this.salary = salary;
        }

        void updateSalary(int salary) {
            System.out.println(this.name + ": " + this.salary + " → " + salary);
            this.salary = salary;
        }

        void display() {
            System.out.println(name + " [" + department + "] 給与:" + salary + "万");
        }
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("田中", "開発部", 500);
        Employee e2 = new Employee("鈴木", "営業部", 450);

        e1.display();
        e2.display();

        System.out.println("---");
        e1.updateSalary(550);
        e1.display();
    }
}`}
          expectedOutput={`田中 [開発部] 給与:500万
鈴木 [営業部] 給与:450万
---
田中: 500 → 550
田中 [開発部] 給与:550万`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドチェーン（fluent API）</h2>
        <p className="text-gray-400 mb-4">return thisを使ってメソッドを連続して呼び出せるAPIを設計します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class QueryBuilder {
        private String table;
        private String condition;
        private String orderBy;
        private int limit;

        QueryBuilder() {
            this.table = "";
            this.condition = "";
            this.orderBy = "";
            this.limit = -1;
        }

        QueryBuilder from(String table) {
            this.table = table;
            return this;  // thisを返してチェーン可能に
        }

        QueryBuilder where(String condition) {
            this.condition = condition;
            return this;
        }

        QueryBuilder orderBy(String column) {
            this.orderBy = column;
            return this;
        }

        QueryBuilder limit(int n) {
            this.limit = n;
            return this;
        }

        String build() {
            StringBuilder sb = new StringBuilder("SELECT * FROM " + table);
            if (!condition.isEmpty()) sb.append(" WHERE " + condition);
            if (!orderBy.isEmpty()) sb.append(" ORDER BY " + orderBy);
            if (limit > 0) sb.append(" LIMIT " + limit);
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        // メソッドチェーンで組み立て
        String query = new QueryBuilder()
            .from("users")
            .where("age >= 20")
            .orderBy("name")
            .limit(10)
            .build();

        System.out.println(query);

        String query2 = new QueryBuilder()
            .from("products")
            .where("price < 1000")
            .build();

        System.out.println(query2);
    }
}`}
          expectedOutput={`SELECT * FROM users WHERE age >= 20 ORDER BY name LIMIT 10
SELECT * FROM products WHERE price < 1000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">this()によるコンストラクタ呼び出し</h2>
        <p className="text-gray-400 mb-4">this()を使ってコンストラクタ間でコードを共有し、重複を排除します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Item {
        private String name;
        private int price;
        private String category;
        private boolean available;

        // メインのコンストラクタ
        Item(String name, int price, String category, boolean available) {
            this.name = name;
            this.price = price;
            this.category = category;
            this.available = available;
        }

        // this()で別のコンストラクタを呼び出し
        Item(String name, int price, String category) {
            this(name, price, category, true);  // デフォルトで利用可能
        }

        Item(String name, int price) {
            this(name, price, "未分類");  // デフォルトカテゴリ
        }

        Item(String name) {
            this(name, 0);  // デフォルト価格0
        }

        void display() {
            String status = available ? "◯" : "✕";
            System.out.println(status + " " + name + " ¥" + price + " [" + category + "]");
        }
    }

    public static void main(String[] args) {
        new Item("高級ペン", 5000, "文房具", true).display();
        new Item("ノート", 300, "文房具").display();
        new Item("マウス", 2000).display();
        new Item("新商品").display();
    }
}`}
          expectedOutput={`◯ 高級ペン ¥5000 [文房具]
◯ ノート ¥300 [文房具]
◯ マウス ¥2000 [未分類]
◯ 新商品 ¥0 [未分類]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="this-keyword" />
      </div>
      <LessonNav lessons={lessons} currentId="this-keyword" basePath="/learn/classes" />
    </div>
  );
}
