import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flow");

export default function FlowTestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Flow レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flowのテスト</h1>
        <p className="text-gray-400">turbineライブラリを使ったFlowの単体テストの書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">FlowのテストアプローチI</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Flowのテストには複数のアプローチがあります。
          toListで収集する方法、turbineライブラリを使う方法などがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>toList()でFlowを全収集してアサーションを行う</li>
          <li>turbineのtest&#123;&#125;で値を順番に検証できる</li>
          <li>runTestでコルーチンテスト用の仮想時間を使用</li>
          <li>StateFlowはvalueプロパティで現在値を確認できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">toListでのFlowテスト</h2>
        <p className="text-gray-400 mb-4">toList()でFlowの全出力を収集して検証する基本的な方法です。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun squaresFlow(max: Int): Flow<Int> = flow {
    for (i in 1..max) {
        emit(i * i)
    }
}

fun main() = runBlocking {
    // Flowのテストをシミュレート
    val results = squaresFlow(4).toList()
    println("結果: \${results}")
    println("サイズ: \${results.size == 4}")
    println("最初: \${results.first() == 1}")
    println("最後: \${results.last() == 16}")
}`}
          expectedOutput={`結果: [1, 4, 9, 16]
サイズ: true
最初: true
最後: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">StateFlowのテスト</h2>
        <p className="text-gray-400 mb-4">StateFlowのvalueプロパティで現在の状態を検証します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

class ViewModel {
    private val _uiState = MutableStateFlow("初期状態")
    val uiState: StateFlow<String> = _uiState.asStateFlow()

    fun updateState(newState: String) {
        _uiState.value = newState
    }
}

fun main() = runBlocking {
    val vm = ViewModel()

    println("初期値: \${vm.uiState.value == "初期状態"}")
    vm.updateState("ロード中")
    println("更新後: \${vm.uiState.value == "ロード中"}")
    vm.updateState("完了")
    println("最終: \${vm.uiState.value == "完了"}")
}`}
          expectedOutput={`初期値: true
更新後: true
最終: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="flow" lessonId="flow-testing" />
      </div>
      <LessonNav lessons={lessons} currentId="flow-testing" basePath="/learn/flow" />
    </div>
  );
}
