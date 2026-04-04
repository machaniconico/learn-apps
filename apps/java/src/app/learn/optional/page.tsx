import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("optional");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Optional.of(null) を実行するとどうなりますか？",
    options: [
      "空のOptionalが返される",
      "NullPointerExceptionが発生する",
      "nullを含むOptionalが返される",
      "コンパイルエラーになる",
    ],
    answer: 1,
    explanation: "Optional.of() はnullを許容しません。nullを渡すとNullPointerExceptionがスローされます。nullの可能性がある場合は Optional.ofNullable() を使います。",
  },
  {
    question: "orElseとorElseGetの違いは何ですか？",
    options: [
      "機能は同じで書き方が違うだけ",
      "orElseは値を直接指定し、orElseGetはSupplierで遅延評価する",
      "orElseGetはnullを返せるが、orElseは返せない",
      "orElseGetは例外をスローできる",
    ],
    answer: 1,
    explanation: "orElseは常にデフォルト値を評価しますが、orElseGetはSupplierを受け取り、値がない場合にのみ評価されます。コストの高い処理ではorElseGetが効率的です。",
  },
  {
    question: "Optional.map() の説明として正しいものはどれですか？",
    options: [
      "値がない場合に新しい値を設定する",
      "値が存在する場合に変換関数を適用し、新しいOptionalを返す",
      "Optional内の値をリストに変換する",
      "値の型を強制的にキャストする",
    ],
    answer: 1,
    explanation: "map()は値が存在する場合のみ変換関数を適用し、結果をOptionalで包んで返します。値が空の場合はOptional.empty()をそのまま返します。",
  },
  {
    question: "Optionalのベストプラクティスとして正しいものはどれですか？",
    options: [
      "すべてのフィールドをOptional型にする",
      "Optionalをメソッドの引数に使う",
      "戻り値がnullの可能性がある場合にOptionalを使う",
      "Optionalをコレクション内で使う",
    ],
    answer: 2,
    explanation: "Optionalはメソッドの戻り値として使うのが推奨されます。フィールドや引数、コレクション内での使用は避けるべきとされています。",
  },
];

export default function OptionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">Optional</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Java 8で導入されたOptionalクラスを学びましょう。NullPointerExceptionを防ぎ、値の有無を型で表現する方法を解説します。map・flatMap・ifPresentなどのメソッドチェーンも活用しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="optional" totalLessons={5} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/optional" color="yellow" categoryId="optional" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Optionalのチェーン操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">map</code> や
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">flatMap</code> を連鎖させて、
          null安全なデータ変換パイプラインを構築できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Optionalの作成
        Optional<String> name = Optional.of("Java");
        Optional<String> empty = Optional.empty();
        Optional<String> nullable = Optional.ofNullable(null);

        // mapチェーン
        String upper = name
            .map(String::toUpperCase)
            .map(s -> s + " 17")
            .orElse("unknown");
        System.out.println("変換結果: " + upper);

        // 空のOptionalのチェーン
        String result = empty
            .map(String::toUpperCase)
            .orElse("デフォルト値");
        System.out.println("空の場合: " + result);

        // filter でさらに条件追加
        Optional<String> filtered = name
            .filter(s -> s.length() > 3);
        System.out.println("filter結果: " + filtered.orElse("条件不一致"));
    }
}`}
          expectedOutput={`変換結果: JAVA 17
空の場合: デフォルト値
filter結果: Java`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ifPresentとorElseの使い分け</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">ifPresent</code> は値がある場合にのみ処理を実行し、
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">orElse</code> /
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">orElseGet</code> はデフォルト値を提供します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    static Optional<String> findUser(int id) {
        Map<Integer, String> users = Map.of(1, "Alice", 2, "Bob");
        return Optional.ofNullable(users.get(id));
    }

    public static void main(String[] args) {
        // ifPresent: 値がある場合のみ実行
        findUser(1).ifPresent(user ->
            System.out.println("見つかった: " + user));

        findUser(99).ifPresent(user ->
            System.out.println("これは表示されない"));

        // ifPresentOrElse (Java 9+)
        findUser(2).ifPresentOrElse(
            user -> System.out.println("ユーザー: " + user),
            () -> System.out.println("見つかりません")
        );

        findUser(99).ifPresentOrElse(
            user -> System.out.println("ユーザー: " + user),
            () -> System.out.println("見つかりません")
        );

        // orElse vs orElseGet
        String name = findUser(99).orElse("ゲスト");
        System.out.println("デフォルト: " + name);
    }
}`}
          expectedOutput={`見つかった: Alice
ユーザー: Bob
見つかりません
デフォルト: ゲスト`}
        />
      </section>

      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
