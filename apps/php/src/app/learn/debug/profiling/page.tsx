import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">デバッグ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロファイリング</h1>
        <p className="text-gray-400">パフォーマンス測定とボトルネックの特定方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロファイリングとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロファイリングはプログラムの実行時間やメモリ使用量を計測し、ボトルネック（性能上の瓶頸）を特定する技法です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">microtime(true)</code> - マイクロ秒精度の現在時刻</li>
          <li><code className="text-orange-300">memory_get_usage()</code> - 現在のメモリ使用量</li>
          <li><code className="text-orange-300">memory_get_peak_usage()</code> - ピークメモリ使用量</li>
          <li>Xdebugのプロファイラーやtidewaysでより詳細な計測が可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実行時間の計測</h2>
        <p className="text-gray-400 mb-4">microtime()を使って処理の実行時間を計測し、ボトルネックを特定します。</p>
        <PhpEditor
          defaultCode={`<?php
class Profiler {
    private array $timers = [];
    private array $memory = [];

    public function start(string $name): void {
        $this->timers[$name] = microtime(true);
        $this->memory[$name] = memory_get_usage();
    }

    public function stop(string $name): array {
        $elapsed = (microtime(true) - $this->timers[$name]) * 1000;
        $memDiff = memory_get_usage() - $this->memory[$name];
        return [
            'time_ms' => round($elapsed, 3),
            'memory_bytes' => $memDiff,
        ];
    }
}

$profiler = new Profiler();

// アルゴリズム比較: 配列探索
$data = range(1, 10000);

// 線形探索
$profiler->start('linear');
$found = false;
foreach ($data as $item) {
    if ($item === 9999) { $found = true; break; }
}
$linear = $profiler->stop('linear');

// PHP組み込み関数
$profiler->start('in_array');
$found = in_array(9999, $data);
$inArray = $profiler->stop('in_array');

// ハッシュマップ
$hashMap = array_flip($data);
$profiler->start('hashmap');
$found = isset($hashMap[9999]);
$hash = $profiler->stop('hashmap');

echo "線形探索:    {$linear['time_ms']}ms\n";
echo "in_array:    {$inArray['time_ms']}ms\n";
echo "ハッシュマップ: {$hash['time_ms']}ms\n";
echo "\nピークメモリ: " . number_format(memory_get_peak_usage() / 1024) . "KB\n";`}
          expectedOutput={`線形探索:    0.123ms
in_array:    0.089ms
ハッシュマップ: 0.002ms

ピークメモリ: 2,048KB`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ベンチマーク関数</h2>
        <p className="text-gray-400 mb-4">複数の実装を比較するベンチマーク関数を使ってコードの最適化を行います。</p>
        <PhpEditor
          defaultCode={`<?php
function benchmark(array $cases, int $iterations = 1000): void {
    echo str_pad('実装', 25) . str_pad('平均時間(ms)', 15) . "メモリ(KB)\n";
    echo str_repeat('-', 55) . "\n";

    foreach ($cases as $name => $fn) {
        $times = [];
        $memBefore = memory_get_usage();
        for ($i = 0; $i < $iterations; $i++) {
            $start = microtime(true);
            $fn();
            $times[] = microtime(true) - $start;
        }
        $memAfter = memory_get_usage();
        $avgMs = round(array_sum($times) / $iterations * 1000, 4);
        $memKb = round(($memAfter - $memBefore) / 1024, 2);
        echo str_pad($name, 25) . str_pad($avgMs, 15) . "$memKb\n";
    }
}

$data = range(1, 1000);

benchmark([
    'implode+explode' => fn() => explode(',', implode(',', $data)),
    'array_values()'  => fn() => array_values($data),
    'スプレッド[...]'   => fn() => [...$data],
], iterations: 500);`}
          expectedOutput={`実装                      平均時間(ms)   メモリ(KB)
-------------------------------------------------------
implode+explode           0.0523         0
array_values()            0.0089         0
スプレッド[...]              0.0102         0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="profiling" />
      </div>
      <LessonNav lessons={lessons} currentId="profiling" basePath="/learn/debug" />
    </div>
  );
}
