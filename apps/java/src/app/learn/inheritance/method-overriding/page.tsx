import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceMethodOverridingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドオーバーライド</h1>
        <p className="text-gray-400">@Overrideアノテーションとsuper.method()による親メソッドの呼び出しを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドオーバーライドとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドオーバーライドとは、親クラスで定義されたメソッドを子クラスで再定義することです。
          子クラスは親クラスのメソッドと同じシグネチャ（名前・引数）で、
          異なる実装を提供できます。@Overrideアノテーションを付けることで、
          コンパイラがオーバーライドの正しさを検証してくれます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>@Override を付けてオーバーライドを明示する（推奨）</li>
          <li>メソッド名・引数の型と数は親と完全に一致させる</li>
          <li>super.メソッド名() で親のメソッドを呼び出せる</li>
          <li>アクセス修飾子は親と同じかより広くする必要がある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なオーバーライド</h2>
        <p className="text-gray-400 mb-4">親クラスのメソッドを子クラスで上書きし、独自の振る舞いを定義します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Animal {
        String name;

        Animal(String name) {
            this.name = name;
        }

        String sound() {
            return "...";
        }

        void introduce() {
            System.out.println(name + "は「" + sound() + "」と鳴きます");
        }
    }

    static class Dog extends Animal {
        Dog(String name) { super(name); }

        @Override
        String sound() {
            return "ワンワン";
        }
    }

    static class Cat extends Animal {
        Cat(String name) { super(name); }

        @Override
        String sound() {
            return "ニャー";
        }
    }

    static class Duck extends Animal {
        Duck(String name) { super(name); }

        @Override
        String sound() {
            return "ガーガー";
        }
    }

    public static void main(String[] args) {
        Animal[] animals = {
            new Dog("ポチ"),
            new Cat("タマ"),
            new Duck("ドナルド")
        };

        for (Animal a : animals) {
            a.introduce();  // それぞれのsound()が呼ばれる
        }
    }
}`}
          expectedOutput={`ポチは「ワンワン」と鳴きます
タマは「ニャー」と鳴きます
ドナルドは「ガーガー」と鳴きます`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">super.method()で親メソッドを呼び出す</h2>
        <p className="text-gray-400 mb-4">オーバーライドしたメソッド内からsuperを使って親の処理を活用し、機能を拡張します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Logger {
        void log(String message) {
            System.out.println("[LOG] " + message);
        }
    }

    static class TimestampLogger extends Logger {
        @Override
        void log(String message) {
            // 親のlogを呼び出しつつ、タイムスタンプを追加
            super.log("2024-01-15 10:30:00 - " + message);
        }
    }

    static class PrefixLogger extends Logger {
        String prefix;

        PrefixLogger(String prefix) {
            this.prefix = prefix;
        }

        @Override
        void log(String message) {
            super.log("[" + prefix + "] " + message);
        }
    }

    public static void main(String[] args) {
        Logger basic = new Logger();
        basic.log("基本メッセージ");

        System.out.println("---");
        TimestampLogger ts = new TimestampLogger();
        ts.log("処理開始");
        ts.log("処理完了");

        System.out.println("---");
        PrefixLogger app = new PrefixLogger("APP");
        app.log("起動しました");

        PrefixLogger db = new PrefixLogger("DB");
        db.log("接続成功");
    }
}`}
          expectedOutput={`[LOG] 基本メッセージ
---
[LOG] 2024-01-15 10:30:00 - 処理開始
[LOG] 2024-01-15 10:30:00 - 処理完了
---
[LOG] [APP] 起動しました
[LOG] [DB] 接続成功`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">toString()のオーバーライド</h2>
        <p className="text-gray-400 mb-4">ObjectクラスのtoString()をオーバーライドして、オブジェクトの文字列表現をカスタマイズします。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Product {
        String name;
        int price;

        Product(String name, int price) {
            this.name = name;
            this.price = price;
        }

        @Override
        public String toString() {
            return name + " (¥" + price + ")";
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof Product)) return false;
            Product other = (Product) obj;
            return this.name.equals(other.name) && this.price == other.price;
        }
    }

    public static void main(String[] args) {
        Product p1 = new Product("Java入門書", 3000);
        Product p2 = new Product("ノートPC", 80000);
        Product p3 = new Product("Java入門書", 3000);

        // toString()が自動的に呼ばれる
        System.out.println(p1);
        System.out.println(p2);

        // equals()のオーバーライドで値の比較
        System.out.println("---");
        System.out.println("p1 == p3: " + (p1 == p3));        // 参照の比較
        System.out.println("p1.equals(p3): " + p1.equals(p3)); // 値の比較
        System.out.println("p1.equals(p2): " + p1.equals(p2));
    }
}`}
          expectedOutput={`Java入門書 (¥3000)
ノートPC (¥80000)
---
p1 == p3: false
p1.equals(p3): true
p1.equals(p2): false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="method-overriding" />
      </div>
      <LessonNav lessons={lessons} currentId="method-overriding" basePath="/learn/inheritance" />
    </div>
  );
}
