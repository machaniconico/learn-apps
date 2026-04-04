import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

const quizQuestions: QuizQuestion[] = [
  {
    question: "HashMapの特徴として正しいのはどれですか？",
    options: [
      "キーの挿入順序が保証される",
      "キーがソートされた順序で管理される",
      "キーと値のペアを高速に検索・挿入できる（平均O(1)）",
      "重複するキーを複数格納できる",
    ],
    answer: 2,
    explanation: "HashMapはハッシュテーブルを使い、キーと値のペアを平均O(1)で検索・挿入できます。挿入順序は保証されず、重複キーは上書きされます。順序が必要ならLinkedHashMapを使います。",
  },
  {
    question: "TreeMapの特徴として正しいのはどれですか？",
    options: [
      "ハッシュテーブルを使っている",
      "キーが自然順序（昇順）でソートされる",
      "null キーを格納できる",
      "検索がHashMapより常に高速である",
    ],
    answer: 1,
    explanation: "TreeMapは赤黒木を使い、キーが自然順序（Comparable）または指定したComparatorでソートされます。検索はO(log n)でHashMapのO(1)より遅いですが、範囲検索が可能です。",
  },
  {
    question: "HashSetについて正しいのはどれですか？",
    options: [
      "重複する要素を格納できる",
      "要素の順序が保証される",
      "重複なしの集合を管理し、contains()がO(1)で高速",
      "要素をインデックスで取得できる",
    ],
    answer: 2,
    explanation: "HashSetは重複を許可しない集合で、内部でHashMapを使っています。contains()・add()・remove()が平均O(1)で高速です。順序は保証されません。",
  },
  {
    question: "Queueインターフェースのメソッドで、要素がない場合にnullを返すのはどれですか？",
    options: [
      "add()",
      "remove()",
      "element()",
      "poll()",
    ],
    answer: 3,
    explanation: "poll()は先頭要素を取得して削除し、キューが空ならnullを返します。remove()は空の場合にNoSuchElementExceptionをスローします。同様にpeek()はnullを返し、element()は例外をスローします。",
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">コレクション</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaのコレクションフレームワークを学びましょう。HashMap・TreeMap・HashSet・Queue・Deque・Collectionsユーティリティまで、データを効率的に管理するためのデータ構造を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="collections" totalLessons={6} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/collections" color="red" categoryId="collections" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HashMapの操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">HashMap</code> はキーと値のペアを管理するデータ構造です。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">put</code>・
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">get</code>・
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">getOrDefault</code> などで操作します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // HashMapの作成
        Map<String, Integer> scores = new HashMap<>();
        scores.put("数学", 85);
        scores.put("英語", 92);
        scores.put("国語", 78);
        scores.put("理科", 90);

        // 値の取得
        System.out.println("数学: " + scores.get("数学"));
        System.out.println("社会: " + scores.getOrDefault("社会", 0));

        // 全エントリの走査
        System.out.println("--- 全科目 ---");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue() + "点");
        }

        // 条件付き追加と値の更新
        scores.putIfAbsent("社会", 88);
        scores.merge("数学", 5, Integer::sum);  // 数学に5を加算
        System.out.println("数学(加算後): " + scores.get("数学"));
        System.out.println("社会(追加): " + scores.get("社会"));
    }
}`}
          expectedOutput={`数学: 85
社会: 0
--- 全科目 ---
数学: 85点
英語: 92点
国語: 78点
理科: 90点
数学(加算後): 90
社会(追加): 88`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">TreeMapによるソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">TreeMap</code> はキーが自動的にソートされるマップです。
          範囲検索や最小/最大キーの取得が効率的に行えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.TreeMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // TreeMapはキーがソートされる（英字キーで確認）
        TreeMap<Integer, String> rankings = new TreeMap<>();
        rankings.put(3, "大阪");
        rankings.put(1, "東京");
        rankings.put(5, "福岡");
        rankings.put(2, "名古屋");
        rankings.put(4, "札幌");

        // キー（数値）の昇順で自動ソート
        System.out.println("--- 人口ランキング ---");
        for (Map.Entry<Integer, String> e : rankings.entrySet()) {
            System.out.println(e.getKey() + "位: " + e.getValue());
        }

        // TreeMap固有のメソッド
        System.out.println("最初のキー: " + rankings.firstKey());
        System.out.println("最後のキー: " + rankings.lastKey());

        // 部分マップ（範囲検索: 2位〜4位）
        Map<Integer, String> sub = rankings.subMap(2, 5);
        System.out.println("2〜4位: " + sub);
    }
}`}
          expectedOutput={`--- 人口ランキング ---
1位: 東京
2位: 名古屋
3位: 大阪
4位: 札幌
5位: 福岡
最初のキー: 1
最後のキー: 5
2〜4位: {2=名古屋, 3=大阪, 4=札幌}`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
