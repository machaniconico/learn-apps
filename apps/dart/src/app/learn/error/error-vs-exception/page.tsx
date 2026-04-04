import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function ErrorVsExceptionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ErrorとException</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartでは<strong className="text-red-300">Error</strong>と<strong className="text-red-300">Exception</strong>は別の概念です。
            Errorはプログラムのバグ（AssertionError、NullThrownErrorなど）を示し、通常はキャッチしません。
            ExceptionはHTTPエラーやファイルなど、予期される異常状態でキャッチして回復処理を行います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Error の種類</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">Error</code>はプログラムの論理的なバグを表します。通常はキャッチせず、バグを修正します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // AssertionError: assert文の失敗
  try {
    assert(1 == 2, 'アサーション失敗');
  } on AssertionError catch (e) {
    print('AssertionError: \${e.message}');
  }

  // RangeError: 範囲外アクセス（Errorのサブクラス）
  try {
    final list = [1, 2, 3];
    list[-1];
  } on RangeError catch (e) {
    print('RangeError: \${e.message}');
  }

  // ArgumentError: 不正な引数（Errorのサブクラス）
  try {
    throw ArgumentError('不正な引数です');
  } on ArgumentError catch (e) {
    print('ArgumentError: \${e.message}');
  }

  // Errorは通常キャッチしない（バグを修正すべき）
  print('\\nErrorの主な種類:');
  final errors = [
    'AssertionError - assertが失敗',
    'RangeError - インデックス範囲外',
    'ArgumentError - 不正な引数',
    'NullThrownError - nullをthrow',
    'OutOfMemoryError - メモリ不足',
    'StackOverflowError - スタックオーバーフロー',
  ];
  for (final e in errors) print('  \$e');
}`}
          expectedOutput={`AssertionError: アサーション失敗
RangeError: RangeError (index): Index out of range: index should be less than 3: -1
ArgumentError: 不正な引数です

Errorの主な種類:
  AssertionError - assertが失敗
  RangeError - インデックス範囲外
  ArgumentError - 不正な引数
  NullThrownError - nullをthrow
  OutOfMemoryError - メモリ不足
  StackOverflowError - スタックオーバーフロー`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Exception vs Error の使い分け</h2>
        <p className="text-gray-400 mb-4">
          ユーザーコードではExceptionを使い、Errorはシステムレベルの問題に任せましょう。
        </p>
        <DartEditor
          defaultCode={`// Exception: 予期される問題 -> キャッチして回復
class NetworkException implements Exception {
  final int statusCode;
  NetworkException(this.statusCode);
  @override
  String toString() => 'HTTP \$statusCode';
}

// Error: プログラムのバグ -> キャッチせず修正
class ApiClient {
  final String _baseUrl;

  ApiClient(this._baseUrl) {
    // 事前条件をErrorでチェック
    if (_baseUrl.isEmpty) {
      throw ArgumentError('baseUrlは空にできません');
    }
  }

  Future<String> get(String path) async {
    // ネットワーク失敗はException
    if (path == '/error') throw NetworkException(500);
    return 'データ: \$_baseUrl\$path';
  }
}

Future<void> main() async {
  final client = ApiClient('https://api.example.com');

  // Exceptionはキャッチして対処
  for (final path in ['/users', '/error']) {
    try {
      final data = await client.get(path);
      print('成功: \$data');
    } on NetworkException catch (e) {
      print('ネットワークエラー: \$e（リトライします）');
    }
  }
}`}
          expectedOutput={`成功: データ: https://api.example.comhttps://api.example.com/users
ネットワークエラー: HTTP 500（リトライします）`}
        />
      </section>

      <LessonCompleteButton lessonId="error-vs-exception" categoryId="error" />
      <LessonNav lessons={lessons} currentId="error-vs-exception" basePath="/learn/error" />
    </div>
  );
}
