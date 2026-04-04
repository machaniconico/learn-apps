import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("server");

export default function ShelfFrameworkPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold">サーバー開発 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Shelfフレームワーク</h1>
        <p className="text-gray-400">DartのWebフレームワークShelfを使ったサーバー開発を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Shelfとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Shelfはdart.devが提供するDartの軽量Webフレームワークです。
          Handler・Middleware・PipelineのシンプルなAPIでWebサービスを構築できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-cyan-300">Handler</code>: RequestからResponseを生成する関数</li>
          <li>• <code className="text-cyan-300">Middleware</code>: Handlerをラップする処理</li>
          <li>• <code className="text-cyan-300">Pipeline</code>: Middlewareをチェーンする</li>
          <li>• <code className="text-cyan-300">shelf_router</code>: URLルーティング</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Shelfの基本構造</h2>
        <p className="text-gray-400 mb-4">
          ShelfのHandlerとPipelineの概念をDartで表現します。
        </p>
        <DartEditor
          defaultCode={`// Shelf フレームワークの概念コード
// 実際のコード:
// import 'package:shelf/shelf.dart';
// import 'package:shelf/shelf_io.dart' as io;
// import 'package:shelf_router/shelf_router.dart';
//
// void main() async {
//   final router = Router();
//
//   router.get('/', (Request req) =>
//     Response.ok('Hello, Shelf!'));
//
//   router.get('/api/users/<id>', (Request req, String id) =>
//     Response.ok('{"id": "\$id"}',
//       headers: {'content-type': 'application/json'}));
//
//   final handler = Pipeline()
//     .addMiddleware(logRequests())
//     .addMiddleware(corsHeaders())
//     .addHandler(router.call);
//
//   await io.serve(handler, 'localhost', 8080);
// }

// Shelfの概念をDartで表現
class Request {
  final String method;
  final String url;
  Request(this.method, this.url);
}

class Response {
  final int statusCode;
  final String body;
  final Map<String, String> headers;
  const Response(this.statusCode, this.body, {this.headers = const {}});

  static Response ok(String body, {Map<String, String> headers = const {}}) =>
    Response(200, body, headers: headers);
  static Response notFound(String body) => Response(404, body);
}

typedef Handler = Response Function(Request);
typedef Middleware = Handler Function(Handler);

Middleware logRequests() => (Handler next) => (Request req) {
  print('[LOG] \${req.method} \${req.url}');
  final res = next(req);
  print('[LOG] → \${res.statusCode}');
  return res;
};

Handler pipeline(List<Middleware> middlewares, Handler handler) {
  return middlewares.reversed.fold(handler, (h, mw) => mw(h));
}

void main() {
  final routes = <String, Handler>{
    'GET /': (_) => Response.ok('{"message": "Hello, Shelf!"}',
      headers: {'content-type': 'application/json'}),
    'GET /api/health': (_) => Response.ok('{"status": "ok"}'),
    'POST /api/users': (_) => Response(201, '{"id": "new-123"}'),
  };

  final router = (Request req) {
    final key = '\${req.method} \${req.url}';
    return routes[key] ?? Response.notFound('{"error": "Not Found"}');
  };

  final handler = pipeline([logRequests()], router);

  final requests = [
    Request('GET', '/'),
    Request('GET', '/api/health'),
    Request('POST', '/api/users'),
    Request('GET', '/missing'),
  ];

  for (final req in requests) {
    print('');
    handler(req);
  }
}`}
          expectedOutput={`\n[LOG] GET /\n[LOG] → 200\n\n[LOG] GET /api/health\n[LOG] → 200\n\n[LOG] POST /api/users\n[LOG] → 201\n\n[LOG] GET /missing\n[LOG] → 404`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">REST APIの設計</h2>
        <p className="text-gray-400 mb-4">
          ShelfでRESTful APIを設計する基本パターンです。
        </p>
        <DartEditor
          defaultCode={`// RESTful APIの設計パターン
void main() {
  final endpoints = [
    ('GET',    '/api/users',       '全ユーザー取得'),
    ('POST',   '/api/users',       '新規ユーザー作成'),
    ('GET',    '/api/users/:id',   '特定ユーザー取得'),
    ('PUT',    '/api/users/:id',   'ユーザー更新'),
    ('DELETE', '/api/users/:id',   'ユーザー削除'),
    ('GET',    '/api/users/:id/posts', 'ユーザーの投稿取得'),
  ];

  print('=== REST API エンドポイント設計 ===\\n');
  print('\${"メソッド".padRight(8)}\${"パス".padRight(25)}説明');
  print('─' * 60);

  for (final (method, path, desc) in endpoints) {
    print('\${method.padRight(8)}\${path.padRight(25)}\$desc');
  }

  print('\\n=== HTTPステータスコード ===');
  const statusCodes = {
    200: 'OK - 取得成功',
    201: 'Created - 作成成功',
    204: 'No Content - 削除成功',
    400: 'Bad Request - バリデーションエラー',
    401: 'Unauthorized - 認証エラー',
    403: 'Forbidden - 権限エラー',
    404: 'Not Found - リソース未発見',
    500: 'Internal Server Error - サーバーエラー',
  };
  statusCodes.forEach((code, desc) => print('  \$code: \$desc'));
}`}
          expectedOutput={`=== REST API エンドポイント設計 ===\n\nメソッド  パス                     説明\n────────────────────────────────────────────────────────────\nGET     /api/users               全ユーザー取得\nPOST    /api/users               新規ユーザー作成\nGET     /api/users/:id           特定ユーザー取得\nPUT     /api/users/:id           ユーザー更新\nDELETE  /api/users/:id           ユーザー削除\nGET     /api/users/:id/posts     ユーザーの投稿取得\n\n=== HTTPステータスコード ===\n  200: OK - 取得成功\n  201: Created - 作成成功\n  204: No Content - 削除成功\n  400: Bad Request - バリデーションエラー\n  401: Unauthorized - 認証エラー\n  403: Forbidden - 権限エラー\n  404: Not Found - リソース未発見\n  500: Internal Server Error - サーバーエラー`}
        />
      </section>
      <LessonCompleteButton lessonId="shelf-framework" categoryId="server" />
      <LessonNav lessons={lessons} currentId="shelf-framework" basePath="/learn/server" />
    </div>
  );
}
