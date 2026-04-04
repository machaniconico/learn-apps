import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function ModulesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パッケージ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モジュール</h1>
        <p className="text-gray-400">module-info.java、requires、exports（Java 9+）</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Java Platform Module System（JPMS）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java 9で導入されたモジュールシステムは、パッケージよりも上位の
          アクセス制御・依存関係管理の仕組みです。
          <code className="text-orange-300">module-info.java</code> でモジュールの公開範囲と依存関係を宣言します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>module</code> - モジュールの宣言</li>
          <li><code>requires</code> - 他のモジュールへの依存を宣言</li>
          <li><code>exports</code> - パッケージを外部に公開</li>
          <li><code>opens</code> - リフレクションアクセスを許可</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">module-info.javaの基本</h2>
        <p className="text-gray-400 mb-4">
          モジュール定義ファイルの構造と主要なディレクティブを確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== module-info.java の例 ===");
        System.out.println();
        System.out.println("// src/main/java/module-info.java");
        System.out.println("module com.example.app {");
        System.out.println("    // 依存モジュール");
        System.out.println("    requires java.sql;");
        System.out.println("    requires java.logging;");
        System.out.println("    requires transitive com.example.common;");
        System.out.println();
        System.out.println("    // 公開パッケージ");
        System.out.println("    exports com.example.app.api;");
        System.out.println("    exports com.example.app.model;");
        System.out.println();
        System.out.println("    // リフレクション用（フレームワーク向け）");
        System.out.println("    opens com.example.app.entity to hibernate.core;");
        System.out.println("}");
    }
}`}
          expectedOutput={`=== module-info.java の例 ===

// src/main/java/module-info.java
module com.example.app {
    // 依存モジュール
    requires java.sql;
    requires java.logging;
    requires transitive com.example.common;

    // 公開パッケージ
    exports com.example.app.api;
    exports com.example.app.model;

    // リフレクション用（フレームワーク向け）
    opens com.example.app.entity to hibernate.core;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">主要なJDKモジュール</h2>
        <p className="text-gray-400 mb-4">
          JDK自体もモジュール化されています。<code className="text-orange-300">java.base</code> は
          すべてのモジュールが暗黙的にrequiresします。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== 主要なJDKモジュール ===");
        System.out.println();

        String[][] modules = {
            {"java.base", "基本API（自動requires）", "java.lang, java.util, java.io"},
            {"java.sql", "JDBC API", "java.sql, javax.sql"},
            {"java.logging", "ログAPI", "java.util.logging"},
            {"java.net.http", "HTTP Client（Java 11+）", "java.net.http"},
            {"java.desktop", "Swing/AWT", "java.awt, javax.swing"},
            {"java.xml", "XML処理", "javax.xml, org.xml.sax"}
        };

        for (String[] m : modules) {
            System.out.println("【" + m[0] + "】");
            System.out.println("  説明: " + m[1]);
            System.out.println("  パッケージ: " + m[2]);
            System.out.println();
        }
    }
}`}
          expectedOutput={`=== 主要なJDKモジュール ===

【java.base】
  説明: 基本API（自動requires）
  パッケージ: java.lang, java.util, java.io

【java.sql】
  説明: JDBC API
  パッケージ: java.sql, javax.sql

【java.logging】
  説明: ログAPI
  パッケージ: java.util.logging

【java.net.http】
  説明: HTTP Client（Java 11+）
  パッケージ: java.net.http

【java.desktop】
  説明: Swing/AWT
  パッケージ: java.awt, javax.swing

【java.xml】
  説明: XML処理
  パッケージ: javax.xml, org.xml.sax
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">モジュールの現実的な使い方</h2>
        <p className="text-gray-400 mb-4">
          多くのプロジェクトではモジュールシステムを使わない（クラスパスモード）のが現状ですが、
          ライブラリ開発や大規模プロジェクトでは有用です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== モジュールシステムの現状 ===");
        System.out.println();

        System.out.println("【モジュールが有効な場面】");
        System.out.println("  - ライブラリ開発（公開APIの明示）");
        System.out.println("  - 大規模プロジェクト（依存関係の厳密な管理）");
        System.out.println("  - カスタムJREの作成（jlink）");
        System.out.println();

        System.out.println("【クラスパスモードが多い理由】");
        System.out.println("  - Spring Bootなど主要FWがクラスパス前提");
        System.out.println("  - 既存ライブラリの多くがモジュール未対応");
        System.out.println("  - 移行コストが高い");
        System.out.println();

        System.out.println("【requires transitive の意味】");
        System.out.println("  module A {");
        System.out.println("    requires transitive B;");
        System.out.println("  }");
        System.out.println("  → Aを使うモジュールはBも自動的に使える");
        System.out.println("  → 推移的な依存関係の公開");
    }
}`}
          expectedOutput={`=== モジュールシステムの現状 ===

【モジュールが有効な場面】
  - ライブラリ開発（公開APIの明示）
  - 大規模プロジェクト（依存関係の厳密な管理）
  - カスタムJREの作成（jlink）

【クラスパスモードが多い理由】
  - Spring Bootなど主要FWがクラスパス前提
  - 既存ライブラリの多くがモジュール未対応
  - 移行コストが高い

【requires transitive の意味】
  module A {
    requires transitive B;
  }
  → Aを使うモジュールはBも自動的に使える
  → 推移的な依存関係の公開`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="modules" />
      </div>
      <LessonNav lessons={lessons} currentId="modules" basePath="/learn/packages" />
    </div>
  );
}
