import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileWritePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル書き込み</h1>
        <p className="text-gray-400">BufferedWriter、Files.writeString、PrintWriterによるファイル書き込み</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル書き込みの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイルへの書き込みも複数の方法があります。
          新規作成、上書き、追記の違いを理解しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>BufferedWriter</code> - バッファリングされた書き込み</li>
          <li><code>Files.writeString()</code> - 文字列を直接書き込み（Java 11+）</li>
          <li><code>PrintWriter</code> - printlnなどのメソッドで書き込み</li>
          <li><code>StandardOpenOption.APPEND</code> - 追記モード</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BufferedWriterによる書き込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">BufferedWriter</code> はバッファリングにより効率的に書き込みます。
          try-with-resourcesで確実にフラッシュ・クローズされます。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("output.txt");

        // BufferedWriterで書き込み
        try (BufferedWriter bw = Files.newBufferedWriter(path)) {
            bw.write("1行目のデータ");
            bw.newLine();
            bw.write("2行目のデータ");
            bw.newLine();
            bw.write("3行目のデータ");
        }

        // 書き込み結果を確認
        System.out.println("--- 書き込み結果 ---");
        Files.readAllLines(path).forEach(System.out::println);

        Files.delete(path);
    }
}`}
          expectedOutput={`--- 書き込み結果 ---
1行目のデータ
2行目のデータ
3行目のデータ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Files.writeString と追記モード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Files.writeString()</code> でシンプルに書き込み、
          <code className="text-orange-300">StandardOpenOption.APPEND</code> で追記できます。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("log.txt");

        // 新規書き込み
        Files.writeString(path, "ログ開始\\n");

        // 追記モード (APPEND)
        Files.writeString(path, "INFO: アプリ起動\\n",
            StandardOpenOption.APPEND);
        Files.writeString(path, "INFO: ユーザーログイン\\n",
            StandardOpenOption.APPEND);
        Files.writeString(path, "WARN: メモリ使用率80%\\n",
            StandardOpenOption.APPEND);

        // 結果確認
        System.out.println("--- ログファイル ---");
        System.out.print(Files.readString(path));

        // Files.write でリストを書き込み
        Path path2 = Path.of("list.txt");
        var items = java.util.List.of("りんご", "バナナ", "みかん");
        Files.write(path2, items);

        System.out.println("--- リスト ---");
        Files.readAllLines(path2).forEach(System.out::println);

        Files.delete(path);
        Files.delete(path2);
    }
}`}
          expectedOutput={`--- ログファイル ---
ログ開始
INFO: アプリ起動
INFO: ユーザーログイン
WARN: メモリ使用率80%
--- リスト ---
りんご
バナナ
みかん`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PrintWriterによる書き込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">PrintWriter</code> はSystem.out.printlnと同じ感覚で
          ファイルに書き込めます。printfによるフォーマット出力も可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("report.txt");

        // PrintWriterで書き込み
        try (PrintWriter pw = new PrintWriter(Files.newBufferedWriter(path))) {
            pw.println("=== 成績表 ===");
            pw.printf("%-8s %5s %5s%n", "名前", "国語", "数学");
            pw.println("-".repeat(20));
            pw.printf("%-8s %5d %5d%n", "太郎", 85, 92);
            pw.printf("%-8s %5d %5d%n", "花子", 90, 78);
            pw.printf("%-8s %5d %5d%n", "次郎", 72, 88);
        }

        // 結果確認
        System.out.print(Files.readString(path));

        Files.delete(path);
    }
}`}
          expectedOutput={`=== 成績表 ===
名前           国語    数学
--------------------
太郎          85    92
花子          90    78
次郎          72    88`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="file-write" />
      </div>
      <LessonNav lessons={lessons} currentId="file-write" basePath="/learn/fileio" />
    </div>
  );
}
