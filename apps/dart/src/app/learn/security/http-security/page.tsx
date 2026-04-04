import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function HttpSecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">HTTPセキュリティ</h1>
        <p className="text-gray-400">HTTPS・認証ヘッダー・トークン管理などHTTPセキュリティを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">HTTPセキュリティの基本</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          HTTP通信のセキュリティを確保するためのベストプラクティスを学びます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• 常に<code className="text-red-300">HTTPS</code>を使用する</li>
          <li>• <code className="text-red-300">Bearer Token</code>でAPI認証</li>
          <li>• <code className="text-red-300">CORS</code>の適切な設定</li>
          <li>• センシティブな情報をURLパラメータに含めない</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">安全なHTTPクライアントの実装</h2>
        <p className="text-gray-400 mb-4">
          認証ヘッダーとタイムアウトを設定した安全なHTTPクライアントの概念です。
        </p>
        <DartEditor
          defaultCode={`// 安全なHTTPクライアントの概念コード
// 実際にはhttpパッケージを使用します

class HttpRequest {
  final String method;
  final String url;
  final Map<String, String> headers;
  final String? body;

  HttpRequest({
    required this.method,
    required this.url,
    required this.headers,
    this.body,
  });
}

class SecureApiClient {
  final String baseUrl;
  String? _token;

  SecureApiClient(this.baseUrl);

  void setToken(String token) => _token = token;

  HttpRequest _buildRequest(String method, String path, {String? body}) {
    // URLはhttpsのみ許可
    assert(baseUrl.startsWith('https://'), 'HTTPSを使用してください');

    final headers = <String, String>{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // セキュリティヘッダー
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    };

    // 認証トークンを付加
    if (_token != null) {
      headers['Authorization'] = 'Bearer \$_token';
    }

    return HttpRequest(
      method: method,
      url: '\$baseUrl\$path',
      headers: headers,
      body: body,
    );
  }

  void get(String path) {
    final req = _buildRequest('GET', path);
    print('[\${req.method}] \${req.url}');
    print('  Authorization: \${req.headers["Authorization"] ?? "なし"}');
  }
}

void main() {
  final client = SecureApiClient('https://api.example.com');

  print('=== 未認証リクエスト ===');
  client.get('/public/data');

  print('\\n=== 認証済みリクエスト ===');
  client.setToken('eyJhbGciOiJIUzI1NiJ9.example.token');
  client.get('/api/users/profile');
  client.get('/api/orders');
}`}
          expectedOutput={`=== 未認証リクエスト ===\n[GET] https://api.example.com/public/data\n  Authorization: なし\n\n=== 認証済みリクエスト ===\n[GET] https://api.example.com/api/users/profile\n  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.example.token\n[GET] https://api.example.com/api/orders\n  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.example.token`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">トークンの安全な管理</h2>
        <p className="text-gray-400 mb-4">
          アクセストークンとリフレッシュトークンの管理パターンです。
        </p>
        <DartEditor
          defaultCode={`class TokenStore {
  String? _accessToken;
  String? _refreshToken;
  DateTime? _expiresAt;

  void saveTokens({
    required String accessToken,
    required String refreshToken,
    required int expiresInSeconds,
  }) {
    _accessToken = accessToken;
    _refreshToken = refreshToken;
    _expiresAt = DateTime.now().add(Duration(seconds: expiresInSeconds));
    print('トークン保存完了 (期限: \${expiresInSeconds}秒後)');
  }

  bool get isExpired {
    if (_expiresAt == null) return true;
    return DateTime.now().isAfter(_expiresAt!);
  }

  String? get accessToken {
    if (isExpired) {
      print('警告: アクセストークンが期限切れです');
      return null;
    }
    return _accessToken;
  }

  void clear() {
    _accessToken = null;
    _refreshToken = null;
    _expiresAt = null;
    print('トークンをクリアしました');
  }
}

void main() {
  final store = TokenStore();

  store.saveTokens(
    accessToken: 'access_token_abc123',
    refreshToken: 'refresh_token_xyz789',
    expiresInSeconds: 3600,
  );

  print('期限切れ: \${store.isExpired}');
  print('トークン: \${store.accessToken?.substring(0, 15)}...');

  store.clear();
  print('クリア後トークン: \${store.accessToken}');
}`}
          expectedOutput={`トークン保存完了 (期限: 3600秒後)\n期限切れ: false\nトークン: access_token_ab...\nトークンをクリアしました\n警告: アクセストークンが期限切れです\nクリア後トークン: null`}
        />
      </section>
      <LessonCompleteButton lessonId="http-security" categoryId="security" />
      <LessonNav lessons={lessons} currentId="http-security" basePath="/learn/security" />
    </div>
  );
}
