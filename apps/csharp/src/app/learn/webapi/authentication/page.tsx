import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function AuthenticationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">認証</h1>
        <p className="text-gray-400">JWT・[Authorize]属性・AddAuthentication・ベアラートークンによる認証を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JWT認証の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JWT（JSON Web Token）はBase64エンコードされたヘッダー・ペイロード・署名の3部構成のトークンです。
          認証後にサーバーがJWTを発行し、クライアントはAPIリクエストの <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Authorization: Bearer &lt;token&gt;</code> ヘッダーに含めます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JWTの構造</h2>
        <p className="text-gray-400 mb-4">
          JWTは3つの部分（ヘッダー・ペイロード・署名）がドット区切りのBase64文字列です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;

class JwtDemo
{
    // Base64URLエンコード（簡易版）
    static string Base64Encode(string text)
        => Convert.ToBase64String(Encoding.UTF8.GetBytes(text))
            .TrimEnd('=').Replace('+', '-').Replace('/', '_');

    public static string CreateDemoToken(string userId, string role)
    {
        // ヘッダー
        var header = JsonSerializer.Serialize(new { alg = "HS256", typ = "JWT" });

        // ペイロード（クレーム）
        var payload = JsonSerializer.Serialize(new
        {
            sub = userId,
            role = role,
            name = "Alice",
            iat = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
            exp = DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds(),
        });

        var headerB64 = Base64Encode(header);
        var payloadB64 = Base64Encode(payload);
        var signature = Base64Encode($"HMAC({headerB64}.{payloadB64})"); // 簡易

        return $"{headerB64}.{payloadB64}.{signature}";
    }
}

class Program
{
    static void Main()
    {
        var token = JwtDemo.CreateDemoToken("user-42", "Admin");
        var parts = token.Split('.');

        Console.WriteLine($"JWTトークン (長さ:{token.Length}文字)");
        Console.WriteLine($"Header部: {parts[0][..20]}...");
        Console.WriteLine($"Payload部: {parts[1][..20]}...");
        Console.WriteLine($"Signature部: {parts[2][..20]}...");

        Console.WriteLine();
        Console.WriteLine("ヘッダーに含める方法:");
        Console.WriteLine($"Authorization: Bearer {token[..30]}...");
    }
}`}
          expectedOutput={`JWTトークン (長さ:208文字)
Header部: eyJhbGciOiJIUzI1Ni...
Payload部: eyJzdWIiOiJ1c2VyL...
Signature部: SE1BQyhleUpoYkdja...

ヘッダーに含める方法:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">[Authorize] 属性と認可</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[Authorize]</code> でエンドポイントへのアクセスを制限します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// [Authorize] のシミュレーション
class User
{
    public string Id { get; set; } = "";
    public string Role { get; set; } = "";
    public bool IsAuthenticated { get; set; }
}

class AuthMiddleware
{
    private static User? _currentUser;

    public static void SetUser(User? user) => _currentUser = user;

    // [Authorize] のシミュレーション
    public static bool Authorize(string? requiredRole = null)
    {
        if (_currentUser == null || !_currentUser.IsAuthenticated)
        {
            Console.WriteLine("401 Unauthorized: ログインが必要です");
            return false;
        }
        if (requiredRole != null && _currentUser.Role != requiredRole)
        {
            Console.WriteLine($"403 Forbidden: {requiredRole}権限が必要です");
            return false;
        }
        return true;
    }
}

class Program
{
    static void GetPublic() => Console.WriteLine("公開データ: アクセス成功");

    static void GetProfile()
    {
        if (!AuthMiddleware.Authorize()) return;
        Console.WriteLine("プロフィール: アクセス成功");
    }

    static void GetAdminData()
    {
        if (!AuthMiddleware.Authorize("Admin")) return;
        Console.WriteLine("管理者データ: アクセス成功");
    }

    static void Main()
    {
        Console.WriteLine("=== 未認証 ===");
        GetPublic();
        GetProfile();
        GetAdminData();

        Console.WriteLine("\n=== 一般ユーザー ===");
        AuthMiddleware.SetUser(new User { Id = "1", Role = "User", IsAuthenticated = true });
        GetPublic();
        GetProfile();
        GetAdminData();

        Console.WriteLine("\n=== 管理者 ===");
        AuthMiddleware.SetUser(new User { Id = "2", Role = "Admin", IsAuthenticated = true });
        GetAdminData();
    }
}`}
          expectedOutput={`=== 未認証 ===
公開データ: アクセス成功
401 Unauthorized: ログインが必要です
401 Unauthorized: ログインが必要です

=== 一般ユーザー ===
公開データ: アクセス成功
プロフィール: アクセス成功
403 Forbidden: Admin権限が必要です

=== 管理者 ===
管理者データ: アクセス成功`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="authentication" />
      </div>
      <LessonNav lessons={lessons} currentId="authentication" basePath="/learn/webapi" />
    </div>
  );
}
