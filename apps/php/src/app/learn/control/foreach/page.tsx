import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">foreach</h1>
        <p className="text-gray-400">配列やオブジェクトを簡単に反復処理するforeachを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">foreachとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">foreach</code>は配列や連想配列の要素を1つずつ取り出して処理するためのループです。配列のすべての要素を処理する場合、forループより簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">foreach ($array as $value)</code>: 値のみ取得</li>
          <li><code className="text-green-300">foreach ($array as $key =&gt; $value)</code>: キーと値を取得</li>
          <li>配列の要素数を気にする必要がない</li>
          <li>参照渡し（<code className="text-green-300">&amp;$value</code>）で元の配列を変更可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インデックス配列のforeach</h2>
        <p className="text-gray-400 mb-4">シンプルな配列の要素を順番に処理します。</p>
        <PhpEditor
          defaultCode={`<?php\n$cities = ["東京", "大阪", "名古屋", "福岡", "札幌"];\n\nforeach ($cities as $city) {\n    echo "都市: {$city}\\n";\n}\n\necho "\\n合計: " . count($cities) . "都市";`}
          expectedOutput={`都市: 東京\n都市: 大阪\n都市: 名古屋\n都市: 福岡\n都市: 札幌\n\n合計: 5都市`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">連想配列のforeach</h2>
        <p className="text-gray-400 mb-4"><code className="text-green-300">$key =&gt; $value</code>の形式でキーと値の両方を取得できます。</p>
        <PhpEditor
          defaultCode={`<?php\n$person = [\n    "名前" => "山田太郎",\n    "年齢" => 28,\n    "職業" => "エンジニア",\n    "都市" => "東京",\n];\n\nforeach ($person as $key => $value) {\n    echo "{$key}: {$value}\\n";\n}`}
          expectedOutput={`名前: 山田太郎\n年齢: 28\n職業: エンジニア\n都市: 東京`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">多次元配列のforeach</h2>
        <p className="text-gray-400 mb-4">ネストしたforeachで多次元配列を処理できます。</p>
        <PhpEditor
          defaultCode={`<?php\n$students = [\n    ["名前" => "田中", "点数" => 85],\n    ["名前" => "鈴木", "点数" => 72],\n    ["名前" => "佐藤", "点数" => 91],\n];\n\n$total = 0;\nforeach ($students as $student) {\n    $grade = $student["点数"] >= 80 ? "優" : "良";\n    echo "{$student['名前']}: {$student['点数']}点 ({$grade})\\n";\n    $total += $student["点数"];\n}\n\n$avg = $total / count($students);\necho "平均点: " . round($avg, 1) . "点";`}
          expectedOutput={`田中: 85点 (優)\n鈴木: 72点 (良)\n佐藤: 91点 (優)\n平均点: 82.7点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="foreach" />
      </div>
      <LessonNav lessons={lessons} currentId="foreach" basePath="/learn/control" />
    </div>
  );
}
