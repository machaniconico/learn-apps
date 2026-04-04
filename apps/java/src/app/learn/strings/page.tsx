import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "JavaのStringクラスの特徴として正しいのはどれですか？",
    options: [
      "Stringオブジェクトは変更可能（mutable）である",
      "Stringオブジェクトは不変（immutable）である",
      "Stringはプリミティブ型である",
      "Stringの文字列連結は常にStringBuilderより高速",
    ],
    answer: 1,
    explanation: "JavaのStringは不変（immutable）です。文字列の操作（連結・置換など）を行うと、新しいStringオブジェクトが生成されます。元のオブジェクトは変更されません。",
  },
  {
    question: "StringBuilderの利点として正しいのはどれですか？",
    options: [
      "スレッドセーフである",
      "Stringより不変性が保証される",
      "ループ内での文字列連結がStringより高速",
      "メモリを一切使わない",
    ],
    answer: 2,
    explanation: "StringBuilderは可変の文字列を扱い、ループ内での連結操作がStringの+演算子より高速です。スレッドセーフが必要な場合はStringBufferを使います。",
  },
  {
    question: "文字列の比較で equals() ではなく == を使うとどうなりますか？",
    options: [
      "常に正しく比較できる",
      "参照（アドレス）を比較するため、内容が同じでもfalseになることがある",
      "コンパイルエラーになる",
      "equals()より高速で安全に比較できる",
    ],
    answer: 1,
    explanation: "==は参照（メモリアドレス）を比較します。文字列リテラルはString Poolで共有されるため==でもtrueになることがありますが、new String()で作成した場合はfalseになります。内容比較には必ずequals()を使います。",
  },
  {
    question: "Javaの正規表現で文字列がパターンに一致するか調べるメソッドはどれですか？",
    options: [
      "String.match()",
      "String.matches()",
      "String.regex()",
      "String.test()",
    ],
    answer: 1,
    explanation: "String.matches()メソッドは文字列全体が正規表現パターンに一致するかを判定します。部分一致を調べるにはPattern.compile()とMatcher.find()を使います。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaの文字列操作を学びましょう。Stringの不変性・文字列メソッド・StringBuilder・フォーマット・正規表現・文字列比較まで、テキスト処理の基本と応用を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="purple" categoryId="strings" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stringメソッドの活用</h2>
        <p className="text-gray-400 mb-4">
          Stringクラスには豊富なメソッドが用意されています。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">substring</code>・
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">indexOf</code>・
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">replace</code>・
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">split</code> などを使いこなしましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String text = "Hello, Java World!";

        // 基本メソッド
        System.out.println("長さ: " + text.length());
        System.out.println("大文字: " + text.toUpperCase());
        System.out.println("小文字: " + text.toLowerCase());

        // 検索
        System.out.println("Java の位置: " + text.indexOf("Java"));
        System.out.println("Java を含む: " + text.contains("Java"));

        // 部分文字列
        System.out.println("部分文字列: " + text.substring(7, 11));

        // 置換と分割
        System.out.println("置換: " + text.replace("Java", "プログラミング"));

        String csv = "りんご,みかん,ぶどう,バナナ";
        String[] fruits = csv.split(",");
        for (String fruit : fruits) {
            System.out.print("[" + fruit.trim() + "] ");
        }
        System.out.println();

        // 空白除去とチェック
        String padded = "  Hello  ";
        System.out.println("strip: '" + padded.strip() + "'");
        System.out.println("空か: " + "".isEmpty());
        System.out.println("空白か: " + "  ".isBlank());
    }
}`}
          expectedOutput={`長さ: 18
大文字: HELLO, JAVA WORLD!
小文字: hello, java world!
Java の位置: 7
Java を含む: true
部分文字列: Java
置換: Hello, プログラミング World!
[りんご] [みかん] [ぶどう] [バナナ]
strip: 'Hello'
空か: true
空白か: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">StringBuilder</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">StringBuilder</code> は可変の文字列を扱うクラスです。
          ループ内での文字列連結では、Stringの <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">+</code> 演算子より
          大幅に高速です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // StringBuilderの基本操作
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(", ");
        sb.append("Java");
        sb.append("!");
        System.out.println(sb.toString());

        // メソッドチェーン
        StringBuilder html = new StringBuilder()
            .append("<ul>\\n")
            .append("  <li>項目1</li>\\n")
            .append("  <li>項目2</li>\\n")
            .append("  <li>項目3</li>\\n")
            .append("</ul>");
        System.out.println(html);

        // 挿入・置換・削除・反転
        StringBuilder word = new StringBuilder("Hello World");
        word.insert(5, ",");        // 挿入
        System.out.println("挿入: " + word);

        word.replace(7, 12, "Java");  // 置換
        System.out.println("置換: " + word);

        word.delete(5, 6);          // 削除
        System.out.println("削除: " + word);

        word.reverse();              // 反転
        System.out.println("反転: " + word);
    }
}`}
          expectedOutput={`Hello, Java!
<ul>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ul>
挿入: Hello, World
置換: Hello, Java
削除: Hello Java
反転: avaJ olleH`}
        />
      </section>

      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
