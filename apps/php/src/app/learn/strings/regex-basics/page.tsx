import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function RegexBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">正規表現の基本</h1>
        <p className="text-gray-400 leading-relaxed">
          正規表現はパターンを使って文字列を検索・抽出・置換する強力な手法です。PHPでは<code className="text-yellow-300">preg_match</code>・<code className="text-yellow-300">preg_replace</code>などのPCRE関数を使います。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-400 mb-3">主な正規表現関数</h2>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-yellow-300">preg_match($pattern, $str, $matches)</code>: パターンに一致するか確認</li>
          <li><code className="text-yellow-300">preg_match_all($pattern, $str, $matches)</code>: 全ての一致を取得</li>
          <li><code className="text-yellow-300">preg_replace($pattern, $replacement, $str)</code>: パターンを置換</li>
          <li><code className="text-yellow-300">preg_split($pattern, $str)</code>: パターンで分割</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">preg_matchの基本</h2>
        <p className="text-gray-400 mb-4">
          パターンは<code className="text-yellow-300">/パターン/フラグ</code>の形式で書きます。一致すれば1、しなければ0を返します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$email = "user@example.com";\n$phone = "090-1234-5678";\n\n// メールアドレスのパターン\nif (preg_match('/^[\\w.]+@[\\w.]+\\.[a-z]{2,}$/i', $email)) {\n    echo "有効なメールアドレス\\n";\n}\n\n// 電話番号のパターン\nif (preg_match('/^\\d{3}-\\d{4}-\\d{4}$/', $phone)) {\n    echo "有効な電話番号\\n";\n}\n\n// キャプチャグループ\n$date = "2024-03-15";\npreg_match('/(\\d{4})-(\\d{2})-(\\d{2})/', $date, $m);\necho "年: " . $m[1] . ", 月: " . $m[2] . ", 日: " . $m[3];`}
          expectedOutput={`有効なメールアドレス\n有効な電話番号\n年: 2024, 月: 03, 日: 15`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">preg_match_allで全件取得</h2>
        <p className="text-gray-400 mb-4">
          文字列中のパターンに一致する全ての箇所を取得します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$text = "価格は100円、200円、350円です。合計650円。";\n\n// 全ての数字を取得\npreg_match_all('/\\d+/', $text, $matches);\n$numbers = $matches[0];\necho "数字: " . implode(", ", $numbers) . "\\n";\necho "合計: " . array_sum($numbers) . "\\n";\n\n// HTMLタグを取得\n$html = "<p>段落1</p><strong>太字</strong><em>斜体</em>";\npreg_match_all('/<(\\w+)>/', $html, $tags);\necho "タグ: " . implode(", ", $tags[1]);`}
          expectedOutput={`数字: 100, 200, 350, 650\n合計: 1300\nタグ: p, strong, em`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">preg_replaceで置換</h2>
        <p className="text-gray-400 mb-4">
          パターンに一致した部分を置換します。キャプチャグループを<code className="text-yellow-300">$1</code>で参照できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$text = "今日は2024年3月15日です。";\n\n// 数字をXに置換\n$masked = preg_replace('/\\d/', 'X', $text);\necho $masked . "\\n";\n\n// 日付フォーマット変換\n$date = "2024-03-15";\n$formatted = preg_replace('/(\\d{4})-(\\d{2})-(\\d{2})/', '$1年$2月$3日', $date);\necho $formatted . "\\n";\n\n// 連続空白を1つに\n$messy = "PHPは   とても   便利  です。";\n$clean = preg_replace('/\\s+/', ' ', $messy);\necho $clean;`}
          expectedOutput={`今日はXXXX年X月XX日です。\n2024年03月15日\nPHPは とても 便利 です。`}
        />
      </section>

      <LessonCompleteButton categoryId="strings" lessonId="regex-basics" />
      <LessonNav lessons={lessons} currentId="regex-basics" basePath="/learn/strings" />
    </div>
  );
}
