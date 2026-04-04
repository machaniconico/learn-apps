import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">変数の宣言と値の代入の基本</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数はデータを格納するための名前付きの入れ物です。
          Javaでは変数を使う前に、型を指定して宣言する必要があります。
          宣言と同時に値を代入（初期化）することも、後から代入することもできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>int</code> は整数、<code>String</code> は文字列、<code>double</code> は小数、<code>boolean</code> は真偽値</li>
          <li>変数名はキャメルケース（例: <code>myName</code>）が慣例</li>
          <li>宣言: <code>型 変数名;</code>　初期化: <code>型 変数名 = 値;</code></li>
          <li>同じ型の変数は <code>int a, b, c;</code> のようにまとめて宣言可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な変数の宣言と使用</h2>
        <p className="text-gray-400 mb-4">
          よく使う4つの型で変数を宣言し、値を出力してみましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int age = 25;
        String name = "田中太郎";
        double height = 170.5;
        boolean isStudent = true;

        System.out.println("名前: " + name);
        System.out.println("年齢: " + age);
        System.out.println("身長: " + height + "cm");
        System.out.println("学生: " + isStudent);
    }
}`}
          expectedOutput={`名前: 田中太郎
年齢: 25
身長: 170.5cm
学生: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の再代入</h2>
        <p className="text-gray-400 mb-4">
          変数は宣言後に値を変更できます。ただし、宣言した型と異なる型の値は代入できません。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int score = 80;
        System.out.println("変更前: " + score);

        score = 95;  // 再代入
        System.out.println("変更後: " + score);

        int bonus = 5;
        score = score + bonus;  // 計算結果を再代入
        System.out.println("ボーナス後: " + score);
    }
}`}
          expectedOutput={`変更前: 80
変更後: 95
ボーナス後: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数変数の宣言と文字列結合</h2>
        <p className="text-gray-400 mb-4">
          複数の変数を組み合わせて文字列を構築できます。<code className="text-orange-300">+</code> 演算子で文字列と他の型を結合します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String firstName = "太郎";
        String lastName = "山田";
        int birthYear = 1998;
        int currentYear = 2026;

        String fullName = lastName + " " + firstName;
        int age = currentYear - birthYear;

        System.out.println("氏名: " + fullName);
        System.out.println("年齢: " + age + "歳");
    }
}`}
          expectedOutput={`氏名: 山田 太郎
年齢: 28歳`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
