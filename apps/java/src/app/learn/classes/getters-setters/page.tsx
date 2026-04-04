import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesGettersSettersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">getter・setter</h1>
        <p className="text-gray-400">フィールドへのアクセスメソッドの定義とJavaBeans規約を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">getter・setterとカプセル化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          getter・setterは、privateフィールドへのアクセスを制御するメソッドです。
          フィールドを直接公開する代わりに、getterで値を取得し、setterで値を設定します。
          setterにバリデーションロジックを入れることで、不正な値の設定を防ぐことができます。
          JavaBeans規約では、getXxx() / setXxx() / isXxx()（boolean用）の命名規則を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>getter: getフィールド名() で値を返す</li>
          <li>setter: setフィールド名(値) で値を設定する</li>
          <li>boolean型のgetterは isXxx() と書くこともある</li>
          <li>setterでバリデーションを行い、不正な値を防ぐ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なgetter・setter</h2>
        <p className="text-gray-400 mb-4">privateフィールドに対するgetter・setterを定義する基本パターンです。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Person {
        private String name;
        private int age;
        private boolean active;

        // getter
        public String getName() { return name; }
        public int getAge() { return age; }
        public boolean isActive() { return active; }  // booleanはis接頭辞

        // setter
        public void setName(String name) { this.name = name; }
        public void setAge(int age) { this.age = age; }
        public void setActive(boolean active) { this.active = active; }

        public String toString() {
            return name + "(" + age + "歳)" + (active ? " [アクティブ]" : " [非アクティブ]");
        }
    }

    public static void main(String[] args) {
        Person p = new Person();
        p.setName("田中太郎");
        p.setAge(30);
        p.setActive(true);

        System.out.println(p.toString());
        System.out.println("名前: " + p.getName());
        System.out.println("年齢: " + p.getAge());
        System.out.println("アクティブ: " + p.isActive());
    }
}`}
          expectedOutput={`田中太郎(30歳) [アクティブ]
名前: 田中太郎
年齢: 30
アクティブ: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バリデーション付きsetter</h2>
        <p className="text-gray-400 mb-4">setterにバリデーションロジックを追加して、不正な値の設定を防ぎます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Score {
        private String subject;
        private int value;

        public Score(String subject) {
            this.subject = subject;
            this.value = 0;
        }

        public String getSubject() { return subject; }
        public int getValue() { return value; }

        // バリデーション付きsetter
        public void setValue(int value) {
            if (value < 0) {
                System.out.println("エラー: 負の値は設定できません (" + value + ")");
                return;
            }
            if (value > 100) {
                System.out.println("エラー: 100を超える値は設定できません (" + value + ")");
                return;
            }
            this.value = value;
        }

        public String getGrade() {
            if (value >= 90) return "A";
            if (value >= 80) return "B";
            if (value >= 70) return "C";
            return "D";
        }
    }

    public static void main(String[] args) {
        Score math = new Score("数学");
        math.setValue(85);
        System.out.println(math.getSubject() + ": " + math.getValue() + "点 [" + math.getGrade() + "]");

        math.setValue(-10);   // エラー
        math.setValue(150);   // エラー
        System.out.println("現在の値: " + math.getValue() + "点");  // 85のまま
    }
}`}
          expectedOutput={`数学: 85点 [B]
エラー: 負の値は設定できません (-10)
エラー: 100を超える値は設定できません (150)
現在の値: 85点`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">読み取り専用・計算プロパティ</h2>
        <p className="text-gray-400 mb-4">setterを提供しない読み取り専用フィールドや、getterで値を計算して返す例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Circle {
        private double radius;

        public Circle(double radius) {
            this.radius = Math.max(0, radius);
        }

        // getterのみ（読み取り専用）
        public double getRadius() { return radius; }

        // 計算プロパティ（フィールドを持たないgetter）
        public double getArea() {
            return Math.PI * radius * radius;
        }

        public double getCircumference() {
            return 2 * Math.PI * radius;
        }

        public double getDiameter() {
            return radius * 2;
        }
    }

    public static void main(String[] args) {
        Circle c = new Circle(5.0);
        System.out.println("半径: " + c.getRadius());
        System.out.println("直径: " + c.getDiameter());
        System.out.printf("面積: %.2f%n", c.getArea());
        System.out.printf("円周: %.2f%n", c.getCircumference());

        // c.setRadius(10); // setterがないのでコンパイルエラー
        System.out.println("---");
        Circle c2 = new Circle(10.0);
        System.out.println("半径: " + c2.getRadius());
        System.out.printf("面積: %.2f%n", c2.getArea());
    }
}`}
          expectedOutput={`半径: 5.0
直径: 10.0
面積: 78.54
円周: 31.42
---
半径: 10.0
面積: 314.16`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="getters-setters" />
      </div>
      <LessonNav lessons={lessons} currentId="getters-setters" basePath="/learn/classes" />
    </div>
  );
}
