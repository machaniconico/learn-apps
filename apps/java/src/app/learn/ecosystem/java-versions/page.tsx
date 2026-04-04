import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function JavaVersionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Javaバージョン</h1>
        <p className="text-gray-400">Java 8(Lambda/Stream)、11(var/HttpClient)、17(Sealed/Records)、21(VirtualThreads/PatternMatching)</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaのバージョン進化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaは6ヶ月ごとにリリースされ、LTS（Long-Term Support）バージョンが
          長期サポートされます。各バージョンで追加された主要機能を押さえましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Java 8（LTS） - Lambda、Stream API、Optional、LocalDate</li>
          <li>Java 11（LTS） - var、HttpClient、String新メソッド</li>
          <li>Java 17（LTS） - Sealed Classes、Records、Pattern Matching instanceof</li>
          <li>Java 21（LTS） - Virtual Threads、Pattern Matching switch、Record Patterns</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Java 8: Lambda と Stream</h2>
        <p className="text-gray-400 mb-4">
          Java 8はJavaの歴史で最も大きな変革をもたらしたバージョンです。
          関数型プログラミングのサポートが追加されました。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Java 8 の主要機能 ===");
        System.out.println();

        // Lambda式
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob");
        names.sort((a, b) -> a.compareTo(b));
        System.out.println("Lambda式でソート: " + names);

        // Stream API
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println("偶数の二乗: " + evenSquares);

        // メソッド参照
        names.forEach(System.out::println);
    }
}`}
          expectedOutput={`=== Java 8 の主要機能 ===

Lambda式でソート: [Alice, Bob, Charlie]
偶数の二乗: [4, 16, 36, 64, 100]
Alice
Bob
Charlie`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Java 11: var と便利メソッド</h2>
        <p className="text-gray-400 mb-4">
          Java 10で導入された <code className="text-orange-300">var</code>（ローカル変数型推論）や
          Java 11のString/Collection新メソッドで、コードがより簡潔になりました。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Java 11 の主要機能 ===");
        System.out.println();

        // var（ローカル変数型推論）Java 10+
        var message = "Hello, Java 11!";
        var numbers = List.of(1, 2, 3, 4, 5);
        System.out.println("var: " + message);
        System.out.println("var List: " + numbers);
        System.out.println();

        // String新メソッド（Java 11）
        System.out.println("isBlank: " + "  ".isBlank());        // true
        System.out.println("strip: [" + "  hello  ".strip() + "]");
        System.out.println("repeat: " + "Ha".repeat(3));

        // lines()でストリーム
        String multiline = "line1\\nline2\\nline3";
        multiline.lines().forEach(l -> System.out.println("  " + l));
    }
}`}
          expectedOutput={`=== Java 11 の主要機能 ===

var: Hello, Java 11!
var List: [1, 2, 3, 4, 5]

isBlank: true
strip: [hello]
repeat: HaHaHa
  line1
  line2
  line3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Java 17: Records と Sealed Classes</h2>
        <p className="text-gray-400 mb-4">
          Java 14のRecordsと16のSealed Classesが正式版となり、
          データ中心のプログラミングが強化されました。
        </p>
        <JavaEditor
          defaultCode={`// Record（Java 16正式）- 不変データクラスの簡潔な定義
record Point(int x, int y) {
    // コンストラクタ、getter、equals、hashCode、toString が自動生成
    double distanceTo(Point other) {
        return Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
    }
}

// Sealed Class（Java 17正式）- 継承を制限
sealed interface Shape permits Circle, Rect {
    double area();
}

record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

record Rect(double width, double height) implements Shape {
    public double area() { return width * height; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Record ===");
        var p1 = new Point(3, 4);
        var p2 = new Point(0, 0);
        System.out.println("p1: " + p1);
        System.out.println("距離: " + String.format("%.2f", p1.distanceTo(p2)));
        System.out.println();

        System.out.println("=== Sealed + Pattern Matching ===");
        Shape[] shapes = {new Circle(5), new Rect(4, 3)};
        for (Shape s : shapes) {
            // Pattern Matching instanceof（Java 16）
            if (s instanceof Circle c) {
                System.out.printf("円(半径%.0f) 面積: %.2f%n", c.radius(), c.area());
            } else if (s instanceof Rect r) {
                System.out.printf("四角(%.0fx%.0f) 面積: %.2f%n", r.width(), r.height(), r.area());
            }
        }
    }
}`}
          expectedOutput={`=== Record ===
p1: Point[x=3, y=4]
距離: 5.00

=== Sealed + Pattern Matching ===
円(半径5) 面積: 78.54
四角(4x3) 面積: 12.00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Java 21: Virtual Threads と Switch式</h2>
        <p className="text-gray-400 mb-4">
          Java 21はVirtual Threads（軽量スレッド）とPattern Matching for switchが正式版となった
          重要なLTSリリースです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // Pattern Matching for switch（Java 21正式）
    static String describe(Object obj) {
        return switch (obj) {
            case Integer i when i > 0 -> "正の整数: " + i;
            case Integer i -> "整数: " + i;
            case String s when s.length() > 5 -> "長い文字列: " + s;
            case String s -> "文字列: " + s;
            case null -> "null";
            default -> "その他: " + obj;
        };
    }

    public static void main(String[] args) {
        System.out.println("=== Pattern Matching switch ===");
        System.out.println(describe(42));
        System.out.println(describe(-5));
        System.out.println(describe("Hi"));
        System.out.println(describe("Hello World"));
        System.out.println(describe(null));
        System.out.println();

        System.out.println("=== Java 21 Virtual Threads ===");
        System.out.println("// 従来のスレッド");
        System.out.println("Thread.ofPlatform().start(() -> ...);");
        System.out.println();
        System.out.println("// Virtual Thread（軽量・大量生成可能）");
        System.out.println("Thread.ofVirtual().start(() -> ...);");
        System.out.println();
        System.out.println("// ExecutorServiceで使用");
        System.out.println("var executor = Executors.newVirtualThreadPerTaskExecutor();");
        System.out.println();
        System.out.println("特徴:");
        System.out.println("  - 100万スレッドも軽量に生成可能");
        System.out.println("  - I/O待ちで自動的にキャリアスレッドを解放");
        System.out.println("  - 既存コードの変更は最小限");
    }
}`}
          expectedOutput={`=== Pattern Matching switch ===
正の整数: 42
整数: -5
文字列: Hi
長い文字列: Hello World
null

=== Java 21 Virtual Threads ===
// 従来のスレッド
Thread.ofPlatform().start(() -> ...);

// Virtual Thread（軽量・大量生成可能）
Thread.ofVirtual().start(() -> ...);

// ExecutorServiceで使用
var executor = Executors.newVirtualThreadPerTaskExecutor();

特徴:
  - 100万スレッドも軽量に生成可能
  - I/O待ちで自動的にキャリアスレッドを解放
  - 既存コードの変更は最小限`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="java-versions" />
      </div>
      <LessonNav lessons={lessons} currentId="java-versions" basePath="/learn/ecosystem" />
    </div>
  );
}
