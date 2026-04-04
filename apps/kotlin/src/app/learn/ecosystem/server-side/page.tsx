import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function ServerSidePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Kotlinエコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">サーバーサイドKotlin</h1>
        <p className="text-gray-400">KtorやSpring BootなどKotlinを使ったサーバーサイド開発の概要を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">サーバーサイドKotlinの選択肢</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          KotlinはJVMで動作するため、既存のJavaフレームワークをそのまま使えます。
          さらにKotlin専用フレームワークのKtorはコルーチンを活かした非同期処理に優れています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Ktor - JetBrains製の軽量非同期Webフレームワーク</li>
          <li>Spring Boot - JavaのデファクトスタンダードをKotlinで活用</li>
          <li>Micronaut - GraalVM対応の軽量フレームワーク</li>
          <li>Quarkus - Red Hat製のKubernetes向けフレームワーク</li>
          <li>Exposed - JetBrains製のKotlin SQL DSL</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">KtorによるAPIサーバー</h2>
        <p className="text-gray-400 mb-4">
          KtorはKotlin DSLを使ってルーティングやミドルウェアを設定します。
          コルーチンベースで高性能な非同期処理が可能です。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val ktorExample = """
// Ktor アプリケーションの例

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello, Ktor!")
        }

        route("/api/users") {
            get {
                val users = userService.getAllUsers()
                call.respond(users)
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                    ?: return@get call.respond(HttpStatusCode.BadRequest)
                val user = userService.getUserById(id)
                    ?: return@get call.respond(HttpStatusCode.NotFound)
                call.respond(user)
            }

            post {
                val request = call.receive<CreateUserRequest>()
                val user = userService.createUser(request)
                call.respond(HttpStatusCode.Created, user)
            }
        }
    }
}
    """.trimIndent()

    println(ktorExample)
}`}
          expectedOutput={`// Ktor アプリケーションの例

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello, Ktor!")
        }

        route("/api/users") {
            get {
                val users = userService.getAllUsers()
                call.respond(users)
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                    ?: return@get call.respond(HttpStatusCode.BadRequest)
                val user = userService.getUserById(id)
                    ?: return@get call.respond(HttpStatusCode.NotFound)
                call.respond(user)
            }

            post {
                val request = call.receive<CreateUserRequest>()
                val user = userService.createUser(request)
                call.respond(HttpStatusCode.Created, user)
            }
        }
    }
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Spring Boot + Kotlinの特徴</h2>
        <p className="text-gray-400 mb-4">
          Spring Bootはkotlin-springプラグインを使うことでKotlinとシームレスに統合できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val springKotlinExample = """
// Spring Boot + Kotlin の例

@RestController
@RequestMapping("/api/products")
class ProductController(private val productService: ProductService) {

    @GetMapping
    suspend fun getAllProducts(): List<ProductDto> =
        productService.findAll()

    @GetMapping("/{id}")
    suspend fun getProduct(@PathVariable id: Long): ProductDto =
        productService.findById(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    suspend fun createProduct(@RequestBody request: CreateProductRequest): ProductDto =
        productService.create(request)
}

// データクラスをDTOとして活用
data class ProductDto(
    val id: Long,
    val name: String,
    val price: Int,
    val stock: Int
)
    """.trimIndent()

    println(springKotlinExample)

    println()
    println("KotlinとSpring Bootの相性:")
    println("  - data classでエンティティ・DTOをシンプルに定義")
    println("  - コルーチン(suspend fun)でリアクティブな非同期処理")
    println("  - 拡張関数でSpringのAPIをKotlinらしく使える")
    println("  - Null安全でNullPointerExceptionを防止")
}`}
          expectedOutput={`// Spring Boot + Kotlin の例

@RestController
@RequestMapping("/api/products")
class ProductController(private val productService: ProductService) {

    @GetMapping
    suspend fun getAllProducts(): List<ProductDto> =
        productService.findAll()

    @GetMapping("/{id}")
    suspend fun getProduct(@PathVariable id: Long): ProductDto =
        productService.findById(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    suspend fun createProduct(@RequestBody request: CreateProductRequest): ProductDto =
        productService.create(request)
}

// データクラスをDTOとして活用
data class ProductDto(
    val id: Long,
    val name: String,
    val price: Int,
    val stock: Int
)

KotlinとSpring Bootの相性:
  - data classでエンティティ・DTOをシンプルに定義
  - コルーチン(suspend fun)でリアクティブな非同期処理
  - 拡張関数でSpringのAPIをKotlinらしく使える
  - Null安全でNullPointerExceptionを防止`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="server-side" />
      </div>
      <LessonNav lessons={lessons} currentId="server-side" basePath="/learn/ecosystem" />
    </div>
  );
}
