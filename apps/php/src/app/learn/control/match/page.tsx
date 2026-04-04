import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">match式</h1>
        <p className="text-gray-400">PHP 8で追加されたmatch式の構文と、switchとの違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">match式とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">match</code>式はPHP 8で導入された新しい条件分岐構文です。switchに似ていますが、式として値を返せる点や厳密な型比較を行う点が異なります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">===</code>（厳密比較）を使うため型の違いで一致しない</li>
          <li>フォールスルーがなく、breakは不要</li>
          <li>値を返す式として使える</li>
          <li>一致するものがない場合は<code className="text-green-300">UnhandledMatchError</code>が発生</li>
          <li>カンマ区切りで複数の値を1つのアームに書ける</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なmatch式</h2>
        <p className="text-gray-400 mb-4">match式は値を返すため、変数に代入できます。breakは不要です。</p>
        <PhpEditor
          defaultCode={`<?php\n$status = 2;\n\n$label = match($status) {\n    1 => "受付中",\n    2 => "処理中",\n    3 => "完了",\n    4 => "キャンセル",\n    default => "不明",\n};\n\necho "ステータス: {$label}\\n";\n\n// 複数値を1つのアームに\n$day = "土";\n$type = match($day) {\n    "月", "火", "水", "木", "金" => "平日",\n    "土", "日" => "休日",\n    default => "不明",\n};\necho "{$day}曜日は{$type}";`}
          expectedOutput={`ステータス: 処理中\n土曜日は休日`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switchとmatchの型比較の違い</h2>
        <p className="text-gray-400 mb-4">switchは緩い比較（==）、matchは厳密な比較（===）を使います。この違いは重要です。</p>
        <PhpEditor
          defaultCode={`<?php\n$value = "1";\n\n// switchは緩い比較 (== 使用)\nswitch ($value) {\n    case 1:\n        echo "switch: 整数1にマッチ\\n";\n        break;\n    default:\n        echo "switch: デフォルト\\n";\n}\n\n// matchは厳密な比較 (=== 使用)\n$result = match($value) {\n    1 => "整数1にマッチ",\n    "1" => "文字列1にマッチ",\n    default => "デフォルト",\n};\necho "match: {$result}";`}
          expectedOutput={`switch: 整数1にマッチ\nmatch: 文字列1にマッチ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">matchを使った実践例</h2>
        <p className="text-gray-400 mb-4">HTTPステータスコードに応じたメッセージを返す実践的な例です。</p>
        <PhpEditor
          defaultCode={`<?php\nfunction getHttpMessage(int $code): string {\n    return match(true) {\n        $code >= 500 => "サーバーエラー ({$code})",\n        $code >= 400 => "クライアントエラー ({$code})",\n        $code >= 300 => "リダイレクト ({$code})",\n        $code >= 200 => "成功 ({$code})",\n        default => "情報 ({$code})",\n    };\n}\n\nforeach ([200, 301, 404, 500] as $code) {\n    echo getHttpMessage($code) . "\\n";\n}`}
          expectedOutput={`成功 (200)\nリダイレクト (301)\nクライアントエラー (404)\nサーバーエラー (500)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="match" />
      </div>
      <LessonNav lessons={lessons} currentId="match" basePath="/learn/control" />
    </div>
  );
}
