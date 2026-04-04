import { KotlinEditor } from "@/components/kotlin-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: 買い物リスト管理 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-green-900 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">初級</span>
          <h2 className="text-xl font-bold text-white">買い物リスト管理</h2>
        </div>
        <p className="text-gray-400 mb-4">data classとリストを使って、買い物リストを管理するアプリを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-red-300 bg-gray-800 px-1 rounded">data class</code> で商品アイテムを定義する</li>
          <li>リストへの追加・削除・完了マークの操作を実装する</li>
          <li>カテゴリ別にグループ化して表示する</li>
          <li>合計金額を計算して出力する</li>
        </ul>
        <KotlinEditor
          defaultCode={`// TODO: Itemデータクラスを定義する
// (name: String, price: Int, category: String, isPurchased: Boolean = false)

// TODO: ShoppingListクラスを実装する
class ShoppingList {
    private val items = mutableListOf<Any>() // TODO: 正しい型に変更する

    // TODO: アイテムを追加するaddItem関数を実装する

    // TODO: アイテムを購入済みにするmarkPurchased関数を実装する

    // TODO: カテゴリ別にグループ化して表示するprintByCategory関数を実装する

    // TODO: 未購入アイテムの合計金額を返すtotalPrice関数を実装する
}

fun main() {
    val list = ShoppingList()
    // TODO: 食品・日用品などカテゴリ別に5件追加する
    // TODO: いくつかを購入済みにする
    // TODO: カテゴリ別一覧と合計金額を出力する
}`}
        />
      </div>

      {/* プロジェクト2: 成績分析ツール */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">成績分析ツール</h2>
        </div>
        <p className="text-gray-400 mb-4">コレクション操作と拡張関数を活用して、学生の成績を分析するツールを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>コレクション操作（<code className="text-red-300 bg-gray-800 px-1 rounded">filter</code>, <code className="text-red-300 bg-gray-800 px-1 rounded">map</code>, <code className="text-red-300 bg-gray-800 px-1 rounded">groupBy</code>）を活用する</li>
          <li>点数から成績（A〜F）を返す拡張関数を実装する</li>
          <li>科目ごとの平均・最高・最低点を計算する</li>
          <li>上位3名を出力するランキング機能を追加する</li>
        </ul>
        <KotlinEditor
          defaultCode={`data class Student(val name: String, val subject: String, val score: Int)

// TODO: Intの拡張関数 toGrade() を実装する
// 90以上→"A", 80以上→"B", 70以上→"C", 60以上→"D", それ未満→"F"

// TODO: List<Student>の拡張関数 subjectStats() を実装する
// 科目ごとに平均・最高・最低点を出力する

fun main() {
    val students = listOf(
        Student("田中", "数学", 85),
        Student("鈴木", "数学", 72),
        Student("佐藤", "数学", 91),
        Student("田中", "英語", 78),
        Student("鈴木", "英語", 88),
        Student("佐藤", "英語", 65),
    )

    // TODO: 各学生の成績(A〜F)を名前と一緒に出力する

    // TODO: 科目ごとの統計を出力する

    // TODO: 全科目合計点のトップ3を出力する
}`}
        />
      </div>

      {/* プロジェクト3: 非同期天気取得 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-orange-900 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-full">上級</span>
          <h2 className="text-xl font-bold text-white">非同期天気取得シミュレーター</h2>
        </div>
        <p className="text-gray-400 mb-4">coroutineとsealed classを使って、複数都市の天気を非同期で取得するシステムを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-red-300 bg-gray-800 px-1 rounded">sealed class</code> で成功・失敗・ローディング状態を表現する</li>
          <li><code className="text-red-300 bg-gray-800 px-1 rounded">suspend</code> 関数でAPIコールをシミュレートする</li>
          <li><code className="text-red-300 bg-gray-800 px-1 rounded">async/await</code> で複数都市を並列取得する</li>
          <li>エラーハンドリングと再試行ロジックを実装する</li>
        </ul>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

// TODO: WeatherResultのsealed classを定義する
// Success(city: String, temp: Double, condition: String)
// Error(city: String, message: String)
// Loading(city: String)

// TODO: 天気取得をシミュレートするsuspend関数を実装する
// suspend fun fetchWeather(city: String): WeatherResult
// ランダムで成功/失敗し、遅延をdolay()でシミュレート

// TODO: 複数都市を並列取得するfetchAllWeatherを実装する
// suspend fun fetchAllWeather(cities: List<String>): List<WeatherResult>

fun main() = runBlocking {
    val cities = listOf("東京", "大阪", "札幌", "福岡", "名古屋")
    // TODO: 並列で天気を取得して結果を出力する
    // TODO: 失敗した都市数と成功した都市数を集計して表示する
}`}
        />
      </div>

      {/* プロジェクト4: ミニチャットBot */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">ミニチャットBot</h2>
        </div>
        <p className="text-gray-400 mb-4">when式と文字列操作を使って、コマンドを解析するチャットBotを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-red-300 bg-gray-800 px-1 rounded">when</code> 式でコマンドを分岐処理する</li>
          <li>文字列操作（<code className="text-red-300 bg-gray-800 px-1 rounded">split</code>, <code className="text-red-300 bg-gray-800 px-1 rounded">trim</code>, <code className="text-red-300 bg-gray-800 px-1 rounded">lowercase</code>）でコマンドを解析する</li>
          <li>会話履歴をリストに保存する</li>
          <li>感情分析（キーワードベース）でポジティブ/ネガティブを判定する</li>
        </ul>
        <KotlinEditor
          defaultCode={`data class Message(val role: String, val content: String)

// TODO: BotResponseのsealed classを定義する
// Reply(text: String), Command(name: String, args: List<String>), Unknown

// TODO: ユーザー入力を解析する関数を実装する
// fun parseInput(input: String): BotResponse
// "/help", "/time", "/echo <text>", "/sentiment <text>" などを処理

// TODO: 感情分析関数を実装する（キーワードベース）
// fun analyzeSentiment(text: String): String
// ポジティブワードとネガティブワードリストを使って判定

fun main() {
    val history = mutableListOf<Message>()

    // TODO: 以下の入力を順番にparseInputで処理して応答を出力する
    val inputs = listOf(
        "/help",
        "/echo Kotlinは楽しいです",
        "/sentiment 今日はとても嬉しい気分です",
        "/sentiment 少し疲れて気分が悪い",
        "こんにちは",
    )
    // TODO: 各入力と応答を履歴に追加して、最後に全履歴を出力する
}`}
        />
      </div>
    </div>
  );
}
