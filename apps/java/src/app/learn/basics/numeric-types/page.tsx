import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NumericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">int・long・double・floatなど数値型の使い分け</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">数値型の使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaでは整数には主に <code className="text-orange-300">int</code>、大きな整数には <code className="text-orange-300">long</code>、
          小数には <code className="text-orange-300">double</code> を使います。
          数値リテラルにはアンダースコア区切りや接尾辞を使って可読性を高められます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>整数リテラルはデフォルトで <code>int</code> 型</li>
          <li><code>long</code> リテラルには <code>L</code> サフィックスを付ける</li>
          <li>小数リテラルはデフォルトで <code>double</code> 型</li>
          <li><code>float</code> リテラルには <code>f</code> サフィックスを付ける</li>
          <li>アンダースコアで桁区切り: <code>1_000_000</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値リテラルの書き方</h2>
        <p className="text-gray-400 mb-4">
          数値リテラルにはさまざまな表記法があります。アンダースコア区切りや進数表記を活用しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // アンダースコア区切り
        int million = 1_000_000;
        long population = 126_000_000L;

        // 進数表記
        int hex = 0xFF;       // 16進数
        int binary = 0b1010;  // 2進数
        int octal = 077;      // 8進数

        System.out.println("100万: " + million);
        System.out.println("人口: " + population);
        System.out.println("16進 0xFF: " + hex);
        System.out.println("2進 0b1010: " + binary);
        System.out.println("8進 077: " + octal);
    }
}`}
          expectedOutput={`100万: 1000000
人口: 126000000
16進 0xFF: 255
2進 0b1010: 10
8進 077: 63`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数演算の注意点</h2>
        <p className="text-gray-400 mb-4">
          整数同士の除算は小数点以下が切り捨てられます。小数の結果が必要な場合は一方を <code className="text-orange-300">double</code> に変換します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int a = 7;
        int b = 2;

        // 整数同士の除算 → 切り捨て
        System.out.println("7 / 2 = " + (a / b));

        // doubleにキャストして正確な結果を得る
        System.out.println("7.0 / 2 = " + ((double) a / b));

        // 剰余演算子
        System.out.println("7 % 2 = " + (a % b));

        // オーバーフローに注意
        int maxInt = Integer.MAX_VALUE;
        System.out.println("MAX_VALUE: " + maxInt);
        System.out.println("MAX_VALUE + 1: " + (maxInt + 1));
    }
}`}
          expectedOutput={`7 / 2 = 3
7.0 / 2 = 3.5
7 % 2 = 1
MAX_VALUE: 2147483647
MAX_VALUE + 1: -2147483648`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点の精度</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">float</code> と <code className="text-orange-300">double</code> では精度が異なります。
          金額計算など正確な小数が必要な場合は <code className="text-orange-300">BigDecimal</code> を使います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        float f = 1.0f / 3.0f;
        double d = 1.0 / 3.0;

        System.out.println("float精度:  " + f);
        System.out.println("double精度: " + d);

        // 浮動小数点の誤差
        System.out.println("0.1 + 0.2 = " + (0.1 + 0.2));
        System.out.println("0.1 + 0.2 == 0.3? " + (0.1 + 0.2 == 0.3));
    }
}`}
          expectedOutput={`float精度:  0.33333334
double精度: 0.3333333333333333
0.1 + 0.2 = 0.30000000000000004
0.1 + 0.2 == 0.3? false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}
