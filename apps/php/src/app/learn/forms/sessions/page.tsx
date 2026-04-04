import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("forms");

export default function SessionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">フォーム・HTTP</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">セッション</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPの<strong className="text-indigo-300">セッション</strong>はサーバー側にデータを保存し、
            クライアントにはセッションIDのみを渡す仕組みです。
            <strong className="text-indigo-300">session_start()</strong>でセッションを開始し、
            <strong className="text-indigo-300">$_SESSION</strong>配列でデータを読み書きします。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セッションの基本操作</h2>
        <p className="text-gray-400 mb-4">
          session_start()でセッションを開始し、$_SESSIONに値を保存します。session_destroy()でセッションを破棄します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// セッション操作のシミュレーション\n$session = [];\n\nfunction sessionStart(array &$sess): void {\n    echo "セッション開始（ID: " . substr(md5(rand()), 0, 8) . "）\\n";\n}\n\nfunction sessionSet(array &$sess, string $key, mixed $value): void {\n    $sess[$key] = $value;\n}\n\nfunction sessionGet(array &$sess, string $key, mixed $default = null): mixed {\n    return $sess[$key] ?? $default;\n}\n\nfunction sessionDestroy(array &$sess): void {\n    $sess = [];\n    echo "セッション破棄\\n";\n}\n\nsessionStart($session);\nsessionSet($session, 'user_id', 42);\nsessionSet($session, 'username', 'tanaka_taro');\nsessionSet($session, 'login_time', time());\n\necho "ユーザーID: " . sessionGet($session, 'user_id') . "\\n";\necho "ユーザー名: " . sessionGet($session, 'username') . "\\n";\necho "管理者権限: " . (sessionGet($session, 'is_admin', false) ? "あり" : "なし") . "\\n";\n\nsessionDestroy($session);\necho "ログアウト後 user_id: " . (sessionGet($session, 'user_id') ?? 'null');`}
          expectedOutput={`セッション開始（ID: a1b2c3d4）\nユーザーID: 42\nユーザー名: tanaka_taro\n管理者権限: なし\nセッション破棄\nログアウト後 user_id: null`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セッションを使ったログイン管理</h2>
        <p className="text-gray-400 mb-4">
          セッションはログイン状態の管理に最もよく使われます。ログイン・ログアウトの実装パターンを見てみましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass SessionAuth {\n    private array $session = [];\n    private array $users = [\n        ['id' => 1, 'email' => 'admin@example.com', 'password' => 'hashed_pass', 'name' => '管理者'],\n        ['id' => 2, 'email' => 'user@example.com',  'password' => 'hashed_pass', 'name' => '一般ユーザー'],\n    ];\n\n    public function login(string $email, string $password): bool {\n        foreach ($this->users as $user) {\n            if ($user['email'] === $email) {\n                // 実際は password_verify() を使用\n                $this->session['user_id']   = $user['id'];\n                $this->session['user_name'] = $user['name'];\n                $this->session['logged_in'] = true;\n                return true;\n            }\n        }\n        return false;\n    }\n\n    public function logout(): void {\n        $this->session = [];\n    }\n\n    public function isLoggedIn(): bool {\n        return $this->session['logged_in'] ?? false;\n    }\n\n    public function getCurrentUser(): ?string {\n        return $this->session['user_name'] ?? null;\n    }\n}\n\n$auth = new SessionAuth();\n\necho "ログイン前: " . ($auth->isLoggedIn() ? "ログイン中" : "未ログイン") . "\\n";\n$auth->login('admin@example.com', 'password');\necho "ログイン後: " . ($auth->isLoggedIn() ? "ログイン中" : "未ログイン") . "\\n";\necho "ユーザー: " . $auth->getCurrentUser() . "\\n";\n$auth->logout();\necho "ログアウト後: " . ($auth->isLoggedIn() ? "ログイン中" : "未ログイン");`}
          expectedOutput={`ログイン前: 未ログイン\nログイン後: ログイン中\nユーザー: 管理者\nログアウト後: 未ログイン`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セッションのセキュリティ</h2>
        <p className="text-gray-400 mb-4">
          セッションハイジャックを防ぐために、ログイン後はsession_regenerate_id()でセッションIDを再生成します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// セッションセキュリティのベストプラクティス\nfunction secureSessionStart(): void {\n    // セッション設定（本来はphp.iniまたはini_set()で設定）\n    $settings = [\n        'cookie_httponly' => true,   // JavaScriptからアクセス不可\n        'cookie_secure'   => true,   // HTTPSのみ\n        'cookie_samesite' => 'Lax',  // CSRF対策\n        'use_strict_mode' => true,   // 既存のIDのみ使用\n    ];\n\n    echo "セキュアなセッション設定:\\n";\n    foreach ($settings as $key => $value) {\n        $val = is_bool($value) ? ($value ? 'true' : 'false') : $value;\n        echo "  session.{$key}: {$val}\\n";\n    }\n}\n\nfunction loginWithRegenerate(array &$session, int $userId): void {\n    // ログイン後にセッションIDを再生成（セッション固定攻撃対策）\n    // 実際は session_regenerate_id(true) を呼ぶ\n    $oldId = 'old_session_abc123';\n    $newId = bin2hex(random_bytes(8));\n\n    echo "\\nセッションID再生成:\\n";\n    echo "  旧ID: {$oldId}\\n";\n    echo "  新ID: {$newId}\\n";\n\n    $session['user_id']    = $userId;\n    $session['created_at'] = time();\n}\n\nsecureSessionStart();\n$session = [];\nloginWithRegenerate($session, 42);\necho "ログイン完了: user_id = " . $session['user_id'];`}
          expectedOutput={`セキュアなセッション設定:\n  session.cookie_httponly: true\n  session.cookie_secure: true\n  session.cookie_samesite: Lax\n  session.use_strict_mode: true\n\nセッションID再生成:\n  旧ID: old_session_abc123\n  新ID: a3f8e2b1c4d5e6f7\nログイン完了: user_id = 42`}
        />
      </section>

      <LessonCompleteButton lessonId="sessions" categoryId="forms" />
      <LessonNav lessons={lessons} currentId="sessions" basePath="/learn/forms" />
    </div>
  );
}
