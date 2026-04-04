import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("forms");

export default function ValidationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">フォーム・HTTP</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">フォームバリデーション</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            フォームバリデーションはユーザー入力が期待する形式・範囲・内容であることを確認する処理です。
            PHPの<strong className="text-indigo-300">filter_var()</strong>や正規表現を使って
            安全かつ効率的に入力値を検証・サニタイズできます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">filter_var()によるバリデーション</h2>
        <p className="text-gray-400 mb-4">
          filter_var()はPHP組み込みのフィルタリング関数です。メール、URL、数値など様々な形式を検証できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$inputs = [\n    'email'   => 'user@example.com',\n    'bad_email' => 'not-an-email',\n    'url'     => 'https://php.net',\n    'bad_url' => 'not a url',\n    'int'     => '42',\n    'float'   => '3.14',\n    'ip'      => '192.168.1.1',\n];\n\n$tests = [\n    ['email',     FILTER_VALIDATE_EMAIL,   'メール'],\n    ['bad_email', FILTER_VALIDATE_EMAIL,   'メール（無効）'],\n    ['url',       FILTER_VALIDATE_URL,     'URL'],\n    ['int',       FILTER_VALIDATE_INT,     '整数'],\n    ['float',     FILTER_VALIDATE_FLOAT,   '浮動小数'],\n    ['ip',        FILTER_VALIDATE_IP,      'IPアドレス'],\n];\n\nforeach ($tests as [$key, $filter, $label]) {\n    $value  = $inputs[$key];\n    $result = filter_var($value, $filter) !== false ? "有効" : "無効";\n    echo "{$label} [{$value}]: {$result}\\n";\n}`}
          expectedOutput={`メール [user@example.com]: 有効\nメール（無効） [not-an-email]: 無効\nURL [https://php.net]: 有効\n整数 [42]: 有効\n浮動小数 [3.14]: 有効\nIPアドレス [192.168.1.1]: 有効`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カスタムバリデーター</h2>
        <p className="text-gray-400 mb-4">
          複数のルールを持つバリデーションクラスを作成すると、再利用性の高いバリデーション処理が実装できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass Validator {\n    private array $errors = [];\n\n    public function required(string $field, mixed $value): static {\n        if (empty(trim((string)$value))) {\n            $this->errors[$field][] = "{$field}は必須です";\n        }\n        return $this;\n    }\n\n    public function minLength(string $field, string $value, int $min): static {\n        if (mb_strlen($value) < $min) {\n            $this->errors[$field][] = "{$field}は{$min}文字以上が必要です";\n        }\n        return $this;\n    }\n\n    public function email(string $field, string $value): static {\n        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {\n            $this->errors[$field][] = "{$field}は有効なメールアドレスが必要です";\n        }\n        return $this;\n    }\n\n    public function isValid(): bool { return empty($this->errors); }\n    public function getErrors(): array { return $this->errors; }\n}\n\n$data = ['username' => 'ab', 'email' => 'invalid', 'password' => ''];\n$v = new Validator();\n$v->required('username', $data['username'])\n  ->minLength('username', $data['username'], 4)\n  ->email('email', $data['email'])\n  ->required('password', $data['password']);\n\nif (!$v->isValid()) {\n    foreach ($v->getErrors() as $field => $errors) {\n        foreach ($errors as $error) {\n            echo "- {$error}\\n";\n        }\n    }\n}`}
          expectedOutput={`- usernameは4文字以上が必要です\n- emailは有効なメールアドレスが必要です\n- passwordは必須です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">サニタイズ（入力値の無害化）</h2>
        <p className="text-gray-400 mb-4">
          バリデーションに加えて、XSS対策のためにhtmlspecialchars()でHTMLエスケープするサニタイズも重要です。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction sanitize(mixed $value): string {\n    return htmlspecialchars(trim((string)$value), ENT_QUOTES, 'UTF-8');\n}\n\nfunction sanitizeInt(mixed $value, int $min = PHP_INT_MIN, int $max = PHP_INT_MAX): int {\n    $int = filter_var($value, FILTER_VALIDATE_INT);\n    if ($int === false) return $min;\n    return max($min, min($max, $int));\n}\n\n// XSS攻撃試みの入力\n$inputs = [\n    'name'    => '<script>alert("XSS")</script>田中',\n    'age'     => '999',\n    'comment' => 'こんにちは！<b>太字</b>テスト & \"引用\"',\n];\n\n$name    = sanitize($inputs['name']);\n$age     = sanitizeInt($inputs['age'], 0, 120);\n$comment = sanitize($inputs['comment']);\n\necho "名前: {$name}\\n";\necho "年齢: {$age}\\n";\necho "コメント: {$comment}";`}
          expectedOutput={`名前: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;田中\n年齢: 120\nコメント: こんにちは！&lt;b&gt;太字&lt;/b&gt;テスト &amp; &quot;引用&quot;`}
        />
      </section>

      <LessonCompleteButton lessonId="validation" categoryId="forms" />
      <LessonNav lessons={lessons} currentId="validation" basePath="/learn/forms" />
    </div>
  );
}
