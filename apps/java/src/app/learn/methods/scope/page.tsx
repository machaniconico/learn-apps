import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsScopePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スコープ</h1>
        <p className="text-gray-400">変数のスコープ（有効範囲）とライフタイムについて学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スコープとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スコープとは、変数が参照できる範囲（有効範囲）のことです。
          Javaでは変数は宣言されたブロック（{"{"}...{"}"} の範囲）内でのみ有効です。
          メソッドのローカル変数はそのメソッド内でのみ使え、ブロック内で宣言された変数はそのブロック内でのみ使えます。
          スコープを正しく理解することで、名前の衝突を避け、安全なコードを書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ローカル変数：メソッド内で宣言、メソッド終了時に消滅</li>
          <li>ブロックスコープ：if, for, while のブロック内で宣言された変数はブロック内のみ有効</li>
          <li>メソッドの引数もローカル変数として扱われる</li>
          <li>クラスフィールドはクラス全体からアクセス可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ローカル変数のスコープ</h2>
        <p className="text-gray-400 mb-4">各メソッドのローカル変数は独立しており、他のメソッドからは見えません。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static void methodA() {
        int x = 10;  // methodAのローカル変数
        System.out.println("methodA: x = " + x);
    }

    static void methodB() {
        int x = 20;  // methodBのローカル変数（methodAのxとは別物）
        System.out.println("methodB: x = " + x);
    }

    static void methodC(int x) {  // 引数もローカル変数
        x = x + 100;
        System.out.println("methodC: x = " + x);
    }

    public static void main(String[] args) {
        int x = 0;  // mainのローカル変数
        System.out.println("main開始: x = " + x);

        methodA();
        methodB();
        methodC(50);

        // mainのxは他のメソッドの影響を受けない
        System.out.println("main終了: x = " + x);
    }
}`}
          expectedOutput={`main開始: x = 0
methodA: x = 10
methodB: x = 20
methodC: x = 150
main終了: x = 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ブロックスコープ</h2>
        <p className="text-gray-400 mb-4">if文やfor文のブロック内で宣言された変数は、そのブロック内でのみ有効です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int total = 0;

        // forループのスコープ
        for (int i = 1; i <= 5; i++) {
            int square = i * i;  // ブロック内のローカル変数
            total += square;
            System.out.println(i + "^2 = " + square);
        }
        // ここでは i や square は使えない
        System.out.println("合計: " + total);

        System.out.println("---");

        // if文のスコープ
        int score = 85;
        String grade;  // ブロック外で宣言
        if (score >= 80) {
            grade = "A";
            String comment = "素晴らしい！";  // ブロック内のみ
            System.out.println(comment);
        } else {
            grade = "B";
        }
        System.out.println("評価: " + grade);
        // ここでは comment は使えない

        System.out.println("---");

        // 同じ名前の変数を別ブロックで再利用
        for (int i = 0; i < 3; i++) {
            System.out.print("A" + i + " ");
        }
        System.out.println();
        for (int i = 0; i < 3; i++) {  // 別のブロックなのでOK
            System.out.print("B" + i + " ");
        }
        System.out.println();
    }
}`}
          expectedOutput={`1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
5^2 = 25
合計: 55
---
素晴らしい！
評価: A
---
A0 A1 A2
B0 B1 B2 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスフィールドとローカル変数</h2>
        <p className="text-gray-400 mb-4">staticフィールドはクラス全体から参照でき、ローカル変数とは異なるスコープを持ちます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // クラスフィールド（クラス全体で参照可能）
    static int counter = 0;
    static String appName = "MyApp";

    static void increment() {
        counter++;  // クラスフィールドにアクセス
        System.out.println(appName + " カウンタ: " + counter);
    }

    static void reset() {
        counter = 0;
        System.out.println("カウンタをリセット");
    }

    static void showInfo() {
        String info = appName + " (count=" + counter + ")";
        System.out.println(info);
    }

    public static void main(String[] args) {
        increment();
        increment();
        increment();
        showInfo();

        reset();
        showInfo();

        increment();
        showInfo();
    }
}`}
          expectedOutput={`MyApp カウンタ: 1
MyApp カウンタ: 2
MyApp カウンタ: 3
MyApp (count=3)
カウンタをリセット
MyApp (count=0)
MyApp カウンタ: 1
MyApp (count=1)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="scope" />
      </div>
      <LessonNav lessons={lessons} currentId="scope" basePath="/learn/methods" />
    </div>
  );
}
