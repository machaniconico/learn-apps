import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function ConfigurationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">設定</h1>
        <p className="text-gray-400">application.properties、application.yml、@Value、@ConfigurationProperties、プロファイル</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Spring Bootの設定管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring Bootでは <code className="text-orange-300">application.properties</code> または
          <code className="text-orange-300">application.yml</code> で設定を管理します。
          <code className="text-orange-300">@Value</code> で個別の値を、
          <code className="text-orange-300">@ConfigurationProperties</code> でグループ化された設定を注入できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>application.properties</code> - key=value形式の設定ファイル</li>
          <li><code>application.yml</code> - YAML形式の設定ファイル（階層構造向き）</li>
          <li><code>@Value("${'{'}key{'}'}")</code> - 個別の設定値を注入</li>
          <li><code>@ConfigurationProperties(prefix="app")</code> - 設定をBeanにバインド</li>
          <li>プロファイル（dev / prod）で環境ごとに設定を切り替え</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Valueによる設定値の注入</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@Value</code> アノテーションで application.properties の値を
          フィールドに注入します。デフォルト値も指定できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // application.properties の擬似的な読み込み
    static Map<String, String> properties = Map.of(
        "app.name", "MyApplication",
        "app.version", "1.0.0",
        "server.port", "8080",
        "app.max-users", "100"
    );

    // @Value を擬似的に再現
    static String getValue(String key, String defaultValue) {
        return properties.getOrDefault(key, defaultValue);
    }

    // @Component
    static class AppInfo {
        // @Value("${'$'}{app.name}")
        String appName = getValue("app.name", "DefaultApp");
        // @Value("${'$'}{app.version}")
        String version = getValue("app.version", "0.0.0");
        // @Value("${'$'}{server.port}")
        int port = Integer.parseInt(getValue("server.port", "8080"));
        // @Value("${'$'}{app.debug:false}")  <- デフォルト値
        boolean debug = Boolean.parseBoolean(getValue("app.debug", "false"));

        void printInfo() {
            System.out.println("アプリ名: " + appName);
            System.out.println("バージョン: " + version);
            System.out.println("ポート: " + port);
            System.out.println("デバッグモード: " + debug);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== @Value による設定注入 ===\\n");

        System.out.println("# application.properties");
        properties.forEach((k, v) ->
            System.out.println(k + "=" + v));

        System.out.println("\\n# 注入結果:");
        new AppInfo().printInfo();
    }
}`}
          expectedOutput={`=== @Value による設定注入 ===

# application.properties
app.name=MyApplication
app.version=1.0.0
server.port=8080
app.max-users=100

# 注入結果:
アプリ名: MyApplication
バージョン: 1.0.0
ポート: 8080
デバッグモード: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@ConfigurationPropertiesとプロファイル</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@ConfigurationProperties</code> で設定をまとめてバインドし、
          プロファイルで環境ごとの設定を切り替えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // @ConfigurationProperties(prefix = "app.datasource")
    static class DataSourceProperties {
        String url;
        String username;
        String password;
        int maxPoolSize;

        DataSourceProperties(String url, String user, String pass, int pool) {
            this.url = url; this.username = user;
            this.password = pass; this.maxPoolSize = pool;
        }

        void print() {
            System.out.println("  URL: " + url);
            System.out.println("  User: " + username);
            System.out.println("  Password: " + password.replaceAll(".", "*"));
            System.out.println("  MaxPool: " + maxPoolSize);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== プロファイルによる設定切り替え ===");

        // application-dev.properties
        System.out.println("\\n[Profile: dev]");
        System.out.println("spring.profiles.active=dev");
        new DataSourceProperties(
            "jdbc:h2:mem:devdb", "sa", "", 5
        ).print();

        // application-prod.properties
        System.out.println("\\n[Profile: prod]");
        System.out.println("spring.profiles.active=prod");
        new DataSourceProperties(
            "jdbc:mysql://db.example.com:3306/proddb",
            "app_user", "s3cureP@ss", 20
        ).print();

        System.out.println("\\n起動方法:");
        System.out.println("  java -jar app.jar --spring.profiles.active=prod");
    }
}`}
          expectedOutput={`=== プロファイルによる設定切り替え ===

[Profile: dev]
spring.profiles.active=dev
  URL: jdbc:h2:mem:devdb
  User: sa
  Password:
  MaxPool: 5

[Profile: prod]
spring.profiles.active=prod
  URL: jdbc:mysql://db.example.com:3306/proddb
  User: app_user
  Password: **********
  MaxPool: 20

起動方法:
  java -jar app.jar --spring.profiles.active=prod`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="configuration" />
      </div>
      <LessonNav lessons={lessons} currentId="configuration" basePath="/learn/spring-boot" />
    </div>
  );
}
