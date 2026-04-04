import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function LambdaBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ラムダ式 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラムダ式の基本</h1>
        <p className="text-gray-400">(params) -&gt; expression と (params) -&gt; &#123; statements &#125; の構文を学ぶ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ラムダ式はJava 8で導入された、匿名関数を簡潔に記述するための構文です。
          関数型インターフェースの実装を1行で書くことができ、コードの可読性と簡潔さが大幅に向上します。
          従来の匿名クラスを置き換える形で、特にコレクション操作やイベント処理で多用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>(引数) -&gt; 式</code> の形式で単一の式を返す</li>
          <li><code>(引数) -&gt; &#123; 文; &#125;</code> の形式で複数の文を記述</li>
          <li>引数の型は推論可能な場合は省略できる</li>
          <li>引数が1つの場合は括弧を省略できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なラムダ式</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Runnable</code> インターフェースをラムダ式で実装する最もシンプルな例です。
          匿名クラスと比較すると、コードが大幅に短くなります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 従来の匿名クラス
        Runnable oldStyle = new Runnable() {
            @Override
            public void run() {
                System.out.println("匿名クラス");
            }
        };

        // ラムダ式
        Runnable newStyle = () -> System.out.println("ラムダ式");

        oldStyle.run();
        newStyle.run();
    }
}`}
          expectedOutput={`匿名クラス
ラムダ式`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">引数付きラムダ式</h2>
        <p className="text-gray-400 mb-4">
          引数を受け取るラムダ式では、型推論により引数の型を省略できます。
          引数が1つの場合は括弧も省略可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // 型を明示
        names.forEach((String name) -> System.out.println("Hello, " + name));

        System.out.println("---");

        // 型推論で省略（引数1つなので括弧も省略）
        names.forEach(name -> System.out.println("Hi, " + name));
    }
}`}
          expectedOutput={`Hello, Alice
Hello, Bob
Hello, Charlie
---
Hi, Alice
Hi, Bob
Hi, Charlie`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ブロック構文のラムダ式</h2>
        <p className="text-gray-400 mb-4">
          複数の文を実行する場合は、波括弧 <code className="text-orange-300">&#123; &#125;</code> で囲みます。
          値を返す場合は明示的に <code className="text-orange-300">return</code> を記述します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // 式形式（1行）
        Function<Integer, Integer> doubleIt = x -> x * 2;

        // ブロック形式（複数行）
        Function<Integer, String> describe = x -> {
            String result;
            if (x > 0) {
                result = x + "は正の数";
            } else if (x < 0) {
                result = x + "は負の数";
            } else {
                result = "ゼロ";
            }
            return result;
        };

        System.out.println(doubleIt.apply(5));
        System.out.println(describe.apply(3));
        System.out.println(describe.apply(-1));
        System.out.println(describe.apply(0));
    }
}`}
          expectedOutput={`10
3は正の数
-1は負の数
ゼロ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/lambda" />
    </div>
  );
}
