import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPで配列を作成する正しい方法はどれですか？",
    options: [
      "$arr = array(1, 2, 3); または $arr = [1, 2, 3];",
      "$arr = {1, 2, 3};",
      "$arr = (1, 2, 3);",
      "$arr = new Array(1, 2, 3);",
    ],
    answer: 0,
    explanation: "PHPでは array() 関数と [] 短縮構文の両方で配列を作成できます。PHP 5.4以降は [] が推奨されています。",
  },
  {
    question: "連想配列でキー「name」に「山田」をセットする正しい書き方はどれですか？",
    options: [
      "$arr[name] = '山田';",
      "$arr['name'] = '山田';",
      "$arr{name} = '山田';",
      "$arr->name = '山田';",
    ],
    answer: 1,
    explanation: "連想配列のキーには文字列を使い、シングルクォートかダブルクォートで囲みます。",
  },
  {
    question: "配列の末尾に要素を追加する関数はどれですか？",
    options: [
      "array_add()",
      "array_push() または $arr[] = 値",
      "array_append()",
      "array_insert()",
    ],
    answer: 1,
    explanation: "array_push() または $arr[] = 値 で末尾に要素を追加できます。$arr[] の方が高速です。",
  },
  {
    question: "array_map() の正しい説明はどれですか？",
    options: [
      "配列を地図形式に変換する",
      "配列の各要素にコールバック関数を適用した新しい配列を返す",
      "配列を連想配列に変換する",
      "配列をソートする",
    ],
    answer: 1,
    explanation: "array_map() は配列の各要素にコールバック関数を適用し、変換後の要素からなる新しい配列を返します。",
  },
];

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">配列</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPの配列は非常に強力で柔軟なデータ構造です。インデックス配列、連想配列、多次元配列から豊富な組み込み関数まで、配列操作を完全にマスターしましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="arrays" totalLessons={8} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/arrays" color="cyan" categoryId="arrays" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の基本操作</h2>
        <p className="text-gray-400 mb-4">
          PHPの配列はインデックス番号またはキー文字列でアクセスできます。<code className="text-cyan-300">[]</code>構文で配列を定義しましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$fruits = ["りんご", "バナナ", "みかん"];\necho $fruits[0] . "\\n";\necho $fruits[1] . "\\n";\n\n$person = [\n    "name" => "佐藤花子",\n    "age"  => 28,\n    "city" => "東京",\n];\necho $person["name"] . "\\n";\necho $person["age"] . "歳";`}
          expectedOutput={`りんご\nバナナ\n佐藤花子\n28歳`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列関数の活用</h2>
        <p className="text-gray-400 mb-4">
          PHPには強力な組み込み配列関数が多数あります。<code className="text-cyan-300">array_map</code>、<code className="text-cyan-300">array_filter</code>、<code className="text-cyan-300">array_reduce</code>で関数型スタイルの操作ができます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$numbers = [1, 2, 3, 4, 5, 6];\n\n$doubled = array_map(fn($n) => $n * 2, $numbers);\n$evens   = array_filter($numbers, fn($n) => $n % 2 === 0);\n$sum     = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);\n\necho implode(", ", $doubled) . "\\n";\necho implode(", ", $evens) . "\\n";\necho "合計: " . $sum;`}
          expectedOutput={`2, 4, 6, 8, 10, 12\n2, 4, 6\n合計: 21`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
