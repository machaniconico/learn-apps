import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello World</h1>
        <p className="text-gray-400">最初のJavaプログラムを作成して実行する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaプログラムの基本構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaのプログラムはクラスの中にメソッドを書く構造になっています。
          すべてのJavaアプリケーションには <code className="text-orange-300">main</code> メソッドが必要で、
          これがプログラムのエントリーポイント（開始地点）になります。
          <code className="text-orange-300">System.out.println()</code> を使って文字列をコンソールに出力します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>public class Main</code> でクラスを定義する（ファイル名と一致させる）</li>
          <li><code>public static void main(String[] args)</code> がエントリーポイント</li>
          <li><code>System.out.println()</code> で改行付き出力、<code>System.out.print()</code> で改行なし出力</li>
          <li>文の末尾にはセミコロン <code>;</code> が必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なHello World</h2>
        <p className="text-gray-400 mb-4">
          最もシンプルなJavaプログラムです。<code className="text-orange-300">println</code> は print line の略で、
          出力後に自動的に改行されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
          expectedOutput={`Hello, World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数行の出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">println</code> を複数回呼び出すと、それぞれ改行されて出力されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("Javaへようこそ！");
        System.out.println("プログラミングを始めましょう。");
        System.out.println("楽しく学んでいきます。");
    }
}`}
          expectedOutput={`Javaへようこそ！
プログラミングを始めましょう。
楽しく学んでいきます。`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printとprintlnの違い</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">print</code> は改行なし、<code className="text-orange-300">println</code> は改行ありです。
          用途に応じて使い分けます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.print("Hello, ");
        System.out.print("Java!");
        System.out.println();  // 改行だけ出力
        System.out.println("次の行です。");
    }
}`}
          expectedOutput={`Hello, Java!
次の行です。`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
