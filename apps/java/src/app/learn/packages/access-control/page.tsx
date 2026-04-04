import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function AccessControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パッケージ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アクセス制御</h1>
        <p className="text-gray-400">パッケージプライベート、protected、public</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アクセス修飾子とパッケージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaのアクセス制御はパッケージと密接に関連しています。
          アクセス修飾子を省略すると「パッケージプライベート」になり、
          同じパッケージ内からのみアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>public</code> - どこからでもアクセス可能</li>
          <li><code>protected</code> - 同パッケージ + サブクラスからアクセス可能</li>
          <li>修飾子なし（パッケージプライベート） - 同パッケージのみ</li>
          <li><code>private</code> - 同クラス内のみ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アクセスレベルの比較</h2>
        <p className="text-gray-400 mb-4">
          4つのアクセスレベルのアクセス範囲を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== アクセス修飾子のアクセス範囲 ===");
        System.out.println();

        String[][] table = {
            {"修飾子", "同クラス", "同パッケージ", "サブクラス", "他パッケージ"},
            {"public", "○", "○", "○", "○"},
            {"protected", "○", "○", "○", "×"},
            {"(なし)", "○", "○", "×", "×"},
            {"private", "○", "×", "×", "×"}
        };

        for (int i = 0; i < table.length; i++) {
            System.out.printf("%-12s %-8s %-10s %-10s %s%n",
                table[i][0], table[i][1], table[i][2],
                table[i][3], table[i][4]);
            if (i == 0) {
                System.out.println("-".repeat(52));
            }
        }
    }
}`}
          expectedOutput={`=== アクセス修飾子のアクセス範囲 ===

修飾子          同クラス    同パッケージ    サブクラス      他パッケージ
----------------------------------------------------
public       ○        ○          ○          ○
protected    ○        ○          ○          ×
(なし)        ○        ○          ×          ×
private      ○        ×          ×          ×`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パッケージプライベートの活用</h2>
        <p className="text-gray-400 mb-4">
          パッケージプライベート（修飾子なし）は、同じパッケージ内でのみ使用するクラスや
          メソッドに適しています。内部実装を隠蔽しつつ、テストからはアクセスできます。
        </p>
        <JavaEditor
          defaultCode={`// パッケージプライベートクラスの例
class InternalHelper {
    // パッケージプライベートメソッド
    static String format(String name) {
        return "[" + name + "]";
    }
}

public class Main {
    public static void main(String[] args) {
        // 同じパッケージなのでアクセス可能
        String formatted = InternalHelper.format("テスト");
        System.out.println(formatted);

        System.out.println();
        System.out.println("=== パッケージプライベートの使い所 ===");
        System.out.println("1. 内部実装用のヘルパークラス");
        System.out.println("   → 外部パッケージから使わせたくない");
        System.out.println();
        System.out.println("2. テストでのアクセス");
        System.out.println("   → src/test/java に同パッケージのテストを置く");
        System.out.println("   → パッケージプライベートでもテスト可能");
        System.out.println();
        System.out.println("3. トップレベルクラス");
        System.out.println("   → publicクラスはファイル名と一致が必要");
        System.out.println("   → パッケージプライベートなら制約なし");
    }
}`}
          expectedOutput={`[テスト]

=== パッケージプライベートの使い所 ===
1. 内部実装用のヘルパークラス
   → 外部パッケージから使わせたくない

2. テストでのアクセス
   → src/test/java に同パッケージのテストを置く
   → パッケージプライベートでもテスト可能

3. トップレベルクラス
   → publicクラスはファイル名と一致が必要
   → パッケージプライベートなら制約なし`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">protectedとパッケージの関係</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">protected</code> は同パッケージに加えて、
          他パッケージのサブクラスからもアクセスできます。
        </p>
        <JavaEditor
          defaultCode={`class Animal {
    protected String name;

    protected Animal(String name) {
        this.name = name;
    }

    protected String describe() {
        return name + "は動物です";
    }
}

// 同パッケージのサブクラス
class Dog extends Animal {
    public Dog(String name) {
        super(name);  // protected コンストラクタにアクセス
    }

    public String bark() {
        return name + "がワンワン吠えた！";  // protected フィールドにアクセス
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("ポチ");
        System.out.println(dog.describe());
        System.out.println(dog.bark());

        System.out.println();
        System.out.println("=== protectedの特徴 ===");
        System.out.println("同パッケージ → 直接アクセス可能");
        System.out.println("他パッケージのサブクラス → 継承経由でアクセス可能");
        System.out.println("他パッケージの非サブクラス → アクセス不可");
    }
}`}
          expectedOutput={`ポチは動物です
ポチがワンワン吠えた！

=== protectedの特徴 ===
同パッケージ → 直接アクセス可能
他パッケージのサブクラス → 継承経由でアクセス可能
他パッケージの非サブクラス → アクセス不可`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="access-control" />
      </div>
      <LessonNav lessons={lessons} currentId="access-control" basePath="/learn/packages" />
    </div>
  );
}
