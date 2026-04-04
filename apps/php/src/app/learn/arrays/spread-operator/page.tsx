import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SpreadOperatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">スプレッド演算子</h1>
        <p className="text-gray-400 leading-relaxed">
          スプレッド演算子（<code className="text-cyan-300">...</code>）を使うと、配列を展開したり可変長引数を受け取ったりできます。PHP 5.6以降の便利な機能です。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">スプレッド演算子とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          <code className="text-cyan-300">...</code>（3つのドット）を使うことで、配列の要素を個別の引数として展開（アンパック）したり、配列同士を結合したりできます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>関数の可変長引数: <code className="text-cyan-300">function sum(int ...$nums)</code></li>
          <li>関数呼び出し時の展開: <code className="text-cyan-300">func(...$arr)</code></li>
          <li>配列結合: <code className="text-cyan-300">[...$a, ...$b]</code>（PHP 7.4以降）</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数</h2>
        <p className="text-gray-400 mb-4">
          関数定義で<code className="text-cyan-300">...$args</code>を使うと任意の数の引数を配列として受け取れます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction sum(int ...$nums): int {\n    return array_sum($nums);\n}\n\nfunction joinWith(string $sep, string ...$parts): string {\n    return implode($sep, $parts);\n}\n\necho sum(1, 2, 3) . "\\n";\necho sum(10, 20, 30, 40, 50) . "\\n";\necho joinWith(" - ", "PHP", "Laravel", "Composer") . "\\n";\necho joinWith(", ", "東京", "大阪", "名古屋", "福岡");`}
          expectedOutput={`6\n150\nPHP - Laravel - Composer\n東京, 大阪, 名古屋, 福岡`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列のアンパックと結合</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">...$arr</code>で配列を展開して関数に渡したり、新しい配列に展開して結合できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction multiply(int $a, int $b, int $c): int {\n    return $a * $b * $c;\n}\n\n$args = [2, 3, 4];\necho multiply(...$args) . "\\n";\n\n// 配列の結合\n$fruits = ["りんご", "バナナ"];\n$vegs   = ["にんじん", "キャベツ"];\n$more   = ["みかん"];\n\n$all = [...$fruits, ...$vegs, ...$more];\necho implode(", ", $all);`}
          expectedOutput={`24\nりんご, バナナ, にんじん, キャベツ, みかん`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">連想配列のスプレッド</h2>
        <p className="text-gray-400 mb-4">
          PHP 8.1以降、文字列キーの連想配列もスプレッド演算子で展開できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$defaults = ["color" => "blue", "size" => "M", "qty" => 1];\n$override = ["color" => "red", "qty" => 5];\n\n// PHP 8.1以降: 文字列キーのスプレッド\n$merged = [...$defaults, ...$override];\nforeach ($merged as $k => $v) {\n    echo "$k: $v\\n";\n}`}
          expectedOutput={`color: red\nsize: M\nqty: 5`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="spread-operator" />
      <LessonNav lessons={lessons} currentId="spread-operator" basePath="/learn/arrays" />
    </div>
  );
}
