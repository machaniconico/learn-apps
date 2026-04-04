import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsDefaultParamsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト引数</h1>
        <p className="text-gray-400">引数にデフォルト値を設定して省略可能にする方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デフォルト引数を使うと、関数呼び出し時に引数を省略できます。省略した場合はデフォルト値が使われます。デフォルト値を持つパラメータは必ず末尾に配置する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>パラメータに = 値 でデフォルト値を設定する</li>
          <li>デフォルト値はスカラー値、配列、null、定数が使える</li>
          <li>デフォルト値を持つパラメータは引数リストの末尾に置く</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値の基本</h2>
        <p className="text-gray-400 mb-4">よく使う値をデフォルトにすると呼び出しが簡潔になります。</p>
        <PhpEditor
          defaultCode={`<?php
function createUserTag(
    string $name,
    string $role = "ユーザー",
    bool $isActive = true
): string {
    $status = $isActive ? "有効" : "無効";
    return "[{$role}] {$name} ({$status})";
}

function repeat(string $text, int $times = 3, string $separator = ", "): string {
    return implode($separator, array_fill(0, $times, $text));
}

echo createUserTag("田中") . "\\n";
echo createUserTag("鈴木", "管理者") . "\\n";
echo createUserTag("佐藤", "モデレーター", false) . "\\n";
echo repeat("Hello") . "\\n";
echo repeat("PHP", 4, " | ") . "\\n";
echo repeat("★", 5, "") . "\\n";`}
          expectedOutput={`[ユーザー] 田中 (有効)
[管理者] 鈴木 (有効)
[モデレーター] 佐藤 (無効)
Hello, Hello, Hello
PHP | PHP | PHP | PHP
★★★★★`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列とnullのデフォルト値</h2>
        <p className="text-gray-400 mb-4">配列やnullもデフォルト値として使えます。</p>
        <PhpEditor
          defaultCode={`<?php
function buildQuery(string $base, array $params = [], ?string $fragment = null): string {
    $url = $base;
    if (!empty($params)) {
        $url .= "?" . http_build_query($params);
    }
    if ($fragment !== null) {
        $url .= "#{$fragment}";
    }
    return $url;
}

function formatList(array $items, string $prefix = "・", string $end = "\\n"): string {
    $result = "";
    foreach ($items as $item) {
        $result .= $prefix . $item . $end;
    }
    return rtrim($result);
}

echo buildQuery("/search") . "\\n";
echo buildQuery("/search", ["q" => "PHP", "page" => 2]) . "\\n";
echo buildQuery("/docs", [], "intro") . "\\n";
echo "\\n";
$fruits = ["りんご", "みかん", "ぶどう"];
echo formatList($fruits) . "\\n";
echo formatList($fruits, "→ ") . "\\n";`}
          expectedOutput={`/search
/search?q=PHP&page=2
/docs#intro

・りんご
・みかん
・ぶどう
→ りんご
→ みかん
→ ぶどう`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="default-params" />
      </div>
      <LessonNav lessons={lessons} currentId="default-params" basePath="/learn/functions" />
    </div>
  );
}
