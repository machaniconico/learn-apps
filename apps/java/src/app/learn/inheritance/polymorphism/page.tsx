import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritancePolymorphismPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポリモーフィズム</h1>
        <p className="text-gray-400">多態性と動的バインディングの仕組みを実践的に学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポリモーフィズム（多態性）とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポリモーフィズムは、同じメソッド呼び出しでもオブジェクトの実際の型によって
          異なる動作をする仕組みです。親クラスやインターフェースの型で参照しながら、
          実行時に実際のオブジェクト型のメソッドが呼び出されます（動的バインディング）。
          これにより、新しい型を追加しても既存のコードを変更せずに拡張できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>動的バインディング：実行時にどのメソッドを呼ぶか決まる</li>
          <li>親クラスの型で子クラスのインスタンスを参照できる</li>
          <li>新しいサブクラスを追加しても既存コードの変更不要</li>
          <li>開放/閉鎖原則（OCP）を実現する中心的メカニズム</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">動的バインディングの動作</h2>
        <p className="text-gray-400 mb-4">親クラスの型で参照しても、実際のオブジェクトのメソッドが呼ばれることを確認します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static abstract class Payment {
        int amount;

        Payment(int amount) {
            this.amount = amount;
        }

        abstract String process();

        void execute() {
            System.out.println(process());
        }
    }

    static class CreditCard extends Payment {
        CreditCard(int amount) { super(amount); }

        @Override
        String process() {
            return "クレジットカード: " + amount + "円を決済";
        }
    }

    static class BankTransfer extends Payment {
        BankTransfer(int amount) { super(amount); }

        @Override
        String process() {
            return "銀行振込: " + amount + "円を送金";
        }
    }

    static class EMoney extends Payment {
        EMoney(int amount) { super(amount); }

        @Override
        String process() {
            return "電子マネー: " + amount + "円をチャージ決済";
        }
    }

    // Payment型で受け取る → 多態性
    static void processPayments(Payment[] payments) {
        int total = 0;
        for (Payment p : payments) {
            p.execute();  // 実際の型のメソッドが呼ばれる
            total += p.amount;
        }
        System.out.println("合計: " + total + "円");
    }

    public static void main(String[] args) {
        Payment[] payments = {
            new CreditCard(5000),
            new BankTransfer(30000),
            new EMoney(1200),
            new CreditCard(8000)
        };
        processPayments(payments);
    }
}`}
          expectedOutput={`クレジットカード: 5000円を決済
銀行振込: 30000円を送金
電子マネー: 1200円をチャージ決済
クレジットカード: 8000円を決済
合計: 44200円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースによるポリモーフィズム</h2>
        <p className="text-gray-400 mb-4">インターフェースを通じて異なるクラスを統一的に扱うパターンです。</p>
        <JavaEditor
          defaultCode={`public class Main {
    interface Exportable {
        String export();
        String getFormat();
    }

    static class CsvExporter implements Exportable {
        String[] data;

        CsvExporter(String[] data) {
            this.data = data;
        }

        @Override
        public String export() {
            return String.join(",", data);
        }

        @Override
        public String getFormat() { return "CSV"; }
    }

    static class JsonExporter implements Exportable {
        String key;
        String value;

        JsonExporter(String key, String value) {
            this.key = key;
            this.value = value;
        }

        @Override
        public String export() {
            return "{\"" + key + "\": \"" + value + "\"}";
        }

        @Override
        public String getFormat() { return "JSON"; }
    }

    static class XmlExporter implements Exportable {
        String tag;
        String content;

        XmlExporter(String tag, String content) {
            this.tag = tag;
            this.content = content;
        }

        @Override
        public String export() {
            return "<" + tag + ">" + content + "</" + tag + ">";
        }

        @Override
        public String getFormat() { return "XML"; }
    }

    static void exportAll(Exportable[] exporters) {
        for (Exportable e : exporters) {
            System.out.println("[" + e.getFormat() + "] " + e.export());
        }
    }

    public static void main(String[] args) {
        Exportable[] exporters = {
            new CsvExporter(new String[]{"名前", "年齢", "都市"}),
            new JsonExporter("language", "Java"),
            new XmlExporter("message", "Hello World")
        };
        exportAll(exporters);
    }
}`}
          expectedOutput={`[CSV] 名前,年齢,都市
[JSON] {"language": "Java"}
[XML] <message>Hello World</message>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="polymorphism" />
      </div>
      <LessonNav lessons={lessons} currentId="polymorphism" basePath="/learn/inheritance" />
    </div>
  );
}
