import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function GenericsPatternPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">型システム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ジェネリクスパターン</h1>
        <p className="text-gray-400 leading-relaxed">
          PHPにはジェネリクス構文がありませんが、テンプレートメソッドパターンや型チェックを活用したジェネリクス的な設計ができます。PHPDoc型アノテーションによる静的解析との連携も学びます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-teal-400 mb-3">PHPのジェネリクス事情</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          PHPにはTypeScriptやJavaのような言語レベルのジェネリクスはありません。しかし、PHPDocの<code className="text-teal-300">@template</code>アノテーションとPHPStanやPsalmなどの静的解析ツールを組み合わせることで、型安全なコレクションを実現できます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>実行時は型チェックなし（静的解析ツールが検証）</li>
          <li>PHPDoc <code className="text-teal-300">@template T</code> でテンプレート型を宣言</li>
          <li>型付きコレクションクラスで型安全を担保</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型付きコレクション</h2>
        <p className="text-gray-400 mb-4">
          クラスを使って特定の型のみを格納するコレクションを実装します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass TypedCollection {\n    private array $items = [];\n    private string $type;\n\n    public function __construct(string $type) {\n        $this->type = $type;\n    }\n\n    public function add(mixed $item): void {\n        if (!($item instanceof $this->type)) {\n            throw new InvalidArgumentException(\n                "期待する型: {$this->type}"\n            );\n        }\n        $this->items[] = $item;\n    }\n\n    public function count(): int {\n        return count($this->items);\n    }\n\n    public function getAll(): array {\n        return $this->items;\n    }\n}\n\nclass Point {\n    public function __construct(\n        public float $x,\n        public float $y\n    ) {}\n\n    public function __toString(): string {\n        return "({$this->x}, {$this->y})";\n    }\n}\n\n$points = new TypedCollection(Point::class);\n$points->add(new Point(1.0, 2.0));\n$points->add(new Point(3.5, 4.5));\n$points->add(new Point(0.0, 1.0));\n\necho "点の数: " . $points->count() . "\\n";\nforeach ($points->getAll() as $p) {\n    echo $p . "\\n";\n}`}
          expectedOutput={`点の数: 3\n(1, 2)\n(3.5, 4.5)\n(0, 1)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリーパターンと型安全</h2>
        <p className="text-gray-400 mb-4">
          ファクトリーメソッドを使って型安全なオブジェクト生成を行います。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass Result {\n    private function __construct(\n        private readonly bool $success,\n        private readonly mixed $value,\n        private readonly ?string $error = null\n    ) {}\n\n    public static function ok(mixed $value): self {\n        return new self(true, $value);\n    }\n\n    public static function fail(string $error): self {\n        return new self(false, null, $error);\n    }\n\n    public function isOk(): bool { return $this->success; }\n    public function getValue(): mixed { return $this->value; }\n    public function getError(): ?string { return $this->error; }\n}\n\nfunction parseInt(string $input): Result {\n    if (!is_numeric($input)) {\n        return Result::fail("数値ではありません: {$input}");\n    }\n    return Result::ok((int) $input);\n}\n\n$r1 = parseInt("42");\n$r2 = parseInt("abc");\n\necho ($r1->isOk() ? "成功: " . $r1->getValue() : "失敗: " . $r1->getError()) . "\\n";\necho ($r2->isOk() ? "成功: " . $r2->getValue() : "失敗: " . $r2->getError());`}
          expectedOutput={`成功: 42\n失敗: 数値ではありません: abc`}
        />
      </section>

      <LessonCompleteButton categoryId="types" lessonId="generics-patterns" />
      <LessonNav lessons={lessons} currentId="generics-patterns" basePath="/learn/types" />
    </div>
  );
}
