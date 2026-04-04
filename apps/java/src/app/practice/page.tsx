import { JavaEditor } from "@/components/java-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* Project 1: 学生管理システム */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">学生管理システム</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-300 mb-2">クラスとArrayListを使って学生情報を管理するシステムを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Student クラスに学番・名前・点数フィールドを持たせる</li>
            <li>ArrayList で複数の学生を管理する</li>
            <li>平均点・最高点・最低点を計算して表示する</li>
            <li>点数順にソートして一覧表示する</li>
          </ul>
        </div>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

// TODO: Student クラスを実装する
class Student {
    private String id;
    private String name;
    private int score;

    // TODO: コンストラクタを実装する（id, name, score を受け取る）
    public Student(String id, String name, int score) {
        // TODO: フィールドに値をセットする
    }

    // TODO: ゲッターを実装する
    public String getId()    { return id; }
    public String getName()  { return name; }
    public int getScore()    { return score; }

    @Override
    public String toString() {
        return String.format("[%s] %s: %d点", id, name, score);
    }
}

public class Main {
    public static void main(String[] args) {
        // TODO: ArrayList<Student> を作成して学生を追加する
        ArrayList<Student> students = new ArrayList<>();
        // TODO: 以下の学生を add する
        // S001, 田中太郎, 85
        // S002, 鈴木花子, 92
        // S003, 佐藤次郎, 67
        // S004, 山田一郎, 78
        // S005, 高橋美咲, 95

        // TODO: 全学生を表示する
        System.out.println("=== 学生一覧 ===");

        // TODO: 平均点を計算して表示する（int の合計を double で割る）
        System.out.println("\\n=== 統計 ===");

        // TODO: 点数の高い順にソートして上位3名を表示する
        // ヒント: Collections.sort(students, Comparator.comparingInt(Student::getScore).reversed())
        System.out.println("\\n=== 点数上位3名 ===");
    }
}`}
          expectedOutput={`=== 学生一覧 ===
[S001] 田中太郎: 85点
[S002] 鈴木花子: 92点
[S003] 佐藤次郎: 67点
[S004] 山田一郎: 78点
[S005] 高橋美咲: 95点

=== 統計 ===
平均点: 83.4点
最高点: 95点
最低点: 67点

=== 点数上位3名 ===
1位: [S005] 高橋美咲: 95点
2位: [S002] 鈴木花子: 92点
3位: [S001] 田中太郎: 85点`}
        />
      </section>

      {/* Project 2: 銀行口座シミュレータ */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">銀行口座シミュレータ</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-300 mb-2">継承と例外処理を使って、普通口座・定期口座を持つ銀行システムをシミュレートしましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>BankAccount 基底クラスに残高・入出金メソッドを実装する</li>
            <li>残高不足の場合は独自例外 InsufficientFundsException をスローする</li>
            <li>SavingsAccount を継承して利息計算メソッドを追加する</li>
            <li>取引履歴を ArrayList で記録して表示する</li>
          </ul>
        </div>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;

// TODO: 残高不足例外クラスを実装する
class InsufficientFundsException extends Exception {
    // TODO: メッセージを受け取るコンストラクタを実装する
}

// TODO: BankAccount 基底クラスを実装する
class BankAccount {
    protected String accountId;
    protected String owner;
    protected double balance;
    protected ArrayList<String> history;

    public BankAccount(String accountId, String owner, double initialBalance) {
        // TODO: フィールドを初期化する（history は new ArrayList<>()）
    }

    // TODO: 入金メソッドを実装する（amount が 0 以下なら IllegalArgumentException）
    public void deposit(double amount) {
    }

    // TODO: 出金メソッドを実装する（残高不足なら InsufficientFundsException）
    public void withdraw(double amount) throws InsufficientFundsException {
    }

    public void printHistory() {
        System.out.println("--- " + owner + "の取引履歴 ---");
        for (String record : history) System.out.println("  " + record);
        System.out.printf("  現在残高: %.0f円%n", balance);
    }
}

// TODO: SavingsAccount を BankAccount から継承して実装する
class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String accountId, String owner, double initialBalance, double interestRate) {
        // TODO: super() を呼び、interestRate をセットする
    }

    // TODO: 利息を計算して残高に加算するメソッドを実装する
    public void applyInterest() {
        // TODO: balance *= (1 + interestRate) として履歴に記録する
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC001", "田中太郎", 100000);
        SavingsAccount sav = new SavingsAccount("SAV001", "鈴木花子", 200000, 0.03);

        try {
            acc.deposit(50000);
            acc.withdraw(30000);
            acc.withdraw(200000); // これは例外になるはず
        } catch (InsufficientFundsException e) {
            System.out.println("エラー: " + e.getMessage());
        }
        acc.printHistory();

        System.out.println();
        try {
            sav.deposit(100000);
            sav.applyInterest();
            sav.withdraw(50000);
        } catch (InsufficientFundsException e) {
            System.out.println("エラー: " + e.getMessage());
        }
        sav.printHistory();
    }
}`}
          expectedOutput={`エラー: 残高不足です。残高: 120000円、引出額: 200000円
--- 田中太郎の取引履歴 ---
  入金: +50000円
  出金: -30000円
  現在残高: 120000円

--- 鈴木花子の取引履歴 ---
  入金: +100000円
  利息付与: +9000円 (3.0%)
  出金: -50000円
  現在残高: 259000円`}
        />
      </section>

      {/* Project 3: テキストファイル分析 */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">テキストファイル分析</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-300 mb-2">Stream API と Map を使って、テキストデータの単語頻度を分析しましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>文字列を単語に分割して Map で頻度を集計する</li>
            <li>Stream API の filter / map / sorted / limit を使う</li>
            <li>出現頻度 TOP5 の単語を表示する</li>
            <li>長さが5文字以上の単語だけ抽出して表示する</li>
          </ul>
        </div>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        String text =
            "Java is a popular programming language. " +
            "Java is used for web development and mobile development. " +
            "Java programming requires understanding of object oriented programming. " +
            "Many developers use Java for enterprise applications and web services.";

        // TODO: テキストを単語に分割する（小文字化し、記号を除去する）
        // ヒント: text.toLowerCase().split("[\\\\s.,!?]+") で単語配列を得る
        String[] words = null; // TODO: 実装する

        // TODO: Map<String, Long> で単語の出現頻度を集計する
        // ヒント: Arrays.stream(words).collect(Collectors.groupingBy(w -> w, Collectors.counting()))
        Map<String, Long> frequency = null; // TODO: 実装する

        // TODO: 出現頻度 TOP5 を表示する
        // ヒント: frequency.entrySet().stream()
        //         .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
        //         .limit(5)
        System.out.println("=== 出現頻度 TOP5 ===");
        // TODO: Stream で絞り込んで forEach で出力する

        // TODO: 5文字以上の単語を重複なしで取得してアルファベット順に表示する
        // ヒント: Arrays.stream(words).filter(...).distinct().sorted()
        System.out.println("\\n=== 5文字以上の単語（重複なし）===");
        // TODO: Stream で絞り込んで forEach で出力する

        // TODO: 総単語数・ユニーク単語数を表示する
        System.out.println("\\n=== テキスト統計 ===");
        // TODO: words.length と frequency.size() を使う
    }
}`}
          expectedOutput={`=== 出現頻度 TOP5 ===
