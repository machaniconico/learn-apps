import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function SerializationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シリアライゼーション</h1>
        <p className="text-gray-400">Serializable、ObjectOutputStream/InputStreamによるオブジェクトの保存と復元</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">シリアライゼーションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オブジェクトをバイト列に変換してファイルやネットワークに保存・送信する仕組みです。
          <code className="text-orange-300">Serializable</code> インターフェースを実装したクラスがシリアライズ可能になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>implements Serializable</code> でシリアライズ可能にする</li>
          <li><code>ObjectOutputStream</code> でオブジェクトを書き込み</li>
          <li><code>ObjectInputStream</code> でオブジェクトを読み込み</li>
          <li><code>transient</code> キーワードでシリアライズ対象外にできる</li>
          <li><code>serialVersionUID</code> でバージョン管理する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なシリアライゼーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Serializable</code> を実装したクラスのオブジェクトを
          ファイルに保存し、復元します。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int age;

    User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{name='" + name + "', age=" + age + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // シリアライズ（書き込み）
        User user = new User("Alice", 25);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("user.dat"))) {
            oos.writeObject(user);
            System.out.println("保存: " + user);
        }

        // デシリアライズ（読み込み）
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("user.dat"))) {
            User loaded = (User) ois.readObject();
            System.out.println("復元: " + loaded);
            System.out.println("名前一致: " + user.name.equals(loaded.name));
        }

        new File("user.dat").delete();
    }
}`}
          expectedOutput={`保存: User{name='Alice', age=25}
復元: User{name='Alice', age=25}
名前一致: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">transientとシリアライズ対象外</h2>
        <p className="text-gray-400 mb-4">
          パスワードなどの機密情報は <code className="text-orange-300">transient</code> を付けると
          シリアライズの対象外になります。復元時はデフォルト値（nullや0）になります。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;

class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    String username;
    transient String password;  // シリアライズ対象外
    transient int loginCount;   // シリアライズ対象外
    String email;

    Account(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.loginCount = 5;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Account account = new Account("alice", "secret123", "alice@example.com");

        System.out.println("保存前:");
        System.out.println("  username: " + account.username);
        System.out.println("  password: " + account.password);
        System.out.println("  email: " + account.email);
        System.out.println("  loginCount: " + account.loginCount);

        // 保存
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("account.dat"))) {
            oos.writeObject(account);
        }

        // 復元
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("account.dat"))) {
            Account loaded = (Account) ois.readObject();
            System.out.println("復元後:");
            System.out.println("  username: " + loaded.username);
            System.out.println("  password: " + loaded.password);   // null
            System.out.println("  email: " + loaded.email);
            System.out.println("  loginCount: " + loaded.loginCount); // 0
        }

        new File("account.dat").delete();
    }
}`}
          expectedOutput={`保存前:
  username: alice
  password: secret123
  email: alice@example.com
  loginCount: 5
復元後:
  username: alice
  password: null
  email: alice@example.com
  loginCount: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リストのシリアライズ</h2>
        <p className="text-gray-400 mb-4">
          Serializableなオブジェクトのリストもまとめてシリアライズできます。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;
import java.util.*;

class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int price;
    Product(String name, int price) {
        this.name = name;
        this.price = price;
    }
    @Override
    public String toString() { return name + "(" + price + "円)"; }
}

public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        List<Product> products = new ArrayList<>();
        products.add(new Product("りんご", 150));
        products.add(new Product("バナナ", 100));
        products.add(new Product("みかん", 80));

        // リストごとシリアライズ
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("products.dat"))) {
            oos.writeObject(products);
            System.out.println("保存: " + products.size() + "件");
        }

        // 復元
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("products.dat"))) {
            List<Product> loaded = (List<Product>) ois.readObject();
            System.out.println("復元: " + loaded.size() + "件");
            loaded.forEach(p -> System.out.println("  " + p));
        }

        new File("products.dat").delete();
    }
}`}
          expectedOutput={`保存: 3件
復元: 3件
  りんご(150円)
  バナナ(100円)
  みかん(80円)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="serialization" />
      </div>
      <LessonNav lessons={lessons} currentId="serialization" basePath="/learn/fileio" />
    </div>
  );
}
