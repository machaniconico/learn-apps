import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ThrowThrowsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">throw・throws</h1>
        <p className="text-gray-400">throw new による例外の送出とメソッドのthrows宣言</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">throwとthrowsの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">throw</code> は例外オブジェクトを投げるキーワードです。
          <code className="text-orange-300">throws</code> はメソッドが例外を投げる可能性があることを宣言します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>throw new Exception("message")</code> で例外を投げる</li>
          <li><code>void method() throws IOException</code> で検査例外を宣言</li>
          <li>throwは文の中で使う、throwsはメソッド署名に付ける</li>
          <li>非検査例外（RuntimeException）はthrows宣言が不要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">throwで例外を投げる</h2>
        <p className="text-gray-400 mb-4">
          バリデーション失敗時などに <code className="text-orange-300">throw</code> で例外を投げて、
          呼び出し元に問題を通知します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("年齢は0以上でなければなりません: " + age);
        }
        if (age > 150) {
            throw new IllegalArgumentException("年齢が不正です: " + age);
        }
        System.out.println("年齢を設定しました: " + age);
    }

    static String requireNonEmpty(String value, String name) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException(name + "は空にできません");
        }
        return value;
    }

    public static void main(String[] args) {
        // 正常ケース
        setAge(25);

        // 異常ケース
        try {
            setAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("エラー: " + e.getMessage());
        }

        try {
            setAge(200);
        } catch (IllegalArgumentException e) {
            System.out.println("エラー: " + e.getMessage());
        }

        // requireNonEmpty
        System.out.println("名前: " + requireNonEmpty("太郎", "名前"));
        try {
            requireNonEmpty("", "メール");
        } catch (IllegalArgumentException e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}`}
          expectedOutput={`年齢を設定しました: 25
エラー: 年齢は0以上でなければなりません: -5
エラー: 年齢が不正です: 200
名前: 太郎
エラー: メールは空にできません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">throwsによる例外の宣言</h2>
        <p className="text-gray-400 mb-4">
          検査例外を投げるメソッドには <code className="text-orange-300">throws</code> 宣言が必要です。
          呼び出し元でtry-catchするか、さらにthrowsで伝播させます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // throwsで検査例外を宣言（Exceptionを使用）
    static String readConfig(String filename) throws Exception {
        if (!filename.endsWith(".conf")) {
            throw new Exception("設定ファイルの拡張子は.confにしてください");
        }
        return "設定値=100";
    }

    // 呼び出し元でtry-catch
    static void loadApp(String configFile) {
        try {
            String config = readConfig(configFile);
            System.out.println("設定を読み込みました: " + config);
        } catch (Exception e) {
            System.out.println("設定エラー: " + e.getMessage());
        }
    }

    // throws で伝播させることもできる
    static void initSystem(String configFile) throws Exception {
        String config = readConfig(configFile);
        System.out.println("システム初期化: " + config);
    }

    public static void main(String[] args) {
        loadApp("app.conf");
        loadApp("app.txt");

        try {
            initSystem("system.conf");
        } catch (Exception e) {
            System.out.println("初期化失敗: " + e.getMessage());
        }
    }
}`}
          expectedOutput={`設定を読み込みました: 設定値=100
設定エラー: 設定ファイルの拡張子は.confにしてください
システム初期化: 設定値=100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外の再スロー</h2>
        <p className="text-gray-400 mb-4">
          例外をキャッチした後、ログを出力してから再度スローすることがあります。
          あるいは新しい例外でラップして投げ直すパターンも一般的です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int parseScore(String input) {
        try {
            int score = Integer.parseInt(input);
            if (score < 0 || score > 100) {
                throw new IllegalArgumentException("スコアは0-100の範囲: " + score);
            }
            return score;
        } catch (NumberFormatException e) {
            // 例外をラップして再スロー
            throw new IllegalArgumentException("スコアが数値ではありません: " + input, e);
        }
    }

    public static void main(String[] args) {
        // 正常
        System.out.println("スコア: " + parseScore("85"));

        // 数値でない入力
        try {
            parseScore("abc");
        } catch (IllegalArgumentException e) {
            System.out.println("エラー: " + e.getMessage());
            if (e.getCause() != null) {
                System.out.println("原因: " + e.getCause().getMessage());
            }
        }

        // 範囲外の値
        try {
            parseScore("150");
        } catch (IllegalArgumentException e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}`}
          expectedOutput={`スコア: 85
エラー: スコアが数値ではありません: abc
原因: For input string: "abc"
エラー: スコアは0-100の範囲: 150`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="throw-throws" />
      </div>
      <LessonNav lessons={lessons} currentId="throw-throws" basePath="/learn/exceptions" />
    </div>
  );
}
