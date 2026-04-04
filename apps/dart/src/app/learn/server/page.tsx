import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("server");

const quizQuestions: QuizQuestion[] = [
  {
    question: "dart:ioでHTTPサーバーを起動するクラスはどれですか？",
    options: [
      "HttpClient",
      "HttpServer",
      "WebServer",
      "DartServer",
    ],
    answer: 1,
    explanation: "dart:ioのHttpServer.bind()でサーバーを起動し、requestとresponseを使ってHTTP通信を処理します。",
  },
  {
    question: "ShelfフレームワークのHandlerの役割は何ですか？",
    options: [
      "データベースへ接続する",
      "RequestをもとにResponseを生成する関数",
      "ファイルを読み書きする",
      "UIをレンダリングする",
    ],
    answer: 1,
    explanation: "ShelfのHandlerはRequest受け取りResponseを返す関数です。Middlewareで処理を連鎖できます。",
  },
  {
    question: "DartでCLIアプリを作るとき引数を取得するには何を使いますか？",
    options: [
      "System.args",
      "main関数のList<String> args引数",
      "Process.arguments",
      "stdin.readLine()",
    ],
    answer: 1,
    explanation: "main(List<String> args)の引数にコマンドライン引数が渡されます。argsパッケージを使うとより便利に処理できます。",
  },
  {
    question: "gRPCの特徴として正しいものはどれですか？",
    options: [
      "JSONを使って通信する",
      "Protocol Buffersでシリアライズしたバイナリ通信",
      "WebSocketのみで動作する",
      "HTTPを使わない",
    ],
    answer: 1,
    explanation: "gRPCはProtocol Buffers（protobuf）を使ったバイナリシリアライズで、高効率なRPC通信を実現します。",
  },
];

export default function ServerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">サーバー開発</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartを使ったサーバーサイド開発を学びましょう。dart:ioを使ったHTTPサーバー・ShelfフレームワークによるWebAPI・gRPC通信・CLIツール開発まで、Dartのサーバー開発の全体像を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="server" totalLessons={5} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/server" color="cyan" categoryId="server" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">dart:io HTTPサーバーの概念</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">dart:io</code>のHttpServerを使ったHTTPサーバーの構造です。
        </p>
        <DartEditor
          defaultCode={`// dart:io HTTPサーバーの概念コード
// 実際にはdart:ioのインポートが必要です

// import 'dart:io';
// Future<void> main() async {
//   final server = await HttpServer.bind('localhost', 8080);
//   print('サーバー起動: http://localhost:8080');
//   await for (final request in server) {
//     request.response
//       ..statusCode = 200
//       ..headers.contentType = ContentType.json
//       ..write('{"message": "Hello from Dart!"}');
//     await request.response.close();
//   }
// }

// Dartで概念を表現
class Request {
  final String method;
  final String path;
  Request(this.method, this.path);
}

class Response {
  int statusCode = 200;
  final Map<String, String> headers = {};
  String body = '';

  void write(String content) {
    body = content;
  }
}

typedef Handler = Response Function(Request);

Response routeHandler(Request req) {
  return switch (req.path) {
    '/' => Response()..write('{"message": "Hello from Dart!"}'),
    '/health' => Response()..write('{"status": "ok"}'),
    _ => Response()..statusCode = 404..write('{"error": "Not Found"}'),
  };
}

void main() {
  final routes = ['/', '/health', '/unknown'];
  for (final path in routes) {
    final req = Request('GET', path);
    final res = routeHandler(req);
    print('GET \$path -> \${res.statusCode}: \${res.body}');
  }
}`}
          expectedOutput={`GET / -> 200: {"message": "Hello from Dart!"}\nGET /health -> 200: {"status": "ok"}\nGET /unknown -> 404: {"error": "Not Found"}`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CLIアプリの引数解析</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">main(List&lt;String&gt; args)</code>を使ったコマンドライン引数の処理です。
        </p>
        <DartEditor
          defaultCode={`// CLIアプリの引数解析の概念
void processArgs(List<String> args) {
  if (args.isEmpty) {
    print('使い方: dartapp <command> [options]');
    print('コマンド: greet, calc, version');
    return;
  }

  final command = args[0];
  final options = args.sublist(1);

  switch (command) {
    case 'greet':
      final name = options.isNotEmpty ? options[0] : '世界';
      print('こんにちは、\$name！');
    case 'calc':
      if (options.length >= 3) {
        final a = double.tryParse(options[0]) ?? 0;
        final op = options[1];
        final b = double.tryParse(options[2]) ?? 0;
        final result = switch (op) {
          '+' => a + b,
          '-' => a - b,
          '*' => a * b,
          '/' => b != 0 ? a / b : double.nan,
          _ => double.nan,
        };
        print('\$a \$op \$b = \$result');
      }
    case 'version':
      print('dartapp v1.0.0');
    default:
      print('不明なコマンド: \$command');
  }
}

void main() {
  processArgs(['greet', 'Dart']);
  processArgs(['calc', '10', '+', '5']);
  processArgs(['version']);
}`}
          expectedOutput={`こんにちは、Dart！\n10.0 + 5.0 = 15.0\ndartapp v1.0.0`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
