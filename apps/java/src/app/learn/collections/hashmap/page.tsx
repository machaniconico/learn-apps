import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function HashMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コレクション レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HashMap</h1>
        <p className="text-gray-400">キーと値のペアで管理するハッシュマップ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HashMapとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">HashMap</code> はキーと値のペアでデータを管理するコレクションです。
          キーのハッシュ値を使って高速に検索（O(1)）できます。
          キーの重複は許可されず、null キーも1つだけ許可されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>put(key, value)</code> で追加・更新</li>
          <li><code>get(key)</code> で値を取得</li>
          <li><code>containsKey()</code>・<code>containsValue()</code> で存在チェック</li>
          <li><code>keySet()</code>・<code>values()</code>・<code>entrySet()</code> でイテレーション</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本操作</h2>
        <p className="text-gray-400 mb-4">
          HashMap の基本的な追加、取得、削除、チェック操作を学びます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        // 要素の追加
        scores.put("田中", 85);
        scores.put("鈴木", 92);
        scores.put("佐藤", 78);
        System.out.println("マップ: " + scores);

        // 値の取得
        System.out.println("田中: " + scores.get("田中"));
        System.out.println("存在しないキー: " + scores.get("山田"));

        // getOrDefault: キーがない場合のデフォルト値
        System.out.println("山田: " + scores.getOrDefault("山田", 0));

        // 存在チェック
        System.out.println("田中を含む? " + scores.containsKey("田中"));
        System.out.println("値92を含む? " + scores.containsValue(92));

        // 削除
        scores.remove("佐藤");
        System.out.println("削除後: " + scores);
        System.out.println("サイズ: " + scores.size());
    }
}`}
          expectedOutput={`マップ: {佐藤=78, 田中=85, 鈴木=92}
田中: 85
存在しないキー: null
山田: 0
田中を含む? true
値92を含む? true
削除後: {田中=85, 鈴木=92}
サイズ: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イテレーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">keySet()</code>、<code className="text-orange-300">values()</code>、
          <code className="text-orange-300">entrySet()</code> を使ってマップを巡回します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        HashMap<String, String> capitals = new HashMap<>();
        capitals.put("日本", "東京");
        capitals.put("フランス", "パリ");
        capitals.put("アメリカ", "ワシントンD.C.");

        // keySetでキーを巡回
        System.out.println("--- キー ---");
        for (String key : capitals.keySet()) {
            System.out.println(key);
        }

        // valuesで値を巡回
        System.out.println("--- 値 ---");
        for (String value : capitals.values()) {
            System.out.println(value);
        }

        // entrySetでキーと値を巡回
        System.out.println("--- エントリ ---");
        for (Map.Entry<String, String> entry : capitals.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }

        // forEachメソッド
        System.out.println("--- forEach ---");
        capitals.forEach((k, v) -> System.out.println(k + ": " + v));
    }
}`}
          expectedOutput={`--- キー ---
フランス
日本
アメリカ
--- 値 ---
パリ
東京
ワシントンD.C.
--- エントリ ---
フランス → パリ
日本 → 東京
アメリカ → ワシントンD.C.
--- forEach ---
フランス: パリ
日本: 東京
アメリカ: ワシントンD.C.`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">便利メソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">putIfAbsent()</code>、<code className="text-orange-300">replace()</code>、
          <code className="text-orange-300">merge()</code> などの便利なメソッドを使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> inventory = new HashMap<>();
        inventory.put("りんご", 10);
        inventory.put("バナナ", 5);

        // putIfAbsent: キーが存在しない場合のみ追加
        inventory.putIfAbsent("りんご", 99);  // 既存なので変更なし
        inventory.putIfAbsent("みかん", 8);    // 新規追加
        System.out.println("putIfAbsent: " + inventory);

        // replace: 値の置き換え
        inventory.replace("バナナ", 20);
        System.out.println("replace: " + inventory);

        // merge: 既存値と新しい値を結合
        inventory.merge("りんご", 5, Integer::sum);  // 10 + 5 = 15
        inventory.merge("ぶどう", 3, Integer::sum);  // 新規: 3
        System.out.println("merge: " + inventory);

        // compute: キーに対する値を計算
        inventory.compute("バナナ", (k, v) -> v * 2);
        System.out.println("compute: " + inventory);
    }
}`}
          expectedOutput={`putIfAbsent: {みかん=8, りんご=10, バナナ=5}
replace: {みかん=8, りんご=10, バナナ=20}
merge: {みかん=8, りんご=15, ぶどう=3, バナナ=20}
compute: {みかん=8, りんご=15, ぶどう=3, バナナ=40}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="hashmap" />
      </div>
      <LessonNav lessons={lessons} currentId="hashmap" basePath="/learn/collections" />
    </div>
  );
}
