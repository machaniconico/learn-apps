import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionBestPracticesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ベストプラクティス</h1>
        <p className="text-gray-400">具体的例外の使用、例外の翻訳、ログ記録のベストプラクティス</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">例外処理のベストプラクティス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          例外処理は正しく使わないとバグの原因になります。
          よくあるアンチパターンを避け、保守しやすいコードを書きましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>具体的な例外をキャッチする（<code>catch (Exception e)</code> を避ける）</li>
          <li>例外を握りつぶさない（空のcatchブロックを避ける）</li>
          <li>例外の翻訳: 低レベルの例外をビジネス例外にラップする</li>
          <li>エラーメッセージに十分な情報を含める</li>
          <li>例外でフロー制御しない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">具体的な例外をキャッチする</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">catch (Exception e)</code> は広すぎます。
          想定外の例外まで握りつぶしてしまう危険があります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 悪い例: catch (Exception e) は広すぎる
    static void badExample(String numStr) {
        try {
            int num = Integer.parseInt(numStr);
            int[] arr = new int[num];
            arr[0] = 100 / num;
            System.out.println("[悪い例] 結果: " + arr[0]);
        } catch (Exception e) {
            // どのエラーかわからない
            System.out.println("[悪い例] エラー発生");
        }
    }

    // 良い例: 具体的な例外をキャッチ
    static void goodExample(String numStr) {
        try {
            int num = Integer.parseInt(numStr);
            int[] arr = new int[num];
            arr[0] = 100 / num;
            System.out.println("[良い例] 結果: " + arr[0]);
        } catch (NumberFormatException e) {
            System.out.println("[良い例] 数値変換エラー: " + numStr);
        } catch (NegativeArraySizeException e) {
            System.out.println("[良い例] 配列サイズが負の値");
        } catch (ArithmeticException e) {
            System.out.println("[良い例] ゼロ除算エラー");
        }
    }

    public static void main(String[] args) {
        System.out.println("--- 文字列入力 ---");
        badExample("abc");
        goodExample("abc");
        System.out.println("--- 負の値 ---");
        badExample("-3");
        goodExample("-3");
    }
}`}
          expectedOutput={`--- 文字列入力 ---
[悪い例] エラー発生
[良い例] 数値変換エラー: abc
--- 負の値 ---
[悪い例] エラー発生
[良い例] 配列サイズが負の値`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外の翻訳（Exception Translation）</h2>
        <p className="text-gray-400 mb-4">
          下位レイヤーの例外をそのまま上位に公開せず、
          ビジネスロジックに適した例外にラップして投げ直します。
        </p>
        <JavaEditor
          defaultCode={`// ビジネス例外
class UserServiceException extends RuntimeException {
    UserServiceException(String msg, Throwable cause) { super(msg, cause); }
}

// 下位レイヤー（データベースアクセス）
class UserRepository {
    static String findById(String id) {
        // DB例外をシミュレート
        if ("ERROR".equals(id)) {
            throw new RuntimeException("Connection timeout after 30s");
        }
        if ("U001".equals(id)) return "Alice";
        return null;
    }
}

// サービスレイヤー（例外の翻訳をここで行う）
class UserService {
    static String getUserName(String id) {
        try {
            String name = UserRepository.findById(id);
            if (name == null) {
                throw new UserServiceException("ユーザーが見つかりません: " + id, null);
            }
            return name;
        } catch (RuntimeException e) {
            if (e instanceof UserServiceException) throw e;
            // 低レベル例外をビジネス例外に翻訳
            throw new UserServiceException(
                "ユーザー取得に失敗しました (id=" + id + ")", e
            );
        }
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("ユーザー: " + UserService.getUserName("U001"));
        } catch (UserServiceException e) {
            System.out.println("エラー: " + e.getMessage());
        }

        try {
            UserService.getUserName("U999");
        } catch (UserServiceException e) {
            System.out.println("エラー: " + e.getMessage());
        }

        try {
            UserService.getUserName("ERROR");
        } catch (UserServiceException e) {
            System.out.println("エラー: " + e.getMessage());
            System.out.println("原因: " + e.getCause().getMessage());
        }
    }
}`}
          expectedOutput={`ユーザー: Alice
エラー: ユーザーが見つかりません: U999
エラー: ユーザー取得に失敗しました (id=ERROR)
原因: Connection timeout after 30s`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外でフロー制御しない</h2>
        <p className="text-gray-400 mb-4">
          例外は「例外的な状況」に使うものです。通常のフロー制御に使うと
          パフォーマンスが悪化し、コードも読みにくくなります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Map;
import java.util.HashMap;

public class Main {
    static Map<String, Integer> cache = new HashMap<>();
    static {
        cache.put("apple", 150);
        cache.put("banana", 100);
    }

    // 悪い例: 例外でフロー制御
    static int getPriceBad(String item) {
        try {
            return cache.get(item); // nullだとNullPointerException
        } catch (NullPointerException e) {
            return -1; // デフォルト値
        }
    }

    // 良い例: 事前チェック
    static int getPriceGood(String item) {
        if (cache.containsKey(item)) {
            return cache.get(item);
        }
        return -1;
    }

    // さらに良い例: getOrDefault
    static int getPriceBest(String item) {
        return cache.getOrDefault(item, -1);
    }

    public static void main(String[] args) {
        System.out.println("apple: " + getPriceBad("apple"));
        System.out.println("grape(悪): " + getPriceBad("grape"));
        System.out.println("banana: " + getPriceGood("banana"));
        System.out.println("grape(良): " + getPriceGood("grape"));
        System.out.println("apple: " + getPriceBest("apple"));
        System.out.println("grape(最良): " + getPriceBest("grape"));
    }
}`}
          expectedOutput={`apple: 150
grape(悪): -1
banana: 100
grape(良): -1
apple: 150
grape(最良): -1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="exception-best-practices" />
      </div>
      <LessonNav lessons={lessons} currentId="exception-best-practices" basePath="/learn/exceptions" />
    </div>
  );
}
