import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function JsonProcessingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSON処理</h1>
        <p className="text-gray-400">Jackson ObjectMapper、readValue、writeValueAsStringの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JavaでのJSON処理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JSONはWebAPIやデータ交換で広く使われるフォーマットです。
          Javaでは <code className="text-orange-300">Jackson</code> や <code className="text-orange-300">Gson</code> ライブラリが主流です。
          ここではJacksonの概念をシンプルな実装で学びます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>ObjectMapper.readValue(json, Class)</code> - JSONからオブジェクトへ変換</li>
          <li><code>ObjectMapper.writeValueAsString(obj)</code> - オブジェクトからJSONへ変換</li>
          <li><code>@JsonProperty</code> - フィールドとJSONキーのマッピング</li>
          <li><code>@JsonIgnore</code> - シリアライズ対象外</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONの構築と解析の基本</h2>
        <p className="text-gray-400 mb-4">
          標準ライブラリだけでJSONの構築と解析を行う方法です。
          JacksonやGsonは内部でこのような処理を自動化しています。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    // 簡易JSON構築
    static String toJson(Map<String, Object> map) {
        StringBuilder sb = new StringBuilder("{");
        int i = 0;
        for (var entry : map.entrySet()) {
            if (i > 0) sb.append(", ");
            sb.append("\\"").append(entry.getKey()).append("\\": ");
            Object val = entry.getValue();
            if (val instanceof String) {
                sb.append("\\"").append(val).append("\\"");
            } else {
                sb.append(val);
            }
            i++;
        }
        sb.append("}");
        return sb.toString();
    }

    public static void main(String[] args) {
        // オブジェクト -> JSON (writeValueAsString相当)
        Map<String, Object> user = new LinkedHashMap<>();
        user.put("name", "Alice");
        user.put("age", 25);
        user.put("active", true);

        String json = toJson(user);
        System.out.println("JSON出力:");
        System.out.println(json);

        // 配列のJSON
        System.out.println();
        System.out.println("配列JSON:");
        List<String> skills = Arrays.asList("Java", "Spring", "SQL");
        System.out.println(skills);
    }
}`}
          expectedOutput={`JSON出力:
{"name": "Alice", "age": 25, "active": true}

配列JSON:
[Java, Spring, SQL]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ObjectMapperパターン</h2>
        <p className="text-gray-400 mb-4">
          JacksonのObjectMapperのようなJavaオブジェクトとJSON間の変換パターンを理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

class Book {
    String title;
    String author;
    int price;

    Book() {}
    Book(String title, String author, int price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    // ObjectMapper.writeValueAsString 相当
    String toJson() {
        return String.format(
            "{\\"title\\": \\"%s\\", \\"author\\": \\"%s\\", \\"price\\": %d}",
            title, author, price
        );
    }

    // ObjectMapper.readValue 相当
    static Book fromJson(String json) {
        Book book = new Book();
        json = json.replaceAll("[{}\\"\\s]", "");
        String[] pairs = json.split(",");
        for (String pair : pairs) {
            String[] kv = pair.split(":");
            String key = kv[0].trim();
            String value = kv[1].trim();
            switch (key) {
                case "title" -> book.title = value;
                case "author" -> book.author = value;
                case "price" -> book.price = Integer.parseInt(value);
            }
        }
        return book;
    }
}

public class Main {
    public static void main(String[] args) {
        // オブジェクト -> JSON
        Book book = new Book("Java入門", "山田太郎", 2800);
        String json = book.toJson();
        System.out.println("シリアライズ:");
        System.out.println(json);

        // JSON -> オブジェクト
        Book parsed = Book.fromJson(json);
        System.out.println("デシリアライズ:");
        System.out.println("  title: " + parsed.title);
        System.out.println("  author: " + parsed.author);
        System.out.println("  price: " + parsed.price);
    }
}`}
          expectedOutput={`シリアライズ:
{"title": "Java入門", "author": "山田太郎", "price": 2800}
デシリアライズ:
  title: Java入門
  author: 山田太郎
  price: 2800`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リストとネストしたJSONの処理</h2>
        <p className="text-gray-400 mb-4">
          複数のオブジェクトやネストした構造のJSON処理パターンを学びます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {
    // 簡易JSON配列構築
    static String toJsonArray(List<Map<String, Object>> list) {
        return list.stream()
            .map(map -> {
                String entries = map.entrySet().stream()
                    .map(e -> {
                        Object v = e.getValue();
                        String val = v instanceof String ? "\\"" + v + "\\"" : String.valueOf(v);
                        return "\\"" + e.getKey() + "\\": " + val;
                    })
                    .collect(Collectors.joining(", "));
                return "{" + entries + "}";
            })
            .collect(Collectors.joining(",\\n  ", "[\\n  ", "\\n]"));
    }

    public static void main(String[] args) {
        // リストをJSON配列に変換
        List<Map<String, Object>> users = new ArrayList<>();

        Map<String, Object> u1 = new LinkedHashMap<>();
        u1.put("id", 1); u1.put("name", "Alice"); u1.put("role", "admin");
        users.add(u1);

        Map<String, Object> u2 = new LinkedHashMap<>();
        u2.put("id", 2); u2.put("name", "Bob"); u2.put("role", "user");
        users.add(u2);

        Map<String, Object> u3 = new LinkedHashMap<>();
        u3.put("id", 3); u3.put("name", "Charlie"); u3.put("role", "user");
        users.add(u3);

        System.out.println("JSON配列:");
        System.out.println(toJsonArray(users));

        System.out.println();
        System.out.println("件数: " + users.size());
        System.out.println("admin: " + users.stream()
            .filter(u -> "admin".equals(u.get("role")))
            .map(u -> u.get("name"))
            .findFirst().orElse("なし"));
    }
}`}
          expectedOutput={`JSON配列:
[
  {"id": 1, "name": "Alice", "role": "admin"},
  {"id": 2, "name": "Bob", "role": "user"},
  {"id": 3, "name": "Charlie", "role": "user"}
]

件数: 3
admin: Alice`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="json-processing" />
      </div>
      <LessonNav lessons={lessons} currentId="json-processing" basePath="/learn/fileio" />
    </div>
  );
}
