import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">三項演算子</h1>
        <p className="text-gray-400">条件式を短く書ける三項演算子とNull合体演算子を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          三項演算子（条件演算子）は<code className="text-green-300">条件 ? 真の値 : 偽の値</code>という形式で、if-elseを1行で書ける演算子です。シンプルな条件分岐を簡潔に表現できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文: <code className="text-green-300">$result = 条件 ? 真の場合 : 偽の場合</code></li>
          <li>Elvis演算子: <code className="text-green-300">$a ?: $b</code>（$aがtruthyなら$a、そうでなければ$b）</li>
          <li>Null合体演算子: <code className="text-green-300">$a ?? $b</code>（$aがnullでなければ$a、nullなら$b）</li>
          <li>複雑な条件には通常のif-elseを使う方が読みやすい</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な三項演算子</h2>
        <p className="text-gray-400 mb-4">if-elseと同じ動作を1行で表現できます。</p>
        <PhpEditor
          defaultCode={`<?php\n$age = 20;\n\n// if-elseで書いた場合\nif ($age >= 18) {\n    $status = "成人";\n} else {\n    $status = "未成年";\n}\necho "if-else: " . $status . "\\n";\n\n// 三項演算子で書いた場合\n$status2 = $age >= 18 ? "成人" : "未成年";\necho "三項演算子: " . $status2 . "\\n";\n\n$score = 75;\necho "判定: " . ($score >= 60 ? "合格" : "不合格");`}
          expectedOutput={`if-else: 成人\n三項演算子: 成人\n判定: 合格`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Null合体演算子（??）</h2>
        <p className="text-gray-400 mb-4">PHP 7以降で使える<code className="text-green-300">??</code>演算子は、値がnullまたは未定義の場合にデフォルト値を返します。</p>
        <PhpEditor
          defaultCode={`<?php\n$username = null;\n$displayName = $username ?? "ゲスト";\necho "ユーザー: " . $displayName . "\\n";\n\n// $_GETからの安全な取得\n$_GET["page"] = null;\n$page = $_GET["page"] ?? 1;\necho "ページ: " . $page . "\\n";\n\n// チェーン可能\n$a = null;\n$b = null;\n$c = "見つかった値";\n$result = $a ?? $b ?? $c;\necho "結果: " . $result;`}
          expectedOutput={`ユーザー: ゲスト\nページ: 1\n結果: 見つかった値`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子の実践活用</h2>
        <p className="text-gray-400 mb-4">実際のコードでよく使われるパターンを見てみましょう。</p>
        <PhpEditor
          defaultCode={`<?php\n$items = ["PHP", "JavaScript", "Python"];\n$count = count($items);\n\n// 単数・複数の切り替え\necho $count . "個のアイテム" . ($count === 1 ? "があります" : "があります") . "\\n";\n\n// 配列が空かどうかのチェック\n$cart = [];\necho empty($cart) ? "カートは空です\\n" : "カートに商品があります\\n";\n\n// null合体代入演算子 ??=（PHP 8）\n$config = [];\n$config["debug"] ??= false;\n$config["version"] ??= "1.0";\necho "debug: " . var_export($config["debug"], true) . "\\n";\necho "version: " . $config["version"];`}
          expectedOutput={`3個のアイテムがあります\nカートは空です\ndebug: false\nversion: 1.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="ternary" />
      </div>
      <LessonNav lessons={lessons} currentId="ternary" basePath="/learn/control" />
    </div>
  );
}
