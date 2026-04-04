import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function HttpBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイル・IO</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">HTTP通信</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            DartでのHTTP通信には<strong className="text-green-300">http</strong>パッケージを使います。
            GET・POST・PUT・DELETEリクエスト、ヘッダーの設定、レスポンスの処理など基本的なHTTP操作を学びます。
            Flutterアプリのバックエンド通信でも同様のパターンを使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">GETリクエスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">http.get()</code>でデータを取得します。レスポンスはstatusCodeとbodyを持ちます。
        </p>
        <DartEditor
          defaultCode={`// pubspec.yaml に追加が必要:
// dependencies:
//   http: ^1.1.0

import 'dart:convert';
// import 'package:http/http.dart' as http;

// HTTPクライアントの模擬実装
class MockHttpClient {
  Future<MockResponse> get(String url) async {
    await Future.delayed(Duration(milliseconds: 50));
    if (url.contains('/users/1')) {
      return MockResponse(200, '{"id":1,"name":"田中太郎","email":"tanaka@example.com"}');
    }
    return MockResponse(404, '{"error":"Not Found"}');
  }

  Future<MockResponse> post(String url, {Map<String, dynamic>? body}) async {
    await Future.delayed(Duration(milliseconds: 50));
    return MockResponse(201, '{"id":2,"name":"\${body?['name']}","created":true}');
  }
}

class MockResponse {
  final int statusCode;
  final String body;
  MockResponse(this.statusCode, this.body);
}

Future<void> main() async {
  final client = MockHttpClient();

  // GETリクエスト
  final response = await client.get('https://api.example.com/users/1');
  print('ステータス: \${response.statusCode}');

  if (response.statusCode == 200) {
    final user = jsonDecode(response.body);
    print('名前: \${user['name']}');
    print('メール: \${user['email']}');
  }

  // POSTリクエスト
  final createResp = await client.post(
    'https://api.example.com/users',
    body: {'name': '新しいユーザー'},
  );
  final created = jsonDecode(createResp.body);
  print('作成: id=\${created['id']}, name=\${created['name']}');
}`}
          expectedOutput={`ステータス: 200
名前: 田中太郎
メール: tanaka@example.com
作成: id=2, name=新しいユーザー`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">エラーハンドリングとタイムアウト</h2>
        <p className="text-gray-400 mb-4">
          HTTPエラーの処理とタイムアウトの設定を行います。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';

class ApiException implements Exception {
  final int statusCode;
  final String message;
  ApiException(this.statusCode, this.message);

  @override
  String toString() => 'ApiException(\$statusCode): \$message';
}

// APIクライアントの模擬
Future<Map<String, dynamic>> apiGet(String endpoint) async {
  final responses = {
    '/ok': {'status': 200, 'data': {'result': 'success'}},
    '/notfound': {'status': 404, 'data': {'error': 'Not Found'}},
    '/error': {'status': 500, 'data': {'error': 'Internal Server Error'}},
  };

  final resp = responses[endpoint] ?? {'status': 404, 'data': {}};
  final status = resp['status'] as int;
  final data = resp['data'] as Map<String, dynamic>;

  if (status >= 400) {
    throw ApiException(status, data['error'] as String? ?? 'Unknown Error');
  }
  return data;
}

Future<void> main() async {
  final endpoints = ['/ok', '/notfound', '/error'];

  for (final ep in endpoints) {
    try {
      final data = await apiGet(ep);
      print('\$ep -> 成功: \$data');
    } on ApiException catch (e) {
      print('\$ep -> \$e');
    }
  }
}`}
          expectedOutput={`/ok -> 成功: {result: success}
/notfound -> ApiException(404): Not Found
/error -> ApiException(500): Internal Server Error`}
        />
      </section>

      <LessonCompleteButton lessonId="http-basics" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="http-basics" basePath="/learn/fileio" />
    </div>
  );
}
