import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("closures");

export default function ArrayMapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クロージャ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">array_map</h1>
        <p className="text-gray-400 leading-relaxed">
          <code className="text-purple-300">array_map</code>はクロージャを受け取り、配列の各要素に適用して新しい配列を返します。関数型プログラミングスタイルの変換処理に欠かせない関数です。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-400 mb-3">array_mapの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          <code className="text-purple-300">array_map(callable $callback, array $arr): array</code>
        </p>
        <p className="text-gray-300 leading-relaxed">
          配列の各要素にコールバックを適用し、変換後の要素からなる新しい配列を返します。元の配列は変更しません。複数の配列を同時に処理することも可能です。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な変換</h2>
        <p className="text-gray-400 mb-4">
          アロー関数と組み合わせてシンプルな変換処理を書きます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$numbers = [1, 2, 3, 4, 5];\n\n$squared  = array_map(fn($n) => $n ** 2, $numbers);\n$doubled  = array_map(fn($n) => $n * 2, $numbers);\n$asString = array_map(fn($n) => "数値{$n}", $numbers);\n\necho implode(", ", $squared)  . "\\n";\necho implode(", ", $doubled)  . "\\n";\necho implode(", ", $asString);`}
          expectedOutput={`1, 4, 9, 16, 25\n2, 4, 6, 8, 10\n数値1, 数値2, 数値3, 数値4, 数値5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">連想配列の変換</h2>
        <p className="text-gray-400 mb-4">
          連想配列の値を変換したり、オブジェクト配列から特定フィールドを抽出したりできます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$products = [\n    ["name" => "りんご",  "price" => 120],\n    ["name" => "バナナ",  "price" => 80],\n    ["name" => "みかん",  "price" => 150],\n];\n\n// 税込価格に変換\n$withTax = array_map(function($p) {\n    return [\n        "name"      => $p["name"],\n        "price"     => $p["price"],\n        "priceTax"  => (int)($p["price"] * 1.1),\n    ];\n}, $products);\n\nforeach ($withTax as $p) {\n    echo $p["name"] . ": " . $p["price"] . "円 → " . $p["priceTax"] . "円\\n";\n}`}
          expectedOutput={`りんご: 120円 → 132円\nバナナ: 80円 → 88円\nみかん: 150円 → 165円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数配列への適用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">array_map</code>は複数の配列を受け取り、対応する要素を同時に処理できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$names  = ["田中", "鈴木", "山田"];\n$scores = [85, 92, 78];\n$grades = ["B", "A", "C"];\n\n$reports = array_map(\n    fn($name, $score, $grade) => "{$name}: {$score}点 ({$grade})",\n    $names, $scores, $grades\n);\n\nforeach ($reports as $r) {\n    echo $r . "\\n";\n}`}
          expectedOutput={`田中: 85点 (B)\n鈴木: 92点 (A)\n山田: 78点 (C)`}
        />
      </section>

      <LessonCompleteButton categoryId="closures" lessonId="array-map" />
      <LessonNav lessons={lessons} currentId="array-map" basePath="/learn/closures" />
    </div>
  );
}
