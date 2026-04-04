import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VarInferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">var推論</h1>
        <p className="text-gray-400">Java 10のvarキーワードによるローカル変数型推論</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">var によるローカル変数型推論</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java 10 で導入された <code className="text-orange-300">var</code> キーワードを使うと、
          コンパイラが右辺の値から型を自動推論してくれます。
          コードが簡潔になりますが、使える場所には制限があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ローカル変数の宣言時にのみ使用可能</li>
          <li>初期化が必須（右辺の値から型を推論するため）</li>
          <li>フィールド、メソッド引数、戻り値の型には使えない</li>
          <li><code>var</code> は予約語ではなくキーワード（変数名としても使用可能だが非推奨）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">varの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          型名の代わりに <code className="text-orange-300">var</code> を書くだけで、コンパイラが型を推論します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        var message = "Hello, Java!";   // String
        var count = 42;                  // int
        var price = 19.99;               // double
        var active = true;               // boolean

        System.out.println("message: " + message);
        System.out.println("count: " + count);
        System.out.println("price: " + price);
        System.out.println("active: " + active);

        // 型を確認
        System.out.println("messageの型: " + ((Object) message).getClass().getSimpleName());
        System.out.println("countの型: " + ((Object) count).getClass().getSimpleName());
    }
}`}
          expectedOutput={`message: Hello, Java!
count: 42
price: 19.99
active: true
messageの型: String
countの型: Integer`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">varが便利な場面</h2>
        <p className="text-gray-400 mb-4">
          特にジェネリクスを使った長い型名を持つ場合に <code className="text-orange-300">var</code> は便利です。
          forループでもよく使われます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // 長い型名が簡潔に
        var names = List.of("Alice", "Bob", "Charlie");
        var scores = Map.of("Alice", 95, "Bob", 87, "Charlie", 92);

        // forループでvarを使用
        for (var name : names) {
            System.out.println("名前: " + name);
        }

        // Mapのエントリでvar
        for (var entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue() + "点");
        }
    }
}`}
          expectedOutput={`名前: Alice
名前: Bob
名前: Charlie
Alice: 95点
Bob: 87点
Charlie: 92点`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">varの注意点と制限</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">var</code> が使えない場面を理解しておきましょう。
          可読性を損なう場合は明示的な型指定のほうが適切です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // static final var X = 10;  // コンパイルエラー（フィールドには使えない）

    // void method(var x) {}  // コンパイルエラー（引数には使えない）

    public static void main(String[] args) {
        // OK: 初期化と同時に宣言
        var x = 10;

        // var y;  // コンパイルエラー（初期化が必要）
        // var z = null;  // コンパイルエラー（nullからは型推論できない）

        // 可読性の例
        var clearType = "これは明らかにString";
        System.out.println(clearType);

        // varでも再代入は可能（型は変わらない）
        var value = 100;
        value = 200;
        // value = "text";  // コンパイルエラー（int型は変わらない）
        System.out.println("value: " + value);

        // final var で定数化
        final var PI = 3.14159;
        System.out.println("PI: " + PI);
    }
}`}
          expectedOutput={`これは明らかにString
value: 200
PI: 3.14159`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="var-inference" />
      </div>
      <LessonNav lessons={lessons} currentId="var-inference" basePath="/learn/basics" />
    </div>
  );
}
