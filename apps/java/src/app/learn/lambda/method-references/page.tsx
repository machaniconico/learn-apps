import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function MethodReferencesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ラムダ式 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッド参照</h1>
        <p className="text-gray-400">ClassName::method, object::method, ClassName::new の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッド参照とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッド参照は、既存のメソッドをラムダ式の代わりに直接渡す構文です。
          <code className="text-orange-300">::</code> 演算子を使い、ラムダ式よりもさらに簡潔に記述できます。
          メソッド参照はラムダ式のシンタックスシュガーであり、同じ関数型インターフェースに変換されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>ClassName::staticMethod</code> — 静的メソッド参照</li>
          <li><code>object::instanceMethod</code> — インスタンスメソッド参照</li>
          <li><code>ClassName::instanceMethod</code> — 任意オブジェクトのインスタンスメソッド参照</li>
          <li><code>ClassName::new</code> — コンストラクタ参照</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">静的メソッド参照</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ClassName::staticMethod</code> で静的メソッドを関数型インターフェースとして渡せます。
          ラムダ式 <code className="text-orange-300">x -&gt; ClassName.method(x)</code> と同等です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> numberStrs = Arrays.asList("1", "2", "3", "4", "5");

        // ラムダ式
        List<Integer> nums1 = numberStrs.stream()
            .map(s -> Integer.parseInt(s))
            .collect(Collectors.toList());
        System.out.println("ラムダ: " + nums1);

        // メソッド参照（静的メソッド）
        List<Integer> nums2 = numberStrs.stream()
            .map(Integer::parseInt)
            .collect(Collectors.toList());
        System.out.println("メソッド参照: " + nums2);
    }
}`}
          expectedOutput={`ラムダ: [1, 2, 3, 4, 5]
メソッド参照: [1, 2, 3, 4, 5]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インスタンスメソッド参照</h2>
        <p className="text-gray-400 mb-4">
          特定のオブジェクトのメソッドを参照する場合と、
          任意のオブジェクトのメソッドを参照する場合の2パターンがあります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("Java", "Lambda", "Stream");

        // 任意のオブジェクトのインスタンスメソッド参照
        // s -> s.toUpperCase() と同等
        words.stream()
            .map(String::toUpperCase)
            .forEach(System.out::println);

        System.out.println("---");

        // 特定オブジェクトのインスタンスメソッド参照
        String prefix = "言語: ";
        words.stream()
            .map(prefix::concat)
            .forEach(System.out::println);
    }
}`}
          expectedOutput={`JAVA
LAMBDA
STREAM
---
言語: Java
言語: Lambda
言語: Stream`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタ参照</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ClassName::new</code> でコンストラクタを関数型インターフェースとして渡せます。
          ファクトリパターンやStreamでのオブジェクト生成に便利です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // コンストラクタ参照でStringBuilderを生成
        List<StringBuilder> builders = names.stream()
            .map(StringBuilder::new)
            .collect(Collectors.toList());

        builders.forEach(sb -> {
            sb.reverse();
            System.out.println(sb);
        });
    }
}`}
          expectedOutput={`ecilA
boB
eilrahC`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="method-references" />
      </div>
      <LessonNav lessons={lessons} currentId="method-references" basePath="/learn/lambda" />
    </div>
  );
}
