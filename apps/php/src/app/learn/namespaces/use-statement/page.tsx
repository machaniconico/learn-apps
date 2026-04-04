import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("namespaces");

export default function UseStatementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold">名前空間・Composer レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">use文</h1>
        <p className="text-gray-400">use文を使ったクラス・関数のインポートとエイリアスの設定を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">use文の役割</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          use文は長い完全修飾名を短縮して使うためのインポート構文です。
          クラス・インターフェース・トレイト・関数・定数をインポートできます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-teal-300">use App\Models\User;</code> でクラスをインポート</li>
          <li>• <code className="text-teal-300">use App\Models\User as U;</code> でエイリアスを設定</li>
          <li>• <code className="text-teal-300">{"use App\\{User, Post};"}</code> で複数をまとめてインポート</li>
          <li>• <code className="text-teal-300">use function</code> で関数、<code className="text-teal-300">use const</code> で定数をインポート</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なuse文</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">use</code>文でクラスをインポートし、短い名前で使います。
        </p>
        <PhpEditor
          defaultCode={`<?php
namespace App;

// クラスのインポート
use DateTime;
use DateInterval;
use DateTimeZone;

$now = new DateTime('now', new DateTimeZone('Asia/Tokyo'));
echo "現在時刻: " . $now->format('Y-m-d H:i') . "\\n";

$future = (new DateTime('2024-01-01'))->add(new DateInterval('P3M'));
echo "3ヶ月後: " . $future->format('Y-m-d') . "\\n";

// エイリアスの使用
use DateTime as DT;
$dt = new DT('2024-06-15');
echo "エイリアスDT: " . $dt->format('Y/m/d') . "\\n";`}
          expectedOutput={`現在時刻: 2024-01-15 10:30\n3ヶ月後: 2024-04-01\nエイリアスDT: 2024/06/15`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">グループインポートと関数・定数のインポート</h2>
        <p className="text-gray-400 mb-4">
          波括弧を使って複数のクラスをまとめてインポートできます。また関数や定数もインポートできます。
        </p>
        <PhpEditor
          defaultCode={`<?php
namespace App\\Http;

// グループインポート（PHP 7+）
use App\\Models\\{User, Post, Comment};

// 関数のインポート
use function array_map;
use function implode;

// 定数のインポート
use const PHP_EOL;
use const PHP_INT_MAX;

$names = ["田中", "鈴木", "佐藤"];
$upper = array_map(fn($n) => "【{$n}】", $names);
echo implode(", ", $upper) . PHP_EOL;
echo "PHP_INT_MAX: " . PHP_INT_MAX . PHP_EOL;`}
          expectedOutput={`【田中】, 【鈴木】, 【佐藤】\nPHP_INT_MAX: 9223372036854775807`}
        />
      </section>
      <LessonCompleteButton lessonId="use-statement" categoryId="namespaces" />
      <LessonNav lessons={lessons} currentId="use-statement" basePath="/learn/namespaces" />
    </div>
  );
}
