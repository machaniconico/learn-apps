import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function GarbageCollectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ガベージコレクション</h1>
        <p className="text-gray-400">GCの仕組み、Serial/Parallel/G1/ZGC</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ガベージコレクション（GC）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GCはJVMが自動的に不要なオブジェクトのメモリを解放する仕組みです。
          C/C++のような手動メモリ管理が不要になりますが、GCの特性を理解して
          適切に設定することがパフォーマンスに影響します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>到達可能性（Reachability）で不要オブジェクトを判定</li>
          <li>世代別GC: Young Generation → Old Generation</li>
          <li>Stop-the-World: GC中にアプリケーションが停止する</li>
          <li>GCアルゴリズムの選択がアプリの性能特性を左右する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ヒープの構造と世代別GC</h2>
        <p className="text-gray-400 mb-4">
          ヒープはYoung世代とOld世代に分かれ、オブジェクトの寿命に応じて管理されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== ヒープの世代構造 ===");
        System.out.println();
        System.out.println("┌──────────────────────────────────┐");
        System.out.println("│ Heap                             │");
        System.out.println("│ ┌──────────────────────────────┐ │");
        System.out.println("│ │ Young Generation             │ │");
        System.out.println("│ │ ┌─────────┬───────┬────────┐ │ │");
        System.out.println("│ │ │  Eden   │  S0   │   S1   │ │ │");
        System.out.println("│ │ │ (新規)  │(生存) │ (生存) │ │ │");
        System.out.println("│ │ └─────────┴───────┴────────┘ │ │");
        System.out.println("│ └──────────────────────────────┘ │");
        System.out.println("│ ┌──────────────────────────────┐ │");
        System.out.println("│ │ Old Generation（Tenured）     │ │");
        System.out.println("│ │ 長生きオブジェクトの格納先       │ │");
        System.out.println("│ └──────────────────────────────┘ │");
        System.out.println("└──────────────────────────────────┘");
        System.out.println();

        System.out.println("=== オブジェクトの流れ ===");
        System.out.println("1. 新規オブジェクト → Eden に生成");
        System.out.println("2. Minor GC → 生存オブジェクトが S0/S1 に移動");
        System.out.println("3. 数回のGCを生き延びる → Old Generation に昇格");
        System.out.println("4. Old がいっぱい → Major GC（Full GC）実行");
    }
}`}
          expectedOutput={`=== ヒープの世代構造 ===

┌──────────────────────────────────┐
│ Heap                             │
│ ┌──────────────────────────────┐ │
│ │ Young Generation             │ │
│ │ ┌─────────┬───────┬────────┐ │ │
│ │ │  Eden   │  S0   │   S1   │ │ │
│ │ │ (新規)  │(生存) │ (生存) │ │ │
│ │ └─────────┴───────┴────────┘ │ │
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ Old Generation（Tenured）     │ │
│ │ 長生きオブジェクトの格納先       │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘

