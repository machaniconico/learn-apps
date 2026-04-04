import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsVarargsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変長引数</h1>
        <p className="text-gray-400">可変長引数（varargs）を使って柔軟なメソッドを定義する方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数（varargs）とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          可変長引数（Variable Arguments）は、メソッドに任意の個数の引数を渡せる機能です。
          型名の後に「...」を付けて宣言し、メソッド内部では配列として扱われます。
          引数を0個から任意の数だけ渡すことができ、配列をそのまま渡すことも可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>宣言: 型名... 変数名（例: int... nums）</li>
          <li>メソッド内部では配列として扱う</li>
          <li>可変長引数はメソッドの最後の引数にのみ指定可能</li>
          <li>1つのメソッドに可変長引数は1つだけ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な可変長引数</h2>
        <p className="text-gray-400 mb-4">任意の数の整数を受け取って処理するメソッドを作成します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static int sum(int... nums) {
        int total = 0;
        for (int n : nums) {
            total += n;
        }
        return total;
    }

    static int max(int... nums) {
        if (nums.length == 0) return 0;
        int result = nums[0];
        for (int n : nums) {
            if (n > result) result = n;
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("sum()        = " + sum());
        System.out.println("sum(1,2)     = " + sum(1, 2));
        System.out.println("sum(1,2,3,4) = " + sum(1, 2, 3, 4));

        System.out.println("max(3,7,2)   = " + max(3, 7, 2));
        System.out.println("max(10,5,8,1)= " + max(10, 5, 8, 1));
    }
}`}
          expectedOutput={`sum()        = 0
sum(1,2)     = 3
sum(1,2,3,4) = 10
max(3,7,2)   = 7
max(10,5,8,1)= 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">通常の引数と可変長引数の組み合わせ</h2>
        <p className="text-gray-400 mb-4">通常の引数と可変長引数を一緒に使う場合、可変長引数は最後に指定します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 通常引数 + 可変長引数
    static String join(String separator, String... items) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < items.length; i++) {
            if (i > 0) sb.append(separator);
            sb.append(items[i]);
        }
        return sb.toString();
    }

    // ラベル付きで値を表示
    static void printLabeled(String label, int... values) {
        StringBuilder sb = new StringBuilder(label + ": ");
        for (int i = 0; i < values.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append(values[i]);
        }
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        System.out.println(join("-", "2024", "01", "15"));
        System.out.println(join(", ", "Java", "Python", "Go"));
        System.out.println(join(" + ", "1", "2", "3"));

        printLabeled("スコア", 80, 90, 75, 85);
        printLabeled("ID", 101, 102);
    }
}`}
          expectedOutput={`2024-01-15
Java, Python, Go
1 + 2 + 3
スコア: 80, 90, 75, 85
ID: 101, 102`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">String型の可変長引数</h2>
        <p className="text-gray-400 mb-4">文字列の可変長引数を使って、柔軟なテキスト処理メソッドを作ります。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static String buildTag(String tag, String... attributes) {
        StringBuilder sb = new StringBuilder("<" + tag);
        for (String attr : attributes) {
            sb.append(" ").append(attr);
        }
        sb.append(">");
        return sb.toString();
    }

    static int countTotal(String... words) {
        int total = 0;
        for (String w : words) {
            total += w.length();
        }
        return total;
    }

    public static void main(String[] args) {
        System.out.println(buildTag("div"));
        System.out.println(buildTag("input", "type=\\"text\\"", "name=\\"user\\""));
        System.out.println(buildTag("a", "href=\\"/\\"", "class=\\"link\\""));

        System.out.println("---");
        System.out.println("合計文字数: " + countTotal("Hello", "World"));
        System.out.println("合計文字数: " + countTotal("Java", "is", "fun"));
    }
}`}
          expectedOutput={`<div>
<input type="text" name="user">
<a href="/" class="link">
---
合計文字数: 10
合計文字数: 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="varargs" />
      </div>
      <LessonNav lessons={lessons} currentId="varargs" basePath="/learn/methods" />
    </div>
  );
}
