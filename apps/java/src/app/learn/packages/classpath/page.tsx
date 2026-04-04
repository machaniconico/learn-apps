import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function ClasspathPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パッケージ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスパス</h1>
        <p className="text-gray-400">-cp、CLASSPATH、クラスローディング</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クラスパスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスパスは、JVMがクラスファイルやJARファイルを探索する場所を指定する仕組みです。
          コンパイル時と実行時にそれぞれクラスパスを指定できます。
          MavenやGradleを使う場合は通常自動管理されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>-cp</code>（<code>-classpath</code>）オプションでコマンドラインから指定</li>
          <li><code>CLASSPATH</code> 環境変数で設定（非推奨）</li>
          <li>区切り文字: Windows = <code>;</code>、macOS/Linux = <code>:</code></li>
          <li>カレントディレクトリ <code>.</code> はデフォルトで含まれる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスパスの指定方法</h2>
        <p className="text-gray-400 mb-4">
          コマンドラインでのクラスパス指定方法を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== クラスパスの指定方法 ===");
        System.out.println();

        System.out.println("【コンパイル時】");
        System.out.println("javac -cp lib/gson-2.10.jar:. Main.java");
        System.out.println();

        System.out.println("【実行時】");
        System.out.println("java -cp lib/gson-2.10.jar:. Main");
        System.out.println();

        System.out.println("【複数のJARを指定】");
        System.out.println("java -cp lib/a.jar:lib/b.jar:. Main");
        System.out.println();

        System.out.println("【ワイルドカード（JARディレクトリ）】");
        System.out.println("java -cp lib/*:. Main");
        System.out.println("→ lib/ 内の全JARを含む");
        System.out.println();

        System.out.println("注意: *.jar ではなく * を使う");
        System.out.println("注意: Windowsでは : の代わりに ; を使う");
    }
}`}
          expectedOutput={`=== クラスパスの指定方法 ===

【コンパイル時】
javac -cp lib/gson-2.10.jar:. Main.java

【実行時】
java -cp lib/gson-2.10.jar:. Main

【複数のJARを指定】
java -cp lib/a.jar:lib/b.jar:. Main

【ワイルドカード（JARディレクトリ）】
java -cp lib/*:. Main
→ lib/ 内の全JARを含む

注意: *.jar ではなく * を使う
注意: Windowsでは : の代わりに ; を使う`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスローダの階層</h2>
        <p className="text-gray-400 mb-4">
          JVMは階層的なクラスローダを使ってクラスをロードします。
          親クラスローダから順番に探索する「委譲モデル」が基本です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== クラスローダの階層 ===");
        System.out.println();
        System.out.println("Bootstrap ClassLoader（最上位）");
        System.out.println("  → java.lang, java.util 等のコアAPI");
        System.out.println("  │");
        System.out.println("Platform ClassLoader");
        System.out.println("  → java.sql, java.xml 等の拡張API");
        System.out.println("  │");
        System.out.println("Application ClassLoader");
        System.out.println("  → クラスパス上のクラス（ユーザーコード）");
        System.out.println();

        // 実際にクラスローダを確認
        ClassLoader cl = Main.class.getClassLoader();
        System.out.println("=== 実際のクラスローダ ===");
        System.out.println("Main のローダ: " + cl);
        System.out.println("String のローダ: " + String.class.getClassLoader());
        System.out.println("→ null = Bootstrap ClassLoader");
    }
}`}
          expectedOutput={`=== クラスローダの階層 ===

Bootstrap ClassLoader（最上位）
  → java.lang, java.util 等のコアAPI
  │
Platform ClassLoader
  → java.sql, java.xml 等の拡張API
  │
Application ClassLoader
  → クラスパス上のクラス（ユーザーコード）

=== 実際のクラスローダ ===
Main のローダ: jdk.internal.loader.ClassLoaders$AppClassLoader@X
String のローダ: null
→ null = Bootstrap ClassLoader`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よくあるクラスパスの問題</h2>
        <p className="text-gray-400 mb-4">
          クラスパス関連のエラーはJava開発で頻出します。原因と対処法を押さえましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== よくあるクラスパスエラー ===");
        System.out.println();

        String[][] errors = {
            {"ClassNotFoundException",
             "クラスが見つからない",
             "JARがクラスパスに含まれているか確認"},
            {"NoClassDefFoundError",
             "コンパイル時には存在したが実行時にない",
             "実行時のクラスパスを確認"},
            {"NoSuchMethodError",
             "メソッドが見つからない",
             "JARのバージョン不一致を確認"},
            {"LinkageError",
             "クラスの互換性エラー",
             "依存JARのバージョン競合を解消"}
        };

        for (String[] err : errors) {
            System.out.println("【" + err[0] + "】");
            System.out.println("  症状: " + err[1]);
            System.out.println("  対処: " + err[2]);
            System.out.println();
        }

        System.out.println("TIP: mvn dependency:tree で依存関係を可視化");
    }
}`}
          expectedOutput={`=== よくあるクラスパスエラー ===

【ClassNotFoundException】
  症状: クラスが見つからない
  対処: JARがクラスパスに含まれているか確認

【NoClassDefFoundError】
  症状: コンパイル時には存在したが実行時にない
  対処: 実行時のクラスパスを確認

【NoSuchMethodError】
  症状: メソッドが見つからない
  対処: JARのバージョン不一致を確認

【LinkageError】
  症状: クラスの互換性エラー
  対処: 依存JARのバージョン競合を解消

TIP: mvn dependency:tree で依存関係を可視化`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="classpath" />
      </div>
      <LessonNav lessons={lessons} currentId="classpath" basePath="/learn/packages" />
    </div>
  );
}
