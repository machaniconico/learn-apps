import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DecoratorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デザインパターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Decoratorパターン</h1>
        <p className="text-gray-400">InputStream/BufferedInputStreamの例</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Decoratorパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Decoratorパターンは、オブジェクトに動的に機能を追加するパターンです。
          継承ではなく委譲を使い、既存クラスを変更せずに機能を拡張できます。
          JavaのI/Oストリームが代表的な実装例です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Component - 基本インターフェース</li>
          <li>ConcreteComponent - 元となるオブジェクト</li>
          <li>Decorator - Componentを持ち、同じインターフェースを実装</li>
          <li>複数のDecoratorを重ねて使える（積み重ね可能）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なDecorator</h2>
        <p className="text-gray-400 mb-4">
          コーヒーにトッピングを追加するDecoratorパターンの例です。
          基本のコーヒーにDecoratorを重ねて機能（トッピング）を追加します。
        </p>
        <JavaEditor
          defaultCode={`interface Coffee {
    String getDescription();
    int getCost();
}

// ConcreteComponent
class BasicCoffee implements Coffee {
    public String getDescription() { return "コーヒー"; }
    public int getCost() { return 300; }
}

// 抽象Decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
}

// ConcreteDecorators
class MilkDecorator extends CoffeeDecorator {
    MilkDecorator(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + " + ミルク"; }
    public int getCost() { return coffee.getCost() + 50; }
}

class SugarDecorator extends CoffeeDecorator {
    SugarDecorator(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + " + シュガー"; }
    public int getCost() { return coffee.getCost() + 30; }
}

class WhipDecorator extends CoffeeDecorator {
    WhipDecorator(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + " + ホイップ"; }
    public int getCost() { return coffee.getCost() + 100; }
}

public class Main {
    public static void main(String[] args) {
        Coffee c1 = new BasicCoffee();
        System.out.println(c1.getDescription() + ": " + c1.getCost() + "円");

        Coffee c2 = new MilkDecorator(new BasicCoffee());
        System.out.println(c2.getDescription() + ": " + c2.getCost() + "円");

        // Decoratorを重ねる
        Coffee c3 = new WhipDecorator(
                      new MilkDecorator(
                        new SugarDecorator(
                          new BasicCoffee())));
        System.out.println(c3.getDescription() + ": " + c3.getCost() + "円");
    }
}`}
          expectedOutput={`コーヒー: 300円
コーヒー + ミルク: 350円
コーヒー + シュガー + ミルク + ホイップ: 480円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Java I/OのDecoratorパターン</h2>
        <p className="text-gray-400 mb-4">
          JavaのI/Oストリームは典型的なDecoratorパターンです。
          <code className="text-orange-300">InputStream</code> に <code className="text-orange-300">BufferedInputStream</code>、
          <code className="text-orange-300">DataInputStream</code> を重ねて機能を追加します。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Java I/O の Decorator構造 ===");
        System.out.println();
        System.out.println("// ファイル読み込みの例");
        System.out.println("InputStream fis = new FileInputStream(\\"data.txt\\");");
        System.out.println("// ↓ バッファリング機能を追加");
        System.out.println("InputStream bis = new BufferedInputStream(fis);");
        System.out.println("// ↓ データ型読み込み機能を追加");
        System.out.println("DataInputStream dis = new DataInputStream(bis);");
        System.out.println();

        // 実際にDecoratorを使用（ByteArrayで代用）
        byte[] data = "Hello, Decorator Pattern!".getBytes();
        InputStream base = new ByteArrayInputStream(data);
        BufferedInputStream buffered = new BufferedInputStream(base);

        try {
            byte[] buf = new byte[data.length];
            buffered.read(buf);
            System.out.println("読み込み結果: " + new String(buf));
            buffered.close();
        } catch (IOException e) {
            System.out.println("エラー: " + e.getMessage());
        }

        System.out.println();
        System.out.println("=== I/O Decoratorの階層 ===");
        System.out.println("InputStream（Component）");
        System.out.println("├── FileInputStream（ConcreteComponent）");
        System.out.println("├── ByteArrayInputStream（ConcreteComponent）");
        System.out.println("└── FilterInputStream（Decorator基底）");
        System.out.println("    ├── BufferedInputStream（バッファリング）");
        System.out.println("    ├── DataInputStream（型付き読み込み）");
        System.out.println("    └── GZIPInputStream（圧縮解凍）");
    }
}`}
          expectedOutput={`=== Java I/O の Decorator構造 ===

// ファイル読み込みの例
InputStream fis = new FileInputStream("data.txt");
// ↓ バッファリング機能を追加
InputStream bis = new BufferedInputStream(fis);
// ↓ データ型読み込み機能を追加
DataInputStream dis = new DataInputStream(bis);

読み込み結果: Hello, Decorator Pattern!

=== I/O Decoratorの階層 ===
InputStream（Component）
├── FileInputStream（ConcreteComponent）
├── ByteArrayInputStream（ConcreteComponent）
└── FilterInputStream（Decorator基底）
    ├── BufferedInputStream（バッファリング）
    ├── DataInputStream（型付き読み込み）
    └── GZIPInputStream（圧縮解凍）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践: ロギングDecorator</h2>
        <p className="text-gray-400 mb-4">
          既存のサービスにロギング機能をDecoratorで追加する実用的な例です。
          元のサービスのコードを一切変更せずに機能を追加できます。
        </p>
        <JavaEditor
          defaultCode={`interface UserService {
    String findUser(int id);
    void saveUser(String name);
}

class UserServiceImpl implements UserService {
    public String findUser(int id) { return "User-" + id; }
    public void saveUser(String name) { /* DB保存 */ }
}

// ロギングDecorator
class LoggingUserService implements UserService {
    private UserService delegate;

    LoggingUserService(UserService delegate) {
        this.delegate = delegate;
    }

    public String findUser(int id) {
        System.out.println("[LOG] findUser(" + id + ") 呼び出し");
        String result = delegate.findUser(id);
        System.out.println("[LOG] findUser → " + result);
        return result;
    }

    public void saveUser(String name) {
        System.out.println("[LOG] saveUser(" + name + ") 呼び出し");
        delegate.saveUser(name);
        System.out.println("[LOG] saveUser 完了");
    }
}

public class Main {
    public static void main(String[] args) {
        UserService service = new LoggingUserService(
            new UserServiceImpl()
        );

        service.findUser(42);
        System.out.println();
        service.saveUser("太郎");
        System.out.println();

        System.out.println("元のUserServiceImplは変更なし！");
        System.out.println("Spring AOPも同じ考え方でプロキシを生成");
    }
}`}
          expectedOutput={`[LOG] findUser(42) 呼び出し
[LOG] findUser → User-42

[LOG] saveUser(太郎) 呼び出し
[LOG] saveUser 完了

元のUserServiceImplは変更なし！
Spring AOPも同じ考え方でプロキシを生成`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="decorator" />
      </div>
      <LessonNav lessons={lessons} currentId="decorator" basePath="/learn/design" />
    </div>
  );
}
