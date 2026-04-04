import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function JvmPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JVM</h1>
        <p className="text-gray-400">JVM構造、クラスローダ、JIT、バイトコード</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JVM（Java Virtual Machine）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JVMはJavaバイトコードを実行する仮想マシンです。
          「Write Once, Run Anywhere」を実現する中核技術で、
          Javaだけでなく Kotlin、Scala、Groovyなども JVM上で動作します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Javaソースコード → コンパイラ → バイトコード(.class) → JVM実行</li>
          <li>クラスローダがクラスファイルをメモリにロード</li>
          <li>JIT（Just-In-Time）コンパイラでネイティブコードに変換</li>
          <li>GC（ガベージコレクタ）がメモリを自動管理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JVMの構造</h2>
        <p className="text-gray-400 mb-4">
          JVMの主要コンポーネントとメモリ領域を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== JVMアーキテクチャ ===");
        System.out.println();
        System.out.println("┌─────────────────────────────────┐");
        System.out.println("│           JVM                   │");
        System.out.println("│                                 │");
        System.out.println("│  ┌──────────────────────┐       │");
        System.out.println("│  │ クラスローダ           │       │");
        System.out.println("│  │ Bootstrap/Platform/App│       │");
        System.out.println("│  └──────────────────────┘       │");
        System.out.println("│           ↓                     │");
        System.out.println("│  ┌──────────────────────┐       │");
        System.out.println("│  │ ランタイムデータ領域     │       │");
        System.out.println("│  │ ・Method Area（メタデータ）│     │");
        System.out.println("│  │ ・Heap（オブジェクト）    │      │");
        System.out.println("│  │ ・Stack（メソッド呼出し） │      │");
        System.out.println("│  │ ・PC Register           │    │");
        System.out.println("│  │ ・Native Method Stack   │    │");
        System.out.println("│  └──────────────────────┘       │");
        System.out.println("│           ↓                     │");
        System.out.println("│  ┌──────────────────────┐       │");
        System.out.println("│  │ 実行エンジン            │       │");
        System.out.println("│  │ ・インタプリタ           │       │");
        System.out.println("│  │ ・JITコンパイラ         │       │");
        System.out.println("│  │ ・GC                   │     │");
        System.out.println("│  └──────────────────────┘       │");
        System.out.println("└─────────────────────────────────┘");
    }
}`}
          expectedOutput={`=== JVMアーキテクチャ ===

┌─────────────────────────────────┐
│           JVM                   │
│                                 │
│  ┌──────────────────────┐       │
│  │ クラスローダ           │       │
│  │ Bootstrap/Platform/App│       │
│  └──────────────────────┘       │
│           ↓                     │
│  ┌──────────────────────┐       │
│  │ ランタイムデータ領域     │       │
│  │ ・Method Area（メタデータ）│     │
│  │ ・Heap（オブジェクト）    │      │
│  │ ・Stack（メソッド呼出し） │      │
│  │ ・PC Register           │    │
│  │ ・Native Method Stack   │    │
│  └──────────────────────┘       │
│           ↓                     │
│  ┌──────────────────────┐       │
│  │ 実行エンジン            │       │
│  │ ・インタプリタ           │       │
│  │ ・JITコンパイラ         │       │
│  │ ・GC                   │     │
│  └──────────────────────┘       │
└─────────────────────────────────┘`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メモリ領域の確認</h2>
        <p className="text-gray-400 mb-4">
          JVMのメモリ設定と実行時の状態をプログラムで確認できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        System.out.println("=== JVMメモリ情報 ===");
        System.out.printf("最大メモリ:   %d MB%n", runtime.maxMemory() / 1024 / 1024);
        System.out.printf("合計メモリ:   %d MB%n", runtime.totalMemory() / 1024 / 1024);
        System.out.printf("空きメモリ:   %d MB%n", runtime.freeMemory() / 1024 / 1024);
        System.out.printf("使用メモリ:   %d MB%n",
            (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024);
        System.out.println();

        System.out.println("=== JVM起動オプション ===");
        System.out.println("-Xms256m     初期ヒープサイズ");
        System.out.println("-Xmx1024m    最大ヒープサイズ");
        System.out.println("-Xss512k     スレッドスタックサイズ");
        System.out.println("-XX:MaxMetaspaceSize=256m  メタスペース上限");
        System.out.println();

        System.out.println("=== メモリ領域の説明 ===");
        System.out.println("Heap   - オブジェクトの格納（GC対象）");
        System.out.println("Stack  - メソッド呼出しのフレーム（スレッドごと）");
        System.out.println("Method - クラス情報、static変数（Metaspace）");
    }
}`}
          expectedOutput={`=== JVMメモリ情報 ===
最大メモリ:   X MB
合計メモリ:   X MB
空きメモリ:   X MB
使用メモリ:   X MB

=== JVM起動オプション ===
-Xms256m     初期ヒープサイズ
-Xmx1024m    最大ヒープサイズ
-Xss512k     スレッドスタックサイズ
-XX:MaxMetaspaceSize=256m  メタスペース上限

=== メモリ領域の説明 ===
Heap   - オブジェクトの格納（GC対象）
Stack  - メソッド呼出しのフレーム（スレッドごと）
Method - クラス情報、static変数（Metaspace）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JITコンパイラとバイトコード</h2>
        <p className="text-gray-400 mb-4">
          JITコンパイラはよく実行されるコード（ホットスポット）をネイティブコードに変換して高速化します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== コンパイルから実行まで ===");
        System.out.println();
        System.out.println("1. Main.java  (ソースコード)");
        System.out.println("       ↓ javac (コンパイラ)");
        System.out.println("2. Main.class (バイトコード)");
        System.out.println("       ↓ java (JVM起動)");
        System.out.println("3. インタプリタで逐次実行開始");
        System.out.println("       ↓ ホットスポット検出");
        System.out.println("4. JITコンパイラでネイティブコード化");
        System.out.println("       ↓ 以降は高速実行");
        System.out.println();

        System.out.println("=== JITコンパイラの種類 ===");
        System.out.println("C1（クライアント）: 起動が速い、最適化は控えめ");
        System.out.println("C2（サーバー）:     起動は遅い、高度な最適化");
        System.out.println("Tiered Compilation: C1→C2の段階的最適化（デフォルト）");
        System.out.println();

        System.out.println("=== バイトコードの確認 ===");
        System.out.println("javap -c Main.class でバイトコード表示");
        System.out.println("  0: getstatic System.out");
        System.out.println("  3: ldc \"Hello\"");
        System.out.println("  5: invokevirtual println");
    }
}`}
          expectedOutput={`=== コンパイルから実行まで ===

1. Main.java  (ソースコード)
       ↓ javac (コンパイラ)
2. Main.class (バイトコード)
       ↓ java (JVM起動)
3. インタプリタで逐次実行開始
       ↓ ホットスポット検出
4. JITコンパイラでネイティブコード化
       ↓ 以降は高速実行

=== JITコンパイラの種類 ===
C1（クライアント）: 起動が速い、最適化は控えめ
C2（サーバー）:     起動は遅い、高度な最適化
Tiered Compilation: C1→C2の段階的最適化（デフォルト）

=== バイトコードの確認 ===
javap -c Main.class でバイトコード表示
  0: getstatic System.out
  3: ldc "Hello"
  5: invokevirtual println`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="jvm" />
      </div>
      <LessonNav lessons={lessons} currentId="jvm" basePath="/learn/ecosystem" />
    </div>
  );
}
