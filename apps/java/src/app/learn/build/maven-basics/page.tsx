import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function MavenBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ビルドツール レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Maven基礎</h1>
        <p className="text-gray-400">pom.xml構造、groupId/artifactId/version、ディレクトリ規約</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Mavenとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          MavenはJavaプロジェクトのビルド・依存関係管理ツールです。
          プロジェクトの設定は <code className="text-orange-300">pom.xml</code>（Project Object Model）に記述します。
          GAV座標（groupId, artifactId, version）でプロジェクトやライブラリを一意に識別します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>groupId</code> - 組織やプロジェクトのドメイン（例: <code>com.example</code>）</li>
          <li><code>artifactId</code> - プロジェクト名（例: <code>my-app</code>）</li>
          <li><code>version</code> - バージョン番号（例: <code>1.0.0</code>、<code>1.0-SNAPSHOT</code>）</li>
          <li>標準ディレクトリ: <code>src/main/java</code>、<code>src/test/java</code>、<code>src/main/resources</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pom.xmlの基本構造</h2>
        <p className="text-gray-400 mb-4">
          pom.xmlの最小構成を確認しましょう。GAV座標がプロジェクトの識別子になります。
        </p>
        <JavaEditor
          defaultCode={`// pom.xmlの基本構造をJavaで表現
public class Main {
    public static void main(String[] args) {
        // Maven GAV座標
        String groupId = "com.example";
        String artifactId = "my-app";
        String version = "1.0.0";

        System.out.println("=== Maven GAV座標 ===");
        System.out.println("groupId:    " + groupId);
        System.out.println("artifactId: " + artifactId);
        System.out.println("version:    " + version);

        // 完全修飾名
        String fqn = groupId + ":" + artifactId + ":" + version;
        System.out.println("完全修飾名: " + fqn);
    }
}`}
          expectedOutput={`=== Maven GAV座標 ===
groupId:    com.example
artifactId: my-app
version:    1.0.0
完全修飾名: com.example:my-app:1.0.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mavenディレクトリ規約</h2>
        <p className="text-gray-400 mb-4">
          Mavenは「設定より規約」の原則に従い、標準的なディレクトリ構造を定めています。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Maven標準ディレクトリ構造 ===");
        System.out.println("my-app/");
        System.out.println("├── pom.xml");
        System.out.println("├── src/");
        System.out.println("│   ├── main/");
        System.out.println("│   │   ├── java/        ← メインソース");
        System.out.println("│   │   └── resources/   ← 設定ファイル等");
        System.out.println("│   └── test/");
        System.out.println("│       ├── java/        ← テストソース");
        System.out.println("│       └── resources/   ← テスト用リソース");
        System.out.println("└── target/              ← ビルド出力");
    }
}`}
          expectedOutput={`=== Maven標準ディレクトリ構造 ===
my-app/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/        ← メインソース
│   │   └── resources/   ← 設定ファイル等
│   └── test/
│       ├── java/        ← テストソース
│       └── resources/   ← テスト用リソース
└── target/              ← ビルド出力`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SNAPSHOTバージョン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">-SNAPSHOT</code> サフィックスは開発中のバージョンを示します。
          リリース版とSNAPSHOT版の違いを理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String[] versions = {
            "1.0.0-SNAPSHOT",
            "1.0.0",
            "2.0.0-SNAPSHOT",
            "2.0.0"
        };

        for (String version : versions) {
            boolean isSnapshot = version.endsWith("-SNAPSHOT");
            String status = isSnapshot ? "開発中" : "リリース済";
            System.out.println(version + " → " + status);
        }

        System.out.println();
        System.out.println("SNAPSHOT: 同じバージョンでも中身が変わる可能性あり");
        System.out.println("リリース: 一度公開したら変更不可（immutable）");
    }
}`}
          expectedOutput={`1.0.0-SNAPSHOT → 開発中
1.0.0 → リリース済
2.0.0-SNAPSHOT → 開発中
2.0.0 → リリース済

SNAPSHOT: 同じバージョンでも中身が変わる可能性あり
リリース: 一度公開したら変更不可（immutable）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="maven-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="maven-basics" basePath="/learn/build" />
    </div>
  );
}
