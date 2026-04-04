import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function SecureHeadersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">セキュアヘッダー</h1>
        <p className="text-gray-400">セキュリティ関連のHTTPヘッダー設定とベストプラクティスを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セキュリティヘッダーとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          HTTPレスポンスヘッダーにセキュリティ設定を追加することで、ブラウザレベルの攻撃を防御できます。
          コードの変更だけで即座に防御力を高められる効果的な対策です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">Content-Security-Policy</code> — XSSや悪意あるリソース読み込みを防ぐ</li>
          <li>• <code className="text-red-300">X-Frame-Options</code> — クリックジャッキング攻撃を防ぐ</li>
          <li>• <code className="text-red-300">Strict-Transport-Security</code> — HTTPSを強制する</li>
          <li>• <code className="text-red-300">X-Content-Type-Options</code> — MIMEタイプのスニッフィングを防ぐ</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セキュリティヘッダーの設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">header()</code>関数でセキュリティヘッダーを送信します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// セキュリティヘッダーを設定する関数
function setSecurityHeaders(): void {
    // XSS・データインジェクション対策
    header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");

    // クリックジャッキング対策（iframe埋め込みを禁止）
    header("X-Frame-Options: DENY");

    // HTTPS強制（1年間）
    header("Strict-Transport-Security: max-age=31536000; includeSubDomains; preload");

    // MIMEタイプスニッフィング防止
    header("X-Content-Type-Options: nosniff");

    // リファラー情報の制限
    header("Referrer-Policy: strict-origin-when-cross-origin");

    // 機能ポリシー（カメラ・マイクなどの制限）
    header("Permissions-Policy: camera=(), microphone=(), geolocation=()");

    // サーバー情報を隠す
    header_remove("X-Powered-By");
}

// ヘッダーの一覧を表示（シミュレーション）
$headers = [
    "Content-Security-Policy" => "default-src 'self'",
    "X-Frame-Options"          => "DENY",
    "Strict-Transport-Security"=> "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options"   => "nosniff",
    "Referrer-Policy"          => "strict-origin-when-cross-origin",
    "Permissions-Policy"       => "camera=(), microphone=()",
];

echo "送信するセキュリティヘッダー:\\n";
foreach ($headers as $name => $value) {
    echo "  {$name}: {$value}\\n";
}`}
          expectedOutput={`送信するセキュリティヘッダー:\n  Content-Security-Policy: default-src 'self'\n  X-Frame-Options: DENY\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=()`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セキュアなセッション設定</h2>
        <p className="text-gray-400 mb-4">
          セッションのセキュリティ設定でセッションハイジャックを防ぎます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// セキュアなセッション設定
function secureSessionStart(): void {
    ini_set('session.cookie_httponly', 1);  // JavaScriptからCookieを隠す
    ini_set('session.cookie_secure', 1);    // HTTPSのみでCookieを送信
    ini_set('session.cookie_samesite', 'Strict'); // CSRF対策
    ini_set('session.use_strict_mode', 1);  // セッション固定攻撃を防ぐ
    ini_set('session.gc_maxlifetime', 1800); // 30分でセッション期限切れ

    // session_start(); // 実際はここで開始
}

// セキュリティ設定のチェックリスト
$securityChecklist = [
    'HTTPS使用'                  => true,
    'セキュリティヘッダー設定'    => true,
    'パスワードbcryptハッシュ'    => true,
    'SQLプリペアドステートメント'  => true,
    'XSSエスケープ（htmlspecialchars）' => true,
    'CSRFトークン'                => true,
    'セッションhttponly Cookie'   => true,
    'エラーメッセージを本番非表示' => true,
    '依存パッケージの更新'        => true,
];

echo "セキュリティチェックリスト:\\n";
foreach ($securityChecklist as $item => $status) {
    $mark = $status ? "✓" : "✗";
    echo "  [{$mark}] {$item}\\n";
}`}
          expectedOutput={`セキュリティチェックリスト:\n  [✓] HTTPS使用\n  [✓] セキュリティヘッダー設定\n  [✓] パスワードbcryptハッシュ\n  [✓] SQLプリペアドステートメント\n  [✓] XSSエスケープ（htmlspecialchars）\n  [✓] CSRFトークン\n  [✓] セッションhttponly Cookie\n  [✓] エラーメッセージを本番非表示\n  [✓] 依存パッケージの更新`}
        />
      </section>
      <LessonCompleteButton lessonId="secure-headers" categoryId="security" />
      <LessonNav lessons={lessons} currentId="secure-headers" basePath="/learn/security" />
    </div>
  );
}
