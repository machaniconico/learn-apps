import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function PathPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Path</h1>
        <p className="text-gray-400">Path.of、resolve、relativize、getFileNameの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Pathクラスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">Path</code> はファイルシステム上のパスを表すインターフェースです。
          文字列操作でパスを扱うよりも安全で、OSの違いを吸収してくれます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Path.of("dir", "file.txt")</code> - パスの生成</li>
          <li><code>resolve(other)</code> - パスの結合</li>
          <li><code>relativize(other)</code> - 相対パスの計算</li>
          <li><code>getFileName()</code> - ファイル名の取得</li>
          <li><code>getParent()</code> - 親ディレクトリの取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pathの生成と基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Path.of()</code> でパスを生成し、
          各部分を取得するメソッドで分解できます。
        </p>
        <JavaEditor
          defaultCode={`import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        // Pathの生成
        Path path = Path.of("home", "user", "documents", "report.txt");
        System.out.println("パス: " + path);

        // 各部分の取得
        System.out.println("ファイル名: " + path.getFileName());
        System.out.println("親ディレクトリ: " + path.getParent());
        System.out.println("ルート: " + path.getRoot());
        System.out.println("要素数: " + path.getNameCount());

        // 各要素を取得
        System.out.println("--- 要素一覧 ---");
        for (int i = 0; i < path.getNameCount(); i++) {
            System.out.println("[" + i + "] " + path.getName(i));
        }

        // サブパスの取得
        System.out.println("サブパス(0,2): " + path.subpath(0, 2));
    }
}`}
          expectedOutput={`パス: home/user/documents/report.txt
ファイル名: report.txt
親ディレクトリ: home/user/documents
ルート: null
要素数: 4
--- 要素一覧 ---
[0] home
[1] user
[2] documents
[3] report.txt
サブパス(0,2): home/user`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">resolveとrelativize</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">resolve</code> でパスを結合し、
          <code className="text-orange-300">relativize</code> で2つのパスの相対パスを計算します。
        </p>
        <JavaEditor
          defaultCode={`import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path base = Path.of("home", "user");

        // resolve: パスの結合
        System.out.println("--- resolve ---");
        Path resolved1 = base.resolve("documents");
        System.out.println("resolve(documents): " + resolved1);

        Path resolved2 = base.resolve(Path.of("projects", "app"));
        System.out.println("resolve(projects/app): " + resolved2);

        Path resolved3 = base.resolve("config.txt");
        System.out.println("resolve(config.txt): " + resolved3);

        // relativize: 相対パスの計算
        System.out.println("--- relativize ---");
        Path path1 = Path.of("home", "user", "docs");
        Path path2 = Path.of("home", "user", "music", "rock");

        Path relative = path1.relativize(path2);
        System.out.println(path1 + " -> " + path2);
        System.out.println("相対パス: " + relative);

        // resolveSibling: 兄弟パスの生成
        System.out.println("--- resolveSibling ---");
        Path file = Path.of("project", "src", "Main.java");
        Path sibling = file.resolveSibling("Utils.java");
        System.out.println(file + " の兄弟: " + sibling);
    }
}`}
          expectedOutput={`--- resolve ---
resolve(documents): home/user/documents
resolve(projects/app): home/user/projects/app
resolve(config.txt): home/user/config.txt
--- relativize ---
home/user/docs -> home/user/music/rock
相対パス: ../music/rock
--- resolveSibling ---
project/src/Main.java の兄弟: project/src/Utils.java`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パスの正規化と比較</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">normalize()</code> で冗長な要素（<code>..</code>や<code>.</code>）を除去し、
          <code className="text-orange-300">toAbsolutePath()</code> で絶対パスに変換できます。
        </p>
        <JavaEditor
          defaultCode={`import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        // normalize: ..や.を解決
        Path messy = Path.of("home", "user", "docs", "..", "music", ".", "song.mp3");
        System.out.println("元のパス: " + messy);
        System.out.println("正規化: " + messy.normalize());

        // パスの比較
        Path p1 = Path.of("src", "main", "App.java");
        Path p2 = Path.of("src", "main", "App.java");
        Path p3 = Path.of("src", "test", "AppTest.java");

        System.out.println("--- パスの比較 ---");
        System.out.println("p1 == p2: " + p1.equals(p2));
        System.out.println("p1 == p3: " + p1.equals(p3));
        System.out.println("p1.startsWith(src): " + p1.startsWith("src"));
        System.out.println("p1.endsWith(App.java): " + p1.endsWith("App.java"));

        // 拡張子の取得（Pathには直接のメソッドはない）
        String fileName = p1.getFileName().toString();
        String ext = fileName.substring(fileName.lastIndexOf('.'));
        System.out.println("拡張子: " + ext);
    }
}`}
          expectedOutput={`元のパス: home/user/docs/../music/./song.mp3
正規化: home/user/music/song.mp3
--- パスの比較 ---
p1 == p2: true
p1 == p3: false
p1.startsWith(src): true
p1.endsWith(App.java): true
拡張子: .java`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="path" />
      </div>
      <LessonNav lessons={lessons} currentId="path" basePath="/learn/fileio" />
    </div>
  );
}
