import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function CompletableFuturePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">マルチスレッド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CompletableFuture</h1>
        <p className="text-gray-400">supplyAsync、thenApply、thenAccept、allOfの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CompletableFutureとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">CompletableFuture</code> はJava 8で追加された
          非同期プログラミングのための強力なAPIです。
          コールバックのチェーンで非同期処理を宣言的に記述できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>supplyAsync(Supplier)</code> - 非同期で値を供給</li>
          <li><code>thenApply(Function)</code> - 結果を変換</li>
          <li><code>thenAccept(Consumer)</code> - 結果を消費</li>
          <li><code>thenCombine(other, BiFunction)</code> - 2つの結果を合成</li>
          <li><code>allOf(cf1, cf2, ...)</code> - すべての完了を待つ</li>
          <li><code>exceptionally(Function)</code> - 例外処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">supplyAsyncとthenApply</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">supplyAsync</code> で非同期に値を生成し、
          <code className="text-orange-300">thenApply</code> でその結果を変換するチェーンを作ります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) throws Exception {
        // supplyAsync -> thenApply -> thenAccept のチェーン
        CompletableFuture<Void> future = CompletableFuture
            .supplyAsync(() -> {
                System.out.println("1. データ取得中...");
                return "hello world";
            })
            .thenApply(s -> {
                System.out.println("2. 変換中...");
                return s.toUpperCase();
            })
            .thenApply(s -> {
                System.out.println("3. 加工中...");
                return "結果: " + s + " (文字数: " + s.length() + ")";
            })
            .thenAccept(result -> {
                System.out.println("4. " + result);
            });

        // 完了を待つ
        future.get();
    }
}`}
          expectedOutput={`1. データ取得中...
2. 変換中...
3. 加工中...
4. 結果: HELLO WORLD (文字数: 11)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">thenCombine - 2つの結果を合成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">thenCombine</code> で2つの非同期処理の結果を合成できます。
          両方が完了してから合成関数が実行されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.CompletableFuture;

public class Main {
    static CompletableFuture<Integer> fetchUserAge(String userId) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("年齢取得中...");
            return 25;
        });
    }

    static CompletableFuture<String> fetchUserName(String userId) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("名前取得中...");
            return "Alice";
        });
    }

    public static void main(String[] args) throws Exception {
        // 2つの非同期処理の結果を合成
        CompletableFuture<String> combined = fetchUserName("U001")
            .thenCombine(fetchUserAge("U001"), (name, age) -> {
                return name + "さん (" + age + "歳)";
            });

        String result = combined.get();
        System.out.println("合成結果: " + result);
    }
}`}
          expectedOutput={`名前取得中...
年齢取得中...
合成結果: Aliceさん (25歳)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">allOfとexceptionally</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">allOf</code> で複数の非同期処理の完了を待ち、
          <code className="text-orange-300">exceptionally</code> でエラーハンドリングを行います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.CompletableFuture;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    static CompletableFuture<String> fetchData(String source) {
        return CompletableFuture.supplyAsync(() -> {
            if ("Error".equals(source)) {
                throw new RuntimeException(source + "から取得失敗");
            }
            return source + "のデータ";
        }).exceptionally(ex -> {
            System.out.println("エラー処理: " + ex.getMessage());
            return source + "のデフォルトデータ";
        });
    }

    public static void main(String[] args) throws Exception {
        // allOfで複数の完了を待つ
        List<CompletableFuture<String>> futures = Arrays.asList(
            fetchData("API"),
            fetchData("DB"),
            fetchData("Error"),
            fetchData("Cache")
        );

        CompletableFuture<Void> all = CompletableFuture.allOf(
            futures.toArray(new CompletableFuture[0])
        );

        // 全完了後に結果を集約
        all.get();
        System.out.println("--- 全結果 ---");
        for (CompletableFuture<String> f : futures) {
            System.out.println(f.get());
        }
    }
}`}
          expectedOutput={`エラー処理: java.lang.RuntimeException: Errorから取得失敗
--- 全結果 ---
APIのデータ
DBのデータ
Errorのデフォルトデータ
Cacheのデータ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="completable-future" />
      </div>
      <LessonNav lessons={lessons} currentId="completable-future" basePath="/learn/threads" />
    </div>
  );
}
