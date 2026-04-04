import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("optional");

export default function GetValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Optional レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">値の取得</h1>
        <p className="text-gray-400">get、orElse、orElseGet、orElseThrow で値を安全に取り出す</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値の取得方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Optionalから値を取得する方法は複数あります。
          <code className="text-orange-300">get()</code> は値がない場合に例外を投げるため推奨されず、
          代わりに <code className="text-orange-300">orElse()</code> 系のメソッドを使うのが安全です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>get()</code> — 値を取得（空ならNoSuchElementException）</li>
          <li><code>orElse(defaultValue)</code> — 空ならデフォルト値を返す</li>
          <li><code>orElseGet(supplier)</code> — 空ならSupplierで生成した値を返す</li>
          <li><code>orElseThrow()</code> — 空なら例外をスロー（Java 10+）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">orElse と orElseGet</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">orElse()</code> はデフォルト値を直接渡し、
          <code className="text-orange-300">orElseGet()</code> はSupplier（遅延評価）で値を生成します。
          デフォルト値の生成コストが高い場合は <code className="text-orange-300">orElseGet()</code> が適切です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> present = Optional.of("Hello");
        Optional<String> empty = Optional.empty();

        // orElse: 値があればその値、なければデフォルト値
        System.out.println(present.orElse("default"));
        System.out.println(empty.orElse("default"));

        // orElseGet: 値がないときだけSupplierが呼ばれる
        System.out.println(present.orElseGet(() -> {
            System.out.println("  Supplier呼ばれた(present)");
            return "generated";
        }));

        System.out.println(empty.orElseGet(() -> {
            System.out.println("  Supplier呼ばれた(empty)");
            return "generated";
        }));
    }
}`}
          expectedOutput={`Hello
default
Hello
  Supplier呼ばれた(empty)
generated`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">orElseThrow</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">orElseThrow()</code> は値がない場合に例外をスローします。
          カスタム例外を指定することもでき、必須の値が見つからない場合に適しています。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    static Optional<String> findUser(String id) {
        if (id.equals("admin")) {
            return Optional.of("Administrator");
        }
        return Optional.empty();
    }

    public static void main(String[] args) {
        // 値がある場合
        String user1 = findUser("admin")
            .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
        System.out.println("ユーザー: " + user1);

        // 値がない場合 → 例外
        try {
            String user2 = findUser("guest")
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
        } catch (RuntimeException e) {
            System.out.println("例外: " + e.getMessage());
        }

        // orElseThrow()（引数なし、Java 10+）
        try {
            String user3 = findUser("unknown").orElseThrow();
        } catch (Exception e) {
            System.out.println("例外クラス: " + e.getClass().getSimpleName());
        }
    }
}`}
          expectedOutput={`ユーザー: Administrator
例外: ユーザーが見つかりません
例外クラス: NoSuchElementException`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">orElseとorElseGetの違い</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">orElse()</code> はデフォルト値を常に評価しますが、
          <code className="text-orange-300">orElseGet()</code> は値がない場合のみ評価されます。
          この違いは副作用のある処理で重要です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    static String createDefault() {
        System.out.println("  -> createDefault()が呼ばれた");
        return "デフォルト値";
    }

    public static void main(String[] args) {
        Optional<String> present = Optional.of("既存の値");

        // orElse: 値があっても createDefault() は呼ばれる！
        System.out.println("=== orElse ===");
        String r1 = present.orElse(createDefault());
        System.out.println("結果: " + r1);

        // orElseGet: 値があれば createDefault() は呼ばれない
        System.out.println("=== orElseGet ===");
        String r2 = present.orElseGet(Main::createDefault);
        System.out.println("結果: " + r2);
    }
}`}
          expectedOutput={`=== orElse ===
  -> createDefault()が呼ばれた
結果: 既存の値
=== orElseGet ===
結果: 既存の値`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optional" lessonId="get-values" />
      </div>
      <LessonNav lessons={lessons} currentId="get-values" basePath="/learn/optional" />
    </div>
  );
}
