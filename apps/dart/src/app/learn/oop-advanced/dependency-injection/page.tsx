import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function DependencyInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">依存性注入</h1>
        <p className="text-gray-400">テストしやすい疎結合な設計を実現する依存性注入（DI）をDartで学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">依存性注入とは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          依存性注入（DI）は、クラスが依存するオブジェクトを内部で生成するのではなく、外部から注入する設計パターンです。
          クラス間の結合度を下げ、テストのしやすさと再利用性を向上させます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• 依存するオブジェクトをコンストラクタで受け取る</li>
          <li>• インターフェースに依存することで実装を差し替え可能にする</li>
          <li>• テスト時にモックオブジェクトを注入できる</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタインジェクション</h2>
        <p className="text-gray-400 mb-4">
          コンストラクタで依存オブジェクトを受け取る基本的なDIパターンです。
        </p>
        <DartEditor
          defaultCode={`abstract class EmailService {
  void send(String to, String subject, String body);
}

class SmtpEmailService implements EmailService {
  @override
  void send(String to, String subject, String body) {
    print('[SMTP] To: \$to | Subject: \$subject');
    print('  Body: \$body');
  }
}

class MockEmailService implements EmailService {
  final List<String> sentEmails = [];

  @override
  void send(String to, String subject, String body) {
    sentEmails.add('\$to: \$subject');
    print('[MOCK] メール送信: \$to');
  }
}

class UserService {
  final EmailService _emailService;
  UserService(this._emailService);

  void register(String email) {
    print('ユーザー登録: \$email');
    _emailService.send(email, 'ようこそ！', 'Dartアプリへの登録ありがとうございます。');
  }
}

void main() {
  print('=== 本番環境 ===');
  final prodService = UserService(SmtpEmailService());
  prodService.register('user@example.com');

  print('\\n=== テスト環境 ===');
  final mock = MockEmailService();
  final testService = UserService(mock);
  testService.register('test@example.com');
  print('送信済みメール数: \${mock.sentEmails.length}');
}`}
          expectedOutput={`=== 本番環境 ===\nユーザー登録: user@example.com\n[SMTP] To: user@example.com | Subject: ようこそ！\n  Body: Dartアプリへの登録ありがとうございます。\n\n=== テスト環境 ===\nユーザー登録: test@example.com\n[MOCK] メール送信: test@example.com\n送信済みメール数: 1`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなDIコンテナ</h2>
        <p className="text-gray-400 mb-4">
          依存関係を管理するシンプルなDIコンテナの実装例です。
        </p>
        <DartEditor
          defaultCode={`class Container {
  final Map<Type, dynamic> _bindings = {};

  void bind<T>(T instance) {
    _bindings[T] = instance;
  }

  T resolve<T>() {
    final instance = _bindings[T];
    if (instance == null) throw StateError('未登録の型: \$T');
    return instance as T;
  }
}

abstract class Repository {
  List<String> findAll();
}

class InMemoryRepository implements Repository {
  final List<String> _data = ['Alice', 'Bob', 'Charlie'];

  @override
  List<String> findAll() => List.unmodifiable(_data);
}

class UserController {
  final Repository repo;
  UserController(this.repo);

  void listUsers() {
    final users = repo.findAll();
    print('ユーザー一覧 (\${users.length}人):');
    for (final u in users) print('  - \$u');
  }
}

void main() {
  final container = Container();
  container.bind<Repository>(InMemoryRepository());
  container.bind<UserController>(
    UserController(container.resolve<Repository>()),
  );

  container.resolve<UserController>().listUsers();
}`}
          expectedOutput={`ユーザー一覧 (3人):\n  - Alice\n  - Bob\n  - Charlie`}
        />
      </section>
      <LessonCompleteButton lessonId="dependency-injection" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="dependency-injection" basePath="/learn/oop-advanced" />
    </div>
  );
}
