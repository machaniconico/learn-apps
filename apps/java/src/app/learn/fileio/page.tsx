import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "BufferedReaderの利点として正しいものはどれですか？",
    options: [
      "バッファリングにより読み込み効率が向上し、readLine()で1行ずつ読める",
      "ファイルに書き込みができる",
      "バイナリファイルの処理に特化している",
      "ネットワーク通信専用のクラスである",
    ],
    answer: 0,
    explanation: "BufferedReaderは内部バッファを使って読み込みを効率化します。readLine()メソッドで1行単位の読み込みが可能で、テキストファイルの処理に便利です。",
  },
  {
    question: "Files.readString()メソッドについて正しいものはどれですか？",
    options: [
      "Java 11で追加された、ファイル全体を一度にStringとして読み込むメソッド",
      "Java 8で追加されたメソッド",
      "1行ずつ読み込むメソッド",
      "バイナリファイル専用のメソッド",
    ],
    answer: 0,
    explanation: "Files.readString()はJava 11で追加されたメソッドで、Pathを引数にファイル全体の内容をStringとして返します。小さなファイルの読み込みに便利です。",
  },
  {
    question: "java.nio.file.Pathについて正しいものはどれですか？",
    options: [
      "ファイルやディレクトリのパスを表すオブジェクトで、Paths.get()やPath.of()で生成する",
      "Fileクラスの別名である",
      "ファイルの内容を保持するクラスである",
      "ストリームの一種である",
    ],
    answer: 0,
    explanation: "PathはJava NIO.2で導入されたファイルパスを表すインターフェースです。Paths.get()やPath.of()（Java 11以降）で生成し、Filesクラスと組み合わせて使います。",
  },
  {
    question: "Javaのシリアライゼーションについて正しいものはどれですか？",
    options: [
      "Serializableインターフェースを実装したオブジェクトをバイトストリームに変換する仕組み",
      "テキストファイルへの書き込み方法の一つ",
      "JSONパースの仕組みである",
      "データベース接続の方法である",
    ],
    answer: 0,
    explanation: "シリアライゼーションはSerializableを実装したオブジェクトをバイト列に変換し、ファイルやネットワーク経由で転送可能にする仕組みです。ObjectOutputStream/ObjectInputStreamを使います。",
  },
];

export default function FileioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">ファイルI/O</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          JavaのファイルI/Oを学びましょう。NIO.2によるモダンなファイル操作、BufferedReader/Writerによるテキスト処理、
          Pathクラスの活用、そしてシリアライゼーションによるオブジェクトの永続化を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="indigo" categoryId="fileio" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NIOによるファイル読み書き</h2>
        <p className="text-gray-400 mb-4">
          Java NIO.2のFilesクラスとPathを使ったモダンなファイル操作を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.nio.file.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Pathの生成
        System.out.println("=== Pathの操作 ===");
        Path path = Path.of("src", "main", "App.java");
        System.out.println("パス: " + path);
        System.out.println("ファイル名: " + path.getFileName());
        System.out.println("親ディレクトリ: " + path.getParent());
        System.out.println("要素数: " + path.getNameCount());

        // Files APIの主要メソッド紹介
        System.out.println();
        System.out.println("=== Files APIの主要メソッド ===");
        System.out.println("Files.readString(path)     - ファイル全体を文字列で読む");
        System.out.println("Files.readAllLines(path)   - 全行をListで読む");
        System.out.println("Files.writeString(path, s) - 文字列を書き込む");
        System.out.println("Files.lines(path)          - Streamで遅延読み込み");
        System.out.println("Files.exists(path)         - 存在チェック");
        System.out.println("Files.copy(src, dst)       - コピー");

        // 文字列のI/Oシミュレーション
        System.out.println();
        System.out.println("=== テキスト処理の例 ===");
        String content = "Java\\nPython\\nTypeScript\\nRust\\nGo";
        String[] lines = content.split("\\\\n");
        System.out.println("行数: " + lines.length);
        for (int i = 0; i < lines.length; i++) {
            System.out.println((i + 1) + ": " + lines[i]);
        }
    }
}`}
          expectedOutput={`=== Pathの操作 ===
パス: src/main/App.java
ファイル名: App.java
親ディレクトリ: src/main
要素数: 3

=== Files APIの主要メソッド ===
Files.readString(path)     - ファイル全体を文字列で読む
Files.readAllLines(path)   - 全行をListで読む
Files.writeString(path, s) - 文字列を書き込む
Files.lines(path)          - Streamで遅延読み込み
Files.exists(path)         - 存在チェック
Files.copy(src, dst)       - コピー

=== テキスト処理の例 ===
行数: 5
1: Java
2: Python
3: TypeScript
4: Rust
5: Go`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONライクなデータ処理</h2>
        <p className="text-gray-400 mb-4">
          Mapを使ったキーバリュー形式のデータ処理を体験しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    // シンプルなキーバリューパーサー
    static Map<String, String> parseKeyValue(String data) {
        Map<String, String> map = new LinkedHashMap<>();
        String[] lines = data.split("\\n");
        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty() || line.startsWith("#")) continue;
            String[] parts = line.split("=", 2);
            if (parts.length == 2) {
                map.put(parts[0].trim(), parts[1].trim());
            }
        }
        return map;
    }

    // Mapをフォーマットして出力
    static String toFormattedString(Map<String, String> map) {
        StringBuilder sb = new StringBuilder();
        sb.append("{\\n");
        int i = 0;
        for (var entry : map.entrySet()) {
            sb.append("  \\"").append(entry.getKey()).append("\\": \\"")
              .append(entry.getValue()).append("\\"");
            if (i < map.size() - 1) sb.append(",");
            sb.append("\\n");
            i++;
        }
        sb.append("}");
        return sb.toString();
    }

    public static void main(String[] args) {
        String config = """
                # アプリ設定
                name = JavaLearnApp
                version = 1.0.0
                language = ja
                theme = dark
                """;

        System.out.println("=== 設定ファイルのパース ===");
        Map<String, String> settings = parseKeyValue(config);
        System.out.println("読み込んだ設定数: " + settings.size());

        System.out.println();
        System.out.println("=== JSON風の出力 ===");
        System.out.println(toFormattedString(settings));

        System.out.println();
        System.out.println("=== 個別アクセス ===");
        System.out.println("アプリ名: " + settings.get("name"));
        System.out.println("バージョン: " + settings.get("version"));
    }
}`}
          expectedOutput={`=== 設定ファイルのパース ===
読み込んだ設定数: 4

=== JSON風の出力 ===
{
  "name": "JavaLearnApp",
  "version": "1.0.0",
  "language": "ja",
  "theme": "dark"
}

=== 個別アクセス ===
アプリ名: JavaLearnApp
バージョン: 1.0.0`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
