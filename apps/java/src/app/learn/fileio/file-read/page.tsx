import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileReadPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル読み込み</h1>
        <p className="text-gray-400">BufferedReader、Files.readString(Java 11+)、Files.readAllLinesの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル読み込みの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaにはファイルを読み込む方法が複数あります。
          用途に応じて適切な方法を選びましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>BufferedReader</code> - 行単位の読み込み（大きなファイル向き）</li>
          <li><code>Files.readString()</code> - ファイル全体を文字列として読み込み（Java 11+）</li>
          <li><code>Files.readAllLines()</code> - 全行をListとして読み込み</li>
          <li><code>Scanner</code> - 区切り文字でパースしながら読み込み</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BufferedReaderによる行単位の読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">BufferedReader</code> は大きなファイルを効率的に行単位で読み込みます。
          try-with-resourcesで自動的にクローズされます。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // テスト用ファイルを作成
        try (PrintWriter writer = new PrintWriter("test.txt")) {
            writer.println("1行目: Hello");
            writer.println("2行目: Java");
            writer.println("3行目: World");
        }

        // BufferedReaderで読み込み
        System.out.println("--- BufferedReader ---");
        try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
            String line;
            int lineNum = 1;
            while ((line = br.readLine()) != null) {
                System.out.println("行" + lineNum + ": " + line);
                lineNum++;
            }
        }

        // 後片付け
        new File("test.txt").delete();
    }
}`}
          expectedOutput={`--- BufferedReader ---
行1: 1行目: Hello
行2: 2行目: Java
行3: 3行目: World`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Files.readString と Files.readAllLines</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Files.readString()</code> はファイル全体を一度に読み込み、
          <code className="text-orange-300">Files.readAllLines()</code> は行のリストとして読み込みます。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;
import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        // テスト用ファイル作成
        Path path = Path.of("sample.txt");
        Files.writeString(path, "りんご\\nバナナ\\nみかん\\n");

        // Files.readString (Java 11+) - 全体を文字列として読み込み
        System.out.println("--- Files.readString ---");
        String content = Files.readString(path);
        System.out.println("内容: " + content.replace("\\n", ", ").trim());
        System.out.println("文字数: " + content.length());

        // Files.readAllLines - 行のリストとして読み込み
        System.out.println("--- Files.readAllLines ---");
        List<String> lines = Files.readAllLines(path);
        System.out.println("行数: " + lines.size());
        for (int i = 0; i < lines.size(); i++) {
            System.out.println("[" + i + "] " + lines.get(i));
        }

        // 後片付け
        Files.delete(path);
    }
}`}
          expectedOutput={`--- Files.readString ---
内容: りんご, バナナ, みかん,
文字数: 12
--- Files.readAllLines ---
行数: 3
[0] りんご
[1] バナナ
[2] みかん`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Streamを使ったファイル読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Files.lines()</code> はStreamとして行を読み込むため、
          フィルタリングや変換と組み合わせて効率的に処理できます。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;
import java.nio.file.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // テスト用CSVファイル作成
        Path path = Path.of("data.csv");
        Files.writeString(path, "name,score\\nAlice,85\\nBob,92\\nCharlie,78\\nDiana,95\\n");

        // Files.lines() + Stream API
        System.out.println("--- スコアが80以上の人 ---");
        try (Stream<String> stream = Files.lines(path)) {
            stream.skip(1)  // ヘッダーをスキップ
                  .filter(line -> {
                      String[] parts = line.split(",");
                      return parts.length == 2 && Integer.parseInt(parts[1]) >= 80;
                  })
                  .forEach(line -> {
                      String[] parts = line.split(",");
                      System.out.println(parts[0] + ": " + parts[1] + "点");
                  });
        }

        // 行数のカウント
        long lineCount = Files.lines(path).count();
        System.out.println("全行数(ヘッダ含む): " + lineCount);

        Files.delete(path);
    }
}`}
          expectedOutput={`--- スコアが80以上の人 ---
Alice: 85点
Bob: 92点
Diana: 95点
全行数(ヘッダ含む): 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="file-read" />
      </div>
      <LessonNav lessons={lessons} currentId="file-read" basePath="/learn/fileio" />
    </div>
  );
}
