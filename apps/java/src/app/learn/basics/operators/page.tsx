import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術、比較、論理、ビット演算子</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaの演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaには多様な演算子があり、計算、比較、論理判定、ビット操作などに使います。
          演算子には優先順位があり、括弧を使って明示的に順序を制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>算術演算子: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code></li>
          <li>比較演算子: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li>
          <li>論理演算子: <code>&&</code>, <code>||</code>, <code>!</code></li>
          <li>代入演算子: <code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code></li>
          <li>インクリメント / デクリメント: <code>++</code>, <code>--</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術・代入演算子</h2>
        <p className="text-gray-400 mb-4">
          基本的な計算と複合代入演算子の使い方です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int a = 17, b = 5;

        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));

        // 複合代入演算子
        int x = 10;
        x += 5;  // x = x + 5
        System.out.println("x += 5: " + x);
        x *= 2;  // x = x * 2
        System.out.println("x *= 2: " + x);

        // インクリメント・デクリメント
        int count = 0;
        count++;
        System.out.println("count++: " + count);
        count--;
        System.out.println("count--: " + count);
    }
}`}
          expectedOutput={`a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2
x += 5: 15
x *= 2: 30
count++: 1
count--: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較・論理演算子</h2>
        <p className="text-gray-400 mb-4">
          比較演算子は <code className="text-orange-300">boolean</code> 値を返します。論理演算子で複合条件を作れます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int x = 10, y = 20;

        // 比較演算子
        System.out.println("x == y: " + (x == y));
        System.out.println("x != y: " + (x != y));
        System.out.println("x < y: " + (x < y));
        System.out.println("x >= 10: " + (x >= 10));

        // 論理演算子
        boolean a = true, b = false;
        System.out.println("a && b: " + (a && b));
        System.out.println("a || b: " + (a || b));
        System.out.println("!a: " + (!a));

        // 組み合わせ
        int age = 25;
        int score = 80;
        boolean qualified = age >= 18 && score >= 70;
        System.out.println("資格あり: " + qualified);
    }
}`}
          expectedOutput={`x == y: false
x != y: true
x < y: true
x >= 10: true
a && b: false
a || b: true
!a: false
資格あり: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビット演算子</h2>
        <p className="text-gray-400 mb-4">
          ビット演算子はビットレベルで値を操作します。フラグ管理や低レベル処理で使われます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int a = 0b1100;  // 12
        int b = 0b1010;  // 10

        System.out.println("a = " + a + " (0b1100)");
        System.out.println("b = " + b + " (0b1010)");

        System.out.println("a & b  = " + (a & b));   // AND: 0b1000 = 8
        System.out.println("a | b  = " + (a | b));   // OR:  0b1110 = 14
        System.out.println("a ^ b  = " + (a ^ b));   // XOR: 0b0110 = 6
        System.out.println("~a     = " + (~a));       // NOT

        // シフト演算
        int x = 8;
        System.out.println("8 << 1 = " + (x << 1));  // 左シフト: 16
        System.out.println("8 >> 1 = " + (x >> 1));  // 右シフト: 4
    }
}`}
          expectedOutput={`a = 12 (0b1100)
b = 10 (0b1010)
a & b  = 8
a | b  = 14
a ^ b  = 6
~a     = -13
8 << 1 = 16
8 >> 1 = 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}
