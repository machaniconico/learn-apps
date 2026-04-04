import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch文</h1>
        <p className="text-gray-400">値による多分岐処理を行うswitch文の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          switch文は1つの変数や式の値を複数のcaseと比較して処理を分岐します。同じ変数を多くのif-elseで比較する場合に、switchの方がすっきり書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>各<code className="text-green-300">case</code>の最後に<code className="text-green-300">break</code>が必要（省略するとフォールスルー）</li>
          <li><code className="text-green-300">default</code>はどのcaseにも一致しない場合に実行</li>
          <li>switch文は<code className="text-green-300">==</code>（緩い比較）を使う</li>
          <li>フォールスルーを意図的に使うテクニックもある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なswitch文</h2>
        <p className="text-gray-400 mb-4">曜日に応じてメッセージを表示する例です。各caseにはbreakを忘れずに書きます。</p>
        <PhpEditor
          defaultCode={`<?php\n$day = "水曜日";\n\nswitch ($day) {\n    case "月曜日":\n        echo "週の始まりです！頑張りましょう\\n";\n        break;\n    case "水曜日":\n        echo "週の真ん中！折り返し地点です\\n";\n        break;\n    case "金曜日":\n        echo "もうすぐ週末です！\\n";\n        break;\n    case "土曜日":\n    case "日曜日":\n        echo "週末です！ゆっくり休んでください\\n";\n        break;\n    default:\n        echo "通常の平日です\\n";\n        break;\n}\necho "今日は{$day}";`}
          expectedOutput={`週の真ん中！折り返し地点です\n今日は水曜日`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォールスルーの活用</h2>
        <p className="text-gray-400 mb-4">breakを省略すると次のcaseに処理が続きます（フォールスルー）。複数のcaseに同じ処理を割り当てるのに便利です。</p>
        <PhpEditor
          defaultCode={`<?php\n$month = 9;\n\nswitch ($month) {\n    case 3:\n    case 4:\n    case 5:\n        $season = "春";\n        break;\n    case 6:\n    case 7:\n    case 8:\n        $season = "夏";\n        break;\n    case 9:\n    case 10:\n    case 11:\n        $season = "秋";\n        break;\n    default:\n        $season = "冬";\n        break;\n}\n\necho "{$month}月は{$season}です";`}
          expectedOutput={`9月は秋です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch文でreturnを使う</h2>
        <p className="text-gray-400 mb-4">関数内ではbreakの代わりにreturnを使って早期終了できます。</p>
        <PhpEditor
          defaultCode={`<?php\nfunction getStatusLabel(int $code): string {\n    switch ($code) {\n        case 200: return "OK";\n        case 404: return "Not Found";\n        case 500: return "Internal Server Error";\n        case 403: return "Forbidden";\n        default:  return "Unknown Status";\n    }\n}\n\n$codes = [200, 404, 500, 301];\nforeach ($codes as $code) {\n    echo "HTTP {$code}: " . getStatusLabel($code) . "\\n";\n}`}
          expectedOutput={`HTTP 200: OK\nHTTP 404: Not Found\nHTTP 500: Internal Server Error\nHTTP 301: Unknown Status`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch" />
      </div>
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
