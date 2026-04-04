import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Javaで配列を宣言する正しい方法はどれですか？",
    options: [
      "int[] numbers = new int[5];",
      "int numbers[] = array(5);",
      "array<int> numbers = new array(5);",
      "int numbers = new int[5];",
    ],
    answer: 0,
    explanation: "Javaでは int[] numbers = new int[5]; の形式で配列を宣言します。int numbers[] の形式も可能ですが、int[] の形式が推奨されます。",
  },
  {
    question: "ArrayListの特徴として正しいのはどれですか？",
    options: [
      "サイズが固定で変更できない",
      "プリミティブ型を直接格納できる",
      "内部で配列を使い、動的にサイズが変わる",
      "要素の追加・削除が配列より常に遅い",
    ],
    answer: 2,
    explanation: "ArrayListは内部で配列を使用し、要素数に応じて自動的にサイズを拡張します。プリミティブ型は直接格納できず、ラッパークラス（Integer等）を使います。",
  },
  {
    question: "LinkedListがArrayListより優れている操作はどれですか？",
    options: [
      "ランダムアクセス（インデックスで取得）",
      "先頭への要素の追加・削除",
      "メモリ効率",
      "ソート処理",
    ],
    answer: 1,
    explanation: "LinkedListは先頭や末尾への追加・削除がO(1)で高速です。一方、ランダムアクセスはO(n)でArrayListのO(1)より遅くなります。",
  },
  {
    question: "List.of()で作成したリストの特徴はどれですか？",
    options: [
      "要素の追加・削除が自由にできる",
      "null要素を含めることができる",
      "変更不可（immutable）なリストである",
      "ArrayList型のインスタンスが返される",
    ],
    answer: 2,
    explanation: "List.of()はJava 9で導入された不変リストを作成するファクトリメソッドです。要素の追加・削除・変更を行うとUnsupportedOperationExceptionがスローされます。null要素も許可されません。",
  },
];

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">配列・リスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          データを効率的に管理するための配列とリストを学びましょう。配列の基本操作・ArrayList・LinkedList・不変リストまで、Javaのシーケンスデータ構造を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="arrays" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/arrays" color="green" categoryId="arrays" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の基本操作</h2>
        <p className="text-gray-400 mb-4">
          配列は固定長のデータ構造で、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">同じ型の要素</code> を連続的に格納します。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Arrays</code> クラスのユーティリティメソッドで操作できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // 配列の宣言と初期化
        int[] numbers = {5, 2, 8, 1, 9, 3};
        System.out.println("元の配列: " + Arrays.toString(numbers));

        // ソート
        Arrays.sort(numbers);
        System.out.println("ソート後: " + Arrays.toString(numbers));

        // 二分探索（ソート済み配列のみ）
        int index = Arrays.binarySearch(numbers, 8);
        System.out.println("8の位置: " + index);

        // 配列のコピー
        int[] copy = Arrays.copyOf(numbers, 4);
        System.out.println("先頭4要素: " + Arrays.toString(copy));

        // 配列の埋め込み
        int[] filled = new int[5];
        Arrays.fill(filled, 7);
        System.out.println("全て7: " + Arrays.toString(filled));
    }
}`}
          expectedOutput={`元の配列: [5, 2, 8, 1, 9, 3]
ソート後: [1, 2, 3, 5, 8, 9]
8の位置: 4
先頭4要素: [1, 2, 3, 5]
全て7: [7, 7, 7, 7, 7]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ArrayListとソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">ArrayList</code> は動的にサイズが変わるリストです。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Collections.sort()</code> や
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">List.of()</code> と組み合わせて使いましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // ArrayListの作成と操作
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("バナナ");
        fruits.add("りんご");
        fruits.add("みかん");
        fruits.add("ぶどう");
        System.out.println("元のリスト: " + fruits);

        // ソート
        Collections.sort(fruits);
        System.out.println("ソート後: " + fruits);

        // 要素の検索と削除
        fruits.remove("みかん");
        System.out.println("みかん削除: " + fruits);
        System.out.println("りんごの有無: " + fruits.contains("りんご"));

        // List.of()で不変リスト（Java 9+）
        List<Integer> immutable = List.of(10, 20, 30, 40, 50);
        System.out.println("不変リスト: " + immutable);
        System.out.println("サイズ: " + immutable.size());
    }
}`}
          expectedOutput={`元のリスト: [バナナ, りんご, みかん, ぶどう]
ソート後: [ぶどう, みかん, りんご, バナナ]
みかん削除: [ぶどう, りんご, バナナ]
りんごの有無: true
不変リスト: [10, 20, 30, 40, 50]
サイズ: 5`}
        />
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
