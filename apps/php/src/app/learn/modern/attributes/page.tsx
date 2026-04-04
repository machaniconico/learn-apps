import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("modern");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">モダンPHP レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Attribute</h1>
        <p className="text-gray-400">PHP 8のアトリビュート（#[...]）によるメタデータ付与を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Attributeとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP 8.0で追加されたAttributeは、クラス・メソッド・プロパティなどにメタデータを付与する仕組みです。以前はPHPDocコメントで代替していましたが、ネイティブで処理できるようになりました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">#[Attribute]</code> - Attributeクラスの定義</li>
          <li>クラス、メソッド、プロパティ、関数、引数に付与可能</li>
          <li>リフレクションAPIで実行時に読み取れる</li>
          <li>LaravelやSymfonyのアノテーションに相当</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Attributeの定義と使用</h2>
        <p className="text-gray-400 mb-4">カスタムAttributeを定義してクラスやメソッドにメタデータを付与できます。</p>
        <PhpEditor
          defaultCode={`<?php
// Attributeの定義
#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class Route {
    public function __construct(
        public string $path,
        public string $method = 'GET',
    ) {}
}

#[Attribute(Attribute::TARGET_PROPERTY)]
class Validate {
    public function __construct(
        public string $type,
        public bool $required = true,
    ) {}
}

// Attributeの使用
#[Route('/api/users')]
class UserController {
    #[Validate(type: 'string', required: true)]
    public string $name = '';

    #[Route('/api/users/{id}', method: 'GET')]
    public function show(int $id): string {
        return "ユーザー $id を表示";
    }

    #[Route('/api/users', method: 'POST')]
    public function create(): string {
        return "ユーザーを作成";
    }
}

// リフレクションでAttributeを読み取る
$ref = new ReflectionClass(UserController::class);

// クラスのAttribute
foreach ($ref->getAttributes(Route::class) as $attr) {
    $route = $attr->newInstance();
    echo "クラスルート: {$route->method} {$route->path}\n";
}

// メソッドのAttribute
foreach ($ref->getMethods() as $method) {
    foreach ($method->getAttributes(Route::class) as $attr) {
        $route = $attr->newInstance();
        echo "メソッド {$method->getName()}: {$route->method} {$route->path}\n";
    }
}`}
          expectedOutput={`クラスルート: GET /api/users
メソッド show: GET /api/users/{id}
メソッド create: POST /api/users`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バリデーションAttributeの実装</h2>
        <p className="text-gray-400 mb-4">Attributeを使ったバリデーション機能の実装パターンを学びます。</p>
        <PhpEditor
          defaultCode={`<?php
#[Attribute(Attribute::TARGET_PROPERTY)]
class NotBlank {
    public string $message = 'この項目は必須です';
}

#[Attribute(Attribute::TARGET_PROPERTY)]
class Length {
    public function __construct(
        public int $min = 0,
        public int $max = PHP_INT_MAX,
        public string $message = '長さが範囲外です',
    ) {}
}

class UserForm {
    #[NotBlank]
    #[Length(min: 2, max: 50)]
    public string $name = '';

    #[NotBlank]
    #[Length(min: 8)]
    public string $password = '';
}

function validate(object $obj): array {
    $errors = [];
    $ref = new ReflectionClass($obj);
    foreach ($ref->getProperties() as $prop) {
        $value = $prop->getValue($obj);
        foreach ($prop->getAttributes() as $attr) {
            $instance = $attr->newInstance();
            if ($instance instanceof NotBlank && empty($value)) {
                $errors[$prop->getName()][] = $instance->message;
            }
            if ($instance instanceof Length) {
                $len = mb_strlen((string)$value);
                if ($len < $instance->min || $len > $instance->max) {
                    $errors[$prop->getName()][] = "{$prop->getName()}は{$instance->min}〜{$instance->max}文字";
                }
            }
        }
    }
    return $errors;
}

$form = new UserForm();
$form->name = 'A';
$form->password = '';

$errors = validate($form);
foreach ($errors as $field => $messages) {
    foreach ($messages as $msg) {
        echo "$field: $msg\n";
    }
}`}
          expectedOutput={`name: nameは2〜50文字
password: この項目は必須です
password: passwordは8〜9223372036854775807文字`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="modern" lessonId="attributes" />
      </div>
      <LessonNav lessons={lessons} currentId="attributes" basePath="/learn/modern" />
    </div>
  );
}
