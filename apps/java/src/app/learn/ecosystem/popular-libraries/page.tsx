import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function PopularLibrariesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">主要ライブラリ</h1>
        <p className="text-gray-400">Lombok、Jackson、Guava、Apache Commons、MapStruct</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaエコシステムの主要ライブラリ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaにはプロジェクトで頻繁に使用されるライブラリが多数あります。
          ボイラープレートの削減、JSON処理、ユーティリティなど、
          それぞれの得意分野を知って使い分けましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Lombok - アノテーションでボイラープレートコードを自動生成</li>
          <li>Jackson - JSON/XML/YAML のシリアライゼーション</li>
          <li>Guava - Googleの汎用ユーティリティ</li>
          <li>Apache Commons - 文字列、コレクション、IO等のユーティリティ</li>
          <li>MapStruct - Bean間のマッピングを自動生成</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Lombok</h2>
        <p className="text-gray-400 mb-4">
          Lombokはアノテーションでgetter/setter/constructor/toString等を自動生成し、
          Javaのボイラープレートコードを劇的に削減します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Lombok 主要アノテーション ===");
        System.out.println();

        String[][] annotations = {
            {"@Getter / @Setter", "getter/setterの自動生成"},
            {"@ToString", "toString()の自動生成"},
            {"@EqualsAndHashCode", "equals/hashCodeの自動生成"},
            {"@NoArgsConstructor", "引数なしコンストラクタ"},
            {"@AllArgsConstructor", "全引数コンストラクタ"},
            {"@RequiredArgsConstructor", "finalフィールドのコンストラクタ"},
            {"@Data", "Getter+Setter+ToString+Equals+RequiredArgs"},
            {"@Value", "不変クラス（finalフィールド+Getter）"},
            {"@Builder", "Builderパターンの自動生成"},
            {"@Slf4j", "ロガーフィールドの自動生成"}
        };

        for (String[] a : annotations) {
            System.out.printf("%-28s %s%n", a[0], a[1]);
        }

        System.out.println();
        System.out.println("// Lombokなし: 100行以上のボイラープレート");
        System.out.println("// Lombokあり:");
        System.out.println("@Data");
        System.out.println("@Builder");
        System.out.println("public class User {");
        System.out.println("    private String name;");
        System.out.println("    private String email;");
        System.out.println("    private int age;");
        System.out.println("}");
    }
}`}
          expectedOutput={`=== Lombok 主要アノテーション ===

@Getter / @Setter            getter/setterの自動生成
@ToString                    toString()の自動生成
@EqualsAndHashCode           equals/hashCodeの自動生成
@NoArgsConstructor           引数なしコンストラクタ
@AllArgsConstructor          全引数コンストラクタ
@RequiredArgsConstructor     finalフィールドのコンストラクタ
@Data                        Getter+Setter+ToString+Equals+RequiredArgs
@Value                       不変クラス（finalフィールド+Getter）
@Builder                     Builderパターンの自動生成
@Slf4j                       ロガーフィールドの自動生成

