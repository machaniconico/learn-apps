import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("closures");

export default function CallbacksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クロージャ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">コールバック</h1>
        <p className="text-gray-400 leading-relaxed">
          コールバックは関数を引数として渡すパターンです。PHPではクロージャ・文字列の関数名・配列形式のメソッド参照など複数の方法でコールバックを渡せます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-400 mb-3">callableとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          PHPの<code className="text-purple-300">callable</code>型は「呼び出し可能なもの」を表します。以下の形式が使えます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>クロージャ: <code className="text-purple-300">function($x) {"{"} ... {"}"}</code></li>
          <li>関数名の文字列: <code className="text-purple-300">"strlen"</code></li>
          <li>静的メソッド: <code className="text-purple-300">["ClassName", "methodName"]</code></li>
          <li>インスタンスメソッド: <code className="text-purple-300">[$obj, "methodName"]</code></li>
          <li><code className="text-purple-300">__invoke</code>メソッドを持つオブジェクト</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">callableを受け取る関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">callable</code>型の引数を持つ関数を定義して、様々なコールバックを渡します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction applyToAll(array $items, callable $fn): array {\n    $result = [];\n    foreach ($items as $item) {\n        $result[] = $fn($item);\n    }\n    return $result;\n}\n\n$words = ["hello", "world", "php"];\n\n// 文字列関数名\n$upper = applyToAll($words, "strtoupper");\necho implode(", ", $upper) . "\\n";\n\n// クロージャ\n$exclaimed = applyToAll($words, fn($w) => $w . "!");\necho implode(", ", $exclaimed);`}
          expectedOutput={`HELLO, WORLD, PHP\nhello!, world!, php!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">__invokeメソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">__invoke</code>メソッドを持つクラスのオブジェクトはcallableとして使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass Validator {\n    public function __construct(private int $min, private int $max) {}\n\n    public function __invoke(int $value): bool {\n        return $value >= $this->min && $value <= $this->max;\n    }\n}\n\n$isAdult  = new Validator(18, 120);\n$isChild  = new Validator(0, 17);\n\n$ages = [5, 18, 25, 12, 65, 15, 30];\n\n$adults  = array_filter($ages, $isAdult);\n$children = array_filter($ages, $isChild);\n\necho "成人: "   . implode(", ", $adults)   . "\\n";\necho "未成年: " . implode(", ", $children);`}
          expectedOutput={`成人: 18, 25, 65, 30\n未成年: 5, 12, 15`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">call_user_funcとコールバックチェーン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">call_user_func</code>でcallableを動的に呼び出し、パイプラインパターンを実装できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction pipeline(mixed $value, callable ...$fns): mixed {\n    return array_reduce($fns, fn($carry, $fn) => $fn($carry), $value);\n}\n\n$result = pipeline(\n    "  Hello, PHP World!  ",\n    "trim",\n    "strtolower",\n    fn($s) => str_replace(" ", "_", $s),\n    fn($s) => $s . ".txt"\n);\n\necho $result;`}
          expectedOutput={`hello,_php_world!.txt`}
        />
      </section>

      <LessonCompleteButton categoryId="closures" lessonId="callbacks" />
      <LessonNav lessons={lessons} currentId="callbacks" basePath="/learn/closures" />
    </div>
  );
}
