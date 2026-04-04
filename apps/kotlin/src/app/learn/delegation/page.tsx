import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegation");

const quizQuestions: QuizQuestion[] = [
  {
    question: "byキーワードを使ったインターフェース委譲の目的は何ですか？",
    options: [
      "クラスを継承するため",
      "インターフェースの実装を別オブジェクトに委譲するため",
      "プロパティを非公開にするため",
      "関数をインライン化するため",
    ],
    answer: 1,
    explanation: "byキーワードによりインターフェース実装を別のオブジェクトに委譲し、コードの再利用ができます。",
  },
  {
    question: "by lazyの特徴として正しいのはどれですか？",
    options: [
      "プロパティが宣言された時点で初期化される",
      "初回アクセス時に一度だけ初期化される",
      "毎回アクセスするたびに再計算される",
      "nullを返す可能性がある",
    ],
    answer: 1,
    explanation: "by lazyは初回アクセス時に一度だけラムダを実行して値を計算し、以降はキャッシュされた値を返します。",
  },
  {
    question: "Delegates.observableで監視できることはどれですか？",
    options: [
      "プロパティへの読み取り",
      "プロパティへの書き込み（変更前後の値）",
      "クラスのインスタンス化",
      "関数の呼び出し",
    ],
    answer: 1,
    explanation: "Delegates.observableはプロパティに値がセットされるたびに、変更前の値・変更後の値を通知します。",
  },
  {
    question: "MapへのプロパティValueの委譲に使うキーはどれですか？",
    options: [
      "プロパティのインデックス番号",
      "プロパティ名と同じ文字列キー",
      "ランダムなUUID",
      "クラス名",
    ],
    answer: 1,
    explanation: "Mapへのプロパティ委譲ではプロパティ名と同じ文字列キーでMapにアクセスします。",
  },
];

export default function DelegationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">委譲</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの委譲機能を学びます。委譲デザインパターンから始め、byキーワードによるインターフェース委譲、
          by lazyによる遅延初期化、Delegates.observableによるプロパティ監視、
          Mapへのプロパティ委譲まで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="delegation" totalLessons={5} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/delegation" color="red" categoryId="delegation" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">by lazyの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">by lazy</code>を使うと、初回アクセス時に
          一度だけ初期化されるプロパティを作成できます。
        </p>
        <KotlinEditor
          defaultCode={`class DatabaseConnection {
    val connectionString: String by lazy {
        println("接続文字列を初期化中...")
        "jdbc:kotlin://localhost:5432/mydb"
    }
}

fun main() {
    val db = DatabaseConnection()
    println("オブジェクト作成完了")
    println(db.connectionString)
    println(db.connectionString) // 2回目はキャッシュから
}`}
          expectedOutput={`オブジェクト作成完了
接続文字列を初期化中...
jdbc:kotlin://localhost:5432/mydb
jdbc:kotlin://localhost:5432/mydb`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">byキーワードによる委譲</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">by</code>キーワードでインターフェースの実装を
          別オブジェクトに委譲します。
        </p>
        <KotlinEditor
          defaultCode={`interface Printer {
    fun print(text: String)
    fun printUpperCase(text: String)
}

class ConsolePrinter : Printer {
    override fun print(text: String) = println(text)
    override fun printUpperCase(text: String) = println(text.uppercase())
}

class Document(printer: Printer) : Printer by printer {
    fun printDocument() {
        print("ドキュメント内容")
        printUpperCase("重要なタイトル")
    }
}

fun main() {
    val doc = Document(ConsolePrinter())
    doc.printDocument()
}`}
          expectedOutput={`ドキュメント内容
重要なタイトル`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
