import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function MultidimensionalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">多次元配列</h1>
        <p className="text-gray-400 leading-relaxed">
          多次元配列は配列の中に配列を持つデータ構造です。表形式データやネストした設定情報を表現するのに適しています。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">多次元配列とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          配列の要素として別の配列を格納できます。<code className="text-cyan-300">$arr[0][1]</code>や<code className="text-cyan-300">$arr["key"]["subkey"]</code>のようにブラケットを重ねてアクセスします。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>2次元配列: 行と列を持つ表形式データ</li>
          <li>連想配列のネスト: 設定・JSONデータ表現</li>
          <li>アクセス: <code className="text-cyan-300">$arr[行][列]</code> または <code className="text-cyan-300">$arr["key"]["subkey"]</code></li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列の基本</h2>
        <p className="text-gray-400 mb-4">
          行列データや複数レコードをまとめるのに2次元配列が便利です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$students = [\n    ["name" => "田中", "score" => 85, "grade" => "B"],\n    ["name" => "鈴木", "score" => 92, "grade" => "A"],\n    ["name" => "山田", "score" => 78, "grade" => "C"],\n];\n\nforeach ($students as $i => $student) {\n    echo ($i + 1) . ". " . $student["name"];\n    echo " - " . $student["score"] . "点";\n    echo " (" . $student["grade"] . ")\\n";\n}`}
          expectedOutput={`1. 田中 - 85点 (B)\n2. 鈴木 - 92点 (A)\n3. 山田 - 78点 (C)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ネストした連想配列</h2>
        <p className="text-gray-400 mb-4">
          設定やJSONライクなデータを連想配列のネストで表現できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$config = [\n    "database" => [\n        "host"     => "localhost",\n        "port"     => 3306,\n        "name"     => "myapp",\n    ],\n    "cache" => [\n        "driver"   => "redis",\n        "ttl"      => 3600,\n    ],\n];\n\necho "DB Host: " . $config["database"]["host"] . "\\n";\necho "DB Port: " . $config["database"]["port"] . "\\n";\necho "Cache: "  . $config["cache"]["driver"] . "\\n";\necho "TTL: "    . $config["cache"]["ttl"] . "秒";`}
          expectedOutput={`DB Host: localhost\nDB Port: 3306\nCache: redis\nTTL: 3600秒`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">多次元配列の操作</h2>
        <p className="text-gray-400 mb-4">
          多次元配列からデータを集計・変換する処理を見てみましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$products = [\n    ["name" => "りんご",  "price" => 120, "qty" => 5],\n    ["name" => "バナナ",  "price" => 80,  "qty" => 8],\n    ["name" => "みかん",  "price" => 100, "qty" => 3],\n];\n\n$total = 0;\nforeach ($products as $p) {\n    $subtotal = $p["price"] * $p["qty"];\n    $total += $subtotal;\n    echo $p["name"] . ": " . $subtotal . "円\\n";\n}\necho "合計: " . $total . "円";`}
          expectedOutput={`りんご: 600円\nバナナ: 640円\nみかん: 300円\n合計: 1540円`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}
