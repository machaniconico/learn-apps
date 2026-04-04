import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsOverloadingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オーバーロード</h1>
        <p className="text-gray-400">同名メソッドを異なるシグネチャで定義するオーバーロードを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドオーバーロードとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドオーバーロードとは、同じ名前のメソッドを引数の型・数・順序を変えて複数定義することです。
          コンパイラは呼び出し時の引数から、どのメソッドを実行すべきか自動的に判断します。
          これにより、似た機能を持つメソッドに一貫した名前を付けることができ、使いやすいAPIを設計できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>引数の型、数、または順序が異なれば同名メソッドを定義できる</li>
          <li>戻り値の型だけが異なるオーバーロードはコンパイルエラー</li>
          <li>System.out.println() は典型的なオーバーロードの例</li>
          <li>コンストラクタでもオーバーロードが可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なオーバーロード</h2>
        <p className="text-gray-400 mb-4">引数の数や型を変えた同名メソッドを定義し、自動的に適切なものが呼び出される仕組みを確認します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 引数なし
    static int add() {
        return 0;
    }

    // int 2つ
    static int add(int a, int b) {
        return a + b;
    }

    // int 3つ
    static int add(int a, int b, int c) {
        return a + b + c;
    }

    // double 2つ
    static double add(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("add()       = " + add());
        System.out.println("add(3, 5)   = " + add(3, 5));
        System.out.println("add(1,2,3)  = " + add(1, 2, 3));
        System.out.println("add(1.5,2.3)= " + add(1.5, 2.3));
    }
}`}
          expectedOutput={`add()       = 0
add(3, 5)   = 8
add(1,2,3)  = 6
add(1.5,2.3)= 3.8`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的なオーバーロード</h2>
        <p className="text-gray-400 mb-4">ユーザー情報のフォーマットを、渡す情報に応じて柔軟に対応するオーバーロードです。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static String format(String name) {
        return "名前: " + name;
    }

    static String format(String name, int age) {
        return "名前: " + name + "（" + age + "歳）";
    }

    static String format(String name, int age, String job) {
        return "名前: " + name + "（" + age + "歳, " + job + "）";
    }

    // 型の順序が異なるオーバーロード
    static String format(int id, String name) {
        return "ID:" + id + " " + name;
    }

    public static void main(String[] args) {
        System.out.println(format("田中"));
        System.out.println(format("鈴木", 25));
        System.out.println(format("佐藤", 30, "エンジニア"));
        System.out.println(format(1001, "山田"));
    }
}`}
          expectedOutput={`名前: 田中
名前: 鈴木（25歳）
名前: 佐藤（30歳, エンジニア）
ID:1001 山田`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printメソッドのオーバーロード再現</h2>
        <p className="text-gray-400 mb-4">System.out.println() のように、様々な型を受け取るメソッドを自作してみましょう。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static void display(int value) {
        System.out.println("[int]    " + value);
    }

    static void display(double value) {
        System.out.println("[double] " + value);
    }

    static void display(String value) {
        System.out.println("[String] " + value);
    }

    static void display(boolean value) {
        System.out.println("[bool]   " + value);
    }

    static void display(int[] values) {
        StringBuilder sb = new StringBuilder("[array]  [");
        for (int i = 0; i < values.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append(values[i]);
        }
        sb.append("]");
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        display(42);
        display(3.14);
        display("Hello");
        display(true);
        display(new int[]{1, 2, 3});
    }
}`}
          expectedOutput={`[int]    42
[double] 3.14
[String] Hello
[bool]   true
[array]  [1, 2, 3]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="overloading" />
      </div>
      <LessonNav lessons={lessons} currentId="overloading" basePath="/learn/methods" />
    </div>
  );
}
