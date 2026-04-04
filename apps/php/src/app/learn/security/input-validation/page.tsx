import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function InputValidationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">入力検証</h1>
        <p className="text-gray-400">filter_input関数と検証パターンによるデータのバリデーションを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">入力検証の重要性</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          「信頼しない、検証する（Trust Nothing, Validate Everything）」がセキュリティの基本です。
          すべての外部入力はバリデーション・サニタイズしてから使用します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">filter_var()</code> — 値の検証とサニタイズ</li>
          <li>• <code className="text-red-300">filter_input()</code> — $_GET/$_POSTから安全に取得</li>
          <li>• <code className="text-red-300">FILTER_VALIDATE_*</code> — 各種バリデーションフィルター</li>
          <li>• <code className="text-red-300">FILTER_SANITIZE_*</code> — サニタイズフィルター</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">filter_varによる入力検証</h2>
        <p className="text-gray-400 mb-4">
          PHPのフィルター関数で様々な型の入力を検証します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// メールアドレスの検証
$emails = ['valid@example.com', 'invalid-email', 'test@', '@nodomain.com'];
echo "=== メールアドレス検証 ===\\n";
foreach ($emails as $email) {
    $result = filter_var($email, FILTER_VALIDATE_EMAIL);
    echo "  {$email}: " . ($result !== false ? "有効" : "無効") . "\\n";
}

// URLの検証
$urls = ['https://example.com', 'http://test.jp/path?q=1', 'not-a-url', 'ftp://file.com'];
echo "\\n=== URL検証 ===\\n";
foreach ($urls as $url) {
    $result = filter_var($url, FILTER_VALIDATE_URL);
    echo "  {$url}: " . ($result !== false ? "有効" : "無効") . "\\n";
}

// 整数の検証
$values = ['42', '-5', '3.14', 'abc', '0', '999999'];
echo "\\n=== 整数検証（1-100の範囲） ===\\n";
$options = ['options' => ['min_range' => 1, 'max_range' => 100]];
foreach ($values as $val) {
    $result = filter_var($val, FILTER_VALIDATE_INT, $options);
    echo "  {$val}: " . ($result !== false ? "有効({$result})" : "無効") . "\\n";
}`}
          expectedOutput={`=== メールアドレス検証 ===\n  valid@example.com: 有効\n  invalid-email: 無効\n  test@: 無効\n  @nodomain.com: 無効\n\n=== URL検証 ===\n  https://example.com: 有効\n  http://test.jp/path?q=1: 有効\n  not-a-url: 無効\n  ftp://file.com: 有効\n\n=== 整数検証（1-100の範囲） ===\n  42: 有効(42)\n  -5: 無効\n  3.14: 無効\n  abc: 無効\n  0: 無効\n  999999: 無効`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バリデーションクラスの実装</h2>
        <p className="text-gray-400 mb-4">
          再利用可能なバリデーションクラスでフォーム入力を検証します。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Validator {
    private array $errors = [];

    public function required(string $field, mixed $value): static {
        if (empty($value) && $value !== '0') {
            $this->errors[$field][] = "{$field}は必須です";
        }
        return $this;
    }

    public function minLength(string $field, string $value, int $min): static {
        if (mb_strlen($value) < $min) {
            $this->errors[$field][] = "{$field}は{$min}文字以上必要です";
        }
        return $this;
    }

    public function email(string $field, string $value): static {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field][] = "{$field}は有効なメールアドレスを入力してください";
        }
        return $this;
    }

    public function integer(string $field, mixed $value, int $min = PHP_INT_MIN, int $max = PHP_INT_MAX): static {
        $result = filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => $min, 'max_range' => $max]]);
        if ($result === false) {
            $this->errors[$field][] = "{$field}は{$min}〜{$max}の整数を入力してください";
        }
        return $this;
    }

    public function isValid(): bool { return empty($this->errors); }
    public function getErrors(): array { return $this->errors; }
}

// バリデーション使用例
$input = ['name' => '田', 'email' => 'invalid', 'age' => '200'];

$v = new Validator();
$v->required('name', $input['name'])
  ->minLength('name', $input['name'], 2)
  ->required('email', $input['email'])
  ->email('email', $input['email'])
  ->integer('age', $input['age'], 0, 150);

if ($v->isValid()) {
    echo "バリデーション成功\\n";
} else {
    echo "バリデーションエラー:\\n";
    foreach ($v->getErrors() as $field => $errors) {
        foreach ($errors as $error) {
            echo "  - {$error}\\n";
        }
    }
}`}
          expectedOutput={`バリデーションエラー:\n  - nameは2文字以上必要です\n  - emailは有効なメールアドレスを入力してください\n  - ageは0〜150の整数を入力してください`}
        />
      </section>
      <LessonCompleteButton lessonId="input-validation" categoryId="security" />
      <LessonNav lessons={lessons} currentId="input-validation" basePath="/learn/security" />
    </div>
  );
}