java: 4回
programming: 3回
development: 2回
web: 2回
is: 2回

=== 5文字以上の単語（重複なし）===
applications
development
enterprise
language
mobile
object
oriented
popular
programming
requires
services
understanding

=== テキスト統計 ===
総単語数: 38
ユニーク単語数: 26`}
        />
      </section>

      {/* Project 4: 図形面積計算 */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">図形面積計算</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-300 mb-2">インターフェースとポリモーフィズムを活用して、様々な図形の面積・周囲長を計算するシステムを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Shape インターフェースに area() と perimeter() を定義する</li>
            <li>Circle・Rectangle・Triangle クラスを実装する</li>
            <li>ArrayList{"<Shape>"} でまとめて管理してポリモーフィックに処理する</li>
            <li>最大面積・合計面積を Stream API で求める</li>
          </ul>
        </div>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

// TODO: Shape インターフェースを定義する
interface Shape {
    // TODO: double area() と double perimeter() を宣言する
    // TODO: default メソッド describe() で "図形名: 面積=X, 周囲長=Y" を返す
    String getName();
    double area();
    double perimeter();
    default String describe() {
        return String.format("%s: 面積=%.2f, 周囲長=%.2f", getName(), area(), perimeter());
    }
}

// TODO: Circle クラスを Shape を実装して作成する
class Circle implements Shape {
    private double radius;
    // TODO: コンストラクタ、getName()、area()、perimeter() を実装する
    // area = Math.PI * r * r, perimeter = 2 * Math.PI * r
}

// TODO: Rectangle クラスを Shape を実装して作成する
class Rectangle implements Shape {
    private double width, height;
    // TODO: コンストラクタ、getName()、area()、perimeter() を実装する
    // area = w * h, perimeter = 2 * (w + h)
}

// TODO: Triangle クラスを Shape を実装して作成する
class Triangle implements Shape {
    private double a, b, c; // 3辺の長さ
    // TODO: コンストラクタ、getName()、perimeter() を実装する
    // TODO: area() はヘロンの公式で実装する
    // s = (a+b+c)/2, area = Math.sqrt(s*(s-a)*(s-b)*(s-c))
}

public class Main {
    public static void main(String[] args) {
        List<Shape> shapes = new ArrayList<>();
        shapes.add(new Circle(5));
        shapes.add(new Rectangle(4, 6));
        shapes.add(new Triangle(3, 4, 5));
        shapes.add(new Circle(3));
        shapes.add(new Rectangle(8, 2));

        System.out.println("=== 図形一覧 ===");
        // TODO: shapes を forEach でループして describe() を表示する

        // TODO: 合計面積を Stream の mapToDouble と sum で計算する
        System.out.println("\\n=== 統計 ===");

        // TODO: 最大面積の図形を Stream の max で求めて表示する
    }
}`}
          expectedOutput={`=== 図形一覧 ===
円: 面積=78.54, 周囲長=31.42
長方形: 面積=24.00, 周囲長=20.00
三角形: 面積=6.00, 周囲長=12.00
円: 面積=28.27, 周囲長=18.85
長方形: 面積=16.00, 周囲長=20.00

=== 統計 ===
合計面積: 152.81
最大面積の図形: 円 (78.54)`}
        />
      </section>
    </div>
  );
}
