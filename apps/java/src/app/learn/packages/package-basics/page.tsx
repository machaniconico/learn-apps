import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PackageBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パッケージ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パッケージの基本</h1>
        <p className="text-gray-400">package宣言、ディレクトリ構造、com.example.app</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パッケージとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パッケージはJavaのクラスを整理・分類するための仕組みです。
          ファイルシステムのディレクトリに対応し、名前空間として機能します。
          逆ドメイン名（例: <code className="text-orange-300">com.example.app</code>）で命名するのが慣例です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>package</code> 宣言はファイルの先頭に記述する</li>
          <li>パッケージ名はすべて小文字が慣例</li>
          <li>パッケージ名はディレクトリ構造と一致させる</li>
          <li>パッケージなしは「デフォルトパッケージ」（推奨されない）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パッケージの宣言</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">package</code> 宣言でクラスの所属パッケージを指定します。
          ファイルの最初の文（コメント除く）でなければなりません。
        </p>
        <JavaEditor
          defaultCode={`// デフォルトパッケージ（package宣言なし）の例
// 実際のプロジェクトでは必ずパッケージを宣言する
public class Main {
    public static void main(String[] args) {
        System.out.println("=== パッケージの命名規則 ===");
        System.out.println();

        String[][] examples = {
            {"com.example.app", "アプリのルートパッケージ"},
            {"com.example.app.model", "データモデルクラス"},
            {"com.example.app.service", "ビジネスロジック"},
            {"com.example.app.controller", "コントローラ"},
            {"com.example.app.repository", "データアクセス"},
            {"com.example.app.util", "ユーティリティ"}
        };

        for (String[] ex : examples) {
            System.out.printf("%-30s %s%n", ex[0], ex[1]);
        }
    }
}`}
          expectedOutput={`=== パッケージの命名規則 ===

com.example.app                アプリのルートパッケージ
com.example.app.model          データモデルクラス
com.example.app.service        ビジネスロジック
com.example.app.controller     コントローラ
com.example.app.repository     データアクセス
com.example.app.util           ユーティリティ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ディレクトリ構造との対応</h2>
        <p className="text-gray-400 mb-4">
          パッケージ名のドット <code className="text-orange-300">.</code> はディレクトリの区切りに対応します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== パッケージとディレクトリの対応 ===");
        System.out.println();
        System.out.println("src/main/java/");
        System.out.println("└── com/");
        System.out.println("    └── example/");
        System.out.println("        └── app/");
        System.out.println("            ├── Main.java");
        System.out.println("            │   → package com.example.app;");
        System.out.println("            ├── model/");
        System.out.println("            │   └── User.java");
        System.out.println("            │       → package com.example.app.model;");
        System.out.println("            └── service/");
        System.out.println("                └── UserService.java");
        System.out.println("                    → package com.example.app.service;");
        System.out.println();
        System.out.println("重要: パッケージ名とディレクトリパスが");
        System.out.println("一致しないとコンパイルエラーになる");
    }
}`}
          expectedOutput={`=== パッケージとディレクトリの対応 ===

src/main/java/
└── com/
    └── example/
        └── app/
            ├── Main.java
            │   → package com.example.app;
            ├── model/
            │   └── User.java
            │       → package com.example.app.model;
            └── service/
                └── UserService.java
                    → package com.example.app.service;

重要: パッケージ名とディレクトリパスが
一致しないとコンパイルエラーになる`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">完全修飾名とパッケージの役割</h2>
        <p className="text-gray-400 mb-4">
          同じ名前のクラスでもパッケージが異なれば別のクラスとして扱われます。
          完全修飾名（FQCN）で一意に識別できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== 完全修飾名（FQCN） ===");
        System.out.println();

        // java.utilパッケージのList
        java.util.List<String> utilList = new java.util.ArrayList<>();
        utilList.add("java.util.List");

        // java.awtパッケージのList（別物！）
        // java.awt.List awtList = new java.awt.List();

        System.out.println("java.util.List → コレクションのリスト");
        System.out.println("java.awt.List  → GUIのリストコンポーネント");
        System.out.println("→ 同じ 'List' でもパッケージが違えば別クラス");
        System.out.println();

        System.out.println("=== 標準ライブラリのパッケージ ===");
        String[][] packages = {
            {"java.lang", "基本クラス（自動import）"},
            {"java.util", "コレクション、日付等"},
            {"java.io", "入出力"},
            {"java.nio", "新しい入出力"},
            {"java.net", "ネットワーク"},
            {"java.sql", "データベース"}
        };

        for (String[] p : packages) {
            System.out.printf("%-14s %s%n", p[0], p[1]);
        }
    }
}`}
          expectedOutput={`=== 完全修飾名（FQCN） ===

java.util.List → コレクションのリスト
java.awt.List  → GUIのリストコンポーネント
→ 同じ 'List' でもパッケージが違えば別クラス

=== 標準ライブラリのパッケージ ===
java.lang      基本クラス（自動import）
java.util      コレクション、日付等
java.io        入出力
java.nio       新しい入出力
java.net       ネットワーク
java.sql       データベース`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="package-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="package-basics" basePath="/learn/packages" />
    </div>
  );
}
