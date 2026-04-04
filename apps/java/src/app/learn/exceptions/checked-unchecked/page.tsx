import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function CheckedUncheckedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">検査例外・非検査例外</h1>
        <p className="text-gray-400">IOException vs RuntimeException - 検査例外と非検査例外の違い</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">例外の階層</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaの例外は大きく2種類に分かれます。
          <code className="text-orange-300">検査例外（Checked）</code> はコンパイル時にcatchまたはthrows宣言が強制されます。
          <code className="text-orange-300">非検査例外（Unchecked）</code> はコンパイラによるチェックがありません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong>検査例外</strong>: Exception のサブクラス（RuntimeException以外）</li>
          <li>例: <code>IOException</code>, <code>SQLException</code>, <code>ClassNotFoundException</code></li>
          <li><strong>非検査例外</strong>: RuntimeException のサブクラス</li>
          <li>例: <code>NullPointerException</code>, <code>IllegalArgumentException</code></li>
          <li><strong>Error</strong>: <code>OutOfMemoryError</code> など、通常キャッチしない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検査例外（Checked Exception）</h2>
        <p className="text-gray-400 mb-4">
          検査例外はコンパイラがtry-catchまたはthrowsを強制します。
          ファイルI/O、ネットワーク通信など、外部リソースの利用時に使われます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 検査例外を模擬するクラス
    static class FileNotFoundException extends Exception {
        FileNotFoundException(String msg) { super(msg); }
    }
    static class IOException extends Exception {
        IOException(String msg) { super(msg); }
    }

    // 検査例外を投げるメソッド -> throwsが必須
    static String readFile(String path) throws FileNotFoundException, IOException {
        if (path == null) {
            throw new IOException("パスがnullです");
        }
        if (!path.endsWith(".txt")) {
            throw new FileNotFoundException("ファイルが見つかりません: " + path);
        }
        return "ファイルの内容: Hello";
    }

    public static void main(String[] args) {
        // 検査例外は必ずtry-catchが必要
        try {
            String content = readFile("data.txt");
            System.out.println(content);
        } catch (FileNotFoundException e) {
            System.out.println("ファイルエラー: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IOエラー: " + e.getMessage());
        }

        try {
            readFile("data.csv");
        } catch (FileNotFoundException e) {
            System.out.println("ファイルエラー: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IOエラー: " + e.getMessage());
        }
    }
}`}
          expectedOutput={`ファイルの内容: Hello
ファイルエラー: ファイルが見つかりません: data.csv`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非検査例外（Unchecked Exception）</h2>
        <p className="text-gray-400 mb-4">
          非検査例外はRuntimeExceptionのサブクラスで、throws宣言が不要です。
          プログラミングのミス（バグ）に起因するものが多いです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;

public class Main {
    // 非検査例外: throws宣言なしで投げられる
    static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("年齢は0以上: " + age);
        }
    }

    static String getFirst(List<String> list) {
        if (list == null || list.isEmpty()) {
            throw new IllegalStateException("リストが空です");
        }
        return list.get(0);
    }

    public static void main(String[] args) {
        System.out.println("--- 非検査例外の例 ---");

        // NullPointerException
        try {
            String s = null;
            s.length();
        } catch (NullPointerException e) {
            System.out.println("NPE: nullのメソッド呼び出し");
        }

        // IllegalArgumentException
        try {
            validateAge(-1);
        } catch (IllegalArgumentException e) {
            System.out.println("IAE: " + e.getMessage());
        }

        // IllegalStateException
        try {
            getFirst(List.of());
        } catch (IllegalStateException e) {
            System.out.println("ISE: " + e.getMessage());
        }

        // ArrayIndexOutOfBoundsException
        try {
            int[] arr = {1, 2};
            int x = arr[5];
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("AIOOBE: 配列の範囲外アクセス");
        }
    }
}`}
          expectedOutput={`--- 非検査例外の例 ---
NPE: nullのメソッド呼び出し
IAE: 年齢は0以上: -1
ISE: リストが空です
AIOOBE: 配列の範囲外アクセス`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検査例外と非検査例外の判別</h2>
        <p className="text-gray-400 mb-4">
          例外クラスの継承関係を確認して、検査例外か非検査例外かを判別しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static void checkExceptionType(Exception e) {
        String name = e.getClass().getSimpleName();
        boolean isUnchecked = e instanceof RuntimeException;
        System.out.println(name + " -> " + (isUnchecked ? "非検査例外" : "検査例外"));
    }

    public static void main(String[] args) {
        System.out.println("=== 例外の分類 ===");

        // 非検査例外 (RuntimeException のサブクラス)
        checkExceptionType(new NullPointerException());
        checkExceptionType(new IllegalArgumentException());
        checkExceptionType(new IndexOutOfBoundsException());
        checkExceptionType(new ClassCastException());
        checkExceptionType(new ArithmeticException());

        System.out.println("---");

        // 検査例外 (Exception のサブクラスでRuntimeException以外)
        checkExceptionType(new java.io.IOException());
        checkExceptionType(new CloneNotSupportedException());
        checkExceptionType(new ReflectiveOperationException());
    }
}`}
          expectedOutput={`=== 例外の分類 ===
NullPointerException -> 非検査例外
IllegalArgumentException -> 非検査例外
IndexOutOfBoundsException -> 非検査例外
ClassCastException -> 非検査例外
ArithmeticException -> 非検査例外
---
IOException -> 検査例外
CloneNotSupportedException -> 検査例外
ReflectiveOperationException -> 検査例外`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="checked-unchecked" />
      </div>
      <LessonNav lessons={lessons} currentId="checked-unchecked" basePath="/learn/exceptions" />
    </div>
  );
}
