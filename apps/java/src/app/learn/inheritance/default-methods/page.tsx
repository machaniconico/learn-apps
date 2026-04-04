import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceDefaultMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルトメソッド</h1>
        <p className="text-gray-400">Java 8で導入されたインターフェースのdefaultメソッドを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトメソッドとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java 8で導入されたデフォルトメソッドは、インターフェースにメソッドの実装を持たせる機能です。
          defaultキーワードを付けて定義し、実装クラスはそのまま使うことも、オーバーライドすることもできます。
          これにより、既存のインターフェースに新しいメソッドを追加しても、既存の実装クラスを壊しません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>default キーワードで実装付きメソッドを定義</li>
          <li>実装クラスではオーバーライドしてもしなくてもよい</li>
          <li>staticメソッドもインターフェースに定義可能（Java 8+）</li>
          <li>複数インターフェースで同名のdefaultメソッドがある場合は明示的に解決が必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なデフォルトメソッド</h2>
        <p className="text-gray-400 mb-4">インターフェースにデフォルトメソッドを定義し、クラスがそのまま使うパターンです。</p>
        <JavaEditor
          defaultCode={`public class Main {
    interface Greetable {
        String getName();

        // デフォルトメソッド：実装を持つ
        default void greet() {
            System.out.println("こんにちは、" + getName() + "さん！");
        }

        default void farewell() {
            System.out.println("さようなら、" + getName() + "さん！");
        }
    }

    // デフォルトメソッドをそのまま使う
    static class User implements Greetable {
        private String name;
        User(String name) { this.name = name; }

        @Override
        public String getName() { return name; }
        // greet()とfarewell()は実装しなくてもOK
    }

    // デフォルトメソッドをオーバーライド
    static class VipUser implements Greetable {
        private String name;
        VipUser(String name) { this.name = name; }

        @Override
        public String getName() { return name; }

        @Override
        public void greet() {
            System.out.println("★ VIPの" + name + "様、ようこそ！ ★");
        }
    }

    public static void main(String[] args) {
        User user = new User("田中");
        user.greet();       // デフォルト実装
        user.farewell();    // デフォルト実装

        System.out.println("---");
        VipUser vip = new VipUser("鈴木");
        vip.greet();        // オーバーライドされた実装
        vip.farewell();     // デフォルト実装
    }
}`}
          expectedOutput={`こんにちは、田中さん！
さようなら、田中さん！
---
★ VIPの鈴木様、ようこそ！ ★
さようなら、鈴木さん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">staticメソッドとデフォルトメソッドの組み合わせ</h2>
        <p className="text-gray-400 mb-4">インターフェースのstaticメソッドとdefaultメソッドを組み合わせて、機能豊富なインターフェースを作成します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    interface Validator {
        boolean isValid(String value);

        // デフォルトメソッド
        default String validate(String value) {
            return isValid(value)
                ? value + " → OK"
                : value + " → NG";
        }

        // staticファクトリメソッド
        static Validator minLength(int len) {
            return value -> value != null && value.length() >= len;
        }

        static Validator notEmpty() {
            return value -> value != null && !value.isEmpty();
        }

        static Validator matches(String regex) {
            return value -> value != null && value.matches(regex);
        }
    }

    public static void main(String[] args) {
        Validator lengthCheck = Validator.minLength(5);
        System.out.println(lengthCheck.validate("Hi"));
        System.out.println(lengthCheck.validate("Hello!"));

        System.out.println("---");
        Validator notEmpty = Validator.notEmpty();
        System.out.println(notEmpty.validate(""));
        System.out.println(notEmpty.validate("data"));

        System.out.println("---");
        Validator numOnly = Validator.matches("[0-9]+");
        System.out.println(numOnly.validate("12345"));
        System.out.println(numOnly.validate("abc"));
    }
}`}
          expectedOutput={`Hi → NG
Hello! → OK
---
 → NG
data → OK
---
12345 → OK
abc → NG`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ダイヤモンド問題の解決</h2>
        <p className="text-gray-400 mb-4">複数のインターフェースに同名のdefaultメソッドがある場合の解決方法を示します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    interface A {
        default String hello() {
            return "Hello from A";
        }
    }

    interface B {
        default String hello() {
            return "Hello from B";
        }
    }

    // A と B の両方を実装 → hello()を明示的にオーバーライド必須
    static class C implements A, B {
        @Override
        public String hello() {
            // どちらかの実装を選ぶか、独自の実装を提供
            return A.super.hello() + " & " + B.super.hello();
        }
    }

    static class D implements A, B {
        @Override
        public String hello() {
            return "Hello from D（独自実装）";
        }
    }

    public static void main(String[] args) {
        C c = new C();
        System.out.println(c.hello());

        D d = new D();
        System.out.println(d.hello());
    }
}`}
          expectedOutput={`Hello from A & Hello from B
Hello from D（独自実装）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="default-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="default-methods" basePath="/learn/inheritance" />
    </div>
  );
}
