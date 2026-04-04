import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function ObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デザインパターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Observerパターン</h1>
        <p className="text-gray-400">Subject/Observer、イベント通知</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Observerパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Observerパターンは、あるオブジェクト（Subject）の状態変化を
          複数のオブジェクト（Observer）に自動通知する仕組みです。
          イベント駆動プログラミングの基礎となるパターンで、
          GUIイベントやメッセージングで広く使われています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Subject（発行者）- 状態を持ち、変化時にObserverに通知</li>
          <li>Observer（購読者）- 通知を受け取って処理を実行</li>
          <li>疎結合 - SubjectはObserverの具体型を知らない</li>
          <li>1対多の通知が実現できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なObserverパターン</h2>
        <p className="text-gray-400 mb-4">
          ニュースサイトの購読システムで、新しい記事が投稿されたら全購読者に通知します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

// Observer インターフェース
interface Subscriber {
    void update(String article);
}

// Subject（発行者）
class NewsPublisher {
    private List<Subscriber> subscribers = new ArrayList<>();
    private String latestArticle;

    public void subscribe(Subscriber s) {
        subscribers.add(s);
    }

    public void unsubscribe(Subscriber s) {
        subscribers.remove(s);
    }

    public void publishArticle(String article) {
        this.latestArticle = article;
        System.out.println("【新着記事】" + article);
        notifySubscribers();
    }

    private void notifySubscribers() {
        for (Subscriber s : subscribers) {
            s.update(latestArticle);
        }
    }
}

// 具体的なObserver
class EmailSubscriber implements Subscriber {
    private String email;
    EmailSubscriber(String email) { this.email = email; }
    public void update(String article) {
        System.out.println("  メール通知 → " + email + ": " + article);
    }
}

class AppSubscriber implements Subscriber {
    private String userId;
    AppSubscriber(String userId) { this.userId = userId; }
    public void update(String article) {
        System.out.println("  アプリ通知 → " + userId + ": " + article);
    }
}

public class Main {
    public static void main(String[] args) {
        NewsPublisher publisher = new NewsPublisher();

        EmailSubscriber email = new EmailSubscriber("user@example.com");
        AppSubscriber app = new AppSubscriber("user123");

        publisher.subscribe(email);
        publisher.subscribe(app);

        publisher.publishArticle("Java 25がリリース！");
        System.out.println();

        publisher.unsubscribe(email);
        publisher.publishArticle("Spring Boot 4.0発表");
    }
}`}
          expectedOutput={`【新着記事】Java 25がリリース！
  メール通知 → user@example.com: Java 25がリリース！
  アプリ通知 → user123: Java 25がリリース！

【新着記事】Spring Boot 4.0発表
  アプリ通知 → user123: Spring Boot 4.0発表`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダを使ったObserver</h2>
        <p className="text-gray-400 mb-4">
          Observerインターフェースが関数型インターフェースの場合、ラムダ式で簡潔に書けます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

class EventEmitter<T> {
    private List<Consumer<T>> listeners = new ArrayList<>();

    public void on(Consumer<T> listener) {
        listeners.add(listener);
    }

    public void emit(T event) {
        listeners.forEach(l -> l.accept(event));
    }
}

public class Main {
    public static void main(String[] args) {
        EventEmitter<String> priceAlert = new EventEmitter<>();

        // ラムダでObserverを登録
        priceAlert.on(price -> System.out.println("画面更新: " + price));
        priceAlert.on(price -> System.out.println("ログ記録: " + price));
        priceAlert.on(price -> System.out.println("SMS送信: " + price));

        System.out.println("=== 株価変動イベント ===");
        priceAlert.emit("AAPL: $185.50 (+2.3%)");
        System.out.println();
        priceAlert.emit("GOOGL: $142.20 (-0.5%)");
    }
}`}
          expectedOutput={`=== 株価変動イベント ===
画面更新: AAPL: $185.50 (+2.3%)
ログ記録: AAPL: $185.50 (+2.3%)
SMS送信: AAPL: $185.50 (+2.3%)

画面更新: GOOGL: $142.20 (-0.5%)
ログ記録: GOOGL: $142.20 (-0.5%)
SMS送信: GOOGL: $142.20 (-0.5%)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用例: PropertyChangeListener</h2>
        <p className="text-gray-400 mb-4">
          Java標準ライブラリの <code className="text-orange-300">PropertyChangeSupport</code> は
          Observerパターンの実装を提供しています。
        </p>
        <JavaEditor
          defaultCode={`import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

class UserProfile {
    private PropertyChangeSupport support = new PropertyChangeSupport(this);
    private String name;
    private int age;

    public void addListener(PropertyChangeListener l) {
        support.addPropertyChangeListener(l);
    }

    public void setName(String name) {
        String old = this.name;
        this.name = name;
        support.firePropertyChange("name", old, name);
    }

    public void setAge(int age) {
        int old = this.age;
        this.age = age;
        support.firePropertyChange("age", old, age);
    }
}

public class Main {
    public static void main(String[] args) {
        UserProfile profile = new UserProfile();

        // PropertyChangeListenerで変更を監視
        profile.addListener(evt ->
            System.out.printf("%s が変更: %s → %s%n",
                evt.getPropertyName(),
                evt.getOldValue(),
                evt.getNewValue())
        );

        profile.setName("太郎");
        profile.setAge(25);
        profile.setName("次郎");
        profile.setAge(30);
    }
}`}
          expectedOutput={`name が変更: null → 太郎
age が変更: 0 → 25
name が変更: 太郎 → 次郎
age が変更: 25 → 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/design" />
    </div>
  );
}
