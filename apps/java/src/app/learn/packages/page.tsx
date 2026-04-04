import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Javaのpackage宣言について正しいものはどれですか？",
    options: [
      "ソースファイルの先頭に記述し、クラスの名前空間を定義する",
      "ファイルの末尾に記述する",
      "1つのファイルに複数のpackage宣言ができる",
      "packageは省略できず、必ず記述しなければならない",
    ],
    answer: 0,
    explanation: "package宣言はソースファイルの最初の文として記述します。ドメイン名の逆順（com.example.appなど）で名前空間を定義し、クラスの衝突を防ぎます。",
  },
  {
    question: "import文について正しいものはどれですか？",
    options: [
      "他のパッケージのクラスを完全修飾名なしで使えるようにする宣言",
      "importするとクラスがメモリにロードされる",
      "importは1ファイルにつき1つだけ記述できる",
      "java.langパッケージもimportが必要である",
    ],
    answer: 0,
    explanation: "import文により、他パッケージのクラスを短い名前で使用できます。java.langパッケージは自動的にインポートされるため、明示的なimportは不要です。",
  },
  {
    question: "Javaのアクセス制御修飾子について正しいものはどれですか？",
    options: [
      "public > protected > パッケージプライベート > privateの順にアクセス範囲が広い",
      "protectedはpublicと同じアクセス範囲を持つ",
      "パッケージプライベートはどこからでもアクセスできる",
      "privateは同じパッケージ内ならアクセスできる",
    ],
    answer: 0,
    explanation: "publicはどこからでも、protectedは同パッケージとサブクラスから、パッケージプライベート（修飾子なし）は同パッケージのみ、privateはクラス内のみアクセス可能です。",
  },
  {
    question: "Java Platform Module System（JPMS）について正しいものはどれですか？",
    options: [
      "Java 9で導入された、module-info.javaでモジュール間の依存関係とエクスポートを定義するシステム",
      "Java 8で導入された機能",
      "パッケージと同じ概念である",
      "ビルドツール専用の機能である",
    ],
    answer: 0,
    explanation: "JPMS（Java 9）はモジュールシステムで、module-info.javaにmodule宣言を記述します。requires（依存）、exports（公開）、opens（リフレクション用公開）などのディレクティブがあります。",
  },
];

export default function PackagesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">パッケージ・モジュール</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaのパッケージとモジュールシステムを学びましょう。パッケージ宣言とimport、
          アクセス修飾子による可視性制御、そしてJPMS（Java 9+）によるモジュール化を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="packages" totalLessons={5} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/packages" color="yellow" categoryId="packages" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パッケージとimport</h2>
        <p className="text-gray-400 mb-4">
          パッケージの宣言とimport文の使い方を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`// パッケージ宣言の例（通常はファイル先頭に記述）
// package com.example.app;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== パッケージとimport ===");

        // java.utilパッケージのクラスを使用
        List<String> languages = new ArrayList<>();
        languages.add("Java");
        languages.add("Python");
        languages.add("TypeScript");

        System.out.println("言語リスト: " + languages);

        // Mapも同様にimportして使用
        Map<String, String> packageExamples = new HashMap<>();
        packageExamples.put("java.lang", "String, Math, System（自動import）");
        packageExamples.put("java.util", "List, Map, Set, Optional");
        packageExamples.put("java.io", "File, InputStream, Reader");
        packageExamples.put("java.nio", "Path, Files, Channel");

        System.out.println();
        System.out.println("=== 主要パッケージ ===");
        for (var entry : packageExamples.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        System.out.println();
        System.out.println("=== アクセス修飾子 ===");
        System.out.println("public      - どこからでもアクセス可能");
        System.out.println("protected   - 同パッケージ + サブクラス");
        System.out.println("(なし)      - 同パッケージのみ");
        System.out.println("private     - 同クラス内のみ");
    }
}`}
          expectedOutput={`=== パッケージとimport ===
言語リスト: [Java, Python, TypeScript]

=== 主要パッケージ ===
java.lang: String, Math, System（自動import）
java.util: List, Map, Set, Optional
java.io: File, InputStream, Reader
java.nio: Path, Files, Channel

=== アクセス修飾子 ===
public      - どこからでもアクセス可能
protected   - 同パッケージ + サブクラス
(なし)      - 同パッケージのみ
private     - 同クラス内のみ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">module-info.javaの基本</h2>
        <p className="text-gray-400 mb-4">
          Java 9で導入されたJPMS（Java Platform Module System）の概念を学びましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== JPMS (Java Platform Module System) ===");
        System.out.println("Java 9以降のモジュールシステム");
        System.out.println();

        // module-info.javaの例
        String moduleInfo = """
            // module-info.java の構文
            module com.example.app {
                // 依存モジュールの宣言
                requires java.base;          // 暗黙的に含まれる
                requires java.sql;           // SQLモジュール
                requires java.logging;       // ロギングモジュール
                requires transitive com.example.util; // 推移的依存

                // パッケージの公開
                exports com.example.app.api;         // APIパッケージを公開
                exports com.example.app.model;       // モデルを公開

                // リフレクション用に公開
                opens com.example.app.internal to
                    com.google.gson;         // 特定モジュールにのみ公開

                // サービスの利用と提供
                uses com.example.spi.Plugin;
                provides com.example.spi.Plugin
                    with com.example.app.DefaultPlugin;
            }
            """;
        System.out.println(moduleInfo);

        System.out.println("=== モジュールのメリット ===");
        System.out.println("1. 強いカプセル化（内部APIの隠蔽）");
        System.out.println("2. 明確な依存関係の宣言");
        System.out.println("3. jlinkによるカスタムランタイム作成");
        System.out.println("4. 起動時の依存関係チェック");
    }
}`}
          expectedOutput={`=== JPMS (Java Platform Module System) ===
Java 9以降のモジュールシステム

// module-info.java の構文
module com.example.app {
    // 依存モジュールの宣言
    requires java.base;          // 暗黙的に含まれる
    requires java.sql;           // SQLモジュール
    requires java.logging;       // ロギングモジュール
    requires transitive com.example.util; // 推移的依存

    // パッケージの公開
    exports com.example.app.api;         // APIパッケージを公開
    exports com.example.app.model;       // モデルを公開

    // リフレクション用に公開
    opens com.example.app.internal to
        com.google.gson;         // 特定モジュールにのみ公開

    // サービスの利用と提供
    uses com.example.spi.Plugin;
    provides com.example.spi.Plugin
        with com.example.app.DefaultPlugin;
}

=== モジュールのメリット ===
1. 強いカプセル化（内部APIの隠蔽）
2. 明確な依存関係の宣言
3. jlinkによるカスタムランタイム作成
4. 起動時の依存関係チェック`}
        />
      </section>

      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
