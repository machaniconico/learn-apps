import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function FactoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デザインパターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Factoryパターン</h1>
        <p className="text-gray-400">Factory Method、Abstract Factory</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Factoryパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Factoryパターンはオブジェクトの生成ロジックをカプセル化するパターンです。
          クライアントコードは具体的なクラスを知らなくても、インターフェースを通じて
          適切なオブジェクトを取得できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Simple Factory - staticメソッドで生成（厳密にはパターンではない）</li>
          <li>Factory Method - サブクラスが生成するオブジェクトを決定</li>
          <li>Abstract Factory - 関連するオブジェクト群を一括生成</li>
          <li>生成ロジックの変更がクライアントに影響しない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Simple Factory</h2>
        <p className="text-gray-400 mb-4">
          staticメソッドで条件に応じたオブジェクトを生成するシンプルな方法です。
        </p>
        <JavaEditor
          defaultCode={`interface Shape {
    void draw();
    double area();
}

class Circle implements Shape {
    private double radius;
    Circle(double radius) { this.radius = radius; }
    public void draw() { System.out.println("○ 円を描画（半径: " + radius + "）"); }
    public double area() { return Math.PI * radius * radius; }
}

class Rectangle implements Shape {
    private double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    public void draw() { System.out.println("□ 四角形を描画（" + w + "x" + h + "）"); }
    public double area() { return w * h; }
}

class Triangle implements Shape {
    private double base, height;
    Triangle(double base, double height) { this.base = base; this.height = height; }
    public void draw() { System.out.println("△ 三角形を描画（底辺: " + base + "）"); }
    public double area() { return base * height / 2; }
}

// Simple Factory
class ShapeFactory {
    public static Shape create(String type, double... params) {
        return switch (type) {
            case "circle"    -> new Circle(params[0]);
            case "rectangle" -> new Rectangle(params[0], params[1]);
            case "triangle"  -> new Triangle(params[0], params[1]);
            default -> throw new IllegalArgumentException("不明な図形: " + type);
        };
    }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            ShapeFactory.create("circle", 5),
            ShapeFactory.create("rectangle", 4, 3),
            ShapeFactory.create("triangle", 6, 4)
        };

        for (Shape s : shapes) {
            s.draw();
            System.out.printf("  面積: %.2f%n", s.area());
        }
    }
}`}
          expectedOutput={`○ 円を描画（半径: 5.0）
  面積: 78.54
□ 四角形を描画（4.0x3.0）
  面積: 12.00
△ 三角形を描画（底辺: 6.0）
  面積: 12.00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Factory Method</h2>
        <p className="text-gray-400 mb-4">
          サブクラスがどのオブジェクトを生成するかを決定するパターンです。
          テンプレートメソッドと組み合わせることが多いです。
        </p>
        <JavaEditor
          defaultCode={`abstract class Notification {
    abstract String getChannel();
    abstract void send(String message);

    // テンプレートメソッド
    void notify(String message) {
        System.out.println("[" + getChannel() + "] 送信: " + message);
        send(message);
    }
}

class EmailNotification extends Notification {
    String getChannel() { return "Email"; }
    void send(String message) {
        System.out.println("  → メール送信完了");
    }
}

class SlackNotification extends Notification {
    String getChannel() { return "Slack"; }
    void send(String message) {
        System.out.println("  → Slack投稿完了");
    }
}

// Factory Method
abstract class NotificationFactory {
    abstract Notification createNotification();

    void sendNotification(String message) {
        Notification n = createNotification();
        n.notify(message);
    }
}

class EmailFactory extends NotificationFactory {
    Notification createNotification() { return new EmailNotification(); }
}

class SlackFactory extends NotificationFactory {
    Notification createNotification() { return new SlackNotification(); }
}

public class Main {
    public static void main(String[] args) {
        NotificationFactory emailFactory = new EmailFactory();
        NotificationFactory slackFactory = new SlackFactory();

        emailFactory.sendNotification("新規登録がありました");
        slackFactory.sendNotification("デプロイ完了");
    }
}`}
          expectedOutput={`[Email] 送信: 新規登録がありました
  → メール送信完了
[Slack] 送信: デプロイ完了
  → Slack投稿完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Abstract Factory</h2>
        <p className="text-gray-400 mb-4">
          関連するオブジェクト群をまとめて生成するパターンです。
          テーマやプラットフォームごとに異なるUI部品セットを作る場合などに使います。
        </p>
        <JavaEditor
          defaultCode={`// 抽象プロダクト
interface Button { void render(); }
interface TextField { void render(); }

// ライトテーマの具象プロダクト
class LightButton implements Button {
    public void render() { System.out.println("  [ライトボタン] 白背景・黒文字"); }
}
class LightTextField implements TextField {
    public void render() { System.out.println("  [ライト入力欄] 白背景・グレー枠"); }
}

// ダークテーマの具象プロダクト
class DarkButton implements Button {
    public void render() { System.out.println("  [ダークボタン] 黒背景・白文字"); }
}
class DarkTextField implements TextField {
    public void render() { System.out.println("  [ダーク入力欄] 黒背景・青枠"); }
}

// Abstract Factory
interface UIFactory {
    Button createButton();
    TextField createTextField();
}

class LightThemeFactory implements UIFactory {
    public Button createButton() { return new LightButton(); }
    public TextField createTextField() { return new LightTextField(); }
}

class DarkThemeFactory implements UIFactory {
    public Button createButton() { return new DarkButton(); }
    public TextField createTextField() { return new DarkTextField(); }
}

public class Main {
    static void buildUI(UIFactory factory, String theme) {
        System.out.println("=== " + theme + "テーマ ===");
        factory.createButton().render();
        factory.createTextField().render();
    }

    public static void main(String[] args) {
        buildUI(new LightThemeFactory(), "ライト");
        buildUI(new DarkThemeFactory(), "ダーク");
    }
}`}
          expectedOutput={`=== ライトテーマ ===
  [ライトボタン] 白背景・黒文字
  [ライト入力欄] 白背景・グレー枠
=== ダークテーマ ===
  [ダークボタン] 黒背景・白文字
  [ダーク入力欄] 黒背景・青枠`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="factory" />
      </div>
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/design" />
    </div>
  );
}
