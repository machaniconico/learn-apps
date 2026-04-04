import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("forms");

export default function HeadersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">フォーム・HTTP</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">HTTPヘッダー</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPの<strong className="text-indigo-300">header()</strong>関数はHTTPレスポンスヘッダーを送信します。
            リダイレクト、コンテンツタイプの指定、キャッシュ制御、セキュリティヘッダーの設定など
            様々な用途に使用します。ヘッダーは出力前（HTML出力前）に送信する必要があります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">リダイレクト</h2>
        <p className="text-gray-400 mb-4">
          header('Location: URL')でリダイレクトを実装します。必ずその後exit;を呼んで処理を停止します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// ヘッダー送信のシミュレーション\nfunction simulateHeader(string $header, int $statusCode = 200): void {\n    echo "HTTP/1.1 {$statusCode}\\n";\n    echo "Header: {$header}\\n";\n}\n\n// 一時リダイレクト (302)\nfunction redirectTo(string $url): void {\n    simulateHeader("Location: {$url}", 302);\n    // 実際のコード: header("Location: {$url}"); exit;\n    echo "[リダイレクト先へ処理移動]\\n\\n";\n}\n\n// 永続リダイレクト (301)\nfunction permanentRedirect(string $url): void {\n    simulateHeader("Location: {$url}", 301);\n    echo "[恒久リダイレクト]\\n\\n";\n}\n\n$loggedIn = false;\n\nif (!$loggedIn) {\n    redirectTo('/login?return=/dashboard');\n}\n\npermanentRedirect('/new-page');\n\necho "通常のページ表示";`}
          expectedOutput={`HTTP/1.1 302\nHeader: Location: /login?return=/dashboard\n[リダイレクト先へ処理移動]\n\nHTTP/1.1 301\nHeader: Location: /new-page\n[恒久リダイレクト]\n\n通常のページ表示`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コンテンツタイプとレスポンスコード</h2>
        <p className="text-gray-400 mb-4">
          header()でContent-TypeやHTTPステータスコードを設定して、適切なレスポンスを返します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// レスポンスヘッダーのシミュレーション\nfunction sendResponse(int $status, string $contentType, mixed $data): void {\n    $statusTexts = [\n        200 => 'OK',\n        201 => 'Created',\n        400 => 'Bad Request',\n        401 => 'Unauthorized',\n        404 => 'Not Found',\n        500 => 'Internal Server Error',\n    ];\n    $statusText = $statusTexts[$status] ?? 'Unknown';\n\n    echo "HTTP/1.1 {$status} {$statusText}\\n";\n    echo "Content-Type: {$contentType}\\n\\n";\n\n    if (is_array($data)) {\n        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);\n    } else {\n        echo $data;\n    }\n    echo "\\n---\\n";\n}\n\n// JSON APIレスポンス\nsendResponse(200, 'application/json', [\n    'status' => 'success',\n    'data'   => ['id' => 1, 'name' => '田中太郎'],\n]);\n\n// エラーレスポンス\nsendResponse(404, 'application/json', [\n    'status' => 'error',\n    'message' => 'リソースが見つかりません',\n]);`}
          expectedOutput={`HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n    "status": "success",\n    "data": {\n        "id": 1,\n        "name": "田中太郎"\n    }\n}\n---\nHTTP/1.1 404 Not Found\nContent-Type: application/json\n\n{\n    "status": "error",\n    "message": "リソースが見つかりません"\n}\n---`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セキュリティヘッダー</h2>
        <p className="text-gray-400 mb-4">
          セキュリティ関連のHTTPヘッダーを設定することで、XSSやクリックジャッキングなどの攻撃を防ぎます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// セキュリティヘッダーの一覧\n$securityHeaders = [\n    'X-Content-Type-Options'  => 'nosniff',\n    'X-Frame-Options'         => 'DENY',\n    'X-XSS-Protection'        => '1; mode=block',\n    'Strict-Transport-Security' => 'max-age=31536000; includeSubDomains',\n    'Content-Security-Policy' => "default-src 'self'; script-src 'self'",\n    'Referrer-Policy'         => 'strict-origin-when-cross-origin',\n    'Permissions-Policy'      => 'camera=(), microphone=(), geolocation=()',\n];\n\necho "送信するセキュリティヘッダー:\\n";\nforeach ($securityHeaders as $name => $value) {\n    // 実際は: header(\"{$name}: {$value}\");\n    echo "  {$name}:\\n";\n    echo "    {$value}\\n";\n}\n\necho "\\n全 " . count($securityHeaders) . " 個のセキュリティヘッダーを設定しました";`}
          expectedOutput={`送信するセキュリティヘッダー:\n  X-Content-Type-Options:\n    nosniff\n  X-Frame-Options:\n    DENY\n  X-XSS-Protection:\n    1; mode=block\n  Strict-Transport-Security:\n    max-age=31536000; includeSubDomains\n  Content-Security-Policy:\n    default-src 'self'; script-src 'self'\n  Referrer-Policy:\n    strict-origin-when-cross-origin\n  Permissions-Policy:\n    camera=(), microphone=(), geolocation=()\n\n全 7 個のセキュリティヘッダーを設定しました`}
        />
      </section>

      <LessonCompleteButton lessonId="headers" categoryId="forms" />
      <LessonNav lessons={lessons} currentId="headers" basePath="/learn/forms" />
    </div>
  );
}
