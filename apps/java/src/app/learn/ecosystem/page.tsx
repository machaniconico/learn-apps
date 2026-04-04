import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Java 8で導入された主要な機能として正しいものはどれですか？",
    options: [
      "ラムダ式、Stream API、Optionalクラス、java.time API",
      "モジュールシステム、var、テキストブロック",
      "レコード、sealed class、パターンマッチング",
      "仮想スレッド、構造化並行性",
    ],
    answer: 0,
    explanation: "Java 8はJava史上最大のアップデートの一つで、ラムダ式による関数型プログラミング、Stream API、Optional、新しい日時API（java.time）が導入されました。",
  },
  {
    question: "JVMのメモリモデルについて正しいものはどれですか？",
    options: [
      "ヒープ（オブジェクト）、スタック（メソッド呼び出し）、メタスペース（クラス情報）に分かれる",
      "すべてのデータはスタックに保存される",
      "ヒープとスタックは同じ領域である",
      "メモリ管理はプログラマが手動で行う",
    ],
    answer: 0,
    explanation: "JVMメモリはヒープ（オブジェクト格納、GC対象）、スタック（スレッドごとのメソッド呼び出し）、メタスペース（クラスメタデータ）などに分かれます。",
  },
  {
    question: "Javaのガベージコレクション（GC）の種類として正しいものはどれですか？",
    options: [
      "Serial GC、Parallel GC、G1 GC、ZGCなど、用途に応じて選択できる",
      "GCの種類は1つだけである",
      "GCはJava 11で廃止された",
      "GCはスタック領域のみを対象とする",
    ],
    answer: 0,
    explanation: "Javaには複数のGCアルゴリズムがあります。Serial GC（小規模）、Parallel GC（スループット重視）、G1 GC（バランス型、デフォルト）、ZGC/Shenandoah（低レイテンシ）などです。",
  },
  {
    question: "Effective Javaの原則として正しいものはどれですか？",
    options: [
      "不変オブジェクトを優先し、継承よりコンポジションを使い、適切な例外処理を行う",
      "可変オブジェクトを常に使用する",
      "すべてのクラスをpublicにする",
      "例外は常に握りつぶす",
    ],
    answer: 0,
    explanation: "Joshua BlochのEffective Javaでは、不変性の活用、継承よりコンポジション、適切な例外処理、防御的コピーなど、堅牢なJavaコードを書くための原則が示されています。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Javaエコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaを取り巻くエコシステムを学びましょう。Java 8から最新バージョンまでの進化、
          JVMのメモリモデルとガベージコレクション、そしてEffective Javaの原則を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="blue" categoryId="ecosystem" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Javaバージョンの進化</h2>
        <p className="text-gray-400 mb-4">
          Java 8から最新バージョンまでの主要な機能追加を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {
    // Java 14+ Recordの代替（デモ用）
    static class Feature {
        String version;
        String name;
        Feature(String version, String name) {
            this.version = version;
            this.name = name;
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Javaバージョン別の主要機能 ===");
        System.out.println();

        Map<String, List<String>> versions = new LinkedHashMap<>();
        versions.put("Java 8  (2014)", List.of(
            "ラムダ式", "Stream API", "Optional", "java.time API"));
        versions.put("Java 9  (2017)", List.of(
            "モジュールシステム (JPMS)", "JShell", "Collection Factory"));
        versions.put("Java 11 (2018)", List.of(
            "var (ローカル変数型推論)", "HTTP Client", "Files.readString"));
        versions.put("Java 14 (2020)", List.of(
            "Record (プレビュー)", "switch式", "NullPointerException改善"));
        versions.put("Java 17 (2021)", List.of(
            "sealed class", "パターンマッチング (instanceof)", "テキストブロック"));
        versions.put("Java 21 (2023)", List.of(
            "仮想スレッド", "レコードパターン", "switch パターンマッチング"));

        for (var entry : versions.entrySet()) {
            System.out.println(entry.getKey() + ":");
            for (String feature : entry.getValue()) {
                System.out.println("  - " + feature);
            }
            System.out.println();
        }

        // Stream APIのデモ（Java 8+）
        System.out.println("=== Stream APIの例 ===");
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        int sumOfEvens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println("偶数の合計: " + sumOfEvens);
    }
}`}
          expectedOutput={`=== Javaバージョン別の主要機能 ===

Java 8  (2014):
  - ラムダ式
  - Stream API
  - Optional
  - java.time API

Java 9  (2017):
  - モジュールシステム (JPMS)
  - JShell
  - Collection Factory

Java 11 (2018):
  - var (ローカル変数型推論)
  - HTTP Client
  - Files.readString

Java 14 (2020):
  - Record (プレビュー)
  - switch式
  - NullPointerException改善

Java 17 (2021):
  - sealed class
  - パターンマッチング (instanceof)
  - テキストブロック

Java 21 (2023):
  - 仮想スレッド
  - レコードパターン
  - switch パターンマッチング

=== Stream APIの例 ===
偶数の合計: 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JVMメモリモデルの概要</h2>
        <p className="text-gray-400 mb-4">
          JVMのメモリ構成とガベージコレクションの基本を理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== JVMメモリモデル ===");
        System.out.println();

        // メモリ領域の説明
        String[][] memoryAreas = {
            {"ヒープ (Heap)", "オブジェクトの格納領域。GCの対象。Young/Old世代に分かれる"},
            {"スタック (Stack)", "スレッドごとのメソッド呼び出し情報、ローカル変数を格納"},
            {"メタスペース", "クラスのメタデータを格納（Java 8以降、PermGenの後継）"},
            {"ネイティブメモリ", "JVMやネイティブライブラリが使用する領域"},
        };

        for (String[] area : memoryAreas) {
            System.out.println("[" + area[0] + "]");
            System.out.println("  " + area[1]);
            System.out.println();
        }

        // GCの種類
        System.out.println("=== ガベージコレクターの種類 ===");
        String[][] gcTypes = {
            {"Serial GC", "単一スレッド、小規模アプリ向け"},
            {"Parallel GC", "複数スレッド、スループット重視"},
            {"G1 GC", "デフォルト（Java 9+）、バランス型"},
            {"ZGC", "超低レイテンシ（< 10ms）、大規模ヒープ対応"},
            {"Shenandoah", "低レイテンシ、Red Hat開発"},
        };

        for (String[] gc : gcTypes) {
            System.out.println("  " + gc[0] + ": " + gc[1]);
        }

        // 現在のメモリ情報
        System.out.println();
        System.out.println("=== 現在のJVMメモリ情報 ===");
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        System.out.println("最大メモリ: " + maxMemory + " MB");
        System.out.println("割当メモリ: " + totalMemory + " MB");
        System.out.println("空きメモリ: " + freeMemory + " MB");
    }
}`}
          expectedOutput={`=== JVMメモリモデル ===

[ヒープ (Heap)]
  オブジェクトの格納領域。GCの対象。Young/Old世代に分かれる

[スタック (Stack)]
  スレッドごとのメソッド呼び出し情報、ローカル変数を格納

[メタスペース]
  クラスのメタデータを格納（Java 8以降、PermGenの後継）

[ネイティブメモリ]
  JVMやネイティブライブラリが使用する領域

=== ガベージコレクターの種類 ===
  Serial GC: 単一スレッド、小規模アプリ向け
  Parallel GC: 複数スレッド、スループット重視
  G1 GC: デフォルト（Java 9+）、バランス型
  ZGC: 超低レイテンシ（< 10ms）、大規模ヒープ対応
  Shenandoah: 低レイテンシ、Red Hat開発

=== 現在のJVMメモリ情報 ===
最大メモリ: 247 MB
割当メモリ: 16 MB
空きメモリ: 14 MB`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