// Lombokなし: 100行以上のボイラープレート
// Lombokあり:
@Data
@Builder
public class User {
    private String name;
    private String email;
    private int age;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Jackson（JSON処理）</h2>
        <p className="text-gray-400 mb-4">
          JacksonはJavaで最も広く使われるJSON処理ライブラリです。
          Spring Bootではデフォルトで組み込まれています。
        </p>
        <JavaEditor
          defaultCode={`// Jackson使用例のイメージ（実行はシミュレーション）
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Jackson の使い方 ===");
        System.out.println();

        System.out.println("// Java → JSON（シリアライゼーション）");
        System.out.println("ObjectMapper mapper = new ObjectMapper();");
        System.out.println("String json = mapper.writeValueAsString(user);");
        System.out.println("→ {\\"name\\":\\"太郎\\",\\"age\\":25}");
        System.out.println();

        System.out.println("// JSON → Java（デシリアライゼーション）");
        System.out.println("User user = mapper.readValue(json, User.class);");
        System.out.println();

        System.out.println("=== よく使うアノテーション ===");
        String[][] annotations = {
            {"@JsonProperty(\\"user_name\\")", "JSONキー名の指定"},
            {"@JsonIgnore", "フィールドを除外"},
            {"@JsonFormat(pattern=\\"yyyy-MM-dd\\")", "日付フォーマット"},
            {"@JsonCreator", "デシリアライズ用コンストラクタ"},
            {"@JsonInclude(NON_NULL)", "nullフィールドを除外"}
        };

        for (String[] a : annotations) {
            System.out.printf("%-40s %s%n", a[0], a[1]);
        }
    }
}`}
          expectedOutput={`=== Jackson の使い方 ===

// Java → JSON（シリアライゼーション）
ObjectMapper mapper = new ObjectMapper();
String json = mapper.writeValueAsString(user);
→ {"name":"太郎","age":25}

// JSON → Java（デシリアライゼーション）
User user = mapper.readValue(json, User.class);

=== よく使うアノテーション ===
@JsonProperty("user_name")                 JSONキー名の指定
@JsonIgnore                                フィールドを除外
@JsonFormat(pattern="yyyy-MM-dd")          日付フォーマット
@JsonCreator                               デシリアライズ用コンストラクタ
@JsonInclude(NON_NULL)                     nullフィールドを除外`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Guava と Apache Commons</h2>
        <p className="text-gray-400 mb-4">
          GuavaはGoogleが提供する汎用ユーティリティ、Apache Commonsは
          Apacheの定番ユーティリティ集です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Guava の主な機能 ===");
        String[][] guava = {
            {"ImmutableList.of(1,2,3)", "不変リスト"},
            {"Multimap", "1つのキーに複数の値"},
            {"BiMap", "双方向マップ"},
            {"Cache/LoadingCache", "キャッシュ"},
            {"Preconditions.checkNotNull()", "引数チェック"},
            {"Joiner.on(\\",\\").join(list)", "文字列結合"},
            {"Splitter.on(\\",\\").split(str)", "文字列分割"}
        };

        for (String[] g : guava) {
            System.out.printf("  %-35s %s%n", g[0], g[1]);
        }

        System.out.println();
        System.out.println("=== Apache Commons の主な機能 ===");
        String[][] commons = {
            {"StringUtils.isBlank(str)", "空/null安全な判定"},
            {"StringUtils.capitalize(str)", "先頭大文字化"},
            {"CollectionUtils.isEmpty(list)", "コレクション空チェック"},
            {"FileUtils.readFileToString(file)", "ファイル読み込み"},
            {"IOUtils.copy(input, output)", "ストリームコピー"},
            {"BeanUtils.copyProperties(src, dest)", "Beanコピー"}
        };

        for (String[] c : commons) {
            System.out.printf("  %-40s %s%n", c[0], c[1]);
        }

        System.out.println();
        System.out.println("=== MapStruct ===");
        System.out.println("  Bean間のマッピングをコンパイル時に自動生成");
        System.out.println("  @Mapper interface UserMapper {");
        System.out.println("      UserDto toDto(User user);");
        System.out.println("  }");
    }
}`}
          expectedOutput={`=== Guava の主な機能 ===
  ImmutableList.of(1,2,3)               不変リスト
  Multimap                              1つのキーに複数の値
  BiMap                                 双方向マップ
  Cache/LoadingCache                    キャッシュ
  Preconditions.checkNotNull()          引数チェック
  Joiner.on(",").join(list)             文字列結合
  Splitter.on(",").split(str)           文字列分割

=== Apache Commons の主な機能 ===
  StringUtils.isBlank(str)                   空/null安全な判定
  StringUtils.capitalize(str)                先頭大文字化
  CollectionUtils.isEmpty(list)              コレクション空チェック
  FileUtils.readFileToString(file)           ファイル読み込み
  IOUtils.copy(input, output)                ストリームコピー
  BeanUtils.copyProperties(src, dest)        Beanコピー

=== MapStruct ===
  Bean間のマッピングをコンパイル時に自動生成
  @Mapper interface UserMapper {
      UserDto toDto(User user);
  }`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="popular-libraries" />
      </div>
      <LessonNav lessons={lessons} currentId="popular-libraries" basePath="/learn/ecosystem" />
    </div>
  );
}
