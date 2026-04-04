import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function StackTracePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタックトレース</h1>
        <p className="text-gray-400">例外のスタックトレースの読み方と原因特定の方法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          例外が発生した時に表示されるスタックトレースは、エラーの発生場所とメソッドの呼び出し経路を示します。
          下から上に読むと、どのメソッドからどのメソッドが呼ばれたかがわかります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>最初の行が例外の種類とメッセージ</li>
          <li><code>at</code> の行がメソッド呼び出しの履歴（上が最新）</li>
          <li><code>Caused by:</code> で原因の例外がわかる</li>
          <li>自分のコードのパッケージ名を探すのがコツ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースの読み方</h2>
        <p className="text-gray-400 mb-4">
          例外が発生した時のスタックトレースを出力して、読み方を学びましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static void methodC() {
        // ここでエラーが発生
        throw new RuntimeException("何かがおかしい！");
    }

    static void methodB() {
        methodC();  // methodCを呼ぶ
    }

    static void methodA() {
        methodB();  // methodBを呼ぶ
    }

    public static void main(String[] args) {
        try {
            methodA();  // methodAを呼ぶ
        } catch (RuntimeException e) {
            System.out.println("例外の種類: " + e.getClass().getSimpleName());
            System.out.println("メッセージ: " + e.getMessage());
            System.out.println();
            System.out.println("スタックトレース（呼び出し経路）:");
            StackTraceElement[] trace = e.getStackTrace();
            for (int i = 0; i < trace.length; i++) {
                System.out.println("  at " + trace[i]);
            }
            System.out.println();
            System.out.println("読み方: 上から順に発生場所 -> 呼び出し元");
        }
    }
}`}
          expectedOutput={`例外の種類: RuntimeException
メッセージ: 何かがおかしい！

スタックトレース（呼び出し経路）:
  at Main.methodC(Main.java:4)
  at Main.methodB(Main.java:8)
  at Main.methodA(Main.java:12)
  at Main.main(Main.java:17)

読み方: 上から順に発生場所 -> 呼び出し元`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Caused by: チェーンされた例外</h2>
        <p className="text-gray-400 mb-4">
          例外をラップして再スローする場合、<code className="text-orange-300">Caused by</code> で
          元の例外（根本原因）をたどれます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int parseAge(String input) {
        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException e) {
            // 元の例外をラップして新しい例外を投げる
            throw new IllegalArgumentException("年齢の形式が不正: " + input, e);
        }
    }

    static void registerUser(String name, String ageStr) {
        try {
            int age = parseAge(ageStr);
            System.out.println(name + "さん（" + age + "歳）を登録しました");
        } catch (IllegalArgumentException e) {
            System.out.println("=== 例外チェーン ===");
            System.out.println("例外: " + e.getClass().getSimpleName());
            System.out.println("メッセージ: " + e.getMessage());

            Throwable cause = e.getCause();
            if (cause != null) {
                System.out.println("Caused by: " + cause.getClass().getSimpleName());
                System.out.println("原因メッセージ: " + cause.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        registerUser("太郎", "25");
        System.out.println();
        registerUser("花子", "abc");
    }
}`}
          expectedOutput={`太郎さん（25歳）を登録しました

=== 例外チェーン ===
例外: IllegalArgumentException
メッセージ: 年齢の形式が不正: abc
Caused by: NumberFormatException
原因メッセージ: For input string: "abc"`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースからバグを見つける</h2>
        <p className="text-gray-400 mb-4">
          実際のバグ修正の流れをシミュレートします。
          スタックトレースの情報から、問題箇所を特定しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    static String findUser(List<String> users, int index) {
        // バグ: 範囲チェックしていない
        if (index < 0 || index >= users.size()) {
            return null;  // 修正後: 範囲外ならnull
        }
        return users.get(index);
    }

    static String getUserInfo(List<String> users, int index) {
        String user = findUser(users, index);
        if (user == null) {
            return "ユーザーが見つかりません (index=" + index + ")";
        }
        return "ユーザー: " + user;
    }

    public static void main(String[] args) {
        List<String> users = Arrays.asList("Alice", "Bob", "Charlie");

        System.out.println(getUserInfo(users, 0));
        System.out.println(getUserInfo(users, 1));
        System.out.println(getUserInfo(users, 5));  // 範囲外
        System.out.println(getUserInfo(users, -1)); // 負の値
    }
}`}
          expectedOutput={`ユーザー: Alice
ユーザー: Bob
ユーザーが見つかりません (index=5)
ユーザーが見つかりません (index=-1)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="stack-trace" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-trace" basePath="/learn/debug" />
    </div>
  );
}
