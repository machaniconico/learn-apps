import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function IntersectionTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">型システム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">交差型</h1>
        <p className="text-gray-400 leading-relaxed">
          PHP 8.1で導入された交差型（Intersection Types）は、複数のインターフェースを同時に実装するオブジェクトを要求するときに使います。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-teal-400 mb-3">交差型とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          交差型は<code className="text-teal-300">InterfaceA&amp;InterfaceB</code>のように<code className="text-teal-300">&amp;</code>（アンパサンド）でつないで複数の型を全て満たすことを要求します。ユニオン型とは逆に「AまたはB」ではなく「AかつB」です。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>PHP 8.1以降で使用可能</li>
          <li>クラス型・インターフェース型のみ使用可能（スカラー型は不可）</li>
          <li>複数のインターフェースを同時に実装するオブジェクトに使う</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">交差型の基本</h2>
        <p className="text-gray-400 mb-4">
          2つのインターフェースを実装したクラスのオブジェクトを交差型で受け取ります。
        </p>
        <PhpEditor
          defaultCode={`<?php\ninterface Stringable {\n    public function __toString(): string;\n}\n\ninterface Countable {\n    public function count(): int;\n}\n\nclass Collection implements Stringable, Countable {\n    private array $items;\n\n    public function __construct(array $items) {\n        $this->items = $items;\n    }\n\n    public function __toString(): string {\n        return implode(", ", $this->items);\n    }\n\n    public function count(): int {\n        return count($this->items);\n    }\n}\n\nfunction describe(Stringable&Countable $obj): void {\n    echo "内容: " . $obj . "\\n";\n    echo "件数: " . $obj->count() . "\\n";\n}\n\n$col = new Collection(["PHP", "Python", "JavaScript"]);\ndescribe($col);`}
          expectedOutput={`内容: PHP, Python, JavaScript\n件数: 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">交差型の実践例</h2>
        <p className="text-gray-400 mb-4">
          リポジトリパターンで複数のインターフェースを組み合わせる実践的な使い方を見てみましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\ninterface Readable {\n    public function find(int $id): string;\n}\n\ninterface Writable {\n    public function save(string $data): void;\n}\n\nclass UserRepository implements Readable, Writable {\n    private array $store = [];\n\n    public function find(int $id): string {\n        return $this->store[$id] ?? "未登録";\n    }\n\n    public function save(string $data): void {\n        $id = count($this->store) + 1;\n        $this->store[$id] = $data;\n        echo "保存しました (ID: {$id})\\n";\n    }\n}\n\nfunction operate(Readable&Writable $repo): void {\n    $repo->save("田中太郎");\n    $repo->save("鈴木花子");\n    echo $repo->find(1) . "\\n";\n    echo $repo->find(2);\n}\n\n$repo = new UserRepository();\noperate($repo);`}
          expectedOutput={`保存しました (ID: 1)\n保存しました (ID: 2)\n田中太郎\n鈴木花子`}
        />
      </section>

      <LessonCompleteButton categoryId="types" lessonId="intersection-types" />
      <LessonNav lessons={lessons} currentId="intersection-types" basePath="/learn/types" />
    </div>
  );
}
