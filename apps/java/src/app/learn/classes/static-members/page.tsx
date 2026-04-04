import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesStaticMembersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">静的メンバ</h1>
        <p className="text-gray-400">staticフィールド・メソッド・静的初期化ブロックの使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">staticメンバとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          staticメンバはインスタンスではなくクラスに属するフィールドやメソッドです。
          すべてのインスタンスで共有され、クラス名から直接アクセスできます。
          定数の定義、カウンタ、ファクトリメソッド、ユーティリティメソッドなどに使用します。
          static初期化ブロックは、クラスが最初にロードされたときに一度だけ実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>staticフィールド：全インスタンスで共有されるデータ</li>
          <li>staticメソッド：インスタンスなしで呼べるメソッド</li>
          <li>staticブロック：クラスロード時に一度だけ実行される初期化コード</li>
          <li>static final：変更不可の定数を定義</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">staticフィールドでインスタンスを数える</h2>
        <p className="text-gray-400 mb-4">staticフィールドを使って、生成されたインスタンスの数を追跡します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class User {
        private static int totalCount = 0;  // 全インスタンスで共有
        private int id;
        private String name;

        User(String name) {
            totalCount++;
            this.id = totalCount;
            this.name = name;
        }

        // staticメソッド
        static int getTotalCount() {
            return totalCount;
        }

        void display() {
            System.out.println("ID:" + id + " " + name + " (全" + totalCount + "人)");
        }
    }

    public static void main(String[] args) {
        System.out.println("ユーザー数: " + User.getTotalCount());

        User u1 = new User("田中");
        User u2 = new User("鈴木");
        User u3 = new User("佐藤");

        u1.display();
        u2.display();
        u3.display();

        System.out.println("合計ユーザー数: " + User.getTotalCount());
    }
}`}
          expectedOutput={`ユーザー数: 0
ID:1 田中 (全3人)
ID:2 鈴木 (全3人)
ID:3 佐藤 (全3人)
合計ユーザー数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static finalで定数を定義</h2>
        <p className="text-gray-400 mb-4">static finalを使ってクラスレベルの定数を定義し、設定値を管理します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class GameConfig {
        // static final = 定数
        static final int MAX_LEVEL = 100;
        static final int START_HP = 100;
        static final double CRITICAL_RATE = 0.15;
        static final String GAME_TITLE = "JavaQuest";

        // staticメソッドでダメージ計算
        static int calcDamage(int attack, boolean critical) {
            int damage = attack;
            if (critical) {
                damage = (int)(damage * (1 + CRITICAL_RATE));
            }
            return damage;
        }
    }

    public static void main(String[] args) {
        System.out.println("ゲーム: " + GameConfig.GAME_TITLE);
        System.out.println("最大レベル: " + GameConfig.MAX_LEVEL);
        System.out.println("初期HP: " + GameConfig.START_HP);
        System.out.printf("クリティカル率: %.0f%%%n", GameConfig.CRITICAL_RATE * 100);

        System.out.println("---");
        System.out.println("通常ダメージ: " + GameConfig.calcDamage(50, false));
        System.out.println("クリティカル: " + GameConfig.calcDamage(50, true));
    }
}`}
          expectedOutput={`ゲーム: JavaQuest
最大レベル: 100
初期HP: 100
クリティカル率: 15%
---
通常ダメージ: 50
クリティカル: 57`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリメソッドパターン</h2>
        <p className="text-gray-400 mb-4">staticメソッドを使ったファクトリパターンでオブジェクト生成を制御します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Color {
        private int r, g, b;

        private Color(int r, int g, int b) {  // privateコンストラクタ
            this.r = r;
            this.g = g;
            this.b = b;
        }

        // ファクトリメソッド（staticメソッド）
        static Color rgb(int r, int g, int b) {
            return new Color(
                Math.max(0, Math.min(255, r)),
                Math.max(0, Math.min(255, g)),
                Math.max(0, Math.min(255, b))
            );
        }

        static Color red()   { return new Color(255, 0, 0); }
        static Color green() { return new Color(0, 255, 0); }
        static Color blue()  { return new Color(0, 0, 255); }
        static Color white() { return new Color(255, 255, 255); }

        public String toString() {
            return "Color(" + r + ", " + g + ", " + b + ")";
        }
    }

    public static void main(String[] args) {
        System.out.println(Color.red());
        System.out.println(Color.green());
        System.out.println(Color.blue());
        System.out.println(Color.white());
        System.out.println(Color.rgb(128, 64, 200));
    }
}`}
          expectedOutput={`Color(255, 0, 0)
Color(0, 255, 0)
Color(0, 0, 255)
Color(255, 255, 255)
Color(128, 64, 200)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="static-members" />
      </div>
      <LessonNav lessons={lessons} currentId="static-members" basePath="/learn/classes" />
    </div>
  );
}
