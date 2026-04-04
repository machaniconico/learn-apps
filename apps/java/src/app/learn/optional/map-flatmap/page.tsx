import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("optional");

export default function MapFlatMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Optional レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">map・flatMap</h1>
        <p className="text-gray-400">Optional の変換チェーンで安全にデータを加工する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optionalのmap・flatMap</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Optionalの <code className="text-orange-300">map()</code> は、値が存在する場合に関数を適用して
          新しいOptionalを返します。値がない場合は空のOptionalがそのまま伝播します。
          <code className="text-orange-300">flatMap()</code> は関数がOptionalを返す場合に使い、
          二重のOptionalを防ぎます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>map(Function)</code> — 値を変換、結果を新しいOptionalに包む</li>
          <li><code>flatMap(Function)</code> — 関数がOptionalを返す場合に使用</li>
          <li>値が空なら変換を行わず、空のOptionalを返す</li>
          <li>mapやflatMapを連鎖させて安全な変換パイプラインを構築</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapで値を変換する</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">map()</code> は値が存在する場合のみ変換を適用します。
          nullチェックの連鎖を避け、流れるように処理を記述できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> name = Optional.of("  Java Programming  ");

        // mapでチェーン: トリム → 大文字 → 長さ
        Optional<Integer> length = name
            .map(String::trim)
            .map(String::toUpperCase)
            .map(String::length);
        System.out.println("長さ: " + length.orElse(0));

        // 空のOptionalはmapをスキップ
        Optional<String> empty = Optional.empty();
        Optional<Integer> emptyLength = empty
            .map(String::trim)
            .map(String::length);
        System.out.println("空の長さ: " + emptyLength.orElse(0));
    }
}`}
          expectedOutput={`長さ: 16
空の長さ: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">flatMapで Optional を返す関数を連鎖</h2>
        <p className="text-gray-400 mb-4">
          関数自体がOptionalを返す場合、<code className="text-orange-300">map()</code> を使うと
          <code className="text-orange-300">Optional&lt;Optional&lt;T&gt;&gt;</code> になってしまいます。
          <code className="text-orange-300">flatMap()</code> で1段階にフラット化します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

public class Main {
    static Map<String, String> userDepartment = new HashMap<>();
    static Map<String, String> departmentManager = new HashMap<>();

    static {
        userDepartment.put("alice", "engineering");
        userDepartment.put("bob", "sales");
        departmentManager.put("engineering", "Charlie");
    }

    static Optional<String> getDepartment(String user) {
        return Optional.ofNullable(userDepartment.get(user));
    }

    static Optional<String> getManager(String dept) {
        return Optional.ofNullable(departmentManager.get(dept));
    }

    public static void main(String[] args) {
        // flatMapで連鎖: ユーザー → 部署 → マネージャー
        Optional<String> manager1 = getDepartment("alice")
            .flatMap(Main::getManager);
        System.out.println("aliceの上司: " + manager1.orElse("不明"));

        // 部署はあるがマネージャーがない場合
        Optional<String> manager2 = getDepartment("bob")
            .flatMap(Main::getManager);
        System.out.println("bobの上司: " + manager2.orElse("不明"));

        // ユーザーが見つからない場合
        Optional<String> manager3 = getDepartment("charlie")
            .flatMap(Main::getManager);
        System.out.println("charlieの上司: " + manager3.orElse("不明"));
    }
}`}
          expectedOutput={`aliceの上司: Charlie
bobの上司: 不明
charlieの上司: 不明`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">filterと組み合わせる</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">filter()</code> はOptionalの値が条件を満たす場合のみ値を保持します。
          map、flatMap、filterを組み合わせることで、安全な変換・検証パイプラインを構築できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> email = Optional.of("user@example.com");

        // filter + map のチェーン
        String domain = email
            .filter(e -> e.contains("@"))
            .map(e -> e.substring(e.indexOf("@") + 1))
            .map(String::toUpperCase)
            .orElse("無効なメール");
        System.out.println("ドメイン: " + domain);

        // filterで除外される場合
        Optional<Integer> age = Optional.of(15);
        String status = age
            .filter(a -> a >= 18)
            .map(a -> "成人（" + a + "歳）")
            .orElse("未成年");
        System.out.println("ステータス: " + status);

        Optional<Integer> adultAge = Optional.of(25);
        String status2 = adultAge
            .filter(a -> a >= 18)
            .map(a -> "成人（" + a + "歳）")
            .orElse("未成年");
        System.out.println("ステータス: " + status2);
    }
}`}
          expectedOutput={`ドメイン: EXAMPLE.COM
ステータス: 未成年
ステータス: 成人（25歳）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optional" lessonId="map-flatmap" />
      </div>
      <LessonNav lessons={lessons} currentId="map-flatmap" basePath="/learn/optional" />
    </div>
  );
}
