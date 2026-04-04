import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function PasswordHashPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パスワードハッシュ</h1>
        <p className="text-gray-400">password_hashとpassword_verifyによる安全なパスワード管理を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パスワードの安全な保存</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          パスワードは平文で保存してはいけません。MD5やSHA1も現在は安全ではありません。
          PHPの<code className="text-red-300">password_hash()</code>関数はbcryptアルゴリズムを使い、ソルト自動付与とコストファクター調整が可能です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">PASSWORD_BCRYPT</code> — bcryptアルゴリズム（推奨）</li>
          <li>• <code className="text-red-300">PASSWORD_ARGON2ID</code> — より強力（PHP 7.3+）</li>
          <li>• <code className="text-red-300">PASSWORD_DEFAULT</code> — PHPが推奨するアルゴリズムを自動選択</li>
          <li>• <code className="text-red-300">cost</code>オプションでハッシュの計算コスト（強度）を調整</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">password_hashの基本</h2>
        <p className="text-gray-400 mb-4">
          パスワードをハッシュ化し、検証します。
        </p>
        <PhpEditor
          defaultCode={`<?php
$passwords = ["MyPassword123!", "秘密のパスワード", "p@ssw0rd"];

foreach ($passwords as $password) {
    // bcryptでハッシュ化（ソルトは自動生成）
    $hash = password_hash($password, PASSWORD_BCRYPT);

    // ハッシュの先頭部分（アルゴリズム情報を含む）
    echo "パスワード: {$password}\\n";
    echo "ハッシュ: " . substr($hash, 0, 7) . "... (60文字)\\n";

    // 検証
    $valid = password_verify($password, $hash);
    $invalid = password_verify("wrong_password", $hash);
    echo "正しいPW: " . ($valid ? "一致" : "不一致") . " / ";
    echo "誤ったPW: " . ($invalid ? "一致" : "不一致") . "\\n\\n";
}`}
          expectedOutput={`パスワード: MyPassword123!\nハッシュ: $2y$10$... (60文字)\n正しいPW: 一致 / 誤ったPW: 不一致\n\nパスワード: 秘密のパスワード\nハッシュ: $2y$10$... (60文字)\n正しいPW: 一致 / 誤ったPW: 不一致\n\nパスワード: p@ssw0rd\nハッシュ: $2y$10$... (60文字)\n正しいPW: 一致 / 誤ったPW: 不一致`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パスワード管理の完全な実装</h2>
        <p className="text-gray-400 mb-4">
          ユーザー登録・ログイン・パスワード再ハッシュの実装パターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
class PasswordManager {
    private int $cost;

    public function __construct(int $cost = 12) {
        $this->cost = $cost;
    }

    public function hash(string $password): string {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => $this->cost]);
    }

    public function verify(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }

    // パスワードポリシーのチェック
    public function isStrong(string $password): array {
        $errors = [];
        if (strlen($password) < 8) $errors[] = "8文字以上必要";
        if (!preg_match('/[A-Z]/', $password)) $errors[] = "大文字を含めてください";
        if (!preg_match('/[a-z]/', $password)) $errors[] = "小文字を含めてください";
        if (!preg_match('/[0-9]/', $password)) $errors[] = "数字を含めてください";
        return $errors;
    }

    public function needsRehash(string $hash): bool {
        return password_needs_rehash($hash, PASSWORD_BCRYPT, ['cost' => $this->cost]);
    }
}

$pm = new PasswordManager(cost: 10);

// パスワード強度チェック
$weakPw = "abc";
$errors = $pm->isStrong($weakPw);
echo "弱いPW '{$weakPw}': " . implode(", ", $errors) . "\\n";

$strongPw = "SecurePass123!";
$errors2 = $pm->isStrong($strongPw);
echo "強いPW '{$strongPw}': " . (empty($errors2) ? "OK" : implode(", ", $errors2)) . "\\n";

// ハッシュ化と検証
$hash = $pm->hash($strongPw);
echo "検証: " . ($pm->verify($strongPw, $hash) ? "成功" : "失敗") . "\\n";
echo "再ハッシュ必要: " . ($pm->needsRehash($hash) ? "はい" : "いいえ") . "\\n";`}
          expectedOutput={`弱いPW 'abc': 8文字以上必要, 大文字を含めてください, 数字を含めてください\n強いPW 'SecurePass123!': OK\n検証: 成功\n再ハッシュ必要: いいえ`}
        />
      </section>
      <LessonCompleteButton lessonId="password-hash" categoryId="security" />
      <LessonNav lessons={lessons} currentId="password-hash" basePath="/learn/security" />
    </div>
  );
}
