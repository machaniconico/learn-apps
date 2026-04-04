import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">一行コメント、ブロックコメント、PHPDocの書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはプログラムの説明を書くためのもので、実行時には無視されます。コードの意図を伝えたり、一時的にコードを無効化するのに使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">//</code>: 一行コメント（C++スタイル）</li>
          <li><code className="text-blue-300">#</code>: 一行コメント（Shellスタイル）</li>
          <li><code className="text-blue-300">/* ... */</code>: ブロックコメント（複数行）</li>
          <li><code className="text-blue-300">/** ... */</code>: PHPDocコメント（ドキュメント生成用）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">一行コメントとブロックコメント</h2>
        <p className="text-gray-400 mb-4">コメントは実行されません。コードの説明や一時的な無効化に使います。</p>
        <PhpEditor
          defaultCode={`<?php\n// これは一行コメントです\n# これもシェルスタイルの一行コメント\n\n/*\n * これはブロックコメントです\n * 複数行にわたって書けます\n */\n\n$price = 1000;  // 価格\n$tax_rate = 0.1; // 消費税率\n\n// $total = $price * 1.08; // 旧税率（無効化）\n$total = $price * (1 + $tax_rate);\necho "税込価格: " . $total . "円";`}
          expectedOutput={`税込価格: 1100円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHPDocコメント</h2>
        <p className="text-gray-400 mb-4">PHPDocは関数やクラスのドキュメントを自動生成するための特殊なコメント形式です。</p>
        <PhpEditor
          defaultCode={`<?php\n/**\n * 2つの数値を加算する関数\n *\n * @param int $a 最初の数値\n * @param int $b 2番目の数値\n * @return int 加算結果\n */\nfunction add(int $a, int $b): int {\n    return $a + $b;\n}\n\n/**\n * ユーザーの挨拶を返す\n *\n * @param string $name ユーザー名\n * @return string 挨拶文\n */\nfunction greet(string $name): string {\n    return "こんにちは、{$name}さん！";\n}\n\necho add(3, 4) . "\\n";\necho greet("PHP学習者");`}
          expectedOutput={`7\nこんにちは、PHP学習者さん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コメントのベストプラクティス</h2>
        <p className="text-gray-400 mb-4">良いコメントは「何をするか」ではなく「なぜそうするか」を説明します。</p>
        <PhpEditor
          defaultCode={`<?php\n// 悪いコメント例（何をするか説明している）\n// $ageに1を加える\n$age = 20;\n$age++;\n\n// 良いコメント例（なぜそうするかを説明）\n// 誕生日処理: ユーザーが誕生日を迎えたので年齢を更新\n$birthYear = 2000;\n$currentYear = 2024;\n// うるう年は考慮せず、単純に年の差で計算\n$calculatedAge = $currentYear - $birthYear;\n\necho "計算した年齢: " . $calculatedAge . "歳";`}
          expectedOutput={`計算した年齢: 24歳`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
