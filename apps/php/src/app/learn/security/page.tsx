import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

const quizQuestions: QuizQuestion[] = [
  {
    question: "XSS攻撃を防ぐためにHTMLエスケープに使う関数はどれですか？",
    options: ["htmlentities()", "htmlspecialchars()", "strip_tags()", "addslashes()"],
    answer: 1,
    explanation: "htmlspecialchars()は<>&\"'などの特殊文字をHTMLエンティティに変換してXSSを防ぎます。ENT_QUOTESフラグを付けると引用符もエスケープされます。",
  },
  {
    question: "SQLインジェクションを防ぐ最も効果的な方法はどれですか？",
    options: [
      "入力値をすべて大文字にする",
      "プリペアドステートメントを使う",
      "文字列を逆順にする",
      "クエリを暗号化する",
    ],
    answer: 1,
    explanation: "プリペアドステートメント（PDO::prepare + bindParam/execute）を使うことで、SQLと入力データを分離してSQLインジェクションを防ぎます。",
  },
  {
    question: "password_hash()で推奨されるアルゴリズムはどれですか？",
    options: ["PASSWORD_MD5", "PASSWORD_SHA256", "PASSWORD_BCRYPT", "PASSWORD_AES"],
    answer: 2,
    explanation: "PASSWORD_BCRYPTはbcryptアルゴリズムを使い、ソルト自動生成とコストファクター調整ができる安全なパスワードハッシュを生成します。",
  },
  {
    question: "CSRF攻撃を防ぐ基本的な方法はどれですか？",
    options: [
      "HTTPSを使う",
      "フォームにCSRFトークンを埋め込む",
      "パスワードを暗号化する",
      "SQLをエスケープする",
    ],
    answer: 1,
    explanation: "CSRFトークンをセッションとフォームの隠しフィールドに保存し、送信時に検証することでCSRF攻撃を防ぎます。",
  },
];

export default function SecurityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">セキュリティ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPアプリケーションのセキュリティを学びましょう。XSS・SQLインジェクション・CSRF・パスワードハッシュ・入力検証・セキュアヘッダーの各対策を実践的に習得し、安全なWebアプリケーションを構築します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="security" totalLessons={6} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/security" color="red" categoryId="security" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XSS対策の基本</h2>
        <p className="text-gray-400 mb-4">
          ユーザー入力を出力する際は<code className="text-red-300">htmlspecialchars()</code>でエスケープしてXSSを防ぎます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 悪意あるユーザー入力の例
$userInput = '<script>alert("XSS攻撃！")</script>';
$userName = '田中 <b>太郎</b>';

// 危険: エスケープなし（実際にはスクリプトが実行される）
echo "危険: " . $userInput . "\\n";

// 安全: htmlspecialcharsでエスケープ
$safe = htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
echo "安全: " . $safe . "\\n";

$safeName = htmlspecialchars($userName, ENT_QUOTES, 'UTF-8');
echo "名前: " . $safeName . "\\n";`}
          expectedOutput={`危険: <script>alert("XSS攻撃！")</script>\n安全: &lt;script&gt;alert(&quot;XSS攻撃！&quot;)&lt;/script&gt;\n名前: 田中 &lt;b&gt;太郎&lt;/b&gt;`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パスワードの安全な管理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">password_hash()</code>と<code className="text-red-300">password_verify()</code>でパスワードを安全に保存・検証します。
        </p>
        <PhpEditor
          defaultCode={`<?php
$password = "MySecurePassword123!";

// パスワードをハッシュ化（保存用）
$hash = password_hash($password, PASSWORD_BCRYPT);
echo "ハッシュ: " . substr($hash, 0, 30) . "..." . "\\n";

// パスワードを検証（ログイン時）
$isValid = password_verify($password, $hash);
echo "検証結果: " . ($isValid ? "一致" : "不一致") . "\\n";

// 誤ったパスワードの検証
$isWrong = password_verify("WrongPassword", $hash);
echo "誤ったパスワード: " . ($isWrong ? "一致" : "不一致") . "\\n";

// ハッシュの再計算が必要か確認
echo "再ハッシュ必要: " . (password_needs_rehash($hash, PASSWORD_BCRYPT) ? "はい" : "いいえ") . "\\n";`}
          expectedOutput={`ハッシュ: $2y$10$...\n検証結果: 一致\n誤ったパスワード: 不一致\n再ハッシュ必要: いいえ`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
