import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("server");

export default function GrpcOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold">サーバー開発 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">gRPC概要</h1>
        <p className="text-gray-400">DartでのgRPC通信の概要とProtocol Buffersの基本を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">gRPCとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          gRPCはGoogleが開発した高性能なRPCフレームワークです。
          Protocol Buffers（protobuf）を使ったバイナリシリアライズでHTTP/2上で通信します。
          RESTより効率的でスキーマ駆動の開発ができます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-cyan-300">.proto</code>ファイルでサービスとメッセージを定義</li>
          <li>• <code className="text-cyan-300">protoc</code>コマンドでDartコードを自動生成</li>
          <li>• <code className="text-cyan-300">grpc</code>パッケージでクライアント・サーバーを実装</li>
          <li>• 双方向ストリーミングをサポート</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Protocol Buffersの概念</h2>
        <p className="text-gray-400 mb-4">
          .protoファイルの構造とDartコードへの対応を確認します。
        </p>
        <DartEditor
          defaultCode={`// gRPC / Protocol Buffers の概念コード

// .proto ファイルの例:
// syntax = "proto3";
// package user;
//
// service UserService {
//   rpc GetUser(GetUserRequest) returns (UserResponse);
//   rpc ListUsers(ListUsersRequest) returns (stream UserResponse);
//   rpc CreateUser(CreateUserRequest) returns (UserResponse);
// }
//
// message User {
//   int32 id = 1;
//   string name = 2;
//   string email = 3;
//   repeated string roles = 4;
// }
//
// message GetUserRequest { int32 id = 1; }
// message ListUsersRequest { int32 page = 1; int32 pageSize = 2; }
// message CreateUserRequest { string name = 1; string email = 2; }
// message UserResponse { bool success = 1; User user = 2; }

// Dartで概念を表現
class User {
  final int id;
  final String name;
  final String email;
  final List<String> roles;

  const User({
    required this.id,
    required this.name,
    required this.email,
    this.roles = const [],
  });

  // protobufのシリアライズを模擬
  Map<String, dynamic> toProto() => {
    'id': id,
    'name': name,
    'email': email,
    'roles': roles,
  };

  @override
  String toString() => 'User(id:\$id, name:\$name, roles:\${roles.join(",")})';
}

// gRPCサービスの概念
class UserServiceImpl {
  final Map<int, User> _store = {};
  int _nextId = 1;

  User createUser(String name, String email) {
    final user = User(id: _nextId++, name: name, email: email);
    _store[user.id] = user;
    print('[gRPC] CreateUser → \$user');
    return user;
  }

  User? getUser(int id) {
    final user = _store[id];
    print('[gRPC] GetUser(id:\$id) → \${user ?? "Not Found"}');
    return user;
  }

  List<User> listUsers() {
    print('[gRPC] ListUsers → \${_store.length}件');
    return _store.values.toList();
  }
}

void main() {
  final service = UserServiceImpl();

  service.createUser('田中', 'tanaka@example.com');
  service.createUser('鈴木', 'suzuki@example.com');
  service.getUser(1);
  service.getUser(99);

  print('\\n=== 全ユーザー ===');
  for (final user in service.listUsers()) {
    print('  \${user.toProto()}');
  }
}`}
          expectedOutput={`[gRPC] CreateUser → User(id:1, name:田中, roles:)\n[gRPC] CreateUser → User(id:2, name:鈴木, roles:)\n[gRPC] GetUser(id:1) → User(id:1, name:田中, roles:)\n[gRPC] GetUser(id:99) → Not Found\n\n=== 全ユーザー ===\n  {id: 1, name: 田中, email: tanaka@example.com, roles: []}\n  {id: 2, name: 鈴木, email: suzuki@example.com, roles: []}`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">REST vs gRPCの比較</h2>
        <p className="text-gray-400 mb-4">
          RESTとgRPCの特徴を比較して使い分けを理解します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  print('=== REST vs gRPC 比較 ===\\n');

  final comparison = [
    ['項目', 'REST', 'gRPC'],
    ['プロトコル', 'HTTP/1.1', 'HTTP/2'],
    ['データ形式', 'JSON（テキスト）', 'Protobuf（バイナリ）'],
    ['パフォーマンス', '普通', '高速（バイナリ+圧縮）'],
    ['スキーマ', '任意（OpenAPI推奨）', '.protoファイルで強制'],
    ['ストリーミング', '非対応（SSE/WSは別途）', '双方向対応'],
    ['ブラウザ対応', '✅ 標準', '⚠️ gRPC-Web が必要'],
    ['可読性', '✅ 人間が読みやすい', '❌ バイナリ'],
    ['適用場面', 'Web API・公開API', 'マイクロサービス間通信'],
  ];

  for (final row in comparison) {
    if (row[0] == '項目') {
      print('\${row[0].padRight(16)}\${row[1].padRight(22)}\${row[2]}');
      print('─' * 60);
    } else {
      print('\${row[0].padRight(16)}\${row[1].padRight(22)}\${row[2]}');
    }
  }
}`}
          expectedOutput={`=== REST vs gRPC 比較 ===\n\n項目            REST                  gRPC\n────────────────────────────────────────────────────────────\nプロトコル        HTTP/1.1              HTTP/2\nデータ形式        JSON（テキスト）            Protobuf（バイナリ）\nパフォーマンス      普通                  高速（バイナリ+圧縮）\nスキーマ         任意（OpenAPI推奨）          .protoファイルで強制\nストリーミング      非対応（SSE/WSは別途）       双方向対応\nブラウザ対応       ✅ 標準               ⚠️ gRPC-Web が必要\n可読性          ✅ 人間が読みやすい          ❌ バイナリ\n適用場面         Web API・公開API          マイクロサービス間通信`}
        />
      </section>
      <LessonCompleteButton lessonId="grpc-overview" categoryId="server" />
      <LessonNav lessons={lessons} currentId="grpc-overview" basePath="/learn/server" />
    </div>
  );
}
