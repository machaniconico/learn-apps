import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("server");

export default function HttpServerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold">サーバー開発 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">HTTPサーバー</h1>
        <p className="text-gray-400">dart:ioのHttpServerを使って簡単なWebサーバーを構築します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">HttpServerの基本</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="text-cyan-300">dart:io</code>のHttpServerクラスでHTTPサーバーを構築できます。
          リクエストとレスポンスを直接操作するローレベルのAPIです。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-cyan-300">HttpServer.bind(host, port)</code>でサーバー起動</li>
          <li>• <code className="text-cyan-300">await for (final request in server)</code>でリクエスト処理</li>
          <li>• <code className="text-cyan-300">request.response</code>でレスポンス送信</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなHTTPサーバー</h2>
        <p className="text-gray-400 mb-4">
          dart:ioを使った基本的なHTTPサーバーの構造です。
        </p>
        <DartEditor
          defaultCode={`// dart:io HTTPサーバーの実際のコード（概念）
// import 'dart:io';
// import 'dart:convert';
//
// Future<void> main() async {
//   final server = await HttpServer.bind(
//     InternetAddress.loopbackIPv4, 8080,
//   );
//   print('サーバー起動: http://localhost:8080');
//
//   await for (final request in server) {
//     handleRequest(request);
//   }
// }
//
// Future<void> handleRequest(HttpRequest request) async {
//   final path = request.uri.path;
//   final method = request.method;
//
//   switch ((method, path)) {
//     case ('GET', '/'):
//       request.response
//         ..statusCode = HttpStatus.ok
//         ..headers.contentType = ContentType.json
//         ..write(jsonEncode({'message': 'Hello, Dart!'}));
//     case ('GET', '/health'):
//       request.response
//         ..statusCode = HttpStatus.ok
//         ..write(jsonEncode({'status': 'ok'}));
//     default:
//       request.response.statusCode = HttpStatus.notFound;
//   }
//   await request.response.close();
// }

// HTTPサーバーのルーティングをDartで概念コード表現
import 'dart:convert';

class HttpRequest {
  final String method;
  final String path;
  final Map<String, String> headers;
  HttpRequest(this.method, this.path, [this.headers = const {}]);
}

class HttpResponse {
  int statusCode = 200;
  String body = '';
  void write(String content) { body = content; }
  void send() { print('\$statusCode: \$body'); }
}

typedef Handler = void Function(HttpRequest, HttpResponse);

class Router {
  final Map<String, Handler> _routes = {};

  void get(String path, Handler handler) {
    _routes['GET:\$path'] = handler;
  }

  void handle(HttpRequest req, HttpResponse res) {
    final key = '\${req.method}:\${req.path}';
    final handler = _routes[key];
    if (handler != null) {
      handler(req, res);
    } else {
      res.statusCode = 404;
      res.write(jsonEncode({'error': 'Not Found'}));
    }
    res.send();
  }
}

void main() {
  final router = Router();

  router.get('/', (req, res) {
    res.write(jsonEncode({'message': 'Hello, Dart!'}));
  });

  router.get('/health', (req, res) {
    res.write(jsonEncode({'status': 'ok', 'timestamp': '2024-03-15T10:00:00'}));
  });

  router.get('/api/users', (req, res) {
    res.write(jsonEncode([
      {'id': 1, 'name': '田中'},
      {'id': 2, 'name': '鈴木'},
    ]));
  });

  final requests = [
    HttpRequest('GET', '/'),
    HttpRequest('GET', '/health'),
    HttpRequest('GET', '/api/users'),
    HttpRequest('GET', '/unknown'),
  ];

  for (final r in requests) {
    print('\\n\${r.method} \${r.path}');
    router.handle(r, HttpResponse());
  }
}`}
          expectedOutput={`\nGET /\n200: {"message":"Hello, Dart!"}\n\nGET /health\n200: {"status":"ok","timestamp":"2024-03-15T10:00:00"}\n\nGET /api/users\n200: [{"id":1,"name":"田中"},{"id":2,"name":"鈴木"}]\n\nGET /unknown\n404: {"error":"Not Found"}`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアパターン</h2>
        <p className="text-gray-400 mb-4">
          リクエスト処理を共通化するミドルウェアパターンです。
        </p>
        <DartEditor
          defaultCode={`typedef Middleware = void Function(Map<String, dynamic> ctx, void Function() next);

class Pipeline {
  final List<Middleware> _middlewares = [];

  void use(Middleware mw) => _middlewares.add(mw);

  void handle(Map<String, dynamic> ctx) {
    int index = 0;
    void next() {
      if (index < _middlewares.length) {
        _middlewares[index++](ctx, next);
      }
    }
    next();
  }
}

void main() {
  final app = Pipeline();

  // ロギングミドルウェア
  app.use((ctx, next) {
    print('[LOG] \${ctx["method"]} \${ctx["path"]}');
    next();
    print('[LOG] レスポンス: \${ctx["status"]}');
  });

  // 認証ミドルウェア
  app.use((ctx, next) {
    if (ctx['path'] == '/api/admin' && ctx['token'] == null) {
      ctx['status'] = 401;
      ctx['body'] = '認証が必要です';
      return;
    }
    next();
  });

  // ルートハンドラ
  app.use((ctx, next) {
    ctx['status'] = 200;
    ctx['body'] = 'Hello from \${ctx["path"]}';
  });

  print('=== 一般ページ ===');
  app.handle({'method': 'GET', 'path': '/about'});

  print('\\n=== 管理ページ（未認証） ===');
  app.handle({'method': 'GET', 'path': '/api/admin'});
}`}
          expectedOutput={`=== 一般ページ ===\n[LOG] GET /about\n[LOG] レスポンス: 200\n\n=== 管理ページ（未認証） ===\n[LOG] GET /api/admin\n[LOG] レスポンス: 401`}
        />
      </section>
      <LessonCompleteButton lessonId="http-server" categoryId="server" />
      <LessonNav lessons={lessons} currentId="http-server" basePath="/learn/server" />
    </div>
  );
}
