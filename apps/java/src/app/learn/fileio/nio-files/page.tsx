import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function NioFilesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NIO Files</h1>
        <p className="text-gray-400">Files.exists、copy、move、delete、walkの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">java.nio.file.Files クラス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">Files</code> クラスはファイルやディレクトリの操作に必要な
          静的メソッドを豊富に提供しています。Java 7で導入されたNIO.2 APIの中核です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Files.exists(path)</code> - ファイルの存在確認</li>
          <li><code>Files.copy(src, dst)</code> - ファイルのコピー</li>
          <li><code>Files.move(src, dst)</code> - ファイルの移動・リネーム</li>
          <li><code>Files.delete(path)</code> - ファイルの削除</li>
          <li><code>Files.walk(path)</code> - ディレクトリツリーの走査</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの存在確認と属性</h2>
        <p className="text-gray-400 mb-4">
          ファイル操作の前に存在確認やサイズ・種類のチェックを行いましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path file = Path.of("test.txt");
        Path dir = Path.of("testdir");

        // ファイルを作成
        Files.writeString(file, "Hello, NIO!");
        Files.createDirectories(dir);

        // 存在確認
        System.out.println("test.txt 存在: " + Files.exists(file));
        System.out.println("testdir 存在: " + Files.exists(dir));
        System.out.println("nothing 存在: " + Files.exists(Path.of("nothing")));

        // ファイルかディレクトリか
        System.out.println("test.txt はファイル: " + Files.isRegularFile(file));
        System.out.println("testdir はディレクトリ: " + Files.isDirectory(dir));

        // サイズ
        System.out.println("test.txt サイズ: " + Files.size(file) + " bytes");

        // 後片付け
        Files.delete(file);
        Files.delete(dir);
    }
}`}
          expectedOutput={`test.txt 存在: true
testdir 存在: true
nothing 存在: false
test.txt はファイル: true
testdir はディレクトリ: true
test.txt サイズ: 11 bytes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルのコピーと移動</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Files.copy()</code> でコピー、
          <code className="text-orange-300">Files.move()</code> で移動・リネームができます。
        </p>
        <JavaEditor
          defaultCode={`import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        // 元ファイルを作成
        Path original = Path.of("original.txt");
        Files.writeString(original, "元のファイルです");

        // コピー
        Path copied = Path.of("copied.txt");
        Files.copy(original, copied);
        System.out.println("コピー完了");
        System.out.println("original: " + Files.readString(original));
        System.out.println("copied: " + Files.readString(copied));

        // 移動（リネーム）
        Path renamed = Path.of("renamed.txt");
        Files.move(copied, renamed);
        System.out.println("移動完了");
        System.out.println("copied 存在: " + Files.exists(copied));
        System.out.println("renamed: " + Files.readString(renamed));

        // 上書きコピー（REPLACE_EXISTING）
        Files.copy(original, renamed, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("上書きコピー完了");

        // 後片付け
        Files.delete(original);
        Files.delete(renamed);
    }
}`}
          expectedOutput={`コピー完了
original: 元のファイルです
copied: 元のファイルです
移動完了
copied 存在: false
renamed: 元のファイルです
上書きコピー完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ディレクトリツリーの走査</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Files.walk()</code> でディレクトリ内のファイルを再帰的に走査できます。
          <code className="text-orange-300">Files.list()</code> は直下のみ走査します。
        </p>
        <JavaEditor
          defaultCode={`import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        // テスト用ディレクトリ構造を作成
        Files.createDirectories(Path.of("project/src"));
        Files.createDirectories(Path.of("project/lib"));
        Files.writeString(Path.of("project/README.md"), "readme");
        Files.writeString(Path.of("project/src/Main.java"), "main");
        Files.writeString(Path.of("project/src/Utils.java"), "utils");
        Files.writeString(Path.of("project/lib/dep.jar"), "jar");

        // Files.walk: 再帰的に全ファイル/ディレクトリを走査
        System.out.println("--- Files.walk ---");
        try (Stream<Path> stream = Files.walk(Path.of("project"))) {
            stream.sorted().forEach(p -> {
                String indent = "  ".repeat(p.getNameCount() - 1);
                String type = Files.isDirectory(p) ? "[DIR]" : "[FILE]";
                System.out.println(indent + type + " " + p.getFileName());
            });
        }

        // Files.list: 直下のみ
        System.out.println("--- Files.list (直下のみ) ---");
        try (Stream<Path> stream = Files.list(Path.of("project"))) {
            stream.sorted().forEach(p ->
                System.out.println(p.getFileName())
            );
        }

        // 後片付け
        Files.walk(Path.of("project"))
            .sorted(java.util.Comparator.reverseOrder())
            .forEach(p -> { try { Files.delete(p); } catch (IOException e) {} });
    }
}`}
          expectedOutput={`--- Files.walk ---
[DIR] project
  [FILE] README.md
  [DIR] lib
    [FILE] dep.jar
  [DIR] src
    [FILE] Main.java
    [FILE] Utils.java
--- Files.list (直下のみ) ---
README.md
lib
src`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="nio-files" />
      </div>
      <LessonNav lessons={lessons} currentId="nio-files" basePath="/learn/fileio" />
    </div>
  );
}
