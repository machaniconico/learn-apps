import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function AndroidDevelopmentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Kotlinエコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Android開発</h1>
        <p className="text-gray-400">KotlinをAndroid開発で使う際の基本とJetpack Composeとの連携を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">KotlinとAndroid</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GoogleはGoogle I/O 2017でKotlinをAndroid公式開発言語として発表し、
          2019年にはKotlin-firstを宣言しました。現在はAndroid新規プロジェクトの大部分がKotlinで書かれています。
          Jetpack Composeの登場でUIもKotlinで宣言的に書けるようになりました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Kotlinの簡潔な構文でAndroid開発がより快適に</li>
          <li>コルーチンで非同期処理（ネットワーク、DB）を簡潔に記述</li>
          <li>Jetpack ComposeでUIをKotlinコードとして宣言的に構築</li>
          <li>KotlinのNull安全でNullPointerExceptionを防止</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">主要なJetpackライブラリ</h2>
        <p className="text-gray-400 mb-4">
          AndroidのJetpackライブラリはKotlinと深く統合されています。
        </p>
        <KotlinEditor
          defaultCode={`data class JetpackLibrary(val name: String, val purpose: String, val kotlinFeature: String)

fun main() {
    val libraries = listOf(
        JetpackLibrary(
            "Compose",
            "宣言的UIツールキット",
            "DSLスタイルのUI定義"
        ),
        JetpackLibrary(
            "ViewModel",
            "UI状態管理",
            "コルーチンスコープ統合"
        ),
        JetpackLibrary(
            "Room",
            "SQLiteデータベースORM",
            "suspend関数でクエリ実行"
        ),
        JetpackLibrary(
            "DataStore",
            "設定・データの永続化",
            "Flowで非同期データ読み込み"
        ),
        JetpackLibrary(
            "WorkManager",
            "バックグラウンドタスク管理",
            "コルーチンWorker対応"
        ),
        JetpackLibrary(
            "Navigation",
            "画面遷移管理",
            "型安全なルーティング(Compose)"
        )
    )

    println("=== Androidの主要Jetpackライブラリ ===")
    libraries.forEach { lib ->
        println("\${lib.name}: \${lib.purpose}")
        println("  Kotlin活用: \${lib.kotlinFeature}")
    }
}`}
          expectedOutput={`=== Androidの主要Jetpackライブラリ ===
Compose: 宣言的UIツールキット
  Kotlin活用: DSLスタイルのUI定義
ViewModel: UI状態管理
  Kotlin活用: コルーチンスコープ統合
Room: SQLiteデータベースORM
  Kotlin活用: suspend関数でクエリ実行
DataStore: 設定・データの永続化
  Kotlin活用: Flowで非同期データ読み込み
WorkManager: バックグラウンドタスク管理
  Kotlin活用: コルーチンWorker対応
Navigation: 画面遷移管理
  Kotlin活用: 型安全なルーティング(Compose)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Jetpack ComposeのKotlin DSL</h2>
        <p className="text-gray-400 mb-4">
          Jetpack ComposeはKotlinのDSL機能を活かしてUIを宣言的に記述します。
          実際のコード構造を確認しましょう。
        </p>
        <KotlinEditor
          defaultCode={`// Jetpack Compose の構造をシミュレート
fun main() {
    val composeExample = """
// Android Jetpack Compose の例

@Composable
fun UserCard(user: User, onFollow: () -> Unit) {
    Card(modifier = Modifier.padding(16.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = user.name,
                style = MaterialTheme.typography.headlineSmall
            )
            Text(
                text = user.bio,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Button(onClick = onFollow) {
                Text("フォロー")
            }
        }
    }
}

// ViewModel（コルーチンとFlowを活用）
class UserViewModel : ViewModel() {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()

    fun loadUsers() {
        viewModelScope.launch {
            _users.value = repository.getUsers()
        }
    }
}
    """.trimIndent()

    println(composeExample)
    println()
    println("Composeのコンセプト:")
    println("  - @Composable関数でUIコンポーネントを定義")
    println("  - 状態が変わると自動で再コンポーズ（再描画）")
    println("  - ViewModelのStateFlowで状態を管理")
}`}
          expectedOutput={`// Android Jetpack Compose の例

@Composable
fun UserCard(user: User, onFollow: () -> Unit) {
    Card(modifier = Modifier.padding(16.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = user.name,
                style = MaterialTheme.typography.headlineSmall
            )
            Text(
                text = user.bio,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Button(onClick = onFollow) {
                Text("フォロー")
            }
        }
    }
}

// ViewModel（コルーチンとFlowを活用）
class UserViewModel : ViewModel() {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()

    fun loadUsers() {
        viewModelScope.launch {
            _users.value = repository.getUsers()
        }
    }
}

Composeのコンセプト:
  - @Composable関数でUIコンポーネントを定義
  - 状態が変わると自動で再コンポーズ（再描画）
  - ViewModelのStateFlowで状態を管理`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="android-development" />
      </div>
      <LessonNav lessons={lessons} currentId="android-development" basePath="/learn/ecosystem" />
    </div>
  );
}
