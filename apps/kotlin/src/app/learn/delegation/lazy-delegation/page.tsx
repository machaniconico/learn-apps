import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegation");

export default function LazyDelegationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">委譲 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">lazyデリゲート</h1>
        <p className="text-gray-400">by lazyを使って初回アクセス時に初期化される遅延プロパティの作り方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">遅延初期化とby lazy</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          by lazyを使うと、プロパティが初めてアクセスされたときだけ初期化されます。
          コストの高い初期化処理を必要になるまで遅らせることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>val プロパティ名: 型 by lazy &#123; 初期化処理 &#125;</li>
          <li>初回アクセス時に一度だけラムダが実行される</li>
          <li>2回目以降はキャッシュされた値を返す</li>
          <li>デフォルトはスレッドセーフ（LazyThreadSafetyMode.SYNCHRONIZED）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">by lazyの基本</h2>
        <p className="text-gray-400 mb-4">初回アクセス時にのみ初期化が実行されることを確認します。</p>
        <KotlinEditor
          defaultCode={`class HeavyObject {
    val data: List<Int> by lazy {
        println("データを計算中...")
        (1..5).map { it * it }
    }

    val summary: String by lazy {
        println("サマリーを生成中...")
        "合計: \${data.sum()}, 件数: \${data.size}"
    }
}

fun main() {
    val obj = HeavyObject()
    println("オブジェクト作成（まだ初期化されていない）")
    println("データ: \${obj.data}")
    println("データ再アクセス（キャッシュから）: \${obj.data}")
    println("サマリー: \${obj.summary}")
}`}
          expectedOutput={`オブジェクト作成（まだ初期化されていない）
データを計算中...
データ: [1, 4, 9, 16, 25]
データ再アクセス（キャッシュから）: [1, 4, 9, 16, 25]
サマリーを生成中...
合計: 55, 件数: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">by lazyの実用例</h2>
        <p className="text-gray-400 mb-4">設定の読み込みや高コストな計算を遅延させる実用的なパターンです。</p>
        <KotlinEditor
          defaultCode={`class AppConfig {
    val databaseUrl: String by lazy {
        println("DB設定を読み込み中...")
        "jdbc:postgresql://localhost:5432/myapp"
    }

    val maxConnections: Int by lazy {
        println("接続数を計算中...")
        Runtime.getRuntime().availableProcessors() * 2
    }
}

fun main() {
    val config = AppConfig()
    println("=== アプリ起動 ===")

    // DBが必要になったときだけ読み込まれる
    println("DB URL: \${config.databaseUrl}")
    println("最大接続数: \${config.maxConnections}")
    println("DB URL再アクセス: \${config.databaseUrl}")
}`}
          expectedOutput={`=== アプリ起動 ===
DB設定を読み込み中...
DB URL: jdbc:postgresql://localhost:5432/myapp
接続数を計算中...
最大接続数: 8
DB URL再アクセス: jdbc:postgresql://localhost:5432/myapp`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">lazyのスレッドセーフモード</h2>
        <p className="text-gray-400 mb-4">LazyThreadSafetyModeでスレッド安全性のレベルを指定できます。</p>
        <KotlinEditor
          defaultCode={`val syncLazy: String by lazy(LazyThreadSafetyMode.SYNCHRONIZED) {
    "スレッドセーフ（デフォルト）"
}

val noneThreadSafe: String by lazy(LazyThreadSafetyMode.NONE) {
    "シングルスレッド用（最速）"
}

val publication: String by lazy(LazyThreadSafetyMode.PUBLICATION) {
    "複数スレッドで初期化可能だが最初の値を使用"
}

fun main() {
    println(syncLazy)
    println(noneThreadSafe)
    println(publication)
}`}
          expectedOutput={`スレッドセーフ（デフォルト）
シングルスレッド用（最速）
複数スレッドで初期化可能だが最初の値を使用`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegation" lessonId="lazy-delegation" />
      </div>
      <LessonNav lessons={lessons} currentId="lazy-delegation" basePath="/learn/delegation" />
    </div>
  );
}