=== オブジェクトの流れ ===
1. 新規オブジェクト → Eden に生成
2. Minor GC → 生存オブジェクトが S0/S1 に移動
3. 数回のGCを生き延びる → Old Generation に昇格
4. Old がいっぱい → Major GC（Full GC）実行`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">GCアルゴリズムの種類</h2>
        <p className="text-gray-400 mb-4">
          用途に応じて最適なGCアルゴリズムを選択します。
          Java 17以降では G1GC がデフォルトです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== GCアルゴリズム比較 ===");
        System.out.println();

        String[][] gcs = {
            {"Serial GC", "-XX:+UseSerialGC",
             "シングルスレッド", "小規模アプリ、クライアント"},
            {"Parallel GC", "-XX:+UseParallelGC",
             "マルチスレッド、高スループット", "バッチ処理、計算重視"},
            {"G1 GC", "-XX:+UseG1GC",
             "リージョン分割、予測可能な停止時間", "汎用（Java 9+デフォルト）"},
            {"ZGC", "-XX:+UseZGC",
             "超低レイテンシ（<1ms停止）", "大規模ヒープ、低遅延要求"},
            {"Shenandoah", "-XX:+UseShenandoahGC",
             "低レイテンシ（並行GC）", "低遅延要求（OpenJDK）"}
        };

        for (String[] gc : gcs) {
            System.out.println("【" + gc[0] + "】");
            System.out.println("  オプション: " + gc[1]);
            System.out.println("  特徴: " + gc[2]);
            System.out.println("  用途: " + gc[3]);
            System.out.println();
        }
    }
}`}
          expectedOutput={`=== GCアルゴリズム比較 ===

【Serial GC】
  オプション: -XX:+UseSerialGC
  特徴: シングルスレッド
  用途: 小規模アプリ、クライアント

【Parallel GC】
  オプション: -XX:+UseParallelGC
  特徴: マルチスレッド、高スループット
  用途: バッチ処理、計算重視

【G1 GC】
  オプション: -XX:+UseG1GC
  特徴: リージョン分割、予測可能な停止時間
  用途: 汎用（Java 9+デフォルト）

【ZGC】
  オプション: -XX:+UseZGC
  特徴: 超低レイテンシ（<1ms停止）
  用途: 大規模ヒープ、低遅延要求

【Shenandoah】
  オプション: -XX:+UseShenandoahGC
  特徴: 低レイテンシ（並行GC）
  用途: 低遅延要求（OpenJDK）
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">GCの監視とチューニング</h2>
        <p className="text-gray-400 mb-4">
          GCの動作を監視し、適切にチューニングすることがJavaアプリケーションの
          パフォーマンス最適化に重要です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== GC監視オプション ===");
        System.out.println("-verbose:gc              GCログを出力");
        System.out.println("-Xlog:gc*                詳細GCログ（Java 9+）");
        System.out.println("-XX:+PrintGCDetails      GC詳細（Java 8）");
        System.out.println();

        System.out.println("=== よく使うチューニング ===");
        System.out.println("-Xms4g -Xmx4g           ヒープ固定（GC発生を安定化）");
        System.out.println("-XX:MaxGCPauseMillis=200 G1GC停止時間目標");
        System.out.println("-XX:NewRatio=2           Young:Old = 1:2");
        System.out.println();

        System.out.println("=== メモリリークの兆候 ===");
        System.out.println("1. Full GC後もメモリが減らない");
        System.out.println("2. Full GCの頻度が増加");
        System.out.println("3. OutOfMemoryError の発生");
        System.out.println();

        System.out.println("=== 分析ツール ===");
        System.out.println("jstat -gcutil <pid>     GC統計を表示");
        System.out.println("jmap -heap <pid>        ヒープ情報");
        System.out.println("jvisualvm               GUIモニタリング");
        System.out.println("Eclipse MAT             ヒープダンプ分析");
    }
}`}
          expectedOutput={`=== GC監視オプション ===
-verbose:gc              GCログを出力
-Xlog:gc*                詳細GCログ（Java 9+）
-XX:+PrintGCDetails      GC詳細（Java 8）

=== よく使うチューニング ===
-Xms4g -Xmx4g           ヒープ固定（GC発生を安定化）
-XX:MaxGCPauseMillis=200 G1GC停止時間目標
-XX:NewRatio=2           Young:Old = 1:2

=== メモリリークの兆候 ===
1. Full GC後もメモリが減らない
2. Full GCの頻度が増加
3. OutOfMemoryError の発生

=== 分析ツール ===
jstat -gcutil <pid>     GC統計を表示
jmap -heap <pid>        ヒープ情報
jvisualvm               GUIモニタリング
Eclipse MAT             ヒープダンプ分析`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="garbage-collection" />
      </div>
      <LessonNav lessons={lessons} currentId="garbage-collection" basePath="/learn/ecosystem" />
    </div>
  );
}
