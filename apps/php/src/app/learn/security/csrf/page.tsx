import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function CsrfPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">CSRF対策</h1>
        <p className="text-gray-400">トークンを使ったクロスサイトリクエストフォージェリ（CSRF）対策を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">CSRFとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          CSRF（クロスサイトリクエストフォージェリ）は、ログイン済みユーザーを騙して意図しないリクエストを送信させる攻撃です。
          例えば、悪意あるサイトを訪問するだけで、ユーザーの権限でパスワード変更や送金が実行されてしまいます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• セッションにランダムなCSRFトークンを生成・保存</li>
          <li>• フォームの隠しフィールドにトークンを埋め込む</li>
          <li>• POST受信時にセッションのトークンと比較して検証</li>
          <li>• <code className="text-red-300">hash_equals()</code>でタイミング攻撃を防ぐ</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">CSRFトークンの生成と検証</h2>
        <p className="text-gray-400 mb-4">
          セキュアなCSRFトークンを生成し、フォーム送信時に検証します。
        </p>
        <PhpEditor
          defaultCode={`<?php
class CsrfProtection {
    private const TOKEN_LENGTH = 32;
    private array $session = []; // セッションのシミュレーション

    public function generateToken(): string {
        $token = bin2hex(random_bytes(self::TOKEN_LENGTH));
        $this->session['csrf_token'] = $token;
        return $token;
    }

    public function validateToken(string $submittedToken): bool {
        $storedToken = $this->session['csrf_token'] ?? '';

        if (empty($storedToken) || empty($submittedToken)) {
            return false;
        }

        // hash_equalsでタイミング攻撃を防ぐ
        return hash_equals($storedToken, $submittedToken);
    }

    public function getHiddenField(): string {
        $token = $this->session['csrf_token'] ?? $this->generateToken();
        return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars($token, ENT_QUOTES) . '">';
    }
}

$csrf = new CsrfProtection();

// フォーム表示時にトークン生成
$token = $csrf->generateToken();
echo "生成トークン: " . substr($token, 0, 20) . "...\\n";
echo "隠しフィールド: " . $csrf->getHiddenField() . "\\n\\n";

// POST送信時の検証
echo "正しいトークンの検証: " . ($csrf->validateToken($token) ? "成功" : "失敗") . "\\n";
echo "偽トークンの検証: " . ($csrf->validateToken("fake_token_12345") ? "成功" : "失敗") . "\\n";
echo "空トークンの検証: " . ($csrf->validateToken("") ? "成功" : "失敗") . "\\n";`}
          expectedOutput={`生成トークン: a1b2c3d4e5f6g7h8i9j0...\n隠しフィールド: <input type="hidden" name="csrf_token" value="a1b2c3d4e5f6...">\n\n正しいトークンの検証: 成功\n偽トークンの検証: 失敗\n空トークンの検証: 失敗`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">CSRFミドルウェアパターン</h2>
        <p className="text-gray-400 mb-4">
          リクエスト処理の前にCSRFを自動検証するミドルウェアパターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
class CsrfMiddleware {
    // GETリクエストはCSRF検証不要（状態変更しないため）
    private array $safeMethods = ['GET', 'HEAD', 'OPTIONS'];

    public function handle(string $method, array $postData, array $session): bool {
        if (in_array(strtoupper($method), $this->safeMethods)) {
            echo "GET/HEADリクエスト: CSRF検証スキップ\\n";
            return true;
        }

        $submittedToken = $postData['csrf_token'] ?? '';
        $sessionToken   = $session['csrf_token'] ?? '';

        if (!hash_equals($sessionToken, $submittedToken)) {
            echo "CSRFトークン不正: リクエスト拒否\\n";
            return false;
        }

        echo "CSRFトークン検証: 成功\\n";
        return true;
    }
}

$middleware = new CsrfMiddleware();
$validSession = ['csrf_token' => 'secure_random_token_abc123'];

// GETリクエスト
$middleware->handle('GET', [], $validSession);

// 正当なPOSTリクエスト
$middleware->handle('POST', ['csrf_token' => 'secure_random_token_abc123', 'action' => 'update'], $validSession);

// 攻撃者のPOSTリクエスト（トークンなし）
$middleware->handle('POST', ['action' => 'transfer_money'], $validSession);`}
          expectedOutput={`GET/HEADリクエスト: CSRF検証スキップ\nCSRFトークン検証: 成功\nCSRFトークン不正: リクエスト拒否`}
        />
      </section>
      <LessonCompleteButton lessonId="csrf" categoryId="security" />
      <LessonNav lessons={lessons} currentId="csrf" basePath="/learn/security" />
    </div>
  );
}
