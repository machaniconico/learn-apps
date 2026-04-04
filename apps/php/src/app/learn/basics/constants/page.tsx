import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">defineとconstを使った定数の定義方法とその違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">定数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          定数は一度設定すると変更できない値です。設定値やバージョン番号など、プログラム実行中に変わらない値を定数として定義します。慣習的に大文字で命名します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">define()</code>: 実行時に定義、クラス外で使用</li>
          <li><code className="text-blue-300">const</code>: コンパイル時に定義、クラス内でも使用可能</li>
          <li>定数には<code className="text-blue-300">$</code>記号は不要</li>
          <li>定数はグローバルスコープからどこでもアクセス可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">defineを使った定数定義</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">define()</code>関数で定数を定義します。名前は大文字で書くのが慣習です。</p>
        <PhpEditor
          defaultCode={`<?php\ndefine("APP_NAME", "PHPアプリ");\ndefine("VERSION", "1.0.0");\ndefine("MAX_USERS", 100);\n\necho APP_NAME . "\\n";\necho "バージョン: " . VERSION . "\\n";\necho "最大ユーザー数: " . MAX_USERS;`}
          expectedOutput={`PHPアプリ\nバージョン: 1.0.0\n最大ユーザー数: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">constを使った定数定義</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">const</code>キーワードでも定数を定義できます。クラス内でも使用可能です。</p>
        <PhpEditor
          defaultCode={`<?php\nconst PI = 3.14159;\nconst SITE_URL = "https://example.com";\nconst DEBUG_MODE = false;\n\necho PI . "\\n";\necho SITE_URL . "\\n";\necho DEBUG_MODE ? "デバッグON" : "デバッグOFF";\necho "\\n";\necho defined("PI") ? "PIは定義済み" : "PIは未定義";`}
          expectedOutput={`3.14159\nhttps://example.com\nデバッグOFF\nPIは定義済み`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHPの組み込み定数</h2>
        <p className="text-gray-400 mb-4">PHPにはあらかじめ定義された便利な定数があります。</p>
        <PhpEditor
          defaultCode={`<?php\necho PHP_VERSION . "\\n";      // PHPのバージョン\necho PHP_INT_MAX . "\\n";      // int型の最大値\necho PHP_EOL;                  // 環境依存の改行コード\necho PHP_INT_MIN . "\\n";      // int型の最小値\necho M_PI;                     // 円周率（mathライブラリ定数）`}
          expectedOutput={`8.3.0\n9223372036854775807\n\n-9223372036854775808\n3.1415926535898`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
