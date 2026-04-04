import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("data-sealed");

export default function SealedWithWhenPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データクラス・Sealed レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sealedクラスとwhen式</h1>
        <p className="text-gray-400">when式でsealed classのすべてのサブタイプを網羅処理する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">網羅的なwhen式</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          sealed classとwhen式を組み合わせると、コンパイラがすべてのサブタイプを
          処理しているかチェックします。elseブランチなしでの網羅チェックが
          型安全なコードを書く助けになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>when式でelseなしに全ケースを処理できる</li>
          <li>新サブクラス追加時にコンパイルエラーで検出</li>
          <li>is演算子でスマートキャストされる</li>
          <li>objectサブクラスはisではなく==で比較</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">UIStateの管理</h2>
        <p className="text-gray-400 mb-4">
          sealed classでUI状態を表現するパターンはAndroid開発でよく使われます。
        </p>
        <KotlinEditor
          defaultCode={`sealed class UiState {
    object Idle : UiState()
    object Loading : UiState()
    data class Success(val items: List<String>) : UiState()
    data class Error(val message: String) : UiState()
}

fun render(state: UiState): String = when (state) {
    is UiState.Idle -> "待機中"
    is UiState.Loading -> "読み込み中..."
    is UiState.Success -> "表示: ${"$"}{state.items.joinToString()}"
    is UiState.Error -> "エラー: ${"$"}{state.message}"
}

fun main() {
    println(render(UiState.Idle))
    println(render(UiState.Loading))
    println(render(UiState.Success(listOf("item1", "item2"))))
    println(render(UiState.Error("接続失敗")))
}`}
          expectedOutput={`待機中
読み込み中...
表示: item1, item2
エラー: 接続失敗`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イベント処理への応用</h2>
        <p className="text-gray-400 mb-4">
          ユーザーイベントもsealed classで表現すると型安全に処理できます。
        </p>
        <KotlinEditor
          defaultCode={`sealed class Event {
    data class Click(val x: Int, val y: Int) : Event()
    data class KeyPress(val key: Char) : Event()
    data class TextInput(val text: String) : Event()
    object Back : Event()
}

fun process(event: Event): String = when (event) {
    is Event.Click -> "クリック(${"$"}{event.x}, ${"$"}{event.y})"
    is Event.KeyPress -> "キー: ${"$"}{event.key}"
    is Event.TextInput -> "テキスト: ${"$"}{event.text}"
    Event.Back -> "戻る"
}

fun main() {
    listOf(
        Event.Click(100, 200),
        Event.KeyPress('A'),
        Event.TextInput("Hello"),
        Event.Back
    ).forEach { println(process(it)) }
}`}
          expectedOutput={`クリック(100, 200)
キー: A
テキスト: Hello
戻る`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="data-sealed" lessonId="sealed-with-when" />
      </div>
      <LessonNav lessons={lessons} currentId="sealed-with-when" basePath="/learn/data-sealed" />
    </div>
  );
}
