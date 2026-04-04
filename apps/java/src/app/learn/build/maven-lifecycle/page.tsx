import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function MavenLifecyclePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ビルドツール レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Mavenライフサイクル</h1>
        <p className="text-gray-400">compile/test/package/install/deploy、mvnコマンド</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビルドライフサイクルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Mavenのビルドライフサイクルは、プロジェクトのビルドプロセスを一連のフェーズとして定義しています。
          各フェーズは順番に実行され、あるフェーズを指定するとそれ以前のフェーズもすべて実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>validate</code> - プロジェクト構成の検証</li>
          <li><code>compile</code> - ソースコードのコンパイル</li>
          <li><code>test</code> - ユニットテストの実行</li>
          <li><code>package</code> - JAR/WARの作成</li>
          <li><code>install</code> - ローカルリポジトリにインストール</li>
          <li><code>deploy</code> - リモートリポジトリにデプロイ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ライフサイクルフェーズの流れ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">mvn package</code> を実行すると、validate から package まですべてのフェーズが順番に実行されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String[] phases = {
            "validate  - プロジェクト構成を検証",
            "compile   - src/main/java をコンパイル",
            "test      - src/test/java のテストを実行",
            "package   - JAR/WARを作成",
            "verify    - 統合テストの結果を検証",
            "install   - ~/.m2/repository にインストール",
            "deploy    - リモートリポジトリにデプロイ"
        };

        System.out.println("=== Mavenデフォルトライフサイクル ===");
        for (int i = 0; i < phases.length; i++) {
            System.out.println((i + 1) + ". " + phases[i]);
        }

        System.out.println();
        System.out.println("例: mvn package → 1〜4が順番に実行される");
        System.out.println("例: mvn install → 1〜6が順番に実行される");
    }
}`}
          expectedOutput={`=== Mavenデフォルトライフサイクル ===
1. validate  - プロジェクト構成を検証
2. compile   - src/main/java をコンパイル
3. test      - src/test/java のテストを実行
4. package   - JAR/WARを作成
5. verify    - 統合テストの結果を検証
6. install   - ~/.m2/repository にインストール
7. deploy    - リモートリポジトリにデプロイ

例: mvn package → 1〜4が順番に実行される
例: mvn install → 1〜6が順番に実行される`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よく使うmvnコマンド</h2>
        <p className="text-gray-400 mb-4">
          実際の開発で頻繁に使用するMavenコマンドとオプションを確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== よく使うMavenコマンド ===");
        System.out.println();

        String[][] commands = {
            {"mvn clean", "targetディレクトリを削除"},
            {"mvn compile", "ソースをコンパイル"},
            {"mvn test", "テストを実行"},
            {"mvn package", "JARを作成"},
            {"mvn clean package", "クリーン後にJAR作成"},
            {"mvn install", "ローカルリポジトリにインストール"},
            {"mvn clean install -DskipTests", "テストスキップでインストール"},
            {"mvn dependency:tree", "依存関係ツリーを表示"}
        };

        for (String[] cmd : commands) {
            System.out.printf("%-38s %s%n", cmd[0], cmd[1]);
        }
    }
}`}
          expectedOutput={`=== よく使うMavenコマンド ===

mvn clean                              targetディレクトリを削除
mvn compile                            ソースをコンパイル
mvn test                               テストを実行
mvn package                            JARを作成
mvn clean package                      クリーン後にJAR作成
mvn install                            ローカルリポジトリにインストール
mvn clean install -DskipTests          テストスキップでインストール
mvn dependency:tree                    依存関係ツリーを表示`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">cleanライフサイクル</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">clean</code> はデフォルトライフサイクルとは別のライフサイクルです。
          <code className="text-orange-300">mvn clean package</code> は2つのライフサイクルを組み合わせています。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Mavenの3つのライフサイクル ===");
        System.out.println();

        System.out.println("1. cleanライフサイクル");
        System.out.println("   pre-clean → clean → post-clean");
        System.out.println("   → targetディレクトリを削除");
        System.out.println();

        System.out.println("2. defaultライフサイクル");
        System.out.println("   validate → compile → test → package → install → deploy");
        System.out.println("   → メインのビルドプロセス");
        System.out.println();

        System.out.println("3. siteライフサイクル");
        System.out.println("   pre-site → site → post-site → site-deploy");
        System.out.println("   → プロジェクトドキュメント生成");
    }
}`}
          expectedOutput={`=== Mavenの3つのライフサイクル ===

1. cleanライフサイクル
   pre-clean → clean → post-clean
   → targetディレクトリを削除

2. defaultライフサイクル
   validate → compile → test → package → install → deploy
   → メインのビルドプロセス

3. siteライフサイクル
   pre-site → site → post-site → site-deploy
   → プロジェクトドキュメント生成`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="maven-lifecycle" />
      </div>
      <LessonNav lessons={lessons} currentId="maven-lifecycle" basePath="/learn/build" />
    </div>
  );
}
