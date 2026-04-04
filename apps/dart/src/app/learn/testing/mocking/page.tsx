import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function MockingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">テスト</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">モック</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">モック（Mock）</strong>は実際の依存性を偽物に置き換えてテストする技法です。
            <code className="text-green-300">mockito</code>パッケージを使うか、インターフェースを手動で実装してモックを作成します。
            外部API・データベース・ファイルシステムなどの依存性をモック化します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">手動モックの実装</h2>
        <p className="text-gray-400 mb-4">
          インターフェースを実装したモッククラスを手動で作成する方法です。
        </p>
        <DartEditor
          defaultCode={`// インターフェース定義
abstract class UserRepository {
  Future<Map<String, dynamic>?> findById(int id);
  Future<List<Map<String, dynamic>>> findAll();
  Future<void> save(Map<String, dynamic> user);
}

// テスト用モック実装
class MockUserRepository implements UserRepository {
  final Map<int, Map<String, dynamic>> _store = {};
  int saveCallCount = 0;

  @override
  Future<Map<String, dynamic>?> findById(int id) async =>
      _store[id];

  @override
  Future<List<Map<String, dynamic>>> findAll() async =>
      _store.values.toList();

  @override
  Future<void> save(Map<String, dynamic> user) async {
    _store[user['id'] as int] = user;
    saveCallCount++;
  }
}

// テスト対象のサービス
class UserService {
  final UserRepository _repo;
  UserService(this._repo);

  Future<String> getUserName(int id) async {
    final user = await _repo.findById(id);
    return user?['name'] as String? ?? '未知のユーザー';
  }

  Future<void> createUser(int id, String name) async {
    await _repo.save({'id': id, 'name': name});
  }
}

Future<void> main() async {
  final mockRepo = MockUserRepository();
  final service = UserService(mockRepo);

  // テスト1: 存在しないユーザー
  final name1 = await service.getUserName(999);
  print('存在しない: \$name1');

  // テスト2: ユーザー作成と取得
  await service.createUser(1, '太郎');
  final name2 = await service.getUserName(1);
  print('作成後: \$name2');
  print('save呼び出し回数: \${mockRepo.saveCallCount}');

  // テスト3: 全ユーザー取得
  await service.createUser(2, '花子');
  final all = await mockRepo.findAll();
  print('全ユーザー: \${all.map((u) => u['name']).toList()}');
}`}
          expectedOutput={`存在しない: 未知のユーザー
作成後: 太郎
save呼び出し回数: 1
全ユーザー: [太郎, 花子]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">mockito パッケージの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">mockito</code>を使うと<code className="text-green-300">when/thenReturn</code>で動作を指定できます。
        </p>
        <DartEditor
          defaultCode={`// mockito パッケージのコード例（説明用）
/*
import 'package:mockito/mockito.dart';
import 'package:test/test.dart';

// @GenerateMocks([UserRepository])
// dart run build_runner build で生成

void main() {
  late MockUserRepository mockRepo;
  late UserService service;

  setUp(() {
    mockRepo = MockUserRepository();
    service = UserService(mockRepo);
  });

  test('getUserName returns name when found', () async {
    // スタブの設定
    when(mockRepo.findById(1))
        .thenAnswer((_) async => {'id': 1, 'name': '太郎'});

    final name = await service.getUserName(1);

    expect(name, equals('太郎'));
    verify(mockRepo.findById(1)).called(1); // 呼び出し回数検証
  });

  test('getUserName returns fallback when not found', () async {
    when(mockRepo.findById(any))
        .thenAnswer((_) async => null);

    final name = await service.getUserName(999);

    expect(name, equals('未知のユーザー'));
  });
}
*/

// 依存性注入でテスタブルなコードを書く
abstract class EmailService {
  Future<bool> send(String to, String subject, String body);
}

class MockEmailService implements EmailService {
  final List<Map<String, String>> sent = [];

  @override
  Future<bool> send(String to, String subject, String body) async {
    sent.add({'to': to, 'subject': subject, 'body': body});
    return true;
  }
}

class NotificationService {
  final EmailService _email;
  NotificationService(this._email);

  Future<void> notifyUser(String email, String message) async {
    await _email.send(email, '通知', message);
  }
}

Future<void> main() async {
  final mockEmail = MockEmailService();
  final notif = NotificationService(mockEmail);

  await notif.notifyUser('user@example.com', 'テスト通知');
  await notif.notifyUser('admin@example.com', '管理者通知');

  print('送信済みメール数: \${mockEmail.sent.length}');
  for (final mail in mockEmail.sent) {
    print('  宛先: \${mail['to']}, 件名: \${mail['subject']}');
  }
}`}
          expectedOutput={`送信済みメール数: 2
  宛先: user@example.com, 件名: 通知
  宛先: admin@example.com, 件名: 通知`}
        />
      </section>

      <LessonCompleteButton lessonId="mocking" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="mocking" basePath="/learn/testing" />
    </div>
  );
}
