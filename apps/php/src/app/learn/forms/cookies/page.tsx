import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("forms");

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">フォーム・HTTP</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">クッキー</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-indigo-300">クッキー</strong>はブラウザに保存される小さなデータです。
            PHPでは<strong className="text-indigo-300">setcookie()</strong>でクッキーを設定し、
            <strong className="text-indigo-300">$_COOKIE</strong>で読み取ります。
            セッションと異なり、クライアント側に保存されるため機密情報は保存しないことが重要です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クッキーの設定と読み取り</h2>
        <p className="text-gray-400 mb-4">
          setcookie()でクッキーを設定します。有効期限、パス、ドメインなどを指定できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// クッキー操作のシミュレーション\n$cookies = [];\n\nfunction setCookie(array &$cookies, string $name, string $value, int $expires = 0): void {\n    $cookies[$name] = [\n        'value'   => $value,\n        'expires' => $expires,\n    ];\n    $expStr = $expires > 0 ? date('Y-m-d H:i:s', $expires) : 'セッション終了時';\n    echo "クッキー設定: {$name} = {$value}（有効期限: {$expStr}）\\n";\n}\n\nfunction getCookie(array $cookies, string $name, string $default = ''): string {\n    return $cookies[$name]['value'] ?? $default;\n}\n\nfunction deleteCookie(array &$cookies, string $name): void {\n    unset($cookies[$name]);\n    echo "クッキー削除: {$name}\\n";\n}\n\n// クッキーの設定\nsetCookie($cookies, 'theme', 'dark', time() + 30 * 24 * 3600);  // 30日間\nsetCookie($cookies, 'lang', 'ja', time() + 365 * 24 * 3600);    // 1年間\nsetCookie($cookies, 'visited', '1');  // セッションクッキー\n\n// クッキーの読み取り\necho "\\nテーマ: " . getCookie($cookies, 'theme', 'light') . "\\n";\necho "言語: " . getCookie($cookies, 'lang', 'en') . "\\n";\n\n// クッキーの削除\ndeleteCookie($cookies, 'visited');\necho "visited: " . (getCookie($cookies, 'visited') ?: '(削除済み)');`}
          expectedOutput={`クッキー設定: theme = dark（有効期限: 2024-05-04 12:00:00）\nクッキー設定: lang = ja（有効期限: 2025-04-04 12:00:00）\nクッキー設定: visited = 1（有効期限: セッション終了時）\n\nテーマ: dark\n言語: ja\nクッキー削除: visited\nvisited: (削除済み)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クッキーのセキュリティオプション</h2>
        <p className="text-gray-400 mb-4">
          setcookie()の第4引数以降でセキュリティを強化できます。httponly、secure、samesiteの設定が重要です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// セキュアなクッキー設定の確認\n$cookieOptions = [\n    'expires'  => time() + 3600,\n    'path'     => '/',\n    'domain'   => 'example.com',\n    'secure'   => true,     // HTTPSのみ送信\n    'httponly' => true,     // JavaScriptからアクセス不可\n    'samesite' => 'Strict', // 同一サイトのみ送信\n];\n\necho "セキュアなクッキー設定:\\n";\nforeach ($cookieOptions as $option => $value) {\n    if (is_bool($value)) $value = $value ? 'true' : 'false';\n    if ($option === 'expires') $value = date('Y-m-d H:i:s', $value);\n    echo "  {$option}: {$value}\\n";\n}\n\n// PHP 7.3+でのsetcookie（オプション配列形式）\n// setcookie('token', 'abc123', $cookieOptions);\n\necho "\\nSameSiteオプションの意味:\\n";\n$samesite = [\n    'Strict' => '同一サイトからのリクエストのみ',\n    'Lax'    => 'トップレベルナビゲーションも許可',\n    'None'   => 'クロスサイトでも送信（Secure必須）',\n];\nforeach ($samesite as $mode => $desc) {\n    echo "  {$mode}: {$desc}\\n";\n}`}
          expectedOutput={`セキュアなクッキー設定:\n  expires: 2024-04-04 13:00:00\n  path: /\n  domain: example.com\n  secure: true\n  httponly: true\n  samesite: Strict\n\nSameSiteオプションの意味:\n  Strict: 同一サイトからのリクエストのみ\n  Lax: トップレベルナビゲーションも許可\n  None: クロスサイトでも送信（Secure必須）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ユーザー設定の永続化</h2>
        <p className="text-gray-400 mb-4">
          クッキーはテーマ設定や言語設定など、ログイン不要で永続化したいユーザー設定の保存に最適です。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass UserPreferences {\n    private array $prefs;\n    private array $defaults = [\n        'theme'    => 'light',\n        'lang'     => 'ja',\n        'fontSize' => 'medium',\n    ];\n\n    public function __construct(array $cookies) {\n        // クッキーから設定を読み込む\n        $saved = isset($cookies['prefs']) ? json_decode($cookies['prefs'], true) : [];\n        $this->prefs = array_merge($this->defaults, $saved ?? []);\n    }\n\n    public function get(string $key): mixed {\n        return $this->prefs[$key] ?? null;\n    }\n\n    public function set(string $key, mixed $value): void {\n        $this->prefs[$key] = $value;\n    }\n\n    public function toCookieValue(): string {\n        return json_encode($this->prefs, JSON_UNESCAPED_UNICODE);\n    }\n}\n\n// クッキーから設定を読み込む\n$_COOKIE['prefs'] = '{\"theme\":\"dark\",\"lang\":\"ja\"}';\n\n$prefs = new UserPreferences($_COOKIE);\necho "テーマ: " . $prefs->get('theme') . "\\n";\necho "言語: " . $prefs->get('lang') . "\\n";\necho "フォントサイズ: " . $prefs->get('fontSize') . "\\n";\n\n// 設定を変更\n$prefs->set('fontSize', 'large');\necho "\\nクッキー保存値: " . $prefs->toCookieValue();`}
          expectedOutput={`テーマ: dark\n言語: ja\nフォントサイズ: medium\n\nクッキー保存値: {"theme":"dark","lang":"ja","fontSize":"large"}`}
        />
      </section>

      <LessonCompleteButton lessonId="cookies" categoryId="forms" />
      <LessonNav lessons={lessons} currentId="cookies" basePath="/learn/forms" />
    </div>
  );
}
